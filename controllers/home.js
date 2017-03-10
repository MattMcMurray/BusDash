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
	res.render('config', {
		title: 'Config'
	});
};
