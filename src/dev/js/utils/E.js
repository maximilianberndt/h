/*************************************
*
*    Helper Functions for Event Listeners
*
*************************************/


// TODO?: Pass functions
// element.addEventListener("click", function(){ myFunction(p1, p2); });


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