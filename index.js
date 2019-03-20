require('dotenv').config();

const app = express();

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