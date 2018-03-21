/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 188);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(13);
var core = __webpack_require__(24);
var ctx = __webpack_require__(29);
var hide = __webpack_require__(31);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(19);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(12);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(66)('wks');
var uid = __webpack_require__(67);
var Symbol = __webpack_require__(13).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(42);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var tape = __webpack_require__(81)
var global = __webpack_require__(78)
var tests = __webpack_require__(118)()
var harness

exports = module.exports = tape

// Maintain tape@1 compatibility
var _end = (
  exports.Test.prototype._end ||
  exports.Test.prototype.end
)

exports.Test.prototype._end = function () {
  tests.remove(this)
  _end.apply(this, arguments)
}

exports.Test.prototype.run = function () {
  if (!this._cb || this._skip) {
    return this._end()
  }
  this.emit('prerun')
  try {
    tests.add(this)
    this._cb(this)
  }
  catch (err) {
    this.error(err)
    this._end()
    return
  }
  this.emit('run') 
}


var createHarness = exports.createHarness
exports.createHarness = function () {
  harness = createHarness.apply(this, arguments)
  return harness
}

process.browser ?
  global.onerror = killall :
  process.on('uncaughtException', killall)

function killall (err) {
  if (tests.killall(err)) return

  // Died outside of a test block
  harness ?
    harness('uncaughtException', die) :
    tape('uncaughtException', die)

  function die (test) {
    test.error(err)
    test.end()
  }
}


/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 9 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.



/*<replacement>*/

var processNextTick = __webpack_require__(27);
/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var util = __webpack_require__(17);
util.inherits = __webpack_require__(7);
/*</replacement>*/

var Readable = __webpack_require__(53);
var Writable = __webpack_require__(40);

util.inherits(Duplex, Readable);

var keys = objectKeys(Writable.prototype);
for (var v = 0; v < keys.length; v++) {
  var method = keys[v];
  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  processNextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  processNextTick(cb, err);
};

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(29);
var IObject = __webpack_require__(25);
var toObject = __webpack_require__(5);
var toLength = __webpack_require__(2);
var asc = __webpack_require__(47);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/* DOM helpers */
var array = __webpack_require__(50);

function find(selector, context) {
    context = context || document;
    return Element(context).find(selector);
}

function findAll(selector, context) {
    context = context || document;
    return Element(context).findAll(selector);
}

function Element(node) {
    if (node.node) {  // unwrap an element
        node = node.node;
    }

    function find(selector) {
        var found = node.querySelector(selector);
        if (found) {
            return Element(found);
        }
    }

    function findAll(selector) {
        var nodes = node.querySelectorAll(selector);
        return array.from(nodes, Element);
    }

    function parent() {
        return Element(node.parentNode);
    }

    function children() {
        return array.from(node.childNodes, Element);
    }

    function firstChild() {
        var child = node.firstChild;
        if (child) {
            return Element(child);
        }
    }

    function lastChild() {
        var child = node.lastChild;
        if (child) {
            return Element(child);
        }
    }

    function text() {
        return node.textContent;
    }

    function html() {
        return node.innerHTML;
    }

    function attr(attribute) {
        return node.getAttribute(attribute);
    }

    function append(child) {
        var childNode = child.node || child;
        node.appendChild(childNode);
    }

    function prepend(child) {
        var childNode = child.node || child;
        node.insertBefore(childNode, node.firstChild);
    }

    return {
        get node() { return node; },
        find: find,
        findAll: findAll,
        parent: parent,
        children: children,
        firstChild: firstChild,
        lastChild: lastChild,
        text: text,
        html: html,
        attr: attr,
        append: append,
        prepend: prepend
    };
}

module.exports = {
    find: find,
    findAll: findAll,
    Element: Element
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(82);
// On some exotic environments, it's not clear which object `setimmeidate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 16 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(56).Buffer))

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__(101);

module.exports = Function.prototype.bind || implementation;


/***/ }),
/* 19 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(32);
var IE8_DOM_DEFINE = __webpack_require__(122);
var toPrimitive = __webpack_require__(123);
var dP = Object.defineProperty;

exports.f = __webpack_require__(22) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(12)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(25);
var defined = __webpack_require__(42);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(35);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var Stream = __webpack_require__(84)

// through
//
// a stream that does nothing but re-emit the input.
// useful for aggregating a series of changing but not ending streams into one stream)

exports = module.exports = through
through.through = through

//create a readable writable stream.

function through (write, end, opts) {
  write = write || function (data) { this.queue(data) }
  end = end || function () { this.queue(null) }

  var ended = false, destroyed = false, buffer = [], _ended = false
  var stream = new Stream()
  stream.readable = stream.writable = true
  stream.paused = false

//  stream.autoPause   = !(opts && opts.autoPause   === false)
  stream.autoDestroy = !(opts && opts.autoDestroy === false)

  stream.write = function (data) {
    write.call(this, data)
    return !stream.paused
  }

  function drain() {
    while(buffer.length && !stream.paused) {
      var data = buffer.shift()
      if(null === data)
        return stream.emit('end')
      else
        stream.emit('data', data)
    }
  }

  stream.queue = stream.push = function (data) {
//    console.error(ended)
    if(_ended) return stream
    if(data === null) _ended = true
    buffer.push(data)
    drain()
    return stream
  }

  //this will be registered as the first 'end' listener
  //must call destroy next tick, to make sure we're after any
  //stream piped from here.
  //this is only a problem if end is not emitted synchronously.
  //a nicer way to do this is to make sure this is the last listener for 'end'

  stream.on('end', function () {
    stream.readable = false
    if(!stream.writable && stream.autoDestroy)
      process.nextTick(function () {
        stream.destroy()
      })
  })

  function _end () {
    stream.writable = false
    end.call(stream)
    if(!stream.readable && stream.autoDestroy)
      stream.destroy()
  }

  stream.end = function (data) {
    if(ended) return
    ended = true
    if(arguments.length) stream.write(data)
    _end() // will emit or queue
    return stream
  }

  stream.destroy = function () {
    if(destroyed) return
    destroyed = true
    ended = true
    buffer.length = 0
    stream.writable = stream.readable = false
    stream.emit('close')
    return stream
  }

  stream.pause = function () {
    if(stream.paused) return
    stream.paused = true
    return stream
  }

  stream.resume = function () {
    if(stream.paused) {
      stream.paused = false
      stream.emit('resume')
    }
    drain()
    //may have become paused again,
    //as drain emits 'data'.
    if(!stream.paused)
      stream.emit('drain')
    return stream
  }
  return stream
}


/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = nextTick;
} else {
  module.exports = process.nextTick;
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(56)
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(30);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(20);
var createDesc = __webpack_require__(43);
module.exports = __webpack_require__(22) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(21);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(19);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 37 */
/***/ (function(module, exports) {

function parseHTMLDocument(html) {
    // The following implementation is not supported in some browsers
    // (e.g. PhantomJS), so we use a more compatible implementation!
    //var parser = new DOMParser();
    //var doc = parser.parseFromString(html, 'text/html');
    var doc = document.implementation.createHTMLDocument('');
    doc.documentElement.innerHTML = html;

    // set the baseURI so that the links are properly parsed (they should
    // implement the Location API for some tests to pass)
    var base = doc.createElement('base');
    base.href = 'http://www.nainwak.com';
    doc.head.appendChild(base);

    return doc;
}

module.exports = parseHTMLDocument;


/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(53);
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = __webpack_require__(40);
exports.Duplex = __webpack_require__(10);
exports.Transform = __webpack_require__(59);
exports.PassThrough = __webpack_require__(90);


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, setImmediate, global) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.



/*<replacement>*/

var processNextTick = __webpack_require__(27);
/*</replacement>*/

module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = __webpack_require__(17);
util.inherits = __webpack_require__(7);
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: __webpack_require__(89)
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(55);
/*</replacement>*/

/*<replacement>*/
var Buffer = __webpack_require__(28).Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/

var destroyImpl = __webpack_require__(57);

util.inherits(Writable, Stream);

function nop() {}

function WritableState(options, stream) {
  Duplex = Duplex || __webpack_require__(10);

  options = options || {};

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || __webpack_require__(10);

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;

    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  processNextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    processNextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = _isUint8Array(chunk) && !state.objectMode;

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);
    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    processNextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    processNextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
    // this can emit finish, but finish must
    // always follow error
    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    var allBuffers = true;
    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer.allBuffers = allBuffers;

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequestCount = 0;
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream.emit('error', err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      processNextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) processNextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }
  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});

Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(15).setImmediate, __webpack_require__(9)))

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__(18);

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);


/***/ }),
/* 42 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(23);
var toLength = __webpack_require__(2);
var toAbsoluteIndex = __webpack_require__(36);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(66)('keys');
var uid = __webpack_require__(67);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(35);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(142);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 48 */
/***/ (function(module, exports) {

function int(v) {
    var result = parseInt(v, 10);
    return (result == v) ? result : undefined;
}

module.exports = int;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var assign = __webpack_require__(75);
var qs = __webpack_require__(164);
var xhr = __webpack_require__(217);

/* Page class */
function Page(type, options) {
    var path = '/jeu/' + type + '.php';
    var fetchParameters = options.fetchParameters || {};

    function fetch(IDS, processResponse) {
        var params = {
            IDS: IDS
        };
        assign(params, fetchParameters);

        var fullUrl = window.location.origin + path + '?' + qs.stringify(params);
        var options = {
            responseType: 'document'
        };

        xhr.get(fullUrl, options, function (error, response) {
            processResponse(response, path, params);
        });
    }

    return Object.freeze({
        type: type,
        path: path,  // e.g. /jeu/invent.php, without query parameters
        analyze: options.analyze,
        enhance: options.enhance,
        fetch: fetch
    });
}

module.exports = Page;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(119);
__webpack_require__(130);
__webpack_require__(131);
__webpack_require__(137);
__webpack_require__(138);
__webpack_require__(139);
__webpack_require__(140);
__webpack_require__(141);
__webpack_require__(143);
__webpack_require__(144);
__webpack_require__(145);
__webpack_require__(146);
__webpack_require__(147);
__webpack_require__(148);
__webpack_require__(149);
__webpack_require__(150);
__webpack_require__(151);
__webpack_require__(153);
__webpack_require__(155);
__webpack_require__(156);
__webpack_require__(157);
__webpack_require__(159);
__webpack_require__(161);
__webpack_require__(162);
__webpack_require__(163);
module.exports = __webpack_require__(24).Array;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var array = __webpack_require__(50);
var decodeEntities = __webpack_require__(197);
var zipObject = __webpack_require__(199);
var dom = __webpack_require__(14);

function decodeEnt(value) {
    if (typeof value === 'string') {
        value = decodeEntities(value);
    }
    return value;
}

// get the inline JS code from a document
function getInlineJS(doc) {
    var scripts = dom.findAll('script', doc);
    var sources = scripts.map(function (script) {
        return script.attr('src') ? '' : script.text();
    });
    return sources.join('\n');
}

// parses a string representation of a Javascript value
function evaluateJS(string) {
    // should be safe because we only pass code coming from the Nainwak game
    // pages, not from user input
    // TODO: but maybe we can make it safer?
    var value = eval(string);

    if (Array.isArray(value)) {
        return value.map(decodeEnt);
    } else {
        return decodeEnt(value);
    }
}

function buildObjectFromJS(js, regex) {
    var result = {};

    js.replace(regex, function (match, name) {
        var values = array.from(arguments).slice(2, arguments.length - 2);
        values = values.map(evaluateJS);
        result[name] = (values.length > 1) ? values : values[0];
    });

    return result;
}

function buildObjectsFromJSSequences(js, regex, keys) {
    var objects = [];

    // process all matches
    js.replace(regex, function (match, sequence) {
        var values = evaluateJS('[' + sequence + ']');
        var object = zipObject(keys, values);
        objects.push(object);
    });

    return objects;
}

module.exports = {
    getInlineJS: getInlineJS,
    evaluateJS: evaluateJS,
    buildObjectFromJS: buildObjectFromJS,
    buildObjectsFromJSSequences: buildObjectsFromJSSequences
};


/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = function printHtml(document) {
  var node = document.doctype;
  // add doctype
  var html = (!node) ? "" : "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>';

  // add previous siblings
  function recurse(node) {
    // first navigate to the first sibling
    if (node.previousSibling) recurse(node.previousSibling);
    // then add the string representation of the nodes ('backward' recursion)
    switch (node.nodeType) {
      case 8: // comment
        html += "<!--" + node.nodeValue + "-->";
        break;
        // case 10: // doctype: jsDom does not know doctype as previousSibling.
    }
  }
  recurse(document.documentElement);
  html += document.documentElement.outerHTML;
  return html;
}

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



/*<replacement>*/

var processNextTick = __webpack_require__(27);
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = __webpack_require__(54);
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = __webpack_require__(16).EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(55);
/*</replacement>*/

// TODO(bmeurer): Change this back to const once hole checks are
// properly optimized away early in Ignition+TurboFan.
/*<replacement>*/
var Buffer = __webpack_require__(28).Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/

/*<replacement>*/
var util = __webpack_require__(17);
util.inherits = __webpack_require__(7);
/*</replacement>*/

/*<replacement>*/
var debugUtil = __webpack_require__(87);
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = __webpack_require__(88);
var destroyImpl = __webpack_require__(57);
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') {
    return emitter.prependListener(event, fn);
  } else {
    // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
  }
}

function ReadableState(options, stream) {
  Duplex = Duplex || __webpack_require__(10);

  options = options || {};

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = __webpack_require__(58).StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || __webpack_require__(10);

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

    if (state.needReadable) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = __webpack_require__(58).StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) processNextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    processNextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = { hasUnpiped: false };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        processNextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    processNextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], self.emit.bind(self, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    processNextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9), __webpack_require__(1)))

/***/ }),
/* 54 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16).EventEmitter;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(85)
var ieee754 = __webpack_require__(86)
var isArray = __webpack_require__(54)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*<replacement>*/

var processNextTick = __webpack_require__(27);
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      processNextTick(emitErrorNT, this, err);
    }
    return;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      processNextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Buffer = __webpack_require__(28).Buffer;

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return -1;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// UTF-8 replacement characters ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd'.repeat(p);
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd'.repeat(p + 1);
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd'.repeat(p + 2);
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character for each buffered byte of a (partial)
// character needs to be added to the output.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd'.repeat(this.lastTotal - this.lastNeed);
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.



module.exports = Transform;

var Duplex = __webpack_require__(10);

/*<replacement>*/
var util = __webpack_require__(17);
util.inherits = __webpack_require__(7);
/*</replacement>*/

util.inherits(Transform, Duplex);

function TransformState(stream) {
  this.afterTransform = function (er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
  this.writeencoding = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return stream.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined) stream.push(data);

  cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(this);

  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.once('prefinish', function () {
    if (typeof this._flush === 'function') this._flush(function (er, data) {
      done(stream, er, data);
    });else done(stream);
  });
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data !== null && data !== undefined) stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

  if (ts.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = __webpack_require__(103);
var foreach = __webpack_require__(105);
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

var toStr = Object.prototype.toString;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
        /* eslint-disable no-unused-vars, no-restricted-syntax */
        for (var _ in obj) { return false; }
        /* eslint-enable no-unused-vars, no-restricted-syntax */
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		Object.defineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = props.concat(Object.getOwnPropertySymbols(map));
	}
	foreach(props, function (name) {
		defineProperty(object, name, map[name], predicates[name]);
	});
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(18);
var ES = __webpack_require__(106);
var replace = bind.call(Function.call, String.prototype.replace);

var leftWhitespace = /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/;
var rightWhitespace = /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/;

module.exports = function trim() {
	var S = ES.ToString(ES.CheckObjectCoercible(this));
	return replace(replace(S, leftWhitespace, ''), rightWhitespace, '');
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fnToStr = Function.prototype.toString;

var constructorRegex = /^\s*class /;
var isES6ClassFn = function isES6ClassFn(value) {
	try {
		var fnStr = fnToStr.call(value);
		var singleStripped = fnStr.replace(/\/\/.*\n/g, '');
		var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, '');
		var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' ');
		return constructorRegex.test(spaceStripped);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionObject(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isCallable(value) {
	if (!value) { return false; }
	if (typeof value !== 'function' && typeof value !== 'object') { return false; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	if (isES6ClassFn(value)) { return false; }
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__(61);

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(121);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(124);
var hide = __webpack_require__(31);
var has = __webpack_require__(33);
var Iterators = __webpack_require__(34);
var $iterCreate = __webpack_require__(125);
var setToStringTag = __webpack_require__(70);
var getPrototypeOf = __webpack_require__(129);
var ITERATOR = __webpack_require__(4)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(21);
var document = __webpack_require__(13).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(13);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 67 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 68 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(13).document;
module.exports = document && document.documentElement;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(20).f;
var has = __webpack_require__(33);
var TAG = __webpack_require__(4)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(20);
var createDesc = __webpack_require__(43);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(30);
var toObject = __webpack_require__(5);
var IObject = __webpack_require__(25);
var toLength = __webpack_require__(2);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(46);
var isObject = __webpack_require__(21);
var toLength = __webpack_require__(2);
var ctx = __webpack_require__(29);
var IS_CONCAT_SPREADABLE = __webpack_require__(4)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var code = __webpack_require__(51);
var int = __webpack_require__(48);

function analyze(doc/*, date*/) {
    var js = code.getInlineJS(doc);
    var regex = /miseajourpager\((.*)\);/ig;
    var keys = 'pa,pv,pvbase,classeeven,evnonlu,classechat,mesgnonlu,posx,posy,IDS,newmonochat'.split(',');
    var object = code.buildObjectsFromJSSequences(js, regex, keys)[0];

    return {
        PA: int(object.pa),
        vie: int(object.pv),
        position: [int(object.posx), int(object.posy)],
        messagesNonLus: int(object.mesgnonlu),
        nainxpressNonLu: object.newmonochat.indexOf('<b>') === 0
    };
}

module.exports = analyze;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(213);
module.exports = __webpack_require__(24).Object.assign;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(77)

module.exports = forEach

var toString = Object.prototype.toString
var hasOwnProperty = Object.prototype.hasOwnProperty

function forEach(list, iterator, context) {
    if (!isFunction(iterator)) {
        throw new TypeError('iterator must be a function')
    }

    if (arguments.length < 3) {
        context = this
    }
    
    if (toString.call(list) === '[object Array]')
        forEachArray(list, iterator, context)
    else if (typeof list === 'string')
        forEachString(list, iterator, context)
    else
        forEachObject(list, iterator, context)
}

function forEachArray(array, iterator, context) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            iterator.call(context, array[i], i, array)
        }
    }
}

function forEachString(string, iterator, context) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        iterator.call(context, string.charAt(i), i, string)
    }
}

function forEachObject(object, iterator, context) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            iterator.call(context, object[k], k, object)
        }
    }
}


/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(128);
var enumBugKeys = __webpack_require__(68);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 80 */
/***/ (function(module, exports) {

/* Nainwak URLs */
var url = 'http://www.nainwak.com';
var gameUrlRegex = /^https?:\/\/(www\.)?nainwak\.com\/jeu\/index\.php/;

// bonus attributes
var bonusAttributes = ['forceBonus', 'precisionBonus', 'intelligenceBonus', 'vieBonus'];

/*
 * Retourne le nom de classe d'un nain (i.e. "Brave", "Sadique", "Rampant", etc.)
 */
function nomClasse(classe) {
    return {
        0: 'Nain-déci',
        1: 'Brave',
        2: 'Sadique',
        3: 'Rampant',
        7: 'Mutant'
    }[classe];
}

/*
 * Calcule les dégâts d'une arme en fonction des caractéristiques du nain
 */
function degats(perso, objet) {
    if (objet.type !== 'arme' || objet.dommages === 0) {
        return;
    }

    var competence = (objet.portee > 0) ? perso.precision : perso.force;
    var baseDegats = (competence + 80) * objet.dommages / 100;

    return {
        minimum: Math.round(baseDegats * 0.95),  // -5%
        maximum: Math.round(baseDegats * 1.05)  // +5%
        //critiqueMin: Math.round(dommages * (1 + competence/105) * 4.75),
        //critiqueMax: Math.round(dommages * (1 + competence/95) * 4.75)
    };
}

/*
 * Fonction utilitaire renvoyant l'offset/delta entre 2 points
 */
function offset(point1, point2) {
    var x = Math.abs(point1[0] - point2[0]);
    var y = Math.abs(point1[1] - point2[1]);
    return [x, y];
}

/*
 * Calcule la distance entre 2 points en terme de "portée", c'est-à-dire pour
 * les armes, mains collantes, etc.
 */
function portee(point1, point2) {
    var dep = offset(point1, point2);
    return Math.round(Math.sqrt(dep[0]*dep[0] + dep[1]*dep[1]));
}

/*
 * Calcule la distance entre 2 points en terme de "déplacements", c'est-à-dire
 * le nombre de déplacements à faire pour aller d'un point à l'autre.
 */
function deplacement(point1, point2) {
    var dep = offset(point1, point2);
    return Math.max(dep[0], dep[1]);
}

/*
 * Calcule le total des bonus apportés par une liste d'objets
 */
function bonusObjets(objects) {
    var totals = {};
    bonusAttributes.forEach(function (bonus) {
        totals[bonus] = objects.reduce(function (total, object) { return object[bonus] + total; }, 0);
    });
    return totals;
}

module.exports = {
    url: url,
    gameUrlRegex: gameUrlRegex,
    nomClasse: nomClasse,
    degats: degats,
    portee: portee,
    deplacement: deplacement,
    bonusObjets: bonusObjets
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, setImmediate) {var defined = __webpack_require__(38);
var createDefaultStream = __webpack_require__(83);
var Test = __webpack_require__(96);
var createResult = __webpack_require__(114);
var through = __webpack_require__(26);

var canEmitExit = typeof process !== 'undefined' && process
    && typeof process.on === 'function' && process.browser !== true
;
var canExit = typeof process !== 'undefined' && process
    && typeof process.exit === 'function'
;

var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

exports = module.exports = (function () {
    var harness;
    var lazyLoad = function () {
        return getHarness().apply(this, arguments);
    };
    
    lazyLoad.only = function () {
        return getHarness().only.apply(this, arguments);
    };
    
    lazyLoad.createStream = function (opts) {
        if (!opts) opts = {};
        if (!harness) {
            var output = through();
            getHarness({ stream: output, objectMode: opts.objectMode });
            return output;
        }
        return harness.createStream(opts);
    };
    
    lazyLoad.onFinish = function () {
        return getHarness().onFinish.apply(this, arguments);
    };
    
    lazyLoad.onFailure = function() {
        return getHarness().onFailure.apply(this, arguments);
    };

    lazyLoad.getHarness = getHarness

    return lazyLoad

    function getHarness (opts) {
        if (!opts) opts = {};
        opts.autoclose = !canEmitExit;
        if (!harness) harness = createExitHarness(opts);
        return harness;
    }
})();

function createExitHarness (conf) {
    if (!conf) conf = {};
    var harness = createHarness({
        autoclose: defined(conf.autoclose, false)
    });
    
    var stream = harness.createStream({ objectMode: conf.objectMode });
    var es = stream.pipe(conf.stream || createDefaultStream());
    if (canEmitExit) {
        es.on('error', function (err) { harness._exitCode = 1 });
    }
    
    var ended = false;
    stream.on('end', function () { ended = true });
    
    if (conf.exit === false) return harness;
    if (!canEmitExit || !canExit) return harness;

    var inErrorState = false;

    process.on('exit', function (code) {
        // let the process exit cleanly.
        if (code !== 0) {
            return
        }

        if (!ended) {
            var only = harness._results._only;
            for (var i = 0; i < harness._tests.length; i++) {
                var t = harness._tests[i];
                if (only && t !== only) continue;
                t._exit();
            }
        }
        harness.close();
        process.exit(code || harness._exitCode);
    });
    
    return harness;
}

exports.createHarness = createHarness;
exports.Test = Test;
exports.test = exports; // tap compat
exports.test.skip = Test.skip;

var exitInterval;

function createHarness (conf_) {
    if (!conf_) conf_ = {};
    var results = createResult();
    if (conf_.autoclose !== false) {
        results.once('done', function () { results.close() });
    }
    
    var test = function (name, conf, cb) {
        var t = new Test(name, conf, cb);
        test._tests.push(t);
        
        (function inspectCode (st) {
            st.on('test', function sub (st_) {
                inspectCode(st_);
            });
            st.on('result', function (r) {
                if (!r.ok && typeof r !== 'string') test._exitCode = 1
            });
        })(t);
        
        results.push(t);
        return t;
    };
    test._results = results;
    
    test._tests = [];
    
    test.createStream = function (opts) {
        return results.createStream(opts);
    };

    test.onFinish = function (cb) {
        results.on('done', cb);
    };

    test.onFailure = function (cb) {
        results.on('fail', cb);
    };
    
    var only = false;
    test.only = function () {
        if (only) throw new Error('there can only be one only test');
        only = true;
        var t = test.apply(null, arguments);
        results.only(t);
        return t;
    };
    test._exitCode = 0;
    
    test.close = function () { results.close() };
    
    return test;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(15).setImmediate))

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9), __webpack_require__(1)))

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var through = __webpack_require__(26);
var fs = __webpack_require__(95);

module.exports = function () {
    var line = '';
    var stream = through(write, flush);
    return stream;
    
    function write (buf) {
        for (var i = 0; i < buf.length; i++) {
            var c = typeof buf === 'string'
                ? buf.charAt(i)
                : String.fromCharCode(buf[i])
            ;
            if (c === '\n') flush();
            else line += c;
        }
    }
    
    function flush () {
        if (fs.writeSync && /^win/.test(process.platform)) {
            try { fs.writeSync(1, line + '\n'); }
            catch (e) { stream.emit('error', e) }
        } else {
            try { console.log(line) }
            catch (e) { stream.emit('error', e) }
        }
        line = '';
    }
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = __webpack_require__(16).EventEmitter;
var inherits = __webpack_require__(7);

inherits(Stream, EE);
Stream.Readable = __webpack_require__(39);
Stream.Writable = __webpack_require__(91);
Stream.Duplex = __webpack_require__(92);
Stream.Transform = __webpack_require__(93);
Stream.PassThrough = __webpack_require__(94);

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = ((uint8[i] << 16) & 0xFF0000) + ((uint8[i + 1] << 8) & 0xFF00) + (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 86 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 87 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*<replacement>*/

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = __webpack_require__(28).Buffer;
/*</replacement>*/

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.



module.exports = PassThrough;

var Transform = __webpack_require__(59);

/*<replacement>*/
var util = __webpack_require__(17);
util.inherits = __webpack_require__(7);
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(40);


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(39).Transform


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(39).PassThrough


/***/ }),
/* 95 */
/***/ (function(module, exports) {



/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate, process, __dirname) {var deepEqual = __webpack_require__(97);
var defined = __webpack_require__(38);
var path = __webpack_require__(100);
var inherits = __webpack_require__(7);
var EventEmitter = __webpack_require__(16).EventEmitter;
var has = __webpack_require__(41);
var trim = __webpack_require__(102);
var bind = __webpack_require__(18);
var forEach = __webpack_require__(76);
var isEnumerable = bind.call(Function.call, Object.prototype.propertyIsEnumerable);
var toLowerCase = bind.call(Function.call, String.prototype.toLowerCase);

module.exports = Test;

var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;
var safeSetTimeout = setTimeout;
var safeClearTimeout = clearTimeout;

inherits(Test, EventEmitter);

var getTestArgs = function (name_, opts_, cb_) {
    var name = '(anonymous)';
    var opts = {};
    var cb;

    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        var t = typeof arg;
        if (t === 'string') {
            name = arg;
        } else if (t === 'object') {
            opts = arg || opts;
        } else if (t === 'function') {
            cb = arg;
        }
    }
    return { name: name, opts: opts, cb: cb };
};

function Test (name_, opts_, cb_) {
    if (! (this instanceof Test)) {
        return new Test(name_, opts_, cb_);
    }

    var args = getTestArgs(name_, opts_, cb_);

    this.readable = true;
    this.name = args.name || '(anonymous)';
    this.assertCount = 0;
    this.pendingCount = 0;
    this._skip = args.opts.skip || false;
    this._timeout = args.opts.timeout;
    this._plan = undefined;
    this._cb = args.cb;
    this._progeny = [];
    this._ok = true;
    var depthEnvVar = process.env.NODE_TAPE_OBJECT_PRINT_DEPTH;
    if (args.opts.objectPrintDepth) {
        this._objectPrintDepth = args.opts.objectPrintDepth;
    } else if (depthEnvVar) {
        if (toLowerCase(depthEnvVar) === 'infinity') {
            this._objectPrintDepth = Infinity;
        } else {
            this._objectPrintDepth = depthEnvVar;
        }
    } else {
        this._objectPrintDepth = 5;
    }

    for (var prop in this) {
        this[prop] = (function bind(self, val) {
            if (typeof val === 'function') {
                return function bound() {
                    return val.apply(self, arguments);
                };
            }
            return val;
        })(this, this[prop]);
    }
}

Test.prototype.run = function () {
    if (this._skip) {
        this.comment('SKIP ' + this.name);
    }
    if (!this._cb || this._skip) {
        return this._end();
    }
    if (this._timeout != null) {
        this.timeoutAfter(this._timeout);
    }
    this.emit('prerun');
    this._cb(this);
    this.emit('run');
};

Test.prototype.test = function (name, opts, cb) {
    var self = this;
    var t = new Test(name, opts, cb);
    this._progeny.push(t);
    this.pendingCount++;
    this.emit('test', t);
    t.on('prerun', function () {
        self.assertCount++;
    })
    
    if (!self._pendingAsserts()) {
        nextTick(function () {
            self._end();
        });
    }
    
    nextTick(function() {
        if (!self._plan && self.pendingCount == self._progeny.length) {
            self._end();
        }
    });
};

Test.prototype.comment = function (msg) {
    var that = this;
    forEach(trim(msg).split('\n'), function (aMsg) {
        that.emit('result', trim(aMsg).replace(/^#\s*/, ''));
    });
};

Test.prototype.plan = function (n) {
    this._plan = n;
    this.emit('plan', n);
};

Test.prototype.timeoutAfter = function(ms) {
    if (!ms) throw new Error('timeoutAfter requires a timespan');
    var self = this;
    var timeout = safeSetTimeout(function() {
        self.fail('test timed out after ' + ms + 'ms');
        self.end();
    }, ms);
    this.once('end', function() {
        safeClearTimeout(timeout);
    });
}

Test.prototype.end = function (err) { 
    var self = this;
    if (arguments.length >= 1 && !!err) {
        this.ifError(err);
    }
    
    if (this.calledEnd) {
        this.fail('.end() called twice');
    }
    this.calledEnd = true;
    this._end();
};

Test.prototype._end = function (err) {
    var self = this;
    if (this._progeny.length) {
        var t = this._progeny.shift();
        t.on('end', function () { self._end() });
        t.run();
        return;
    }
    
    if (!this.ended) this.emit('end');
    var pendingAsserts = this._pendingAsserts();
    if (!this._planError && this._plan !== undefined && pendingAsserts) {
        this._planError = true;
        this.fail('plan != count', {
            expected : this._plan,
            actual : this.assertCount
        });
    }
    this.ended = true;
};

Test.prototype._exit = function () {
    if (this._plan !== undefined &&
        !this._planError && this.assertCount !== this._plan) {
        this._planError = true;
        this.fail('plan != count', {
            expected : this._plan,
            actual : this.assertCount,
            exiting : true
        });
    } else if (!this.ended) {
        this.fail('test exited without ending', {
            exiting: true
        });
    }
};

Test.prototype._pendingAsserts = function () {
    if (this._plan === undefined) {
        return 1;
    }
    return this._plan - (this._progeny.length + this.assertCount);
};

Test.prototype._assert = function assert (ok, opts) {
    var self = this;
    var extra = opts.extra || {};
    
    var res = {
        id : self.assertCount ++,
        ok : Boolean(ok),
        skip : defined(extra.skip, opts.skip),
        name : defined(extra.message, opts.message, '(unnamed assert)'),
        operator : defined(extra.operator, opts.operator),
        objectPrintDepth : self._objectPrintDepth
    };
    if (has(opts, 'actual') || has(extra, 'actual')) {
        res.actual = defined(extra.actual, opts.actual);
    }
    if (has(opts, 'expected') || has(extra, 'expected')) {
        res.expected = defined(extra.expected, opts.expected);
    }
    this._ok = Boolean(this._ok && ok);
    
    if (!ok) {
        res.error = defined(extra.error, opts.error, new Error(res.name));
    }
    
    if (!ok) {
        var e = new Error('exception');
        var err = (e.stack || '').split('\n');
        var dir = __dirname + path.sep;

        for (var i = 0; i < err.length; i++) {
            /*
                Stack trace lines may resemble one of the following. We need
                to should correctly extract a function name (if any) and
                path / line no. for each line.
            
                    at myFunction (/path/to/file.js:123:45)
                    at myFunction (/path/to/file.other-ext:123:45)
                    at myFunction (/path to/file.js:123:45)
                    at myFunction (C:\path\to\file.js:123:45)
                    at myFunction (/path/to/file.js:123)
                    at Test.<anonymous> (/path/to/file.js:123:45)
                    at Test.bound [as run] (/path/to/file.js:123:45)
                    at /path/to/file.js:123:45

                Regex has three parts. First is non-capturing group for 'at '
                (plus anything preceding it).

                    /^(?:[^\s]*\s*\bat\s+)/
                    
                Second captures function call description (optional). This is
                not necessarily a valid JS function name, but just what the
                stack trace is using to represent a function call. It may look
                like `<anonymous>` or 'Test.bound [as run]'.

                For our purposes, we assume that, if there is a function
                name, it's everything leading up to the first open
                parentheses (trimmed) before our pathname.

                    /(?:(.*)\s+\()?/

                Last part captures file path plus line no (and optional 
                column no).

                    /((?:\/|[A-Z]:\\)[^:\)]+:(\d+)(?::(\d+))?)/
            */
            var re = /^(?:[^\s]*\s*\bat\s+)(?:(.*)\s+\()?((?:\/|[A-Z]:\\)[^:\)]+:(\d+)(?::(\d+))?)/
            var m = re.exec(err[i]);
            
            if (!m) {
                continue;
            }

            var callDescription = m[1] || '<anonymous>';
            var filePath = m[2];
            
            if (filePath.slice(0, dir.length) === dir) {
                continue;
            }

            // Function call description may not (just) be a function name.
            // Try to extract function name by looking at first "word" only.
            res.functionName = callDescription.split(/s+/)[0]
            res.file = filePath;
            res.line = Number(m[3]);
            if (m[4]) res.column = Number(m[4]);
            
            res.at = callDescription + ' (' + filePath + ')';
            break;
        }
    }

    self.emit('result', res);
    
    var pendingAsserts = self._pendingAsserts();
    if (!pendingAsserts) {
        if (extra.exiting) {
            self._end();
        } else {
            nextTick(function () {
                self._end();
            });
        }
    }
    
    if (!self._planError && pendingAsserts < 0) {
        self._planError = true;
        self.fail('plan != count', {
            expected : self._plan,
            actual : self._plan - pendingAsserts
        });
    }
};

Test.prototype.fail = function (msg, extra) {
    this._assert(false, {
        message : msg,
        operator : 'fail',
        extra : extra
    });
};

Test.prototype.pass = function (msg, extra) {
    this._assert(true, {
        message : msg,
        operator : 'pass',
        extra : extra
    });
};

Test.prototype.skip = function (msg, extra) {
    this._assert(true, {
        message : msg,
        operator : 'skip',
        skip : true,
        extra : extra
    });
};

Test.prototype.ok
= Test.prototype['true']
= Test.prototype.assert
= function (value, msg, extra) {
    this._assert(value, {
        message : defined(msg, 'should be truthy'),
        operator : 'ok',
        expected : true,
        actual : value,
        extra : extra
    });
};

Test.prototype.notOk
= Test.prototype['false']
= Test.prototype.notok
= function (value, msg, extra) {
    this._assert(!value, {
        message : defined(msg, 'should be falsy'),
        operator : 'notOk',
        expected : false,
        actual : value,
        extra : extra
    });
};

Test.prototype.error
= Test.prototype.ifError
= Test.prototype.ifErr
= Test.prototype.iferror
= function (err, msg, extra) {
    this._assert(!err, {
        message : defined(msg, String(err)),
        operator : 'error',
        actual : err,
        extra : extra
    });
};

Test.prototype.equal
= Test.prototype.equals
= Test.prototype.isEqual
= Test.prototype.is
= Test.prototype.strictEqual
= Test.prototype.strictEquals
= function (a, b, msg, extra) {
    this._assert(a === b, {
        message : defined(msg, 'should be equal'),
        operator : 'equal',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.notEqual
= Test.prototype.notEquals
= Test.prototype.notStrictEqual
= Test.prototype.notStrictEquals
= Test.prototype.isNotEqual
= Test.prototype.isNot
= Test.prototype.not
= Test.prototype.doesNotEqual
= Test.prototype.isInequal
= function (a, b, msg, extra) {
    this._assert(a !== b, {
        message : defined(msg, 'should not be equal'),
        operator : 'notEqual',
        actual : a,
        notExpected : b,
        extra : extra
    });
};

Test.prototype.deepEqual
= Test.prototype.deepEquals
= Test.prototype.isEquivalent
= Test.prototype.same
= function (a, b, msg, extra) {
    this._assert(deepEqual(a, b, { strict: true }), {
        message : defined(msg, 'should be equivalent'),
        operator : 'deepEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.deepLooseEqual
= Test.prototype.looseEqual
= Test.prototype.looseEquals
= function (a, b, msg, extra) {
    this._assert(deepEqual(a, b), {
        message : defined(msg, 'should be equivalent'),
        operator : 'deepLooseEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.notDeepEqual
= Test.prototype.notEquivalent
= Test.prototype.notDeeply
= Test.prototype.notSame
= Test.prototype.isNotDeepEqual
= Test.prototype.isNotDeeply
= Test.prototype.isNotEquivalent
= Test.prototype.isInequivalent
= function (a, b, msg, extra) {
    this._assert(!deepEqual(a, b, { strict: true }), {
        message : defined(msg, 'should not be equivalent'),
        operator : 'notDeepEqual',
        actual : a,
        notExpected : b,
        extra : extra
    });
};

Test.prototype.notDeepLooseEqual
= Test.prototype.notLooseEqual
= Test.prototype.notLooseEquals
= function (a, b, msg, extra) {
    this._assert(!deepEqual(a, b), {
        message : defined(msg, 'should be equivalent'),
        operator : 'notDeepLooseEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype['throws'] = function (fn, expected, msg, extra) {
    if (typeof expected === 'string') {
        msg = expected;
        expected = undefined;
    }

    var caught = undefined;

    try {
        fn();
    } catch (err) {
        caught = { error : err };
        if ((err != null) && (!isEnumerable(err, 'message') || !has(err, 'message'))) {
            var message = err.message;
            delete err.message;
            err.message = message;
        }
    }

    var passed = caught;

    if (expected instanceof RegExp) {
        passed = expected.test(caught && caught.error);
        expected = String(expected);
    }

    if (typeof expected === 'function' && caught) {
        passed = caught.error instanceof expected;
        caught.error = caught.error.constructor;
    }

    this._assert(typeof fn === 'function' && passed, {
        message : defined(msg, 'should throw'),
        operator : 'throws',
        actual : caught && caught.error,
        expected : expected,
        error: !passed && caught && caught.error,
        extra : extra
    });
};

Test.prototype.doesNotThrow = function (fn, expected, msg, extra) {
    if (typeof expected === 'string') {
        msg = expected;
        expected = undefined;
    }
    var caught = undefined;
    try {
        fn();
    }
    catch (err) {
        caught = { error : err };
    }
    this._assert(!caught, {
        message : defined(msg, 'should not throw'),
        operator : 'throws',
        actual : caught && caught.error,
        expected : expected,
        error : caught && caught.error,
        extra : extra
    });
};

Test.skip = function (name_, _opts, _cb) {
    var args = getTestArgs.apply(null, arguments);
    args.opts.skip = true;
    return Test(args.name, args.opts, args.cb);
};

// vim: set softtabstop=4 shiftwidth=4:


/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15).setImmediate, __webpack_require__(1), "/"))

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var pSlice = Array.prototype.slice;
var objectKeys = __webpack_require__(98);
var isArguments = __webpack_require__(99);

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}


/***/ }),
/* 98 */
/***/ (function(module, exports) {

exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}


/***/ }),
/* 99 */
/***/ (function(module, exports) {

var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(18);
var define = __webpack_require__(60);

var implementation = __webpack_require__(61);
var getPolyfill = __webpack_require__(63);
var shim = __webpack_require__(113);

var boundTrim = bind.call(Function.call, getPolyfill());

define(boundTrim, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundTrim;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// modified from https://github.com/es-shims/es5-shim
var has = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var slice = Array.prototype.slice;
var isArgs = __webpack_require__(104);
var isEnumerable = Object.prototype.propertyIsEnumerable;
var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
var dontEnums = [
	'toString',
	'toLocaleString',
	'valueOf',
	'hasOwnProperty',
	'isPrototypeOf',
	'propertyIsEnumerable',
	'constructor'
];
var equalsConstructorPrototype = function (o) {
	var ctor = o.constructor;
	return ctor && ctor.prototype === o;
};
var excludedKeys = {
	$console: true,
	$external: true,
	$frame: true,
	$frameElement: true,
	$frames: true,
	$innerHeight: true,
	$innerWidth: true,
	$outerHeight: true,
	$outerWidth: true,
	$pageXOffset: true,
	$pageYOffset: true,
	$parent: true,
	$scrollLeft: true,
	$scrollTop: true,
	$scrollX: true,
	$scrollY: true,
	$self: true,
	$webkitIndexedDB: true,
	$webkitStorageInfo: true,
	$window: true
};
var hasAutomationEqualityBug = (function () {
	/* global window */
	if (typeof window === 'undefined') { return false; }
	for (var k in window) {
		try {
			if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
				try {
					equalsConstructorPrototype(window[k]);
				} catch (e) {
					return true;
				}
			}
		} catch (e) {
			return true;
		}
	}
	return false;
}());
var equalsConstructorPrototypeIfNotBuggy = function (o) {
	/* global window */
	if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
		return equalsConstructorPrototype(o);
	}
	try {
		return equalsConstructorPrototype(o);
	} catch (e) {
		return false;
	}
};

var keysShim = function keys(object) {
	var isObject = object !== null && typeof object === 'object';
	var isFunction = toStr.call(object) === '[object Function]';
	var isArguments = isArgs(object);
	var isString = isObject && toStr.call(object) === '[object String]';
	var theKeys = [];

	if (!isObject && !isFunction && !isArguments) {
		throw new TypeError('Object.keys called on a non-object');
	}

	var skipProto = hasProtoEnumBug && isFunction;
	if (isString && object.length > 0 && !has.call(object, 0)) {
		for (var i = 0; i < object.length; ++i) {
			theKeys.push(String(i));
		}
	}

	if (isArguments && object.length > 0) {
		for (var j = 0; j < object.length; ++j) {
			theKeys.push(String(j));
		}
	} else {
		for (var name in object) {
			if (!(skipProto && name === 'prototype') && has.call(object, name)) {
				theKeys.push(String(name));
			}
		}
	}

	if (hasDontEnumBug) {
		var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

		for (var k = 0; k < dontEnums.length; ++k) {
			if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
				theKeys.push(dontEnums[k]);
			}
		}
	}
	return theKeys;
};

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			return (Object.keys(arguments) || '').length === 2;
		}(1, 2));
		if (!keysWorksWithArguments) {
			var originalKeys = Object.keys;
			Object.keys = function keys(object) {
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				} else {
					return originalKeys(object);
				}
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),
/* 105 */
/***/ (function(module, exports) {


var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};



/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $isNaN = __webpack_require__(107);
var $isFinite = __webpack_require__(108);

var sign = __webpack_require__(109);
var mod = __webpack_require__(110);

var IsCallable = __webpack_require__(62);
var toPrimitive = __webpack_require__(111);

var has = __webpack_require__(41);

// https://es5.github.io/#x9
var ES5 = {
	ToPrimitive: toPrimitive,

	ToBoolean: function ToBoolean(value) {
		return !!value;
	},
	ToNumber: function ToNumber(value) {
		return Number(value);
	},
	ToInteger: function ToInteger(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number)) { return 0; }
		if (number === 0 || !$isFinite(number)) { return number; }
		return sign(number) * Math.floor(Math.abs(number));
	},
	ToInt32: function ToInt32(x) {
		return this.ToNumber(x) >> 0;
	},
	ToUint32: function ToUint32(x) {
		return this.ToNumber(x) >>> 0;
	},
	ToUint16: function ToUint16(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x10000);
	},
	ToString: function ToString(value) {
		return String(value);
	},
	ToObject: function ToObject(value) {
		this.CheckObjectCoercible(value);
		return Object(value);
	},
	CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
		/* jshint eqnull:true */
		if (value == null) {
			throw new TypeError(optMessage || 'Cannot call method on ' + value);
		}
		return value;
	},
	IsCallable: IsCallable,
	SameValue: function SameValue(x, y) {
		if (x === y) { // 0 === -0, but they are not identical.
			if (x === 0) { return 1 / x === 1 / y; }
			return true;
		}
		return $isNaN(x) && $isNaN(y);
	},

	// http://www.ecma-international.org/ecma-262/5.1/#sec-8
	Type: function Type(x) {
		if (x === null) {
			return 'Null';
		}
		if (typeof x === 'undefined') {
			return 'Undefined';
		}
		if (typeof x === 'function' || typeof x === 'object') {
			return 'Object';
		}
		if (typeof x === 'number') {
			return 'Number';
		}
		if (typeof x === 'boolean') {
			return 'Boolean';
		}
		if (typeof x === 'string') {
			return 'String';
		}
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
	IsPropertyDescriptor: function IsPropertyDescriptor(Desc) {
		if (this.Type(Desc) !== 'Object') {
			return false;
		}
		var allowed = {
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Get]]': true,
			'[[Set]]': true,
			'[[Value]]': true,
			'[[Writable]]': true
		};
		// jscs:disable
		for (var key in Desc) { // eslint-disable-line
			if (has(Desc, key) && !allowed[key]) {
				return false;
			}
		}
		// jscs:enable
		var isData = has(Desc, '[[Value]]');
		var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');
		if (isData && IsAccessor) {
			throw new TypeError('Property Descriptors may not be both accessor and data descriptors');
		}
		return true;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.1
	IsAccessorDescriptor: function IsAccessorDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
			return false;
		}

		return true;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.2
	IsDataDescriptor: function IsDataDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
			return false;
		}

		return true;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.3
	IsGenericDescriptor: function IsGenericDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (!this.IsAccessorDescriptor(Desc) && !this.IsDataDescriptor(Desc)) {
			return true;
		}

		return false;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.4
	FromPropertyDescriptor: function FromPropertyDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return Desc;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (this.IsDataDescriptor(Desc)) {
			return {
				value: Desc['[[Value]]'],
				writable: !!Desc['[[Writable]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else if (this.IsAccessorDescriptor(Desc)) {
			return {
				get: Desc['[[Get]]'],
				set: Desc['[[Set]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else {
			throw new TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');
		}
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.5
	ToPropertyDescriptor: function ToPropertyDescriptor(Obj) {
		if (this.Type(Obj) !== 'Object') {
			throw new TypeError('ToPropertyDescriptor requires an object');
		}

		var desc = {};
		if (has(Obj, 'enumerable')) {
			desc['[[Enumerable]]'] = this.ToBoolean(Obj.enumerable);
		}
		if (has(Obj, 'configurable')) {
			desc['[[Configurable]]'] = this.ToBoolean(Obj.configurable);
		}
		if (has(Obj, 'value')) {
			desc['[[Value]]'] = Obj.value;
		}
		if (has(Obj, 'writable')) {
			desc['[[Writable]]'] = this.ToBoolean(Obj.writable);
		}
		if (has(Obj, 'get')) {
			var getter = Obj.get;
			if (typeof getter !== 'undefined' && !this.IsCallable(getter)) {
				throw new TypeError('getter must be a function');
			}
			desc['[[Get]]'] = getter;
		}
		if (has(Obj, 'set')) {
			var setter = Obj.set;
			if (typeof setter !== 'undefined' && !this.IsCallable(setter)) {
				throw new TypeError('setter must be a function');
			}
			desc['[[Set]]'] = setter;
		}

		if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
			throw new TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
		}
		return desc;
	}
};

module.exports = ES5;


/***/ }),
/* 107 */
/***/ (function(module, exports) {

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};


/***/ }),
/* 108 */
/***/ (function(module, exports) {

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };


/***/ }),
/* 109 */
/***/ (function(module, exports) {

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};


/***/ }),
/* 110 */
/***/ (function(module, exports) {

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;

var isPrimitive = __webpack_require__(112);

var isCallable = __webpack_require__(62);

// https://es5.github.io/#x8.12
var ES5internalSlots = {
	'[[DefaultValue]]': function (O, hint) {
		var actualHint = hint || (toStr.call(O) === '[object Date]' ? String : Number);

		if (actualHint === String || actualHint === Number) {
			var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
			var value, i;
			for (i = 0; i < methods.length; ++i) {
				if (isCallable(O[methods[i]])) {
					value = O[methods[i]]();
					if (isPrimitive(value)) {
						return value;
					}
				}
			}
			throw new TypeError('No default value');
		}
		throw new TypeError('invalid [[DefaultValue]] hint supplied');
	}
};

// https://es5.github.io/#x9
module.exports = function ToPrimitive(input, PreferredType) {
	if (isPrimitive(input)) {
		return input;
	}
	return ES5internalSlots['[[DefaultValue]]'](input, PreferredType);
};


/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(60);
var getPolyfill = __webpack_require__(63);

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate, process) {var defined = __webpack_require__(38);
var EventEmitter = __webpack_require__(16).EventEmitter;
var inherits = __webpack_require__(7);
var through = __webpack_require__(26);
var resumer = __webpack_require__(115);
var inspect = __webpack_require__(116);
var bind = __webpack_require__(18);
var has = __webpack_require__(41);
var regexpTest = bind.call(Function.call, RegExp.prototype.test);
var yamlIndicators = /\:|\-|\?/;
var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

module.exports = Results;
inherits(Results, EventEmitter);

function Results () {
    if (!(this instanceof Results)) return new Results;
    this.count = 0;
    this.fail = 0;
    this.pass = 0;
    this._stream = through();
    this.tests = [];
    this._only = null;
}

Results.prototype.createStream = function (opts) {
    if (!opts) opts = {};
    var self = this;
    var output, testId = 0;
    if (opts.objectMode) {
        output = through();
        self.on('_push', function ontest (t, extra) {
            if (!extra) extra = {};
            var id = testId++;
            t.once('prerun', function () {
                var row = {
                    type: 'test',
                    name: t.name,
                    id: id
                };
                if (has(extra, 'parent')) {
                    row.parent = extra.parent;
                }
                output.queue(row);
            });
            t.on('test', function (st) {
                ontest(st, { parent: id });
            });
            t.on('result', function (res) {
                res.test = id;
                res.type = 'assert';
                output.queue(res);
            });
            t.on('end', function () {
                output.queue({ type: 'end', test: id });
            });
        });
        self.on('done', function () { output.queue(null) });
    } else {
        output = resumer();
        output.queue('TAP version 13\n');
        self._stream.pipe(output);
    }
    
    nextTick(function next() {
        var t;
        while (t = getNextTest(self)) {
            t.run();
            if (!t.ended) return t.once('end', function(){ nextTick(next); });
        }
        self.emit('done');
    });
    
    return output;
};

Results.prototype.push = function (t) {
    var self = this;
    self.tests.push(t);
    self._watch(t);
    self.emit('_push', t);
};

Results.prototype.only = function (t) {
    this._only = t;
};

Results.prototype._watch = function (t) {
    var self = this;
    var write = function (s) { self._stream.queue(s) };
    t.once('prerun', function () {
        write('# ' + t.name + '\n');
    });
    
    t.on('result', function (res) {
        if (typeof res === 'string') {
            write('# ' + res + '\n');
            return;
        }
        write(encodeResult(res, self.count + 1));
        self.count ++;

        if (res.ok) self.pass ++
        else {
            self.fail ++;
            self.emit('fail');
        }
    });
    
    t.on('test', function (st) { self._watch(st) });
};

Results.prototype.close = function () {
    var self = this;
    if (self.closed) self._stream.emit('error', new Error('ALREADY CLOSED'));
    self.closed = true;
    var write = function (s) { self._stream.queue(s) };
    
    write('\n1..' + self.count + '\n');
    write('# tests ' + self.count + '\n');
    write('# pass  ' + self.pass + '\n');
    if (self.fail) write('# fail  ' + self.fail + '\n')
    else write('\n# ok\n')

    self._stream.queue(null);
};

function encodeResult (res, count) {
    var output = '';
    output += (res.ok ? 'ok ' : 'not ok ') + count;
    output += res.name ? ' ' + res.name.toString().replace(/\s+/g, ' ') : '';
    
    if (res.skip) output += ' # SKIP';
    else if (res.todo) output += ' # TODO';
    
    output += '\n';
    if (res.ok) return output;
    
    var outer = '  ';
    var inner = outer + '  ';
    output += outer + '---\n';
    output += inner + 'operator: ' + res.operator + '\n';
    
    if (has(res, 'expected') || has(res, 'actual')) {
        var ex = inspect(res.expected, {depth: res.objectPrintDepth});
        var ac = inspect(res.actual, {depth: res.objectPrintDepth});
        
        if (Math.max(ex.length, ac.length) > 65 || invalidYaml(ex) || invalidYaml(ac)) {
            output += inner + 'expected: |-\n' + inner + '  ' + ex + '\n';
            output += inner + 'actual: |-\n' + inner + '  ' + ac + '\n';
        } else {
            output += inner + 'expected: ' + ex + '\n';
            output += inner + 'actual:   ' + ac + '\n';
        }
    }
    if (res.at) {
        output += inner + 'at: ' + res.at + '\n';
    }

    var actualStack = res.actual && (typeof res.actual === 'object' || typeof res.actual === 'function') ? res.actual.stack : undefined;
    var errorStack = res.error && res.error.stack;
    var stack = defined(actualStack, errorStack);
    if (stack) {
        var lines = String(stack).split('\n');
        output += inner + 'stack: |-\n';
        for (var i = 0; i < lines.length; i++) {
            output += inner + '  ' + lines[i] + '\n';
        }
    }
    
    output += outer + '...\n';
    return output;
}

function getNextTest (results) {
    if (!results._only) {
        return results.tests.shift();
    }
    
    do {
        var t = results.tests.shift();
        if (!t) continue;
        if (results._only === t) {
            return t;
        }
    } while (results.tests.length !== 0)
}

function invalidYaml (str) {
    return regexpTest(yamlIndicators, str);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15).setImmediate, __webpack_require__(1)))

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate, process) {var through = __webpack_require__(26);
var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

module.exports = function (write, end) {
    var tr = through(write, end);
    tr.pause();
    var resume = tr.resume;
    var pause = tr.pause;
    var paused = false;
    
    tr.pause = function () {
        paused = true;
        return pause.apply(this, arguments);
    };
    
    tr.resume = function () {
        paused = false;
        return resume.apply(this, arguments);
    };
    
    nextTick(function () {
        if (!paused) tr.resume();
    });
    
    return tr;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15).setImmediate, __webpack_require__(1)))

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var hasMap = typeof Map === 'function' && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === 'function' && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;
var booleanValueOf = Boolean.prototype.valueOf;
var objectToString = Object.prototype.toString;

var inspectCustom = __webpack_require__(117).custom;
var inspectSymbol = (inspectCustom && isSymbol(inspectCustom)) ? inspectCustom : null;

module.exports = function inspect_ (obj, opts, depth, seen) {
    if (!opts) opts = {};

    if (has(opts, 'quoteStyle') && (opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double')) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
    }

    if (typeof obj === 'undefined') {
        return 'undefined';
    }
    if (obj === null) {
        return 'null';
    }
    if (typeof obj === 'boolean') {
        return obj ? 'true' : 'false';
    }

    if (typeof obj === 'string') {
        return inspectString(obj, opts);
    }
    if (typeof obj === 'number') {
      if (obj === 0) {
        return Infinity / obj > 0 ? '0' : '-0';
      }
      return String(obj);
    }

    var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;
    if (typeof depth === 'undefined') depth = 0;
    if (depth >= maxDepth && maxDepth > 0 && typeof obj === 'object') {
        return '[Object]';
    }

    if (typeof seen === 'undefined') seen = [];
    else if (indexOf(seen, obj) >= 0) {
        return '[Circular]';
    }

    function inspect (value, from) {
        if (from) {
            seen = seen.slice();
            seen.push(from);
        }
        return inspect_(value, opts, depth + 1, seen);
    }

    if (typeof obj === 'function') {
        var name = nameOf(obj);
        return '[Function' + (name ? ': ' + name : '') + ']';
    }
    if (isSymbol(obj)) {
        var symString = Symbol.prototype.toString.call(obj);
        return typeof obj === 'object' ? markBoxed(symString) : symString;
    }
    if (isElement(obj)) {
        var s = '<' + String(obj.nodeName).toLowerCase();
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
            s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
        }
        s += '>';
        if (obj.childNodes && obj.childNodes.length) s += '...';
        s += '</' + String(obj.nodeName).toLowerCase() + '>';
        return s;
    }
    if (isArray(obj)) {
        if (obj.length === 0) return '[]';
        return '[ ' + arrObjKeys(obj, inspect).join(', ') + ' ]';
    }
    if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (parts.length === 0) return '[' + String(obj) + ']';
        return '{ [' + String(obj) + '] ' + parts.join(', ') + ' }';
    }
    if (typeof obj === 'object') {
        if (inspectSymbol && typeof obj[inspectSymbol] === 'function') {
            return obj[inspectSymbol]();
        } else if (typeof obj.inspect === 'function') {
            return obj.inspect();
        }
    }
    if (isMap(obj)) {
        var parts = [];
        mapForEach.call(obj, function (value, key) {
            parts.push(inspect(key, obj) + ' => ' + inspect(value, obj));
        });
        return collectionOf('Map', mapSize.call(obj), parts);
    }
    if (isSet(obj)) {
        var parts = [];
        setForEach.call(obj, function (value ) {
            parts.push(inspect(value, obj));
        });
        return collectionOf('Set', setSize.call(obj), parts);
    }
    if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
    }
    if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
    }
    if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
    }
    if (!isDate(obj) && !isRegExp(obj)) {
        var xs = arrObjKeys(obj, inspect);
        if (xs.length === 0) return '{}';
        return '{ ' + xs.join(', ') + ' }';
    }
    return String(obj);
};

function wrapQuotes (s, defaultStyle, opts) {
    var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '"' : "'";
    return quoteChar + s + quoteChar;
}

function quote (s) {
    return String(s).replace(/"/g, '&quot;');
}

function isArray (obj) { return toStr(obj) === '[object Array]' }
function isDate (obj) { return toStr(obj) === '[object Date]' }
function isRegExp (obj) { return toStr(obj) === '[object RegExp]' }
function isError (obj) { return toStr(obj) === '[object Error]' }
function isSymbol (obj) { return toStr(obj) === '[object Symbol]' }
function isString (obj) { return toStr(obj) === '[object String]' }
function isNumber (obj) { return toStr(obj) === '[object Number]' }
function isBoolean (obj) { return toStr(obj) === '[object Boolean]' }

var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
function has (obj, key) {
    return hasOwn.call(obj, key);
}

function toStr (obj) {
    return objectToString.call(obj);
}

function nameOf (f) {
    if (f.name) return f.name;
    var m = String(f).match(/^function\s*([\w$]+)/);
    if (m) return m[1];
}

function indexOf (xs, x) {
    if (xs.indexOf) return xs.indexOf(x);
    for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) return i;
    }
    return -1;
}

function isMap (x) {
    if (!mapSize) {
        return false;
    }
    try {
        mapSize.call(x);
        try {
            setSize.call(x);
        } catch (s) {
            return true;
        }
        return x instanceof Map; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isSet (x) {
    if (!setSize) {
        return false;
    }
    try {
        setSize.call(x);
        try {
            mapSize.call(x);
        } catch (m) {
            return true;
        }
        return x instanceof Set; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isElement (x) {
    if (!x || typeof x !== 'object') return false;
    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
        return true;
    }
    return typeof x.nodeName === 'string'
        && typeof x.getAttribute === 'function'
    ;
}

function inspectString (str, opts) {
    var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
    return wrapQuotes(s, 'single', opts);
}

function lowbyte (c) {
    var n = c.charCodeAt(0);
    var x = { 8: 'b', 9: 't', 10: 'n', 12: 'f', 13: 'r' }[n];
    if (x) return '\\' + x;
    return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16);
}

function markBoxed (str) {
    return 'Object(' + str + ')';
}

function collectionOf (type, size, entries) {
    return type + ' (' + size + ') {' + entries.join(', ') + '}';
}

function arrObjKeys (obj, inspect) {
    var isArr = isArray(obj);
    var xs = [];
    if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
        }
    }
    for (var key in obj) {
        if (!has(obj, key)) continue;
        if (isArr && String(Number(key)) === key && key < obj.length) continue;
        if (/[^\w$]/.test(key)) {
            xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
        } else {
            xs.push(key + ': ' + inspect(obj[key], obj));
        }
    }
    return xs;
}


/***/ }),
/* 117 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 118 */
/***/ (function(module, exports) {

function Manager () {
  if (!(this instanceof Manager))
    return new Manager

  this.tests = []
}

Manager.prototype.add = function (test) {
  this.tests.push(test)
}

Manager.prototype.remove = function (test) {
  var tests = this.tests
  var l = tests.length

  while (l--)
    if (tests[l].name === test.name)
      tests.splice(l, 1)
}


Manager.prototype.killall = function (err) {
  var test
  var tests = this.tests.slice()
  if (!tests.length) return false

  var single = tests.length === 1
  while (test = tests.shift()) {
    if (single) test.error(err)
    test._end()
  }

  return true
}

module.exports = Manager


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(120)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(64)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(19);
var defined = __webpack_require__(42);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 121 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(22) && !__webpack_require__(12)(function () {
  return Object.defineProperty(__webpack_require__(65)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(21);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(31);


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(126);
var descriptor = __webpack_require__(43);
var setToStringTag = __webpack_require__(70);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(31)(IteratorPrototype, __webpack_require__(4)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(32);
var dPs = __webpack_require__(127);
var enumBugKeys = __webpack_require__(68);
var IE_PROTO = __webpack_require__(45)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(65)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(69).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(20);
var anObject = __webpack_require__(32);
var getKeys = __webpack_require__(79);

module.exports = __webpack_require__(22) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(33);
var toIObject = __webpack_require__(23);
var arrayIndexOf = __webpack_require__(44)(false);
var IE_PROTO = __webpack_require__(45)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(33);
var toObject = __webpack_require__(5);
var IE_PROTO = __webpack_require__(45)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', { isArray: __webpack_require__(46) });


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(29);
var $export = __webpack_require__(0);
var toObject = __webpack_require__(5);
var call = __webpack_require__(132);
var isArrayIter = __webpack_require__(133);
var toLength = __webpack_require__(2);
var createProperty = __webpack_require__(71);
var getIterFn = __webpack_require__(134);

$export($export.S + $export.F * !__webpack_require__(136)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(32);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(34);
var ITERATOR = __webpack_require__(4)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(135);
var ITERATOR = __webpack_require__(4)('iterator');
var Iterators = __webpack_require__(34);
module.exports = __webpack_require__(24).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(35);
var TAG = __webpack_require__(4)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(4)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var createProperty = __webpack_require__(71);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(12)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(0);
var toIObject = __webpack_require__(23);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(25) != Object || !__webpack_require__(3)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var html = __webpack_require__(69);
var cof = __webpack_require__(35);
var toAbsoluteIndex = __webpack_require__(36);
var toLength = __webpack_require__(2);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(12)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var aFunction = __webpack_require__(30);
var toObject = __webpack_require__(5);
var fails = __webpack_require__(12);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(3)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $forEach = __webpack_require__(11)(0);
var STRICT = __webpack_require__(3)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(21);
var isArray = __webpack_require__(46);
var SPECIES = __webpack_require__(4)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $map = __webpack_require__(11)(1);

$export($export.P + $export.F * !__webpack_require__(3)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $filter = __webpack_require__(11)(2);

$export($export.P + $export.F * !__webpack_require__(3)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $some = __webpack_require__(11)(3);

$export($export.P + $export.F * !__webpack_require__(3)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $every = __webpack_require__(11)(4);

$export($export.P + $export.F * !__webpack_require__(3)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(72);

$export($export.P + $export.F * !__webpack_require__(3)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(72);

$export($export.P + $export.F * !__webpack_require__(3)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $indexOf = __webpack_require__(44)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(3)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(23);
var toInteger = __webpack_require__(19);
var toLength = __webpack_require__(2);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(3)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(152) });

__webpack_require__(8)('copyWithin');


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(5);
var toAbsoluteIndex = __webpack_require__(36);
var toLength = __webpack_require__(2);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { fill: __webpack_require__(154) });

__webpack_require__(8)('fill');


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(5);
var toAbsoluteIndex = __webpack_require__(36);
var toLength = __webpack_require__(2);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(11)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(8)(KEY);


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(11)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(8)(KEY);


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(158)('Array');


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(13);
var core = __webpack_require__(24);
var dP = __webpack_require__(20);
var DESCRIPTORS = __webpack_require__(22);
var SPECIES = __webpack_require__(4)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(8);
var step = __webpack_require__(160);
var Iterators = __webpack_require__(34);
var toIObject = __webpack_require__(23);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(64)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 160 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(0);
var $includes = __webpack_require__(44)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(8)('includes');


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(73);
var toObject = __webpack_require__(5);
var toLength = __webpack_require__(2);
var aFunction = __webpack_require__(30);
var arraySpeciesCreate = __webpack_require__(47);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(8)('flatMap');


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(73);
var toObject = __webpack_require__(5);
var toLength = __webpack_require__(2);
var toInteger = __webpack_require__(19);
var arraySpeciesCreate = __webpack_require__(47);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(8)('flatten');


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(193);
var parse = __webpack_require__(194);
var formats = __webpack_require__(170);

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),
/* 165 */
/***/ (function(module, exports) {

function createPerso() {
    return {
        nom: 'Palme',
        image: '/images/avatar_guilde/fade976ec961a21e13af618e54476d1a5c285d7a.png',
        rang: 'Ami(e) des nains-béciles (des bêtes)',
        classe: 1,
        barbe: 68.06,
        description: "Quitte à taper un petit level, tapez Rêveur ! Gagnant de la palme d'or du meilleur nom de nain.",
        arme: 'Tuba',
        tag: {
            guilde: {
                nom: 'Gorgones',
                couleur: '#DA6400'
            },
            perso: 'Hosse',
            type: 1
        },
        vie: 138,
        vieBase: 109,
        vieBonus: 39,
        get vieTotal() {
            return this.vieBase + this.vieBonus;
        },
        forceBase: 31,
        forceBonus: -27,
        get force() {
            return this.forceBase + this.forceBonus;
        },
        precisionBase: 310,
        precisionBonus: 0,
        get precision() {
            return this.precisionBase + this.precisionBonus;
        },
        intelligenceBase: 90,
        intelligenceBonus: 22,
        get intelligence() {
            return this.intelligenceBase + this.intelligenceBonus;
        },
        honneurBase: 0,
        honneurBonus: 1,
        get honneur() {
            return this.honneurBase + this.honneurBonus;
        },
        cote: 13,
        ridicule: 1,
        honte: 0,
        xp: 5,
        tues: 16,
        morts: 2,
        giflesDonnees: 186,
        giflesRecues: 0,
        cible: {
            nom: 'Nelson',
            classe: 2,
            rang: 'Cancre (nain-culte)',
            barbe: 61.68
        },
        chasseurs: {
            nombre: 2,
            barbe: 54.80
        }
    };
}

module.exports = createPerso;


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

var nainwak = __webpack_require__(80);

function Objet(objet, context) {
    var perso = context.perso;
    var degats = perso ? nainwak.degats(perso, objet) : undefined;
    var etat = objet.nom == 'Main collante de gosse' ? { valeur: objet.PV, maximum: objet.PVmax } : undefined;

    function render(h) {
        var lines = [];

        if (etat) {
            lines.push(h('div', [
                h('b', 'Etat : '),
                etat.valeur,
                '/',
                etat.maximum
            ]));
        }

        if (degats) {
            lines.push(h('div', [
                h('b', 'Dégâts : '),
                degats.minimum,
                ' à ',
                degats.maximum
            ]));
        }

        return lines;
    }

    return {
        render: render
    };
}

module.exports = Objet;


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

var styles = __webpack_require__(221);

function Box(content) {
    function render(h) {
        var rendered = h.render(content);
        if (rendered && !Array.isArray(rendered) || rendered.length > 0) {
            return h('div', { class: styles.box }, rendered);
        }
    }

    return {
        render: render
    };
}

module.exports = Box;


/***/ }),
/* 168 */,
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    var obj;

    while (queue.length) {
        var item = queue.pop();
        obj = item.obj[item.prop];

        if (Array.isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }

    return obj;
};

exports.arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

exports.merge = function merge(target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        } else if (typeof target === 'object') {
            if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
        mergeTarget = exports.arrayToObject(target, options);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && typeof target[i] === 'object') {
                    target[i] = exports.merge(target[i], item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = exports.merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

exports.assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

exports.decode = function (str) {
    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};

exports.encode = function encode(str) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

exports.compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    return compactQueue(queue);
};

exports.isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

exports.isBuffer = function isBuffer(obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};


/***/ }),
/* 171 */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">\n<html><head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n<link rel=\"stylesheet\" href=\"/css/main.css\" type=\"text/css\">\n<script language=\"Javascript\" src=\"/js/base.js\" type=\"text/javascript\">\n</script>\n<script language=\"Javascript\" src=\"/js/transfert.js\" type=\"text/javascript\">\n</script>\n<script language=\"JavaScript\" type=\"text/javascript\">\n  if ((typeof Transfert=='undefined') ||\n      (Transfert.Version < '2.2.2'))\n    alert(\"Vous avez une vieille version de transfert.js, merci de vider votre cache\");\n</script>\n<title></title>\n\n<script type=\"text/javascript\" language=\"JavaScript\">\n var classeinterface=1;\n</script>\n</head>\n<body>\n<p class=\"titre\">[ Inventaire ]</p>\n<p class=\"erreur\"></p>\n<script language=\"Javascript\" type=\"text/javascript\">\nvarIDS=\"305033d8ab52e3547c32fe17046b09d7\";\nmip(23779038, \"Potion de respécialisation\", \"objets/potion_reset.png\", 'Le pôle emploi te propose de changer de métier en revalorisant ton XP. ' , \"bonnet\", \"SPECIAL\", 24, 0, \"0\", 0, 100, 100, 0, 0, 0, 0, 0, 0, \"N\", \"N\", \"-1\");\nmip(25186146, \"Arquebuse naine\", \"objets/arquebuse.gif\", 'A la différence d&#039;un arc classique, cette arme utilise un projectile vivant : un oiseau. D&#8217;où son nom arc-buse. Ce modèle miniaturisé peut tenir dans une armoire portable ... de nain' , \"poser\", \"ARME\", 10, 2, \"20\", 1, 45, 100, 7, -6665, 0, 0, 0, 0, \"N\", \"O\", \"2412535\");\nmip(25183954, \"Boomrang feu\", \"objets/boomrang_feu.gif\", 'Chaud devant !' , \"poser\", \"ARME\", 8, 4, \"30\", 5, 100, 100, 8, 80184, 0, 0, 0, 0, \"N\", \"O\", \"2499384\");\nmip(25183955, \"Revolver 6 coups\", \"objets/revolver.gif\", 'Idéal pour ceux qui veulent jouer aux cowboys et aux nain-diens...' , \"poser\", \"ARME\", 6, 4, \"15\", 2, 2, 6, 11, -189872, 0, 0, 0, 0, \"N\", \"O\", \"2229328\");\nmip(25183956, \"Batte de base-ball spéciale\", \"objets/batte.gif\", 'T&#039;es Ok !  T&#039;es In !  T&#039;es Batte ...' , \"poser\", \"ARME\", 8, 0, \"???\", 0, 70, 100, 19, -259682, 0, 0, 0, 0, \"N\", \"O\", \"2159518\");\nmip(25183949, \"Un peu d'amour en bocal\", \"objets/amour_en_bocal.gif\", 'Tombé d&#039;un camion qui prenait la direction de <a target=\"_blank\" href=\"http://pacific.nainwak.com/\">\"Pacific Nainwak\"</a>' , \"poser\", \"RUNE\", 0, 0, \"0\", 0, 100, 100, 0, -189893, 0, 0, 25, 0, \"N\", \"N\", \"2229420\");\nmip(25183959, \"Visée à poisson\", \"objets/faux_thon.gif\", 'Technologie avancée. La \"visée à poisson\" accélère des poissons en plastique (les faux-thons) afin de les propulser sur la cible. (La visée laser s&#039;en est d&#039;ailleurs inspirée)' , \"poser\", \"RUNE\", 0, 0, \"0\", 0, 100, 100, 0, -189893, -6, 15, 0, 0, \"N\", \"N\", \"2229326\");\nmip(25186168, \"Voiture de course\", \"objets/voiture_de_course.gif\", 'Avec cette voiture de course, vous pourrez allez faire les vôtres au super-marché.' , \"poser\", \"VEHICULE\", 4, 0, \"0\", 0, 60, 100, 5, -189893, 0, 0, 0, 0, \"N\", \"O\", \"2413338\");\nmip(25183960, \"Pigeon voyageur\", \"objets/pigeon.gif\", 'C&#039;est le nouveau modèle de la marque automobile. En effet le Pigeon Voyageur outrepasse les lois terrestres pour emmener son conducteur au 7ème ciel.' , \"poser\", \"DETECTEUR\", 0, 8, \"0\", 0, 100, 100, 0, -189893, 0, 0, 0, 0, \"N\", \"N\", \"2229334\");\nmip(25161977, \"Bouteille vide\", \"objets/vinvide.gif\", 'Même pas un SOS à l&#039;intérieur !' , \"poser\", \"INUTILE\", 0, 0, \"0\", 0, 100, 100, 0, -189893, 0, 0, 0, 0, \"N\", \"O\", \"472001\");\nmip(25134600, \"Fée Cabossée\", \"objets/fee.png\", 'Mais pourquoi la fée cabossée ? - Rhoo on s&#039;en cogne !' , \"poser\", \"SPECIAL\", 5, 0, \"0\", 0, 100, 100, 0, -189893, 0, 0, 0, 0, \"O\", \"N\", \"-1\");\nmip(25159237, \"Kine d'Heure\", \"objets/kinder.gif\", 'Kine d&#039;heure, au bon chocolat et au lait, et peut-être une surprise à l&#039;intérieur ?' , \"poser\", \"MANGER\", 0, 0, \"-76\", 40, 0, 0, 0, -189893, 0, 0, 0, 0, \"N\", \"N\", \"951613\");\nmip(25170639, \"Le bocal d'air\", \"objets/bocal_violet.gif\", 'Extrait d&#039;une arme utilisée par le GMM' , \"poser\", \"SPECIAL\", 1, 0, \"0\", 0, 100, 100, 0, -189893, 0, 0, 0, 0, \"N\", \"N\", \"1145037\");\nmip(25170640, \"Main collante de gosse\", \"objets/main_collante.gif\", 'Les Gosses c&#039;est Bien mais qu&#039;est ce que c&#039;est collant ...' , \"poser\", \"SPECIAL\", 2, 0, \"0\", 0, 1, 3, 0, -200591, 0, 0, 0, 0, \"N\", \"N\", \"2330050\");\nmip(25170639, \"Tarte à la crème\", \"objets/tarte_creme.gif\", 'les chaines de télé culturelles sont importantes lorsque la religion part en fumée..<br /><br />' , \"poser\", \"ARME\", 4, 4, \"5\", 1, 100, 100, 2, -407945, 0, 0, 0, 0, \"N\", \"O\", \"2011255\");\n</script><table class=\"coul_1\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n<tbody><tr><td class=\"angle VTVV_VNNV\"></td><td class=\"bande_h VTN\"></td><td class=\"angle VVTV_VVNN\"></td></tr><tr><td class=\"bande_v VT\"></td><td class=\"news-titre\">Potion de respécialisation</td><td class=\"bande_v TV\"></td></tr><tr><td class=\"angle TNVV_NVNV\"></td><td class=\"bande_h TVV\"></td><td class=\"angle VVNT_NVNV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"><img align=\"middle\" src=\"/images/objets/potion_reset.png\" border=\"1\"> <b>Utiliser :</b> 24 PA | <a href=\"transfert.php?IDS=305033d8ab52e3547c32fe17046b09d7&amp;action=bonnet&amp;idbonnet=23779038\">Sortir de son bonnet</a> |</td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">Le pôle emploi te propose de changer de métier en revalorisant ton XP. </td><td class=\"bande_v NV\"></td></tr><tr><td class=\"angle NVVV_NNVV\"></td><td class=\"bande_h VVN\"></td><td class=\"angle VVVN_NVVN\"></td></tr></tbody></table>\n<table class=\"coul_1\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n<tbody><tr><td class=\"angle VTVV_VNNV\"></td><td class=\"bande_h VTN\"></td><td class=\"angle VVTV_VVNN\"></td></tr><tr><td class=\"bande_v VT\"></td><td class=\"news-titre\">Arquebuse naine</td><td class=\"bande_v TV\"></td></tr><tr><td class=\"angle TNVV_NVNV\"></td><td class=\"bande_h TVV\"></td><td class=\"angle VVNT_NVNV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"><img align=\"middle\" src=\"/images/objets/arquebuse.gif\" border=\"1\"> <b>Utiliser :</b> 10 PA (portée : 2 case(s), dommages : 20, rechargement : 1 j.) - <b>Etat :</b> 45/100 (réparation/nettoyage : 7 PA) | <a href=\"reparer.php?IDS=305033d8ab52e3547c32fe17046b09d7&amp;idinv=25186146\">Réparer/Nettoyer</a> | <a href=\"transfert.php?IDS=305033d8ab52e3547c32fe17046b09d7&amp;action=poser&amp;idinv=25186146\">Poser au sol</a> |<br> Tombe en poussière dans <span style=\"color: black\">27 jours et 22 heures</span><br></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">A la différence d'un arc classique, cette arme utilise un projectile vivant : un oiseau. D’où son nom arc-buse. Ce modèle miniaturisé peut tenir dans une armoire portable ... de nain</td><td class=\"bande_v NV\"></td></tr><tr><td class=\"angle NVVV_NNVV\"></td><td class=\"bande_h VVN\"></td><td class=\"angle VVVN_NVVN\"></td></tr></tbody></table>\n<table class=\"coul_1\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n<tbody><tr><td class=\"angle VTVV_VNNV\"></td><td class=\"bande_h VTN\"></td><td class=\"angle VVTV_VVNN\"></td></tr><tr><td class=\"bande_v VT\"></td><td class=\"news-titre\">Boomrang feu</td><td class=\"bande_v TV\"></td></tr><tr><td class=\"angle TNVV_NVNV\"></td><td class=\"bande_h TVV\"></td><td class=\"angle VVNT_NVNV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"><img align=\"middle\" src=\"/images/objets/boomrang_feu.gif\" border=\"1\"> <b>Utiliser :</b> 8 PA (portée : 4 case(s), dommages : 30, rechargement : 5 j.) - <b>Etat :</b> 100/100 (réparation/nettoyage : 8 PA) | <a href=\"reparer.php?IDS=305033d8ab52e3547c32fe17046b09d7&amp;idinv=25183954\">Réparer/Nettoyer</a> | <a href=\"transfert.php?IDS=305033d8ab52e3547c32fe17046b09d7&amp;action=poser&amp;idinv=25183954\">Poser au sol</a> |<br>Disponible dans : 0 jours 22 heures 16 minutes 24 secondes<br> Tombe en poussière dans <span style=\"color: black\">28 jours et 22 heures</span><br></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">Chaud devant !</td><td class=\"bande_v NV\"></td></tr><tr><td class=\"angle NVVV_NNVV\"></td><td class=\"bande_h VVN\"></td><td class=\"angle VVVN_NVVN\"></td></tr></tbody></table>\n<table class=\"coul_1\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n<tbody><tr><td class=\"angle VTVV_VNNV\"></td><td class=\"bande_h VTN\"></td><td class=\"angle VVTV_VVNN\"></td></tr><tr><td class=\"bande_v VT\"></td><td class=\"news-titre\">Revolver 6 coups</td><td class=\"bande_v TV\"></td></tr><tr><td class=\"angle TNVV_NVNV\"></td><td class=\"bande_h TVV\"></td><td class=\"angle VVNT_NVNV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"><img align=\"middle\" src=\"/images/objets/revolver.gif\" border=\"1\"> <b>Utiliser :</b> 6 PA (portée : 4 case(s), dommages : 15, rechargement : 2 j.) - <b>Etat :</b> 2/6 (réparation/nettoyage : 11 PA) | <a href=\"reparer.php?IDS=305033d8ab52e3547c32fe17046b09d7&amp;idinv=25183955\">Réparer/Nettoyer</a> | <a href=\"transfert.php?IDS=305033d8ab52e3547c32fe17046b09d7&amp;action=poser&amp;idinv=25183955\">Poser au sol</a> |<br> Tombe en poussière dans <span style=\"color: black\">25 jours et 19 heures</span><br></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">Idéal pour ceux qui veulent jouer aux cowboys et aux nain-diens...</td><td class=\"bande_v NV\"></td></tr><tr><td class=\"angle NVVV_NNVV\"></td><td class=\"bande_h VVN\"></td><td class=\"angle VVVN_NVVN\"></td></tr></tbody></table>\n<table class=\"coul_1\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n<tbody><tr><td class=\"angle VTVV_VNNV\"></td><td class=\"bande_h VTN\"></td><td class=\"angle VVTV_VVNN\"></td></tr><tr><td class=\"bande_v VT\"></td><td class=\"news-titre\">Batte de base-ball spéciale</td><td class=\"bande_v TV\"></td></tr><tr><td class=\"angle TNVV_NVNV\"></td><td class=\"bande_h TVV\"></td><td class=\"angle VVNT_NVNV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"><img align=\"middle\" src=\"/images/objets/batte.gif\" border=\"1\"> <b>Utiliser :</b> 8 PA (portée : 0 case(s), dommages : ???, rechargement : 0 j.) - <b>Etat :</b> 70/100 (réparation/nettoyage : 19 PA) | <a href=\"reparer.php?IDS=305033d8ab52e3547c32fe17046b09d7&amp;idinv=25183956\">Réparer/Nettoyer</a> | <a href=\"transfert.php?IDS=305033d8ab52e3547c32fe17046b09d7&amp;action=poser&amp;idinv=25183956\">Poser au sol</a> |<br> Tombe en poussière dans <span style=\"color: black\">24 jours et 23 heures</span><br></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">T'es Ok !  T'es In !  T'es Batte ...</td><td class=\"bande_v NV\"></td></tr><tr><td class=\"angle NVVV_NNVV\"></td><td class=\"bande_h VVN\"></td><td class=\"angle VVVN_NVVN\"></td></tr></tbody></table>\n<table class=\"coul_1\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n<tbody><tr><td class=\"angle VTVV_VNNV\"></td><td class=\"bande_h VTN\"></td><td class=\"angle VVTV_VVNN\"></td></tr><tr><td class=\"bande_v VT\"></td><td class=\"news-titre\">Un peu d'amour en bocal</td><td class=\"bande_v TV\"></td></tr><tr><td class=\"angle TNVV_NVNV\"></td><td class=\"bande_h TVV\"></td><td class=\"angle VVNT_NVNV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"><img align=\"middle\" src=\"/images/objets/amour_en_bocal.gif\" border=\"1\"> [ Force 0 | Précision 0 | Vie +25 | Intelligence 0 ] | <a href=\"transfert.php?IDS=305033d8ab52e3547c32fe17046b09d7&amp;action=poser&amp;idinv=25183949\">Poser au sol</a> |<br> Tombe en poussière dans <span style=\"color: black\">25 jours et 19 heures</span><br></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">Tombé d'un camion qui prenait la direction de <a target=\"_blank\" href=\"http://pacific.nainwak.com/\">\"Pacific Nainwak\"</a></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"angle NVVV_NNVV\"></td><td class=\"bande_h VVN\"></td><td class=\"angle VVVN_NVVN\"></td></tr></tbody></table>\n<table class=\"coul_1\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n<tbody><tr><td class=\"angle VTVV_VNNV\"></td><td class=\"bande_h VTN\"></td><td class=\"angle VVTV_VVNN\"></td></tr><tr><td class=\"bande_v VT\"></td><td class=\"news-titre\">Visée à poisson</td><td class=\"bande_v TV\"></td></tr><tr><td class=\"angle TNVV_NVNV\"></td><td class=\"bande_h TVV\"></td><td class=\"angle VVNT_NVNV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"><img align=\"middle\" src=\"/images/objets/faux_thon.gif\" border=\"1\"> [ Force -6 | Précision +15 | Vie 0 | Intelligence 0 ] | <a href=\"transfert.php?IDS=305033d8ab52e3547c32fe17046b09d7&amp;action=poser&amp;idinv=25183959\">Poser au sol</a> |<br> Tombe en poussière dans <span style=\"color: black\">25 jours et 19 heures</span><br></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">Technologie avancée. La \"visée à poisson\" accélère des poissons en plastique (les faux-thons) afin de les propulser sur la cible. (La visée laser s'en est d'ailleurs inspirée)</td><td class=\"bande_v NV\"></td></tr><tr><td class=\"angle NVVV_NNVV\"></td><td class=\"bande_h VVN\"></td><td class=\"angle VVVN_NVVN\"></td></tr></tbody></table>\n<table class=\"coul_1\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n<tbody><tr><td class=\"angle VTVV_VNNV\"></td><td class=\"bande_h VTN\"></td><td class=\"angle VVTV_VVNN\"></td></tr><tr><td class=\"bande_v VT\"></td><td class=\"news-titre\">Voiture de course</td><td class=\"bande_v TV\"></td></tr><tr><td class=\"angle TNVV_NVNV\"></td><td class=\"bande_h TVV\"></td><td class=\"angle VVNT_NVNV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"><img align=\"middle\" src=\"/images/objets/voiture_de_course.gif\" border=\"1\"> <b>Consommation :</b> 4 PA/case - <b>Etat :</b> 60/100 (réparation/nettoyage : 5 PA) | <a href=\"reparer.php?IDS=305033d8ab52e3547c32fe17046b09d7&amp;idinv=25186168\">Réparer/Nettoyer</a> | <a href=\"transfert.php?IDS=305033d8ab52e3547c32fe17046b09d7&amp;action=poser&amp;idinv=25186168\">Sortir du véhicule</a> |<br> Tombe en poussière dans <span style=\"color: black\">27 jours et 22 heures</span><br></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">Avec cette voiture de course, vous pourrez allez faire les vôtres au super-marché.</td><td class=\"bande_v NV\"></td></tr><tr><td class=\"angle NVVV_NNVV\"></td><td class=\"bande_h VVN\"></td><td class=\"angle VVVN_NVVN\"></td></tr></tbody></table>\n<table class=\"coul_1\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n<tbody><tr><td class=\"angle VTVV_VNNV\"></td><td class=\"bande_h VTN\"></td><td class=\"angle VVTV_VVNN\"></td></tr><tr><td class=\"bande_v VT\"></td><td class=\"news-titre\">Pigeon voyageur</td><td class=\"bande_v TV\"></td></tr><tr><td class=\"angle TNVV_NVNV\"></td><td class=\"bande_h TVV\"></td><td class=\"angle VVNT_NVNV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"><img align=\"middle\" src=\"/images/objets/pigeon.gif\" border=\"1\"> <b>Portée :</b> 8 case(s) | <a href=\"transfert.php?IDS=305033d8ab52e3547c32fe17046b09d7&amp;action=poser&amp;idinv=25183960\">Poser au sol</a> |<br> Tombe en poussière dans <span style=\"color: black\">25 jours et 19 heures</span><br></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">C'est le nouveau modèle de la marque automobile. En effet le Pigeon Voyageur outrepasse les lois terrestres pour emmener son conducteur au 7ème ciel.</td><td class=\"bande_v NV\"></td></tr><tr><td class=\"angle NVVV_NNVV\"></td><td class=\"bande_h VVN\"></td><td class=\"angle VVVN_NVVN\"></td></tr></tbody></table>\n<table class=\"coul_1\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n<tbody><tr><td class=\"angle VTVV_VNNV\"></td><td class=\"bande_h VTN\"></td><td class=\"angle VVTV_VVNN\"></td></tr><tr><td class=\"bande_v VT\"></td><td class=\"news-titre\">Bouteille vide</td><td class=\"bande_v TV\"></td></tr><tr><td class=\"angle TNVV_NVNV\"></td><td class=\"bande_h TVV\"></td><td class=\"angle VVNT_NVNV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"><img align=\"middle\" src=\"/images/objets/vinvide.gif\" border=\"1\">  (réparation/nettoyage : 0 PA) |<a href=\"reparer.php?IDS=305033d8ab52e3547c32fe17046b09d7&amp;idinv=25161977\">Réparer/Nettoyer</a> | <a href=\"transfert.php?IDS=305033d8ab52e3547c32fe17046b09d7&amp;action=poser&amp;idinv=25161977\">Poser au sol</a> |<br> Tombe en poussière dans <span style=\"color: black\">5 jours et 11 heures</span><br></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">Même pas un SOS à l'intérieur !</td><td class=\"bande_v NV\"></td></tr><tr><td class=\"angle NVVV_NNVV\"></td><td class=\"bande_h VVN\"></td><td class=\"angle VVVN_NVVN\"></td></tr></tbody></table>\n<table class=\"coul_1\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n<tbody><tr><td class=\"angle VTVV_VNNV\"></td><td class=\"bande_h VTN\"></td><td class=\"angle VVTV_VVNN\"></td></tr><tr><td class=\"bande_v VT\"></td><td class=\"news-titre\">Fée Cabossée</td><td class=\"bande_v TV\"></td></tr><tr><td class=\"angle TNVV_NVNV\"></td><td class=\"bande_h TVV\"></td><td class=\"angle VVNT_NVNV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"><img align=\"middle\" src=\"/images/objets/fee.png\" border=\"1\"> <b>Utiliser :</b> 5 PA | <a href=\"utiliser.php?IDS=305033d8ab52e3547c32fe17046b09d7&amp;idinv=25134600\"> Utiliser </a> |</td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">Mais pourquoi la fée cabossée ? - Rhoo on s'en cogne !</td><td class=\"bande_v NV\"></td></tr><tr><td class=\"angle NVVV_NNVV\"></td><td class=\"bande_h VVN\"></td><td class=\"angle VVVN_NVVN\"></td></tr></tbody></table>\n<table class=\"coul_1\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n<tbody><tr><td class=\"angle VTVV_VNNV\"></td><td class=\"bande_h VTN\"></td><td class=\"angle VVTV_VVNN\"></td></tr><tr><td class=\"bande_v VT\"></td><td class=\"news-titre\">Kine d'Heure</td><td class=\"bande_v TV\"></td></tr><tr><td class=\"angle TNVV_NVNV\"></td><td class=\"bande_h TVV\"></td><td class=\"angle VVNT_NVNV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"><img align=\"middle\" src=\"/images/objets/kinder.gif\" border=\"1\"> <b>Gain de PV estimé :</b> -76 | <a href=\"utiliser.php?IDS=305033d8ab52e3547c32fe17046b09d7&amp;idinv=25159237\"> Consommer </a> | <a href=\"transfert.php?IDS=305033d8ab52e3547c32fe17046b09d7&amp;action=poser&amp;idinv=25159237\">Poser au sol</a> |<br> Tombe en poussière dans <span style=\"color: black\">11 jours et 0 heures</span><br></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">Kine d'heure, au bon chocolat et au lait, et peut-être une surprise à l'intérieur ?</td><td class=\"bande_v NV\"></td></tr><tr><td class=\"angle NVVV_NNVV\"></td><td class=\"bande_h VVN\"></td><td class=\"angle VVVN_NVVN\"></td></tr></tbody></table>\n<table class=\"coul_1\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n<tbody><tr><td class=\"angle VTVV_VNNV\"></td><td class=\"bande_h VTN\"></td><td class=\"angle VVTV_VVNN\"></td></tr><tr><td class=\"bande_v VT\"></td><td class=\"news-titre\">Le bocal d'air</td><td class=\"bande_v TV\"></td></tr><tr><td class=\"angle TNVV_NVNV\"></td><td class=\"bande_h TVV\"></td><td class=\"angle VVNT_NVNV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"><img align=\"middle\" src=\"/images/objets/bocal_violet.gif\" border=\"1\"> <b>Utiliser :</b> 1 PA | <a href=\"utiliser.php?IDS=305033d8ab52e3547c32fe17046b09d7&amp;idinv=25170639\"> Utiliser </a> | <a href=\"transfert.php?IDS=305033d8ab52e3547c32fe17046b09d7&amp;action=poser&amp;idinv=25170639\">Poser au sol</a> |<br> Tombe en poussière dans <span style=\"color: black\">13 jours et 6 heures</span><br></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">Extrait d'une arme utilisée par le GMM</td><td class=\"bande_v NV\"></td></tr><tr><td class=\"angle NVVV_NNVV\"></td><td class=\"bande_h VVN\"></td><td class=\"angle VVVN_NVVN\"></td></tr></tbody></table>\n<table class=\"coul_1\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n<tbody><tr><td class=\"angle VTVV_VNNV\"></td><td class=\"bande_h VTN\"></td><td class=\"angle VVTV_VVNN\"></td></tr><tr><td class=\"bande_v VT\"></td><td class=\"news-titre\">Main collante de gosse</td><td class=\"bande_v TV\"></td></tr><tr><td class=\"angle TNVV_NVNV\"></td><td class=\"bande_h TVV\"></td><td class=\"angle VVNT_NVNV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"><img align=\"middle\" src=\"/images/objets/main_collante.gif\" border=\"1\"> <b>Utiliser :</b> 2 PA | <a href=\"utiliser.php?IDS=305033d8ab52e3547c32fe17046b09d7&amp;idinv=25170640\"> Utiliser </a> | <a href=\"transfert.php?IDS=305033d8ab52e3547c32fe17046b09d7&amp;action=poser&amp;idinv=25170640\">Poser au sol</a> |<br> Tombe en poussière dans <span style=\"color: black\">26 jours et 23 heures</span><br></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">Les Gosses c'est Bien mais qu'est ce que c'est collant ...</td><td class=\"bande_v NV\"></td></tr><tr><td class=\"angle NVVV_NNVV\"></td><td class=\"bande_h VVN\"></td><td class=\"angle VVVN_NVVN\"></td></tr></tbody></table>\n<table class=\"coul_1\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n<tbody><tr><td class=\"angle VTVV_VNNV\"></td><td class=\"bande_h VTN\"></td><td class=\"angle VVTV_VVNN\"></td></tr><tr><td class=\"bande_v VT\"></td><td class=\"news-titre\">Tarte à la crème</td><td class=\"bande_v TV\"></td></tr><tr><td class=\"angle TNVV_NVNV\"></td><td class=\"bande_h TVV\"></td><td class=\"angle VVNT_NVNV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"><img align=\"middle\" src=\"/images/objets/tarte_creme.gif\" border=\"1\"> <b>Utiliser :</b> 4 PA (portée : 4 case(s), dommages : 5, rechargement : 1 j.) - <b>Etat :</b> 100/100 (réparation/nettoyage : 2 PA) | <a href=\"reparer.php?IDS=305033d8ab52e3547c32fe17046b09d7&amp;idinv=25170639\">Réparer/Nettoyer</a> | <a href=\"transfert.php?IDS=305033d8ab52e3547c32fe17046b09d7&amp;action=poser&amp;idinv=25170639\">Poser au sol</a> |<br> Tombe en poussière dans <span style=\"color: black\">23 jours et 6 heures</span><br></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">les chaines de télé culturelles sont importantes lorsque la religion part en fumée..<br><br></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"angle NVVV_NNVV\"></td><td class=\"bande_h VVN\"></td><td class=\"angle VVVN_NVVN\"></td></tr></tbody></table>\n\n<script language=\"Javascript\" type=\"text/javascript\">\nmiseajourpager('2', '149', '159', 'evenpagerlu', '?', 'chatpagerlu', '0', '14', '7', '305033d8ab52e3547c32fe17046b09d7', 'NainXpress');\n</script>\n</body></html>\n";

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

var dom = __webpack_require__(14);
var code = __webpack_require__(51);
var analyzeTag = __webpack_require__(173);
var int = __webpack_require__(48);

function analyzeLocalisation(doc) {
    // example:
    // <span class="c1">Position (13,5) sur "Ronain Graou" |b95eb2f716c500db6|</span>
    var text = dom.find('.c1', doc).text();
    var regex = /Position\s\((\d+),(\d+)\)\ssur\s"([^"]*)"/i;
    var match = regex.exec(text);

    if (match) {
        return {
            position: [int(match[1]), int(match[2])],
            monde: match[3]
        };
    }
}

function analyzeNains(js) {
    var regex = /tabavat\[\d+\]\s=\s\[(.*)\];/ig;
    var keys = 'id,photo,nom,tag,barbe,classe,cote,distance,x,y,description,attaquer,gifler,estCible'.split(',');
    var objects = code.buildObjectsFromJSSequences(js, regex, keys);
    var autresActions = {
        'a': 'accrocherPoisson', // Accrocher un poisson !,
        'c': 'offrirCadeau',  // Offrir un cadeau !,
        'o': 'gifler'  // Gifler
    };

    return objects.map(function (object) {
        var nain = {
            id: int(object.id),
            nom: object.nom,
            image: '/images/' + object.photo,
            description: object.description,
            position: [int(object.x), int(object.y)],
            classe: int(object.classe),
            rang: object.cote,
            barbe: int(object.barbe) / 100,
            attaquable: object.attaquer === 'o',
            autreAction: autresActions[object.gifler],
            estCible: object.estCible == 1
        };

        var tag = analyzeTag(object.tag);
        if (tag) {
            nain.tag = tag;
        }

        return nain;
    });
}

function analyzeObjets(js) {
    var regex = /tabobjet\[\d+\]\s=\s\[(.*)\];/ig;
    var keys = 'id,photo,nom,distance,x,y,categorie,poussiere'.split(',');
    var objects = code.buildObjectsFromJSSequences(js, regex, keys);

    return objects.map(function (object) {
        return {
            id: int(object.id),
            nom: object.nom,
            image: '/images/' + object.photo,
            type: object.categorie.toLowerCase(),
            position: [int(object.x), int(object.y)],
            poussiere: int(object.poussiere)  // expressed in seconds
        };
    });
}

function analyze(doc/*, date*/) {
    var js = code.getInlineJS(doc);
    var localisation = analyzeLocalisation(doc);
    var nains = analyzeNains(js);
    var objets = analyzeObjets(js);

    return {
        monde: localisation.monde,
        position: localisation.position,
        nains: nains,
        objets: objets
    };
}

module.exports = analyze;


/***/ }),
/* 173 */
/***/ (function(module, exports) {

function analyze(tagHtml) {
    var noBracketsTag = tagHtml.replace(/\] \[|\[|\]/g, '');
    var guildeRegex = /<span\s+style="color:(#[0-9A-F]{6});">([^<]*)<\/span>/i;
    var guilde = '';
    var result = {};

    // find the guilde and perso elements
    var perso = noBracketsTag.replace(guildeRegex, function(match, couleur, nom) {
        guilde = match;
        result.guilde = {
            nom: nom,
            couleur: couleur
        };
        return '';
    });

    if (perso) {
        result.perso = perso;
    }

    /*
     * type values:
     * 1: [PersoGuilde]
     * 2: [GuildePerso]
     * 3: [Perso][Guilde]
     * 4: [Guilde][Perso]
     */
    if (perso && guilde) {
        switch (tagHtml) {
        case '[' + perso + guilde + ']':
            result.type = 1;
            break;
        case '[' + guilde + perso + ']':
            result.type = 2;
            break;
        case '[' + perso + '][' + guilde + ']':
        case '[' + perso + '] [' + guilde + ']':
            result.type = 3;
            break;
        case '[' + guilde + '][' + perso + ']':
        case '[' + guilde + '] [' + perso + ']':
            result.type = 4;
            break;
        }
    }

    return result;
}

module.exports = analyze;


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

var dom = __webpack_require__(14);
var code = __webpack_require__(51);
var analyzeTag = __webpack_require__(173);
var int = __webpack_require__(48);

function getClasses(js) {
    var regex = /\$\('(\w+)'\).addClassName\(cotes\[(\d)+\]\);/g;
    return code.buildObjectFromJS(js, regex);
}

function getCharacteristics(js) {
    // find all lines looking like: $('sPVBase').innerHTML = (109+39);
    var regex = /\$\('(\w+)'\)\.innerHTML = \((-?\d+)[+/](-?\d+)\)/g;
    return code.buildObjectFromJS(js, regex);
}

function getBlocsDroits(doc) {
    var rows = dom.findAll('.bloc-perso tr', doc);
    var data = {};

    rows.forEach(function (row) {
        var nameElement = row.find('.bloc_droit');
        var valueElement = row.find('td b');

        if (nameElement && valueElement) {  // not all rows have both elements
            // keep only the first integer in the value
            var value = int(valueElement.text().replace(/(\d+).*/, '$1'));
            data[nameElement.text()] = value;
        }
    });

    return data;
}

function analyze(doc/*, date*/) {
    var js = code.getInlineJS(doc);
    var classes = getClasses(js);
    var characts = getCharacteristics(js);
    var blocsDroits = getBlocsDroits(doc);
    var cibleElement = dom.find('.bloc-perso .cible', doc);

    var perso = {
        nom: dom.find('input[name="nvNain"]', doc).attr('value'),
        image: dom.find('.news-titre img', doc).attr('src'),
        rang: dom.find('#sRang', doc).text(),
        classe: classes['sRang'],
        barbe: characts.sBarbe[0] / characts.sBarbe[1],
        description: dom.find('input[name="description"]', doc).attr('value'),
        arme: dom.find('input[name="nomArme"]', doc).attr('value'),
        tag: analyzeTag(dom.find('#s_Tag', doc).html()),
        vie: characts.sPV[0] + characts.sPV[1],
        vieBase: characts.sPVBase[0],
        vieBonus: characts.sPVBase[1],
        get vieTotal() {
            return this.vieBase + this.vieBonus;
        },
        forceBase: characts.sForce[0],
        forceBonus: characts.sForce[1],
        get force() {
            return this.forceBase + this.forceBonus;
        },
        precisionBase: characts.sPrecis[0],
        precisionBonus: characts.sPrecis[1],
        get precision() {
            return this.precisionBase + this.precisionBonus;
        },
        intelligenceBase: characts.sIntell[0],
        intelligenceBonus: characts.sIntell[1],
        get intelligence() {
            return this.intelligenceBase + this.intelligenceBonus;
        },
        honneurBase: characts.sPG[0],
        honneurBonus: characts.sPG[1],
        get honneur() {
            return this.honneurBase + this.honneurBonus;
        },
        cote: blocsDroits['Points de Côté'],
        ridicule: blocsDroits['Points de Ridicule'],
        honte: blocsDroits['Points de Honte'],
        xp: blocsDroits["Points d'XP"],
        tues: blocsDroits["Nombre d'ennemis tués"],
        morts: blocsDroits['Nombre de morts'],
        giflesDonnees: blocsDroits['Nombre de gifles données'],
        giflesRecues: blocsDroits['Nombre de gifles reçues'],
        chasseurs: {
            nombre: blocsDroits['Nombre de chasseurs'],
            barbe: characts.sBarbeChass[0] / characts.sBarbeChass[1]
        }
    };

    if (cibleElement) {
        perso.cible = {
            nom: cibleElement.firstChild().text(),
            classe: classes['sRangCible'],
            rang: cibleElement.find('#sRangCible').text(),
            barbe: characts.sBarbeCible[0] / characts.sBarbeCible[1]
        };
    }

    return perso;
}

module.exports = analyze;


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

var dom = __webpack_require__(14);
var int = __webpack_require__(48);

var typesNames = {
    A: 'arme',
    R: 'rune',
    V: 'véhicule',
    D: 'détecteur',
    I: 'inutile',
    B: 'bouffe',
    J: 'jouet'
};

function analyzeListDocument(doc) {
    var newsTexts = dom.findAll('.news-text', doc);

    return newsTexts.map(function (newsText) {
        var linkElement = newsText.find('a');
        var nom = linkElement.text();
        var href = linkElement.attr('href');
        var id = int(href.replace(/JavaScript:detailobj\((\d+)\)/i, '$1'));
        var typeElement = newsText.firstChild();
        var typeLetters = typeElement.text().replace(/\[(\w+)\]\s*/i, '$1').split('');
        var types = typeLetters.map(function (letter) { return typesNames[letter]; });

        return {
            id: id,
            nom: nom,
            types: types
        };
    });
}

function getListDocument(doc) {
    var frame = dom.find('#encycl_liste', doc);
    return frame.node.contentWindow.document;
}

module.exports = {
    analyzeListDocument: analyzeListDocument,
    getListDocument: getListDocument
};


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

var code = __webpack_require__(51);
var int = __webpack_require__(48);
var dateRegex = /(\d\d)h(\d\d) \(\w+\. (\d\d)\/(\d\d)\)/;

function analyze(doc, date) {
    var js = code.getInlineJS(doc);
    var regex = /ev\((.*)\);/ig;
    var keys = 'neweven,time,num,s1,s2,s3,n1,n2,n3,appel'.split(',');
    var objects = code.buildObjectsFromJSSequences(js, regex, keys);

    return objects.map(function (object) {
        var type = object.num;
        var params = {
            s1: object.s1,
            s2: object.s2,
            s3: object.s3,
            n1: object.n1,
            n2: object.n2,
            n3: object.n3
        };

        return {
            isNew: object.neweven == 1,
            type: type,
            date: convertToUnixTimestamp(object.time, date),
            //appel: object.appel === 1,
            parametres: params,
            description: getDescription(type, params),
            image: getImage(type)
        };
    });
}

// return the unix timestamp for a date specified as '12h09 (sam. 12/03)' in GMT+1
function convertToUnixTimestamp(date, nowDate) {
    var match = dateRegex.exec(date);
    var year = nowDate.getFullYear();
    var month = int(match[4]);
    var day = int(match[3]);
    var hours = int(match[1]);
    var minutes = int(match[2]);

    // Note: we apply the GMT+1 offset to the date
    date = new Date(Date.UTC(year, month - 1, day, hours - 1, minutes));

    if (date.getTime() > nowDate.getTime()) {  // happy new year
        date.setUTCFullYear(date.getUTCFullYear() - 1);
    }

    return date;
}

function getDescription(type, params) {
    var desc = descriptions[type - 1];

    if (!desc) {
        return;
    }

    desc = desc.replace(/%s1/, params.s1);
    desc = desc.replace(/%s2/, params.s2);
    desc = desc.replace(/%s3/, params.s3);
    desc = desc.replace(/%n1/, params.n1);
    desc = desc.replace(/%n2/, params.n2);
    desc = desc.replace(/%n3/, params.n3);
    return desc;
}

function getImage(type) {
    var img = images[type - 1];

    if (!img) {
        return;
    }

    if (img.indexOf('.') === -1) {
        img += '.gif';
    }

    return '/images/interface/evens/' + img;
}

// Adapted copy of http://www.nainwak.com/js/even.js, version 2.0.2.0
var descriptions = [
    'Repos.', //1
    '%s1 s\'est reposé.',
    'Ton %s2 a rendu l\'âme, te faisant perdre %n1 point(s) de Vie, et augmenter de %n2 point(s) de Ridicule !',
    'Le véhicule de %s1 lui a explosé à la figure.',
    'Tu es mort dans l\'explosion de ton véhicule !', //5
    '%s1 est mort dans l\'explosion de son véhicule (%s2) !',
    'Tu as perdu tous tes objets.',
    'Tu réssuscites, honteux, sur le monde \'%s1\'.',
    'Ta nouvelle cible est : %s1.',
    'Déplacement en %n1,%n2.', //10
    'Tu as aperçu %s1 en (%n1,%n2).',
    'Tu as rejoint ta cible, et bénéficié d\'un bonus de %n1 PA.',
    'Glisse vers %s2.',
    '%s1 a glissé vers %s2.',
    '%s1 est arrivé du monde %s3.', //15
    'Début d\'hibernation.',
    '%s1 s\'est placé en hibernation.',
    'Tu as mangé un aliment non comestible, et tu en es mort !',
    '%s1 a mangé un(e) %s2, puis s\'est écroulé en se tordant de douleur !',
    'Tu as consommé un(e) %s2 [%n1 PV]', //20
    '%s1 a mangé un(e) %s2',
    'Tu as attaqué un nain qui est de ton côté ! Tu bascules de l\'autre !',
    'Tu as attaqué un rampant de ton côté tout en ayant au moins 1 point de Honte! Tu passe rampant toi-même en basculant de l\'autre coté !',
    'Tu as choisi ton côté, celui des Braves, en frappant un Sadique !',
    'Tu as choisi ton côté, celui des Sadiques, en frappant un Brave !', //25
    'Tu as réussi un coup critique sur %s2 avec ton %s3, et lui as fait perdre %n1 point(s) de Vie ! [+%n2 XP]',
    '%s1 t\'a porté un coup critique avec son(sa) %s2, et t\'a fait perdre %n1 point(s) de Vie !',
    '%s1 a réussi un coup critique sur %s2 avec son(sa) %s3 !',
    'Tu as attaqué %s2 avec ton(ta) %s3, et lui as fait perdre %n1 point(s) de Vie ! [+%n2 XP]',
    '%s1 t\'a attaqué avec son(sa) %s2, et t\'a fait perdre %n1 point(s) de Vie !', //30
    '%s1 a frappé %s2 avec son(sa) %s3 !',
    '%s1 t\'a porté un coup terrible avec son(sa) %s3, engendrant une perte de %n1 PV !',
    '%s1 a tué %s2 avec son(sa) %s3 !',
    'Tu es MORT !',
    'Tu as ressuscité, le coeur empli de vengeance, sur le monde \'%s1\'.', //35
    'Tu as été tué par un joueur à la barbe plus courte, tu augmentes de %n1 point(s) de Ridicule !',
    'Tu as tué ta cible, et as gagné %n1 point(s) d\'Honneur et %n2 point(s) d\'XP !',
    'Tu as été tué par ton chasseur',
    'Tu as tué %s1, le puissant %s2, qui était ton chasseur ! Tu gagnes %n1 point(s) d\'XP et %n2 point(s) d\'Honneur !',
    'Tu as tué %s1, qui était ton chasseur ! Tu gagnes %n1 point(s) d\'XP !', //40
    'Tu as tué %s1, le puissant %s2, tes points de Côté varient de %n1, et tu gagnes %n2 point(s) d\'XP et %n3 point(s) d\'Honneur !',
    'Tu as tué %s1, un(e) %s2, tes points de Côté varient de %n1, et tu gagnes %n2 point(s) d\'XP !',
    'Armé de ton %s3, tu as lamentablement raté ton attaque contre %s2.',
    '%s1, armé d\'un(e) %s2, a ridiculement raté son attaque contre toi !',
    '%s1, armé de son(sa) %s3, a lamentablement raté une attaque contre %s2 !', //45
    'Ton %s1 a été détruit(e) !',
    '%s1 t\'a giflé !',
    '%s1 a giflé %s2 !',
    'Tu as ramassé un(e) %s2.',
    '%s1 a pris un(e) %s2 sur le sol.', //50
    'Un p\'tit lutin de Schlavbeuk a ramassé le(la) %s2 de %s1 et s\'est enfui avec.',
    'Tu es descendu de ton %s2, et l\'a laissé dans un état tel, qu\'il est maintenant inutilisable.',
    '%s1 est descendu de son(sa) %s2, et l\'a laissé dans un état tellement lamentable qu\'il est inutilisable.',
    'Tu as mis un détritus à la poubelle !',
    '%s1 est très civique, il a mis un détritus à la poubelle !', //55
    'Tu t\'es séparé de ton %s2.',
    '%s1 a posé un(e) %s2.',
    'Un petit lutin de Schlavbeuk t\'a volé ton %s2.',
    'Un petit lutin de Schlavbeuk a volé le(la) %s2 de %s1 et s\'est enfui avec.',
    'Un petit lutin de Schlavbeuk a réparé votre %s2', //60
    'Un petit lutin de Schlavbeuk a réparé le(la) %s2 de %s1',
    'Tu as posé une rune qui te maintenait en vie, tu es mort et as augmenté de %n1 point(s) de Ridicule.',
    '%s1 a posé une rune (%s2), qui le maintenait en vie, et il en est mort !',
    'Tu as réparé ton %s2.',
    '%s1 a réparé son(sa) %s2.', //65
    'Entraînement en Force.',
    '%s1 s\'est musclé un peu, et a gagné en Force.',
    'Entraînement en Intelligence.',
    '%s1 est très studieux, et a progressé en Intelligence.',
    'Entraînement en Précision.', //70
    '%s1 s\'est entraîné au tir, et s\'est amélioré en Précision.',
    'Entraînement en Vie.',
    '%s1 a travaillé sa constitution, et augmenté ses points de Vie.',
    'Rédemption',
    '%s1 a fait pénitence.', //75
    'Tu as peint la case %n1, %n2 de %s3 en %s2.',
    '%s1 a peint la case %n1, %n2 de %s3 en %s2.',
    'Tu as effacé la case %n1, %n2 de %s2.',
    '%s1 a effacé la case %n1, %n2 de %s2.',
    'Reset de ton nain.', //80
    'Ta cible hiberne, une nouvelle cible t\'a été attribuée.',
    'Ta cible a fait un reset de son nain, une nouvelle cible t\'a été attribuée.',
    'Ta cible a été retirée du jeu, une nouvelle cible t\'a été attribuée.',
    '%s1',
    'Fin d\'hibernation', //85
    'Il n\'y a pas eu d\'hibernation, tu as toujours été en combat !',
    'Nouvelle vie',
    'Tu as envoyé %s2 bouffer l\'herbe de %n1, %n2 avec ton %s3.',
    '%s1 t\'a shooté avec son(sa) %s2 et t\'a envoyé en %n1, %n2.',
    '%s1 a utilisé son(sa) %s3 sur %s2 et l\'a expédié en %n1, %n2 voir si l\'air était plus frais.', //90
    'Tu as attrapé %s2 avec ton %s3.',
    '%s1 t\'a attrapé avec son %s2 et t\'a attiré en %n1, %n2.',
    '%s1 a utilisé son(sa) %s3 sur %s2 et l\'a ramené au bercail en %n1, %n2.',
    'Tu as joué au %s2 et as %s3.',
    '%s1 a joué au %s2 et a %s3.',//95
    'Tu as utilisé ton %s2 pour récupérer un(e) %s3.',
    '%s1 a utilisé son(sa) %s2 pour récupérer un(e) %s3.',
    'Tu as téléporté %s2 avec ton %s3.',
    '%s1 t\'a shooté avec son(sa) %s2 et t\'a envoyé en %n1, %n2 de %s3.',
    '%s1 a téléporté %s2 avec son %s3.', //100
    'Tu as entarté %s2 avec ta %s3 et infligé %n1 points de ridicule.',
    '%s1 t\'a entarté avec son(sa) %s3 et t\'a infligé %n1 points de ridicule.',
    '%s1 a entarté %s2 avec son(sa) %s3 et infligé %n1 points de ridicule.',
    'Tu as endommagé l\'inventaire de %s2 avec ton %s3.',
    '%s1 a endommagé ton inventaire avec son(sa) %s2.', //105
    '%s1 a endommagé l\'inventaire de %s2 avec son(sa) %s3.',
    '%s2 a évité la tarte que tu viens de lui lancer d\'une façon admirable, ses PR diminuent de %n1.',
    '%s1 a ridiculement raté ton entartage, grâce à ta pirouette tu perds %n1 point(s) de Ridicule !',
    '%s1 a ridiculement raté l\'entartage de %s2 qui grâce à sa pirouette perd %n1 point(s) de Ridicule',
    '%s1 %s2', //110
    '%s1 a tenté de manger une Surprise de Kine d\'Heure, qui a fini à la poubelle !',
    '%s1 a mangé un Kine d\'Heure, et une merveilleuse surprise toute mimi est apparue.',
    'La Surprise de Kine d\'Heure est tombée sur ta case.',
    'Hélas, la surprise de Kine d\'Heure est passée de travers et part à la poubelle !',
    'Tu as peint la case %n1,%n2 de %s3 avec %s2.', //115
    '%s1 a peint la case %n1,%n2 de %s3 avec %s2.',
    'Tu as offert ton(ta) %s3 à %s2. Joyeux nain-ël.',
    '%s1 t\'a offert son(sa) %s3. Joyeux nain-ël.',
    '%s1 a offert son(sa) %s3 à %s2. Joyeux nain-ël.',
    'Tu as été ramené sur la case de l\'%s3 ', //120
    '%s1 a voulu attraper un(e) %s3 avec son(sa) %s2 et a été ramené sur sa case !',
    'BAOUM ! %s1 a lancé un(e) %s2 sur ta case, tu as atteris en %n1,%n2 sur %s3 et perdu %n3 PV',
    'Tu as fait exploser la case %n1,%n2 avec ton %s2 !',
    'BAOUM ! %s1 a fait exploser la case %n1, %n2 avec sa %s2 !',
    'La Boule de NainLo que tu avais a quitté ton inventaire pour aller tomber ailleur !', //125
    'Le tirage du NainLo a eu lieu, n\'oublie pas d\'aller vérifier ta combinaison.',
    '%s1 %s2',
    'Porté par le vent ton mot doux est parti vers d\'autres cieux.',
    'Ton coeur s\'est embrasé en lisant le mot doux de %s1',
    'Le coeur de %s1 s\'est embrasé en lisant ton mot doux.', //130
    'Le mot doux de %s1 ne t\'a fait ni chaud ni froid.',
    'Ton mot doux n\'a fait ni chaud ni froid à %s1.',
    'La tête te tourne dès que le breuvage noir a touché ton gosier. Avec un mal de crâne terrible, tu te réveilles sur Ire-Land.',
    '%s1 s\'écroule par terre et son corps s\'évanouit dans les airs, ne laissant qu\'un carré de trèfles verdoyants.',
    'Ton coup de chaudron a arraché une feuille au trèfle de %s2.', //135
    'D\'un revers de chaudron %s1 a arraché une feuille de ton trèfle !',
    '%s1 a chaudronné %s2', //137
    'Tu as mangé ton Trognon de trèfle et as glissé vers %s2',
    '%s1 a mangé son Trognon de trèfle et est reparti sur %s2', //139
    'Tu as offert un bien joli bouquet de muguet à %s2',
    '%s1 t\'a offert un bien joli bouquet de muguet !', //141
    '%s1 a offert un bien joli bouquet de muguet à %s2',
    'Tu as réclamé des bonbons à d\'effrayants voisins.',
    '%s1 a été réclamer des bonbons à d\'effrayants voisins.',
    'Tu as accroché ta vieille chaussette au sapin de Nain-ël.', //145
    '%s1 a accroché sa vieille chaussette au sapin de Nain-ël.',
    'Tu as lancé ta %s3 sur %s2 et l\'a touché en plein dans le mille.',
    'Touché ! %s1 t\'as bien eu avec sa %s3.',
    '%s2 s\'est fait blanchir par %s1',
    'Oh non ! Mary a tout pris ... ou presque !',//150
    'À bout de force, tu es ramené sur la case de %s2.',
    'À bout de force, %s1 n\'a pas réussi a te ramener sur sa case. Tu en a profité pour le ramener à toi.',
    'À bout de force, %s1 n\'a pas réussi a ramener %s2 sur sa case.',
    'Tu n\'as rien compris à l\'art du lassotage et as échangé ta place avec %s2.',
    '%s1 n\'a rien compris à l\'art du lassotage, vous avez échangé de place.', //155
    '%s1 n\'a rien compris à l\'art du lassotage et a échangé de place avec %s2.',
    'Tu as tiré avec ton(ta) %s3 sur %s2 et l\'a touché en plein dans le mille.',
    'Touché ! %s1 t\'a bien eu avec son(sa) %s3.',
    '%s2 s\'est fait arroser par %s1',
    'Tu as mutanisé %s2 avec ton(ta) %s3', //160
    '%s1 t\'a mutanisé avec son(sa) %s2 !',
    '%s1 a mutanisé %s2 avec son(sa) %s3 !'
];

var images = [
    'dodo', //1
    'dodo',
    'explosion',
    'explosion',
    'mort', //5
    'mort',
    '',
    '',
    'cible',
    'pas', //10
    'pas',
    '',
    'pas',
    'pas',
    'pas', //15
    'dodo',
    'dodo',
    'mort',
    'mort',
    '', //20
    '',
    'cote',
    'cote',
    'cote',
    'cote', //25
    'combat_critique',
    'combat_critique',
    'combat_critique',
    'combat',
    'combat', //30
    'combat',
    'combat_critique',
    'mort',
    'mort',
    '', //35
    'mort',
    'mort',
    'mort',
    'mort',
    'mort', //40
    'mort',
    'mort',
    '',
    '',
    '', //45
    'explosion',
    'gifle',
    'gifle',
    '',
    '', //50
    '',
    '',
    '',
    '',
    '', //55
    '',
    '',
    '',
    '',
    'repare', //60
    'repare',
    'mort',
    'mort',
    'repare',
    'repare', //65
    '',
    '',
    '',
    '',
    '', //70
    '',
    '',
    '',
    '',
    '', //75
    '',
    '',
    '',
    '',
    '', //80
    '',
    '',
    '',
    'lutin.png',
    '', //85
    '',
    '',
    'batte',
    'batte',
    'batte', //90
    'lasso',
    'lasso',
    'lasso',
    'quite',
    'quite', //95
    'main',
    'main',
    'pistolet',
    'pistolet',
    'pistolet', //100
    'tarte',
    'tarte',
    'tarte',
    'explosion',
    'explosion', //105
    'explosion',
    'tarte',
    'tarte',
    'tarte',
    'noel', //110
    '',
    '',
    '',
    '',
    '', //115
    '',
    '',
    '',
    '',
    'main', //120
    'main',
    'explosion',
    'explosion',
    'explosion',
    '', //125
    '', //126
    '', //127
    'eventsaintvalentin.png',
    'eventsaintvalentin.png',
    'eventsaintvalentin.png', // 130
    'brokenheart.png',
    'brokenheart.png',
    'trefle_event.png',
    'trefle_event.png',
    'trefle_event.png', // 135
    'trefle_event.png',
    'trefle_event.png',
    'pas',
    'pas',
    '',//140
    '',
    '',
    'halloween',
    'halloween',
    'cerfoo.png', //145
    'cerfoo.png',
    'poule',
    'poule',
    'poule',
    'fee.png', //150
    'lasso',
    'lasso',
    'lasso',
    'lasso',
    'lasso', //155
    'lasso',
    'bombe_eau.png',
    'bombe_eau.png',
    'bombe_eau.png',
    'combat_critique', //160
    'combat_critique',
    'combat_critique'
];

module.exports = analyze;


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

var assign = __webpack_require__(75);
var printHTML = __webpack_require__(52);
var Page = __webpack_require__(49);
var nainwak = __webpack_require__(80);
var dom = __webpack_require__(14);
var objetsAnalyzer = __webpack_require__(178);
var analyzePager = __webpack_require__(74);
var Objet = __webpack_require__(166);
var Box = __webpack_require__(167);

function analyze(doc, params, date, context) {
    var objets = objetsAnalyzer.analyzeDocument(doc, date);
    var pager = analyzePager(doc, date);

    context.objets = context.objets || {};
    assign(context.objets, objets);

    if (context.perso) {
        // update the 'perso' bonus data according to the objects in 'inventaire'
        var bonuses = nainwak.bonusObjets(context.objets.inventaire);
        assign(context.perso, bonuses);
        assign(context.perso, pager);
    }

    return {
        objets: objets,
        pager: pager,
        raw: printHTML(doc)
    };
}

function enhance(doc, mounter, context) {
    var actionLinks = dom.findAll('a[href*="action"]', doc);

    actionLinks.forEach(function (actionLink) {
        var container = actionLink.parent().node;
        var objet = objetsAnalyzer.analyzeActionLink(actionLink, context);
        if (objet) {
            mounter.prepend(container, Box(Objet(objet, context)));
        }
    });
}

module.exports = Page('invent', {
    analyze: analyze,
    enhance: enhance
});


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

var array = __webpack_require__(50);
var qs = __webpack_require__(164);
var code = __webpack_require__(51);
var int = __webpack_require__(48);

var listNames = {
    bonnet: 'bonnet',  // objet sous le bonnet
    poser: 'inventaire',  // objet dans l'inventaire, on peut le poser
    ramasser: 'sol',  // objet au sol, on peut le ramasser
    encyclo: 'encyclo',  // objet dans l'encyclo
    fee: 'fee'  // quand on fait une recette ?
};

var idParams = {  // nom du paramètre donnant l'id de l'objet dans certaines actions
    bonnet: 'idbonnet',
    poser: 'idinv',
    ramasser: 'idsol'
};

var typesNames = {
    ARME: 'arme',
    RUNE: 'rune',
    VEHICULE: 'véhicule',
    DETECTEUR: 'détecteur',
    INUTILE: 'inutile',
    MANGER: 'bouffe',
    SPECIAL: 'jouet'
};

function analyzeActionLink(actionLink, context) {
    // extract the query string of the action link
    var query = actionLink.node.search.substring(1);
    var params = qs.parse(query);

    // read the action parameter and determine the target list and objet id
    var action = params['action'];
    var listName = listNames[action];
    var list = context.objets[listName];
    var idParam = idParams[action];
    var id = int(params[idParam]);

    // try to find the objet in the target list
    return array.find(list, function (objet) {
        return objet.id === id;
    });
}

function analyzeDocument(doc/*, date*/) {
    var js = code.getInlineJS(doc);
    var regex = /mip\((.*)\);/ig;
    var keys = 'idtable,nomobjet,photoobjet,descriptionobjet,model,typeobjet,PAutiliser,portee,effet,recharg,PV,PVmax,PAreparer,dispo,PFobj,PPobj,PVobj,PIobj,collant,reparable,poussiere'.split(',');
    var objects = code.buildObjectsFromJSSequences(js, regex, keys);
    var lists = {};

    function getList(model) {
        var listName = listNames[model];
        var list = lists[listName];

        if (list === undefined) {
            list = lists[listName] = [];
        }

        return list;
    }

    objects.forEach(function (object) {
        var list = getList(object.model);

        // des objets "speciaux" de type "arme" ont "???" comme valeur: ils ne
        // font pas de dommages donc on initialize la valeur à 0
        var dommages = object.effet === '???' ? 0 : int(object.effet);

        // cas spécial pour "Tarte à la crème" qui ne suit pas la règle précédente
        if (object.nomobjet === 'Tarte à la crème') {
            dommages = 0;
        }

        list.push({
            id: object.idtable,
            nom: object.nomobjet,
            image: '/images/' + object.photoobjet,
            description: object.descriptionobjet,
            type: typesNames[object.typeobjet],
            PAutiliser: int(object.PAutiliser),
            portee: int(object.portee),
            dommages: dommages,
            rechargement: int(object.recharg),
            PV: int(object.PV),
            PVmax: int(object.PVmax),
            PAreparer: int(object.PAreparer),
            dispo: int(object.dispo),
            forceBonus: int(object.PFobj),
            precisionBonus: int(object.PPobj),
            intelligenceBonus: int(object.PIobj),
            vieBonus: int(object.PVobj),
            collant: object.collant === 'O',
            reparable: object.reparable === 'O',
            poussiere: int(object.poussiere)
        });
    });

    return lists;
}

module.exports = {
    analyzeDocument: analyzeDocument,
    analyzeActionLink: analyzeActionLink
};


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var maquette = __webpack_require__(223);
var classNames = __webpack_require__(224);
var dom = __webpack_require__(14);

function h(/*arguments*/) {
    var properties = arguments[1];

    if (properties && !properties.hasOwnProperty('vnodeSelector') && !Array.isArray(properties) && typeof properties === 'object') {
        var class_ = classNames(properties.class);  // make sure we render the classes to a valid class string
        if (class_) {
            properties.class = class_;
        }
        else {
            delete properties.class;
        }
    }

    return maquette.h.apply(maquette, arguments);
}

h.render = function (child) {
    if (child.render) {
        return child.render(h);
    }

    if (typeof child === 'function') {
        return child(h);
    }

    return child;
};

function Mounter(name) {
    // create a maquette projector for the rendering
    var projector = maquette.createProjector();

    // refresh all the components mounted by this mounter
    function scheduleRender() {
        projector.scheduleRender();
    }

    // method: append / insertBefore / replace / merge
    function mount(method, element, component) {
        // render the virtual DOM tree
        function renderTree() {
            var root = h.render(component) || h('span');
            root.properties = root.properties || {};
            root.properties['data-mounter'] = name || '';
            return root;
        }

        // unmount the component (does not restore the original node)
        function unmount() {
            projector.detach(renderTree);
        }

        // add the component to the projector
        projector[method](element.node, renderTree);

        // return the unmount function
        return unmount;
    }

    // append a component to a parent node
    function append(node, component) {
        return mount('append', dom.Element(node), component);
    }

    // prepend a component to a parent node
    function prepend(node, component) {
        return mount('insertBefore', dom.Element(node).firstChild(), component);
    }

    // replace a node by a component
    function replace(node, component) {
        return mount('replace', dom.Element(node), component);
    }

    return {
        append: append,
        prepend: prepend,
        replace: replace,
        scheduleRender: scheduleRender
    };
}

module.exports = Mounter;


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

var assign = __webpack_require__(75);
var printHTML = __webpack_require__(52);
var Page = __webpack_require__(49);
var nainwak = __webpack_require__(80);
var dom = __webpack_require__(14);
var objetsAnalyzer = __webpack_require__(178);
var analyzePager = __webpack_require__(74);
var Objet = __webpack_require__(166);
var Box = __webpack_require__(167);

function analyze(doc, params, date, context) {
    var objets = objetsAnalyzer.analyzeDocument(doc, date);
    var pager = analyzePager(doc, date);

    context.objets = context.objets || {};
    assign(context.objets, objets);

    if (context.perso) {
        // update the 'perso' bonus data according to the objects in 'inventaire'
        var bonuses = nainwak.bonusObjets(context.objets.inventaire);
        assign(context.perso, bonuses);
        assign(context.perso, pager);
    }

    return {
        objets: objets,
        pager: pager,
        raw: printHTML(doc)
    };
}

function enhance(doc, mounter, context) {
    var actionLinks = dom.findAll('a[href*="action"]', doc);

    actionLinks.forEach(function (actionLink) {
        var container = actionLink.parent().node;
        var objet = objetsAnalyzer.analyzeActionLink(actionLink, context);
        if (objet) {
            mounter.prepend(container, Box(Objet(objet, context)));
        }
    });
}

module.exports = Page('transfert', {
    analyze: analyze,
    enhance: enhance
});


/***/ }),
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(189);


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(190);
__webpack_require__(210);
__webpack_require__(211);
__webpack_require__(233);


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(191);
__webpack_require__(196);
__webpack_require__(200);
__webpack_require__(202);
__webpack_require__(204);
__webpack_require__(206);
__webpack_require__(208);
__webpack_require__(209);


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

var test = __webpack_require__(6);
var analyzeJoueur = __webpack_require__(192);
var parseHTMLDocument = __webpack_require__(37);
var html = __webpack_require__(195);
var now = new Date(1457780950000);

test('analyzers/joueur: analyze', function (assert) {
    var doc = parseHTMLDocument(html);
    var joueur = analyzeJoueur(doc, now);

    assert.strictEqual(joueur.nom, 'Savate', 'nom');
    assert.strictEqual(joueur.avatar, '/images/avatar/perso/8b98d919a61b230e80a80a67d3ea9b80c8212f34.png', 'avatar');
    assert.strictEqual(joueur.ids, undefined, 'ids');  // can't set a location object in our test

    assert.end();
});


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

var qs = __webpack_require__(164);
var dom = __webpack_require__(14);

function getIDS(location) {
    var search = location && location.search;
    return search ? qs.parse(search.substring(1)).IDS : undefined;
}

function analyze(menuDocument/*, date*/) {
    var ids = getIDS(menuDocument.location);
    var tdElements = dom.findAll('.news-titre td', menuDocument);
    var nom = tdElements[1].text();
    var avatar = tdElements[0].find('img').attr('src');

    return {
        nom: nom,
        avatar: avatar,
        ids: ids
    };
}

module.exports = analyze;


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(169);
var formats = __webpack_require__(170);

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var toISO = Date.prototype.toISOString;

var defaults = {
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(stringify(
                obj[key],
                generateArrayPrefix(prefix, key),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        } else {
            values = values.concat(stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        }
    }

    return values;
};

module.exports = function (object, opts) {
    var obj = object;
    var options = opts ? utils.assign({}, opts) : {};

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
    var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;
    if (typeof options.format === 'undefined') {
        options.format = formats['default'];
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        keys = keys.concat(stringify(
            obj[key],
            key,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encode ? encoder : null,
            filter,
            sort,
            allowDots,
            serializeDate,
            formatter,
            encodeValuesOnly
        ));
    }

    var joined = keys.join(delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(169);

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    parameterLimit: 1000,
    plainObjects: false,
    strictNullHandling: false
};

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);

    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder);
            val = options.decoder(part.slice(pos + 1), defaults.decoder);
        }
        if (has.call(obj, key)) {
            obj[key] = [].concat(obj[key]).concat(val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options) {
    var leaf = val;

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]') {
            obj = [];
            obj = obj.concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys
        // that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

module.exports = function (str, opts) {
    var options = opts ? utils.assign({}, opts) : {};

    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    options.ignoreQueryPrefix = options.ignoreQueryPrefix === true;
    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),
/* 195 */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\n<html>\n<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n<link rel=\"stylesheet\" href=\"/css/main.css\" type=\"text/css\">\n<link rel=\"stylesheet\" href=\"/css/cadre1.css\" type=\"text/css\">\n<!--[if IE]>\n<link rel=\"stylesheet\" href=\"/css/ie.css\" type=\"text/css\" />\n<![endif]-->\n<script language=\"Javascript\" src=\"/js/base.js\" type=\"text/javascript\">\n</script>\n<script language=\"Javascript\" type=\"text/javascript\">\nfunction detect() {\n  window.parent.map.location=\"map.php?IDS=b8c296cbef487627e2243d9654ec87c6\";\n}\nfunction aurevoir() {\n  window.top.fermer=\"n\";\n  window.top.location=\"../index.php?IDS=b8c296cbef487627e2243d9654ec87c6\";\n}\n</script>\n<title></title>\n\n<script type=\"text/javascript\" language=\"JavaScript\">\n var classeinterface=1;\n</script>\n</head>\n<body>\n<div class=\"VNT news-titre\"><table style=\"border-collapse:collapse; border: 0px; margin: 0px; padding:0px\"><tr><td><img border=\"0\" style=\"height:32px; width:32px\" src=\"/images/avatar/perso/8b98d919a61b230e80a80a67d3ea9b80c8212f34.png\" /></td><td style=\"vertical-align:middle\">Savate</td></tr></table></div>\n<div class=\"T news-text\"><a href=\"detect.php?IDS=b8c296cbef487627e2243d9654ec87c6\" target=\"info\" onclick=\"detect()\">Détection</a><br />\n<a href=\"deplac.php?IDS=b8c296cbef487627e2243d9654ec87c6\" target=\"info\">Action</a><br />\n<a href=\"invent.php?IDS=b8c296cbef487627e2243d9654ec87c6\" target=\"info\">Inventaire</a><br />\n<a href=\"perso.php?IDS=b8c296cbef487627e2243d9654ec87c6\" target=\"info\">Fiche de perso</a><br />\n<a href=\"even.php?IDS=b8c296cbef487627e2243d9654ec87c6\" target=\"info\">Évènements</a><br />\n<a href=\"chat.php?IDS=b8c296cbef487627e2243d9654ec87c6\" target=\"info\">Messagerie</a><br />\n<a href=\"guilde.php?IDS=b8c296cbef487627e2243d9654ec87c6\" target=\"info\">Guilde</a><br />\n<a href=\"encyclo.php?IDS=b8c296cbef487627e2243d9654ec87c6\" target=\"info\">Encyclopédie</a><br />\n<a href=\"Javascript:aurevoir()\">Retour à l'accueil</a></div>\n<div class=\"TTV news-text\"><a href=\"http://trac.nainwak.com/wiki/Bug\" target=\"info\">Signaler un bug !</a>\n<script language=\"Javascript\" type=\"text/javascript\">\nif ('N'=='O') {\n  document.writeln('<br /><a href=\"pa.php?IDS=b8c296cbef487627e2243d9654ec87c6\" target=\"info\">Je veux plus de PA !<\\/a>');\n  document.writeln('<br /><a href=\"razarme.php?IDS=b8c296cbef487627e2243d9654ec87c6\" target=\"info\">Recharger mes armes<\\/a>');\n}\n</script>\n</div>\n</body>\n</html>\n";

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

var test = __webpack_require__(6);
var analyzePager = __webpack_require__(74);
var parseHTMLDocument = __webpack_require__(37);
var html = __webpack_require__(171);
var now = new Date(1457780950000);

test('analyzers/pager: analyze', function (assert) {
    var doc = parseHTMLDocument(html);
    var pager = analyzePager(doc, now);

    assert.deepEqual(pager, {
        PA: 2,
        vie: 149,
        position: [14, 7],
        messagesNonLus: 0,
        nainxpressNonLu: false
    }, 'pager data');

    assert.end();
});


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

var translation = __webpack_require__(198);

module.exports = function(string) {
    return string.replace(/(&\w+;)/g, function(match) { 
        return translation[match] || 'match';
    }).replace(/&#(\d+);/g, function(match, capture) { 
        return String.fromCharCode(capture);
    }).replace(/&#x([0-9A-F]+);/gi, function(match, capture) {
        return String.fromCharCode(parseInt(capture, 16));
    });
};

/***/ }),
/* 198 */
/***/ (function(module, exports) {

module.exports = {"&quot;":"&#34;","&apos;":"&#39;","&amp;":"&#38;","&lt;":"&#60;","&gt;":"&#62;","&iexcl;":"&#161;","&cent;":"&#162;","&pound;":"&#163;","&curren;":"&#164;","&yen;":"&#165;","&brvbar;":"&#166;","&sect;":"&#167;","&uml;":"&#168;","&copy;":"&#169;","&ordf;":"&#170;","&laquo;":"&#171;","&not;":"&#172;","&shy;":"&#173;","&reg;":"&#174;","&macr;":"&#175;","&deg;":"&#176;","&plusmn;":"&#177;","&sup2;":"&#178;","&sup3;":"&#179;","&acute;":"&#180;","&micro;":"&#181;","&para;":"&#182;","&middot;":"&#183;","&cedil;":"&#184;","&sup1;":"&#185;","&ordm;":"&#186;","&raquo;":"&#187;","&frac14;":"&#188;","&frac12;":"&#189;","&frac34;":"&#190;","&iquest;":"&#191;","&times;":"&#215;","&divide;":"&#247;","&Agrave;":"&#192;","&Aacute;":"&#193;","&Acirc;":"&#194;","&Atilde;":"&#195;","&Auml;":"&#196;","&Aring;":"&#197;","&AElig;":"&#198;","&Ccedil;":"&#199;","&Egrave;":"&#200;","&Eacute;":"&#201;","&Ecirc;":"&#202;","&Euml;":"&#203;","&Igrave;":"&#204;","&Iacute;":"&#205;","&Icirc;":"&#206;","&Iuml;":"&#207;","&ETH;":"&#208;","&Ntilde;":"&#209;","&Ograve;":"&#210;","&Oacute;":"&#211;","&Ocirc;":"&#212;","&Otilde;":"&#213;","&Ouml;":"&#214;","&Oslash;":"&#216;","&Ugrave;":"&#217;","&Uacute;":"&#218;","&Ucirc;":"&#219;","&Uuml;":"&#220;","&Yacute;":"&#221;","&THORN;":"&#222;","&szlig;":"&#223;","&agrave;":"&#224;","&aacute;":"&#225;","&acirc;":"&#226;","&atilde;":"&#227;","&auml;":"&#228;","&aring;":"&#229;","&aelig;":"&#230;","&ccedil;":"&#231;","&egrave;":"&#232;","&eacute;":"&#233;","&ecirc;":"&#234;","&euml;":"&#235;","&igrave;":"&#236;","&iacute;":"&#237;","&icirc;":"&#238;","&iuml;":"&#239;","&eth;":"&#240;","&ntilde;":"&#241;","&ograve;":"&#242;","&oacute;":"&#243;","&ocirc;":"&#244;","&otilde;":"&#245;","&ouml;":"&#246;","&oslash;":"&#248;","&ugrave;":"&#249;","&uacute;":"&#250;","&ucirc;":"&#251;","&uuml;":"&#252;","&yacute;":"&#253;","&thorn;":"&#254;","&yuml;":"&#255;","&forall;":"&#8704;","&part;":"&#8706;","&exist;":"&#8707;","&empty;":"&#8709;","&nabla;":"&#8711;","&isin;":"&#8712;","&notin;":"&#8713;","&ni;":"&#8715;","&prod;":"&#8719;","&sum;":"&#8721;","&minus;":"&#8722;","&lowast;":"&#8727;","&radic;":"&#8730;","&prop;":"&#8733;","&infin;":"&#8734;","&ang;":"&#8736;","&and;":"&#8743;","&or;":"&#8744;","&cap;":"&#8745;","&cup;":"&#8746;","&int;":"&#8747;","&there4;":"&#8756;","&sim;":"&#8764;","&cong;":"&#8773;","&asymp;":"&#8776;","&ne;":"&#8800;","&equiv;":"&#8801;","&le;":"&#8804;","&ge;":"&#8805;","&sub;":"&#8834;","&sup;":"&#8835;","&nsub;":"&#8836;","&sube;":"&#8838;","&supe;":"&#8839;","&oplus;":"&#8853;","&otimes;":"&#8855;","&perp;":"&#8869;","&sdot;":"&#8901;","&Alpha;":"&#913;","&Beta;":"&#914;","&Gamma;":"&#915;","&Delta;":"&#916;","&Epsilon;":"&#917;","&Zeta;":"&#918;","&Eta;":"&#919;","&Theta;":"&#920;","&Iota;":"&#921;","&Kappa;":"&#922;","&Lambda;":"&#923;","&Mu;":"&#924;","&Nu;":"&#925;","&Xi;":"&#926;","&Omicron;":"&#927;","&Pi;":"&#928;","&Rho;":"&#929;","&Sigma;":"&#931;","&Tau;":"&#932;","&Upsilon;":"&#933;","&Phi;":"&#934;","&Chi;":"&#935;","&Psi;":"&#936;","&Omega;":"&#937;","&alpha;":"&#945;","&beta;":"&#946;","&gamma;":"&#947;","&delta;":"&#948;","&epsilon;":"&#949;","&zeta;":"&#950;","&eta;":"&#951;","&theta;":"&#952;","&iota;":"&#953;","&kappa;":"&#954;","&lambda;":"&#955;","&mu;":"&#956;","&nu;":"&#957;","&xi;":"&#958;","&omicron;":"&#959;","&pi;":"&#960;","&rho;":"&#961;","&sigmaf;":"&#962;","&sigma;":"&#963;","&tau;":"&#964;","&upsilon;":"&#965;","&phi;":"&#966;","&chi;":"&#967;","&psi;":"&#968;","&omega;":"&#969;","&thetasym;":"&#977;","&upsih;":"&#978;","&piv;":"&#982;","&OElig;":"&#338;","&oelig;":"&#339;","&Scaron;":"&#352;","&scaron;":"&#353;","&Yuml;":"&#376;","&fnof;":"&#402;","&circ;":"&#710;","&tilde;":"&#732;","&ensp;":"&#8194;","&emsp;":"&#8195;","&thinsp;":"&#8201;","&zwnj;":"&#8204;","&zwj;":"&#8205;","&lrm;":"&#8206;","&rlm;":"&#8207;","&ndash;":"&#8211;","&mdash;":"&#8212;","&lsquo;":"&#8216;","&rsquo;":"&#8217;","&sbquo;":"&#8218;","&ldquo;":"&#8220;","&rdquo;":"&#8221;","&bdquo;":"&#8222;","&dagger;":"&#8224;","&Dagger;":"&#8225;","&bull;":"&#8226;","&hellip;":"&#8230;","&permil;":"&#8240;","&prime;":"&#8242;","&Prime;":"&#8243;","&lsaquo;":"&#8249;","&rsaquo;":"&#8250;","&oline;":"&#8254;","&euro;":"&#8364;","&trade;":"&#8482;","&larr;":"&#8592;","&uarr;":"&#8593;","&rarr;":"&#8594;","&darr;":"&#8595;","&harr;":"&#8596;","&crarr;":"&#8629;","&lceil;":"&#8968;","&rceil;":"&#8969;","&lfloor;":"&#8970;","&rfloor;":"&#8971;","&loz;":"&#9674;","&spades;":"&#9824;","&clubs;":"&#9827;","&hearts;":"&#9829;","&diams;":"&#9830;"}

/***/ }),
/* 199 */
/***/ (function(module, exports) {

var zipObject = function (keys, values) {
  if (arguments.length == 1) {
    values = keys[1];
    keys = keys[0];
  }
    
  var result = {};
  var i = 0;
  
  for (i; i < keys.length; i += 1) {
    result[keys[i]] = values[i];
  }
  
  return result;
};

module.exports = zipObject;

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

var test = __webpack_require__(6);
var analyzeDetection = __webpack_require__(172);
var parseHTMLDocument = __webpack_require__(37);
var html = __webpack_require__(201);
var now = new Date(1457780950000);

test('analyzers/detection: analyze', function (assert) {
    var doc = parseHTMLDocument(html);
    var detection = analyzeDetection(doc, now);

    // localisation
    assert.deepEqual(detection.position, [13, 5], 'position');
    assert.strictEqual(detection.monde, 'Monde des sadiques', 'monde');

    // nains
    var nains = detection.nains;

    assert.strictEqual(nains.length, 3, 'nombre de nains');

    // ["33966", "avatar_guilde/41ddb8ad2c2be408e27352accf1cc0b6559466bb.png", "Le PheniX", '[Gnouille] [<span style="color:#91005D;">#!</span>]', "13799", "2", "Diablotin(e)", "0", "13", "5", "&quot;Le PheniX est un oiseau qui symbolise l&#039;immortalité et la résurrection.&quot; A quoi bon me tuer ?!?", "o", "o", "0"];
    assert.deepEqual(nains[0], {
        id: 33966,
        nom: 'Le PheniX',
        image: '/images/avatar_guilde/41ddb8ad2c2be408e27352accf1cc0b6559466bb.png',
        description: "\"Le PheniX est un oiseau qui symbolise l'immortalité et la résurrection.\" A quoi bon me tuer ?!?",
        position: [13, 5],
        classe: 2,
        rang: 'Diablotin(e)',
        barbe: 137.99,
        tag: {
            guilde: {
                nom: '#!',
                couleur: '#91005D'
            },
            perso: 'Gnouille',
            type: 3
        },
        attaquable: true,
        autreAction: 'gifler',
        estCible: false
    }, 'nain 1');

    // ["33924", "avatar/perso/dab064da974199a53f0e22527f901d523e8869b3.png", "Nainkomp'", '[Perso]', "10314", "2", "Cancre (nain-culte)", "1", "14", "5", "Description", "o", "", "1"];
    assert.deepEqual(nains[1], {
        id: 33924,
        nom: "Nainkomp'",
        image: '/images/avatar/perso/dab064da974199a53f0e22527f901d523e8869b3.png',
        description: 'Description',
        position: [14, 5],
        classe: 2,
        rang: 'Cancre (nain-culte)',
        barbe: 103.14,
        tag: {
            perso: 'Perso'
        },
        attaquable: true,
        autreAction: undefined,
        estCible: true
    }, 'nain 2');

    // ["71985", "avatar/choix/TOsmuf4.gif", "Bimme65", '', "0", "3", "Rampant Nain-déci", "2", "13", "6", "Bimme65", "", "", "0"];
    assert.deepEqual(nains[2], {
        id: 71985,
        nom: 'Bimme65',
        image: '/images/avatar/choix/TOsmuf4.gif',
        description: 'Bimme65',
        position: [13, 6],
        classe: 3,
        rang: 'Rampant Nain-déci',
        barbe: 0,
        tag: {},
        attaquable: false,
        autreAction: undefined,
        estCible: false
    }, 'nain 3');

    // objets
    var objets = detection.objets;

    assert.strictEqual(objets.length, 3, "nombre d'objets");

    // [3613899, "objets/jouetkinder2_2.gif", "Surprise de Kine d&#039;Heure", 1, 13, 6, "INUTILE", 1271419];
    assert.deepEqual(objets[0], {
        id: 3613899,
        nom: "Surprise de Kine d'Heure",
        image: '/images/objets/jouetkinder2_2.gif',
        type: 'inutile',
        position: [13, 6],
        poussiere: 1271419
    }, 'objet 1');

    //tabobjet[2] = [3613897, "objets/banane_sauteuse.gif", "Banane sauteuse", 1, 13, 6, "VEHICULE", 1271419];
    assert.deepEqual(objets[1], {
        id: 3613897,
        nom: 'Banane sauteuse',
        image: '/images/objets/banane_sauteuse.gif',
        type: 'vehicule',
        position: [13, 6],
        poussiere: 1271419
    }, 'objet 2');

    //tabobjet[3] = [3613896, "objets/naindiana.gif", "Panoplie de Naindiana Jones", 2, 13, 7, "RUNE", 1271419];
    assert.deepEqual(objets[2], {
        id: 3613896,
        nom: 'Panoplie de Naindiana Jones',
        image: '/images/objets/naindiana.gif',
        type: 'rune',
        position: [13, 7],
        poussiere: 1271419
    }, 'objet 3');

    assert.end();
});


/***/ }),
/* 201 */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">\n<html>\n<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n<link rel=\"stylesheet\" href=\"/css/main.css\" type=\"text/css\">\n<script language=\"JavaScript\" src=\"/js/scriptaculous/prototype.js\" type=\"text/javascript\">\n</script>\n<script language=\"JavaScript\" src=\"/js/cookie.js\" type=\"text/javascript\">\n</script>\n<script language=\"JavaScript\" src=\"/js/base.js\" type=\"text/javascript\">\n</script>\n<script language=\"JavaScript\" src=\"/js/detec.js\" type=\"text/javascript\">\n</script>\n<script language=\"JavaScript\" type=\"text/javascript\">\n  if ((typeof Detect=='undefined') ||\n      (Detect.Version<'2.2.0'))\n    alert(\"Vous avez une vieille version de detec.js, merci de vider votre cache\");\n</script>\n<title></title>\n<!--[if lt IE 6]>\n<style type=\"text/css\">\nspan.clickable label{ cursor: hand;}\n</style>\n<![endif]-->\n<style type=\"text/css\">\ntd img {\n  width: 32px;\n  height: 32px;\n}\nspan.c1 {display: none;}\nspan.clickable label {\n  cursor: pointer;\n}\nspan.clickable input { width:0;}\nspan.clickable input:not([Nainwak]){ display: none;}\nspan.clickable label:hover { text-decoration: underline;}\nspan.clickable input:checked+label { text-decoration: underline;}\nlabel.checked { text-decoration: underline;}\nspan.clickable label.hover { text-decoration: underline;}\n.macible {\n  color: red;\n  font-weight: bold;\n}\n</style>\n<script language=\"javascript\" type=\"text/javascript\">\nfunction gtc(x, y) {\n  document.location=\"deplac.php?IDS=92a51ee8dfdff4622ddcd222426797c0&destx=\"+x+\"&desty=\"+y;\n}\n\nvar ab=0;\nfunction gifler(id) {\n  if (ab==0) {\n    window.location.href=\"gifler.php?IDS=92a51ee8dfdff4622ddcd222426797c0&id=\"+id;\n    ab=1;\n    return true;\n  } else {\n    return false;\n  }\n}\nvar classeinterface=2;\nvar IDS=\"92a51ee8dfdff4622ddcd222426797c0\";\nvar classejoueur=Math.min(4, classeinterface);\n\nvar tabobjet=new Array();\nvar tabavat=new Array();\n\ntabavat[1] = [\"33966\", \"avatar_guilde/41ddb8ad2c2be408e27352accf1cc0b6559466bb.png\", \"Le PheniX\", '[Gnouille] [<span style=\"color:#91005D;\">#!</span>]', \"13799\", \"2\", \"Diablotin(e)\", \"0\", \"13\", \"5\", \"&quot;Le PheniX est un oiseau qui symbolise l&#039;immortalité et la résurrection.&quot; A quoi bon me tuer ?!?\", \"o\", \"o\", \"0\"];\ntabavat[2] = [\"33924\", \"avatar/perso/dab064da974199a53f0e22527f901d523e8869b3.png\", \"Nainkomp'\", '[Perso]', \"10314\", \"2\", \"Cancre (nain-culte)\", \"1\", \"14\", \"5\", \"Description\", \"o\", \"\", \"1\"];\ntabavat[3] = [\"71985\", \"avatar/choix/TOsmuf4.gif\", \"Bimme65\", '', \"0\", \"3\", \"Rampant Nain-déci\", \"2\", \"13\", \"6\", \"Bimme65\", \"\", \"\", \"0\"];\n\ntabobjet[1] = [3613899, \"objets/jouetkinder2_2.gif\", \"Surprise de Kine d&#039;Heure\", 1, 13, 6, \"INUTILE\", 1271419];\ntabobjet[2] = [3613897, \"objets/banane_sauteuse.gif\", \"Banane sauteuse\", 1, 13, 6, \"VEHICULE\", 1271419];\ntabobjet[3] = [3613896, \"objets/naindiana.gif\", \"Panoplie de Naindiana Jones\", 2, 13, 7, \"RUNE\", 1271419];\n\n</script>\n\n<script type=\"text/javascript\" language=\"JavaScript\">\n var classeinterface=2;\n</script>\n</head>\n<body onunload=\"JavaScript: if(window.parent.map.pluscible) window.parent.map.pluscible();\">\n<p class=\"erreur\"></p>\n<span class=\"c1\">Position (13,5) sur \"Monde des sadiques\"\n|51932a18b199c5ade|</span>\n<div id=\"select_type\" class=\"sous-titre\">\n  <span class=\"clickable\" id=\"s_tout\"><input type=\"radio\" name=\"r_type\" id=\"fd_tout\" value=\"tout\"><label for=\"fd_tout\" onclick=\"clickLabel(this)\">Tout</label></span>\n  <span class=\"clickable\" id=\"s_nain\">| <input type=\"radio\" name=\"r_type\" id=\"fd_nain\" value=\"nain\"><label for=\"fd_nain\" onclick=\"clickLabel(this)\">Les nains</label></span>\n  <span class=\"clickable\" id=\"s_objet\">| <input type=\"radio\" name=\"r_type\" id=\"fd_objet\" value=\"objet\"><label for=\"fd_objet\" onclick=\"clickLabel(this)\">Les objets</label></span>\n  <span class=\"clickable\" id=\"s_cible\" style=\"display: none;\">| <input type=\"radio\" name=\"r_type\" id=\"fd_macible\" value=\"macible\"><label for=\"fd_macible\" onclick=\"clickLabel(this)\" class=\"macible\">Ma Cible</label></span>\n</div>\n<div id=\"select_categorie\" class=\"sous-titre\" style=\"display: none;\">\n<span class=\"clickable\" id=\"s_toutes\"><input type=\"radio\" name=\"r_categorie\" id=\"fd_-1\" value=\"-1\"><label for=\"fd_-1\" onclick=\"clickLabel(this)\">Tous</label></span>\n<span id=\"select_nain\">\n  <span class=\"clickable\" id=\"s_brave\">| <input type=\"radio\" name=\"r_categorie\" id=\"fd_2\" value=\"2\"><label for=\"fd_2\" onclick=\"clickLabel(this)\">Les braves</label></span>\n  <span class=\"clickable\" id=\"s_sadique\">| <input type=\"radio\" name=\"r_categorie\" id=\"fd_3\" value=\"3\"><label for=\"fd_3\" onclick=\"clickLabel(this)\">Les sadiques</label></span>\n  <span class=\"clickable\" id=\"s_rampant\">| <input type=\"radio\" name=\"r_categorie\" id=\"fd_4\" value=\"4\"><label for=\"fd_4\" onclick=\"clickLabel(this)\">Les rampants</label></span>\n  <span class=\"clickable\" id=\"s_nain_deci\">| <input type=\"radio\" name=\"r_categorie\" id=\"fd_1\" value=\"1\"><label for=\"fd_1\" onclick=\"clickLabel(this)\">Les nains-déci</label></span>\n</span>\n<span id=\"select_objet\" class=\"sous-titre\">\n  <span class=\"clickable\" id=\"s_arme\">| <input type=\"radio\" name=\"r_categorie\" id=\"fd_ARME\" value=\"ARME\"><label for=\"fd_ARME\" onclick=\"clickLabel(this)\">Les armes</label></span>\n  <span class=\"clickable\" id=\"s_rune\">| <input type=\"radio\" name=\"r_categorie\" id=\"fd_RUNE\" value=\"RUNE\"><label for=\"fd_RUNE\" onclick=\"clickLabel(this)\">Les runes</label></span>\n  <span class=\"clickable\" id=\"s_vehicule\">| <input type=\"radio\" name=\"r_categorie\" id=\"fd_VEHICULE\" value=\"VEHICULE\"><label for=\"fd_VEHICULE\" onclick=\"clickLabel(this)\">Les véhicules</label></span>\n  <span class=\"clickable\" id=\"s_detecteur\">| <input type=\"radio\" name=\"r_categorie\" id=\"fd_DETECTEUR\" value=\"DETECTEUR\"><label for=\"fd_DETECTEUR\" onclick=\"clickLabel(this)\">Les détecteurs</label></span>\n  <span class=\"clickable\" id=\"s_inutile\">| <input type=\"radio\" name=\"r_categorie\" id=\"fd_INUTILE\" value=\"INUTILE\"><label for=\"fd_INUTILE\" onclick=\"clickLabel(this)\">Les inutiles</label></span>\n  <span class=\"clickable\" id=\"s_bouffe\">| <input type=\"radio\" name=\"r_categorie\" id=\"fd_MANGER\" value=\"MANGER\"><label for=\"fd_MANGER\" onclick=\"clickLabel(this)\">Les bouffes</label></span>\n  <span class=\"clickable\" id=\"s_joujou\">| <input type=\"radio\" name=\"r_categorie\" id=\"fd_SPECIAL\" value=\"SPECIAL\"><label for=\"fd_SPECIAL\" onclick=\"clickLabel(this)\">Les jouets de Schlavbeuk</label></span>\n</span>\n</div>\n<br />\n<div id=\"pagedetect\"></div>\n<script language=\"JavaScript\" type=\"text/javascript\" defer=\"defer\">\n  miseajourpager('12', '242', '242', 'evenpagerlu', '?', 'chatpagerlu', '0', '13', '5', '92a51ee8dfdff4622ddcd222426797c0', 'NainXpress');\n  \n  \ninitdetect();\n</script>\n</body>\n<!--[if lte IE 8]>\n<script language=\"Javascript\" type=\"text/javascript\">\nfunction RadioClick(event) {\n  var l=event.element().adjacent(\"label\")[0];\n  if (event.element().checked) {\n    l.addClassName(\"checked\");\n  } else {\n    l.removeClassName(\"checked\");\n  }\n}\nfunction Radiohover(event){\n  event.element().addClassName(\"hover\");\n  event.stop();\n  return false;\n}\nfunction Radioout(event){\n  event.element().removeClassName(\"hover\");\n  event.stop();\n  return false;\n}\n$$(\"span.clickable label\").invoke('observe', 'mouseover', Radiohover).invoke('observe','mouseout', Radioout);\n$$(\"span.clickable input\").invoke('observe', 'propertychange', RadioClick);\n</script>\n<![endif]-->\n</html>\n";

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

var test = __webpack_require__(6);
var analyzePerso = __webpack_require__(174);
var createPerso = __webpack_require__(165);
var parseHTMLDocument = __webpack_require__(37);
var html = __webpack_require__(203);
var now = new Date(1457780950000);

test('analyzers/perso: analyze', function (assert) {
    var doc = parseHTMLDocument(html);
    var perso = analyzePerso(doc, now);

    assert.deepEqual(perso, createPerso(), 'perso data');

    assert.end();
});


/***/ }),
/* 203 */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">\n<html>\n<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n<title></title>\n<link rel=\"stylesheet\" href=\"/css/main.css\" type=\"text/css\">\n<link rel=\"stylesheet\" href=\"/css/cadre1.css\" type=\"text/css\">\n<!--[if IE]>\n<link rel=\"stylesheet\" href=\"/css/ie.css\" type=\"text/css\" />\n<![endif]-->\n<style type=\"text/css\">\n.plus {\n  background-image: url(\"/images/interface/add.png\");\n  width: 16px;\n  height: 16px;\n}\n.moins {\n  background-image: url(\"/images/interface/del.png\");\n  width: 16px;\n  height: 16px;\n}\n.clef {\n  background-image: url(\"/images/interface/clef.png\");\n  width: 16px;\n  height: 16px;\n  display: inline-block;\n}\n.bloc_droit { text-align: right; padding-right: 6px;}\n#sPV, #sForce, #sPrecis, #sIntell, #sPG {font-weight: bold}\n#sDescription {font-style: italic}\n</style>\n<script src=\"/js/scriptaculous/prototype.js\" type=\"text/javascript\">\n</script>\n<script language=\"Javascript\" type=\"text/javascript\">\nvar cotes = [\"naindeci\", \"gentil\", \"mechant\", \"rampant\", , , , \"mutant\"];\nvar IDS = '2a067e7f51edfef55755149fc952a435';\nvar nbtrain = 1;\nvar ab = 0;\nvar tagGuilde = 'Gorgones';\nvar couleurTagGuilde = '#da6400';\nvar description = 'Quitte à taper un petit level, tapez Rêveur ! Gagnant de la palme d&#039;or du meilleur nom de nain.';\nfunction init() {\n  if (tagGuilde=='') $('f_typeTag').disable();\n  if ('fade976ec961a21e13af618e54476d1a5c285d7a.png'=='') $('f_typeAvatar1').disable();\n  clef();\n  $('sDescription').innerHTML = (description=='')? '(pas de description)' : description;\n  $('sBarbe').innerHTML = (6806/100).toLocaleString();\n  $('sRang').addClassName(cotes[1]);\n  $('sPV').innerHTML = (99+39);\n  $('sPVBase').innerHTML = (109+39);\n  $('sBVie').innerHTML = ((39>=0)? '+' : '')+'39';\n  $('sForce').innerHTML = (31+-27);\n  $('sBForce').innerHTML = ((-27>=0)? '+' : '')+'-27';\n  $('sPrecis').innerHTML = (310+0);\n  $('sBPrecis').innerHTML = ((0>=0)? '+' : '')+'0';\n  $('sIntell').innerHTML = (90+22);\n  $('sBIntell').innerHTML = ((22>=0)? '+' : '')+'22';\n  $('sPG').innerHTML = (0+1);\n  $('sRangCible').addClassName(cotes[2]);\n  $('sBarbeCible').innerHTML = (6168/100).toLocaleString();\n  $('sBarbeChass').innerHTML = (5480/100).toLocaleString();\n}\nfunction tagChange() {\n  var typeTag = $F('f_typeTag');\n  var tagPerso = $F('f_tag').replace(/(<([^>]+)>)/ig, '');\n  var sTag = '';\n  switch (typeTag) {\n  case '1':\n    sTag = tagPerso+'<span style=\"color:'+couleurTagGuilde+'\">'+tagGuilde+'</span>';\n    break;\n  case '2':\n    sTag = '<span style=\"color:'+couleurTagGuilde+'\">'+tagGuilde+'</span>'+tagPerso;\n    break;\n  case '3':\n    sTag = tagPerso+'][<span style=\"color:'+couleurTagGuilde+'\">'+tagGuilde+'</span>';\n    break;\n  case '4':\n    sTag = '<span style=\"color:'+couleurTagGuilde+'\">'+tagGuilde+'</span>]['+tagPerso;\n    break;\n  default:\n    sTag = tagPerso;\n    break;\n  }\n  $('s_Tag').innerHTML = '['+sTag+']';\n}\nfunction train(c) {\n  if (ab==0) {\n    if (c==1) window.location.href=\"train.php?IDS=\"+IDS+\"&t=PV&nb=\"+nbtrain;\n    if (c==2) window.location.href=\"train.php?IDS=\"+IDS+\"&t=PF&nb=\"+nbtrain;\n    if (c==3) window.location.href=\"train.php?IDS=\"+IDS+\"&t=PP&nb=\"+nbtrain;\n    if (c==4) window.location.href=\"train.php?IDS=\"+IDS+\"&t=PI&nb=\"+nbtrain;\n    if (c==5) window.location.href=\"redemp.php?IDS=\"+IDS;\n    ab = 1;\n    return true;\n  } else return false;\n}\nfunction clef(action) {\n  $('action').setValue(action);\n  $('b_tag', 'b_nom', 'b_des', 'b_arme', 'b_img', 'b_img2', 'b_maj').invoke('hide');\n  switch(action) {\n  case 'img':\n    $('b_img', 'b_img2', 'b_maj').invoke('show');\n    break;\n  case 'des':\n    $('b_des', 'b_maj').invoke('show');\n    break;\n  case 'nom':\n    $('b_nom', 'b_maj').invoke('show');\n    break;\n  case 'tag':\n    $('b_tag', 'b_maj').invoke('show');\n    break;\n  case 'arme':\n    $('b_arme', 'b_maj').invoke('show');\n    break;\n  default :\n    break;\n  }\n}\n</script>\n\n<script type=\"text/javascript\" language=\"JavaScript\">\n var classeinterface=1;\n</script>\n</head>\n<body onload=\"init()\">\n<div class=\"erreur\"></div>\n<table border=\"0\">\n<tr>\n<td><div class=\"VNT news-titre\"><table width=\"100%\"><tr><td align=\"left\"><img src=\"/images/avatar_guilde/fade976ec961a21e13af618e54476d1a5c285d7a.png\"><div class=\"clef coul\" onclick=\"clef('img')\"></div></td><td align=\"center\" class=\"news-titre\"><b><span id=\"s_Tag\">[Hosse<span style=\"color:#DA6400;\">Gorgones</span>]</span><div class=\"clef coul\" onclick=\"clef('tag')\"></div> Palme<div class=\"clef coul\" onclick=\"clef('nom')\"></div></b></table></div>\n<div class=\"T news-text\" align=\"center\"><b><span id=\"sRang\">Ami(e) des nains-béciles (des bêtes)</span>, Longueur de la barbe <span id=\"sBarbe\"></span>cm</b></div>\n<div class=\"T news-text\">Armé de ton(ta) Tuba [perso]<div class=\"clef coul\" onclick=\"clef('arme')\"></div></div>\n<div class=\"T news-text\"><span id=\"sDescription\"></span><div class=\"clef coul\" onclick=\"clef('des')\"></div></div>\n<div class=\"TTV news-text\">\n<table class=\"bloc-perso\">\n  <tr><td class=\"bloc_droit\">Points de Vie</td><td align=\"left\"><span id=\"sPV\"></span>/<span id=\"sPVBase\"></span> [109 <span id=\"sBVie\"></span>]</td><td><div class=\"plus coul\" onclick=\"train(1)\"></div></td><td>(coût : 18 points d'XP)</td></tr>\n  <tr><td colspan=\"4\">&nbsp;</td></tr>\n  <tr><td class=\"bloc_droit\">Force</td><td align=\"left\"><span id=\"sForce\"></span> [31 <span id=\"sBForce\"></span>]</td><td><div class=\"plus coul\" onclick=\"train(2)\"></div></td><td>(coût : 18 points d'XP)</td></tr>\n  <tr><td class=\"bloc_droit\">Précision</td><td align=\"left\"><span id=\"sPrecis\"></span> [310 <span id=\"sBPrecis\"></span>]</td><td><div class=\"plus coul\" onclick=\"train(3)\"></div></td><td>(coût : 18 points d'XP)</td></tr>\n  <tr><td class=\"bloc_droit\">Intelligence</td><td align=\"left\"><span id=\"sIntell\"></span> [90 <span id=\"sBIntell\"></span>]</td><td><div class=\"plus coul\" onclick=\"train(4)\"></div></td><td>(coût : 18 points d'XP)</td></tr>\n  <tr><td colspan=\"2\">&nbsp;</td><td align=\"center\">X</td><td><input type=\"texte\" maxlength=\"2\" style=\"width: 2em\" value=\"1\" onchange=\"Javascript:nbtrain=this.value;\">entrainement(s)</td></tr>\n  <tr><td class=\"bloc_droit\">Points d'Honneur</td><td align=\"left\" colspan=\"3\"><span id=\"sPG\"></span> [0 +1]</td></tr>\n  <tr><td class=\"bloc_droit\">Points de Côté</td><td align=\"left\" colspan=\"3\"><b>13</b></td></tr>\n  <tr><td class=\"bloc_droit\">Points de Ridicule</td><td align=\"left\" colspan=\"3\"><b>1</b></td></tr>\n  <tr><td class=\"bloc_droit\">Points de Honte</td><td align=\"left\"><b>0</b></td>\n  <script language=\"Javascript\" type=\"text/javascript\">\n    document.writeln('<td'+((0>0)? '><div class=\"moins coul\" onclick=\"train(5)\"></div></td><td>(coût : 2 points d\\'honneur)' : ' colspan=\"2\">')+'</td>');\n  </script>\n  </tr>\n  <tr><td class=\"bloc_droit\">Points d'XP</td><td align=\"left\" colspan=\"3\"><b>5</b></td></tr>\n  <tr><td colspan=\"4\">&nbsp;</td></tr>\n  <tr><td class=\"bloc_droit\">Nombre d'ennemis tués</td><td align=\"left\" colspan=\"3\"><b>16</b></td></tr>\n  <tr><td class=\"bloc_droit\">Nombre de morts</td><td align=\"left\" colspan=\"3\"><b>2</b></td></tr>\n  <tr><td class=\"bloc_droit\">Nombre de gifles données</td><td align=\"left\" colspan=\"3\"><b>186</b></td></tr>\n  <tr><td class=\"bloc_droit\">Nombre de gifles reçues</td><td align=\"left\" colspan=\"3\"><b>0</b></td></tr>\n  <tr><td colspan=\"4\">&nbsp;</td></tr>\n  <tr><td class=\"bloc_droit\" valign=\"top\">Votre cible</td><td align=\"left\" class=\"cible\" colspan=\"3\">Nelson<br><span id=\"sRangCible\">Cancre (nain-culte)</span><br>Longueur de la barbe&nbsp;:&nbsp;<span id=\"sBarbeCible\"></span>cm</td></tr>\n  <tr><td class=\"bloc_droit\">Nombre de chasseurs</td><td align=\"left\" colspan=\"3\"><b>2 (Longueur moyenne de la barbe&nbsp;:&nbsp;<span id=\"sBarbeChass\"></span>cm)</b></td></tr>\n</table>\n</div></td>\n<td width=\"20\">&nbsp;</td>\n<td>\n<form enctype=\"multipart/form-data\" action=\"perso.php\" method=\"post\">\n<input type=\"hidden\" name=\"MAX_FILE_SIZE\" value=\"4096\">\n<input type=\"hidden\" name=\"action\" id=\"action\" value=\"\">\n<input type=\"hidden\" name=\"IDS\" value=\"2a067e7f51edfef55755149fc952a435\">\n<table class=\"text-normal\" border=\"0\">\n<tr id=\"b_tag\"><td class=\"bloc_droit\">Tag perso</td>\n<td><input type=\"text\" name=\"tag\" id=\"f_tag\" value=\"Hosse\" style=\"width: 10em\" maxlength=\"10\" onchange=\"tagChange()\"></td>\n<td><select name=\"typeTag\" id=\"f_typeTag\" onchange=\"tagChange()\">\n    <option value=\"1\" selected=\"selected\">[PersoGuilde]</option>\n    <option value=\"2\" >[GuildePerso]</option>\n    <option value=\"3\" >[Perso][Guilde]</option>\n    <option value=\"4\" >[Guilde][Perso]</option>\n  </select></td>\n</tr>\n<tr id=\"b_nom\">\n<td class=\"bloc_droit\">Nom du nain</td>\n<td colspan=\"2\"><input type=\"text\" name=\"nvNain\" size=\"40\" maxlength=\"40\" value=\"Palme\"></td>\n</tr>\n<tr id=\"b_des\">\n<td class=\"bloc_droit\">Description</td>\n<td colspan=\"2\"><input type=\"text\" name=\"description\" size=\"40\" value=\"Quitte à taper un petit level, tapez Rêveur ! Gagnant de la palme d&#039;or du meilleur nom de nain.\"></td>\n</tr>\n<tr id=\"b_arme\">\n<td class=\"bloc_droit\">Arme perso</td>\n<td><input type=\"text\" name=\"nomArme\" size=\"40\" maxlength=\"40\" value=\"Tuba\"></td>\n<td>(<i>ne pas mettre d'article</i>)</td>\n</tr>\n<tr id=\"b_img\"><td class=\"bloc_droit\">Image perso</td>\n<td><input type=\"file\" name=\"userfile\" style=\"width: 20em\"></td>\n<td>(<i>ne pas mettre d'URL</i>)</td>\n</tr>\n<tr id=\"b_img2\"><td></td>\n<td><input type=\"radio\" name=\"typeAvatar\" id=\"f_typeAvatar1\" value=\"O\" checked=\"checked\" /><label for=\"f_typeAvatar1\"><img src=\"/images/avatar_guilde/fade976ec961a21e13af618e54476d1a5c285d7a.png\" alt=\"L'avatar de la guilde\"></label></td>\n<td><input type=\"radio\" name=\"typeAvatar\" id=\"f_typeAvatar2\" value=\"N\"  /><label for=\"f_typeAvatar2\"><img src=\"/images/avatar/choix/Wallace.gif\" alt=\"L'avatar perso\"></label></td>\n</tr>\n<tr id=\"b_maj\">\n<td colspan=\"3\"><input type=\"submit\" value=\"Mettre à jour mes options\"></td>\n</tr>\n</table>\n</td>\n</tr>\n</table>\n<script language=\"Javascript\" type=\"text/javascript\">\n\n\n</script>\n</body>\n</html>\n\n";

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

var test = __webpack_require__(6);
var encycloAnalyzer = __webpack_require__(175);
var parseHTMLDocument = __webpack_require__(37);
var html = __webpack_require__(205);

test('analyzers/encyclo: analyzeListDocument', function (assert) {
    var doc = parseHTMLDocument(html);
    var encyclo = encycloAnalyzer.analyzeListDocument(doc);

    assert.strictEqual(encyclo.length, 250, 'number of elements in encyclo');

    assert.deepEqual(encyclo[0], {
        id: 34,
        nom: 'Ampli',
        types: ['arme']
    }, 'Ampli at index 0');

    assert.deepEqual(encyclo[232], {
        id: 355,
        nom: "Kine d'Heure",
        types: ['jouet', 'bouffe']
    }, "Kine d'Heure at index 232");

    assert.deepEqual(encyclo[248], {
        id: 461,
        nom: 'Super potion sonore',
        types: ['jouet', 'arme']
    }, 'Super potion sonore at index 248');

    assert.end();
});


/***/ }),
/* 205 */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">\n<html>\n<head>\n<link rel=\"stylesheet\" href=\"/css/main.css\" type=\"text/css\">\n<script language=\"JavaScript\" src=\"/js/base.js\" type=\"text/javascript\">\n</script>\n<script language=\"JavaScript\" type=\"text/javascript\">\nfunction detailobj(idobj) {\n  window.parent.encycl_detail.location=\"detailobj.php?IDS=cc1bebb652287e1ddbf4c73077a795ab&idobjet=\"+idobj;\n}\n</script>\n<title></title>\n\n<script type=\"text/javascript\" language=\"JavaScript\">\n var classeinterface=1;\n</script>\n</head>\n<body>\n<p class=\"erreur\"></p>\n<p>[A]rme (55 soit 52.8 %)<br>\n[R]une (39 soit 50.6 %)<br>\n[V]éhicule (27 soit 51.9 %)<br>\n[D]étecteur (18 soit 66.6 %)<br>\n[I]nutile (64 soit 51.2 %)<br>\n[B]ouffe (32 soit 65.3 %)<br>\n[J]ouet de Schlavbeuk (23 soit 47.9 %)<br></p>\n<script language=\"Javascript\" type=\"text/javascript\">\nmep_debut('border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\"');\nmep(0);\nmep(11,'Encyclopédie');\nmep(1);\nmep(16,'[A] <b><a href=\"JavaScript:detailobj(34)\">Ampli</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(2)\">Arbalète</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(55)\">Arquebuse naine</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(70)\">Batte de baseball</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(48)\">Blaster en plastique</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(5)\">Boomrang à réaction</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(4)\">Boomrang classique</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(23)\">Boomrang de glace</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(72)\">Boomrang en polystyrène</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(6)\">Boomrang feu</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(58)\">Calculette rétro-éclairée</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(46)\">Canon</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(24)\">Clef anglaise</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(60)\">Combo &quot;Ouh un ours !&quot; + &quot;Coup de pied au cul&quot;</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(35)\">Coup de pied au cul</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(49)\">Crabe polarisé</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(67)\">Cri de guerre</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(53)\">Crosse de hockey</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(7)\">Desert eagle</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(51)\">Donut géant radioactif</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(47)\">Epée à 2 balles</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(57)\">Fouet de tortue-re</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(16)\">Fourchette</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(74)\">Fusil à pompe</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(44)\">Gant de boxe</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(8)\">Glaive des gentils</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(10)\">Glaive des méchants</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(9)\">Glaive en or</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(22)\">Grille-pain à propulsion programmée</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(28)\">Hache</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(52)\">Lampe de poche à nions</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(3)\">Lance-bananes</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(77)\">Lance-François</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(83)\">Lance-Requête</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(79)\">Les bottes de convocations d&#039;Herr  Moroïd</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(32)\">Machette de Darth Vador</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(30)\">Machette de Jack l&#039;éventreur</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(50)\">Mug brûlant</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(78)\">Oreiller</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(71)\">Pelle</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(20)\">Porte-manteaux-boomrang</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(18)\">Radis acide</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(29)\">Revolver 6 coups</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(65)\">Rouleau à patisserie</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(17)\">Salière qui tue</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(19)\">Seringue au rhûme</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(66)\">Tabouret voltigeur</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(59)\">Télécommande infrarouge</a></b>');mep(16,'[A] <b><a href=\"JavaScript:detailobj(68)\">Tronçonneuse d&#039;Orangina rouge</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(133)\">Ampoule</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(107)\">Beaujolais nouveau</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(132)\">Boîte à IDM</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(97)\">Boîte à Outils</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(153)\">boite d&#039;épinard</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(119)\">Bonzaï</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(117)\">Carpette de loup des bouais</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(146)\">Casque de chantier</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(85)\">Casque viking</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(104)\">CD-ROM</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(94)\">Chapeau de magicien</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(115)\">Chaussure de tennis</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(86)\">Cheese-burger</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(151)\">Choli Japeau Rigolo</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(116)\">Couronne</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(109)\">Disque laser de Dorothée</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(90)\">Grimoire magique</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(441)\">Guide de Chapinologie</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(134)\">Guitare Acoustique</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(124)\">Guitare électrique</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(135)\">Guitare électrique Ibanez</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(136)\">Guitare électrique Strato</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(126)\">Haltères</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(106)\">L&#039;ABC d&#039;aire</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(91)\">Laboratoire du petit chimiste</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(89)\">Le Kamasutra en 3 leçons</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(142)\">Loupe de joaillier</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(105)\">Nain-cyclope est dit</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(108)\">Ours en peluche</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(92)\">OVNI</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(122)\">Panoplie de Naindiana Jones</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(127)\">Pelotte de laine</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(87)\">Pierre magique</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(88)\">Plante qui fait rigoler</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(93)\">Prince charmant</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(95)\">Sac poubelle</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(143)\">Un peu d&#039;amour en bocal</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(100)\">Visée à poisson</a></b>');mep(16,'[R] <b><a href=\"JavaScript:detailobj(131)\">Walkman</a></b>');mep(16,'[V] <b><a href=\"JavaScript:detailobj(186)\">1976 Ford Gran Torino</a></b>');mep(16,'[V] <b><a href=\"JavaScript:detailobj(171)\">Aéroglisseur</a></b>');mep(16,'[V] <b><a href=\"JavaScript:detailobj(154)\">Banane sauteuse</a></b>');mep(16,'[V] <b><a href=\"JavaScript:detailobj(166)\">Camion</a></b>');mep(16,'[V] <b><a href=\"JavaScript:detailobj(189)\">Capillotracteur</a></b>');mep(16,'[V] <b><a href=\"JavaScript:detailobj(159)\">Char de combat</a></b>');mep(16,'[V] <b><a href=\"JavaScript:detailobj(197)\">Coffre au trésor</a></b>');mep(16,'[V] <b><a href=\"JavaScript:detailobj(157)\">Cornichon à roulettes</a></b>');mep(16,'[V] <b><a href=\"JavaScript:detailobj(181)\">Cox</a></b>');mep(16,'[V] <b><a href=\"JavaScript:detailobj(174)\">Deçansis</a></b>');mep(16,'[V] <b><a href=\"JavaScript:detailobj(453)\">Deux demies noix de coco</a></b>');mep(16,'[V] <b><a href=\"JavaScript:detailobj(192)\">Enclume ACME</a></b>');mep(16,'[V] <b><a href=\"JavaScript:detailobj(158)\">Formule 1 jaune</a></b>');mep(16,'[V] <b><a href=\"JavaScript:detailobj(162)\">Formule 1 verte</a></b>');mep(16,'[V] <b><a href=\"JavaScript:detailobj(160)\">Fusée de la NASA</a></b>');mep(16,'[V] <b><a href=\"JavaScript:detailobj(178)\">Mongolfière</a></b>');mep(16,'[V] <b><a href=\"JavaScript:detailobj(191)\">Mongolfière</a></b>');mep(16,'[V] <b><a href=\"JavaScript:detailobj(155)\">Moto de course</a></b>');mep(16,'[V] <b><a href=\"JavaScript:detailobj(165)\">Nain-vion à réaction</a></b>');mep(16,'[V] <b><a href=\"JavaScript:detailobj(156)\">Seringue à l&#039;EPO</a></b>');mep(16,'[V] <b><a href=\"JavaScript:detailobj(177)\">Tie-fighter</a></b>');mep(16,'[V] <b><a href=\"JavaScript:detailobj(173)\">Tractopelle</a></b>');mep(16,'[V] <b><a href=\"JavaScript:detailobj(187)\">Tractopelle</a></b>');mep(16,'[V] <b><a href=\"JavaScript:detailobj(188)\">Tractopelle.</a></b>');mep(16,'[V] <b><a href=\"JavaScript:detailobj(170)\">Viper</a></b>');mep(16,'[V] <b><a href=\"JavaScript:detailobj(164)\">Voiture de course</a></b>');mep(16,'[V] <b><a href=\"JavaScript:detailobj(176)\">X-wing</a></b>');mep(16,'[D] <b><a href=\"JavaScript:detailobj(216)\">Avion en papier</a></b>');mep(16,'[D] <b><a href=\"JavaScript:detailobj(218)\">Bandeau Noir</a></b>');mep(16,'[D] <b><a href=\"JavaScript:detailobj(207)\">Bottin téléphonique</a></b>');mep(16,'[D] <b><a href=\"JavaScript:detailobj(200)\">Drône de reconnaîssance</a></b>');mep(16,'[D] <b><a href=\"JavaScript:detailobj(205)\">L&#039;espion</a></b>');mep(16,'[D] <b><a href=\"JavaScript:detailobj(215)\">Nainwak News</a></b>');mep(16,'[D] <b><a href=\"JavaScript:detailobj(198)\">Neuille de la mort !</a></b>');mep(16,'[D] <b><a href=\"JavaScript:detailobj(452)\">Ni tranches, Ni rondelles !</a></b>');mep(16,'[D] <b><a href=\"JavaScript:detailobj(210)\">Ordinainteur portable</a></b>');mep(16,'[D] <b><a href=\"JavaScript:detailobj(212)\">Pigeon voyageur</a></b>');mep(16,'[D] <b><a href=\"JavaScript:detailobj(203)\">Satellite d&#039;observation</a></b>');mep(16,'[D] <b><a href=\"JavaScript:detailobj(208)\">Sextant</a></b>');mep(16,'[D] <b><a href=\"JavaScript:detailobj(213)\">Sonde Spatial</a></b>');mep(16,'[D] <b><a href=\"JavaScript:detailobj(211)\">Téléphone portable</a></b>');mep(16,'[D] <b><a href=\"JavaScript:detailobj(206)\">Télévision</a></b>');mep(16,'[D] <b><a href=\"JavaScript:detailobj(202)\">Tour de garde</a></b>');mep(16,'[D] <b><a href=\"JavaScript:detailobj(204)\">Tripes de poulet</a></b>');mep(16,'[D] <b><a href=\"JavaScript:detailobj(214)\">Webcam</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(231)\">Armoire à glace</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(264)\">Bonhomme de neige</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(419)\">Bouteille vide</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(247)\">Cage à Chapin</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(223)\">Carotte</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(311)\">Carte au trésor</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(373)\">Chapinette</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(387)\">Dahu en plastique</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(261)\">Four à pains</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(448)\">Goban</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(229)\">Gruyère à trous</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(368)\">Jardinet</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(446)\">Kuro</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(259)\">Manuel d&#039;électricinain</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(372)\">Petit Graounet</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(251)\">Photo de Bubulle</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(254)\">photo de joueuse</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(256)\">photo de joueuse</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(258)\">photo de joueuse</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(225)\">Photo de vacances</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(234)\">Poisson</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(233)\">Poisson d&#039;avril</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(232)\">Poisson rouge</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(447)\">Shiro</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(252)\">Super Carotte</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(269)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(270)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(271)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(272)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(273)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(274)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(275)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(276)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(277)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(278)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(279)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(280)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(281)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(282)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(283)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(284)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(285)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(288)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(289)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(290)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(291)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(292)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(293)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(294)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(295)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(296)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(297)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(298)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(299)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(300)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(301)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(302)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(303)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(304)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(305)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(306)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(307)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(308)\">Surprise de Kine d&#039;Heure</a></b>');mep(16,'[I] <b><a href=\"JavaScript:detailobj(244)\">T-shirt Nainwak</a></b>');mep(16,'[B] <b><a href=\"JavaScript:detailobj(322)\">Bière</a></b>');mep(16,'[B] <b><a href=\"JavaScript:detailobj(344)\">bocal de nutella</a></b>');mep(16,'[B] <b><a href=\"JavaScript:detailobj(328)\">Boud&#039;nain bleu</a></b>');mep(16,'[B] <b><a href=\"JavaScript:detailobj(329)\">Boud&#039;nain rouge</a></b>');mep(16,'[B] <b><a href=\"JavaScript:detailobj(330)\">Boud&#039;nain vert</a></b>');mep(16,'[B] <b><a href=\"JavaScript:detailobj(313)\">Champignon</a></b>');mep(16,'[B] <b><a href=\"JavaScript:detailobj(327)\">Champomy !</a></b>');mep(16,'[B] <b><a href=\"JavaScript:detailobj(324)\">Chapin</a></b>');mep(16,'[B] <b><a href=\"JavaScript:detailobj(315)\">Citrouille</a></b>');mep(16,'[B] <b><a href=\"JavaScript:detailobj(338)\">Citrouille d&#039;Halloween</a></b>');mep(16,'[B] <b><a href=\"JavaScript:detailobj(342)\">Citrouille d&#039;Halloween</a></b>');mep(16,'[B] <b><a href=\"JavaScript:detailobj(407)\">Cloche de Pâques</a></b>');mep(16,'[B] <b><a href=\"JavaScript:detailobj(325)\">Coca pétillant</a></b>');mep(16,'[B] <b><a href=\"JavaScript:detailobj(444)\">Cortex</a></b>');mep(16,'[B] <b><a href=\"JavaScript:detailobj(343)\">Croque Monsieur</a></b>');mep(16,'[B] <b><a href=\"JavaScript:detailobj(321)\">Gateau au chocolat</a></b>');mep(16,'[B] <b><a href=\"JavaScript:detailobj(335)\">Kine d&#039;Heure</a></b>');mep(16,'[B] <b><a href=\"JavaScript:detailobj(317)\">Menemen&#039;s</a></b>');mep(16,'[B] <b><a href=\"JavaScript:detailobj(332)\">Pack de bières</a></b>');mep(16,'[B] <b><a href=\"JavaScript:detailobj(331)\">Pêche</a></b>');mep(16,'[B] <b><a href=\"JavaScript:detailobj(334)\">Père Nain-ëL en Chocolat</a></b>');mep(16,'[B] <b><a href=\"JavaScript:detailobj(414)\">Raisin</a></b>');mep(16,'[B] <b><a href=\"JavaScript:detailobj(415)\">Raisin</a></b>');mep(16,'[B] <b><a href=\"JavaScript:detailobj(416)\">Raisin</a></b>');mep(16,'[B] <b><a href=\"JavaScript:detailobj(417)\">Raisin</a></b>');mep(16,'[B] <b><a href=\"JavaScript:detailobj(418)\">Raisin</a></b>');mep(16,'[B] <b><a href=\"JavaScript:detailobj(333)\">Sandwich</a></b>');mep(16,'[B] <b><a href=\"JavaScript:detailobj(320)\">Tartine</a></b>');mep(16,'[B] <b><a href=\"JavaScript:detailobj(408)\">Tête de Pâques</a></b>');mep(16,'[B] <b><a href=\"JavaScript:detailobj(323)\">Tournesol</a></b>');mep(16,'[JA] <b><a href=\"JavaScript:detailobj(348)\">Batte de base-ball spéciale</a></b>');mep(16,'[J] <b><a href=\"JavaScript:detailobj(365)\">bloup</a></b>');mep(16,'[J] <b><a href=\"JavaScript:detailobj(369)\">Boulet</a></b>');mep(16,'[JB] <b><a href=\"JavaScript:detailobj(399)\">Guinness</a></b>');mep(16,'[J] <b><a href=\"JavaScript:detailobj(430)\">Jaune d&#039;œuf</a></b>');mep(16,'[JB] <b><a href=\"JavaScript:detailobj(355)\">Kine d&#039;Heure</a></b>');mep(16,'[J] <b><a href=\"JavaScript:detailobj(440)\">La bombe à dihydrogène mono-oxydé</a></b>');mep(16,'[JA] <b><a href=\"JavaScript:detailobj(366)\">Lance-Chapin</a></b>');mep(16,'[JA] <b><a href=\"JavaScript:detailobj(349)\">Lasso de bouche</a></b>');mep(16,'[J] <b><a href=\"JavaScript:detailobj(364)\">Le bocal d&#039;air</a></b>');mep(16,'[J] <b><a href=\"JavaScript:detailobj(359)\">Le bocal d&#039;arbre</a></b>');mep(16,'[J] <b><a href=\"JavaScript:detailobj(361)\">Le bocal d&#039;eau</a></b>');mep(16,'[J] <b><a href=\"JavaScript:detailobj(362)\">Le bocal d&#039;herbe</a></b>');mep(16,'[J] <b><a href=\"JavaScript:detailobj(360)\">le bocal de maison</a></b>');mep(16,'[J] <b><a href=\"JavaScript:detailobj(363)\">Le bocal de sable</a></b>');mep(16,'[J] <b><a href=\"JavaScript:detailobj(351)\">Main collante de gosse</a></b>');mep(16,'[J] <b><a href=\"JavaScript:detailobj(357)\">potion potiron de la mort qui tue !</a></b>');mep(16,'[JA] <b><a href=\"JavaScript:detailobj(460)\">Potion sonore</a></b>');mep(16,'[J] <b><a href=\"JavaScript:detailobj(429)\">Poule de neige</a></b>');mep(16,'[J] <b><a href=\"JavaScript:detailobj(350)\">Quitte ou Double</a></b>');mep(16,'[JA] <b><a href=\"JavaScript:detailobj(356)\">Sainte grenade d&#039;Antioche</a></b>');mep(16,'[JA] <b><a href=\"JavaScript:detailobj(461)\">Super potion sonore</a></b>');mep(16,'[J] <b><a href=\"JavaScript:detailobj(353)\">Tarte à la crème</a></b>');\nmep(6);\nmep_fin();\n</script>\n<table class=\"coul_1\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n<tbody><tr><td class=\"angle VTVV_VNNV\"></td><td class=\"bande_h VTN\"></td><td class=\"angle VVTV_VVNN\"></td></tr><tr><td class=\"bande_v VT\"></td><td class=\"news-titre\">Encyclopédie</td><td class=\"bande_v TV\"></td></tr><tr><td class=\"angle TNVV_NVNV\"></td><td class=\"bande_h TVV\"></td><td class=\"angle VVNT_NVNV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(34)\">Ampli</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(2)\">Arbalète</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(55)\">Arquebuse naine</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(70)\">Batte de baseball</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(48)\">Blaster en plastique</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(5)\">Boomrang à réaction</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(4)\">Boomrang classique</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(23)\">Boomrang de glace</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(72)\">Boomrang en polystyrène</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(6)\">Boomrang feu</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(58)\">Calculette rétro-éclairée</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(46)\">Canon</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(24)\">Clef anglaise</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(60)\">Combo \"Ouh un ours !\" + \"Coup de pied au cul\"</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(35)\">Coup de pied au cul</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(49)\">Crabe polarisé</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(67)\">Cri de guerre</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(53)\">Crosse de hockey</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(7)\">Desert eagle</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(51)\">Donut géant radioactif</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(47)\">Epée à 2 balles</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(57)\">Fouet de tortue-re</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(16)\">Fourchette</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(74)\">Fusil à pompe</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(44)\">Gant de boxe</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(8)\">Glaive des gentils</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(10)\">Glaive des méchants</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(9)\">Glaive en or</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(22)\">Grille-pain à propulsion programmée</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(28)\">Hache</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(52)\">Lampe de poche à nions</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(3)\">Lance-bananes</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(77)\">Lance-François</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(83)\">Lance-Requête</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(79)\">Les bottes de convocations d'Herr  Moroïd</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(32)\">Machette de Darth Vador</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(30)\">Machette de Jack l'éventreur</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(50)\">Mug brûlant</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(78)\">Oreiller</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(71)\">Pelle</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(20)\">Porte-manteaux-boomrang</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(18)\">Radis acide</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(29)\">Revolver 6 coups</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(65)\">Rouleau à patisserie</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(17)\">Salière qui tue</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(19)\">Seringue au rhûme</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(66)\">Tabouret voltigeur</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(59)\">Télécommande infrarouge</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[A] <b><a href=\"JavaScript:detailobj(68)\">Tronçonneuse d'Orangina rouge</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(133)\">Ampoule</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(107)\">Beaujolais nouveau</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(132)\">Boîte à IDM</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(97)\">Boîte à Outils</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(153)\">boite d'épinard</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(119)\">Bonzaï</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(117)\">Carpette de loup des bouais</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(146)\">Casque de chantier</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(85)\">Casque viking</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(104)\">CD-ROM</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(94)\">Chapeau de magicien</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(115)\">Chaussure de tennis</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(86)\">Cheese-burger</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(151)\">Choli Japeau Rigolo</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(116)\">Couronne</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(109)\">Disque laser de Dorothée</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(90)\">Grimoire magique</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(441)\">Guide de Chapinologie</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(134)\">Guitare Acoustique</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(124)\">Guitare électrique</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(135)\">Guitare électrique Ibanez</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(136)\">Guitare électrique Strato</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(126)\">Haltères</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(106)\">L'ABC d'aire</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(91)\">Laboratoire du petit chimiste</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(89)\">Le Kamasutra en 3 leçons</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(142)\">Loupe de joaillier</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(105)\">Nain-cyclope est dit</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(108)\">Ours en peluche</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(92)\">OVNI</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(122)\">Panoplie de Naindiana Jones</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(127)\">Pelotte de laine</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(87)\">Pierre magique</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(88)\">Plante qui fait rigoler</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(93)\">Prince charmant</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(95)\">Sac poubelle</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(143)\">Un peu d'amour en bocal</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(100)\">Visée à poisson</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[R] <b><a href=\"JavaScript:detailobj(131)\">Walkman</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[V] <b><a href=\"JavaScript:detailobj(186)\">1976 Ford Gran Torino</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[V] <b><a href=\"JavaScript:detailobj(171)\">Aéroglisseur</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[V] <b><a href=\"JavaScript:detailobj(154)\">Banane sauteuse</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[V] <b><a href=\"JavaScript:detailobj(166)\">Camion</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[V] <b><a href=\"JavaScript:detailobj(189)\">Capillotracteur</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[V] <b><a href=\"JavaScript:detailobj(159)\">Char de combat</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[V] <b><a href=\"JavaScript:detailobj(197)\">Coffre au trésor</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[V] <b><a href=\"JavaScript:detailobj(157)\">Cornichon à roulettes</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[V] <b><a href=\"JavaScript:detailobj(181)\">Cox</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[V] <b><a href=\"JavaScript:detailobj(174)\">Deçansis</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[V] <b><a href=\"JavaScript:detailobj(453)\">Deux demies noix de coco</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[V] <b><a href=\"JavaScript:detailobj(192)\">Enclume ACME</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[V] <b><a href=\"JavaScript:detailobj(158)\">Formule 1 jaune</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[V] <b><a href=\"JavaScript:detailobj(162)\">Formule 1 verte</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[V] <b><a href=\"JavaScript:detailobj(160)\">Fusée de la NASA</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[V] <b><a href=\"JavaScript:detailobj(178)\">Mongolfière</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[V] <b><a href=\"JavaScript:detailobj(191)\">Mongolfière</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[V] <b><a href=\"JavaScript:detailobj(155)\">Moto de course</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[V] <b><a href=\"JavaScript:detailobj(165)\">Nain-vion à réaction</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[V] <b><a href=\"JavaScript:detailobj(156)\">Seringue à l'EPO</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[V] <b><a href=\"JavaScript:detailobj(177)\">Tie-fighter</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[V] <b><a href=\"JavaScript:detailobj(173)\">Tractopelle</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[V] <b><a href=\"JavaScript:detailobj(187)\">Tractopelle</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[V] <b><a href=\"JavaScript:detailobj(188)\">Tractopelle.</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[V] <b><a href=\"JavaScript:detailobj(170)\">Viper</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[V] <b><a href=\"JavaScript:detailobj(164)\">Voiture de course</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[V] <b><a href=\"JavaScript:detailobj(176)\">X-wing</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[D] <b><a href=\"JavaScript:detailobj(216)\">Avion en papier</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[D] <b><a href=\"JavaScript:detailobj(218)\">Bandeau Noir</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[D] <b><a href=\"JavaScript:detailobj(207)\">Bottin téléphonique</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[D] <b><a href=\"JavaScript:detailobj(200)\">Drône de reconnaîssance</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[D] <b><a href=\"JavaScript:detailobj(205)\">L'espion</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[D] <b><a href=\"JavaScript:detailobj(215)\">Nainwak News</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[D] <b><a href=\"JavaScript:detailobj(198)\">Neuille de la mort !</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[D] <b><a href=\"JavaScript:detailobj(452)\">Ni tranches, Ni rondelles !</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[D] <b><a href=\"JavaScript:detailobj(210)\">Ordinainteur portable</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[D] <b><a href=\"JavaScript:detailobj(212)\">Pigeon voyageur</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[D] <b><a href=\"JavaScript:detailobj(203)\">Satellite d'observation</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[D] <b><a href=\"JavaScript:detailobj(208)\">Sextant</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[D] <b><a href=\"JavaScript:detailobj(213)\">Sonde Spatial</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[D] <b><a href=\"JavaScript:detailobj(211)\">Téléphone portable</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[D] <b><a href=\"JavaScript:detailobj(206)\">Télévision</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[D] <b><a href=\"JavaScript:detailobj(202)\">Tour de garde</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[D] <b><a href=\"JavaScript:detailobj(204)\">Tripes de poulet</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[D] <b><a href=\"JavaScript:detailobj(214)\">Webcam</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(231)\">Armoire à glace</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(264)\">Bonhomme de neige</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(419)\">Bouteille vide</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(247)\">Cage à Chapin</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(223)\">Carotte</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(311)\">Carte au trésor</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(373)\">Chapinette</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(387)\">Dahu en plastique</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(261)\">Four à pains</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(448)\">Goban</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(229)\">Gruyère à trous</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(368)\">Jardinet</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(446)\">Kuro</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(259)\">Manuel d'électricinain</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(372)\">Petit Graounet</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(251)\">Photo de Bubulle</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(254)\">photo de joueuse</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(256)\">photo de joueuse</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(258)\">photo de joueuse</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(225)\">Photo de vacances</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(234)\">Poisson</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(233)\">Poisson d'avril</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(232)\">Poisson rouge</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(447)\">Shiro</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(252)\">Super Carotte</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(269)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(270)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(271)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(272)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(273)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(274)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(275)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(276)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(277)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(278)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(279)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(280)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(281)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(282)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(283)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(284)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(285)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(288)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(289)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(290)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(291)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(292)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(293)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(294)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(295)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(296)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(297)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(298)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(299)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(300)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(301)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(302)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(303)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(304)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(305)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(306)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(307)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(308)\">Surprise de Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[I] <b><a href=\"JavaScript:detailobj(244)\">T-shirt Nainwak</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[B] <b><a href=\"JavaScript:detailobj(322)\">Bière</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[B] <b><a href=\"JavaScript:detailobj(344)\">bocal de nutella</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[B] <b><a href=\"JavaScript:detailobj(328)\">Boud'nain bleu</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[B] <b><a href=\"JavaScript:detailobj(329)\">Boud'nain rouge</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[B] <b><a href=\"JavaScript:detailobj(330)\">Boud'nain vert</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[B] <b><a href=\"JavaScript:detailobj(313)\">Champignon</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[B] <b><a href=\"JavaScript:detailobj(327)\">Champomy !</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[B] <b><a href=\"JavaScript:detailobj(324)\">Chapin</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[B] <b><a href=\"JavaScript:detailobj(315)\">Citrouille</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[B] <b><a href=\"JavaScript:detailobj(338)\">Citrouille d'Halloween</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[B] <b><a href=\"JavaScript:detailobj(342)\">Citrouille d'Halloween</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[B] <b><a href=\"JavaScript:detailobj(407)\">Cloche de Pâques</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[B] <b><a href=\"JavaScript:detailobj(325)\">Coca pétillant</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[B] <b><a href=\"JavaScript:detailobj(444)\">Cortex</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[B] <b><a href=\"JavaScript:detailobj(343)\">Croque Monsieur</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[B] <b><a href=\"JavaScript:detailobj(321)\">Gateau au chocolat</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[B] <b><a href=\"JavaScript:detailobj(335)\">Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[B] <b><a href=\"JavaScript:detailobj(317)\">Menemen's</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[B] <b><a href=\"JavaScript:detailobj(332)\">Pack de bières</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[B] <b><a href=\"JavaScript:detailobj(331)\">Pêche</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[B] <b><a href=\"JavaScript:detailobj(334)\">Père Nain-ëL en Chocolat</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[B] <b><a href=\"JavaScript:detailobj(414)\">Raisin</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[B] <b><a href=\"JavaScript:detailobj(415)\">Raisin</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[B] <b><a href=\"JavaScript:detailobj(416)\">Raisin</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[B] <b><a href=\"JavaScript:detailobj(417)\">Raisin</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[B] <b><a href=\"JavaScript:detailobj(418)\">Raisin</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[B] <b><a href=\"JavaScript:detailobj(333)\">Sandwich</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[B] <b><a href=\"JavaScript:detailobj(320)\">Tartine</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[B] <b><a href=\"JavaScript:detailobj(408)\">Tête de Pâques</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[B] <b><a href=\"JavaScript:detailobj(323)\">Tournesol</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[JA] <b><a href=\"JavaScript:detailobj(348)\">Batte de base-ball spéciale</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[J] <b><a href=\"JavaScript:detailobj(365)\">bloup</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[J] <b><a href=\"JavaScript:detailobj(369)\">Boulet</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[JB] <b><a href=\"JavaScript:detailobj(399)\">Guinness</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[J] <b><a href=\"JavaScript:detailobj(430)\">Jaune d'œuf</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[JB] <b><a href=\"JavaScript:detailobj(355)\">Kine d'Heure</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[J] <b><a href=\"JavaScript:detailobj(440)\">La bombe à dihydrogène mono-oxydé</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[JA] <b><a href=\"JavaScript:detailobj(366)\">Lance-Chapin</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[JA] <b><a href=\"JavaScript:detailobj(349)\">Lasso de bouche</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[J] <b><a href=\"JavaScript:detailobj(364)\">Le bocal d'air</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[J] <b><a href=\"JavaScript:detailobj(359)\">Le bocal d'arbre</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[J] <b><a href=\"JavaScript:detailobj(361)\">Le bocal d'eau</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[J] <b><a href=\"JavaScript:detailobj(362)\">Le bocal d'herbe</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[J] <b><a href=\"JavaScript:detailobj(360)\">le bocal de maison</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[J] <b><a href=\"JavaScript:detailobj(363)\">Le bocal de sable</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[J] <b><a href=\"JavaScript:detailobj(351)\">Main collante de gosse</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[J] <b><a href=\"JavaScript:detailobj(357)\">potion potiron de la mort qui tue !</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[JA] <b><a href=\"JavaScript:detailobj(460)\">Potion sonore</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[J] <b><a href=\"JavaScript:detailobj(429)\">Poule de neige</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[J] <b><a href=\"JavaScript:detailobj(350)\">Quitte ou Double</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[JA] <b><a href=\"JavaScript:detailobj(356)\">Sainte grenade d'Antioche</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[JA] <b><a href=\"JavaScript:detailobj(461)\">Super potion sonore</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\">[J] <b><a href=\"JavaScript:detailobj(353)\">Tarte à la crème</a></b></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"angle NVVV_NNVV\"></td><td class=\"bande_h VVN\"></td><td class=\"angle VVVN_NVVN\"></td></tr></tbody></table>\n</body>\n</html>\n";

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

var test = __webpack_require__(6);
var analyzeEvenements = __webpack_require__(176);
var parseHTMLDocument = __webpack_require__(37);
var html = __webpack_require__(207);
var now = new Date(1457780950000);

test('analyzers/evenements: analyze', function (assert) {
    var doc = parseHTMLDocument(html);
    var evenements = analyzeEvenements(doc, now);

    //12h09 (sam. 12/03) xØu a pris un(e) Hache sur le sol.
    assert.deepEqual(evenements[0], {
        isNew: true,
        date: new Date('Sat Mar 12 2016 12:09:00 GMT+0100'),
        type: 50,
        parametres: { s1: 'xØu', s2: 'Hache', s3: '', n1: 0, n2: 0, n3: 0 },
        description: 'xØu a pris un(e) Hache sur le sol.',
        image: undefined
    }, 'evenement 1');

    //11h50 (sam. 12/03)  Tu as aperçu Neantnain en (16,4).
    assert.deepEqual(evenements[3], {
        isNew: false,
        date: new Date('Sat Mar 12 2016 11:50:00 GMT+0100'),
        type: 11,
        parametres: { s1: 'Neantnain', s2: '', s3: '', n1: 16, n2: 4, n3: 0},
        description: 'Tu as aperçu Neantnain en (16,4).',
        image: '/images/interface/evens/pas.gif'
    }, 'evenement 4');

    //10h50 (sam. 12/03) the punky 89 a posé un(e) Tractopelle.
    assert.deepEqual(evenements[6], {
        isNew: false,
        date: new Date('Sat Mar 12 2016 10:50:00 GMT+0100'),
        type: 57,
        parametres: { s1: 'the punky 89', s2: 'Tractopelle', s3: '', n1: 0, n2: 0, n3: 0},
        description: 'the punky 89 a posé un(e) Tractopelle.',
        image: undefined
    }, 'evenement 7');

    assert.end();
});


/***/ }),
/* 207 */
/***/ (function(module, exports) {

module.exports = "\n<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">\n<html>\n<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n<link rel=\"stylesheet\" href=\"/css/main.css\" type=\"text/css\">\n<script language=\"Javascript\" src=\"/js/even.js\" type=\"text/javascript\">\n</script>\n<script language=\"Javascript\" src=\"/js/base.js\" type=\"text/javascript\">\n</script>\n<script language='JavaScript' type='text/javascript'>\n  if ((typeof Even=='undefined') ||\n      (Even.Version < '2.0.2.0'))\n    alert(\"Vous avez une vieille version de even.js, merci de vider votre cache.\");\n</script>\n<title></title>\n<style type=\"text/css\">\n div.c1 {margin-left: 2em}\n</style>\n\n<script type=\"text/javascript\" language=\"JavaScript\">\n var classeinterface=1;\n</script>\n</head>\n<body>\n<p class=\"titre\">[ Evènements des dernières 24 heures ]</p>\n<p>Evènements concernant [ <a href=\"even.php?IDS=e48d22f62e941a14eb927c8f9d36c6b2&amp;duree=24&amp;type=IMPORTANT\">Mes Blessures</a> | <a href=\"even.php?IDS=e48d22f62e941a14eb927c8f9d36c6b2&amp;duree=24&amp;type=FUTILE\">Mes actions</a> | <a href=\"even.php?IDS=e48d22f62e941a14eb927c8f9d36c6b2&amp;duree=24&amp;type=EXTERIEUR\">Les autres Nains</a> | <a href=\"even.php?IDS=e48d22f62e941a14eb927c8f9d36c6b2&amp;duree=24&amp;type=ALL\">Tout</a> ]</p>\n<p>Voir les évènements sur [ <a href=\"even.php?IDS=e48d22f62e941a14eb927c8f9d36c6b2&amp;duree=24&amp;type=ALL\">24 heures</a> | <a href=\"even.php?IDS=e48d22f62e941a14eb927c8f9d36c6b2&amp;duree=48&amp;type=ALL\">48 heures</a> | <a href=\"even.php?IDS=e48d22f62e941a14eb927c8f9d36c6b2&amp;duree=240&amp;type=ALL\">10 jours</a> ]</p>\n<div class=\"c1\"><script language=\"Javascript\" type=\"text/javascript\">\nev(1,\"12h09 (sam. 12/03)\", 50, \"xØu\", \"Hache\", \"\", 0, 0, 0);\nev(0,\"12h09 (sam. 12/03)\", 50, \"xØu\", \"Canon\", \"\", 0, 0, 0);\nev(0,\"12h09 (sam. 12/03)\", 11, \"xØu\", \"\", \"\", 15, 2, 0);\nev(0,\"11h50 (sam. 12/03)\", 11, \"Neantnain\", \"\", \"\", 16, 4, 0);\nev(0,\"11h46 (sam. 12/03)\", 11, \"empereur\", \"\", \"\", 14, 4, 0);\nev(0,\"11h46 (sam. 12/03)\", 11, \"empereur\", \"\", \"\", 13, 5, 0);\nev(0,\"10h50 (sam. 12/03)\", 57, \"the punky 89\", \"Tractopelle\", \"\", 0, 0, 0);\nev(0,\"10h50 (sam. 12/03)\", 11, \"the punky 89\", \"\", \"\", 14, 5, 0);\nev(0,\"10h15 (sam. 12/03)\", 11, \"blou-blou\", \"\", \"\", 15, 6, 0);\nev(0,\"09h22 (sam. 12/03)\", 11, \"Neantnain\", \"\", \"\", 15, 5, 0);\nev(0,\"09h14 (sam. 12/03)\", 11, \"Beti Zuzen\", \"\", \"\", 14, 6, 0);\nev(0,\"09h01 (sam. 12/03)\", 11, \"OuhMechant\", \"\", \"\", 14, 6, 0);\nev(0,\"08h53 (sam. 12/03)\", 15, \"Rascar Capac\", \"Pokeland\", \"Pokeland\", 0, 0, 0);\nev(0,\"08h41 (sam. 12/03)\", 14, \"goldwarrior\", \"Ile de Tortue Géniale\", \"Espace\", 0, 0, 0);\nev(0,\"08h41 (sam. 12/03)\", 15, \"Tiotiof\", \"Pokeland\", \"Pokeland\", 0, 0, 0);\nev(0,\"08h36 (sam. 12/03)\", 11, \"King of kekeland\", \"\", \"\", 15, 6, 0);\nev(0,\"08h09 (sam. 12/03)\", 11, \"Pulse\", \"\", \"\", 14, 7, 0);\nev(0,\"07h42 (sam. 12/03)\", 11, \"blou-blou\", \"\", \"\", 14, 7, 0);\nev(0,\"07h02 (sam. 12/03)\", 73, \"empereur\", \"\", \"\", 0, 0, 0);\nev(0,\"07h02 (sam. 12/03)\", 50, \"empereur\", \"Pelotte de laine\", \"\", 0, 0, 0);\nev(0,\"07h01 (sam. 12/03)\", 33, \"empereur\", \"NainPort'Qui\", \"Boomrang feu\", 0, 0, 0);\nev(0,\"07h01 (sam. 12/03)\", 31, \"empereur\", \"NainPort'Qui\", \"Boomrang feu\", 0, 0, 0);\nev(0,\"07h00 (sam. 12/03)\", 57, \"empereur\", \"Pelotte de laine\", \"\", 0, 0, 0);\nev(0,\"07h00 (sam. 12/03)\", 57, \"empereur\", \"Pelotte de laine\", \"\", 0, 0, 0);\nev(0,\"00h14 (sam. 12/03)\", 50, \"c4n4rd\", \"Neuille de la mort !\", \"\", 0, 0, 0);\nev(0,\"00h14 (sam. 12/03)\", 57, \"c4n4rd\", \"Neuille de la mort !\", \"\", 0, 0, 0);\nev(0,\"00h14 (sam. 12/03)\", 50, \"c4n4rd\", \"Biberon à répétition\", \"\", 0, 0, 0);\nev(0,\"00h13 (sam. 12/03)\", 57, \"c4n4rd\", \"Batte de base-ball spéciale\", \"\", 0, 0, 0);\nev(0,\"00h13 (sam. 12/03)\", 50, \"c4n4rd\", \"Donut géant radioactif\", \"\", 0, 0, 0);\nev(0,\"00h13 (sam. 12/03)\", 15, \"c4n4rd\", \"Pokeland\", \"Pokeland\", 0, 0, 0);\nev(0,\"00h12 (sam. 12/03)\", 50, \"bravenain\", \"Télécommande infrarouge\", \"\", 0, 0, 0);\nev(0,\"00h12 (sam. 12/03)\", 57, \"bravenain\", \"Biberon à répétition\", \"\", 0, 0, 0);\nev(0,\"00h12 (sam. 12/03)\", 11, \"bravenain\", \"\", \"\", 14, 7, 0);\nev(0,\"00h07 (sam. 12/03)\", 15, \"bravenain\", \"Pokeland\", \"Pokeland\", 0, 0, 0);\nev(0,\"23h58 (ven. 11/03)\", 11, \"goldwarrior\", \"\", \"\", 11, 5, 0);\nev(0,\"21h58 (ven. 11/03)\", 15, \"Neantnain\", \"Pokeland\", \"Pokeland\", 0, 0, 0);\nev(0,\"21h43 (ven. 11/03)\", 33, \"the punky 89\", \"Naincroyable Hulk\", \"Desert eagle\", 0, 0, 0);\nev(0,\"21h43 (ven. 11/03)\", 31, \"the punky 89\", \"Naincroyable Hulk\", \"Desert eagle\", 0, 0, 0);\nev(0,\"21h43 (ven. 11/03)\", 11, \"the punky 89\", \"\", \"\", 13, 6, 0);\nev(0,\"21h35 (ven. 11/03)\", 31, \"Benouzzz\", \"Naincroyable Hulk\", \"Revolver 6 coups\", 0, 0, 0);\nev(0,\"21h34 (ven. 11/03)\", 50, \"Benouzzz\", \"Tractopelle.\", \"\", 0, 0, 0);\nev(0,\"21h32 (ven. 11/03)\", 15, \"Benouzzz\", \"Pokeland\", \"Pokeland\", 0, 0, 0);\nev(0,\"21h29 (ven. 11/03)\", 15, \"Pulse\", \"Pokeland\", \"Pokeland\", 0, 0, 0);\nev(0,\"21h25 (ven. 11/03)\", 15, \"OuhMechant\", \"Pokeland\", \"Pokeland\", 0, 0, 0);\nev(0,\"21h20 (ven. 11/03)\", 15, \"the punky 89\", \"Pokeland\", \"Pokeland\", 0, 0, 0);\nev(0,\"21h19 (ven. 11/03)\", 57, \"Maitre Yoda\", \"Voiture de course\", \"\", 0, 0, 0);\nev(0,\"21h15 (ven. 11/03)\", 50, \"Maitre Yoda\", \"Ampoule\", \"\", 0, 0, 0);\nev(0,\"21h15 (ven. 11/03)\", 50, \"Maitre Yoda\", \"Boomrang à réaction\", \"\", 0, 0, 0);\nev(0,\"21h15 (ven. 11/03)\", 57, \"Maitre Yoda\", \"Télécommande infrarouge\", \"\", 0, 0, 0);\nev(0,\"21h15 (ven. 11/03)\", 11, \"Maitre Yoda\", \"\", \"\", 14, 7, 0);\n\nmiseajourpager('17', '159', '159', 'evenpagerlu', '?', 'chatpagernonlu', '2', '14', '7', 'e48d22f62e941a14eb927c8f9d36c6b2', '<b>NainXpress</b>');\n</script></div>\n<script language='JavaScript' type='text/javascript'>\n<!--\nif (!document.phpAds_used) document.phpAds_used = ',';\nphpAds_random = new String (Math.random()); phpAds_random = phpAds_random.substring(2,11);\n\ndocument.write (\"<\" + \"script language='JavaScript' type='text/javascript' src='\");\ndocument.write (\"http://ads.nainwak.org/adjs.php?n=\" + phpAds_random);\ndocument.write (\"&amp;what=zone:36\");\ndocument.write (\"&amp;exclude=\" + document.phpAds_used);\nif (document.referrer)\n  document.write (\"&amp;referer=\" + escape(document.referrer));\ndocument.write (\"'><\" + \"/script>\");\n//-->\n</script><noscript><a href='http://ads.nainwak.org/adclick.php?n=a6294f14' target='_blank'><img src='http://ads.nainwak.org/adview.php?what=zone:10&amp;n=a6294f14' border='0' alt=''></a></noscript>\n</body>\n</html>\n\n";

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

var test = __webpack_require__(6);
var code = __webpack_require__(51);

test('analyzers/code: getInlineJS', function (assert) {
    var source = "function myHelloWorld() { console.log('Hello world!'); }";
    var script = document.createElement('script');
    script.textContent = source;
    document.body.appendChild(script);

    var inlineJS = code.getInlineJS();
    assert.notEqual(inlineJS.indexOf(source), -1, 'inline javascript');

    document.body.removeChild(script);

    assert.end();
});


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

var test = __webpack_require__(6);
var int = __webpack_require__(48);

test('analyzers/int: int', function (assert) {
    assert.strictEqual(int('0'), 0, '0 as string');
    assert.strictEqual(int(0), 0, '0 as integer');
    assert.strictEqual(int('10'), 10, '10 as string');
    assert.strictEqual(int(10), 10, '10 as integer');
    assert.strictEqual(int('???'), undefined, 'non-integer string');
    assert.strictEqual(int('10 people'), undefined, 'string with integer plus some junk');
    assert.end();
});


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

var test = __webpack_require__(6);
var nainwak = __webpack_require__(80);

test('nainwak: degats', function (assert) {
    var armeBourrin = {
        nom: 'Excalibur',
        type: 'arme',
        portee: 0,
        dommages: 12
    };
    var armeSniper = {
        nom: 'Arquebuse naine',
        type: 'arme',
        portee: 2,
        dommages: 20
    };
    var rune = {
        nom: 'Visée à poisson',
        type: 'rune',
        portee: 0,
        dommages: 0
    };
    var mainCollante = {
        nom: 'Main collante de gosse',
        type: 'special',
        portee: 0,
        dommages: 0
    };
    var tarte = {
        nom: 'Tarte à la crème',
        type: 'arme',
        portee: 4,
        dommages: 0
    };
    var batteSpeciale = {
        nom: 'Batte de base-ball spéciale',
        type: 'arme',
        portee: 0,
        dommages: 0
    };
    var nain = {
        nom: 'NainNain',
        vie: 100,
        force: 80,
        precision: 300,
        intelligence: 100
    };

    assert.deepEqual(nainwak.degats(nain, armeSniper), {
        minimum: 72,
        maximum: 80
    }, 'dégâts arme sniper');

    assert.deepEqual(nainwak.degats(nain, armeBourrin), {
        minimum: 18,
        maximum: 20
    }, 'dégâts arme bourrin');

    assert.deepEqual(nainwak.degats(nain, rune), undefined, 'dégâts rune');
    assert.deepEqual(nainwak.degats(nain, mainCollante), undefined, 'dégâts main collante');
    assert.deepEqual(nainwak.degats(nain, tarte), undefined, 'dégâts tarte');
    assert.deepEqual(nainwak.degats(nain, batteSpeciale), undefined, 'dégâts batte spéciale');

    assert.end();
});

test('nainwak: portee', function (assert) {
    assert.deepEqual(nainwak.portee([12, 4], [12, 4]), 0, '0 case');
    assert.deepEqual(nainwak.portee([12, 4], [12, 3]), 1, '1 case au-dessus');
    assert.deepEqual(nainwak.portee([12, 4], [12, 5]), 1, '1 case au-dessous');
    assert.deepEqual(nainwak.portee([12, 4], [11, 4]), 1, '1 case à gauche');
    assert.deepEqual(nainwak.portee([12, 4], [13, 4]), 1, '1 case à droite');
    assert.deepEqual(nainwak.portee([12, 4], [11, 5]), 1, '1 case en diagonale');

    assert.deepEqual(nainwak.portee([12, 4], [14, 6]), 3, '2 cases diago = 3 cases');
    assert.deepEqual(nainwak.portee([12, 4], [13, 7]), 3, '3 cases');

    assert.end();
});

test('nainwak: deplacement', function (assert) {
    assert.deepEqual(nainwak.deplacement([12, 4], [12, 4]), 0, '0 case');
    assert.deepEqual(nainwak.deplacement([12, 4], [12, 3]), 1, '1 case au-dessus');
    assert.deepEqual(nainwak.deplacement([12, 4], [12, 5]), 1, '1 case au-dessous');
    assert.deepEqual(nainwak.deplacement([12, 4], [11, 4]), 1, '1 case à gauche');
    assert.deepEqual(nainwak.deplacement([12, 4], [13, 4]), 1, '1 case à droite');
    assert.deepEqual(nainwak.deplacement([12, 4], [11, 5]), 1, '1 case en diagonale');

    assert.deepEqual(nainwak.deplacement([12, 4], [14, 6]), 2, '2 cases diago');
    assert.deepEqual(nainwak.deplacement([12, 4], [13, 7]), 3, '3 cases');

    assert.end();
});

test('nainwak: bonusObjets', function (assert) {
    var visee = {
        nom: 'Visée à poisson',
        forceBonus: -6,
        precisionBonus: 15,
        vieBonus: 0,
        intelligenceBonus: 0
    };

    var guitare = {
        nom: 'Guitare électrique Strato',
        forceBonus: 0,
        precisionBonus: 9,
        vieBonus: 5,
        intelligenceBonus: -10
    };

    assert.deepEqual(nainwak.bonusObjets([]), {
        forceBonus: 0,
        precisionBonus: 0,
        vieBonus: 0,
        intelligenceBonus: 0
    }, 'aucun objet');

    assert.deepEqual(nainwak.bonusObjets([visee]), {
        forceBonus: -6,
        precisionBonus: 15,
        vieBonus: 0,
        intelligenceBonus: 0
    }, '1 objet');

    assert.deepEqual(nainwak.bonusObjets([visee, guitare]), {
        forceBonus: -6,
        precisionBonus: 24,
        vieBonus: 5,
        intelligenceBonus: -10
    }, '2 objets');

    assert.end();
});


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(212);
__webpack_require__(225);

var test = __webpack_require__(6);
var pages = __webpack_require__(227);


test('pages: list', function (assert) {
    assert.ok(pages.list.length > 0, 'liste non vide');
    assert.strictEqual(pages.list[0].type, 'detect', 'la première page est la détection');
    assert.end();
});

test('pages: byType', function (assert) {
    assert.strictEqual(pages.byType('detect').type, 'detect', 'page détection');
    assert.strictEqual(pages.byType('blabla'), undefined, 'nom de page invalide');
    assert.end();
});

test('pages: byPath', function (assert) {
    var detectPage = pages.byPath('/jeu/detect.php');
    assert.strictEqual(detectPage, pages.byType('detect'), 'page détection');

    var invalidPage = pages.byPath('/jeu/invalid.php');
    assert.strictEqual(invalidPage, undefined, 'url invalide');

    assert.end();
});


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

var test = __webpack_require__(6);
var invent = __webpack_require__(177);
var dom = __webpack_require__(14);
var Mounter = __webpack_require__(179);
var createPerso = __webpack_require__(165);
var parseHTMLDocument = __webpack_require__(37);
var html = __webpack_require__(171);
var now = new Date(1457780950000);

test('pages/invent: analyze', function (assert) {
    var context = createContext();
    var doc = parseHTMLDocument(html);
    var analysis = invent.analyze(doc, {}, now, context);
    var objets = analysis.objets;

    assert.ok(analysis.raw, 'analysis: raw data is present');

    assert.strictEqual(objets.sol, undefined, 'analysis: number of objets in sol');
    assert.strictEqual(objets.bonnet.length, 1, 'analysis: number of objets in bonnet') ;
    assert.strictEqual(objets.inventaire.length, 14, 'analysis: number of objets in inventaire') ;

    assert.deepEqual(objets.bonnet[0], {
        id: 23779038,
        nom: 'Potion de respécialisation',
        image: '/images/objets/potion_reset.png',
        description: 'Le pôle emploi te propose de changer de métier en revalorisant ton XP. ',
        type: 'jouet',
        PAutiliser: 24,
        portee: 0,
        dommages: 0,
        rechargement: 0,
        PV: 100,
        PVmax: 100,
        PAreparer: 0,
        dispo: 0,
        forceBonus: 0,
        precisionBonus: 0,
        vieBonus: 0,
        intelligenceBonus: 0,
        collant: false,
        reparable: false,
        poussiere: -1
    }, 'bonnet[0] : potion de respécialisation');


    assert.deepEqual(objets.inventaire[0], {
        id: 25186146,
        nom: 'Arquebuse naine',
        image: '/images/objets/arquebuse.gif',
        description: "A la différence d'un arc classique, cette arme utilise un projectile vivant : un oiseau. D’où son nom arc-buse. Ce modèle miniaturisé peut tenir dans une armoire portable ... de nain",
        type: 'arme',
        PAutiliser: 10,
        portee: 2,
        dommages: 20,
        rechargement: 1,
        PV: 45,
        PVmax: 100,
        PAreparer: 7,
        dispo: -6665,
        forceBonus: 0,
        precisionBonus: 0,
        vieBonus: 0,
        intelligenceBonus: 0,
        collant: false,
        reparable: true,
        poussiere: 2412535
    }, 'inventaire[0] : arquebuse naine');

    assert.deepEqual(objets.inventaire[3], {
        id: 25183956,
        nom: 'Batte de base-ball spéciale',
        image: '/images/objets/batte.gif',
        description: "T'es Ok !  T'es In !  T'es Batte ...",
        type: 'arme',
        PAutiliser: 8,
        portee: 0,
        dommages: 0,
        rechargement: 0,
        PV: 70,
        PVmax: 100,
        PAreparer: 19,
        dispo: -259682,
        forceBonus: 0,
        precisionBonus: 0,
        vieBonus: 0,
        intelligenceBonus: 0,
        collant: false,
        reparable: true,
        poussiere: 2159518
    }, 'inventaire[3] : batte de base-ball spéciale');

    assert.deepEqual(objets.inventaire[5], {
        id: 25183959,
        nom: 'Visée à poisson',
        image: '/images/objets/faux_thon.gif',
        description: "Technologie avancée. La \"visée à poisson\" accélère des poissons en plastique (les faux-thons) afin de les propulser sur la cible. (La visée laser s'en est d'ailleurs inspirée)",
        type: 'rune',
        PAutiliser: 0,
        portee: 0,
        dommages: 0,
        rechargement: 0,
        PV: 100,
        PVmax: 100,
        PAreparer: 0,
        dispo: -189893,
        forceBonus: -6,
        precisionBonus: 15,
        vieBonus: 0,
        intelligenceBonus: 0,
        collant: false,
        reparable: false,
        poussiere: 2229326
    }, 'inventaire[5] : visée à poisson');

    assert.deepEqual(objets.inventaire[7], {
        id: 25183960,
        nom: 'Pigeon voyageur',
        image: '/images/objets/pigeon.gif',
        description: "C'est le nouveau modèle de la marque automobile. En effet le Pigeon Voyageur outrepasse les lois terrestres pour emmener son conducteur au 7ème ciel.",
        type: 'détecteur',
        PAutiliser: 0,
        portee: 8,
        dommages: 0,
        rechargement: 0,
        PV: 100,
        PVmax: 100,
        PAreparer: 0,
        dispo: -189893,
        forceBonus: 0,
        precisionBonus: 0,
        vieBonus: 0,
        intelligenceBonus: 0,
        collant: false,
        reparable: false,
        poussiere: 2229334
    }, 'inventaire[7] : pigeon voyageur');

    assert.deepEqual(objets.inventaire[9], {
        id: 25134600,
        nom: 'Fée Cabossée',
        image: '/images/objets/fee.png',
        description: "Mais pourquoi la fée cabossée ? - Rhoo on s'en cogne !",
        type: 'jouet',
        PAutiliser: 5,
        portee: 0,
        dommages: 0,
        rechargement: 0,
        PV: 100,
        PVmax: 100,
        PAreparer: 0,
        dispo: -189893,
        forceBonus: 0,
        precisionBonus: 0,
        vieBonus: 0,
        intelligenceBonus: 0,
        collant: true,
        reparable: false,
        poussiere: -1
    }, 'inventaire[9] : fée cabossée');

    assert.deepEqual(objets.inventaire[10], {
        id: 25159237,
        nom: "Kine d'Heure",
        image: '/images/objets/kinder.gif',
        description: "Kine d'heure, au bon chocolat et au lait, et peut-être une surprise à l'intérieur ?",
        type: 'bouffe',
        PAutiliser: 0,
        portee: 0,
        dommages: -76,
        rechargement: 40,
        PV: 0,
        PVmax: 0,
        PAreparer: 0,
        dispo: -189893,
        forceBonus: 0,
        precisionBonus: 0,
        vieBonus: 0,
        intelligenceBonus: 0,
        collant: false,
        reparable: false,
        poussiere: 951613
    }, 'inventaire[10] : kine d\'heure');

    assert.deepEqual(objets.inventaire[12], {
        id: 25170640,
        nom: 'Main collante de gosse',
        image: '/images/objets/main_collante.gif',
        description: "Les Gosses c'est Bien mais qu'est ce que c'est collant ...",
        type: 'jouet',
        PAutiliser: 2,
        portee: 0,
        dommages: 0,
        rechargement: 0,
        PV: 1,
        PVmax: 3,
        PAreparer: 0,
        dispo: -200591,
        forceBonus: 0,
        precisionBonus: 0,
        vieBonus: 0,
        intelligenceBonus: 0,
        collant: false,
        reparable: false,
        poussiere: 2330050
    }, 'inventaire[12] : main collante');

    assert.deepEqual(objets.inventaire[13], {
        id: 25170639,
        nom: 'Tarte à la crème',
        image: '/images/objets/tarte_creme.gif',
        description: 'les chaines de télé culturelles sont importantes lorsque la religion part en fumée..<br /><br />',
        type: 'arme',
        PAutiliser: 4,
        portee: 4,
        dommages: 0,
        rechargement: 1,
        PV: 100,
        PVmax: 100,
        PAreparer: 2,
        dispo: -407945,
        forceBonus: 0,
        precisionBonus: 0,
        vieBonus: 0,
        intelligenceBonus: 0,
        collant: false,
        reparable: true,
        poussiere: 2011255
    }, 'inventaire[13] : tarte à la crème');

    assert.deepEqual(analysis.pager, {
        PA: 2,
        vie: 149,
        position: [14, 7],
        messagesNonLus: 0,
        nainxpressNonLu: false
    }, 'analysis: pager');

    // check context
    assert.strictEqual(context.objets.sol.length, 1, 'context: objets in sol');
    assert.strictEqual(context.objets.bonnet.length, 1, 'context: objets in bonnet');
    assert.strictEqual(context.objets.inventaire.length, 14, 'context: objets in inventaire');

    assert.strictEqual(context.perso.vieTotal, 134, 'context: perso.vieTotal');
    assert.strictEqual(context.perso.force, 25, 'context: perso.force');
    assert.strictEqual(context.perso.precision, 325, 'context: perso.precision');
    assert.strictEqual(context.perso.intelligence, 90, 'context: perso.intelligence');
    assert.strictEqual(context.perso.vie, 149, 'context: perso.vie');

    assert.end();
});

test('pages/invent: enhance', function (assert) {
    var context = createContext();
    var mounter = Mounter('test');
    var doc = parseHTMLDocument(html);
    invent.analyze(doc, {}, now, context);
    invent.enhance(doc, mounter, context);

    var boxes = dom.findAll('div[data-mounter="test"]', doc);
    assert.strictEqual(boxes.length, 4);

    // Perso: precision=325 -> dommages * 4.05
    assert.strictEqual(nomObjetBox(boxes[0]), 'Arquebuse naine');
    assert.strictEqual(boxes[0].text(), 'Dégâts : 77 à 85');  // dommages: 20
    assert.strictEqual(nomObjetBox(boxes[1]), 'Boomrang feu');
    assert.strictEqual(boxes[1].text(), 'Dégâts : 115 à 128');  // dommages: 30
    assert.strictEqual(nomObjetBox(boxes[2]), 'Revolver 6 coups');
    assert.strictEqual(boxes[2].text(), 'Dégâts : 58 à 64');  // dommages: 15

    assert.strictEqual(nomObjetBox(boxes[3]), 'Main collante de gosse');
    assert.strictEqual(boxes[3].text(), 'Etat : 1/3');

    assert.end();
});

function nomObjetBox(box) {
    return box.parent().parent().parent().find('.news-titre').text();
}

function createContext() {
    return {
        perso: createPerso(),
        objets: {
            sol: [{
                id: 3819679,
                nom: 'Visée à poisson',
                image: '/images/objets/faux_thon.gif',
                description: '',
                type: 'rune',
                PAutiliser: 0,
                portee: 0,
                dommages: 0,
                rechargement: 0,
                PV: 100,
                PVmax: 100,
                PAreparer: 0,
                dispo: 0,
                forceBonus: -6,
                precisionBonus: 15,
                vieBonus: 0,
                intelligenceBonus: 0,
                collant: false,
                reparable: false,
                poussiere: 2418204
            }],
            inventaire: [{
                id: 25186146,
                nom: 'Arquebuse naine',
                image: '/images/objets/arquebuse.gif',
                description: '',
                type: 'arme',
                PAutiliser: 10,
                portee: 2,
                dommages: 20,
                rechargement: 1,
                PV: 100,
                PVmax: 100,
                PAreparer: 7,
                dispo: -14264,
                forceBonus: 0,
                precisionBonus: 0,
                vieBonus: 0,
                intelligenceBonus: 0,
                collant: false,
                reparable: true,
                poussiere: 2404936
            }]
        }
    };
}


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(214) });


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(79);
var gOPS = __webpack_require__(215);
var pIE = __webpack_require__(216);
var toObject = __webpack_require__(5);
var IObject = __webpack_require__(25);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(12)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 215 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 216 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var window = __webpack_require__(78)
var isFunction = __webpack_require__(77)
var parseHeaders = __webpack_require__(218)
var xtend = __webpack_require__(220)

module.exports = createXHR
createXHR.XMLHttpRequest = window.XMLHttpRequest || noop
createXHR.XDomainRequest = "withCredentials" in (new createXHR.XMLHttpRequest()) ? createXHR.XMLHttpRequest : window.XDomainRequest

forEachArray(["get", "put", "post", "patch", "head", "delete"], function(method) {
    createXHR[method === "delete" ? "del" : method] = function(uri, options, callback) {
        options = initParams(uri, options, callback)
        options.method = method.toUpperCase()
        return _createXHR(options)
    }
})

function forEachArray(array, iterator) {
    for (var i = 0; i < array.length; i++) {
        iterator(array[i])
    }
}

function isEmpty(obj){
    for(var i in obj){
        if(obj.hasOwnProperty(i)) return false
    }
    return true
}

function initParams(uri, options, callback) {
    var params = uri

    if (isFunction(options)) {
        callback = options
        if (typeof uri === "string") {
            params = {uri:uri}
        }
    } else {
        params = xtend(options, {uri: uri})
    }

    params.callback = callback
    return params
}

function createXHR(uri, options, callback) {
    options = initParams(uri, options, callback)
    return _createXHR(options)
}

function _createXHR(options) {
    if(typeof options.callback === "undefined"){
        throw new Error("callback argument missing")
    }

    var called = false
    var callback = function cbOnce(err, response, body){
        if(!called){
            called = true
            options.callback(err, response, body)
        }
    }

    function readystatechange() {
        if (xhr.readyState === 4) {
            setTimeout(loadFunc, 0)
        }
    }

    function getBody() {
        // Chrome with requestType=blob throws errors arround when even testing access to responseText
        var body = undefined

        if (xhr.response) {
            body = xhr.response
        } else {
            body = xhr.responseText || getXml(xhr)
        }

        if (isJson) {
            try {
                body = JSON.parse(body)
            } catch (e) {}
        }

        return body
    }

    function errorFunc(evt) {
        clearTimeout(timeoutTimer)
        if(!(evt instanceof Error)){
            evt = new Error("" + (evt || "Unknown XMLHttpRequest Error") )
        }
        evt.statusCode = 0
        return callback(evt, failureResponse)
    }

    // will load the data & process the response in a special response object
    function loadFunc() {
        if (aborted) return
        var status
        clearTimeout(timeoutTimer)
        if(options.useXDR && xhr.status===undefined) {
            //IE8 CORS GET successful response doesn't have a status field, but body is fine
            status = 200
        } else {
            status = (xhr.status === 1223 ? 204 : xhr.status)
        }
        var response = failureResponse
        var err = null

        if (status !== 0){
            response = {
                body: getBody(),
                statusCode: status,
                method: method,
                headers: {},
                url: uri,
                rawRequest: xhr
            }
            if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
                response.headers = parseHeaders(xhr.getAllResponseHeaders())
            }
        } else {
            err = new Error("Internal XMLHttpRequest Error")
        }
        return callback(err, response, response.body)
    }

    var xhr = options.xhr || null

    if (!xhr) {
        if (options.cors || options.useXDR) {
            xhr = new createXHR.XDomainRequest()
        }else{
            xhr = new createXHR.XMLHttpRequest()
        }
    }

    var key
    var aborted
    var uri = xhr.url = options.uri || options.url
    var method = xhr.method = options.method || "GET"
    var body = options.body || options.data
    var headers = xhr.headers = options.headers || {}
    var sync = !!options.sync
    var isJson = false
    var timeoutTimer
    var failureResponse = {
        body: undefined,
        headers: {},
        statusCode: 0,
        method: method,
        url: uri,
        rawRequest: xhr
    }

    if ("json" in options && options.json !== false) {
        isJson = true
        headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json") //Don't override existing accept header declared by user
        if (method !== "GET" && method !== "HEAD") {
            headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json") //Don't override existing accept header declared by user
            body = JSON.stringify(options.json === true ? body : options.json)
        }
    }

    xhr.onreadystatechange = readystatechange
    xhr.onload = loadFunc
    xhr.onerror = errorFunc
    // IE9 must have onprogress be set to a unique function.
    xhr.onprogress = function () {
        // IE must die
    }
    xhr.onabort = function(){
        aborted = true;
    }
    xhr.ontimeout = errorFunc
    xhr.open(method, uri, !sync, options.username, options.password)
    //has to be after open
    if(!sync) {
        xhr.withCredentials = !!options.withCredentials
    }
    // Cannot set timeout with sync request
    // not setting timeout on the xhr object, because of old webkits etc. not handling that correctly
    // both npm's request and jquery 1.x use this kind of timeout, so this is being consistent
    if (!sync && options.timeout > 0 ) {
        timeoutTimer = setTimeout(function(){
            if (aborted) return
            aborted = true//IE9 may still call readystatechange
            xhr.abort("timeout")
            var e = new Error("XMLHttpRequest timeout")
            e.code = "ETIMEDOUT"
            errorFunc(e)
        }, options.timeout )
    }

    if (xhr.setRequestHeader) {
        for(key in headers){
            if(headers.hasOwnProperty(key)){
                xhr.setRequestHeader(key, headers[key])
            }
        }
    } else if (options.headers && !isEmpty(options.headers)) {
        throw new Error("Headers cannot be set on an XDomainRequest object")
    }

    if ("responseType" in options) {
        xhr.responseType = options.responseType
    }

    if ("beforeSend" in options &&
        typeof options.beforeSend === "function"
    ) {
        options.beforeSend(xhr)
    }

    // Microsoft Edge browser sends "undefined" when send is called with undefined value.
    // XMLHttpRequest spec says to pass null as body to indicate no body
    // See https://github.com/naugtur/xhr/issues/100.
    xhr.send(body || null)

    return xhr


}

function getXml(xhr) {
    // xhr.responseXML will throw Exception "InvalidStateError" or "DOMException"
    // See https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseXML.
    try {
        if (xhr.responseType === "document") {
            return xhr.responseXML
        }
        var firefoxBugTakenEffect = xhr.responseXML && xhr.responseXML.documentElement.nodeName === "parsererror"
        if (xhr.responseType === "" && !firefoxBugTakenEffect) {
            return xhr.responseXML
        }
    } catch (e) {}

    return null
}

function noop() {}


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

var trim = __webpack_require__(219)
  , forEach = __webpack_require__(76)
  , isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    }

module.exports = function (headers) {
  if (!headers)
    return {}

  var result = {}

  forEach(
      trim(headers).split('\n')
    , function (row) {
        var index = row.indexOf(':')
          , key = trim(row.slice(0, index)).toLowerCase()
          , value = trim(row.slice(index + 1))

        if (typeof(result[key]) === 'undefined') {
          result[key] = value
        } else if (isArray(result[key])) {
          result[key].push(value)
        } else {
          result[key] = [ result[key], value ]
        }
      }
  )

  return result
}

/***/ }),
/* 219 */
/***/ (function(module, exports) {


exports = module.exports = trim;

function trim(str){
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function(str){
  return str.replace(/^\s*/, '');
};

exports.right = function(str){
  return str.replace(/\s*$/, '');
};


/***/ }),
/* 220 */
/***/ (function(module, exports) {

module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(222)(false);
// imports


// module
exports.push([module.i, ".box {\n    display: block;\n    color: #333;\n    background: rgba(192, 192, 192, 0.5);\n    padding: 5px;\n    border: 1px solid #CCC;\n    border-radius: 5px;\n    float: right;\n    margin: 5px 0;\n}\n", ""]);

// exports


/***/ }),
/* 222 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
    if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports);
    } else {
        // Browser globals
        factory(root.maquette = {});
    }
}(this, function (exports) {
    'use strict';
    // Comment that is displayed in the API documentation for the maquette module:
    /**
 * Welcome to the API documentation of the **maquette** library.
 *
 * [[http://maquettejs.org/|To the maquette homepage]]
 */
    Object.defineProperty(exports, '__esModule', { value: true });
    var NAMESPACE_W3 = 'http://www.w3.org/';
    var NAMESPACE_SVG = NAMESPACE_W3 + '2000/svg';
    var NAMESPACE_XLINK = NAMESPACE_W3 + '1999/xlink';
    // Utilities
    var emptyArray = [];
    var extend = function (base, overrides) {
        var result = {};
        Object.keys(base).forEach(function (key) {
            result[key] = base[key];
        });
        if (overrides) {
            Object.keys(overrides).forEach(function (key) {
                result[key] = overrides[key];
            });
        }
        return result;
    };
    // Hyperscript helper functions
    var same = function (vnode1, vnode2) {
        if (vnode1.vnodeSelector !== vnode2.vnodeSelector) {
            return false;
        }
        if (vnode1.properties && vnode2.properties) {
            if (vnode1.properties.key !== vnode2.properties.key) {
                return false;
            }
            return vnode1.properties.bind === vnode2.properties.bind;
        }
        return !vnode1.properties && !vnode2.properties;
    };
    var toTextVNode = function (data) {
        return {
            vnodeSelector: '',
            properties: undefined,
            children: undefined,
            text: data.toString(),
            domNode: null
        };
    };
    var appendChildren = function (parentSelector, insertions, main) {
        for (var i = 0, length_1 = insertions.length; i < length_1; i++) {
            var item = insertions[i];
            if (Array.isArray(item)) {
                appendChildren(parentSelector, item, main);
            } else {
                if (item !== null && item !== undefined) {
                    if (!item.hasOwnProperty('vnodeSelector')) {
                        item = toTextVNode(item);
                    }
                    main.push(item);
                }
            }
        }
    };
    // Render helper functions
    var missingTransition = function () {
        throw new Error('Provide a transitions object to the projectionOptions to do animations');
    };
    var DEFAULT_PROJECTION_OPTIONS = {
        namespace: undefined,
        eventHandlerInterceptor: undefined,
        styleApplyer: function (domNode, styleName, value) {
            // Provides a hook to add vendor prefixes for browsers that still need it.
            domNode.style[styleName] = value;
        },
        transitions: {
            enter: missingTransition,
            exit: missingTransition
        }
    };
    var applyDefaultProjectionOptions = function (projectorOptions) {
        return extend(DEFAULT_PROJECTION_OPTIONS, projectorOptions);
    };
    var checkStyleValue = function (styleValue) {
        if (typeof styleValue !== 'string') {
            throw new Error('Style values must be strings');
        }
    };
    var setProperties = function (domNode, properties, projectionOptions) {
        if (!properties) {
            return;
        }
        var eventHandlerInterceptor = projectionOptions.eventHandlerInterceptor;
        var propNames = Object.keys(properties);
        var propCount = propNames.length;
        var _loop_1 = function (i) {
            var propName = propNames[i];
            /* tslint:disable:no-var-keyword: edge case */
            var propValue = properties[propName];
            /* tslint:enable:no-var-keyword */
            if (propName === 'className') {
                throw new Error('Property "className" is not supported, use "class".');
            } else if (propName === 'class') {
                propValue.split(/\s+/).forEach(function (token) {
                    return domNode.classList.add(token);
                });
            } else if (propName === 'classes') {
                // object with string keys and boolean values
                var classNames = Object.keys(propValue);
                var classNameCount = classNames.length;
                for (var j = 0; j < classNameCount; j++) {
                    var className = classNames[j];
                    if (propValue[className]) {
                        domNode.classList.add(className);
                    }
                }
            } else if (propName === 'styles') {
                // object with string keys and string (!) values
                var styleNames = Object.keys(propValue);
                var styleCount = styleNames.length;
                for (var j = 0; j < styleCount; j++) {
                    var styleName = styleNames[j];
                    var styleValue = propValue[styleName];
                    if (styleValue) {
                        checkStyleValue(styleValue);
                        projectionOptions.styleApplyer(domNode, styleName, styleValue);
                    }
                }
            } else if (propName !== 'key' && propValue !== null && propValue !== undefined) {
                var type = typeof propValue;
                if (type === 'function') {
                    if (propName.lastIndexOf('on', 0) === 0) {
                        if (eventHandlerInterceptor) {
                            propValue = eventHandlerInterceptor(propName, propValue, domNode, properties);    // intercept eventhandlers
                        }
                        if (propName === 'oninput') {
                            (function () {
                                // record the evt.target.value, because IE and Edge sometimes do a requestAnimationFrame between changing value and running oninput
                                var oldPropValue = propValue;
                                propValue = function (evt) {
                                    oldPropValue.apply(this, [evt]);
                                    evt.target['oninput-value'] = evt.target.value;    // may be HTMLTextAreaElement as well
                                };
                            }());
                        }
                        domNode[propName] = propValue;
                    }
                } else if (type === 'string' && propName !== 'value' && propName !== 'innerHTML') {
                    if (projectionOptions.namespace === NAMESPACE_SVG && propName === 'href') {
                        domNode.setAttributeNS(NAMESPACE_XLINK, propName, propValue);
                    } else {
                        domNode.setAttribute(propName, propValue);
                    }
                } else {
                    domNode[propName] = propValue;
                }
            }
        };
        for (var i = 0; i < propCount; i++) {
            _loop_1(i);
        }
    };
    var updateProperties = function (domNode, previousProperties, properties, projectionOptions) {
        if (!properties) {
            return;
        }
        var propertiesUpdated = false;
        var propNames = Object.keys(properties);
        var propCount = propNames.length;
        for (var i = 0; i < propCount; i++) {
            var propName = propNames[i];
            // assuming that properties will be nullified instead of missing is by design
            var propValue = properties[propName];
            var previousValue = previousProperties[propName];
            if (propName === 'class') {
                if (previousValue !== propValue) {
                    throw new Error('"class" property may not be updated. Use the "classes" property for conditional css classes.');
                }
            } else if (propName === 'classes') {
                var classList = domNode.classList;
                var classNames = Object.keys(propValue);
                var classNameCount = classNames.length;
                for (var j = 0; j < classNameCount; j++) {
                    var className = classNames[j];
                    var on = !!propValue[className];
                    var previousOn = !!previousValue[className];
                    if (on === previousOn) {
                        continue;
                    }
                    propertiesUpdated = true;
                    if (on) {
                        classList.add(className);
                    } else {
                        classList.remove(className);
                    }
                }
            } else if (propName === 'styles') {
                var styleNames = Object.keys(propValue);
                var styleCount = styleNames.length;
                for (var j = 0; j < styleCount; j++) {
                    var styleName = styleNames[j];
                    var newStyleValue = propValue[styleName];
                    var oldStyleValue = previousValue[styleName];
                    if (newStyleValue === oldStyleValue) {
                        continue;
                    }
                    propertiesUpdated = true;
                    if (newStyleValue) {
                        checkStyleValue(newStyleValue);
                        projectionOptions.styleApplyer(domNode, styleName, newStyleValue);
                    } else {
                        projectionOptions.styleApplyer(domNode, styleName, '');
                    }
                }
            } else {
                if (!propValue && typeof previousValue === 'string') {
                    propValue = '';
                }
                if (propName === 'value') {
                    var domValue = domNode[propName];
                    if (domValue !== propValue    // The 'value' in the DOM tree !== newValue
&& (domNode['oninput-value'] ? domValue === domNode['oninput-value']    // If the last reported value to 'oninput' does not match domValue, do nothing and wait for oninput
 : propValue !== previousValue    // Only update the value if the vdom changed
)) {
                        domNode[propName] = propValue;
                        // Reset the value, even if the virtual DOM did not change
                        domNode['oninput-value'] = undefined;
                    }
                    // else do not update the domNode, otherwise the cursor position would be changed
                    if (propValue !== previousValue) {
                        propertiesUpdated = true;
                    }
                } else if (propValue !== previousValue) {
                    var type = typeof propValue;
                    if (type === 'function') {
                        throw new Error('Functions may not be updated on subsequent renders (property: ' + propName + '). Hint: declare event handler functions outside the render() function.');
                    }
                    if (type === 'string' && propName !== 'innerHTML') {
                        if (projectionOptions.namespace === NAMESPACE_SVG && propName === 'href') {
                            domNode.setAttributeNS(NAMESPACE_XLINK, propName, propValue);
                        } else if (propName === 'role' && propValue === '') {
                            domNode.removeAttribute(propName);
                        } else {
                            domNode.setAttribute(propName, propValue);
                        }
                    } else {
                        if (domNode[propName] !== propValue) {
                            domNode[propName] = propValue;
                        }
                    }
                    propertiesUpdated = true;
                }
            }
        }
        return propertiesUpdated;
    };
    var findIndexOfChild = function (children, sameAs, start) {
        if (sameAs.vnodeSelector !== '') {
            // Never scan for text-nodes
            for (var i = start; i < children.length; i++) {
                if (same(children[i], sameAs)) {
                    return i;
                }
            }
        }
        return -1;
    };
    var nodeAdded = function (vNode, transitions) {
        if (vNode.properties) {
            var enterAnimation = vNode.properties.enterAnimation;
            if (enterAnimation) {
                if (typeof enterAnimation === 'function') {
                    enterAnimation(vNode.domNode, vNode.properties);
                } else {
                    transitions.enter(vNode.domNode, vNode.properties, enterAnimation);
                }
            }
        }
    };
    var nodeToRemove = function (vNode, transitions) {
        var domNode = vNode.domNode;
        if (vNode.properties) {
            var exitAnimation = vNode.properties.exitAnimation;
            if (exitAnimation) {
                domNode.style.pointerEvents = 'none';
                var removeDomNode = function () {
                    if (domNode.parentNode) {
                        domNode.parentNode.removeChild(domNode);
                    }
                };
                if (typeof exitAnimation === 'function') {
                    exitAnimation(domNode, removeDomNode, vNode.properties);
                    return;
                } else {
                    transitions.exit(vNode.domNode, vNode.properties, exitAnimation, removeDomNode);
                    return;
                }
            }
        }
        if (domNode.parentNode) {
            domNode.parentNode.removeChild(domNode);
        }
    };
    var checkDistinguishable = function (childNodes, indexToCheck, parentVNode, operation) {
        var childNode = childNodes[indexToCheck];
        if (childNode.vnodeSelector === '') {
            return;    // Text nodes need not be distinguishable
        }
        var properties = childNode.properties;
        var key = properties ? properties.key === undefined ? properties.bind : properties.key : undefined;
        if (!key) {
            for (var i = 0; i < childNodes.length; i++) {
                if (i !== indexToCheck) {
                    var node = childNodes[i];
                    if (same(node, childNode)) {
                        if (operation === 'added') {
                            throw new Error(parentVNode.vnodeSelector + ' had a ' + childNode.vnodeSelector + ' child ' + 'added, but there is now more than one. You must add unique key properties to make them distinguishable.');
                        } else {
                            throw new Error(parentVNode.vnodeSelector + ' had a ' + childNode.vnodeSelector + ' child ' + 'removed, but there were more than one. You must add unique key properties to make them distinguishable.');
                        }
                    }
                }
            }
        }
    };
    var createDom;
    var updateDom;
    var updateChildren = function (vnode, domNode, oldChildren, newChildren, projectionOptions) {
        if (oldChildren === newChildren) {
            return false;
        }
        oldChildren = oldChildren || emptyArray;
        newChildren = newChildren || emptyArray;
        var oldChildrenLength = oldChildren.length;
        var newChildrenLength = newChildren.length;
        var transitions = projectionOptions.transitions;
        var oldIndex = 0;
        var newIndex = 0;
        var i;
        var textUpdated = false;
        while (newIndex < newChildrenLength) {
            var oldChild = oldIndex < oldChildrenLength ? oldChildren[oldIndex] : undefined;
            var newChild = newChildren[newIndex];
            if (oldChild !== undefined && same(oldChild, newChild)) {
                textUpdated = updateDom(oldChild, newChild, projectionOptions) || textUpdated;
                oldIndex++;
            } else {
                var findOldIndex = findIndexOfChild(oldChildren, newChild, oldIndex + 1);
                if (findOldIndex >= 0) {
                    // Remove preceding missing children
                    for (i = oldIndex; i < findOldIndex; i++) {
                        nodeToRemove(oldChildren[i], transitions);
                        checkDistinguishable(oldChildren, i, vnode, 'removed');
                    }
                    textUpdated = updateDom(oldChildren[findOldIndex], newChild, projectionOptions) || textUpdated;
                    oldIndex = findOldIndex + 1;
                } else {
                    // New child
                    createDom(newChild, domNode, oldIndex < oldChildrenLength ? oldChildren[oldIndex].domNode : undefined, projectionOptions);
                    nodeAdded(newChild, transitions);
                    checkDistinguishable(newChildren, newIndex, vnode, 'added');
                }
            }
            newIndex++;
        }
        if (oldChildrenLength > oldIndex) {
            // Remove child fragments
            for (i = oldIndex; i < oldChildrenLength; i++) {
                nodeToRemove(oldChildren[i], transitions);
                checkDistinguishable(oldChildren, i, vnode, 'removed');
            }
        }
        return textUpdated;
    };
    var addChildren = function (domNode, children, projectionOptions) {
        if (!children) {
            return;
        }
        for (var i = 0; i < children.length; i++) {
            createDom(children[i], domNode, undefined, projectionOptions);
        }
    };
    var initPropertiesAndChildren = function (domNode, vnode, projectionOptions) {
        addChildren(domNode, vnode.children, projectionOptions);
        // children before properties, needed for value property of <select>.
        if (vnode.text) {
            domNode.textContent = vnode.text;
        }
        setProperties(domNode, vnode.properties, projectionOptions);
        if (vnode.properties && vnode.properties.afterCreate) {
            vnode.properties.afterCreate.apply(vnode.properties.bind || vnode.properties, [
                domNode,
                projectionOptions,
                vnode.vnodeSelector,
                vnode.properties,
                vnode.children
            ]);
        }
    };
    createDom = function (vnode, parentNode, insertBefore, projectionOptions) {
        var domNode, i, c, start = 0, type, found;
        var vnodeSelector = vnode.vnodeSelector;
        var doc = parentNode.ownerDocument;
        if (vnodeSelector === '') {
            domNode = vnode.domNode = doc.createTextNode(vnode.text);
            if (insertBefore !== undefined) {
                parentNode.insertBefore(domNode, insertBefore);
            } else {
                parentNode.appendChild(domNode);
            }
        } else {
            for (i = 0; i <= vnodeSelector.length; ++i) {
                c = vnodeSelector.charAt(i);
                if (i === vnodeSelector.length || c === '.' || c === '#') {
                    type = vnodeSelector.charAt(start - 1);
                    found = vnodeSelector.slice(start, i);
                    if (type === '.') {
                        domNode.classList.add(found);
                    } else if (type === '#') {
                        domNode.id = found;
                    } else {
                        if (found === 'svg') {
                            projectionOptions = extend(projectionOptions, { namespace: NAMESPACE_SVG });
                        }
                        if (projectionOptions.namespace !== undefined) {
                            domNode = vnode.domNode = doc.createElementNS(projectionOptions.namespace, found);
                        } else {
                            domNode = vnode.domNode = vnode.domNode || doc.createElement(found);
                            if (found === 'input' && vnode.properties && vnode.properties.type !== undefined) {
                                // IE8 and older don't support setting input type after the DOM Node has been added to the document
                                domNode.setAttribute('type', vnode.properties.type);
                            }
                        }
                        if (insertBefore !== undefined) {
                            parentNode.insertBefore(domNode, insertBefore);
                        } else if (domNode.parentNode !== parentNode) {
                            parentNode.appendChild(domNode);
                        }
                    }
                    start = i + 1;
                }
            }
            initPropertiesAndChildren(domNode, vnode, projectionOptions);
        }
    };
    updateDom = function (previous, vnode, projectionOptions) {
        var domNode = previous.domNode;
        var textUpdated = false;
        if (previous === vnode) {
            return false;    // By contract, VNode objects may not be modified anymore after passing them to maquette
        }
        var updated = false;
        if (vnode.vnodeSelector === '') {
            if (vnode.text !== previous.text) {
                var newVNode = domNode.ownerDocument.createTextNode(vnode.text);
                domNode.parentNode.replaceChild(newVNode, domNode);
                vnode.domNode = newVNode;
                textUpdated = true;
                return textUpdated;
            }
        } else {
            if (vnode.vnodeSelector.lastIndexOf('svg', 0) === 0) {
                projectionOptions = extend(projectionOptions, { namespace: NAMESPACE_SVG });
            }
            if (previous.text !== vnode.text) {
                updated = true;
                if (vnode.text === undefined) {
                    domNode.removeChild(domNode.firstChild);    // the only textnode presumably
                } else {
                    domNode.textContent = vnode.text;
                }
            }
            updated = updateChildren(vnode, domNode, previous.children, vnode.children, projectionOptions) || updated;
            updated = updateProperties(domNode, previous.properties, vnode.properties, projectionOptions) || updated;
            if (vnode.properties && vnode.properties.afterUpdate) {
                vnode.properties.afterUpdate.apply(vnode.properties.bind || vnode.properties, [
                    domNode,
                    projectionOptions,
                    vnode.vnodeSelector,
                    vnode.properties,
                    vnode.children
                ]);
            }
        }
        if (updated && vnode.properties && vnode.properties.updateAnimation) {
            vnode.properties.updateAnimation(domNode, vnode.properties, previous.properties);
        }
        vnode.domNode = previous.domNode;
        return textUpdated;
    };
    var createProjection = function (vnode, projectionOptions) {
        return {
            update: function (updatedVnode) {
                if (vnode.vnodeSelector !== updatedVnode.vnodeSelector) {
                    throw new Error('The selector for the root VNode may not be changed. (consider using dom.merge and add one extra level to the virtual DOM)');
                }
                updateDom(vnode, updatedVnode, projectionOptions);
                vnode = updatedVnode;
            },
            domNode: vnode.domNode
        };
    };
    // The other two parameters are not added here, because the Typescript compiler creates surrogate code for destructuring 'children'.
    exports.h = function (selector) {
        var properties = arguments[1];
        if (typeof selector !== 'string') {
            throw new Error();
        }
        var childIndex = 1;
        if (properties && !properties.hasOwnProperty('vnodeSelector') && !Array.isArray(properties) && typeof properties === 'object') {
            childIndex = 2;
        } else {
            // Optional properties argument was omitted
            properties = undefined;
        }
        var text;
        var children;
        var argsLength = arguments.length;
        // Recognize a common special case where there is only a single text node
        if (argsLength === childIndex + 1) {
            var onlyChild = arguments[childIndex];
            if (typeof onlyChild === 'string') {
                text = onlyChild;
            } else if (onlyChild !== undefined && onlyChild !== null && onlyChild.length === 1 && typeof onlyChild[0] === 'string') {
                text = onlyChild[0];
            }
        }
        if (text === undefined) {
            children = [];
            for (; childIndex < argsLength; childIndex++) {
                var child = arguments[childIndex];
                if (child === null || child === undefined) {
                } else if (Array.isArray(child)) {
                    appendChildren(selector, child, children);
                } else if (child.hasOwnProperty('vnodeSelector')) {
                    children.push(child);
                } else {
                    children.push(toTextVNode(child));
                }
            }
        }
        return {
            vnodeSelector: selector,
            properties: properties,
            children: children,
            text: text === '' ? undefined : text,
            domNode: null
        };
    };
    /**
 * Contains simple low-level utility functions to manipulate the real DOM.
 */
    exports.dom = {
        /**
     * Creates a real DOM tree from `vnode`. The [[Projection]] object returned will contain the resulting DOM Node in
     * its [[Projection.domNode|domNode]] property.
     * This is a low-level method. Users will typically use a [[Projector]] instead.
     * @param vnode - The root of the virtual DOM tree that was created using the [[h]] function. NOTE: [[VNode]]
     * objects may only be rendered once.
     * @param projectionOptions - Options to be used to create and update the projection.
     * @returns The [[Projection]] which also contains the DOM Node that was created.
     */
        create: function (vnode, projectionOptions) {
            projectionOptions = applyDefaultProjectionOptions(projectionOptions);
            createDom(vnode, document.createElement('div'), undefined, projectionOptions);
            return createProjection(vnode, projectionOptions);
        },
        /**
     * Appends a new child node to the DOM which is generated from a [[VNode]].
     * This is a low-level method. Users will typically use a [[Projector]] instead.
     * @param parentNode - The parent node for the new child node.
     * @param vnode - The root of the virtual DOM tree that was created using the [[h]] function. NOTE: [[VNode]]
     * objects may only be rendered once.
     * @param projectionOptions - Options to be used to create and update the [[Projection]].
     * @returns The [[Projection]] that was created.
     */
        append: function (parentNode, vnode, projectionOptions) {
            projectionOptions = applyDefaultProjectionOptions(projectionOptions);
            createDom(vnode, parentNode, undefined, projectionOptions);
            return createProjection(vnode, projectionOptions);
        },
        /**
     * Inserts a new DOM node which is generated from a [[VNode]].
     * This is a low-level method. Users wil typically use a [[Projector]] instead.
     * @param beforeNode - The node that the DOM Node is inserted before.
     * @param vnode - The root of the virtual DOM tree that was created using the [[h]] function.
     * NOTE: [[VNode]] objects may only be rendered once.
     * @param projectionOptions - Options to be used to create and update the projection, see [[createProjector]].
     * @returns The [[Projection]] that was created.
     */
        insertBefore: function (beforeNode, vnode, projectionOptions) {
            projectionOptions = applyDefaultProjectionOptions(projectionOptions);
            createDom(vnode, beforeNode.parentNode, beforeNode, projectionOptions);
            return createProjection(vnode, projectionOptions);
        },
        /**
     * Merges a new DOM node which is generated from a [[VNode]] with an existing DOM Node.
     * This means that the virtual DOM and the real DOM will have one overlapping element.
     * Therefore the selector for the root [[VNode]] will be ignored, but its properties and children will be applied to the Element provided.
     * This is a low-level method. Users wil typically use a [[Projector]] instead.
     * @param element - The existing element to adopt as the root of the new virtual DOM. Existing attributes and child nodes are preserved.
     * @param vnode - The root of the virtual DOM tree that was created using the [[h]] function. NOTE: [[VNode]] objects
     * may only be rendered once.
     * @param projectionOptions - Options to be used to create and update the projection, see [[createProjector]].
     * @returns The [[Projection]] that was created.
     */
        merge: function (element, vnode, projectionOptions) {
            projectionOptions = applyDefaultProjectionOptions(projectionOptions);
            vnode.domNode = element;
            initPropertiesAndChildren(element, vnode, projectionOptions);
            return createProjection(vnode, projectionOptions);
        },
        /**
     * Replaces an existing DOM node with a node generated from a [[VNode]].
     * This is a low-level method. Users will typically use a [[Projector]] instead.
     * @param element - The node for the [[VNode]] to replace.
     * @param vnode - The root of the virtual DOM tree that was created using the [[h]] function. NOTE: [[VNode]]
     * objects may only be rendered once.
     * @param projectionOptions - Options to be used to create and update the [[Projection]].
     * @returns The [[Projection]] that was created.
     */
        replace: function (element, vnode, projectionOptions) {
            projectionOptions = applyDefaultProjectionOptions(projectionOptions);
            createDom(vnode, element.parentNode, element, projectionOptions);
            element.parentNode.removeChild(element);
            return createProjection(vnode, projectionOptions);
        }
    };
    /**
 * Creates a [[CalculationCache]] object, useful for caching [[VNode]] trees.
 * In practice, caching of [[VNode]] trees is not needed, because achieving 60 frames per second is almost never a problem.
 * For more information, see [[CalculationCache]].
 *
 * @param <Result> The type of the value that is cached.
 */
    exports.createCache = function () {
        var cachedInputs;
        var cachedOutcome;
        return {
            invalidate: function () {
                cachedOutcome = undefined;
                cachedInputs = undefined;
            },
            result: function (inputs, calculation) {
                if (cachedInputs) {
                    for (var i = 0; i < inputs.length; i++) {
                        if (cachedInputs[i] !== inputs[i]) {
                            cachedOutcome = undefined;
                        }
                    }
                }
                if (!cachedOutcome) {
                    cachedOutcome = calculation();
                    cachedInputs = inputs;
                }
                return cachedOutcome;
            }
        };
    };
    /**
 * Creates a {@link Mapping} instance that keeps an array of result objects synchronized with an array of source objects.
 * See {@link http://maquettejs.org/docs/arrays.html|Working with arrays}.
 *
 * @param <Source>       The type of source items. A database-record for instance.
 * @param <Target>       The type of target items. A [[Component]] for instance.
 * @param getSourceKey   `function(source)` that must return a key to identify each source object. The result must either be a string or a number.
 * @param createResult   `function(source, index)` that must create a new result object from a given source. This function is identical
 *                       to the `callback` argument in `Array.map(callback)`.
 * @param updateResult   `function(source, target, index)` that updates a result to an updated source.
 */
    exports.createMapping = function (getSourceKey, createResult, updateResult) {
        var keys = [];
        var results = [];
        return {
            results: results,
            map: function (newSources) {
                var newKeys = newSources.map(getSourceKey);
                var oldTargets = results.slice();
                var oldIndex = 0;
                for (var i = 0; i < newSources.length; i++) {
                    var source = newSources[i];
                    var sourceKey = newKeys[i];
                    if (sourceKey === keys[oldIndex]) {
                        results[i] = oldTargets[oldIndex];
                        updateResult(source, oldTargets[oldIndex], i);
                        oldIndex++;
                    } else {
                        var found = false;
                        for (var j = 1; j < keys.length + 1; j++) {
                            var searchIndex = (oldIndex + j) % keys.length;
                            if (keys[searchIndex] === sourceKey) {
                                results[i] = oldTargets[searchIndex];
                                updateResult(newSources[i], oldTargets[searchIndex], i);
                                oldIndex = searchIndex + 1;
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            results[i] = createResult(source, i);
                        }
                    }
                }
                results.length = newSources.length;
                keys = newKeys;
            }
        };
    };
    /**
 * Creates a [[Projector]] instance using the provided projectionOptions.
 *
 * For more information, see [[Projector]].
 *
 * @param projectorOptions   Options that influence how the DOM is rendered and updated.
 */
    exports.createProjector = function (projectorOptions) {
        var projector;
        var projectionOptions = applyDefaultProjectionOptions(projectorOptions);
        projectionOptions.eventHandlerInterceptor = function (propertyName, eventHandler, domNode, properties) {
            return function () {
                // intercept function calls (event handlers) to do a render afterwards.
                projector.scheduleRender();
                return eventHandler.apply(properties.bind || this, arguments);
            };
        };
        var renderCompleted = true;
        var scheduled;
        var stopped = false;
        var projections = [];
        var renderFunctions = [];
        // matches the projections array
        var doRender = function () {
            scheduled = undefined;
            if (!renderCompleted) {
                return;    // The last render threw an error, it should be logged in the browser console.
            }
            renderCompleted = false;
            for (var i = 0; i < projections.length; i++) {
                var updatedVnode = renderFunctions[i]();
                projections[i].update(updatedVnode);
            }
            renderCompleted = true;
        };
        projector = {
            renderNow: doRender,
            scheduleRender: function () {
                if (!scheduled && !stopped) {
                    scheduled = requestAnimationFrame(doRender);
                }
            },
            stop: function () {
                if (scheduled) {
                    cancelAnimationFrame(scheduled);
                    scheduled = undefined;
                }
                stopped = true;
            },
            resume: function () {
                stopped = false;
                renderCompleted = true;
                projector.scheduleRender();
            },
            append: function (parentNode, renderMaquetteFunction) {
                projections.push(exports.dom.append(parentNode, renderMaquetteFunction(), projectionOptions));
                renderFunctions.push(renderMaquetteFunction);
            },
            insertBefore: function (beforeNode, renderMaquetteFunction) {
                projections.push(exports.dom.insertBefore(beforeNode, renderMaquetteFunction(), projectionOptions));
                renderFunctions.push(renderMaquetteFunction);
            },
            merge: function (domNode, renderMaquetteFunction) {
                projections.push(exports.dom.merge(domNode, renderMaquetteFunction(), projectionOptions));
                renderFunctions.push(renderMaquetteFunction);
            },
            replace: function (domNode, renderMaquetteFunction) {
                projections.push(exports.dom.replace(domNode, renderMaquetteFunction(), projectionOptions));
                renderFunctions.push(renderMaquetteFunction);
            },
            detach: function (renderMaquetteFunction) {
                for (var i = 0; i < renderFunctions.length; i++) {
                    if (renderFunctions[i] === renderMaquetteFunction) {
                        renderFunctions.splice(i, 1);
                        return projections.splice(i, 1)[0];
                    }
                }
                throw new Error('renderMaquetteFunction was not found');
            }
        };
        return projector;
    };
}));
//# sourceMappingURL=maquette.js.map


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

var test = __webpack_require__(6);
var transfert = __webpack_require__(180);
var dom = __webpack_require__(14);
var Mounter = __webpack_require__(179);
var createPerso = __webpack_require__(165);
var parseHTMLDocument = __webpack_require__(37);
var html = __webpack_require__(226);
var now = new Date(1457780950000);

test('pages/transfert: analyze', function (assert) {
    var context = createContext();
    var doc = parseHTMLDocument(html);
    var analysis = transfert.analyze(doc, {}, now, context);
    var objets = analysis.objets;

    assert.ok(analysis.raw, 'analysis: raw data is present');

    assert.strictEqual(objets.bonnet, undefined, 'analysis: number of objets in bonnet') ;
    assert.strictEqual(objets.sol.length, 1, 'analysis: number of objets in sol') ;
    assert.strictEqual(objets.inventaire.length, 13, 'analysis: number of objets in inventaire') ;

    assert.deepEqual(objets.sol[0], {
        id: 3819679,
        nom: 'Visée à poisson',
        image: '/images/objets/faux_thon.gif',
        description: '',
        type: 'rune',
        PAutiliser: 0,
        portee: 0,
        dommages: 0,
        rechargement: 0,
        PV: 100,
        PVmax: 100,
        PAreparer: 0,
        dispo: 0,
        forceBonus: -6,
        precisionBonus: 15,
        vieBonus: 0,
        intelligenceBonus: 0,
        collant: false,
        reparable: false,
        poussiere: 2418204
    }, 'sol[0] : visée à poisson');

    assert.deepEqual(objets.inventaire[0], {
        id: 25186146,
        nom: 'Arquebuse naine',
        image: '/images/objets/arquebuse.gif',
        description: '',
        type: 'arme',
        PAutiliser: 10,
        portee: 2,
        dommages: 20,
        rechargement: 1,
        PV: 100,
        PVmax: 100,
        PAreparer: 7,
        dispo: -14264,
        forceBonus: 0,
        precisionBonus: 0,
        vieBonus: 0,
        intelligenceBonus: 0,
        collant: false,
        reparable: true,
        poussiere: 2404936
    }, 'inventaire[0] : arquebuse naine');

    assert.deepEqual(analysis.pager, {
        PA: 5,
        vie: 149,
        position: [15, 4],
        messagesNonLus: 0,
        nainxpressNonLu: false
    }, 'analysis: pager');

    // check context
    assert.strictEqual(context.objets.sol.length, 1, 'context: objets in sol');
    assert.strictEqual(context.objets.bonnet.length, 1, 'context: objets in bonnet');
    assert.strictEqual(context.objets.inventaire.length, 13, 'context: objets in inventaire');

    assert.strictEqual(context.perso.vieTotal, 134, 'context: perso.vieTotal');
    assert.strictEqual(context.perso.force, 31, 'context: perso.force');
    assert.strictEqual(context.perso.precision, 310, 'context: perso.precision');
    assert.strictEqual(context.perso.intelligence, 90, 'context: perso.intelligence');
    assert.strictEqual(context.perso.vie, 149, 'context: perso.vie');

    assert.end();
});

test('pages/transfert: enhance', function (assert) {
    var context = createContext();
    var mounter = Mounter('test');
    var doc = parseHTMLDocument(html);
    transfert.analyze(doc, {}, now, context);
    transfert.enhance(doc, mounter, context);

    var boxes = dom.findAll('div[data-mounter="test"]', doc);
    assert.strictEqual(boxes.length, 4);

    // Perso: precision=310 -> dommages * 3.9
    assert.strictEqual(nomObjetBox(boxes[0]), 'Arquebuse naine');
    assert.strictEqual(boxes[0].text(), 'Dégâts : 74 à 82');  // dommages: 20
    assert.strictEqual(nomObjetBox(boxes[1]), 'Boomrang feu');
    assert.strictEqual(boxes[1].text(), 'Dégâts : 111 à 123');  // dommages: 30
    assert.strictEqual(nomObjetBox(boxes[2]), 'Revolver 6 coups');
    assert.strictEqual(boxes[2].text(), 'Dégâts : 56 à 61');  // dommages: 15

    assert.strictEqual(nomObjetBox(boxes[3]), 'Main collante de gosse');
    assert.strictEqual(boxes[3].text(), 'Etat : 1/3');

    assert.end();
});

function nomObjetBox(box) {
    return box.parent().parent().parent().find('.news-titre').text();
}

function createContext() {
    return {
        perso: createPerso(),
        objets: {
            bonnet: [{
                id: 23779038,
                nom: 'Potion de respécialisation',
                image: '/images/objets/potion_reset.png',
                description: 'Le pôle emploi te propose de changer de métier en revalorisant ton XP. ',
                type: 'jouet',
                PAutiliser: 24,
                portee: 0,
                dommages: 0,
                rechargement: 0,
                PV: 100,
                PVmax: 100,
                PAreparer: 0,
                dispo: 0,
                forceBonus: 0,
                precisionBonus: 0,
                vieBonus: 0,
                intelligenceBonus: 0,
                collant: false,
                reparable: false,
                poussiere: -1
            }],
            inventaire: [{
                id: 25186146,
                nom: 'Arquebuse naine',
                image: '/images/objets/arquebuse.gif',
                description: '',
                type: 'arme',
                PAutiliser: 10,
                portee: 2,
                dommages: 20,
                rechargement: 1,
                PV: 100,
                PVmax: 100,
                PAreparer: 7,
                dispo: -14264,
                forceBonus: 0,
                precisionBonus: 0,
                vieBonus: 0,
                intelligenceBonus: 0,
                collant: false,
                reparable: true,
                poussiere: 2404936
            }]
        }
    };
}


/***/ }),
/* 226 */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\n<html>\n<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n<link rel=\"stylesheet\" href=\"/css/main.css\" type=\"text/css\">\n<script language=\"JavaScript\" src=\"/js/base.js\" type=\"text/javascript\">\n</script>\n<script language=\"JavaScript\" src=\"/js/transfert.js\" type=\"text/javascript\">\n</script>\n<script language='JavaScript' type='text/javascript'>\n  if ((typeof Transfert=='undefined') ||\n      (Transfert.Version < '2.2.0'))\n    alert(\"Vous avez une vieille version de transfert.js, merci de vider votre cache\");\n</script>\n<script type=\"text/javascript\">\nvar varIDS=\"ffe4b3cbb54fbb388beba96acde1fb7c\";\n</script>\n\n<script type=\"text/javascript\" language=\"JavaScript\">\n var classeinterface=6;\n</script>\n</head>\n<body>\n<p class=\"titre\">[ Transfert d'objets ]</p>\n<p class=\"erreur\">Tu n'as plus cet objet !</p>\n<table align=\"center\">\n<tr>\n<td width=\"40%\" align=\"center\" valign=\"top\">\n<p class=\"titre\">[ Au sol ]</p><p>\n<script language=\"JavaScript\" type=\"text/javascript\">\nmip(3819679, \"Visée à poisson\", \"objets/faux_thon.gif\", '' , \"ramasser\", \"RUNE\", 0, 0, \"0\", 0, 100, 100, 0, 0, -6, 15, 0, 0, \"N\", \"N\", \"2418204\");\n\n</script></p><table class=\"coul_6\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n<tbody><tr><td class=\"angle VTVV_VNNV\"></td><td class=\"bande_h VTN\"></td><td class=\"angle VVTV_VVNN\"></td></tr><tr><td class=\"bande_v VT\"></td><td class=\"news-titre\">Visée à poisson</td><td class=\"bande_v TV\"></td></tr><tr><td class=\"angle TNVV_NVNV\"></td><td class=\"bande_h TVV\"></td><td class=\"angle VVNT_NVNV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"><img align=\"middle\" src=\"/images/objets/faux_thon.gif\" border=\"1\"> [ Force -6 | Précision +15 | Vie 0 | Intelligence 0 ] | <a href=\"transfert.php?IDS=ffe4b3cbb54fbb388beba96acde1fb7c&amp;action=ramasser&amp;idsol=3819679\">Ramasser</a> |<br> Tombe en poussière dans <span style=\"color: black\">27 jours et 23 heures</span><br></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"angle NVVV_NNVV\"></td><td class=\"bande_h VVN\"></td><td class=\"angle VVVN_NVVN\"></td></tr></tbody></table>\n\n</td>\n<td width=\"40%\" align=\"center\" valign=\"top\">\n<p class=\"titre\">[ Inventaire ]</p><p>\n<script language=\"JavaScript\" type=\"text/javascript\">\nmip(25186146, \"Arquebuse naine\", \"objets/arquebuse.gif\", '' , \"poser\", \"ARME\", 10, 2, \"20\", 1, 100, 100, 7, -14264, 0, 0, 0, 0, \"N\", \"O\", \"2404936\");\nmip(25183954, \"Boomrang feu\", \"objets/boomrang_feu.gif\", '' , \"poser\", \"ARME\", 8, 4, \"30\", 5, 100, 100, 8, -205980, 0, 0, 0, 0, \"N\", \"O\", \"2213220\");\nmip(25183955, \"Revolver 6 coups\", \"objets/revolver.gif\", '' , \"poser\", \"ARME\", 6, 4, \"15\", 2, 4, 6, 13, -87269, 0, 0, 0, 0, \"N\", \"O\", \"2331931\");\nmip(25183956, \"Batte de base-ball spéciale\", \"objets/batte.gif\", '' , \"poser\", \"ARME\", 8, 0, \"???\", 0, 70, 100, 19, -259682, 0, 0, 0, 0, \"N\", \"O\", \"2159518\");\nmip(25183949, \"Un peu d'amour en bocal\", \"objets/amour_en_bocal.gif\", '' , \"poser\", \"RUNE\", 0, 0, \"0\", 0, 100, 100, 0, -110030, 0, 0, 25, 0, \"N\", \"N\", \"1372877\");\nmip(25186168, \"Voiture de course\", \"objets/voiture_de_course.gif\", '' , \"poser\", \"VEHICULE\", 4, 0, \"0\", 0, 60, 100, 5, -189893, 0, 0, 0, 0, \"N\", \"O\", \"2413338\");\nmip(25183960, \"Pigeon voyageur\", \"objets/pigeon.gif\", '' , \"poser\", \"DETECTEUR\", 0, 8, \"0\", 0, 100, 100, 0, -110030, 0, 0, 0, 0, \"N\", \"N\", \"1372791\");\nmip(25161977, \"Bouteille vide\", \"objets/vinvide.gif\", '' , \"poser\", \"INUTILE\", 0, 0, \"0\", 0, 100, 100, 0, -110030, 0, 0, 0, 0, \"N\", \"O\", \"1862130\");\nmip(25134600, \"Fée Cabossée\", \"objets/fee.png\", '' , \"poser\", \"SPECIAL\", 5, 0, \"0\", 0, 100, 100, 0, -110030, 0, 0, 0, 0, \"O\", \"N\", \"-1\");\nmip(25159237, \"Kine d'Heure\", \"objets/kinder.gif\", '' , \"poser\", \"MANGER\", 0, 0, \"-76\", 40, 0, 0, 0, -189893, 0, 0, 0, 0, \"N\", \"N\", \"951613\");\nmip(25170639, \"Le bocal d'air\", \"objets/bocal_violet.gif\", '' , \"poser\", \"SPECIAL\", 1, 0, \"0\", 0, 100, 100, 0, -110030, 0, 0, 0, 0, \"N\", \"N\", \"288494\");\nmip(25170640, \"Main collante de gosse\", \"objets/main_collante.gif\", '' , \"poser\", \"SPECIAL\", 2, 0, \"0\", 0, 1, 3, 0, -200591, 0, 0, 0, 0, \"N\", \"N\", \"2330050\");\nmip(25170639, \"Tarte à la crème\", \"objets/tarte_creme.gif\", '' , \"poser\", \"ARME\", 4, 4, \"5\", 1, 100, 100, 2, -407945, 0, 0, 0, 0, \"N\", \"O\", \"2011255\");\n\n</script></p><table class=\"coul_6\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n<tbody><tr><td class=\"angle VTVV_VNNV\"></td><td class=\"bande_h VTN\"></td><td class=\"angle VVTV_VVNN\"></td></tr><tr><td class=\"bande_v VT\"></td><td class=\"news-titre\">Arquebuse naine</td><td class=\"bande_v TV\"></td></tr><tr><td class=\"angle TNVV_NVNV\"></td><td class=\"bande_h TVV\"></td><td class=\"angle VVNT_NVNV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"><img align=\"middle\" src=\"/images/objets/arquebuse.gif\" border=\"1\"> <b>Utiliser :</b> 10 PA (portée : 2 case(s), dommages : 20, rechargement : 1 j.) - <b>Etat :</b> 100/100 (réparation/nettoyage : 7 PA) | <a href=\"reparer.php?IDS=ffe4b3cbb54fbb388beba96acde1fb7c&amp;idinv=25186146\">Réparer/Nettoyer</a> | <a href=\"transfert.php?IDS=ffe4b3cbb54fbb388beba96acde1fb7c&amp;action=poser&amp;idinv=25186146\">Poser au sol</a> |<br> Tombe en poussière dans <span style=\"color: black\">27 jours et 20 heures</span><br></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"angle NVVV_NNVV\"></td><td class=\"bande_h VVN\"></td><td class=\"angle VVVN_NVVN\"></td></tr></tbody></table>\n<table class=\"coul_6\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n<tbody><tr><td class=\"angle VTVV_VNNV\"></td><td class=\"bande_h VTN\"></td><td class=\"angle VVTV_VVNN\"></td></tr><tr><td class=\"bande_v VT\"></td><td class=\"news-titre\">Boomrang feu</td><td class=\"bande_v TV\"></td></tr><tr><td class=\"angle TNVV_NVNV\"></td><td class=\"bande_h TVV\"></td><td class=\"angle VVNT_NVNV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"><img align=\"middle\" src=\"/images/objets/boomrang_feu.gif\" border=\"1\"> <b>Utiliser :</b> 8 PA (portée : 4 case(s), dommages : 30, rechargement : 5 j.) - <b>Etat :</b> 100/100 (réparation/nettoyage : 8 PA) | <a href=\"reparer.php?IDS=ffe4b3cbb54fbb388beba96acde1fb7c&amp;idinv=25183954\">Réparer/Nettoyer</a> | <a href=\"transfert.php?IDS=ffe4b3cbb54fbb388beba96acde1fb7c&amp;action=poser&amp;idinv=25183954\">Poser au sol</a> |<br> Tombe en poussière dans <span style=\"color: black\">25 jours et 14 heures</span><br></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"angle NVVV_NNVV\"></td><td class=\"bande_h VVN\"></td><td class=\"angle VVVN_NVVN\"></td></tr></tbody></table>\n<table class=\"coul_6\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n<tbody><tr><td class=\"angle VTVV_VNNV\"></td><td class=\"bande_h VTN\"></td><td class=\"angle VVTV_VVNN\"></td></tr><tr><td class=\"bande_v VT\"></td><td class=\"news-titre\">Revolver 6 coups</td><td class=\"bande_v TV\"></td></tr><tr><td class=\"angle TNVV_NVNV\"></td><td class=\"bande_h TVV\"></td><td class=\"angle VVNT_NVNV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"><img align=\"middle\" src=\"/images/objets/revolver.gif\" border=\"1\"> <b>Utiliser :</b> 6 PA (portée : 4 case(s), dommages : 15, rechargement : 2 j.) - <b>Etat :</b> 4/6 (réparation/nettoyage : 13 PA) | <a href=\"reparer.php?IDS=ffe4b3cbb54fbb388beba96acde1fb7c&amp;idinv=25183955\">Réparer/Nettoyer</a> | <a href=\"transfert.php?IDS=ffe4b3cbb54fbb388beba96acde1fb7c&amp;action=poser&amp;idinv=25183955\">Poser au sol</a> |<br> Tombe en poussière dans <span style=\"color: black\">26 jours et 23 heures</span><br></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"angle NVVV_NNVV\"></td><td class=\"bande_h VVN\"></td><td class=\"angle VVVN_NVVN\"></td></tr></tbody></table>\n<table class=\"coul_6\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n<tbody><tr><td class=\"angle VTVV_VNNV\"></td><td class=\"bande_h VTN\"></td><td class=\"angle VVTV_VVNN\"></td></tr><tr><td class=\"bande_v VT\"></td><td class=\"news-titre\">Batte de base-ball spéciale</td><td class=\"bande_v TV\"></td></tr><tr><td class=\"angle TNVV_NVNV\"></td><td class=\"bande_h TVV\"></td><td class=\"angle VVNT_NVNV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"><img align=\"middle\" src=\"/images/objets/batte.gif\" border=\"1\"> <b>Utiliser :</b> 8 PA (portée : 0 case(s), dommages : ???, rechargement : 0 j.) - <b>Etat :</b> 70/100 (réparation/nettoyage : 19 PA) | <a href=\"reparer.php?IDS=ffe4b3cbb54fbb388beba96acde1fb7c&amp;idinv=25183956\">Réparer/Nettoyer</a> | <a href=\"transfert.php?IDS=ffe4b3cbb54fbb388beba96acde1fb7c&amp;action=poser&amp;idinv=25183956\">Poser au sol</a> |<br> Tombe en poussière dans <span style=\"color: black\">24 jours et 23 heures</span><br></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"angle NVVV_NNVV\"></td><td class=\"bande_h VVN\"></td><td class=\"angle VVVN_NVVN\"></td></tr></tbody></table>\n<table class=\"coul_6\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n<tbody><tr><td class=\"angle VTVV_VNNV\"></td><td class=\"bande_h VTN\"></td><td class=\"angle VVTV_VVNN\"></td></tr><tr><td class=\"bande_v VT\"></td><td class=\"news-titre\">Un peu d'amour en bocal</td><td class=\"bande_v TV\"></td></tr><tr><td class=\"angle TNVV_NVNV\"></td><td class=\"bande_h TVV\"></td><td class=\"angle VVNT_NVNV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"><img align=\"middle\" src=\"/images/objets/amour_en_bocal.gif\" border=\"1\"> [ Force 0 | Précision 0 | Vie +25 | Intelligence 0 ] | <a href=\"transfert.php?IDS=ffe4b3cbb54fbb388beba96acde1fb7c&amp;action=poser&amp;idinv=25183949\">Poser au sol</a> |<br> Tombe en poussière dans <span style=\"color: black\">15 jours et 21 heures</span><br></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"angle NVVV_NNVV\"></td><td class=\"bande_h VVN\"></td><td class=\"angle VVVN_NVVN\"></td></tr></tbody></table>\n<table class=\"coul_6\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n<tbody><tr><td class=\"angle VTVV_VNNV\"></td><td class=\"bande_h VTN\"></td><td class=\"angle VVTV_VVNN\"></td></tr><tr><td class=\"bande_v VT\"></td><td class=\"news-titre\">Voiture de course</td><td class=\"bande_v TV\"></td></tr><tr><td class=\"angle TNVV_NVNV\"></td><td class=\"bande_h TVV\"></td><td class=\"angle VVNT_NVNV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"><img align=\"middle\" src=\"/images/objets/voiture_de_course.gif\" border=\"1\"> <b>Consommation :</b> 4 PA/case - <b>Etat :</b> 60/100 (réparation/nettoyage : 5 PA) | <a href=\"reparer.php?IDS=ffe4b3cbb54fbb388beba96acde1fb7c&amp;idinv=25186168\">Réparer/Nettoyer</a> | <a href=\"transfert.php?IDS=ffe4b3cbb54fbb388beba96acde1fb7c&amp;action=poser&amp;idinv=25186168\">Sortir du véhicule</a> |<br> Tombe en poussière dans <span style=\"color: black\">27 jours et 22 heures</span><br></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"angle NVVV_NNVV\"></td><td class=\"bande_h VVN\"></td><td class=\"angle VVVN_NVVN\"></td></tr></tbody></table>\n<table class=\"coul_6\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n<tbody><tr><td class=\"angle VTVV_VNNV\"></td><td class=\"bande_h VTN\"></td><td class=\"angle VVTV_VVNN\"></td></tr><tr><td class=\"bande_v VT\"></td><td class=\"news-titre\">Pigeon voyageur</td><td class=\"bande_v TV\"></td></tr><tr><td class=\"angle TNVV_NVNV\"></td><td class=\"bande_h TVV\"></td><td class=\"angle VVNT_NVNV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"><img align=\"middle\" src=\"/images/objets/pigeon.gif\" border=\"1\"> <b>Portée :</b> 8 case(s) | <a href=\"transfert.php?IDS=ffe4b3cbb54fbb388beba96acde1fb7c&amp;action=poser&amp;idinv=25183960\">Poser au sol</a> |<br> Tombe en poussière dans <span style=\"color: black\">15 jours et 21 heures</span><br></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"angle NVVV_NNVV\"></td><td class=\"bande_h VVN\"></td><td class=\"angle VVVN_NVVN\"></td></tr></tbody></table>\n<table class=\"coul_6\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n<tbody><tr><td class=\"angle VTVV_VNNV\"></td><td class=\"bande_h VTN\"></td><td class=\"angle VVTV_VVNN\"></td></tr><tr><td class=\"bande_v VT\"></td><td class=\"news-titre\">Bouteille vide</td><td class=\"bande_v TV\"></td></tr><tr><td class=\"angle TNVV_NVNV\"></td><td class=\"bande_h TVV\"></td><td class=\"angle VVNT_NVNV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"><img align=\"middle\" src=\"/images/objets/vinvide.gif\" border=\"1\">  (réparation/nettoyage : 0 PA) |<a href=\"reparer.php?IDS=ffe4b3cbb54fbb388beba96acde1fb7c&amp;idinv=25161977\">Réparer/Nettoyer</a> | <a href=\"transfert.php?IDS=ffe4b3cbb54fbb388beba96acde1fb7c&amp;action=poser&amp;idinv=25161977\">Poser au sol</a> |<br> Tombe en poussière dans <span style=\"color: black\">21 jours et 13 heures</span><br></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"angle NVVV_NNVV\"></td><td class=\"bande_h VVN\"></td><td class=\"angle VVVN_NVVN\"></td></tr></tbody></table>\n<table class=\"coul_6\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n<tbody><tr><td class=\"angle VTVV_VNNV\"></td><td class=\"bande_h VTN\"></td><td class=\"angle VVTV_VVNN\"></td></tr><tr><td class=\"bande_v VT\"></td><td class=\"news-titre\">Fée Cabossée</td><td class=\"bande_v TV\"></td></tr><tr><td class=\"angle TNVV_NVNV\"></td><td class=\"bande_h TVV\"></td><td class=\"angle VVNT_NVNV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"><img align=\"middle\" src=\"/images/objets/fee.png\" border=\"1\"> <b>Utiliser :</b> 5 PA | <a href=\"utiliser.php?IDS=ffe4b3cbb54fbb388beba96acde1fb7c&amp;idinv=25134600\"> Utiliser </a> |</td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"angle NVVV_NNVV\"></td><td class=\"bande_h VVN\"></td><td class=\"angle VVVN_NVVN\"></td></tr></tbody></table>\n<table class=\"coul_6\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n<tbody><tr><td class=\"angle VTVV_VNNV\"></td><td class=\"bande_h VTN\"></td><td class=\"angle VVTV_VVNN\"></td></tr><tr><td class=\"bande_v VT\"></td><td class=\"news-titre\">Kine d'Heure</td><td class=\"bande_v TV\"></td></tr><tr><td class=\"angle TNVV_NVNV\"></td><td class=\"bande_h TVV\"></td><td class=\"angle VVNT_NVNV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"><img align=\"middle\" src=\"/images/objets/kinder.gif\" border=\"1\"> <b>Gain de PV estimé :</b> -76 | <a href=\"utiliser.php?IDS=ffe4b3cbb54fbb388beba96acde1fb7c&amp;idinv=25159237\"> Consommer </a> | <a href=\"transfert.php?IDS=ffe4b3cbb54fbb388beba96acde1fb7c&amp;action=poser&amp;idinv=25159237\">Poser au sol</a> |<br> Tombe en poussière dans <span style=\"color: black\">11 jours et 0 heures</span><br></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"angle NVVV_NNVV\"></td><td class=\"bande_h VVN\"></td><td class=\"angle VVVN_NVVN\"></td></tr></tbody></table>\n<table class=\"coul_6\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n<tbody><tr><td class=\"angle VTVV_VNNV\"></td><td class=\"bande_h VTN\"></td><td class=\"angle VVTV_VVNN\"></td></tr><tr><td class=\"bande_v VT\"></td><td class=\"news-titre\">Le bocal d'air</td><td class=\"bande_v TV\"></td></tr><tr><td class=\"angle TNVV_NVNV\"></td><td class=\"bande_h TVV\"></td><td class=\"angle VVNT_NVNV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"><img align=\"middle\" src=\"/images/objets/bocal_violet.gif\" border=\"1\"> <b>Utiliser :</b> 1 PA | <a href=\"utiliser.php?IDS=ffe4b3cbb54fbb388beba96acde1fb7c&amp;idinv=25170639\"> Utiliser </a> | <a href=\"transfert.php?IDS=ffe4b3cbb54fbb388beba96acde1fb7c&amp;action=poser&amp;idinv=25170639\">Poser au sol</a> |<br> Tombe en poussière dans <span style=\"color: black\">3 jours et 8 heures</span><br></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"angle NVVV_NNVV\"></td><td class=\"bande_h VVN\"></td><td class=\"angle VVVN_NVVN\"></td></tr></tbody></table>\n<table class=\"coul_6\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n<tbody><tr><td class=\"angle VTVV_VNNV\"></td><td class=\"bande_h VTN\"></td><td class=\"angle VVTV_VVNN\"></td></tr><tr><td class=\"bande_v VT\"></td><td class=\"news-titre\">Main collante de gosse</td><td class=\"bande_v TV\"></td></tr><tr><td class=\"angle TNVV_NVNV\"></td><td class=\"bande_h TVV\"></td><td class=\"angle VVNT_NVNV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"><img align=\"middle\" src=\"/images/objets/main_collante.gif\" border=\"1\"> <b>Utiliser :</b> 2 PA | <a href=\"utiliser.php?IDS=ffe4b3cbb54fbb388beba96acde1fb7c&amp;idinv=25170640\"> Utiliser </a> | <a href=\"transfert.php?IDS=ffe4b3cbb54fbb388beba96acde1fb7c&amp;action=poser&amp;idinv=25170640\">Poser au sol</a> |<br> Tombe en poussière dans <span style=\"color: black\">26 jours et 23 heures</span><br></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"angle NVVV_NNVV\"></td><td class=\"bande_h VVN\"></td><td class=\"angle VVVN_NVVN\"></td></tr></tbody></table>\n<table class=\"coul_6\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n<tbody><tr><td class=\"angle VTVV_VNNV\"></td><td class=\"bande_h VTN\"></td><td class=\"angle VVTV_VVNN\"></td></tr><tr><td class=\"bande_v VT\"></td><td class=\"news-titre\">Tarte à la crème</td><td class=\"bande_v TV\"></td></tr><tr><td class=\"angle TNVV_NVNV\"></td><td class=\"bande_h TVV\"></td><td class=\"angle VVNT_NVNV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"><img align=\"middle\" src=\"/images/objets/tarte_creme.gif\" border=\"1\"> <b>Utiliser :</b> 4 PA (portée : 4 case(s), dommages : 5, rechargement : 1 j.) - <b>Etat :</b> 100/100 (réparation/nettoyage : 2 PA) | <a href=\"reparer.php?IDS=ffe4b3cbb54fbb388beba96acde1fb7c&amp;idinv=25170639\">Réparer/Nettoyer</a> | <a href=\"transfert.php?IDS=ffe4b3cbb54fbb388beba96acde1fb7c&amp;action=poser&amp;idinv=25170639\">Poser au sol</a> |<br> Tombe en poussière dans <span style=\"color: black\">23 jours et 6 heures</span><br></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"bande_v VN\"></td><td class=\"news-text\"></td><td class=\"bande_v NV\"></td></tr><tr><td class=\"angle NVVV_NNVV\"></td><td class=\"bande_h VVN\"></td><td class=\"angle VVVN_NVVN\"></td></tr></tbody></table>\n\n</td>\n</tr>\n</table>\n<script language=\"JavaScript\" type=\"text/javascript\">\nmiseajourpager('5', '149', '159', 'evenpagerlu', '?', 'chatpagerlu', '0', '15', '4', 'ffe4b3cbb54fbb388beba96acde1fb7c', 'NainXpress');\n\n</script>\n</body>\n</html>\n";

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

var array = __webpack_require__(50);
var detect = __webpack_require__(228);
var even = __webpack_require__(229);
var perso = __webpack_require__(230);
var encyclo = __webpack_require__(231);
var invent = __webpack_require__(177);
var transfert = __webpack_require__(180);
var attaquer = __webpack_require__(232);

function Pages(pages) {
    function byPath(path) {
        return array.find(pages, function (page) {
            return page.path === path;
        });
    }

    function byType(type) {
        return array.find(pages, function (page) {
            return page.type === type;
        });
    }

    return Object.freeze({
        list: pages,
        byType: byType,
        byPath: byPath
    });
}

var pages = Pages([
    detect,
    even,
    perso,
    encyclo,
    invent,
    transfert,
    attaquer
]);

module.exports = pages;


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

var assign = __webpack_require__(75);
var printHTML = __webpack_require__(52);
var Page = __webpack_require__(49);
var analyzeDetection = __webpack_require__(172);
var analyzePager = __webpack_require__(74);

function analyze(doc, params, date, context) {
    var detection = analyzeDetection(doc, date);
    var pager = analyzePager(doc, date);

    context.detection = detection;
    if (context.perso) {
        assign(context.perso, pager);
    }

    return {
        detection: detection,
        pager: pager,
        raw: printHTML(doc)
    };
}

module.exports = Page('detect', {
    analyze: analyze
});


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

var assign = __webpack_require__(75);
var printHTML = __webpack_require__(52);
var Page = __webpack_require__(49);
var analyzeEvenements = __webpack_require__(176);
var analyzePager = __webpack_require__(74);

function analyze(doc, params, date, context) {
    var evenements = analyzeEvenements(doc, date);
    var pager = analyzePager(doc, date);

    context.evenements = evenements;
    if (context.perso) {
        assign(context.perso, pager);
    }

    return {
        evenements: evenements,
        pager: pager,
        raw: printHTML(doc)
    };
}

module.exports = Page('even', {
    analyze: analyze,
    fetchParameters: {
        duree: 240,
        type: 'ALL'
    }
});


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

var printHTML = __webpack_require__(52);
var Page = __webpack_require__(49);
var analyzePerso = __webpack_require__(174);

function analyze(doc, params, date, context) {
    var perso = analyzePerso(doc, date);

    // TODO: assign?
    context.perso = perso;

    return {
        perso: perso,
        raw: printHTML(doc)
    };
}

module.exports = Page('perso', {
    analyze: analyze
});


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

var printHTML = __webpack_require__(52);
var Page = __webpack_require__(49);
var encycloAnalyzer = __webpack_require__(175);

function analyze(doc, params, date, context) {
    var listDocument = encycloAnalyzer.getListDocument(doc);
    var encyclo = encycloAnalyzer.analyzeListDocument(listDocument);

    context.encyclo = encyclo;

    return {
        encyclo: encyclo,
        raw: printHTML(listDocument)
    };
}

module.exports = Page('encyclo', {
    analyze: analyze
});


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

var Page = __webpack_require__(49);
var dom = __webpack_require__(14);
var Objet = __webpack_require__(166);
var Box = __webpack_require__(167);

function enhance(doc, mounter, context) {
    var inventaire = context.objets && context.objets.inventaire;
    var idRegex = /javascript:choisir\('(\d+)'\)/i;
    var linkElements = dom.findAll('a', doc);
    var objetsById = {};

    if (!inventaire) {
        return;
    }

    inventaire.forEach(function (objet) {
        objetsById[objet.id] = objet;
    });

    linkElements.forEach(function (link) {
        var element = link.parent();
        var href = link.attr('href');
        var match = idRegex.exec(href);
        var objet;

        if (match) {
            objet = objetsById[match[1]];
            if (objet) {
                mounter.prepend(element, Box(Objet(objet, context)));
            }
        }
    });
}

module.exports = Page('attaquer', {
    enhance: enhance
});


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(234);
__webpack_require__(235);


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

var test = __webpack_require__(6);
var dom = __webpack_require__(14);

function createDOMNodes() {
    var parent = document.createElement('div');
    var child1 = document.createElement('div');
    var child2 = document.createElement('div');

    parent.className = 'parent';
    child1.className = 'child child1';
    child2.className = 'child child2';
    child1.innerHTML = '<b>child 1</b>';
    child2.innerHTML = '<b>child 2</b>';
    child1.setAttribute('data-num', '1');
    child2.setAttribute('data-num', '2');

    document.body.appendChild(parent);
    parent.appendChild(child1);
    parent.appendChild(child2);

    function remove() {
        document.body.removeChild(parent);
    }

    return {
        parent: parent,
        child1: child1,
        child2: child2,
        remove: remove
    };
}

test('utilities/dom: find', function (assert) {
    var nodes = createDOMNodes();

    assert.strictEqual(dom.find('.parent').node, nodes.parent, 'find child');
    assert.strictEqual(dom.find('.child1').node, nodes.child1, 'find descendant');

    // cleanup
    nodes.remove();

    assert.end();
});

test('utilities/dom: findAll', function (assert) {
    var nodes = createDOMNodes();
    var children = dom.findAll('.child');

    assert.strictEqual(children.length, 2, 'findAll length');
    assert.strictEqual(children[0].node, nodes.child1, 'findAll child1');
    assert.strictEqual(children[1].node, nodes.child2, 'findAll child2');

    // cleanup
    nodes.remove();

    assert.end();
});

test('utilities/dom: Element.find', function (assert) {
    var nodes = createDOMNodes();
    var body = dom.Element(document.body);

    assert.strictEqual(body.find('.parent').node, nodes.parent, 'find child');
    assert.strictEqual(body.find('.child1').node, nodes.child1, 'find descendant');

    // cleanup
    nodes.remove();

    assert.end();
});

test('utilities/dom: Element.findAll', function (assert) {
    var nodes = createDOMNodes();
    var body = dom.Element(document.body);
    var children = body.findAll('.child');

    assert.strictEqual(children.length, 2, 'children length');
    assert.strictEqual(children[0].node, nodes.child1, 'child 1');
    assert.strictEqual(children[1].node, nodes.child2, 'child 2');

    // cleanup
    nodes.remove();

    assert.end();
});

test('utilities/dom: Element.parent', function (assert) {
    var nodes = createDOMNodes();
    var child1 = dom.Element(nodes.child1);

    assert.strictEqual(child1.parent().node, nodes.parent, 'parent');

    // cleanup
    nodes.remove();

    assert.end();
});

test('utilities/dom: Element.children', function (assert) {
    var nodes = createDOMNodes();
    var parent = dom.Element(nodes.parent);
    var children = parent.children();

    assert.strictEqual(children.length, 2, 'children length');
    assert.strictEqual(children[0].node, nodes.child1, 'child 1');
    assert.strictEqual(children[1].node, nodes.child2, 'child 2');

    // cleanup
    nodes.remove();

    assert.end();
});

test('utilities/dom: Element.firstChild', function (assert) {
    var nodes = createDOMNodes();
    var parent = dom.Element(nodes.parent);

    assert.strictEqual(parent.firstChild().node, nodes.child1, 'child 1');

    // cleanup
    nodes.remove();

    assert.end();
});

test('utilities/dom: Element.lastChild', function (assert) {
    var nodes = createDOMNodes();
    var parent = dom.Element(nodes.parent);

    assert.strictEqual(parent.lastChild().node, nodes.child2, 'child 2');

    // cleanup
    nodes.remove();

    assert.end();
});

test('utilities/dom: Element.text', function (assert) {
    var nodes = createDOMNodes();
    var child1 = dom.Element(nodes.child1);

    assert.strictEqual(child1.text(), 'child 1', 'text');

    // cleanup
    nodes.remove();

    assert.end();
});

test('utilities/dom: Element.html', function (assert) {
    var nodes = createDOMNodes();
    var child1 = dom.Element(nodes.child1);

    assert.strictEqual(child1.html(), '<b>child 1</b>', 'html');

    // cleanup
    nodes.remove();

    assert.end();
});

test('utilities/dom: Element.attr', function (assert) {
    var nodes = createDOMNodes();
    var child1 = dom.Element(nodes.child1);

    assert.strictEqual(child1.attr('data-num'), '1', 'attr');

    // cleanup
    nodes.remove();

    assert.end();
});

test('utilities/dom: Element.append', function (assert) {
    var nodes = createDOMNodes();
    var parent = dom.Element(nodes.parent);
    var div = document.createElement('div');

    parent.append(div);

    var children = parent.children();
    assert.strictEqual(children.length, 3, 'children length');
    assert.strictEqual(children[2].node, div, 'insert at the end');

    // cleanup
    nodes.remove();

    assert.end();
});

test('utilities/dom: Element.prepend', function (assert) {
    var nodes = createDOMNodes();
    var parent = dom.Element(nodes.parent);
    var div = document.createElement('div');

    parent.prepend(div);

    var children = parent.children();
    assert.strictEqual(children.length, 3, 'children length');
    assert.strictEqual(children[0].node, div, 'insert at the beginning');

    // cleanup
    nodes.remove();

    assert.end();
});


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

var test = __webpack_require__(6);
var httpHeaders = __webpack_require__(236);

test('utilities/http-headers: getDate', function (assert) {
    assert.strictEqual(
        httpHeaders.getDate({}),
        undefined,
        'no date'
    );

    assert.strictEqual(
        httpHeaders.getDate({
            'date': 'Thu, 06 Oct 2016 09:00:00 GMT'
        }).toISOString(),
        new Date('2016-10-06T09:00:00Z').toISOString(),
        'with date'
    );

    assert.end();
});

test('utilities/http-headers: getRetryAfter', function (assert) {
    assert.strictEqual(
        httpHeaders.getRetryAfter({}),
        undefined,
        'no retry-after'
    );

    assert.strictEqual(
        httpHeaders.getRetryAfter({
            'retry-after': 'Thu, 06 Oct 2016 09:01:00 GMT'
        }).toISOString(),
        new Date('2016-10-06T09:01:00Z').toISOString(),
        'date retry-after'
    );

    assert.strictEqual(
        httpHeaders.getRetryAfter({
            'date': 'Thu, 06 Oct 2016 09:00:00 GMT',
            'retry-after': '60'
        }).toISOString(),
        new Date('2016-10-06T09:01:00Z').toISOString(),
        'integer retry-after'
    );

    assert.end();
});


/***/ }),
/* 236 */
/***/ (function(module, exports) {

function parseDate(string) {
    var date = new Date(string);

    // is it a a valid date?
    if (isNaN(date.getTime())) {
        return;
    }

    return date;
}

function getDate(headers) {
    return parseDate(headers['date']);  // assume lowercase, as returned by parse-headers
}

function getRetryAfter(headers) {
    var date = getDate(headers) || new Date();
    var retryAfter = headers['retry-after'];  // assume lowercase, as returned by parse-headers
    var seconds = parseInt(retryAfter, 10);

    // is it an integer?
    if (String(seconds) === retryAfter) {
        date.setSeconds(date.getSeconds() + seconds);
        return date;
    }

    // then, it should be a date
    return parseDate(retryAfter);
}

module.exports = {
    getDate: getDate,
    getRetryAfter: getRetryAfter
};


/***/ })
/******/ ]);
//# sourceMappingURL=nany.unit_tests.js.map