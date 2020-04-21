/*************************************
*
*    Global storage for variables
*
*    Resize event listener is created automatically
*
*************************************/

import { getBrowser, getPlatform } from '../Functions/Sniff.js';
import { debounce } from '../Functions/debounce.js';

export const G = {
	browser: getBrowser(),
	platform: getPlatform(),
	width: window.innerWidth,
	height: window.innerHeight,

	i: (() => {
		var resizeFn = function () {
			utils.G.width = window.innerWidth;
			utils.G.height = window.innerHeight;
		}

		window.addEventListener("resize", debounce(resizeFn, 250));
	})()
}