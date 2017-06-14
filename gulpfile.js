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
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(clientDistFolder))
    .pipe($.connect.reload())
}
gulp.task('scripts', [], function () {
  let b = browserify({
    entries: './src/js/index.js',
    standalone: 'vPlayer',
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
gulp.task('default', ['clean', 'scss', 'scripts', 'watch']);

gulp.task('build:minify:js', () => {
  let options = {
    sourceMap: true,
    sourceMapIncludeSources: true,
    sourceMapRoot: './src/',
    mangle: true,
    compress: {
      sequences: true,
      dead_code: true,
      conditionals: true,
      booleans: true,
      unused: true,
      if_return: true,
      join_vars: true
    }
  };

  return gulp.src('dist/vplyr.js')
    .pipe($.rename({ extname: '.min.js' }))
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.uglify(options))
    .on('error', console.error.bind(console))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/'));
})
gulp.task('build:minify:css', () => {
  return gulp.src(['dist/vplyr.css'])
    .pipe($.rename({ extname: '.min.css' }))
    .pipe($.cleanCss({
      advanced: false,
      compatibility: 'ie7',
    }))
    .pipe(gulp.dest('./dist/'));
})
gulp.task('build', ['clean', 'scss', 'scripts'], function () {
  runSequence('build:minify:js', 'build:minify:css');
});
