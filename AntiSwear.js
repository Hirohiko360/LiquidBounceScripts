var scriptName = "AntiSwear";
var scriptAuthor = "Soulplexis"; 
var scriptVersion = 1.0;

var chat = Java.type('net.minecraft.network.play.client.C01PacketChatMessage');
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
function Module() {
	var fuck = value.createBoolean("Fuck", true);
	var shit = value.createBoolean("Shit", true);
	var ass = value.createBoolean("Ass", true);
	var cunt = value.createBoolean("Cunt", true);
	var nigger = value.createBoolean("Nigger", true);
	var dick = value.createBoolean("Dick", true);
	var bitch = value.createBoolean("Bitch", true);
	var twat = value.createBoolean("Twat", true);
    this.getName = function() {
        return "AntiSwear";
    }
    this.getCategory = function() {
        return "Misc";   
    }

    this.getDescription = function() {
        return "Prevent using swear words.";
    }
	//
    this.onEnable = function() {
		var swore = false;
    }
	this.onUpdate = function() {
		/* if(swore == true) {
		chat.print("§c[§6AntiSwear§c] §4You can't say that!");
		swore = false;
		} */
	}
	this.onPacket = function(event) {
		var packet = event.getPacket();
		if(packet instanceof chat) {
			if(fuck.get() && packet.message.contains("fuck") || packet.message.contains("fuk") || packet.message.contains("fuq") || packet.message.contains("fuuck")) {
				event.cancelEvent();
				swore = true;
			}
			if(shit.get() && packet.message.contains("shit") || packet.message.contains("shiit")) {
				event.cancelEvent();
				swore = true;
			}
			
			if(ass.get() && packet.message.contains("ass")) {
				event.cancelEvent();
				swore = true;
			}
			
			if(cunt.get() && packet.message.contains("cunt") || packet.message.contains("まんこ")) {
				event.cancelEvent();
				swore = true;
			}
			
			
			if(nigger.get() && packet.message.contains("nigger") || packet.message.contains("nigga") || packet.message.contains("ニッが") ) {
				event.cancelEvent();
				swore = true;
			} 
			
			if(dick.get() && packet.message.contains("dick") || packet.message.contains("cock") || packet.message.contains("おちんちん")) {
				event.cancelEvent();
				swore = true;
			}
			
			if(bitch.get() && packet.message.contains("bitch") || packet.message.contains("bich")) {
				event.cancelEvent();
				swore = true;
			}
			
			if(twat.get() && packet.message.contains("twat")) {
				event.cancelEvent();
				swore = true;
			} 
		}
	}
	this.onDisable = function() {
	}
	this.addValues = function(soul) {
		soul.add(fuck);
		soul.add(shit);
		soul.add(ass);
		soul.add(cunt);
		soul.add(nigger);
		soul.add(bitch);
		soul.add(twat);
		soul.add(dick);
	}
}

var module = new Module();
var moduleClient;

function onEnable() {
    moduleClient = moduleManager.registerModule(module);
}

function onDisable() {
    moduleManager.unregisterModule(moduleClient);
}