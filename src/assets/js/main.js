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
  *	Detect Browser and Platform (Desktop or Mobile)
  *
  *************************************/
  var Sniffer = {
    detectBrowser: function detectBrowser() {
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
    detectPlatform: function detectPlatform() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? "isMobile" : "isDesktop";
    }
  };

  /*************************************
  *
  *	Helper Functions to Select things
  *
  *************************************/
  var S = {
    id: function id(name) {
      return document.getElementById(name);
    },
    "class": function _class(name) {
      return Array.prototype.slice.call(document.getElementsByClassName(name));
    },
    tag: function tag(name) {
      return Array.prototype.slice.call(document.getElementsByTagName(name));
    },
    html: document.documentElement,
    body: document.body
  };

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
  *    Helper Functions for Event Listeners
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
    vars: {
      raf: undefined,
      stop: false,
      frameCount: 0,
      fps: null,
      fpsInterval: null,
      startTime: null,
      now: null,
      then: null,
      elapsed: null
    },
    renderQueue: [],
    add: function add(fn) {
      var newFn = {
        id: Math.round(Math.random() * 3871245863215478),
        fn: fn
      }; // Add to render loop

      this.renderQueue.push(newFn); // console.log("Function added successfully: " + newFn.id);
      // Return the id so function can be removed later

      return newFn.id;
    },
    remove: function remove(id) {
      var _this = this;

      for (var i = 0; i < _this.renderQueue.length; i++) {
        if (_this.renderQueue[i].id === id) {
          // console.log("Function removed successfully: " + id);
          _this.renderQueue.splice(i, 1);

          return undefined;
        }
      }
    },
    start: function start() {
      var fps = 60;
      this.vars.fpsInterval = 1000 / fps;
      this.vars.then = Date.now();
      this.vars.startTime = this.vars.then;
      this.render();
    },
    stop: function stop() {
      window.cancelAnimationFrame(this.vars.raf);
    },
    render: function render() {
      var _this2 = this;

      // stop
      if (this.vars.stop) return; // request another frame

      this.vars.raf = window.requestAnimationFrame(function () {
        return _this2.render();
      }); // calc elapsed time since last loop

      this.vars.now = Date.now();
      this.vars.elapsed = this.vars.now - this.vars.then; // if enough time has elapsed, draw the next frame

      if (this.vars.elapsed < this.vars.fpsInterval) return; // Get ready for next frame by setting then=now, but...
      // Also, adjust for fpsInterval not being multiple of 16.67

      this.vars.then = this.vars.now - this.vars.elapsed % this.vars.fpsInterval; // Execute all functions

      this.renderQueue.forEach(function (fn) {
        return fn.fn();
      }); // TESTING - Report fps
      // var sinceStart = this.vars.now - this.vars.startTime;
      // var currentFps = Math.round(1000 / (sinceStart / ++ this.vars.frameCount) * 100) / 100;
      // console.log(currentFps);
    }
  };

  /*************************************
  *
  *    Observe Mouse Position
  *
  *	// Start observing the client mouse Position
  *	// Can be called many times and will only 
  *	// register one event listener
  *	Mouse.observe()
  *
  *	// Stop observing the mouse Position
  * 	// If observe has been called multiple times, scroll observing will not stop
  *	Mouse.stop()
  *
  *	// Returns current mouse Position
  *	// { x: 23, y: 234 }
  *	Mouse.pos
  *
  *************************************/
  var Mouse = {
    pos: {
      x: 0,
      y: 0
    },
    // last: {
    // 	x: 0,
    // 	y: 0
    // }, 
    speed: 0,
    calls: 0,
    observe: function observe() {
      this.calls++;

      if (this.calls == 1) {
        E.bind(this, ['setPos']);
        E.add(document, "mousemove", this.setPos);
      }
    },
    stop: function stop() {
      this.calls--;
      this.calls = M.clamp(this.calls, 0, Infinity);
      if (this.calls == 0) E.remove(document, "mousemove", this.setPos);
    },
    setPos: function setPos() {
      // this.last = this.pos;
      this.pos = {
        x: event.clientX,
        y: event.clientY
      }; // console.log(this.last.x + " " + this.pos.x);
    }
  };

  /*************************************
  *
  *    Observe Scroll Position
  *
  *	// Start observing the client scroll Position
  *	// Can be called many times and will only register one event listener
  *	//
  * 	// OPTIONAL: track speed, set custom ease
  *	Scroll.observe(true, 0.4)
  *
  *	// Stop observing the scroll Position
  * 	// If observe has been called multiple times, scroll observing will not stop
  *	Scroll.stop()
  *
  *	// Returns current scroll Position
  *	Scroll.pos
  *
  *************************************/
  var Scroll = {
    pos: 0,
    last: 0,
    speed: 0,
    _data: {
      speedFn: null,
      ease: 0.2,
      calls: 0
    },
    observe: function observe(speed, ease) {
      this._data.calls++;

      if (this._data.calls == 1) {
        this._data.ease = ease ? ease : 0.2;
        E.bind(this, ['setScroll', 'calcSpeed']);
        E.add(window, "scroll", this.setScroll);
        if (speed) this._data.speedFn = R.add(this.calcSpeed);
      }
    },
    stop: function stop() {
      this._data.calls--;
      this._data.calls = M.clamp(this.calls, 0, Infinity);

      if (this._data.calls == 0) {
        E.remove(window, "scroll", this.setScroll);
        if (this._data.speedFn) this._data.speedFn = R.remove(this._data.speedFn); // Reset ease

        this._data.ease = 0.2;
      }
    },
    setScroll: function setScroll() {
      this.pos = window.scrollY;
    },
    calcSpeed: function calcSpeed() {
      this.last = M.lerp(this.last, this.pos, this._data.ease);
      if (this.last < .1) this.last = 0;
      this.speed = this.pos - this.last;
    }
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
      this._bind(); // Global Variables


      this.global = {
        browser: Sniffer.detectBrowser(),
        platfrom: Sniffer.detectPlatform(),
        width: window.innerWidth,
        height: window.innerHeight
      }; // Add platfrom and browser version to body 

      S.body.classList.add(this.global.browser, this.global.platfrom);

      this._addEvents(); // Add test function to render queue


      R.add(this.testFn);
    }
    /*
    *	PRIVATE
    */
    // Bing Functions


    _createClass(App, [{
      key: "_bind",
      value: function _bind() {
        E.bind(this, ['onResize', 'testFn']);
      } // Add Functions

    }, {
      key: "_addEvents",
      value: function _addEvents() {
        E.add(window, "resize", this.onResize);
      }
      /*
      *	PUBLIC
      */

    }, {
      key: "onResize",
      value: function onResize() {
        this.global.width = window.innerWidth;
        this.global.height = window.innerHeight;
      }
    }, {
      key: "testFn",
      value: function testFn() {// console.log(this.global);
      }
    }]);

    return App;
  }();

  ready(function () {
    window.A = new App(); // Start render queue

    R.start();
    Mouse.observe();
    Scroll.observe(true, 0.4);
  });

}));
