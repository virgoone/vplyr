import utils, { is } from './util';

class Event {
  static customEvent(element, type, bubbles, properties) {
    // Bail if no element
    if (!element || !type) {
      return;
    }

    // Default bubbles to false
    if (!is.boolean(bubbles)) {
      bubbles = false;
    }

    // Create and dispatch the event
    var event = new CustomEvent(type, {
      bubbles: bubbles,
      detail: properties
    });

    // Dispatch the event
    element.dispatchEvent(event);
  }
  static onEvent(element, events, callback, useCapture) {
    if (element) {
      Event.toggleListener(element, events, callback, true, useCapture);
    }
  }

  static toggleListener(element, events, callback, toggle, useCapture) {
    var eventList = events.split(' ');
    // Whether the listener is a capturing listener or not
    // Default to false
    if (!is.boolean(useCapture)) {
      useCapture = false;
    }

    // If a nodelist is passed, call itself on each node
    if (element instanceof NodeList) {
      for (var x = 0; x < element.length; x++) {
        if (element[x] instanceof Node) {
          Event.toggleListener(element[x], arguments[1], arguments[2], arguments[3]);
        }
      }
      return;
    }

    // If a single node is passed, bind the event listener
    for (var i = 0; i < eventList.length; i++) {
      element[toggle ? 'addEventListener' : 'removeEventListener'](eventList[i], callback, useCapture);
    }
  }
  static proxyListener(element, eventName, userListener, defaultListener, useCapture) {
    Event.onEvent(element, eventName, function (event) {
      if (userListener) {
        userListener.apply(element, [event]);
      }
      defaultListener.apply(element, [event]);
    }, useCapture);
  }
}
export default Event;