const database = require('../controllers/database');

exports.delete = (req, res) => {
  console.log(req.params.imageId);
  database.remove(req.params.imageId, () => {
    res.send('File deleted');
  });
};

exports.update = (req, res) => {
  console.log(`File: ${req.params.imageId} - updates`);
  database.update(req.params.imageId, req.body, (result) => {
    res.json(result);
  });
};

exports.filterByCategory = (req, res) => {
  if (req.body.category === 'all') {
    res.redirect(`/`);
  } else {
    res.redirect(`/?category=${req.body.category}`);
  }
};

