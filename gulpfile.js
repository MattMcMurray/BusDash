var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');


gulp.task('sass', function () {
  return gulp.src('./public/css/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./public/css/'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./public/css/*.scss', ['sass']);
});

gulp.task('nodemon', ['sass:watch'], function (cb) {
    var callbackCalled = false;
    return nodemon({script: './app.js'}).on('start', function () {
        if (!callbackCalled) {
            callbackCalled = true;
            cb();
        }
    });
});