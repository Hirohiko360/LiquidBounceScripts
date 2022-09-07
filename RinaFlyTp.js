var scriptName = "FlyTest";
var scriptAuthor = "LaVacheMilka and kokos";
var scriptVersion = 0.3;

function FlyModule() {
  var ticks = 0;
    this.getName = function() {
        return "RinaFlyTp";
    }

    this.getDescription = function() {
        return "FLy tp rinaorc"
    }

    this.getCategory = function() {
        return "Movement";
    }

    this.onUpdate = function() {
        mc.gameSettings.keyBindJump.pressed = false;
        mc.thePlayer.motionY *= 0.2;
        mc.thePlayer.onGround = true;
        mc.timer.timerSpeed = 0.2;
        commandManager.executeCommand (".hclip 8");
    }
    this.onDisable = function() {
        mc.timer.timerSpeed = 0.9;
     }
}

var flyModule = new FlyModule();
var devModuleClient;

function onEnable() {
    flyModuleClient = moduleManager.registerModule(flyModule);
}

function onDisable() {
    moduleManager.unregisterModule(flyModuleClient);
}
