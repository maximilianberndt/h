import domready from 'domready'
import {utils} from './utils/main';

// import {Mouse} from './utils/Modules/MouseObserver.js';
// import {Scroll} from './utils/Modules/ScrollObserver.js';
// import {ScrollReveal} from './utils/Modules/ScrollReveal.js';
// import {Slider} from './utils/Modules/Slider.js';

class App {
	constructor () {

		// Bind functions
		this._bind();

		this._addEvents();

		// H.Dom.body.classList.add(G.browser, G.platform)

		// Add test function to render queue
		utils.R.add(this.testFn);

		utils.R.start();
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
		// console.log(this.vs)
	}
}


domready(function () {
	window.A = new App();
})