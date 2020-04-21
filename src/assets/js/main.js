(function (factory) {
  typeof define === 'function' && define.amd ? define('main', factory) :
  factory();
}((function () { 'use strict';

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

  var bind = function bind(_this, fn) {
    var fnLength = fn.length;

    for (var i = 0; i < fnLength; i++) {
      _this[fn[i]] = _this[fn[i]].bind(_this);
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
  *	Detect Browser and Platform (Desktop or Mobile)
  *
  *************************************/
  var getBrowser = function getBrowser() {
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
  };
  var getPlatform = function getPlatform() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? "isMobile" : "isDesktop";
  };

  /*************************************
  *
  *    Helper Functions for Math things
  *
  *   // Map value from one range to another
  *   utils.map(0, 10, 100, 300)
  *
  *   // Calc the distance between two points
  *   utils.dist(10, 20, 10, 30)
  *
  *   // Get a random value between two numbers
  *   utils.rand(10, 20)
  *
  *************************************/
  var map = function map(v, a, z, b, y) {
    return b + (y - b) * ((v - a) / (z - a));
  };
  var lerp = function lerp(a, z, m) {
    return b + (y - b) * ((v - a) / (z - a));
  };
  var clamp = function clamp(v, a, z) {
    return Math.min(Math.max(v, a), z);
  };
  var dist = function dist(v, a, z, b, y) {
    return Math.hypot(a - b, z - y);
  };
  var rand = function rand(a, z) {
    return Math.random() * (z - a) + a;
  };

  /*************************************
  *
  *    Global storage for variables
  *
  *    Resize event listener is created automatically
  *
  *************************************/
  var G = {
    browser: getBrowser(),
    platform: getPlatform(),
    width: window.innerWidth,
    height: window.innerHeight,
    isReady: false,
    i: function () {
      var resizeFn = function resizeFn() {
        utils.G.width = window.innerWidth;
        utils.G.height = window.innerHeight;
      };

      window.addEventListener("resize", debounce(resizeFn, 250));
    }()
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
        id: Math.round(rand(1, 99999999)),
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

      var rqLength = this.renderQueue.length;

      for (var i = 0; i < rqLength; i++) {
        this.renderQueue[i].fn();
      } // TESTING - Report fps
      // var sinceStart = this._data.now - this._data.startTime;
      // var currentFps = Math.round(1000 / (sinceStart / ++ this._data.frameCount) * 100) / 100;
      // console.log(currentFps);

    }
  };

  // basic intersetion observer
  var IO = function IO(el, cb) {
    // Create new IntersectionObserver
    var io = new IntersectionObserver(function (entries) {
      updateStatus(entries[0]);
    }); // Start observing

    io.observe(el); // the cb

    function updateStatus(data) {
      if (G.isReady) return cb(data);
    }
  };

  /*************************************
   *
   *  Base for helper functions
   *
   *************************************/
  var utils$1 = {
    map: map,
    lerp: lerp,
    clamp: clamp,
    dist: dist,
    rand: rand,
    bind: bind,
    debounce: debounce,
    getBrowser: getBrowser,
    getPlatform: getPlatform,
    G: G,
    R: R,
    IO: IO
  };

  // import {Scroll} from './Modules/ScrollObserver.js';
  // import {ScrollReveal} from './Modules/ScrollReveal.js';
  // import {Slider} from './Modules/Slider.js';

  var App = /*#__PURE__*/function () {
    function App() {
      _classCallCheck(this, App);

      // Bind functions
      this._bind();

      this._addEvents();

      document.body.classList.add(utils$1.G.browser, utils$1.G.platform);
      document.querySelectorAll(".test").forEach(function (el) {
        utils$1.IO(el, function (data) {
          if (data.isIntersecting) {
            console.log(data);
          } else {
            console.log("is hidden now");
          }
        });
      }); // Add test function to render queue
      // utils.R.add(this.testFn);
      // utils.R.start();
    } // Bind Functions


    _createClass(App, [{
      key: "_bind",
      value: function _bind() {
        utils$1.bind(this, ['testFn']);
      } // Add Functions

    }, {
      key: "_addEvents",
      value: function _addEvents() {
        window.addEventListener("click", this.testFn, false);
      }
      /*
      *	PUBLIC
      */

    }, {
      key: "testFn",
      value: function testFn() {
        console.log("test");
      }
    }]);

    return App;
  }();

  ready(function () {
    window.A = new App();
    utils$1.G.isReady = true;
  });

})));
