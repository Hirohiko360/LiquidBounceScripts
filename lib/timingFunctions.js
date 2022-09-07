var Timer = Java.type("java.util.Timer");

/*
    Implementation of JavaScripts setTimeout and setInterval functions
    Credits: https://blogs.oracle.com/nashorn/setinterval-and-settimeout-javascript-functions

*/
function setInterval(func, milliseconds) {
    var timer = new Timer("setInterval", true);
    timer.schedule(function() { 
        func();
    }, milliseconds, milliseconds);

    return timer;
}

function clearInterval(timer) {
    timer.cancel();
}

function setTimeout(func, milliseconds) {
    var timer = new Timer("setTimeout", true);
    timer.schedule(function() { 
        func();
    }, milliseconds);

    return timer;
}

function clearTimeout(timer) {
    timer.cancel();
}
