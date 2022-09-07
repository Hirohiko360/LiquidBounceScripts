var scriptName = "LagBackCheck";
var scriptAuthor = "Wu_dian";
var scriptVersion = 4.1;

var S08PacketPlayerPosLook = Java.type("net.minecraft.network.play.server.S08PacketPlayerPosLook");
var speed = moduleManager.getModule("Speed");
var fly = moduleManager.getModule("Fly");
var longjump = moduleManager.getModule("LongJump");
var step = moduleManager.getModule("Step");
var speedstate = false;
var flystate = false;
var longjumpstate = false;
var stepstate = false;
function ExampleModule() {
	var prefix = "§8[§2LagBackCheck§8]§c ";
	var speedValue = value.createBoolean("Speed", false);
	var flyValue = value.createBoolean("Fly", true);
	var longjumpValue = value.createBoolean("LongJump", true);
	var stepValue = value.createBoolean("Step", true);
	
    this.getName = function() {
        return "LagBackCheck";
    }
    this.getDescription = function() {
        return "LagBackCheck";
    }
    this.getCategory = function() {
        return "Fun"; 
    }
	this.addValues = function(values) {
        values.add(speedValue);
		values.add(flyValue);
		values.add(longjumpValue);
		values.add(stepValue);
    }
	this.onPacket = function(event){
	var packet = event.getPacket();	
	speedstate = speed.getState();
	flystate = fly.getState();
	longjumpstate = longjump.getState();
	stepstate = step.getState();
	
		if (packet instanceof S08PacketPlayerPosLook){
			var aaa = packet;
			aaa.yaw = mc.thePlayer.rotationYaw;
			aaa.pitch = mc.thePlayer.rotationPitch;
				
				if(speedstate){
					if(mc.gameSettings.keyBindForward.isKeyDown() || mc.gameSettings.keyBindBack.isKeyDown() || mc.gameSettings.keyBindLeft.isKeyDown() || mc.gameSettings.keyBindRight.isKeyDown()){
					if (speedValue.get()){
						speed.setState(false);
						chat.print(prefix+"Speed Flag detected! Disabled Speed!");
					} else {
						chat.print(prefix+"Speed Flag detected!");
					}
					}
				}
				if(stepstate && mc.thePlayer.motionX == 0 && mc.thePlayer.motionZ == 0){
					if(mc.gameSettings.keyBindForward.isKeyDown() || mc.gameSettings.keyBindBack.isKeyDown() || mc.gameSettings.keyBindLeft.isKeyDown() || mc.gameSettings.keyBindRight.isKeyDown()){
						if (stepValue.get()){
							step.setState(false);
							chat.print(prefix+"Step Flag detected! Disabled Step!");
						} else {
							chat.print(prefix+"Step Flag detected!");
						}
					}
				}
				
				//LongJump LagBackCheck
				
				if(longjumpstate && mc.thePlayer.motionX == 0 && mc.thePlayer.motionZ == 0){
					if(mc.gameSettings.keyBindForward.isKeyDown() || mc.gameSettings.keyBindBack.isKeyDown() || mc.gameSettings.keyBindLeft.isKeyDown() || mc.gameSettings.keyBindRight.isKeyDown()){
						if (longjumpValue.get()){
							longjump.setState(false);
							chat.print(prefix+"LongJump Flag detected! Disabled LongJump!");
						} else {
							chat.print(prefix+"LongJump Flag detected!");
						}
				}
				}
				
				if(flystate){
					if(mc.gameSettings.keyBindForward.isKeyDown() || mc.gameSettings.keyBindBack.isKeyDown() || mc.gameSettings.keyBindLeft.isKeyDown() || mc.gameSettings.keyBindRight.isKeyDown()){
						if (flyValue.get()){
							fly.setState(false);
							chat.print(prefix+"Fly Flag detected! Disabled Fly!");
						} else {
							chat.print(prefix+"Fly Flag detected!");
						}
					}
				}
		}				
	}
	this.onUpdate = function(){
		//LongJump Auto Disable
		if(longjumpstate && mc.thePlayer.motionX == 0 && mc.thePlayer.motionZ == 0){
			if(mc.gameSettings.keyBindForward.isKeyDown() || mc.gameSettings.keyBindBack.isKeyDown() || mc.gameSettings.keyBindLeft.isKeyDown() || mc.gameSettings.keyBindRight.isKeyDown()){
				if (longjumpValue.get()){
					longjump.setState(false);
				}
			}
		}
		
	}
}
var exampleModule = new ExampleModule();
var exampleModuleClient;

function onLoad() {}

function onEnable() {
    exampleModuleClient = moduleManager.registerModule(exampleModule);
}

function onDisable() {
    moduleManager.unregisterModule(exampleModuleClient);
}