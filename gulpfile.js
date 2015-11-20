var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var scss         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS    = require('gulp-minify-css');
var notify       = require('gulp-notify');
var gutil        = require('gulp-util');
var cp           = require('child_process');
var path         = require('path');
var uglify       = require('gulp-uglify');
var imagemin     = require('gulp-imagemin');
var pngquant     = require('imagemin-pngquant');
var haml         = require("gulp-haml");

gulp.task('default', function() {
  return gutil.log('Gulp is running!');
});

// Compile haml
gulp.task('haml', function(){
  gulp.src("./*.haml")
    .pipe(haml())
    .pipe(gulp.dest("./"))
    .pipe(notify('Haml Compiled'));
});

// Static Server + watching scss/html files
gulp.task('serve', ['scss'], function() {
  browserSync.init({
      server: "./"
  });
  gulp.watch("css/*.scss", ['scss']);
  gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile Sass
gulp.task('scss', function () {
  gulp.src('css/*.scss')
  .pipe(scss({
    paths: [ path.join(__dirname, 'scss', 'includes') ]
  }))
  .pipe(scss({compress: true}).on('error', gutil.log))
  .pipe(autoprefixer('last 10 versions', 'ie 9'))
  .pipe(minifyCSS({keepBreaks: false}))
  .pipe(gulp.dest('css'))
  .pipe(notify('Sass Compiled, Prefixed and Minified'))
  .pipe(browserSync.stream());
});

// Watch files
gulp.task('watch', function () {
  gulp.watch('css/**/*.scss', ['scss']);
  gulp.watch('*.haml', ['haml']);
  gulp.watch(['index.html', 'js/**/*', 'img/*']);
});

gulp.task('default', ['haml', 'watch', 'serve']);
