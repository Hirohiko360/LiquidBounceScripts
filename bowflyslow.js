var script=registerScript({name:"bowfly",version:"1.0",authors:["cnm"]});script.registerModule({name:"bowflyslow",description:"useless",category:"Fun"},function(module){var EnumFacing=Java.type("net.minecraft.util.EnumFacing")
var Rotation=Java.type("net.ccbluex.liquidbounce.utils.Rotation")
var Vec3=Java.type("net.minecraft.util.Vec3")
var RotationUtils=Java.type("net.ccbluex.liquidbounce.utils.RotationUtils")
var BlockPos=Java.type("net.minecraft.util.BlockPos")
var canPlace=false
module.on("update",function(){RotationUtils.setTargetRotation(new Rotation(mc.thePlayer.rotationYaw,-90))
mc.timer.timerSpeed=0.07;[EnumFacing.NORTH,EnumFacing.SOUTH,EnumFacing.WEST,EnumFacing.EAST].forEach(function(face){if(mc.thePlayer.ticksExisted%2==0){mc.gameSettings.keyBindUseItem.pressed=true}
if(mc.thePlayer.ticksExisted%5==0){mc.gameSettings.keyBindUseItem.pressed=false}})});module.on("disable",function(){mc.timer.timerSpeed=1.00;mc.gameSettings.keyBindUseItem.pressed=false});});