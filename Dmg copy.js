var scriptName = "Damn";
var scriptAuthor = "Damn";
var scriptVersion = 1.0;

function randomIntFrom(min,max) // Get a random integer from [min] to [max] 
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
var C06PlayerPacket = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook');
var C04PacketPlayerPosition = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition')
var C05PacketPlayerLook = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook');
var C03PacketPlayer = Java.type('net.minecraft.network.play.client.C03PacketPlayer');
var S08PacketPlayerPosLook = Java.type("net.minecraft.network.play.server.S08PacketPlayerPosLook");
var packet;
// mc.thePlayer.sendQueue.addToSendQueue(new C06PacketPlayerPosLook(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, mc.thePlayer.rotationYaw, mc.thePlayer.rotationPitch, mc.thePlayer.onGround) );
var Breadcrumbs = moduleManager.getModule("Breadcrumbs");

function Derp() {
	var Mode = value.createList("Damnation", ["NoGroundCriticalsClient", "NoGroundCriticalsPacket"], "NoGroundCriticalsClient");
    this.getName = function() {
        return "DamnMe";
    }
    this.getCategory = function() {
        return "Misc";   
    }

    this.getDescription = function() {
        return "Damns yourself.";
    }
	this.onEnable = function() {
		if(Mode.get() == "NoGroundCriticalsClient" || Mode.get() == "NoGroundCriticalsPacket") {
			mc.thePlayer.motionY = 0.20;
		}
	}
	this.onMotion = function() {
		switch(Mode.get()) {
			case "NoGroundCriticalsClient":
			mc.thePlayer.onGround = false;
			break;
			case "NoGroundCriticalsPacket":
		    //
			break;
		}
		
	}
	this.onDisable = function() {
	}
	this.onPacket = function(event) {
		if(Mode.get() == "NoGroundCriticalsPacket") {
		var packet = event.getPacket();
		if(packet instanceof C03PacketPlayer) {
			packet.onGround = false;
		}
		}
	}
	this.addValues = function(soul) {
		soul.add(Mode);
	}
}

var derp = new Derp();
var derpClient;

function onEnable() {
    derpClient = moduleManager.registerModule(derp);
}

function onDisable() {
    moduleManager.unregisterModule(derpClient);
}