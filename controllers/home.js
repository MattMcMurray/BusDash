/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('home', {
    title: 'Home'
  });
};

exports.config = (req, res) => {
	if (!req.user) {
		return res.redirect('/');
	} else {
		res.render('config', {
			title: 'Config'
		});
	}
};