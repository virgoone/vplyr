(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.vplyr || (g.vplyr = {})).js = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
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

    this.toggleClass = this._toggleClass.bind(this);
    this.removeElement = this._removeElement.bind(this);
    this.hasClass = this._hasClass.bind(this);
    this.injectScript = this._injectScript.bind(this);
    this.prependChild = this._prependChild.bind(this);
    this.setAttributes = this._setAttributes.bind(this);
    this.insertElement = this._insertElement.bind(this);
    this.getClassname = this._getClassname.bind(this);
    this.fullscreen = this._fullscreen.bind(this);
  }

  _createClass(Dom, [{
    key: '_getClassname',
    value: function _getClassname(selector) {
      return selector.replace('.', '');
    }
  }, {
    key: '_insertElement',
    value: function _insertElement(type, parent, attributes) {
      // Create a new <element>
      var element = document.createElement(type);

      // Set all passed attributes
      _setAttributes(element, attributes);

      // Inject the new element
      _prependChild(parent, element);
    }
  }, {
    key: '_setAttributes',
    value: function _setAttributes(element, attributes) {
      for (var key in attributes) {
        element.setAttribute(key, _is.boolean(attributes[key]) && attributes[key] ? '' : attributes[key]);
      }
    }
  }, {
    key: '_prependChild',
    value: function _prependChild(parent, element) {
      parent.insertBefore(element, parent.firstChild);
    }
  }, {
    key: '_injectScript',
    value: function _injectScript(source) {
      if (document.querySelectorAll('script[src="' + source + '"]').length) {
        return;
      }

      var tag = document.createElement('script');
      tag.src = source;
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }, {
    key: '_hasClass',
    value: function _hasClass(element, className) {
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
    key: '_removeElement',
    value: function _removeElement(element) {
      if (!element) {
        return;
      }
      element.parentNode.removeChild(element);
    }
    // Toggle class on an element

  }, {
    key: '_toggleClass',
    value: function _toggleClass(element, className, state) {
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
    key: '_fullscreen',
    value: function _fullscreen() {
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
      if (!_util2.default.is.undefined(document.cancelFullScreen)) {
        fullscreen.supportsFullScreen = true;
      } else {
        // Check for fullscreen support by vendor prefix
        for (var i = 0, il = browserPrefixes.length; i < il; i++) {
          fullscreen.prefix = browserPrefixes[i];

          if (!_util2.default.is.undefined(document[fullscreen.prefix + 'CancelFullScreen'])) {
            fullscreen.supportsFullScreen = true;
            break;
          } else if (!_util2.default.is.undefined(document.msExitFullscreen) && document.msFullscreenEnabled) {
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
          if (_util2.default.is.undefined(element)) {
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
          if (_util2.default.is.undefined(element)) {
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

exports.default = new Dom();

},{"./util":8}],3:[function(_dereq_,module,exports){
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

    this.onEvent = this._on.bind(this);
    this.customEvent = this._event.bind(this);
  }

  _createClass(Event, [{
    key: '_event',
    value: function _event(element, type, bubbles, properties) {
      // Bail if no element
      if (!element || !type) {
        return;
      }

      // Default bubbles to false
      if (!_util2.default.is.boolean(bubbles)) {
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
    key: '_on',
    value: function _on(element, events, callback, useCapture) {
      if (element) {
        this._toggleListener(element, events, callback, true, useCapture);
      }
    }
  }, {
    key: '_toggleListener',
    value: function _toggleListener(element, events, callback, toggle, useCapture) {
      var eventList = events.split(' ');
      // Whether the listener is a capturing listener or not
      // Default to false
      if (!_util2.default.is.boolean(useCapture)) {
        useCapture = false;
      }

      // If a nodelist is passed, call itself on each node
      if (element instanceof NodeList) {
        for (var x = 0; x < element.length; x++) {
          if (element[x] instanceof Node) {
            this._toggleListener(element[x], arguments[1], arguments[2], arguments[3]);
          }
        }
        return;
      }

      // If a single node is passed, bind the event listener
      for (var i = 0; i < eventList.length; i++) {
        element[toggle ? 'addEventListener' : 'removeEventListener'](eventList[i], callback, useCapture);
      }
    }
  }]);

  return Event;
}();

exports.default = new Event();

},{"./util":8}],4:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _vplyr = _dereq_('./vplyr.js');

var _vplyr2 = _interopRequireDefault(_vplyr);

var _polyfill = _dereq_('./polyfill.js');

var _polyfill2 = _interopRequireDefault(_polyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;(function (root, factory) {
    'use strict';
    /*global define,module*/

    if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
        // Node, CommonJS-like
        module.exports = factory(root, document);
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define([], function () {
            return factory(root, document);
        });
    } else {
        // Browser globals (root is window)
        root.vplyr = factory(root, document);
    }
})(typeof window !== 'undefined' ? window : undefined, function (window, document) {
    _polyfill2.default.install();
    window.vPlayer = _vplyr2.default;
});

},{"./polyfill.js":7,"./vplyr.js":9}],5:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = _dereq_('./util.js');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Log = function () {
  function Log(config) {
    _classCallCheck(this, Log);

    this._config = config;
    this.log = this._log.bind(this);
    this.warn = this._warn.bind(this);
    this.console = this._console.bind(this);
  }

  _createClass(Log, [{
    key: '_console',
    value: function _console(type, args) {
      if (this._config.debug && window.console) {
        args = Array.prototype.slice.call(args);

        if (_util2.default.is.string(this._config.logPrefix) && this._config.logPrefix.length) {
          args.unshift(this._config.logPrefix);
        }
        console[type].apply(console, args);
      }
    }
  }, {
    key: '_log',
    value: function _log() {
      this._console('log', arguments);
    }
  }, {
    key: '_warn',
    value: function _warn() {
      this._console('warn', arguments);
    }
  }]);

  return Log;
}();

exports.default = Log;

},{"./util.js":8}],6:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = _dereq_('./util');

var _util2 = _interopRequireDefault(_util);

var _dom = _dereq_('./dom');

var _dom2 = _interopRequireDefault(_dom);

var _event = _dereq_('./event');

var _event2 = _interopRequireDefault(_event);

var _logger2 = _dereq_('./logger');

var _logger3 = _interopRequireDefault(_logger2);

var _config = _dereq_('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _log = void 0,
    _warn = void 0;


var playerMap = new WeakMap();
var fullscreen = _dom2.default.fullscreen();

var Player = function () {
  function Player(media, config) {
    _classCallCheck(this, Player);

    var _logger = new _logger3.default(config);

    this._log = _logger.log;
    this._warn = _logger.warn;
    playerMap.set(this, {
      media: media,
      config: config,
      player: {},
      timers: {},
      fullscreen: fullscreen,
      original: null,
      storage: {}
    });
    this._init();
    this._log(this, _dom2.default);
  }

  _createClass(Player, [{
    key: 'pause',
    value: function pause() {
      this._pause();
    }
  }, {
    key: 'play',
    value: function play() {
      this._play();
    }
  }, {
    key: 'stop',
    value: function stop() {
      this._pause();
      this._seek();
    }
  }, {
    key: 'togglePlay',
    value: function togglePlay() {
      this._togglePlay();
    }
  }, {
    key: 'toggleControls',
    value: function toggleControls() {
      this._toggleControls();
    }
  }, {
    key: '_init',
    value: function _init() {
      var _playerMap$get = playerMap.get(this),
          player = _playerMap$get.player,
          media = _playerMap$get.media,
          config = _playerMap$get.config;

      var _playerMap$get2 = playerMap.get(this),
          original = _playerMap$get2.original;

      original = media.cloneNode(true);
      player.media = media;
      this._log('Config', config);

      this._setup();
      this._log('player', player);
      if (!this.__init__) {
        return null;
      }
    }
  }, {
    key: '_setup',
    value: function _setup() {
      if (this.__init__) {
        return null;
      }

      var _playerMap$get3 = playerMap.get(this),
          original = _playerMap$get3.original,
          player = _playerMap$get3.player,
          config = _playerMap$get3.config;

      var media = player.media;

      player.browser = _util2.default.browserSniff;
      if (!_util2.default.is.htmlElement(media)) {
        return;
      }
      this._setupStorage(); //设置storage
      var tagName = media.tagName.toLowerCase();
      player.type = tagName;
      config.crossorigin = media.getAttribute('crossorigin') !== null;
      config.autoplay = config.autoplay || media.getAttribute('autoplay') !== null;
      config.loop = config.loop || media.getAttribute('loop') !== null;
      player.supported = _util2.default.supported(player.type);
      if (!player.supported.basic) {
        return;
      }
      player.container = this._wrap(media, document.createElement('div'));
      player.container.setAttribute('tabindex', 0);
      this._toggleStyleHook();
      this._log('' + player.browser.name + ' ' + player.browser.version);
      this._setupMedia();

      if (_util2.default.inArray(config.types.html5, player.type)) {
        // Setup UI
        this._setupInterface();

        this._ready();
      }
      this.__init__ = true;
    }
  }, {
    key: '_ready',
    value: function _ready() {
      var _this = this;

      var _playerMap$get4 = playerMap.get(this),
          player = _playerMap$get4.player,
          config = _playerMap$get4.config;

      var media = player.media,
          container = player.container;

      // Ready event at end of execution stack

      window.setTimeout(function () {
        _this._triggerEvent(media, 'ready');
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
    key: '_setupInterface',
    value: function _setupInterface() {
      var _playerMap$get5 = playerMap.get(this),
          player = _playerMap$get5.player,
          config = _playerMap$get5.config;

      var _getElements = function _getElements(selector) {
        return player.container.querySelectorAll(selector);
      };
      var _getElement = function _getElement(selector) {
        return _getElements(selector)[0];
      };
      if (!player.supported.full) {
        this._warn('Basic support only', player.type);

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
      // Find the elements
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
    key: '_setupStorage',
    value: function _setupStorage() {
      var value = null;

      var _playerMap$get6 = playerMap.get(this),
          config = _playerMap$get6.config,
          storage = _playerMap$get6.storage;
      // Bail if we don't have localStorage support or it's disabled


      if (!_util2.default.storageSupport || !config.storage.enabled) {
        return;
      }

      window.localStorage.removeItem('vplyr-volume');

      // load value from the current key
      value = window.localStorage.getItem(config.storage.key);

      if (!value) {
        // Key wasn't set (or had been cleared), move along
        return;
      } else if (/^\d+(\.\d+)?$/.test(value)) {
        // If value is a number, it's probably volume from an older
        // version of plyr. See: https://github.com/Selz/plyr/pull/313
        // Update the key to be JSON
        this._updateStorage({ volume: parseFloat(value) });
      } else {
        // Assume it's JSON from this or a later version of plyr
        storage = JSON.parse(value);
      }
    }
  }, {
    key: '_triggerEvent',
    value: function _triggerEvent(element, type, bubbles, properties) {
      _event2.default.customEvent(element, type, bubbles, _util2.default.extend({}, properties, {
        vplyr: this
      }));
    }
  }, {
    key: '_getDuration',
    value: function _getDuration() {
      var _playerMap$get7 = playerMap.get(this),
          config = _playerMap$get7.config,
          player = _playerMap$get7.player;

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
      var _playerMap$get8 = playerMap.get(this),
          player = _playerMap$get8.player;

      var media = player.media;

      var targetTime = 0,
          paused = media.paused,
          duration = this._getDuration();

      if (_util2.default.is.number(input)) {
        targetTime = input;
      } else if (_util2.default.is.object(input) && _util2.default.inArray(['input', 'change'], input.type)) {
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
      // Logging
      this._log('Seeking to ' + media.currentTime + ' seconds');
    }
  }, {
    key: '_play',
    value: function _play() {
      var _playerMap$get9 = playerMap.get(this),
          player = _playerMap$get9.player;

      var media = player.media;

      if ('play' in media) {
        media.play();
      }
    }
  }, {
    key: '_pause',
    value: function _pause() {
      var _playerMap$get10 = playerMap.get(this),
          player = _playerMap$get10.player;

      var media = player.media;

      if ('pause' in media) {
        media.pause();
      }
    }
  }, {
    key: '_togglePlay',
    value: function _togglePlay(toggle) {
      var _playerMap$get11 = playerMap.get(this),
          player = _playerMap$get11.player;

      var media = player.media;
      // True toggle

      if (!_util2.default.is.boolean(toggle)) {
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
    key: '_getPercentage',
    value: function _getPercentage(current, max) {
      if (current === 0 || max === 0 || isNaN(current) || isNaN(max)) {
        return 0;
      }
      return (current / max * 100).toFixed(2);
    }
  }, {
    key: '_updateSeekDisplay',
    value: function _updateSeekDisplay(time) {
      // Default to 0
      if (!_util2.default.is.number(time)) {
        time = 0;
      }

      var _playerMap$get12 = playerMap.get(this),
          player = _playerMap$get12.player;

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
    key: '_mediaListeners',
    value: function _mediaListeners() {
      var _playerMap$get13 = playerMap.get(this),
          player = _playerMap$get13.player;

      var media = player.media;
      // Time change on media

      _event2.default.onEvent(media, 'timeupdate seeking', this._timeUpdate.bind(this));

      _event2.default.onEvent(media, 'durationchange loadedmetadata', this._displayDuration.bind(this));

      _event2.default.onEvent(media, 'play pause ended', this._checkPlaying.bind(this));

      _event2.default.onEvent(media, 'progress playing', this._updateProgress.bind(this));

      _event2.default.onEvent(media, 'waiting canplay seeked', this._checkLoading.bind(this));

      _event2.default.onEvent(media, 'volumechange', this._updateVolume.bind(this));
    }
  }, {
    key: '_proxyListener',
    value: function _proxyListener(element, eventName, userListener, defaultListener, useCapture) {
      _event2.default.onEvent(element, eventName, function (event) {
        if (userListener) {
          userListener.apply(element, [event]);
        }
        defaultListener.apply(element, [event]);
      }, useCapture);
    }
  }, {
    key: '_controlListeners',
    value: function _controlListeners() {
      var _this2 = this;

      var _playerMap$get14 = playerMap.get(this),
          player = _playerMap$get14.player,
          config = _playerMap$get14.config,
          fullscreen = _playerMap$get14.fullscreen;

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
        var play = _this2._togglePlay();
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
      this._proxyListener(buttons.play, 'click', listeners.play, togglePlay);
      // Pause
      this._proxyListener(buttons.pause, 'click', listeners.pause, togglePlay);
      // Seek
      this._proxyListener(buttons.seek, inputEvent, listeners.seek, this._seek.bind(this));

      this._proxyListener(volume.input, inputEvent, listeners.volume, function () {
        _this2._setVolume(volume.input.value);
      });
      this._proxyListener(buttons.mute, 'click', listeners.mute, this._toggleMute.bind(this));

      this._proxyListener(buttons.fullscreen, 'click', listeners.fullscreen, this._toggleFullscreen.bind(this));

      // Handle user exiting fullscreen by escaping etc
      if (fullscreen.supportsFullScreen) {
        _event2.default.onEvent(document, fullscreen.fullScreenEventName, this._toggleFullscreen.bind(this));
      }
      if (hideControls) {
        // Toggle controls on mouse events and entering fullscreen
        _event2.default.onEvent(container, 'mouseenter mouseleave mousemove touchstart touchend touchcancel touchmove enterfullscreen', this._toggleControls.bind(this));

        // Watch for cursor over controls so they don't hide when trying to interact
        _event2.default.onEvent(controls, 'mouseenter mouseleave', function (event) {
          player.controls.hover = event.type === 'mouseenter';
        });

        // Watch for cursor over controls so they don't hide when trying to interact
        _event2.default.onEvent(controls, 'mousedown mouseup touchstart touchend touchcancel', function (event) {
          player.controls.pressed = _util2.default.inArray(['mousedown', 'touchstart'], event.type);
        });
        // Focus in/out on controls
        _event2.default.onEvent(controls, 'focus blur', this._toggleControls.bind(this), true);
      }
    }
  }, {
    key: '_toggleFullscreen',
    value: function _toggleFullscreen(event) {
      // Check for native support
      var _playerMap$get15 = playerMap.get(this),
          player = _playerMap$get15.player,
          config = _playerMap$get15.config,
          fullscreen = _playerMap$get15.fullscreen;

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
    key: '_focusTrap',
    value: function _focusTrap() {
      var _playerMap$get16 = playerMap.get(this),
          player = _playerMap$get16.player,
          config = _playerMap$get16.config;

      var container = player.container;

      var _getElements = function _getElements(selector) {
        return container.querySelectorAll(selector);
      };
      var _getElement = function _getElement(selector) {
        return _getElements(selector)[0];
      };
      var tabbables = _getElements('input:not([disabled]), button:not([disabled])'),
          first = tabbables[0],
          last = tabbables[tabbables.length - 1];

      function _checkFocus(event) {
        // If it is TAB
        if (event.which === 9 && isFullscreen) {
          if (event.target === last && !event.shiftKey) {
            // Move focus to first element that can be tabbed if Shift isn't used
            event.preventDefault();
            first.focus();
          } else if (event.target === first && event.shiftKey) {
            // Move focus to last element that can be tabbed if Shift is used
            event.preventDefault();
            last.focus();
          }
        }
      }

      // Bind the handler
      _event2.default.onEvent(container, 'keydown', _checkFocus);
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
    key: '_checkLoading',
    value: function _checkLoading(event) {
      var _this3 = this;

      var _playerMap$get17 = playerMap.get(this),
          player = _playerMap$get17.player,
          config = _playerMap$get17.config,
          timers = _playerMap$get17.timers;

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
      var _playerMap$get18 = playerMap.get(this),
          player = _playerMap$get18.player,
          config = _playerMap$get18.config;

      var media = player.media,
          container = player.container;
      var classes = config.classes;
      var paused = media.paused;

      _dom2.default.toggleClass(container, classes.playing, !paused);

      _dom2.default.toggleClass(container, classes.stopped, paused);

      this._toggleControls(paused);
    }
  }, {
    key: '_timeUpdate',
    value: function _timeUpdate(event) {
      var _playerMap$get19 = playerMap.get(this),
          player = _playerMap$get19.player,
          config = _playerMap$get19.config;

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

      var _playerMap$get20 = playerMap.get(this),
          player = _playerMap$get20.player;

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
      var _playerMap$get21 = playerMap.get(this),
          player = _playerMap$get21.player;

      var supported = player.supported;

      if (!supported.full) {
        return;
      }

      // Default to 0
      if (_util2.default.is.undefined(value)) {
        value = 0;
      }
      // Default to buffer or bail
      if (_util2.default.is.undefined(progress)) {
        if (player.progress && player.progress.buffer) {
          progress = player.progress.buffer;
        } else {
          return;
        }
      }

      // One progress element passed
      if (_util2.default.is.htmlElement(progress)) {
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
    key: '_setVolume',
    value: function _setVolume(volume) {
      var _playerMap$get22 = playerMap.get(this),
          player = _playerMap$get22.player,
          config = _playerMap$get22.config,
          storage = _playerMap$get22.storage;

      var media = player.media;

      var max = config.volumeMax,
          min = config.volumeMin;

      // Load volume from storage if no value specified
      if (_util2.default.is.undefined(volume)) {
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
    key: '_updateVolume',
    value: function _updateVolume() {
      var _playerMap$get23 = playerMap.get(this),
          player = _playerMap$get23.player,
          config = _playerMap$get23.config,
          storage = _playerMap$get23.storage;

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
      this._updateStorage({ volume: __volume });

      // Toggle class if muted
      _dom2.default.toggleClass(container, classes.muted, __volume === 0);

      // Update checkbox for mute state
      if (supported.full && buttons.mute) {
        this._toggleState(buttons.mute, volume === 0);
      }
    }
  }, {
    key: '_updateStorage',
    value: function _updateStorage(value) {
      var _playerMap$get24 = playerMap.get(this),
          storage = _playerMap$get24.storage,
          config = _playerMap$get24.config;

      // Bail if we don't have localStorage support or it's disabled


      if (!_util2.default.storageSupport || !config.storage.enabled) {
        return;
      }

      // Update the working copy of the values
      _util2.default.extend(storage, value);

      // Update storage
      window.localStorage.setItem(config.storage.key, JSON.stringify(storage));
    }
  }, {
    key: '_toggleState',
    value: function _toggleState(target, state) {
      // Bail if no target
      if (!target) {
        return;
      }
      // Get state
      state = _util2.default.is.boolean(state) ? state : !target.getAttribute('aria-pressed');

      // Set the attribute on target
      target.setAttribute('aria-pressed', state);
      return state;
    }
  }, {
    key: '_toggleMute',
    value: function _toggleMute(muted) {
      var _playerMap$get25 = playerMap.get(this),
          player = _playerMap$get25.player,
          config = _playerMap$get25.config,
          storage = _playerMap$get25.storage;

      var media = player.media;

      if (!_util2.default.is.boolean(muted)) {
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
    key: '_displayDuration',
    value: function _displayDuration() {
      var _playerMap$get26 = playerMap.get(this),
          player = _playerMap$get26.player,
          config = _playerMap$get26.config,
          storage = _playerMap$get26.storage;

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
    key: '_updateTimeDisplay',
    value: function _updateTimeDisplay(time, element) {
      var _playerMap$get27 = playerMap.get(this),
          player = _playerMap$get27.player;

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
    key: '_injectControls',
    value: function _injectControls() {
      var _playerMap$get28 = playerMap.get(this),
          player = _playerMap$get28.player,
          config = _playerMap$get28.config;

      var html = config.html,
          selectors = config.selectors;
      var container = player.container;
      // Insert custom video controls

      this._log('Injecting custom controls');
      // If no controls are specified, create default
      if (!html) {
        html = this._buildControls();
      }
      var random = Math.floor(Math.random() * 1000000);
      container.setAttribute('id', 'vplyr' + random);
      html = _util2.default.replaceAll(html, '{id}', random);
      var target = void 0;
      if (_util2.default.is.string(selectors.controls.container)) {
        target = document.querySelector(selectors.controls.container);
      }
      // Inject into the container by default
      if (!_util2.default.is.htmlElement(target)) {
        target = container;
      }
      target.insertAdjacentHTML('beforeend', html);
    }
  }, {
    key: '_findElements',
    value: function _findElements() {
      var _playerMap$get29 = playerMap.get(this),
          player = _playerMap$get29.player,
          config = _playerMap$get29.config;

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
    key: '_buildControls',
    value: function _buildControls() {
      var _playerMap$get30 = playerMap.get(this),
          config = _playerMap$get30.config;

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
    }
  }, {
    key: '_toggleControls',
    value: function _toggleControls(toggle) {
      var _playerMap$get31 = playerMap.get(this),
          player = _playerMap$get31.player,
          config = _playerMap$get31.config,
          timers = _playerMap$get31.timers;

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
      if (!_util2.default.is.boolean(toggle)) {
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
    key: '_setupMedia',
    value: function _setupMedia() {
      var _playerMap$get32 = playerMap.get(this),
          original = _playerMap$get32.original,
          player = _playerMap$get32.player,
          config = _playerMap$get32.config;

      if (!player.media) {
        this._warn('No media element found!');
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
          this._wrap(player.media, wrapper);
          // Cache the container
          player.videoContainer = wrapper;
        }
      }
    }
  }, {
    key: '_toggleNativeControls',
    value: function _toggleNativeControls(toggle) {
      var _playerMap$get33 = playerMap.get(this),
          player = _playerMap$get33.player,
          config = _playerMap$get33.config;

      var media = player.media;

      if (toggle && _util2.default.inArray(config.types.html5, player.type)) {
        media.setAttribute('controls', '');
      } else {
        media.removeAttribute('controls');
      }
    }
  }, {
    key: '_wrap',
    value: function _wrap(elements, wrapper) {
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
    key: '_toggleStyleHook',
    value: function _toggleStyleHook() {
      var _playerMap$get34 = playerMap.get(this),
          player = _playerMap$get34.player,
          config = _playerMap$get34.config;

      _dom2.default.toggleClass(player.container, config.selectors.container.replace('.', ''), player.supported.full);
    }
  }, {
    key: 'loadingState',
    get: function get() {
      var _playerMap$get35 = playerMap.get(this),
          player = _playerMap$get35.player,
          config = _playerMap$get35.config;

      var container = player.container;
      var classes = config.classes;

      return _dom2.default.hasClass(container, classes.loading);
    }
  }, {
    key: 'readyState',
    get: function get() {
      var _playerMap$get36 = playerMap.get(this),
          player = _playerMap$get36.player,
          config = _playerMap$get36.config;

      var container = player.container;
      var classes = config.classes;

      return _dom2.default.hasClass(container, classes.ready);
    }
  }, {
    key: 'container',
    get: function get() {
      var _playerMap$get37 = playerMap.get(this),
          player = _playerMap$get37.player;

      return player.container;
    }
  }, {
    key: 'type',
    get: function get() {
      var _playerMap$get38 = playerMap.get(this),
          player = _playerMap$get38.player;

      return player.type;
    }
  }, {
    key: 'volume',
    get: function get() {
      var _playerMap$get39 = playerMap.get(this),
          player = _playerMap$get39.player;

      return player.media.volume;
    },
    set: function set(value) {
      return this._setVolume(value);
    }
  }, {
    key: 'duration',
    get: function get() {
      return this._getDuration();
    }
  }, {
    key: 'currentTime',
    get: function get() {
      var _playerMap$get40 = playerMap.get(this),
          player = _playerMap$get40.player;

      return player.media.currentTime;
    },
    set: function set(value) {
      this.seek(value);
    }
  }, {
    key: 'fullscreen',
    get: function get() {
      var _playerMap$get41 = playerMap.get(this),
          player = _playerMap$get41.player;

      return player.isFullscreen || false;
    },
    set: function set(fullscreen) {
      if (!_util2.default.is.boolean(fullscreen)) {
        return;
      }

      var _playerMap$get42 = playerMap.get(this),
          player = _playerMap$get42.player;

      if (!player.isFullscreen && fullscreen || player.isFullscreen && !fullscreen) {
        this._toggleFullscreen();
      }
    }
  }, {
    key: 'muted',
    get: function get() {
      var _playerMap$get43 = playerMap.get(this),
          player = _playerMap$get43.player;

      return player.media.muted;
    },
    set: function set(muted) {
      this._toggleMute(muted);
    }
  }, {
    key: 'paused',
    get: function get() {
      var _playerMap$get44 = playerMap.get(this),
          player = _playerMap$get44.player;

      return player.media.paused;
    }
  }]);

  return Player;
}();

exports.default = Player;

},{"./config":1,"./dom":2,"./event":3,"./logger":5,"./util":8}],7:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Polyfill = function () {
    function Polyfill() {
        _classCallCheck(this, Polyfill);

        this.install = this._install.bind(this);
    }

    _createClass(Polyfill, [{
        key: '_install',
        value: function _install() {
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
        }
    }]);

    return Polyfill;
}();

exports.default = new Polyfill();

},{}],8:[function(_dereq_,module,exports){
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

    this.browserSniff = this._browserSniff.bind(this)();
    this.is = this._is.bind(this)();
    this.storageSupport = this._storageSupport.bind(this)();
    this.extend = this._extend.bind(this);
    this.matches = this._matches.bind(this);
    this.inArray = this._inArray.bind(this);
    this.supported = this._support.bind(this);
    this.replaceAll = this._replaceAll.bind(this);
  }

  _createClass(Utils, [{
    key: '_replaceAll',
    value: function _replaceAll(string, find, replace) {
      return string.replace(new RegExp(find.replace(/([.*+?\^=!:${}()|\[\]\/\\])/g, '\\$1'), 'g'), replace);
    }
  }, {
    key: '_support',
    value: function _support(type) {
      var browser = this._browserSniff(),
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
    key: '_inArray',
    value: function _inArray(haystack, needle) {
      return Array.prototype.indexOf && haystack.indexOf(needle) !== -1;
    }
  }, {
    key: '_matches',
    value: function _matches(element, selector) {
      var p = Element.prototype;

      var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function (s) {
        return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
      };

      return f.call(element, selector);
    }
  }, {
    key: '_extend',
    value: function _extend() {
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
            this._extend(destination[property], source[property]);
          } else {
            destination[property] = source[property];
          }
        }
      }

      return destination;
    }
    //remove an element

  }, {
    key: '_storageSupport',
    value: function _storageSupport() {
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
    key: '_browserSniff',
    value: function _browserSniff() {
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
    key: '_is',
    value: function _is() {
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
  }]);

  return Utils;
}();

exports.default = new Utils();

},{}],9:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = _dereq_('./util');

var _util2 = _interopRequireDefault(_util);

var _dom = _dereq_('./dom');

var _dom2 = _interopRequireDefault(_dom);

var _config = _dereq_('./config');

var _event = _dereq_('./event');

var _event2 = _interopRequireDefault(_event);

var _player = _dereq_('./player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var vPlayer = function () {
  function vPlayer(targets, options) {
    _classCallCheck(this, vPlayer);

    this.TAG = 'VideoPlayer';
    this.players = this._init(targets, options);
  }

  _createClass(vPlayer, [{
    key: '_init',
    value: function _init(targets, options) {
      var _targets = this.__getTargets(targets, options);

      if (!_util2.default.supported().basic || !_targets.length) {
        return false;
      }
      var players = [],
          instances = [];
      var selector = [_config.defaultConfig.selectors.html5].join(',');
      var _add = function _add(target, media) {
        if (!_dom2.default.hasClass(media, _config.defaultConfig.classes.hook)) {
          players.push({
            target: target,
            media: media
          });
        }
      }; //end add
      for (var i = 0; i < _targets.length; i++) {
        var target = _targets[i];

        // Get children
        var children = target.querySelectorAll(selector);

        // If there's more than one media element child, wrap them
        if (children.length) {
          for (var x = 0; x < children.length; x++) {
            _add(target, children[x]);
          }
        } else if (this.__matches(target, selector)) {
          // Target is media element
          _add(target, target);
        }
      } // end for
      console.log('players--->', players);
      players.forEach(function (player) {
        var element = player.target;
        var media = player.media;
        var match = false;
        if (media === element) {
          match = true;
        }
        var data = {};
        try {
          data = JSON.parse(element.getAttribute('data-vplyr'));
        } catch (e) {}
        var config = _util2.default.extend({}, _config.defaultConfig, options, data);
        if (!config.enabled) {
          return null;
        }
        var instance = new _player2.default(media, config);
        window.instance = instance;
        console.log('instance', instance);
        // Go to next if setup failed
        if (!_util2.default.is.object(instance)) {
          return;
        }
        // if (config.debug) {
        //   var events = config.events.concat(['setup', 'statechange', 'enterfullscreen', 'exitfullscreen', 'captionsenabled', 'captionsdisabled']);
        //   Event.onEvent(instance.API.getContainer(), events.join(' '), function(event) {
        //       console.log([config.logPrefix, 'event:', event.type].join(' '), event.detail.vplyr);
        //   });
        // }
        // // Callback
        // Event.customEvent(instance.API.getContainer(), 'setup', true, {
        //   vplyr: instance
        // });

        // Add to return array even if it's already setup
        instances.push(instance);
      });
      return instances;
    }
  }, {
    key: '__matches',
    value: function __matches(element, selector) {
      var p = Element.prototype;

      var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function (s) {
        return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
      };

      return f.call(element, selector);
    }
  }, {
    key: '__getTargets',
    value: function __getTargets(targets, options) {
      var selector = [_config.defaultConfig.selectors.html5].join(',');
      if (_util2.default.is.string(targets)) {
        // String selector passed
        targets = document.querySelectorAll(targets);
      } else if (_util2.default.is.htmlElement(targets)) {
        targets = [targets];
      } else if (!_util2.default.is.nodeList(targets) && !_util2.default.is.array(targets) && !_util2.default.is.string(targets)) {
        // No selector passed, possibly options as first argument
        // If options are the first argument
        if (_util2.default.is.undefined(options) && _util2.default.is.object(targets)) {
          options = targets;
        }
        targets = document.querySelectorAll(selector);
      }
      if (_util2.default.is.nodeList(targets)) {
        targets = Array.prototype.slice.call(targets);
      }
      return targets;
    }
  }]);

  return vPlayer;
}();

exports.default = vPlayer;

},{"./config":1,"./dom":2,"./event":3,"./player":6,"./util":8}]},{},[4])(4)
});

//# sourceMappingURL=vplyr.js.map
