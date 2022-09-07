/**
 * Dynamically loads an external JAR file.
 * 
 * How to use:
 * cl = new ClassLoader(pathToJar1, pathToJar2, ...);
 * var MyClass = cl.type("me.name.project.MyClass");
 * 
 * var myClass = new MyClass();
 * ...
 */
var StaticClass = Java.type("jdk.internal.dynalink.beans.StaticClass");
var URLClassLoader = Java.type("java.net.URLClassLoader");
var URL = Java.type("java.net.URL");
var Class = Java.type("java.lang.Class");

function ClassLoader() {

    this._convertArguments = function(args) {
        return [].slice.call(args).map(function(path) {
            return new URL("jar:file:" + path + "!/")
        });
    }

    this.type = function (className) {
        var clazz = Class.forName(className, true, this.classLoader);
        return StaticClass.forClass(clazz);
    }

    this.classLoader = new URLClassLoader(this._convertArguments(arguments));
}
