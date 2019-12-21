/*************************************
*
*	Dom Elements
*
*************************************/


export const Dom = {
	body: document.body,
	html: document.documentElement,

	remove: function(el) {
		el.parentNode.removeChild(el);
	},

	add: function(el, p) {
		p.appendChild(el);
	},

	create: function(newEl) {
		return document.createElement(newEl)
	},
}