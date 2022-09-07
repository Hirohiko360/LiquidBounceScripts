var scriptName = "Health";
var scriptVersion = 1.0;
var scriptAuthor = "SuperSkidder";
var Module = new Module();
var client;

script.import("lib/glFunctions.js");
script.import("lib/systemFunctions.js")

function Module() {
  
   var interval;
    this.getName = function() {
        return "Health";
    };

    this.getDescription = function() {
        return "Render";
    };

    this.getCategory = function() {
        return "Render";
    };
	
	this.onRender2D = function (){
		var mcHeight = getScaledHeight();
        var mcWidth = getScaledWidth();
		var Playerhealth = mc.theplayer.getHealth(); 
		        if(PlayerHealth<10){
        mc.fontRendererObj.drawStringWithShadow(PlayerHealth , mcWidth - mcWidth / 2 - 5, mcHeight - mcHeight / 2 - 14, 0xff0000);
}else{
        mc.fontRendererObj.drawStringWithShadow(PlayerHealth , mcWidth - mcWidth / 2 - 5, mcHeight - mcHeight / 2 - 14, 0x00CD00);
}
		
	}
    
}
function onLoad() {}

function onEnable() {
    client = moduleManager.registerModule(Module);
}

function onDisable() {
    moduleManager.unregisterModule(client);
}