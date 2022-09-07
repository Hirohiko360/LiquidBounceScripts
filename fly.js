/// api_version=2
var script = registerScript({
	name: "Fly",
	version: "11.4514",
	authors: ["az"]
});

var blink = moduleManager.getModule("Blink");
var MovementUtils = Java.type('net.ccbluex.liquidbounce.utils.MovementUtils');
var C04 = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition');
var C06 = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook');
var C03 = Java.type('net.minecraft.network.play.client.C03PacketPlayer');
var S08 = Java.type('net.minecraft.network.play.server.S08PacketPlayerPosLook');
var C00PacketKeepAlive = Java.type('net.minecraft.network.play.client.C00PacketKeepAlive');

var C07 = Java.type('net.minecraft.network.play.client.C07PacketPlayerDigging');
var C0A = Java.type('net.minecraft.network.play.client.C0APacketAnimation');
var EnumFacing = Java.type('net.minecraft.util.EnumFacing');
var BlockPos = Java.type('net.minecraft.util.BlockPos');

var ticks;
var states;
var preMotionX;
var preMotionZ;
var PlayerCapabilities = Java.type('net.minecraft.entity.player.PlayerCapabilities');
var PacketUtils = Java.type('net.ccbluex.liquidbounce.utils.PacketUtils');
var wasTimer;

var MSTimer = Java.type("net.ccbluex.liquidbounce.utils.timer.MSTimer");
var DelayTimer = new MSTimer();

script.registerModule({
	name: "MatrixHighJump",
	description: "abababab",
	category: "Misc",
	settings: {
		
	}
}, function (module) {
	module.on("update", function () { try{
		if(wasTimer) {
			mc.timer.timerSpeed = 1.00;
			wasTimer=false;
		};
		if((!mc.theWorld.getCollidingBoundingBoxes(mc.thePlayer, mc.thePlayer.getEntityBoundingBox().offset(0,mc.thePlayer.motionY,0).expand(0,0,0)).isEmpty()
			|| !mc.theWorld.getCollidingBoundingBoxes(mc.thePlayer, mc.thePlayer.getEntityBoundingBox().offset(0,-4,0).expand(0,0,0)).isEmpty())
			&& mc.thePlayer.fallDistance>10) {
				if(!mc.thePlayer.onGround) {
					mc.timer.timerSpeed = 0.1;
					wasTimer=true;
				};
		};
		if(DelayTimer.hasTimePassed(1000) && states=="Fly") {
			mc.timer.timerSpeed = 1.0;
			mc.thePlayer.motionX=0;
			mc.thePlayer.motionZ=0;
			states="None";
			return;
		};
		if(states=="Fly" && mc.thePlayer.hurtTime>0) {
			mc.timer.timerSpeed = 1.0;
			mc.thePlayer.motionY= 10.0;
			states="None";
			mc.thePlayer.motionX=0;
			mc.thePlayer.motionZ=0;
			mc.thePlayer.jumpMovementFactor = 0.00;
			return;
		};
		if(states=="Damage") {
			mc.thePlayer.sendQueue.addToSendQueue(new C0A());
			mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false));
			for(var i=0;i<8;i++) {
				mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY+0.3990, mc.thePlayer.posZ, false));
				mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false));
			};
			mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, true));
			mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, true));
			mc.timer.timerSpeed = 0.6;
			states="Fly";
			DelayTimer.reset();
			mc.thePlayer.sendQueue.addToSendQueue(new C07(C07.Action.ABORT_DESTROY_BLOCK, new BlockPos(mc.thePlayer.posX,mc.thePlayer.posY-1,mc.thePlayer.posZ), EnumFacing.UP));
			mc.thePlayer.sendQueue.addToSendQueue(new C0A());
			return;
		};
		if(mc.thePlayer.isCollidedHorizontally && states=="None" && mc.thePlayer.onGround) {
			mc.thePlayer.sendQueue.addToSendQueue(new C07(C07.Action.START_DESTROY_BLOCK, new BlockPos(mc.thePlayer.posX,mc.thePlayer.posY-1,mc.thePlayer.posZ), EnumFacing.UP));
			mc.thePlayer.sendQueue.addToSendQueue(new C0A());
			states="Damage";
			mc.timer.timerSpeed = 0.05;
		};
		if(mc.thePlayer.isCollidedHorizontally && mc.thePlayer.onGround) {
			mc.thePlayer.motionX=0;
			mc.thePlayer.motionZ=0;
			mc.thePlayer.onGround=false;
		};
	}catch(err){
		Chat.print(err);
	};
	});
 
	module.on("packet", function (event) {
	});
	module.on("enable", function () {
		ticks=0;
		wasTimer=false;
		states="None";
	});
	module.on("disable", function () {
		mc.timer.timerSpeed = 1.0;
		ticks=0;
	});
	module.on("world", function () {
	});
	module.on("jump", function () {
		moduleManager.getModule('TestPacket').setState(false);
	});
});