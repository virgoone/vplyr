import utils, { is } from '../utils/util';
import Player from './player';
import { defaultConfig as defaults } from '../config';

class VPlayer {
  constructor(target, options) {
    this.TAG = 'VideoPlayer';
    this._intaface = null;
    this.media = target;
    this.options = options;
  }
  pause() {
    const intaface = this._intaface;
    intaface.pause();
  }
  play() {
    const intaface = this._intaface;
    intaface.play();
  }
  stop() {
    const intaface = this._intaface;
    intaface.pause();
    intaface.seek();
  }
  togglePlay() {
    const intaface = this._intaface;
    intaface.togglePlay();
  }
  toggleControls() {
    const intaface = this._intaface;
    intaface.toggleControls();
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
  get paused() {
    const intaface = this._intaface;
    return intaface.isPaused;
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
    intaface.seek(value);
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
  setup() {
    const element = this.media;
    const options = this.options;
    let data = {};

    try { data = JSON.parse(element.getAttribute('data-vplyr')); }
    catch (e) { }
    const config = utils.extend({}, defaults, options, data);
    if (!config.enabled) {
      return null;
    }
    const player = new Player(element, config);
    const instance =player.setup();
    this._intaface = instance;
  }
}
export default VPlayer;