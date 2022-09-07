var scriptName = "CleanFall";
var scriptVersion = 1.1;
var scriptAuthor = "yorik100";
var noFallModule = moduleManager.getModule("NoFall");
var BlockPos = Java.type('net.minecraft.util.BlockPos');

var cleanFall = new CleanFall();

var client;

function CleanFall() {
    this.getName = function() {
        return "GhostFall";
    };

    this.getDescription = function() {
        return "Ghost NoFall";
    };

    this.getCategory = function() {
        return "Player";
    };
    this.onEnable = function() {
    }
	var fortnite = 0
this.onUpdate = function() {
if (mc.thePlayer.motionY >= 0 || mc.thePlayer.isInWater() || mc.thePlayer.isInLava() || mc.thePlayer.isOnLadder() || mc.thePlayer.isInWeb || mc.thePlayer.hurtTime > 9){
	fortnite = 0;
	mc.thePlayer.fallDistance = 0;
}
if (mc.thePlayer.fallDistance > 2.695) {
fortnite++;
}
if (mc.thePlayer.onGround && fortnite != 0){
    fortnite = 0
	noFallModule.setState(false)
	commandManager.executeCommand(".damage");
}else{
	noFallModule.setState(true)
}
}
    this.onDisable = function () {
    }
}

function onLoad() {}

function onEnable() {
    client = moduleManager.registerModule(cleanFall);
}

function onDisable() {
    moduleManager.unregisterModule(client);
}