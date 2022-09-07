var C03PacketPlayer = Java.type('net.minecraft.network.play.client.C03PacketPlayer');
var script = registerScript({
    name: 'MatrixFly2',
    version: '2.1.0',
    authors: ['ez fly']
});
script.registerModule({
    name: 'MatrixFly',
    category: 'Scripts',
    description: 'ez bypass'

}, function (module) {
    module.on('packet', function(e) {
        var packet = e.getPacket();
        if (packet instanceof C03PacketPlayer) {
            packet.onGround = 2.5;
        }
    });
    module.on('update', function() {
        mc.thePlayer.onGround = 2.5; 
        mc.thePlayer.motionY = 0;
    });
});