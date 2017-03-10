const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
  return gulp.src('./public/css/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
    }))
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