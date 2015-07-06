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
var slim         = require("gulp-slim");

gulp.task('default', function() {
  return gutil.log('Gulp is running!')
});

// Compile slim
gulp.task('slim', function(){
  gulp.src("source/*.slim")
    .pipe(slim({
      pretty: true
    }))
    .pipe(gulp.dest("html"))
    .pipe(notify('Slim Compiled'));
});

// Minifiy js
gulp.task('compress', function() {
  gulp.src('source/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('html/js/'))
});

// Minifiy images
gulp.task('images', function () {
  return gulp.src('source/img/*')
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }))
  .pipe(gulp.dest('html/img'));
});

// Static Server + watching scss/html files
gulp.task('serve', ['scss'], function() {
  browserSync.init({
      server: "html"
  });
  gulp.watch("source/scss/*.scss", ['scss']);
  gulp.watch("html/*.html").on('change', browserSync.reload);
});

// Compile Sass
gulp.task('scss', function () {
  gulp.src('source/css/*.scss')
  .pipe(scss({
    paths: [ path.join(__dirname, 'scss', 'includes') ]
  }))
  .pipe(scss({compress: true}).on('error', gutil.log))
  .pipe(autoprefixer('last 10 versions', 'ie 9'))
  .pipe(minifyCSS({keepBreaks: false}))
  .pipe(gulp.dest('html/css'))
  .pipe(notify('Sass Compiled, Prefixed and Minified'))
  .pipe(browserSync.stream());
});

// Watch files
gulp.task('watch', function () {
  gulp.watch('source/css/**/*.scss', ['scss']);
  gulp.watch('source/*.slim', ['slim']);
  gulp.watch(['html/index.html', 'html/js/**/*', 'source/img/*']);
});

gulp.task('default', ['slim', 'images', 'watch', 'compress', 'serve']);
