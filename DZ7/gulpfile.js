var gulp = require('gulp');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var gulpIf = require('gulp-if');
var jade = require('gulp-jade');

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
  })
});

gulp.task('watch', ['browserSync', 'jade', 'useref'], function (){
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/*.jade', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload); 
  gulp.watch('app/css/**/*.css', browserSync.reload); 
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(gulpIf('*.css', cleanCSS()))
    .pipe(gulpIf('*.js', uglify()))
    .pipe(useref())
    .pipe(gulp.dest('dist'))
});

gulp.task('jade', function(){
  return gulp.src('app/*.jade')
    .pipe(jade({pretty:true}))
    .pipe(gulp.dest('app'));
});