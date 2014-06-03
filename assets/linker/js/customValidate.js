$(document).ready(function(){
	
	// add * to required field labels
	// $('label.required').append('&nbsp;<strong>*</strong>&nbsp;');

	// Validate the signin form located in the navbar
	$('.navbar-form-signin-validate').validate( {
		rules: {
			email: {
				required: true,
				email: true
			},
			password: {
				minlength: 8,
				required: true
			}
		},
		// This is executed in case of error input
		highlight: function(element, errorClass, validClass) {
			// Highlight element in error color
			$(element).parent().removeClass('has-success has-feedback');
			$(element).parent().addClass('has-error has-feedback');
			
			// Remove success span / Add error span
			var	spanId 		= "#navbar-span-" + element.name;
			$(spanId).remove();
			$(element).parent().append(
				$('<span/>')
					.addClass('glyphicon glyphicon-remove form-control-feedback')
					.attr("id", "navbar-span-" + element.name)
			);
		},
		// This is executed in case of valid input
		unhighlight: function(element, errorClass, validClass) {
			// Highlight element in sucess color
			$(element).parent().removeClass('has-error has-feedback');
			//$(element).parent().addClass('has-success has-feedback');

			// Remove error span / Add success span
			var	spanId 		= "#navbar-span-" + element.name;
			$(spanId).remove();
			// $(element).parent().append(
			// 	$('<span/>')
			// 		.addClass('glyphicon glyphicon-ok form-control-feedback')
			// 		.attr("id", "navbar-span-" + element.name)
			// );
		},
		messages:{
			// Disable error messages since we don't want it to show in the navbar
			"email": "",
			"password":""
		}
	});

	$('.form-validate').validate( {
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
			},
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
			occupation: {
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
			},
			familyAssetsRange: {
				required: true
			}		
		},
		// This is executed in case of error input
		highlight: function(element, errorClass, validClass) {

			// If form input is radio, modify the grand-parent instead of the parent
			var elementParent = $(element).parent();
			var container = elementParent;

 			// Remove success span, if any
			var	spanId = "#span-" + element.name;
			$(spanId).remove();

			// Add error span
			var spanToAdd = $('<span/>').addClass('glyphicon glyphicon-remove form-control-feedback').attr("id", "span-" + element.name);

			if ($(element).is(":radio")) {
				// Adjust the parent element to modify - depending on the type of radio (1 row or multiple rows)
				if($(element).parent().parent().parent().hasClass("form-group")){
					elementParent = $(element).parent().parent();
				} else {
					elementParent = $(element).parent().parent().parent();
				}

				// Adding a new column next the the existing radio buttons column

				// This new column will be the one containing the span
				// Defining the width of this new column
				var divSpanWidth = 2;

				// Since we're adding a new column, we need to resize the existing column which contains the radio buttons
				// Get current column size by reading col-md-* class
				var	divSpanId = "#div-span-" + element.name;
				var divSpanIdLength = $(divSpanId).length;
				console.log('this is my length : ' + divSpanIdLength);
				if($(divSpanId).length > 0) {
					$(divSpanId).remove();
					console.log("div-span removed");
				} else {
					var elementParentColNumber = elementParent.attr('class').match(/col-md-(\d+)/)[1];

					// Remove the existing col-md-* class
					elementParent.removeClass("col-md-" + elementParentColNumber);

					// Reside the column by adding col-md-* with the new smaller width
					elementParent.addClass("col-md-" + (elementParentColNumber-divSpanWidth));
				}

				// Create the new column with the right size, add the span, and add it after the column that contains the radio buttons
				container = $('<div/>').attr("id", "div-span-" + element.name);
				container.addClass('col-md-' + divSpanWidth);
				container.append(spanToAdd);
				elementParent.after(container);

			} else {
				elementParent.append(spanToAdd);
			}

			// Highlight element in error color
			container.removeClass('has-success has-feedback');
			container.addClass('has-error has-feedback');
		},
		// This is executed in case of valid input
		unhighlight: function(element, errorClass, validClass) {			

			// If form input is radio, modify the grand-parent instead of the parent
			var elementParent = $(element).parent();
			var container = elementParent;

			// Remove error span, if any
			var	spanId = "#span-" + element.name;
			$(spanId).remove();

			// Add success span
			var spanToAdd = $('<span/>').addClass('glyphicon glyphicon-ok form-control-feedback').attr("id", "span-" + element.name);

			if ($(element).is(":radio")) {
				// Adjust the parent element to modify - depending on the type of radio (1 row or multiple rows)
				if($(element).parent().parent().parent().hasClass("form-group")){
					elementParent = $(element).parent().parent();
				} else {
					elementParent = $(element).parent().parent().parent();
				}

				// Case where radio buttons are on multiple rows
				if (elementParent.parent().hasClass('row')) {
					elementParent = elementParent.parent().parent();
				}

				// Adding a new column next the the existing radio buttons column

				// This new column will be the one containing the span
				// Defining the width of this new column
				var divSpanWidth = 2;

				// Since we're adding a new column, we need to resize the existing column which contains the radio buttons
				// Get current column size by reading col-md-* class
				var	divSpanId = "#div-span-" + element.name;
				var divSpanIdLength = $(divSpanId).length;
				console.log('this is my length : '+ divSpanIdLength);
				if($(divSpanId).length > 0) {
					$(divSpanId).remove();
					console.log("div-span removed");
				} else {
					var elementParentColNumber = elementParent.attr('class').match(/col-md-(\d+)/)[1];

					// Remove the existing col-md-* class
					elementParent.removeClass("col-md-" + elementParentColNumber);

					// Reside the column by adding col-md-* with the new smaller width
					elementParent.addClass("col-md-" + (elementParentColNumber-divSpanWidth));
				}

				// Create the new column with the right size, add the span, and add it after the column that contains the radio buttons
				container = $('<div/>').attr("id", "div-span-" + element.name);
				container.addClass('col-md-' + divSpanWidth);
				container.append(spanToAdd);
				elementParent.after(container);

			} else {
				elementParent.append(spanToAdd);
			}
			
			// Highlight element in sucess color
			container.removeClass('has-error has-feedback');
			container.addClass('has-success has-feedback');			
		},
		messages:{
			// Disable error messages for radio buttons
			"title": "",
			"maritalStatus":"",
			"socialRegime":"",
			"familyYearlyGrossIncomeRange":"",
			"familyAssetsRange":"",
		}
	});
});