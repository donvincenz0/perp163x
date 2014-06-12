/**
 * Policy to set the langage for every controllers
 *
**/

module.exports = function (req, res, next) {

	var lang = req.param('lang');

	// if a user's connected and no new language has been selected
	if(req.session.User && !lang) {
		// retrieve the language from his profile, if its' been defined
		if(req.session.User.defaultLanguage) {
			req.session.lang = req.session.User.defaultLanguage;
		}
	}

	// if nobody's connected or user's default language not set or no language selection has been made by non-connected user, default to this one
 	if (!req.session.lang) {
 		req.session.lang = 'en';
 	}

 	// case where a new language has been selected
 	if(lang) {
 		// Change session config to the new selected language
 		req.session.lang = lang;
 	}

 	// Set the locale - this will update the language shown on the page
	req.locale = req.session.lang;

 	// if a user is connected and changed the language
 	if (req.session.User && lang) {
 		// Update the user's default language
		User.findOne(req.session.User.id).exec(function(err, user) {
			if (err) return next(err);
  			if(!user) return next();
			user.defaultLanguage = lang;
			user.save(function (err, user) {
				if(err) return next(err);
			});
		});
		//res.redirect('user/updateDefaultLanguage/' + req.session.User.id + '?lang=' + lang);
 	}

	next();
}