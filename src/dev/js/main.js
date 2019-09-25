import domready from 'domready'

import {M} from './utils/Core/M.js';
import {E} from './utils/Core/E.js';
import {R} from './utils/Core/R.js';
import {G} from './utils/Core/G.js';
import {S} from './utils/Core/S.js';

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

		// Add platfrom and browser version to body 
		S.body.classList.add(G.browser, G.platform);

		this._addEvents();

		// Add test function to render queue
		R.add(this.testFn);
	}


	// Bind Functions
	_bind() {
		E.bind(this, ['testFn'])
	}

	// Add Functions
	_addEvents() {
		E.add(window, "click", this.testFn);
	}


	/*
	*	PUBLIC
	*/
	testFn() {
		console.log(G);
	}
}


domready(function () {

	window.A = new App();

	// Start render queue
	// R.start();
})