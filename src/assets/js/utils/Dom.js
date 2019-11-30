(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define('dom', ['exports'], factory) :
	(global = global || self, factory(global.dom = {}));
}(this, function (exports) { 'use strict';

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
	  }
	};

	exports.Dom = Dom;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
