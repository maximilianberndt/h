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
		document.body.classList.add(this.global.browser, this.global.platfrom);

		this._addEvents();

		R.add(this.testFn);

		// Start render queue
		// R.start();
	}



	// PRIVATE

	// Bing Functions
	_bind() {
		['onResize']
    		.forEach((fn) => this[fn] = this[fn].bind(this))
	}

	// Add Functions
	_addEvents() {
		window.addEventListener('resize', this.onResize);
	}



	// PUBLIC

	onResize() {
		this.global.width = window.innerWidth;
		this.global.height = window.innerHeight;
	}

	testFn() {
		console.log(A.global);
	}
}


domready(function () {
	console.log("Domready");

	window.A = new App();
})