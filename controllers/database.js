const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

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

const findById = (id, callback) => {
  photoModel.find({'_id': id}).then((result) => {
    callback(result[0]);
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

const remove = (id, callback) => {
  photoModel.findByIdAndDelete(id, () => {
    callback();
  });
};

const update = (imageId, newObj, callback) => {
  photoModel.findOneAndUpdate({'_id': ObjectId(imageId)}, newObj, {new: true}, (error, result) =>{
    if (error) throw error;
    callback(result);
  });
};

module.exports = { save, getAll, findByCategory, remove, update, findById };