import domready from 'domready'

import {Sniffer} from './utils/Sniffer.js';
import {S} from './utils/S.js';
import {M} from './utils/M.js';
import {E} from './utils/E.js';
import {R} from './utils/R.js';


// Service Worker initialisieren
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('../../sw.js');
// }


class App {
	constructor () {

		// Bind functions
		this._bind();

		// Global Variables
		this.global = {
			browser: Sniffer.detectBrowser(),
			platfrom: Sniffer.detectPlatform(),
			width: window.innerWidth,
			height: window.innerHeight
		}

		// Add platfrom and browser version to body 
		S.body.classList.add(this.global.browser, this.global.platfrom);

		this._addEvents();

		// Example for function in render queue with scope
		var _this = this;
		R.add(function() { _this.scopeFn(_this) });

		// Start render queue
		// R.start();
	}



	// PRIVATE

	// Bing Functions
	_bind() {
		E.bind(this, ['onResize'])
	}

	// Add Functions
	_addEvents() {
		E.add(window, "resize", this.onResize);
	}



	// PUBLIC

	onResize() {
		this.global.width = window.innerWidth;
		this.global.height = window.innerHeight;
	}

	scopeFn() {
		// Hack to get the scope
		var _this = arguments[0];

		console.log(_this.global);
	}
}


domready(function () {
	console.log("Domready");

	window.A = new App();
})