var scriptName = "MemoryFix";
var scriptAuthor = "God";
var scriptVersion = 1.0;

function MemoryFix() {
    var Speed = value.createFloat("BobAmount", 0.05, 0, 1);
    this.getName = function() {
        return "MemoryFix";
    }
    this.getDescription = function() {
        return "MemoryFix";
    }
    this.getCategory = function() {
        return "Combat"; 
    }

    this.onMotion = function () {
				if(mc.gameSettings.keyBindForward.pressed || mc.gameSettings.keyBindLeft.pressed || mc.gameSettings.keyBindRight.pressed || mc.gameSettings.keyBindBack.pressed) {
		if(mc.thePlayer.onGround) {
		mc.thePlayer.cameraYaw = Speed.get();
		}
		} else {
			mc.thePlayer.cameraYaw = 0.0;
		}
    } 
	    this.addValues = function(values) {
        values.add(Speed);
    }
}
var MemoryFix = new MemoryFix();
var MemoryFixClient;

function onLoad() {}

function onEnable() {
    MemoryFixClient = moduleManager.registerModule(MemoryFix);
}

function onDisable() {
    moduleManager.unregisterModule(MemoryFixClient);
}   