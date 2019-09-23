/*************************************
*
*    Observe Mouse Position
*
*	// Start observing the client mouse Position
*	// Can be called many times and will only register one event listener
*	// Mouse.observe()
*	//
* 	// OPTIONAL: track speed and set custom ease (higher ease, more damping)
*	Mouse.observe(true, 0.4)
*
*	// Stop observing the mouse Position
* 	// If observe has been called multiple times, scroll observing will not stop
*	Mouse.stop()
*
*	// Returns current mouse Position
*	// { x: 23, y: 234 }
*	Mouse.pos
*
*************************************/

import {E} from '../E.js';
import {M} from '../M.js';
import {R} from '../R.js';


export const Mouse = {
	pos: {
		x: 0,
		y: 0
	}, 
	last: {
		x: 0,
		y: 0
	},
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

			E.bind(this, ['setPos', 'calcSpeed']);
			E.add(document, "mousemove", this.setPos);

			if(speed) this._data.speedFn = R.add(this.calcSpeed);
		}
	},

	stop: function() {
		this._data.calls--;
		this._data.calls = M.clamp(this._data.calls, 0, Infinity);

		if(this._data.calls == 0) E.remove(document, "mousemove", this.setPos);
	},

	setPos: function() {
		this.pos = {
			x: event.clientX,
			y: event.clientY
		}
	},

	calcSpeed: function() {
		this.last.x = M.lerp(this.last.x, this.pos.x, this._data.ease);
		this.last.y = M.lerp(this.last.y, this.pos.y, this._data.ease);

	    if (this.last.x < .1) this.last.x = 0;
	    if (this.last.y < .1) this.last.y = 0;

    	this.speed = (this.pos.x - this.last.x + this.pos.y - this.last.y) / 2;
	}
}