var C08PacketPlayerBlockPlacement = Java.type('net.minecraft.network.play.client.C08PacketPlayerBlockPlacement'),
    C05PacketPlayerLook = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook'),
    C09PacketHeldItemChange = Java.type('net.minecraft.network.play.client.C09PacketHeldItemChange'),
    ItemEnderPearl = Java.type('net.minecraft.item.ItemEnderPearl'),
    EnumFacing = Java.type('net.minecraft.util.EnumFacing'),
    BlockPos = Java.type('net.minecraft.util.BlockPos'),
    Fly = moduleManager.getModule('Fly'),
    damaged = false;
function getEnderPearlSlot() {
    for(i = 36; i < 45; ++i) {
        stack = mc.thePlayer.inventoryContainer.getSlot(i).getStack();
        if (stack != null && stack.getItem() instanceof ItemEnderPearl) {
            return i - 36;
        }
    }
    return -1;
}
var script = registerScript({
    name: 'PearlBoost',
    version: '0.0.0',
    authors: ['Shurpe']
});
script.registerModule({
    name: 'PearlBoost',
    description: '',
    category: 'Fun'

}, function (module) {
    module.on('update', function () {
        var enderPearlSlot = getEnderPearlSlot();
        if (!damaged) {
            if (enderPearlSlot == -1) {
                Chat.print('No ender pearls.');
                module.setState(false);
                return;
            }
            if (mc.thePlayer.inventory.currentItem != enderPearlSlot) {
                mc.thePlayer.sendQueue.addToSendQueue(new C09PacketHeldItemChange(enderPearlSlot));
            }
            mc.thePlayer.sendQueue.addToSendQueue(new C05PacketPlayerLook(mc.thePlayer.rotationYaw, 90, mc.thePlayer.onGround));
            mc.thePlayer.sendQueue.addToSendQueue(new C08PacketPlayerBlockPlacement(new BlockPos(-1, -1, -1), 255, mc.thePlayer.inventoryContainer.getSlot(enderPearlSlot + 36).getStack(), 0, 0, 0));
            if (enderPearlSlot != mc.thePlayer.inventory.currentItem) {
                mc.thePlayer.sendQueue.addToSendQueue(new C09PacketHeldItemChange(mc.thePlayer.inventory.currentItem));
            }
            damaged = true;
        }
        if (damaged && mc.thePlayer.hurtTime > 0) {
            Fly.setState(true);
        }
    });
    module.on('disable', function () {
        damaged = false;
        Fly.setState(false);
    });
});