/**
 * app.js
 *
 * This file contains some conventional defaults for working with Socket.io + Sails.
 * It is designed to get you up and running fast, but is by no means anything special.
 *
 * Feel free to change none, some, or ALL of this file to fit your needs!
 */


(function (io) {

  // as soon as this file is loaded, connect automatically, 
  var socket = io.connect();
  if (typeof console !== 'undefined') {
    log('Connecting to Sails.js...');
  }

  socket.on('connect', function socketConnected() {

    // Listen for Comet messages from Sails on User model
    socket.on('user',  function(message) {
      // Handle inbound messages related to a user record
      console.log("Here's the message: ", message);
      var userID = message.id;
      updateUserInDom(userID, message);

      if(message.verb !== "destroyed") {
        displayFlashActivity(message);
      }
    });


    // Subscribe to the user model classroom and instance room
    socket.get('/user/subscribe');

    ///////////////////////////////////////////////////////////
    // Here's where you'll want to add any custom logic for
    // when the browser establishes its socket connection to 
    // the Sails.js server.
    ///////////////////////////////////////////////////////////
    log(
        'Socket is now connected and globally accessible as `socket`.\n' + 
        'e.g. to send a GET request to Sails, try \n' + 
        '`socket.get("/", function (response) ' +
        '{ console.log(response); })`'
    );
    ///////////////////////////////////////////////////////////


  });


  // Expose connected `socket` instance globally so that it's easy
  // to experiment with from the browser console while prototyping.
  window.socket = socket;


  // Simple log function to keep the example simple
  function log () {
    if (typeof console !== 'undefined') {
      console.log.apply(console, arguments);
    }
  }
  

})(

  // In case you're wrapping socket.io to prevent pollution of the global namespace,
  // you can replace `window.io` with your own `io` here:
  window.io

);

function displayFlashActivity(message) {
  $(".navbar").after("<div class='alert alert-success'>" + message.data.firstname + " " + message.data.lastname + message.data.action + "</div>");
  $(".alert").fadeOut(5000);
}

function updateUserInDom(userId, message) {

  // What page am I on?
  var page = document.location.pathname;

  // Strip trailing slash if we've got one
  page = page.replace(/(\/)$/, '');

  // Route to the appropriate user update handler based on which page you're on
  switch(page){

    // if we're on the User Administration Page (aka user index)
    case '/user':

      // This is a message coming from publishUpdate
      if (message.verb === 'updated') {
        UserIndexPage.updateUser(userId, message);
      }

      // This is a message coming from publishCreate
      if (message.verb === 'created') {
        UserIndexPage.addUser(message);
      }

      // This is a message coming from publishDestroy
      if (message.verb === 'destroyed') {
        UserIndexPage.destroyUser(userId);
      }

      break;
  }
}

//////////////////////////////////////////////////////
// User index page DOM manipulation logic
// (i.e. backbone-style view)
//////////////////////////////////////////////////////
var UserIndexPage = {

  // Update the user, in this case their login status
  updateUser: function(id, user) {
    if(user.data.loggedIn) {
      var $userRow = $('tr[data-id="' + id + '"] td img').first();
      $userRow.attr('src', "/images/icon-online.png");
    } else {
      var $userRow = $('tr[data-id="' + id + '"] td img').first();
      $userRow.attr('src', "/images/icon-offline.png");
    }
  },

  // Add a user to the list of users in the User Administration Page
  addUser: function(user) {
    
    // obj is going to encompass both the new user data as well as the _csrf into from
    // the layout.ejs file
    var obj = {
      user: user.data,
      _csrf: window.donvincenzo.csrf || ''
    };

    // Add the template to the bottom of the User Administration Page
    $( 'tr:last' ).after(

      // This is the path to the templates file
      JST['assets/templates/user/show_addUser.ejs']( obj )
    );
  },

  destroyUser: function(id) {
    $('tr[data-id="' + id + '"]').remove();
  }
}