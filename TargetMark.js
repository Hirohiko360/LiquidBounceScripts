/// api_version=2
var script = registerScript({
    name: "Render1",
    version: "0.1",
    authors: ["Co丶Dynamic"]
});
var MSTimer = Java.type("net.ccbluex.liquidbounce.utils.timer.MSTimer");
var AttackTimer = new MSTimer();
var RenderTimer = new MSTimer();
var EntityChangeTimer = new MSTimer();
var JTimer = Java.type("java.util.Timer");
var RenderReset;
var ShaderRenderTimer = new MSTimer();
script.import('lib/timingFunctions.js');
/*
function EntityData() {
  this.Entity = null;
  this.Precent= 0.00;
  this.Alpha  = 0.75;
  this.ColorR = 0.97;
  this.ColorG = 0.97;
  this.ColorB = 0.97;
};
*/
var CurrentEntityCircle=new Object;
var PathEntity=[];
var PathPrecent=[];
var PathAlpha=[];
var PathColorR=[];
var PathColorG=[];
var PathColorB=[];
var LiquidBounce = Java.type("net.ccbluex.liquidbounce.LiquidBounce");
var Aura = Java.type("net.ccbluex.liquidbounce.features.module.modules.combat.KillAura");
var LastTickEntity;
var Vec3 = Java.type('net.minecraft.util.Vec3');
var GL11 = Java.type('org.lwjgl.opengl.GL11');
var Color = Java.type('java.awt.Color');
var RenderUtils = Java.type('net.ccbluex.liquidbounce.utils.render.RenderUtils');
var AttackEntity;
script.registerModule({
    name: "TargetMark",
    description: "By Co丶Dynamic",
    category: "Render",
	tag: "SigmaShader",
    settings: {}
}, function (module) {
	
	module.on("enable", function () {
		AttackTimer.reset();
		RenderTimer.reset();
		//CurrentEntityCircle.Entity=mc.thePlayer;
		CurrentEntityCircle.Precent= 0.00;
		CurrentEntityCircle.Alpha  = 0.7;
		CurrentEntityCircle.ColorR = 0.98;
		CurrentEntityCircle.ColorG = 0.98;
		CurrentEntityCircle.ColorB = 0.98;
		RenderReset=true;
    });
	
	module.on("disable", function () {
    });
	
	module.on("attack", function (event) {
		EntityChangeTimer.reset();
		CurrentEntityCircle.Entity=event.getTargetEntity();
    });
	
	module.on("update", function () { try {
		var timerA = new JTimer("setTimeout", true);
		/*
			PushPathShader
		*/
		//PushPathShader();
		if(EntityChangeTimer.hasTimePassed(250/mc.timer.timerSpeed)) {
			CurrentEntityCircle.Entity=null;
			//AttackEntity=null;
		};
		//Chat.print(CurrentEntityCircle.Entity==null);
		//Chat.print(PathAlpha.length);
		if(CurrentEntityCircle.Entity==null && !RenderReset) {
			RenderReset=true;
		};
		//CurrentEntityCircle.Entity=AttackEntity;
		//if(CurrentEntityCircle.Entity!=null) Chat.print(CurrentEntityCircle.Entity);
		//LastTickEntity=CurrentEntityCircle.Entity;
	}catch(err){
		Chat.print(err);
	};
	});
	
	module.on("packet", function (event) {
	});
	
	module.on("render3D", function () {
		if(CurrentEntityCircle.Entity!=null) {
			if(RenderReset) {
				RenderReset=false;
				RenderTimer.reset();
			};
			CurrentEntityCircle.Precent=Math.sin(-RenderTimer.hasTimeLeft(0) / 400)*0.5 + 0.5;
			RenderCircle(CurrentEntityCircle.Entity,CurrentEntityCircle.Alpha,CurrentEntityCircle.ColorR,CurrentEntityCircle.ColorG,CurrentEntityCircle.ColorB,CurrentEntityCircle.Precent,4);
		};
		if(ShaderRenderTimer.hasTimePassed(10)) {
			PushPathShader();
			ShaderRenderTimer.reset();
			PushRenderColor();
		};
		if(PathAlpha.length>0) {
			for(i in PathAlpha) {
				RenderCircle(PathEntity[i],PathAlpha[i],PathColorR[i],PathColorG[i],PathColorB[i],PathPrecent[i],2);
			};
		};
	});
});

function PushPathShader() {
	if (CurrentEntityCircle.Entity!=null) {
		PathEntity.push(CurrentEntityCircle.Entity);
		PathPrecent.push(CurrentEntityCircle.Precent);
		PathAlpha.push(CurrentEntityCircle.Alpha*0.85);
		PathColorR.push(CurrentEntityCircle.ColorR);
		PathColorG.push(CurrentEntityCircle.ColorG);
		PathColorB.push(CurrentEntityCircle.ColorB);
	};
	for(i in PathAlpha) {
		PathAlpha[i] -= 0.025;
		//Chat.print(PathAlpha[i]);
	};
	while(true) {
		if (PathAlpha.length==0) return;
		if (PathAlpha[0] <= 0.05) {
			PathAlpha.shift();
			PathEntity.shift();
			PathPrecent.shift();
			PathColorR.shift();
			PathColorG.shift();
			PathColorB.shift();
		} else return;
	};
	return;
};

function RenderCircle(REntity,RAlpha,RColorR,RColorG,RColorB,RPrecent,Width) {
	var BoundingBox;
	var radius;
	var height;
	var RenderPosX;
	var RenderPosY;
	var RenderPosZ;
		BoundingBox=REntity.getEntityBoundingBox();
		RenderPosX = REntity.lastTickPosX + (REntity.posX - REntity.lastTickPosX) * mc.timer.renderPartialTicks - mc.getRenderManager().renderPosX;
		RenderPosY = REntity.lastTickPosY + (REntity.posY - REntity.lastTickPosY) * mc.timer.renderPartialTicks - mc.getRenderManager().renderPosY;
		RenderPosZ = REntity.lastTickPosZ + (REntity.posZ - REntity.lastTickPosZ) * mc.timer.renderPartialTicks - mc.getRenderManager().renderPosZ;
		radius=BoundingBox.maxX-BoundingBox.minX;
		height=BoundingBox.maxY-BoundingBox.minY;
		RenderPosY += height*0.95*RPrecent;
		 GL11.glPushMatrix();
            GL11.glTranslated(
                RenderPosX , RenderPosY , RenderPosZ
            )
            GL11.glEnable(GL11.GL_BLEND);
            GL11.glEnable(GL11.GL_LINE_SMOOTH);
            GL11.glDisable(GL11.GL_TEXTURE_2D);
            GL11.glDisable(GL11.GL_DEPTH_TEST);
            GL11.glBlendFunc(GL11.GL_SRC_ALPHA, GL11.GL_ONE_MINUS_SRC_ALPHA);
            
            GL11.glLineWidth(Width);
            RenderUtils.glColor(new Color(parseFloat(RColorR), parseFloat(RColorG), parseFloat(RColorB), parseFloat(RAlpha)));
			//RenderUtils.glColor(new Color(254, 254, 254, 100));
            GL11.glRotatef(90, 1, 0, 0);
            GL11.glBegin(GL11.GL_LINE_STRIP);
    
            for (i = 0; i <= 360; i += 6) {
                GL11.glVertex2f(Math.cos(i * Math.PI / 180) * radius, (Math.sin(i * Math.PI / 180) * radius));
            };
            GL11.glEnd();
            GL11.glDisable(GL11.GL_BLEND);
            GL11.glEnable(GL11.GL_TEXTURE_2D);
            GL11.glEnable(GL11.GL_DEPTH_TEST);
            GL11.glDisable(GL11.GL_LINE_SMOOTH);
            GL11.glPopMatrix();
	return;
};
function PushRenderColor() {
	if(CurrentEntityCircle.Entity==null) return;
	if(CurrentEntityCircle.Entity.hurtTime>4 && AttackTimer.hasTimePassed(350/mc.timer.timerSpeed)) {
		CurrentEntityCircle.ColorG *=0.32;
		CurrentEntityCircle.ColorB *=0.32;
		AttackTimer.reset();
	};
	if(CurrentEntityCircle.ColorG < 0.95) {
		CurrentEntityCircle.ColorG += 0.026;
		CurrentEntityCircle.ColorB += 0.026;
	};
	if(CurrentEntityCircle.ColorG > 0.95) {
		CurrentEntityCircle.ColorG=0.98;
		CurrentEntityCircle.ColorB=0.98;
	};
	return;
};