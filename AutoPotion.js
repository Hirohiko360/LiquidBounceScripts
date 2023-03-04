var scriptName = "AutoPotion";
var scriptAuthor = "By hsbplo";
var scriptVersion = 1.0;

var ItemPotion = Java.type('net.minecraft.item.ItemPotion');

function ExampleModule() {
    this.getName = function() {
        return "AutoPotion";
    }
    this.getDescription = function() {
        return ".";
    }
    this.getCategory = function() {
        return "Player"; 
    }
    this.onEnable = function() {
       
    }
    this.onDisable = function() {
        
    }
    this.onUpdate = function() {
    	if (mc.thePlayer.getHeldItem().getItem() instanceof ItemPotion) {
    		if(mc.thePlayer.getHealth() <= 12) {
    			mc.gameSettings.keyBindUseItem.pressed = true;
    		}else{
    			mc.gameSettings.keyBindUseItem.pressed = false;

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