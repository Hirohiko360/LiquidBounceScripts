var scriptName = "Velocity"
var scriptVersion = 1.0;
var scriptAuthor = "DFH"
var FakeVelocityModule = new FakeVelocityModule();
var FakeVelocityClient;

function FakeVelocityModule() {
	
		this.getName = function(){
			return "Velocity+"
		}
		
		this.getTag = function() {
			return "Velocity+"
		}
																																																														
		this.getDescription = function() {
			return "Velocity+"
		}
																																										
		this.getCategory = function() {
			return "Misc"
		}
		
		this.onEnable = function() {
		}
		
		this.onUpdate = function() {
			if(mc.thePlayer.onGround){
				if(mc.thePlayer.hurtTime > 0 && mc.thePlayer.hurtTime <= 6){
					mc.thePlayer.motionX *= 0.600151164;
					mc.thePlayer.motionZ *= 0.600151164;
				}
				if(mc.thePlayer.hurtTime > 0 && mc.thePlayer.hurtTime <= 4){
					mc.thePlayer.motionX *= 0.800151164;
					mc.thePlayer.motionZ *= 0.800151164;
				}
			}else{
				if(mc.thePlayer.hurtTime > 0 && mc.thePlayer.hurtTime <= 9) {
					mc.thePlayer.motionX *= 0.8001421204;
					mc.thePlayer.motionZ *= 0.8001421204;
				}
			}
		}
}
function onEnable() {
	FakeVelocityClient = moduleManager.registerModule(FakeVelocityModule);
}
function onDisable() {
	moduleManager.unregisterModule(FakeVelocityModuleClient);
}