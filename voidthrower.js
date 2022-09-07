/// api_version=2
var script = registerScript({
    name: "VoidThrower",
    version: "1.0.1",
    authors: ["Qther"]
});

"use strict";

var Items = Java.type("net.minecraft.init.Items");
var GuiInventory = Java.type("net.minecraft.client.gui.inventory.GuiInventory");
var C0DPacketCloseWindow = Java.type("net.minecraft.network.play.client.C0DPacketCloseWindow");
var C05PacketPlayerLook = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook");
var C16PacketClientStatus = Java.type("net.minecraft.network.play.client.C16PacketClientStatus");

var delay = 0;

script.registerModule({
    name: "VoidThrower",
    description: "Throws items from inventory when y level below threshold.",
    category: "Misc",
    settings: {
        Threshold: Setting.float({
            name: "Threshold",
            min: -20.0,
            max: 10.0,
            default: -5.0
        }),
        Rotate: Setting.boolean({
            name: "Rotate",
            default: true
        }),
        DelayB: Setting.boolean({
            name: "Delay",
            default: true
        }),
        Delay: Setting.integer({
            name: "Ticks",
            min: 0,
            max: 20,
            default: 1
        }),
        Bedwars: Setting.boolean({
            name: "Bedwars",
            default: true
        }),
        SimulateInventory: Setting.boolean({
            name: "SimulateInventory",
            default: true
        })
    }
}, function (module) {
    module.on("enable", function () {
        delay = 0;
    });

    module.on("disable", function () {
        delay = 0;
    });

    module.on("update", function () {
        if (module.settings.DelayB.get() && delay < module.settings.Delay.get()) {
            ++delay;
        } else if (mc.thePlayer.posY < module.settings.Threshold.get()) {
            delay = 0;

            var itemToThrow = -1;

            if (module.settings.Bedwars.get()) {
                for (var i = 9; i <= 45; i++) {
                    var stack = mc.thePlayer.inventoryContainer.getSlot(i).getStack();
                    if (stack != null && [Items.iron_ingot, Items.gold_ingot, Items.diamond, Items.emerald].indexOf(stack.getItem()) != -1) {
                        itemToThrow = i;
                        break;
                    }
                }
            } else {
                for (var j = 9; j <= 45; j++) {
                    if (mc.thePlayer.inventoryContainer.getSlot(j).getStack() != null) {
                        itemToThrow = j;
                        break;
                    }
                }
            }

            if (itemToThrow != -1) {
                var openInventory = !(mc.currentScreen instanceof GuiInventory) && module.settings.SimulateInventory.get();

                if (openInventory) mc.getNetHandler().addToSendQueue(new C16PacketClientStatus(C16PacketClientStatus.EnumState.OPEN_INVENTORY_ACHIEVEMENT));

                var yaw = mc.thePlayer.rotationYaw;
                var pitch = mc.thePlayer.rotationPitch;
                if (module.settings.Rotate.get()) mc.getNetHandler().addToSendQueue(new C05PacketPlayerLook(yaw, 90, false));

                mc.playerController.windowClick(mc.thePlayer.openContainer.windowId, itemToThrow, 4, 4, mc.thePlayer);

                if (module.settings.Rotate.get()) mc.getNetHandler().addToSendQueue(new C05PacketPlayerLook(yaw, pitch, false));

                if (openInventory) mc.getNetHandler().addToSendQueue(new C0DPacketCloseWindow());

            }
        }
    });
});
