/**
 * 
 * LWJGL Reference: https://github.com/LWJGL/lwjgl/blob/master/src/templates/org/lwjgl/opengl/GL11.java
 * 
 * 
 * */
var GL11 = Java.type("org.lwjgl.opengl.GL11");
var GlStateManager = Java.type("net.minecraft.client.renderer.GlStateManager");
var Gui = Java.type("net.minecraft.client.gui.Gui");

var Color = Java.type('java.awt.Color');

var colorCode = [0x000000, 0x0000AA, 0x00AA00, 0x00AAAA, 0xAA0000, 0xAA00AA, 0xFFAA00, 0xAAAAAA, 0x555555, 0x5555FF, 0x55FF55, 0x55FFFF, 0xFF5555, 0xFF55FF, 0xFFFF55, 0xFFFFFF];

/**
 * @param {number[]} pos
 * @param {function} draw 
 */
function drawFaceToPlayer(pos, draw) {
    GlStateManager.pushMatrix();
    GlStateManager.enablePolygonOffset();
    GlStateManager.doPolygonOffset(1, -1500000);

    GlStateManager.translate(pos[0] - mc.getRenderManager().renderPosX, pos[1] - mc.getRenderManager().renderPosY, pos[2] - mc.getRenderManager().renderPosZ);

    GlStateManager.rotate(-mc.getRenderManager().playerViewY, 0, 1, 0);
    GlStateManager.rotate(mc.getRenderManager().playerViewX, mc.gameSettings.thirdPersonView == 2 ? -1 : 1, 0, 0);

    GlStateManager.scale(-0.03, -0.03, 0.03);
    GL11.glDepthMask(false);

    draw();

    GL11.glColor4f(1, 1, 1, 1);
    GL11.glDepthMask(true);
    GlStateManager.doPolygonOffset(1, 1500000);
    GlStateManager.disablePolygonOffset();
    GlStateManager.popMatrix();
}

function glColor(rgbaColor) {
    if (rgbaColor instanceof Color) rgbaColor = rgbaColor.getRGB();
    else if (rgbaColor instanceof String) rgbaColor = ~~rgbaColor;
    var alpha = (rgbaColor >> 24 & 0xFF) / 255;
    var red = (rgbaColor >> 16 & 0xFF) / 255;
    var green = (rgbaColor >> 8 & 0xFF) / 255;
    var blue = (rgbaColor & 0xFF) / 255;
    GlStateManager.color(red, green, blue, alpha);
}

function enableGL2D() {
    GL11.glDisable(2929);
    GL11.glEnable(3042);
    GL11.glDisable(3553);
    GL11.glBlendFunc(770, 771);
    GL11.glDepthMask(true);
    GL11.glEnable(2848);
    GL11.glHint(3154, 4354);
    GL11.glHint(3155, 4354);
}

function disableGL2D() {
    GL11.glEnable(3553);
    GL11.glDisable(3042);
    GL11.glEnable(2929);
    GL11.glDisable(2848);
    GL11.glHint(3154, 4352);
    GL11.glHint(3155, 4352);
}

function enableGL3D() {
    GL11.glPushMatrix();
    GL11.glEnable(0x0BE2);
    GL11.glBlendFunc(0x0302, 0x0303);
    GL11.glShadeModel(0x1D01);
    GL11.glDisable(0x0DE1);
    GL11.glEnable(0x0B20);
    GL11.glDisable(0x0B71);
    GL11.glDisable(0x0B50);
    GL11.glDepthMask(false);
    GL11.glHint(0x0C52, 0x1102);
}

function disableGL3D() {
    GL11.glDepthMask(true);
    GL11.glEnable(0x0B71);
    GL11.glDisable(0x0B20);
    GL11.glEnable(0x0DE1);
    GL11.glDisable(0x0BE2);
    GL11.glPopMatrix();
    GL11.glColor4f(1, 1, 1, 1);
}

load("nashorn:mozilla_compat.js");
importPackage("org.lwjgl.util.vector");

var AxisAlignedBB = Java.type("net.minecraft.util.AxisAlignedBB");
var Vec3 = Java.type("net.minecraft.util.Vec3");

/**
 * @static
 * @param {number[]} vec2f
 * @param {number} rad
 * @returns {number[]}
 */
function rotate(vec2, rad) {
    var sin = Math.sin(rad),
        cos = Math.cos(rad);
    return [
        vec2[0] * cos - vec2[1] * sin,
        vec2[0] * sin + vec2[1] * cos,
    ];
}

/**
 * @param {AxisAlignedBB} box
 */
function getCenter(box) {
    return new Vec3((box.maxX + box.minX) * 0.5, (box.maxY + box.minY) * 0.5, (box.maxZ + box.minZ) * 0.5);
}
