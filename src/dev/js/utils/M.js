/*************************************
*
*    Helper Functions for Math things
*
*   // Map value from one range to another
*   M.map(0, 10, 100, 300)
*
*   // Calc the distance between two points
*   M.dist(10, 20, 10, 30)
*
*   // Get a random value between two numbers
*   M.rand(10, 20)
*
*************************************/


export const M = {
    map: function(v, a, z, b, y) {
        return b + (y - b) * ((v - a) / (z - a))
    },

    lerp: function(a, z, m) {
        return a * (1 - m) + z * m
    },

    clamp: function(v, a, z) {
        return Math.min(Math.max(v, a), z)
    },
    
    dist: function(a, b, z, y) {
        return Math.hypot(a-b, z-y)
    },

    rand: function (a, z) {
        return Math.random() * (z - a) + a
    }
}