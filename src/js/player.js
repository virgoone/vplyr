'use strict';

import utils from './util';
import $ from './dom';
import Event from './event';
import Logger from './logger';
let _log , _warn;
import {defaultConfig as defaults} from './config';

class Player {
  constructor(media, config){
    this._media = media;
    this._config = config;
    this._type = null;
    this._player = {};
    this._timers = {};
    this._original = null;
    this._fullscreen = $.fullscreen();
    const _logger = new Logger(config);
    this._log = _logger.log;
    this._warn = _logger.warn;
    this._init();
  }
  _init(){
    const timers = {};
    let api = {};
    this._original = this._media.cloneNode(true);
    this._player.media = this._media;
    console.log(this);
    this._log('Config', this._config);
    
    api = {
      isFullscreen:()=>{return this.isFullScreen || false},
      getVolume:()=>{return this.media.volume},
      isMuted:  () =>{ return this.media.muted; },
      isReady:  () =>{ return $.hasClass(this.container, this.config.classes.ready); },
      isLoading:()=> { return $.hasClass(this.container, this.config.classes.loading); },
      isPaused: () =>{ return this.media.paused; },
      stop:  ()=>{ this._pause(); this._seek(); },
      getType: ()=>this.type,
      getCurrentTime: ()=>this.media.currentTime,
      getContainer:()=>this.container,
      setVolume: this._setVolume,
      togglePlay: this._togglePlay,
      toggleMute: this._toggleMute,
      toggleFullscreen: this._toggleFullscreen,
      toggleControls: this._toggleControls,
      play: this._play,
      pause: this._pause,
      getDuration:this._getDuration,
      seek:this._seek,
    }
    
    this._setup();
    this._log('player', this._player);
    if (!this.__init__) {
      return null;
    }
  }

  _setup(){
    if (this.__init__) {
      return null;
    }
    const {media} = this._player; 
    this._player.browser = utils.browserSniff;
    if (!utils.is.htmlElement(media)) {
      return;
    }
    this._setupStorage();//设置storage
    const tagName = media.tagName.toLowerCase();
    this._player.type  = this._type = tagName;
    this._config.crossorigin  = (media.getAttribute('crossorigin') !== null);
    this._config.autoplay     = (this._config.autoplay || (media.getAttribute('autoplay') !== null));
    this._config.loop         = (this._config.loop || (media.getAttribute('loop') !== null));
    this._player.supported = utils.supported(this._player.type);
    if (!this._player.supported.basic) {
      return;
    }
    this._player.container = this._wrap(media, document.createElement('div'));
    this._player.container.setAttribute('tabindex', 0);
    this._toggleStyleHook();
    this._log('' + this._player.browser.name + ' ' + this._player.browser.version);
    this._setupMedia();

    if(utils.inArray(this._config.types.html5,this._player.type)){
      // Setup UI
      this._setupInterface();

      this._ready();
    }
    this.__init__ = true;
  }
  _ready() {
    // Ready event at end of execution stack
    window.setTimeout(()=> {
      this._triggerEvent(this._media, 'ready');
    }, 0);

    // Set class hook on media element
    $.toggleClass(this._media, defaults.classes.setup, true);

    // Set container class for ready
    $.toggleClass(this._player.container, this._config.classes.ready, true);

    // Store a refernce to instance
    this._media.vplyr = this._api;

    // Autoplay
    if (this._config.autoplay) {
      this._play();
    }
  }
  _setupInterface(){
    const _getElements = (selector)=> {
      return this._player.container.querySelectorAll(selector);
    }
    const _getElement=(selector)=> {
      return _getElements(selector)[0];
    }
    if (!this._player.supported.full) {
      this._warn('Basic support only', this._player.type);
      
      // Remove controls
      $.removeElement(_getElement(this._config.selectors.controls.wrapper));
      // reset native controls
      this._toggleNativeControls(true);
      // Bail
      return;
    }
    const controlsMissing = !_getElements(this._config.selectors.controls.wrapper).length;
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
  _setupStorage() {
    var value = null;
    this._storage = {};

    // Bail if we don't have localStorage support or it's disabled
    if (!utils.storageSupport || !this._config.storage.enabled) {
      return;
    }
    
    window.localStorage.removeItem('vplyr-volume');

    // load value from the current key
    value = window.localStorage.getItem(this._config.storage.key);

    if (!value) {
        // Key wasn't set (or had been cleared), move along
        return;
    } else if (/^\d+(\.\d+)?$/.test(value)) {
      // If value is a number, it's probably volume from an older
      // version of plyr. See: https://github.com/Selz/plyr/pull/313
      // Update the key to be JSON
      this._updateStorage({volume: parseFloat(value)});
    } else {
        // Assume it's JSON from this or a later version of plyr
      this._storage = JSON.parse(value);
    }
  }
  _triggerEvent(element, type, bubbles, properties) {
    Event.customEvent(element, type, bubbles, utils.extend({}, properties, {
      vplyr: this
    }));
  }
  _getDuration() {
    // It should be a number, but parse it just incase
    var duration = parseInt(this._config.duration),

    // True duration
    mediaDuration = 0;

    // Only if duration available
    if (this._media.duration !== null && !isNaN(this._media.duration)) {
      mediaDuration = this._media.duration;
    }

    // If custom duration is funky, use regular duration
    return (isNaN(duration) ? mediaDuration : duration);
  }
  _seek(input){
    let targetTime  = 0,
        paused      = this._media.paused,
        duration    = this._getDuration();

    if (utils.is.number(input)) {
      targetTime = input;
    } else if (utils.is.object(input) && utils.inArray(['input', 'change'], input.type)) {
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
      this._media.currentTime = targetTime.toFixed(4);
    }
    catch(e) {}
    // Logging
    this._log('Seeking to ' + this._media.currentTime + ' seconds');
  }
  _play() {
    if ('play' in this._media) {
      this._media.play();
    }
  }
  _pause() {
    if ('pause' in this._media) {
      this._media.pause();
    }
  }
  _togglePlay(toggle) {
    // True toggle
    if (!utils.is.boolean(toggle)) {
      toggle = this._media.paused;
    }

    if (toggle) {
      this._play();
    } else {
      this._pause();
    }
    return toggle;
  }
  _getPercentage(current, max) {
    if (current === 0 || max === 0 || isNaN(current) || isNaN(max)) {
        return 0;
    }
    return ((current / max) * 100).toFixed(2);
  }
  _updateSeekDisplay(time) {
    // Default to 0
    if (!utils.is.number(time)) {
        time = 0;
    }
    const {progress,buttons} = this._player;
    var duration    = this._getDuration(),
        value       = this._getPercentage(time, duration);

    // Update progress
    if (progress && progress.played) {
      progress.played.value = value;
    }

    // Update seek range input
    if (buttons && buttons.seek) {
      buttons.seek.value = value;
    }
  }
  _mediaListeners(){
    const media = this._media;
    // Time change on media
    Event.onEvent(media, 'timeupdate seeking', this._timeUpdate.bind(this));

    Event.onEvent(media, 'durationchange loadedmetadata', this._displayDuration.bind(this));
    
    Event.onEvent(media, 'play pause ended', this._checkPlaying.bind(this));

    Event.onEvent(media, 'progress playing', this._updateProgress.bind(this));

    Event.onEvent(media, 'waiting canplay seeked', this._checkLoading.bind(this));

    Event.onEvent(media, 'volumechange', this._updateVolume.bind(this));
    
  }
  _proxyListener(element, eventName, userListener, defaultListener, useCapture) {
    Event.onEvent(element, eventName, function(event) {
      if (userListener) {
        userListener.apply(element, [event]);
      }
      defaultListener.apply(element, [event]);
    }, useCapture);
  }
  _controlListeners(){
    const {browser,buttons,volume,container,controls} = this._player;
    const {classes,listeners,hideControls} = this._config;
    const inputEvent = (browser.isIE ? 'change' : 'input');
    const togglePlay = ()=>{
      const play = this._togglePlay();
      let trigger = buttons[play ? 'play' : 'pause'],
          target =buttons[play ? 'pause' : 'play'];

      // Get the last play button to account for the large play button
      if (target && target.length > 1) {
        target = target[target.length - 1];
      } else {
        target = target[0];
      }
      if (target) {
        const hadTabFocus = $.hasClass(trigger, classes.tabFocus);

        setTimeout(function() {
          target.focus();
          if (hadTabFocus) {
            $.toggleClass(trigger, classes.tabFocus, false);
            $.toggleClass(target,classes.tabFocus, true);
          }
        }, 100);
      }
    }
    this._proxyListener(buttons.play, 'click', listeners.play, togglePlay);
    // Pause
    this._proxyListener(buttons.pause, 'click', listeners.pause, togglePlay);
    // Seek
    this._proxyListener(buttons.seek, inputEvent, listeners.seek, this._seek.bind(this));

    this._proxyListener(volume.input, inputEvent, listeners.volume, ()=>{
      this._setVolume(volume.input.value);
    });
    this._proxyListener(buttons.mute, 'click', listeners.mute, this._toggleMute.bind(this));

    this._proxyListener(buttons.fullscreen, 'click', listeners.fullscreen, this._toggleFullscreen.bind(this));

    // Handle user exiting fullscreen by escaping etc
    if (this._fullscreen.supportsFullScreen) {
      Event.onEvent(document, this._fullscreen.fullScreenEventName, this._toggleFullscreen.bind(this));
    }
    if (hideControls) {
      // Toggle controls on mouse events and entering fullscreen
      Event.onEvent(container, 'mouseenter mouseleave mousemove touchstart touchend touchcancel touchmove enterfullscreen', this._toggleControls.bind(this));

      // Watch for cursor over controls so they don't hide when trying to interact
      Event.onEvent(controls, 'mouseenter mouseleave', (event)=>{
          this._player.controls.hover = event.type === 'mouseenter';
      });

        // Watch for cursor over controls so they don't hide when trying to interact
      Event.onEvent(controls, 'mousedown mouseup touchstart touchend touchcancel', (event)=> {
        this._player.controls.pressed = utils.inArray(['mousedown', 'touchstart'], event.type);
      });
      // Focus in/out on controls
      Event.onEvent(controls, 'focus blur', this._toggleControls.bind(this), true);
    }
  }
  _toggleFullscreen(event) {
    // Check for native support
    const fullscreen = this._fullscreen;
    const {container,buttons} = this._player;
    var nativeSupport = fullscreen.supportsFullScreen;

    if (nativeSupport) {
      // If it's a fullscreen change event, update the UI
      if (event && event.type === fullscreen.fullScreenEventName) {
          this._player.isFullscreen = fullscreen.isFullScreen(container);
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
        this._player.isFullscreen = fullscreen.isFullScreen(container);

        return;
      }
    } else {
        // Otherwise, it's a simple toggle
        this._player.isFullscreen = !this._player.isFullscreen;

        // Bind/unbind escape key
        document.body.style.overflow = this._player.isFullscreen ? 'hidden' : '';
    }

    // Set class hook
    $.toggleClass(container, this._config.classes.fullscreen.active, this._player.isFullscreen);

    // Trap focus
    this._focusTrap(this._player.isFullscreen);

    // Set button state
    if (buttons && buttons.fullscreen) {
      this._toggleState(buttons.fullscreen, this._player.isFullscreen);
    }

    // Trigger an event
    this._triggerEvent(container, this._player.isFullscreen ? 'enterfullscreen' : 'exitfullscreen', true);

    // Restore scroll position
    if (!this._player.isFullscreen && nativeSupport) {
        this._restoreScrollPosition();
    }
  }
  _focusTrap() {
    const  {container,isFullscreen} = this._player;
    const _getElements = (selector)=> {
      return container.querySelectorAll(selector);
    }
    const _getElement=(selector)=> {
      return _getElements(selector)[0];
    }
    var tabbables   = _getElements('input:not([disabled]), button:not([disabled])'),
        first       = tabbables[0],
        last        = tabbables[tabbables.length - 1];

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
    Event.onEvent(container, 'keydown', _checkFocus);
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
  _checkLoading(event) {
    const loading = (event.type === 'waiting');
    const {container} = this._player;
    const {classes} = this._config;
    // Clear timer
    clearTimeout(this._timers.loading);

    // Timer to prevent flicker when seeking
    this._timers.loading = setTimeout(()=>{
      // Toggle container class hook
      $.toggleClass(container, classes.loading, loading);

      // Show controls if loading, hide if done
      this._toggleControls(loading);
    }, (loading ? 250 : 0));
  }
  _checkPlaying() {
    const {container} = this._player;
    const {classes} = this._config;
    const {paused} = this._media;
    $.toggleClass(container, classes.playing, !paused);

    $.toggleClass(container, classes.stopped, paused);

    this._toggleControls(paused);
  }
  _timeUpdate(event) {
    // Duration
    this._updateTimeDisplay(this._media.currentTime, this._player.currentTime);

    // Ignore updates while seeking
    if (event && event.type === 'timeupdate' && this._media.seeking) {
      return;
    }
    // Playing progress
    this._updateProgress(event);
  }
  _updateProgress(event){
    const {supported} = this._player;
    const {controls,progress,buttons} = this._player;
    if (!supported.full) {
      return;
    }

    var __progress    = progress.played,
        __value       = 0,
        duration    = this._getDuration();
    if(event){
      switch(event.type){
        case 'timeupdate':
        case 'seeking':
          if (controls.pressed) {
            return;
          }

          __value = this._getPercentage(this._media.currentTime, duration);

          // Set seek range value only if it's a 'natural' time event
          if (event.type === 'timeupdate' && buttons.seek) {
            buttons.seek.value = __value;
          }

          break;  
          // Check buffer status
        case 'playing':
        case 'progress':
          __progress    = progress.buffer;
          __value = (()=> {
            var buffered = this._media.buffered;

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
    const {supported} = this._player;
    if (!supported.full) {
      return;
    }

    // Default to 0
    if (utils.is.undefined(value)) {
      value = 0;
    }
    // Default to buffer or bail
    if (utils.is.undefined(progress)) {
      if (this._player.progress && this._player.progress.buffer) {
        progress = this._player.progress.buffer;
      } else {
        return;
      }
    }

    // One progress element passed
    if (utils.is.htmlElement(progress)) {
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
  _setVolume(volume){
    const max = this._config.volumeMax,
        min = this._config.volumeMin;

    // Load volume from storage if no value specified
    if (utils.is.undefined(volume)) {
      volume = this._storage.volume;
    }

    // Use config if all else fails
    if (volume === null || isNaN(volume)) {
      volume = this._config.volume;
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
    this._media.volume = parseFloat(volume / max);

    // Set the display
    if (this._player.volume.display) {
      this._player.volume.display.value = volume;
    }
    // Toggle muted state
    if (volume === 0) {
      this._media.muted = true;
    } else if (this._media.muted && volume > 0) {
      this._toggleMute();
    }
  }
  _updateVolume() {
    const {muted} = this._media;
    const {container,buttons,supported,volume} = this._player;
    const {classes} = this._config;
    // Get the current volume
    var __volume = muted ? 0 : (this._media.volume * this._config.volumeMax);

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
    this._updateStorage({volume: __volume});

    // Toggle class if muted
    $.toggleClass(container, classes.muted, (__volume === 0));

    // Update checkbox for mute state
    if (supported.full && buttons.mute) {
      this._toggleState(buttons.mute, (volume === 0));
    }
  }
  _updateStorage(value) {
    // Bail if we don't have localStorage support or it's disabled
    if (!utils.storageSupport || !this._config.storage.enabled) {
        return;
    }

    // Update the working copy of the values
    utils.extend(this._storage, value);

    // Update storage
    window.localStorage.setItem(this._config.storage.key, JSON.stringify(this._storage));
  }
  _toggleState(target, state) {
    // Bail if no target
    if (!target) {
        return;
    }
    // Get state
    state = (utils.is.boolean(state) ? state : !target.getAttribute('aria-pressed'));

    // Set the attribute on target
    target.setAttribute('aria-pressed', state);
    return state;
  }
  _toggleMute(muted){
    if (!utils.is.boolean(muted)) {
      muted = !this._media.muted;
    }

    // Set button state
    this._toggleState(this._player.buttons.mute, muted);

    // Set mute on the player
    this._media.muted = muted;

    // If volume is 0 after unmuting, set to default
    if (this._media.volume === 0) {
      this._setVolume(this._config.volume);
    }

  }
  _displayDuration() {
    const {supported,duration,currentTime} = this._player;
    const {displayDuration} = this._config;
    if (!supported.full) {
      return;
    }

    // Determine duration
    var __duration = this._getDuration() || 0;

    // If there's only one time display, display duration there
    if (!duration && displayDuration && this._media.paused) {
      this._updateTimeDisplay(__duration,currentTime);
    }

    // If there's a duration element, update content
    if (duration) {
      this._updateTimeDisplay(__duration, duration);
    }

  }
  _updateTimeDisplay(time, element) {
    // Bail if there's no duration display
    if (!element) {
        return;
    }

    // Fallback to 0
    if (isNaN(time)) {
        time = 0;
    }

    this._player.secs = parseInt(time % 60);
    this._player.mins = parseInt((time / 60) % 60);
    this._player.hours = parseInt(((time / 60) / 60) % 60);

    // Do we need to display hours?
    var displayHours = (parseInt(((this._getDuration() / 60) / 60) % 60) > 0);

    // Ensure it's two digits. For example, 03 rather than 3.
    this._player.secs = ('0' + this._player.secs).slice(-2);
    this._player.mins = ('0' + this._player.mins).slice(-2);

    // Render
    element.innerHTML = (displayHours ? this._player.hours + ':' : '') + this._player.mins + ':' + this._player.secs;
  }
  _injectControls(){
    let {html,selectors} = this._config;
    const {container} = this._player;
    // Insert custom video controls
    this._log('Injecting custom controls');
    // If no controls are specified, create default
    if (!html) {
      html = this._buildControls();
    }
    const random =Math.floor(Math.random() * (1000000));
    container.setAttribute('id', `vplyr${random}`);
    html = utils.replaceAll(html, '{id}', random);
    let target;
    if (utils.is.string(selectors.controls.container)) {
      target = document.querySelector(selectors.controls.container);
    }
    // Inject into the container by default
    if (!utils.is.htmlElement(target)) {
      target = container
    }
    target.insertAdjacentHTML('beforeend', html);
  }
  _findElements(){
    const {container} = this._player;
    const {selectors} = this._config;
    const {controls,buttons,progress,volume,duration,currentTime,seekTime} = selectors;
    const _getElements = (selector)=> {
      return container.querySelectorAll(selector);
    }
    const _getElement=(selector)=> {
      return _getElements(selector)[0];
    }
    try {
      this._player.controls                 = _getElement(controls.wrapper);

      // Buttons
      this._player.buttons = {};
      this._player.buttons.seek             = _getElement(buttons.seek);
      this._player.buttons.play             = _getElements(buttons.play);
      this._player.buttons.pause            = _getElement(buttons.pause);
      this._player.buttons.fullscreen       = _getElement(buttons.fullscreen);

      // Inputs
      this._player.buttons.mute             = _getElement(buttons.mute);

      // Progress
      this._player.progress = {};
      this._player.progress.container       = _getElement(progress.container);

      // Progress - Buffering
      this._player.progress.buffer          = {};
      this._player.progress.buffer.bar      = _getElement(progress.buffer);
      this._player.progress.buffer.text     = this._player.progress.buffer.bar && this._player.progress.buffer.bar.getElementsByTagName('span')[0];

      // Progress - Played
      this._player.progress.played          = _getElement(progress.played);

      // Volume
      this._player.volume                   = {};
      this._player.volume.input             = _getElement(volume.input);
      this._player.volume.display           = _getElement(volume.display);

      // Timing
      this._player.duration                 = _getElement(duration);
      this._player.currentTime              = _getElement(currentTime);
      this._player.seekTime                 = _getElements(seekTime);

      return true;
    }
    catch(e) {
      this._warn('It looks like there is a problem with your controls HTML');
      // Restore native video controls
      this._toggleNativeControls(true);

      return false;
    }
  }
  _buildControls(){
    const {controls} = this._config;
    const html = ['<div class="vplyr-video-loader-container">',
          '<div class="vplyr-video-loader">',
          '<div class="loader-inner one"></div>',
          '<div class="loader-inner two"></div>',
          '<div class="loader-inner three"></div>',
          '</div>',
          '</div><div class="vplyr-gradient-bottom"></div>'];
    html.push('<div class="vplyr-bottom-container">')
    if (utils.inArray(controls, 'progress')) {
      html.push(
          '<div class="vplyr-progress-bar-container">',
          '<input id="seek{id}" type="range" min="0" max="100" value="0" step="0.1" class="vplyr-progress-bar" data-video="seek"/>',
          '<progress class="vplyr-progress-played" max="100" role="presentation"></progress>',
          '<progress class="vplyr-progress-buffer" max="100" value="100">',
          '<span>100.00</span>% buffered',
          '</progress>',
          '</div>'
      );
    }
    html.push('<div class="vplyr-controls">')
    html.push('<div class="left-controls">')
    if (utils.inArray(controls, 'play')) {
      html.push(
        '<div class="btn-controls">',
          '<div class="btn-wrap">',
          '<div class="play" data-video="play"></div>',
          '<div class="pause" data-video="pause"></div>',
          '</div>',
          '</div>'
      );
    }
    if (utils.inArray(controls, 'time')) {
      html.push(
        '<div class="time-mod-controls">',
          '<div class="control-currenttime">00:00</div>',
          '<div class="control-separator">/</div>',
          '<div class="control-duration">00:00</div>',
          '</div>'
      );
    }
    html.push('</div>')//close vplyr left controls
    html.push('<div class="right-controls">')
    if (utils.inArray(controls, 'fullscreen')) {
      html.push(
        '<div class="fullscreen-controls" data-video="fullscreen">',
          '<svg class="icon-exit-fullscreen">',
          '<use xlink:href="#vplyr-exit-fullscreen"></use>',
          '</svg>',
          '<svg class="icon-enter-fullscreen">',
          ' <use xlink:href="#vplyr-enter-fullscreen"></use>',
          '</svg>',
          '</div>'
      );
    }
    html.push('<div class="volume-controls">')
    if (utils.inArray(controls, 'mute')) {
      html.push(
        '<div class="vplyr-volume" data-video="mute">',
          '<svg class="icon-muted">',
          '<use xlink:href="#vplyr-muted"></use>',
          '</svg>',
          '<svg class="icon-volume">',
          '<use xlink:href="#vplyr-volume"></use>',
          '</svg>',
          '</div>'
      );
    }
    if (utils.inArray(controls, 'volume')) {
      html.push(
        '<div class="vplyr-volume-progress">',
          '<input type="range" id="volume{id}"  class="vplyr-volume-input"  min="0"  max="10" data-video="volume" value="8">',
          '<progress class="vplyr-volume-display" max="10" role="presentation"></progress>',
          '</div>'
      );
    }
    html.push('</div>')//close vplyr volume controls
    
    html.push('</div>')//close vplyr right controls
    
    html.push('</div>')//close vplyr controls
    html.push('</div>')//close
    return html.join('');
  }
  _toggleControls(toggle) {
    const {hideControls,classes} = this._config;
    const {type,container,browser,controls} = this._player;
    const {paused} = this._media;
    // Don't hide if config says not to, it's audio, or not ready or loading
    if (!hideControls || type === 'audio') {
      return;
    }

    var delay = 0,
        isEnterFullscreen = false,
        show = toggle,
        loading = $.hasClass(container, classes.loading);

    // Default to false if no boolean
    if (!utils.is.boolean(toggle)) {
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
    window.clearTimeout(this._timers.hover);

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
      this._timers.hover = window.setTimeout(() =>{
        // If the mouse is over the controls (and not entering fullscreen), bail
        if ((controls.pressed || controls.hover) && !isEnterFullscreen) {
            return;
        }

        $.toggleClass(container, classes.hideControls, true);
      }, delay);
    }
  }
  _setupMedia(){
    if (!this._player.media) {
      this._warn('No media element found!');
      return;
    }
    const {autoplay,classes} = this._config;
    const {container,type,browser,supported} = this._player;
    const {stopped,inIos,inChrome,inTouch,inWechat,videoWrapper} =classes;
    const {isIos,isChrome,isTouch,isWechat} = browser;
    if(supported.full){
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
      if(this._player.type === 'video'){
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', videoWrapper);
        this._wrap(this._player.media, wrapper);
        // Cache the container
        this._player.videoContainer = wrapper;
      }
    }
  }
  _toggleNativeControls(toggle) {
    if (toggle && utils.inArray(this._config.types.html5, this._player.type)) {
      this._media.setAttribute('controls', '');
    } else {
      this._media.removeAttribute('controls');
    }
  }
  _wrap(elements, wrapper) {
    // Convert `elements` to an array, if necessary.
    if (!elements.length) {
        elements = [elements];
    }

    // Loops backwards to prevent having to clone the wrapper on the
    // first element (see `child` below).
    for (var i = elements.length - 1; i >= 0; i--) {
      var child   = (i > 0) ? wrapper.cloneNode(true) : wrapper;
      var element = elements[i];

      // Cache the current parent and sibling.
      var parent  = element.parentNode;
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
  _toggleStyleHook() {
    $.toggleClass(this._player.container, this._config.selectors.container.replace('.', ''), this._player.supported.full);
  }
}
export default Player;