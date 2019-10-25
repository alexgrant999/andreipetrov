var keystone = require('keystone');
var Types = keystone.Field.Types;




var Images = new keystone.List('Images', {
	autokey: { from: 'name', path: 'key', unique: true },
	plural: 'Images',
	singular: 'Image',
});

Images.add({
	name: { type: String, required: true },
	categories: { type: Types.Relationship, ref: 'ArtCategory' },
	onHomePage: { type: Types.Boolean },
	description: { type: Types.Html, wysiwyg: true },
	image: { type: Types.CloudinaryImage },
	publishedDate: { type: Types.Date, default: Date.now },

});

Images.track = true;
Images.defaultSort = 'name';
Images.defaultColumns = 'name, publishedDate, image';
Images.register();
