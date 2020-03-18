/*!
 * EventBus v1.0.1
 * https://github.com/nestorrente/event-bus
 * 
 * Released under the MIT License.
 * 
 * Build date: 2020-03-18T00:12:21.203Z
 */!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);var n=function(){function e(){this.listeners={}}return e.prototype.on=function(e,t){return this.listeners.hasOwnProperty(e)||(this.listeners[e]=[]),this.listeners[e].push(t),this},e.prototype.off=function(e,t){return this.listeners.hasOwnProperty(e)&&(void 0===t?this.removeAllListeners(e):this.removeListener(e,t)),this},e.prototype.removeListener=function(e,t){var r=this.listeners[e].indexOf(t);-1!==r&&this.listeners[e].splice(r,1),this.removeListenersArrayIfEmpty(e)},e.prototype.removeAllListeners=function(e){delete this.listeners[e]},e.prototype.removeListenersArrayIfEmpty=function(e){0===this.listeners[e].length&&this.removeAllListeners(e)},e.prototype.once=function(e,t){var r=this,n=function(){for(var o=[],i=0;i<arguments.length;i++)o[i]=arguments[i];t.apply(void 0,o),r.off(e,n)};return this.on(e,n)},e.prototype.trigger=function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(this.listeners.hasOwnProperty(e))for(var n=0,o=this.listeners[e];n<o.length;n++){var i=o[n];try{i.apply(void 0,t)}catch(e){console.error(e)}}return this},e}();t.default=n}]);
//# sourceMappingURL=event-bus.esm.js.map