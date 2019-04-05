exports.renderHome = (req, res) => {
  if(req.user !== undefined) {
    if (req.query.category !== undefined) {
      res.render('home', {category: req.query.category});
    } else {
      res.render('home', {category: 'all'});
    }
  } else {
    res.redirect('/login');
  }
};

exports.redirectToCategory = (req, res) => {
  if (req.body.category === 'all') {
    res.redirect('/');
  } else {
    res.redirect(`/?category=${req.body.category}`);
  }
};