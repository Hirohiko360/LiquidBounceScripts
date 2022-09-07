var scriptName = "bruh moment";
var scriptVersion = 1.0;
var scriptAuthor = "Aftery142";

//external modules
//nothing

//external dependencies
var StatList = Java.type("net.minecraft.stats.StatList");

function Module1() {
    this.getName = function() {
        return "ATowerFix";
    };
	this.getTag = function() {
		return "No u";
	};
    this.getDescription = function() {
        return "imagine getting watchdog banned for using tower lmfaoo ~ Aftery";
    };
    this.getCategory = function() {
        return "Fun";
    };
	
    this.onMotion = function() {
        mc.thePlayer.triggerAchievement(StatList.jumpStat);
    };
}
var modules = [
	new Module1()
];
function onEnable() {
	for (var i = 0; i < modules.length; i++) moduleManager.registerModule(modules[i]);
};
function onDisable() {
	for (var i = 0; i < modules.length; i++) moduleManager.unregisterModule(modules[i]);
};