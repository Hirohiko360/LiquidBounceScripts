var scriptName = "NewBlink";
var scriptVersion = 1.3;
var scriptAuthor = "AquaVit";
script.import('lib/minecraftUtils.js');
script.import('lib/timingFunctions.js');
script.import('lib/glFunctions.js');
script.import('lib/systemFunctions.js');
var blinkModule = moduleManager.getModule("blink");
var SpeedModule = moduleManager.getModule('Speed');
var flyModule = moduleManager.getModule("fly");

var Newblink = new Newblink();
var client;

function Newblink() {
	var BugJumpHigh = value.createFloat("BugJumpHigh", 5, 1, 10);
    this.getName = function() {
        return "HytBugJump"
    };
    this.getDescription = function() {
        return "By Minger233333."
    };
    this.getCategory = function() {
        return "Fun"
    };
    this.onEnable = function() {};            
    this.onUpdate = function() {
		if(mc.gameSettings.keyBindJump.pressed) {
			blinkModule.setState(true);
			mc.thePlayer.motionY = BugJumpHigh.get();
		    setTimeout(function() {
		    blinkModule.setState(false);
		    }, 500)
		}		
	};	
    this.onDisable = function() {
        blinkModule.setState(false);
    }
	this.addValues = function(values) {
		values.add(BugJumpHigh);
    }
}
function onLoad() {}
function onEnable() {
    client = moduleManager.registerModule(Newblink)
}
function onDisable() {
    moduleManager.unregisterModule(client)
}