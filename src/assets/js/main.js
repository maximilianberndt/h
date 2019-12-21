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

      var rqLength = this.renderQueue.length;

      for (var i = 0; i < rqLength; i++) {
        this.renderQueue[i].fn();
      } // TESTING - Report fps
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
  *	// Change innerHTML
  *	E.content(el, "newContetn");
  *
  *	
  *	// Select Element by id
  *	E.get('#headline')
  *
  *
  *************************************/
  var E = {
    bind: function bind(_this, fns) {
      var fnsLength = fns.length;

      for (var i = 0; i < fnsLength; i++) {
        _this[fns[i]] = _this[fns[i]].bind(_this);
      }
    },
    add: function add(el, type, fn) {
      var passive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (el.length) {
        el.forEach(function (el) {
          return el.addEventListener(type, fn, passive);
        });
      } else {
        el.addEventListener(type, fn, passive);
      }
    },
    remove: function remove(el, type, fn) {
      var passive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (el.length) {
        el.forEach(function (el) {
          return el.removeEventListener(type, fn, passive);
        });
      } else {
        el.removeEventListener(type, fn, passive);
      }
    },
    content: function content(el, _content) {
      el.innerHTML = _content;
    },
    get: function get(el, p) {
      p = p || document; // Simple selects

      if (/^(#?[\w-]+|\.[\w-.]+)$/.test(el)) {
        switch (el.charAt(0)) {
          case '#':
            return [p.getElementById(el.substr(1))];

          case '.':
            var classes = el.substr(1).replace(/\./g, ' ');
            return [].slice.call(p.getElementsByClassName(classes));

          default:
            return [].slice.call(p.getElementsByTagName(el));
        }
      } // Complex selects


      return [].slice.call(p.queryelAll(el));
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
    html: document.documentElement,
    remove: function remove(el) {
      el.parentNode.removeChild(el);
    },
    add: function add(el, p) {
      p.appendChild(el);
    },
    create: function create(newEl) {
      return document.createElement(newEl);
    }
  };

  /*************************************
  *
  *	Helper Functions to set style
  *
  *   // Transform, opacity, pointerEvents, display
  *
  *************************************/
  var S = {
    t: function t(el, u) {
      var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      el.style.transform = "translate3d(".concat(x).concat(u, ", ").concat(y).concat(u, ", 0px)");
    },
    o: function o(el, _o) {
      el.style.opacity = _o;
    },
    pe: function pe(el, _pe) {
      el.style.pointerEvents = _pe;
    },
    d: function d(el, _d) {
      el.style.display = _d;
    }
  };

  /*************************************
  *
  *    Observe Scroll Position
  *
  *	// Start observing the client scroll Position
  *	// Can be called many times and will only register one event listener
  *	// Scroll.start()
  *	//
  * 	// OPTIONAL: track speed and set custom ease (higher ease, more damping)
  *	Scroll.start(true, 0.4)
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
      isActive: false
    },
    start: function start(speed, ease) {
      if (this._data.isActive) return; // Add csutom ease or 0.2 ease

      this._data.ease = ease || 0.2; // Bind functions and register event listeners

      E.bind(this, ['_setScroll', '_calcSpeed']);
      E.add(window, "scroll", this._setScroll); // OPTIONAL: Calculate Scroll speed

      if (speed) this._data.speedFn = R.add(this._calcSpeed);
    },
    stop: function stop() {
      if (!this._data.isActive) return; // Reomve event listener

      E.remove(window, "scroll", this._setScroll); // Reomve _calcSpeed from rendern queue

      if (this._data.speedFn) this._data.speedFn = R.remove(this._data.speedFn); // Reset ease

      this._data.ease = 0.2;
    },
    _setScroll: function _setScroll() {
      this.pos = window.scrollY;
    },
    _calcSpeed: function _calcSpeed() {
      this.last = M.lerp(this.last, this.pos, this._data.ease);
      if (this.last < .1) this.last = 0;
      this.speed = this.pos - this.last;
    }
  };

  var ScrollReveal =
  /*#__PURE__*/
  function () {
    function ScrollReveal() {
      _classCallCheck(this, ScrollReveal);

      E.bind(this, ['_observeEls']);
      this.cache = this._fillCache();
      Scroll.start();
      this.raf = R.add(this._observeEls);
    }

    _createClass(ScrollReveal, [{
      key: "_fillCache",
      value: function _fillCache() {
        var cache = [];
        var els = E.get(".scrollReveal");

        for (var i = 0; i < els.length; i++) {
          var el = {
            el: els[i],
            isVisible: false
          };
          var bounds = els[i].getBoundingClientRect();
          el.top = bounds.top;
          el.bottom = bounds.bottom - bounds.height * 0.5;
          el.height = bounds.height;
          cache.push(el);
        }

        return cache;
      }
    }, {
      key: "_observeEls",
      value: function _observeEls() {
        var revealBreakpoint = Scroll.pos + G.height;

        for (var i = 0; i < this.cache.length; i++) {
          var el = this.cache[i];

          if (el.isVisible) {
            continue;
          }

          if (el.bottom < revealBreakpoint) {
            el.isVisible = true; // Scroll Reveal

            S.o(el.el, 1);
            S.t(el.el, 0);
          }
        }
      }
    }]);

    return ScrollReveal;
  }();

  var Slider =
  /*#__PURE__*/
  function () {
    function Slider(container) {
      _classCallCheck(this, Slider);

      if (!container) return;

      this._bind();

      this.options = {
        container: container,
        nextButton: '.next',
        prevButton: '.prev',
        slider: '.slider',
        slideEl: '.slide-el',
        speed: 2,
        ease: 0.1
      };
      this.data = {
        min: 0,
        max: 0,
        isDragging: false,
        progress: 0,
        startX: 0,
        endX: 0,
        lastX: 0,
        curX: 0,
        raf: null
      };

      this._fillCache();

      this._getBounds();

      this._addEvents();

      this._start();
    }

    _createClass(Slider, [{
      key: "findClosest",
      value: function findClosest(goal, array) {
        var closest = array.reduce(function (prev, curr) {
          return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
        });
        return array.indexOf(closest);
      }
    }, {
      key: "_bind",
      value: function _bind() {
        E.bind(this, ['nextSlide', 'prevSlide', 'run', 'on', 'off', 'setPos', '_onResize']);
      }
    }, {
      key: "_addEvents",
      value: function _addEvents() {
        var p = this.data.container;

        var _this = this;

        if (this.nextButton) E.add(this.nextButton, "click", this.nextSlide);
        if (this.nextButton) E.add(this.prevButton, "click", this.prevSlide);
        E.add(window, "resize", debounce(_this._onResize, 250));
        E.add(this.container, "mousedown", this.on);
        E.add(Dom.body, "mouseup", this.off);
        E.add(this.container, "mousemove", this.setPos);
        E.add(this.container, "touchstart", this.on);
        E.add(Dom.body, "touchend", this.off);
        E.add(this.container, "touchmove", this.setPos, true);
      }
    }, {
      key: "_getBounds",
      value: function _getBounds() {
        var totalWidth = 0;
        this.snapPoints = [];

        for (var i = 0; i < this.slides.length; i++) {
          var slideBCR = this.slides[i].getBoundingClientRect();
          var slideWidth = slideBCR.width;
          var snapPoint = -(slideWidth / 2 + totalWidth);
          this.snapPoints.push(snapPoint);
          totalWidth += slideWidth;
        }

        this.data.max = -(totalWidth - G.width);
        this.data.min = 0;
      }
    }, {
      key: "_onResize",
      value: function _onResize() {
        this._getBounds();
      }
    }, {
      key: "_destroy",
      value: function _destroy() {
        this._stop();

        if (this.nextButton) E.remove(this.nextButton, "click", this.nextSlide);
        if (this.nextButton) E.remove(this.prevButton, "click", this.prevSlide);
        E.remove(window, "resize", _this._onResize);
        E.remove(this.container, "mousedown", this.on);
        E.remove(Dom.body, "mouseup", this.off);
        E.remove(this.container, "mousemove", this.setPos);
        E.remove(this.container, "touchstart", this.on);
        E.remove(Dom.body, "touchend", this.off);
        E.remove(this.container, "touchmove", this.setPos, true);
      }
    }, {
      key: "_fillCache",
      value: function _fillCache() {
        var p = this.container = this.options.container;
        this.nextButton = E.get(this.options.nextButton, p);
        this.prevButton = E.get(this.options.prevButton, p);
        this.slider = E.get(this.options.slider, p)[0];
        this.slides = E.get(this.options.slideEl, p);
      }
    }, {
      key: "_start",
      value: function _start() {
        this.data.raf = R.add(this.run);
      }
    }, {
      key: "_stop",
      value: function _stop() {
        R.remove(this.data.raf);
      }
    }, {
      key: "on",
      value: function on(e) {
        this.data.startX = e.clientX || e.touches[0].pageX;
        this.data.isDragging = true;
      }
    }, {
      key: "off",
      value: function off() {
        this.data.endX = this.data.curX;
        this.data.isDragging = false;
      }
    }, {
      key: "setPos",
      value: function setPos(e) {
        if (!this.data.isDragging) return;
        var cur = e.clientX || e.touches[0].pageX;
        this.data.curX = this.data.endX + (cur - this.data.startX) * this.options.speed;
        this.data.curX = M.clamp(this.data.curX, this.data.max, this.data.min);
      }
    }, {
      key: "run",
      value: function run() {
        this.data.lastX = M.lerp(this.data.lastX, this.data.curX, this.options.ease);
        this.data.lastX = Math.floor(this.data.lastX * 100) / 100;
        this.data.progress = M.map(this.data.lastX, this.data.min, this.data.max, 0, 1);
        this.data.progress = Math.floor(this.data.progress * 100) / 100;
        S.t(this.slider, "px", this.data.lastX);
      }
    }, {
      key: "nextSlide",
      value: function nextSlide() {
        var curSnappoint = this.findClosest(this.data.lastX, this.snapPoints);
        curSnappoint++;
        var newSnapPos = this.snapPoints[curSnappoint];
        if (newSnapPos && newSnapPos > this.data.max) this.data.curX = this.data.endX = newSnapPos;
      }
    }, {
      key: "prevSlide",
      value: function prevSlide() {
        var curSnappoint = this.findClosest(this.data.lastX, this.snapPoints);
        curSnappoint--;
        var newSnapPos = this.snapPoints[curSnappoint];
        if (newSnapPos && newSnapPos > this.data.max) this.data.curX = this.data.endX = newSnapPos;
      }
    }]);

    return Slider;
  }();

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

      Dom.body.classList.add(G.browser, G.platform);
      new ScrollReveal();
      var sliders = [];
      E.get(".slider-container").forEach(function (container, i) {
        return sliders[i] = new Slider(container);
      }); // Add test function to render queue

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
      value: function testFn() {// console.log(Scroll.pos)
      }
    }]);

    return App;
  }();

  ready(function () {
    window.A = new App(); // Start render queue

    R.start();
  });

}));
