var keystone = require('keystone');
var Types = keystone.Field.Types;

var Contact = new keystone.List('Contact', {
	// nodelete prevents people deleting the demo admin Contact
	nodelete: true,
});

Contact.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true, unique: true },
	phone: { type: String, width: 'short' },
	message: { type: String, width: 'long' },
});





/**
 * END DEMO Contact PROTECTION
 */

Contact.track = true;
Contact.defaultColumns = 'name, email, phone, photo';
Contact.register();
