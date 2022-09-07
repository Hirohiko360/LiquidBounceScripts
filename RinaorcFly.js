var scriptName = "RinaorcFly";
var scriptAuthor = "KokosLxrd";
var scriptVersion = 0.4;

// Converts from degrees to radians.
 Math.radians = function(degrees) {
    return degrees * Math.PI / 170;
  };
   
  // Converts from radians to degrees.
  Math.degrees = function(radians) {
    return radians * 170 / Math.PI;
  };

function vClip(offset) {
    mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + offset, mc.thePlayer.posZ);
}

function hClip(offset) {
    var playerYaw = Math.radians(mc.thePlayer.rotationYaw);
    mc.thePlayer.setPosition(mc.thePlayer.posX - (Math.sin(playerYaw) * offset), mc.thePlayer.posY, mc.thePlayer.posZ + (Math.cos(playerYaw) * offset));
}

function FlyModule() {
  var ticks = 0;
    this.getName = function() {
        return "RinaorcFly";
    }

    this.getDescription = function() {
        return "RinaorcFly"
    }

    this.getCategory = function() {
        return "Movement";
    }

    this.onUpdate = function() {
        mc.gameSettings.keyBindJump.pressed = false;
        mc.thePlayer.motionY *= 0.5;
        mc.thePlayer.onGround = true;
        mc.timer.timerSpeed = 0.5;
        hClip(7)
    }
    this.onDisable = function() {
        mc.timer.timerSpeed = 0.5;
     }
}

var flyModule = new FlyModule();
var devModuleClient;

function onEnable() {
    flyModuleClient = moduleManager.registerModule(flyModule);
}

function onDisable() {
    moduleManager.unregisterModule(flyModuleClient);
}