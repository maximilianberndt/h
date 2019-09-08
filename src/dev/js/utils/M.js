/*************************************
*
*    Helper Functions for Math things
*
*************************************/


export const M = {
    map: function(value, istart, istop, ostart, ostop) {
        return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
    },

    lerp: function(s, e, m) {
        return s * (1 - m) + e * m
    },
    
    dist: function(x1,x2,y1,y2) {
        let a = x1 - x2;
        let b = y1 - y2;
        return Math.hypot(a,b);
    }
}