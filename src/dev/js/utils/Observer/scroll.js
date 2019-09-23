/*************************************
*
*    Observe Scroll Position
*
*	// Start observing the client scroll Position
*	// Can be called many times and will only 
*	// register one event listener
*	Scroll.observe()
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


export const Scroll = {
	pos: 0, 
	calls: 0,

	observe: function() {
		this.calls++;

		if(this.calls == 1) {
			E.bind(this, ['setScroll']);
			E.add(window, "scroll", this.setScroll);
		}
	},

	stop: function() {
		this.calls--;
		this.calls = M.clamp(this.calls, 0, Infinity);
		
		if(this.calls == 0) E.remove(window, "scroll", this.setScroll);
	},

	setScroll: function() {
		this.pos = window.scrollY;
	}
}