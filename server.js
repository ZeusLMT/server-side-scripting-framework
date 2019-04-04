require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

const helmet = require('helmet');
app.use(helmet({ ieNoOpen: false }));

app.set('view engine', 'ejs');

//https redirecting

app.enable('trust proxy');
app.use ((req, res, next) => {
  if (req.secure) {
    // request was via https, so do no special handling
    next();
  } else {
    // request was via http, so redirect to https
    res.redirect('https://' + req.headers.host + req.url);
  }
});

//Passport.js authorization
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
passport.use('local', new LocalStrategy(
    (username, password, done) => {
      if (username !== process.env.LOGIN_USERNAME || password !== process.env.LOGIN_PWD) {
        done(null, false, {message: 'Incorrect credentials.'});
        return;
      }
      return done(null, {}); // returned object usually contains something to identify the user
    }
));
app.use(passport.initialize());

app.use(require('./routers'));

const mongoose = require('mongoose');

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_MODEL}`, { useNewUrlParser: true })
.then(() => {
  console.log('Connected successfully.');
  app.listen(process.env.APP_PORT);
}, err => {
  console.log('Connection to db failed: ' + err);
});
