const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: true});

const controller = require('../controllers/home');

router.use('/upload', require('./upload'));
router.use('/images', require('./images'));
router.use('/login', require('./login'));

router.get('/', controller.renderHome);

router.post('/', urlencodedParser, controller.redirectToCategory);


module.exports = router;