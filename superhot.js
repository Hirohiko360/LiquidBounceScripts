var scriptName = "SuperHot"; 
var scriptVersion = 1.2; 
var scriptAuthor = "soulplexis";

var exampleModule = new ExampleModule();
var exampleModuleClient;

function ExampleModule() {
    this.getName = function() {
        return "SuperHot";
    };

    this.getDescription = function() {
        return "Blocks any movements if you aren't moving";
    };

    this.getCategory = function() {
        return "Fun";
    };
	this.onUpdate = function() {
		       if (mc.gameSettings.keyBindForward.isKeyDown() || mc.gameSettings.keyBindLeft.isKeyDown() || mc.gameSettings.keyBindRight.isKeyDown() || mc.gameSettings.keyBindBack.isKeyDown() || mc.gameSettings.keyBindJump.isKeyDown()) {

		} else {
		mc.thePlayer.motionX = 0.0;
		mc.thePlayer.motionY = 0.0;
		mc.thePlayer.motionZ = 0.0;
		mc.timer.timerSpeed = 0.75
		}
	}
    this.onDisable = function() {
		mc.timer.timerSpeed = 1.0;
    }
}

function onLoad() {
};

function onEnable() {
    exampleModuleClient = moduleManager.registerModule(exampleModule);
};

function onDisable() {
    moduleManager.unregisterModule(exampleModuleClient);
};