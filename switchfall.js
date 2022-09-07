var scriptName = "CleanNoFall";
var scriptVersion = 2.2;
var scriptAuthor = "yorik100";
var C03PacketPlayer = Java.type('net.minecraft.network.play.client.C03PacketPlayer');
var C04PacketPlayerPosition = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition')
var C05PacketPlayerLook = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook');
var C06PacketPlayerPosLook = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook');
var S08PacketPlayerPosLook = Java.type("net.minecraft.network.play.server.S08PacketPlayerPosLook");
var blinkModule = moduleManager.getModule("Blink");
var AxisAlignedBB = Java.type("net.minecraft.util.AxisAlignedBB");
var cleanNoFall = new CleanNoFall();
var client;

function inVoid() {
    if (mc.thePlayer.posY < -1.8) {
        return true;
    } else {
        return mc.theWorld.getCollidingBoundingBoxes(mc.thePlayer, mc.thePlayer.getEntityBoundingBox().offset(0, -(mc.thePlayer.posY / 2), 0).expand(0, (mc.thePlayer.posY / 2), 0)).isEmpty();
    }
}

function CleanNoFall() {
    var Mode = value.createList("Mode", ["Packet", "Verus", "AACFlag", "FlagGround", "AACPacket"], "Packet");
    var NoVoidSpoof = value.createBoolean("NoVoidSpoof", false);
    var MinFallenBlocksToSpoof = value.createInteger("MinFallenBlocksToSpoof", 16, 0, 30);
    this.getName = function() {
        return "SwitchNoFall";
    };
    this.getDescription = function() {
        return "NoFall";
    };
    this.getCategory = function() {
        return "Player";
    };
    this.addValues = function(values) {
        values.add(NoVoidSpoof);
        values.add(MinFallenBlocksToSpoof);
        values.add(Mode);
    };
    this.getTag = function() {
        return Mode.get();
    }
    var posY = 0;
    var pulse = false;
    var pos = 0;
    var packets = [];
    this.onEnable = function() {
        posY = mc.thePlayer.posY;
        this.mario = 0;
        this.happened = false;
        this.isFalling = false;
        var packets = [];
    };
    this.onDisable = function() {
        if (packets.length > 0) {
            this.isFalling = false;
            for (var i = 0; i < packets.length; i++) {
                var packet = packets[i];
                mc.thePlayer.sendQueue.addToSendQueue(packet);
            }
            packets = [];
        }
    };
    this.onUpdate = function() {
        if (mc.thePlayer.onGround) {
            this.mario = 0;
        }
        if (Mode.get() == "AACPacket" && mc.thePlayer.motionY > -0.18 && (!inVoid() || !NoVoidSpoof.get() || mc.thePlayer.fallDistance <= MinFallenBlocksToSpoof.get()) && mc.theWorld.getCollidingBoundingBoxes(mc.thePlayer, mc.thePlayer.getEntityBoundingBox().offset((mc.thePlayer.motionX * 2), -1.5, (mc.thePlayer.motionZ * 2)).expand(0, 0, 0)).isEmpty() && !(mc.thePlayer.motionY >= 0 || mc.thePlayer.isInWater() || mc.thePlayer.isInLava() || mc.thePlayer.isOnLadder() || mc.thePlayer.isInWeb || mc.thePlayer.ridingEntity != null) && !this.isFalling) {
            this.isFalling = true;
        }
        if (mc.thePlayer.isInWater() || mc.thePlayer.isInLava() || mc.thePlayer.isOnLadder() || mc.thePlayer.isInWeb || mc.thePlayer.ridingEntity != null) {
            this.mario = mc.thePlayer.fallDistance - 0.2;
        }
        if ((Mode.get() == "AACPacket" || packets.length > 0) && (mc.thePlayer.onGround || !mc.theWorld.getCollidingBoundingBoxes(mc.thePlayer, mc.thePlayer.getEntityBoundingBox().offset(0, (mc.thePlayer.motionY - 0.08) * 0.98, 0).expand(0, 0, 0)).isEmpty() || (inVoid() && NoVoidSpoof.get() && mc.thePlayer.fallDistance <= MinFallenBlocksToSpoof.get()) || (mc.thePlayer.isInWater() || mc.thePlayer.isInLava() || mc.thePlayer.isOnLadder() || mc.thePlayer.isInWeb || mc.thePlayer.ridingEntity != null) || packets.length >= 29)) {
            if (this.isFalling) {
                this.isFalling = false;
                if (packets.length > 0) {
                    for (var i = 0; i < packets.length; i++) {
                        var packet = packets[i];
                        mc.thePlayer.sendQueue.addToSendQueue(packet);
                    }
                    packets = [];
                }
            }
        }
    }
    this.onPacket = function(event) {
        var packet = event.getPacket();
        if (mc.theWorld != null && mc.thePlayer != null) {
            if (packet instanceof S08PacketPlayerPosLook) {
                this.mario = mc.thePlayer.fallDistance - 0.2;
				this.isFalling = false;
                if (packets.length > 0) {
                    for (var i = 0; i < packets.length; i++) {
                        var packet = packets[i];
                        mc.thePlayer.sendQueue.addToSendQueue(packet);
                    }
                    packets = [];
                }
            }
            if (!inVoid() || !NoVoidSpoof.get() || mc.thePlayer.fallDistance <= MinFallenBlocksToSpoof.get()) {
                switch (Mode.get()) {
                    case "Packet":
                        if (packet instanceof C04PacketPlayerPosition || packet instanceof C06PacketPlayerPosLook) {
                            if ((posY - packet.y > 2.7) && !mc.thePlayer.onGround) {
                                packet.onGround = true;
                            }
                            if (posY != packet.y) {
                                posY = packet.y;
                            }
                        }
                        if (packet instanceof C03PacketPlayer && (mc.thePlayer.fallDistance >= (this.mario + 3.2))) {
                            this.mario = mc.thePlayer.fallDistance - 0.2;
                            packet.onGround = true;
                        }
                        break;
                    case "AACPacket":
                        if (packet instanceof C03PacketPlayer && this.isFalling) {
                            packet.onGround = true;
                        }
                        if (packet instanceof C03PacketPlayer && this.isFalling && !event.isCancelled()) {
                            event.cancelEvent();
                            packets.push(packet);
                        }
                        break;
                    case "Verus":
                        if (packet instanceof C03PacketPlayer && (mc.thePlayer.fallDistance >= (this.mario + 3.2))) {
                            this.mario = mc.thePlayer.fallDistance - 0.2;
                            packet.onGround = true;
                            mc.thePlayer.motionY = 0;
                        }
                        break;
                    case "AACFlag":
                        if (packet instanceof C03PacketPlayer && (mc.thePlayer.fallDistance >= (this.mario + 2.6))) {
                            this.mario = mc.thePlayer.fallDistance - 0.3;
                            packet.onGround = true;
                            mc.thePlayer.motionY = 0;
                        }
                        break;
                    case "FlagGround":
                        if (packet instanceof C03PacketPlayer && (mc.thePlayer.fallDistance >= (this.mario + 3.2)) && !mc.theWorld.getCollidingBoundingBoxes(mc.thePlayer, mc.thePlayer.getEntityBoundingBox().offset(0, ((mc.thePlayer.motionY - 0.08) * 0.98) - 1, 0).expand(0, 0, 0)).isEmpty() && !this.happened) {
                            packet.y -= 11;
                            this.happened = true;
                        } else if (packet instanceof C03PacketPlayer) {
                            this.happened = false;
                        }
                        break;
                }
            }
        }
    }
}

function onLoad() {}

function onEnable() {
    client = moduleManager.registerModule(cleanNoFall);
}

function onDisable() {
    moduleManager.unregisterModule(client);
}