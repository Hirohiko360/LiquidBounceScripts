///api_version=2
var script = registerScript({
    name: "PacketDebugScript",
    authors: ["Foxley"],
    version: "1.0"
})

var C03Player = Java.type("net.minecraft.network.play.client.C03PacketPlayer");

var S14RelMove = Java.type("net.minecraft.network.play.server.S14PacketEntity");
var S12EntityVelocity = Java.type("net.minecraft.network.play.server.S12PacketEntityVelocity");
var S18EntityTeleport = Java.type("net.minecraft.network.play.server.S18PacketEntityTeleport");
var S19EntityStatus = Java.type("net.minecraft.network.play.server.S19PacketEntityStatus");
var S32ConfirmTransaction = Java.type("net.minecraft.network.play.server.S32PacketConfirmTransaction");

var tickCount = 0;

var clientPacketCount = 0;
var serverPacketCount = 0;

var maxClientPacketCount = 0;
var maxServerPacketCount = 0;

script.registerModule({
    name: "PacketDebugModule",
    category: "Scripts",
    description: "Debug all the packets.",
    settings: {
        debugClientPacket: Setting.boolean({
            name: "debugClientPacket",
            default: false
        }),
        debugServerPacket: Setting.boolean({
            name: "debugServerPacket",
            default: true
        })
    }
}, function (module) {
    module.on("enable", function () {
        Chat.print("----- Starting -----");
    });
    module.on("disable", function () {
        clientPacketCount = 0;
        serverPacketCount = 0;

        maxClientPacketCount = 0;
        maxServerPacketCount = 0;

        Chat.print("----- Stopping -----");
    });
    module.on("packet", function (eventData) {
        var packet = eventData.getPacket();

        var packetClassName = packet.class.simpleName;
        
        var isClientPacket = packetClassName.startsWith("C");

        isClientPacket ? clientPacketCount++ : serverPacketCount++;

        if (isClientPacket ? module.settings.debugClientPacket.get() : module.settings.debugServerPacket.get()) {
            Chat.print(packetClassName + " : " + Date.now());

            if (packet instanceof C03Player) {
                Chat.print(packet.getPositionX() + " : " + packet.getPositionY() + " : " + packet.getPositionZ() + " : " + packet.getYaw() + " : " + packet.getPitch());
            } else if (packet instanceof S14RelMove) {
                Chat.print(packet.func_149062_c() + " : " + packet.func_149061_d() + " : " + packet.func_149064_e() + " : " + packet.func_149066_f() + " : " + packet.func_149063_g());
            } else if (packet instanceof S18EntityTeleport) {
                Chat.print(packet.getX() + " : " + packet.getY() + " : " + packet.getZ() + " : " + packet.getYaw() + " : " + packet.getPitch());
            } else if (packet instanceof S32ConfirmTransaction) {
                Chat.print(packet.getWindowId() + " : " + packet.getActionNumber() + " : " + packet.func_148888_e());
            }

        }
    });
    module.on("update", function () {
        tickCount += 1;
        if (tickCount >= 20) {
            if (clientPacketCount > maxClientPacketCount) {
                maxClientPacketCount = clientPacketCount;
            }
            if (serverPacketCount > maxServerPacketCount) {
                maxServerPacketCount = serverPacketCount;
            }
            clientPacketCount = 0;
            serverPacketCount = 0;

            tickCount = 0;
        }
    });
    module.on("render2D", function () {
        mc.ingameGUI.drawCenteredString(mc.fontRendererObj, "§aClient§2§l " + clientPacketCount + " §apackets §7(" + maxClientPacketCount + ")", mc.displayWidth / 4, mc.displayHeight / 2.5, -1);
        mc.ingameGUI.drawCenteredString(mc.fontRendererObj, "§cServer§4§l " + serverPacketCount + " §cpackets §7(" + maxServerPacketCount + ")", mc.displayWidth / 4, (mc.displayHeight / 2.5) + 8, -1);
    });
});