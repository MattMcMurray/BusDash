$(document).ready(function() {
	$('#config_form').submit(function(event) {
		event.preventDefault();

	    var formData = {
            'route'              : $('#input_route').val(),
            'stop'             : $('#input_stop').val(),
            'start_at'    : $('#input_start').val(),
            'isRecurring'    : $('#input_recurring').val()
        };

        $.post('/api/monitors', formData, function(result) {
        	console.log(result);
        })

	});
});