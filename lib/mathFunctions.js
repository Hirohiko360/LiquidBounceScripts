/*
    Adds support for Math.trunc();
    Credits: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc 
*/
Math.trunc = function (v) {
    v = +v;
    return (v - v % 1) || (!isFinite(v) || v === 0 ? v : v < 0 ? -0 : 0);
};

/* 
    Converts from degrees to radians.
    Credits: http://cwestblog.com/2012/11/12/javascript-degree-and-radian-conversion/
*/
Math.toRadians = function (degrees) {
    return degrees * Math.PI / 180;
};

/* 
    Converts from radians to degrees.
    Credits: http://cwestblog.com/2012/11/12/javascript-degree-and-radian-conversion/
*/
Math.toDegrees = function (radians) {
    return radians * 180 / Math.PI;
};
