import domready from 'domready'
import {S} from './util.js';
import {M} from './util.js';


// Service Worker initialisieren
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('../sw.js');
//   });
// }

class App {
	constructor () {
		console.log("Domready");
	}
}

domready(function () {
	window.A = new App();
})