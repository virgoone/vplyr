class Polyfill {
    constructor(){
      this.install = this._install.bind(this);
    }
    _install(){
        if (typeof window.CustomEvent === 'function') {
            return;
        }
        
        function CustomEvent(event, params) {
            params = params || { bubbles: false, cancelable: false, detail: undefined };
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        }

        CustomEvent.prototype = window.Event.prototype;
        window.CustomEvent = CustomEvent;
    }
}
export default new Polyfill();