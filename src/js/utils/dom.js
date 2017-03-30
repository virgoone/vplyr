import utils,{is} from './util';

class Dom {
  static wrap(elements, wrapper) {
    // Convert `elements` to an array, if necessary.
    if (!elements.length) {
      elements = [elements];
    }

    // Loops backwards to prevent having to clone the wrapper on the
    // first element (see `child` below).
    for (var i = elements.length - 1; i >= 0; i--) {
      var child = (i > 0) ? wrapper.cloneNode(true) : wrapper;
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
  static getClassname(selector) {
    return selector.replace('.', '');
  }
  static insertElement(type, parent, attributes) {
    // Create a new <element>
    var element = document.createElement(type);

    // Set all passed attributes
    Dom.setAttributes(element, attributes);

    // Inject the new element
    Dom.prependChild(parent, element);
  }
  static setAttributes(element, attributes) {
    for (var key in attributes) {
      element.setAttribute(key, (_is.boolean(attributes[key]) && attributes[key]) ? '' : attributes[key]);
    }
  }
  static prependChild(parent, element) {
    parent.insertBefore(element, parent.firstChild);
  }
  static injectScript(source) {
    if (document.querySelectorAll('script[src="' + source + '"]').length) {
        return;
    }

    var tag = document.createElement('script');
    tag.src = source;
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
  static hasClass(element, className) {
    if (element) {
      if (element.classList) {
          return element.classList.contains(className);
      } else {
          return new RegExp('(\\s|^)' + className + '(\\s|$)').test(element.className);
      }
    }
    return false;
  }
  static removeElement(element){
    if (!element) {
        return;
    }
    element.parentNode.removeChild(element);
  }
  // Toggle class on an element
  static toggleClass(element, className, state){
    if (element) {
      if (element.classList) {
        element.classList[state ? 'add' : 'remove'](className);
      } else {
        let name = (' ' + element.className + ' ').replace(/\s+/g, ' ').replace(' ' + className + ' ', '');
        element.className = name + (state ? ' ' + className : '');
      }
    }
  }
  static fullscreen() {
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
    if (!is.undefined(document.cancelFullScreen)) {
        fullscreen.supportsFullScreen = true;
    } else {
      // Check for fullscreen support by vendor prefix
      for (var i = 0, il = browserPrefixes.length; i < il; i++ ) {
        fullscreen.prefix = browserPrefixes[i];

        if (!is.undefined(document[fullscreen.prefix + 'CancelFullScreen'])) {
          fullscreen.supportsFullScreen = true;
          break;
        } else if (!is.undefined(document.msExitFullscreen) && document.msFullscreenEnabled) {
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
        if (is.undefined(element)) {
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
        if (is.undefined(element)) {
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
export default Dom;
