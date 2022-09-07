var scriptVersion = 1.0; 
var scriptName = "SmoothCamera"; 
var scriptAuthor = "soulplexis";

var smoothCamera = new SmoothCamera();
var smoothCameraClient;

function SmoothCamera() {
    this.getName = function() {
        return "SmoothCamera";
    };

    this.getDescription = function() {
        return "Makes your view unnecessarily smooth.";
    };

    this.getCategory = function() {
        return "Render";
    };
    this.onEnable = function() {
    }

    this.onUpdate = function() {
    	 mc.gameSettings.smoothCamera = true;
	}
    this.onDisable = function() {
		mc.gameSettings.smoothCamera = false;
    }
}


function onLoad() {
};

function onEnable() {
    smoothCameraClient = moduleManager.registerModule(smoothCamera);
};

function onDisable() {
    moduleManager.unregisterModule(smoothCameraClient);
};