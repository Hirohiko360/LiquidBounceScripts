var scriptName = "FastUse";
var scriptAuthor = "By Virus";
var scriptVersion = 1.1;

var ItemFood = Java.type('net.minecraft.item.ItemFood');


function EatModule() {

    this.getName = function() {
        return "FastEatTimer";
    }

    this.getDescription = function() {
        return "Custom Timer"
    }

    this.getCategory = function() {
        return "Misc";

    }
    
    this.onUpdate = function() {
    	if (mc.thePlayer.isEating() && mc.thePlayer.getHeldItem().getItem() instanceof ItemFood) {
    		mc.timer.timerSpeed = 1.30; //Custom timer
    	}else{
    		mc.timer.timerSpeed = 1.0;


    	}

        

    }

    this.onEnable = function() {
        
    }
    
    this.onDisable = function() {
    	mc.timer.timerSpeed = 1.0;

  
    }


}

var eatModule = new EatModule();
var eatModuleClient;

function onEnable() {
    eatModuleClient = moduleManager.registerModule(eatModule);
}

function onDisable() {
    moduleManager.unregisterModule(eatModuleClient);
}