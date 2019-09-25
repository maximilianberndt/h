/*************************************
*
*	Helper Functions to Select things
*
*************************************/


export const S = {
    get: function(el, parent) {

        const p = parent || document
        const type = checkType(el.charAt(0))

        if(type !== 'tag') el = el.substr(1) 

        return  (type === "id") ? p.getElementById(el) : 
                (type === "class") ? Array.prototype.slice.call(p.getElementsByClassName(el)) : 
                Array.prototype.slice.call(p.getElementsByTagName(el))


        function checkType(el) {
            return (el === '#') ? 'id' : (el === '.') ? 'class' :'tag'
        }
    },
    html: document.documentElement, 
    body: document.body
}