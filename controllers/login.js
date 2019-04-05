const passport = require('passport');

exports.renderLogin = (req, res) => {
  res.render('login');
};

exports.handleLogin = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login/failed',
    session: false }
  );

exports.onLoginFail = (req, res) => {
  res.json('Logging in failed!');
};