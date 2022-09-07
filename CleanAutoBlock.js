var scriptName = "CleanAutoBlock";
var scriptVersion = 2.0;
var scriptAuthor = "yorik100";
var C07PacketPlayerDigging = Java.type('net.minecraft.network.play.client.C07PacketPlayerDigging');
var C08PacketPlayerBlockPlacement = Java.type('net.minecraft.network.play.client.C08PacketPlayerBlockPlacement')
var C09PacketHeldItemChange = Java.type('net.minecraft.network.play.client.C09PacketHeldItemChange')
var BlockPos = Java.type('net.minecraft.util.BlockPos')
var EnumFacing = Java.type('net.minecraft.util.EnumFacing')
var LiquidBounce = Java.type("net.ccbluex.liquidbounce.LiquidBounce");
var KillAura = Java.type("net.ccbluex.liquidbounce.features.module.modules.combat.KillAura");
var killAuraModule = moduleManager.getModule("KillAura");

var cleanAutoBlock = new CleanAutoBlock();

var client;

function CleanAutoBlock() {
    this.getName = function() {
        return "VanillaAutoBlock";
    };

    this.getDescription = function() {
        return "Vanilla AutoBlock";
    };

    this.getCategory = function() {
        return "Combat";
    };
    this.onPacket = function(event) {
        var packet = event.getPacket();
        if (isBlocking && ((packet instanceof C07PacketPlayerDigging && packet.getStatus() == C07PacketPlayerDigging.Action.RELEASE_USE_ITEM) || packet instanceof C08PacketPlayerBlockPlacement)) {
            event.cancelEvent();
        }
		if (packet instanceof C09PacketHeldItemChange) {
			isBlocking = false;
		}
    }
    this.onEnable = function() {
		isBlocking = false;
    }
    this.onUpdate = function() {
		if ((LiquidBounce.moduleManager.getModule(KillAura.class)).blockingStatus || mc.thePlayer.isBlocking()) {
			isBlocking = true;
		}else if (isBlocking) {
			isBlocking = false;
			mc.thePlayer.sendQueue.addToSendQueue(new C07PacketPlayerDigging(C07PacketPlayerDigging.Action.RELEASE_USE_ITEM, BlockPos.ORIGIN, EnumFacing.DOWN));
		}
    }
    this.onDisable = function() {
		if (isBlocking && !(LiquidBounce.moduleManager.getModule(KillAura.class)).blockingStatus && !mc.thePlayer.isBlocking()) {
		isBlocking = false;
		mc.thePlayer.sendQueue.addToSendQueue(new C07PacketPlayerDigging(C07PacketPlayerDigging.Action.RELEASE_USE_ITEM, BlockPos.ORIGIN, EnumFacing.DOWN));
		}
    }
}

function onLoad() {}

function onEnable() {
    client = moduleManager.registerModule(cleanAutoBlock);
}

function onDisable() {
    moduleManager.unregisterModule(client);
}
