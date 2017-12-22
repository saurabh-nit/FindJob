var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var ngAnnotate = require('gulp-ng-annotate')
var sourcemaps = require('gulp-sourcemaps')
var server = require('gulp-server-livereload');
 var babel = require('gulp-babel');

gulp.task('js', function () {
  gulp.src(['js/ng/main.js', 'js/ng/**/*.js'])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('bundle.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('js/'))
})

gulp.task('watch', ['js'], function () {
  gulp.watch('js/ng/**/*.js', ['js'])
})

gulp.task('serve', function() {
  gulp.src('.')
    .pipe(server({
      fallback: 'index.html',
      directoryListing: false,
      open: false
    }));
});

gulp.task('serve-livereload', function() {
  gulp.src('.')
    .pipe(server({
      livereload: {
        enable: true,
        filter: function(filePath, cb) {
          // Ignore the source files already under `watch` task
          cb( !(/js\/ng/.test(filePath)) );
        }
      },
      fallback: 'index.html',
      directoryListing: false,
      open: false
    }));
});

gulp.task('default', ['watch', 'serve'])
gulp.task('serve-live', ['watch', 'serve-livereload'])
