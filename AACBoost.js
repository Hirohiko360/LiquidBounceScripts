var scriptName = 'AACBoost';
var scriptAuthor = 'Nvaros';
var scriptVersion = 1.0;
var S12PacketEntityVelocity = Java.type('net.minecraft.network.play.server.S12PacketEntityVelocity');
var S08PacketPlayerPosLook = Java.type('net.minecraft.network.play.server.S08PacketPlayerPosLook');
Math.radians = function (degree) {
	return (degree * Math.PI) / 180
};
Math.degrees = function (radians) {
	return (radians * 180) / Math.PI
};

function sign(_0x318f87) {
	return isNaN(_0x318f87) ? 1 : (Math.abs(_0x318f87) == 0) ? 0 : (_0x318f87 / Math.abs(_0x318f87))
}

function getMoveYaw() {
	var yaw = mc.thePlayer.rotationYaw;
	yaw -= ((mc.thePlayer.movementInput.moveForward * mc.thePlayer.movementInput.moveStrafe) == 0) ? (mc.thePlayer.movementInput.moveForward == 0) && mc.thePlayer.movementInput.moveStrafe == 0 ? 0 : ((sign(mc.thePlayer.movementInput.moveStrafe) + (sign(mc.thePlayer.movementInput.moveForward) - 1) * (Math.abs(sign(mc.thePlayer.movementInput.moveStrafe)) - 1)) * 90) : (sign(mc.thePlayer.movementInput.moveStrafe) * (90 - (sign(mc.thePlayer.movementInput.moveForward) * 45)));
	return yaw
}

function isInputH() {
	return mc.gameSettings.keyBindForward.isKeyDown() || mc.gameSettings.keyBindRight.isKeyDown() || mc.gameSettings.keyBindLeft.isKeyDown() || mc.gameSettings.keyBindBack.isKeyDown()
}

function AACBoost() {
	var ticktimer;
	var cankeepBoostOnGround;
	var packetHVelocity = value.createFloat('PacketHVelocity', 0.8, 0.01, 0.9);
	var maxJumpBoost = value.createFloat('MaxJumpBoost', 1.17, 1.05, 1.35);
	var subtractGroundBoost = value.createFloat('SubtractGroundBoost', 0.2, 0.1, 0.25);
	var keepBoostOnGround = value.createBoolean('KeepBoostOnGround', false);
	var jump = value.createBoolean('Jump', false);
	var modifyYMotion = value.createBoolean('ModifyYMotion', false);
	var cancelVeloInAir = value.createBoolean('CancelVeloInAir', false);
	var veloOnBoost = value.createList('VeloOnBoost', ['CancelBoost', 'CancelVelo', 'Jump'], 'CancelVelo');
	var canJump;
	var boostvalue2;
	var onVelocityposY;
	var boostvalue1;
	var canBoostOnGround1;
	var speedEffectValue;
	var potionlist;
	var speedEffectID;
	var hasSpeedEffect;
	var boostreducement;
	var shouldmodifyYMotion;
	var hurted;
	this.getName = function () {
		return 'AACBoost'
	};
	this.onEnable = function () {
		canBoostOnGround1 = false;
		canJump = false;
		ticktimer = 0;
		hurted = false;
		shouldmodifyYMotion = false;
		cankeepBoostOnGround = false;
		hasSpeedEffect = false
	};
	this.onPacket = function (event) {
		var packet = event.getPacket();
		if (packet instanceof S12PacketEntityVelocity && packet.getEntityID() == mc.thePlayer.getEntityId() && (packet.getMotionX() != 0 || packet.getMotionZ() != 0) && mc.thePlayer.onGround && (!cankeepBoostOnGround || cankeepBoostOnGround && keepBoostOnGround.get() && veloOnBoost.get() == 'Jump')) {
			cankeepBoostOnGround = true;
			canBoostOnGround1 = false;
			ticktimer = 0;
			canJump = false;
			hurted = true;
			packet.motionX *= packetHVelocity.get();
			packet.motionZ *= packetHVelocity.get();
			packet.motionY *= 1.02;
			onVelocityposY = mc.thePlayer.posY;
			if (modifyYMotion.get()) {
				shouldmodifyYMotion = true
			}
		} else if (packet instanceof S12PacketEntityVelocity && packet.getEntityID() == mc.thePlayer.getEntityId() && cankeepBoostOnGround && (cancelVeloInAir.get() && !mc.thePlayer.onGround || veloOnBoost.get() == 'CancelVelo' && keepBoostOnGround.get() && mc.thePlayer.onGround)) {
			event.cancelEvent()
		}
		if (packet instanceof S08PacketPlayerPosLook && canJump) {
			canBoostOnGround1 = false;
			ticktimer = 0;
			canJump = false;
			hurted = false;
			shouldmodifyYMotion = false;
			cankeepBoostOnGround = false
		}
	};
	this.getDescription = function () {
		return 'Nice AirBoost'
	};
	this.getCategory = function () {
		return 'Fun'
	};
	this.addValues = function (values) {
		values.add(maxJumpBoost);
		values.add(subtractGroundBoost);
		values.add(packetHVelocity);
		values.add(keepBoostOnGround);
		values.add(jump);
		values.add(cancelVeloInAir);
		values.add(modifyYMotion);
		values.add(veloOnBoost)
	};
	this.onUpdate = function () {
		var direction = Math.radians((getMoveYaw()));
		if (cankeepBoostOnGround) {
			if (hurted) {
				hurted = false;
				if (mc.thePlayer.hurtTime < 8) {
					cankeepBoostOnGround = false
				}
			}
			if (jump.get() ? ((mc.thePlayer.posY - onVelocityposY) <= 0.24) && mc.thePlayer.motionY < -0.1 : true) {
				canJump = true
			}
			boostvalue1 = jump.get() ? maxJumpBoost.get() : (maxJumpBoost.get() - subtractGroundBoost.get());
			if (canJump) {
				direction = Math.radians(getMoveYaw());
				if (isInputH()) {
					if ((ticktimer == 0)) {
						mc.thePlayer.motionY = 0.43
					} else if (ticktimer >= 1 && (mc.thePlayer.motionY >= -0.9) && !canBoostOnGround1 && modifyYMotion.get() && shouldmodifyYMotion) {
						mc.thePlayer.motionY = 0.428 - (0.0723 - ((ticktimer + 1) * 0.000265) * ticktimer)
					}
					if (mc.thePlayer.onGround && ticktimer > 2) {
						canBoostOnGround1 = true
					}
					potionlist = mc.thePlayer.getActivePotionEffects().toArray();
					if (potionlist.length > 0) {
						for (var i in potionlist) {
							speedEffectID = potionlist[i].getPotionID();
							hasSpeedEffect = (speedEffectID == 1) ? true : false;
							if (hasSpeedEffect) {
								speedEffectValue = potionlist[i].getAmplifier() + 1;
								break
							}
						}
					} else {
						hasSpeedEffect = false
					}
					boostreducement = hasSpeedEffect ? 0.0007 * speedEffectValue : 0;
					boostvalue2 = mc.thePlayer.onGround && keepBoostOnGround.get() ? 0.9825 - boostreducement : 0.9835;
					mc.thePlayer.motionX = (-Math.sin(direction) * boostvalue1) * Math.pow(boostvalue2, ticktimer);
					mc.thePlayer.motionZ = (Math.cos(direction) * boostvalue1) * Math.pow(boostvalue2, ticktimer)
				} else if (!mc.thePlayer.onGround && shouldmodifyYMotion) {
					shouldmodifyYMotion = false
				}
				ticktimer++
			}
		}
		if ((!keepBoostOnGround.get() ? mc.thePlayer.onGround && canJump && (!jump.get() ? ticktimer > 1 : true) : (mc.thePlayer.movementInput.moveStrafe == 0) && (mc.thePlayer.movementInput.moveForward == 0) && mc.thePlayer.onGround && (ticktimer > 1)) || Math.pow(boostvalue2, ticktimer) < 0.16 || canBoostOnGround1 && !mc.thePlayer.onGround || mc.thePlayer.isCollidedHorizontally) {
			if (!mc.thePlayer.onGround && canBoostOnGround1) {
				mc.thePlayer.motionX *= (mc.thePlayer.motionY > 0) ? 0.78 : 0.66;
				mc.thePlayer.motionZ *= (mc.thePlayer.motionY > 0) ? 0.78 : 0.66
			}
			canBoostOnGround1 = false;
			canJump = false;
			shouldmodifyYMotion = false;
			ticktimer = 0;
			cankeepBoostOnGround = false
		}
	}
}
var aacboost = new AACBoost();
var aacboostClient;

function onEnable() {
	aacboostClient = moduleManager.registerModule(aacboost)
}

function onDisable() {
	moduleManager.unregisterModule(aacboost)
}