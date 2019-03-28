const express = require('express');
const router = express.Router();

const database = require('../helpers/database');

router.use('/upload', require('./upload'));

router.get('/', (req, res) => {
  database.getAll((all) => {
    res.render('home', {data: all});
  });
});

router.get('/get-all', (req, res) => {
  database.getAll((all) => {
    res.status(200).json(all);
  });
});

module.exports = router;