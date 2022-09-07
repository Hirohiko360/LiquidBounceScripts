var scriptName = "AntiLagBack";
var scriptAuthor = "FunkNight";
var scriptVersion = 3.0;
var AntiLagBackModule = new AntiLagBackModule();
var Killaura = moduleManager.getModule('Killaura')
var a = 0;
var Client;
var ticks

function AntiLagBackModule() {
	
	this.getName = function(){
		return "AntiLagBack";
	}
	
	this.getDescription = function() {
		return "AntiLagBack";
	}
	this.getCategory = function() {
		return "Fun";
	}
	this.getTag = function() {
		return "AAC5"
	}
	this.onEnable = function(){
		ticks = 0;
	}
	this.onUpdate = function(){
		if(mc.thePlayer.onGround){
			if(b = 0){
				Killaura.getValue('KeepSprint').set(true)
				b++;
			}
		}else{
			b = 0;
			if(a = 0){
				Killaura.getValue('KeepSprint').set(false)
				a++;
			}
		}
		if(ticks > 250){
			mc.thePlayer.isOnLadder()&&mc.gameSettings.keyBindJump.pressed&&(mc.thePlayer.motionY=0.11)
			}
		if(ticks > 500){
			ticks = 0;
		}else{
			ticks++;
		}
	}
	this.onDisable - function(){
		mc.timer.timerSpeed = 1.00;
	}
}
function onEnable() {
    Client = moduleManager.registerModule(AntiLagBackModule);
}

function onDisable() {
    moduleManager.unregisterModule(Client);
}