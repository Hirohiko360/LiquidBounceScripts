var scriptName = "NameTags";
var scriptAuthor = "Wu_dian";
var scriptVersion = 1.0;

var C02PacketUseEntity = Java.type('net.minecraft.network.play.client.C02PacketUseEntity');
var C03PacketPlayer = Java.type('net.minecraft.network.play.client.C03PacketPlayer');
var C04PacketPlayerPosition = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition')
var C05PacketPlayerLook = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook');
var C06PacketPlayerPosLook = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook');
var C07PacketPlayerDigging = Java.type('net.minecraft.network.play.client.C07PacketPlayerDigging');
var C08PacketPlayerBlockPlacement = Java.type('net.minecraft.network.play.client.C08PacketPlayerBlockPlacement');
var S02PacketChat = Java.type('net.minecraft.network.play.server.S02PacketChat');
var EntityPlayer = Java.type('net.minecraft.entity.player.EntityPlayer');
var GL11 = Java.type("org.lwjgl.opengl.GL11");
var RenderManager = Java.type("net.minecraft.client.renderer.entity.RenderManager")
var GlStateManager = Java.type("net.minecraft.client.renderer.GlStateManager")
var Framebuffer = Java.type("net.minecraft.client.shader.Framebuffer")
var EXTFramebufferObject = Java.type("org.lwjgl.opengl.EXTFramebufferObject")
var EXTPackedDepthStencil = Java.type("org.lwjgl.opengl.EXTPackedDepthStencil")
var OpenGlHelper = Java.type("net.minecraft.client.renderer.OpenGlHelper")
var Tessellator = Java.type("net.minecraft.client.renderer.Tessellator")
var ResourceLocation = Java.type("net.minecraft.util.ResourceLocation")
var WorldRenderer = Java.type("net.minecraft.client.renderer.WorldRenderer")
var TextureAtlasSprite = Java.type("net.minecraft.client.renderer.texture.TextureAtlasSprite")
script.import("lib/glFunctions.js");
script.import("lib/systemFunctions.js")
function SHealth() {

	function drawHealth(entity) {
		

		
		var color = "0xFF" + healthColor(entity.getHealth(), entity.getMaxHealth())
		
		var location = toPercent(entity.getHealth(), entity.getMaxHealth())
		
		drawRect(50, -55, -50, -80, 0x7E000000); //Bottom
		drawRect(-50+location, -55, -50, -57, color); //COLOR RECT
		

		
	}

	//I think I copied that from Hypnohacks
	function draw2DESP(entity, x, y, z){
		var scale = (0.09 + mc.thePlayer.getDistance(entity.posX, entity.posY, entity.posZ) / 10000.0)
		GL11.glPushMatrix();
		GL11.glTranslatef(x, y, z);
		GL11.glNormal3f(0.0, 1.0, 0.0);
	
		GlStateManager.rotate(-mc.thePlayer.rotationYaw, 0.0, 1.0, 0.0);
		GL11.glScalef(-scale, -scale, scale);
		GL11.glDisable(2896);
		GL11.glDisable(2929);
		GL11.glEnable(3042);
		GL11.glBlendFunc(770, 771);
		GL11.glScaled(0.5, 0.5, 0.5);
		drawHealth(entity);
		var strname = entity.getDisplayName().getFormattedText()
		GL11.glScaled(0.9, 0.9, 0.9);
		mc.fontRendererObj.drawStringWithShadow(strname,-50,-83,0xFFFFFFFF); //渲染名字
		GL11.glScaled(0.7, 0.7, 0.7);
		mc.fontRendererObj.drawStringWithShadow("Health:"+parseInt(entity.getHealth()),-70.5,-102,0xFFFFFFFF); //渲染血量
		
		GL11.glDisable(3042);
		GL11.glEnable(2929);
		GL11.glEnable(2896);
		GL11.glColor4f(1.0, 1.0, 1.0, 1.0);
		GL11.glPopMatrix();
	}

    this.getName = function() {
        return "NewNameTags";
    };

    this.getDescription = function() {
        return "Renders a healthbar";
    };

    this.getCategory = function() {
        return "Fun";
	};

	this.onEnable = function() {

	}

	this.onDisable = function() {
	}
	var invis = value.createBoolean("Invisible", true)
	this.addValues = function(values) {
		values.add(invis);

	}

	this.onRender3D = function(event) {

		for (var i in mc.theWorld.loadedEntityList){
			var entity = mc.theWorld.loadedEntityList[i]
	
			if (entity instanceof EntityPlayer && entity != mc.thePlayer  && (invis.get() || !entity.isInvisible())){
				draw2DESP(entity, get3DPosX(entity), get3DPosY(entity), get3DPosZ(entity))
			}
		}


	}		
}
function toPercent(num, total) { 
    return (Math.round(num / total * 10000) / 100 );
}

function healthColor(health, maxhealth){
	if (health > (maxhealth / 2)){
		var r = parseInt((maxhealth - health) * (255/maxhealth) * 2)
		r = ('0' + r.toString(16)).slice(-2)
	}else{
		var r = 255
		r = ('0' + r.toString(16)).slice(-2)
	}
	if (health < (maxhealth / 2)){
		var g = 255 - parseInt(((maxhealth / 2) - health) * (255/maxhealth) * 2)
		g =  ('0' + g.toString(16)).slice(-2)
	}else{
		var g = 255
		g =  ('0' + g.toString(16)).slice(-2)
	}
	var b = 0
	return  r + g + "00" 
}
function get3DPosX(entity){
	var x = (entity.lastTickPosX + (entity.posX - entity.lastTickPosX) * mc.timer.renderPartialTicks) - mc.getRenderManager().renderPosX;
	return x
}

function get3DPosY(entity){
	var y = (entity.lastTickPosY + (entity.posY - entity.lastTickPosY) * mc.timer.renderPartialTicks) - mc.getRenderManager().renderPosY;
	return y
}

function get3DPosZ(entity){
	var z = (entity.lastTickPosZ + (entity.posZ - entity.lastTickPosZ) * mc.timer.renderPartialTicks) - mc.getRenderManager().renderPosZ;
	return z
}
var sHealth = new SHealth();
var SHealthClient;
function onLoad() {}
function onEnable() {
	SHealthClient = moduleManager.registerModule(sHealth);
}

function onDisable() {
	moduleManager.unregisterModule(SHealthClient);
}