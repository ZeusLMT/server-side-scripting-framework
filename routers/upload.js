const express = require('express');
const router = express.Router();

const upload = require('../helpers/uploadMiddleware');

const controller = require('../controllers/upload');

router.get('/', controller.renderUpload);

router.post('/', upload.single('image'), controller.uploadImage);

module.exports = router;