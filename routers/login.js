const express = require('express');
const router = express.Router();
const passport = require('passport');

// const bodyParser = require('body-parser');
// const urlencodedParser = bodyParser.urlencoded({extended: true});

const controller = require('../controllers/login');

router.get('/', controller.renderLogin);

router.post('/', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/upload',
  session: false })
);

module.exports = router;