/*************************************
*
*	Global storage for variables
*
*************************************/

import {Sniff} from './Sniff.js';
import {E} from './E.js';

export const G = {
    browser: Sniff.browser(),
    platform: Sniff.platfrom(),
    width: window.innerWidth,
    height: window.innerHeight,

	init:(() => {
    	var resizeFn = function() {
			G.width = window.innerWidth;
			G.height = window.innerHeight;
		}

    	E.add(window, "resize", resizeFn);
	})()
}