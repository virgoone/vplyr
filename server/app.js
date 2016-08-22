'use strict'
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const Koa = require('koa');
const app = new Koa();
const config = require('./config/environment');


require('./config/koa')(app);
require('./routes')(app);

if (!module.parent) {
  app.listen(config.port, config.ip, function() {
    console.log('Koa server listening on %d, in %s mode', config.port, config.env);
  });
}
app.on('error', function(err, ctx){
  console.log(err)
  console.log('Koa serve err', err);

});

exports = module.exports = app;
