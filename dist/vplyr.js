(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.vPlayer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _selectors;

exports.createDefaultConfig = createDefaultConfig;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultConfig = exports.defaultConfig = {
    enabled: true,
    debug: true,
    autoplay: false,
    loop: false,
    seekTime: 10,
    volume: 10,
    volumeMin: 0,
    volumeMax: 10,
    volumeStep: 1,
    duration: null,
    displayDuration: true,
    loadSprite: true,
    hideControls: true,
    blankUrl: 'https://cdn.selz.com/plyr/blank.mp4',
    controls: ['play-large', 'play', 'progress', 'time', 'mute', 'volume', 'captions', 'fullscreen'],
    selectors: (_selectors = {
        html5: 'video, audio',
        editable: 'input, textarea, select, [contenteditable]',
        container: '.vplyr',
        controls: {
            container: null,
            wrapper: '.vplyr-controls'
        },
        buttons: {
            seek: '[data-video="seek"]',
            play: '[data-video="play"]',
            pause: '[data-video="pause"]',
            mute: '[data-video="mute"]',
            fullscreen: '[data-video="fullscreen"]'
        },
        volume: {
            input: '[data-video="volume"]',
            display: '.vplyr-volume-display'
        },
        progress: {
            container: '.vplyr-progress-bar-container',
            buffer: '.vplyr-progress-buffer',
            played: '.vplyr-progress-played'
        }
    }, _defineProperty(_selectors, 'volume', {
        input: '[data-video="volume"]',
        display: '.vplyr-volume-display'
    }), _defineProperty(_selectors, 'currentTime', '.control-currenttime'), _defineProperty(_selectors, 'duration', '.control-duration'), _selectors),

    // Custom control listeners
    listeners: {
        seek: null,
        play: null,
        pause: null,
        restart: null,
        rewind: null,
        forward: null,
        mute: null,
        volume: null,
        captions: null,
        fullscreen: null
    },
    storage: {
        enabled: true,
        key: 'vplyr'
    },
    types: {
        html5: ['video']
    },
    classes: {
        setup: 'vplyr-setup',
        ready: 'vplyr-ready',
        muted: 'vplyr-muted',
        type: 'vplyr-{0}',
        videoWrapper: 'vplyr-video-container',
        playing: 'vplyr-plying',
        loading: 'vplyr-loading',
        hover: 'vplyr-hover',
        stopped: 'vplyr-stopped',
        inIos: 'vplyr--is-ios',
        inTouch: 'vplyr--is-touch',
        inWechat: 'vplyr--is-wechat',
        inChrome: 'vplyr--is-chrome',
        tabFocus: 'tab-focus',
        hideControls: 'vplyr-hide-controls',
        fullscreen: {
            enabled: 'vplyr-fullscreen-enabled',
            active: 'vplyr-fullscreen-active'
        }
    },
    events: ['ready', 'ended', 'progress', 'stalled', 'playing', 'waiting', 'canplay', 'canplaythrough', 'loadstart', 'loadeddata', 'loadedmetadata', 'timeupdate', 'volumechange', 'play', 'pause', 'error', 'seeking', 'seeked', 'emptied'],
    // Logging
    logPrefix: '[VPlyr]'
};
function createDefaultConfig() {
    return Object.assign({}, defaultConfig);
}

},{}],2:[function(_dereq_,module,exports){
'use strict';

module.exports = _dereq_('./vPlayer.js').default;

},{"./vPlayer.js":11}],3:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildControls = undefined;

var _util = _dereq_('../utils/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildControls = exports.buildControls = function buildControls(config) {
  var controls = config.controls;

  var html = ['<div class="vplyr-video-loader-container">', '<div class="vplyr-video-loader">', '<div class="loader-inner one"></div>', '<div class="loader-inner two"></div>', '<div class="loader-inner three"></div>', '</div>', '</div><div class="vplyr-gradient-bottom"></div>'];
  html.push('<div class="vplyr-bottom-container">');
  if (_util2.default.inArray(controls, 'progress')) {
    html.push('<div class="vplyr-progress-bar-container">', '<input id="seek{id}" type="range" min="0" max="100" value="0" step="0.1" class="vplyr-progress-bar" data-video="seek"/>', '<progress class="vplyr-progress-played" max="100" role="presentation"></progress>', '<progress class="vplyr-progress-buffer" max="100" value="100">', '<span>100.00</span>% buffered', '</progress>', '</div>');
  }
  html.push('<div class="vplyr-controls">');
  html.push('<div class="left-controls">');
  if (_util2.default.inArray(controls, 'play')) {
    html.push('<div class="btn-controls">', '<div class="btn-wrap">', '<div class="play" data-video="play"></div>', '<div class="pause" data-video="pause"></div>', '</div>', '</div>');
  }
  if (_util2.default.inArray(controls, 'time')) {
    html.push('<div class="time-mod-controls">', '<div class="control-currenttime">00:00</div>', '<div class="control-separator">/</div>', '<div class="control-duration">00:00</div>', '</div>');
  }
  html.push('</div>'); //close vplyr left controls
  html.push('<div class="right-controls">');
  if (_util2.default.inArray(controls, 'fullscreen')) {
    html.push('<div class="fullscreen-controls" data-video="fullscreen">', '<svg class="icon-exit-fullscreen">', '<use xlink:href="#vplyr-exit-fullscreen"></use>', '</svg>', '<svg class="icon-enter-fullscreen">', ' <use xlink:href="#vplyr-enter-fullscreen"></use>', '</svg>', '</div>');
  }
  html.push('<div class="volume-controls">');
  if (_util2.default.inArray(controls, 'mute')) {
    html.push('<div class="vplyr-volume" data-video="mute">', '<svg class="icon-muted">', '<use xlink:href="#vplyr-muted"></use>', '</svg>', '<svg class="icon-volume">', '<use xlink:href="#vplyr-volume"></use>', '</svg>', '</div>');
  }
  if (_util2.default.inArray(controls, 'volume')) {
    html.push('<div class="vplyr-volume-progress">', '<input type="range" id="volume{id}"  class="vplyr-volume-input"  min="0"  max="10" data-video="volume" value="8">', '<progress class="vplyr-volume-display" max="10" role="presentation"></progress>', '</div>');
  }
  html.push('</div>'); //close vplyr volume controls

  html.push('</div>'); //close vplyr right controls

  html.push('</div>'); //close vplyr controls
  html.push('</div>'); //close
  return html.join('');
};

},{"../utils/util":10}],4:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = _dereq_('../utils/util');

var _util2 = _interopRequireDefault(_util);

var _player = _dereq_('./player');

var _player2 = _interopRequireDefault(_player);

var _config = _dereq_('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VPlayer = function () {
  function VPlayer(target, options) {
    _classCallCheck(this, VPlayer);

    this.TAG = 'VideoPlayer';
    this._intaface = null;
    this.media = target;
    this.options = options;
  }

  _createClass(VPlayer, [{
    key: 'setup',
    value: function setup() {
      var element = this.media;
      var options = this.options;
      var data = {};

      try {
        data = JSON.parse(element.getAttribute('data-vplyr'));
      } catch (e) {}
      var config = _util2.default.extend({}, _config.defaultConfig, options, data);
      if (!config.enabled) {
        return null;
      }
      var player = new _player2.default(element, config);
      var instance = player.setup();
      window.___intance__ = instance;
      console.log(instance);
    }
  }]);

  return VPlayer;
}();

exports.default = VPlayer;

},{"../config":1,"../utils/util":10,"./player":5}],5:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = _dereq_('../utils/dom');

var _dom2 = _interopRequireDefault(_dom);

var _util = _dereq_('../utils/util');

var _util2 = _interopRequireDefault(_util);

var _events = _dereq_('../utils/events');

var _events2 = _interopRequireDefault(_events);

var _logger = _dereq_('../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _storage = _dereq_('./storage');

var _controls = _dereq_('./controls');

var _config = _dereq_('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;

var Player = function () {
  function Player(media, config) {
    _classCallCheck(this, Player);

    console.log(new _util2.default().is);

    var browser = _util2.default.browerSniff();
    this.TAG = 'Player';
    this._player = {
      media: media, browser: browser
    };
    this._config = config;
    this._timers = {};
    this._storage = {};
    this._media = media;
    this._fullscreen = _dom2.default.fullscreen();
    this.__init__ = false;
    this.__original = media.cloneNode(true);
  }

  _createClass(Player, [{
    key: 'setup',
    value: function setup() {
      var _this = this;

      var config = this._config;
      var player = this._player;
      var storage = this._storage;

      var media = player.media;

      var api = {};
      if (this.__init__) {
        return null;
      }
      if (!_util.is.htmlElement(media)) {
        _logger2.default.w(this.TAG, 'media must be a video');
        return;
      }
      (0, _storage.setupStorage)(config, storage);
      var tagName = media.tagName.toLowerCase();
      player.type = tagName;
      config.crossorigin = media.getAttribute('crossorigin') !== null;
      config.autoplay = config.autoplay || media.getAttribute('autoplay') !== null;
      config.loop = config.loop || media.getAttribute('loop') !== null;
      player.supported = _util2.default.supported(player.type);
      if (!player.supported.basic) {
        return;
      }
      player.container = _dom2.default.wrap(media, document.createElement('div'));
      player.container.setAttribute('tabindex', 0);
      this._toggleStyleHook();

      _logger2.default.i(this.TAG, '' + player.browser.name + ' ' + player.browser.version);
      this._setupMedia();
      if (_util2.default.inArray(config.types.html5, player.type)) {
        // Setup UI
        this._setupInterface();

        this._ready();
      }
      this.__init__ = true;
      api = {
        getType: player.type,
        getDuration: this._getDuration.bind(this),
        play: this._play.bind(this),
        pause: this._pause.bind(this),
        stop: function stop() {
          _this._pause().bind(_this);_this._seek().bind(_this);
        },
        seek: this._seek.bind(this),
        setVolume: this._setVolume.bind(this),
        togglePlay: this._togglePlay.bind(this),
        toggleMute: this._toggleMute.bind(this),
        toggleFullscreen: this._toggleFullscreen.bind(this),
        toggleControls: this._toggleControls.bind(this),
        isFullscreen: function isFullscreen() {
          return player.isFullscreen || false;
        },
        getContainer: function getContainer() {
          return player.container;
        },
        getMedia: function getMedia() {
          return player.media;
        },
        getCurrentTime: function getCurrentTime() {
          return player.media.currentTime;
        },
        getVolume: function getVolume() {
          return player.media.volume;
        },
        isMuted: function isMuted() {
          return player.media.muted;
        },
        isReady: function isReady() {
          return _dom2.default.hasClass(player.container, config.classes.ready);
        },
        isLoading: function isLoading() {
          return _dom2.default.hasClass(player.container, config.classes.loading);
        },
        isPaused: function isPaused() {
          return player.media.paused;
        },
        on: function on(event, callback) {
          _events2.default.onEvent(player.container, event, callback);return this;
        }
      };
      return api;
    }
  }, {
    key: '_ready',
    value: function _ready() {
      var _this2 = this;

      var config = this._config;
      var player = this._player;
      var media = player.media,
          container = player.container;

      // Ready event at end of execution stack

      window.setTimeout(function () {
        _this2._triggerEvent(media, 'ready');
      }, 0);

      // Set class hook on media element
      _dom2.default.toggleClass(media, _config.defaultConfig.classes.setup, true);

      // Set container class for ready
      _dom2.default.toggleClass(container, config.classes.ready, true);

      // Autoplay
      if (config.autoplay) {
        this._play();
      }
    }
  }, {
    key: '_setupMedia',
    value: function _setupMedia() {
      var config = this._config;
      var player = this._player;
      var original = this._original;
      var media = player.media;


      if (!media) {
        _logger2.default.w(this.TAG, 'No media element found!');
        return;
      }
      var autoplay = config.autoplay,
          classes = config.classes;
      var container = player.container,
          type = player.type,
          browser = player.browser,
          supported = player.supported;
      var stopped = classes.stopped,
          inIos = classes.inIos,
          inChrome = classes.inChrome,
          inTouch = classes.inTouch,
          inWechat = classes.inWechat,
          videoWrapper = classes.videoWrapper;
      var isIos = browser.isIos,
          isChrome = browser.isChrome,
          isTouch = browser.isTouch,
          isWechat = browser.isWechat;

      if (supported.full) {
        _dom2.default.toggleClass(container, classes.type.replace('{0}', type), true);
        _dom2.default.toggleClass(container, stopped, autoplay);
        // Add iOS class
        _dom2.default.toggleClass(container, inIos, isIos);
        // Add chrome class
        _dom2.default.toggleClass(container, inChrome, isChrome);
        // Add touch class
        _dom2.default.toggleClass(container, inTouch, isTouch);

        // Add wechat class
        _dom2.default.toggleClass(container, inWechat, isWechat);
        if (player.type === 'video') {
          var wrapper = document.createElement('div');
          wrapper.setAttribute('class', videoWrapper);
          _dom2.default.wrap(player.media, wrapper);
          // Cache the container
          player.videoContainer = wrapper;
        }
      }
    }
  }, {
    key: '_setupInterface',
    value: function _setupInterface() {
      var config = this._config;
      var player = this._player;
      var storage = this._storage;
      var media = player.media;

      var _getElements = function _getElements(selector) {
        return player.container.querySelectorAll(selector);
      };
      var _getElement = function _getElement(selector) {
        return _getElements(selector)[0];
      };
      if (!player.supported.full) {
        _logger2.default.w(this.TAG, 'Basic support only', player.type);

        // Remove controls
        _dom2.default.removeElement(_getElement(config.selectors.controls.wrapper));
        // reset native controls
        this._toggleNativeControls(true);
        // Bail
        return;
      }
      var controlsMissing = !_getElements(config.selectors.controls.wrapper).length;
      if (controlsMissing) {
        // Inject custom controls
        this._injectControls();
      }
      if (!this._findElements()) {
        return;
      }
      if (controlsMissing) {
        this._controlListeners();
      }
      this._mediaListeners();
      this._toggleNativeControls(false);
      this._timeUpdate();
      // Set volume
      this._setVolume();

      this._updateVolume();

      this._checkPlaying();
    }
  }, {
    key: '_mediaListeners',
    value: function _mediaListeners() {
      var player = this._player;
      var media = player.media;
      // Time change on media

      _events2.default.onEvent(media, 'timeupdate seeking', this._timeUpdate.bind(this));

      _events2.default.onEvent(media, 'durationchange loadedmetadata', this._displayDuration.bind(this));

      _events2.default.onEvent(media, 'play pause ended', this._checkPlaying.bind(this));

      _events2.default.onEvent(media, 'progress playing', this._updateProgress.bind(this));

      _events2.default.onEvent(media, 'waiting canplay seeked', this._checkLoading.bind(this));

      _events2.default.onEvent(media, 'volumechange', this._updateVolume.bind(this));
    }
  }, {
    key: '_updateVolume',
    value: function _updateVolume() {
      var config = this._config;
      var player = this._player;
      var storage = this._storage;
      var media = player.media,
          container = player.container,
          buttons = player.buttons,
          supported = player.supported,
          volume = player.volume;
      var muted = media.muted;
      var classes = config.classes;
      // Get the current volume

      var __volume = muted ? 0 : media.volume * config.volumeMax;

      // Update the <input type="range"> if present
      if (supported.full) {
        if (volume.input) {
          volume.input.value = __volume;
        }
        if (volume.display) {
          volume.display.value = __volume;
        }
      }

      // Update the volume in storage
      (0, _storage.updateStorage)({ volume: __volume }, config, storage);

      // Toggle class if muted
      _dom2.default.toggleClass(container, classes.muted, __volume === 0);

      // Update checkbox for mute state
      if (supported.full && buttons.mute) {
        this._toggleState(buttons.mute, volume === 0);
      }
    }
  }, {
    key: '_checkLoading',
    value: function _checkLoading(event) {
      var _this3 = this;

      var config = this._config;
      var player = this._player;
      var timers = this._timers;

      var loading = event.type === 'waiting';
      var container = player.container;
      var classes = config.classes;
      // Clear timer

      clearTimeout(timers.loading);

      // Timer to prevent flicker when seeking
      timers.loading = setTimeout(function () {
        // Toggle container class hook
        _dom2.default.toggleClass(container, classes.loading, loading);

        // Show controls if loading, hide if done
        _this3._toggleControls(loading);
      }, loading ? 250 : 0);
    }
  }, {
    key: '_checkPlaying',
    value: function _checkPlaying() {
      var config = this._config;
      var player = this._player;

      var media = player.media,
          container = player.container;
      var classes = config.classes;
      var paused = media.paused;

      _dom2.default.toggleClass(container, classes.playing, !paused);

      _dom2.default.toggleClass(container, classes.stopped, paused);

      this._toggleControls(paused);
    }
  }, {
    key: '_play',
    value: function _play() {
      var player = this._player;
      var media = player.media;

      if ('play' in media) {
        media.play();
      }
    }
  }, {
    key: '_pause',
    value: function _pause() {
      var player = this._player;
      var media = player.media;

      if ('pause' in media) {
        media.pause();
      }
    }
  }, {
    key: '_togglePlay',
    value: function _togglePlay(toggle) {
      var player = this._player;
      var media = player.media;
      // True toggle

      if (!_util.is.boolean(toggle)) {
        toggle = media.paused;
      }

      if (toggle) {
        this._play();
      } else {
        this._pause();
      }
      return toggle;
    }
  }, {
    key: '_getDuration',
    value: function _getDuration() {
      var config = this._config;
      var player = this._player;
      var media = player.media;

      // It should be a number, but parse it just incase

      var duration = parseInt(config.duration),


      // True duration
      mediaDuration = 0;

      // Only if duration available
      if (media.duration !== null && !isNaN(media.duration)) {
        mediaDuration = media.duration;
      }

      // If custom duration is funky, use regular duration
      return isNaN(duration) ? mediaDuration : duration;
    }
  }, {
    key: '_seek',
    value: function _seek(input) {
      var player = this._player;
      var media = player.media;

      var targetTime = 0,
          paused = media.paused,
          duration = this._getDuration();

      if (_util.is.number(input)) {
        targetTime = input;
      } else if (_util.is.object(input) && _util2.default.inArray(['input', 'change'], input.type)) {
        // It's the seek slider
        // Seek to the selected time
        targetTime = input.target.value / input.target.max * duration;
      }
      if (targetTime < 0) {
        targetTime = 0;
      } else if (targetTime > duration) {
        targetTime = duration;
      }
      this._updateSeekDisplay(targetTime);
      try {
        media.currentTime = targetTime.toFixed(4);
      } catch (e) {}
    }
  }, {
    key: '_setVolume',
    value: function _setVolume(volume) {
      var config = this._config;
      var player = this._player;
      var storage = this._storage;

      var media = player.media;

      var max = config.volumeMax,
          min = config.volumeMin;

      // Load volume from storage if no value specified
      if (_util.is.undefined(volume)) {
        volume = storage.volume;
      }

      // Use config if all else fails
      if (volume === null || isNaN(volume)) {
        volume = config.volume;
      }

      // Maximum is volumeMax
      if (volume > max) {
        volume = max;
      }
      // Minimum is volumeMin
      if (volume < min) {
        volume = min;
      }
      // Set the player volume
      media.volume = parseFloat(volume / max);

      // Set the display
      if (player.volume.display) {
        player.volume.display.value = volume;
      }
      // Toggle muted state
      if (volume === 0) {
        media.muted = true;
      } else if (media.muted && volume > 0) {
        this._toggleMute();
      }
    }
  }, {
    key: '_toggleMute',
    value: function _toggleMute(muted) {
      var config = this._config;
      var player = this._player;
      var storage = this._storage;

      var media = player.media;

      if (!_util.is.boolean(muted)) {
        muted = !media.muted;
      }

      // Set button state
      this._toggleState(player.buttons.mute, muted);

      // Set mute on the player
      media.muted = muted;

      // If volume is 0 after unmuting, set to default
      if (media.volume === 0) {
        this._setVolume(config.volume);
      }
    }
  }, {
    key: '_toggleState',
    value: function _toggleState(target, state) {
      // Bail if no target
      if (!target) {
        return;
      }
      // Get state
      state = _util.is.boolean(state) ? state : !target.getAttribute('aria-pressed');

      // Set the attribute on target
      target.setAttribute('aria-pressed', state);
      return state;
    }
  }, {
    key: '_timeUpdate',
    value: function _timeUpdate(event) {
      var config = this._config;
      var player = this._player;
      var media = player.media;
      // Duration

      this._updateTimeDisplay(media.currentTime, player.currentTime);

      // Ignore updates while seeking
      if (event && event.type === 'timeupdate' && media.seeking) {
        return;
      }
      // Playing progress
      this._updateProgress(event);
    }
  }, {
    key: '_updateProgress',
    value: function _updateProgress(event) {
      var _this4 = this;

      var player = this._player;
      var media = player.media,
          controls = player.controls,
          progress = player.progress,
          buttons = player.buttons,
          supported = player.supported;

      if (!supported.full) {
        return;
      }

      var __progress = progress.played,
          __value = 0,
          duration = this._getDuration();
      if (event) {
        switch (event.type) {
          case 'timeupdate':
          case 'seeking':
            if (controls.pressed) {
              return;
            }

            __value = this._getPercentage(media.currentTime, duration);

            // Set seek range value only if it's a 'natural' time event
            if (event.type === 'timeupdate' && buttons.seek) {
              buttons.seek.value = __value;
            }

            break;
          // Check buffer status
          case 'playing':
          case 'progress':
            __progress = progress.buffer;
            __value = function () {
              var buffered = media.buffered;

              if (buffered && buffered.length) {
                // HTML5
                return _this4._getPercentage(buffered.end(0), duration);
              }
              return 0;
            }();
            break;
        }
      }
      this._setProgress(__progress, __value);
    }
  }, {
    key: '_setProgress',
    value: function _setProgress(progress, value) {
      var player = this._player;
      var supported = player.supported;

      if (!supported.full) {
        return;
      }

      // Default to 0
      if (_util.is.undefined(value)) {
        value = 0;
      }
      // Default to buffer or bail
      if (_util.is.undefined(progress)) {
        if (player.progress && player.progress.buffer) {
          progress = player.progress.buffer;
        } else {
          return;
        }
      }

      // One progress element passed
      if (_util.is.htmlElement(progress)) {
        progress.value = value;
      } else if (progress) {
        // Object of progress + text element
        if (progress.bar) {
          progress.bar.value = value;
        }
        if (progress.text) {
          progress.text.innerHTML = value;
        }
      }
    }
  }, {
    key: '_updateTimeDisplay',
    value: function _updateTimeDisplay(time, element) {
      var player = this._player;

      // Bail if there's no duration display
      if (!element) {
        return;
      }

      // Fallback to 0
      if (isNaN(time)) {
        time = 0;
      }

      player.secs = parseInt(time % 60);
      player.mins = parseInt(time / 60 % 60);
      player.hours = parseInt(time / 60 / 60 % 60);

      // Do we need to display hours?
      var displayHours = parseInt(this._getDuration() / 60 / 60 % 60) > 0;

      // Ensure it's two digits. For example, 03 rather than 3.
      player.secs = ('0' + player.secs).slice(-2);
      player.mins = ('0' + player.mins).slice(-2);

      // Render
      element.innerHTML = (displayHours ? player.hours + ':' : '') + player.mins + ':' + player.secs;
    }
  }, {
    key: '_updateSeekDisplay',
    value: function _updateSeekDisplay(time) {
      // Default to 0
      if (!_util.is.number(time)) {
        time = 0;
      }
      var player = this._player;

      var progress = player.progress,
          buttons = player.buttons;

      var duration = this._getDuration(),
          value = this._getPercentage(time, duration);

      // Update progress
      if (progress && progress.played) {
        progress.played.value = value;
      }

      // Update seek range input
      if (buttons && buttons.seek) {
        buttons.seek.value = value;
      }
    }
  }, {
    key: '_displayDuration',
    value: function _displayDuration() {
      var config = this._config;
      var player = this._player;
      var storage = this._storage;

      var media = player.media,
          supported = player.supported,
          duration = player.duration,
          currentTime = player.currentTime;
      var displayDuration = config.displayDuration;

      if (!supported.full) {
        return;
      }

      // Determine duration
      var __duration = this._getDuration() || 0;

      // If there's only one time display, display duration there
      if (!duration && displayDuration && media.paused) {
        this._updateTimeDisplay(__duration, currentTime);
      }

      // If there's a duration element, update content
      if (duration) {
        this._updateTimeDisplay(__duration, duration);
      }
    }
  }, {
    key: '_controlListeners',
    value: function _controlListeners() {
      var _this5 = this;

      var config = this._config;
      var player = this._player;
      var fullscreen = this._fullscreen;

      var browser = player.browser,
          buttons = player.buttons,
          volume = player.volume,
          container = player.container,
          controls = player.controls;
      var classes = config.classes,
          listeners = config.listeners,
          hideControls = config.hideControls;

      var inputEvent = browser.isIE ? 'change' : 'input';
      var togglePlay = function togglePlay() {
        var play = _this5._togglePlay();
        var trigger = buttons[play ? 'play' : 'pause'],
            target = buttons[play ? 'pause' : 'play'];

        // Get the last play button to account for the large play button
        if (target && target.length > 1) {
          target = target[target.length - 1];
        } else {
          target = target[0];
        }
        if (target) {
          var hadTabFocus = _dom2.default.hasClass(trigger, classes.tabFocus);

          setTimeout(function () {
            target.focus();
            if (hadTabFocus) {
              _dom2.default.toggleClass(trigger, classes.tabFocus, false);
              _dom2.default.toggleClass(target, classes.tabFocus, true);
            }
          }, 100);
        }
      };
      _events2.default.proxyListener(buttons.play, 'click', listeners.play, togglePlay);
      // Pause
      _events2.default.proxyListener(buttons.pause, 'click', listeners.pause, togglePlay);
      // Seek
      _events2.default.proxyListener(buttons.seek, inputEvent, listeners.seek, this._seek.bind(this));

      _events2.default.proxyListener(volume.input, inputEvent, listeners.volume, function () {
        _this5._setVolume(volume.input.value);
      });
      _events2.default.proxyListener(buttons.mute, 'click', listeners.mute, this._toggleMute.bind(this));

      _events2.default.proxyListener(buttons.fullscreen, 'click', listeners.fullscreen, this._toggleFullscreen.bind(this));

      // Handle user exiting fullscreen by escaping etc
      if (fullscreen.supportsFullScreen) {
        _events2.default.onEvent(document, fullscreen.fullScreenEventName, this._toggleFullscreen.bind(this));
      }
      if (hideControls) {
        // Toggle controls on mouse events and entering fullscreen
        _events2.default.onEvent(container, 'mouseenter mouseleave mousemove touchstart touchend touchcancel touchmove enterfullscreen', this._toggleControls.bind(this));

        // Watch for cursor over controls so they don't hide when trying to interact
        _events2.default.onEvent(controls, 'mouseenter mouseleave', function (event) {
          player.controls.hover = event.type === 'mouseenter';
        });

        // Watch for cursor over controls so they don't hide when trying to interact
        _events2.default.onEvent(controls, 'mousedown mouseup touchstart touchend touchcancel', function (event) {
          player.controls.pressed = _util2.default.inArray(['mousedown', 'touchstart'], event.type);
        });
        // Focus in/out on controls
        _events2.default.onEvent(controls, 'focus blur', this._toggleControls.bind(this), true);
      }
    }
  }, {
    key: '_injectControls',
    value: function _injectControls() {
      var config = this._config;
      var player = this._player;

      var html = config.html,
          selectors = config.selectors;
      var container = player.container;

      if (!html) {
        html = (0, _controls.buildControls)(config);
      }
      var random = Math.floor(Math.random() * 1000000);
      container.setAttribute('id', 'vplyr' + random);
      html = _util2.default.replaceAll(html, '{id}', random);
      var target = void 0;
      if (_util.is.string(selectors.controls.container)) {
        target = document.querySelector(selectors.controls.container);
      }
      // Inject into the container by default
      if (!_util.is.htmlElement(target)) {
        target = container;
      }
      target.insertAdjacentHTML('beforeend', html);
    }
  }, {
    key: '_findElements',
    value: function _findElements() {
      var config = this._config;
      var player = this._player;

      var container = player.container;
      var selectors = config.selectors;
      var controls = selectors.controls,
          buttons = selectors.buttons,
          progress = selectors.progress,
          volume = selectors.volume,
          duration = selectors.duration,
          currentTime = selectors.currentTime,
          seekTime = selectors.seekTime;

      var _getElements = function _getElements(selector) {
        return container.querySelectorAll(selector);
      };
      var _getElement = function _getElement(selector) {
        return _getElements(selector)[0];
      };
      try {
        player.controls = _getElement(controls.wrapper);

        // Buttons
        player.buttons = {};
        player.buttons.seek = _getElement(buttons.seek);
        player.buttons.play = _getElements(buttons.play);
        player.buttons.pause = _getElement(buttons.pause);
        player.buttons.fullscreen = _getElement(buttons.fullscreen);

        // Inputs
        player.buttons.mute = _getElement(buttons.mute);

        // Progress
        player.progress = {};
        player.progress.container = _getElement(progress.container);

        // Progress - Buffering
        player.progress.buffer = {};
        player.progress.buffer.bar = _getElement(progress.buffer);
        player.progress.buffer.text = player.progress.buffer.bar && player.progress.buffer.bar.getElementsByTagName('span')[0];

        // Progress - Played
        player.progress.played = _getElement(progress.played);

        // Volume
        player.volume = {};
        player.volume.input = _getElement(volume.input);
        player.volume.display = _getElement(volume.display);

        // Timing
        player.duration = _getElement(duration);
        player.currentTime = _getElement(currentTime);
        player.seekTime = _getElements(seekTime);

        return true;
      } catch (e) {
        this._warn('It looks like there is a problem with your controls HTML');
        // Restore native video controls
        this._toggleNativeControls(true);

        return false;
      }
    }
  }, {
    key: '_toggleNativeControls',
    value: function _toggleNativeControls(toggle) {
      var config = this._config;
      var player = this._player;
      var media = player.media;

      if (toggle && _util2.default.inArray(config.types.html5, player.type)) {
        media.setAttribute('controls', '');
      } else {
        media.removeAttribute('controls');
      }
    }
  }, {
    key: '_toggleFullscreen',
    value: function _toggleFullscreen(event) {
      // Check for native support
      var config = this._config;
      var player = this._player;
      var fullscreen = this._fullscreen;

      var container = player.container,
          buttons = player.buttons;

      var nativeSupport = fullscreen.supportsFullScreen;

      if (nativeSupport) {
        // If it's a fullscreen change event, update the UI
        if (event && event.type === fullscreen.fullScreenEventName) {
          player.isFullscreen = fullscreen.isFullScreen(container);
        } else {
          // Else it's a user request to enter or exit
          if (!fullscreen.isFullScreen(container)) {
            // Save scroll position
            this._saveScrollPosition();

            // Request full screen
            fullscreen.requestFullScreen(container);
          } else {
            // Bail from fullscreen
            fullscreen.cancelFullScreen();
          }

          // Check if we're actually full screen (it could fail)
          player.isFullscreen = fullscreen.isFullScreen(container);

          return;
        }
      } else {
        // Otherwise, it's a simple toggle
        player.isFullscreen = !player.isFullscreen;

        // Bind/unbind escape key
        document.body.style.overflow = player.isFullscreen ? 'hidden' : '';
      }

      // Set class hook
      _dom2.default.toggleClass(container, config.classes.fullscreen.active, player.isFullscreen);

      // Trap focus
      this._focusTrap(player.isFullscreen);

      // Set button state
      if (buttons && buttons.fullscreen) {
        this._toggleState(buttons.fullscreen, player.isFullscreen);
      }

      // Trigger an event
      this._triggerEvent(container, player.isFullscreen ? 'enterfullscreen' : 'exitfullscreen', true);

      // Restore scroll position
      if (!player.isFullscreen && nativeSupport) {
        this._restoreScrollPosition();
      }
    }
  }, {
    key: '_saveScrollPosition',
    value: function _saveScrollPosition() {
      scroll = {
        x: window.pageXOffset || 0,
        y: window.pageYOffset || 0
      };
    }
  }, {
    key: '_restoreScrollPosition',
    value: function _restoreScrollPosition() {
      window.scrollTo(scroll.x, scroll.y);
    }
  }, {
    key: '_toggleControls',
    value: function _toggleControls(toggle) {
      var config = this._config;
      var player = this._player;
      var timers = this._timers;

      var hideControls = config.hideControls,
          classes = config.classes;
      var type = player.type,
          container = player.container,
          browser = player.browser,
          controls = player.controls,
          media = player.media;
      var paused = media.paused;
      // Don't hide if config says not to, it's audio, or not ready or loading

      if (!hideControls || type === 'audio') {
        return;
      }

      var delay = 0,
          isEnterFullscreen = false,
          show = toggle,
          loading = _dom2.default.hasClass(container, classes.loading);

      // Default to false if no boolean
      if (!_util.is.boolean(toggle)) {
        if (toggle && toggle.type) {
          // Is the enter fullscreen event
          isEnterFullscreen = toggle.type === 'enterfullscreen';

          // Whether to show controls
          show = _util2.default.inArray(['mousemove', 'touchstart', 'mouseenter', 'focus'], toggle.type);

          // Delay hiding on move events
          if (_util2.default.inArray(['mousemove', 'touchmove'], toggle.type)) {
            delay = 2000;
          }

          // Delay a little more for keyboard users
          if (toggle.type === 'focus') {
            delay = 3000;
          }
        } else {
          show = _dom2.default.hasClass(container, classes.hideControls);
        }
      }

      // Clear timer every movement
      window.clearTimeout(timers.hover);

      // If the mouse is not over the controls, set a timeout to hide them
      if (show || paused || loading) {
        _dom2.default.toggleClass(container, classes.hideControls, false);

        // Always show controls when paused or if touch
        if (paused || loading) {
          return;
        }

        // Delay for hiding on touch
        if (browser.isTouch) {
          delay = 3000;
        }
      }

      // If toggle is false or if we're playing (regardless of toggle),
      // then set the timer to hide the controls
      if (!show || !paused) {
        timers.hover = window.setTimeout(function () {
          // If the mouse is over the controls (and not entering fullscreen), bail
          if ((controls.pressed || controls.hover) && !isEnterFullscreen) {
            return;
          }

          _dom2.default.toggleClass(container, classes.hideControls, true);
        }, delay);
      }
    }
  }, {
    key: '_triggerEvent',
    value: function _triggerEvent(element, type, bubbles, properties) {
      _events2.default.customEvent(element, type, bubbles, _util2.default.extend({}, properties, {
        vplyr: this
      }));
    }
  }, {
    key: '_getPercentage',
    value: function _getPercentage(current, max) {
      if (current === 0 || max === 0 || isNaN(current) || isNaN(max)) {
        return 0;
      }
      return (current / max * 100).toFixed(2);
    }
  }, {
    key: '_toggleStyleHook',
    value: function _toggleStyleHook() {
      var config = this._config;
      var player = this._player;
      _dom2.default.toggleClass(player.container, config.selectors.container.replace('.', ''), player.supported.full);
    }
  }]);

  return Player;
}();

exports.default = Player;

},{"../config":1,"../utils/dom":7,"../utils/events":8,"../utils/logger":9,"../utils/util":10,"./controls":3,"./storage":6}],6:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupStorage = exports.updateStorage = undefined;

var _util = _dereq_('../utils/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateStorage = exports.updateStorage = function updateStorage(value, config, storage) {
  if (!_util.storageSupport || !config.storage.enabled) {
    return;
  }
  _util2.default.extend(storage, value);
  window.localStorage.setItem(config.storage.key, JSON.stringify(storage));
};
var setupStorage = exports.setupStorage = function setupStorage(config, storage) {
  var value = null;
  if (!_util.storageSupport || !config.storage.enabled) {
    return;
  }

  window.localStorage.removeItem('vplyr-volume');

  // load value from the current key
  value = window.localStorage.getItem(config.storage.key);

  if (!value) {
    return;
  } else if (/^\d+(\.\d+)?$/.test(value)) {
    updateStorage({ volume: parseFloat(value) }, config, storage);
  } else {
    // Assume it's JSON from this or a later version of plyr
    storage = JSON.parse(value);
  }
};

},{"../utils/util":10}],7:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = _dereq_('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dom = function () {
  function Dom() {
    _classCallCheck(this, Dom);
  }

  _createClass(Dom, null, [{
    key: 'wrap',
    value: function wrap(elements, wrapper) {
      // Convert `elements` to an array, if necessary.
      if (!elements.length) {
        elements = [elements];
      }

      // Loops backwards to prevent having to clone the wrapper on the
      // first element (see `child` below).
      for (var i = elements.length - 1; i >= 0; i--) {
        var child = i > 0 ? wrapper.cloneNode(true) : wrapper;
        var element = elements[i];

        // Cache the current parent and sibling.
        var parent = element.parentNode;
        var sibling = element.nextSibling;

        // Wrap the element (is automatically removed from its current
        // parent).
        child.appendChild(element);

        // If the element had a sibling, insert the wrapper before
        // the sibling to maintain the HTML structure; otherwise, just
        // append it to the parent.
        if (sibling) {
          parent.insertBefore(child, sibling);
        } else {
          parent.appendChild(child);
        }
        return child;
      }
    }
  }, {
    key: 'getClassname',
    value: function getClassname(selector) {
      return selector.replace('.', '');
    }
  }, {
    key: 'insertElement',
    value: function insertElement(type, parent, attributes) {
      // Create a new <element>
      var element = document.createElement(type);

      // Set all passed attributes
      Dom.setAttributes(element, attributes);

      // Inject the new element
      Dom.prependChild(parent, element);
    }
  }, {
    key: 'setAttributes',
    value: function setAttributes(element, attributes) {
      for (var key in attributes) {
        element.setAttribute(key, _is.boolean(attributes[key]) && attributes[key] ? '' : attributes[key]);
      }
    }
  }, {
    key: 'prependChild',
    value: function prependChild(parent, element) {
      parent.insertBefore(element, parent.firstChild);
    }
  }, {
    key: 'injectScript',
    value: function injectScript(source) {
      if (document.querySelectorAll('script[src="' + source + '"]').length) {
        return;
      }

      var tag = document.createElement('script');
      tag.src = source;
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }, {
    key: 'hasClass',
    value: function hasClass(element, className) {
      if (element) {
        if (element.classList) {
          return element.classList.contains(className);
        } else {
          return new RegExp('(\\s|^)' + className + '(\\s|$)').test(element.className);
        }
      }
      return false;
    }
  }, {
    key: 'removeElement',
    value: function removeElement(element) {
      if (!element) {
        return;
      }
      element.parentNode.removeChild(element);
    }
    // Toggle class on an element

  }, {
    key: 'toggleClass',
    value: function toggleClass(element, className, state) {
      if (element) {
        if (element.classList) {
          element.classList[state ? 'add' : 'remove'](className);
        } else {
          var name = (' ' + element.className + ' ').replace(/\s+/g, ' ').replace(' ' + className + ' ', '');
          element.className = name + (state ? ' ' + className : '');
        }
      }
    }
  }, {
    key: 'fullscreen',
    value: function fullscreen() {
      var fullscreen = {
        supportsFullScreen: false,
        isFullScreen: function isFullScreen() {
          return false;
        },
        requestFullScreen: function requestFullScreen() {},
        cancelFullScreen: function cancelFullScreen() {},
        fullScreenEventName: '',
        element: null,
        prefix: ''
      },
          browserPrefixes = 'webkit o moz ms khtml'.split(' ');

      // Check for native support
      if (!_util.is.undefined(document.cancelFullScreen)) {
        fullscreen.supportsFullScreen = true;
      } else {
        // Check for fullscreen support by vendor prefix
        for (var i = 0, il = browserPrefixes.length; i < il; i++) {
          fullscreen.prefix = browserPrefixes[i];

          if (!_util.is.undefined(document[fullscreen.prefix + 'CancelFullScreen'])) {
            fullscreen.supportsFullScreen = true;
            break;
          } else if (!_util.is.undefined(document.msExitFullscreen) && document.msFullscreenEnabled) {
            // Special case for MS (when isn't it?)
            fullscreen.prefix = 'ms';
            fullscreen.supportsFullScreen = true;
            break;
          }
        }
      }

      // Update methods to do something useful
      if (fullscreen.supportsFullScreen) {
        // Yet again Microsoft awesomeness,
        // Sometimes the prefix is 'ms', sometimes 'MS' to keep you on your toes
        fullscreen.fullScreenEventName = fullscreen.prefix === 'ms' ? 'MSFullscreenChange' : fullscreen.prefix + 'fullscreenchange';

        fullscreen.isFullScreen = function (element) {
          if (_util.is.undefined(element)) {
            element = document.body;
          }
          switch (this.prefix) {
            case '':
              return document.fullscreenElement === element;
            case 'moz':
              return document.mozFullScreenElement === element;
            default:
              return document[this.prefix + 'FullscreenElement'] === element;
          }
        };
        fullscreen.requestFullScreen = function (element) {
          if (_util.is.undefined(element)) {
            element = document.body;
          }
          return this.prefix === '' ? element.requestFullScreen() : element[this.prefix + (this.prefix === 'ms' ? 'RequestFullscreen' : 'RequestFullScreen')]();
        };
        fullscreen.cancelFullScreen = function () {
          return this.prefix === '' ? document.cancelFullScreen() : document[this.prefix + (this.prefix === 'ms' ? 'ExitFullscreen' : 'CancelFullScreen')]();
        };
        fullscreen.element = function () {
          return this.prefix === '' ? document.fullscreenElement : document[this.prefix + 'FullscreenElement'];
        };
      }

      return fullscreen;
    }
  }]);

  return Dom;
}();

exports.default = Dom;

},{"./util":10}],8:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = _dereq_('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = function () {
  function Event() {
    _classCallCheck(this, Event);
  }

  _createClass(Event, null, [{
    key: 'customEvent',
    value: function customEvent(element, type, bubbles, properties) {
      // Bail if no element
      if (!element || !type) {
        return;
      }

      // Default bubbles to false
      if (!_util.is.boolean(bubbles)) {
        bubbles = false;
      }

      // Create and dispatch the event
      var event = new CustomEvent(type, {
        bubbles: bubbles,
        detail: properties
      });

      // Dispatch the event
      element.dispatchEvent(event);
    }
  }, {
    key: 'onEvent',
    value: function onEvent(element, events, callback, useCapture) {
      if (element) {
        Event.toggleListener(element, events, callback, true, useCapture);
      }
    }
  }, {
    key: 'toggleListener',
    value: function toggleListener(element, events, callback, toggle, useCapture) {
      var eventList = events.split(' ');
      // Whether the listener is a capturing listener or not
      // Default to false
      if (!_util.is.boolean(useCapture)) {
        useCapture = false;
      }

      // If a nodelist is passed, call itself on each node
      if (element instanceof NodeList) {
        for (var x = 0; x < element.length; x++) {
          if (element[x] instanceof Node) {
            Event.toggleListener(element[x], arguments[1], arguments[2], arguments[3]);
          }
        }
        return;
      }

      // If a single node is passed, bind the event listener
      for (var i = 0; i < eventList.length; i++) {
        element[toggle ? 'addEventListener' : 'removeEventListener'](eventList[i], callback, useCapture);
      }
    }
  }, {
    key: 'proxyListener',
    value: function proxyListener(element, eventName, userListener, defaultListener, useCapture) {
      Event.onEvent(element, eventName, function (event) {
        if (userListener) {
          userListener.apply(element, [event]);
        }
        defaultListener.apply(element, [event]);
      }, useCapture);
    }
  }]);

  return Event;
}();

exports.default = Event;

},{"./util":10}],9:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Log = function () {
  function Log() {
    _classCallCheck(this, Log);
  }

  _createClass(Log, null, [{
    key: 'e',
    value: function e(tag, msg) {
      if (!Log.ENABLE_ERROR) {
        return;
      }
      if (!tag || Log.FORCE_GLOBAL_TAG) tag = Log.GLOBAL_TAG;
      var str = '[' + tag + '] > ' + msg;
      if (console.error) {
        console.error(str);
      } else if (console.warn) {
        console.warn(str);
      } else {
        console.log(str);
      }
    }
  }, {
    key: 'i',
    value: function i(tag, msg) {
      if (!Log.ENABLE_INFO) {
        return;
      }

      if (!tag || Log.FORCE_GLOBAL_TAG) tag = Log.GLOBAL_TAG;

      var str = '[' + tag + '] > ' + msg;

      if (console.info) {
        console.info(str);
      } else {
        console.log(str);
      }
    }
  }, {
    key: 'w',
    value: function w(tag, msg) {
      if (!Log.ENABLE_WARN) {
        return;
      }

      if (!tag || Log.FORCE_GLOBAL_TAG) tag = Log.GLOBAL_TAG;

      var str = '[' + tag + '] > ' + msg;

      if (console.warn) {
        console.warn(str);
      } else {
        console.log(str);
      }
    }
  }, {
    key: 'd',
    value: function d(tag, msg) {
      if (!Log.ENABLE_DEBUG) {
        return;
      }

      if (!tag || Log.FORCE_GLOBAL_TAG) tag = Log.GLOBAL_TAG;

      var str = '[' + tag + '] > ' + msg;

      if (console.debug) {
        console.debug(str);
      } else {
        console.log(str);
      }
    }
  }, {
    key: 'v',
    value: function v(tag, msg) {
      if (!Log.ENABLE_VERBOSE) {
        return;
      }

      if (!tag || Log.FORCE_GLOBAL_TAG) tag = Log.GLOBAL_TAG;
      console.log('[' + tag + '] > ' + msg);
    }
  }]);

  return Log;
}();

Log.GLOBAL_TAG = 'VPlyr';
Log.FORCE_GLOBAL_TAG = false;
Log.ENABLE_ERROR = true;
Log.ENABLE_INFO = true;
Log.ENABLE_WARN = true;
Log.ENABLE_DEBUG = true;
Log.ENABLE_VERBOSE = true;

exports.default = Log;

},{}],10:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: 'storageSupport',
    value: function storageSupport() {
      if (!('localStorage' in window)) {
        return false;
      }

      // Try to use it (it might be disabled, e.g. user is in private/porn mode)
      // see: https://github.com/Selz/plyr/issues/131
      try {
        // Add test item
        window.localStorage.setItem('___test', 'OK');

        // Get the test item
        var result = window.localStorage.getItem('___test');

        // Clean up
        window.localStorage.removeItem('___test');

        // Check if value matches
        return result === 'OK';
      } catch (e) {
        return false;
      }

      return false;
    }
  }, {
    key: 'replaceAll',
    value: function replaceAll(string, find, replace) {
      return string.replace(new RegExp(find.replace(/([.*+?\^=!:${}()|\[\]\/\\])/g, '\\$1'), 'g'), replace);
    }
  }, {
    key: 'extend',
    value: function extend() {
      // Get arguments
      var objects = arguments;

      // Bail if nothing to merge
      if (!objects.length) {
        return;
      }

      // Return first if specified but nothing to merge
      if (objects.length === 1) {
        return objects[0];
      }

      // First object is the destination
      var destination = Array.prototype.shift.call(objects),
          length = objects.length;

      // Loop through all objects to merge
      for (var i = 0; i < length; i++) {
        var source = objects[i];

        for (var property in source) {
          if (source[property] && source[property].constructor && source[property].constructor === Object) {
            destination[property] = destination[property] || {};
            Utils.extend(destination[property], source[property]);
          } else {
            destination[property] = source[property];
          }
        }
      }

      return destination;
    }
  }, {
    key: 'is',
    value: function is() {
      return {
        object: function object(input) {
          return input !== null && (typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object';
        },
        array: function array(input) {
          return input !== null && (typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object' && input.constructor === Array;
        },
        number: function number(input) {
          return input !== null && (typeof input === 'number' && !isNaN(input - 0) || (typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object' && input.constructor === Number);
        },
        string: function string(input) {
          return input !== null && (typeof input === 'string' || (typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object' && input.constructor === String);
        },
        boolean: function boolean(input) {
          return input !== null && typeof input === 'boolean';
        },
        nodeList: function nodeList(input) {
          return input !== null && input instanceof NodeList;
        },
        htmlElement: function htmlElement(input) {
          return input !== null && input instanceof HTMLElement;
        },
        function: function _function(input) {
          return input !== null && typeof input === 'function';
        },
        undefined: function undefined(input) {
          return input !== null && typeof input === 'undefined';
        }
      };
    }
  }, {
    key: 'browerSniff',
    value: function browerSniff() {
      var ua = navigator.userAgent,
          name = navigator.appName,
          fullVersion = '' + parseFloat(navigator.appVersion),
          majorVersion = parseInt(navigator.appVersion, 10),
          nameOffset = void 0,
          verOffset = void 0,
          ix = void 0,
          isIE = false,
          isFirefox = false,
          isChrome = false,
          isWechat = false,
          isSafari = false;

      if (navigator.appVersion.indexOf('Windows NT') !== -1 && navigator.appVersion.indexOf('rv:11') !== -1) {
        // MSIE 11
        isIE = true;
        name = 'IE';
        fullVersion = '11';
      } else if ((verOffset = ua.indexOf('MSIE')) !== -1) {
        // MSIE
        isIE = true;
        name = 'IE';
        fullVersion = ua.substring(verOffset + 5);
      } else if ((verOffset = ua.indexOf('micromessenger')) !== -1) {
        // WeChat
        isWechat = true;
        name = 'WeChat';
        fullVersion = ua.substring(verOffset + 15);
      } else if ((verOffset = ua.indexOf('Chrome')) !== -1) {
        // Chrome
        isChrome = true;
        name = 'Chrome';
        fullVersion = ua.substring(verOffset + 7);
      } else if ((verOffset = ua.indexOf('Safari')) !== -1) {
        // Safari
        isSafari = true;
        name = 'Safari';
        fullVersion = ua.substring(verOffset + 7);
        if ((verOffset = ua.indexOf('Version')) !== -1) {
          fullVersion = ua.substring(verOffset + 8);
        }
      } else if ((verOffset = ua.indexOf('Firefox')) !== -1) {
        // Firefox
        isFirefox = true;
        name = 'Firefox';
        fullVersion = ua.substring(verOffset + 8);
      } else if ((nameOffset = ua.lastIndexOf(' ') + 1) < (verOffset = ua.lastIndexOf('/'))) {
        // In most other browsers, 'name/version' is at the end of userAgent
        name = ua.substring(nameOffset, verOffset);
        fullVersion = ua.substring(verOffset + 1);

        if (name.toLowerCase() === name.toUpperCase()) {
          name = navigator.appName;
        }
      }

      // Trim the fullVersion string at semicolon/space if present
      if ((ix = fullVersion.indexOf(';')) !== -1) {
        fullVersion = fullVersion.substring(0, ix);
      }
      if ((ix = fullVersion.indexOf(' ')) !== -1) {
        fullVersion = fullVersion.substring(0, ix);
      }

      // Get major version
      majorVersion = parseInt('' + fullVersion, 10);
      if (isNaN(majorVersion)) {
        fullVersion = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
      }

      // Return data
      return {
        name: name,
        version: majorVersion,
        isIE: isIE,
        isFirefox: isFirefox,
        isChrome: isChrome,
        isSafari: isSafari,
        isWechat: isWechat,
        isIos: /(iPad|iPhone|iPod)/g.test(navigator.platform),
        isIphone: /(iPhone|iPod)/g.test(navigator.userAgent),
        isTouch: 'ontouchstart' in document.documentElement
      };
    }
  }, {
    key: 'inArray',
    value: function inArray(haystack, needle) {
      return Array.prototype.indexOf && haystack.indexOf(needle) !== -1;
    }
  }, {
    key: 'support',
    value: function support(type) {
      var browser = Utils.browserSniff(),
          isOldIE = browser.isIE && browser.version <= 9,
          isIos = browser.isIos,
          isIphone = browser.isIphone,
          audioSupport = !!document.createElement('audio').canPlayType,
          videoSupport = !!document.createElement('video').canPlayType;
      var basic = false,
          full = false;

      switch (type) {
        case 'video':
          basic = videoSupport;
          full = basic && !isOldIE;
          break;

        case 'audio':
          basic = audioSupport;
          full = basic && !isOldIE;
          break;

        default:
          basic = audioSupport && videoSupport;
          full = basic && !isOldIE;
      }

      return {
        basic: basic,
        full: full
      };
    }
  }, {
    key: 'supported',
    value: function supported(type) {
      var browser = Utils.browerSniff(),
          isOldIE = browser.isIE && browser.version <= 9,
          isIos = browser.isIos,
          isIphone = browser.isIphone,
          audioSupport = !!document.createElement('audio').canPlayType,
          videoSupport = !!document.createElement('video').canPlayType;
      var basic = false,
          full = false;

      switch (type) {
        case 'video':
          basic = videoSupport;
          full = basic && !isOldIE;
          break;

        case 'audio':
          basic = audioSupport;
          full = basic && !isOldIE;
          break;

        default:
          basic = audioSupport && videoSupport;
          full = basic && !isOldIE;
      }

      return {
        basic: basic,
        full: full
      };
    }
  }]);

  return Utils;
}();

exports.default = Utils;
var is = exports.is = Utils.is();
var storageSupport = exports.storageSupport = Utils.storageSupport();

},{}],11:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = _dereq_('./player/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vPlayer = _index2.default;

Object.defineProperty(vPlayer, 'version', {
    enumerable: true,
    get: function get() {
        // replaced by browserify-versionify transform
        return '0.0.1';
    }
});
exports.default = vPlayer;

},{"./player/index":4}]},{},[2])(2)
});

//# sourceMappingURL=vplyr.js.map
