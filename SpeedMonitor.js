/// api_version=2
var script = registerScript({
	name: "SpeedMonitor",
	version: "1.0",
	authors: ["liulihaocai"]
}); 

var Fonts = Java.type("net.ccbluex.liquidbounce.ui.font.Fonts");
var Color = Java.type("java.awt.Color");
var ScaledResolution = Java.type("net.minecraft.client.gui.ScaledResolution");
var White = new Color(255, 255, 255).getRGB();

script.registerModule({
	name: "SpeedMonitor",
	description: "show your speed",
    category: "Render",
}, function (module) {
    var lastX,lastZ,mcWidth,mcHeight,speedStr="0 blocks/s";
	
    module.on("update", function () {
		var SR = new ScaledResolution(mc)
		mcWidth=SR.getScaledWidth();
		mcHeight=SR.getScaledHeight();
        speedStr=(Math.sqrt(Math.pow(lastX-mc.thePlayer.posX,2)+Math.pow(lastZ-mc.thePlayer.posZ,2))*20).toFixed(2)+" blocks/s";
        lastX=mc.thePlayer.posX;
        lastZ=mc.thePlayer.posZ;
    })
    
    module.on("render2D", function() {
		Fonts.minecraftFont.drawString(speedStr,(mcWidth/2)-20,(mcHeight/2)+30,White);
	})
})