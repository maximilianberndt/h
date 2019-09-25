/*************************************
*
*    Observe Scroll Position
*
*	// Start observing the client scroll Position
*	// Can be called many times and will only register one event listener
*	// Scroll.observe()
*	//
* 	// OPTIONAL: track speed and set custom ease (higher ease, more damping)
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

import {E} from '../Core/E.js';
import {M} from '../Core/M.js';
import {R} from '../Core/R.js';


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

			// Add csutom ease or 0.2 ease
			this._data.ease = ease ? ease : 0.2;

			// Bind functions and register event listeners
			E.bind(this, ['setScroll', 'calcSpeed']);
			E.add(window, "scroll", this.setScroll);

			// OPTIONAL: Calculate Scroll speed
			if(speed) this._data.speedFn = R.add(this.calcSpeed);
		}
	},

	stop: function() {
		this._data.calls--;
		this._data.calls = M.clamp(this.calls, 0, Infinity);
		
		if(this._data.calls == 0) {

			// Reomve event listener
			E.remove(window, "scroll", this.setScroll);

			// Reomve calcSpeed from rendern queq
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