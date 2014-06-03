$(document).ready(function() {
	var MaxInputs       = 3; //maximum input boxes allowed
	var InputsWrapper   = $("#bankAccountInputWrapper"); //Input boxes wrapper ID
	var AddButton       = $("#addBankAccountInput"); //Add button ID

	var x = InputsWrapper.length+1; //initial text box count
	var FieldCount=1; //to keep track of text box added

	$(AddButton).click(function (e)  //on add input button click
	{
	        if(x <= MaxInputs) //max input box allowed
	        {
	            FieldCount++; //text box added increment

	            // Retrieve data
			    var data = $(AddButton).attr('data-subject');
			    data = JSON.parse(data);

			    // Get userId and translated labels
			    var userId = data.userId;
			    var label = data.label;

			    // Get user with an AJAX call on Sails REST JSON API, using userId
			    var url = "/user/" + userId;
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
				    var obj = {
				    	user: data,
				      	label: label,
				      	count: x
				    };

				   	// Add the template
				   	$(InputsWrapper).append(JST['assets/linker/templates/addUserBankAccount.ejs']( obj ));

					// Keep track of the number of accounts
					$("input[name=nbOfAccounts]").val(x);

		            x++; //text box increment

		            // if max is reached remove the button to add accounts
		            if(x > MaxInputs) {
		            	$(InputsWrapper).next().remove();
		            	$(InputsWrapper).append('<div class="form-group" id="maxBankAcccountReached"><div class="col-md-12"><h5>' + label.maxReached + '</h5></div></div>');
					}	
				});
			}
	return false;
	});

	//user click on remove text
	$("body").on("click",".removeBankAccountclass", function(e) { 
		if( x > 1 ) {
			//remove bank accounts div
			$(this).parent().parent().parent().parent().parent().remove(); 
			x--; //decrement textbox
			// Keep track of the number of accounts
			$("input[name=nbOfAccounts]").val(x-1);
		}

		// if max is not reached remove the warning label
		if(x <= MaxInputs) {
			$("#maxBankAcccountReached").remove();
		}

		return false;
	});

});