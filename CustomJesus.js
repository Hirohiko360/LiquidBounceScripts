var scriptName = "Custom Jesus";
var scriptVersion = 1.0;
var scriptAuthor = "Sms_Gamer";

var CustomJesus = new CustomJesus();

var Strafe = moduleManager.getModule("Strafe")

var c03packetplayer = Java.type("net.minecraft.network.play.client.C03PacketPlayer");

var client;
var client2;
var client3;

function CustomJesus() {
  var spoofGround = value.createBoolean("spoofGround", false);
  
  var bTYType = value.createList("bTYType", ["Add", "Set", "Times"], "Add");
  var bTY = value.createFloat("bTY", 0, -5, 5);
  var bTHType = value.createList("bTHType", ["Add", "Set", "Times"], "Add");
  var bTH = value.createFloat("bTH",0 , -0.5, 5);
  var bTTimer = value.createFloat("bTTimer", 1, 0.1, 10);
  var ticksAction = value.createInteger("ticksAction", 0, 0, 20);
  var wTYType = value.createList("wTYType", ["Add", "Set", "Times"], "Add");
  var wTY = value.createFloat("wTY", 0, -5, 5);
  var wTHType = value.createList("wTHType", ["Add", "Set", "Times"], "Add");
  var wTH = value.createFloat("wTH",0 , -0.5, 5);
  var wTTimer = value.createFloat("wTTimer", 1, 0.1, 10);
  var aTYType = value.createList("aTYType", ["Add", "Set", "Times"], "Add");
  var aTY = value.createFloat("aTY", 0, -5, 5);
  var aTHType = value.createList("aTHType", ["Add", "Set", "Times"], "Add");
  var aTH = value.createFloat("aTH",0 , -0.5, 5);
  var aTTimer = value.createFloat("aTTimer", 1, 0.1, 10);
  
  var bYYType = value.createList("bYYType", ["Add", "Set", "Times"], "Add");
  var bYY = value.createFloat("bYY", 0, -5, 5);
  var bYHType = value.createList("bYHType", ["Add", "Set", "Times"], "Add");
  var bYH = value.createFloat("bYH",0 , -0.5, 5);
  var bYTimer = value.createFloat("bYTimer", 1, 0.1, 10);
  var posYAction = value.createFloat("posYAction", 0, 0, 2);
  var aYYType = value.createList("aYYType", ["Add", "Set", "Times"], "Add");
  var aYY = value.createFloat("aYY", 0, -5, 5);
  var aYHType = value.createList("aYHType", ["Add", "Set", "Times"], "Add");
  var aYH = value.createFloat("aYH",0 , -0.5, 5);
  var aYTimer = value.createFloat("aYTimer", 1, 0.1, 10);
  var ticks;
  var y;
  var once;
  
    this.getName = function() {
        return "CustomJesus";
    };

    this.getDescription = function() {
        return "Custom Jesus";
    };

    this.getCategory = function() {
        return "Movement";
    };
    this.onEnable = function() {
      ticks = 0;
      once = true;
    }
    this.onUpdate = function() {
      if(mc.thePlayer.isInWater()){
        if(once){
          y=mc.thePlayer.posY;
          once = false;
        }
        ticks++;
        if(spoofGround.get()){
          mc.getNetHandler().addToSendQueue(new c03packetplayer.C04PacketPlayerPosition(true));
        }
        if(ticks<ticksAction.get()){
          mc.timer.timerSpeed = bTTimer.get();
          mY(bTYType.get(), bTY.get());
          mXZ(bTHType.get(), bTH.get());
        }
        if(ticks>ticksAction.get()){
          mc.timer.timerSpeed = aTTimer.get();
          mY(aTYType.get(), aTY.get());
          mXZ(aTHType.get(), aTH.get());
        }
        if(ticks==ticksAction.get()){
          mc.timer.timerSpeed = wTTimer.get();
          mY(wTYType.get(), wTY.get());
          mXZ(wTHType.get(), wTH.get());
        }
        if(y<mc.thePlayer.posY+posYAction.get()){
          mc.timer.timerSpeed = bTTimer.get();
          mY(bYYType.get(), bYY.get());
          mXZ(bYHType.get(), bYH.get());
        }
        if(y>mc.thePlayer.posY+posYAction.get()){
          mc.timer.timerSpeed = aYTimer.get();
          mY(aYYType.get(), aYY.get());
          mXZ(aYHType.get(), aYH.get());
        }
      }else{
        ticks=0;
        once = true;
      }
    }
    this.onDisable = function () {
      mc.thePlayer.speedInAir = 0.02;
      mc.timer.timerSpeed = 1
    }
    this.addValues = function(values) {
      values.add(spoofGround);
      values.add(bYYType);
      values.add(bYY);
      values.add(bYHType);
      values.add(bYH);
      values.add(bYTimer);
      values.add(posYAction);
      values.add(aYYType);
      values.add(aYY);
      values.add(aYHType);
      values.add(aYH);
      values.add(aYTimer);
      values.add(bTYType);
      values.add(bTY);
      values.add(bTHType);
      values.add(bTH);
      values.add(bTTimer);
      values.add(ticksAction);
      values.add(wTYType);
      values.add(wTY);
      values.add(wTHType);
      values.add(wTH);
      values.add(wTTimer);
      values.add(aTYType);
      values.add(aTY);
      values.add(aTHType);
      values.add(aTH);
      values.add(aTTimer);
    }
}

 // Converts from degrees to radians.
 Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
  };
   
  // Converts from radians to degrees.
  Math.degrees = function(radians) {
    return radians * 180 / Math.PI;
  };


function vClip(offset) {
    mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + offset, mc.thePlayer.posZ); 
}

function hClip(offset) {
    var playerYaw = Math.radians(mc.thePlayer.rotationYaw);
    mc.thePlayer.setPosition(mc.thePlayer.posX - (Math.sin(playerYaw) * offset), mc.thePlayer.posY, mc.thePlayer.posZ + (Math.cos(playerYaw) * offset));
}

function airSpeed(offset) {
    mc.thePlayer.speedInAir = offset;
}

function speedMultiply(offset) {
  mc.thePlayer.motionX *= offset;
  mc.thePlayer.motionZ *= offset;
}

function timer(offset){
  mc.timer.timerSpeed = offset;
}

function mY(type, offset){
        if(type.equals("Set")){
          mc.thePlayer.motionY = offset;
        }
        if(type.equals("Times")){
          mc.thePlayer.motionY *= offset;
        }
        if(type.equals("Add")){
          mc.thePlayer.motionY += offset;
        }
}
function mXZ(type, offset){
  var playerYaw = Math.radians(mc.thePlayer.rotationYaw);
        if(type.equals("Times")){
          mc.thePlayer.motionX *= offset;
          mc.thePlayer.motionZ *= offset;
        }
        if(type.equals("Add")){
          mc.thePlayer.motionX += Math.cos(Math.radians(mc.thePlayer.rotationYaw + 90.0)) * offset;
          mc.thePlayer.motionZ += Math.sin(Math.radians(mc.thePlayer.rotationYaw + 90.0)) * offset;
        }
        if(type.equals("Set")){
          mc.thePlayer.motionX = Math.cos(Math.radians(mc.thePlayer.rotationYaw + 90.0)) * offset;
          mc.thePlayer.motionZ = Math.sin(Math.radians(mc.thePlayer.rotationYaw + 90.0)) * offset;
        }
}
function onLoad() {}

function onEnable() {
    client = moduleManager.registerModule(CustomJesus);
}

function onDisable() {
    moduleManager.unregisterModule(client);
}