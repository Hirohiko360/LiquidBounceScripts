var scriptName = "Nofall (Criticals compatible)";
var scriptAuthor = "Soulplexis";
var scriptVersion = 1.1;

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

function Derp() {
	var Mode = value.createList("Mode", ["Normal", "Mineplex", "Packet", "NoGround", "ACP"], "Normal");
    this.getName = function() {
        return "SoulNoFall";
    }
    this.getCategory = function() {
        return "Player";   
    }
var tick = 0;
    this.getDescription = function() {
        return "Damns yourself.";
    }
	this.onEnable = function() {
	}
	this.onMotion = function() {	
	}
	this.onDisable = function() {
	}
	this.onPacket = function(event) {
		var packet = event.getPacket();
		switch(Mode.get()) {
		case "Normal":
		if(mc.thePlayer.fallDistance > 2 && packet instanceof C03PacketPlayer) {
			packet.onGround = true;
		}
		break;
		case "Mineplex":
		if(packet instanceof C03PacketPlayer && mc.thePlayer.onGround == false) {
			packet.onGround = true;
		}
		break;
		case "Packet":
		if(packet instanceof C03PacketPlayer && mc.thePlayer.onGround == false) {
			ticks++;
			if(ticks == 1) {
			packet.onGround = false;
			}
            if(ticks >=2) {			
			packet.onGround = true;
			ticks = 0;
			}
		}
		break;
		case "NoGround":
		if(packet instanceof C03PacketPlayer) {
		packet.onGround = false;
		}
		break;
		case "ACP":
		if(mc.thePlayer.fallDistance > 2 && packet instanceof C03PacketPlayer) {
			packet.onGround = true;
			mc.thePlayer.motionX = 0;
			mc.thePlayer.motionZ = 0;
		}
		break;
		}
		
	}
	this.addValues = function(soul) {
		soul.add(Mode);
	}
		this.getTag = function() {
    return Mode.get()
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