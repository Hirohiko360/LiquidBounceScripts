var scriptName = "FakeDisabler";
var scriptAuthor = "afdera";
var scriptVersion = "1.0";
var script = registerScript({
    name: "FakeDisabler",
    version: "1.0",
    authors: ["afdera"]
});
var C00 = Java.type("net.minecraft.network.play.client.C00PacketKeepAlive");
var C02 = Java.type("net.minecraft.network.play.client.C02PacketUseEntity");
var C02A = Java.type("net.minecraft.network.play.client.C02PacketUseEntity.Action");
var C16 = Java.type("net.minecraft.network.play.client.C16PacketClientStatus");
var C0F = Java.type("net.minecraft.network.play.client.C0FPacketConfirmTransaction");
var C06 = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook");
var C05 = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook')
var C03 = Java.type("net.minecraft.network.play.client.C03PacketPlayer");
var C0B = Java.type("net.minecraft.network.play.client.C0BPacketEntityAction");
var C04 = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition");
var C08 = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement");
var C09 = Java.type('net.minecraft.network.play.client.C09PacketHeldItemChange');
var S02 = Java.type("net.minecraft.network.play.server.S02PacketChat");
var S12 = Java.type('net.minecraft.network.play.server.S12PacketEntityVelocity');
var C07 = Java.type("net.minecraft.network.play.client.C07PacketPlayerDigging");
var BlockPos = Java.type('net.minecraft.util.BlockPos');
var thePlayer = Java.type("net.ccbluex.liquidbounce.utils.MovementUtils");
var Block = Java.type('net.minecraft.block.Block');
var Blocks = Java.type('net.minecraft.init.Blocks');
var S08 = Java.type('net.minecraft.network.play.server.S08PacketPlayerPosLook');
var RotationUtils = Java.type('net.ccbluex.liquidbounce.utils.RotationUtils');
var Rotation = Java.type('net.ccbluex.liquidbounce.utils.Rotation');
var ItemBucket = Java.type("net.minecraft.item.ItemBucket");
var GuiChest = Java.type("net.minecraft.client.gui.inventory.GuiChest");
var Blocks = Java.type("net.minecraft.init.Blocks");
var EntityBoat = Java.type("net.minecraft.entity.item.EntityBoat");
var MovementUtils = Java.type("net.ccbluex.liquidbounce.utils.MovementUtils")
function ChatP(_Chat) {
    Chat.print("§8[§e§lFakeDisabler§8] §f§l" + _Chat)
}
Math.radian = function(deg) {
    return deg * Math.PI / 180;
}

function clip(dist, y) {
    var yaw = Math.radian(mc.thePlayer.rotationYaw);
    var x = -Math.sin(yaw) * dist;
    var z = Math.cos(yaw) * dist;
    mc.thePlayer.setPosition(mc.thePlayer.posX + x, mc.thePlayer.posY + y, mc.thePlayer.posZ + z);
    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false));
}
function setSpeed(_speed) {
    var playerYaw = Math.radian(mc.thePlayer.rotationYaw);

    mc.thePlayer.motionX = _speed * -Math.sin(playerYaw);
    mc.thePlayer.motionZ = _speed * Math.cos(playerYaw);
}
function setDiagSpeed(_speed) {
    var playerYaw = Math.radian(mc.thePlayer.rotationYaw + 90);
    mc.thePlayer.motionX = _speed * -Math.sin(playerYaw);
    mc.thePlayer.motionZ = _speed * Math.cos(playerYaw);
}
function setMoveSpeed(_speed) {
    if (mc.gameSettings.keyBindLeft.isKeyDown() || mc.gameSettings.keyBindRight.isKeyDown()) {
        setDiagSpeed(_speed*-mc.thePlayer.moveStrafing);
    } else {
        setSpeed(_speed * mc.thePlayer.moveForward);
    }
}
function Forward(_s) {
    var dir = Math.radian(mc.thePlayer.rotationYaw);
    mc.thePlayer.motionX += -Math.sin(dir) * _s;
    mc.thePlayer.motionZ += Math.cos(dir) * _s;
}
function Right(_s) {
    var dir = Math.radian(mc.thePlayer.rotationYaw + 90);
    mc.thePlayer.motionX += -Math.sin(dir) * _s;
    mc.thePlayer.motionZ += Math.cos(dir) * _s;
}
function Back(_s) {
    var dir = Math.radian(mc.thePlayer.rotationYaw + 180);
    mc.thePlayer.motionX += -Math.sin(dir) * _s;
    mc.thePlayer.motionZ += Math.cos(dir) * _s;
}
function Left(_s) {
    var dir = Math.radian(mc.thePlayer.rotationYaw + 270);
    mc.thePlayer.motionX += -Math.sin(dir) * _s;
    mc.thePlayer.motionZ += Math.cos(dir) * _s;
}
var bmcTick = 0;
var tick = 0;
var C0FTick = 0;
var battletrue = false
script.registerModule({
    name: "FakeDisabler",
    description: "Disabling anticheat",
    category: "Expolit",
    tag: "NULL",
    settings: {
        Mode:Setting.list({
            name: "Mode",
            default: "Minemora",
            values: ["Minemora","BlocksmcPlus","Basic"]
        }),
        Debug:Setting.boolean({
            name: "Debug",
            default: false
        })
    }
}, 
    function (module) {
module.on("enable", function () {
    ChatP("Beta Version!")
});   
module.on("attack", function () {
    switch(module.settings.Mode.get()) {
        case "MinemoraCombat":
            mc.thePlayer.sendQueue.addToSendQueue(new C00);
            break;        
    }
})
module.on("packet", function (event) {
    var packet = event.getPacket();
    switch(module.settings.Mode.get()) {
        case "MinemoraCombat":
            if(packet instanceof S08) {
                mc.thePlayer.sendQueue.addToSendQueue(new C00);
            }
            if(packet instanceof C00) {
                event.cancelEvent()
                if(module.settings.Debug.get()) {
                    ChatP("Packet C00PacketKeepAlive")
                }
            }
            break;

        case "BlocksmcPlus":
            if(packet instanceof C0F) {
                event.cancelEvent()
                if(module.settings.Debug.get()) {
                    ChatP("Packet C0FPacketConfirmTransaction")
                }
            }
            if(packet instanceof C0B) {
                event.cancelEvent()
                if(module.settings.Debug.get()) {
                    ChatP("Packet C0BPacketEntityAction")
                }
            }
            break;
        case "Basic":
            if(packet instanceof C00 || packet instanceof C0F) {
                event.cancelEvent()
                if(module.settings.Debug.get()) {
                    ChatP("Disabled")
                }
            }
            break;
    }
    if(C0FTick >= 30) {
        C0FTick = 0;
        ChatP("Packet C0FPacketConfirmTransaction")
        mc.thePlayer.sendQueue.addToSendQueue(new C0F);
    }
});
module.on("update", function () {
    tick++
    if(tick >= 20 && battletrue) {
        tick = 0;
        battletrue = false
    }
    module.tag=module.settings.Mode.get();
    switch (module.settings.Mode.get()) {
    }
});
module.on("disable", function () {
});
});
