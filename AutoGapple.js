///api_version=2
//Copyright 2020 commandblock2 distributed under AGPL-3.0-or-later
(script = registerScript({
    name: "AutoGapple",
    version: "1.0",
    authors: ["LolMc","commandblock2"]
})).import("Core.lib")


Potion = Java.type('net.minecraft.potion.Potion')

var originalIndex = -1
var inventoryIndex = -1
module =
{
    name: "AutoGapple",
    description: "Eat gapple when your health is low",
    category: "combat",
    values:
        [
            health = value.createFloat("Health", 10, 1, 20),
            itemSwitchDelay = value.createInteger("SwitchDelayms", 100, 0, 1000)
        ],

    onUpdate: function () {
        if (mc.thePlayer.getHealth() <= health.get() && !mc.thePlayer.isPotionActive(Potion.regeneration)) {
            gAppleIndex = InventoryUtils.findItem(36, 45, Items.golden_apple)
            gAppleIndex = gAppleIndex == -1 ? InventoryUtils.findItem(9, 36, Items.golden_apple) : gAppleIndex

            if (originalIndex == -1) { // wtffffff have to check null because if (originalIndex) doesn't work when it equas to 0
                originalIndex = mc.thePlayer.inventory.currentItem
            }


            if (gAppleIndex >= 36 && gAppleIndex < 45) {
                //switch to gapple
                mc.thePlayer.inventory.currentItem = gAppleIndex - 36

            } else if (gAppleIndex >= 9 && gAppleIndex < 36 && !(mc.currentScreen instanceof GuiInventory)) {
                //switch gapple and 36 (first slot)
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
    //open inventory (I don't care about when you are on horse, implement it yourself)
    mc.getNetHandler().addToSendQueue(new C16PacketClientStatus(C16PacketClientStatus.EnumState.OPEN_INVENTORY_ACHIEVEMENT));
    mc.displayGuiScreen(new GuiInventory(mc.thePlayer));

    timeout(itemSwitchDelay.get(), function () {
        slot = mc.thePlayer.inventoryContainer.getSlot(index)

        mc.playerController.windowClick(mc.currentScreen.inventorySlots.windowId, slot.slotNumber, 0, 2, mc.thePlayer)
        mc.thePlayer.closeScreen()
    })
}