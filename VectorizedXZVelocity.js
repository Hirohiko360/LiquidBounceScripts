///api_version=2
//Copyright 2020 commandblock2 distributed under AGPL-3.0-or-later
(script = registerScript({
    name: "VectorizedXZVelocity",
    version: "1.0",
    authors: ["commandblock2"]
})).import("Core.lib")

GL11 = Java.type("org.lwjgl.opengl.GL11")
Color = Java.type("java.awt.Color")

module = {
    name: "VectorizedXZVelocity",
    description: "not only can u adjust the amount of knock back but the direction",
    author: "commandblock2",
    category: "combat",

    values: [
        mode = value.createList("OffSetBasedOn", ["Player", "CommingVelocityPacket"], "CommingVelocityPacket"),
        offset = value.createInteger("AngleOffset", 0, -180, 180),
        amplifier = value.createFloat("Amplifier", 1, 0, 2),
        render = value.createBoolean("RenderDirectionWPlayer", true)
    ],

    onPacket: function (packetEvent) {
        packet = packetEvent.getPacket()
        if (packet instanceof S12PacketEntityVelocity
            && mc.theWorld.getEntityByID(packet.getEntityID()) == mc.thePlayer) {

            yaw = 0

            if (mode.get() == "Player")
                yaw = -(mc.thePlayer.rotationYaw + offset.get() + 180)
            else {
                yaw =  (Math.atan2(packet.motionX, packet.motionZ) * 180 / Math.PI) + offset.get()
            }
            velocity = Math.sqrt(packet.motionX * packet.motionX + packet.motionZ * packet.motionZ) * amplifier.get()

            packet.motionX = velocity * Math.sin(yaw / 180 * Math.PI)
            packet.motionZ = velocity * Math.cos(yaw / 180 * Math.PI)
        }
    },

    onRender3D: function () {
        if (mode.get() == "Player") {
            yaw = -(mc.thePlayer.rotationYaw + offset.get() + 180)

            xOffset = Math.sin(yaw / 180 * Math.PI) * amplifier.get()
            zOffset = Math.cos(yaw / 180 * Math.PI) * amplifier.get()

            x = mc.thePlayer.lastTickPosX + (mc.thePlayer.posX - mc.thePlayer.lastTickPosX) * mc.timer.renderPartialTicks
            y = mc.thePlayer.lastTickPosY + (mc.thePlayer.posY - mc.thePlayer.lastTickPosY) * mc.timer.renderPartialTicks
            z = mc.thePlayer.lastTickPosZ + (mc.thePlayer.posZ - mc.thePlayer.lastTickPosZ) * mc.timer.renderPartialTicks

            drawLine([new Vec3(x, y + 1, z),
            new Vec3(x + xOffset, y + 1, z + zOffset)], new Color(86, 156, 214))
        }
    }
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
