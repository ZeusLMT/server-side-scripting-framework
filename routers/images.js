const express = require('express');
const router = express.Router();

const controller = require('../controllers/images');

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: true});


router.delete('/:imageId', controller.delete);

router.patch('/:imageId', urlencodedParser, controller.update);

router.get('/:category', controller.filterByCategory);

module.exports = router;