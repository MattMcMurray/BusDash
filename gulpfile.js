var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('nodemon', function (cb) {
    var callbackCalled = false;
    nodemon({script: './app.js'}).on('start', function () {
        if (!callbackCalled) {
            callbackCalled = true;
            cb();
        }
    });
});