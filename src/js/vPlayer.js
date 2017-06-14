import Player from './player/index';
function install() {
  if (typeof window.CustomEvent === 'function') {
    return;
  }

  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
}
install();
let vPlayer = Player;

Object.defineProperty(vPlayer, 'version', {
  enumerable: true,
  get: function () {
    // replaced by browserify-versionify transform
    return '__VERSION__';
  }
});
export default vPlayer;