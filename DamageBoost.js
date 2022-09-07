var scriptName = "DamageBoost";
var scriptVersion = 1.0;
var scriptAuthor = "FunkNight + mumy";

var EntityPlayer = Java.type('net.minecraft.entity.player.EntityPlayer');
var MSTimer = Java.type("net.ccbluex.liquidbounce.utils.timer.MSTimer");
var Delay = new MSTimer();
var EntityLivingBase = Java.type('net.minecraft.entity.EntityLivingBase');
var C04PacketPlayerPosition = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition')
var C03PacketPlayer = Java.type('net.minecraft.network.play.client.C03PacketPlayer');
var DamageBoostModule = new DamageBoostModule();
var client;
var NoGroundJumpTicks = 0;
var NoGroundPacketing = 0;

function DamageBoostModule() {
	
	var Pos = [0.01628848483929,0.01628838949490200,0.001]
	var Pos2 = [0.006129381321,0.01300000129312,0.00500000001304,0.00150000001304]
	var Pos3 = [0.01628848483929,0.01628838949490200,0.001]
   	var Pos4 = [0.0165745,0.01687742230,0.0165845241654,0.016874564786]
	var Pos5 = [0.005190001210,0.01619001210,0.01110001210,0.00101]
	var Pos6 = [0.00525100001293,0.0141240401,0.00514100001293,0.01612418249]
	
    var
	Timer = value.createInteger("Timer", 250, 0, 2000),
	Mode = value.createList("Mode", ["Packet", "BHop", "AACPacket", "AACPacket2", "AACPacket3", "HYTPacket", "Render", "AACNoGround", "HypixelPacket"], "Packet");

    this.getName = function() {
        return "DamageBoost";
    };
	
    this.getTag = function() {
        return Mode.get() + '';
    };
	
    this.getDescription = function() {
        return "Criticals";
    };

    this.getCategory = function() {
        return "Combat";
    };
	
	function None() {
		
	}
	
    this.onAttack = function(event) {
		var entity = event.getTargetEntity();
		/*if (entity instanceof EntityLivingBase && !(Timer.get() > 0 && !Delay.hasTimePassed(Timer.get())) && (Mode.get() == 'CriticalsHIT' || mc.thePlayer.onGround && !mc.theWorld.getCollidingBoundingBoxes(mc.thePlayer, mc.thePlayer.getEntityBoundingBox().offset(0, -0.05, 0)).isEmpty()) && (entity.hurtTime == 0 || entity.hurtTime >= 5)) {
			switch (Mode.get()) {
				case "Packet":
					for (var i in Pos) {
						mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + Pos[i], mc.thePlayer.posZ, false));
					}
					break;
				case "BHop":
					mc.thePlayer.jump();
					break;
				case "AACPacket":
					for (var i in Pos2) {
						mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + Pos2[i], mc.thePlayer.posZ, false));
					}
					break;
				case "AACPacket2":
					for (var i in Pos4){
						mc.thePlayer.sendQueue,addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.PosY + Pos4[i], mc.thePlayer.posZ, false))
					}
				case "AACPacket3":
					for (var i in Pos5){
						mc.thePlayer.sendQueue,addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.PosY + Pos5[i], mc.thePlayer.posZ, false))
					}
					break;
				case "HYTPacket":
					for (var i in Pos6){
						mc.thePlayer.sendQueue,addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.PosY + Pos6[i], mc.thePlayer.posZ, false))
					}
					break;
				case "Render":
					mc.thePlayer.onCriticalHit(entity);
					break;
				case "AACNoGround":
					if(NoGroundJumpTicks = 0) {
						mc.thePlayer.jump
						NoGroundJumpTicks++;
					}else{
						if(mc.thePlayer.onGround){
							NoGroundPacketing = 1;
						}else{
							NoGroundPacketing = 0;
						}
					}
					if(NoGroundPacketing = 1){
						var packet = event.getPacket();
						if (packet instanceof C03PacketPlayer) {
						    packet.onGround = false;
						}
					}
					break;
				case "HypixelPacket":
					for (var i in Pos3) {
						mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + Pos3[i], mc.thePlayer.posZ, false));
					}
					break;
			}
			Delay.reset();*/
		if (entity instanceof EntityLivingBase && !(Timer.get() > 0 && !Delay.hasTimePassed(Timer.get())) && (Mode.get() == 'CriticalsHIT' || mc.thePlayer.onGround && !mc.theWorld.getCollidingBoundingBoxes(mc.thePlayer, mc.thePlayer.getEntityBoundingBox().offset(0, -0.05, 0)).isEmpty()) && (entity.hurtTime == 0 || entity.hurtTime >= 4)) {
			switch (Mode.get()) {
				case "Packet":
					for (var i in Pos) {
						mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + Pos[i], mc.thePlayer.posZ, false));
					}
					break;
				case "BHop":
					mc.thePlayer.jump();
					break;
				case "AACPacket":
					for (var i in Pos2) {
						mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + Pos2[i], mc.thePlayer.posZ, false));
					}
					break;
				case "AACPacket2":
					for (var i in Pos4){
						mc.thePlayer.sendQueue,addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.PosY + Pos4[i], mc.thePlayer.posZ, false))
					}
				case "AACPacket3":
					for (var i in Pos5){
						mc.thePlayer.sendQueue,addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.PosY + Pos5[i], mc.thePlayer.posZ, false))
					}
					break;
				case "HYTPacket":
					for (var i in Pos6){
						mc.thePlayer.sendQueue,addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.PosY + Pos6[i], mc.thePlayer.posZ, false))
					}
					break;
				case "Render":
					mc.thePlayer.onCriticalHit(entity);
					break;
				case "AACNoGround":
					if(NoGroundJumpTicks = 0) {
						mc.thePlayer.jump
						NoGroundJumpTicks++;
					}else{
						if(mc.thePlayer.onGround){
							NoGroundPacketing = 1;
						}else{
							NoGroundPacketing = 0;
						}
					}
					if(NoGroundPacketing = 1){
						var packet = event.getPacket();
						if (packet instanceof C03PacketPlayer) {
						    packet.onGround = false;
						}
					}
					break;
				case "HypixelPacket":
					for (var i in Pos3) {
						mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + Pos3[i], mc.thePlayer.posZ, false));
					}
					break;
			}
			Delay.reset();
		}
    }
	
    this.addValues = function(values) {
        values.add(Mode);
        values.add(Timer);
    }
}

function onLoad() {
	
}

function onEnable() {
    client = moduleManager.registerModule(DamageBoostModule);
}

function onDisable() {
    moduleManager.unregisterModule(client);
}