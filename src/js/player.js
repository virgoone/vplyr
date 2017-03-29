'use strict';

import utils from './util';
import $ from './dom';
import Event from './event';
import Logger from './logger';
let _log , _warn;
import {defaultConfig as defaults} from './config';

const playerMap = new WeakMap();
const fullscreen = $.fullscreen();

class Player {
  constructor(media, config){
    const _logger = new Logger(config);
    
    this._log = _logger.log;
    this._warn = _logger.warn;
    playerMap.set(this,{
      media,
      config,
      player:{},
      timers:{},
      fullscreen,
      original:null,
      storage:{}
    })
    this._init();
    this._log(this,$);
  }
  pause(){
    this._pause();
  }
  play(){
    this._play();
  }
  stop(){
    this._pause();
    this._seek();
  }
  togglePlay(){
    this._togglePlay();
  }
  toggleControls(){
    this._toggleControls();
  }
  get loadingState(){
    const {player,config} = playerMap.get(this);
    const {container} = player;
    const {classes} = config;
    return $.hasClass(container, classes.loading);
  }
  get readyState(){
    const {player,config} = playerMap.get(this);
    const {container} = player;
    const {classes} = config;
    return $.hasClass(container, classes.ready);
  }
  get container(){
    const {player} = playerMap.get(this);
    return player.container;
  }
  get type(){
    const {player} = playerMap.get(this);
    return player.type;
  }
  get volume(){
    const {player} = playerMap.get(this);
    return player.media.volume;
  }
  get duration(){
    return this._getDuration();
  }
  get currentTime(){
    const {player} = playerMap.get(this);
    return player.media.currentTime;
  }
  get fullscreen(){
    const {player} = playerMap.get(this);
    return player.isFullscreen || false;
  }
  get muted(){
    const {player} = playerMap.get(this);
    return player.media.muted;
  }
  get paused(){
    const {player} = playerMap.get(this);
    return player.media.paused;
  }
  set fullscreen(fullscreen){
    if(!utils.is.boolean(fullscreen)){
      return;
    }
    
    const {player} = playerMap.get(this);
    if((!player.isFullscreen && fullscreen) || (player.isFullscreen && !fullscreen)){
      this._toggleFullscreen();
    }
  }
  set volume(value){
    return this._setVolume(value);
  }
  set currentTime(value){
    this.seek(value);
  }
  set muted(muted){
    this._toggleMute(muted);
  }
  _init(){
    const {player,media,config} = playerMap.get(this);
    let {original} = playerMap.get(this);
    original = media.cloneNode(true);
    player.media =media;
    this._log('Config', config);
    
    
    this._setup();
    this._log('player', player);
    if (!this.__init__) {
      return null;
    }
  }
  _setup(){
    if (this.__init__) {
      return null;
    }
    const {original,player,config} = playerMap.get(this);
    const {media} = player; 
    player.browser = utils.browserSniff;
    if (!utils.is.htmlElement(media)) {
      return;
    }
    this._setupStorage();//设置storage
    const tagName = media.tagName.toLowerCase();
    player.type  = tagName;
    config.crossorigin  = (media.getAttribute('crossorigin') !== null);
    config.autoplay     = (config.autoplay || (media.getAttribute('autoplay') !== null));
    config.loop         = (config.loop || (media.getAttribute('loop') !== null));
    player.supported = utils.supported(player.type);
    if (!player.supported.basic) {
      return;
    }
    player.container = this._wrap(media, document.createElement('div'));
    player.container.setAttribute('tabindex', 0);
    this._toggleStyleHook();
    this._log('' + player.browser.name + ' ' + player.browser.version);
    this._setupMedia();

    if(utils.inArray(config.types.html5,player.type)){
      // Setup UI
      this._setupInterface();

      this._ready();
    }
    this.__init__ = true;
  }
  _ready() {
    const {player,config} = playerMap.get(this);
    const {media,container} = player;
    
    // Ready event at end of execution stack
    window.setTimeout(()=> {
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
  _setupInterface(){
    const {player,config} = playerMap.get(this);
    
    const _getElements = (selector)=> {
      return player.container.querySelectorAll(selector);
    }
    const _getElement=(selector)=> {
      return _getElements(selector)[0];
    }
    if (!player.supported.full) {
      this._warn('Basic support only', player.type);
      
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
    let {config,storage} = playerMap.get(this);
    // Bail if we don't have localStorage support or it's disabled
    if (!utils.storageSupport || !config.storage.enabled) {
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
      this._updateStorage({volume: parseFloat(value)});
    } else {
        // Assume it's JSON from this or a later version of plyr
      storage = JSON.parse(value);
    }
  }
  _triggerEvent(element, type, bubbles, properties) {
    Event.customEvent(element, type, bubbles, utils.extend({}, properties, {
      vplyr: this
    }));
  }
  _getDuration() {
    const {config,player} = playerMap.get(this);
    const {media} = player;
    
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
  _seek(input){
    const {player} = playerMap.get(this);
    const {media} = player;
    let targetTime  = 0,
        paused      = media.paused,
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
      media.currentTime = targetTime.toFixed(4);
    }
    catch(e) {}
    // Logging
    this._log('Seeking to ' + media.currentTime + ' seconds');
  }
  _play() {
    const {player} = playerMap.get(this);
    const {media} = player;
    if ('play' in media) {
      media.play();
    }
  }
  _pause() {
    const {player} = playerMap.get(this);
    const {media} = player;
    if ('pause' in media) {
      media.pause();
    }
  }
  _togglePlay(toggle) {
    const {player} = playerMap.get(this);
    const {media} = player;
    // True toggle
    if (!utils.is.boolean(toggle)) {
      toggle = media.paused;
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
    const {player} = playerMap.get(this);
    
    const {progress,buttons} = player;
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
    const {player} = playerMap.get(this);
    const {media} = player;
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
    const {player,config,fullscreen} = playerMap.get(this);
    
    const {browser,buttons,volume,container,controls} = player;
    const {classes,listeners,hideControls} = config;
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
    if (fullscreen.supportsFullScreen) {
      Event.onEvent(document, fullscreen.fullScreenEventName, this._toggleFullscreen.bind(this));
    }
    if (hideControls) {
      // Toggle controls on mouse events and entering fullscreen
      Event.onEvent(container, 'mouseenter mouseleave mousemove touchstart touchend touchcancel touchmove enterfullscreen', this._toggleControls.bind(this));

      // Watch for cursor over controls so they don't hide when trying to interact
      Event.onEvent(controls, 'mouseenter mouseleave', (event)=>{
          player.controls.hover = event.type === 'mouseenter';
      });

        // Watch for cursor over controls so they don't hide when trying to interact
      Event.onEvent(controls, 'mousedown mouseup touchstart touchend touchcancel', (event)=> {
        player.controls.pressed = utils.inArray(['mousedown', 'touchstart'], event.type);
      });
      // Focus in/out on controls
      Event.onEvent(controls, 'focus blur', this._toggleControls.bind(this), true);
    }
  }
  _toggleFullscreen(event) {
    // Check for native support
    const {player,config,fullscreen} = playerMap.get(this);
    
    const {container,buttons} = player;
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
  _focusTrap() {
    const {player,config} = playerMap.get(this);
    const  {container} = player;
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
    const {player,config,timers} = playerMap.get(this);
    const loading = (event.type === 'waiting');
    const {container} = player;
    const {classes} = config;
    // Clear timer
    clearTimeout(timers.loading);

    // Timer to prevent flicker when seeking
    timers.loading = setTimeout(()=>{
      // Toggle container class hook
      $.toggleClass(container, classes.loading, loading);

      // Show controls if loading, hide if done
      this._toggleControls(loading);
    }, (loading ? 250 : 0));
  }
  _checkPlaying() {
    const {player,config} = playerMap.get(this);
    const {media,container} = player;
    const {classes} = config;
    const {paused} = media;
    $.toggleClass(container, classes.playing, !paused);

    $.toggleClass(container, classes.stopped, paused);

    this._toggleControls(paused);
  }
  _timeUpdate(event) {
    const {player,config} = playerMap.get(this);
    const {media} = player;
    // Duration
    this._updateTimeDisplay(media.currentTime, player.currentTime);

    // Ignore updates while seeking
    if (event && event.type === 'timeupdate' && media.seeking) {
      return;
    }
    // Playing progress
    this._updateProgress(event);
  }
  _updateProgress(event){
    const {player} = playerMap.get(this);
    const {media,controls,progress,buttons,supported} = player;
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

          __value = this._getPercentage(media.currentTime, duration);

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
    const {player} = playerMap.get(this);
    
    const {supported} = player;
    if (!supported.full) {
      return;
    }

    // Default to 0
    if (utils.is.undefined(value)) {
      value = 0;
    }
    // Default to buffer or bail
    if (utils.is.undefined(progress)) {
      if (player.progress && player.progress.buffer) {
        progress = player.progress.buffer;
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
    const {player,config,storage} = playerMap.get(this);
    const {media} = player;
    const max = config.volumeMax,
        min = config.volumeMin;

    // Load volume from storage if no value specified
    if (utils.is.undefined(volume)) {
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
  _updateVolume() {
    const {player,config,storage} = playerMap.get(this);
    const {media,container,buttons,supported,volume} = player;
    const {muted} = media;
    const {classes} = config;
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
    this._updateStorage({volume: __volume});

    // Toggle class if muted
    $.toggleClass(container, classes.muted, (__volume === 0));

    // Update checkbox for mute state
    if (supported.full && buttons.mute) {
      this._toggleState(buttons.mute, (volume === 0));
    }
  }
  _updateStorage(value) {
    const {storage,config} = playerMap.get(this);
    
    // Bail if we don't have localStorage support or it's disabled
    if (!utils.storageSupport || !config.storage.enabled) {
        return;
    }

    // Update the working copy of the values
    utils.extend(storage, value);

    // Update storage
    window.localStorage.setItem(config.storage.key, JSON.stringify(storage));
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
    const {player,config,storage} = playerMap.get(this);
    const {media} = player;
    if (!utils.is.boolean(muted)) {
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
  _displayDuration() {
    const {player,config,storage} = playerMap.get(this);
    const {media,supported,duration,currentTime} = player;
    const {displayDuration} = config;
    if (!supported.full) {
      return;
    }

    // Determine duration
    var __duration = this._getDuration() || 0;

    // If there's only one time display, display duration there
    if (!duration && displayDuration && media.paused) {
      this._updateTimeDisplay(__duration,currentTime);
    }

    // If there's a duration element, update content
    if (duration) {
      this._updateTimeDisplay(__duration, duration);
    }

  }
  _updateTimeDisplay(time, element) {
    const {player} = playerMap.get(this);
    
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
  _injectControls(){
    const {player,config} = playerMap.get(this);
    let {html,selectors} = config;
    const {container} = player;
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
    const {player,config} = playerMap.get(this);
    
    const {container} = player;
    const {selectors} = config;
    const {controls,buttons,progress,volume,duration,currentTime,seekTime} = selectors;
    const _getElements = (selector)=> {
      return container.querySelectorAll(selector);
    }
    const _getElement=(selector)=> {
      return _getElements(selector)[0];
    }
    try {
      player.controls                 = _getElement(controls.wrapper);

      // Buttons
      player.buttons = {};
      player.buttons.seek             = _getElement(buttons.seek);
      player.buttons.play             = _getElements(buttons.play);
      player.buttons.pause            = _getElement(buttons.pause);
      player.buttons.fullscreen       = _getElement(buttons.fullscreen);

      // Inputs
      player.buttons.mute             = _getElement(buttons.mute);

      // Progress
      player.progress = {};
      player.progress.container       = _getElement(progress.container);

      // Progress - Buffering
      player.progress.buffer          = {};
      player.progress.buffer.bar      = _getElement(progress.buffer);
      player.progress.buffer.text     = player.progress.buffer.bar && player.progress.buffer.bar.getElementsByTagName('span')[0];

      // Progress - Played
      player.progress.played          = _getElement(progress.played);

      // Volume
      player.volume                   = {};
      player.volume.input             = _getElement(volume.input);
      player.volume.display           = _getElement(volume.display);

      // Timing
      player.duration                 = _getElement(duration);
      player.currentTime              = _getElement(currentTime);
      player.seekTime                 = _getElements(seekTime);

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
    const {config} = playerMap.get(this);
    
    const {controls} = config;
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
    const {player,config,timers} = playerMap.get(this);
    
    const {hideControls,classes} = config;
    const {type,container,browser,controls,media} = player;
    const {paused} = media;
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
      timers.hover = window.setTimeout(() =>{
        // If the mouse is over the controls (and not entering fullscreen), bail
        if ((controls.pressed || controls.hover) && !isEnterFullscreen) {
            return;
        }

        $.toggleClass(container, classes.hideControls, true);
      }, delay);
    }
  }
  _setupMedia(){
    const {original,player,config} = playerMap.get(this);
    if (!player.media) {
      this._warn('No media element found!');
      return;
    }
    const {autoplay,classes} = config;
    const {container,type,browser,supported} = player;
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
      if(player.type === 'video'){
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', videoWrapper);
        this._wrap(player.media, wrapper);
        // Cache the container
        player.videoContainer = wrapper;
      }
    }
  }
  _toggleNativeControls(toggle) {
    const {player,config} = playerMap.get(this);
    const {media} = player;
    if (toggle && utils.inArray(config.types.html5, player.type)) {
      media.setAttribute('controls', '');
    } else {
      media.removeAttribute('controls');
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
    const {player,config} = playerMap.get(this);
    $.toggleClass(player.container, config.selectors.container.replace('.', ''), player.supported.full);
  }
}
export default Player;