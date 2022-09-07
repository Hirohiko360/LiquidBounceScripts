var scriptName = "FastGlide"; // The name of your script
var scriptVersion = 0.1; // The version of your script 
var scriptAuthor = "Alan"; // The author of your script

var FastGlide = new FastGlide();
var FastGlideClient;
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
 
 
function FastGlide() {
    this.getName = function() {
        return "FastGlide";
    };

    this.getDescription = function() {
        return "FastGlide/Speed for PVPTemple";
    };

    this.getCategory = function() {
        return "Misc";
    };

	
    this.onUpdate = function() {


			
			if(mc.thePlayer.moveForward > 0){
				
				
				hClip(8);
				mc.timer.timerSpeed = 0.07;
				Strafe.setState(true);
				
			}
			else{
				if (mc.thePlayer.onGround == false){
				mc.timer.timerSpeed = 0.07;
				Strafe.setState(true);	
					
				}
				
				
				
			}
	

	}
	
	
	
	
	
	
	this.onDisable = function() {
    //Activates on disabling module
	mc.timer.timerSpeed = 1.0;
	mc.thePlayer.speedInAir = (0.02)
	mc.thePlayer.motionX = 0;
	mc.thePlayer.motionZ = 0;
	Strafe.setState(false);

 }
 	this.onEnable = function() {
	//Activates on Enabling module
	Strafe.setState(true);


	

 }
 
 
 
 
 

 }
 


function onLoad() {
    // Currently this event has to be in every script even if it is not directly needed.
};

function onEnable() {
    FastGlideClient = moduleManager.registerModule(FastGlide);
		
};

function onDisable() {
    moduleManager.unregisterModule(FastGlideClient);
	
};