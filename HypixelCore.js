var scriptName = "HypixelCore";
var scriptVersion = 0.9;
var scriptAuthor = "LittleDye and yby360";

var speedModule = moduleManager.getModule("Speed");
var KillAuraClass = Java.type("net.ccbluex.liquidbounce.LiquidBounce").moduleManager.getModule(Java.type("net.ccbluex.liquidbounce.features.module.modules.combat.KillAura").class);
var MovementUtils = Java.type("net.ccbluex.liquidbounce.utils.MovementUtils");
var C09 = Java.type("net.minecraft.network.play.client.C09PacketHeldItemChange");
var C08 = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement");
var C07 = Java.type("net.minecraft.network.play.client.C07PacketPlayerDigging");
var S12 = Java.type("net.minecraft.network.play.server.S12PacketEntityVelocity");
var S27 = Java.type("net.minecraft.network.play.server.S27PacketExplosion");
var BlockPos = Java.type("net.minecraft.util.BlockPos");
var EnumFacing = Java.type("net.minecraft.util.EnumFacing");
var EventState = Java.type('net.ccbluex.liquidbounce.event.EventState');

var EntityArrow = Java.type("net.minecraft.entity.projectile.EntityArrow");
var EntityFireball = Java.type("net.minecraft.entity.projectile.EntityFireball");

function isBlocking() {
    if (mc.thePlayer.isUsingItem()) return true;
    return mc.thePlayer && (mc.thePlayer.isBlocking() || KillAuraClass.blockingStatus);
}

function add() {

//NoSlow
this.getName = function () {
        return "HypixelNoSlow";
    }

    this.getDescription = function () {
        return "bypass";
    }

    this.getCategory = function () {
        return "Fun";
    }
	
this.onSlowDown = function (event) {
        event.forward = 1.0;
        event.strafe = 1.0;
}

this.onMotion = function (event) {
        var heldItem = mc.thePlayer.getHeldItem();
        if (isBlocking() && heldItem) {
            if (event.getEventState() == EventState.PRE) {
                mc.getNetHandler()
                    .addToSendQueue(new C08(mc.thePlayer.inventory.getCurrentItem()));
            } else {
                mc.getNetHandler()
                    .addToSendQueue(new C07(C07.Action.RELEASE_USE_ITEM, new BlockPos(-1, -1, -1), EnumFacing.DOWN));
            }
        }
    }
	
}


//Velocity
function add2() {
	
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

//NoSlow
this.getName = function () {
        return "HypixelVelocity";
    }

    this.getDescription = function () {
        return "bypass";
    }

    this.getCategory = function () {
        return "Fun";
    }

var settings = {
			mode: setting.list("Horizon", ["0%", "Horizon"], "0%"),
        };

	this.onPacket = function (event) {
        if (event.getPacket() instanceof S12) {
            if (event.getPacket().getEntityID() == mc.thePlayer.getEntityId()) {
                switch (settings.mode.get()) {
                    case "0%":
                        event.cancelEvent();
                        break;
                    case "Horizon":
                        event.getPacket()
                            .motionX = 0;
                        event.getPacket()
                            .motionY = (100 * (event.getPacket())
                            .getMotionY() / 100);
                        event.getPacket()
                            .motionZ = 0;
                        break;
                }
            }
        }
		        if (event.getPacket() instanceof S27) {
            event.cancelEvent();
        }
	}
	
	this.addValues = function (values) {
		for (var i in settings) {
		    values.add(settings[i]);
			}
		}		
	
	}
	
function add3() {
var stopTick = 0;

this.getName = function () {
        return "HypixelHurtBhop";
    }

    this.getDescription = function () {
        return "bypass";
    }

    this.getCategory = function () {
        return "Fun";
    }
	
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

    var setting = {
        stopTick: setting.integer("StopTick", 10, 0, 100),
    };
	
        this.onUpdate = function () {
        for (var x in mc.theWorld.loadedEntityList) {
            var entity = mc.theWorld.loadedEntityList[x]
            if (entity != null && entity != mc.thePlayer && !(entity instanceof EntityArrow) && !(entity instanceof EntityFireball) && mc.thePlayer.hurtTime > 0 && entity.getHealth() > 0) {
                speedModule.setState(true)
            } else {
                stopTick++;
            }
        }

        if (stopTick >= settings.stopTick.get()) {
            speedModule.setState(false)
        }
    }
	
this.addValues = function (values) {
		for (var i in settings) {
		    values.add(settings[i]);
			}
		}	
}
	
var add = new add();
var add;

var add2 = new add2();
var add2

var add3 = new add3();
var add3

function onLoad() {}

function onEnable() {
	addclient = moduleManager.registerModule(add);
	add2client = moduleManager.registerModule(add2);
	add3client = moduleManager.registerModule(add3);
}

function onDisable() {
	moduleManager.unregisterModule(add);
	moduleManager.unregisterModule(add2);
	moduleManager.unregisterModule(add3);
};		





