/*************************************
*
*	Helper Functions to select things
*
*************************************/


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