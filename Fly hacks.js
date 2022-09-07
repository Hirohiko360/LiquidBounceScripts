var scriptName = "Fly hacks"; 
var scriptVersion = 1.2; 
var scriptAuthor = "soulplexis";

var Flight = new Flight();
var FlightClient;
var C04PacketPlayerPosition = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition');
 
 
 // Radians -> Degrees
 Math.rad = function(deg) {
    return deg * Math.PI / 180;
  };
  
function Flight() {
	var modes = value.createList("Mode", ["Vanilla", "VanillaClip", "SmoothVanilla", "Float", "NCPFlag", "Guardian", "FastMotion", "Glide", "Damage", "Wurst", "JetPack", "GlideVanilla", "FakeFall", "Boost"], "Vanilla");
	var NCPAirwalkY = value.createInteger("FloatY", 10, 1, 100);
	var VanillaSpeed = value.createFloat("VanillaSpeed", 1.00, 0.00, 5.00);	
	var FastMotionTimer = value.createFloat("FastMotionTimer", 1.07, 1.00, 2.50);
	var FastMotionSpeed = value.createFloat("FastMotionSpeed", 1.10, 1.00, 1.50);
	var GlideMotion = value.createFloat("GlideMotion", 0.01, 0.01, 1.00);
	var GlideSpeed = value.createBoolean("GlideSpeed", true);
	var GlideSpeedAmount = value.createFloat("GlideSpeedAmount", 1.05, 1.00, 1.20);
    var FakeFallTime = value.createInteger("FakeFallTime", 4, 1, 40);
	var FakeFallMotion = value.createFloat("FakeFallMotion", 0.01, 0.01, 1.00);
	var BoostAmount = value.createFloat("BoostAmount", 0.5, 0.00, 2.00);
	var BoostDepreciation = value.createFloat("BoostDepreciation", 0.02, 0.01, 1.0);
	var BoostDepreciationRate = value.createInteger("BoostDepreciationRate", 10, 1, 40);
	var BoostDepreciationMode = value.createList("DepreciationMethod", ["Linear", "Logarithmic"], "Linear");
	var Bob = value.createBoolean("Bob", false);
	var Ground = value.createBoolean("onGround", true);
	var QuickStop = value.createBoolean("QuickStop", false);
	var SpeedLimit = value.createBoolean("SpeedLimit", false);
	var SpeedLimitAmount = value.createFloat("SpeedLimitAmount", 5.75, 5.00, 10); 
	var HurtOnEnable = value.createBoolean("HurtOnEnable", false);
    this.getName = function() {
        return "Flight";
    };

    this.getDescription = function() {
        return "Allows you to fly in survival mode.";
    };

    this.getCategory = function() {
        return "Movement";
    };
	this.onEnable = function() {
		if(HurtOnEnable.get()) {
			commandManager.executeCommand(".hurt"); //TODO: Player fall damage with no command
		}
	if(modes.get() == "NCPFlag") {
		mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + .40, mc.thePlayer.posZ, mc.thePlayer.onGround));
		mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + .50, mc.thePlayer.posZ, mc.thePlayer.onGround));
		mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + .60, mc.thePlayer.posZ, mc.thePlayer.onGround));
	}
	boost = BoostAmount.get();
	}
    var spin = 0;
	var hacks = 0;
	var boost = 0;
    this.onMotion = function () {
		this.Fly();
		}
	this.onDisable = function() {
		mc.timer.timerSpeed = 1.0;
		mc.thePlayer.capabilities.isFlying = false;
		hacks = 0;
		if(QuickStop.get()) {
			mc.thePlayer.motionY = 0;
			mc.thePlayer.motionX = 0;
			mc.thePlayer.motionZ = 0;
		}
	}
	this.addValues = function(values) {
		values.add(modes);
		values.add(VanillaSpeed);
		values.add(NCPAirwalkY);
		values.add(FastMotionTimer);
		values.add(FastMotionSpeed);
		values.add(GlideMotion);
		values.add(GlideSpeed);
		values.add(GlideSpeedAmount);
		values.add(FakeFallMotion);
		values.add(FakeFallTime);
		values.add(BoostAmount);
		values.add(BoostDepreciationMode);
		values.add(BoostDepreciation);
		values.add(BoostDepreciationRate);
		values.add(Bob);
		values.add(Ground);
		values.add(QuickStop);
		values.add(HurtOnEnable);
		values.add(SpeedLimit);
		values.add(SpeedLimitAmount);
	}
	this.Fly = function() {
		switch(modes.get()) {
			case "Vanilla":
			mc.thePlayer.setSprinting(true);
			mc.thePlayer.motionX = 0;
			mc.thePlayer.motionY = 0;
			mc.thePlayer.motionZ = 0;
			if (mc.gameSettings.keyBindForward.isKeyDown()) {
               var dir = Math.rad(mc.thePlayer.rotationYaw);
                mc.thePlayer.motionX += -Math.sin(dir) * VanillaSpeed.get() 
                mc.thePlayer.motionZ += Math.cos(dir) * VanillaSpeed.get() 
            }
            if (mc.gameSettings.keyBindLeft.isKeyDown()) {
               var dir = Math.rad(mc.thePlayer.rotationYaw - 90);
                mc.thePlayer.motionX += -Math.sin(dir) * VanillaSpeed.get() 
                mc.thePlayer.motionZ += Math.cos(dir) * VanillaSpeed.get() 
            }
            if (mc.gameSettings.keyBindBack.isKeyDown()) {
               var dir = Math.rad(mc.thePlayer.rotationYaw + 180);
                mc.thePlayer.motionX += -Math.sin(dir) * VanillaSpeed.get() 
                mc.thePlayer.motionZ += Math.cos(dir) * VanillaSpeed.get() 
            }
            if (mc.gameSettings.keyBindRight.isKeyDown()) {
               var dir = Math.rad(mc.thePlayer.rotationYaw + 90);
                mc.thePlayer.motionX += -Math.sin(dir) * VanillaSpeed.get() 
                mc.thePlayer.motionZ += Math.cos(dir) * VanillaSpeed.get() 
            }
			if (mc.gameSettings.keyBindJump.isKeyDown()) {
                mc.thePlayer.motionY += VanillaSpeed.get() 
            }
            if (mc.gameSettings.keyBindSneak.isKeyDown()) {
                mc.thePlayer.motionY -= VanillaSpeed.get() 
			}
			break;
			case "VanillaClip":
			mc.thePlayer.setSprinting(true);
			mc.thePlayer.motionX = 0;
			mc.thePlayer.motionY = 0;
			mc.thePlayer.motionZ = 0;
			if (mc.gameSettings.keyBindForward.isKeyDown() && !mc.thePlayer.isCollidedHorizontally) {
               var dir = Math.rad(mc.thePlayer.rotationYaw);
                mc.thePlayer.setPosition(mc.thePlayer.posX += -Math.sin(dir) * VanillaSpeed.get() / 2, mc.thePlayer.posY, mc.thePlayer.posZ);
                mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ += Math.cos(dir) * VanillaSpeed.get() / 2);
            }
            if (mc.gameSettings.keyBindLeft.isKeyDown() && !mc.thePlayer.isCollidedHorizontally) {
               var dir = Math.rad(mc.thePlayer.rotationYaw - 90);
                mc.thePlayer.setPosition(mc.thePlayer.posX += -Math.sin(dir) * VanillaSpeed.get() / 2, mc.thePlayer.posY, mc.thePlayer.posZ);
                mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ += Math.cos(dir) * VanillaSpeed.get() / 2);
            }
            if (mc.gameSettings.keyBindBack.isKeyDown() && !mc.thePlayer.isCollidedHorizontally) {
               var dir = Math.rad(mc.thePlayer.rotationYaw + 180);
                mc.thePlayer.setPosition(mc.thePlayer.posX += -Math.sin(dir) * VanillaSpeed.get() / 2, mc.thePlayer.posY, mc.thePlayer.posZ);
                mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ += Math.cos(dir) * VanillaSpeed.get() / 2);
            }
            if (mc.gameSettings.keyBindRight.isKeyDown() && !mc.thePlayer.isCollidedHorizontally) {
               var dir = Math.rad(mc.thePlayer.rotationYaw + 90);
                mc.thePlayer.setPosition(mc.thePlayer.posX += -Math.sin(dir) * VanillaSpeed.get() / 2, mc.thePlayer.posY, mc.thePlayer.posZ);
                mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ += Math.cos(dir) * VanillaSpeed.get() / 2);
            }
			if (mc.gameSettings.keyBindJump.isKeyDown() && !mc.thePlayer.isCollidedVertically) {
                mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + VanillaSpeed.get() / 2, mc.thePlayer.posZ);
            }
            if (mc.gameSettings.keyBindSneak.isKeyDown() && !mc.thePlayer.isCollidedVertically) {
                mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY - VanillaSpeed.get() / 2, mc.thePlayer.posZ);
            }
			break;
			case "SmoothVanilla":
			mc.thePlayer.capabilities.isFlying = true;
			break;
		    case "Float":
			mc.gameSettings.keyBindJump.pressed = false;
			mc.thePlayer.motionY = 0;
			spin++;
			if(spin >= 4) {
			mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + NCPAirwalkY.get() / 1000000, mc.thePlayer.posZ);
			spin = 0;
		    }
		    break;
		    case "NCPFlag":
			mc.gameSettings.keyBindJump.pressed = false;
			mc.thePlayer.motionY = 0;
			spin++;
			if(spin >= 4) {
			mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + NCPAirwalkY.get() / 1000000, mc.thePlayer.posZ);
			spin = 0;
		    }
		    break;
		    case "Guardian": //TODO: get veltpvp up again so we can hacks
		    mc.thePlayer.motionY = 0;
			if(mc.gameSettings.keyBindJump.pressed == true) {
			mc.thePlayer.motionY = 0.84;
			}
			if(mc.gameSettings.keyBindSneak.pressed == true) {
			mc.thePlayer.motionY = -0.84;
			}
			if(!mc.thePlayer.onGround) {
			mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY - 0.000225, mc.thePlayer.posZ);
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY - .0255, mc.thePlayer.posZ, mc.thePlayer.onGround));
			}
		    break;
			case "FastMotion":
			mc.gameSettings.keyBindJump.pressed = false;
			mc.thePlayer.motionY = 0;
	       	mc.timer.timerSpeed = FastMotionTimer.get();
     		mc.thePlayer.motionX *= FastMotionSpeed.get();
    		mc.thePlayer.motionZ *= FastMotionSpeed.get();
		    break;
		    case "Glide":
			mc.thePlayer.motionY = -GlideMotion.get();
			if(mc.gameSettings.keyBindJump.pressed == true) {
			mc.thePlayer.motionY = 0.42;
			}
			if(mc.gameSettings.keyBindSneak.pressed == true) {
			mc.thePlayer.motionY = -0.42;
			}
			if(GlideSpeed.get() == true) {
				mc.thePlayer.motionX *= GlideSpeedAmount.get();
				mc.thePlayer.motionZ *= GlideSpeedAmount.get();
			}
	     	break;
			case "Damage":
			if(mc.thePlayer.hurtTime > 0) {
			mc.thePlayer.motionX = 0;
			mc.thePlayer.motionY = 0;
			mc.thePlayer.motionZ = 0;
			if (mc.gameSettings.keyBindForward.isKeyDown()) {
               var dir = Math.rad(mc.thePlayer.rotationYaw);
                mc.thePlayer.motionX += -Math.sin(dir) * VanillaSpeed.get() 
                mc.thePlayer.motionZ += Math.cos(dir) * VanillaSpeed.get() 
            }
            if (mc.gameSettings.keyBindLeft.isKeyDown()) {
               var dir = Math.rad(mc.thePlayer.rotationYaw - 90);
                mc.thePlayer.motionX += -Math.sin(dir) * VanillaSpeed.get() 
                mc.thePlayer.motionZ += Math.cos(dir) * VanillaSpeed.get() 
            }
            if (mc.gameSettings.keyBindBack.isKeyDown()) {
               var dir = Math.rad(mc.thePlayer.rotationYaw + 180);
                mc.thePlayer.motionX += -Math.sin(dir) * VanillaSpeed.get() 
                mc.thePlayer.motionZ += Math.cos(dir) * VanillaSpeed.get() 
            }
            if (mc.gameSettings.keyBindRight.isKeyDown()) {
               var dir = Math.rad(mc.thePlayer.rotationYaw + 90);
                mc.thePlayer.motionX += -Math.sin(dir) * VanillaSpeed.get() 
                mc.thePlayer.motionZ += Math.cos(dir) * VanillaSpeed.get() 
            }
			if (mc.gameSettings.keyBindJump.isKeyDown()) {
                mc.thePlayer.motionY += VanillaSpeed.get() 
            }
            if (mc.gameSettings.keyBindSneak.isKeyDown()) {
                mc.thePlayer.motionY -= VanillaSpeed.get() 
			}
			}
			break;
			case "Wurst":
			//TODO: disable jumping
			mc.thePlayer.motionY = -0.025
		    if(mc.gameSettings.keyBindSneak.isKeyDown()) {
			mc.thePlayer.motionY = -0.5;
		    }
			if(mc.gameSettings.keyBindJump.isKeyDown()) {
			hacks++;
			if(hacks == 15) {
		     mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + 8, mc.thePlayer.posZ);
		     mc.thePlayer.onGround = false;
			 hacks = 0;
		    }
	    	}
			break;
			case "JetPack":
			if(mc.gameSettings.keyBindJump.isKeyDown()) {
				mc.thePlayer.motionY += 0.22;
			}
			mc.thePlayer.motionY += 0.03;
			break;
			case "GlideVanilla":
			mc.thePlayer.setSprinting(true);
			mc.thePlayer.motionX = 0;
			mc.thePlayer.motionY = -GlideMotion.get();
			mc.thePlayer.motionZ = 0;
			if (mc.gameSettings.keyBindForward.isKeyDown()) {
               var dir = Math.rad(mc.thePlayer.rotationYaw);
                mc.thePlayer.motionX += -Math.sin(dir) * VanillaSpeed.get() 
                mc.thePlayer.motionZ += Math.cos(dir) * VanillaSpeed.get() 
            }
            if (mc.gameSettings.keyBindLeft.isKeyDown()) {
               var dir = Math.rad(mc.thePlayer.rotationYaw - 90);
                mc.thePlayer.motionX += -Math.sin(dir) * VanillaSpeed.get() 
                mc.thePlayer.motionZ += Math.cos(dir) * VanillaSpeed.get() 
            }
            if (mc.gameSettings.keyBindBack.isKeyDown()) {
               var dir = Math.rad(mc.thePlayer.rotationYaw + 180);
                mc.thePlayer.motionX += -Math.sin(dir) * VanillaSpeed.get() 
                mc.thePlayer.motionZ += Math.cos(dir) * VanillaSpeed.get() 
            }
            if (mc.gameSettings.keyBindRight.isKeyDown()) {
               var dir = Math.rad(mc.thePlayer.rotationYaw + 90);
                mc.thePlayer.motionX += -Math.sin(dir) * VanillaSpeed.get() 
                mc.thePlayer.motionZ += Math.cos(dir) * VanillaSpeed.get() 
            }
			if (mc.gameSettings.keyBindJump.isKeyDown()) {
                mc.thePlayer.motionY += VanillaSpeed.get() 
            }
            if (mc.gameSettings.keyBindSneak.isKeyDown()) {
                mc.thePlayer.motionY -= VanillaSpeed.get() 
			}
			break;
			case "FakeFall":
			hacks++;
			if(hacks < FakeFallTime.get()) {
				mc.thePlayer.motionY = FakeFallMotion.get()
			}
			if(hacks > FakeFallTime.get()) {
				mc.thePlayer.motionY = -FakeFallMotion.get();
			}
			if(hacks >= FakeFallTime.get() * 2) {
				hacks = 0;
			}
			break;
			case "Boost":
			mc.thePlayer.onGround = true; // An exception to the OnGround boolean, without it you will go into warp drive.
			hacks++;
			spin++;
			if(spin >= 4) {
			mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + NCPAirwalkY.get() / 1000000, mc.thePlayer.posZ);
			if (mc.gameSettings.keyBindForward.isKeyDown()) {
               var dir = Math.rad(mc.thePlayer.rotationYaw);
                mc.thePlayer.motionX += -Math.sin(dir) * boost  
                mc.thePlayer.motionZ += Math.cos(dir) * boost  
            }
            if (mc.gameSettings.keyBindLeft.isKeyDown()) {
               var dir = Math.rad(mc.thePlayer.rotationYaw - 90);
                mc.thePlayer.motionX += -Math.sin(dir) * boost  
                mc.thePlayer.motionZ += Math.cos(dir) * boost  
            }
            if (mc.gameSettings.keyBindBack.isKeyDown()) {
               var dir = Math.rad(mc.thePlayer.rotationYaw + 180);
                mc.thePlayer.motionX += -Math.sin(dir) * boost  
                mc.thePlayer.motionZ += Math.cos(dir) * boost  
            }
            if (mc.gameSettings.keyBindRight.isKeyDown()) {
               var dir = Math.rad(mc.thePlayer.rotationYaw + 90);
                mc.thePlayer.motionX += -Math.sin(dir) * boost  
                mc.thePlayer.motionZ += Math.cos(dir) * boost  
            }
			if((!mc.gameSettings.keyBindForward.pressed && !mc.gameSettings.keyBindLeft.pressed && !mc.gameSettings.keyBindRight.pressed && !mc.gameSettings.keyBindBack.pressed)) {
				mc.thePlayer.motionX = 0;
				mc.thePlayer.motionZ = 0;
			}
			spin = 0;
		    }
			mc.thePlayer.motionY = 0.0;
			if(hacks >= BoostDepreciationRate.get()) {
			}
			if(hacks >= BoostDepreciationRate.get() * 2) {
				hacks = 0;
				if(BoostDepreciationMode.get() == "Linear") {
				boost -= BoostDepreciation.get();
				}
				if(BoostDepreciationMode.get() == "Logarithmic") {
				boost *= BoostDepreciation.get() 
				}
			}
			if(boost < 0) {
				boost = 0;
			}
			break;
		}//sw
		if(Ground.get() == true) {
		mc.thePlayer.onGround = true;
		}
		if(Bob.get() == true && (mc.gameSettings.keyBindForward.pressed || mc.gameSettings.keyBindLeft.pressed || mc.gameSettings.keyBindRight.pressed || mc.gameSettings.keyBindBack.pressed)) {
		mc.thePlayer.cameraYaw = 0.15;
		}
		if(QuickStop.get() == true && (!mc.gameSettings.keyBindForward.pressed && !mc.gameSettings.keyBindLeft.pressed && !mc.gameSettings.keyBindRight.pressed && !mc.gameSettings.keyBindBack.pressed)) {
		mc.thePlayer.motionX = 0.0;
		mc.thePlayer.motionZ = 0.0;
	    }
		if(SpeedLimit.get() == true) {
			if(mc.thePlayer.motionX <= -SpeedLimitAmount.get() || mc.thePlayer.motionX >= SpeedLimitAmount.get() || mc.thePlayer.motionZ <= -SpeedLimitAmount.get() || mc.thePlayer.motionZ >= SpeedLimitAmount.get() || mc.thePlayer.motionY <= -SpeedLimitAmount.get() || mc.thePlayer.motionY >= SpeedLimitAmount.get()) {
				chat.print("§c[SpeedLimit] §6Woah there!");
				mc.thePlayer.motionX = 0;
				mc.thePlayer.motionY = 0;
				mc.thePlayer.motionZ = 0;
			}
		}
	}
}

function onLoad() {
};

function onEnable() {
    FlightClient = moduleManager.registerModule(Flight);
};

function onDisable() {
    moduleManager.unregisterModule(FlightClient);
};