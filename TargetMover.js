var AntiBot = Java.type("net.ccbluex.liquidbounce.features.module.modules.misc.AntiBot");
//LiquidBounce's Util
//var hogehoge = Java.type("").class;
var EntityUtils = Java.type("net.ccbluex.liquidbounce.utils.EntityUtils").class;
var RotationUtils = Java.type("net.ccbluex.liquidbounce.utils.RotationUtils").class;

function TargetMover() {
  var target=null
  var rotate=0
  var Move = value.createList("MovementMode", ["Teleport","Motion","SetXZ"],"Teleport");
  var Pos = value.createList("Position", ["Behind","TargetPos","RandomPos","RandomRotate","Rotate"],"TargetPos");
  var TargetMode = value.createList("TargetMode", ["Nearest","Attacked","Random"],"Nearest");
  var RotS = value.createFloat("RotateSpeed", 1,0,360);
  var Range = value.createFloat("Range", 3,0,30);
  var MaxR = value.createFloat("MaxTPRange",50,0,100);
  var PredictDeg = value.createFloat("PredictDeg", 45,-180,180);
  var MoveC = value.createBoolean("CancelMove",false);

  this.addValues = function(v) {
    v.add(Move)
    v.add(Pos)
    v.add(TargetMode)
    v.add(RotS)
    v.add(Range)
    v.add(MaxR)
    v.add(PredictDeg)
    v.add(MoveC)
  }
  this.getName = function() {
    return "TargetMover"
  }  
  this.getDescription = function() {
    return "TargetStrafe. Best for Vanilla?"
  }  
  this.getCategory = function() {
    return "Movement"
  }

  this.onMove = function(e) {
    MoveC.get() && (e.cancelEvent())
    //(TargetMode.get() == "SetXZ") && (
    //  e.setX(-Math.sin(rotate / 180 * Math.PI) * Range.get()),
    //  e.setZ( Math.cos(rotate / 180 * Math.PI) * Range.get())
    //)
  }
  this.onAttack = function(e) {
    if(TargetMode.get() == "Attacked") {chat.print("d");target=e.getTargetEntity()}
  }
  this.onUpdate = function() {
    //chat.print(target)
    switch (TargetMode.get()) {
      case "Nearest":
        target = getNearestTarget()
        break;
      //case "Random":
      //  for (var x in mc.theWorld.loadedEntityList) {
      //    //entity = mc.theWorld.loadedEntityList.unshift()
      //    entity = mc.theWorld.loadedEntityList
      //    RandomValue(entity)
      //    (mc.theWorld.loadedEntityList).indexOf()
      //    var entitie = mc.theWorld.loadedEntityList[x];
      //    if(entitie != null && entities != mc.thePlayer) {
      //      target = entities
      //    }
      //  }
      //  break;
    }
    if(target != null && !target.isDead && (target.getHealth() >0) && !AntiBot.isBot(target) && (target != mc.thePlayer)) {
      //chat.print("a")
      switch(Pos.get()) {
        case "Behind":
          rotate = (target.rotationYaw - 180);break;
        case "TargetPos":
          rotate = 0;break;
        case "RandomPos":
        case "RandomRotate":
          rotate = RandomValue(180,-180);break;
        case "Rotate":
          if(rotate >=180) {rotate+=RotS.get()}
          break;
      }
      switch(Move.get()) {
        case "Teleport":
          //chat.print("b");
          mc.thePlayer.setPosition(target.posX - Math.sin(rotate / 180 * Math.PI) * Range.get(),target.posY, target.posZ + Math.cos(rotate / 180 * Math.PI) * Range.get());break;
        case "Motion":
          mc.thePlayer.motionX += (target.posX - Math.sin(rotate / 180 * Math.PI) * Range.get());
          mc.thePlayer.motionZ += (target.posZ + Math.cos(rotate / 180 * Math.PI) * Range.get());
          break;
      }
    }
  }
  this.onEnable = function() {}
  this.onDisable = function() {}
}

/* Function Utils */
function getNearestTarget(entityType, fromEntity, _entity) {//thank you for Czechek.
  Java.from(mc.theWorld.loadedEntityList).filter(function (e) {e != mc.thePlayer && entityType ? e instanceof entityType : EntityUtils.isSelected(e, true)}).sort(function (a, b) {(_entity = fromEntity || mc.thePlayer).getDistanceToEntity(a) - _entity.getDistanceToEntity(b)})[0]
};

function vClip(offset) {
  mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + offset, mc.thePlayer.posZ);
}
function hclip(offset) {
  sin = Math.sin(mc.thePlayer.rotationYaw / 180 * Math.PI) * offset
  cos = Math.cos(mc.thePlayer.rotationYaw / 180 * Math.PI) * offset
  mc.thePlayer.setPosition(mc.thePlayer.posX -= sin, mc.thePlayer.posY, mc.thePlayer.posZ += cos);
}
function HMotion(offset) {
  mc.thePlayer.motionX -= Math.sin(mc.thePlayer.rotationYaw / 180 * Math.PI) * offset
  mc.thePlayer.motionZ += Math.cos(mc.thePlayer.rotationYaw / 180 * Math.PI) * offset
}
function VMotion(offset) {
  mc.thePlayer.motionY += offset;
}
function RandomDelay(MaxDelay, MinDelay) {
  return Math.floor(Math.random() * ((MaxDelay - MinDelay) + 1) + MinDelay);
}
function RandomValue(Max, Min) {
  return  Math.random() * (Max - Min) + Min;
}

var TargetMover = moduleManager.registerModule(new TargetMover);

TargetMover;

moduleManager.unregisterModule(TargetMover);

//function TargetStrafation() {
//  var rotYawVal = rotationYaw = 0;
//  var azoz = 0;
//  var target = null;
//  var sin = cos = 0;
//  var Fsin = Fcos = 0;
//  var targetposX = targetposZ = 0;
//  var FtargetposX = FtargetposZ = 0;
//  var NegTarRot = PosTarRot = rot = 0;
//  var posX = posZ = NearestX = NearestZ = tan = 0
//  var ticks = 0;
//  var state = 'Null'
//  var ratate = 360;
//  var wasDown=jump = false
//  var yaw=speed=0
//  var prefkey=0
//
//  var mode = value.createList("Mode", ["AimBottedLegitTS", "LegitlyRotateY","SetXZ", "MotionXZ", "None"], "") //Δ version
//  var fl = value.createInteger("FixLength", 10, 0, 100) //Δ version
//  var range = value.createFloat("Range", 3.25, 0, 8) //Δ version
//  var Rect = value.createInteger("Rectangle", 8, 0, 36) //Δ version
//  var Tole = value.createFloat("Tolerances", 0.3, 0, 1) //Δ version
//  //var Boost = value.createFloat("Boost", 0.1, 0, 180) //Δ version
//  var DegValue = value.createFloat("Deg", 8, 40, 360)
//  //var rotatemode = value.createList("RotateMode", ["Default", "AlwaysRotate", "random"], "Default")
//
//  this.addValues = function(v) {
//    v.add(mode);
//    v.add(fl);
//    v.add(range);
//    v.add(Rect);
//    v.add(Tole);
//    v.add(DegValue);
//    //v.add(rotatemode);
//  }
//  this.getName = function() {
//    return "TargetStrafation"
//  }
//  this.getDescription = function() {
//    return "TargetStrafation"
//  }
//  this.getCategory = function() {
//    return "Movement"
//  }
//  this.onAttack = function(e) {
//    target = e.getTargetEntity();
//  }
//
//  this.onEnable = function() {
//   wasDown = false
//  }
//  /*
//  this.onJump = function(e) {
//    if(jump) {e.cancelEvent()}
//  }
//  this.onMove = function(e) {
//    chat.print(e.getX())
//    chat.print(e.getZ())
//    if(mc.gameSettings.keyBindForward.pressed) {
//      prefkey =mc.gameSettings.keyBindForward.getKeyCode()
//      mc.gameSettings.keyBindForward.setKeyCode(255)
//    }else{
//      mc.gameSettings.keyBindForward.setKeyCode(prefkey)
//    }
//    //e.cancelEvent()
//    speed = pitagora(mc.thePlayer.motionX,mc.thePlayer.motionZ)
//    motionX = (mc.thePlayer.motionX * 0)
//    motionZ = (mc.thePlayer.motionZ * 0)
//    if (!(mc.thePlayer.movementInput.moveForward != 0 || mc.thePlayer.movementInput.moveStrafe != 0)) {
//        return
//    }
//    yaw = getMoveYaw()
//    mc.thePlayer.motionX = (((-Math.sin(yaw / 180 * Math.PI) * speed) + motionX))
//    mc.thePlayer.motionZ = ((( Math.cos(yaw / 180 * Math.PI) * speed) + motionZ))
//  }*/
//  this.onUpdate = function() {
//    /*
//    if (mc.thePlayer.onGround && mc.gameSettings.keyBindJump.isKeyDown && allDirectionsJumpValue.get() && (mc.thePlayer.movementInput.moveForward != 0 || mc.thePlayer.movementInput.moveStrafe != 0) && !(mc.thePlayer.isInWater || mc.thePlayer.isInLava || mc.thePlayer.isOnLadder || mc.thePlayer.isInWeb)) {
//        if (mc.gameSettings.keyBindJump.isKeyDown) {
//            mc.gameSettings.keyBindJump.pressed = false
//            wasDown = true
//        }
//        yaw = mc.thePlayer.rotationYaw
//        mc.thePlayer.rotationYaw = getMoveYaw()
//        mc.thePlayer.jump()
//        mc.thePlayer.rotationYaw = yaw
//        jump = true
//        if (wasDown) {
//            mc.gameSettings.keyBindJump.pressed = true
//            wasDown = false
//        }
//    } else {
//        jump = false
//    }
//    */
//    if (target != null && !target.isDead && !target.getHealth() <= 0) {
//      switch (mode.get()) {//umm bad code... but.. ah um.
//        
//        case "AimBottedLegitTS":
//          AimBotFunc(target.posX, target.posZ)
//
//          //rot = target.rotationYaw;
//          if ((target.rotationYaw + DegValue.get()) > 180) {
//            PosTarRot = ((-180) + (DegValue.get() - (180 - target.rotationYaw)))
//          } else {
//            PosTarRot = (target.rotationYaw + DegValue.get())
//          }
//          if ((target.rotationYaw - DegValue.get()) < -180) {
//            NegTarRot = (180 - (DegValue.get() - (180 - target.rotationYaw)))
//          } else {
//            NegTarRot = (target.rotationYaw - DegValue.get())
//          }
//          //Calculation of LookLength.
//          azoz = Math.atan2(target.posX - mc.thePlayer.posX, target.posZ - mc.thePlayer.posZ)
//          //Shape of range
//          if ((azoz / Math.PI * 180) <= PosTarRot && (azoz / Math.PI * 180) >= NegTarRot) {
//            if(mc.thePlayer.keyBindLeft.pressed) {
//              mc.gameSettings.keyBindLeft.pressed = false;
//              mc.gameSettings.keyBindRight.pressed = true;
//            }
//            if(mc.thePlayer.keyBindRight.pressed) {
//              mc.gameSettings.keyBindRight.pressed = false;
//              mc.gameSettings.keyBindLeft.pressed = true;
//            }
//          }
//          //Controller of F/B.
//          if (ticks == 0) {
//            switch (state) {
//              case 'outsided':
//                if (Math.sqrt(Math.pow(mc.thePlayer.posX - target.posX, 2) + Math.pow(mc.thePlayer.posZ - target.posZ, 2)) < range.get()) {
//                  mc.gameSettings.keyBindForward.pressed = true;
//                  ticks = fl.get()
//                }
//                break;
//              case 'inseded':
//                if (Math.sqrt(Math.pow(mc.thePlayer.posX - target.posX, 2) + Math.pow(mc.thePlayer.posZ - target.posZ, 2)) > range.get()) {
//                  mc.gameSettings.keyBindBack.pressed = true;
//                  ticks = fl.get()
//                }
//                break;
//            }
//            if (Math.sqrt(Math.pow(mc.thePlayer.posX - target.posX, 2) + Math.pow(mc.thePlayer.posZ - target.posZ, 2)) < range.get()) {
//              state = 'inseded'
//            }
//            if (Math.sqrt(Math.pow(mc.thePlayer.posX - target.posX, 2) + Math.pow(mc.thePlayer.posZ - target.posZ, 2)) > range.get()) {
//              state = 'outsided'
//            }
//          } else {ticks--}
//          break;
//        case "LegitlyRotateY":
//          chat.print("ratate="+ratate)
//          AimBotFunc(target.posX - Math.sin(ratate / 180 * Math.PI) * range.get(), target.posZ + Math.cos(ratate / 180 * Math.PI) * range.get())
//          if(_2DRoundCheck(target.posX - Math.sin(ratate / 180 * Math.PI) * range.get(),target.posZ + Math.cos(ratate / 180 * Math.PI) * range.get(),Tole.get())) {
//            chat.print("test")
//            if(ratate >= 360) {ratate = 360 / Rect.get()
//            }else{
//              if(mc.gameSettings.keyBindForward.pressed) {ratate += (360 / Rect.get())}
//              else if(mc.gameSettings.keyBindBack.pressed) {ratate -= (360 / Rect.get())}
//            }
//          }
//          break;
//      case "SetXZ":
//        break;
//      case "MotionXZ":
//      }
//    }
//  }
//  this.onDisable = function() {
//    neared = false;
//  }
//}