/*************************************
 *
 *  Base for helper functions
 *
 *************************************/

import { bind } from './Functions/bind';
import { debounce } from './Functions/debounce';
import { getBrowser, getPlatform } from './Functions/Sniff';
import { map, lerp, clamp, dist, rand } from './Functions/Math';
import { G } from './Core/G';
import { R } from './Core/R';

export const utils = {
    map,
    lerp,
    clamp,
    dist,
    rand,
    bind,
    debounce,
    getBrowser,
    getPlatform,
    G,
    R,
};
