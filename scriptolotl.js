var scriptName = "scriptolotl"; 
var scriptVersion = 1.45; 
var scriptAuthor = "scorpion3013";



var C02PacketUseEntity = Java.type('net.minecraft.network.play.client.C02PacketUseEntity');
var C03PacketPlayer = Java.type('net.minecraft.network.play.client.C03PacketPlayer');
var C04PacketPlayerPosition = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition')
var C05PacketPlayerLook = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook');
var C06PacketPlayerPosLook = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook');
var C07PacketPlayerDigging = Java.type('net.minecraft.network.play.client.C07PacketPlayerDigging');
var C08PacketPlayerBlockPlacement = Java.type('net.minecraft.network.play.client.C08PacketPlayerBlockPlacement');
var C09PacketHeldItemChange = Java.type('net.minecraft.network.play.client.C09PacketHeldItemChange');

var S02PacketChat = Java.type('net.minecraft.network.play.server.S02PacketChat');
var S12PacketEntityVelocity = Java.type('net.minecraft.network.play.server.S12PacketEntityVelocity');
var S27PacketExplosion = Java.type('net.minecraft.network.play.server.S27PacketExplosion');


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
//var Gui = Java.type("net.minecraft.client.gui.Gui")

var BlockPos = Java.type('net.minecraft.util.BlockPos');
var EnumFacing = Java.type('net.minecraft.util.EnumFacing');
var Vec3 = Java.type('net.minecraft.util.Vec3');


script.import("lib/glFunctions.js");
script.import("lib/systemFunctions.js")

function getClosestEntity(){
	var filteredEntites = []
	for (var i in mc.theWorld.loadedEntityList){
		var entity = mc.theWorld.loadedEntityList[i]

		if (entity instanceof EntityPlayer && entity !=mc.thePlayer){
			filteredEntites.push(entity)
		}
	}
	filteredEntites.sort(function(a, b){
		var distanceA = mc.thePlayer.getDistanceToEntity(a)
		var distanceB = mc.thePlayer.getDistanceToEntity(b)

		return distanceB - distanceA;
	})
	return filteredEntites[filteredEntites.length - 1]
}

function getDistanceToClosestEntity(){
	return mc.thePlayer.getDistanceToEntity(getClosestEntity())
}


function mineplexHP(playername){
	var scoreboard = mc.theWorld.getScoreboard()
	for (var i in mc.theWorld.loadedEntityList){
		var entity = mc.theWorld.loadedEntityList[i]
		if (entity instanceof EntityPlayer && entity !=mc.thePlayer){
			var scorpion = scoreboard.getObjectivesForEntity(entity.getGameProfile().getName())

			for (var key in scorpion) {
				//chat.print(entity.getGameProfile().getName() + "   " + key.getDisplayName() + "  " + scorpion[key].getScorePoints())
				if (entity.getGameProfile().getName() == playername){
					return Number(scorpion[key].getScorePoints()) * 2
				}
			}
		}
	}
	return 0
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



function SDerpScorp() {

    this.getName = function() {
        return "SDerp";
    };

    this.getDescription = function() {
        return "A better derp";
    };

    this.getCategory = function() {
        return "Fun";
	};

	this.onEnable = function() {
	}

	this.onDisable = function() {
		YawTimer = 0
		PitchTimer = 0
		SafeModeTimer = 0
	}

	var YawTimer = 0
	var PitchTimer = 0
	var lastSpin = 0
	var SafeModeTimer = 0
	
	var killAuraModule = moduleManager.getModule("KillAura");
	var scaffoldModule = moduleManager.getModule("Scaffold")
	var towerModule = moduleManager.getModule("Tower")

	this.onUpdate = function() {

		if (SafeMode.get()){
			if (killAuraModule.getState()){
				if (killAuraModule.getValue("Range").get() + 1 > getDistanceToClosestEntity()){
					SafeModeTimer = SafeTime.get()
				}
			}
			if (scaffoldModule.getState()){
				if (scaffoldModule.getValue("Rotations").get()){
					SafeModeTimer = SafeTime.get()
				}
			}
			if (towerModule.getState()){
				if (towerModule.getValue("Rotations").get()){
					SafeModeTimer = SafeTime.get()
				}
			}


			if (SafeModeTimer != 0){
				SafeModeTimer = SafeModeTimer - 1
			}
		}else{
			SafeModeTimer = 0
		}

	}

	var Yaw = value.createList("Yaw", ["Static", "Offset", "Random", "Jitter", "Spin"], "Offset");
	var Pitch = value.createList("Pitch", ["Static", "Offset", "Random", "Jitter"], "Offset");
	var YawSet = value.createInteger("YawSet", 0, -180, 180);
	var PitchSet = value.createInteger("PitchSet", 0, -180, 180);
	var YawJitterTimer = value.createInteger("YawJitterTimer", 1, 1, 40);
	var PitchJitterTimer = value.createInteger("PitchJitterTimer", 1, 1, 40);
	var YawSpin = value.createInteger("YawSpin", 5, -50, 50);
	var SafeMode = value.createBoolean("SafeMode", false);
	var SafeTime = value.createInteger("SafeTime", 10, 1, 60);
	this.addValues = function(values) {
		values.add(Yaw);
		values.add(Pitch);
		values.add(YawSet);
		values.add(PitchSet);
		values.add(YawJitterTimer);
		values.add(PitchJitterTimer);
		values.add(YawSpin);
		values.add(SafeMode);
		values.add(SafeTime);
	}


    this.onPacket = function(event){
		var packet = event.getPacket();

		if (SafeMode.get()){
			if (packet instanceof C02PacketUseEntity || packet instanceof C07PacketPlayerDigging || packet instanceof C08PacketPlayerBlockPlacement){
				SafeModeTimer = SafeTime.get()
			}
		}
		
		if (SafeModeTimer == 0){
			if (packet instanceof C03PacketPlayer && !(packet instanceof C04PacketPlayerPosition) && !(packet instanceof C05PacketPlayerLook) && !(packet instanceof C06PacketPlayerPosLook)){
				mc.thePlayer.sendQueue.addToSendQueue(new C05PacketPlayerLook(mc.thePlayer.rotationYaw, mc.thePlayer.rotationPitch, packet.isOnGround()));
				event.cancelEvent()
			}


			if (packet instanceof C04PacketPlayerPosition){
				mc.thePlayer.sendQueue.addToSendQueue(new C06PacketPlayerPosLook(packet.getPositionX(), packet.getPositionY(), packet.getPositionZ(), mc.thePlayer.rotationYaw, mc.thePlayer.rotationPitch, packet.isOnGround()));
				event.cancelEvent()
			}
			if ((packet instanceof C06PacketPlayerPosLook) || (packet instanceof C05PacketPlayerLook)){  
				switch (Yaw.get()) {
					case "Static":
						packet.yaw = YawSet.get()
						break;
					case "Offset":
						packet.yaw = mc.thePlayer.rotationYaw + YawSet.get()
						break;
					case "Random":
						packet.yaw = Math.floor((Math.random() * 360) + -180)
						break;
					case "Jitter":
						YawTimer = YawTimer + 1
						if (YawTimer % (YawJitterTimer.get() * 2) >= YawJitterTimer.get()){
							packet.yaw = mc.thePlayer.rotationYaw
						}
						else {
							packet.yaw = mc.thePlayer.rotationYaw - 180
						}
						break;
					case "Spin":
						packet.yaw = lastSpin + YawSpin.get()
						lastSpin = packet.yaw
						break;
				}
				switch (Pitch.get()) {
					case "Static":
						packet.pitch = PitchSet.get()
						break;
					case "Offset":
						packet.pitch = mc.thePlayer.rotationPitch + PitchSet.get()
						break;
					case "Random":
						packet.pitch = Math.floor((Math.random() * 180) + -90)
						break;
					case "Jitter":
						PitchTimer = PitchTimer + 1
						if (PitchTimer % (PitchJitterTimer.get() * 2) >= PitchJitterTimer.get()){
							packet.pitch = 90
						}
						else {
							packet.pitch = -90
						}
						break;
				}
			}
		}
	}
}


function SAutoRegister() {

    this.getName = function() {
        return "SAutoRegister";
    };

    this.getDescription = function() {
        return "Autoregister for cracked servers";
    };

    this.getCategory = function() {
        return "Fun";
	};

	this.onEnable = function() {
	}

	this.onDisable = function() {
	}


	var Password = value.createText("Password", "H3lloScorp");
	this.addValues = function(values) {
		values.add(Password);
	}

	var pattLogin = "\/(l|L)ogin <.*>"
	var pattRegister = "\/(r|R)egister <.*> <.*>"
    this.onPacket = function(event){
		var packet = event.getPacket();
		if (packet instanceof S02PacketChat){
			var str = packet.getChatComponent().getUnformattedText()
			if (str.match(pattLogin)){
				mc.thePlayer.sendChatMessage("/login " + Password.get())
			}
			if (str.match(pattRegister)){
				mc.thePlayer.sendChatMessage("/register " + Password.get() + " " + Password.get())
			}

		}
		
	}
}

function SBlackHotBar() {

    this.getName = function () {
        return "SHotbar";
    };

    this.getDescription = function () {
        return "Renders a backhotbar";
    };

    this.getCategory = function () {
        return "Fun";
	};
	
	var colormode = value.createList("colormode", ["static", "rainbow"], "static");
	var color_r = value.createInteger("color_r", 255, 0, 255);
	var color_g = value.createInteger("color_g", 255, 0, 255);
	var color_b = value.createInteger("color_b", 255, 0, 255);
	var hurt_effect = value.createBoolean("hurt_effect", true);
	var rainbow_speed = value.createInteger("rainbow_speed", 20, 10, 100);
	var border_opacity = value.createInteger("border_opacity", 255, 0, 255);
	this.addValues = function(values) {
		values.add(colormode);
		values.add(color_r);
		values.add(color_g);
		values.add(color_b);
		values.add(hurt_effect);
		values.add(rainbow_speed);
		values.add(border_opacity);
	}

	var c	
	var borderColor
	var borderOpacity
    this.onEnable = function () {
       c = 0;
    }

    this.onUpdate = function () {
        if (mc.ingameGUI.getChatGUI().getChatOpen() == false) {
			borderOpacity = ("0" + border_opacity.get().toString(16)).slice(-2)
			switch(colormode.get()) {
				case "static":
				  borderColor = ('0' + color_r.get().toString(16)).slice(-2)  + ('0' + color_g.get().toString(16)).slice(-2)  + ('0' + color_b.get().toString(16)).slice(-2)
				  break;
				case "rainbow":
					r = parseInt((Math.sin(c + Math.PI) + 1) * 127.5);
					g = parseInt((Math.sin(c + (Math.PI / 2)) + 1) * 127.5);
					b = parseInt(((Math.sin(c) + 1) * 127.5));
					c = c + rainbow_speed.get() / 500;
					borderColor = ('0' + r.toString(16)).slice(-2)  + ('0' + g.toString(16)).slice(-2)  + ('0' + b.toString(16)).slice(-2)
					if (44 < c){
						c = 0
					}
				  	break;
			  }
			  if (hurt_effect.get()){
				  if (mc.thePlayer.hurtTime != 0){
					borderColor = "ff0000"
				  }
			  }

        }
    }

    this.onRender2D = function () {
        if (mc.ingameGUI.getChatGUI().getChatOpen() == false) {
			var thicc = 2;
            var mcHeight = getScaledHeight();
            var mcWidth = getScaledWidth();
            var mcPOSX = parseInt(mc.thePlayer.posX);
            var mcPOSY = parseInt(mc.thePlayer.posY);
            var mcPOSZ = parseInt(mc.thePlayer.posZ);
            var borderColorComplete = '0x' + borderOpacity + borderColor;
            drawRect(thicc, mcHeight - 23 + thicc, mcWidth - thicc, mcHeight - thicc, 0x7E000000); //innerRect
            
            drawRect(thicc, mcHeight - thicc, mcWidth - thicc, mcHeight, borderColorComplete); //bottomRect
            drawRect(thicc, mcHeight - 23, mcWidth - thicc, mcHeight - 23 + thicc, borderColorComplete); //topRect
            
            drawRect(0, mcHeight - 23, thicc, mcHeight, borderColorComplete); //leftRect
            drawRect(mcWidth - thicc, mcHeight - 23, mcWidth, mcHeight, borderColorComplete); //rightRect


            mc.fontRendererObj.drawStringWithShadow('PosX: ' + mcPOSX + '  PosY: ' + mcPOSY + '  PosZ: ' + mcPOSZ, 4, mcHeight - 11, 0xf7f7f7);
            mc.fontRendererObj.drawStringWithShadow('Name: ' + mc.getSession().getUsername() + '  ' , 4, mcHeight - 20, 0xf7f7f7);
            var d = new Date();
            var month = d.getMonth() + 1

            var datestringEU = 'Date: ' + ('0' + d.getDate()).slice(-2) + '/' + ('0' + month).slice(-2) + '/' + d.getFullYear();

            mc.fontRendererObj.drawStringWithShadow(datestringEU, mcWidth - 90  , mcHeight - 11, 0xf7f7f7);
            var timestring= 'Time: ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
            mc.fontRendererObj.drawStringWithShadow(timestring, mcWidth - 90  , mcHeight - 20, 0xf7f7f7);
            
        }

    }
}

function SCubeJoin() {

    this.getName = function() {
        return "SCubeJoin";
    };

    this.getDescription = function() {
        return "Clicks the Play Again button in cubecraft";
    };

    this.getCategory = function() {
        return "Fun";
	};

	this.onEnable = function() {
	}

	this.onDisable = function() {
	}

	this.addValues = function(values) {
	}

	var pattPlayAgain = "Play Again • "
    this.onPacket = function(event){
		var packet = event.getPacket();
		if (packet instanceof S02PacketChat){
			var str = packet.getChatComponent().getUnformattedText()
			if (str.match(pattPlayAgain)){
				mc.thePlayer.sendChatMessage("/playagain now")
			}

		}

	}
		
}


function SHealth() {

	function drawHealth(x, y, endx, endy, health) {
		var offset = offsetX.get()
		var innerBottomY = endy - 0.7
		var outerTopY = y - 0.7
		var color = "0xff" + healthColor(health, 20)
		if (addaptheight.get()){
			var innerTopY = outerTopY + 0.7 + (2.465 * (20 - health))
		}else{
			var innerTopY = outerTopY + 0.7
		}
		var outerBottomY = endy
		var middle = parseInt((endx + x) / 2)
		var innerLeftX = middle - 0.7 + offset
		var innerRightX = middle + 0.7 + offset
		var outerLeftX = middle - 1.4 + offset
		var outerRightX = middle + 1.4 + offset
		drawRect(innerRightX, innerBottomY, innerLeftX, innerTopY, color); //COLOR RECT
	
		drawRect(outerRightX, outerBottomY, outerLeftX, innerBottomY, 0xff000000); // BOTTOM LINE
		drawRect(outerRightX, innerBottomY, innerRightX, innerTopY, 0xff000000); // RIGHT LINE
		drawRect(innerLeftX, innerBottomY, outerLeftX, innerTopY, 0xff000000);	//LEFT LINE
		drawRect(outerRightX, innerTopY, outerLeftX, outerTopY, 0xff000000); //TOP LINE
	}
	function drawArmor(x, y, endx, endy, armor) {
		var offset = offsetX.get() + 2.1
		var innerBottomY = endy - 0.7
		var outerTopY = y - 0.7
		var color = 0xFF00D2FF
		var innerTopY = outerTopY + 0.7 + (2.465 * (20 - armor))
		var outerBottomY = endy
		var middle = parseInt((endx + x) / 2)
		var innerLeftX = middle - 0.7 + offset
		var innerRightX = middle + 0.7 + offset
		var outerLeftX = middle - 1.4 + offset
		var outerRightX = middle + 1.4 + offset
	
		drawRect(innerRightX, innerBottomY, innerLeftX, innerTopY, color); //COLOR RECT
		drawRect(outerRightX, outerBottomY, outerLeftX, innerBottomY, 0xff000000); // BOTTOM LINE
		drawRect(outerRightX, innerBottomY, innerRightX, innerTopY, 0xff000000); // RIGHT LINE
		drawRect(outerRightX, innerTopY, outerLeftX, outerTopY, 0xff000000); //TOP LINE
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
		var height = -45.0;
		if (!(entity instanceof EntityPlayer) && entity.getEyeHeight() < (mc.thePlayer.getEyeHeight() - 0.3)) {
			height = -entity.getEyeHeight() - 25;
		}
		if (mineplex.get()){
			drawHealth(-13.0, height, 13.0, 5.0, parseInt(mineplexHP(entity.getGameProfile().getName())));
		} else{
			drawHealth(-13.0, height, 13.0, 5.0, parseInt(entity.getHealth()));
		}
		if (armorBar.get()){
			drawArmor(-13.0, height, 13.0, 5.0, parseInt(entity.getTotalArmorValue()));	
		}
		GL11.glScaled(2.0, 2.0, 2.0);
		GL11.glDisable(3042);
		GL11.glEnable(2929);
		GL11.glEnable(2896);
		GL11.glColor4f(1.0, 1.0, 1.0, 1.0);
		GL11.glPopMatrix();
	}

    this.getName = function() {
        return "SHealth";
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
	var addaptheight = value.createBoolean("addaptheight", false);
	var offsetX = value.createInteger("offsetX", 15, -20, 20);
	var armorBar = value.createBoolean("armor", false);
	var mineplex = value.createBoolean("mineplex", false);

	this.addValues = function(values) {
		values.add(addaptheight);
		values.add(offsetX);
		values.add(armorBar);
		values.add(mineplex);

	}

	this.onRender3D = function(event) {

		for (var i in mc.theWorld.loadedEntityList){
			var entity = mc.theWorld.loadedEntityList[i]
	
			if (entity instanceof EntityPlayer && entity != mc.thePlayer){
				draw2DESP(entity, get3DPosX(entity), get3DPosY(entity), get3DPosZ(entity))
			}
		}


	}		
}

function SCrosshair() {

    this.getName = function() {
        return "SCrosshair";
    };

    this.getDescription = function() {
        return "TestModule";
    };

    this.getCategory = function() {
        return "Fun";
	};

	this.onEnable = function() {
	}

	this.onDisable = function() {
	}

	var colormode = value.createList("colormode", ["static", "rainbow"], "static");
	var color_r = value.createInteger("color_r", 255, 0, 255);
	var color_g = value.createInteger("color_g", 255, 0, 255);
	var color_b = value.createInteger("color_b", 255, 0, 255);
	var rainbow_speed = value.createInteger("rainbow_speed", 20, 10, 100);
	var crosshair_length = value.createInteger("crosshair_length", 10, 2, 40);
	var crosshair_width = value.createInteger("crosshair_width", 5, 2, 20);
	var border_width = value.createInteger("border_width", 1, 0, 5);
	var middle_distance = value.createInteger("middle_distance", 1, 0, 10);
	this.addValues = function(values) {
		values.add(colormode);
		values.add(color_r);
		values.add(color_g);
		values.add(color_b);
		values.add(rainbow_speed);
		values.add(crosshair_length);
		values.add(crosshair_width);
		values.add(border_width);
		values.add(middle_distance);
	}

	this.onRender2D = function(event) {

	}
}

function STarget() {

    this.getName = function() {
        return "STarget";
    };

    this.getDescription = function() {
        return "TestModule";
    };

    this.getCategory = function() {
        return "Fun";
	};

	this.onEnable = function() {
	}

	this.onDisable = function() {
	}
	var target_health = 0
	var target_name = null
	var target_armor = 0
	var target_distance = 0
	var target_maxHealth = 0
	this.onAttack = function(event) {
		var targetEntity = event.getTargetEntity();
		if (targetEntity instanceof EntityPlayer){
			target_name = targetEntity.getGameProfile().getName()
		}
		
	}

	this.onUpdate = function() {

		for (var i in mc.theWorld.loadedEntityList){
			var entity = mc.theWorld.loadedEntityList[i]
			if (entity instanceof EntityPlayer && entity != mc.thePlayer && entity.getGameProfile().getName() == target_name){
				if (mineplex.get()){
					target_health = mineplexHP(target_name)
				} else {
					target_health = entity.getHealth()
				}

				target_armor = entity.getTotalArmorValue()
				target_distance = mc.thePlayer.getDistanceToEntity(entity)
				target_maxHealth = entity.getMaxHealth()
				target_absorbtion = entity.getAbsorptionAmount()
				return
			}
		}
		target_name = null
		target_health = 0
		target_armor = 0
		target_distance = 0
		target_maxHealth = 0
		target_absorbtion = 0
	}

	var offset_x = value.createInteger("offset_x", 0, -600, 500);
	var offset_y = value.createInteger("offset_y", 0, -500, 400);
	var body_opacity = value.createInteger("body_opacity", 126, 0, 255);
	var border_thicc = value.createInteger("border_thicc", 1, 0, 5);
	var border_opacity = value.createInteger("border_opacity", 255, 0, 255);
	var border_colormode = value.createList("border_colormode", ["static", "rainbow"], "static");
	var border_color_r = value.createInteger("border_color_r", 255, 0, 255);
	var border_color_g = value.createInteger("border_color_g", 255, 0, 255);
	var border_color_b = value.createInteger("border_color_b", 255, 0, 255);
	var border_rainbow_speed = value.createInteger("border_rainbow_speed", 20, 10, 100);
	var show_always = value.createBoolean("show_always", true);
	var mineplex = value.createBoolean("mineplex", false);


	this.addValues = function(values) {
		values.add(offset_x);
		values.add(offset_y);
		values.add(body_opacity);
		values.add(border_thicc);
		values.add(border_colormode);
		values.add(border_rainbow_speed);
		values.add(border_opacity);
		values.add(border_color_r);
		values.add(border_color_g);
		values.add(border_color_b);
		values.add(show_always);
		values.add(mineplex)
	}
	var c = 0
	this.onRender2D = function(event) {
		var middleX = getScaledWidth() / 2
		var middleY = getScaledHeight() / 2
		var offsetX = offset_x.get()
		var offsetY = offset_y.get()
		var borderticc = border_thicc.get()
		var text_color = 0xf7f7f7
		switch(border_colormode.get()) {
			case "static":
				var border_color = "0x" + ('0' + border_opacity.get().toString(16)).slice(-2) + ('0' + border_color_r.get().toString(16)).slice(-2)  + ('0' + border_color_g.get().toString(16)).slice(-2)  + ('0' + border_color_b.get().toString(16)).slice(-2)
				break;
			case "rainbow":
				r = parseInt((Math.sin(c + Math.PI) + 1) * 127.5);
				g = parseInt((Math.sin(c + (Math.PI / 2)) + 1) * 127.5);
				b = parseInt(((Math.sin(c) + 1) * 127.5));
				c = c + border_rainbow_speed.get() / 500;
				border_color = "0x" + ('0' + border_opacity.get().toString(16)).slice(-2) + ('0' + r.toString(16)).slice(-2)  + ('0' + g.toString(16)).slice(-2)  + ('0' + b.toString(16)).slice(-2)
				if (44 < c){
					c = 0
				}
				break;
		}
		var body_color = "0x" + ('0' + body_opacity.get().toString(16)).slice(-2) + "000000"

		var rectLeftX = middleX + offsetX
		var rectRightX = rectLeftX + 200 
		var rectTopY = middleY + offsetY
		var rectBottomY = rectTopY + 52


		var healthRectTopY = rectTopY + 14
		var healthRectBottomY = healthRectTopY + 12
		var healthRectRightX = rectLeftX + 5 + 190 - (190/target_maxHealth * (target_maxHealth - target_health))
		var healthRectLeftX = rectLeftX + 5

		var healthFillerRectLeftX = healthRectRightX
		var healthFillerRectRightX = rectLeftX + 200 - 5
		var healthFillerRectTopY = healthRectTopY
		var healthFillerRectBottomY = healthRectBottomY



		var armorRectTopY = rectTopY + 26
		var armorRectBottomY = armorRectTopY + 12
		var armorRectRightX = rectLeftX + 5 + 190 - (190/20 * (20 - target_armor))
		var armorRectLeftX = rectLeftX + 5

		var armorFillerRectLeftX = armorRectRightX
		var armorFillerRectRightX = rectLeftX + 200 - 5
		var armorFillerRectTopY = armorRectTopY
		var armorFillerRectBottomY = armorRectBottomY


		if (show_always.get() || target_name){

			drawRect(rectLeftX - borderticc, rectTopY - borderticc, rectRightX + borderticc, rectTopY, border_color); // Border TOP
			drawRect(rectLeftX - borderticc, rectBottomY, rectRightX + borderticc, rectBottomY + borderticc, border_color); // Border Bottom
			drawRect(rectRightX , rectTopY, rectRightX + borderticc, rectBottomY, border_color); // Border Right
			drawRect(rectLeftX - borderticc , rectTopY, rectLeftX, rectBottomY, border_color); // Border Left


			drawRect(rectLeftX, rectTopY, rectRightX, rectBottomY, body_color); // FULL RECT

			drawRect(healthRectLeftX, healthRectTopY, healthRectRightX, healthRectBottomY, "0x7E" + healthColor(target_health, target_maxHealth)); // HEALTH
			drawRect(healthFillerRectLeftX, healthFillerRectTopY, healthFillerRectRightX, healthFillerRectBottomY, 0x7E808080); // HEALTH FILLER
	
			drawRect(armorRectLeftX, armorRectTopY, armorRectRightX, armorRectBottomY, 0x7E00D2FF); // armor
			drawRect(armorFillerRectLeftX, armorFillerRectTopY, armorFillerRectRightX, armorFillerRectBottomY, 0x7E808080); // armor FILLER
			
			//mc.fontRendererObj.drawStringWithShadow('Name: ' + target_name, rectLeftX + 5, rectTopY + 5, text_color); // Name
			mc.ingameGUI.drawCenteredString(mc.fontRendererObj, target_name, rectLeftX + 100, rectTopY + 5, text_color); // Name

			if (Math.ceil(target_absorbtion) != 0){
				mc.ingameGUI.drawCenteredString(mc.fontRendererObj, Math.ceil(target_health) + "+" + Math.ceil(target_absorbtion) + "/" + Math.ceil(target_maxHealth), rectLeftX + 100, rectTopY + 17, text_color) // Health in bar

				
			}else{
				mc.ingameGUI.drawCenteredString(mc.fontRendererObj, Math.ceil(target_health) + "/" + Math.ceil(target_maxHealth), rectLeftX + 100, rectTopY + 17, text_color) // Health in bar

			}
	
	
	
			mc.fontRendererObj.drawStringWithShadow('Distance: ' + target_distance.toFixed(2), rectLeftX + 5, rectTopY + 40, text_color); // Distance
		}

	}
}
function SVelocity() {

    this.getName = function() {
        return "SVelocityHypixel";
    };

    this.getDescription = function() {
        return "Velocity that works on hypixel";
    };

    this.getCategory = function() {
        return "Fun";
	};

	this.onEnable = function() {

	}
	this.onUpdate = function() {
	}


	this.onDisable = function() {
	}

	var VelocityPercentX = value.createInteger("VelocityPercentX", 100, 0, 100);
	var VelocityPercentY = value.createInteger("VelocityPercentY", 100, 0, 100);
	var VelocityPercentZ = value.createInteger("VelocityPercentZ", 100, 0, 100);


	this.addValues = function(values) {
		values.add(VelocityPercentX);
		values.add(VelocityPercentY);
		values.add(VelocityPercentZ);
	}

    this.onPacket = function(event){
		var packet = event.getPacket();
		if (packet instanceof S12PacketEntityVelocity){
			if (packet.getEntityID() == mc.thePlayer.getEntityId()){
				event.cancelEvent()
			}
		}
		if (packet instanceof S27PacketExplosion){
			mc.thePlayer.motionX = mc.thePlayer.motionX + packet.func_149149_c() * (VelocityPercentX.get() / 100)
			mc.thePlayer.motionY = mc.thePlayer.motionY + packet.func_149144_d() * (VelocityPercentY.get() / 100)
			mc.thePlayer.motionZ = mc.thePlayer.motionZ + packet.func_149147_e() * (VelocityPercentZ.get() / 100)
			event.cancelEvent()
		}
		
	}
	this.onRender2D = function(event) {

	}
}

function STest() {

    this.getName = function() {
        return "STest";
    };

    this.getDescription = function() {
        return "TestModule";
    };

    this.getCategory = function() {
        return "Fun";
	};

	this.onEnable = function() {
		//mc.thePlayer.sendQueue.addToSendQueue(new C08PacketPlayerBlockPlacement(new BlockPos(-1, -1, -1), 255, mc.thePlayer.inventory.getCurrentItem(), 0, 0, 0));

	}
	this.onUpdate = function() {
		//mc.thePlayer.sendQueue.addToSendQueue(new C08PacketPlayerBlockPlacement(new BlockPos(-1, -1, -1), 255, mc.thePlayer.inventory.getCurrentItem(), 0, 0, 0));
		mc.playerController.sendUseItem(mc.thePlayer, mc.theWorld, mc.thePlayer.getHeldItem());
		mc.thePlayer.sendQueue.addToSendQueue(new C08PacketPlayerBlockPlacement(new BlockPos(0, 0, 0), 255, mc.thePlayer.inventory.getCurrentItem(), 0.0, 0.0, 0.0));
	}


	this.onDisable = function() {
	}

	this.addValues = function(values) {
	}

    this.onPacket = function(event){
		var packet = event.getPacket();
		if (packet instanceof C08PacketPlayerBlockPlacement){

		}
		if (packet instanceof C02PacketUseEntity){
			chat.print(packet)
		}
		if (packet instanceof C09PacketHeldItemChange){
			chat.print(packet)
		}
		
	}
	this.onRender2D = function(event) {
		//var taco = new ResourceLocation("liquidbounce/icon_32x32.png")

		var middleX = getScaledWidth() / 2
		var middleY = getScaledHeight() / 2
		//drawRect(middleX - 10, middleY - 10, middleX + 10, middleY + 10, 0x000000); // FULL RECT

		//mc.getTextureManager().bindTexture(taco)
		//mc.ingameGUI.drawTexturedModalRect(2, 2, 0, 0, 1920, 1080);
		//mc.ingameGUI.drawCenteredString(mc.fontRendererObj, "test", middleX, middleY, 0xfffff7f7)

	}
}


var sDerpScorp = new SDerpScorp();
var SDerpScorpClient;

var sAutoRegister = new SAutoRegister();
var AutoRegisterClient;

var sBlackHotBar = new SBlackHotBar();
var SBlackHotBarClient;

var sCubeJoin = new SCubeJoin();
var SCubeJoinClient;

var sHealth = new SHealth();
var SHealthClient;

var sCrosshair = new SCrosshair();
var SCrosshairClient;

var sTarget = new STarget();
var STargetClient;

var sVelocity = new SVelocity();
var SVelocityClient;

var sTest = new STest();
var STestClient;

function onEnable() {
    SDerpScorpClient = moduleManager.registerModule(sDerpScorp);
	SAutoRegisterClient = moduleManager.registerModule(sAutoRegister);
	SBlackHotBarClient = moduleManager.registerModule(sBlackHotBar);
	SCubeJoinClient = moduleManager.registerModule(sCubeJoin);
	SHealthClient = moduleManager.registerModule(sHealth);
	//SCrosshairClient = moduleManager.registerModule(sCrosshair);
	STargetClient = moduleManager.registerModule(sTarget);
	SVelocityClient = moduleManager.registerModule(sVelocity);

	//STestClient = moduleManager.registerModule(sTest);
};

function onDisable() {
    moduleManager.unregisterModule(SDerpScorpClient);
	moduleManager.unregisterModule(SAutoRegisterClient);
	moduleManager.unregisterModule(SBlackHotBarClient);
	moduleManager.unregisterModule(SCubeJoinClient);
	moduleManager.unregisterModule(SHealthClient);
	//moduleManager.unregisterModule(SCrosshairClient);
	moduleManager.unregisterModule(STargetClient);
	moduleManager.unregisterModule(SVelocityClient);

	//moduleManager.unregisterModule(STestClient);
};