import utils from './util.js';

export default class Log {
  constructor(config){
    this._config = config;
    this.log = this._log.bind(this);
    this.warn = this._warn.bind(this);
    this.console = this._console.bind(this);
  }
  _console(type,args){
    if (this._config.debug && window.console) {
      args = Array.prototype.slice.call(args);

      if (utils.is.string(this._config.logPrefix) && this._config.logPrefix.length) {
        args.unshift(this._config.logPrefix);
      }
      console[type].apply(console, args);
    }
  }
  _log() { 
    this._console('log', arguments) 
  };
  _warn() { 
    this._console('warn', arguments) 
  };
}