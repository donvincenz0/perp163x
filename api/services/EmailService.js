/**
 * EmailService
 * Service for sending emails
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var emailer = require("custom-emailer/emailer.js");

// EmailService.js - in api/services
// Mail to the client
exports.send = function(options, data) {
  opts = {
    to: options.to,
    subject: options.subject,
    template: options.template
    // attachments: [
    //   {
    //     fileName: "logoDualconseils.png",
    //     filePath: "assets/images/logoDualconseils.png",
    //     cid: "logo@PERP163.fr",
    //   }
    // ]
  };

  if(typeof data === "undefined" || data === null) {
     data = { };
  }

  var emailerObj = new emailer(opts, data);
  emailerObj.send(function (err, result) {
    if(err) {
      console.log(err);
    }
  });
};