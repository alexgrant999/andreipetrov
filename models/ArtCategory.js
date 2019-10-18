var keystone = require('keystone');
var Types = keystone.Field.Types;

var ArtCategory = new keystone.List('ArtCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: 'Categories',
});

ArtCategory.add({
	name: { type: String, required: true },
});

ArtCategory.relationship({ ref: 'Images', refPath: 'categories' });

ArtCategory.track = true;
ArtCategory.register();
