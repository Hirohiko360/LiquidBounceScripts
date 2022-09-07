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
    this.getName = function() {
        return "HytHighJump"
    };
    this.getDescription = function() {
        return "By Minger233333."
    };
    this.getCategory = function() {
        return "Fun"
    };
    this.onEnable = function() {
        blinkModule.setState(true);
        flyModule.setState(true);
		setTimeout(function() {
		blinkModule.setState(false);
		flyModule.setState(false);
		commandManager.executeCommand(".t HytHighJump");
		}, 500)

    };            
    this.onUpdate = function() {};	
    this.onDisable = function() {
        mc.gameSettings.keyBindSneak.pressed = true;
        blinkModule.setState(false);
		flyModule.setState(false);		
        mc.gameSettings.keyBindSneak.pressed = false
    }
}
function onLoad() {}
function onEnable() {
    client = moduleManager.registerModule(Newblink)
}
function onDisable() {
    moduleManager.unregisterModule(client)
}