
/// api_version=2
var script = registerScript({
    name: "BPSCounter",
    version: "1.0",
    authors: ["chocopie"]
});
var Fonts = Java.type("net.ccbluex.liquidbounce.ui.font.Fonts");
var ScaledResolution = Java.type("net.minecraft.client.gui.ScaledResolution");
var Color = Java.type("java.awt.Color");
var MathHelper = Java.type("net.minecraft.util.MathHelper")

script.registerModule({
    name: "BPSCounter",
    category: "Render", 
    description: "shows your BPS",
	tag: "sigma hatar",

}, function (BPSCounter) {
    BPSCounter.on("render2D", function(event) {
        var mcHeight = getScaledHeight();
        var mcWidth = getScaledWidth();
	Fonts.font40.drawStringWithShadow("BPS: " + getBPS().toFixed(1),  mcWidth/2-19, mcHeight/2+12, 0xFFFFFF);
    });
});

function getDistance(x,z) {
    xSpeed = mc.thePlayer.posX - x;
    zSpeed = mc.thePlayer.posZ - z;
    return MathHelper.sqrt_double(xSpeed * xSpeed + zSpeed * zSpeed);
}

function getBPS() {
    if(mc.thePlayer==null || mc.thePlayer.ticksExisted < 1) {
	return 0;
    }
	return getDistance(mc.thePlayer.lastTickPosX,mc.thePlayer.lastTickPosZ) * (20 * mc.timer.timerSpeed);
}

function getScaledWidth() {
    var scaledWidth = new ScaledResolution(mc).getScaledWidth();

    return scaledWidth;
}

function getScaledHeight() {
    var scaledHeight = new ScaledResolution(mc).getScaledHeight();

    return scaledHeight;
}
