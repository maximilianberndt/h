import domready from 'domready'
import {S} from './utils/S.js';
import {M} from './utils/M.js';
import {E} from './utils/E.js';
import {R} from './utils/R.js';


// Service Worker initialisieren
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('../sw.js');
//   });
// }

class App {
	constructor () {

		this.variable = "h.";

		R.add(this.test);
	}

	test() {
		console.log(A.variable);
	}
}


domready(function () {
	console.log("Domready");

	window.A = new App();

	R.start();

	E.add(S.id("headline"), "mouseenter", A.test);
})