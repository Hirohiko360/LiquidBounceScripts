var S29PacketSoundEffect = Java.type('net.minecraft.network.play.server.S29PacketSoundEffect')
var script = registerScript({
    name: 'Lightning Detect',
    version: '0.0.0',
    authors: ['Shurpe']
});
script.registerModule({
    name: 'Lightning Detect',
    category: 'Fun', 
    description: ''

}, function (module) {
    module.on('packet', function(e) {
        var packet = e.getPacket();
        if (packet instanceof S29PacketSoundEffect && packet.getSoundName() == 'ambient.weather.thunder') {
            Chat.print('§c>> §fLightning on X: §7' + packet.getX().toFixed() + ' §fY: §7' + packet.getY().toFixed()  + ' §fZ: §7' + packet.getZ().toFixed());
            e.cancelEvent();
        }
    });
}); 
