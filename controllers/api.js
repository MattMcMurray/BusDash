'use strict';

const GitHub = require('github');
const Monitor = require('../models/Monitor');
const moment = require('moment');
const transit = require('../modules/transitWrapper');

/**
 * GET /api/github
 * GitHub API Example.
 */
exports.getGithub = (req, res, next) => {
  const github = new GitHub();
  github.repos.get({ user: 'sahat', repo: 'hackathon-starter' }, (err, repo) => {
    if (err) { return next(err); }
    res.render('api/github', {
      title: 'GitHub API',
      repo
    });
  });
};

/**
 * GET /api/upload
 * File Upload API example.
 */

exports.getFileUpload = (req, res) => {
  res.render('api/upload', {
    title: 'File Upload'
  });
};

exports.postFileUpload = (req, res) => {
  req.flash('success', { msg: 'File was uploaded successfully.' });
  res.redirect('/api/upload');
};

/**
 * Transit API stuff goes here
 *
 */


 /**
  * Monitor API stuff goes here
  *
  */

  /**
   * @api {post} /monitors/ create new monitor
   * @apiName CreateMonitor
   * @apiGroup monitor
   *
   * @apiParam {Number} route Route Number you want to monitor
   * @apiParam {Number} stop Stop Number you want to monitor
   * @apiParam {Date} start_at The time at which the Monitor should start
   *
   */
exports.postMonitor = (req, res, next) => {
  if (!req.user) return res.sendStatus(403);
  req.assert('route', 'route must be a number').isNumeric();
  req.assert('stop', 'Stop must be a number').isNumeric();
  req.assert('stop', 'Stop must be a 5 digits').len(5);

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/account');
  }

  const mTime = moment(req.body.start_at);
  const timestring = mTime.toISOString();

  // NOTE: Day 0 is Sunday, Day 6 is Saturday in isRecurring
  // This uses the same format as moment
  const monitor = new Monitor({
    route: req.body.route,
    stop: req.body.stop,
    user: req.user,
    isRecurring: [false,true,true,true,true,true,false], //hardcoded to be every weekday
    start_at: moment(timestring).format('HH:mm'),
    duration: 60,
  })

  Monitor.findOne({route: monitor.route, stop: monitor.stop, user: monitor.user}, (err,something) => {
    if (err) { return next(err); }

    monitor.save((err) => {
      if (err) { return next(err); }
      res.sendStatus(200);
    });
  });
}

/**
 * @api {get} /monitors/me Get all your monitors
 * @apiName GetMyMonitors
 * @apiGroup monitor
 *
 * @apiSuccess {Object} monitor Your monitors
 */
exports.getMyMonitors = (req, res, next) => {
  if (!req.user) return res.sendStatus(403);
  Monitor.find({user: req.user}, (err, results) => {
    if (err) { return next(err); }
    res.json(results);
  })
}

/**
 * @api {get} /monitors/raw Get ALL monitors with no user info
 * @apiName GetAllRawMonitors
 * @apiGroup monitor
 *
 * @apiSuccess {Object} monitors All monitors
 */
exports.getAllMonitorsRaw = (req, res, next) => {
  if (!req.user) return res.sendStatus(403);
  Monitor.find({}, (err, results) => {
    if (err) { return next(err); }
    res.json(results);
  });
}

/**
 * @api {get} /monitors Get ALL monitors with user info
 * @apiName GetAllMonitors
 * @apiGroup monitor
 *
 * @apiSuccess {Object} monitors All monitors
 */
exports.getAllMonitors = (req, res, next) => {
  if (!req.user) return res.sendStatus(403);
  Monitor.find({})
  .populate('user', 'profile')
  .exec((err, results) => {
   if (err) { return next(err); }
   res.json(results);
  });
}

/**

 * @api {get} /monitors/active Get ALL active monitors
 * @apiName GetAllActiveMonitors
 * @apiGroup monitor
 *
 * @apiSuccess {Object} monitors All monitors
 */
exports.getAllMonitorsActive = (req, res, next) => {
  if (!req.user) return res.sendStatus(403);

  // Grab monitors that started up to one hour ago (gives some wiggle room)
  // And up to one hour away.
  const hourAgo = moment().subtract(1, 'hour').format('HH:mm');
  const hourAway = moment().add(1, 'hour').format('HH:mm');
  const todayIndex = moment().day();

  // Finds all the monitors that should recur today
  // From up to an hour ago to an hour away
  Monitor.find()
  .where('start_at').gt(hourAgo)
  .where('start_at').lt(hourAway)
  .where(`isRecurring.${todayIndex}`).equals(true)
  .populate('user', 'profile')
  .exec((err, results) => {
   if (err) { return next(err); }
   res.json(results);
  });
}

exports.getStopSchedule = (req, res, next) => {
  if (!req.user) return res.sendStatus(403);
  if (req.query.route && req.query.stop) {
    transit.getSimpleStopSchedule(req.query.stop, req.query.route)
    .then(function(results) {
      if (results) {
        res.json(results);
      } else {
        console.dir('Problem with Transit API request');
        console.dir('Most likely a non-existent stop or route #');
        res.sendStatus(204); // jquery is a bitch and anything not 2XX is rejected/a failure
      }
    })
    .catch(function(reason) {
      res.sendStatus(500);
    });
  }
}
