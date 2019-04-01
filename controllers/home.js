exports.renderHome = (req, res) => {
  if (req.query.category !== undefined) {
    res.render('home', {category: req.query.category});
  } else {
    res.render('home', {category: 'all'});
  }
};

exports.redirectToCategory = (req, res) => {
  if (req.body.category === 'all') {
    res.redirect('/');
  }
  res.redirect(`/?category=${req.body.category}`);
};