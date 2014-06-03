/**
 * Allocation
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

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
