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
			for (var i = 0; i < data.length; i++) {
				if (data[i]) {
					console.dir(data[i])
					var dataObj = {
						route_num: data[i][0].route,
						route_variant: data[i][0].variant,
						stop_num: data[i][0].stopNumber,
						minutes_to_arrival: 1, // TODO don't hardcode
						priority: 3 // TODO don't hardcode
					}

					$('.monitor-lockup').append(template(dataObj));
				}
			}
		});
	});


	// for (var i = 0; i < 4; i ++) {
	// 	$('.monitor-lockup').append(template(users[i]));
	// }
});