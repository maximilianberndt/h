import domready from 'domready'
import {S} from './utils/S.js';
import {M} from './utils/M.js';
import {R} from './utils/R.js';


// Service Worker initialisieren
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('../sw.js');
//   });
// }

class App {
	constructor () {
		console.log("Domready");

		R.start();

		this.variable = "jaksdkjashd";

		R.add(this.test);
	}

	test() {
		console.log(A.variable);
	}
}

function test() {
	console.log("test");
}


domready(function () {
	window.A = new App();
})