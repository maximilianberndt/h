/*************************************
*
*    Helper Functions for Elements
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
*	// Change innerHTML
*	E.content(el, "newContetn");
*
*	
*	// Select Element by id
*	E.get('#headline')
*
*
*************************************/


export const E = {
	bind: function(_this, fns) {
		
		let fnsLength = fns.length
        for(let i = 0; i < fnsLength; i++) { 
        	_this[fns[i]] = _this[fns[i]].bind(_this)
        }
	},

	add: function(el, type, fn, passive = false) {
		if(el.length) {
			el.forEach( el => el.addEventListener(type, fn, passive) )
		} else {
			el.addEventListener(type, fn, passive)
		}
	},

	remove: function(el, type, fn, passive = false) {
		if(el.length) {
			el.forEach( el => el.removeEventListener(type, fn, passive) )
		} else {
			el.removeEventListener(type, fn, passive)
		}
	},


	content: function(el, content) {
		el.innerHTML = content;
	},


	get: function(el, p) {
	    p = p || document;

	    // Simple selects
	    if (/^(#?[\w-]+|\.[\w-.]+)$/.test(el)) {
	        switch (el.charAt(0)) {
	            case '#':
	                return [p.getElementById(el.substr(1))];
	            case '.':
	                var classes = el.substr(1).replace(/\./g, ' ');
	                return [].slice.call(p.getElementsByClassName(classes));
	            default:
	                return [].slice.call(p.getElementsByTagName(el));
	        }
	    }

	    // Complex selects
	    return [].slice.call(p.queryelAll(el));
	}
}