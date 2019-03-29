const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: true});

const database = require('../controllers/database');

const controller = require('../controllers/images');

router.use('/upload', require('./upload'));
router.use('/images', require('./images'));

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

router.post('/', urlencodedParser, controller.filterByCategory);


module.exports = router;