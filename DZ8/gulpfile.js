var gulp = require('gulp');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var gulpIf = require('gulp-if');
var jade = require('gulp-jade');
var babel = require('gulp-babel');

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
  })
});

gulp.task('watch', ['browserSync', 'useref'], function (){
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/*.jade', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload); 
  gulp.watch('app/css/**/*.css', browserSync.reload); 
});

gulp.task('useref', ['jade', 'babel'], function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.css', cleanCSS()))
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'))
});

gulp.task('jade', function(){
  return gulp.src('app/*.jade')
    .pipe(jade({pretty:true}))
    .pipe(gulp.dest('app'));
});

gulp.task('babel', function(){
  return gulp.src("app/js/*.es6")
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('app/js'));
});