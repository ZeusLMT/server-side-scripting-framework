const Resize = require('../helpers/resize');
const saveToJson = require('../helpers/fs');
const database = require('../controllers/database');
const path = require('path');

exports.renderUpload = (req, res) => {
  res.render('upload');
};

exports.uploadImage = (req, res) => {
  const imagePath = path.join('./public/uploads');
  const fileUpload = new Resize(imagePath);

  if (!req.file) {
    res.status(401).json({error: 'Please provide an image'});
  }

  fileUpload.save(req.file.buffer, (filePaths) => {
    //New JSON file
    const newJson = {...req.body, ...filePaths};

    //Save to data.json
    saveToJson(newJson, 'data.json', () => { res.redirect('./') });

    //Save to Mongo DB
    database.save(newJson);
  });
};