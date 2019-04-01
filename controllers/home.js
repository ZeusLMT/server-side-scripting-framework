exports.renderHome = (req, res) => {
  if (req.params.category !== undefined) {
    res.render('home', {category: req.params.category});
  } else {
    res.render('home', {category: 'all'});
  }
};

exports.redirectToCategory = (req, res) => {
  res.redirect(`/?category=${req.body.category}`);
};