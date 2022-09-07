var scriptName = "TargetStrafe"
var scriptAuthor = "je5442804"
var scriptVersion = 1.6

var EntityPlayer = Java.type('net.minecraft.entity.player.EntityPlayer');
var AntiBot = Java.type("net.ccbluex.liquidbounce.features.module.modules.misc.AntiBot")
var LiquidBounce = Java.type("net.ccbluex.liquidbounce.LiquidBounce");
var Teams = Java.type("net.ccbluex.liquidbounce.features.module.modules.misc.Teams");//Thank Nvaros



function getClosestEntity() {  //Function by Scorpion3013
	var filteredEntites = []
	for (var i in mc.theWorld.loadedEntityList) {
		var entity = mc.theWorld.loadedEntityList[i]
		if (/*entity instanceof EntityPlayer && */entity != mc.thePlayer) {
			filteredEntites.push(entity)
		}
	}
	filteredEntites.sort(function (a, b) {
		var distanceA = mc.thePlayer.getDistanceToEntity(a)
		var distanceB = mc.thePlayer.getDistanceToEntity(b)
		return distanceB < distanceA;
	})
	return filteredEntites[0];
}

function TargetStrafe() {
	var distance0 = value.createFloat("Distance", 2.5, 1.0, 4.00)
	var motionXZ = value.createFloat("MotionXZ" , 0.28, 0.01, 0.60)
	
    this.getName = function() {
        return "TargetStrafe"
    }
    this.getDescription = function() {
        return "Piao Piao Piao!!!"
    }
    this.getCategory = function() {
        return "Movement"
    }
    this.onEnable = function() {
    }
    this.onDisable = function() {
     
    }
	this.addValues = function(values) {
		values.add(distance0)
		values.add(motionXZ)
	}
	var player;
	this.onAttack = function(e) {
		player = e.getTargetEntity();
	}
	this.onUpdate = function() {
        //var player = getClosestEntity();
		if(player == null) {
			if(0 == mc.thePlayer.ticksExisted % 20)
				chat.print("no get");
			return;
		}
		if(Math.sqrt(Math.pow(mc.thePlayer.posX - player.posX, 2) + Math.pow(mc.thePlayer.posZ - player.posZ, 2)) != 0) {
			var c1 = (mc.thePlayer.posX - player.posX)/(Math.sqrt(Math.pow(mc.thePlayer.posX - player.posX,2) + Math.pow(mc.thePlayer.posZ - player.posZ,2)))
			var s1 = (mc.thePlayer.posZ - player.posZ)/(Math.sqrt(Math.pow(mc.thePlayer.posX - player.posX,2) + Math.pow(mc.thePlayer.posZ - player.posZ,2)))
			if(Math.sqrt(Math.pow(mc.thePlayer.posX - player.posX,2) + Math.pow(mc.thePlayer.posZ - player.posZ,2)) <= distance0.get()/* && !AntiBot.isBot(player) && !player.isDead && !LiquidBounce.moduleManager.getModule(Teams.class).isInYourTeam(player)*/) {
				if(mc.gameSettings.keyBindLeft.pressed) {
					mc.thePlayer.motionX = -motionXZ.get() * s1 - 0.18 * motionXZ.get() * c1
					mc.thePlayer.motionZ = motionXZ.get() * c1 - 0.18 * motionXZ.get() * s1
				}else {
					mc.thePlayer.motionX = motionXZ.get() * s1 - 0.18 * motionXZ.get() * c1
					mc.thePlayer.motionZ = -motionXZ.get() * c1 - 0.18 * motionXZ.get() * s1
				}
			}
		}
	}
}
var TargetStrafe = new TargetStrafe()
var TargetStrafeClient

function onLoad() {}

function onEnable() {
    TargetStrafeClient = moduleManager.registerModule(TargetStrafe)
}

function onDisable() {
    moduleManager.unregisterModule(TargetStrafeClient)
}