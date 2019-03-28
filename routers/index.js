const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: true});

const database = require('../helpers/database');

router.use('/upload', require('./upload'));

router.get('/', (req, res) => {
  if (req.query.category) {
    res.send((`redirected to ${req.query.category}`));
  } else {
    database.getAll((all) => {
      res.render('home', {data: all});
    });
  }
});

router.post('/', urlencodedParser, (req, res) => {
  res.redirect(`/?category=${req.body.category}`);
});

router.get('/get-all', (req, res) => {
  database.getAll((all) => {
    res.status(200).json(all);
  });
});

module.exports = router;