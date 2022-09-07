var scriptName = "AAC4.1.1 NoWeb";
var scriptAuthor = "cancername";
var scriptVersion = 1.0;
// It's slightly slower than normal
 // Converts from degrees to radians.
 Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
  };   
  // Converts from radians to degrees.
  Math.degrees = function(radians) {
    return radians * 180 / Math.PI;
  };
function hMotion(offset) {
        mc.thePlayer.motionX = parseFloat(Math.cos(Math.radians(mc.thePlayer.rotationYaw + 90.0)) * offset)
        mc.thePlayer.motionZ = parseFloat(Math.sin(Math.radians(mc.thePlayer.rotationYaw + 90.0)) * offset)
}
function NoWeb() {
  this.getName = function () {
    return "AAC4NoWeb";
  }
  this.getDescription = function () {
    return "by cancername";
  }
  this.getCategory = function () {
    return "Fun";
  }
  this.onUpdate = function () {
		 if (mc.thePlayer.onGround && mc.thePlayer.isInWeb) {
		hMotion(0.35)
		 }
		 if (mc.thePlayer.onGround && mc.thePlayer.isInWeb && mc.thePlayer.ticksExisted % 8 == 0) {
		hMotion(0.8)
		 }
  }
  this.onDisable = function () {}
}
var noWeb = moduleManager.registerModule(new NoWeb);
function onLoad() {}
function onEnable() {
  noWeb;
}
  function onDisable() {
  moduleManager.unregisterModule(noWeb);
}