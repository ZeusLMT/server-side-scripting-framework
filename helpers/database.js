const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const photoSchema = new Schema({
  //time: Date,
  category: String,
  title: String,
  details: String,
  //coordinates: { lat: String, lng: String },
  thumbnail: String,
  image: String,
  original: String,
  filename: String
});

const photoModel = mongoose.model('photo', photoSchema);

const save = (obj) => {
  photoModel.create(obj)
  .then((image) => {
    console.log('image saved to database');
  })
  .catch((error) => {
    console.log(error);
  });
};

const getAll = (callback) => {
  photoModel.find().then((all) => {
    callback(all);
  });
};

const findByCategory = (category, callback) => {
  photoModel.find({'category': category}, (error, result) => {
    if (error) {
      console.log(error);
      callback({ });
    } else {
      callback(result);
    }
  });
};

module.exports = { save, getAll };