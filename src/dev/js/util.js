// Helper Functions to select things
export const S = {
    id: function(name) {
        return document.getElementById(name);
    },
    class: function(name) {
        return Array.prototype.slice.call(document.getElementsByClassName(name));
    },
    tag: function(name) {
        return document.getElementsByTagName(name);
    }
}

// Helper Functions for math things
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