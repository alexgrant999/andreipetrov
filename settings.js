// Loading, defaulting and, in some cases, validating the config variables used by the FindYoga app
// This file is the only place in the app codebase `process.env` should be referenced

// First, figure and validate the APP_ENV
// Should be 'production' in both staging and live
const APP_ENV = (process.env.APP_ENV || 'development').toLowerCase();

// Do some basic validation of the APP_ENV
const validAppEnvs = ['live', 'staging', 'testing', 'development'];
if (!validAppEnvs.includes(APP_ENV)) throw new Error(`The current APP_ENV (${APP_ENV}) isn't valid. Should be: ${validAppEnvs.join(', ')}`);


// Expand the APP_ENV into flags
const flags = validAppEnvs.reduce((acc, i) => {
	acc['IN_' + i.toUpperCase()] = (APP_ENV === i);
	return acc;
}, {});


const settings = {
	APP_ENV: APP_ENV,

	// What port should Keystone listen on
	// In Live Heroku will set this to whatever it needs
	PORT: process.env.PORT || 3002,

	// Should be 'production' in both staging and live
	// We don't use this internally though modules we use might be dependant on it
	NODE_ENV: (process.env.NODE_ENV || 'development').toLowerCase(),


	// The URI of the Mongo DB used
	// The default ('mongodb://localhost/findyoga') expects the DB to be hosted locally, ie. in dev
	MONGO_URL: process.env.MONGO_URL || 'mongodb://alexgrant999:*****@findyogalive-shard-00-00.tein0.mongodb.net:27017,findyogalive-shard-00-01.tein0.mongodb.net:27017,findyogalive-shard-00-02.tein0.mongodb.net:27017/findyoga?authSource=admin&replicaSet=atlas-13ou82-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true',

	// If this is not set it will not be used
	// Eg, usage should be...
	//		toEmail = (settings.OVERRIDE_OUTBOUND_EMAIL_ADDRESS || normalToEmail)
	OVERRIDE_OUTBOUND_EMAIL_ADDRESS: process.env.OVERRIDE_OUTBOUND_EMAIL_ADDRESS,

	// The API key used to send email
	// Note that emails send with "test" keys will not be delivered; they're only visible though Mandrill's "test mode"
	// 'E3-m6WDgNMW7PzWIpnilYg' Test key setup on the (new) FindYoga MailChimp account.
	// 'WkUl9cHrdF1r7pr3bOlR7w' The live key used for the public site
	// '00tEjsjexOVrI561lqAMKQ' The previous 'live' key; belongs to the old Thinkmill/FindYoga Mandrill account that was being on-billed
	MANDRILL_API_KEY: process.env.MANDRILL_API_KEY || 'E3-m6WDgNMW7PzWIpnilYg',

	// Used to encrypt Keystone session info in user cookies
	// Should remain as 'NRA3AD7x4wzM9998v4YFT84C3CuMUfakH47ch7T9'; changing will distroy all sessions
	KEYSTONE_COOKIE_SECRET: 'NRA3AD7x4wzM9998v4YFT84C3CuMUfakH47ch7T9',


	// Embedly is used for embedding video files
	// The '70e1d302c7b54f4c8f26144c6b7f427e' key is live
	EMBEDLY_API_KEY: process.env.EMBEDLY_API_KEY || '70e1d302c7b54f4c8f26144c6b7f427e',


	// Cloudinary used for image hosting and manipulation
	// The '295176372525568' / '_rjuIm4PLxgX6DRIU_6uq0uZwsU' creds are live
	CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || 'fy',
	CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '295176372525568',
	CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '_rjuIm4PLxgX6DRIU_6uq0uZwsU',


	// Google API browser key, used to authenticate the Javascript Maps API in the Admin UI
	// The Alex FindYoga key:  'AIzaSyCvW1Ypm3846so-KWguSLxCpfFAXrhOzl0'
	GOOGLE_BROWSER_KEY: process.env.GOOGLE_BROWSER_KEY || 'AIzaSyBt78eXUkn6lTSse_2Z9nixrbSrb2QOXWE',

	// Google API server key, used to authenticate requests to the Maps API from the server
	// The 'AIzaSyCXf8ebCz9BAZRYPHzc_Rbo_rbnZnhbwLQ' key is live
	GOOGLE_SERVER_KEY: process.env.GOOGLE_SERVER_KEY || 'AIzaSyBt78eXUkn6lTSse_2Z9nixrbSrb2QOXWE',

	// Used for Facebook integration
	// These are the live and testing creds
	FACEBOOK_ID: flags.IN_LIVE ? '60801910204' : '60801910204',
	FACEBOOK_SECRET: flags.IN_LIVE ? 'ecac073fe71500c82d843129c028be99' : 'cb47b5a62ce56ca9b0365fd6ef59c745',
	FACEBOOK_CALLBACK_ENDPOINT: (flags.IN_LIVE ? 'https://www.findyoga.com.au' : 'http://localhost:3001') + '/auth/facebook',

	// eWay creds for payment processing
	// These are the live and testing creds
	EWAY_CUSTOMER_ID: flags.IN_LIVE ? 14728663 : 91431008,
	EWAY_USERNAME: flags.IN_LIVE ? 'eway@findyoga.com.au' : 'govinda@findyoga.com.au.sand',
	EWAY_PASSWORD: flags.IN_LIVE ? 'EWalex72' : 'EWalex108!',
	EWAY_GATEWAY_URL: flags.IN_LIVE ? 'https://www.eway.com.au/gateway/ManagedPaymentService/managedCreditCardPayment.asmx?wsdl' : 'https://www.eway.com.au/gateway/ManagedPaymentService/test/managedCreditCardPayment.asmx?wsdl',

	GOOGLE_CAPTCHA_SECRECT_KEY: '6Lcaab0UAAAAAIaDiQtsT4G1D8ILciZtmbaUkjBF',
	GOOGLE_CAPTCHA_SITE_KEY: ' 6Lcaab0UAAAAAKoniFQmXWW30V7kNmZ8-iFWd47H',

	// Should we prevent output from the logging util? Probably not..
	KEYSTONE_SUPPRESS_LOGGING: false,

	// Used when authenticating users with Twitter
	// The 'htSliF2TeGdFL87hPgBYQ' / 'wyGMtS32QUOnMTZB2qNVITjV4Usof4ALAxvSlHk' consumer creds are live
	TWITTER_AUTH_REDIRECT_ENDPOINT: ({
		live: 'https://www.findyoga.com.au/auth/twitter',
		staging: 'https://staging.findyoga.com.au/auth/twitter',
		development: 'http://localhost:3000/auth/twitter',
	})[APP_ENV],
	TWITTER_CONSUMER_KEY: 'htSliF2TeGdFL87hPgBYQ',
	TWITTER_CONSUMER_SECRET: 'wyGMtS32QUOnMTZB2qNVITjV4Usof4ALAxvSlHk',


	// Where should enquiry emails be sent?
	ENQUIRY_TO_EMAIL_ADDRESS: 'alex@findyoga.com.au',

};


module.exports = Object.freeze(settings);
