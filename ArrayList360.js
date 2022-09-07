var script = registerScript({
	name: "ArrayList360",
	version: "0",
	authors: ["wcnmd"] //OMG XPOSED :(
});

script.registerModule({
	name: "ArrayList",
	category: "Fun",
	description: "cnm"
}, function (module) {
	var RenderUtils = Java.type("net.ccbluex.liquidbounce.utils.render.RenderUtils");
	var ScaledResolution = Java.type("net.minecraft.client.gui.ScaledResolution");
	var Module = Java.type("net.ccbluex.liquidbounce.features.module.Module");
	var md = Java.type("net.ccbluex.liquidbounce.LiquidBounce").moduleManager;
	var ArrayList = Java.type("java.util.ArrayList");
	var Color = Java.type("java.awt.Color");
	var modules = new ArrayList(Module);
	var mdl = md.getModules();
	module.on("render2D", function(){
		var sc = new ScaledResolution(mc);
		var font = mc.fontRendererObj;
		modules = new ArrayList(mdl);
		modules.removeIf(function (i){
			return !i.getState();
		});
		modules.sort(function (a, b){
			return Java.type("java.lang.Float").compare(font.getStringWidth(b.getTagName()), font.getStringWidth(a.getTagName()));
		});
		var y = 5;
		for (var i = 0; i < modules.size(); i++) {
			var m = modules.get(i);
			var pm = modules.get(i > 0 ? i - 1 : 0);
			var x = -font.getStringWidth(m.getTagName()) - 5 + sc.getScaledWidth();
			var pX = -font.getStringWidth(pm.getTagName()) - 4 + sc.getScaledWidth();
			var co = sk(i, 3, 0.6).getRGB();
			RenderUtils.drawRect(x - 5, y - 5, x + sc.getScaledWidth(), y + font.FONT_HEIGHT + 2 - 5, new Color(255,255,255,0));
			RenderUtils.drawRect(x - 5, y - 5, x - 4, y + font.FONT_HEIGHT + 2 - 5, co);
			if(m != modules.get(0)){
				RenderUtils.drawRect(pX - 5, y - 5, x - 5, y - 2, co);
			}
			if(m == modules.get(modules.size() - 1)){
				RenderUtils.drawRect(x - 1, y + font.FONT_HEIGHT + 1 - 5, sc.getScaledWidth(), y + font.FONT_HEIGHT + 2 - 5, co)
			}
			font.drawString(m.getTagName(), parseInt(x + 1), parseInt(y - 7), co);
			y += font.FONT_HEIGHT - 1.5;
		}
		font.drawString("dmVyeSBleHBlY3RlZCBuZ2wgLSBPcmFuZ2VDYXQ", sc.getScaledWidth(), y);
	});
	function sk(c, brightness, saturation) {
		var v1 = Java.type("java.lang.Math").ceil(Java.type("java.lang.System").currentTimeMillis() + (c * 109)) / 5;
		return Color.getHSBColor(((v1 %= 3090.0) / 3090.0) < 0.5 ? -(v1 / 3090.0) : v1 / 3090.0, saturation, brightness);
	}
});