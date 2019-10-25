var keystone = require('keystone');

keystone.init({

	'name': 'Andrei Petrov',
	'brand': 'Artist',
	//'port': 3002,



	'favicon': 'public/favicon.ico',
	'less': 'public',
	'static': 'public',

	'views': 'templates/views',
	'view engine': 'pug',

	'auto update': true,
	'mongo': process.env.MONGO_URI || process.env.MONGOLAB_URI || 'mongodb://localhost/keystone-demo',
	'cloudinary config': process.env.CLOUDINARY_URL || 'cloudinary://477968414131973:rpmzwiGpo1QAdHH338DkGwu4z_0@agweb',

	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': process.env.COOKIE_SECRET || 'demo',

	'ga property': process.env.GA_PROPERTY,
	'ga domain': process.env.GA_DOMAIN,

	'chartbeat property': process.env.CHARTBEAT_PROPERTY,
	'chartbeat domain': process.env.CHARTBEAT_DOMAIN

});

keystone.import('models');

keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
	ga_property: keystone.get('ga property'),
	ga_domain: keystone.get('ga domain'),
	chartbeat_property: keystone.get('chartbeat property'),
	chartbeat_domain: keystone.get('chartbeat domain')
});

keystone.set('routes', require('./routes'));

keystone.set('nav', {
	'galleries': 'galleries',
	'enquiries': 'enquiries',
	'users': 'users',
	'field-tests': 'things'
});

keystone.start();
