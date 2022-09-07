var scriptName = "KillAura Testing Module"; 
var scriptVersion = 2.4; 
var scriptAuthor = "§lSoulplexis";

var Aura = new Aura();
var AuraClient;
// The workshop
function randomIntFrom(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
} 
var PlayerPositionLook = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook');
var PlayerLook = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook');
var PlayerPosition = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition')
var PlayerPacket = Java.type('net.minecraft.network.play.client.C03PacketPlayer');
var EntityLiving = Java.type('net.minecraft.entity.EntityLivingBase');
var Swords = Java.type('net.minecraft.item.ItemSword');
var BlockPos = Java.type('net.minecraft.util.BlockPos');
var C07PacketPlayerDigging = Java.type('net.minecraft.network.play.client.C07PacketPlayerDigging');
var EnumFacing = Java.type('net.minecraft.util.EnumFacing');
var Fooditems = Java.type('net.minecraft.item.ItemFood');
var Interactpacket = Java.type('net.minecraft.network.play.client.C02PacketUseEntity');
var EntityPlayer = Java.type('net.minecraft.entity.player.EntityPlayer');
var C02PacketUseEntity = Java.type("net.minecraft.network.play.client.C02PacketUseEntity");
	function getClosestEntity(){
	var filteredEntites = []
	for (var i in mc.theWorld.loadedEntityList){
		var entity = mc.theWorld.loadedEntityList[i]

		if (entity instanceof EntityLiving && entity !=mc.thePlayer && entity.isDead == false && entity.getHealth != 0){
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

function Aura() {
	var Mode = value.createList("Mode", ["Single", "Switch", "Multi", "Click"], "Single"); //need work
	var Delay = value.createInteger("APS", 12, 0, 20);
	var Range = value.createFloat("Range", 4.25, 0, 6.00);
	var AutoBlock = value.createBoolean("AutoBlock", false);
	var BlockMode = value.createList("AutoBlockMode", ["Normal", "Vanilla", "Interact"], "Normal"); 
	var BlockRange = value.createFloat("AutoBlockRange", 8, 0, 12.00);
	var InteractAutoBlock = value.createBoolean("InteractAutoBlock", false);
	var KeepSprint = value.createBoolean("KeepSprint", true);
	var Aim = value.createBoolean("Aim", false);
	var AimMode = value.createList("AimMode", ["Normal", "LockView", "Random", "Derp"], "Normal");
	var AimPoint = value.createList("AimTarget", ["Head", "Body"], "Head");
	var ThroughWalls = value.createBoolean("ThroughWalls", true);
	var NoEatHit = value.createBoolean("NoEatHit", false);
	var Criticals = value.createBoolean("Criticals", false);
	var Correct = value.createBoolean("Correct", false);
	var Legit = value.createBoolean("Legit", false);
	var ClickTP = value.createBoolean("ClickTP", false);
	var Crasher = value.createBoolean("Crasher", false);
		var TPRange = value.createInteger("TpAura range", 120, 0, 200);
    this.getName = function() {
        return "SoulAura";
    };
var hits = 0;
    this.getDescription = function() {
        return "Attacks enemies around the player.";
    };
    this.getCategory = function() {
        return "Combat";
	};
	var delay = 0;
	var f = 0;
	var cancelz = false;
	var d = 0;
	var e = 0;
	var validTarget = false;
	this.KillAuraz = function() {
		d++;
		delay += 1; 
		var listz = mc.theWorld.loadedEntityList;
     for (var z = 0;z < listz.size(); z++) {
		 switch(Mode.get()) {
			 case "Single":
    		var entity = mc.theWorld.loadedEntityList[z];			 
			 break;
			 case "Switch":
			 var entity = mc.theWorld.loadedEntityList[z];
			 break;
			 case "Multi":
			 var entity = mc.theWorld.loadedEntityList[z];		
			 delay += 999;
			 break;
		 }
		 ///////
		f = mc.thePlayer.getDistanceToEntity(getClosestEntity());
		if (entity != null && entity != mc.thePlayer && entity instanceof EntityLiving && entity.getHealth() > 0 && ((ThroughWalls.get() == false && mc.thePlayer.canEntityBeSeen(entity)) || ThroughWalls.get() == true)) {
			/////////////////////////////// 
		    if(AutoBlock.get() == true && mc.thePlayer.getHeldItem().getItem() instanceof Swords && f <= BlockRange.get()) {
				switch(BlockMode.get()) {
					case "Old":
					 if(entity.hurtTime != 0) {
				     mc.playerController.sendUseItem(mc.thePlayer, mc.theWorld, mc.thePlayer.getHeldItem());
			         }
			         else {
			    	 mc.gameSettings.keyBindUseItem.pressed = false;
			         }
					break;
					case "Vanilla":
					mc.playerController.sendUseItem(mc.thePlayer, mc.theWorld, mc.thePlayer.getHeldItem());
					break;
					case "Hypixel":
					mc.playerController.sendUseItem(mc.thePlayer, mc.theWorld, mc.thePlayer.getHeldItem());
					mc.thePlayer.sendQueue.addToSendQueue(new C07PacketPlayerDigging(C07PacketPlayerDigging.Action.RELEASE_USE_ITEM, new BlockPos(0, 0, 0), EnumFacing.UP));
					break;
					case "Normal":
					mc.playerController.sendUseItem(mc.thePlayer, mc.theWorld, mc.thePlayer.getHeldItem());
					break;
					case "AAC":
					if(d >= randomIntFrom(2,8)) {
						mc.playerController.sendUseItem(mc.thePlayer, mc.theWorld, mc.thePlayer.getHeldItem());
						d = 0;
					}
					break;
					case "Interact":
					mc.playerController.sendUseItem(mc.thePlayer, mc.theWorld, mc.thePlayer.getHeldItem());
					mc.thePlayer.sendQueue.addToSendQueue(new Interactpacket(getClosestEntity(), Interactpacket.Action.INTERACT));
					break;
				}
		    } 
		    if(f <= Range.get() && delay >= 20 / Delay.get() && ((NoEatHit.get() == true && !(mc.thePlayer.getHeldItem().getItem() instanceof Fooditems) && mc.thePlayer.isUsingItem()) || NoEatHit.get() == false)){ // from smsgamer
            if(Legit.get() == false) {
			mc.thePlayer.sendQueue.addToSendQueue(new C02PacketUseEntity(getClosestEntity(), C02PacketUseEntity.Action.ATTACK));
			mc.thePlayer.swingItem();
			} 
			if(Legit.get()) {
				mc.playerController.attackEntity(mc.thePlayer, getClosestEntity());
			}
    		delay = 0;
            }
			if(Crasher.get() && f <= 8) {
				mc.playerController.attackEntity(mc.thePlayer, entity);
				mc.playerController.attackEntity(mc.thePlayer, entity);
				mc.playerController.attackEntity(mc.thePlayer, entity);
			}
		}
	}
	}
	var tix = 0;
	this.onUpdate = function() {
		if(Mode.get() != "Click") {
		this.KillAuraz();
		} if(Mode.get() == "Click") {
			if(mc.gameSettings.keyBindAttack.isKeyDown() && mc.thePlayer.getDistanceToEntity(getClosestEntity()) <= Range.get()) {
				d++;
				delay++;
					if(AutoBlock.get() == true && mc.thePlayer.getHeldItem().getItem() instanceof Swords && f <= BlockRange.get()) {
						switch(BlockMode.get()) {
							case "Old":
							if(entity.hurtTime != 0) {
							mc.playerController.sendUseItem(mc.thePlayer, mc.theWorld, mc.thePlayer.getHeldItem());
							}
							else {
							mc.gameSettings.keyBindUseItem.pressed = false;
							}
							break;
							case "Vanilla":
							mc.playerController.sendUseItem(mc.thePlayer, mc.theWorld, mc.thePlayer.getHeldItem());
							break;
							case "Hypixel":
							mc.playerController.sendUseItem(mc.thePlayer, mc.theWorld, mc.thePlayer.getHeldItem());
							mc.thePlayer.sendQueue.addToSendQueue(new C07PacketPlayerDigging(C07PacketPlayerDigging.Action.RELEASE_USE_ITEM, new BlockPos(0, 0, 0), EnumFacing.UP));
							break;
							case "Normal":
							mc.playerController.sendUseItem(mc.thePlayer, mc.theWorld, mc.thePlayer.getHeldItem());
							break;
							case "AAC":
							if(d >= randomIntFrom(2,8)) {
								mc.playerController.sendUseItem(mc.thePlayer, mc.theWorld, mc.thePlayer.getHeldItem());
								d = 0;
							}
							break;
							case "Interact":
							mc.playerController.sendUseItem(mc.thePlayer, mc.theWorld, mc.thePlayer.getHeldItem());
							mc.thePlayer.sendQueue.addToSendQueue(new Interactpacket(getClosestEntity(), Interactpacket.Action.INTERACT));
							break;
						}
					} 
				if(((ClickTP.get() == false && (mc.thePlayer.getDistanceToEntity(getClosestEntity()) <= Range.get())) || ClickTP.get() == true && mc.thePlayer.getDistanceToEntity(getClosestEntity()) <= TPRange.get()) && delay >= 20 / Delay.get() && ((NoEatHit.get() == true && !(mc.thePlayer.getHeldItem().getItem() instanceof Fooditems) && mc.thePlayer.isUsingItem()) || NoEatHit.get() == false)){ // from smsgamer
					if(Legit.get() == false) {
						mc.thePlayer.sendQueue.addToSendQueue(new C02PacketUseEntity(getClosestEntity(), C02PacketUseEntity.Action.ATTACK));
						mc.thePlayer.swingItem();
					} 
				if(Legit.get()) {	
					mc.playerController.attackEntity(mc.thePlayer, getClosestEntity());
				}
				delay = 0;
            }
				if(ClickTP.get() == true) {
					mc.thePlayer.onGround = false;
					mc.thePlayer.sendQueue.addToSendQueue(new PlayerPosition(getClosestEntity().posX, getClosestEntity().posY + Range.get(), getClosestEntity().posZ, false));
				}
				tix++; 
			}
		}
	}
	this.getTag = function() {
		if(ClickTP.get() == false) {
			return Mode.get() + " " + hits.toString();
		} else {
			return "ClickTpAura" + " " + hits.toString();
		}
}
    this.onPacket = function(event){
		if(Aim.get() && mc.thePlayer.getDistanceToEntity(getClosestEntity()) <= Range.get()) {
		var target = getClosestEntity();
		var diffX = target.posX - mc.thePlayer.posX;
        var diffZ = target.posZ - mc.thePlayer.posZ;
        var diffY = target.posY - mc.thePlayer.posY
        var dist = Math.sqrt(diffX * diffX + diffZ * diffZ);
        var yaw = (Math.atan2(diffZ, diffX) * 180.0 / Math.PI) - 90.0;
        var pitch = -(Math.atan2(diffY, dist) * 180.0 / Math.PI);
		var packet = event.getPacket();
			if (packet instanceof PlayerPacket && !(packet instanceof PlayerPosition) && !(packet instanceof PlayerLook) && !(packet instanceof PlayerPositionLook)){
					mc.thePlayer.sendQueue.addToSendQueue(new PlayerLook(mc.thePlayer.rotationYaw, mc.thePlayer.rotationPitch, packet.isOnGround()));
					event.cancelEvent();
				}
				if (packet instanceof PlayerPosition){
					mc.thePlayer.sendQueue.addToSendQueue(new PlayerPositionLook(packet.getPositionX(), packet.getPositionY(), packet.getPositionZ(), mc.thePlayer.rotationYaw, mc.thePlayer.rotationPitch, packet.isOnGround()));
					event.cancelEvent()
				}
				switch(AimPoint.get()) {
					case "Head":
					//
					break;
					case "Body":
					pitch += 15
					break;
				}
				if(Mode.get() != "Click") {
					switch(AimMode.get()) {
					case "Normal":
					packet.yaw = yaw;
					packet.pitch = pitch;
					break;
					case "LockView":
					mc.thePlayer.rotationYaw = yaw;
					mc.thePlayer.rotationPitch = pitch;
					break;
					case "Random":
					packet.yaw = yaw + randomIntFrom(-5,5);
					packet.pitch = pitch + randomIntFrom(-5,5);
					break;
					case "Derp":
					packet.yaw = yaw + randomIntFrom(0,360);
					packet.pitch = pitch + randomIntFrom(-90,90);
					break;
					}
				} else {
					if(mc.gameSettings.keyBindAttack.isKeyDown() && tix >= Delay.get() / 2) {
						switch(AimMode.get()) {
					case "Normal":
					packet.yaw = yaw;
					packet.pitch = pitch;
					break;
					case "LockView":
					mc.thePlayer.rotationYaw = yaw;
					mc.thePlayer.rotationPitch = pitch;
					break;
					case "Random":
					packet.yaw = yaw + randomIntFrom(-5,5);
					packet.pitch = pitch + randomIntFrom(-5,5);
					break;
					case "Derp":
					packet.yaw = yaw + randomIntFrom(0,360);
					packet.pitch = pitch + randomIntFrom(-90,90);
					break;
					}
					}
				}
			}
		}
	this.onAttack = function() {
	hits++;
	if(Legit.get()) {
		mc.thePlayer.swingItem();
	}
	//mc.thePlayer.swingItem(); // Moved 
	if(Correct.get() && mc.thePlayer.onGround) {
	mc.thePlayer.motionX /= .60;
	mc.thePlayer.motionZ /= .60;
	}
		if(AutoBlock.get() == true && BlockMode.get() == "Normal" || BlockMode.get() == "Interact") {
			mc.thePlayer.sendQueue.addToSendQueue(new C07PacketPlayerDigging(C07PacketPlayerDigging.Action.RELEASE_USE_ITEM, new BlockPos(0, 0, 0), EnumFacing.UP));
			//if(InteractAutoBlock.get()) {
		    //    mc.thePlayer.sendQueue.addToSendQueue(new Interactpacket(entity, INTERACT));
			// }
		}
		if(AutoBlock.get() == true && BlockMode.get() == "AAC") {
			mc.thePlayer.sendQueue.addToSendQueue(new C07PacketPlayerDigging(C07PacketPlayerDigging.Action.RELEASE_USE_ITEM, new BlockPos(0, 0, 0), EnumFacing.UP));
			mc.thePlayer.keyBindUseItem.pressed = false;
		}
		if(KeepSprint.get() == true) { // Appears to function correctly
				 mc.thePlayer.setSprinting(true);
		}
		if(Aim.get() == true && AimMode.get() == "Snap") {
			cancelz = false;
			mc.thePlayer.sendQueue.addToSendQueue(new PlayerPositionLook(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, yaw, pitch, mc.thePlayer.onGround));
			cancelz = true;
		}
		if(Criticals.get() && mc.thePlayer.onGround) {
			mc.thePlayer.sendQueue.addToSendQueue(new PlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.08, mc.thePlayer.posZ, true));
			mc.thePlayer.sendQueue.addToSendQueue(new PlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false));
		}
	}
	this.onDisable = function() {
			mc.gameSettings.keyBindUseItem.pressed = false;
			validTarget = false;
			d = 0;
			hits = 0;
	}
	this.addValues = function(values) {
		values.add(Mode);
		values.add(Delay);
		values.add(Range);
		values.add(KeepSprint);
		values.add(AutoBlock);
		values.add(BlockMode);
		values.add(BlockRange);
	//	values.add(InteractAutoBlock);
		values.add(Aim);
		values.add(AimMode);
		values.add(AimPoint);
		values.add(ThroughWalls);
	//	values.add(NoEatHit);
	//	values.add(Criticals);
	values.add(Correct);
	values.add(Legit);
	values.add(ClickTP);
	values.add(TPRange);
	//	values.add(Crasher);
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
/* Credits:
yorik100 - helped with onPacket and some other minor details
SMS_Gamer - helped a lot with improving 
icewormy3 - emotional support [[][]] 

People on Discord - being xtremely toxic piece of shit 
"Kill yourself you American piece of shit" - Remeku#8640
"Go back to mining coal you inbred shit" - Bunksha#4895
[General harassment, bullying] - Dwaj#0275
*/