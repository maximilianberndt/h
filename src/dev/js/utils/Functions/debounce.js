/*************************************
*
*	Debounce function
*
*	Execute function after given delay
*
*************************************/

export const debounce = (fn, delay) => {
    let dt 
    return function() { 
        const ctx = this
        const args = arguments 
        clearTimeout(dt) 

		dt = setTimeout(() => fn.apply(ctx, args), delay) 
    } 
}  