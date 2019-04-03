require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.static('public'));

const helmet = require('helmet');
app.use(helmet({ ieNoOpen: false }));

app.use(require('./routers'));

app.set('view engine', 'ejs');

const mongoose = require('mongoose');

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


mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_MODEL}`, { useNewUrlParser: true })
.then(() => {
  console.log('Connected successfully.');
  app.listen(process.env.APP_PORT);
}, err => {
  console.log('Connection to db failed: ' + err);
});