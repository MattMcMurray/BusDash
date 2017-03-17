$(document).ready(function() {
	if (getParameterByName('hideNav') === 'true') {
		$('#navlinks').hide();
		$('.navbar-toggle').hide();
	}
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
				var user = data[i].user;
				$.get(requestURI)
				.done(function(transitData) {
					if (transitData) {
						transitData.user = user;
					}
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
				if (data[i] && data[i].length > 0) {
					var priority = 0; // Default to lowest priority
					var arrivalTime = moment(data[i][0].arrival).subtract(5, 'minutes');
					var now = moment(new Date());
					var difference = arrivalTime.diff(now, 'minutes');
					if (difference < 30 && difference >= 15) {
						priority = 1;
					} else if (difference < 15 && difference >= 5	) {
						priority = 2;
					} else if (difference < 5) {
						priority = 3
					}
					if (difference > 0) {
						var dataObj = {
							route_num: data[i][0].route,
							route_variant: data[i][0].variant,
							stop_num: data[i][0].stopNumber,
							arrival_time: data[i][0].arrival,
							minutes_to_arrival: moment(data[i][0].arrival).subtract(5, 'minutes').fromNow(), // TODO don't hardcode
							priority: priority,
							image: data[i].user[0].profile.picture
						}
						dataObjArray.push(dataObj);
					}
				}
			}

			dataObjArray.sort(function(a, b) {
				return new Date(a.arrival_time).getTime() - new Date(b.arrival_time).getTime();
			})
			for (var i = 0; i < dataObjArray.length; i++) {
				if (dataObjArray[i].route_num >= 100) {
					dataObjArray[i].small_font = 'small-font';
				}
				$('.monitor-lockup').append(template(dataObjArray[i]));
			}
		});
	});

	if (getParameterByName('refresh') === 'true') {
		window.setTimeout(function() { location.reload(); }, 60000);
	}
});

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}