/*************************************
*
*    Helper Functions for Event Listeners
*
*	// Bind functions
*	E.bind([arrayOfFunctions], this);
*
*	// Add Event Listener
*	E.add(S.id("headline"), "mouseenter", testFunction);
*
*	// Remove Event Listener
*	E.add(S.id("headline"), "mouseenter", testFunction);
*
*
*************************************/


export const E = {
	bind: function(_this, fns) {
		fns.forEach((fn) => _this[fn] = _this[fn].bind(_this))
	},

	add: function(el, type, fn) {
		if(el.length) {
			el.forEach( el => el.addEventListener(type, fn, false) )
		} else {
			el.addEventListener(type, fn, false)
		}
	},

	remove: function(el, type, fn) {
		if(el.length) {
			el.forEach( el => el.removeEventListener(type, fn, false) )
		} else {
			el.removeEventListener(type, fn, false)
		}
	}
}