/*!
 * EventBus v1.0.4
 * https://github.com/nestorrente/event-bus
 * 
 * Released under the MIT License.
 * 
 * Build date: 2020-03-18T23:08:00.584Z
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/EventBus.ts
var EventBus = /** @class */ (function () {
    function EventBus() {
        this.listeners = {};
    }
    EventBus.prototype.on = function (event, listener) {
        if (!this.listeners.hasOwnProperty(event)) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(listener);
        return this;
    };
    EventBus.prototype.off = function (event, listener) {
        if (this.listeners.hasOwnProperty(event)) {
            if (listener === undefined) {
                this.removeAllListeners(event);
            }
            else {
                this.removeListener(event, listener);
            }
        }
        return this;
    };
    EventBus.prototype.removeListener = function (event, listener) {
        var index = this.listeners[event].indexOf(listener);
        if (index !== -1) {
            this.listeners[event].splice(index, 1);
        }
        this.removeListenersArrayIfEmpty(event);
    };
    EventBus.prototype.removeAllListeners = function (event) {
        delete this.listeners[event];
    };
    EventBus.prototype.removeListenersArrayIfEmpty = function (event) {
        if (this.listeners[event].length === 0) {
            this.removeAllListeners(event);
        }
    };
    EventBus.prototype.once = function (event, listener) {
        var _this = this;
        var onceListener = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            listener.apply(void 0, args);
            _this.off(event, onceListener);
        };
        return this.on(event, onceListener);
    };
    EventBus.prototype.trigger = function (event) {
        var eventParameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            eventParameters[_i - 1] = arguments[_i];
        }
        if (this.listeners.hasOwnProperty(event)) {
            for (var _a = 0, _b = this.listeners[event]; _a < _b.length; _a++) {
                var listener = _b[_a];
                try {
                    listener.apply(void 0, eventParameters);
                }
                catch (e) {
                    console.error(e);
                }
            }
        }
        return this;
    };
    return EventBus;
}());
/* harmony default export */ var src_EventBus = (EventBus);

// CONCATENATED MODULE: ./src/index.ts

/* harmony default export */ var src = __webpack_exports__["default"] = (src_EventBus);


/***/ })
/******/ ]);
});
//# sourceMappingURL=event-bus.esm.js.map