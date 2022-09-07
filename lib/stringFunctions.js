/* 
    Adding support for string.includes(substring)
    Credits: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
*/
String.prototype.includes = function (search, start) {
    "use strict";
    if (typeof start !== "number") {
        start = 0;
    }

    if (start + search.length > this.length) {
        return false;
    } else {
        return this.indexOf(search, start) !== -1;
    }
};
