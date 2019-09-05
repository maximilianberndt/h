import domready from 'domready'
import {User} from './user.js';


// Service Worker initialisieren
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('../sw.js');
//   });
// }

class App {
	constructor () {
		this._user = new User('John');

		console.log(this._user.name + "_New5")
	}
}

domready(function () {
	console.log("Domready");
	
	window.A = new App();
})