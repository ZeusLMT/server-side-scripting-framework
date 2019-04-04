const passport = require('passport');

exports.renderLogin = (req, res) => {
  res.render('login');
};

exports.handleLogin = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/upload',
    session: false }
  );