import domready from 'domready'
import { utils } from './utils/main';

// import {Mouse} from './Modules/MouseObserver.js';
// import {Scroll} from './Modules/ScrollObserver.js';
// import {ScrollReveal} from './Modules/ScrollReveal.js';
// import {Slider} from './Modules/Slider.js';

class App {
	constructor() {

		// Bind functions
		this._bind();

		this._addEvents();

		document.body.classList.add(utils.G.browser, utils.G.platform);

		document.querySelectorAll(".test").forEach((el) => {

			const fnIn = function () {
				console.log("Hello")
			}

			const fnOut = function () {
				console.log("Bye bye")
			}

			new utils.IO({ el: el, fnIn: fnIn, fnOut: fnOut, threshold: 0.3 });
		});

		// Add test function to render queue
		// utils.R.add(this.testFn);

		// utils.R.start();
	}


	// Bind Functions
	_bind() {
		utils.bind(this, ['testFn']);
	}

	// Add Functions
	_addEvents() {
		window.addEventListener("click", this.testFn, false)
	}


	/*
	*	PUBLIC
	*/
	testFn() {
		console.log("test")
	}
}


domready(function () {
	window.A = new App();
})