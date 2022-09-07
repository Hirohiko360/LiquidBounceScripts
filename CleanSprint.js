var scriptName = "CleanSprint";
var scriptVersion = 1.0;
var scriptAuthor = "yorik100";
var C0BPacketEntityAction = Java.type("net.minecraft.network.play.client.C0BPacketEntityAction");

function getMoveYaw() {
    var moveYaw = mc.thePlayer.rotationYaw;
    if (mc.thePlayer.moveForward != 0 && mc.thePlayer.moveStrafing == 0) {
        moveYaw += mc.thePlayer.moveForward > 0 ? 0 : 180;
    } else if (mc.thePlayer.moveForward != 0 && mc.thePlayer.moveStrafing != 0) {
        if (mc.thePlayer.moveForward > 0)
            moveYaw += mc.thePlayer.moveStrafing > 0 ? -45 : 45;
        else
            moveYaw -= mc.thePlayer.moveStrafing > 0 ? -45 : 45;

        moveYaw += mc.thePlayer.moveForward > 0 ? 0 : 180;
    } else if (mc.thePlayer.moveStrafing != 0 && mc.thePlayer.moveForward == 0) {
        moveYaw += mc.thePlayer.moveStrafing > 0 ? -90 : 90;
    }
    return moveYaw;
}

var cleanSprint = new CleanSprint();

var client;

function CleanSprint() {
    this.getName = function() {
        return "MatrixSprint";
    };

    this.getDescription = function() {
        return "OmniSprint bypass for Matrix";
    };

    this.getCategory = function() {
        return "Movement";
    };
    var stopSprint = false;
	var cancel = true;
    this.onEnable = function() {
        stopSprint = false;
		cancel = true
    }
	this.onJump = function(event) {
		if (cancel && mc.thePlayer.isSprinting()) {
            event.cancelEvent()
            cancel = false;
			this.yaw = mc.thePlayer.rotationYaw;
            mc.thePlayer.rotationYaw = getMoveYaw();
            mc.thePlayer.jump();
            mc.thePlayer.rotationYaw = this.yaw;
			cancel = true;
		}
	}
    this.onUpdate = function() {
        if (mc.thePlayer.isSprinting()) {
            if (mc.thePlayer.moveForward <= 0) {
                mc.thePlayer.sendQueue.addToSendQueue(new C0BPacketEntityAction(mc.thePlayer, C0BPacketEntityAction.Action.STOP_SPRINTING));
                stopSprint = true;
            } else if (stopSprint) {
                mc.thePlayer.sendQueue.addToSendQueue(new C0BPacketEntityAction(mc.thePlayer, C0BPacketEntityAction.Action.START_SPRINTING));
                stopSprint = false;
            }
        } else {
            stopSprint = false;
        }
    }
    this.onPacket = function(event) {}
    this.onDisable = function() {}
}

function onLoad() {}

function onEnable() {
    client = moduleManager.registerModule(cleanSprint);
}

function onDisable() {
    moduleManager.unregisterModule(client);
}
