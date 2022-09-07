//LongJump for Mc-SekSin.net | By 1337quip (wasd#9800) & The Moss

var scriptName = "SekSinLongJump";
var scriptVersion = 3.0;
var scriptAuthor = "1337quip";

var SekSinLongJump = new SekSinLongJump();
var movementUtils = Java.type("net.ccbluex.liquidbounce.utils.MovementUtils");
var boosted = false;

function strafe(speed) {
    var a = mc.thePlayer.rotationYaw * 0.017453292;
    var l = mc.thePlayer.rotationYaw * 0.017453292 - Math.PI * 1.5;
    var r = mc.thePlayer.rotationYaw * 0.017453292 + Math.PI * 1.5;
    var rf = mc.thePlayer.rotationYaw * 0.017453292 + Math.PI * 0.19;
    var lf = mc.thePlayer.rotationYaw * 0.017453292 + Math.PI * -0.19;
    var lb = mc.thePlayer.rotationYaw * 0.017453292 - Math.PI * 0.76;
    var rb = mc.thePlayer.rotationYaw * 0.017453292 - Math.PI * -0.76;
    if (mc.gameSettings.keyBindForward.pressed) {
        if (mc.gameSettings.keyBindLeft.pressed && !mc.gameSettings.keyBindRight.pressed) {
            mc.thePlayer.motionX -= (Math.sin(lf) * speed);
            mc.thePlayer.motionZ += (Math.cos(lf) * speed);
        } else if (mc.gameSettings.keyBindRight.pressed && !mc.gameSettings.keyBindLeft.pressed) {
            mc.thePlayer.motionX -= (Math.sin(rf) * speed);
            mc.thePlayer.motionZ += (Math.cos(rf) * speed);
        } else {
            mc.thePlayer.motionX -= (Math.sin(a) * speed);
            mc.thePlayer.motionZ += (Math.cos(a) * speed);
        }
    } else if (mc.gameSettings.keyBindBack.pressed) {
        if (mc.gameSettings.keyBindLeft.pressed && !mc.gameSettings.keyBindRight.pressed) {
            mc.thePlayer.motionX -= (Math.sin(lb) * speed);
            mc.thePlayer.motionZ += (Math.cos(lb) * speed);
        } else if (mc.gameSettings.keyBindRight.pressed && !mc.gameSettings.keyBindLeft.pressed) {
            mc.thePlayer.motionX -= (Math.sin(rb) * speed);
            mc.thePlayer.motionZ += (Math.cos(rb) * speed);
        } else {
            mc.thePlayer.motionX += (Math.sin(a) * speed);
            mc.thePlayer.motionZ -= (Math.cos(a) * speed);
        }
    } else if (mc.gameSettings.keyBindLeft.pressed && !mc.gameSettings.keyBindRight.pressed && !mc.gameSettings.keyBindForward.pressed && !mc.gameSettings.keyBindBack.pressed) {
        mc.thePlayer.motionX += (Math.sin(l) * speed);
        mc.thePlayer.motionZ -= (Math.cos(l) * speed);
    } else if (mc.gameSettings.keyBindRight.pressed && !mc.gameSettings.keyBindLeft.pressed && !mc.gameSettings.keyBindForward.pressed && !mc.gameSettings.keyBindBack.pressed) {
        mc.thePlayer.motionX += (Math.sin(r) * speed);
        mc.thePlayer.motionZ -= (Math.cos(r) * speed);
    }
}

function SekSinLongJump() {

    var newMode = value.createBoolean("New", true);
    var autoJump = value.createBoolean("AutoJump", true);

    this.getName = function () {
        return "SekSinLongJump";
    };

    this.getDescription = function () {
        return "LongJump for Mc-SekSin.net | By 1337quip (wasd#9800) & The Moss";
    };

    this.getCategory = function () {
        return "Misc";
    };

    this.addValues = function (values) {
        //Add Values
        values.add(newMode);
        values.add(autoJump);
    };

    this.onUpdate = function (event) {
        //Check if Value is New Mode
        if (newMode.get()) {
            //Check if Player isn't on ground
            if (!mc.thePlayer.onGround) {
                //Set Player motion y to 0.042
                mc.thePlayer.motionY += 0.042;
                var speed = 0.75;
                var timer = 0.5;
                //Check if boosted
                if (boosted) {
                    speed = 0.6;
                    timer = 1.0;
                    //Set boosted to false
                    boosted = false;
                }
                //Player rotation yaw
                var yaw = mc.thePlayer.rotationYaw * 0.017453292;
                //Set player motion x with math
                mc.thePlayer.motionX = -Math.sin(yaw) * speed;
                mc.thePlayer.motionZ = Math.cos(yaw) * speed;
                //Set player timer speed
                mc.timer.timerSpeed = timer;
            } else {
                //Reset player timer speed to 1
                mc.timer.timerSpeed = 1.0;
            }
        }
        //Check AutoJump value, Check if player is on ground, Check if player moving by LiquidBounce stuff
        if (autoJump.get() && mc.thePlayer.onGround && movementUtils.isMoving())
            mc.thePlayer.jump();
    }

    this.onMove = function (event) {
        //Check if Value isn't New Mode
        if (!newMode.get()) {
            //Check if Player isn't on ground
            if (!mc.thePlayer.onGround) {
                //Set Player motion y to 0.045
                mc.thePlayer.motionY += 0.045;
                //Set player speed
                strafe(0.05);
                //Set player timer speed to 0.4
                mc.timer.timerSpeed = 0.4;
                //Send packet player
                mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer());
            } else {
                //Reset player timer speed to 1
                mc.timer.timerSpeed = 1.0;
            }
        }

    }

    this.onEnable = function (event) {
        boosted = true;

        chat.print("§8§l§m+---------------------------------------------+")
        chat.print("");
        chat.print("§8§l[§9§lLiquidBounce§8§l] §a§lPress Jump for Make sinxao Crying!! lmao");
        chat.print("§8§l[§9§lLiquidBounce§8§l] §c§lNot Recommended for Heavy use");
        chat.print("§8§l[§9§lLiquidBounce§8§l] §c§lIf LongJump doesn't work well, please disable AutoJump");
        chat.print("§8§l[§9§lLiquidBounce§8§l] §f§lLongJump for Mc-SekSin.net | By §a§l1337quip §f§l(§a§lwasd#9800§f§l) & §a§lThe Moss");
        chat.print("");
        chat.print("§8§l§m+---------------------------------------------+");

    }

    this.onDisable = function (event) {
        mc.timer.timerSpeed = 1.0;

    }

}

function onEnable() {
    moduleManager.registerModule(SekSinLongJump);
};

function onDisable() {
    moduleManager.unregisterModule(SekSinLongJump);
};
