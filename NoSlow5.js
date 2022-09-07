var scriptName = "NoSlow5";
var scriptVersion = 1.0;
var scriptAuthor = "mumy++";

var NoSlow5 = new NoSlow5();
var client;

var NoSlow = moduleManager.getModule("NoSlow");
var fly = moduleManager.getModule("Fly");
var KillAuraModule = moduleManager.getModule("KillAura");
var KillAuraClass = Java.type("net.ccbluex.liquidbounce.LiquidBounce").moduleManager.getModule(Java.type("net.ccbluex.liquidbounce.features.module.modules.combat.KillAura").class);
var KillAura = Java.type('net.ccbluex.liquidbounce.features.module.modules.combat.KillAura');

var EnumFacing = Java.type('net.minecraft.util.EnumFacing');
var BlockPos = Java.type('net.minecraft.util.BlockPos');
var EventState = Java.type('net.ccbluex.liquidbounce.event.EventState');

var C02PacketUseEntity = Java.type('net.minecraft.network.play.client.C02PacketUseEntity');
var C0APacketAnimation = Java.type('net.minecraft.network.play.client.C0APacketAnimation');
var C09PacketHeldItemChange = Java.type('net.minecraft.network.play.client.C09PacketHeldItemChange');
var C08PacketPlayerBlockPlacement = Java.type('net.minecraft.network.play.client.C08PacketPlayerBlockPlacement');
var C07PacketPlayerDigging = Java.type('net.minecraft.network.play.client.C07PacketPlayerDigging');
var C06PlayerPacketPosLook = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook');
var C04PacketPlayerPosition = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition');
var C05PacketPlayerLook = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook');
var C03PacketPlayer = Java.type('net.minecraft.network.play.client.C03PacketPlayer');
var S08PacketPlayerPosLook = Java.type('net.minecraft.network.play.server.S08PacketPlayerPosLook');
var S02PacketChat = Java.type('net.minecraft.network.play.server.S02PacketChat');

var RandomUtils = Java.type('net.ccbluex.liquidbounce.utils.misc.RandomUtils');
var MovementUtils = Java.type('net.ccbluex.liquidbounce.utils.MovementUtils');


var ItemSword = Java.type('net.minecraft.item.ItemSword');
var ItemBow = Java.type('net.minecraft.item.ItemBow');
var ItemFood = Java.type('net.minecraft.item.ItemFood');
var ItemPotion = Java.type('net.minecraft.item.ItemPotion');
var ItemBucketMilk = Java.type('net.minecraft.item.ItemBucketMilk');

function NoSlow5() {
	
	var State = [0, 0];
	
	var ModuleString = '§8[§9' + 'NoSlow5' + '§8] §3';
	
	var
	Air = value.createBoolean("Air", false),
	AAC = value.createBoolean("AAC", false),
	Liquid = value.createBoolean("Liquid", false),
    BowStrafe = value.createFloat("BowStrafe", 1, 0, 1),
    BowForward = value.createFloat("BowForward", 1, 0, 1),
	OnlePacket = value.createBoolean("OnlePacket", false),
    BlockStrafe = value.createFloat("BlockStrafe", 1, 0, 1),
	BlockForward = value.createFloat("BlockForward", 1, 0, 1),
    ConsumeStrafe = value.createFloat("ConsumeStrafe", 1, 0, 1),
    ConsumeForward = value.createFloat("ConsumeForward", 1, 0, 1),
	DeBug = value.createList("DeBug", ["Off", "Onle", "Normal"], ""),
	Packet = value.createList("Packet", ["Test", "Virtual", "Normal", "Interval"], ""),
	Values = [DeBug, Packet, BowStrafe, BlockStrafe, BowForward, BlockForward, ConsumeStrafe, ConsumeForward, Air, AAC, Liquid, OnlePacket];
	
    this.getName = function() {
        return "NoSlow5";
    };

    this.getDescription = function() {
        return "TestNoSlow5,By-mumy.";
    };

    this.getCategory = function() {
        return "Misc";
    };

   /*this.getTag = function() {
        return "";
    };*/

    this.onEnable = function() {
		State = [0, 0];
    }
	
	function None() {
		
	}

    this.onAttack = function(event) {
        //target = event.getTargetEntity();
    }
	
	this.onWorld = function(event) {
		State = [0, 0];
	}

    this.onUpdate = function() {
		if (CanSend() && Packet.get() == 'Test') {
			Blocking(false);
		}
    }
	
	this.onMotion = function(event) {
		var State = event.getEventState();
		if (CanSend() && !(Packet.get() == 'Test' && State == EventState.PRE)) {
			Blocking(State != EventState.PRE && (Match(Packet.get(), ['Test', 'Normal']) || Packet.get() == 'Interval' && mc.thePlayer.ticksExisted % 2) ? (State[1] = mc.isSingleplayer() ? 2 : 1, true) : (State[0] = mc.isSingleplayer() ? 2 : 1, false));
		}
	}
	
	this.onSlowDown = function(event) {
		if (!(mc.thePlayer.isUsingItem() || mc.thePlayer.getHeldItem()) || OnlePacket.get() || !CanNoSlow()) {
			return;
		}
		var item = mc.thePlayer.getHeldItem().getItem();
		event.forward = !(item instanceof ItemBow) ? item instanceof ItemSword ? BlockForward.get() : ConsumeForward.get() : BowForward.get();
        event.strafe = !(item instanceof ItemBow) ? item instanceof ItemSword ? BlockStrafe.get() : ConsumeStrafe.get() : BowStrafe.get();
	}
	
	this.onPacket = function(event) {
        var packet = event.getPacket();
		if (packet instanceof C07PacketPlayerDigging && CanDeBug()) {
			chat.print(ModuleString + (State[0] ? (State[0]--, '[C07*].') : '[C07].'));
		} if (packet instanceof C08PacketPlayerBlockPlacement && CanDeBug()) {
			chat.print(ModuleString + (State[1] ? (State[1]--, '[C08*].') : '[C08].'));
		} if (packet instanceof C09PacketHeldItemChange && CanDeBug()) {
			chat.print(ModuleString + '[C09].');
		}
	}
	
	function Blocking(State) {
		SendPacket(State ? new C08PacketPlayerBlockPlacement(new BlockPos(-1, -1, -1), 255, mc.thePlayer.inventory.getCurrentItem(), 0, 0, 0) : new C07PacketPlayerDigging(C07PacketPlayerDigging.Action.RELEASE_USE_ITEM, new BlockPos(-0.531415, -0.531415, -0.531415), EnumFacing.DOWN));
	}
	
	function Match(Text, Texts) {
		if (!Text || typeof Texts != 'object') {
			return false;
		} for (var i in Texts) {
			if (Text.indexOf(Texts[i]) + 1) {
				return true;
			}
		}
		return false;
	}
	
	function SendPacket(packet) {
		mc.getNetHandler().addToSendQueue(packet);
	}
	
	function CanNoSlow() {
		return mc.thePlayer.isBlocking() && !(AAC.get() && mc.thePlayer.ticksExisted % 2 || !(MovementUtils.isMoving() || MovementUtils.getSpeed()) || !Liquid.get() && (mc.thePlayer.isInWater() || mc.thePlayer.isInLava()) || !(Air.get() || mc.thePlayer.onGround));
	}
	
	function CanSend() {
		return CanNoSlow() && Packet.get() && Packet.get() != 'Off' && DeBug.get() != 'Onle';
	}
	
	function CanDeBug() {
		return DeBug.get() && DeBug.get() != 'Off';
	}

    this.addValues = function(values) {
		for (var v in Values) {
			values.add(Values[v]);
		}
    }
	
    this.onDisable = function() {
		this.onEnable();
    }
	
}

function onLoad() {}

function onEnable() {
    client = moduleManager.registerModule(NoSlow5);
}

function onDisable() {
    moduleManager.unregisterModule(client);
}