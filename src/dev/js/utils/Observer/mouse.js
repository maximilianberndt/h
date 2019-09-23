/*************************************
*
*    Observe Mouse Position
*
*	// Start observing the client mouse Position
*	// Can be called many times and will only 
*	// register one event listener
*	Mouse.observe()
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


export const Mouse = {
	pos: {
		x: 0,
		y: 0
	}, 
	calls: 0,

	observe: function() {
		this.calls++;

		if(this.calls == 1) {
			E.bind(this, ['setPos']);
			E.add(document, "mousemove", this.setPos);
		}
	},

	stop: function() {
		this.calls--;
		this.calls = M.clamp(this.calls, 0, Infinity);

		if(this.calls == 0) E.remove(document, "mousemove", this.setPos);
	},

	setPos: function() {
		this.pos = {
			x: event.clientX,
			y: event.clientY
		}
	}
}