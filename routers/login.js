const express = require('express');
const router = express.Router();


const controller = require('../controllers/login');

router.get('/', controller.renderLogin);

router.post('/', controller.handleLogin);

router.get('/failed', controller.onLoginFail);

router.get('/test', (req, res) => {
  if(req.user !== undefined)
    return res.send(`Hello ${req.user.username}!`);
  res.send('Hello Secure World!');
});

module.exports = router;