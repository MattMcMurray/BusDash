$(document).ready(function() {
	var monitorPromise = new Promise( function (resolve, reject) {
		$.get('/api/monitors')
		.done(function(data) {
			resolve(data)
		})
		.fail(function(data) {
			reject(data);
		});
	});

	var transitPromises = [];
	monitorPromise
	.then(function(data) {
		for (var i = 0; i < data.length; i++) {
			transitPromises.push(new Promise(function(resolve, reject) {
				var requestURI = `/api/stopSchedule?stop=${data[i].stop}&route=${data[i].route}`
				$.get(requestURI)
				.done(function(transitData) {
					resolve(transitData);
				})
				.fail(function(reason) {
					reject(reason);
				});
			}));
		}

		Promise.all(transitPromises).then(function(data) {
			var dataObjArray = []
			for (var i = 0; i < data.length; i++) {
				if (data[i]) {
					var priority = 0; // Default to lowest priority
					var arrivalTime = moment(data[i][0].arrival).subtract(5, 'minutes');
					var now = moment(new Date());
					var difference = arrivalTime.diff(now, 'minutes');
					if (difference < 30 && difference >= 15) {
						priority = 1;
					} else if (difference < 15 && difference >= 5) {
						priority = 2;
					} else if (difference < 5) {
						priority = 3
					}
					var dataObj = {
						route_num: data[i][0].route,
						route_variant: data[i][0].variant,
						stop_num: data[i][0].stopNumber,
						minutes_to_arrival: moment(data[i][0].arrival).subtract(5, 'minutes').fromNow(), // TODO don't hardcode
						priority: priority
					}
					dataObjArray.push(dataObj);
				}
			}

			$('.monitor-lockup').append(template(dataObj));
		});
	});
});