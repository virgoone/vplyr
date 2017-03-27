class Utils {
  constructor(){
    this.hasClass = this._hasClass.bind(this);
    this.browserSniff=this._browserSniff.bind(this);
    this.is=this._is.bind(this);
    this.storageSupport = this._storageSupport.bind(this);
    this.toggleClass  = this._toggleClass.bind(this);
    this.removeElement  = this._removeElement.bind(this);
  }
  //remove an element
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
  _storageSupport(){
    if (!('localStorage' in window)) {
      return false;
    }

    // Try to use it (it might be disabled, e.g. user is in private/porn mode)
    // see: https://github.com/Selz/plyr/issues/131
    try {
      // Add test item
      window.localStorage.setItem('___test', 'OK');

      // Get the test item
      var result = window.localStorage.getItem('___test');

      // Clean up
      window.localStorage.removeItem('___test');

      // Check if value matches
      return (result === 'OK');
    }
    catch (e) {
      return false;
    }

    return false;
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
  _browserSniff(){
    let ua = navigator.userAgent,
      name = navigator.appName,
      fullVersion = '' + parseFloat(navigator.appVersion),
      majorVersion = parseInt(navigator.appVersion, 10),
      nameOffset,
      verOffset,
      ix,
      isIE = false,
      isFirefox = false,
      isChrome = false,
      isWechat = false,
      isSafari = false;

    if ((navigator.appVersion.indexOf('Windows NT') !== -1) && (navigator.appVersion.indexOf('rv:11') !== -1)) {
      // MSIE 11
      isIE = true;
      name = 'IE';
      fullVersion = '11';
    } else if ((verOffset = ua.indexOf('MSIE')) !== -1) {
      // MSIE
      isIE = true;
      name = 'IE';
      fullVersion = ua.substring(verOffset + 5);
    }else if ((verOffset = ua.indexOf('micromessenger')) !== -1) {
      // WeChat
      isWechat = true;
      name = 'WeChat';
      fullVersion = ua.substring(verOffset + 15);
    }else if ((verOffset = ua.indexOf('Chrome')) !== -1) {
      // Chrome
      isChrome = true;
      name = 'Chrome';
      fullVersion = ua.substring(verOffset + 7);
    } else if ((verOffset = ua.indexOf('Safari')) !== -1) {
      // Safari
      isSafari = true;
      name = 'Safari';
      fullVersion = ua.substring(verOffset + 7);
      if ((verOffset = ua.indexOf('Version')) !== -1) {
          fullVersion = ua.substring(verOffset + 8);
      }
    } else if ((verOffset = ua.indexOf('Firefox')) !== -1) {
      // Firefox
      isFirefox = true;
      name = 'Firefox';
      fullVersion = ua.substring(verOffset + 8);
    } else if ((nameOffset = ua.lastIndexOf(' ') + 1) < (verOffset = ua.lastIndexOf('/'))) {
      // In most other browsers, 'name/version' is at the end of userAgent
      name = ua.substring(nameOffset,verOffset);
      fullVersion = ua.substring(verOffset + 1);

      if (name.toLowerCase() === name.toUpperCase()) {
          name = navigator.appName;
      }
    }

    // Trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(';')) !== -1) {
      fullVersion = fullVersion.substring(0, ix);
    }
    if ((ix = fullVersion.indexOf(' ')) !== -1) {
      fullVersion = fullVersion.substring(0, ix);
    }

    // Get major version
    majorVersion = parseInt('' + fullVersion, 10);
    if (isNaN(majorVersion)) {
      fullVersion = '' + parseFloat(navigator.appVersion);
      majorVersion = parseInt(navigator.appVersion, 10);
    }

    // Return data
    return {
      name:       name,
      version:    majorVersion,
      isIE:       isIE,
      isFirefox:  isFirefox,
      isChrome:   isChrome,
      isSafari:   isSafari,
      isWeChat:   isWeChat,
      isIos:      /(iPad|iPhone|iPod)/g.test(navigator.platform),
      isIphone:   /(iPhone|iPod)/g.test(navigator.userAgent),
      isTouch:    'ontouchstart' in document.documentElement
    };
  }
  _is(){
    return {
      object: function(input) {
        return input !== null && typeof(input) === 'object';
      },
      array: function(input) {
        return input !== null && (typeof(input) === 'object' && input.constructor === Array);
      },
      number: function(input) {
        return input !== null && (typeof(input) === 'number' && !isNaN(input - 0) || (typeof input === 'object' && input.constructor === Number));
      },
      string: function(input) {
        return input !== null && (typeof input === 'string' || (typeof input === 'object' && input.constructor === String));
      },
      boolean: function(input) {
        return input !== null && typeof input === 'boolean';
      },
      nodeList: function(input) {
        return input !== null && input instanceof NodeList;
      },
      htmlElement: function(input) {
        return input !== null && input instanceof HTMLElement;
      },
      function: function(input) {
        return input !== null && typeof input === 'function';
      },
      undefined: function(input) {
        return input !== null && typeof input === 'undefined';
      }
    }
  }
}
export default new Utils();