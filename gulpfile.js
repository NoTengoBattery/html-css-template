/*
 * GULP build file to automatically prefix CSS files when they change
 */

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const purgecss = require('gulp-purgecss');

gulp.task('styles', function (done) {
  gulp.src('src/**/*.css')
    .pipe(purgecss({
      content: ['src/**/*.html', 'index.html']
    }))
    .pipe(autoprefixer())
    .pipe(cleancss({
      format: 'beautify',
      level: 2
    }))
    .pipe(gulp.dest('build'));
  done();
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.css', gulp.series('styles'));
});
