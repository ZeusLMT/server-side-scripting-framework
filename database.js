const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const photoSchema = new Schema({
  //id: Number,
  //time: Date,
  category: String,
  title: String,
  details: String,
  //coordinates: { lat: String, lng: String },
  thumbnail: String,
  image: String,
  original: String
});

const photoModel = mongoose.model('photo', photoSchema);

const saveToDatabase = (obj) => {
  photoModel.create(obj)
  .then((image) => {
    console.log('image saved to database');
  })
  .catch((error) => {
    console.log(error);
  });
};

module.exports = saveToDatabase;