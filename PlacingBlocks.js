ar BlockPos = Java.type('net.minecraft.util.BlockPos');
var C05PacketPlayerLook= Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook');
var C08PacketPlayerBlockPlacement = Java.type('net.minecraft.network.play.client.C08PacketPlayerBlockPlacement');



blockigePosition = new BlockPos(mc .thePlayer.posX, Math.floor(mc.thePlayer.getEntityBoundingBox().minY - 1), mc.thePlayer.posZ);
mc.thePlayer.sendQueue.addToSendQueue(new C05PacketPlayerLook(mc.thePlayer.rotationYaw, 90, true)); //just for the rotation not needed on servers with no anticheat
mc.thePlayer.sendQueue.addToSendQueue(new C08PacketPlayerBlockPlacement(blockigePosition, 1, mc.thePlayer.inventory.getCurrentItem(), 8, 16, 10));