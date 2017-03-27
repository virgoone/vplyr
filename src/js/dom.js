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
}
export default new Dom();
