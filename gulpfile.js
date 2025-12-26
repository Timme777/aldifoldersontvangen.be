'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var pump = require('pump');
var livereload = require('gulp-livereload');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('./themes/custom/konnucustom/sass/base.scss')
    .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
    .pipe(gulp.dest('./themes/custom/konnucustom/css/theme'))
    .pipe(livereload());
});

gulp.task('compress', function (cb) {
  pump([
        gulp.src('./themes/custom/konnucustom/lib/*.js'),
        uglify(),
        gulp.dest('./themes/custom/konnucustom/js')
    ],
    cb
  );
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('./themes/custom/konnucustom/sass/*.scss', gulp.series('sass'));
  gulp.watch('./themes/custom/konnucustom/lib/*.js', gulp.series('compress'));
});

gulp.task('default', gulp.series('watch'));

