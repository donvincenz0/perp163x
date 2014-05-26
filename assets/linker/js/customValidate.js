$(document).ready(function(){
	
	// add * to required field labels
	//$('label.required').append('&nbsp;<strong>*</strong>&nbsp;');

	// Validate
	$('.form-signin').validate( {
		rules: {
			email: {
				required: true,
				email: true
			},
			password: {
				minlength: 8,
				required: true
			},
			confirmation: {
				minlength: 8,
				equalTo: "#password"
			}
		},
		// This is executed in case of error input
		highlight: function(element, errorClass, validClass) {
			// Highlight element in error color
			$(element).parent().removeClass('has-success has-feedback');
			$(element).parent().addClass('has-error has-feedback');
			
			// Remove success span / Add error span
			var	spanId 		= "#span-" + element.name;
			$(spanId).remove();
			$(element).parent().append(
				$('<span/>')
					.addClass('glyphicon glyphicon-remove form-control-feedback')
					.attr("id", "span-" + element.name)
			);
		},
		// This is executed in case of valid input
		unhighlight: function(element, errorClass, validClass) {
			// Highlight element in sucess color
			$(element).parent().removeClass('has-error has-feedback');
			$(element).parent().addClass('has-success has-feedback');

			// Remove error span / Add success span
			var	spanId 		= "#span-" + element.name;
			$(spanId).remove();
			$(element).parent().append(
				$('<span/>')
					.addClass('glyphicon glyphicon-ok form-control-feedback')
					.attr("id", "span-" + element.name)
			);
		}
	});

	$('.form-user-edit').validate( {
		invalidHandler: function(event, validator) {
			// 'this' refers to the form
			var errors = validator.numberOfInvalids();
			if (errors) {
				var message = errors == 1
					? 'You missed 1 field. It has been highlighted'
					: 'You missed ' + errors + ' fields. They have been highlighted';
				$("div.error span").html(message);
				$("div.error").show();
			} else {
				$("div.error").hide();
			}
		},
		errorPlacement: function(error, element) {
			if (element.attr("name") == "fname" || element.attr("name") == "lname" ) {
			  error.insertAfter("#lastname");
			} else {
			  error.insertAfter(element);
			}
		},
		rules: {
			title: {
				required: true
			},
			lastname: {
				required: true
			},
			firstname: {
				required: true
			},
			maidenName: {
				
			},
			birthDate: {
				required: true,
				dateISO: true
			},
			birthPlace: {
				required: true
			},
			birthDepartment: {
				required: true
			},
			addressStreetNumber: {
				required: true
			},
			addressStreet: {
				required: true
			},
			postalCode: {
				required: true
			},
			city: {
				required: true
			},
			country: {
				required: true
			},
			phoneNumberHome: {
				required: false
			},
			phoneNumberMobile: {
				required: true
			},
			idCardType: {
				required: true
			},
			idCardExpirationDate: {
				required: true,
				dateISO: true
			},
			idCardNumber: {
				required: true
			},
			idCardIssuanceCity: {
				required: true
			},
			idCardIssuanceCountry: {
				required: true
			},
			idCardIssuanceDate: {
				required: true,
				dateISO: true
			},
			idCardIssuanceAuthority: {
				required: true
			},
			nationality: {
				required: true
			},
			maritalStatus: {
				required: true
			},
			matrimonialRegime: {
				required: true
			},
			jobTitle: {
				required: true
			},
			socialRegime: {
				required: true
			},
			jobTypeOfIndustry: {
				required: true
			},
			expectedRetirementAge: {
				required: true,
				number: true
			},
			familyYearlyGrossIncomeRange: {
				required: true
			}			
		},
		// This is executed in case of error input
		highlight: function(element, errorClass, validClass) {
			// Highlight element in error color
			$(element).parent().removeClass('has-success has-feedback');
			$(element).parent().addClass('has-error has-feedback');
			
			// Remove success span / Add error span
			var	spanId = "#span-" + element.name;
			$(spanId).remove();
			$(element).parent().append(
				$('<span/>')
					.addClass('glyphicon glyphicon-remove form-control-feedback')
					.attr("id", "span-" + element.name)
			);
		},
		// This is executed in case of valid input
		unhighlight: function(element, errorClass, validClass) {			
			// Highlight element in sucess color
			$(element).parent().removeClass('has-error has-feedback');
			$(element).parent().addClass('has-success has-feedback');

			// Remove error span / Add success span
			var	spanId = "#span-" + element.name;
			$(spanId).remove();
			$(element).parent().append(
				$('<span/>')
					.addClass('glyphicon glyphicon-ok form-control-feedback')
					.attr("id", "span-" + element.name)
			);
		}
	});
});