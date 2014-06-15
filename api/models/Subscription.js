/**
* Subscription.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,
  
  attributes: {
  	
  	// Benifiaries and Transfers
  	beneficiariesInCaseOfDeath: {
  		type: 'string',
  		required: true
  	},

  	plannedTransferAmount: {
  		type: 'integer'
  	},

  	plannedTransferPeriod: {
  		type: 'string'
  	},

  	plannedTransferDayOfMonth: {
  		type: 'DATE'
  	},

  	unrestrictedTransferAmount: {
  		type: 'integer'
  	},

  	totalAmountForSubscription: {
  		type: 'integer'
  	},
    
    // Arbitrage Options
    floorOptionInCaseOfDeath: {
    	type: 'boolean',
    	defaultsTo: false
    },

    freeAllocations: {
    	type: 'array'
    },

    progressiveAndAutoSecurizationOfSavings: {
    	type: 'boolean',
    	defaultsTo: false
    },

    progressiveInvestment: {
    	type: 'boolean',
    	defaultsTo: false    	
    },

    progressiveInvestmentMonthlyAmount: {
    	type: 'integer'
    },

    progressiveInvestmentMonthlyTransfers: {
    	type: 'integer'
    },

    progressiveInvestmentAllocations: {
    	type: 'array'
    },

    autoArbitrageOnGain: {
    	type: 'boolean',
    	defaultsTo: false    	
    },

    autoArbitrageOnGainThreshold: {
    	type: 'int',
    	min: 10
    },

    autoArbitrageOnGainAllocations: {
    	type: 'array'
    },

    autoArbitrageOnDepreciation: {
    	type: 'boolean',
    	defaultsTo: false    	
    },

    autoArbitrageOnDepreciationAbsolute: {
    	type: 'boolean',
    	defaultsTo: false    	
    },

    autoArbitrageOnDepreciationRelative: {
    	type: 'boolean',
    	defaultsTo: false    	
    },

    autoArbitrageOnDepreciationThreshold: {
    	type: 'int',
    	min: 10
    },

    autoArbitrageOnDepreciationAllocations: {
    	type: 'array'
    },

    firstPaymentType: {
    	type: 'string'
    }
  }
};

