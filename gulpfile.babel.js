'use strict';
import gulp from 'gulp';
import fs from "fs";
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import path from "path";
import es from "event-stream";
import runSequence from 'run-sequence';
const $ = gulpLoadPlugins();
const clientDistFolder = 'dist/public';
const serverDistFolder = 'dist/server';
let NODE_ENV = "development";

let NODE_PATH = path.join(__dirname, 'node_modules');

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('scss', [], () => {
  return gulp.src(['client/asset/scss/*.scss'])
    .pipe($.changed('.tmp/', {
      extension: '.css'
    }))
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/static/css/'))
    .pipe($.livereload())
    .pipe($.notify('Css refresh'));


})
gulp.task('jade', [], () => {
  return gulp.src(['client/**/*.jade', '!client/includes/**/*.jade'])
    .pipe($.changed('.tmp/', {
      extension: '.html'
    }))
    .pipe($.jade({
      client: false
    }))
    .pipe(gulp.dest('.tmp/'))
    .pipe($.livereload())
    .pipe($.notify('Views refresh'));
})
gulp.task('scripts', [], () => {
  return gulp.src('client/asset/ts/*.ts')
    .pipe($.changed('.tmp/', {
      extension: '.js'
    }))
    .pipe($.sourcemaps.init())
    .pipe($.ts({
      declaration: true,
      noExternalResolve: true
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/static/js/'))
    .pipe($.livereload())
    .pipe($.notify('Scripts refresh'));

})
gulp.task('serve', ['scss', 'jade'], () => {
  $.livereload.listen()
  $.nodemon({
      exec: './node_modules/.bin/babel-node --harmony',
      script: 'server/app.js',
      ext: 'js',
      watch: 'server',
      delay: 1.5,
      nodeArgs: ['--debug']
    })
    .on("start", function() {
      console.log('nodemon server started!');
    })
    .on('restart', function() {
      console.log('server restarted!');

    });
  gulp.watch(['client/asset/scss/*.scss'], ['scss'])
  gulp.watch(['client/**/*.jade'], ['jade'])

})
gulp.task('default', ['clean'], () => {
  gulp.start('serve');
});
