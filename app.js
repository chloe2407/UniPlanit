const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const usersRouter = require('./routes/users');
const courseRouter = require('./routes/courses');
const ExpressError = require('./utils/ExpressError');
const mongoose = require('mongoose');
const session = require('express-session');
const port = process.env.PORT || 8000;
const MongoStore = require('connect-mongo');
const User = require('./models/user');
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');
const dayjs = require('dayjs');
const { Background } = require('./models/background');
const duration = require('dayjs/plugin/duration');
const { createServer } = require('http');
const sslRedirect = require('heroku-ssl-redirect').default;

const app = express();
const httpServer = createServer(app);

const io = require('socket.io')(httpServer, {
  cors: {
    origin: ['https://www.uniplanit.com', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
  },
});
const {
  addFriend,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendRequest,
  removeFriend,
  getFriend,
} = require('./handlers/friendHandler')(io);

const { sendPrivateMessage } = require('./handlers/messageHandler')(io);

const {
  getUserCourse,
  addUserCourse,
  deleteUserCourse,
  deleteCourseSection,
  generateTimetable,
  getFavTimetable,
  deleteFavTimetable,
  getBuildTimetable,
  buildTimetableFromCourse,
  updateTimetable,
  getGeneratedTimetable,
  addFavTimetable,
  updateFavTimetable,
  updateSelectedTimetable,
} = require('./handlers/courseHandler')(io);

dayjs.extend(duration);
require('dotenv').config();

// mongoose
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Mongo connection open'))
  .catch((err) => console.error(err));

mongoose.connection.on('error', (err) => {
  console.error(err);
});

mongoose.connection.on('disconnected', (err) => {
  console.log(`disconnected from mongo ${err}`);
});

// session set up
const mongoStoreOptions = {
  mongoUrl: process.env.MONGO_URL,
  autoRemove: 'native',
  touchAfter: 24 * 3600,
};

const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    // set to true in production
    maxAge: 24 * 60 * 60 * 1000,
    secure: false,
  },
  store: MongoStore.create(mongoStoreOptions),
};

const swaggerDefinition = {
  openai: '3.0.0',
  info: {
    title: 'Event API for MyCalendar',
    version: '1.0.0',
    description:
      'Event Restful API for MyCalendar. Used for CRUD operations related to events',
  },
  host: `localhost:${port}`,
  basePath: `/`,
};

const swaggerSpec = swaggerJSDoc({
  swaggerDefinition,
  apis: [`${__dirname}/routes/*.js`, `${__dirname}/routes/parameters.yaml`],
});

if (app.get('env') === 'production') {
  app.set('trust proxy', 1);
  sessionOptions.cookie.secure = true;
}

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

//passport stuff
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); //session encoding
passport.deserializeUser(User.deserializeUser()); //session decoding

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sslRedirect());

app.use('/users', usersRouter);
app.use('/courses', courseRouter);

app.use(
  cors({
    origin: ['https://www.uniplanit.com', 'http://localhost:3000'],
  })
);

app.get('/photo', async (req, res, next) => {
  // Return a background picture for login and sign up
  const now = dayjs().utc();
  const lastSavedBackground = await Background.findOne();
  if (!lastSavedBackground) {
    fetch(
      'https://api.unsplash.com/photos/random?' +
        new URLSearchParams({
          query: 'landscape',
        }),
      {
        headers: {
          'Accept-Version': 'v1',
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const newBackground = new Background({
          imgUrl: data.urls.full,
          savedTime: new Date(now.startOf('d')),
        });
        newBackground.save();
        res.json(newBackground.imgUrl);
      })
      .catch((err) => next(new ExpressError(err, 500)));
  } else if (
    now.diff(lastSavedBackground.savedTime) >
    dayjs.duration(1, 'hours').as('ms')
  ) {
    fetch(
      'https://api.unsplash.com/photos/random?' +
        new URLSearchParams({
          query: 'landscape',
        }),
      {
        headers: {
          'Accept-Version': 'v1',
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        lastSavedBackground.imgUrl = data.urls.full;
        lastSavedBackground.savedTime = new Date(now.startOf('h').utc());
        lastSavedBackground.save();
        res.json(lastSavedBackground.imgUrl);
      })
      .catch((err) => next(new ExpressError(err, 500)));
  } else {
    res.json(lastSavedBackground.imgUrl);
  }
});
// socket io

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);

io.use(wrap(session(sessionOptions)));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

io.use(async (socket, next) => {
  const session = socket.request.session;
  if (socket.request.user) {
    session.socketId = socket.id;
    socket.userId = socket.request.user.id;
    socket.join(socket.userId);
    await session.save();
    next();
  } else {
    console.log('Not authenticated');
    next(new ExpressError('Not authenticated', 401));
  }
});

io.on('connection', async (socket) => {
  console.log(`A user has connected ${socket.id}`);
  socket.on('get friend', getFriend);
  socket.on('add friend', addFriend);
  socket.on('remove friend', removeFriend);
  socket.on('accept friend request', acceptFriendRequest);
  socket.on('reject friend request', rejectFriendRequest);
  socket.on('private message', sendPrivateMessage);
  socket.on('get friend request', getFriendRequest);
  socket.on('get user course', getUserCourse);
  socket.on('add user course', addUserCourse);
  socket.on('delete course', deleteUserCourse);
  socket.on('delete section', deleteCourseSection);
  socket.on('get generated timetable', getGeneratedTimetable);
  socket.on('get build timetable', getBuildTimetable);
  socket.on('build timetable', buildTimetableFromCourse);
  socket.on('update timetable', updateTimetable);
  socket.on('generate timetable', generateTimetable);
  socket.on('add fav timetable', addFavTimetable);
  socket.on('get fav timetable', getFavTimetable);
  socket.on('delete fav timetable', deleteFavTimetable);
  socket.on('update fav timetable', updateFavTimetable);
  socket.on('update selected timetable', updateSelectedTimetable);
});

io.on('disconnect', (socket) => {
  socket.on('disconnect', (reason) => {
    console.log(reason);
  });
});

app.use(express.static(path.join(__dirname, '/client/build')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new ExpressError('Page not found', 404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // redirect to home page
  res.redirect('localhost:3000');
});

httpServer.listen(port, () => {
  console.log('listening on ' + port);
});

module.exports = app;
