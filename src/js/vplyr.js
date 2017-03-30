'use strict';

import utils from './util';
import $ from './dom';
import {defaultConfig as defaults} from './config';
import Event from './event';
import Player from './player';

class vPlayer {
  constructor(targets, options){
    this.TAG = 'VideoPlayer';
    this.players = this._init(targets,options);
  }
  _init(targets, options){
    const _targets = this.__getTargets(targets, options);
    
    if (!utils.supported().basic || !_targets.length) {
      return false;
    }
    const players = [],instances = [];
    const selector = [defaults.selectors.html5].join(',');
    const _add = (target, media)=>{
      if (!$.hasClass(media,defaults.classes.hook)){
        players.push({
          target:     target,
          media:      media
        });
      }
    };//end add
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
    }// end for
    console.log('players--->',players);
    players.forEach((player)=>{
      const element = player.target;
      const media = player.media;
      let match = false;
      if (media === element) {
        match = true;
      }
      let data = {};
      try { data = JSON.parse(element.getAttribute('data-vplyr')); }
      catch(e) { }
      const config = utils.extend({}, defaults, options, data);
      if (!config.enabled) {
        return null;
      }
      
      const instance = new Player(media, config);
       // Go to next if setup failed
      if (!utils.is.object(instance)) {
        return;
      }
      // if (config.debug) {
      //   var events = config.events.concat(['setup', 'statechange', 'enterfullscreen', 'exitfullscreen', 'captionsenabled', 'captionsdisabled']);
      //   Event.onEvent(instance.container, events.join(' '), function(event) {
      //     console.log([config.logPrefix, 'event:', event.type].join(' '), event.detail.vplyr);
      //   });
      // }
      // // Callback
      // Event.customEvent(instance.container, 'setup', true, {
      //   vplyr: instance
      // });

      // Add to return array even if it's already setup
      instances.push(instance);
    });
    return instances;
  }
  __matches(element, selector) {
    var p = Element.prototype;

    var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
        return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
    };

    return f.call(element, selector);
  }
  __getTargets(targets,options){
    const selector = [defaults.selectors.html5].join(',');
    if (utils.is.string(targets)) {
      // String selector passed
      targets = document.querySelectorAll(targets);
    } else if(utils.is.htmlElement(targets)){
      targets = [targets];
    }else if (!utils.is.nodeList(targets) && !utils.is.array(targets) && !utils.is.string(targets))  {
      // No selector passed, possibly options as first argument
      // If options are the first argument
      if (utils.is.undefined(options) && utils.is.object(targets)) {
          options = targets;
      }
      targets = document.querySelectorAll(selector);
    }
    if (utils.is.nodeList(targets)) {
      targets = Array.prototype.slice.call(targets);
    }
    return targets;
  }
  
}
export default vPlayer;