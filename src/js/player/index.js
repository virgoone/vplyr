import utils, {
  is
} from '../utils/util';
import Player from './player';
import Event from '../utils/events';
import {
  defaultConfig as defaults
} from '../config';
import Log from '../utils/logger';;
import flvjs from 'flv.js';

const pattern = /\.flv\b/;
class VPlayer {
  constructor(target, options) {
    this.TAG = 'VideoPlayer';
    this._intaface = null;
    this.media = target;
    this.UUID = null;
    if (this.__player) {
      this.__player.unload()
      this.__player.detachMediaElement()
      this.__player = null
    }
    if (pattern.test(target.src)) {
      if(!flvjs.isSupported()){
        console.error('浏览器不支持MSE转码');
      }else{
        this.__player = this.__createFlvjs(target.src);
      }
    }
    this.options = options;
    this.__setup();
  }
  pause() {
    const intaface = this._intaface;
    intaface.pause();
  }
  play() {
    const intaface = this._intaface;
    intaface.play();
  }
  on(event,callback){
    const intaface = this._intaface;
    intaface.on(event,callback);
  }
  stop() {
    const intaface = this._intaface;
    intaface.stop();
  }
  destroy(cb) {
    let intaface = this._intaface;
    if (this.__player) {
      this.__player.unload()
      this.__player.detachMediaElement()
      this.__player = null
    }
    intaface.destroy(cb);
    intaface = null;
  }
  playing(cb) {
    if (!is.function(cb)) {
      return;
    }
    const intaface = this._intaface;
    intaface.on('play', () => {
      const draw = () => {
        cb(this);
        this.UUID = window.requestAnimationFrame(draw);
      }
      draw();
    })
    intaface.on('pause', () => {
      if (this.UUID) {
        Log.i(this.TAG, 'cancelAnimationFrame', this.UUID);
        window.cancelAnimationFrame(this.UUID);
        this.UUID = null;
      }
    })

  }
  togglePlay() {
    const intaface = this._intaface;
    intaface.togglePlay();
  }
  toggleControls() {
    const intaface = this._intaface;
    intaface.toggleControls();
  }
  get support(){
    return {
      flvSupport:flvjs.isSupported()
    };
  }
  get brower(){
    const intaface = this._intaface;
    return intaface.getBrower;
  }
  get loadingState() {
    const intaface = this._intaface;
    return intaface.isLoading();
  }
  get readyState() {
    const intaface = this._intaface;
    return intaface.isReady();
  }
  get container() {
    const intaface = this._intaface;
    return intaface.getContainer();
  }
  get type() {
    const intaface = this._intaface;
    return intaface.getType;
  }
  get poster() {
    const intaface = this._intaface;
    return intaface.getPoster();
  }
  get volume() {
    const intaface = this._intaface;
    return intaface.getVolume();
  }
  get duration() {
    const intaface = this._intaface;
    return intaface.getDuration();
  }
  get currentTime() {
    const intaface = this._intaface;
    return intaface.getCurrentTime();
  }
  get fullscreen() {
    const intaface = this._intaface;
    return intaface.isFullscreen() || false;
  }
  get muted() {
    const intaface = this._intaface;
    return intaface.isMuted();
  }
  get src() {
    const intaface = this._intaface;
    return intaface.getSource();
  }
  get paused() {
    const intaface = this._intaface;
    return intaface.isPaused();
  }
  set src(source) {
    if (this.__player) {
      this.__player.unload()
      this.__player.detachMediaElement()
      this.__player = null
    }
    const intaface = this._intaface;
    intaface.updateSource(source);
    if (pattern.test(source)) {
      this.__player = this.__createFlvjs(source);
    }
  }
  set fullscreen(fullscreen) {
    if (!is.boolean(fullscreen)) {
      return;
    }

    const intaface = this._intaface;
    if ((!intaface.isFullscreen() && fullscreen) || (intaface.isFullscreen() && !fullscreen)) {
      intaface.toggleFullscreen();
    }
  }
  set volume(value) {
    const intaface = this._intaface;
    return intaface.setVolume(value);
  }
  set currentTime(value) {
    const intaface = this._intaface;
    intaface.seek(value);
  }
  set poster(source) {
    if (!is.string(source)) {
      return;
    }
    const intaface = this._intaface;
    intaface.updatePoster(source);
  }
  set muted(muted) {
    if (!is.boolean(muted)) {
      return;
    }
    const intaface = this._intaface;
    if ((!intaface.isMuted() && muted) || (intaface.isMuted() && !muted)) {
      intaface.toggleMute(muted);
    }

  }
  __setup() {
    if (this._intaface) {
      return;
    }
    const element = this.media;
    const options = this.options;
    let data = {};

    try {
      data = JSON.parse(element.getAttribute('data-vplyr'));
    } catch (e) {}
    const config = utils.extend({}, defaults, options, data);
    if (!config.enabled) {
      return null;
    }
    const player = new Player(element, config);
    const instance = player.setup();
    if (config.debug) {
      const events = config.events.concat(['input', 'setup', 'statechange', 'enterfullscreen', 'exitfullscreen', 'captionsenabled', 'captionsdisabled']);
      Event.onEvent(instance.getContainer(), events.join(' '), function (event) {
        Log.i(this.TAG, [config.logPrefix, 'event:', event.type].join(' '));
      });
    }
    this._intaface = instance;
  }
  __createFlvjs(src) {
    const sourceConfig = {
      isLive: false,
      type: 'flv',
      url: src
    }
    const playerConfig = {
      enableWorker: false,
      deferLoadAfterSourceOpen: true,
      stashInitialSize: 512 * 1024,
      enableStashBuffer: true
    }
    const player = flvjs.createPlayer(sourceConfig, playerConfig)
    player.on(flvjs.Events.ERROR, function (e, t) {
      Log.e(this.TAG, '播放器发生错误：' + e + ' - ' + t)
      player.unload()
    })
    player.on(flvjs.Events.STATISTICS_INFO, e => Log.i(this.TAG, parseInt(e.speed * 10) / 10 + 'KB/s'))

    player.attachMediaElement(this.media)
    player.load()
    return player
  }
}
export default VPlayer;
