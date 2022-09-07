var scriptName = "Longjump 2";
var scriptVersion = 1.0;
var scriptAuthor = "Soulplexis";

 Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
  };
  var longjump = moduleManager.getModule("LongJump");
function Module() {
    this.getName = function () {
        return "LongHop";
    };
var jumped = false;
    this.getDescription = function () {
        return "LongJump helper.";
    };

    this.getCategory = function () {
        return "Movement";
    };
    this.onMotion = function () {
		if(longjump.getState() == true) {
		 if(mc.thePlayer.movementInput.moveForward == 0 && mc.thePlayer.movementInput.moveStrafe == 0) {
			 mc.thePlayer.motionX = 0;
			 mc.thePlayer.motionZ = 0;
		 }
		 if(!mc.thePlayer.onGround) {
		jumped = true;
		}
		 if(jumped == true && mc.thePlayer.onGround) {
			 longjump.setState(false);
			 jumped = false;
			 mc.thePlayer.motionX = 0;
			 mc.thePlayer.motionZ = 0;
		 }
		}
    } 
	this.onJump = function(){
	}
    this.onDisable = function() {
    }
    
    this.onEnable = function() {
		jumped = false;
    }

    this.addValues = function(values) {
    }
}
var Module = new Module();
var ModuleClient;

function onEnable() {
    ModuleClient = moduleManager.registerModule(Module);
};

function onDisable() {
    moduleManager.unregisterModule(ModuleClient);
};