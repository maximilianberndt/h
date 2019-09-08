/*************************************
*
*    Helper Functions for Event Listeners
*
*	// Add Event Listener
*	E.add(S.id("headline"), "mouseenter", testFunction);
*
*	// Remove Event Listener
*	E.add(S.id("headline"), "mouseenter", testFunction);
*
*************************************/


export const E = {
	add: function(element, type, fn) {
		if(element.length) {
			element.forEach( element => element.addEventListener(type, fn, false) );
		} else {
			element.addEventListener(type, fn, false);
		}
	},

	remove: function(element, type, fn) {
		if(element.length) {
			element.forEach( element => element.removeEventListener(type, fn, false) );
		} else {
			element.removeEventListener(type, fn, false);
		}
	}
}