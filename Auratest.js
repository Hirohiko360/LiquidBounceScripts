var scriptName = "KillAura [flaggy for testing purposes]"; 
var scriptVersion = 0.6; 
var scriptAuthor = "soulplexis and Sms_Gamer";

var Aura = new Aura();
var AuraClient;

var PlayerPositionLook = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook');
var PlayerPosition = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition')
var PlayerLook = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook');
var PlayerPacket = Java.type('net.minecraft.network.play.client.C03PacketPlayer');
var EntityLiving = Java.type('net.minecraft.entity.EntityLivingBase');
var Swords = Java.type('net.minecraft.item.ItemSword');

function Aura() {
	var Mode = value.createList("Mode", ["Switch", "Multi"], "Switch"); //need work
	var DelayMin = value.createInteger("CPSMin", 7, 0, 20);
	var DelayMax = value.createInteger("CPSMax", 12, 0, 20);
	var Range = value.createFloat("Range", 4.2, 0, 6.00);
	var AutoBlock = value.createBoolean("AutoBlock", false);
	var BlockMode = value.createList("BlockMode", ["HurtTime", "Vanilla"], "HurtTime"); //need work
	var KeepSprint = value.createBoolean("KeepSprint", true);
	var Aim = value.createBoolean("Aim", true);
	var AimMode = value.createList("AimMode", ["Silent", "LockView"], "Silent");
	var ThroughWalls = value.createBoolean("ThroughWalls", true);
    this.getName = function() {
        return "Aura";
    };

    this.getDescription = function() {
        return "KillAura remade.";
    };
	var cancelz = false;
    this.getCategory = function() {
        return "Combat";
	};
	var delay = 0;
	var f = 0;
	var validTarget = false;
	this.onUpdate = function() {
		delay += 2; // from smsgamer
     for (var x in mc.theWorld.loadedEntityList) {
		var entity = mc.theWorld.loadedEntityList[x]
		f = mc.thePlayer.getDistanceToEntity(entity);
		if (entity != null && entity != mc.thePlayer && entity instanceof EntityLiving && f <= Range.get() && entity.getHealth() > 0 && ((ThroughWalls.get() == false && mc.thePlayer.canEntityBeSeen(entity)) || ThroughWalls.get() == true)) {
			/////////////////////////////////
			validTarget = true; 
			///////////////////////////////// 
		   if(Aim.get() == true) {
				 var diffX = entity.posX - mc.thePlayer.posX;
                 var diffZ = entity.posZ - mc.thePlayer.posZ;
                 var diffY = entity.posY + entity.getEyeHeight() - mc.thePlayer.posY - mc.thePlayer.getEyeHeight();
                 var dist = Math.sqrt(diffX * diffX + diffZ * diffZ);
                 var yaw = (Math.atan2(diffZ, diffX) * 180.0 / Math.PI) - 90.0;
                 var pitch = -(Math.atan2(diffY, dist) * 180.0 / Math.PI);
				switch(AimMode.get()) {
	           case "LockView":
	             mc.thePlayer.rotationYaw = yaw;
	             mc.thePlayer.rotationPitch = pitch;
	           break;
	           case "Silent":
			   cancelz = false;
			   mc.thePlayer.sendQueue.addToSendQueue(new PlayerPositionLook(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, yaw, pitch, mc.thePlayer.onGround));
			   cancelz = true;
	           break;
               }//sw               ^ Code above is from SMS_Gamer ^
			}
			/////////////////////////////// 
		    if(AutoBlock.get() == true && mc.thePlayer.getHeldItem().getItem() instanceof Swords) {
				switch(BlockMode.get()) {
					case "HurtTime":
					 if(entity.hurtTime != 0) {
				     mc.gameSettings.keyBindUseItem.pressed = true;
			         }
			         else {
			    	 mc.gameSettings.keyBindUseItem.pressed = false;
			         }
					break;
					case "Vanilla":
					mc.gameSettings.keyBindUseItem.pressed = true;
					break;
				}
		    }
			/////////////////////////////// Knockback might not function right 
			if(KeepSprint.get() == true) {
				 mc.thePlayer.setSprinting(true);
			}
			///////////////////////////
		    if(delay >= 20 - Math.floor((Math.random()*(DelayMax.get()+1-DelayMin.get()))+DelayMin.get())){ // from smsgamer
            mc.playerController.attackEntity(mc.thePlayer, entity);
	    	mc.thePlayer.swingItem();
    		delay = 0;
            }
			//////////////////////////
		} else {
			validTarget = false;
		}
	 }
	}

	this.onDisable = function() {
			mc.gameSettings.keyBindUseItem.pressed = false;
			validTarget = false;
	}
    this.onPacket = function(event){ // from yorik100 
        var packet = event.getPacket();
      if (((packet instanceof PlayerPositionLook) || (packet instanceof PlayerPacket) || (packet instanceof PlayerPosition) || (packet instanceof PlayerLook)) && AimMode.get() == "Silent" && Aim.get() == true && validTarget == true && cancelz == true) {
        event.cancelEvent();
      }
    }
	this.addValues = function(values) {
		values.add(DelayMin);
		values.add(DelayMax);
		values.add(Range);
		values.add(KeepSprint);
		values.add(AutoBlock);
		values.add(BlockMode);
		values.add(Aim);
		values.add(AimMode);
		values.add(ThroughWalls);
	}
}

function onLoad() {
};

function onEnable() {
    AuraClient = moduleManager.registerModule(Aura);
};

function onDisable() {
    moduleManager.unregisterModule(AuraClient);
};