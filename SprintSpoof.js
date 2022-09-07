var scriptName = "SprintSpoof"; 
var scriptVersion = 1.4; 
var scriptAuthor = "soulplexis";

var exampleModule = new ExampleModule();
var exampleModuleClient;

function ExampleModule() {
    this.getName = function() {
        return "SprintSpoof";
    };

    this.getDescription = function() {
        return "Alternative bypass for OmniSprint on servers like Mineverse";
    };

    this.getCategory = function() {
        return "Fun";
    };
    this.onEnable = function() {
    }

    this.onMotion = function() {
    	if(mc.thePlayer.onGround == true) {
    		mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.0000013, mc.thePlayer.posZ);
    		mc.thePlayer.setSprinting(true);
    	}
    }
    this.onDisable = function() {
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