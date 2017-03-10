$(document).ready(function() {
	var users = [
		{
			route_num: 19,
			route_variant: 'Marion via Autumnwood',
			stop_num: 'XXXXX',
			minutes_to_arrival: 3,
			priority: 3
		},
		{
			route_num: 18,
			route_variant: 'Maples via Corydon',
			stop_num: 'XXXXX',
			minutes_to_arrival: 11,
			priority: 2
		},
		{
			route_num: 161,
			route_variant: 'University of Manitoba',
			stop_num: 'XXXXX',
			minutes_to_arrival: 22,
			priority: 1
		},
		{
			image: 'https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png',
			route_num: 161,
			route_variant: 'University of Manitoba',
			stop_num: 'XXXXX',
			minutes_to_arrival: 35,
			priority: 0
		}
	];
	for (var i = 0; i < 4; i ++) {
		$('.monitor-lockup').append(template(users[i]));
	}
});