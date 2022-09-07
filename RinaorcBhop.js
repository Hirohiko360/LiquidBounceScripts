var scriptName = "RinaorcBhop"; 
var scriptVersion = 1.0; 
var scriptAuthor = "KokosLxrd";

var bHop = new RinaorcBhop();
var bHopClient;
var Strafe = moduleManager.getModule("Strafe")

function RinaorcBhop() {
    this.getName = function() {
        return "RinaorcBhop";
    };

    this.getDescription = function() {
        return "RinaorcBhop"; 
    };

    this.getCategory = function() {
        return "Movement";
    };

    this.onMotion = function() {
		if(mc.gameSettings.keyBindForward.isKeyDown() || mc.gameSettings.keyBindLeft.isKeyDown() || mc.gameSettings.keyBindRight.isKeyDown() || mc.gameSettings.keyBindBack.isKeyDown()) {
            mc.thePlayer.motionX *= 1.05;
			mc.thePlayer.motionZ *= 1.05;
			Strafe.setState(true);
			mc.timer.timerSpeed = 1.11
			if (mc.thePlayer.onGround) {
				mc.thePlayer.jump();
				mc.timer.timerSpeed = 1.11;
        } 
   } else {
			Strafe.setState(false);
			mc.thePlayer.motionX = 0.0;
			mc.thePlayer.motionZ = 0.0;
			mc.timer.timerSpeed = 1.0;
		}
}
    this.onDisable = function() {
    	mc.timer.timerSpeed = 1.1;
		mc.thePlayer.motionX = 0.0;
		mc.thePlayer.motionZ = 0.0;
		Strafe.setState(false);
    }
}

function onLoad() {
};

function onEnable() {
    bHopClient = moduleManager.registerModule(bHop);
};

function onDisable() {
    moduleManager.unregisterModule(bHopClient);
};