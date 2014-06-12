$(document).ready(function() {
	var MaxInputs       = 2; // maximum nb of accounts allowed
	var InputsWrapper   = $("#bankAccountInputWrapper"); // Input boxes wrapper ID
	var AddButton       = $("#addBankAccountInput"); // Add button ID

	$(AddButton).click(function (e)  //on add input button click
	{
	    // Get data from the view user/edit.ejs
	    var data = $(AddButton).attr('data-subject');
	    data = JSON.parse(data);

	    // Get Labels
	    var label = data.label;	
		var obj = null;

		// Get index of accounts array, to keep track of accounts created
		var indexAccountArray = $("input[name=indexOfAccounts]").attr('data-accounts-index').split(",");
		// Sort the array and get the last account number that exists
		indexAccountArray.sort();
		var indexAccount = (indexAccountArray[indexAccountArray.length-1].split("_"))[1];

	    // Get user with an AJAX call on Sails REST JSON API, using userId
	    var url = "/user/" + data.userId;
	    $.ajax({
	    	type: "GET",
	    	dataType: "json",
		 	url: url,
	    	error: function (data, textStatus) {
	    		console.log("AJAX error with the following URL: " + url);
	    		console.log("AJAX error : " + textStatus);
	    		console.log("AJAX call data: " + JSON.stringify(data));
	    	}
		}).done(function (data) {
			// obj is going to encompass user and label data
		    obj = {
		    	user: data,
		      	label: label,
		      	//count: indexAccount // initial number of accounts
		    };

		    if(indexAccountArray.length < MaxInputs) //max input box allowed
		    {
		    	// Increment number of accounts
	            indexAccount++;
	            // Adjust number of account to be displayed
		    	obj.count = indexAccount;

			   	// Add the template
			   	$(InputsWrapper).append(JST['assets/templates/user/edit_addBankAccount.ejs']( obj ));

				// Push the new account in the index of accounts array and the hidden input field
				indexAccountArray.push("account_" + indexAccount);
				$("input[name=indexOfAccounts]").attr('data-accounts-index', indexAccountArray);
				$("input[name=nbOfAccounts]").val(indexAccountArray.length);

	            // if max is reached remove the button to add accounts
	            if(indexAccountArray.length >= MaxInputs) {
	            	$(InputsWrapper).next().remove();
	            	$(InputsWrapper).append('<div class="form-group" id="maxBankAcccountReached"><div class="col-md-12"><h5>' + label.maxReached + '</h5></div></div>');
				}
			}
		});

		return false;
	});

	//user click on remove text
	$("body").on("click",".removeBankAccountclass", function(e) { 
		// Get index of accounts array, to keep track of accounts created
		var indexAccountArray = $("input[name=indexOfAccounts]").attr('data-accounts-index').split(",");

		if (indexAccountArray.length <= 1) {
			// do nothing, case where the user tries to remove the last account shown on screen (forbidden)
		} else { 
			var accountToRemove = $(this).attr('id');
			// Remove the account in the index of accounts array and the hidden input field
			for(countIndexAccount=0; countIndexAccount < indexAccountArray.length; countIndexAccount++) {
				if(indexAccountArray[countIndexAccount] === accountToRemove) { 
					indexAccountArray.splice(countIndexAccount, 1);
				}
			}

			// Update index of accounts array after above removal
			$("input[name=indexOfAccounts]").attr('data-accounts-index', indexAccountArray);
			$("input[name=nbOfAccounts]").val(indexAccountArray.length);

			// remove account div
			$(this).parent().parent().parent().parent().remove();

			// if max is not reached remove the warning label
			if(indexAccountArray.length <= MaxInputs) {
				$("#maxBankAcccountReached").remove();
			}
		}


		return false;
	});

});