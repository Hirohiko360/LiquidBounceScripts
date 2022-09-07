var scriptName = "SpartanSpeed"; // The name of your script
var scriptVersion = 0.1; // The version of your script 
var scriptAuthor = "Alan 6Sence"; // The author of your script

var SpartanSpeed = new SpartanSpeed();
var SpartanSpeedClient;
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
	
	 function hMotion(offset) {
        mc.thePlayer.motionX = parseFloat(Math.cos(Math.radians(mc.thePlayer.rotationYaw + 90.0)) * offset)
        mc.thePlayer.motionZ = parseFloat(Math.sin(Math.radians(mc.thePlayer.rotationYaw + 90.0)) * offset)
	}
 
 
function SpartanSpeed() {
    this.getName = function() {
        return "SpartanSpeed";
    };

    this.getDescription = function() {
        return "SpartanSpeed";
    };

    this.getCategory = function() {
        return "Misc";
    };

	
    this.onUpdate = function() {
	
		mc.timer.timerSpeed = 3.978;
				
		if(mc.thePlayer.ticksExisted % 5 == 0){			
			mc.timer.timerSpeed = 2.452;
	}
	
		if(mc.thePlayer.ticksExisted % 50 == 0){			
			mc.timer.timerSpeed = 0.9;
	}	
		
		if (mc.thePlayer.onGround == false){
			mc.timer.timerSpeed = 1;
	}
		
		
}

	
	
	this.onDisable = function() {
    //Activates on disabling module
	mc.timer.timerSpeed = 1.0;
	

 }
 	this.onEnable = function() {
	//Activates on Enabling module
	
	



	

 }
 
 
 
 
 

 }
 


function onLoad() {
    // Currently this event has to be in every script even if it is not directly needed.
};

function onEnable() {
    SpartanSpeedClient = moduleManager.registerModule(SpartanSpeed);
		
};

function onDisable() {
    moduleManager.unregisterModule(SpartanSpeedClient);
	
};