/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
   'new': function(req, res) {
   		res.view();
   },

   create: function(req, res, next) {

   		// create a User with the params sent from
   		// the sign up form --> new.ejs
   		User.create( req.params.all(), function userCreated (err, user) {

   			// // If there's an error
   			if (err) {
   				console.log(err);
   				req.session.flash = {
   					err: err
   				}
   			
   				// if error redirect back to sign-up page
   				return res.redirect('user/new');
   			}

        // Log user in
        req.session.authenticated = true;
        req.session.User = user;

        user.online = true;
        user.save(function(err, user) {
          if(err) return next(err);

          // add the action attribute to the user object for the flash message.
          user.action = ' ' + res.i18n('signed-up and logged in.');

          // Let other subscribed sockets know that the user was created
          User.publishCreate(user);

          // After successfully creating the user
     			// redirect to the show action
          res.redirect('/user/edit/' + user.id);
   		   });
      });
   },

   show: function (req, res, next) {
  		User.findOne(req.param('id'), function foundUser(err, user) {
  			if (err) return next(err);
  			if(!user) return next();
  			res.view({
  				user: user
  			});
    	});
   },

   index: function (req, res, next) {
      
   	 	// Get an array of all users in the User collection
   	 	User.find(function foundUsers (err, users){
   	 		if(err) return next(err);
   	 		// pass the array down to the /views/index.ejs page
   	 		res.view({
   	 			users: users
   	 		});
   	 	});
   },

   // render the edit view
  edit: function(req, res, next) {
      // Find the user from the id passed in via params
      User.findOne(req.param('id'), function foundUser (err, user) {
        if (err) return next(err);
        if (!user) return next(res.i18n('The user does not exist.'));

        // If edit form section not defined, defaults to "basic info" section
        if (req.session.editUserSection  === '' || typeof req.session.editUserSection  === 'undefined') {
          req.session.editUserSection = 'basic';
        }

        // If specified, set the edit form section to show
        if(req.param('editUserSection')) {
          req.session.editUserSection = req.param('editUserSection');
        }

        // If specified, set the editOnlyThisSection to true
        if(req.param('editUserSection')) {
          req.session.editUserSection = req.param('editUserSection');
          req.session.editUserOnlyThisSection = req.param('editUserOnlyThisSection');
        }

        res.view({
          user: user,
        });
      });
  },

   // process the info from the edit view
   update: function(req, res, next) {
      
      var dataToUpdate = "";
      
      // specific update for bank accounts
      if(req.param('nbOfAccounts')) {
        var numberOfAccounts = req.param('nbOfAccounts');
        dataToUpdate += '{"bankAccount": {"nbOfAccounts" : "' + numberOfAccounts + '",';
        for (var count=1; count<=numberOfAccounts; count++){
          dataToUpdate += '"account_' + count +  
            '": {"iban": "' + req.param('iban_' + count) +
            '", "bankName ": "' + req.param('bankName_' + count) +
            '", "branchName ": "' + req.param('branchName_' + count) +
            '", "bankAddress ": "' + req.param('bankAddress_' + count) + '"},';
        }
        // remove last comma
        dataToUpdate = dataToUpdate.substring(0, dataToUpdate.length - 1);
        dataToUpdate += "}}";
        dataToUpdate = JSON.parse(dataToUpdate);
      } else {
        dataToUpdate = req.params.all();
      }

   		User.update(req.param('id'), dataToUpdate, function userUpdated(err){
   			if (err){
          console.log(err);
          
          req.session.flash = {
            err: err
          }
   				return res.redirect('/user/edit/' + req.param('id'));
   			}

        // Redirect to the proper page depending on where we stand in the edition of the user
        // This is the last sections to edit OR we only want to edit one section
        if (req.param('editUserSection') === 'end' || req.session.editUserOnlyThisSection) {
          
          // Reset session variables
          req.session.editUserSection = null;
          req.session.editUserOnlyThisSection = null;

          // Redirect to the profile page
          res.redirect('/user/show/' + req.param('id'));       
        }

        // Proceed to next section to edit
        else {
          req.session.editUserSection = req.param('editUserSection');       
          res.redirect('/user/edit/' + req.param('id'));
        }		
   		});
      
   },

   destroy: function (req, res, next) {
   		User.findOne(req.param('id'), function foundUser( err, user) {
   			if (err) return next(err);
   			if (!user) return next(res.i18n('The user does not exist.'));

   			User.destroy(req.param('id'), function userDestroyed(err) {
   				if(err) return next(err);

          // Inform other sockets
          User.publishUpdate(user.id, {
            firstname: user.firstname,
            lastname: user.lastname,
            action: ' has been destroyed.'
          });

          // Let other sockets know that the user instance was destroyed
          User.publishDestroy(user.id);
   			})
   		});

   		res.redirect('/user');
   },

  subscribe: function (req, res) {

      User.find(function foundUsers(err, users) {
        if(err) return next(err);

        // subscribe this socket to the User model classroom
        User.subscribe(req.socket);

        // subscribe this socket to the user instance room
        User.subscribe(req.socket, users);

        // This will avoid a warning from the socket for trying to render
        // html over the socket
        res.send(200);
      });
  },

  // updateDefaultLanguage: function (req, res) {
  //     User.findOne(req.param('id'), function(err, user) {
  //       if (err) return next(err);
  //       if (!user) return next(res.i18n('The user does not exist.'));
        
  //       user.defaultLanguage = req.param('lang');
  //       user.save(function (err, user) {
  //         if(err) return next(err);
  //       });

  //       res.redirect('/user');
  //     });
  // },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}

  
};
