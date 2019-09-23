/*************************************
*
*    Observe Scroll Position
*
*	// Start observing the client scroll Position
*	// Can be called many times and will only register one event listener
*	//
* 	// OPTIONAL: track speed, set custom ease
*	Scroll.observe(true, 0.4)
*
*	// Stop observing the scroll Position
* 	// If observe has been called multiple times, scroll observing will not stop
*	Scroll.stop()
*
*	// Returns current scroll Position
*	Scroll.pos
*
*************************************/

import {E} from '../E.js';
import {M} from '../M.js';
import {R} from '../R.js';


export const Scroll = {
	pos: 0, 
	last: 0,
	speed: 0,
	_data: {
		speedFn: null,
		ease: 0.2,
		calls: 0,
	},
	
	observe: function(speed, ease) {
		this._data.calls++;

		if(this._data.calls == 1) {
			this._data.ease = ease ? ease : 0.2;

			E.bind(this, ['setScroll', 'calcSpeed']);
			E.add(window, "scroll", this.setScroll);

			if(speed) this._data.speedFn = R.add(this.calcSpeed);
		}
	},

	stop: function() {
		this._data.calls--;
		this._data.calls = M.clamp(this.calls, 0, Infinity);
		
		if(this._data.calls == 0) {
			E.remove(window, "scroll", this.setScroll);

			if(this._data.speedFn) this._data.speedFn = R.remove(this._data.speedFn);

			// Reset ease
			this._data.ease = 0.2;
		}
	},

	setScroll: function() {
		this.pos = window.scrollY;
	},

	calcSpeed: function() {
		this.last = M.lerp(this.last, this.pos, this._data.ease)
	    if (this.last < .1) this.last = 0;

    	this.speed = this.pos - this.last;
	}
}