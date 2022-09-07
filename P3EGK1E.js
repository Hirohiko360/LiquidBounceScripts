var scriptName = "SetRotate"; 
var scriptVersion = 1.1; 
var scriptAuthor = "Config by Team Light Z";

var playerRotation = new PlayerRotation();
var playerRotationClient;
var lookpacket = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook');

function randomIntFrom(min,max) // Get a random integer from [min] to [max] 
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function PlayerRotation() {
  var YawAmount = value.createInteger("YawAmount", 0, 0, 360);
  var PitchAmount = value.createInteger("PitchAmount", 0, -90, 90);
  var Yaw = value.createBoolean("Yaw", true);
  var Pitch = value.createBoolean("Pitch", true);
  var Silent = value.createBoolean("Silent", false);
  var Derp = value.createBoolean("Derp", false);
    this.getName = function() {
        return "SetRotation";
    };

    this.getDescription = function() {
        return "Forces a rotation.";
    };

    this.getCategory = function() {
        return "Player";
    };

    this.onMotion = function () {
    if(Derp.get() == false && Silent.get() == false) { // no derp no silent
    if(Yaw.get() == true) {
   mc.thePlayer.rotationYaw = YawAmount.get();
    }
    if(Pitch.get() == true) {
   mc.thePlayer.rotationPitch = PitchAmount.get();
    }
  } if(Derp.get() == true && Silent.get() == false) { // derp no silent
    mc.thePlayer.rotationYaw = randomIntFrom(0,360);
    mc.thePlayer.rotationPitch = randomIntFrom(-90,90);
  } if(Derp.get() == true && Silent.get() == true) { // derp silent
    mc.thePlayer.sendQueue.addToSendQueue(new lookpacket(randomIntFrom(0,360), randomIntFrom(-90,90), mc.thePlayer.onGround) );
  } if(Derp.get() == false && Silent.get() == true) { // no derp silent
  if(Yaw.get() == true && Pitch.get() == false) {
    mc.thePlayer.sendQueue.addToSendQueue(new lookpacket(YawAmount.get(), mc.thePlayer.rotationPitch, mc.thePlayer.onGround) );
  }
  if(Yaw.get() == false && Pitch.get() == true) {
    mc.thePlayer.sendQueue.addToSendQueue(new lookpacket(mc.thePlayer.rotationYaw, PitchAmount.get(), mc.thePlayer.onGround) );
  }
  if(Yaw.get() == true && Pitch.get() == true) {
    mc.thePlayer.sendQueue.addToSendQueue(new lookpacket(YawAmount.get(), PitchAmount.get(), mc.thePlayer.onGround) );
  }
  if(Yaw.get() == false && Pitch.get() == false) {
    // do nothing
  }
  }
  } 
  this.onDisable = function() {
  }
  this.addValues = function(values) {
    values.add(Yaw);
    values.add(YawAmount);
    values.add(Pitch);
    values.add(PitchAmount);
    values.add(Derp);
    values.add(Silent);
    }
}

function onLoad() {
};

function onEnable() {
    playerRotationClient = moduleManager.registerModule(playerRotation);
};

function onDisable() {
    moduleManager.unregisterModule(playerRotationClient);
};