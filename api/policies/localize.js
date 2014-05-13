/**
 * Policy to set the langage for every controllers
 *
**/

module.exports = function (req, res, next) {

	var lang = req.param('lang');

	// Set the default language
 	if (!req.session.lang) {
 		req.session.lang = 'en';
 	}

 	// Check if the user has decided to change the default language using the form located in /views/layout.ejs
 	if (lang) {
 		// Change to the new selected language
 		req.session.lang = lang;
 	}

	// Set the locale
	req.locale = req.session.lang;

	next();
}