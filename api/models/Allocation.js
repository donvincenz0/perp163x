/**
* Allocation.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,
  
  attributes: {
  	
  	type: {
  		type: 'string'
  	},

  	supportName: {
		type: 'string'
  	},

  	ISIN: {
  		type: 'string',
  		alphanumeric: true,
  		len: 12
  	},

  	initialAmount: {
  		type: 'integer'
  	},

  	plannedAmount: {
  		type: 'integer'
  	}
  }

};