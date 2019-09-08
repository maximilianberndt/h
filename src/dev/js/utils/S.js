/*************************************
*
*	Helper Functions to Select things
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
        return Array.prototype.slice.call(document.getElementsByTagName(name));
    }
}