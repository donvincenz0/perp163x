/**
 * Allow a logged-in user to see, edit and update her own profile
 * Allow admins to see everyone
 *
 */

module.exports = function (req, res, next) {

	var sessionUserMatchesId = req.session.User.id === req.param('id');
	var isAdmin = req.session.User.admin;

	// temporary hack
	sessionUserMatchesId = true;

	// The requested id does not match the user's id,
	// and this is not an admin
	if (!(sessionUserMatchesId || isAdmin)) {
		var noRightsError = [{name: 'noRights', message: res.i18n('Insufficient rights to access this page.')}];
		req.session.flash = {
			err: noRightsError
		}
		res.redirect('session/new');
		return;
	}

	next();
	
}