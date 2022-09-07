(script = registerScript({
    name: "DamageParticles",
    authors: ["Lucien.ci & K.Kirisame"],
    version: "1.1"
})).import("Core.lib");

GL11 = Java.type("org.lwjgl.opengl.GL11");
GlStateManager = Java.type("net.minecraft.client.renderer.GlStateManager");

function Particle(location, text) {
    this.ticks = 0;
    this.location = location;
    this.text = text;
}

ArrayList = Java.type("java.util.ArrayList");
HashMap = Java.type("java.util.HashMap");

var particles = new ArrayList();
var healthMap = new HashMap();

module = {
    name: "DamageParticles",
    category: "Render",
    values: [
        livingTicks = value.createInteger("LivingTicks", 20, 10, 80)
    ],
    onUpdate: function() {
        for (var i in mc.theWorld.loadedEntityList) {
            var entity = mc.theWorld.loadedEntityList[i];
            if (entity == mc.thePlayer || !(entity instanceof Java.type("net.minecraft.entity.EntityLivingBase"))) continue;

            if (!healthMap[entity]) {
                healthMap[entity] = entity.getHealth();
                continue;
            }

            var health1 = healthMap[entity], health = entity.getHealth();

            if (health1 == health) continue;

            var text = health1 < health ? "\247a" + (Math.round((health - health1) * 10) * 0.1).toFixed(1) : "\247e" + (Math.round((health1 - health) * 10) * 0.1).toFixed(1);

            var location = [
                entity.posX + Math.random() * 0.5 * (Math.random() > 0.5 ? -1 : 1),
                entity.getEntityBoundingBox().minY + (entity.getEntityBoundingBox().maxY - entity.getEntityBoundingBox().minY) * 0.5,
                entity.posZ + Math.random() * 0.5 * (Math.random() > 0.5 ? -1 : 1)
            ];

            particles.add(new Particle(location, text));
            healthMap[entity] = entity.getHealth();
        }

        particles.forEach(function(update) {
            ++update.ticks;
            update.ticks <= 10 && (update.location[1] += update.ticks * 0.005);
            update.ticks > livingTicks.get() && particles.remove(update);
        });
    },
    onRender3D: function(e) {
        for (var i in particles) {
            var p = particles[i];

            GlStateManager.pushMatrix();
            GlStateManager.enablePolygonOffset();
            GlStateManager.doPolygonOffset(1, -1500000);
            
            GlStateManager.translate(p.location[0] - mc.getRenderManager().renderPosX, p.location[1] - mc.getRenderManager().renderPosY, p.location[2] - mc.getRenderManager().renderPosZ);
            
            GlStateManager.rotate(-mc.getRenderManager().playerViewY, 0, 1, 0);
            GlStateManager.rotate(mc.getRenderManager().playerViewX, mc.gameSettings.thirdPersonView == 2 ? -1 : 1, 0, 0);

            GlStateManager.scale(-0.03, -0.03, 0.03);
            GL11.glDepthMask(false);
            mc.fontRendererObj.drawStringWithShadow(p.text, -mc.fontRendererObj.getStringWidth(p.text) * 0.5, -mc.fontRendererObj.FONT_HEIGHT + 1, 0);
            GL11.glColor4f(1, 1, 1, 1);
            GL11.glDepthMask(true);
            GlStateManager.doPolygonOffset(1, 1500000);
            GlStateManager.disablePolygonOffset();
            GlStateManager.popMatrix();
        }
    }
};