$(document).ready(function() {
	$('#config_form').submit(function(event) {
		event.preventDefault();

        var route = $('#input_route').val();
        var stop = $('#input_stop').val();
        var start = $('#input_start').val();
        var recurring = $('#input_recurring').val();

	    var formData = {
            'route': route,
            'stop': stop,
            'start_at': start,
            'isRecurring': recurring
        };

        if (route && stop && start) {
            $.post('/api/monitors', formData, function(result) {
                if (result !== 'OK') {
                    $('#failure').show('slow')
                    $('#success').hide('slow')
                    console.log(result);
                } else {
                    $('#success').show('slow')
                    $('#failure').hide('slow')
                }

                window.setTimeout(function() {
                    $('#success').hide('slow')
                    $('#failure').hide('slow')
                }, 5000)
            });
        } else {
            $('#warning').show('slow')
            window.setTimeout(function() {
                $('#warning').hide('slow')
            }, 5000)
        }

	});
});