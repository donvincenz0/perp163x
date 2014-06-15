/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


var bcrypt = require('bcrypt');

module.exports = {

	'new': function(req, res){
		res.view('session/new');
	},

	create: function(req, res, next) {

		// Check for email and password in params sent via the form, if none
		// redirect the browser back to the sign-in form.
		if(!req.param('email') || !req.param('password')) {

			var usernamePasswordRequiredError = [{name: 'usernamePasswordRequired', message: res.i18n('Please enter a valid email address and password.')}];

			// Remember that err is the object being passed down (a.k.a. flash.err), whose value is another 
			// object with the key of usernamePasswordRequiredError
			req.session.flash = {
				err: usernamePasswordRequiredError
			}

			res.redirect('/session/new');
			return;
		}

		// Try to find the user by their email address
		User.findOneByEmail(req.param('email')).exec(function(err, user) {
			if (err) return next(err);

			// if no user is found...
			if(!user) {
				var noAccountError = [{name: 'noAccount', message: res.i18n('The email address') + req.param('email') + ' ' + res.i18n('does not exist.') }];
				req.session.flash = {
					err: noAccountError
				}

				res.redirect('/session/new');
				return;
			}

			// Compare password from the form params to the encrypted password of the user found
			bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid){
				if(err) return next(err);

				if(!valid){
					var usernamePasswordMismatchError = [{name: 'usernamePasswordMismatch', message: res.i18n('Incorrect email and password.')}];
					req.session.flash = {
						err: usernamePasswordMismatchError
					}

					res.redirect('/session/new');
					return;
				}

				// Log user in
				req.session.authenticated = true;
				req.session.User = user; 

				// Set language to user's default language
				req.session.lang = user.defaultLanguage;

				// Change status to online
				user.online = true;
				user.save(function (err, user) {
					if(err) return next(err);

					// Inform other sockets (e.g. connected sockets that are subscribed) that this user is now logged in
					User.publishUpdate(user.id, {
						loggedIn: true,
						id: user.id,
						firstname: user.firstname,
						lastname: user.lastname,
						action: ' ' + res.i18n('has logged in.')
					});

					// if the user is also an admin redirect to the user list
					// This is used in conjunction with config/policies.js file
					if (req.session.User.admin) {
						res.redirect('/user');
						return;
					}

					// Redirect to the user profile page
					res.redirect('/user/show/' + user.id);
				});
			});
		});
	},

	destroy: function(req, res, next) {
		User.findOne(req.session.User.id, function foundUser(err, user) {

			if (user) {
				var userId = req.session.User.id;

				// The user is "logging out"
				User.update(userId, {
					online: false
				}, function (err){
					if (err) return next(err);

					// Inform other sockets (e.g. connected sockets that are subscribed) that this user is now logged in
					User.publishUpdate(user.id, {
						loggedIn: false,
						id: userId,
						firstname: user.firstname,
						lastname: user.lastname,
						action: ' ' + res.i18n('has logged out.')
					});
				});
			}

			// Save session language before destroying the session
			saveLangBeforeSessionIsDestroyed = req.session.lang;

			// Wipe out the session (log out)
			req.session.destroy();

			// Reassign session language after session's detroyed (to keep language consistency when browsing the site, even when the user sign out)
			// req.session.lang = saveLangBeforeSessionIsDestroyed;

			// Redirect the browser to the sign-in screen
			res.redirect('/');	
		});
	},
  
};

