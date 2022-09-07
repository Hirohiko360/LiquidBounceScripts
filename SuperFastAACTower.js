var scriptName = "AACTower";
var scriptAuthor = "Nvaros";
var scriptVersion = 1.1;

var aactower = new AACTower();
var aactowerClient;

function AACTower() {
	
	var scaffold = moduleManager.getModule("Scaffold");
	
	this.getName = function() {
        return "AACTower";
    };
   
    this.getDescription = function() {
        return "Tower for AAC. Use it with 'Expand' scaffold.";
    };
    
    this.getCategory = function() {
        return "Fun";
    };
  
    this.onEnable = function() {

	mc.thePlayer.ticksExisted = 0;
		
	// This is optional. Can be removed if these commands shouldn't be executed every time
	// you're toggling it (you can also just bind scaffold and this to the same key)
	
	scaffold.setState(true);
	commandManager.executeCommand(".scaffold mode expand");
	commandManager.executeCommand(".scaffold expandlength 1");
    };

    this.onDisable = function() {
     scaffold.setState(false);
    };
 
    this.onUpdate = function() {
    
	if (mc.thePlayer.ticksExisted % 4 == 1) {
			mc.thePlayer.motionY = 0.4195464;
			mc.thePlayer.setPosition(mc.thePlayer.posX - 0.035, mc.thePlayer.posY, mc.thePlayer.posZ);	   
			
	} else {
				
			if (mc.thePlayer.ticksExisted % 4 == 0) {
				mc.thePlayer.motionY = -0.5;
				mc.thePlayer.setPosition(mc.thePlayer.posX + 0.035, mc.thePlayer.posY, mc.thePlayer.posZ);
			}			
		}	
    };    
}

function onEnable() {
    
aactowerClient = moduleManager.registerModule(aactower);
	
};

function onDisable() {
    
moduleManager.unregisterModule(aactowerClient);
	
};
	