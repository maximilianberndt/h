/*************************************
*
*	Intersection Observer
*
*    Fires when Element comes into the viewport and when it leaves
*
*	new IO({ el: el, fnIn: fnIn, fnOut: fnOut, threshold: 0.3, fireOnLoad: true })
*
*************************************/


export class IO {
	constructor({ el, fnIn = null, fnOut = null, threshold = 0, fireOnLoad = false } = {}) {

		this.el = el;
		this.fnIn = fnIn;
		this.fnOut = fnOut;
		this.threshold = threshold;
		this.fireOnLoad = false;

		const options = {
			threshold: threshold
		}

		// Triggers every time an intersection happens
		let cb = (entries, observer) => {
			if (this.fireOnLoad) {
				if (entries[0].isIntersecting) {
					// Element comes into the viewport
					if (this.fnIn) this.fnIn()
				} else {
					// Element leaves the viewport 
					if (this.fnOut) this.fnOut()
				}
			} else {
				// Prevent callback from firing on initialization
				this.fireOnLoad = true;
			}
		};

		const observer = new IntersectionObserver(cb, options);

		observer.observe(this.el);
	}
}