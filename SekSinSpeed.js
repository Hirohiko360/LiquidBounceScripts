//Speed for Mc-SekSin.net | By 1337quip (wasd#9800)

var scriptName = "SekSinSpeed";
var scriptVersion = 1.0;
var scriptAuthor = "1337quip";

var SekSinSpeed = new SekSinSpeed();

function SekSinSpeed() {

    this.getName = function () {
        return "SekSinSpeed";
    };

    this.getDescription = function () {
        return "Speed for Mc-SekSin.net | By 1337quip (wasd#9800)";
    };

    this.getCategory = function () {
        return "Scripts";
    };

    this.onUpdate = function () {
        //Check if player is on ground
        if (mc.thePlayer.onGround) {
            //Prevent players from jumping
            mc.gameSettings.keyBindJump.pressed = false;
            //Set player to jump
            mc.thePlayer.jump();
        }
        //Check if player isn't on ground & Check player fall distance
        if (!mc.thePlayer.onGround && mc.thePlayer.fallDistance <= 0.1) {
            //Set player speed in air to 0.02
            mc.thePlayer.speedInAir = 0.02;
            //Set player timer speed to 1.5
            mc.timer.timerSpeed = 1.5;
        }
        //Check player fall distance
        if (mc.thePlayer.fallDistance > 0.1 && mc.thePlayer.fallDistance < 1.3) {
            //Set player speed in air to 0.0205
            mc.thePlayer.speedInAir = 0.0205;
            //Set player timer speed to 0.7
            mc.timer.timerSpeed = 0.7;
        }
        //Check player fall distance
        if (mc.thePlayer.fallDistance >= 1.3) {
            //Reset player timer speed to 1
            mc.timer.timerSpeed = 1;
            //Reset player speed in air to 0.02
            mc.thePlayer.speedInAir = 0.02;
        }
    }

    this.onEnable = function () {
        chat.print("§8§l§m+---------------------------------------------+");
        chat.print("");
        chat.print("§8§l[§9§lLiquidBounce§8§l] §f§lSpeed for §a§lMc-SekSin.net §f§l| By §a§l1337quip §f§l(§a§lwasd#9800§f§l)");
        chat.print("");
        chat.print("§8§l§m+---------------------------------------------+");
    }

    this.onDisable = function () {
        mc.timer.timerSpeed = 1;
        mc.thePlayer.speedInAir = 0.02
    }

}

function onEnable() {
    moduleManager.registerModule(SekSinSpeed);
};

function onDisable() {
    moduleManager.unregisterModule(SekSinSpeed);
};
