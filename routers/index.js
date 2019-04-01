const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: true});

const database = require('../controllers/database');

const controller = require('../controllers/home');

router.use('/upload', require('./upload'));
router.use('/images', require('./images'));

router.get('/', controller.renderHome);

router.post('/', urlencodedParser, controller.redirectToCategory);


module.exports = router;