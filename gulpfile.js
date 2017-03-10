const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');

gulp.task('clientside-views', function buildHTML() {
  return gulp.src('./views/clientside/*.pug')
  .pipe(pug({
  	client: true
  }))
  .pipe(gulp.dest('./public/js/'))
});

gulp.task('clientside:watch', function () {
  gulp.watch('./views/clientside/*.pug', ['clientside-views']);
});

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

gulp.task('nodemon', ['sass:watch', 'clientside:watch'], function (cb) {
    var callbackCalled = false;
    return nodemon({script: './app.js'}).on('start', function () {
        if (!callbackCalled) {
            callbackCalled = true;
            cb();
        }
    });
});