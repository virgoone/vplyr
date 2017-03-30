import $ from '../utils/dom';
import utils, { is } from '../utils/util';
import Event from '../utils/events';
import Log from '../utils/logger';;
import { setupStorage, updateStorage } from './storage';
import { buildControls } from './controls';
import { defaultConfig as defaults } from '../config';

class Player {
  constructor(media, config) {
    const browser = utils.browerSniff();
    this.TAG = 'Player';
    this._player = {
      media, browser
    };
    this._config = config;
    this._timers = {};
    this._storage = {};
    this._media = media;
    this._fullscreen = $.fullscreen();
    this.__init__ = false;
    this.__original = media.cloneNode(true);
  }
  setup() {
    const config = this._config;
    const player = this._player;
    const storage = this._storage;

    const { media } = player;
    let api = {};
    if (this.__init__) {
      return null;
    }
    if (!is.htmlElement(media)) {
      Log.w(this.TAG, 'media must be a video');
      return;
    }
    setupStorage(config, storage);
    const tagName = media.tagName.toLowerCase();
    player.type = tagName;
    config.crossorigin = (media.getAttribute('crossorigin') !== null);
    config.autoplay = (config.autoplay || (media.getAttribute('autoplay') !== null));
    config.loop = (config.loop || (media.getAttribute('loop') !== null));
    player.supported = utils.supported(player.type);
    if (!player.supported.basic) {
      return;
    }
    player.container = $.wrap(media, document.createElement('div'));
    player.container.setAttribute('tabindex', 0);
    this._toggleStyleHook();

    Log.i(this.TAG, '' + player.browser.name + ' ' + player.browser.version);
    this._setupMedia();
    if (utils.inArray(config.types.html5, player.type)) {
      this._setupInterface();

      this._ready();
    }
    this.__init__ = true;
    api = {
      getType: player.type,
      getDuration: this._getDuration.bind(this),
      play: this._play.bind(this),
      pause: this._pause.bind(this),
      stop: () => { this._pause().bind(this); this._seek().bind(this); },
      seek: this._seek.bind(this),
      setVolume: this._setVolume.bind(this),
      togglePlay: this._togglePlay.bind(this),
      toggleMute: this._toggleMute.bind(this),
      toggleFullscreen: this._toggleFullscreen.bind(this),
      toggleControls: this._toggleControls.bind(this),
      isFullscreen: function () { return player.isFullscreen || false; },
      getContainer: function () { return player.container },
      getMedia: function () { return player.media; },
      getCurrentTime: function () { return player.media.currentTime; },
      getVolume: function () { return player.media.volume; },
      isMuted: function () { return player.media.muted; },
      isReady: function () { return $.hasClass(player.container, config.classes.ready); },
      isLoading: function () { return $.hasClass(player.container, config.classes.loading); },
      isPaused: function () { return player.media.paused; },
      on: function (event, callback) { Event.onEvent(player.container, event, callback); return this; },
    }
    return api;
  }
  _ready() {
    const config = this._config;
    const player = this._player;
    const { media, container } = player;

    // Ready event at end of execution stack
    window.setTimeout(() => {
      this._triggerEvent(media, 'ready');
    }, 0);

    // Set class hook on media element
    $.toggleClass(media, defaults.classes.setup, true);

    // Set container class for ready
    $.toggleClass(container, config.classes.ready, true);

    // Autoplay
    if (config.autoplay) {
      this._play();
    }
  }
  _setupMedia() {
    const config = this._config;
    const player = this._player;
    const original = this._original;
    const { media } = player;

    if (!media) {
      Log.w(this.TAG, 'No media element found!');
      return;
    }
    const { autoplay, classes } = config;
    const { container, type, browser, supported } = player;
    const { stopped, inIos, inChrome, inTouch, inWechat, videoWrapper } = classes;
    const { isIos, isChrome, isTouch, isWechat } = browser;
    if (supported.full) {
      $.toggleClass(container, classes.type.replace('{0}', type), true);
      $.toggleClass(container, stopped, autoplay);
      // Add iOS class
      $.toggleClass(container, inIos, isIos);
      // Add chrome class
      $.toggleClass(container, inChrome, isChrome);
      // Add touch class
      $.toggleClass(container, inTouch, isTouch);

      // Add wechat class
      $.toggleClass(container, inWechat, isWechat);
      if (player.type === 'video') {
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', videoWrapper);
        $.wrap(player.media, wrapper);
        // Cache the container
        player.videoContainer = wrapper;
      }
    }
  }
  _setupInterface() {
    const config = this._config;
    const player = this._player;
    const storage = this._storage;
    const { media } = player;
    const _getElements = (selector) => {
      return player.container.querySelectorAll(selector);
    }
    const _getElement = (selector) => {
      return _getElements(selector)[0];
    }
    if (!player.supported.full) {
      Log.w(this.TAG, 'Basic support only', player.type);

      // Remove controls
      $.removeElement(_getElement(config.selectors.controls.wrapper));
      // reset native controls
      this._toggleNativeControls(true);
      // Bail
      return;
    }
    const controlsMissing = !_getElements(config.selectors.controls.wrapper).length;
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
  _mediaListeners() {
    const player = this._player;
    const { media } = player;
    // Time change on media
    Event.onEvent(media, 'timeupdate seeking', this._timeUpdate.bind(this));

    Event.onEvent(media, 'durationchange loadedmetadata', this._displayDuration.bind(this));

    Event.onEvent(media, 'play pause ended', this._checkPlaying.bind(this));

    Event.onEvent(media, 'progress playing', this._updateProgress.bind(this));

    Event.onEvent(media, 'waiting canplay seeked', this._checkLoading.bind(this));

    Event.onEvent(media, 'volumechange', this._updateVolume.bind(this));

  }
  _updateVolume() {
    const config = this._config;
    const player = this._player;
    const storage = this._storage;
    const { media, container, buttons, supported, volume } = player;
    const { muted } = media;
    const { classes } = config;
    // Get the current volume
    var __volume = muted ? 0 : (media.volume * config.volumeMax);

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
    updateStorage({ volume: __volume }, config, storage);

    // Toggle class if muted
    $.toggleClass(container, classes.muted, (__volume === 0));

    // Update checkbox for mute state
    if (supported.full && buttons.mute) {
      this._toggleState(buttons.mute, (volume === 0));
    }
  }
  _checkLoading(event) {
    const config = this._config;
    const player = this._player;
    const timers = this._timers;

    const loading = (event.type === 'waiting');
    const { container } = player;
    const { classes } = config;
    // Clear timer
    clearTimeout(timers.loading);

    // Timer to prevent flicker when seeking
    timers.loading = setTimeout(() => {
      // Toggle container class hook
      $.toggleClass(container, classes.loading, loading);

      // Show controls if loading, hide if done
      this._toggleControls(loading);
    }, (loading ? 250 : 0));
  }
  _checkPlaying() {
    const config = this._config;
    const player = this._player;

    const { media, container } = player;
    const { classes } = config;
    const { paused } = media;
    $.toggleClass(container, classes.playing, !paused);

    $.toggleClass(container, classes.stopped, paused);

    this._toggleControls(paused);
  }
  _play() {
    const player = this._player;
    const { media } = player;
    if ('play' in media) {
      media.play();
    }
  }
  _pause() {
    const player = this._player;
    const { media } = player;
    if ('pause' in media) {
      media.pause();
    }
  }
  _togglePlay(toggle) {
    const player = this._player;
    const { media } = player;
    // True toggle
    if (!is.boolean(toggle)) {
      toggle = media.paused;
    }

    if (toggle) {
      this._play();
    } else {
      this._pause();
    }
    return toggle;
  }
  _getDuration() {
    const config = this._config;
    const player = this._player;
    const { media } = player;

    // It should be a number, but parse it just incase
    var duration = parseInt(config.duration),

      // True duration
      mediaDuration = 0;

    // Only if duration available
    if (media.duration !== null && !isNaN(media.duration)) {
      mediaDuration = media.duration;
    }

    // If custom duration is funky, use regular duration
    return (isNaN(duration) ? mediaDuration : duration);
  }
  _seek(input) {
    const player = this._player;
    const { media } = player;
    let targetTime = 0,
      paused = media.paused,
      duration = this._getDuration();

    if (is.number(input)) {
      targetTime = input;
    } else if (is.object(input) && utils.inArray(['input', 'change'], input.type)) {
      // It's the seek slider
      // Seek to the selected time
      targetTime = ((input.target.value / input.target.max) * duration);
    }
    if (targetTime < 0) {
      targetTime = 0;
    } else if (targetTime > duration) {
      targetTime = duration;
    }
    this._updateSeekDisplay(targetTime);
    try {
      media.currentTime = targetTime.toFixed(4);
    }
    catch (e) { }
  }
  _setVolume(volume) {
    const config = this._config;
    const player = this._player;
    const storage = this._storage;

    const { media } = player;
    const max = config.volumeMax,
      min = config.volumeMin;

    // Load volume from storage if no value specified
    if (is.undefined(volume)) {
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
  _toggleMute(muted) {
    const config = this._config;
    const player = this._player;
    const storage = this._storage;

    const { media } = player;
    if (!is.boolean(muted)) {
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
  _toggleState(target, state) {
    // Bail if no target
    if (!target) {
      return;
    }
    // Get state
    state = (is.boolean(state) ? state : !target.getAttribute('aria-pressed'));

    // Set the attribute on target
    target.setAttribute('aria-pressed', state);
    return state;
  }
  _timeUpdate(event) {
    const config = this._config;
    const player = this._player;
    const { media } = player;
    // Duration
    this._updateTimeDisplay(media.currentTime, player.currentTime);

    // Ignore updates while seeking
    if (event && event.type === 'timeupdate' && media.seeking) {
      return;
    }
    // Playing progress
    this._updateProgress(event);
  }
  _updateProgress(event) {
    const player = this._player;
    const { media, controls, progress, buttons, supported } = player;
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
          __value = (() => {
            var buffered = media.buffered;

            if (buffered && buffered.length) {
              // HTML5
              return this._getPercentage(buffered.end(0), duration);
            }
            return 0;
          })();
          break;
      }
    }
    this._setProgress(__progress, __value);
  }
  _setProgress(progress, value) {
    const player = this._player;
    const { supported } = player;
    if (!supported.full) {
      return;
    }

    // Default to 0
    if (is.undefined(value)) {
      value = 0;
    }
    // Default to buffer or bail
    if (is.undefined(progress)) {
      if (player.progress && player.progress.buffer) {
        progress = player.progress.buffer;
      } else {
        return;
      }
    }

    // One progress element passed
    if (is.htmlElement(progress)) {
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
  _updateTimeDisplay(time, element) {
    const player = this._player;

    // Bail if there's no duration display
    if (!element) {
      return;
    }

    // Fallback to 0
    if (isNaN(time)) {
      time = 0;
    }

    player.secs = parseInt(time % 60);
    player.mins = parseInt((time / 60) % 60);
    player.hours = parseInt(((time / 60) / 60) % 60);

    // Do we need to display hours?
    var displayHours = (parseInt(((this._getDuration() / 60) / 60) % 60) > 0);

    // Ensure it's two digits. For example, 03 rather than 3.
    player.secs = ('0' + player.secs).slice(-2);
    player.mins = ('0' + player.mins).slice(-2);

    // Render
    element.innerHTML = (displayHours ? player.hours + ':' : '') + player.mins + ':' + player.secs;
  }
  _updateSeekDisplay(time) {
    // Default to 0
    if (!is.number(time)) {
      time = 0;
    }
    const player = this._player;

    const { progress, buttons } = player;
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
  _displayDuration() {
    const config = this._config;
    const player = this._player;
    const storage = this._storage;

    const { media, supported, duration, currentTime } = player;
    const { displayDuration } = config;
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
  _controlListeners() {
    const config = this._config;
    const player = this._player;
    const fullscreen = this._fullscreen;

    const { browser, buttons, volume, container, controls } = player;
    const { classes, listeners, hideControls } = config;
    const inputEvent = (browser.isIE ? 'change' : 'input');
    const togglePlay = () => {
      const play = this._togglePlay();
      let trigger = buttons[play ? 'play' : 'pause'],
        target = buttons[play ? 'pause' : 'play'];

      // Get the last play button to account for the large play button
      if (target && target.length > 1) {
        target = target[target.length - 1];
      } else {
        target = target[0];
      }
      if (target) {
        const hadTabFocus = $.hasClass(trigger, classes.tabFocus);

        setTimeout(function () {
          target.focus();
          if (hadTabFocus) {
            $.toggleClass(trigger, classes.tabFocus, false);
            $.toggleClass(target, classes.tabFocus, true);
          }
        }, 100);
      }
    }
    Event.proxyListener(buttons.play, 'click', listeners.play, togglePlay);
    // Pause
    Event.proxyListener(buttons.pause, 'click', listeners.pause, togglePlay);
    // Seek
    Event.proxyListener(buttons.seek, inputEvent, listeners.seek, this._seek.bind(this));

    Event.proxyListener(volume.input, inputEvent, listeners.volume, () => {
      this._setVolume(volume.input.value);
    });
    Event.proxyListener(buttons.mute, 'click', listeners.mute, this._toggleMute.bind(this));

    Event.proxyListener(buttons.fullscreen, 'click', listeners.fullscreen, this._toggleFullscreen.bind(this));

    // Handle user exiting fullscreen by escaping etc
    if (fullscreen.supportsFullScreen) {
      Event.onEvent(document, fullscreen.fullScreenEventName, this._toggleFullscreen.bind(this));
    }
    if (hideControls) {
      // Toggle controls on mouse events and entering fullscreen
      Event.onEvent(container, 'mouseenter mouseleave mousemove touchstart touchend touchcancel touchmove enterfullscreen', this._toggleControls.bind(this));

      // Watch for cursor over controls so they don't hide when trying to interact
      Event.onEvent(controls, 'mouseenter mouseleave', (event) => {
        player.controls.hover = event.type === 'mouseenter';
      });

      // Watch for cursor over controls so they don't hide when trying to interact
      Event.onEvent(controls, 'mousedown mouseup touchstart touchend touchcancel', (event) => {
        player.controls.pressed = utils.inArray(['mousedown', 'touchstart'], event.type);
      });
      // Focus in/out on controls
      Event.onEvent(controls, 'focus blur', this._toggleControls.bind(this), true);
    }
  }
  _injectControls() {
    const config = this._config;
    const player = this._player;

    let { html, selectors } = config;

    const { container } = player;
    if (!html) {
      html = buildControls(config);
    }
    const random = Math.floor(Math.random() * (1000000));
    container.setAttribute('id', `vplyr${random}`);
    html = utils.replaceAll(html, '{id}', random);
    let target;
    if (is.string(selectors.controls.container)) {
      target = document.querySelector(selectors.controls.container);
    }
    // Inject into the container by default
    if (!is.htmlElement(target)) {
      target = container
    }
    target.insertAdjacentHTML('beforeend', html);
  }
  _findElements() {
    const config = this._config;
    const player = this._player;

    const { container } = player;
    const { selectors } = config;
    const { controls, buttons, progress, volume, duration, currentTime, seekTime } = selectors;
    const _getElements = (selector) => {
      return container.querySelectorAll(selector);
    }
    const _getElement = (selector) => {
      return _getElements(selector)[0];
    }
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
    }
    catch (e) {
      this._warn('It looks like there is a problem with your controls HTML');
      // Restore native video controls
      this._toggleNativeControls(true);

      return false;
    }
  }
  _toggleNativeControls(toggle) {
    const config = this._config;
    const player = this._player;
    const { media } = player;
    if (toggle && utils.inArray(config.types.html5, player.type)) {
      media.setAttribute('controls', '');
    } else {
      media.removeAttribute('controls');
    }
  }
  _toggleFullscreen(event) {
    // Check for native support
    const config = this._config;
    const player = this._player;
    const fullscreen = this._fullscreen;

    const { container, buttons } = player;
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
    $.toggleClass(container, config.classes.fullscreen.active, player.isFullscreen);

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
  _saveScrollPosition() {
    scroll = {
      x: window.pageXOffset || 0,
      y: window.pageYOffset || 0
    };
  }
  _restoreScrollPosition() {
    window.scrollTo(scroll.x, scroll.y);
  }
  _toggleControls(toggle) {
    const config = this._config;
    const player = this._player;
    const timers = this._timers;

    const { hideControls, classes } = config;
    const { type, container, browser, controls, media } = player;
    const { paused } = media;
    // Don't hide if config says not to, it's audio, or not ready or loading
    if (!hideControls || type === 'audio') {
      return;
    }

    var delay = 0,
      isEnterFullscreen = false,
      show = toggle,
      loading = $.hasClass(container, classes.loading);

    // Default to false if no boolean
    if (!is.boolean(toggle)) {
      if (toggle && toggle.type) {
        // Is the enter fullscreen event
        isEnterFullscreen = (toggle.type === 'enterfullscreen');

        // Whether to show controls
        show = utils.inArray(['mousemove', 'touchstart', 'mouseenter', 'focus'], toggle.type);

        // Delay hiding on move events
        if (utils.inArray(['mousemove', 'touchmove'], toggle.type)) {
          delay = 2000;
        }

        // Delay a little more for keyboard users
        if (toggle.type === 'focus') {
          delay = 3000;
        }
      } else {
        show = $.hasClass(container, classes.hideControls);
      }
    }

    // Clear timer every movement
    window.clearTimeout(timers.hover);

    // If the mouse is not over the controls, set a timeout to hide them
    if (show || paused || loading) {
      $.toggleClass(container, classes.hideControls, false);

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
      timers.hover = window.setTimeout(() => {
        // If the mouse is over the controls (and not entering fullscreen), bail
        if ((controls.pressed || controls.hover) && !isEnterFullscreen) {
          return;
        }

        $.toggleClass(container, classes.hideControls, true);
      }, delay);
    }
  }
  _triggerEvent(element, type, bubbles, properties) {
    Event.customEvent(element, type, bubbles, utils.extend({}, properties, {
      vplyr: this
    }));
  }
  _getPercentage(current, max) {
    if (current === 0 || max === 0 || isNaN(current) || isNaN(max)) {
      return 0;
    }
    return ((current / max) * 100).toFixed(2);
  }
  _toggleStyleHook() {
    const config = this._config;
    const player = this._player;
    $.toggleClass(player.container, config.selectors.container.replace('.', ''), player.supported.full);
  }
}
export default Player;