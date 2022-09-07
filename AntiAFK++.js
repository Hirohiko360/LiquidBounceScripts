var scriptName = "AntiAFK++";
var scriptAuthor = "cancername";
var scriptVersion = 2.1;
function FlyModule() {
  function randomFloat(a,e){return Math.random()*(e-a)+a}function randomInt(a,e){return a=Math.ceil(a),e=Math.floor(e),Math.floor(Math.random()*(e-a))+a}var a=value.createInteger("MinTicks",5,0,20),b=value.createInteger("MaxTicks",15,0,40),c=value.createBoolean("Jump",!0),d=value.createBoolean("Rotate",!0),e=value.createBoolean("LessAnnoyingRots",!0);f=value.createFloat("RandomMotionX",.15,0,.5),g=value.createFloat("RandomMotionZ",.15,0,.5),h=value.createBoolean("Swing",!1),i=value.createBoolean("Sneak",!1),this.addValues=function(t){t.add(a),t.add(b),t.add(c),t.add(d),t.add(e),t.add(f),t.add(g),t.add(h),t.add(i)},this.getName=function(){return"AntiAFK++"},this.getDescription=function(){return"A better AntiAFK"},this.getCategory=function(){return"Misc"};
    this.onUpdate = function() {
      if (mc.thePlayer.onGround && mc.thePlayer.ticksExisted % randomInt(a.get(), b.get()) == 0) {
      if (d.get() && !e.get()) {
          mc.thePlayer.rotationYaw = randomFloat(-180, 180);
          mc.thePlayer.rotationPitch = randomFloat(-90, 90);
      }
      if (d.get() && e.get()) {
          mc.thePlayer.rotationYaw += randomFloat(-10, 10);
          if (mc.thePlayer.rotationPitch > 90 || mc.thePlayer.rotationPitch < -90) mc.thePlayer.rotationYaw = 0;
          mc.thePlayer.rotationPitch += randomFloat(-10, 10);
      }
      mc.thePlayer.motionX = randomFloat(-f.get(), f.get());
      if (c.get()) mc.thePlayer.jump();
      mc.thePlayer.motionZ = randomFloat(-g.get(), g.get());
      if (h.get()) mc.thePlayer.swingItem();
      if (i.get()) mc.gameSettings.keyBindSneak.pressed = true;
      else mc.gameSettings.keyBindSneak.pressed = false;
  }
	}
    this.onEnable=function(){},this.onDisable=function(){mc.gameSettings.keyBindSneak.pressed=!1}};var flyModuleClient,flyModule=new FlyModule;function onEnable(){flyModuleClient=moduleManager.registerModule(flyModule)}function onDisable(){moduleManager.unregisterModule(flyModuleClient)}