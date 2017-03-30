import Player from './player/index';
let vPlayer = Player;

Object.defineProperty(vPlayer, 'version', {
    enumerable: true,
    get: function () {
        // replaced by browserify-versionify transform
      return '__VERSION__';
    }
});
export default vPlayer;