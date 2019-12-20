import domready from 'domready'

import {M} from './utils/M.js';
import {R} from './utils/R.js';
import {G} from './utils/G.js';
import {Dom} from './utils/Dom.js';

import {E} from './utils/Element/E.js';
import {S} from './utils/Element/S.js';

import {Mouse} from './utils/Modules/MouseObserver.js';
import {Scroll} from './utils/Modules/ScrollObserver.js';
import {ScrollReveal} from './utils/Modules/ScrollReveal.js';
import {Slider} from './utils/Modules/Slider.js';


// Service Worker initialisieren
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('../../sw.js');
// }


class App {
	constructor () {

		// Bind functions
		this._bind();

		this._addEvents();

		Dom.body.classList.add(G.browser, G.platform);

		new ScrollReveal;
		
		let sliders = []

		setTimeout(function(){ 
			E.get(".slider-container").forEach( (slider, i) => sliders[i] = new Slider(i)) 
		}, 500);

		// new Slider;

		// Add test function to render queue
		R.add(this.testFn);
	}


	// Bind Functions
	_bind() {
		E.bind(this, ['testFn']);
	}

	// Add Functions
	_addEvents() {
		E.add(window, "click", this.testFn);
	}


	/*
	*	PUBLIC
	*/
	testFn() {
		// console.log(Scroll.pos)
	}
}


domready(function () {

	window.A = new App();

	// Start render queue
	R.start();
})