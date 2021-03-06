/*************************************
*
*    Observe Scroll Position
*
*	// Start observing the client scroll Position
*	// Can be called many times and will only register one event listener
*	// Scroll.start()
*	//
* 	// OPTIONAL: track speed and set custom ease (higher ease, more damping)
*	Scroll.start(true, 0.4)
*
*	// Stop observing the scroll Position
* 	// If observe has been called multiple times, scroll observing will not stop
*	Scroll.stop()
*
*	// Returns current scroll Position
*	Scroll.pos
*
*************************************/

import { utils } from "../utils/main.js"

export const Scroll = {
	pos: 0, 
	last: 0,
	speed: 0,

	_data: {
		speedFn: null,
		ease: 0.2,
		isActive: false,
	},
	
	start: function(speed, ease) {
		
		if(this._data.isActive) return

		// Add csutom ease or 0.2 ease
		this._data.ease = ease || 0.2;

		// Bind functions and register event listeners
		utils.bind(this, ['_setScroll', '_calcSpeed']);
		window.addEventListener("scroll", this._setScroll, false);

		// OPTIONAL: Calculate Scroll speed
		if(speed) this._data.speedFn = R.add(this._calcSpeed);
	},

	stop: function() {
		
		if(!this._data.isActive) return

		// Reomve event listener
		window.removeEventListener("scroll", this._setScroll, false);

		// Reomve _calcSpeed from rendern queue
		if(this._data.speedFn) this._data.speedFn = R.remove(this._data.speedFn);

		// Reset ease
		this._data.ease = 0.2;
	},

	_setScroll: function() {
		this.pos = window.scrollY;
	},

	_calcSpeed: function() {
		this.last = M.lerp(this.last, this.pos, this._data.ease)
	    if (this.last < .1) this.last = 0;

    	this.speed = this.pos - this.last;
	}
}