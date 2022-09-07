var scriptName = "Too many packets detector"; 
var scriptVersion = 1.0; 
var scriptAuthor = "soulplexis"; 

var hypixelFly = new HypixelFly();
var hypixelFlyClient;


// This part was made by Senk Ju - NOT ME. -------------------
var colorIndex = 0;

function printMessage(message) {
    var availableColors = ["§l§8[§l§9LiquidBounce§l§8] §cAlert! §f", "§l§8[§l§9LiquidBounce§l§8] §4Alert! §8"];

    var color = availableColors[colorIndex];
    
    colorIndex += 1;
    if (colorIndex >= availableColors.length) {
        colorIndex = 0;
    }

    chat.print(color + message + "§r");

}
// -----------------------------------------------------------

function HypixelFly() {
	// YEAH. I USED A TICKS VAR. DONT FITE ME.
	var ticks = 0;
	var packets = 0;
    this.getName = function() {
        return "PacketCount";
    };

    this.getDescription = function() {
        return "If you send too many packets it will tell you.";
    };

    this.getCategory = function() {
        return "Misc";
    };
	this.onEnable = function() {
	}

   this.onUpdate = function() {
	   ticks++;
	   if(ticks >= 20) {
		   ticks = 0;
		   packets = 0;
	   }
	   if(packets >=470) {
		   printMessage("You are sending too many packets!!! [Packets: " + packets + "]");
		   /* The number 470 here is the number of packets sent that it will warn you for. I chose this because it is pretty safe and won't false warn you.
		    it will check how many packets were sent in the last second and then reset the counter.
		    You can change the number if it warns you too much or other reasons.
			
		    Here is some data i found to help you out
		    NoCheatPlus limits it to about 520~ although i was kicked when it read about 460 after a while.
		    ViaVersion limits it to 660
		    Spigot limits it to about 660 too (?)
		    Standing still is about 45~ packets per second
		    NCP NoSlow sends about 130
		    Moving sends about 80
		    Holding right click on a block with no mods sends about 80 as well
		    Criticals, SuperKnockback, AutoBlock and killaura on 12 cps can send about 800 to 1200. 
			
			an unmodified client seems to send about 190 maximum. depending on lag, it might go up to 300. 
			this was with me flailing my character around, hitting the air, placing blocks, spamming jump, and moving my head crazy though.
			*/
	   }
   }
    this.onPacket = function() {
		packets++;
		
   }
    this.onDisable = function() {
    }
}

function onLoad() {
};

function onEnable() {
    hypixelFlyClient = moduleManager.registerModule(hypixelFly);
};

function onDisable() {
    moduleManager.unregisterModule(hypixelFlyClient);
};