$(document).ready(function(){
	
	// Validate

	$('.form-signin1').validate({
		rules: {
			lastname: {
				required: true
			},
			firstname: {
				required: true
			},
			email: {
				required: true,
				email: true
			},
			password: {
				minlength: 6,
				required: true
			},
			confirmation: {
				minlength: 6,
				//equalTo: "#password"
			}
		},
		success: function(element) {
			element
			.text('OK!').addClass('valid')
		}
	});

});