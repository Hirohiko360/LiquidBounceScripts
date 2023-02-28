var scriptName = "TestDisabler";
var scriptVersion = 1.0;
var scriptAuthor = "yby360";
// i m best skid xddd

var C17PacketCustomPayload = Java.type("net.minecraft.network.play.client.C17PacketCustomPayload");
var C05PacketPlayerLook = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook");
var C06PacketPlayerPosLook = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook");
var C04PacketPlayerPosition = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition");
var C18PacketSpectate = Java.type ("net.minecraft.network.play.client.C18PacketSpectate");
var C00Handshake = Java.type ("net.minecraft.network.handshake.client.C00Handshake");
var S08PacketPlayerPosLook = Java.type ("net.minecraft.network.play.server.S08PacketPlayerPosLook");
var C03PacketPlayer = Java.type ("net.minecraft.network.play.client.C03PacketPlayer");
var PacketBuffer = Java.type ("net.minecraft.network.PacketBuffer");

var C09PacketHeldItemChange = Java.type("net.minecraft.network.play.client.C09PacketHeldItemChange");
var C0APacketAnimation = Java.type("net.minecraft.network.play.client.C0APacketAnimation");
var C0BPacketEntityAction = Java.type("net.minecraft.network.play.client.C0BPacketEntityAction");
var S12PacketEntityVelocity = Java.type('net.minecraft.network.play.server.S12PacketEntityVelocity');
var S03 = Java.type("net.minecraft.network.play.server.S03PacketTimeUpdate");
var C02PacketUseEntity = Java.type('net.minecraft.network.play.client.C02PacketUseEntity');
var C03PacketPlayer = Java.type('net.minecraft.network.play.client.C03PacketPlayer');
var C04PacketPlayerPosition = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition');
var C05PacketPlayerLook = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook');
var C06PacketPlayerPosLook = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook');
var C07PacketPlayerDigging = Java.type('net.minecraft.network.play.client.C07PacketPlayerDigging');
var C08PacketPlayerBlockPlacement = Java.type('net.minecraft.network.play.client.C08PacketPlayerBlockPlacement');
var S02PacketChat = Java.type('net.minecraft.network.play.server.S02PacketChat');
var C00PacketKeepAlive = Java.type("net.minecraft.network.play.client.C00PacketKeepAlive");
var C15PacketClientSettings = Java.type("net.minecraft.network.play.client.C15PacketClientSettings");

var S14RelMove = Java.type("net.minecraft.network.play.server.S14PacketEntity");
var S18EntityTeleport = Java.type("net.minecraft.network.play.server.S18PacketEntityTeleport");
var S19EntityStatus = Java.type("net.minecraft.network.play.server.S19PacketEntityStatus");
var S32ConfirmTransaction = Java.type("net.minecraft.network.play.server.S32PacketConfirmTransaction");

var lastMotionX = 0.0;
var lastMotionY = 0.0;
var lastMotionZ = 0.0;
var pendingFlagApplyPacket = false;

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
var S02PacketChat = Java.type('net.minecraft.network.play.server.S02PacketChat');

var C0CPacketInput = Java.type('net.minecraft.network.play.client.C0CPacketInput');
var C13PacketPlayerAbilities = Java.type('net.minecraft.network.play.client.C13PacketPlayerAbilities');
var C0FPacketConfirmTransaction = Java.type('net.minecraft.network.play.client.C0FPacketConfirmTransaction');
var C00PacketKeepAlive = Java.type('net.minecraft.network.play.client.C00PacketKeepAlive');

var MSTimer = Java.type("net.ccbluex.liquidbounce.utils.timer.MSTimer");
var Timer = new MSTimer();
var PlayerCapabilities = Java.type('net.minecraft.entity.player.PlayerCapabilities');

var RandomUtils = Java.type('net.ccbluex.liquidbounce.utils.misc.RandomUtils');

var KeepAlives = new (Java.type("java.util.ArrayList"))();
var Transactions = new (Java.type("java.util.ArrayList"))();
var currentTrans = 0;

var reset = function() {
    currentTrans = 0;
    KeepAlives.clear();
    Transactions.clear();
}

function add2() {
	var i = 0;
	var KeepAliveKey = null;
	
	var setting = {
		float: function (name, def, min, max) {
			return value.createFloat(name, def, min, max);
		},
		integer: function (name, def, min, max) {
			return value.createInteger(name, def, min, max);
		},
		boolean: function (name, def) {
			return value.createBoolean(name, def);
		},
		list: function (name, values, def) {
			return value.createList(name, values, def);
		}
	};

	var settings = {
		PacketCustomPayload: setting.boolean("PacketCustomPayload", false),
		PacketPlayerLook: setting.boolean("PacketPlayerLook", false),
		PacketPlayerPosLook: setting.boolean("PacketPlayerPosLook", false),
		PacketPlayerPosition: setting.boolean("PacketPlayerPosition", false),
		PacketSpectate: setting.boolean("PacketSpectate", false),
		Handshake: setting.boolean("Handshake", false),
		S08PacketPlayerPosLook: setting.boolean("S08PacketPlayerPosLook", false),
		C03PacketPlayer: setting.boolean("C03PacketPlayer", false),
		PacketBuffer: setting.boolean("PacketBuffer", false),
		mode: setting.list("Mode", ["Off", "Matrix", "CustomDisabler", "Faithful", "Ghostly", "WatchDog", "Lunar", "Kauri", "OnlyMC", "HazelMC", "Verus Combat", "Old Verus", "Old Ghostly", "Old Matrix", "Riding", "Spectate", "Basic", "NoPayload", "Offset", "C03 Cancel", "C06 Only", "NullPlace"], "Off"),
		AbilitiesPacketDelay: setting.integer("AbilitiesPacketDelay", 2, 0, 20),
        PlayerAbilities: setting.boolean("PlayerAbilities", false),
		 };
    this.getName = function() {
        return "TestDisabler";
    };
	
    this.getDescription = function() {
        return "TestDisabler";
    };
	
    this.getCategory = function() {
        return "Fun";
	};
		
		this.onPacket = function(event) {
				var packet = event.packet;
		switch (settings.mode.get()) {
			case "Off":
			break;
			case "Matrix":
		if (packet instanceof C06PacketPlayerPosLook && pendingFlagApplyPacket) {
			pendingFlagApplyPacket = false;
			mc.thePlayer.motionX = lastMotionX;
			mc.thePlayer.motionY = lastMotionY;
			mc.thePlayer.motionZ = lastMotionZ;
		} else if (packet instanceof S08PacketPlayerPosLook) {
			pendingFlagApplyPacket = true
			lastMotionX = mc.thePlayer.motionX;
			lastMotionY = mc.thePlayer.motionY;
			lastMotionZ = mc.thePlayer.motionZ;
		}
			break;
			case "CustomDisabler":
        if ((packet instanceof C17PacketCustomPayload && settings.PacketCustomPayload.get()) || (packet instanceof C03PacketPlayer.C05PacketPlayerLook && settings.PacketPlayerLook.get()) || (packet instanceof C03PacketPlayer.C06PacketPlayerPosLook && settings.PacketPlayerPosLook.get()) || (packet instanceof C03PacketPlayer.C04PacketPlayerPosition && settings.PacketPlayerPosition.get()) || (packet instanceof C18PacketSpectate && settings.PacketSpectate.get()) || (packet instanceof C00Handshake && settings.Handshake.get()) || (packet instanceof C03PacketPlayer && settings.C03PacketPlayer.get()) || (packet instanceof settings.S08PacketPlayerPosLook.get()) || (packet instanceof settings.PacketBuffer.get())) {
          event.cancelEvent()
				}
			break;
			case "WatchDog":
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
			if (FaithfulMode() && packet instanceof C03PacketPlayer) {
			if (i <= 2) {
				event.cancelEvent();
				KeepAlivePacket2();
			}
		}
			break;
		            case "Kauri":
                if(packet instanceof C0FPacketConfirmTransaction) {
                    event.cancelEvent();
                }
                break;
            case "Verus Combat":
                if (packet instanceof C0FPacketConfirmTransaction) {
                    if(currentTrans++>0) event.cancelEvent();
                } else if(packet instanceof C0BPacketEntityAction) {
                    event.cancelEvent();
                } 
                break;
            case "Lunar":
            case "OnlyMC":
                if(packet instanceof C0FPacketConfirmTransaction) {
                    Transactions.add(packet);
                    event.cancelEvent();
                }
                if(packet instanceof C00PacketKeepAlive) {
                    KeepAlives.add(packet);
                    event.cancelEvent();
                }
                if(packet instanceof C03PacketPlayer) {
                    sendPacket(new C0CPacketInput());
                }
                break;
            case "HazelMC":
                if(packet instanceof C0FPacketConfirmTransaction) {
                    Transactions.add(packet);
                    event.cancelEvent();
                }
                if(packet instanceof C00PacketKeepAlive) {
                    KeepAlives.add(packet);
                    event.cancelEvent();
                }
                if(packet instanceof C03PacketPlayer) {
                    sendPacket(new C0CPacketInput());
                }
                break;
					case "Basic":
				if(packet instanceof C0FPacketConfirmTransaction || packet instanceof C00PacketKeepAlive) {
					event.cancelEvent();
				}
				break;
			case "NoPayload":
				if(packet instanceof C17PacketCustomPayload) {
					event.cancelEvent();
				}
				break;
			case "C06 Only":
				if(packet instanceof C03PacketPlayer) {
					sendPacket(new C06PacketPlayerPosLook(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, mc.thePlayer.rotationYaw, mc.thePlayer.rotationPitch, mc.thePlayer.onGround));
					event.cancelEvent();
				}
				break;
			case "C03 Cancel":
				if(packet instanceof C03PacketPlayer) {
					if(mc.thePlayer.ticksExisted % 3 != 0) {
						event.cancelEvent();
					}
				}
				break;
			case "Offset":
				if(packet instanceof C03PacketPlayer) {
					if(mc.thePlayer.ticksExisted < 20 && mc.thePlayer.ticksExisted % 2 == 0) {
						sendPacket(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY - 21, mc.thePlayer.posZ, true));
					}
				} else if(packet instanceof S08PacketPlayerPosLook) {
					e.getPacket().y += 0.001;
				}
				break;
			case "Spectate":
				if(packet instanceof C03PacketPlayer) {
					sendPacket(new C18PacketSpectate(UUID.randomUUID()));
				}
				break;
			case "Riding":
				if(packet instanceof C03PacketPlayer) {
					sendPacket(new C0CPacketInput(mc.thePlayer.moveStrafing, mc.thePlayer.moveForward, mc.thePlayer.movementInput.jump, mc.thePlayer.movementInput.sneak));
				}
				break;
			case "Old Ghostly":
				if(packet instanceof C03PacketPlayer) {
					sendPacket(new C0CPacketInput());
				} else if(packet instanceof C0FPacketConfirmTransaction || 
				          packet instanceof C00PacketKeepAlive) {
					event.cancelEvent();
				}
				break;
            case "Old Verus":
                if(packet instanceof C0FPacketConfirmTransaction) {
                    Transactions.add(e.getPacket());
                    event.cancelEvent();
                }
                if(packet instanceof C00PacketKeepAlive) {
                    sendPacket(new C00PacketKeepAlive(e.getPacket().getKey() - 1));
                    event.cancelEvent();
                }
                if(packet instanceof C03PacketPlayer) {
                    sendPacket(new C0CPacketInput()); // Disables old verus speed checks.
                }
                break;
			case "Old Matrix":
				if(packet instanceof C03PacketPlayer) {
					if(mc.thePlayer.ticksExisted % 15 == 0) { // Technically only have to send once, but to be sure it exempts you just send once every 15 ticks.
						var b = new (Java.type("java.io.ByteArrayOutputStream"))();
						var out = new (Java.type("java.io.DataOutputStream"))(b);
						out.writeUTF(mc.thePlayer.getGameProfile().getName()); // Username of player to exempt
						var buf = new PacketBuffer(((Java.type("io.netty.buffer.Unpooled")).buffer()));
						buf.writeBytes(b.toByteArray());
						sendPacket(new C17PacketCustomPayload("matrix:geyser", buf));
					}
				}
				break;
					
			}	
		}
	
	this.onEnable = function() {
		KeepAliveKey = null;
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
		
        switch(settings.mode.get()) {
            case "OnlyMC":
            case "Lunar":
                if(mc.thePlayer.ticksExisted % 20 == 0 && Transactions.size() > currentTrans) {
                    sendPacket(Transactions.get[currentTrans++]);
                }
                if(mc.thePlayer.ticksExisted % 20 == 0) {
                    for(var i = 0; i < KeepAlives.size(); i++) {
                        var packet = KeepAlives.get(i);
                        if(packet != null) {
                            sendPacket(packet);
                        }
                    }
                    KeepAlives.clear();
                }
                if(mc.thePlayer.ticksExisted % 5 == 0) {
                    sendPacket(new C06PacketPlayerPosLook(mc.thePlayer.posX, mc.thePlayer.posY + 21, mc.thePlayer.posZ, mc.thePlayer.rotationYaw, mc.thePlayer.rotationPitch, true));
                }
                if(mc.thePlayer.ticksExisted % 30 == 0) {
                    reset();
                }
                break;
            case "HazelMC":
                sendPacket(new C00PacketKeepAlive(0));
                if(Transactions.size() > currentTrans) {
                    sendPacket(Transactions.get[currentTrans++]);
                }
                if(mc.thePlayer.ticksExisted % 100 == 0) {
                    for(var i = 0; i < KeepAlives.size(); i++) {
                        var packet = KeepAlives.get(i);
                        if(packet != null) {
                            sendPacket(packet);
                        }
                    }
                    KeepAlives.clear();
                }
                break;
        }
		
		switch(settings.mode.get()) {
            case "Old Verus":
                if(mc.thePlayer.ticksExisted % 120 == 0 && Transactions.size() > currentTrans) {
                    sendPacket(Transactions.get[currentTrans++]);
                }
                if(mc.thePlayer.ticksExisted % 25 == 0) {
                    sendPacket(new C06PacketPlayerPosLook(mc.thePlayer.posX, mc.thePlayer.posY - 11, mc.thePlayer.posZ, mc.thePlayer.rotationYaw, mc.thePlayer.rotationPitch, true));
                }
                if(mc.thePlayer.ticksExisted % 300 == 0) {
                    reset();
                }
                break;
			case "NullPlace":
				sendPacket(new C08PacketPlayerBlockPlacement(new BlockPos(Double.NaN, Double.NaN, Double.NaN), 1, null, 0, 0, 0));
				break;
        }
	}
	
	this.onDisable = function() {
	}
	
	this.onAttack = function(event) {
        target = event.getTargetEntity();
    }
	
		function FaithfulMode() {
		return settings.mode.get() == "Faithful" && mc.thePlayer != null && mc.thePlayer.getDistance(mc.thePlayer.prevPosX, mc.thePlayer.prevPosY, mc.thePlayer.prevPosZ) > 0.6;
	}
	
	this.onMotion = function(event) {
		if (event.getEventState() == EventState.PRE) {
			if (settings.mode.get() == "Ghostly") {
				mc.getNetHandler().addToSendQueue(new C0CPacketInput());
				mc.getNetHandler().addToSendQueue(new C18PacketSpectate(mc.thePlayer.getUniqueID()));
			}
		} if (settings.AbilitiesPacketDelay.get() < 1) {
			Abilities();
		}
	}
	
		function Abilities() {
		if (settings.mode.get() == "WatchDog" && settings.PlayerAbilities.get() && (fly.getState() || speed.getState() || longjump.getSate())) {
			var PlayerCapabilities_ = new PlayerCapabilities();
			PlayerCapabilities_.isFlying = true;
			PlayerCapabilities_.allowFlying = true;
			PlayerCapabilities_.setFlySpeed(Math.random() * (9.0 - 0.1) + 0.1);
			mc.getNetHandler().addToSendQueue(new C13PacketPlayerAbilities(PlayerCapabilities_));
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
	
	this.addValues = function (values) {
		for (var i in settings) {
		    values.add(settings[i]);
			}
		}
	}
	
var add2 = new add2();
var add2;

function onLoad() {}

function onEnable() {
	add2client = moduleManager.registerModule(add2);

}

function onDisable() {
	moduleManager.unregisterModule(add2);

}