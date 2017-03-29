import vPlayer from './vplyr.js';
import polyfill from './polyfill.js';

;(function(root, factory) {
    'use strict';
    /*global define,module*/

    if (typeof module === 'object' && typeof module.exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory(root, document);
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define([], function () { return factory(root, document); });
    } else {
        // Browser globals (root is window)
        root.vplyr = factory(root, document);
    }
}(typeof window !== 'undefined' ? window : this, function(window, document) {
  polyfill.install();
  window.vPlayer = vPlayer;
}))