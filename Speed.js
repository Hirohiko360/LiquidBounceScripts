var scriptName = "Speed "; 
var scriptVersion = 1.0; 
var scriptAuthor = "soulplexis";

var autoGapple = new AutoGapple();
var autoGappleClient;

 Math.rad = function(deg) {
    return deg * Math.PI / 180;
  };
var MathHelper = Java.type("net.minecraft.util.MathHelper");
var Potion = Java.type("net.minecraft.potion.Potion");
var BlockPos = Java.type("net.minecraft.util.BlockPos");
function AutoGapple() {
	var Mode = value.createList("Mode", ["Vanilla", "VanillaHop", "NCPHop", "FireFlyGround", "PACBHop", "ACPBHop", "ACP", "ACRBHop", "DaedalusBHop", "Guile", "LongHop", "VHop", "Damage", "ClipHop"], "Vanilla");
	var Bobbing = value.createBoolean("Bobbing", true);
	var VSpeed = value.createFloat("VSpeed", 0.20, 0, 1);
	var FastStop = value.createBoolean("FastStop", true);
		var VHopLongJump = value.createBoolean("VHopLongJump", true);
var guar = 0
	var momentum = 1;
    this.getName = function() {
        return "SoulSpeed";
    };

    this.getDescription = function() {
        return "More speed modes!";
    };

    this.getCategory = function() {
        return "Movement";
    };
    this.onMotion = function () {
		switch(Mode.get()) {
			case "Vanilla":
				var moveSpeed = VSpeed.get();
			        var forward = mc.thePlayer.movementInput.moveForward;
                    var strafe = mc.thePlayer.movementInput.moveStrafe;
                    var yaw = mc.thePlayer.rotationYaw;
                    if (forward == 0 && strafe == 0 && FastStop.get()) { // added faststop
                        mc.thePlayer.motionX = 0;
                        mc.thePlayer.motionZ = 0;
                    } 
					if (forward != 0) {
                        if (strafe >= 1.0) {
                            yaw = mc.thePlayer.rotationYaw + ((forward > 0.0) ? -45 : 45);
                            strafe = 0;
                        } else if (strafe <= -1.0) {
                            yaw = mc.thePlayer.rotationYaw + ((forward > 0.0) ? 45 : -45);
                            strafe = 0;
                        }
                    }

                    if (forward > 0) {
                        forward = 1;
                    } else if (forward < 0) {
                        forward = -1;
                    }

                    var mx = Math.cos(Math.rad(yaw + 90));
                    var mz = Math.sin(Math.rad(yaw + 90));

                    mc.thePlayer.motionX = forward * moveSpeed * mx + strafe * moveSpeed * mz;
                    mc.thePlayer.motionZ = forward * moveSpeed * mz - strafe * moveSpeed * mx;
			break;
			case "VanillaHop":
			mc.thePlayer.motionX *= 0.8;
			mc.thePlayer.motionZ *= 0.8;
				var moveSpeed = VSpeed.get();
			        var forward = mc.thePlayer.movementInput.moveForward;
                    var strafe = mc.thePlayer.movementInput.moveStrafe;
                    var yaw = mc.thePlayer.rotationYaw;
                    if (forward == 0 && strafe == 0 && FastStop.get()) { // added FastStop
                        mc.thePlayer.motionX = 0;
                        mc.thePlayer.motionZ = 0;
                    } 
					if (forward != 0) {
                        if (strafe >= 1.0) {
                            yaw = mc.thePlayer.rotationYaw + ((forward > 0.0) ? -45 : 45);
                            strafe = 0;
                        } else if (strafe <= -1.0) {
                            yaw = mc.thePlayer.rotationYaw + ((forward > 0.0) ? 45 : -45);
                            strafe = 0;
                        }
                    }

                    if (forward > 0) {
                        forward = 1;
                    } else if (forward < 0) {
                        forward = -1;
                    }

                    var mx = Math.cos(Math.rad(yaw + 90));
                    var mz = Math.sin(Math.rad(yaw + 90));

                    mc.thePlayer.motionX = forward * moveSpeed * mx + strafe * moveSpeed * mz;
                    mc.thePlayer.motionZ = forward * moveSpeed * mz - strafe * moveSpeed * mx;
					
			if(mc.thePlayer.onGround && (mc.gameSettings.keyBindForward.pressed || mc.gameSettings.keyBindLeft.pressed || mc.gameSettings.keyBindRight.pressed || mc.gameSettings.keyBindBack.pressed)) {
				mc.thePlayer.jump();
			}
			break;
			case "FireFlyGround":
					var moveSpeed = 0.20;
			        var forward = mc.thePlayer.movementInput.moveForward;
                    var strafe = mc.thePlayer.movementInput.moveStrafe;
                    var yaw = mc.thePlayer.rotationYaw;
                    if (forward == 0 && strafe == 0 && FastStop.get()) { // added faststop
                        mc.thePlayer.motionX = 0;
                        mc.thePlayer.motionZ = 0;
                    } 
					if (forward != 0) {
                        if (strafe >= 1.0) {
                            yaw = mc.thePlayer.rotationYaw + ((forward > 0.0) ? -45 : 45);
                            strafe = 0;
                        } else if (strafe <= -1.0) {
                            yaw = mc.thePlayer.rotationYaw + ((forward > 0.0) ? 45 : -45);
                            strafe = 0;
                        }
                    }

                    if (forward > 0) {
                        forward = 1;
                    } else if (forward < 0) {
                        forward = -1;
                    }

                    var mx = Math.cos(Math.rad(yaw + 90));
                    var mz = Math.sin(Math.rad(yaw + 90));

                    mc.thePlayer.motionX = forward * moveSpeed * mx + strafe * moveSpeed * mz;
                    mc.thePlayer.motionZ = forward * moveSpeed * mz - strafe * moveSpeed * mx;
			mc.thePlayer.motionX *= 1.2;
			mc.thePlayer.motionZ *= 1.2;
			if(strafe != 0 || forward != 0) {
				mc.timer.timerSpeed = 1.0 + moveSpeed;
			} else {
				mc.timer.timerSpeed = 1.0;
			}
			break;
			case "PACBHop":
			 if (mc.thePlayer.isPotionActive(Potion.moveSpeed)) {	
		var amp = mc.thePlayer.getActivePotionEffect(Potion.moveSpeed).getAmplifier();
	    } else {
			amp = undefined;
		}
			mc.thePlayer.motionX *= 0.8;
			mc.thePlayer.motionZ *= 0.8;
				var moveSpeed = 0.33
				switch(amp) { // is above 5 necessary? I'll try to do it sometime anyway but this is a workaround for now and should cover most speed effects you'll be seeing on servers
		     case 0:
			 moveSpeed = 0.40; //0.31 +6 +6 +
		     break;
			 case 1:
			 moveSpeed = 0.48; // 0.37 - previous value
			 break;
			case 2:
			moveSpeed = 0.56; // 0.41
			break;
			case 3:
			moveSpeed = 0.63; // 0.45
			break;
			case 4:
			moveSpeed = 0.71; // 0.49
			break;
			case 5:
			moveSpeed = 0.80; // 0.53
			break;
			default:
			//everything i do here flags ncp when turning Y_Y 
		}
			        var forward = mc.thePlayer.movementInput.moveForward;
                    var strafe = mc.thePlayer.movementInput.moveStrafe;
                    var yaw = mc.thePlayer.rotationYaw;
                    if (forward == 0 && strafe == 0 && FastStop.get()) { // added FastStop
                        mc.thePlayer.motionX = 0;
                        mc.thePlayer.motionZ = 0;
                    } 
					if (forward != 0) {
                        if (strafe >= 1.0) {
                            yaw = mc.thePlayer.rotationYaw + ((forward > 0.0) ? -45 : 45);
                            strafe = 0;
                        } else if (strafe <= -1.0) {
                            yaw = mc.thePlayer.rotationYaw + ((forward > 0.0) ? 45 : -45);
                            strafe = 0;
                        }
                    }

                    if (forward > 0) {
                        forward = 1;
                    } else if (forward < 0) {
                        forward = -1;
                    }

                    var mx = Math.cos(Math.rad(yaw + 90));
                    var mz = Math.sin(Math.rad(yaw + 90));

                    mc.thePlayer.motionX = forward * moveSpeed * mx + strafe * moveSpeed * mz;
                    mc.thePlayer.motionZ = forward * moveSpeed * mz - strafe * moveSpeed * mx;
					
			if(mc.thePlayer.onGround && (mc.gameSettings.keyBindForward.pressed || mc.gameSettings.keyBindLeft.pressed || mc.gameSettings.keyBindRight.pressed || mc.gameSettings.keyBindBack.pressed)) {
				mc.thePlayer.jump();
			}
			break;
			case "ACPBHop":
			 if (mc.thePlayer.isPotionActive(Potion.moveSpeed)) {	
		var amp = mc.thePlayer.getActivePotionEffect(Potion.moveSpeed).getAmplifier();
	    } else {
			amp = undefined;
		}
			mc.thePlayer.motionX *= 0.8;
			mc.thePlayer.motionZ *= 0.8;
				var moveSpeed = 0.55
				switch(amp) { 
		     case 0:
			 moveSpeed = 0.85; //0.31 +6 +6 +
		     break;
			 case 1:
			 moveSpeed = 0.91; // 0.37 - previous value
			 break;
			case 2:
			moveSpeed = 1.01; // 0.41
			break;
			case 3:
			moveSpeed = 1.12; // 0.45
			break;
			case 4:
			moveSpeed = 1.23; // 0.49
			break;
			case 5:
			moveSpeed = 1.35; // 0.53
			break;
			default:
			//everything i do here flags ncp when turning Y_Y 
		}
			        var forward = mc.thePlayer.movementInput.moveForward;
                    var strafe = mc.thePlayer.movementInput.moveStrafe;
                    var yaw = mc.thePlayer.rotationYaw;
                    if (forward == 0 && strafe == 0 && FastStop.get()) { // added FastStop
                        mc.thePlayer.motionX = 0;
                        mc.thePlayer.motionZ = 0;
                    } 
					if (forward != 0) {
                        if (strafe >= 1.0) {
                            yaw = mc.thePlayer.rotationYaw + ((forward > 0.0) ? -45 : 45);
                            strafe = 0;
                        } else if (strafe <= -1.0) {
                            yaw = mc.thePlayer.rotationYaw + ((forward > 0.0) ? 45 : -45);
                            strafe = 0;
                        }
                    }

                    if (forward > 0) {
                        forward = 1;
                    } else if (forward < 0) {
                        forward = -1;
                    }

                    var mx = Math.cos(Math.rad(yaw + 90));
                    var mz = Math.sin(Math.rad(yaw + 90));

                    mc.thePlayer.motionX = forward * moveSpeed * mx + strafe * moveSpeed * mz;
                    mc.thePlayer.motionZ = forward * moveSpeed * mz - strafe * moveSpeed * mx;
					
			if(mc.thePlayer.onGround && (mc.gameSettings.keyBindForward.pressed || mc.gameSettings.keyBindLeft.pressed || mc.gameSettings.keyBindRight.pressed || mc.gameSettings.keyBindBack.pressed)) {
				mc.thePlayer.jump();
			}
			break;
			case "ACP":
			 if (mc.thePlayer.isPotionActive(Potion.moveSpeed)) {	
		var amp = mc.thePlayer.getActivePotionEffect(Potion.moveSpeed).getAmplifier();
	    } else {
			amp = undefined;
		}
			mc.thePlayer.motionX *= 0.8;
			mc.thePlayer.motionZ *= 0.8;
			if(mc.thePlayer.onGround) {
				var moveSpeed = 0.50
				switch(amp) { 
		     case 0:
			 moveSpeed = 0.70; //0.31 +6 +6 +
		     break;
			 case 1:
			 moveSpeed = 0.75; // 0.37 - previous value
			 break;
			case 2:
			moveSpeed = 0.85; // 0.41
			break;
			case 3:
			moveSpeed = 0.95; // 0.45
			break;
			case 4:
			moveSpeed = 1.05; // 0.49
			break;
			case 5:
			moveSpeed = 1.15; // 0.53
			break;
			default:
			//everything i do here flags ncp when turning Y_Y 
		}
			} else {
					var moveSpeed = 0.55
				switch(amp) { 
		     case 0:
			 moveSpeed = 0.85; //0.31 +6 +6 +
		     break;
			 case 1:
			 moveSpeed = 0.91; // 0.37 - previous value
			 break;
			case 2:
			moveSpeed = 1.01; // 0.41
			break;
			case 3:
			moveSpeed = 1.12; // 0.45
			break;
			case 4:
			moveSpeed = 1.23; // 0.49
			break;
			case 5:
			moveSpeed = 1.35; // 0.53
			break;
			default:
			//everything i do here flags ncp when turning Y_Y 
		}
			}
			        var forward = mc.thePlayer.movementInput.moveForward;
                    var strafe = mc.thePlayer.movementInput.moveStrafe;
                    var yaw = mc.thePlayer.rotationYaw;
                    if (forward == 0 && strafe == 0 && FastStop.get() == false) { // added FastStop
                        mc.thePlayer.motionX = 0;
                        mc.thePlayer.motionZ = 0;
                    }
					if (forward != 0) {
                        if (strafe >= 1.0) {
                            yaw = mc.thePlayer.rotationYaw + ((forward > 0.0) ? -45 : 45);
                            strafe = 0;
                        } else if (strafe <= -1.0) {
                            yaw = mc.thePlayer.rotationYaw + ((forward > 0.0) ? 45 : -45);
                            strafe = 0;
                        }
                    }

                    if (forward > 0) {
                        forward = 1;
                    } else if (forward < 0) {
                        forward = -1;
                    }

                    var mx = Math.cos(Math.rad(yaw + 90));
                    var mz = Math.sin(Math.rad(yaw + 90));

                    mc.thePlayer.motionX = forward * moveSpeed * mx + strafe * moveSpeed * mz;
                    mc.thePlayer.motionZ = forward * moveSpeed * mz - strafe * moveSpeed * mx;
			break;
			case "ACRBHop":
		mc.thePlayer.jumpMovementFactor = 0.1;
		mc.thePlayer.motionX /= 1.1;
		mc.thePlayer.motionZ /= 1.1;
			if(mc.thePlayer.onGround && (mc.gameSettings.keyBindForward.pressed || mc.gameSettings.keyBindLeft.pressed || mc.gameSettings.keyBindRight.pressed || mc.gameSettings.keyBindBack.pressed)) {
				mc.thePlayer.jump();
			}
			break;
			case "DaedalusBHop":
			mc.thePlayer.motionX *= 0.8;
			mc.thePlayer.motionZ *= 0.8;
				var moveSpeed = 0.3
			        var forward = mc.thePlayer.movementInput.moveForward;
                    var strafe = mc.thePlayer.movementInput.moveStrafe;
                    var yaw = mc.thePlayer.rotationYaw;
                    if (forward == 0 && strafe == 0 && FastStop.get()) { // added FastStop
                        mc.thePlayer.motionX = 0;
                        mc.thePlayer.motionZ = 0;
                    } 
					if (forward != 0) {
                        if (strafe >= 1.0) {
                            yaw = mc.thePlayer.rotationYaw + ((forward > 0.0) ? -45 : 45);
                            strafe = 0;
                        } else if (strafe <= -1.0) {
                            yaw = mc.thePlayer.rotationYaw + ((forward > 0.0) ? 45 : -45);
                            strafe = 0;
                        }
                    }

                    if (forward > 0) {
                        forward = 1;
                    } else if (forward < 0) {
                        forward = -1;
                    }

                    var mx = Math.cos(Math.rad(yaw + 90));
                    var mz = Math.sin(Math.rad(yaw + 90));

                    mc.thePlayer.motionX = forward * moveSpeed * mx + strafe * moveSpeed * mz;
                    mc.thePlayer.motionZ = forward * moveSpeed * mz - strafe * moveSpeed * mx;
					
			if(mc.thePlayer.onGround && (mc.gameSettings.keyBindForward.pressed || mc.gameSettings.keyBindLeft.pressed || mc.gameSettings.keyBindRight.pressed || mc.gameSettings.keyBindBack.pressed)) {
				mc.thePlayer.jump();
			}
			break;
			case "Guile":
			if(mc.thePlayer.movementInput.moveForward != 0 || mc.thePlayer.movementInput.moveStrafe != 0) {
			momentum += 0.001;
			mc.thePlayer.motionX *= momentum;
			mc.thePlayer.motionZ *= momentum;
			mc.thePlayer.motionY += 0.01;
			mc.thePlayer.cameraYaw = 0.154;
			if(momentum >= 1.30) {
				momentum = 1.29;
			}
			if(mc.thePlayer.onGround == false && momentum > 1) {
				momentum -= 0.007;
			}
			}
			if(momentum >= 1.23) {
				momentum = 1.22;
			}
			break;
			case "LongHop":
			if(mc.thePlayer.onGround && (mc.gameSettings.keyBindForward.pressed || mc.gameSettings.keyBindLeft.pressed || mc.gameSettings.keyBindRight.pressed || mc.gameSettings.keyBindBack.pressed)) {
				mc.thePlayer.jump();
			}
			if(mc.thePlayer.motionX != 0 && mc.thePlayer.motionZ != 0) {
				mc.thePlayer.motionX *= 1 + mc.thePlayer.motionY / 2;
				mc.thePlayer.motionZ *= 1 + mc.thePlayer.motionY / 2;
			}
			break;
			case "VHop":
			if(mc.thePlayer.motionY > 0) {
				mc.thePlayer.motionY -= 0.00925;
			}
			if(mc.thePlayer.motionY < 0) {
				mc.thePlayer.motionY += 0.00925;
			}
			if(mc.thePlayer.onGround && (mc.gameSettings.keyBindForward.pressed || mc.gameSettings.keyBindLeft.pressed || mc.gameSettings.keyBindRight.pressed || mc.gameSettings.keyBindBack.pressed)) {
				mc.thePlayer.jump();
			}
			if(VHopLongJump.get()) {
				if(mc.thePlayer.onGround == false) {
					mc.timer.timerSpeed = 0.75;
				} else {
					mc.timer.timerSpeed = 1.0;
				}
			}
			var moveSpeed = VSpeed.get();
			var forward = mc.thePlayer.movementInput.moveForward;
            var strafe = mc.thePlayer.movementInput.moveStrafe;
            var yaw = mc.thePlayer.rotationYaw;
                    if (forward == 0 && strafe == 0 && FastStop.get()) { // added faststop USELESS
                        mc.thePlayer.motionX = 0;
                        mc.thePlayer.motionZ = 0;
                    } 
					if (forward != 0) {
                        if (strafe >= 1.0) {
                            yaw = mc.thePlayer.rotationYaw + ((forward > 0.0) ? -45 : 45);
                            strafe = 0;
                        } else if (strafe <= -1.0) {
                            yaw = mc.thePlayer.rotationYaw + ((forward > 0.0) ? 45 : -45);
                            strafe = 0;
                        }
                    }

                    if (forward > 0) {
                        forward = 1;
                    } else if (forward < 0) {
                        forward = -1;
                    }

                    var mx = Math.cos(Math.rad(yaw + 90));
                    var mz = Math.sin(Math.rad(yaw + 90));

                    mc.thePlayer.motionX = forward * moveSpeed * mx + strafe * moveSpeed * mz;
                    mc.thePlayer.motionZ = forward * moveSpeed * mz - strafe * moveSpeed * mx;
			break;
			case "Damage":
			if(mc.thePlayer.hurtTime != 0) {
				mc.thePlayer.motionX *= 1.5;
				mc.thePlayer.motionZ *= 1.5;
				if(mc.thePlayer.onGround) {
					mc.thePlayer.jump();
					mc.thePlayer.motionY *= 1.02;
				}
			}
			break;
			case "ClipHop":
			if(mc.thePlayer.posY == Math.ceil(mc.thePlayer.posY)) {
				mc.thePlayer.posY = Math.floor(mc.thePlayer.posY - 1);
			}
			if(mc.thePlayer.onGround && (mc.gameSettings.keyBindForward.pressed || mc.gameSettings.keyBindLeft.pressed || mc.gameSettings.keyBindRight.pressed || mc.gameSettings.keyBindBack.pressed)) {
				mc.thePlayer.jump();
			}
			var moveSpeed = VSpeed.get();
			var forward = mc.thePlayer.movementInput.moveForward;
            var strafe = mc.thePlayer.movementInput.moveStrafe;
            var yaw = mc.thePlayer.rotationYaw;
                    if (forward == 0 && strafe == 0 && FastStop.get()) { // added faststop USELESS
                        mc.thePlayer.motionX = 0;
                        mc.thePlayer.motionZ = 0;
                    } 
					if (forward != 0) {
                        if (strafe >= 1.0) {
                            yaw = mc.thePlayer.rotationYaw + ((forward > 0.0) ? -45 : 45);
                            strafe = 0;
                        } else if (strafe <= -1.0) {
                            yaw = mc.thePlayer.rotationYaw + ((forward > 0.0) ? 45 : -45);
                            strafe = 0;
                        }
                    }

                    if (forward > 0) {
                        forward = 1;
                    } else if (forward < 0) {
                        forward = -1;
                    }

                    var mx = Math.cos(Math.rad(yaw + 90));
                    var mz = Math.sin(Math.rad(yaw + 90));

                    mc.thePlayer.motionX = forward * moveSpeed * mx + strafe * moveSpeed * mz;
                    mc.thePlayer.motionZ = forward * moveSpeed * mz - strafe * moveSpeed * mx;
			break;
		}
	}
	this.onUpdate = function() {
		if(Mode.get() == "NCPHop") {
								if(!mc.thePlayer.onGround) {
			mc.thePlayer.setSprinting(true);  // this doesn't rly work i don't know why
		}
		 if (mc.thePlayer.isPotionActive(Potion.moveSpeed)) {	
		var amp = mc.thePlayer.getActivePotionEffect(Potion.moveSpeed).getAmplifier();
	    } else {
			amp = undefined;
		}
		if(mc.thePlayer.movementInput.moveForward != 0 || mc.thePlayer.movementInput.moveStrafe != 0) {
			mc.timer.timerSpeed = 1.08;
        if(mc.thePlayer.onGround) { 
	         mc.thePlayer.jump();
			 mc.timer.timerSpeed = 1.03;
        }
       } else {
			mc.timer.timerSpeed = 1;
		}
		var moveSpeed = (MathHelper.sqrt_double(mc.thePlayer.motionX * mc.thePlayer.motionX + mc.thePlayer.motionZ * mc.thePlayer.motionZ));
		 switch(amp) { 
		     case 0:
			 moveSpeed = 0.31; //0.31 +6 +6 +
		     break;
			 case 1:
			 moveSpeed = 0.37; // 0.37 - previous value
			 break;
			case 2:
			moveSpeed = 0.43; // 0.41
			break;
			case 3:
			moveSpeed = 0.49; // 0.45
			break;
			case 4:
			moveSpeed = 0.55; // 0.49
			break;
			case 5:
			moveSpeed = 0.61; // 0.53
			break;
		}
		mc.thePlayer.motionX *= 0.8;
		mc.thePlayer.motionZ *= 0.8;
			        var forward = mc.thePlayer.movementInput.moveForward;
                    var strafe = mc.thePlayer.movementInput.moveStrafe;
                    var yaw = mc.thePlayer.rotationYaw;
                    if (forward == 0 && strafe == 0) { 
                        mc.thePlayer.motionX = 0;
                        mc.thePlayer.motionZ = 0;
                    } else if (forward != 0) {
                        if (strafe >= 1.0) {
                            yaw = mc.thePlayer.rotationYaw + ((forward > 0.0) ? -45 : 45);
                            strafe = 0;
                        } else if (strafe <= -1.0) {
                            yaw = mc.thePlayer.rotationYaw + ((forward > 0.0) ? 45 : -45);
                            strafe = 0;
                        }
                    }

                    if (forward > 0) {
                        forward = 1;
                    } else if (forward < 0) {
                        forward = -1;
                    }
                    var mx = Math.cos(Math.rad(yaw + 90));
                    var mz = Math.sin(Math.rad(yaw + 90));
					mc.thePlayer.jumpMovementFactor = 0.029;
                    mc.thePlayer.motionX = forward * moveSpeed * mx + strafe * moveSpeed * mz;
                    mc.thePlayer.motionZ = forward * moveSpeed * mz - strafe * moveSpeed * mx;
		}
	}
	this.onDisable = function() {
		if(FastStop.get() == true && (!mc.gameSettings.keyBindForward.pressed && !mc.gameSettings.keyBindLeft.pressed && !mc.gameSettings.keyBindRight.pressed && !mc.gameSettings.keyBindBack.pressed)) {
		mc.thePlayer.motionX = 0.0;
		mc.thePlayer.motionZ = 0.0;
	    }
		mc.timer.timerSpeed = 1.0;
	}
	this.onEnable = function() {
	}
	this.addValues = function(s) {
		s.add(Mode);
		s.add(VSpeed);
		s.add(Bobbing);
		s.add(FastStop);
		s.add(VHopLongJump);
	}
	this.getTag = function() {
    return Mode.get()
}
}

function onLoad() {
};

function onEnable() {
    autoGappleClient = moduleManager.registerModule(autoGapple);
};

function onDisable() {
    moduleManager.unregisterModule(autoGappleClient);
};