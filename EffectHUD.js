/// api_version=2
/// engine_flags=-ot=true
var script = registerScript({
    name: "EffectHUD",
    version: "1.21",
    authors: ["dddkj"]
});

var DefaultVertexFormats = Java.type('net.minecraft.client.renderer.vertex.DefaultVertexFormats');
var GlStateManager = Java.type('net.minecraft.client.renderer.GlStateManager');
var WorldRenderer = Java.type('net.minecraft.client.renderer.WorldRenderer');
var ResourceLocation = Java.type("net.minecraft.util.ResourceLocation");
var Tessellator = Java.type('net.minecraft.client.renderer.Tessellator');
var PotionEffect = Java.type('net.minecraft.potion.PotionEffect');
var IInventory = Java.type('net.minecraft.inventory.IInventory');
var I18n = Java.type('net.minecraft.client.resources.I18n');
var Potion = Java.type('net.minecraft.potion.Potion');
var Collection = Java.type('java.util.Collection');
var Color = Java.type('java.awt.Color');
var Gui = Java.type('net.minecraft.client.gui.Gui');

script.import("lib/systemFunctions.js");
script.import("lib/glFunctions.js");

function drawRectWithSmoothCorner(paramXStart, paramYStart, paramXEnd, paramYEnd, radius, color) {	
	var xStart = paramXStart;
	var yStart = paramYStart;
	var xEnd = paramXEnd;
	var yEnd = paramYEnd;
	var x1 = xStart + radius;
	var y1 = yStart + radius;
	var x2 = xEnd - radius;
	var y2 = yEnd - radius;
	
	drawRect(x1, y1, x2, y2, color);//??
	drawRect(x1, yStart, x2, y1, color);//?
	drawRect(x1, y2, x2, yEnd, color);//?
	drawRect(xStart, y1, x1, y2, color);//?
	drawRect(x2, y1, xEnd, y2, color);//?
	drawSector(x2, y2, radius, 0, 90, color);
	drawSector(x2, y1, radius, 90, 180, color);
	drawSector(x1, y1, radius, 180, 270, color);
	drawSector(x1, y2, radius, 270, 360, color);
}

function drawSector(paramX, paramY, radius, angleStart, angleEnd, color) {
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
	GL11.glVertex2d(paramX, paramY);
    for (var i = angleStart; i <= angleEnd; i++)
        GL11.glVertex2d(paramX + Math.sin(i * Math.PI / 180) * radius, paramY + Math.cos(i * Math.PI / 180) * radius);
    GL11.glEnd();
    GL11.glPopMatrix();
    GL11.glEnable(GL11.GL_TEXTURE_2D);
    GL11.glDisable(GL11.GL_BLEND);
    GL11.glDisable(GL11.GL_LINE_SMOOTH);
    GL11.glColor4f(1, 1, 1, 1);
}

function drawTexturedModalRect(x, y, textureX, textureY, width, height) {
	var f = 0.00390625;
	var f1 = 0.00390625;
	var tessellator = Tessellator.getInstance();
	var worldrenderer = tessellator.getWorldRenderer();
	worldrenderer.begin(7, DefaultVertexFormats.POSITION_TEX);
	worldrenderer.pos(x + 0, y + height, 0.0).tex((textureX + 0) * f, (textureY + height) * f1).endVertex();
	worldrenderer.pos(x + width, y + height, 0.0).tex((textureX + width) * f, (textureY + height) * f1).endVertex();
	worldrenderer.pos(x + width, y + 0, 0.0).tex((textureX + width) * f, (textureY + 0) * f1).endVertex();
	worldrenderer.pos(x + 0, y + 0, 0.0).tex((textureX + 0) * f, (textureY + 0) * f1).endVertex();
	tessellator.draw();
		}

var inventoryBackground = new ResourceLocation("textures/gui/container/inventory.png");

script.registerModule({
    name: "EffectHUD",
    category: "Render",
    description: "Render a effect HUD.",
    settings: {
        renderBackground: Setting.boolean({
            name: "RenderBackground",
            default: true
        }),
		narrow: Setting.boolean({
            name: "NarrowOnFull",
            default: false
        }),
		color: Setting.boolean({
            name: "EffectColor",
            default: true
        }),
		x: Setting.integer({
            name: "xCoord",
			min: 0,
			max: getScaledWidth(),
            default: getScaledWidth() / 2
        }),
		y: Setting.integer({
            name: "yCoord",
			min: 0,
			max: getScaledHeight(),
            default: getScaledHeight() / 2
        }),
		scale: Setting.float({
            name: "Scale",
			min: 0.1,
			max: 5.0,
            default: 1.0
        }),
		space: Setting.integer({
            name: "Space",
			min: 0,
			max: 10,
            default: 1
        }),
		bgMode: Setting.list({
            name: "BackGroundTheme",
			values: ["ResourcePack", "Custom"],
            default: "ResourcePack"
        }),
		customR: Setting.integer({
            name: "CustomTheme_R",
			min: 0,
			max: 255,
            default: 255
        }),
		customG: Setting.integer({
            name: "CustomTheme_G",
			min: 0,
			max: 255,
            default: 255
        }),
		customB: Setting.integer({
            name: "CustomTheme_B",
			min: 0,
			max: 255,
            default: 255
        }),
		customA: Setting.integer({
            name: "CustomTheme_A",
			min: 1,
			max: 255,
            default: 180
        }),
		customRadius: Setting.integer({
            name: "CustomTheme_CornerRadius",
			min: 0,
			max: 10,
            default: 3
        }),
		direction: Setting.list({
            name: "Direction",
			values: ["Up", "Down"],
            default: "Down"
        })
    }
}, function(module) {

    module.on("render2D", function(e) {
		var Scale = module.settings.scale.get();
		var customColor = new Color(module.settings.customR.get(), module.settings.customG.get(), module.settings.customB.get(), module.settings.customA.get()).getRGB();
		if (!(mc.currentScreen != null && mc.currentScreen instanceof IInventory)) {
			GlStateManager.pushMatrix();
			GlStateManager.scale(Scale, Scale, Scale);
			//var i = 0.0;
			//var j = 0.0;
			var i = module.settings.x.get() / Scale;
			var j = module.settings.y.get() / Scale;
			//GlStateManager.translate(i2, j2, 0.1);
			
			var collection = mc.thePlayer.getActivePotionEffects();
			var collection1 = mc.thePlayer.getActivePotionEffects().toArray();
			if (!collection.isEmpty()) {
				GlStateManager.disableLighting();
				var l = 32 + module.settings.space.get();
				if (collection.size() > 5 && module.settings.narrow.get()) {
					l = 132 / (collection.size() - 1);
				}
				
				
				for (I11i in collection1) {
					mc.getTextureManager().bindTexture(inventoryBackground);
				    GlStateManager.color(1.0, 1.0, 1.0, 1.0)
					var potioneffect = collection1[I11i];
					var potion = Potion.potionTypes[potioneffect.getPotionID()];

					if (module.settings.renderBackground.get()) {
						if(module.settings.bgMode.get() == "ResourcePack")
							drawTexturedModalRect(i, j, 0, 166, 140, 32);
						else {
							drawRectWithSmoothCorner(i, j, i + 120, j + 32, module.settings.customRadius.get(), customColor);
						}
					}
					if (potion.hasStatusIcon()) {
						var i1 = potion.getStatusIconIndex();
						drawTexturedModalRect(i + 6, j + 7, 0 + (i1 % 8) * 18, 198 + parseInt(i1 / 8) * 18, 18, 18);
					}
					var s1 = I18n.format(potion.getName());
					if(potioneffect.getAmplifier() == 0)  s1 = s1 + " I";
					else if (potioneffect.getAmplifier() == 1) s1 = s1 + " II";
					else if (potioneffect.getAmplifier() == 2) s1 = s1 + " III";
					else if (potioneffect.getAmplifier() == 3) s1 = s1 + " IV";
					else if (potioneffect.getAmplifier() == 4) s1 = s1 + " V";
					else if (potioneffect.getAmplifier() == 5) s1 = s1 + " VI";
					else if (potioneffect.getAmplifier() == 6) s1 = s1 + " VII";
					else if (potioneffect.getAmplifier() == 7) s1 = s1 + " VIII";
					else if (potioneffect.getAmplifier() == 8) s1 = s1 + " IX";
					else if (potioneffect.getAmplifier() == 9) s1 = s1 + " X";
					else if (potioneffect.getAmplifier() >= 10) s1 = s1 + " X+";
					else s1 = s1 + "?";

					//Fonts.font40.drawString("s1", i + 10 + 18, j + 6, (color.get() ? potion.getLiquidColor() : 16777215));
					mc.fontRendererObj.drawStringWithShadow(s1, i + 10 + 18, j + 6, (module.settings.color.get() ? potion.getLiquidColor() : 16777215));
					var s = Potion.getDurationString(potioneffect);
					mc.fontRendererObj.drawStringWithShadow(s, i + 10 + 18, j + 16, 8355711);
					if (module.settings.direction.get() == "Down") 
						j += l;
					else j -= l;
				}
			}
			GlStateManager.popMatrix();
		}
    });
});