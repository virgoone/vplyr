import utils from './util';

class Dom {
  constructor(){
    this.toggleClass  = this._toggleClass.bind(this);
    this.removeElement  = this._removeElement.bind(this);
    this.hasClass = this._hasClass.bind(this);
    this.injectScript = this._injectScript.bind(this);
    this.prependChild = this._prependChild.bind(this);
    this.setAttributes = this._setAttributes.bind(this);
    this.insertElement= this._insertElement.bind(this);
    this.getClassname= this._getClassname.bind(this);
    this.fullscreen= this._fullscreen.bind(this);
  }
  _getClassname(selector) {
    return selector.replace('.', '');
  }
  _insertElement(type, parent, attributes) {
    // Create a new <element>
    var element = document.createElement(type);

    // Set all passed attributes
    _setAttributes(element, attributes);

    // Inject the new element
    _prependChild(parent, element);
  }
  _setAttributes(element, attributes) {
    for (var key in attributes) {
      element.setAttribute(key, (_is.boolean(attributes[key]) && attributes[key]) ? '' : attributes[key]);
    }
  }
  _prependChild(parent, element) {
    parent.insertBefore(element, parent.firstChild);
  }
  _injectScript(source) {
    if (document.querySelectorAll('script[src="' + source + '"]').length) {
        return;
    }

    var tag = document.createElement('script');
    tag.src = source;
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
  _hasClass(element, className) {
    if (element) {
      if (element.classList) {
          return element.classList.contains(className);
      } else {
          return new RegExp('(\\s|^)' + className + '(\\s|$)').test(element.className);
      }
    }
    return false;
  }
  _removeElement(element){
    if (!element) {
        return;
    }
    element.parentNode.removeChild(element);
  }
  // Toggle class on an element
  _toggleClass(element, className, state){
    if (element) {
      if (element.classList) {
        element.classList[state ? 'add' : 'remove'](className);
      } else {
        let name = (' ' + element.className + ' ').replace(/\s+/g, ' ').replace(' ' + className + ' ', '');
        element.className = name + (state ? ' ' + className : '');
      }
    }
  }
  _fullscreen() {
    var fullscreen = {
            supportsFullScreen: false,
            isFullScreen: function() { return false; },
            requestFullScreen: function() {},
            cancelFullScreen: function() {},
            fullScreenEventName: '',
            element: null,
            prefix: ''
        },
        browserPrefixes = 'webkit o moz ms khtml'.split(' ');

    // Check for native support
    if (!utils.is.undefined(document.cancelFullScreen)) {
        fullscreen.supportsFullScreen = true;
    } else {
      // Check for fullscreen support by vendor prefix
      for (var i = 0, il = browserPrefixes.length; i < il; i++ ) {
        fullscreen.prefix = browserPrefixes[i];

        if (!utils.is.undefined(document[fullscreen.prefix + 'CancelFullScreen'])) {
          fullscreen.supportsFullScreen = true;
          break;
        } else if (!utils.is.undefined(document.msExitFullscreen) && document.msFullscreenEnabled) {
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
      fullscreen.fullScreenEventName = (fullscreen.prefix === 'ms' ? 'MSFullscreenChange' : fullscreen.prefix + 'fullscreenchange');

      fullscreen.isFullScreen = function(element) {
        if (utils.is.undefined(element)) {
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
      fullscreen.requestFullScreen = function(element) {
        if (utils.is.undefined(element)) {
          element = document.body;
        }
        return (this.prefix === '') ? element.requestFullScreen() : element[this.prefix + (this.prefix === 'ms' ? 'RequestFullscreen' : 'RequestFullScreen')]();
      };
      fullscreen.cancelFullScreen = function() {
        return (this.prefix === '') ? document.cancelFullScreen() : document[this.prefix + (this.prefix === 'ms' ? 'ExitFullscreen' : 'CancelFullScreen')]();
      };
      fullscreen.element = function() {
        return (this.prefix === '') ? document.fullscreenElement : document[this.prefix + 'FullscreenElement'];
      };
    }

    return fullscreen;
  }
}
export default new Dom();
