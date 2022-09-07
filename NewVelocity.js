var scriptName = "NewVelocity"
var scriptVersion = 1.0;
var scriptAuthor = "Yurnu"
var AACVelocity = new AACVelocity();
var AACVelocityClient;
var S06PacketUpdateHealth = Java.type('net.minecraft.network.play.server.S06PacketUpdateHealth');
var S12PacketEntityVelocity = Java.type('net.minecraft.network.play.server.S12PacketEntityVelocity');
var S27PacketExplosion = Java.type('net.minecraft.network.play.server.S27PacketExplosion');
var MathHelper = Java.type("net.minecraft.util.MathHelper");
var MSTimer = Java.type("net.ccbluex.liquidbounce.utils.timer.MSTimer");
var C06PlayerPacket = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook');
var C06PlayerPacket = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook');
var C04PacketPlayerPosition = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition')
var C05PacketPlayerLook = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook');
var C03PacketPlayer = Java.type('net.minecraft.network.play.client.C03PacketPlayer');
var S08PacketPlayerPosLook = Java.type("net.minecraft.network.play.server.S08PacketPlayerPosLook");
var timer = new MSTimer();
var hurt = false;
function AACVelocity() {
	var Mode = value.createList("Mode", ["AAC4","Custom","Jump","AAC5"], "AAC5"); 
	var CustomPushXZ = value.createInteger("CustomPushXZ", 50, 1, 100);
	var TimePassed = value.createInteger("TimePassed", 80, 1, 100);

    this.getName = function() {
        return "CookieVelocity"
    }

    this.getTag = function() {
        return Mode.get()
    }

    this.getDescription = function() {
        return ":/"
    }

    this.getCategory = function() {
        return "Combat"
    }

    this.onEnable = function() {}

    this.onUpdate = function() {
        if(Mode.get() == "AAC5") {
			if (mc.thePlayer.onGround) {
				if (mc.thePlayer.hurtTime > 0 && mc.thePlayer.hurtTime <= 6) {
					mc.thePlayer.motionX *= 0.600151164;
					mc.thePlayer.motionZ *= 0.600151164;
				}
				if (mc.thePlayer.hurtTime > 0 && mc.thePlayer.hurtTime <= 4) {
					mc.thePlayer.motionX *= 0.800151164;
					mc.thePlayer.motionZ *= 0.800151164;
				}
			} else {
				if (mc.thePlayer.hurtTime > 0 && mc.thePlayer.hurtTime <= 9) {
					mc.thePlayer.motionX *= 0.8001421204;
					mc.thePlayer.motionZ *= 0.8001421204;
				}
			}
		}
		if(Mode.get() == "AAC4"){
			if (!mc.thePlayer.onGround) {
				if (mc.thePlayer.hurtTime != 0){
					if (hurt) {
						mc.thePlayer.motionX *= 0.6;
						mc.thePlayer.motionZ *= 0.6;
					}
				}
			}else{
				if (timer.hasTimePassed(80)) {
					hurt = false;
				}
			}
		}
				if(Mode.get() == "Custom"){
			if (mc.thePlayer.onGround) {
				if (mc.thePlayer.hurtTime <= 8){
					if (hurt) {
						mc.thePlayer.motionX *= CustomPushXZ.get();
						mc.thePlayer.motionZ *= CustomPushXZ.get();
					}
				}
			}
			}
		
						if(Mode.get() == "LowJump"){
			var f = mc.thePlayer.rotationYaw * 0.017453292
			if (mc.thePlayer.onGround) {
				if (mc.thePlayer.hurtTime > 0){
				mc.thePlayer.motionY = 0.3;
					if (hurt) {
						mc.thePlayer.motionX -= Math.sin(f) * 0.2;
						mc.thePlayer.motionZ += Math.cos(f) * 0.2;
					}
				}
			}else{
				if (timer.hasTimePassed(TimePassed.get())) {
					hurt = false;
				}
			}
		}
	}
	this.onPacket = function(event) {
		var packet = event.getPacket();
		if(Mode.get() == "AAC4"){
			if (packet instanceof S12PacketEntityVelocity) {
				if (mc.thePlayer == null){
					return;
				}
				timer.reset();
				hurt = true;
			}
			if (packet instanceof S06PacketUpdateHealth) {
				event.cancelEvent();
			}
			if (packet instanceof S27PacketExplosion) {
				event.cancelEvent();
			}
		}
	}
	
	this.addValues = function(values) {
        values.add(Mode);
		values.add(CustomPushXZ);
		values.add(TimePassed);
    }
}
function onEnable() {
    AACVelocityClient = moduleManager.registerModule(AACVelocity);
}

function onDisable() {
    moduleManager.unregisterModule(AACVelocityClient);
}
Math.radians = function(degrees) {
	return degrees * Math.PI / 180;
};