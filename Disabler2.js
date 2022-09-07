var scriptName = "Disabler2";
var scriptVersion = 1.0;
var scriptAuthor = "mumy++";

var Disabler2 = new Disabler2();
var client;

var NoSlowModule = moduleManager.getModule("NoSlow");
var speed = moduleManager.getModule("Speed");
var fly = moduleManager.getModule("Fly");
var longjump = moduleManager.getModule("LongJump");
var killaura = moduleManager.getModule("KillAura");
var KillAuraClass = Java.type("net.ccbluex.liquidbounce.LiquidBounce").moduleManager.getModule(Java.type("net.ccbluex.liquidbounce.features.module.modules.combat.KillAura").class);
var KillAura = Java.type('net.ccbluex.liquidbounce.features.module.modules.combat.KillAura');

var EnumFacing = Java.type('net.minecraft.util.EnumFacing');
var BlockPos = Java.type('net.minecraft.util.BlockPos');
var EventState = Java.type('net.ccbluex.liquidbounce.event.EventState');

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

var C0CPacketInput = Java.type('net.minecraft.network.play.client.C0CPacketInput');
var C18PacketSpectate = Java.type('net.minecraft.network.play.client.C18PacketSpectate');
var C13PacketPlayerAbilities = Java.type('net.minecraft.network.play.client.C13PacketPlayerAbilities');
var C0FPacketConfirmTransaction = Java.type('net.minecraft.network.play.client.C0FPacketConfirmTransaction');
var C00PacketKeepAlive = Java.type('net.minecraft.network.play.client.C00PacketKeepAlive');

var MSTimer = Java.type("net.ccbluex.liquidbounce.utils.timer.MSTimer");
var Timer = new MSTimer();
var PlayerCapabilities = Java.type('net.minecraft.entity.player.PlayerCapabilities');

var RandomUtils = Java.type('net.ccbluex.liquidbounce.utils.misc.RandomUtils');
var MovementUtils = Java.type('net.ccbluex.liquidbounce.utils.MovementUtils');

/*var ItemSword = Java.type('net.minecraft.item.ItemSword');
var ItemBow = Java.type('net.minecraft.item.ItemBow');
var ItemFood = Java.type('net.minecraft.item.ItemFood');
var ItemPotion = Java.type('net.minecraft.item.ItemPotion');
var ItemBucketMilk = Java.type('net.minecraft.item.ItemBucketMilk');*/

function Disabler2() {
	
	var i = 0;
	var KeepAliveKey = null;
	var Mode = value.createList("Mode", ["Faithful", "Ghostly", "WatchDog"], "");
	var AbilitiesPacketDelay = value.createInteger("AbilitiesPacketDelay", 2, 0, 20);
	var PlayerAbilities = value.createBoolean("PlayerAbilities", false);
	
    this.getName = function() {
        return "Disabler2";
    };

    this.getDescription = function() {
        return "Disabler2Module,By-mumy.";
    };

    this.getCategory = function() {
        return "Misc";
    };

   /*this.getTag = function() {
        return "";
    };*/

	function None() {
		
	}
	
    this.onEnable = function() {
		KeepAliveKey = null;
    }

    this.onAttack = function(event) {
        target = event.getTargetEntity();
    }
	
	function FaithfulMode() {
		return Mode.get() == "Faithful" && mc.thePlayer != null && mc.thePlayer.getDistance(mc.thePlayer.prevPosX, mc.thePlayer.prevPosY, mc.thePlayer.prevPosZ) > 0.6;
	}

    this.onUpdate = function() {
		if (FaithfulMode()) {
			if (i > 2) {
				mc.getNetHandler().addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.prevPosX + (mc.thePlayer.posX - mc.thePlayer.prevPosX) / 2, mc.thePlayer.prevPosY + (mc.thePlayer.posY - mc.thePlayer.prevPosY) / 2, mc.thePlayer.prevPosZ + (mc.thePlayer.posZ - mc.thePlayer.prevPosZ) / 2, true));
				i = 0;
			}
			++i;
		} if (mc.thePlayer.ticksExisted % AbilitiesPacketDelay.get() == 0) {
			Abilities();
		}
    }
	
	this.onMove = function(event) {
		
	}
	
	this.onMotion = function(event) {
		if (event.getEventState() == EventState.PRE) {
			if (Mode.get() == "Ghostly") {
				mc.getNetHandler().addToSendQueue(new C0CPacketInput());
				mc.getNetHandler().addToSendQueue(new C18PacketSpectate(mc.thePlayer.getUniqueID()));
			}
		} if (AbilitiesPacketDelay.get() < 1) {
			Abilities();
		}
	}
	
	function Abilities() {
		if (Mode.get() == "WatchDog" && PlayerAbilities.get() && (fly.getState() || speed.getState() || longjump.getSate())) {
			var PlayerCapabilities_ = new PlayerCapabilities();
			PlayerCapabilities_.isFlying = true;
			PlayerCapabilities_.allowFlying = true;
			PlayerCapabilities_.setFlySpeed(Math.random() * (9.0 - 0.1) + 0.1);
			mc.getNetHandler().addToSendQueue(new C13PacketPlayerAbilities(PlayerCapabilities_));
		}
	}
	
	this.onPacket = function(event) {
        var packet = event.getPacket();
		if (Mode.get() == "WatchDog") {
			if (packet instanceof C0FPacketConfirmTransaction) {
				if (packet.getId() != 2147483647) {
					event.cancelEvent();
					ConfirmTransactionPacket(packet);
				}
			} if (packet instanceof C00PacketKeepAlive) {
				if (KeepAliveKey != packet.getKey()) {
					event.cancelEvent();
					KeepAlivePacket();
				}
			}
		} if (FaithfulMode() && packet instanceof C03PacketPlayer) {
			if (i <= 2) {
				event.cancelEvent();
				KeepAlivePacket2();
			}
		}
	}
	
	function KeepAlivePacket() {
		KeepAliveKey = Math.round(1 + Math.random() * (100 - 1)) - 2147483648;
		mc.getNetHandler().addToSendQueue(new C00PacketKeepAlive(KeepAliveKey));
	}
	
	function KeepAlivePacket2() {
		mc.getNetHandler().addToSendQueue(new C00PacketKeepAlive(-2147483648));
	}
	
	function ConfirmTransactionPacket(packet) {
		mc.getNetHandler().addToSendQueue(new C0FPacketConfirmTransaction(2147483647, packet.getUid(), false));
	}
	
	function Exponentiation(getValue, getNumber) {
		var i = 1;
		var Value = getValue;
		while (index < getNumber) {
			Value *= getValue;
			++i;
		}
		return Value;
	}

    this.addValues = function(values) {
		values.add(Mode);
		values.add(AbilitiesPacketDelay);
		values.add(PlayerAbilities);
	}
	
    this.onDisable = function() {
		
    }
	
}

function onLoad() {}

function onEnable() {
    client = moduleManager.registerModule(Disabler2);
}

function onDisable() {
    moduleManager.unregisterModule(client);
}
//chat.print