var JavaDouble = Java.type("java.lang.Double");
var JavaLong = Java.type("java.lang.Long");
var System = Java.type("java.lang.System");
var scriptName = "GameTimer";
var scriptVersion = 0.1;
var scriptAuthor = "mumy++";
var GameTimer = /** @class */ (function () {
    function GameTimer() {
        this.startTime = JavaLong.valueOf(System.currentTimeMillis());
        this.prefix = "\u00A78[\u00A79".concat(scriptName, "\u00A78] \u00A77");
    }
    GameTimer.prototype.getName = function () {
        return "".concat(scriptName).toLowerCase();
    };
    GameTimer.prototype.getAliases = function () {
        return [];
    };
    GameTimer.prototype.execute = function () {
        var time = JavaDouble.valueOf(JavaLong.valueOf(System.currentTimeMillis()).longValue() - this.startTime.longValue()).doubleValue();
        var hours = Math.floor(time / 3600000);
        var minutes = Math.floor(time / 60000) % 60;
        var seconds = Math.floor(time / 1000) % 60;
        chat.print("".concat(this.prefix).concat(hours, ":").concat(minutes < 10 ? "0" : "").concat(minutes, ":").concat(seconds < 10 ? "0" : "").concat(seconds, "s"));
    };
    return GameTimer;
}());
var scriptCommand;
function onLoad() { }
function onEnable() {
    scriptCommand = commandManager.registerCommand(new GameTimer());
}
function onDisable() {
    commandManager.unregisterCommand(scriptCommand);
}