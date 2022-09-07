var scriptName = "Bao ve boi team Light Z"; 
var scriptVersion = 0.4; 
var scriptAuthor = "Bao ve voi team Light Z";

var Aura = new Aura();
var AuraClient;
// 0.1 initial, fixed multi-attacking
// 0.2 fixed attacking items and added simple autoblock, added CPS instead of delay not accurate
// 0.3 added throughwalls option and corrected cps slightly 
// 0.4 added an... interesting aimthing...
// throughwalls coded badly.. at least it works tho

var EntityLiving = Java.type('net.minecraft.entity.EntityLivingBase');

function Aura() {
    var DelayMin = value.createInteger("CPSMin", 4, 0, 20);
    var DelayMax = value.createInteger("CPSMax", 6, 0, 20);
    var Range = value.createFloat("Range", 3, 0, 6.00);
    var AutoBlock = value.createBoolean("AutoBlock", false);
    var LockView = value.createBoolean("LockView", true);
    var ThroughWalls = value.createBoolean("ThroughWalls", true);
    this.getName = function() {
        return "LegitAura";
    };

    this.getDescription = function() {
        return "legit aura for legit";
    };

    this.getCategory = function() {
        return "Combat";
    };
    var delay = 0;
    var f = 0;
    this.onUpdate = function() {
    
        delay += 3;
     for (var x in mc.theWorld.loadedEntityList) {
            var entity = mc.theWorld.loadedEntityList[x]
            f = mc.thePlayer.getDistanceToEntity(entity);
            if(ThroughWalls.get() == false) {
            if (entity != mc.thePlayer && entity instanceof EntityLiving && f <= Range.get() && mc.thePlayer.canEntityBeSeen(entity) == true){
                if(entity.getHealth() > 0) {
                
         if(LockView.get() == true) {
          lockView(entity);
                } 
       
            if(delay >= 20 - Math.floor((Math.random()*(DelayMax.get()+1-DelayMin.get()))+DelayMin.get())){
          mc.playerController.attackEntity(mc.thePlayer, entity);
                mc.thePlayer.swingItem();
                delay = 0;
        }
                
        } // idk how u do the "if this is true then check if this is true and if it isnt dont do the code"
        } // basically check if throughwalls is on and if it is check if entity can be seen and if it cant dont do the code/dont attack
        } else {
            if (entity != mc.thePlayer && entity instanceof EntityLiving && f <= Range.get()){
                if(entity.getHealth() > 0) {
                
      
            if(delay >= 20 - Math.floor((Math.random()*(DelayMax.get()+1-DelayMin.get()))+DelayMin.get())){
          if(LockView.get() == true) {
          lockView(entity);
                } 
                mc.playerController.attackEntity(mc.thePlayer, entity);
                mc.thePlayer.swingItem();
                delay = 0;
        }
                
        }
        }
        }
     }
    }

    this.onDisable = function() {
            mc.gameSettings.keyBindUseItem.pressed = false;
    }
    this.addValues = function(values) {
        values.add(DelayMin);
        values.add(DelayMax);
        values.add(Range);
        values.add(AutoBlock);
        values.add(LockView);
        values.add(ThroughWalls);
    }
        
}

function lockView(entity){
  var diffX = entity.posX - mc.thePlayer.posX;
  var diffZ = entity.posZ - mc.thePlayer.posZ;

  var diffY = entity.posY - mc.thePlayer.posY;

  var dist = Math.sqrt(diffX * diffX + diffZ * diffZ);

  var yaw = (Math.atan2(diffZ, diffX) * 180.0 / Math.PI) - 90.0;

  var pitch = -(Math.atan2(diffY, dist) * 180.0 / Math.PI);
  
  mc.thePlayer.rotationYaw = yaw;
  mc.thePlayer.rotationPitch = pitch;
}

function onLoad() {
};

function onEnable() {
    AuraClient = moduleManager.registerModule(Aura);
};

function onDisable() {
    moduleManager.unregisterModule(AuraClient);
};