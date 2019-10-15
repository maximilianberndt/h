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
*	// Select Element by id
*	E.get('#headline')
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
	},




	get: function(el, parent) {

        const p = parent || document
        const type = checkType(el.charAt(0))

        if(type !== 'tag') el = el.substr(1) 

        return  (type === "id") ? p.getElementById(el) : 
                (type === "class") ? Array.prototype.slice.call(p.getElementsByClassName(el)) : 
                [].slice.call(p.getElementsByTagName(el))


        function checkType(el) {
            return (el === '#') ? 'id' : (el === '.') ? 'class' : 'tag'
        }
    }
}