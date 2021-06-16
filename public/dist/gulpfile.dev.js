"use strict";

var gulp = require('gulp');

var sass = require('gulp-sass');

var autoprefixer = require('autoprefixer');

var cssnano = require('cssnano');

var concat = require('gulp-concat');

var postcss = require('gulp-postcss');

var replace = require('gulp-replace');

var sourcemaps = require('gulp-sourcemaps');

var uglify = require('gulp-uglify');

var browserSync = require('browser-sync').create(); //compilar SCSS para css


function style() {
  // Onde está o arquivo sass
  return gulp.src('./scss/**/*.scss') // passa esse arquivo para o compilador sass
  .pipe(sass()) // Onde salvou o arquivo css compilado
  .pipe(gulp.dest('./css')) // aciona mudanças para todos os browsers
  .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./scss/**/*.scss', style);
  gulp.watch('./*html').on('change', browserSync.reload);
  gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;