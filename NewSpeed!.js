/// api_version=2
var script = registerScript({
    name: "Hirohiko",
    version: "1.1",
    authors: ["yby360"]
});
var MovementUtils = Java.type('net.ccbluex.liquidbounce.utils.MovementUtils');
var RandomUtils=Java.type('net.ccbluex.liquidbounce.utils.misc.RandomUtils');
var S12PacketEntityVelocity = Java.type('net.minecraft.network.play.server.S12PacketEntityVelocity');
script.registerModule({
    name: "NewSpeed!",
    description: "yby360",
    category: "Scripts",
    settings: {
	}
}, function (module) {
	module.on("enable", function () {
		
	});
	module.on("update", function () {
		if(mc.thePlayer.onGround) mc.timer.timerSpeed =1.0;
		if(mc.thePlayer.onGround && MovementUtils.isMoving()) {
			mc.thePlayer.jump();
			mc.timer.timerSpeed =1.0;
			mc.thePlayer.motionY = 0.419973;
		};
		if(mc.thePlayer.motionY>0 && !mc.thePlayer.onGround) {
			mc.thePlayer.motionY -= 0.0007991;
			mc.thePlayer.jumpMovementFactor=0.0201465;
			mc.timer.timerSpeed =1.15;
		}else{
			mc.thePlayer.motionY -= 0.00074775;
			mc.thePlayer.jumpMovementFactor=0.0201519;
			mc.timer.timerSpeed =0.80;
		};
		if(mc.thePlayer.fallDistance>2) mc.timer.timerSpeed =1.0;
		if(!mc.theWorld.getCollidingBoundingBoxes(mc.thePlayer, mc.thePlayer.getEntityBoundingBox().offset(0,0.201,0).expand(0,0,0)).isEmpty()) {
			if(mc.theWorld.getCollidingBoundingBoxes(mc.thePlayer, mc.thePlayer.getEntityBoundingBox().offset(0,0.199,0).expand(0,0,0)).isEmpty()) {
				if(mc.thePlayer.onGround) mc.timer.timerSpeed = 2;
			};
		};
	});
	module.on("disable", function () {
		mc.timer.timerSpeed =1.0;
	});
});