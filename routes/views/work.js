var keystone = require('keystone');
var Images = keystone.list('Images');
var ArtCategory = keystone.list('ArtCategory');
const async = require('async');



exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'Images';

	view.on('init', function (next) {

		async.waterfall([
			function findCategories(callback) {
				ArtCategory.model.findOne()
					.where('key', req.params.category ? req.params.category : 'paintings')
					.exec(function (err, results) {
						if (err) console.log('the error is ' + err)
						//console.log('the results of find categories ' + results)
						locals.category = results
						callback(null, results)
					})

			},
			function findImages(imageCategory, callback) {
				//console.log('the image category is: ', imageCategory.id)
				Images.model.find()
					.where('categories', imageCategory.id)
					.exec(function (err, results) {
						if (err) console.log('the error is ' + err)
						//console.log('the results of find images ' + results)
						callback(null, results)
					})
			}

		], function (err, results) {
			if (err) console.error(err)

			//console.log(results)
			locals.images = results
			next();
			// result now equals 'done'
		});



	});

	view.render('work');

}
