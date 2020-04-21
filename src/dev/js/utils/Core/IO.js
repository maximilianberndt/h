// basic intersetion observer
// pass element
// cb returns 0 or 1 if in view
// usage: 
// this.io(elem, (inView) => {
// 	if ( inView ) {
// 		functionName1();
// 	} else {
// 		functionName2();
// 	}
// });

import { G } from "./G.js"

export const IO = (el, cb) => {

	// Create new IntersectionObserver
	const io = new IntersectionObserver(entries => {
		updateStatus(entries[0]);
	});

	// Start observing
	io.observe(el);

	// the cb
	function updateStatus(data) {
		if (G.isReady) return cb(data);
	}
};