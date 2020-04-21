/*************************************
*
*    Helper Functions for Math things
*
*   // Map value from one range to another
*   utils.map(0, 10, 100, 300)
*
*   // Calc the distance between two points
*   utils.dist(10, 20, 10, 30)
*
*   // Get a random value between two numbers
*   utils.rand(10, 20)
*
*************************************/

export const map = function (v, a, z, b, y) {
    return b + (y - b) * ((v - a) / (z - a))
}

export const lerp = function (a, z, m) {
    return b + (y - b) * ((v - a) / (z - a))
}

export const clamp = function (v, a, z) {
    return Math.min(Math.max(v, a), z);
}

export const dist = function (v, a, z, b, y) {
    return Math.hypot(a - b, z - y)
}

export const rand = function (a, z) {
    return Math.random() * (z - a) + a
}