const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors');
const bodyParser = require('body-parser')

const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportLocalMongoose = require('passport-local-mongoose')

const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const usersRouter = require('./routes/users');
const courseRouter = require('./routes/courses')
const ExpressError = require('./utils/ExpressError')
const mongoose = require('mongoose')
const session = require('express-session')
const port = process.env.PORT || 8000
const MongoStore = require('connect-mongo');
const User = require('./models/user');

require('dotenv').config()

const app = express();

// mongoose
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Mongo connection open'))
  .catch(err => console.error(err))

mongoose.connection.on('error', err => {
    console.error(err)
})

mongoose.connection.on('disconnected', err => {
  console.log(`disconnected from mongo ${err}`)
})

// session set up
const mongoStoreOptions = {
  mongoUrl: process.env.MONGO_URL,
  autoRemove: 'native',
  touchAfter: 24 * 3600
}

const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    // set to true in production
    secure: false
  },
  store: MongoStore.create(mongoStoreOptions),
}

const swaggerDefinition = {
  openai: '3.0.0',
  info: {
    title: 'Event API for MyCalendar',
    version: '1.0.0',
    description: 'Event Restful API for MyCalendar. Used for CRUD operations related to events',
  },
  host: `localhost:${port}`,
  basePath: `/`
}

const swaggerSpec = swaggerJSDoc({
  swaggerDefinition,
  apis: [`${__dirname}/routes/*.js`, 
        `${__dirname}/routes/parameters.yaml`]
})

if (app.get('env') === 'production') {
  app.set('trsut proxy', 1)
  sessionOptions.cookie.secure = true
}
 
app.use(session(sessionOptions))

app.locals.returnUrl = ''

//passport stuff
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());       //session encoding
passport.deserializeUser(User.deserializeUser());   //session decoding
app.use(passport.initialize());
app.use(passport.session());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/', (req, res) => {
  res.render('index.jade', {title:'work goddamit'})
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/courses', courseRouter)

app.use(cors())
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended : true}));
 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(new ExpressError('Page not found', 404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.jade', {title:'your_page_title'});
  // redirect toerror page in front
  console.error(err.message)
  res.status(err.status || 500)
});

// redundant since bin/www already makes server listen.
// app.listen(port, () => {
//  console.log(`serving on port ${port}`)
// })

module.exports = app;
