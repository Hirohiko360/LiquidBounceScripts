//Velocity for Mc-SekSin.net | By 1337quip (wasd#9800)

var scriptName = "SekSinVelocity";
var scriptVersion = 1.1;
var scriptAuthor = "1337quip";

var SekSinVelocity = new SekSinVelocity();

function SekSinVelocity() {

    this.getName = function () {
        return "SekSinVelocity";
    };

    this.getDescription = function () {
        return "Velocity for Mc-SekSin.net | By 1337quip (wasd#9800)";
    };

    this.getCategory = function () {
        return "Scripts";
    };

    this.onUpdate = function () {
        //Check player hurt time
        if (mc.thePlayer.hurtTime > 0 && mc.thePlayer.hurtTime <= 6) {
            //Set player motion x multiply 0.6
            mc.thePlayer.motionX *= 0.6;
            //Set player motion z multiply 0.6
            mc.thePlayer.motionZ *= 0.6;
        }
    }

    this.onEnable = function () {
        chat.print("§8§l§m+---------------------------------------------+");
        chat.print("");
        chat.print("§8§l[§9§lLiquidBounce§8§l] §f§lVelocity for §a§lMc-SekSin.net §f§l| By §a§l1337quip §f§l(§a§lwasd#9800§f§l)");
        chat.print("");
        chat.print("§8§l§m+---------------------------------------------+");
    }

}

function onEnable() {
    moduleManager.registerModule(SekSinVelocity);
};

function onDisable() {
    moduleManager.unregisterModule(SekSinVelocity);
};
