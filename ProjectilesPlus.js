///api_version=2
//Copyright 2020 commandblock2 distributed under AGPL-3.0-or-later
(script = registerScript({
    name: "ProjectilesPlus",
    version: "1.0",
    authors: ["commandblock2"]
})).import("Core.lib")

Color = Java.type("java.awt.Color")
GL11 = Java.type("org.lwjgl.opengl.GL11")

HashMap = Java.type("java.util.HashMap")
Material = Java.type("net.minecraft.block.material.Material")


//Idk why that happens same as REPL
//God damn fuck

entity2PositionHistorys = new HashMap()
entity2PositionPredicition = new HashMap()
playerPositionPrediction = []
dodging = false

oIndex = -1

module = {
    name: "ProjectilesPlus",
    description: "Projectlies for Arrows that is already in air(for now)",
    author: "commandblock2",
    category: "Scripts",
    values: [
        arrowDodge = value.createBoolean("ArrowDodge", true),
        ticksToDodge = value.createInteger("TicksToDodge", 5, 1, 20),
        renderPlayerPrediction = value.createBoolean("RenderPlayerPrediction", false),
        dodgeMode = value.createList("DodgeMode", ["TeleportUp", "BlockHit"], "BlockHit"),
        autoSwordBlockHit = value.createBoolean("AutoSword4BlockHit", true)
    ],

    onUpdate: function () {
        arrows = Java.from(mc.theWorld.loadedEntityList).filter(function (elem) {
            return elem instanceof EntityArrow
        })

        arrows.forEach(function (arrow) {
            if (!entity2PositionHistorys[arrow])
                entity2PositionHistorys.put(arrow, [])

            if (arrow.prevPosX == arrow.posX && arrow.prevPosY == arrow.posY && arrow.prevPosZ == arrow.posZ) {
                if (entity2PositionHistorys[arrow])
                    entity2PositionHistorys.remove(arrow)
                entity2PositionPredicition.remove(arrow)

                return
            }

            entity2PositionHistorys[arrow].push(arrow.getPositionVector())

            entity2PositionPredicition.put(arrow, predict(arrow))
        })

        elem4Remove = []

        entity2PositionHistorys.forEach(function (elem) {
            if (arrows.indexOf(elem) == -1) elem4Remove.push(elem)
        })

        elem4Remove.forEach(function (e) { entity2PositionHistorys.remove(e) })

        playerPositionPrediction = playerPosInTicks(ticksToDodge.get())

        if (dodging)
            if (dodgeMode.get() == "TeleportUp") {
                mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + 2, mc.thePlayer.posZ)
                dodging = false
            }
            else if (dodgeMode.get() == "BlockHit") {
                if (autoSwordBlockHit.get())
                    for (i = 0; i < 9; i++) {
                        stack = mc.thePlayer.inventory.getStackInSlot(i)
                        if (stack && stack.getItem() instanceof ItemSword && oIndex == -1) {
                            oIndex = mc.thePlayer.inventory.currentItem
                            mc.thePlayer.inventory.currentItem = i
                        }
                    }


                mc.gameSettings.keyBindUseItem.pressed = true
                timeout(ticksToDodge.get() * 50, function () {
                    if (!dodging) {
                        mc.gameSettings.keyBindUseItem.pressed = false
                        if (oIndex != -1) {
                            mc.thePlayer.inventory.currentItem = oIndex
                            oIndex = -1
                        }
                    }
                    dodging = false
                })
            }
    },

    onRender3D: function (event) {
        entity2PositionHistorys.forEach(function (entity) {
            //Draw the history line
            drawLine(entity2PositionHistorys[entity], new Color(255, 255, 0))

            //Draw the prediction line
            drawLine(entity2PositionPredicition[entity], new Color(86, 156, 214))
        })

        //Draw the Player prediction
        if (!renderPlayerPrediction.get()) return
        pos = playerPositionPrediction[playerPositionPrediction.length - 1]
        renderMgr = mc.getRenderManager()
        RenderUtils.drawAxisAlignedBB(mc.thePlayer.getEntityBoundingBox().offset(
            pos.xCoord - mc.thePlayer.posX - renderMgr.renderPosX,
            pos.yCoord - mc.thePlayer.posY - renderMgr.renderPosY,
            pos.zCoord - mc.thePlayer.posZ - renderMgr.renderPosZ
        ), new Color(53, 1, 134, 30))
    },

    onDisable: function () {

    }

}


//things below here are adapted from LiquidBounce

function playerPosInTicks(ticks) {
    poses = []

    poses.push(mc.thePlayer.getPositionVector())

    posX = mc.thePlayer.posX;
    posY = mc.thePlayer.posY;
    posZ = mc.thePlayer.posZ;

    motionX = mc.thePlayer.motionX;
    motionY = mc.thePlayer.motionY;
    motionZ = mc.thePlayer.motionZ;

    yaw = mc.thePlayer.rotationYaw;
    strafe = mc.thePlayer.moveStrafing;
    forward = mc.thePlayer.moveForward;


    //if (mc.thePlayer.onGround) {

    for (index = 0; index < ticks; index++) {
        multip = index + 1
        poses.push(new Vec3(posX + multip * motionX, posY, posZ + multip * motionZ))
    }
    return poses
    //}


    /*for (index = 0; index < ticks; index++) {
        strafe *= 0.98
        forward *= 0.98

        v = strafe * strafe + forward * forward

        if (v > 0.0001) {
            v = Math.sqrt(v)

            if (v > 1.0) v = 1.0

            v = mc.thePlayer.jumpMovementFactor / v

            strafe *= v
            forward *= v

            f1 = Math.sin(yaw * Math.PI / 180.0)
            f2 = Math.cos(yaw * Math.PI / 180.0)

            motionX += strafe * f2 - forward * f1
            motionZ += forward * f2 + strafe * f1


        }

        motionY -= 0.08
        motionX *= 0.91
        motionY *= 0.9800000190734863
        motionY *= 0.91

        motionZ *= 0.91

        posX += motionX
        posY += motionY
        posZ += motionZ

        poses.push(new Vec3(posX, posY, posZ))
    }

    return poses
    */
}

function predict(entityArrow) {
    motionX = entityArrow.motionX
    motionY = entityArrow.motionY
    motionZ = entityArrow.motionZ

    poses = []
    poses.push(entityArrow.getPositionVector())

    if(!poses[0]) return
    //FUCK IDK WHY BUT JUST MIGHT HAPPEN
    
    x = poses[0].xCoord
    y = poses[0].yCoord
    z = poses[0].zCoord

    while (y > 0) {
        posBefore = new Vec3(x, y, z)
        posAfter = new Vec3(x + motionX, y + motionY, z + motionZ)

        poses.push(posAfter)

        landingPosition = mc.theWorld.rayTraceBlocks(posBefore, posAfter, false, true, false)
        if (landingPosition) {
            poses.push(landingPosition.hitVec)
            break
        }

        playerBoundingBox = mc.thePlayer.getEntityBoundingBox().expand(0.3, 0.3, 0.3)
        index = poses.length > ticksToDodge.get() ? ticksToDodge.get() : poses.length
        pos = playerPositionPrediction[index]
        if (playerBoundingBox.calculateIntercept(posBefore, posAfter) && poses.length <= ticksToDodge.get())
            dodging = true

        playerBoundingBox = playerBoundingBox.offset(pos.xCoord - mc.thePlayer.posX, pos.yCoord - mc.thePlayer.posY, pos.zCoord - mc.thePlayer.posZ)


        if (playerBoundingBox.calculateIntercept(posBefore, posAfter) && poses.length <= ticksToDodge.get())
            dodging = true

        // motion thing
        x += motionX
        y += motionY
        z += motionZ

        if (mc.theWorld.getBlockState(new BlockPos(x, y, z)).getBlock()
            .getMaterial() == Material.water) {
            // Update motion
            motionX *= 0.6
            motionY *= 0.6
            motionZ *= 0.6
        } else { // Update motion
            motionX *= 0.99
            motionY *= 0.99
            motionZ *= 0.99
        }

        motionY -= 0.05
    }

    return poses
}

function drawLine(poses, color) {
    GL11.glPushMatrix();

    GL11.glDisable(GL11.GL_TEXTURE_2D);
    GL11.glBlendFunc(GL11.GL_SRC_ALPHA, GL11.GL_ONE_MINUS_SRC_ALPHA);
    GL11.glLineWidth(4)
    GL11.glEnable(GL11.GL_LINE_SMOOTH);
    GL11.glEnable(GL11.GL_BLEND);
    GL11.glDisable(GL11.GL_DEPTH_TEST);
    mc.entityRenderer.disableLightmap();
    GL11.glBegin(GL11.GL_LINE_STRIP);
    RenderUtils.glColor(color);
    renderPosX = mc.getRenderManager().viewerPosX;
    renderPosY = mc.getRenderManager().viewerPosY;
    renderPosZ = mc.getRenderManager().viewerPosZ;

    poses.forEach(function (pos) {
        GL11.glVertex3d(pos.xCoord - renderPosX, pos.yCoord - renderPosY, pos.zCoord - renderPosZ);
    })


    GL11.glColor4d(1, 1, 1, 1);
    GL11.glEnd();
    GL11.glEnable(GL11.GL_DEPTH_TEST);
    GL11.glDisable(GL11.GL_LINE_SMOOTH);
    GL11.glDisable(GL11.GL_BLEND);
    GL11.glEnable(GL11.GL_TEXTURE_2D);
    GL11.glPopMatrix();
}
