var script = registerScript({
    name: "NoSlowDown",
    version: "1.1",
    authors: ["As丶One"]
});
var packetMode = Setting.list({
    name: "Packet",
    values: ["None", "NCP", "Hypixel", "AAC"],
    default: "Hypixel"
})
var blockForward = Setting.float({
    name: "BlockForward",
    default: 1,
    min: 0.2,
    max: 1
})
var blockStrafe = Setting.float({
    name: "BlockStrafe",
    default: 1,
    min: 0.2,
    max: 1
})
var consumeForward = Setting.float({
    name: "ConsumeForward",
    default: 1,
    min: 0.2,
    max: 1
})
var consumeStrafe = Setting.float({
    name: "ConsumeStrafe",
    default: 1,
    min: 0.2,
    max: 1
})
var bowForward = Setting.float({
    name: "BowForward",
    default: 1,
    min: 0.2,
    max: 1
})
var bowStrafe = Setting.float({
    name: "BowStrafe",
    default: 1,
    min: 0.2,
    max: 1
})
var ItemPotion = Java.type("net.minecraft.item.ItemPotion")
var ItemFood = Java.type("net.minecraft.item.ItemFood")
var ItemBucketMilk = Java.type("net.minecraft.item.ItemBucketMilk")
var ItemSword = Java.type("net.minecraft.item.ItemSword")
var ItemBow = Java.type("net.minecraft.item.ItemBow")
var BlockPos = Java.type("net.minecraft.util.BlockPos")
var EnumFacing = Java.type("net.minecraft.util.EnumFacing")
var C07PacketPlayerDigging = Java.type("net.minecraft.network.play.client.C07PacketPlayerDigging")
var C08PacketPlayerBlockPlacement = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement")
var MovementUtils = Java.type("net.ccbluex.liquidbounce.utils.MovementUtils")
var NoSlowModule = moduleManager.getModule("NoSlow")
var KillAuraClass = Java.type("net.ccbluex.liquidbounce.LiquidBounce").moduleManager.getModule(Java.type("net.ccbluex.liquidbounce.features.module.modules.combat.KillAura").class);
var MSTimer = Java.type("net.ccbluex.liquidbounce.utils.timer.MSTimer")
var timer = new MSTimer()

function getNoSlowValue(item) {
    if (item) item = item.getItem()
    if (item instanceof ItemSword) return [blockForward.get(), blockStrafe.get()]
    if (item instanceof ItemBow) return [bowForward.get(), bowStrafe.get()]
    if (item instanceof ItemBucketMilk || item instanceof ItemFood || item instanceof ItemPotion) return [consumeForward.get(), consumeStrafe.get()]
    return [0.2, 0.2]
}

function isBlocking() {
    return mc.thePlayer && (mc.thePlayer.isBlocking() || KillAuraClass.blockingStatus)
}
script.registerModule({
    name: "NoSlowDown",
    description: "NoSlowDown By As丶One",
    category: "Fun",
    tag: packetMode.get(),
    settings: {
        packetMode: packetMode,
        blockForward: blockForward,
        blockStrafe: blockStrafe,
        consumeForward: consumeForward,
        consumeStrafe: consumeStrafe,
        bowForward: bowForward,
        bowStrafe: bowStrafe,
    }
}, function (module) {
    module.on("slowDown", function (event) {
        var noslowVlaue = getNoSlowValue(mc.thePlayer.getHeldItem())
        event.forward = noslowVlaue[0]
        event.strafe = noslowVlaue[1]
    });
    module.on("motion", function (event) {
        module.tag = packetMode.get()
        var heldItem = mc.thePlayer.getHeldItem()
        if (NoSlowModule.state) NoSlowModule.state = false
        if (isBlocking() && heldItem && heldItem.getItem() instanceof ItemSword) {
            if (
                (packetMode.get() == "AAC" && timer.hasTimePassed(80)) ||
                (packetMode.get() == "Hypixel" && mc.thePlayer.onGround) ||
                (packetMode.get() == "NCP")
            ) {
                switch (event.getEventState().getStateName()) {
                    case "PRE":
                        mc.thePlayer.sendQueue.addToSendQueue(new C07PacketPlayerDigging(C07PacketPlayerDigging.Action.RELEASE_USE_ITEM, new BlockPos(-1, -1, -1), EnumFacing.DOWN))
                        break;
                    case "POST":
                        timer.reset()
                        mc.thePlayer.sendQueue.addToSendQueue(new C08PacketPlayerBlockPlacement(mc.thePlayer.inventory.getCurrentItem()))
                        break;
                }
            }
        }
    });
});