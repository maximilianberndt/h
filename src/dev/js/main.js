import domready from 'domready'

import {Sniffer} from './utils/Sniffer.js';
import {S} from './utils/S.js';
import {M} from './utils/M.js';
import {E} from './utils/E.js';
import {R} from './utils/R.js';

import {Mouse} from './utils/Observer/Mouse.js';
import {Scroll} from './utils/Observer/Scroll.js';


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

		// Add test function to render queue
		R.add(this.testFn);
	}



	/*
	*	PRIVATE
	*/ 

	// Bing Functions
	_bind() {
		E.bind(this, ['onResize', 'testFn'])
	}

	// Add Functions
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
		// console.log(this.global);
	}
}


domready(function () {

	window.A = new App();

	// Start render queue
	R.start();

	Mouse.observe();
	Scroll.observe(true, 0.4);
})