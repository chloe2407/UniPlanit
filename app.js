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

const app = express();
const httpServer = createServer(app);

const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
const { updateFriend, sendPrivateMessage, readMessage } = require('./handlers/messageHandler')(io);

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
    description: 'Event Restful API for MyCalendar. Used for CRUD operations related to events',
  },
  host: `localhost:${port}`,
  basePath: `/`,
};

const swaggerSpec = swaggerJSDoc({
  swaggerDefinition,
  apis: [`${__dirname}/routes/*.js`, `${__dirname}/routes/parameters.yaml`],
});

if (app.get('env') === 'production') {
  app.set('trsut proxy', 1);
  sessionOptions.cookie.secure = true;
}

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

//passport stuff
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); //session encoding
passport.deserializeUser(User.deserializeUser()); //session decoding

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/', (req, res) => {
  res.render('index.jade', { title: 'work goddamit' });
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/courses', courseRouter);

app.use(cors());

app.get('/photo', async (req, res, next) => {
  const now = dayjs().utc();
  const lastSavedBackground = await Background.findOne();
  if (!lastSavedBackground) {
    console.log('Fetching and saving a new image');
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
  } else if (now.diff(lastSavedBackground.savedTime) > dayjs.duration(1, 'hours').as('ms')) {
    console.log('Fetching and replacing an image.');
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
    console.log('Returning db image');
    res.json(lastSavedBackground.imgUrl);
  }
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

  // render the error page
  res.status(err.status || 500);
  res.render('error.jade', { title: 'your_page_title' });
  // redirect toerror page in front
  console.error(err.message);
  res.status(err.status || 500);
});

// socket io for live messaging

const wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(session(sessionOptions)));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

io.use((socket, next) => {
  const session = socket.request.session;
  if (socket.request.user) {
    session.socketId = socket.id;
    socket.userId = socket.request.user.id;
    socket.join(socket.userId);
    session.save();
    next();
  } else {
    console.log('Not authorized');
    next(new ExpressError('Not authorized', 401));
  }
});

io.on('connection', (socket) => {
  socket.on('update friend', updateFriend);
  socket.on('private message', sendPrivateMessage);
  socket.on('user status', (msg) => {
    console.log(msg);
  });
});

io.on('disconnect', (socket) => {
  socket.on('disconnect', (reason) => {
    console.log(reason);
  });
});

httpServer.listen(port, () => {
  console.log('listening on 3000');
});

module.exports = app;
