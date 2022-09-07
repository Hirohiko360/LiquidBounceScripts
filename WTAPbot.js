///api_version=2
//Copyright 2020 commandblock2 distributed under AGPL-3.0-or-later
//Part of these are skided from LB, but the license should be compatible
(script = registerScript({
    name: "WTAPbot",
    version: "1.0",
    authors: ["commandblock2"]
})).import("Core.lib")

GameSettings = Java.type("net.minecraft.client.settings.GameSettings")

var countDownClicks = 5

var target = null
var targetPrevPoss = []
var lasttarget = null
var isEnemy
var countDown = countDownClicks

var lastFrameLeftDown = false
var continue_ = true

var strafeLeft = true

var timer = new MSTimer()
var strafeTimer = new MSTimer()

var forEach = Array.prototype.forEach;

module =
{
    name: "WTAPbot",
    description: "Bot that uses WTAP(mostly legit), left click 5 times to start",
    author: "commandblock2",
    category: "combat",
    values:
        [
            captureRange = value.createFloat("CaptureRange", 10, 0, 30),
            hurtTime = value.createInteger("Hurttime", 0, 0, 10),
            slowDownDelay = value.createInteger("SlowDownDelay", 120, 0, 5000),
            distanceToMoreDelay = value.createFloat("DistanceToMoreDelay", 1.5, 0, 2),
            moreDelayToKeepDistance = value.createFloat("MoreDelayToKeepDistance", 230, 50, 2000),
            block = value.createBoolean("Block", true),
            sneak = value.createBoolean("Sneak", false),
            stopKey = value.createText("StopKey", "Z"),
            noBack = value.createBoolean("No S-Tap", true),
            aimMode = value.createList("AimMode", ["Predictive", "Face", "LegitLike"], "Predictive"),
            singleAuraMode = value.createBoolean("FastComfirm", false),
            adStrafe = value.createBoolean("AD-Strafe", true),
            strafeInterval = value.createInteger("StrafeInterval", 500, 50, 2000)
        ],

    onRender3D: function () {
        var thisFrameLeftDown = mc.gameSettings.keyBindAttack.isKeyDown()

        if ((!lastFrameLeftDown || singleAuraMode.get()) && thisFrameLeftDown)
            onLeftClick()
        lastFrameLeftDown = thisFrameLeftDown

        if (countDown == 0) {
            //main loop
            mc.gameSettings.keyBindSprint.pressed = true
            if (mc.theWorld.loadedEntityList.indexOf(target) != -1 && (PlayerExtensionKt.getDistanceToEntityBox(mc.thePlayer, target) < getMaxDistance() + captureRange.get()) && continue_ && !mc.thePlayer.isDead) {

                aim()    

                setSprintState()

            }
            else {
                //release
                mc.gameSettings.keyBindSprint.pressed = false
                countDown = 5
                mc.gameSettings.keyBindAttack.pressed = false
                mc.gameSettings.keyBindBack.pressed = false
                AutoClickerModule.state = false
                target = null
                block.get() && (mc.gameSettings.keyBindUseItem.pressed = false);
                sneak.get() && (mc.gameSettings.keyBindSneak.pressed = false);
                noBack.get() || (mc.gameSettings.keyBindBack.pressed = false);
                mc.gameSettings.keyBindForward.pressed = false;
                
                adStrafe.get() && (mc.gameSettings.keyBindLeft.pressed = false);
                adStrafe.get() && (mc.gameSettings.keyBindRight.pressed = false);     
                continue_ = true
            }
        }
    },

    onEnable: function () {
        isEnemy = getMethod(KillAuraModule, "isEnemy");
    },

    onUpdate: function () {
        if (target)
            targetPrevPoss.push(target.getPositionVector())
        else
            targetPrevPoss = []

        if (targetPrevPoss.length > 10)
            targetPrevPoss.shift()
    },

    onAttack: function (e) {
        if(e.getTargetEntity().hurtTime <= hurtTime.get())
            timer.reset()
    },

    onKey: function (e) {
        if (e.getKey() == eval("Keyboard.KEY_" + stopKey.get().toUpperCase()))
            continue_ = false
    },

    onDisable: function () { }
}

function setSprintState() {

    delay = slowDownDelay.get()
    if(PlayerExtensionKt.getDistanceToEntityBox(mc.thePlayer, target) < getMaxDistance() - distanceToMoreDelay.get())
        delay += moreDelayToKeepDistance.get()

    if (timer.hasTimePassed(delay)) {
        block.get() && (mc.gameSettings.keyBindUseItem.pressed = false);
        sneak.get() && (mc.gameSettings.keyBindSneak.pressed = false);
        noBack.get() || (mc.gameSettings.keyBindBack.pressed = false);
        mc.gameSettings.keyBindForward.pressed = true
    }
    else {
        block.get() && (mc.gameSettings.keyBindUseItem.pressed = true);
        sneak.get() && (mc.gameSettings.keyBindSneak.pressed = true);
        noBack.get() || (mc.gameSettings.keyBindBack.pressed = true);
        mc.gameSettings.keyBindForward.pressed = false
    }

    if (adStrafe.get())
        if (strafeLeft){
            mc.gameSettings.keyBindLeft.pressed = true
            mc.gameSettings.keyBindRight.pressed = false
        } else{
            mc.gameSettings.keyBindLeft.pressed = false
            mc.gameSettings.keyBindRight.pressed = true
        }
    
    if (strafeTimer.hasTimePassed(strafeInterval.get())) {
        strafeTimer.reset()
        strafeLeft = !strafeLeft
    }

    leftDown = Keyboard.isKeyDown(mc.gameSettings.keyBindLeft.getKeyCode())
    rightDown = Keyboard.isKeyDown(mc.gameSettings.keyBindRight.getKeyCode())

    if(rightDown) {
        mc.gameSettings.keyBindRight.pressed = true
        mc.gameSettings.keyBindLeft.pressed = false
    }

    if (leftDown) {
        mc.gameSettings.keyBindRight.pressed = false
        mc.gameSettings.keyBindLeft.pressed = true
    }

    if (rightDown && leftDown) {
        mc.gameSettings.keyBindLeft.pressed = true
        mc.gameSettings.keyBindRight.pressed = true
    }

    prevSprintState = comboSprint
}

function aim() {
    AutoClickerModule.state = true
    mc.gameSettings.keyBindAttack.pressed = true

    targetPrevPoss[targetPrevPoss.length - 1] = target.getPositionVector()

    index = Math.floor(targetPrevPoss.length * (1 - Math.max(Math.min(PlayerExtensionKt.getDistanceToEntityBox(mc.thePlayer, target) / getMaxDistance() - 1, 1), 0.01)))
    vecTarget = targetPrevPoss[index]

    x_offset = vecTarget.xCoord - target.posX; y_offset = vecTarget.yCoord - target.posY; z_offset = vecTarget.zCoord - target.posZ;

    if(aimMode.get() == "Face"){
        x_offset = y_offset = z_offset = 0;
    }
    else if(aimMode.get() == "Predictive"){
        x_offset = -x_offset; y_offset = -y_offset; z_offset = -z_offset
    }


    RotationUtils.searchCenter(target.getEntityBoundingBox().offset(x_offset, y_offset, z_offset), false, false, false, true, 300).rotation.toPlayer(mc.thePlayer)
}

function getMaxDistance() {
    return ReachModule.state ? ReachModule.getValue("CombatReach").get() : 3.0
}

function onLeftClick() {
    entities = mc.theWorld.loadedEntityList

    mindiff = Number.MAX_VALUE
    target = null
    forEach.call(entities, function (elem) {
        diff = RotationUtils.getRotationDifference(elem)

        if (PlayerExtensionKt.getDistanceToEntityBox(mc.thePlayer, elem) > getMaxDistance() + captureRange.get())
            return

        if (elem == mc.thePlayer || !isEnemy.invoke(KillAuraModule, elem))
            return

        if (diff < mindiff) {
            mindiff = diff
            target = elem
        }
    })

    if (lasttarget == target && target) {
        if (countDown > 0)
            countDown--
        else
            return
    }
    else {
        countDown = countDownClicks
        lasttarget = target
    }

    switch (countDown) {
        case 2:
            chat.print("§c[WTAP]§7Click 2 more time to lock target " + target.getName())
            break;

        case 0:
            chat.print("§c[WTAP]§7Target §d" + target.getName() + " §7acquiring lock")
            comboSprint = true
        default:
            break;
    }
}
