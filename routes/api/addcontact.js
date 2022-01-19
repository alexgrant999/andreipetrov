var async = require('async'),
	keystone = require('keystone');

var Contact = keystone.list('Contact');

/**
 * List Posts
 */



/**
 * Create a Post
 */
exports.create = function(req, res) {

	console.log(JSON.stringify(req.body));
	
	var item = new Contact.model(),
		data = (req.method == 'POST') ? req.body : req.query;
	
	item.getUpdateHandler(req).process(data, function(err) {
		
		if (err) return res.apiError('error', err);
		
		res.apiResponse({
			post: item
		});
		
	});
}

