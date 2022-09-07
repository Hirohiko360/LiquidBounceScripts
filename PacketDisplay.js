var scriptName = "Packet counter";
var scriptAuthor = "Soulplexis";
var scriptVersion = 1.0;


function Derp() {
	var Accuracy = value.createList("Accuracy", ["Low", "Medium", "High"], "High");
    this.getName = function() {
        return "Packets";
    }
    this.getCategory = function() {
        return "Render";   
    }
    this.getDescription = function() {
        return "Shows the amount of packets flowing in the arraylist (module tag).";
    }
	
	var time = 0;
	var aa = 0;
	var packets = 0;
	var started = false;
	this.onEnable = function() {
		started = false;
	}
	this.onPacket = function(event) {
		aa++;
		if(time >= 20) {
			time = 0;
			packets = aa;
			aa = 0;
			started = true;
		}
	}
	this.onUpdate = function() {
		time++;	
	}
	this.addValues = function(henti) {
//		henti.add(Accuracy);
	}
	this.getTag = function(){
		if(started == true) {
			if(packets < 250) {
			return packets.toString();
			} else {
				return "§c" + packets.toString();
			}
		} else {
			return "Measuring...";
		}
	}
}

var derp = new Derp();
var derpClient;

function onEnable() {
    derpClient = moduleManager.registerModule(derp);
}

function onDisable() {
    moduleManager.unregisterModule(derpClient);
}