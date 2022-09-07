var scriptName = "PacketFixer";
var scriptVersion = 1.0;
var scriptAuthor = "yorik100";
var C03PacketPlayer = Java.type('net.minecraft.network.play.client.C03PacketPlayer');
var C04PacketPlayerPosition = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition')
var C05PacketPlayerLook = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook');
var C06PacketPlayerPosLook = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook');
var C09PacketHeldItemChange = Java.type('net.minecraft.network.play.client.C09PacketHeldItemChange');
var C00PacketKeepAlive = Java.type("net.minecraft.network.play.client.C00PacketKeepAlive");
var C17PacketCustomPayload = Java.type("net.minecraft.network.play.client.C17PacketCustomPayload");
var C15PacketClientSettings = Java.type("net.minecraft.network.play.client.C15PacketClientSettings");
var blinkModule = moduleManager.getModule("Blink");
var freecamModule = moduleManager.getModule("Freecam");
var freezeModule = moduleManager.getModule("Freeze");
var pingSpoofModule = moduleManager.getModule("PingSpoof");

var PacketFixer = new PacketFixer();

var client;

function PacketFixer() {
    var FixBlinkAndFreecam = value.createBoolean("FixBlinkAndFreecam BadPackets 3Y", true);
    var FixPacketPlayer = value.createBoolean("FixC03s BadPackets 3A", true);
    var FixItemSwap = value.createBoolean("FixItemSwap Scaffold 14D", true);
    var FixPingSpoof = value.createBoolean("FixPingSpoof BadPackets 3Q", true);
    var FixGround = value.createBoolean("FixGround Fly 4I", true);
    var FixIdleFly = value.createBoolean("FixIdleFly Fly 4C", false);
    this.getName = function() {
        return "PacketFixer";
    };

    this.getDescription = function() {
        return "PacketFixer";
    };

    this.getCategory = function() {
        return "Misc";
    };
    this.addValues = function(values) {
        values.add(FixBlinkAndFreecam);
        values.add(FixPacketPlayer);
        values.add(FixItemSwap);
        values.add(FixPingSpoof);
        values.add(FixGround);
        values.add(FixIdleFly);
    }
    this.onEnable = function() {
        this.x = mc.thePlayer.posX;
        this.y = mc.thePlayer.posY;
        this.z = mc.thePlayer.posZ;
        this.jam = 0;
        this.prevSlot = -1;
		this.packetCount = 0;
    }
    this.onUpdate = function() {
		if (FixPingSpoof.get() && pingSpoofModule.getState()) {
			pingSpoofModule.setState(false);
			chat.print("§8[§c§lPacket§aFixer§8] §cDisabled PingSpoof to avoid getting banned for BadPackets 3Q.");
		}
	}
    this.onDisable = function() {}
    this.onPacket = function(event) {
        var packet = event.getPacket();
        if ((mc.theWorld != null && mc.thePlayer != null)) {
            if (FixGround.get() && (packet instanceof C03PacketPlayer && !(packet instanceof C04PacketPlayerPosition) && !(packet instanceof C06PacketPlayerPosLook)) && (mc.thePlayer.motionY == 0 || (mc.thePlayer.onGround && mc.thePlayer.isCollidedVertically)) && !packet.onGround) {
                packet.onGround = true;
                //chat.print("FixGround");
            }
            if (packet instanceof C04PacketPlayerPosition || packet instanceof C06PacketPlayerPosLook) {
                this.x = packet.x;
                this.y = packet.y;
                this.z = packet.z;
                this.jam = 0;
            }
            if (packet instanceof C06PacketPlayerPosLook || packet instanceof C05PacketPlayerLook) {
                this.yaw = packet.yaw;
                this.pitch = packet.pitch;
            }
            if (FixPacketPlayer.get() && packet instanceof C03PacketPlayer && !(packet instanceof C04PacketPlayerPosition) && !(packet instanceof C06PacketPlayerPosLook)) {
                this.jam += 1;
                if (this.jam >= 21) {
                    this.jam = 0;
                    event.cancelEvent();
                    //chat.print("FixPacketPlayer");
                    mc.thePlayer.sendQueue.addToSendQueue(new C06PacketPlayerPosLook(this.x, this.y, this.z, this.yaw, this.pitch, packet.isOnGround()));
                }
            }
            if (FixItemSwap.get() && packet instanceof C09PacketHeldItemChange) {
                if (packet.getSlotId() == this.prevSlot) {
                    event.cancelEvent();
                    //chat.print("FixItemSwap");
                } else {
                    this.prevSlot = packet.getSlotId();
                }
            }
            if (FixIdleFly.get() && !(packet instanceof C04PacketPlayerPosition) && !(packet instanceof C06PacketPlayerPosLook) && packet instanceof C03PacketPlayer && !(packet instanceof C05PacketPlayerLook) && !packet.onGround) {
                this.packetCount += 1;
				if (this.packetCount >= 2){
				event.cancelEvent();
                //chat.print("FixIdleFly");
				}
            } else if (FixIdleFly.get() && packet instanceof C03PacketPlayer) {
				this.packetCount = 0;
			}
            if (FixBlinkAndFreecam.get() && (blinkModule.getState() || freecamModule.getState() || freezeModule.getState()) && packet instanceof C00PacketKeepAlive) {
                event.cancelEvent();
                //chat.print("FixBlinkAndFreecam");
            }
        }
    }
}

function onLoad() {}

function onEnable() {
    client = moduleManager.registerModule(PacketFixer);
}

function onDisable() {
    moduleManager.unregisterModule(client);
}