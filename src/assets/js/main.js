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

	// if ('serviceWorker' in navigator) {
	//   window.addEventListener('load', () => {
	//     navigator.serviceWorker.register('../sw.js');
	//   });
	// }

	class App {
	  constructor() {
	    console.log("Domready");
	  }

	}

	ready(function () {
	  window.A = new App();
	});

}));
