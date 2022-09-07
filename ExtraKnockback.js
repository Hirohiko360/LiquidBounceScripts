var scriptName = "Extra Knockback"; 
var scriptVersion = 1.0; 
var scriptAuthor = "soulplexis";

var exampleModule = new ExampleModule();
var exampleModuleClient;

function ExampleModule() {
	
    this.getName = function() {
        return "FusRoDah";
    };

    this.getDescription = function() {
        return "You get Fus ro dah'd when damaged.";
    };

    this.getCategory = function() {
        return "Combat";
    };

    this.onMotion = function() {
			if(mc.thePlayer.hurtTime > 0) {
			mc.thePlayer.motionX *= 1.35;
			mc.thePlayer.motionZ *= 1.35;
			mc.thePlayer.motionY *= 1.35;
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