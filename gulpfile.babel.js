'use strict';
const gulp = require('gulp');
const fs = require('fs');
const gulpLoadPlugins = require('gulp-load-plugins');
const del = require('del');
const path = require('path');
const runSequence = require('run-sequence');
const babelify = require('babelify');
const connect = require('gulp-connect');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const $ = gulpLoadPlugins();

const clientDistFolder = 'dist/';

gulp.task('clean', del.bind(null, ['dist/*']));

gulp.task('scss', [], () => {
  return gulp.src(['./src/scss/vplyr.scss'])
    .pipe($.changed('dist/', {
      extension: '.css'
    }))
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(clientDistFolder))
    .pipe($.connect.reload());
})
function doBundle(b) {
  return b.bundle()
    .on('error', console.error.bind(console))
    .pipe(source('vplyr.js')) //将常规流转换为包含Stream的vinyl对象，并且重命名
    .pipe(buffer())
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(clientDistFolder))
    .pipe($.connect.reload())
}
gulp.task('scripts', [], function () {
  let b = browserify({
    entries: './src/js/index.js',
    standalone: 'vplyr.js',
    debug: true,
    transform: ['babelify', 'browserify-versionify'],
    plugin: ['browserify-derequire']
  });
  return doBundle(b);
});
gulp.task('watch', [], () => {
  connect.server({
    livereload: true,
    port: 8088
  });
  gulp.watch(['src/js/**/*.js'], ['scripts'])
  gulp.watch(['src/scss/**/*.scss'], ['scss'])

})
gulp.task('default', ['clean','scss','scripts', 'watch']);