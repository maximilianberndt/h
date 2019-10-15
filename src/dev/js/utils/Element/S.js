/*************************************
*
*	Helper Functions to set style
*
*   // Transform, opacity, pointerEvents, display
*
*************************************/


export const S = {
    t: function(el, u, x = 0, y = 0) {
        el.style.transform = `translate3d(${x}${u}, ${y}${u}, 0px)`;
    },

    o: function(el, o) {
        el.style.opacity = o;
    },

    pe: function(el, pe) {
        el.style.pointerEvents = pe;
    },

    d: function(el, d) {
        el.style.display = d;
    }
}