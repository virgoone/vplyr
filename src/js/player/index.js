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
    window.___intance__ = instance;
    console.log(instance);
  }
}
export default VPlayer;