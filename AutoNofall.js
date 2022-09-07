var scriptName = "AutoNoFall";
var scriptVersion = 1.0;
var scriptAuthor = "LiquidBounce_User25";

var noFallModule = moduleManager.getModule("NoFall");

var autoNoFall = new AutoNoFall();
var client;

function AutoNoFall() {
    this.getName = function() {
        return "AutoNoFall";
    };

    this.getDescription = function() {
        return "AutoNoFall";
    };

    this.getCategory = function() {
        return "Player";
    };

    this.onUpdate = function() {
		if (mc.thePlayer.fallDistance > 2.48 && mc.thePlayer.fallDistance < 40)
			noFallModule.setState(true)
		
		if (mc.thePlayer.onGround)
			noFallModule.setState(false)
			
		if (mc.thePlayer.fallDistance > 40)
            noFallModule.setState(false)		
	}
}

function onLoad() {}

function onEnable() {
    client = moduleManager.registerModule(autoNoFall);
}

function onDisable() {
    moduleManager.unregisterModule(client);
}
