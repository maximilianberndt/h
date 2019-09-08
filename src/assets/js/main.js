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
	*   Render Queue
	*	running at 60fps
	*
	*	// Add
	*	const functionId = R.add(function);
	*
	*	// Remove
	*	R.remove(functionId);
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
	    var _this = this; // stop


	    if (_this.vars.stop) return; // request another frame

	    _this.vars.raf = window.requestAnimationFrame(() => _this.render()); // calc elapsed time since last loop

	    _this.vars.now = Date.now();
	    _this.vars.elapsed = _this.vars.now - _this.vars.then; // if enough time has elapsed, draw the next frame

	    if (_this.vars.elapsed > _this.vars.fpsInterval) {
	      // Get ready for next frame by setting then=now, but...
	      // Also, adjust for fpsInterval not being multiple of 16.67
	      _this.vars.then = _this.vars.now - _this.vars.elapsed % _this.vars.fpsInterval; // Execute all functions

	      _this.renderQueue.forEach(fn => fn.fn()); // TESTING...Report #seconds since start and achieved fps.
	      // var sinceStart = _this.vars.now - _this.vars.startTime;
	      // var currentFps = Math.round(1000 / (sinceStart / ++_this.vars.frameCount) * 100) / 100;
	      // console.log(currentFps);

	    }
	  }
	};

	// if ('serviceWorker' in navigator) {
	//   window.addEventListener('load', () => {
	//     navigator.serviceWorker.register('../sw.js');
	//   });
	// }

	class App {
	  constructor() {
	    console.log("Domready");
	    R.start();
	    this.variable = "jaksdkjashd";
	    R.add(this.test);
	  }

	  test() {
	    console.log(A.variable);
	  }

	}

	ready(function () {
	  window.A = new App();
	});

}));
