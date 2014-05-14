/**
 * User
 *
 * @module      :: Model
 * @description :: Represents a user of the site
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

  	schema: true,

	lastname: {
		type: 'string',
		required: true
	},

	firstname: {
		type: 'string',
		required: true
	},

	maidenName: {
		type: 'string'
	}

	email: {
		type: 'string',
		email: true,
		required: true,
		unique: true
	},

	encryptedPassword:{
		type: 'string',
	},

	online: {
		type: 'boolean',
		defaultsTo: false
	},

	admin: {
		type: 'boolean',
		defaultsTo: false
	},
    
	birthDate: {
		type: 'DATE'		
	},

	birthCity: {
		type: 'string'
	},

	birthDepartment: {
		type: 'string'
	},

	addressStreetNumber: {
		type: 'string'
	},

	addressStreet: {
		type: 'string'
	},

	postalCode: {
		type: 'string'
	},

	city: {
		type: 'string'
	},

	country: {
		type: 'string'
	},

	phoneNumberHome: {
		type: 'string'
	},

	phoneNumberMobile: {
		type: 'string'
	},

	idCardType: {
		type: 'string'
	},

	idCardExpirationDate: {
		type: 'DATE'
	},

	idCardNumber: {
		type: 'string'
	},

	idCardDeliveryCity: {
		type: 'string'
	},

	idCardDeliveryCountry: {
		type: 'string'
	},

	idCardDeliveryAuthority: {
		type: 'string'
	},

	nationality: {
		type: 'string'
	},

	maritalStatus: {
		type: 'string'
	},

	matrimonialRegime: {
		type: 'string'
	},

	jobTitle: {
		type: 'string'
	},

	socialRegime: {
		type: 'string'
	},

	// In french: Secteur d'activité
	jobTypeOfIndustry: {
		type: 'string'
	},

	expectedRetirementAge: {
		type: 'integer',
		defaultTo: 67
	},

	// In french: revenus brut annuel du foyer
	familyYearlyGrossIncomeRange: {
		type: 'string'
	}

	//toJSON: function() {
	//	var obj = this.toObject();
	//	delete obj.password;
	//	delete obj.confirmation;
	//	delete obj._csrf;
	//	return obj;
	//}

  },

  beforeValidation: function (values, next) {
  	console.log(values)
  	if (typeof values.admin !== 'undefined') {
  		if (values.admin === 'unchecked') {
  			values.admin = false;
  		} else if (values.admin[1] === 'on') {
			values.admin = true;
		}
  	}
  	next();
  },

  beforeCreate: function (values, next) {

  	// This checks to make sure the password and password confirmation match before creating record
  	if(!values.password || values.password != values.confirmation) {
  		return next({err: ["Le mot de passe est différent du mot de passe de confirmation."]});
  	}
  	
	require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
		if(err) return next(err);

		values.encryptedPassword = encryptedPassword;
		next();
	});
  	
  }

};
