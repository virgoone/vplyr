'use strict';

const router = require('koa-router')();

module.exports = function(app) {


  app.use(async(ctx, next) => {
      try {
        await next();
      } catch (err) {
        // will only respond with JSON
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
          name:err != null ? err.name : void 0,
          message: err != null ? err.message : void 0,
          errorCode:  err != null ? err.errorCode : void 0
        };
      }
    })
    // logger
  app.use(async(ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });

  // app.use(router.routes(), router.allowedMethods());


  app.use(async(ctx, next) => {
    console.log("404");
    ctx.status = 404;
    await ctx.render('404', {});
  });



};
