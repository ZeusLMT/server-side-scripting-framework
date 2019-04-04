const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: true});

const controller = require('../controllers/login');

router.get('/', controller.renderLogin);

router.post('/', urlencodedParser, controller.login);

module.exports = router;