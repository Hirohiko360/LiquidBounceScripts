var scriptName = "Zero Fly"; 
var scriptVersion = 1.0; 
var scriptAuthor = "soulplexis";

var Flight = new Flight();
var FlightClient;
var C04PacketPlayerPosition = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition');
 
 
 // Radians -> Degrees
 Math.rad = function(deg) {
    return deg * Math.PI / 180;
  };
  	function hClip(offset) {
		var playerYaw = Math.rad(mc.thePlayer.rotationYaw);
		mc.thePlayer.setPosition(mc.thePlayer.posX - (Math.sin(playerYaw) * offset), mc.thePlayer.posY, mc.thePlayer.posZ + (Math.cos(playerYaw) * offset));
	}
  
function Flight() {
	var modes = value.createList("Mode", ["Vanilla", "VanillaClip", "SmoothVanilla", "Float", "Float2", "Float3", "ACP", "Guardian", "FastMotion", "Glide", "Damage", "Wurst", "JetPack", "GlideVanilla", "FakeFall", "Boost", "Mineplex", "Hypixel", "FireFly", "Clip"], "Vanilla");
	var FloatTech = value.createBoolean("FloatTech", false);
	var NCPAirwalkY = value.createInteger("FloatY", 10, 1, 100);
	var VanillaSpeed = value.createFloat("VanillaSpeed", 1.00, 0.00, 5.00);	
	var FastMotionSpeed = value.createFloat("FastMotionSpeed", 1.10, 1.00, 1.50);
	var GlideMotion = value.createFloat("GlideMotion", 0.01, 0.01, 1.00);
	var GlideSpeedAmount = value.createFloat("GlideSpeedAmount", 1.05, 1.00, 1.20);
    var FakeFallTime = value.createInteger("FakeFallTime", 4, 1, 40);
	var FakeFallMotion = value.createFloat("FakeFallMotion", 0.01, 0.01, 1.00);
	var BoostAmount = value.createFloat("BoostAmount", 0.93, 0.00, 2.00);
	var BoostDepreciation = value.createFloat("BoostDepreciation", 0.95, 0.01, 1.0);
	var BoostDepreciationRate = value.createInteger("BoostDepreciationRate", 6, 1, 40);
	var BoostDepreciationMode = value.createList("DepreciationMethod", ["Linear", "Logarithmic"], "Logarithmic");
	var Wait = value.createInteger("Wait", 5, 0, 100);
	var Timer = value.createBoolean("Timer", false);
	var FTimer = value.createFloat("Timer", 1.00, 0.01, 5.00);
	var Bob = value.createBoolean("Bob", true);
	var Ground = value.createBoolean("GroundSpoof", true);
	var QuickStop = value.createBoolean("FastStop", false);
	var SpeedLimit = value.createBoolean("SpeedLimit", false);
	var SpeedLimitAmount = value.createFloat("SpeedLimitMax", 8.00, 5.00, 10); 
	var HurtOnEnable = value.createBoolean("HurtOnEnable", false);
    this.getName = function() {
        return "SoulFly";
    };
		this.getTag = function() {
    return modes.get()
}
	var ticks = 0;
		var yy = 0;
	var updateticks = 0;
    this.getDescription = function() {
        return "Allows you to fly in survival mode.";
    };

    this.getCategory = function() {
        return "Movement";
    };
	this.onEnable = function() {
		if(HurtOnEnable.get()) {
			for (var i = 0; i <= 49; i++) {
                    mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.0650, mc.thePlayer.posZ, false));
                    mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, i >= 49));
                }
		}
	if(modes.get() == "ACP") {
		mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + .40, mc.thePlayer.posZ, mc.thePlayer.onGround));
	}
	if(modes.get() == "Boost") {
		mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.42, mc.thePlayer.posZ);
		mc.thePlayer.motionY = 0.0;
	}
	if(modes.get() == "Mineverse") {
		yy = mc.thePlayer.posY + 3;
	}
	boost = BoostAmount.get();
	}
    var spin = 0;
	var japanese = 0;
	var hacks = 0;
	var boost = 0;
    this.onMotion = function () {
		if((modes.get() == "Damage" && mc.thePlayer.hurtTime > 0) || modes.get() != "Damage") {
		this.Fly();
		}
	}
	this.onAttack = function(){
		if(modes.get() == "Hypixel") {
			mc.thePlayer.onGround = false;
		}
	}
	this.onDisable = function() {
		spin = 0;
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
		values.add(FloatTech);
		values.add(NCPAirwalkY);
		values.add(FastMotionSpeed);
		values.add(GlideMotion);
		values.add(GlideSpeedAmount);
		values.add(FakeFallMotion);
		values.add(FakeFallTime);
		values.add(BoostAmount);
		values.add(BoostDepreciationMode);
		values.add(BoostDepreciation);
		values.add(BoostDepreciationRate);
		values.add(Wait);
		values.add(Bob);
		values.add(Ground);
		values.add(QuickStop);
		values.add(HurtOnEnable);
		values.add(Timer);
		values.add(FTimer);
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
			mc.thePlayer.motionY = 0;
			if(mc.gameSettings.keyBindJump.pressed) {
				mc.thePlayer.motionY = 0.42;
			}
			if(mc.gameSettings.keyBindSneak.pressed) {
				mc.thePlayer.motionY = -0.42;
			}
			spin++;
			if(spin >= 4 && FloatTech.get() == false) {
			mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + NCPAirwalkY.get() / 1000000, mc.thePlayer.posZ);
			spin = 0;
		    }
		    break;
			case "Float2":
			mc.thePlayer.motionY = 0;
			if(mc.gameSettings.keyBindJump.pressed) {
				mc.thePlayer.motionY = 0.42;
			}
			if(mc.gameSettings.keyBindSneak.pressed) {
				mc.thePlayer.motionY = -0.42;
			}
			spin++;
			if(spin >= 4 && FloatTech.get() == false) {
			mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + NCPAirwalkY.get() / 100000000, mc.thePlayer.posZ);
			spin = 0;
		    }
			break;
			case "Float3":
			mc.thePlayer.motionY = 0;
			if(mc.gameSettings.keyBindJump.pressed) {
				mc.thePlayer.motionY = 0.42;
			}
			if(mc.gameSettings.keyBindSneak.pressed) {
				mc.thePlayer.motionY = -0.42;
			}
			spin++;
			if(spin >= 4 && FloatTech.get() == false) {
			mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + NCPAirwalkY.get() / 100000000000, mc.thePlayer.posZ);
			spin = 0;
		    }
			break;
		    case "ACP":
			mc.thePlayer.motionY = 0;
			if(mc.gameSettings.keyBindJump.pressed) {
				mc.thePlayer.motionY = 0.42;
			}
			if(mc.gameSettings.keyBindSneak.pressed) {
				mc.thePlayer.motionY = -0.42;
			}
			spin++;
			if(spin >= 4 && FloatTech.get() == false) {
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
			mc.thePlayer.jump();
			}
		    break;
			case "FastMotion":
			mc.thePlayer.motionY = 0;
			if(mc.gameSettings.keyBindJump.pressed) {
				mc.thePlayer.motionY = 0.42;
			}
			if(mc.gameSettings.keyBindSneak.pressed) {
				mc.thePlayer.motionY = -0.42;
			}
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
				mc.thePlayer.motionX *= GlideSpeedAmount.get();
				mc.thePlayer.motionZ *= GlideSpeedAmount.get();
	     	break;
			case "Damage":
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
			if(spin >= 4 && FloatTech.get() == false) {
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
			case "Mineplex"://Old fly
			mc.thePlayer.motionX *= 1.2;
			mc.thePlayer.motionZ *= 1.2;
			if(mc.gameSettings.keyBindSneak.isKeyDown()) {
			     updateticks++;
		     	if(updateticks == 1) {
				mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY - 1, mc.thePlayer.posZ);
	        	}
	     	if(updateticks == 3) {
			updateticks = 0;
	     	}
			
	    	}
         	mc.thePlayer.jumpMovementFactor = mc.thePlayer.jumpMovementFactor * 1.003
	    	if(ticks == 6) {
	    		ticks = 0;
	    	}
        	if (mc.gameSettings.keyBindForward.isKeyDown() || mc.gameSettings.keyBindLeft.isKeyDown() || mc.gameSettings.keyBindRight.isKeyDown() || mc.gameSettings.keyBindBack.isKeyDown()) {
        	mc.timer.timerSpeed = 1.0;
    	    mc.thePlayer.setSprinting(true);
    	    mc.thePlayer.motionY = 0.0
    	    mc.thePlayer.onGround = true;
    	    } else {
    		mc.timer.timerSpeed = 1.0;
    		mc.thePlayer.motionY = 0.0;
    		mc.thePlayer.onGround = false;
			mc.thePlayer.motionX = 0.0;
			mc.thePlayer.motionZ = 0.0;
    	    }
		    if(mc.gameSettings.keyBindJump.isKeyDown()) {
			mc.thePlayer.onGround = false;
			ticks++;
			mc.thePlayer.motionY = 0.0;
	        if(ticks == 1) {
	    	mc.timer.timerSpeed = 1.0;
	    	mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + 1.05, mc.thePlayer.posZ);
	    	mc.thePlayer.onGround = false;
		    }
		    }
		 	break; ///
			case "Hypixel":
			mc.thePlayer.motionY = 0;
			if(mc.gameSettings.keyBindJump.pressed) {
				mc.thePlayer.motionY = 0.42;
			}
			if(mc.gameSettings.keyBindSneak.pressed) {
				mc.thePlayer.motionY = -0.42;
			}
			FloatTech.set(false);
			spin++;
			if(spin >= 4) {
			mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.0007, mc.thePlayer.posZ);
			spin = 0;
		    }
			break;
			case "CubeCraft":
			mc.thePlayer.motionY = -0.09;
			mc.timer.timerSpeed -= 0.02
			mc.thePlayer.motionX = 0;
			mc.thePlayer.motionZ = 0;
			Timer.set(false);
			spin++;
			if(spin >= 20) {
				mc.thePlayer.onGround = true; // Need to have 
				mc.thePlayer.motionY = 0.01;
				mc.timer.timerSpeed = 1.0;
			if (mc.gameSettings.keyBindForward.isKeyDown()) {
               var dir = Math.rad(mc.thePlayer.rotationYaw);
                mc.thePlayer.motionX += -Math.sin(dir) * 0.5; 
                mc.thePlayer.motionZ += Math.cos(dir) * 0.5; 
            }
            if (mc.gameSettings.keyBindLeft.isKeyDown()) {
               var dir = Math.rad(mc.thePlayer.rotationYaw - 90);
                mc.thePlayer.motionX += -Math.sin(dir) * 0.5; 
                mc.thePlayer.motionZ += Math.cos(dir) * 0.5; 
            }
            if (mc.gameSettings.keyBindBack.isKeyDown()) {
               var dir = Math.rad(mc.thePlayer.rotationYaw + 180);
                mc.thePlayer.motionX += -Math.sin(dir) * 0.5; 
                mc.thePlayer.motionZ += Math.cos(dir) * 0.5; 
            }
            if (mc.gameSettings.keyBindRight.isKeyDown()) {
               var dir = Math.rad(mc.thePlayer.rotationYaw + 90);
                mc.thePlayer.motionX += -Math.sin(dir) * 0.5; 
                mc.thePlayer.motionZ += Math.cos(dir) * 0.5; 
            }
			} if(spin >= 25) {
				spin = 0; // allow for more movements
			}
			break;
			case "CubeCraftNew":
			mc.thePlayer.motionY = -0.01;
			mc.timer.timerSpeed -= 0.01;
			mc.thePlayer.motionX = 0;
			mc.thePlayer.motionZ = 0;
			Timer.set(false);
			spin++;
			if(spin >= Wait.get()) {
				mc.thePlayer.motionY = 0.01;
				mc.timer.timerSpeed = 1.0;
			if (mc.gameSettings.keyBindForward.isKeyDown()) {
               var dir = Math.rad(mc.thePlayer.rotationYaw);
                mc.thePlayer.motionX += -Math.sin(dir) * 0.8; 
                mc.thePlayer.motionZ += Math.cos(dir) * 0.8; 
            }
            if (mc.gameSettings.keyBindLeft.isKeyDown()) {
               var dir = Math.rad(mc.thePlayer.rotationYaw - 90);
                mc.thePlayer.motionX += -Math.sin(dir) * 0.8; 
                mc.thePlayer.motionZ += Math.cos(dir) * 0.8; 
            }
            if (mc.gameSettings.keyBindBack.isKeyDown()) {
               var dir = Math.rad(mc.thePlayer.rotationYaw + 180);
                mc.thePlayer.motionX += -Math.sin(dir) * 0.8; 
                mc.thePlayer.motionZ += Math.cos(dir) * 0.8; 
            }
            if (mc.gameSettings.keyBindRight.isKeyDown()) {
               var dir = Math.rad(mc.thePlayer.rotationYaw + 90);
                mc.thePlayer.motionX += -Math.sin(dir) * 0.8; 
                mc.thePlayer.motionZ += Math.cos(dir) * 0.8; 
            }
			} if(spin >= Wait.get() + 3) {
				spin = 0; // allow for more movements
			}
			break;
			case "FireFly":
			mc.gameSettings.keyBindJump.pressed = false;
			mc.thePlayer.motionY = 0;
     		mc.thePlayer.motionX *= 1.2;
    		mc.thePlayer.motionZ *= 1.2;
			spin++;
			if(spin <= 3) {
					mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.99999, mc.thePlayer.posZ);
			}
			break;
			case "Clip":
			spin++;
			mc.thePlayer.setSprinting(true);
			mc.thePlayer.motionX = 0;
			mc.thePlayer.motionY = 0;
			mc.thePlayer.motionZ = 0;
			if(spin >= Wait.get()) {
			if (mc.gameSettings.keyBindForward.isKeyDown() && !mc.thePlayer.isCollidedHorizontally) {
               var dir = Math.rad(mc.thePlayer.rotationYaw);
                mc.thePlayer.setPosition(mc.thePlayer.posX += -Math.sin(dir) * VanillaSpeed.get(), mc.thePlayer.posY, mc.thePlayer.posZ);
                mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ += Math.cos(dir) * VanillaSpeed.get());
            }
            if (mc.gameSettings.keyBindLeft.isKeyDown() && !mc.thePlayer.isCollidedHorizontally) {
               var dir = Math.rad(mc.thePlayer.rotationYaw - 90);
                mc.thePlayer.setPosition(mc.thePlayer.posX += -Math.sin(dir) * VanillaSpeed.get(), mc.thePlayer.posY, mc.thePlayer.posZ);
                mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ += Math.cos(dir) * VanillaSpeed.get());
            }
            if (mc.gameSettings.keyBindBack.isKeyDown() && !mc.thePlayer.isCollidedHorizontally) {
               var dir = Math.rad(mc.thePlayer.rotationYaw + 180);
                mc.thePlayer.setPosition(mc.thePlayer.posX += -Math.sin(dir) * VanillaSpeed.get(), mc.thePlayer.posY, mc.thePlayer.posZ);
                mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ += Math.cos(dir) * VanillaSpeed.get());
            }
            if (mc.gameSettings.keyBindRight.isKeyDown() && !mc.thePlayer.isCollidedHorizontally) {
               var dir = Math.rad(mc.thePlayer.rotationYaw + 90);
                mc.thePlayer.setPosition(mc.thePlayer.posX += -Math.sin(dir) * VanillaSpeed.get(), mc.thePlayer.posY, mc.thePlayer.posZ);
                mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ += Math.cos(dir) * VanillaSpeed.get());
            }
			if (mc.gameSettings.keyBindJump.isKeyDown() && !mc.thePlayer.isCollidedVertically) {
                mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + VanillaSpeed.get(), mc.thePlayer.posZ);
            }
            if (mc.gameSettings.keyBindSneak.isKeyDown() && !mc.thePlayer.isCollidedVertically) {
                mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY - VanillaSpeed.get(), mc.thePlayer.posZ);
            }
			spin = 0;
			}
			break;
			case "NCPClip":
						spin++;
			mc.thePlayer.setSprinting(true);
			mc.thePlayer.motionY = 0;
			if(spin >= Wait.get()) {
							mc.thePlayer.motionX = 0;
			mc.thePlayer.motionZ = 0;
			if (mc.gameSettings.keyBindForward.isKeyDown() && !mc.thePlayer.isCollidedHorizontally) {
               var dir = Math.rad(mc.thePlayer.rotationYaw);
                mc.thePlayer.setPosition(mc.thePlayer.posX += -Math.sin(dir) * VanillaSpeed.get(), mc.thePlayer.posY, mc.thePlayer.posZ);
                mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ += Math.cos(dir) * VanillaSpeed.get());
            }
            if (mc.gameSettings.keyBindLeft.isKeyDown() && !mc.thePlayer.isCollidedHorizontally) {
               var dir = Math.rad(mc.thePlayer.rotationYaw - 90);
                mc.thePlayer.setPosition(mc.thePlayer.posX += -Math.sin(dir) * VanillaSpeed.get(), mc.thePlayer.posY, mc.thePlayer.posZ);
                mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ += Math.cos(dir) * VanillaSpeed.get());
            }
            if (mc.gameSettings.keyBindBack.isKeyDown() && !mc.thePlayer.isCollidedHorizontally) {
               var dir = Math.rad(mc.thePlayer.rotationYaw + 180);
                mc.thePlayer.setPosition(mc.thePlayer.posX += -Math.sin(dir) * VanillaSpeed.get(), mc.thePlayer.posY, mc.thePlayer.posZ);
                mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ += Math.cos(dir) * VanillaSpeed.get());
            }
            if (mc.gameSettings.keyBindRight.isKeyDown() && !mc.thePlayer.isCollidedHorizontally) {
               var dir = Math.rad(mc.thePlayer.rotationYaw + 90);
                mc.thePlayer.setPosition(mc.thePlayer.posX += -Math.sin(dir) * VanillaSpeed.get(), mc.thePlayer.posY, mc.thePlayer.posZ);
                mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ += Math.cos(dir) * VanillaSpeed.get());
            }
			if (mc.gameSettings.keyBindJump.isKeyDown() && !mc.thePlayer.isCollidedVertically) {
                mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + VanillaSpeed.get(), mc.thePlayer.posZ);
            }
            if (mc.gameSettings.keyBindSneak.isKeyDown() && !mc.thePlayer.isCollidedVertically) {
                mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY - VanillaSpeed.get(), mc.thePlayer.posZ);
            }
			spin = 0;
			}
			break;
		}//sw
		mc.thePlayer.onGround = Ground.get();
		if(Timer.get()) {
		mc.timer.timerSpeed = FTimer.get();
		}
		if(Bob.get() == true && (mc.gameSettings.keyBindForward.pressed || mc.gameSettings.keyBindLeft.pressed || mc.gameSettings.keyBindRight.pressed || mc.gameSettings.keyBindBack.pressed)) {
		mc.thePlayer.cameraYaw = 0.10;
		}
		if(QuickStop.get() == true && (!mc.gameSettings.keyBindForward.pressed && !mc.gameSettings.keyBindLeft.pressed && !mc.gameSettings.keyBindRight.pressed && !mc.gameSettings.keyBindBack.pressed)) {
		mc.thePlayer.motionX = 0.0;
		mc.thePlayer.motionZ = 0.0;
	    }
		if(FloatTech.get()) {
			japanese++;
			if(japanese >= 4) {
				japanese = 0;
			mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + NCPAirwalkY.get() / 1000000, mc.thePlayer.posZ);
		}
		
		}
		if(SpeedLimit.get() == true) { // limit speed of fly to prevent super-warpdrives
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