const database = require('../controllers/database');
const fs = require('../helpers/fs');

exports.delete = (req, res) => {
  console.log(req.params.imageId);
  database.findById(req.params.imageId, (result) => {
    fs.deleteFile(result.thumbnail);
    fs.deleteFile(result.image);
    fs.deleteFile(result.original);

    database.remove(req.params.imageId, () => {
      res.status(200).json({status: "OK"});
    });
  });
};

exports.update = (req, res) => {
  console.log(`File: ${req.params.imageId} - updates`);
  database.update(req.params.imageId, req.body, (result) => {
    res.json(result);
  });
};

exports.filterByCategory = (req, res) => {
  if(req.params.category === 'all') {
    database.getAll((result) => {
      res.json(result);
    })
  } else {
    database.findByCategory(req.params.category, (result) => {
      res.json(result);
    });
  }
};

