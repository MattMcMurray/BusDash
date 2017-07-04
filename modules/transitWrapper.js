const dotenv = require('dotenv');
const unirest = require('unirest');
const moment = require('moment');

const API_KEY_Q = `api-key=${process.env.WINNIPEG_TRANSIT_KEY}`;
const BASE_URI = "https://api.winnipegtransit.com/v2"

// stopNum: Number
// routes: Number or Array
function getStopScheduleURI(stopNum, routes) {

  var routeList = routes
  if (typeof routes === 'object') {
    routeList = routes.toString();
  }

  return `${BASE_URI}/stops/${stopNum}/schedule.json?route=${routeList}`
}

// Returns a nicely formatted array with only the info we need
function getSimpleStopSchedule(stopNum, routes) {
  var simpleResults = []
  var stopNumber = null;

  return getStopSchedule(stopNum, routes, 5)
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
  })
  .catch(function(reason) {
    return null;
  });
}

function getStopSchedule(stopNum, routes, maxPerRoute) {
  var scheduleURI = getStopScheduleURI(stopNum, routes);
  var now = moment().add(2, 'minutes').toISOString();

  return new Promise(function(resolve, reject) {
    unirest
    .get(scheduleURI)
    .query(API_KEY_Q)
    .query(`max-results-per-route=${maxPerRoute || 1}`)
    .query(`start=${now}`)
    .end(function (response) {
      if (response.error){
        return reject(response);
      }
      return resolve(response);
    });
  })
}

function getStopInfo(stopNum) {
  var requestURI = `${BASE_URI}/stops/${stopNum}.json?usage=long&${API_KEY_Q}`
  return new Promise((resolve, reject) => {
    unirest
      .get(requestURI)
      .query('usage', 'long')
      .query(API_KEY_Q)
      .end(response => {
        if (response.error){
          return reject(response);
        }
        return resolve(response);
      })
  });
}

module.exports = {
  getStopSchedule,
  getSimpleStopSchedule,
  getStopInfo
}
