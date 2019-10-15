import domready from 'domready'

import {M} from './utils/M.js';
import {R} from './utils/R.js';
import {G} from './utils/G.js';
import {Dom} from './utils/Dom.js';

import {E} from './utils/Element/E.js';
import {S} from './utils/Element/S.js';

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

		this._addEvents();

		Dom.body.classList.add(G.browser, G.platfrom);

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
		// console.log(this);
	}
}


domready(function () {

	window.A = new App();

	console.log("Testing");

	// Start render queue
	R.start();
})