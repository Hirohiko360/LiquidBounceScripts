var scriptName = "Dyamic HeartBeat";
var scriptAuthor = "Soulplexis";
var scriptVersion = 1.0;


function HeartBeat() {
	var ticks = 0;
    this.getName = function() {
        return "HeartBeat";
    }

    this.getCategory = function() {
        return "Render";   
    }

    this.getDescription = function() {
        return "View fov like Heartbeat.";
    }

    this.onMotion = function() {
		ticks++;
		if(ticks <= 80) {
			mc.gameSettings.fovSetting += 0.10
		}
			if(ticks >= 80) {
			mc.gameSettings.fovSetting -= 0.10
		}
		if(ticks >= 160) {
			ticks = 0;
		}
		
    }
	this.onDisable = function() {
		mc.gameSettings.fovSetting = 70;
	}
}

var heartBeat = new HeartBeat();
var heartBeatClient;

function onEnable() {
    heartBeatClient = moduleManager.registerModule(heartBeat);
}

function onDisable() {
    moduleManager.unregisterModule(heartBeatClient);
}