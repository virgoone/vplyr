'use strict';
const config = require('./environment');
const bodyparser = require('koa-bodyparser')();
const serve = require('koa-static');
const path = require('path');
const views = require('koa-views');
const logger = require('koa-logger');
const convert = require('koa-convert');
const json = require('koa-json');
const etag = require('koa-etag');
module.exports = function(app) {
  let env = app.env;
  app.use(convert(bodyparser));
  app.use(convert(json()));
  app.use(convert(logger()));
  app.use(etag());

  app.use(views(config.root + '/server/views',{ extension: 'jade' }));

  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(serve(path.join(config.root, 'public')));
    app.set('appPath', config.root + '/public');
  }

  if ('development' === env || 'test' === env) {
    app.use(serve(path.join(config.root, '.tmp')));
    app.use(serve(path.join(config.root, 'client')));
    console.log("development");
  }

};
