var RenderUtils = Java.type('net.ccbluex.liquidbounce.utils.render.RenderUtils');
var KillAura = moduleManager.getModule('KillAura');
var GL11 = Java.type('org.lwjgl.opengl.GL11');
var Color = Java.type('java.awt.Color');
var script = registerScript({
	name: 'Circle',
	version: '1.0',
	authors: ['Shurpe']
});
script.registerModule({
	name: 'Circle',
	description: '',
    category: 'Fun',
    settings: {
        r: Setting.integer({
            name: "Red",
            default: 255,
            min: 0,
            max: 255
        }),
        g: Setting.integer({
            name: "Green",
            default: 255,
            min: 0,
            max: 255
        }),
        b: Setting.integer({
            name: "Blue",
            default: 255,
            min: 0,
            max: 255
        }),
        al: Setting.integer({
            name: "Alpha",
            default: 155,
            min: 0,
            max: 255
        })
    }
}, function (module) {
    module.on('render3D', function() {
        if (KillAura.getState()) {
            var rangeValue = KillAura.getValue('Range').get().toFixed(2)
            GL11.glPushMatrix();
            GL11.glTranslated(
                mc.thePlayer.lastTickPosX + (mc.thePlayer.posX - mc.thePlayer.lastTickPosX) * mc.timer.renderPartialTicks - mc.getRenderManager().renderPosX,
                mc.thePlayer.lastTickPosY + (mc.thePlayer.posY - mc.thePlayer.lastTickPosY) * mc.timer.renderPartialTicks - mc.getRenderManager().renderPosY,
                mc.thePlayer.lastTickPosZ + (mc.thePlayer.posZ - mc.thePlayer.lastTickPosZ) * mc.timer.renderPartialTicks - mc.getRenderManager().renderPosZ
            )
            GL11.glEnable(GL11.GL_BLEND);
            GL11.glEnable(GL11.GL_LINE_SMOOTH);
            GL11.glDisable(GL11.GL_TEXTURE_2D);
            GL11.glDisable(GL11.GL_DEPTH_TEST);
            GL11.glBlendFunc(GL11.GL_SRC_ALPHA, GL11.GL_ONE_MINUS_SRC_ALPHA);
            
            GL11.glLineWidth(1);
            RenderUtils.glColor(new Color(module.settings.r.get(), module.settings.g.get(), module.settings.b.get(), module.settings.al.get()));
            GL11.glRotatef(90, 1, 0, 0);
            GL11.glBegin(GL11.GL_LINE_STRIP);
    
            for (i = 0; i <= 360; i += 60) { // You can change circle accuracy  (60 - accuracy)
                GL11.glVertex2f(Math.cos(i * Math.PI / 180) * rangeValue, (Math.sin(i * Math.PI / 180) * rangeValue));
            }
    
            GL11.glEnd();
    
            GL11.glDisable(GL11.GL_BLEND);
            GL11.glEnable(GL11.GL_TEXTURE_2D);
            GL11.glEnable(GL11.GL_DEPTH_TEST);
            GL11.glDisable(GL11.GL_LINE_SMOOTH);
    
            GL11.glPopMatrix();
        }
    });
});