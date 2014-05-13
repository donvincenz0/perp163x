/**
 * Policy for admin privileges access control
 */

module.exports = function (req, res, next) {

	// User is allowed, proceed to controller
	if (req.session.User && req.session.User.admin) {
		return next();
	}

	// User is not allowed
	var requireAdminError = [{name: 'requireAdminError', message: res.i18n('Insufficient rights to access this page.')}];
	req.session.flash = {
		err: requireAdminError
	}
	res.redirect('session/new');
	return;
}