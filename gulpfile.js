var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');

gulp.task('default', ['sassify', 'watch']);

gulp.task('watch', function() {
  gulp.watch('./sass/**/*.scss', ['sassify']);
});

gulp.task('sassify', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});