require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const upload = require('./helpers/uploadMiddleware');
const Resize = require('./helpers/resize');
const saveToJson = require('./helpers/fs');

app.set('view engine', 'ejs');

const mongoose = require('mongoose');
const database = require('./helpers/database');

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_MODEL}`)
.then(() => {
  console.log('Connected successfully.');
  app.listen(process.env.APP_PORT);
}, err => {
  console.log('Connection to db failed: ' + err);
});

app.get('/', (req, res) => {
  database.readAllFromDatabase((all) => {
    res.render('home', {data: all});
  });
});

app.get('/get-all', (req, res) => {
  database.readAllFromDatabase((all) => {
    res.status(200).json(all);
  });
});

app.get('/upload', (req, res) => {
  res.render('upload');
});

app.post('/post', upload.single('image'), (req, res) => {
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
    database.saveToDatabase(newJson);

  });
});