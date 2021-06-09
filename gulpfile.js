const { src, dest, watch, series, parallel } gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

// path variaveis
const files = {
    scssPath: 'app/scss/**/*.scss',
    jsPath: 'app/js/**/*.js'
}

//compilar SCSS para css
function scssTask(){
    return src(files.scssPath)
    // Onde está o arquivo sass
  // passa esse arquivo para o compilador sass
  .pipe(sass())
  .pipe(sourcemaps.init())
  .pipe(postcss({ autoprefixer(), cssnano() }))
  .pipe(sourcemaps.write('.'))
  .pipe(dest('dist')
  .pipe(browserSync.stream()
  );
}

function jsTask(){
    return src(files.jsPath)
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(dest('dist')
    );

}
const cbString = new Date().getTime();
function cacheBustTask(){
    return src(['index.html'])
    .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
    .pipe(dest('.')
    );
}

function watchTask(){
    watch([files.scssPath, files.jsPath]),
        parallel(scssTask, jsTask));
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

  
    gulp.watch('./*html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.default = series(
    parallel(scssTask, jsTask),
    cacheBustTask,
    watchTask
);

exports.style = style;
exports.watch = watch;