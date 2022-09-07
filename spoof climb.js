var C03PacketPlayer = Java.type('net.minecraft.network.play.client.C03PacketPlayer');
var canClimb = undefined;
var script = registerScript({
    name: 'SpoofClimb',
    version: '0.0.0',
    authors: ['Shurpe']
});
script.registerModule({
    name: 'SpoofClimb',
    category: 'Fun', 
    description: '',
    settings: {
        climbSpeed: Setting.float({
            name: 'ClimbSpeed',
            default: 0.5,
            min: 0.1,
            max: 1
        })
    }
}, function (module) {
    module.on('update', function() {
        if (!mc.thePlayer.isCollidedHorizontally || mc.thePlayer.isInWater() || mc.thePlayer.isInLava() || mc.thePlayer.isOnLadder() || mc.thePlayer.isInWeb || mc.thePlayer.isOnLadder()) {
            canClimb = false;
        } else {
            canClimb = true; mc.thePlayer.motionY = module.settings.climbSpeed.get(); mc.thePlayer.onGround = true;
        }
    });
    module.on('packet', function(e) {
        packet = e.getPacket();
        if (canClimb == true && packet instanceof C03PacketPlayer) {
            packet.onGround = true;
        }
    });
    module.on('jump', function(e) {
        if (canClimb == true) {
            e.cancelEvent();
        }
    });
});
