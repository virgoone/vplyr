'use strict';

import utils from './util';
import doms from './dom';
import {defaultConfig as defaults} from './config';
import Event from './event';
class vPlyr {
  constructor(media,config){
    this.api = {};
    this.
    this.timers = {};
    this.media= media;
    this.config = config;
    this.__init(config);
  }
  __init(){
    const original = this.media.cloneNode(true);
    const _log =()=>{
      this._console('log', arguments) 
    },
      _warn = ()=>{
        this._console('warn', arguments)
      };
    _log('Config', this.config);
  }
  _buildControls() {
    const html = [];
    html.push('<div class="vplyr-gradient-bottom"></div>');
    html.push('<div class="vplyr-bottom-container">');
    //progress
    if (utils.inArray(this.config.controls, 'progress')) {
      // Create progress
      html.push('<div class="vplyr-progress-bar-container">',
                '<input type="range" min="0" max="100" value="0" step="0.1" class="vplyr-progress-bar" data-video="seek"/>',
                '<progress class="vplyr-progress-played" max="100" role="presentation"></progress>',
                '<progress class="vplyr-progress-buffer" max="100" value="100">',
                  '<span>100.00</span>',
                '</progress>');

      // Close
      html.push('</div>');
    }
    //left-controls
    html.push('<div class="left-controls">');
    if (utils.inArray(this.config.controls, 'play')){
      html.push('<div class="btn-controls">',
                '<div class="btn-wrap">',
                '<div class="play" data-video="play"></div>',
                ' <div class="pause" data-video="pause"></div>',
                '</div>',
                '</div>');
    }
    // Media current time display
    html.push('<div class="time-mod-controls">');
    
    if (utils.inArray(this.config.controls, 'current-time')){
      html.push('<div class="control-currenttime">01:29</div>');
    }
     if (utils.inArray(this.config.controls, 'duration')){
      html.push('<div class="control-separator">/</div>',
          '<div class="control-duration">1:30:52</div>');
    }
    html.push('</div>');//end media time
    
    html.push('</div>');
    //right-controls
    html.push('<div class="right-controls">');
    html.push('<div class="fullscreen-controls">',
                '<svg class="icon-exit-fullscreen" data-video="fullscreen">',
                '<use xlink:href="#vplyr-exit-fullscreen"></use>',
                ' </svg>',
                '<svg class="icon-enter-fullscreen">',
                '<use xlink:href="#vplyr-enter-fullscreen"></use>',
                '</svg>',
                '</div>');
    if (utils.inArray(this.config.controls, 'mute')){
      html.push('<div class="volume-controls">',
                '<div class="vplyr-volume" data-video="mute">',
                '<svg class="icon-muted">',
                '<use xlink:href="#vplyr-muted"></use>',
                '</svg>',
                '<svg class="icon-volume">',
                '<use xlink:href="#vplyr-volume"></use>',
                '</svg>',
                '</div>',
                '<div class="vplyr-volume-progress">',
                '<input type="range"  class="vplyr-volume-input"  min="0"  max="10" data-video="volume" value="8">',
                '<progress class="vplyr-volume-display" max="10" role="presentation"></progress>',
                '</div>',
                '</div>');
    }
    
    html.push('</div>');//right controls

    //end closing
    html.push('</div>');

    return html.join('');
  }
  _triggerEvent(element, type, bubbles, properties) {
    Event.customEvent(element, type, bubbles, utils.extend({}, properties, {
      vplyr: this.api
    }));
  }
  _console(type, args) {
    if (this.config.debug && window.console) {
      args = Array.prototype.slice.call(args);

      if (utils.is.string(this.config.logPrefix) && this.config.logPrefix.length) {
        args.unshift(this.config.logPrefix);
      }
      console[type].apply(console, args);
    }
  }
};


class Player {
  constructor(targets, options){
    this.players = [];
    this.instances = [];
    this.targets = this._getTargets(targets);
    this.selector = defaults.selectors.html5;
    this._init(options);
  }
  _getTargets(targets){
    if (utils.is.string(targets)) {
      // String selector passed
      targets = document.querySelectorAll(targets);
    }  else if (utils.is.htmlElement(targets)) {
      // Single HTMLElement passed
      targets = [targets];
    }  else if (!utils.is.nodeList(targets) && !utils.is.array(targets) && !utils.is.string(targets))  {
      // No selector passed, possibly options as first argument
      // If options are the first argument
      if (utils.is.undefined(options) && utils.is.object(targets)) {
          options = targets;
      }

      // Use default selector
      targets = document.querySelectorAll(this.selector);
    }

    // Convert NodeList to array
    if (utils.is.nodeList(targets)) {
      targets = Array.prototype.slice.call(targets);
    }
    return targets;
  }
  _init(options){
    this._playerSetup(options);
  }
  _playerSetup(options){
    // Check if the targets have multiple media elements
    for (var i = 0; i < this.targets.length; i++) {
      var target = this.targets[i];
      // Get children
      var children = target.querySelectorAll(this.selector);

      // If there's more than one media element child, wrap them
      if (children.length) {
        for (var x = 0; x < children.length; x++) {
          this._add(target, children[x]);
        }
      } else if (utils.matches(target, this.selector)) {
          // Target is media element
        this._add(target, target);
      }
    }
    this.players.forEach(function(player) {
      var element     = player.target,
          media       = player.media,
          match       = false;

      // The target element can also be the media element
      if (media === element) {
          match = true;
      }

      // Setup a player instance and add to the element
      // Create instance-specific config
      var data = {};
      // Try parsing data attribute config
      try { data = JSON.parse(element.getAttribute('data-vplyr')); }
      catch(e) { 
        console.error(e);
      }
      var config = utils.extend({}, defaults, options, data);

      // Bail if not enabled
      if (!config.enabled) {
          return null;
      }

      // Create new instance
      var instance = new vPlyr(media, config);
      console.log('instance---->',instance.getContainer);
      // Go to next if setup failed
      if (!utils.is.object(instance)) {
          return;
      }

      // Listen for events if debugging
      if (config.debug) {
          var events = config.events.concat(['setup', 'statechange', 'enterfullscreen', 'exitfullscreen', 'captionsenabled', 'captionsdisabled']);

          Event.onEvent(instance.getContainer(), events.join(' '), function(event) {
              console.log([config.logPrefix, 'event:', event.type].join(' '), event.detail.vplyr);
          });
      }

      // Callback
      Event.customEvent(instance.getContainer(), 'setup', true, {
        vplyr: instance
      });

      // Add to return array even if it's already setup
      this.instances.push(instance);
    });
  }
  // Add to container list
  _add(target, media) {
    if (!doms.hasClass(media, defaults.classes.hook)) {
      this.players.push({
        // Always wrap in a <div> for styling
        //container:  _wrap(media, document.createElement('div')),
        // Could be a container or the media itself
        target:     target,
        // This should be the <video>, <audio> or <div> (YouTube/Vimeo)
        media:      media
      });
    }
  }
}
export default Player;