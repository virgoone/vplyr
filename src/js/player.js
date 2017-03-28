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
    if (!this._findElements()) {
      return;
    }
    if (controlsMissing) {
      this._controlListeners(player,config);
    }
  }
  _controlListeners(player,config){
    const inputEvent = (player.browser.isIE ? 'change' : 'input');
  }
  _injectControls(player,config){
    let html = config.html;

    // Insert custom video controls
    _log('Injecting custom controls');
    // If no controls are specified, create default
    if (!html) {
      html = this._buildControls(config);
    }
    html = utils.replaceAll(html, '{id}', Math.floor(Math.random() * (100000)));
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
      this._toggleNativeControls(true);

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
          '<div class="control-currenttime">01:29</div>',
          '<div class="control-separator">/</div>',
          '<div class="control-duration">1:30:52</div>',
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

      // Add touch class
      $.toggleClass(player.container, config.classes.isTouch, player.browser.isTouch);

      // Add wechat class
      $.toggleClass(player.container, config.classes.isTouch, player.browser.isWechat);
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