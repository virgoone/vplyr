'use strict';

import utils from './util';
import $ from './dom';
import Event from './event';
let _log , _warn;

class Player {
  constructor(media, config){
    this._init(media, config);
  }
  _init(media, config){
    const vk = this;
    const timers = {};
    let api = {};
    vk.media = media;
    let original = media.cloneNode(true);
    const _console = (type,args)=>{
      if (config.debug && window.console) {
        args = Array.prototype.slice.call(args);

        if (utils.is.string(config.logPrefix) && config.logPrefix.length) {
          args.unshift(config.logPrefix);
        }

        console[type].apply(console, args);
      }
    };
    _log = function() { _console('log', arguments) };
    _warn = function() { _console('warn', arguments) };
    _log('Config', config);
    vk.config = config;
    this._setup(vk,config);
    _log('player', vk);
    if (!vk.init) {
      return null;
    }
    return api;
  }

  _setup(player,config){
    if (player.init) {
      return null;
    }
    player.browser = utils.browserSniff;
    if (!utils.is.htmlElement(player.media)) {
      return;
    }
    const tagName = player.media.tagName.toLowerCase();
    player.type         = tagName;
    config.crossorigin  = (player.media.getAttribute('crossorigin') !== null);
    config.autoplay     = (config.autoplay || (player.media.getAttribute('autoplay') !== null));
    config.loop         = (config.loop || (player.media.getAttribute('loop') !== null));
    player.supported = utils.supported(player.type);
    if (!player.supported.basic) {
      return;
    }
    player.container = this._wrap(player.media, document.createElement('div'));
    player.container.setAttribute('tabindex', 0);
    this._toggleStyleHook(player,config);
    _log('' + player.browser.name + ' ' + player.browser.version);
    this._setupMedia(player,config);
    if(utils.inArray(config.types.html5,player.type)){
      // Setup UI
      this._setupInterface(player,config);
    }
  }
  _setupInterface(player,config){
    const _getElements = (selector)=> {
      return player.container.querySelectorAll(selector);
    }
    const _getElement=(selector)=> {
      return _getElements(selector)[0];
    }
    if (!player.supported.full) {
      _warn('Basic support only', player.type);
      
      // Remove controls
      $.removeElement(_getElement(config.selectors.controls.wrapper));
      // reset native controls
      this._toggleNativeControls(true,player,config);
      // Bail
      return;
    }
    const controlsMissing = !_getElements(config.selectors.controls.wrapper).length;
    if (controlsMissing) {
      // Inject custom controls
      this._injectControls(player,config);
    }
    // Find the elements
    if (!this._findElements(player,config)) {
      return;
    }
    if (controlsMissing) {
      this._controlListeners(player,config);
    }
    this._mediaListeners();
    this._timeUpdate();
    this._checkPlaying();
  }
  _getDuration() {
    // It should be a number, but parse it just incase
    var duration = parseInt(this.config.duration),

    // True duration
    mediaDuration = 0;

    // Only if duration available
    if (this.media.duration !== null && !isNaN(this.media.duration)) {
      mediaDuration = this.media.duration;
    }

    // If custom duration is funky, use regular duration
    return (isNaN(duration) ? mediaDuration : duration);
  }
  _seek(input){
    _log(this);
    let targetTime  = 0,
        paused      = this.media.paused,
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
      this.media.currentTime = targetTime.toFixed(4);
    }
    catch(e) {}
    // Logging
    _log('Seeking to ' + this.media.currentTime + ' seconds');
  }
  _play() {
    if ('play' in this.media) {
      this.media.play();
    }
  }
  _pause() {
    if ('pause' in this.media) {
      this.media.pause();
    }
  }
  _togglePlay(toggle) {
    // True toggle
    if (!utils.is.boolean(toggle)) {
      toggle = this.media.paused;
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

    var duration    = this._getDuration(),
        value       = this._getPercentage(time, duration);

    // Update progress
    if (this.progress && this.progress.played) {
      this.progress.played.value = value;
    }

    // Update seek range input
    if (this.buttons && this.buttons.seek) {
      this.buttons.seek.value = value;
    }
  }
  _mediaListeners(){
    // Time change on media
    Event.onEvent(this.media, 'timeupdate seeking', this._timeUpdate.bind(this));

    Event.onEvent(this.media, 'durationchange loadedmetadata', this._displayDuration.bind(this));
    
    Event.onEvent(this.media, 'play pause ended', this._checkPlaying.bind(this));
    
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
    const inputEvent = (this.browser.isIE ? 'change' : 'input');
    const togglePlay = ()=>{
      const play = this._togglePlay();
      let trigger = this.buttons[play ? 'play' : 'pause'],
          target = this.buttons[play ? 'pause' : 'play'];

      // Get the last play button to account for the large play button
      if (target && target.length > 1) {
        target = target[target.length - 1];
      } else {
        target = target[0];
      }
      if (target) {
        const hadTabFocus = $.hasClass(trigger, this.config.classes.tabFocus);

        setTimeout(function() {
          target.focus();
          if (hadTabFocus) {
            $.toggleClass(trigger, this.config.classes.tabFocus, false);
            $.toggleClass(target, this.config.classes.tabFocus, true);
          }
        }, 100);
      }
    }
    this._proxyListener(this.buttons.play, 'click', this.config.listeners.play, togglePlay);
    // Pause
    this._proxyListener(this.buttons.pause, 'click', this.config.listeners.pause, togglePlay);
    // Seek
    this._proxyListener(this.buttons.seek, inputEvent, this.config.listeners.seek, this._seek.bind(this));
  }
  _checkPlaying() {
    $.toggleClass(this.container, this.config.classes.playing, !this.media.paused);

    $.toggleClass(this.container, this.config.classes.stopped, this.media.paused);

    // $.toggleControls(this.media.paused);
  }
  _timeUpdate(event) {
    // Duration
    this._updateTimeDisplay(this.media.currentTime, this.currentTime);

    // Ignore updates while seeking
    if (event && event.type === 'timeupdate' && this.media.seeking) {
      return;
    }
    // Playing progress
    this._updateProgress(event);
  }
  _updateProgress(event){
    if (!this.supported.full) {
      return;
    }

    var progress    = this.progress.played,
        value       = 0,
        duration    = this._getDuration();
    if(event){
      switch(event.type){
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
          progress    = this.progress.buffer;
          const buffered = this.media.buffered;
          if (buffered && buffered.length) {
            value = this._getPercentage(buffered.end(0), duration);
          }else{
            value = 0 ;
          }
          break;
      }
    }
    this._setProgress(progress, value);
  }
  _setProgress(progress, value) {
    if (!this.supported.full) {
      return;
    }

    // Default to 0
    if (utils.is.undefined(value)) {
      value = 0;
    }
    // Default to buffer or bail
    if (utils.is.undefined(progress)) {
      if (this.progress && this.progress.buffer) {
        progress = this.progress.buffer;
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
  _displayDuration() {
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
  _updateTimeDisplay(time, element) {
    // Bail if there's no duration display
    if (!element) {
        return;
    }

    // Fallback to 0
    if (isNaN(time)) {
        time = 0;
    }

    this.secs = parseInt(time % 60);
    this.mins = parseInt((time / 60) % 60);
    this.hours = parseInt(((time / 60) / 60) % 60);

    // Do we need to display hours?
    var displayHours = (parseInt(((this._getDuration() / 60) / 60) % 60) > 0);

    // Ensure it's two digits. For example, 03 rather than 3.
    this.secs = ('0' + this.secs).slice(-2);
    this.mins = ('0' + this.mins).slice(-2);

    // Render
    element.innerHTML = (displayHours ? this.hours + ':' : '') + this.mins + ':' + this.secs;
  }
  _injectControls(player,config){
    let html = config.html;

    // Insert custom video controls
    _log('Injecting custom controls');
    // If no controls are specified, create default
    if (!html) {
      html = this._buildControls(config);
    }
    const random =Math.floor(Math.random() * (1000000));
    player.container.setAttribute('id', `vplyr${random}`);
    html = utils.replaceAll(html, '{id}', random);
    let target;
    if (utils.is.string(config.selectors.controls.container)) {
      target = document.querySelector(config.selectors.controls.container);
    }
    // Inject into the container by default
    if (!utils.is.htmlElement(target)) {
      target = player.container
    }
    target.insertAdjacentHTML('beforeend', html);
  }
  _findElements(player,config){
    const _getElements = (selector)=> {
      return player.container.querySelectorAll(selector);
    }
    const _getElement=(selector)=> {
      return _getElements(selector)[0];
    }
    try {
      player.controls                 = _getElement(config.selectors.controls.wrapper);

      // Buttons
      player.buttons = {};
      player.buttons.seek             = _getElement(config.selectors.buttons.seek);
      player.buttons.play             = _getElements(config.selectors.buttons.play);
      player.buttons.pause            = _getElement(config.selectors.buttons.pause);
      player.buttons.fullscreen       = _getElement(config.selectors.buttons.fullscreen);

      // Inputs
      player.buttons.mute             = _getElement(config.selectors.buttons.mute);

      // Progress
      player.progress = {};
      player.progress.container       = _getElement(config.selectors.progress.container);

      // Progress - Buffering
      player.progress.buffer          = {};
      player.progress.buffer.bar      = _getElement(config.selectors.progress.buffer);
      player.progress.buffer.text     = player.progress.buffer.bar && player.progress.buffer.bar.getElementsByTagName('span')[0];

      // Progress - Played
      player.progress.played          = _getElement(config.selectors.progress.played);

      // Volume
      player.volume                   = {};
      player.volume.input             = _getElement(config.selectors.volume.input);
      player.volume.display           = _getElement(config.selectors.volume.display);

      // Timing
      player.duration                 = _getElement(config.selectors.duration);
      player.currentTime              = _getElement(config.selectors.currentTime);
      player.seekTime                 = _getElements(config.selectors.seekTime);

      return true;
    }
    catch(e) {
      _warn('It looks like there is a problem with your controls HTML');
      // Restore native video controls
      this._toggleNativeControls(true,player,config);

      return false;
    }
  }
  _buildControls(config){
    const html = ['<div class="vplyr-gradient-bottom"></div>'];
    html.push('<div class="vplyr-bottom-container">')
    if (utils.inArray(config.controls, 'progress')) {
      html.push(
          '<div class="vplyr-progress-bar-container">',
          '<input id="seek{id}" type="range" min="0" max="100" value="0" step="0.1" class="vplyr-progress-bar" data-video="seek"/>',
          '<progress class="vplyr-progress-played" max="100" role="presentation"></progress>',
          '<progress class="vplyr-progress-buffer" max="100" value="100">',
          '<span>100.00</span>',
          '</progress>',
          '</div>'
      );
    }
    html.push('<div class="vplyr-controls">')
    html.push('<div class="left-controls">')
    if (utils.inArray(config.controls, 'play')) {
      html.push(
        '<div class="btn-controls">',
          '<div class="btn-wrap">',
          '<div class="play" data-video="play"></div>',
          '<div class="pause" data-video="pause"></div>',
          '</div>',
          '</div>'
      );
    }
    if (utils.inArray(config.controls, 'time')) {
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
    if (utils.inArray(config.controls, 'fullscreen')) {
      html.push(
        '<div class="fullscreen-controls">',
          '<svg class="icon-exit-fullscreen" data-video="fullscreen">',
          '<use xlink:href="#vplyr-exit-fullscreen"></use>',
          '</svg>',
          '<svg class="icon-enter-fullscreen">',
          ' <use xlink:href="#vplyr-enter-fullscreen"></use>',
          '</svg>',
          '</div>'
      );
    }
    html.push('<div class="volume-controls">')
    if (utils.inArray(config.controls, 'mute')) {
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
    if (utils.inArray(config.controls, 'volume')) {
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
  _setupMedia(player,config){
    if (!player.media) {
      _warn('No media element found!');
      return;
    }
    if(player.supported.full){
      $.toggleClass(player.container, config.classes.type.replace('{0}', player.type), true);
      $.toggleClass(player.container, config.classes.stopped, config.autoplay);
      // Add iOS class
      $.toggleClass(player.container, config.classes.isIos, player.browser.isIos);
      // Add chrome class
      $.toggleClass(player.container, config.classes.isChrome, player.browser.isChrome);

      // Add touch class
      $.toggleClass(player.container, config.classes.isTouch, player.browser.isTouch);

      // Add wechat class
      $.toggleClass(player.container, config.classes.isWechat, player.browser.isWechat);
      if(player.type === 'video'){
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', config.classes.videoWrapper);
        this._wrap(player.media, wrapper);
        // Cache the container
        player.videoContainer = wrapper;
      }
    }
  }
  _toggleNativeControls(toggle,player,config) {
    if (toggle && utils.inArray(config.types.html5, player.type)) {
        player.media.setAttribute('controls', '');
    } else {
        player.media.removeAttribute('controls');
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
  _toggleStyleHook(player,config) {
    $.toggleClass(player.container, config.selectors.container.replace('.', ''), player.supported.full);
  }
}
export default Player;