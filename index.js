require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
app.use(express.static('.public'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const upload = require('./uploadMiddleware');
const Resize = require('./Resize');

app.set('view engine', 'ejs');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  id: Number,
  time: Date,
  category: String,
  title: String,
  details: String,
  coordinates: { lat: String, lng: String },
  thumbnail: String,
  image: String,
  original: String
});

const photoModel = mongoose.model('photos', photoSchema);

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_MODEL}`).then(() => {
  console.log('Connected successfully.');
  app.listen(process.env.APP_PORT);
}, err => {
  console.log('Connection to db failed: ' + err);
});

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/upload', (req, res) => {
  res.render('upload');
});

app.post('/post', upload.single('image'), (req, res) => {
  const imagePath = path.join(__dirname, '/public/uploads');
  const fileUpload = new Resize(imagePath);

  if (!req.file) {
    res.status(401).json({error: 'Please provide an image'});
  }

  fileUpload.save(req.file.buffer, (filename) => {
    res.status(200).json({ name: filename });
  });
});