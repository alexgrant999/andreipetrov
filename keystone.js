var keystone = require('keystone');
const settings = require('./settings');

keystone.init({

	'name': 'Andrei Petrov',
	'brand': 'Artist',
<<<<<<< HEAD
	'port': settings.PORT,
=======
	'port': 3002,
>>>>>>> parent of 11d202e (uncomit)



	'favicon': 'public/favicon.ico',
	'less': 'public',
	'static': 'public',

	'views': 'templates/views',
	'view engine': 'pug',

	'auto update': true,
<<<<<<< HEAD
	'mongo': settings.MONGO_URL,
=======

	'mongo': process.env.MONGO_URI || process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/andreidb',
>>>>>>> parent of 11d202e (uncomit)
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
