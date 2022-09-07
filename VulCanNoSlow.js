var script = registerScript({
    name: "VulCanNoSlow",
    version: "1.1",
    authors: ["Co丶Dynamic"]
});
var KillAuraClass = Java.type("net.ccbluex.liquidbounce.LiquidBounce").moduleManager.getModule(Java.type("net.ccbluex.liquidbounce.features.module.modules.combat.KillAura").class);
function isBlocking() {
	if (mc.thePlayer.isUsingItem()) return true;
    return mc.thePlayer && (mc.thePlayer.isBlocking() || KillAuraClass.blockingStatus)
}
script.registerModule({
    name: "VulCanNoSlow",
    description: "VulCan",
    category: "Movement",
    settings: {
    }
}, function (module) {
    module.on("slowDown", function (event) {
        event.forward = 1.0
        event.strafe = 1.0
    });
    module.on("motion", function (event) { try {
        module.tag = "VulCan";
        var heldItem = mc.thePlayer.getHeldItem()
        if (isBlocking() && heldItem) {
            switch (event.getEventState().getStateName()) {
                case "PRE":
                    break;
                case "POST":
                    break;
            }
        }
	}catch(err){
	};
    });
});