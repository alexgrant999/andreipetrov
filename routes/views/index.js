var keystone = require('keystone');
var Image = keystone.list('Image');


exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'home';

	view.query('images', Image.model.find())
		.then(function (err, results, next) {
			if (err) return next(err);
			locals.images = results
			console.log(locals.images);

			next();
		});

	//view.query('images', Image.model.find());
	//console.log('the images are' + locals.images)
	view.render('index');

}