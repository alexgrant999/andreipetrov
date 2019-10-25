var keystone = require('keystone');
var Types = keystone.Field.Types;

var ArtCategory = new keystone.List('ArtCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: 'Categories',
	sortable: true,
});

ArtCategory.add({
	name: { type: String, required: true },
	contentPage: { type: Types.Boolean },
	image: { type: Types.CloudinaryImage },
	content: { type: Types.Html, wysiwyg: true },

});
ArtCategory.relationship({ path: 'images', ref: 'Images', refPath: 'categories' });


ArtCategory.track = true;
ArtCategory.register();
