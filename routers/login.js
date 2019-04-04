const express = require('express');
const router = express.Router();


const controller = require('../controllers/login');

router.get('/', controller.renderLogin);

router.post('/', controller.handleLogin);

module.exports = router;