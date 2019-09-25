/*************************************
*
*    Global storage for variables
*
*    Resize event listener is automatically created
*
*************************************/

import {Sniff} from './Sniff.js';
import {debounce} from '../Functions/debounce.js';
import {E} from '../Core/E.js';

export const G = {
    browser: Sniff.browser(),
    platform: Sniff.platfrom(),
    width: window.innerWidth,
    height: window.innerHeight,

	i:(() => {
    	var resizeFn = function() {
			G.width = window.innerWidth;
			G.height = window.innerHeight;
		}

    	E.add(window, "resize", debounce(resizeFn, 250))
	})()
}