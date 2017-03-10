const dotenv = require('dotenv');
const unirest = require('unirest');

const apiKeyQuery = `api-key=${process.env.WINNIPEG_TRANSIT_KEY}`;
// stopNum: Number
// routes: Number or Array
function getStopScheduleURI(stopNum, routes) {

  var routeList = routes
  if (typeof routes === 'object') {
    routeList = routes.toString();
  }

  return `https://api.winnipegtransit.com/v2/stops/${stopNum}/schedule.json?route=${routeList}`
}

// Returns a nicely formatted array with only the info we need
function getSimpleStopSchedule(stopNum, routes) {
  var simpleResults = []
  var stopNumber = null;

  return getStopSchedule(stopNum, routes)
  .then(function(res) {
    stopNumber = res.body['stop-schedule'].stop.number;
    var stopList = res.body['stop-schedule']['route-schedules'];
    for (var i=0; i < stopList.length; i ++) {
      var stop = stopList[i];
      var scheduledStops = stop['scheduled-stops'][0];
      var tmp = {
        route: stop.route.number,
        arrival: scheduledStops.times.arrival.estimated,
        variant: scheduledStops.variant.name,
        stopNumber: stopNumber,
      }
      simpleResults.push(tmp);
    }
    return simpleResults;
  });
}

function getStopSchedule(stopNum, routes, maxPerRoute) {
  var scheduleURI = getStopScheduleURI(stopNum, routes);

  return new Promise(function(resolve, reject) {
    unirest
    .get(scheduleURI)
    .query(apiKeyQuery)
    .query(`max-results-per-route=${maxPerRoute || 1}`)
    .end(function (response) {
      if (response.error){
        return reject(response);
      }
      return resolve(response);
    });
  })
}

module.exports = {
  getStopSchedule,
  getSimpleStopSchedule
}
