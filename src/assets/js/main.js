(function (factory) {
	typeof define === 'function' && define.amd ? define('main', factory) :
	factory();
}(function () { 'use strict';

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
	const Sniffer = {
	  detectBrowser: function () {
	    let sBrowser,
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
	  detectPlatform: function () {
	    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? "isMobile" : "isDesktop";
	  }
	};

	/*************************************
	*
	*	Helper Functions to Select things
	*
	*************************************/
	const S = {
	  id: function (name) {
	    return document.getElementById(name);
	  },
	  class: function (name) {
	    return Array.prototype.slice.call(document.getElementsByClassName(name));
	  },
	  tag: function (name) {
	    return Array.prototype.slice.call(document.getElementsByTagName(name));
	  },
	  html: document.documentElement,
	  body: document.body
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
	const E = {
	  bind: function (_this, fns) {
	    fns.forEach(fn => _this[fn] = _this[fn].bind(_this));
	  },
	  add: function (el, type, fn) {
	    if (el.length) {
	      el.forEach(el => el.addEventListener(type, fn, false));
	    } else {
	      el.addEventListener(type, fn, false);
	    }
	  },
	  remove: function (el, type, fn) {
	    if (el.length) {
	      el.forEach(el => el.removeEventListener(type, fn, false));
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
	const R = {
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
	  add: function (fn) {
	    let newFn = {
	      id: Math.round(Math.random() * 3871245863215478),
	      fn: fn // Add to render loop

	    };
	    this.renderQueue.push(newFn); // console.log("Function added successfully: " + newFn.id);
	    // Return the id so function can be removed later

	    return newFn.id;
	  },
	  remove: function (id) {
	    var _this = this;

	    for (let i = 0; i < _this.renderQueue.length; i++) {
	      if (_this.renderQueue[i].id === id) {
	        // console.log("Function removed successfully: " + id);
	        _this.renderQueue.splice(i, 1);

	        return undefined;
	      }
	    }
	  },
	  start: function () {
	    let fps = 60;
	    this.vars.fpsInterval = 1000 / fps;
	    this.vars.then = Date.now();
	    this.vars.startTime = this.vars.then;
	    this.render();
	  },
	  stop: function () {
	    window.cancelAnimationFrame(this.vars.raf);
	  },
	  render: function () {
	    // stop
	    if (this.vars.stop) return; // request another frame

	    this.vars.raf = window.requestAnimationFrame(() => this.render()); // calc elapsed time since last loop

	    this.vars.now = Date.now();
	    this.vars.elapsed = this.vars.now - this.vars.then; // if enough time has elapsed, draw the next frame

	    if (this.vars.elapsed < this.vars.fpsInterval) return; // Get ready for next frame by setting then=now, but...
	    // Also, adjust for fpsInterval not being multiple of 16.67

	    this.vars.then = this.vars.now - this.vars.elapsed % this.vars.fpsInterval; // Execute all functions

	    this.renderQueue.forEach(fn => fn.fn()); // TESTING - Report fps
	    // var sinceStart = this.vars.now - this.vars.startTime;
	    // var currentFps = Math.round(1000 / (sinceStart / ++ this.vars.frameCount) * 100) / 100;
	    // console.log(currentFps);
	  }
	};

	// if ('serviceWorker' in navigator) {
	//   navigator.serviceWorker.register('../../sw.js');
	// }

	class App {
	  constructor() {
	    // Bind functions
	    this._bind(); // Global Variables


	    this.global = {
	      browser: Sniffer.detectBrowser(),
	      platfrom: Sniffer.detectPlatform(),
	      width: window.innerWidth,
	      height: window.innerHeight // Add platfrom and browser version to body 

	    };
	    S.body.classList.add(this.global.browser, this.global.platfrom);

	    this._addEvents(); // Add test function to render queue


	    R.add(this.testFn);
	  }
	  /*
	  *	PRIVATE
	  */
	  // Bing Functions


	  _bind() {
	    E.bind(this, ['onResize', 'testFn']);
	  } // Add Functions


	  _addEvents() {
	    E.add(window, "resize", this.onResize);
	  }
	  /*
	  *	PUBLIC
	  */


	  onResize() {
	    this.global.width = window.innerWidth;
	    this.global.height = window.innerHeight;
	  }

	  testFn() {
	    console.log(this.global);
	  }

	}

	ready(function () {
	  window.A = new App(); // Start render queue

	  R.start();
	});

}));
