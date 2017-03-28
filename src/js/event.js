import utils from './util';

class Event{
  constructor(){
    this.onEvent = this._on.bind(this);
    this.customEvent = this._event.bind(this);
  }
  _event(element, type, bubbles, properties) {
    // Bail if no element
    if (!element || !type) {
        return;
    }

    // Default bubbles to false
    if (!utils.is.boolean(bubbles)) {
        bubbles = false;
    }

    // Create and dispatch the event
    var event = new CustomEvent(type, {
        bubbles:    bubbles,
        detail:     properties
    });

    // Dispatch the event
    element.dispatchEvent(event);
  }
  _on(element, events, callback, useCapture) {
    if (element) {
      this._toggleListener(element, events, callback, true, useCapture);
    }
  }

  _toggleListener(element, events, callback, toggle, useCapture) {
    var eventList = events.split(' ');
    // Whether the listener is a capturing listener or not
    // Default to false
    if (!utils.is.boolean(useCapture)) {
      useCapture = false;
    }

    // If a nodelist is passed, call itself on each node
    if (element instanceof NodeList) {
      for (var x = 0; x < element.length; x++) {
        if (element[x] instanceof Node) {
          this._toggleListener(element[x], arguments[1], arguments[2], arguments[3]);
        }
      }
      return;
    }

    // If a single node is passed, bind the event listener
    for (var i = 0; i < eventList.length; i++) {
      element[toggle ? 'addEventListener' : 'removeEventListener'](eventList[i], callback, useCapture);
    }
  }
}
export default new Event();