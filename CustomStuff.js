var scriptName = "Custom Stuff";
var scriptVersion = 1.0;
var scriptAuthor = "Sms_Gamer";

var CustomBHop = new CustomBHop();

var Strafe = moduleManager.getModule("Strafe")

var c03packetplayer = Java.type("net.minecraft.network.play.client.C03PacketPlayer");

var client;
var client2;
var client3;

function CustomBHop() {
  var resetH = value.createBoolean("resetH", false);
  var resetY = value.createBoolean("resetY", false);
  var strafing = value.createBoolean("strafing", false);
  var jumpY = value.createFloat("jumpY", 0.42, 0, 1);
  var vClipJumpY = value.createFloat("vClipJumpY", 0, 0, 1);
  var jumpHType = value.createList("jumpHType", ["Add", "Set", "Times"], "Add");
  var jumpH = value.createFloat("jumpH", 0.2, -0.5, 5);
  var jumpHClip = value.createFloat("jumpHClip", 0, -0.5, 5);
  var upYType = value.createList("upYType", ["Add", "Set", "Times"], "Add");
  var upY = value.createFloat("upY", 0, -5, 5);
  var upHType = value.createList("upHType", ["Add", "Set", "Times"], "Add");
  var upH = value.createFloat("upH",0 , -0.5, 5);
  var upTimer = value.createFloat("upTimer", 1, 0.1, 10);
  var upAirSpeed = value.createFloat("upAirSpeed", 0.02, -0.5, 5);
  var downYType = value.createList("downYType", ["Add", "Set", "Times"], "Add");
  var downY = value.createFloat("downY", 0, -5, 5);
  var downHType = value.createList("downHType", ["Add", "Set", "Times"], "Add");
  var downH = value.createFloat("downH", 0, -0.5, 5);
  var downTimer = value.createFloat("downTimer", 1, 0.1, 10);
  var downAirSpeed = value.createFloat("downAirSpeed", 0.02, -0.5, 5);
  var beforeYType = value.createList("beforeYType", ["Add", "Set", "Times"], "Add");
  var beforeY = value.createFloat("beforeY", 0, -5, 5);
  var beforeHType = value.createList("beforeHType", ["Add", "Set", "Times"], "Add");
  var beforeH = value.createFloat("beforeH",0 , -0.5, 5);
  var beforeTimer = value.createFloat("beforeTimer", 1, 0.1, 10);
  var beforeAirSpeed = value.createFloat("beforeAirSpeed", 0.02, -0.5, 5);
  var ticksAction = value.createInteger("ticksAction", 0, 0, 20);
  var whenYType = value.createList("whenYType", ["Add", "Set", "Times"], "Add");
  var whenY = value.createFloat("whenY", 0, -5, 5);
  var whenHType = value.createList("whenHType", ["Add", "Set", "Times"], "Add");
  var whenH = value.createFloat("whenH",0 , -0.5, 5);
  var whenTimer = value.createFloat("whenTimer", 1, 0.1, 10);
  var whenAirSpeed = value.createFloat("whenAirSpeed", 0.02, -0.5, 5);
  var afterYType = value.createList("afterYType", ["Add", "Set", "Times"], "Add");
  var afterY = value.createFloat("afterY", 0, -5, 5);
  var afterHType = value.createList("afterHType", ["Add", "Set", "Times"], "Add");
  var afterH = value.createFloat("afterH",0 , -0.5, 5);
  var afterTimer = value.createFloat("afterTimer", 1, 0.1, 10);
  var afterAirSpeed = value.createFloat("afterAirSpeed", 0.02, -0.5, 5);
  var ticks;
  
    this.getName = function() {
        return "CustomBHop";
    };

    this.getDescription = function() {
        return "Custom bHop";
    };

    this.getCategory = function() {
        return "Movement";
    };
    this.onEnable = function() {
      ticks = 0;
    }
    this.onUpdate = function() {
        if ((mc.gameSettings.keyBindForward.isKeyDown() || mc.gameSettings.keyBindLeft.isKeyDown() || mc.gameSettings.keyBindRight.isKeyDown() || mc.gameSettings.keyBindBack.isKeyDown()) && !mc.thePlayer.isSneaking()) {
          mc.thePlayer.setSprinting(true);
          mc.gameSettings.keyBindJump.pressed = false;
          if(strafing.get()){
            Strafe.setState(true);
          }
          if(mc.thePlayer.onGround){
            ticks=0;
            vClip(vClipJumpY.get());
            hClip(jumpHClip.get());
            mc.thePlayer.motionY = jumpY.get();
            mXZ(jumpHType.get(), jumpH.get());
          }else{
            ticks++
            if(mc.thePlayer.motionY>0){
              mc.timer.timerSpeed = upTimer.get();
              mY(upYType.get(), upY.get());
              mXZ(upHType.get(), upH.get());
              airSpeed(upAirSpeed.get());
            }
            if(mc.thePlayer.motionY<0){
              mc.timer.timerSpeed = downTimer.get();
              mY(downYType.get(), downY.get());
              mXZ(downHType.get(), downH.get());
              airSpeed(downAirSpeed.get());
            }
            if(ticks<ticksAction.get()){
              mc.timer.timerSpeed = beforeTimer.get();
              mY(beforeYType.get(), beforeY.get());
              mXZ(beforeHType.get(), beforeH.get());
              airSpeed(beforeAirSpeed.get());
            }
            if(ticks>ticksAction.get()){
              mc.timer.timerSpeed = afterTimer.get();
              mY(afterYType.get(), afterY.get());
              mXZ(afterHType.get(), afterH.get());
              airSpeed(afterAirSpeed.get());
            }
            if(ticks==ticksAction.get()){
              mc.timer.timerSpeed = whenTimer.get();
              mY(whenYType.get(), whenY.get());
              mXZ(whenHType.get(), whenH.get());
              airSpeed(whenAirSpeed.get());
            }
          }
        }else{
          mc.thePlayer.speedInAir = 0.02;
          mc.timer.timerSpeed = 1
          Strafe.setState(false);
        }
    }
    this.onDisable = function () {
      mc.thePlayer.speedInAir = 0.02;
      mc.timer.timerSpeed = 1
      Strafe.setState(false);
      if(resetH.get()){
        mc.thePlayer.motionX = 0;
        mc.thePlayer.motionZ = 0;
      }
      if(resetY.get() && mc.thePlayer.motionY > 0){
        mc.thePlayer.motionY = 0;
      }
    }
    this.addValues = function(values) {
      values.add(resetH);
      values.add(resetY);
      values.add(strafing);
      values.add(jumpY);
      values.add(vClipJumpY);
      values.add(jumpHType);
      values.add(jumpH);
      values.add(jumpHClip);
      values.add(upYType);
      values.add(upY);
      values.add(upHType);
      values.add(upH);
      values.add(upAirSpeed);
      values.add(upTimer);
      values.add(downYType);
      values.add(downY);
      values.add(downHType);
      values.add(downH);
      values.add(downAirSpeed);
      values.add(downTimer);
      values.add(beforeYType);
      values.add(beforeY);
      values.add(beforeHType);
      values.add(beforeH);
      values.add(beforeAirSpeed);
      values.add(beforeTimer);
      values.add(ticksAction);
      values.add(whenYType);
      values.add(whenY);
      values.add(whenHType);
      values.add(whenH);
      values.add(whenAirSpeed);
      values.add(whenTimer);
      values.add(afterYType);
      values.add(afterY);
      values.add(afterHType);
      values.add(afterH);
      values.add(afterAirSpeed);
      values.add(afterTimer);
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
    client = moduleManager.registerModule(CustomBHop);
}

function onDisable() {
    moduleManager.unregisterModule(client);
}