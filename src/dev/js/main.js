import domready from 'domready'

import {Sniffer} from './utils/Sniffer.js';
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

		this.global = {
			browser: Sniffer.detectBrowser(),
			platfrom: Sniffer.detectPlatform(),
			width: window.innerWidth,
			height: window.innerHeight
		}

		R.add(this.testFn);
	}

	testFn() {
		console.log(A.global);
	}
}


domready(function () {
	console.log("Domready");

	window.A = new App();

	// Start render queue
	R.start();
})