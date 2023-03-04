///api_version=2
(script = registerScript({
    name: "HVHAutoGapple",
    version: "1.0",
    authors: ["yby360","commandblock2"]
})).import("Core.lib")

Potion = Java.type('net.minecraft.potion.Potion')

var originalIndex = -1
var inventoryIndex = -1
module =
{
    name: "HVHAutoGapple",
    description: "ez Hvh",
    category: "combat",
    values:
        [
            health = value.createFloat("HealthSet1", 10, 1, 19),
            health2 = value.createFloat("HealthSet2", 10, 1, 19),
            health3 = value.createFloat("HealthSet3", 10, 1, 19),
            health4 = value.createFloat("HealthSet4", 10, 1, 19),
            health5 = value.createFloat("HealthSet5", 10, 1, 19),
            health6 = value.createFloat("HealthSet6", 10, 1, 19),
            health7 = value.createFloat("HealthSet7", 10, 1, 19),
        ],

    onUpdate: function () {
        if (mc.thePlayer.getHealth() <= health.get() || mc.thePlayer.getHealth() <= health2.get() || mc.thePlayer.getHealth() <= health3.get() || mc.thePlayer.getHealth() <= health4.get() || mc.thePlayer.getHealth() <= health5.get() || mc.thePlayer.getHealth() <= health6.get() || mc.thePlayer.getHealth() <= health7.get()) {
            gAppleIndex = InventoryUtils.findItem(36, 45, Items.golden_apple)
            gAppleIndex = gAppleIndex == -1 ? InventoryUtils.findItem(9, 36, Items.golden_apple) : gAppleIndex

            if (originalIndex == -1) {
                originalIndex = mc.thePlayer.inventory.currentItem
            }


            if (gAppleIndex >= 36 && gAppleIndex < 45) {
                mc.thePlayer.inventory.currentItem = gAppleIndex - 36

            } else if (gAppleIndex >= 9 && gAppleIndex < 36 && !(mc.currentScreen instanceof GuiInventory)) {
                inventoryIndex = gAppleIndex
                switchGapple(inventoryIndex)
            } else return

            mc.gameSettings.keyBindUseItem.pressed = true

        }
        else {
            reset()
            }
        }
}
function reset() {
    if (originalIndex != -1 || inventoryIndex != -1)
        mc.gameSettings.keyBindUseItem.pressed = false

    if (originalIndex != -1 ) {
        mc.thePlayer.inventory.currentItem = originalIndex;
        originalIndex = -1
    }

    if (inventoryIndex != -1) {
        switchGapple(inventoryIndex)
        inventoryIndex = -1
    }

}

function switchGapple(index) {
    mc.getNetHandler().addToSendQueue(new C16PacketClientStatus(C16PacketClientStatus.EnumState.OPEN_INVENTORY_ACHIEVEMENT));
    mc.displayGuiScreen(new GuiInventory(mc.thePlayer));


        slot = mc.thePlayer.inventoryContainer.getSlot(index)

        mc.playerController.windowClick(mc.currentScreen.inventorySlots.windowId, slot.slotNumber, 0, 2, mc.thePlayer)
        mc.thePlayer.closeScreen()

}