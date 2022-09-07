var scriptName = "§eFake blockhitting"; 
var scriptVersion = 1.0; 
var scriptAuthor = "soulplexis";

var blockHit = new BlockHit();
var blockHitClient;

function BlockHit() {
	var ticks = 0;
    this.getName = function() {
        return "BlockSlash";
    };

    this.getDescription = function() {
        return "Swings your arm when you use an item.";
    };

    this.getCategory = function() {
        return "Render";
    };

    this.onUpdate = function() {
    	ticks++
    	if(ticks == 2 || ticks == 3 || ticks == 5 || ticks == 8 || ticks == 10 || ticks == 12 || ticks == 14 || ticks == 16 || ticks == 18 || ticks == 19) {
		if (mc.thePlayer.isUsingItem() == true) {
	    mc.thePlayer.swingItem();
    }
  } if(ticks == 20) {
	  ticks = 0;
  }
}
}

function onLoad() {
};

function onEnable() {
    blockHitClient = moduleManager.registerModule(blockHit);
};

function onDisable() {
    moduleManager.unregisterModule(blockHitClient);
};