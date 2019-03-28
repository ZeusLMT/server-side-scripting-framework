const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: true});

const database = require('../helpers/database');

router.use('/upload', require('./upload'));

router.get('/', (req, res) => {
  if (req.query.category) {
    console.log((`redirected to ${req.query.category}`));
    database.findByCategory(req.query.category, (result) => {
      res.render('home', {data: result, category: req.query.category});
    });
  } else {
    database.getAll((all) => {
      res.render('home', {data: all, category: null});
    });
  }
});

router.post('/', urlencodedParser, (req, res) => {
  if (req.body.category === 'all') {
    res.redirect(`/`);
  } else {
    res.redirect(`/?category=${req.body.category}`);
  }
});

router.get('/get-all', (req, res) => {
  database.getAll((all) => {
    res.status(200).json(all);
  });
});

module.exports = router;