const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);
var ArtCategory = keystone.list('ArtCategory');

var myCategory;

ArtCategory.model.find()
	.sort('sortOrder')
	.exec(function (err, category) {
		if (err) {
			return res.serverError(err, "Error loading current user's owned listings.");
		}
		myCategory = category;
	});
keystone.pre('routes', function (req, res, next) {
	res.locals.navLinks = [];
	myCategory.forEach(element => {
		res.locals.navLinks.push({ label: element.name, key: element.key, href: '/works/' + element.key },
		)
	});
	//console.log(res.locals.navLinks)


	res.locals.user = req.user;
	next();
});

keystone.pre('render', middleware.theme);
keystone.pre('render', middleware.flashMessages);

keystone.set('404', function (req, res, next) {
	middleware.theme(req, res, next);
	res.status(404).render('errors/404');
});

// Load Routes
var routes = {
	download: importRoutes('./download'),
	views: importRoutes('./views'),
};

exports = module.exports = function (app) {

	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.all('/blog/post/:post', routes.views.post);
	app.get('/works/:category', routes.views.work);
	app.all('/contact', routes.views.contact);

	// Downloads
	app.get('/download/users', routes.download.users);

}