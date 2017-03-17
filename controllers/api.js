'use strict';

const GitHub = require('github');
const Monitor = require('../models/Monitor');

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

  const monitor = new Monitor({
    route: req.body.route,
    stop: req.body.stop,
    user: req.user,
    isRecurring: [true,true,true,true,true,false,false], //hardcoded to be every weekday
    start_at: req.body.start_at,
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
 * @api {get} /monitors Get ALL monitors
 * @apiName GetAllMonitors
 * @apiGroup monitor
 *
 * @apiSuccess {Object} monitors All monitors
 */
exports.getAllMonitors = (req, res, next) => {
  if (!req.user) return res.sendStatus(403);
  Monitor.find({}, (err, results) => {
    if (err) { return next(err); }
    res.json(results);
  });
}
