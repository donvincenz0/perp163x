/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (req.session.User) {
    return next();
  }

  // User is not allowed
  else {
    // (default res.forbidden() behavior can be overridden in `config/403.js`)
    //return res.forbidden('You are not permitted to perform this action.');
    // var requireLoginError = [{name: 'requireLogin', message: 'Vous devez vous connecter pour accéder a cette page.'}];
    // req.session.flash = {
    // 	err: requireLoginError
    // }
    // res.redirect('/session/new');
    // return;
    res.send(403);
  }
};
