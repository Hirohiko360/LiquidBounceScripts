var scriptName = "CleanStrafe";
var scriptVersion = 2.0;
var scriptAuthor = "yorik100";
Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
};


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

var cleanStrafe = new CleanStrafe();

var client;

function CleanStrafe() {
    this.getName = function() {
        return "StrafeDemon";
    };

    this.getDescription = function() {
        return "StrafeDemon";
    };

    this.getCategory = function() {
        return "Movement";
    };
    var float = value.createFloat("StrafeStrenght", 0.5, 0, 1);
    var bool = value.createBoolean("NoMoveStop", false);
    var secondbool = value.createBoolean("OnGroundStrafe", false);
    var thirdbool = value.createBoolean("AllDirectionsJumps", false);
    this.addValues = function(values) {
            values.add(float);
            values.add(bool);
            values.add(secondbool);
            values.add(thirdbool);
    };
	this.getTag = function() {
		return "" + float.get();
	}
    this.onJump = function(event) {
        if (this.jump) {
            event.cancelEvent()
        }
    }
    this.onEnable = function() {
        this.wasDown = false;
    }
    this.onUpdate = function() {
        if (mc.thePlayer.onGround && mc.gameSettings.keyBindJump.isKeyDown() && thirdbool.get() && (mc.thePlayer.movementInput.moveForward || mc.thePlayer.movementInput.moveStrafe) && !(mc.thePlayer.isInWater() || mc.thePlayer.isInLava() || mc.thePlayer.isOnLadder() || mc.thePlayer.isInWeb)) {
            if (mc.gameSettings.keyBindJump.isKeyDown()) {
                mc.gameSettings.keyBindJump.pressed = false;
                this.wasDown = true;
            }
            this.yaw = mc.thePlayer.rotationYaw;
            mc.thePlayer.rotationYaw = getMoveYaw();
            mc.thePlayer.jump();
            mc.thePlayer.rotationYaw = this.yaw;
            this.jump = true;
            if (this.wasDown) {
                mc.gameSettings.keyBindJump.pressed = true;
                this.wasdown = false
            }
        } else {
            this.jump = false;
        }
    }
    this.onStrafe = function(event) {
        shotSpeed = Math.sqrt((mc.thePlayer.motionX * mc.thePlayer.motionX) + (mc.thePlayer.motionZ * mc.thePlayer.motionZ));
        this.speed = (shotSpeed * float.get());
        this.motionX = (mc.thePlayer.motionX * (1 - float.get()));
        this.motionZ = (mc.thePlayer.motionZ * (1 - float.get()));
        if (!(mc.thePlayer.movementInput.moveForward || mc.thePlayer.movementInput.moveStrafe)) {
            if (bool.get()) {
                mc.thePlayer.motionX = 0;
                mc.thePlayer.motionZ = 0;
            }
            return;
        }
        if (!mc.thePlayer.onGround || secondbool.get()) {
            var yaw = getMoveYaw();
            mc.thePlayer.motionX = (((-Math.sin(Math.radians(yaw)) * this.speed) + this.motionX));
            mc.thePlayer.motionZ = (((Math.cos(Math.radians(yaw)) * this.speed) + this.motionZ));
        }
    }
}

function onLoad() {}

function onEnable() {
    client = moduleManager.registerModule(cleanStrafe);
}

function onDisable() {
    moduleManager.unregisterModule(client);
}