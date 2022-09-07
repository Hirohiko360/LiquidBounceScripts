var scriptName = "WaterFloat"; // The name of your script
var scriptVersion = 0.1; // The version of your script
var scriptAuthor = "Alan"; // The author of your script

var WaterFloat = new WaterFloat();
var WaterFloatClient;
var Strafe = moduleManager.getModule("Strafe");
var nohurtcam = moduleManager.getModule("nohurtcam");

BlockPos = Java.type('net.minecraft.util.BlockPos')
BlockAir = Java.type('net.minecraft.block.BlockAir')
EntityPlayer = Java.type("net.minecraft.entity.player.EntityPlayer")

Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
  };
   
  // Converts from radians to degrees.
  Math.degrees = function(radians) {
    return radians * 180 / Math.PI;
  };
 
  function vClip(offset) {
        mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + offset, mc.thePlayer.posZ);
    }

    function hClip(offset) {
        var playerYaw = Math.radians(mc.thePlayer.rotationYaw);
        mc.thePlayer.setPosition(mc.thePlayer.posX - (Math.sin(playerYaw) * offset), mc.thePlayer.posY, mc.thePlayer.posZ + (Math.cos(playerYaw) * offset));
    }


function WaterFloat() {
    this.getName = function() {
        return "WaterFloat";
    };

    this.getDescription = function() {
        return "MatrixWaterFloat";
    };

    this.getCategory = function() {
        return "Misc";
    };

   
    this.onUpdate = function() {
       
       
       
    if(mc.thePlayer.isInWater()){       
        mc.thePlayer.motionY = 0.28;   
       
        hClip(1.2);
   

    }

           
   

    }
   
   
   
   
   
   
    this.onDisable = function() {
    //Activates on disabling module
    mc.timer.timerSpeed = 1

}
    this.onEnable = function() {
    //Activates on Enabling module
   

   

}


}

function onLoad() {
    // Currently this event has to be in every script even if it is not directly needed.
};

function onEnable() {
    WaterFloatClient = moduleManager.registerModule(WaterFloat);
       
};

function onDisable() {
    moduleManager.unregisterModule(WaterFloatClient);
   
};
