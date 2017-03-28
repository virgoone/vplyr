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
        isIos: 'vplyr--is-ios',
        isTouch: 'vplyr--is-touch',
        isWechat: 'vplyr--is-wechat',
        isChrome: 'vplyr--is-chrome',
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

},{"./util":6}],3:[function(_dereq_,module,exports){
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

},{"./util":6}],4:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _vplyr = _dereq_('./vplyr.js');

var _vplyr2 = _interopRequireDefault(_vplyr);

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
    window.vPlayer = _vplyr2.default;
});

},{"./vplyr.js":7}],5:[function(_dereq_,module,exports){
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

var _config = _dereq_('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _log = void 0,
    _warn = void 0,
    fullscreen = void 0;

var Player = function () {
  function Player(media, config) {
    _classCallCheck(this, Player);

    return this._init(media, config);
  }

  _createClass(Player, [{
    key: '_init',
    value: function _init(media, config) {
      var _this = this;

      var vk = this;
      var timers = {};
      var api = {};
      vk.media = media;
      var original = media.cloneNode(true);
      fullscreen = _dom2.default.fullscreen();
      var _console = function _console(type, args) {
        if (config.debug && window.console) {
          args = Array.prototype.slice.call(args);

          if (_util2.default.is.string(config.logPrefix) && config.logPrefix.length) {
            args.unshift(config.logPrefix);
          }

          console[type].apply(console, args);
        }
      };
      _log = function _log() {
        _console('log', arguments);
      };
      _warn = function _warn() {
        _console('warn', arguments);
      };
      _log('Config', config);
      vk.config = config;
      vk.timers = timers;
      api = {
        isFullscreen: function isFullscreen() {
          return _this.isFullScreen || false;
        },
        getVolume: function getVolume() {
          return _this.media.volume;
        },
        isMuted: function isMuted() {
          return _this.media.muted;
        },
        isReady: function isReady() {
          return _dom2.default.hasClass(_this.container, _this.config.classes.ready);
        },
        isLoading: function isLoading() {
          return _dom2.default.hasClass(_this.container, _this.config.classes.loading);
        },
        isPaused: function isPaused() {
          return _this.media.paused;
        },
        stop: function stop() {
          _this._pause();_this._seek();
        },
        getType: function getType() {
          return _this.type;
        },
        getCurrentTime: function getCurrentTime() {
          return _this.media.currentTime;
        },
        getContainer: function getContainer() {
          return _this.container;
        },
        setVolume: this._setVolume,
        togglePlay: this._togglePlay,
        toggleMute: this._toggleMute,
        toggleFullscreen: this._toggleFullscreen,
        toggleControls: this._toggleControls,
        play: this._play,
        pause: this._pause,
        getDuration: this._getDuration,
        seek: this._seek
      };
      vk.api = api;

      this._setup(vk, config);
      _log('player', vk);
      if (!vk.init) {
        return null;
      }
      return api;
    }
  }, {
    key: '_setup',
    value: function _setup(player, config) {
      if (player.init) {
        return null;
      }
      player.browser = _util2.default.browserSniff;
      if (!_util2.default.is.htmlElement(player.media)) {
        return;
      }
      this._setupStorage();
      var tagName = player.media.tagName.toLowerCase();
      player.type = tagName;
      config.crossorigin = player.media.getAttribute('crossorigin') !== null;
      config.autoplay = config.autoplay || player.media.getAttribute('autoplay') !== null;
      config.loop = config.loop || player.media.getAttribute('loop') !== null;
      player.supported = _util2.default.supported(player.type);
      if (!player.supported.basic) {
        return;
      }
      player.container = this._wrap(player.media, document.createElement('div'));
      player.container.setAttribute('tabindex', 0);
      this._toggleStyleHook(player, config);
      _log('' + player.browser.name + ' ' + player.browser.version);
      this._setupMedia(player, config);
      if (_util2.default.inArray(config.types.html5, player.type)) {
        // Setup UI
        this._setupInterface(player, config);

        this._ready();
      }
      this.init = true;
    }
  }, {
    key: '_ready',
    value: function _ready() {
      var _this2 = this;

      // Ready event at end of execution stack
      window.setTimeout(function () {
        _this2._triggerEvent(_this2.media, 'ready');
      }, 0);

      // Set class hook on media element
      _dom2.default.toggleClass(this.media, _config.defaultConfig.classes.setup, true);

      // Set container class for ready
      _dom2.default.toggleClass(this.container, this.config.classes.ready, true);

      // Store a refernce to instance
      this.media.vplyr = this.api;

      // Autoplay
      if (this.config.autoplay) {
        this._play();
      }
    }
  }, {
    key: '_setupInterface',
    value: function _setupInterface(player, config) {
      var _getElements = function _getElements(selector) {
        return player.container.querySelectorAll(selector);
      };
      var _getElement = function _getElement(selector) {
        return _getElements(selector)[0];
      };
      if (!player.supported.full) {
        _warn('Basic support only', player.type);

        // Remove controls
        _dom2.default.removeElement(_getElement(config.selectors.controls.wrapper));
        // reset native controls
        this._toggleNativeControls(true, player, config);
        // Bail
        return;
      }
      var controlsMissing = !_getElements(config.selectors.controls.wrapper).length;
      if (controlsMissing) {
        // Inject custom controls
        this._injectControls(player, config);
      }
      // Find the elements
      if (!this._findElements(player, config)) {
        return;
      }
      if (controlsMissing) {
        this._controlListeners(player, config);
      }
      this._mediaListeners();
      this._toggleNativeControls(true, this, this.config);
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
      this.storage = {};

      // Bail if we don't have localStorage support or it's disabled
      if (!_util2.default.storageSupport || !this.config.storage.enabled) {
        return;
      }

      window.localStorage.removeItem('vplyr-volume');

      // load value from the current key
      value = window.localStorage.getItem(this.config.storage.key);

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
        this.storage = JSON.parse(value);
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
      // It should be a number, but parse it just incase
      var duration = parseInt(this.config.duration),


      // True duration
      mediaDuration = 0;

      // Only if duration available
      if (this.media.duration !== null && !isNaN(this.media.duration)) {
        mediaDuration = this.media.duration;
      }

      // If custom duration is funky, use regular duration
      return isNaN(duration) ? mediaDuration : duration;
    }
  }, {
    key: '_seek',
    value: function _seek(input) {
      _log(this);
      var targetTime = 0,
          paused = this.media.paused,
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
        this.media.currentTime = targetTime.toFixed(4);
      } catch (e) {}
      // Logging
      _log('Seeking to ' + this.media.currentTime + ' seconds');
    }
  }, {
    key: '_play',
    value: function _play() {
      if ('play' in this.media) {
        this.media.play();
      }
    }
  }, {
    key: '_pause',
    value: function _pause() {
      if ('pause' in this.media) {
        this.media.pause();
      }
    }
  }, {
    key: '_togglePlay',
    value: function _togglePlay(toggle) {
      // True toggle
      if (!_util2.default.is.boolean(toggle)) {
        toggle = this.media.paused;
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

      var duration = this._getDuration(),
          value = this._getPercentage(time, duration);

      // Update progress
      if (this.progress && this.progress.played) {
        this.progress.played.value = value;
      }

      // Update seek range input
      if (this.buttons && this.buttons.seek) {
        this.buttons.seek.value = value;
      }
    }
  }, {
    key: '_mediaListeners',
    value: function _mediaListeners() {
      // Time change on media
      _event2.default.onEvent(this.media, 'timeupdate seeking', this._timeUpdate.bind(this));

      _event2.default.onEvent(this.media, 'durationchange loadedmetadata', this._displayDuration.bind(this));

      _event2.default.onEvent(this.media, 'play pause ended', this._checkPlaying.bind(this));

      _event2.default.onEvent(this.media, 'progress playing', this._updateProgress.bind(this));

      _event2.default.onEvent(this.media, 'waiting canplay seeked', this._checkLoading.bind(this));

      _event2.default.onEvent(this.media, 'volumechange', this._updateVolume.bind(this));
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
      var _this3 = this;

      var inputEvent = this.browser.isIE ? 'change' : 'input';
      var togglePlay = function togglePlay() {
        var play = _this3._togglePlay();
        var trigger = _this3.buttons[play ? 'play' : 'pause'],
            target = _this3.buttons[play ? 'pause' : 'play'];

        // Get the last play button to account for the large play button
        if (target && target.length > 1) {
          target = target[target.length - 1];
        } else {
          target = target[0];
        }
        if (target) {
          var hadTabFocus = _dom2.default.hasClass(trigger, _this3.config.classes.tabFocus);

          setTimeout(function () {
            target.focus();
            if (hadTabFocus) {
              _dom2.default.toggleClass(trigger, this.config.classes.tabFocus, false);
              _dom2.default.toggleClass(target, this.config.classes.tabFocus, true);
            }
          }, 100);
        }
      };
      this._proxyListener(this.buttons.play, 'click', this.config.listeners.play, togglePlay);
      // Pause
      this._proxyListener(this.buttons.pause, 'click', this.config.listeners.pause, togglePlay);
      // Seek
      this._proxyListener(this.buttons.seek, inputEvent, this.config.listeners.seek, this._seek.bind(this));

      this._proxyListener(this.volume.input, inputEvent, this.config.listeners.volume, function () {
        _this3._setVolume(_this3.volume.input.value);
      });
      this._proxyListener(this.buttons.mute, 'click', this.config.listeners.mute, this._toggleMute.bind(this));

      this._proxyListener(this.buttons.fullscreen, 'click', this.config.listeners.fullscreen, this._toggleFullscreen.bind(this));

      // Handle user exiting fullscreen by escaping etc
      if (fullscreen.supportsFullScreen) {
        _event2.default.onEvent(document, fullscreen.fullScreenEventName, this._toggleFullscreen.bind(this));
      }
      if (this.config.hideControls) {
        // Toggle controls on mouse events and entering fullscreen
        _event2.default.onEvent(this.container, 'mouseenter mouseleave mousemove touchstart touchend touchcancel touchmove enterfullscreen', this._toggleControls.bind(this));

        // Watch for cursor over controls so they don't hide when trying to interact
        _event2.default.onEvent(this.controls, 'mouseenter mouseleave', function (event) {
          _this3.controls.hover = event.type === 'mouseenter';
        });

        // Watch for cursor over controls so they don't hide when trying to interact
        _event2.default.onEvent(this.controls, 'mousedown mouseup touchstart touchend touchcancel', function (event) {
          _this3.controls.pressed = _util2.default.inArray(['mousedown', 'touchstart'], event.type);
        });
        // Focus in/out on controls
        _event2.default.onEvent(this.controls, 'focus blur', this._toggleControls.bind(this), true);
      }
    }
  }, {
    key: '_toggleFullscreen',
    value: function _toggleFullscreen(event) {
      // Check for native support
      var nativeSupport = fullscreen.supportsFullScreen;

      if (nativeSupport) {
        // If it's a fullscreen change event, update the UI
        if (event && event.type === fullscreen.fullScreenEventName) {
          this.isFullscreen = fullscreen.isFullScreen(this.container);
        } else {
          // Else it's a user request to enter or exit
          if (!fullscreen.isFullScreen(this.container)) {
            // Save scroll position
            this._saveScrollPosition();

            // Request full screen
            fullscreen.requestFullScreen(this.container);
          } else {
            // Bail from fullscreen
            fullscreen.cancelFullScreen();
          }

          // Check if we're actually full screen (it could fail)
          this.isFullscreen = fullscreen.isFullScreen(this.container);

          return;
        }
      } else {
        // Otherwise, it's a simple toggle
        this.isFullscreen = !this.isFullscreen;

        // Bind/unbind escape key
        document.body.style.overflow = this.isFullscreen ? 'hidden' : '';
      }

      // Set class hook
      _dom2.default.toggleClass(this.container, this.config.classes.fullscreen.active, this.isFullscreen);

      // Trap focus
      this._focusTrap(this.isFullscreen);

      // Set button state
      if (this.buttons && this.buttons.fullscreen) {
        this._toggleState(this.buttons.fullscreen, this.isFullscreen);
      }

      // Trigger an event
      this._triggerEvent(this.container, this.isFullscreen ? 'enterfullscreen' : 'exitfullscreen', true);

      // Restore scroll position
      if (!this.isFullscreen && nativeSupport) {
        this._restoreScrollPosition();
      }
    }
  }, {
    key: '_focusTrap',
    value: function _focusTrap() {
      var _this4 = this;

      var _getElements = function _getElements(selector) {
        return _this4.container.querySelectorAll(selector);
      };
      var _getElement = function _getElement(selector) {
        return _getElements(selector)[0];
      };
      var tabbables = _getElements('input:not([disabled]), button:not([disabled])'),
          first = tabbables[0],
          last = tabbables[tabbables.length - 1];

      function _checkFocus(event) {
        // If it is TAB
        if (event.which === 9 && this.isFullscreen) {
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
      _event2.default.onEvent(this.container, 'keydown', _checkFocus);
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
      var _this5 = this;

      var loading = event.type === 'waiting';

      // Clear timer
      clearTimeout(this.timers.loading);

      // Timer to prevent flicker when seeking
      this.timers.loading = setTimeout(function () {
        // Toggle container class hook
        _dom2.default.toggleClass(_this5.container, _this5.config.classes.loading, loading);

        // Show controls if loading, hide if done
        _this5._toggleControls(loading);
      }, loading ? 250 : 0);
    }
  }, {
    key: '_checkPlaying',
    value: function _checkPlaying() {
      _dom2.default.toggleClass(this.container, this.config.classes.playing, !this.media.paused);

      _dom2.default.toggleClass(this.container, this.config.classes.stopped, this.media.paused);

      this._toggleControls(this.media.paused);
    }
  }, {
    key: '_timeUpdate',
    value: function _timeUpdate(event) {
      // Duration
      this._updateTimeDisplay(this.media.currentTime, this.currentTime);

      // Ignore updates while seeking
      if (event && event.type === 'timeupdate' && this.media.seeking) {
        return;
      }
      // Playing progress
      this._updateProgress(event);
    }
  }, {
    key: '_updateProgress',
    value: function _updateProgress(event) {
      var _this6 = this;

      if (!this.supported.full) {
        return;
      }

      var progress = this.progress.played,
          value = 0,
          duration = this._getDuration();
      if (event) {
        switch (event.type) {
          case 'timeupdate':
          case 'seeking':
            if (this.controls.pressed) {
              return;
            }

            value = this._getPercentage(this.media.currentTime, duration);

            // Set seek range value only if it's a 'natural' time event
            if (event.type === 'timeupdate' && this.buttons.seek) {
              this.buttons.seek.value = value;
            }

            break;
          // Check buffer status
          case 'playing':
          case 'progress':
            progress = this.progress.buffer;
            value = function () {
              var buffered = _this6.media.buffered;

              if (buffered && buffered.length) {
                // HTML5
                return _this6._getPercentage(buffered.end(0), duration);
              }
              return 0;
            }();
            _log('event.type', event.type, value);
            break;
        }
      }
      this._setProgress(progress, value);
    }
  }, {
    key: '_setProgress',
    value: function _setProgress(progress, value) {
      if (!this.supported.full) {
        return;
      }

      // Default to 0
      if (_util2.default.is.undefined(value)) {
        value = 0;
      }
      // Default to buffer or bail
      if (_util2.default.is.undefined(progress)) {
        if (this.progress && this.progress.buffer) {
          progress = this.progress.buffer;
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
      var max = this.config.volumeMax,
          min = this.config.volumeMin;

      // Load volume from storage if no value specified
      if (_util2.default.is.undefined(volume)) {
        volume = this.storage.volume;
      }

      // Use config if all else fails
      if (volume === null || isNaN(volume)) {
        volume = this.config.volume;
      }
      if (_util2.default.is.undefined(volume)) {
        volume = this.storage.volume;
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
      this.media.volume = parseFloat(volume / max);

      // Set the display
      if (this.volume.display) {
        this.volume.display.value = volume;
      }
      // Toggle muted state
      if (volume === 0) {
        this.media.muted = true;
      } else if (this.media.muted && volume > 0) {
        this._toggleMute();
      }
    }
  }, {
    key: '_updateVolume',
    value: function _updateVolume() {
      // Get the current volume
      var volume = this.media.muted ? 0 : this.media.volume * this.config.volumeMax;

      // Update the <input type="range"> if present
      if (this.supported.full) {
        if (this.volume.input) {
          this.volume.input.value = volume;
        }
        if (this.volume.display) {
          this.volume.display.value = volume;
        }
      }

      // Update the volume in storage
      this._updateStorage({ volume: volume });

      // Toggle class if muted
      _dom2.default.toggleClass(this.container, this.config.classes.muted, volume === 0);

      // Update checkbox for mute state
      if (this.supported.full && this.buttons.mute) {
        this._toggleState(this.buttons.mute, volume === 0);
      }
    }
  }, {
    key: '_updateStorage',
    value: function _updateStorage(value) {
      // Bail if we don't have localStorage support or it's disabled
      if (!_util2.default.storageSupport || !this.config.storage.enabled) {
        return;
      }

      // Update the working copy of the values
      _util2.default.extend(this.storage, value);

      // Update storage
      window.localStorage.setItem(this.config.storage.key, JSON.stringify(this.storage));
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
      if (!_util2.default.is.boolean(muted)) {
        muted = !this.media.muted;
      }

      // Set button state
      this._toggleState(this.buttons.mute, muted);

      // Set mute on the player
      this.media.muted = muted;

      // If volume is 0 after unmuting, set to default
      if (this.media.volume === 0) {
        this._setVolume(this.config.volume);
      }
    }
  }, {
    key: '_displayDuration',
    value: function _displayDuration() {
      if (!this.supported.full) {
        return;
      }

      // Determine duration
      var duration = this._getDuration() || 0;

      // If there's only one time display, display duration there
      if (!this.duration && this.config.displayDuration && this.media.paused) {
        this._updateTimeDisplay(duration, this.currentTime);
      }

      // If there's a duration element, update content
      if (this.duration) {
        this._updateTimeDisplay(duration, this.duration);
      }
    }
  }, {
    key: '_updateTimeDisplay',
    value: function _updateTimeDisplay(time, element) {
      // Bail if there's no duration display
      if (!element) {
        return;
      }

      // Fallback to 0
      if (isNaN(time)) {
        time = 0;
      }

      this.secs = parseInt(time % 60);
      this.mins = parseInt(time / 60 % 60);
      this.hours = parseInt(time / 60 / 60 % 60);

      // Do we need to display hours?
      var displayHours = parseInt(this._getDuration() / 60 / 60 % 60) > 0;

      // Ensure it's two digits. For example, 03 rather than 3.
      this.secs = ('0' + this.secs).slice(-2);
      this.mins = ('0' + this.mins).slice(-2);

      // Render
      element.innerHTML = (displayHours ? this.hours + ':' : '') + this.mins + ':' + this.secs;
    }
  }, {
    key: '_injectControls',
    value: function _injectControls(player, config) {
      var html = config.html;

      // Insert custom video controls
      _log('Injecting custom controls');
      // If no controls are specified, create default
      if (!html) {
        html = this._buildControls(config);
      }
      var random = Math.floor(Math.random() * 1000000);
      player.container.setAttribute('id', 'vplyr' + random);
      html = _util2.default.replaceAll(html, '{id}', random);
      var target = void 0;
      if (_util2.default.is.string(config.selectors.controls.container)) {
        target = document.querySelector(config.selectors.controls.container);
      }
      // Inject into the container by default
      if (!_util2.default.is.htmlElement(target)) {
        target = player.container;
      }
      target.insertAdjacentHTML('beforeend', html);
    }
  }, {
    key: '_findElements',
    value: function _findElements(player, config) {
      var _getElements = function _getElements(selector) {
        return player.container.querySelectorAll(selector);
      };
      var _getElement = function _getElement(selector) {
        return _getElements(selector)[0];
      };
      try {
        player.controls = _getElement(config.selectors.controls.wrapper);

        // Buttons
        player.buttons = {};
        player.buttons.seek = _getElement(config.selectors.buttons.seek);
        player.buttons.play = _getElements(config.selectors.buttons.play);
        player.buttons.pause = _getElement(config.selectors.buttons.pause);
        player.buttons.fullscreen = _getElement(config.selectors.buttons.fullscreen);

        // Inputs
        player.buttons.mute = _getElement(config.selectors.buttons.mute);

        // Progress
        player.progress = {};
        player.progress.container = _getElement(config.selectors.progress.container);

        // Progress - Buffering
        player.progress.buffer = {};
        player.progress.buffer.bar = _getElement(config.selectors.progress.buffer);
        player.progress.buffer.text = player.progress.buffer.bar && player.progress.buffer.bar.getElementsByTagName('span')[0];

        // Progress - Played
        player.progress.played = _getElement(config.selectors.progress.played);

        // Volume
        player.volume = {};
        player.volume.input = _getElement(config.selectors.volume.input);
        player.volume.display = _getElement(config.selectors.volume.display);

        // Timing
        player.duration = _getElement(config.selectors.duration);
        player.currentTime = _getElement(config.selectors.currentTime);
        player.seekTime = _getElements(config.selectors.seekTime);

        return true;
      } catch (e) {
        _warn('It looks like there is a problem with your controls HTML');
        // Restore native video controls
        this._toggleNativeControls(true);

        return false;
      }
    }
  }, {
    key: '_buildControls',
    value: function _buildControls(config) {
      var html = ['<div class="vplyr-video-loader-container">', '<div class="vplyr-video-loader">', '<div class="loader-inner one"></div>', '<div class="loader-inner two"></div>', '<div class="loader-inner three"></div>', '</div>', '</div><div class="vplyr-gradient-bottom"></div>'];
      html.push('<div class="vplyr-bottom-container">');
      if (_util2.default.inArray(config.controls, 'progress')) {
        html.push('<div class="vplyr-progress-bar-container">', '<input id="seek{id}" type="range" min="0" max="100" value="0" step="0.1" class="vplyr-progress-bar" data-video="seek"/>', '<progress class="vplyr-progress-played" max="100" role="presentation"></progress>', '<progress class="vplyr-progress-buffer" max="100" value="100">', '<span>100.00</span>% buffered', '</progress>', '</div>');
      }
      html.push('<div class="vplyr-controls">');
      html.push('<div class="left-controls">');
      if (_util2.default.inArray(config.controls, 'play')) {
        html.push('<div class="btn-controls">', '<div class="btn-wrap">', '<div class="play" data-video="play"></div>', '<div class="pause" data-video="pause"></div>', '</div>', '</div>');
      }
      if (_util2.default.inArray(config.controls, 'time')) {
        html.push('<div class="time-mod-controls">', '<div class="control-currenttime">00:00</div>', '<div class="control-separator">/</div>', '<div class="control-duration">00:00</div>', '</div>');
      }
      html.push('</div>'); //close vplyr left controls
      html.push('<div class="right-controls">');
      if (_util2.default.inArray(config.controls, 'fullscreen')) {
        html.push('<div class="fullscreen-controls" data-video="fullscreen">', '<svg class="icon-exit-fullscreen">', '<use xlink:href="#vplyr-exit-fullscreen"></use>', '</svg>', '<svg class="icon-enter-fullscreen">', ' <use xlink:href="#vplyr-enter-fullscreen"></use>', '</svg>', '</div>');
      }
      html.push('<div class="volume-controls">');
      if (_util2.default.inArray(config.controls, 'mute')) {
        html.push('<div class="vplyr-volume" data-video="mute">', '<svg class="icon-muted">', '<use xlink:href="#vplyr-muted"></use>', '</svg>', '<svg class="icon-volume">', '<use xlink:href="#vplyr-volume"></use>', '</svg>', '</div>');
      }
      if (_util2.default.inArray(config.controls, 'volume')) {
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
      var _this7 = this;

      // Don't hide if config says not to, it's audio, or not ready or loading
      if (!this.config.hideControls || this.type === 'audio') {
        return;
      }

      var delay = 0,
          isEnterFullscreen = false,
          show = toggle,
          loading = _dom2.default.hasClass(this.container, this.config.classes.loading);

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
          show = _dom2.default.hasClass(this.container, this.config.classes.hideControls);
        }
      }

      // Clear timer every movement
      window.clearTimeout(this.timers.hover);

      // If the mouse is not over the controls, set a timeout to hide them
      if (show || this.media.paused || loading) {
        _dom2.default.toggleClass(this.container, this.config.classes.hideControls, false);

        // Always show controls when paused or if touch
        if (this.media.paused || loading) {
          return;
        }

        // Delay for hiding on touch
        if (this.browser.isTouch) {
          delay = 3000;
        }
      }

      // If toggle is false or if we're playing (regardless of toggle),
      // then set the timer to hide the controls
      if (!show || !this.media.paused) {
        this.timers.hover = window.setTimeout(function () {
          // If the mouse is over the controls (and not entering fullscreen), bail
          if ((_this7.controls.pressed || _this7.controls.hover) && !isEnterFullscreen) {
            return;
          }

          _dom2.default.toggleClass(_this7.container, _this7.config.classes.hideControls, true);
        }, delay);
      }
    }
  }, {
    key: '_setupMedia',
    value: function _setupMedia(player, config) {
      if (!player.media) {
        _warn('No media element found!');
        return;
      }
      if (player.supported.full) {
        _dom2.default.toggleClass(player.container, config.classes.type.replace('{0}', player.type), true);
        _dom2.default.toggleClass(player.container, config.classes.stopped, config.autoplay);
        // Add iOS class
        _dom2.default.toggleClass(player.container, config.classes.isIos, player.browser.isIos);
        // Add chrome class
        _dom2.default.toggleClass(player.container, config.classes.isChrome, player.browser.isChrome);

        // Add touch class
        _dom2.default.toggleClass(player.container, config.classes.isTouch, player.browser.isTouch);

        // Add wechat class
        _dom2.default.toggleClass(player.container, config.classes.isWechat, player.browser.isWechat);
        if (player.type === 'video') {
          var wrapper = document.createElement('div');
          wrapper.setAttribute('class', config.classes.videoWrapper);
          this._wrap(player.media, wrapper);
          // Cache the container
          player.videoContainer = wrapper;
        }
      }
    }
  }, {
    key: '_toggleNativeControls',
    value: function _toggleNativeControls(toggle) {
      if (toggle && _util2.default.inArray(this.config.types.html5, this.type)) {
        this.media.setAttribute('controls', '');
      } else {
        this.media.removeAttribute('controls');
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
    key: '_cancelRequests',
    value: function _cancelRequests() {
      if (!_util2.default.inArray(this.config.types.html5, this.type)) {
        return;
      }

      // Remove child sources
      var sources = this.media.querySelectorAll('source');
      for (var i = 0; i < sources.length; i++) {
        _dom2.default.removeElement(sources[i]);
      }

      // Set blank video src attribute
      // This is to prevent a MEDIA_ERR_SRC_NOT_SUPPORTED error
      // Info: http://stackoverflow.com/questions/32231579/how-to-properly-dispose-of-an-html5-video-and-close-socket-or-connection
      this.media.setAttribute('src', this.config.blankUrl);

      // Load the new empty source
      // This will cancel existing requests
      // See https://github.com/Selz/plyr/issues/174
      this.media.load();

      // Debugging
      _log('Cancelled network requests');
    }
  }, {
    key: '_toggleStyleHook',
    value: function _toggleStyleHook(player, config) {
      _dom2.default.toggleClass(player.container, config.selectors.container.replace('.', ''), player.supported.full);
    }
  }]);

  return Player;
}();

exports.default = Player;

},{"./config":1,"./dom":2,"./event":3,"./util":6}],6:[function(_dereq_,module,exports){
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
          full = basic && !isOldIE && !isIphone;
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

},{}],7:[function(_dereq_,module,exports){
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
    this._init(targets, options);
  }

  _createClass(vPlayer, [{
    key: '_init',
    value: function _init(targets, options) {
      var _targets = this.__getTargets(targets, options);

      if (!_util2.default.supported().basic || !_targets.length) {
        return false;
      }
      var players = [],
          instance = [];
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
        console.log('instance', instance);
      });
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

},{"./config":1,"./dom":2,"./event":3,"./player":5,"./util":6}]},{},[4])(4)
});

//# sourceMappingURL=vplyr.js.map
