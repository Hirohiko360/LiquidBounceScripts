var scriptName = "Fake fall (Self-damage) ";
var scriptAuthor = "soulplexis";
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


function Derp() {
	var Mode = value.createList("HurtMode", ["Old", "New", "New2", "Sigma", "Hypixel"], "Old");
	var dmg = value.createInteger("DamageAmount", 1, 1, 20);
	var offset = value.createFloat("YOffset", 0.62, 0.01, 1.0);
    this.getName = function() {
        return "FakeFall";
    }
    this.getCategory = function() {
        return "Misc";   
    }

    this.getDescription = function() {
        return "Fake fall damage.";
    }
	this.onEnable = function() {
		switch(Mode.get()) {
			case "Old":
            for(var i = 0; i < 80 + 20 * (dmg.get() -  1); i++)
            {
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.mc.thePlayer.posX, mc.thePlayer.mc.thePlayer.posY + 0.049, mc.thePlayer.mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.mc.thePlayer.posX, mc.thePlayer.mc.thePlayer.posY, mc.thePlayer.mc.thePlayer.posZ, false));
            }
            mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.mc.thePlayer.posX, mc.thePlayer.mc.thePlayer.posY, mc.thePlayer.mc.thePlayer.posZ, true));
			break;
			case "New":
			 for(var i = 0; i < 70; ++i) {
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.06, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false));
            }
            mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.1, mc.thePlayer.posZ, false));
			break;
			case "New2":
			for(var i = 0; i < 65 * dmg.get(); ++i) {
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.049, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false));
            }

            mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, true));
			break;
			case "Sigma":
			   if (mc.thePlayer.onGround) {
                for (var i = 0; i <= ((3 + dmg.get()) / offset.get()); i++) {
                    mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX,mc.thePlayer.posY + offset.get(), mc.thePlayer.posZ, false));
                    mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX,mc.thePlayer.posY, mc.thePlayer.posZ, (i == ((3 + dmg.get()) / offset.get()))));
                }
            }
			break;
			case "Hypixel":
			   if (mc.thePlayer.onGround) {
                for (var i = 0; i <= ((3 + dmg.get()) / offset.get()); i++) {
                    mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX,mc.thePlayer.posY + offset.get(), mc.thePlayer.posZ, false));
                    mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX,mc.thePlayer.posY, mc.thePlayer.posZ, (i == ((3 + dmg.get()) / offset.get()))));
                }
            }
			if(mc.thePlayer.onGround) {
				mc.thePlayer.motionY = 0.42;
			}
			break;
			default:
			chat.print("hey how the fuck did you change the mode to one that doesn't exist...");
		}
	}
	this.onMotion = function() {
		commandManager.executeCommand(".t fakefall");
	}
	this.onDisable = function() {
	}
	this.onPacket = function(event) {
	}
	this.addValues = function(soul) {
		soul.add(Mode);
		soul.add(dmg);
		soul.add(offset);
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