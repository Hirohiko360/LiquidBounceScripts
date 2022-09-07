var scriptName = "Protect by Light Z"; 
var scriptVersion = 1.1; 
var scriptAuthor = "Protect by Light Z";

var mobs = Java.type("net.minecraft.entity.EntityCreature");
var players = Java.type("net.minecraft.entity.player.EntityPlayer");

var autoMessage = new autoMessage();
var autoMessageClient;
	
function autoMessage() {
	var Mode = value.createList("Mode", ["Before", "After",], "Before");
	var Mob = value.createBoolean("Mob", false);
	var Player = value.createBoolean("Player", true);
	var Instant = value.createBoolean("Instant", true);
	var Message = value.createText("Message", "L");
    this.getName = function() {
        return "AutoSay";
    };

    this.getDescription = function() {
        return "Mentions the target with a message when you kill them.";
    };

    this.getCategory = function() {
        return "Misc";
    };
	this.onEnable = function() {
		target = null;
	}
    this.onMotion = function () {
	if(target != null && (((target instanceof mobs && Mob.get() == true) || Mob.get() == false && !(target instanceof mobs)) || ((target instanceof players && Player.get() == true) || Player.get() == false && !(target instanceof players))) && ((Instant.get() == true && target.getHealth() == 0) || Instant.get() == false && target.isDead == true)) {
		switch(Mode.get()) {
			case "After":
			mc.thePlayer.sendChatMessage(target.getName() + " " + Message.get());
			break;
			case "Before":
			mc.thePlayer.sendChatMessage(Message.get() + " " + target.getName());
			break;
		}
		target = null;
	}
	}
	this.onDisable = function() {
	}
	this.addValues = function(values) {
		values.add(Mode);
		values.add(Mob);
		values.add(Player);
		values.add(Instant);
		values.add(Message);
    }
	var target;
    	this.onAttack = function (event) {
			target = event.getTargetEntity();
    }
}

function onLoad() {
};

function onEnable() {
    autoMessageClient = moduleManager.registerModule(autoMessage);
};

function onDisable() {
    moduleManager.unregisterModule(autoMessageClient);
};