/// api_version=1
var scriptName = "SpeedCheckAnitBot";
var scriptAuthor = "Anonzme";
var scriptVersion = 1.0;

var EntityPlayer = Java.type("net.minecraft.entity.player.EntityPlayer");
var System = Java.type("java.lang.System");

var MSTimer = Java.type("net.ccbluex.liquidbounce.utils.timer.MSTimer");
var EventState = Java.type("net.ccbluex.liquidbounce.event.EventState");

var currentEntity;
var playerList;
var index;
var next;

var oldPos;

function SpeedCheckAnitBotModule() {
    this.getName = function() {
        return "SpeedCheckAnitBot";
    };
    
    this.getDescription = function() {
        return "AntiBot by speed check (For Matrix. Happy!).";
    };
    
    this.getCategory = function() {
        return "Misc";
    };
    
    this.onEnable = function() {
        next = false;
        index = 0;
        oldPos = [0, 0];
        biggest = -1;
    };
    
    this.onUpdate = function() {
        playerList = [];
        var j = 0;
        for (var i in mc.theWorld.getLoadedEntityList())
            if (mc.theWorld.getLoadedEntityList()[i] instanceof EntityPlayer)
                playerList[j++] = mc.theWorld.getLoadedEntityList()[i];
        
        if (index > playerList.length - 1) {
            index = 0;
            return;
        }
        
        if (!next) {
            currentEntity = playerList[index];
            
            oldPos[0] = currentEntity.posX;
            oldPos[1] = currentEntity.posZ;
            
            next = true;
            
            return;
        }
        
        
        var xDiff = oldPos[0] - currentEntity.posX;
        var zDiff = oldPos[1] - currentEntity.posZ;

        var speed = Math.sqrt(xDiff * xDiff + zDiff * zDiff) * 10; // Legit 6.753686890703971
        
        if (currentEntity != mc.thePlayer && speed > 6.9 && currentEntity.hurtTime == 0 && currentEntity.posY > mc.thePlayer.posY - 1.5 && currentEntity.posY < mc.thePlayer.posY + 1.5 && mc.thePlayer.getDistanceToEntity(currentEntity) < 4.5) {
            mc.theWorld.removeEntity(currentEntity);
            chat.print("[LiquidBounce] Remove " + currentEntity.getName());
        }
        
        index++;

        next = false;
    };
}

var speedCheckAnitBotModule = new SpeedCheckAnitBotModule();

function onEnable() {
    moduleManager.registerModule(speedCheckAnitBotModule);
}

function onDisable() {
    moduleManager.unregisterModule(speedCheckAnitBotModule);
}
