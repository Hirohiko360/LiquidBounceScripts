var scriptName = "ILoveTowerScaffold";
var scriptVersion = 1.3;
var scriptAuthor = "yorik100, EzHacksYT";
var towerModule = moduleManager.getModule("Tower");
var scaffoldModule = moduleManager.getModule("Scaffold");

var towerScaffold = new TowerScaffold();

var client;

function TowerScaffold() {
    this.getName = function() {
        return "TowerScaffold";
    };

    this.getDescription = function() {
        return "Scaffold Addon";
    };

    this.getCategory = function() {
        return "World";
    };
    this.onEnable = function() {
    }
    this.onUpdate = function() {
        if (mc.gameSettings.keyBindJump.isKeyDown() && !mc.gameSettings.keyBindLeft.isKeyDown() && !mc.gameSettings.keyBindRight.isKeyDown() && !mc.gameSettings.keyBindForward.isKeyDown() && !mc.gameSettings.keyBindBack.isKeyDown()) {
			    mc.thePlayer.motionX = 0;
                mc.thePlayer.motionZ = 0;
                mc.thePlayer.jumpMovementFactor = 0;
				mc.thePlayer.onGround = false;
				towerModule.setState(true)
				scaffoldModule.setState(false)
}else{
			    towerModule.setState(false)
				scaffoldModule.setState(true)
		}
}
    this.onDisable = function () {
        towerModule.setState(false)
		scaffoldModule.setState(false)
    }
}

function onLoad() {}

function onEnable() {
    client = moduleManager.registerModule(towerScaffold);
}

function onDisable() {
    moduleManager.unregisterModule(client);
}
