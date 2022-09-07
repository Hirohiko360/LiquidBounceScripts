var GL11 = Java.type("org.lwjgl.opengl.GL11");

// Draws a rect on the screen.
function drawRect(paramXStart, paramYStart, paramXEnd, paramYEnd, color) {
    var alpha = (color >> 24 & 0xFF) / 255;
    var red = (color >> 16 & 0xFF) / 255;
    var green = (color >> 8 & 0xFF) / 255;
    var blue = (color & 0xFF) / 255;

    GL11.glEnable(GL11.GL_BLEND);
    GL11.glDisable(GL11.GL_TEXTURE_2D);
    GL11.glBlendFunc(GL11.GL_SRC_ALPHA, GL11.GL_ONE_MINUS_SRC_ALPHA);
    GL11.glEnable(GL11.GL_LINE_SMOOTH);

    GL11.glPushMatrix();
    GL11.glColor4f(red, green, blue, alpha);
    GL11.glBegin(GL11.GL_TRIANGLE_FAN);
    GL11.glVertex2d(paramXEnd, paramYStart);
    GL11.glVertex2d(paramXStart, paramYStart);
    GL11.glVertex2d(paramXStart, paramYEnd);
    GL11.glVertex2d(paramXEnd, paramYEnd);

    GL11.glEnd();
    GL11.glPopMatrix();

    GL11.glEnable(GL11.GL_TEXTURE_2D);
    GL11.glDisable(GL11.GL_BLEND);
    GL11.glDisable(GL11.GL_LINE_SMOOTH);

    GL11.glColor4f(1, 1, 1, 1);
}

// Draws a circle on the screen.
function drawCircle(paramX, paramY, radius, color) {
    var alpha = (color >> 24 & 0xFF) / 255;
    var red = (color >> 16 & 0xFF) / 255;
    var green = (color >> 8 & 0xFF) / 255;
    var blue = (color & 0xFF) / 255;

    GL11.glColor4f(red, green, blue, alpha);
    GL11.glEnable(GL11.GL_BLEND);
    GL11.glDisable(GL11.GL_TEXTURE_2D);
    GL11.glBlendFunc(GL11.GL_SRC_ALPHA, GL11.GL_ONE_MINUS_SRC_ALPHA);
    GL11.glEnable(GL11.GL_LINE_SMOOTH);
    GL11.glPushMatrix();
    GL11.glLineWidth(1);
    GL11.glBegin(GL11.GL_POLYGON);
    for (var i = 0; i <= 360; i++)
        GL11.glVertex2d(paramX + Math.sin(i * Math.PI / 180) * radius, paramY + Math.cos(i * Math.PI / 180) * radius);
    GL11.glEnd();
    GL11.glPopMatrix();
    GL11.glEnable(GL11.GL_TEXTURE_2D);
    GL11.glDisable(GL11.GL_BLEND);
    GL11.glDisable(GL11.GL_LINE_SMOOTH);
    GL11.glColor4f(1, 1, 1, 1);
}
