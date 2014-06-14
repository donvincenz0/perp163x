  $(function() {
    $( "#datepickerBirthday" ).datepicker({
    	dateFormat: "yy/mm/dd",
    	defaultDate: "-30y",
    	changeYear: true,
    	changeMonth: true
    });
    $( ".datepicker" ).datepicker({
      dateFormat: "yy/mm/dd",
    	changeYear: true,
    	changeMonth: true  	
    });
  });