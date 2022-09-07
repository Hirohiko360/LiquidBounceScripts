var scriptName = "CleanAACNoSlow";
var scriptVersion = 1.0;
var scriptAuthor = "yorik100";

var cleanAACNoSlow = new CleanAACNoSlow();

var client;

function CleanAACNoSlow() {
    this.getName = function() {
        return "AACNoSlow";
    };

    this.getDescription = function() {
        return "AACNoSlow for swords (enable NoSlow NCP for swords first)";
    };

    this.getCategory = function() {
        return "Movement";
    };
    this.onEnable = function() {
    }
this.onUpdate = function() {
		if (mc.thePlayer.isBlocking()){
		mc.timer.timerSpeed = 0.8;
		}else{
		mc.timer.timerSpeed = 1.00;
		}
}
    this.onDisable = function () {
		mc.timer.timerSpeed = 1.00;
    }
}

function onLoad() {}

function onEnable() {
    client = moduleManager.registerModule(cleanAACNoSlow);
}

function onDisable() {
    moduleManager.unregisterModule(client);
}