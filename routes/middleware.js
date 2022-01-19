var _ = require('lodash');
var keystone = require('keystone');
var ArtCategory = keystone.list('ArtCategory');




exports.initLocals = function (req, res, next) {

	var locals = res.locals;

	ArtCategory.model.find()
		.sort('sortOrder')
		.exec(function (err, category) {
			if (err) {
				return res.serverError(err, "Error loading current user's owned listings.");
			}
			locals.category = category;
			// console.log('all catagories' + category)
			next();
		});

	next();

};



exports.theme = function (req, res, next) {
	if (req.query.theme) {
		req.session.theme = req.query.theme;
	}
	res.locals.themes = [
		'Bootstrap',
		'Cerulean',
		'Cosmo',
		'Cyborg',
		'Darkly',
		'Flatly',
		'Journal',
		'Lumen',
		'Paper',
		'Readable',
		'Sandstone',
		'Simplex',
		'Slate',
		'Spacelab',
		'Superhero',
		'United',
		'Yeti',
	];
	res.locals.currentTheme = req.session.theme || 'Bootstrap';
	next();
};

exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length }) ? flashMessages : false;
	next();
};
