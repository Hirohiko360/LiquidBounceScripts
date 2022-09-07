var scriptName = "AntiBlock";
var scriptVersion = 1.0;
var scriptAuthor = "Soulplexis";

var BlockPos = Java.type('net.minecraft.util.BlockPos');
var C07PacketPlayerDigging = Java.type('net.minecraft.network.play.client.C07PacketPlayerDigging');
var C08PacketPlayerBlockPlacement = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement");
var EnumFacing = Java.type('net.minecraft.util.EnumFacing');
var sprint = Java.type("net.minecraft.network.play.client.C0BPacketEntityAction");
var sprintactions = Java.type("net.minecraft.network.play.client.C0BPacketEntityAction.Action");

function FastPlace2() {
    var Mode = value.createList("Mode", ["Block", "Attack", "AttackAlways", "Swing", "Swing2", ], "Block");
    var ReBlock = value.createBoolean("ReBlock", false);
	var ReBlockDelay = value.createInteger("ReBlockDelay", 1, 0, 20);
    var Debug = value.createBoolean("Debug", false);
    var swics = false;
    var attacked = false;
    var swungblocked = false;
    var swungunblocked = false;
	var timerdelay = 0;
    this.getName = function() {
        return "Autoblock";
    };

    this.getDescription = function() {
        return "Helps to bypass blockhitting.";
    };

    this.getCategory = function() {
        return "Combat";
    };
    this.onDisable = function() {}
    var unblocked = false;
	
    this.onMotion = function() {
		if(swungunblocked == true) {
			timerdelay++;
		}
        if (Mode.get() == "Attack" && mc.thePlayer.isUsingItem() && timerdelay >= ReBlockDelay.get()) {
			timerdelay = 0;
            if (attacked) {
                mc.thePlayer.sendQueue.addToSendQueue(new C08PacketPlayerBlockPlacement(mc.thePlayer.inventory.getCurrentItem()))
				swungunblocked = false;
                attacked = false;
                if (Debug.get()) {
                    swics = !swics
                    if (swics) {
                        chat.print("§c[Debug] §7Reblocked ");
                    } else {
                        chat.print("§c[Debug] §fReblocked");
                    }
                }
            }
        }
        if (Mode.get() == "AttackAlways" && timerdelay >= ReBlockDelay.get()) {
			timerdelay = 0;
            if (attacked) {
                mc.thePlayer.sendQueue.addToSendQueue(new C08PacketPlayerBlockPlacement(mc.thePlayer.inventory.getCurrentItem()))
                attacked = false;
				swungunblocked = false;
                if (Debug.get()) {
                    swics = !swics
                    if (swics) {
                        chat.print("§c[Debug] §7Reblocked");
                    } else {
                        chat.print("§c[Debug] §fReblocked");
                    }
                }
            }
        }
        if (Mode.get() == "Block") {
            if (mc.thePlayer.isUsingItem()) {
                if (unblocked == false) {
                    mc.thePlayer.sendQueue.addToSendQueue(new C07PacketPlayerDigging(C07PacketPlayerDigging.Action.RELEASE_USE_ITEM, new BlockPos(0, 0, 0), EnumFacing.UP));
                    unblocked = true;
                    if (Debug.get()) {
                        swics = !swics
                        if (swics) {
                            chat.print("§c[Debug] §7Unblocked ");
                        } else {
                            chat.print("§c[Debug] §fUnblocked ");
                        }
                    }
                }
            }
            if (mc.thePlayer.isUsingItem() == false) {
                unblocked = false;
            }
        }
        if (Mode.get() == "Swing" && mc.thePlayer.isUsingItem()) {
            if (mc.thePlayer.swingProgress > 0 && swungunblocked == false) {
                mc.thePlayer.sendQueue.addToSendQueue(new C07PacketPlayerDigging(C07PacketPlayerDigging.Action.RELEASE_USE_ITEM, new BlockPos(0, 0, 0), EnumFacing.UP));
                swungblocked = false;
                swungunblocked = true;
                if (Debug.get()) {
                    swics = !swics
                    if (swics) {
                        chat.print("§c[Debug] §7Unblocked ");
                    } else {
                        chat.print("§c[Debug] §fUnblocked ");
                    }
                }
            }
            if (mc.thePlayer.swingProgress == 0 && swungblocked == false) {
                mc.thePlayer.sendQueue.addToSendQueue(new C08PacketPlayerBlockPlacement(mc.thePlayer.inventory.getCurrentItem()))
                swungunblocked = false;
                swungblocked = true;
                if (Debug.get()) {
                    swics = !swics
                    if (swics) {
                        chat.print("§c[Debug] §7Reblocked ");
                    } else {
                        chat.print("§c[Debug] §fReblocked ");
                    }
                }
            }
        }
        if (Mode.get() == "Swing2" && mc.thePlayer.isUsingItem()) {
            if (mc.thePlayer.swingProgress > 0 && swungunblocked == false) {
                //
                swungblocked = false;

                if (Debug.get()) {
                    swics = !swics
                    if (swics) {
                        chat.print("§c[Debug] §7Unblocked ");
                    } else {
                        chat.print("§c[Debug] §fUnblocked ");
                    }
                }
            }
            if (mc.thePlayer.swingProgress == 0 && swungblocked == false) {
                mc.thePlayer.sendQueue.addToSendQueue(new C08PacketPlayerBlockPlacement(mc.thePlayer.inventory.getCurrentItem()))
                swungunblocked = false;
                swungblocked = true;
                if (Debug.get()) {
                    swics = !swics
                    if (swics) {
                        chat.print("§c[Debug] §7Reblocked ");
                    } else {
                        chat.print("§c[Debug] §fReblocked ");
                    }
                }
            }
        }
    }

    this.onEnable = function() {}
    this.onAttack = function() {
        if ((Mode.get() == "Attack" || Mode.get() == "Swing2") && mc.thePlayer.isUsingItem() && timerdelay == 0) {
            mc.thePlayer.sendQueue.addToSendQueue(new C07PacketPlayerDigging(C07PacketPlayerDigging.Action.RELEASE_USE_ITEM, new BlockPos(0, 0, 0), EnumFacing.UP));
            swungunblocked = true;
            if (Debug.get()) {
                swics = !swics
                if (swics) {
                    chat.print("§c[Debug] §7Unblocked ");
                } else {
                    chat.print("§c[Debug] §fUnblocked ");
                }
            }
            if (ReBlock.get()) {
                attacked = true;

            }
        }
        if ((Mode.get() == "AttackAlways") && timerdelay == 0) {
            mc.thePlayer.sendQueue.addToSendQueue(new C07PacketPlayerDigging(C07PacketPlayerDigging.Action.RELEASE_USE_ITEM, new BlockPos(0, 0, 0), EnumFacing.UP));
            swungunblocked = true;
            if (Debug.get()) {
                swics = !swics
                if (swics) {
                    chat.print("§c[Debug] §7Unblocked ");
                } else {
                    chat.print("§c[Debug] §fUnblocked ");
                }
            }
            if (ReBlock.get()) {
                attacked = true;
            }
        }
    }

    this.addValues = function(values) {
        values.add(Mode);
        values.add(ReBlock);
		values.add(ReBlockDelay);
        values.add(Debug);
    }
}
var FastPlace2 = new FastPlace2();
var FastPlace2Client;

function onEnable() {
    FastPlace2Client = moduleManager.registerModule(FastPlace2);
};

function onDisable() {
    moduleManager.unregisterModule(FastPlace2Client);
};