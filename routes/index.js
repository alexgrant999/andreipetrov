const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);
var ArtCategory = keystone.list('ArtCategory');

var myCategory;
// keystone.pre('routes', middleware.initLocals);
// keystone.pre('render', middleware.flashMessages);

ArtCategory.model.find()
	.sort('sortOrder')
	.exec(function (err, category) {
		if (err) {
			return res.serverError(err, "Error loading current user's owned listings.");
		}
		myCategory = category;
	});

keystone.pre('render', function (req, res, next) {
	res.locals.navLinks = [];
	myCategory.forEach(element => {
		res.locals.navLinks.push({ label: element.name, key: element.key, href: '/works/' + element.key },
		)
	});
	// console.log('navLinks', res.locals.navLinks)
	res.locals.user = req.user;
	res.locals.theUrl = req.url
	//console.log('the req is ', req.url)
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
	api: importRoutes('./api')

};

exports = module.exports = function (app) {

	

	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.all('/blog/post/:post', routes.views.post);
	app.get('/works/:category?', routes.views.work);

	app.all('/contact', routes.views.contact);

	// Downloads
	app.get('/download/users', routes.download.users);


	app.all('/api/addcontact/create',keystone.middleware.api, routes.api.addcontact.create);


}
