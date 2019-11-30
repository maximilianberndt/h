/*************************************
*
*    Reveal Elements on Scroll
*
*************************************/

import {E} from '../Element/E.js';
import {S} from '../Element/S.js';
import {R} from '../R.js';
import {G} from '../G.js';
import {Scroll} from './ScrollObserver.js';

export class ScrollReveal {
	
	constructor() {
		E.bind(this, ['_observeEls']);


		this.cache = this._fillCache();

		Scroll.start();

		this.raf = R.add(this._observeEls);
	}

	_fillCache() {
		var cache = [];

		const els = E.get(".scrollReveal");

		for (let i = 0; i < els.length; i++) {

			let el = {
				el: els[i],
				isVisible: false,
			};

			let bounds = els[i].getBoundingClientRect();
			el.top = bounds.top;
			el.bottom = bounds.bottom - bounds.height*0.5;
			el.height = bounds.height;

			cache.push(el);
		}

		return cache
	}

	_observeEls() {

		let revealBreakpoint = Scroll.pos + G.height;

		for (let i = 0; i < this.cache.length; i++) {

			let el = this.cache[i];

			if(el.isVisible) { continue; }
		

			if(el.bottom < revealBreakpoint ) {

				el.isVisible = true;


				// Scroll Reveal
				S.o(el.el, 1);
				S.t(el.el, 0);
			}
		}

	}

}