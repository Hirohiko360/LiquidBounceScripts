var C03PacketPlayer = Java.type('net.minecraft.network.play.client.C03PacketPlayer');
var script = registerScript({
    name: 'MatrixClip',
    version: '0.0.0',
    authors: ['Shurpe']
});
script.registerModule({
    name: 'MatrixClip',
    category: 'Fun', 
    description: '[Matrix v6.0.0 +] Allows you to pass through a wall before the game starts'

}, function (module) {
    module.on('update', function() {
        if (mc.thePlayer.ticksExisted == 1) {
            mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY - 3, mc.thePlayer.posZ);
            Chat.print('§7[§fMatrixClip§7] §cTeleported!');
        }
    });
    module.on('packet', function(e) {
        var packet = e.getPacket();
        if (packet instanceof C03PacketPlayer) {
            if (mc.thePlayer.ticksExisted == 1) {
                packet.onGround = true;
            }
        }
    });
});
