var scriptName = "ZeroAim";
var scriptAuthor = "Soulplexis";
var scriptVersion = 2.3;
//Workshopp
var PlayerPositionLook = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook');
var PlayerLook = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook');
var EntityLiving = Java.type('net.minecraft.entity.EntityLivingBase');

function randomIntFrom(min,max) // Get a random integer from [min] to [max] 
{
    return Math.floor(Math.random()*(max-min+1)+min);
} 
var BlockPos = Java.type("net.minecraft.util.BlockPos");
var C05PacketPlayerLook= Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook');
var C08PacketPlayerBlockPlacement = Java.type('net.minecraft.network.play.client.C08PacketPlayerBlockPlacement');
var C09PacketHeldItemChange = Java.type('net.minecraft.network.play.client.C09PacketHeldItemChange');
var Air = Java.type("net.minecraft.block.BlockAir");
function Derp() {
	var Mode = value.createList("Mode", ["Derp", "Shake", "NoSilentAim", "FlipFlop", "Scaffold", "AntiAim", "PacketAntiAim", "Coordinate", "VanillaDerp", "Entity", "Spin", "Spin2"], "AntiAim");
	var Yaw = value.createBoolean("Yaw", true);
	var YawAmount = value.createInteger("YawAmount", 180, 0, 360);
	var Pitch = value.createBoolean("Pitch", true);
	var PitchAmount = value.createInteger("PitchAmount", 20, -90, 90);
	var ShakeAmount = value.createInteger("ShakeAmount", 5, 0, 360);
	var SpinAmount = value.createInteger("SpinAmount", 180, 0, 360);
	var EntityModeRange = value.createInteger("EntityModeRange", 6, 0, 300);
	var PreventHeadless = value.createBoolean("PreventHeadless", false);
    this.getName = function() {
        return "ZeroAim";
    }
    this.getCategory = function() {
        return "Misc";   
    }

    this.getDescription = function() {
        return "Change head rotations, AKA fancy derp.";
    }
	this.onEnable = function() {
		var ticks = 0;
	}
		var yaw1 = 0;
	this.onMotion = function() {
	}
    this.onPacket = function(event){
		for (var x in mc.theWorld.loadedEntityList) {
		var entity = mc.theWorld.loadedEntityList[x];
		var f = mc.thePlayer.getDistanceToEntity(entity);
		var diffX = entity.posX - mc.thePlayer.posX;
        var diffZ = entity.posZ - mc.thePlayer.posZ;
        var diffY = entity.posY + entity.getEyeHeight() - mc.thePlayer.posY - mc.thePlayer.getEyeHeight();
        var dist = Math.sqrt(diffX * diffX + diffZ * diffZ);
        var yaw = (Math.atan2(diffZ, diffX) * 180.0 / Math.PI) - 90.0;
        var pitch = -(Math.atan2(diffY, dist) * 180.0 / Math.PI);
		}
      var packet = event.getPacket();
      if ((packet instanceof PlayerPositionLook || packet instanceof PlayerLook)) {
		  yaw1 += SpinAmount.get();
		  switch(Mode.get()) {
			  case "Derp":
			  if(Yaw.get()) {
			  packet.yaw = randomIntFrom(0,360);
			  }
			  if(Pitch.get()) {
			  packet.pitch = randomIntFrom(-90,90);
			  }
			  break;
			  case "Shake":
			  if(Yaw.get()) {
			  packet.yaw += randomIntFrom(-ShakeAmount.get(), ShakeAmount.get());
			  }
			  if(Pitch.get()) {
			  packet.pitch += randomIntFrom(-ShakeAmount.get(), ShakeAmount.get());
			  }
			  break;
			  case "NoSilentAim":
			  if(Yaw.get()) {
			  packet.yaw = mc.thePlayer.rotationYaw;
			  }
			  if(Pitch.get()) {
			  packet.pitch = mc.thePlayer.rotationPitch;
			  }
			  break;
			  case "FlipFlop":
			  if(Yaw.get()) {
			  packet.yaw = packet.pitch;
			  }
			  if(Pitch.get()) {
			  packet.pitch = packet.yaw;
			  }
			  break;
			  case "Scaffold":
			  if(Yaw.get()) {
			  packet.yaw = mc.thePlayer.rotationYaw - 180;
			  }
			  if(Pitch.get()) {
			  packet.pitch = 82;
			  }
			  break;
			  case "AntiAim":
			  if(Yaw.get()) {
			  packet.yaw = mc.thePlayer.rotationYaw + YawAmount.get();
			  }
			  if(Pitch.get()) {
			  packet.pitch = mc.thePlayer.rotationPitch + PitchAmount.get();
			  }
			  break;
			  case "PacketAntiAim":
			  if(Yaw.get()) {
			  packet.yaw += YawAmount.get();
			  }
			  if(Pitch.get()) {
			  packet.pitch += PitchAmount.get();
			  }
			  break;
			  case "Coordinate":
			  if(Yaw.get()) {
				  packet.yaw = YawAmount.get();
			  } 
			  if(Pitch.get()) {
				  packet.pitch = PitchAmount.get();
			  }
			  break;
			  case "VanillaDerp":
			  if(Yaw.get()) {
			  packet.yaw = randomIntFrom(0,360);
			  }
			  if(Pitch.get()) {
			  packet.pitch = randomIntFrom(-180,180);
			  }
			  break;
			  case "Entity":
			  if(entity != mc.thePlayer && entity instanceof EntityLiving && entity.getHealth() > 0 && entity != null && f <= EntityModeRange.get()) {
			  if(Yaw.get()) {
			  packet.yaw = yaw;
			  }
			  if(Pitch.get()) {
			  packet.pitch = pitch;
			  }
			  }
			  break;
			  case "Spin":
				  if(Yaw.get()) {
					  packet.yaw += yaw1
				  }
				  if(Pitch.get()) {
					  packet.pitch += PitchAmount.get();
				  }
			  break;
			  case "Spin2":
			  	  if(Yaw.get()) {
					  packet.yaw = mc.thePlayer.rotationYaw + yaw1;
				  }
				  if(Pitch.get()) {
					  packet.pitch = mc.thePlayer.rotationPitch + PitchAmount.get();
				  }
			  break;
		  }
		  if(PreventHeadless.get()) {
			  if(packet.pitch < -90) {
				  packet.pitch = -90;
			  }
			  if(packet.pitch > 90) {
				  packet.pitch = 90;
			  }
		  }
	 }
    };
	this.onDisable = function() {
	}
	this.addValues = function(soul) {
		soul.add(Mode);
		soul.add(Pitch);
		soul.add(PitchAmount);
		soul.add(Yaw);
		soul.add(YawAmount);
		soul.add(ShakeAmount);
		soul.add(SpinAmount);
		soul.add(EntityModeRange);
		soul.add(PreventHeadless);
	}
}

var derp = new Derp();
var derpClient;

function onEnable() {
    derpClient = moduleManager.registerModule(derp);
}

function onDisable() {
    moduleManager.unregisterModule(derpClient);
}