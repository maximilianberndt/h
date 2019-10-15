(function (factory) {
  typeof define === 'function' && define.amd ? define('main', factory) :
  factory();
}(function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var ready = createCommonjsModule(function (module) {
  /*!
    * domready (c) Dustin Diaz 2014 - License MIT
    */
  !function (name, definition) {
    module.exports = definition();
  }('domready', function () {
    var fns = [],
        listener,
        doc = document,
        hack = doc.documentElement.doScroll,
        domContentLoaded = 'DOMContentLoaded',
        loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);
    if (!loaded) doc.addEventListener(domContentLoaded, listener = function () {
      doc.removeEventListener(domContentLoaded, listener);
      loaded = 1;

      while (listener = fns.shift()) listener();
    });
    return function (fn) {
      loaded ? setTimeout(fn, 0) : fns.push(fn);
    };
  });
  });

  /*************************************
  *
  *    Helper Functions for Math things
  *
  *   // Map value from one range to another
  *   M.map(0, 10, 100, 300)
  *
  *   // Calc the distance between two points
  *   M.dist(10, 20, 10, 30)
  *
  *   // Get a random value between two numbers
  *   M.rand(10, 20)
  *
  *************************************/
  var M = {
    map: function map(v, a, z, b, y) {
      return b + (y - b) * ((v - a) / (z - a));
    },
    lerp: function lerp(a, z, m) {
      return a * (1 - m) + z * m;
    },
    clamp: function clamp(v, a, z) {
      return Math.min(Math.max(v, a), z);
    },
    dist: function dist(a, b, z, y) {
      return Math.hypot(a - b, z - y);
    },
    rand: function rand(a, z) {
      return Math.random() * (z - a) + a;
    }
  };

  /*************************************
  *
  *   Render Queue running at 60fps
  *
  *	// Add function
  *	const functionId = R.add(function);
  *
  *	// Remove function
  *	R.remove(functionId);
  *
  *	// Start Rendering
  *	R.start();
  *
  *	// Stop Rendering
  *	R.stop();
  *
  *
  *************************************/
  var R = {
    // Variables for running animation frame at 60fps
    _data: {
      raf: undefined,
      stop: false,
      frameCount: 0,
      fps: 60,
      fpsInterval: null,
      startTime: null,
      now: null,
      then: null,
      elapsed: null
    },
    renderQueue: [],
    add: function add(fn) {
      var newFn = {
        id: Math.round(M.rand(1, 99999999)),
        fn: fn
      }; // Add to render loop

      this.renderQueue.push(newFn); // Return the id so function can be removed later

      return newFn.id;
    },
    remove: function remove(id) {
      var _this = this;

      for (var i = 0; i < _this.renderQueue.length; i++) {
        if (_this.renderQueue[i].id === id) {
          _this.renderQueue.splice(i, 1);

          return undefined;
        }
      }
    },
    start: function start() {
      this._data.fpsInterval = 1000 / this._data.fps;
      this._data.then = Date.now();
      this._data.startTime = this._data.then;
      this.render();
    },
    stop: function stop() {
      window.cancelAnimationFrame(this._data.raf);
    },
    render: function render() {
      var _this2 = this;

      // stop
      if (this._data.stop) return; // request another frame

      this._data.raf = window.requestAnimationFrame(function () {
        return _this2.render();
      }); // calc elapsed time since last loop

      this._data.now = Date.now();
      this._data.elapsed = this._data.now - this._data.then; // if enough time has elapsed, draw the next frame

      if (this._data.elapsed < this._data.fpsInterval) return; // Get ready for next frame by setting then=now, but...
      // Also, adjust for fpsInterval not being multiple of 16.67

      this._data.then = this._data.now - this._data.elapsed % this._data.fpsInterval; // Execute all functions

      this.renderQueue.forEach(function (fn) {
        return fn.fn();
      }); // TESTING - Report fps
      // var sinceStart = this._data.now - this._data.startTime;
      // var currentFps = Math.round(1000 / (sinceStart / ++ this._data.frameCount) * 100) / 100;
      // console.log(currentFps);
    }
  };

  /*************************************
  *
  *	Detect Browser and Platform (Desktop or Mobile)
  *
  *************************************/
  var Sniff = {
    browser: function browser() {
      var sBrowser,
          sUsrAg = navigator.userAgent;

      if (sUsrAg.indexOf("Chrome") > -1) {
        sBrowser = "isChrome";
      } else if (sUsrAg.indexOf("Safari") > -1) {
        sBrowser = "isSafari";
      } else if (sUsrAg.indexOf("Opera") > -1) {
        sBrowser = "isOpera";
      } else if (sUsrAg.indexOf("Firefox") > -1) {
        sBrowser = "isFirefox";
      } else if (sUsrAg.indexOf("MSIE") > -1) {
        sBrowser = "isMicrosoft";
      }

      return sBrowser;
    },
    platfrom: function platfrom() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? "isMobile" : "isDesktop";
    }
  };

  /*************************************
  *
  *	Debounce function
  *
  *	Execute function after given delay
  *
  *************************************/
  var debounce = function debounce(fn, delay) {
    var dt;
    return function () {
      var ctx = this;
      var args = arguments;
      clearTimeout(dt);
      dt = setTimeout(function () {
        return fn.apply(ctx, args);
      }, delay);
    };
  };

  /*************************************
  *
  *    Helper Functions for Elements
  *
  *	// Bind functions
  *	E.bind([arrayOfFunctions], this);
  *
  *	// Add Event Listener
  *	E.add(S.id("headline"), "mouseenter", testFunction);
  *
  *	// Remove Event Listener
  *	E.add(S.id("headline"), "mouseenter", testFunction);
  *
  *	
  *	// Select Element by id
  *	E.get('#headline')
  *
  *
  *************************************/
  var E = {
    bind: function bind(_this, fns) {
      fns.forEach(function (fn) {
        return _this[fn] = _this[fn].bind(_this);
      });
    },
    add: function add(el, type, fn) {
      if (el.length) {
        el.forEach(function (el) {
          return el.addEventListener(type, fn, false);
        });
      } else {
        el.addEventListener(type, fn, false);
      }
    },
    remove: function remove(el, type, fn) {
      if (el.length) {
        el.forEach(function (el) {
          return el.removeEventListener(type, fn, false);
        });
      } else {
        el.removeEventListener(type, fn, false);
      }
    },
    get: function get(el, parent) {
      var p = parent || document;
      var type = checkType(el.charAt(0));
      if (type !== 'tag') el = el.substr(1);
      return type === "id" ? p.getElementById(el) : type === "class" ? Array.prototype.slice.call(p.getElementsByClassName(el)) : Array.prototype.slice.call(p.getElementsByTagName(el));

      function checkType(el) {
        return el === '#' ? 'id' : el === '.' ? 'class' : 'tag';
      }
    }
  };

  /*************************************
  *
  *    Global storage for variables
  *
  *    Resize event listener is automatically created
  *
  *************************************/
  var G = {
    browser: Sniff.browser(),
    platform: Sniff.platfrom(),
    width: window.innerWidth,
    height: window.innerHeight,
    i: function () {
      var resizeFn = function resizeFn() {
        G.width = window.innerWidth;
        G.height = window.innerHeight;
      };

      E.add(window, "resize", debounce(resizeFn, 250));
    }()
  };

  /*************************************
  *
  *	Dom Elements
  *
  *************************************/
  var Dom = {
    body: document.body,
    html: document.documentElement
  };

  // if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker.register('../../sw.js');
  // }

  var App =
  /*#__PURE__*/
  function () {
    function App() {
      _classCallCheck(this, App);

      // Bind functions
      this._bind();

      this._addEvents();

      Dom.body.classList.add(G.browser, G.platfrom); // Add test function to render queue

      R.add(this.testFn);
    } // Bind Functions


    _createClass(App, [{
      key: "_bind",
      value: function _bind() {
        E.bind(this, ['testFn']);
      } // Add Functions

    }, {
      key: "_addEvents",
      value: function _addEvents() {
        E.add(window, "click", this.testFn);
      }
      /*
      *	PUBLIC
      */

    }, {
      key: "testFn",
      value: function testFn() {// console.log(this);
      }
    }]);

    return App;
  }();

  ready(function () {
    window.A = new App();
    console.log("Testing"); // Start render queue

    R.start();
  });

}));
