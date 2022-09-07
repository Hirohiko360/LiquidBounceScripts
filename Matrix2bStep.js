var script = registerScript({
    name: 'Matrix2bStep',
    version: '0.0.0',
    authors: ['Shurpe']
});
script.registerModule({
    name: 'Matrix2bStep',
    category: 'Scripts', 
    description: ''

}, function (module) {
    module.on('update', function() {
        if (mc.thePlayer.isCollidedHorizontally) {
            if (mc.thePlayer.onGround) {
                ticks = 0; mc.thePlayer.jump();
            } else {
                ticks++;
                if (ticks == 9) {
                    mc.thePlayer.jump();
                }
            }
        } else {
            ticks = 0;
        }
    });
    module.on('disable', function() {
        ticks = 0;
    });
});