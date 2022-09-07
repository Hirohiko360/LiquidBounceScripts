var script = registerScript({
    name: 'TellyBridge',
    version: '2.0',
    authors: ['yby360']
});
var k = false;
var ti = 0;
var tt = false;
var tit = 1;
var LiquidBounce = Java.type("net.ccbluex.liquidbounce.LiquidBounce");
var mk = true;
var Yals = null;
var Yb = null;
var ScaffoldOn = false;
script.registerModule({
    name: 'TellyBridge',
    category: 'Scripts', 
    description: 'Telly Bridge!'
}, function (module) {
    module.on('enable', function() {
		LiquidBounce.commandManager.executeCommands(".FastPlace Speed 1");
		LiquidBounce.commandManager.executeCommands(".t Parkour on");
		LiquidBounce.commandManager.executeCommands(".t FastPlace on");
        Chat.print("[TellyBridge]Enable");
    });
    module.on('disable', function() {
		LiquidBounce.commandManager.executeCommands(".t Parkour off");
		LiquidBounce.commandManager.executeCommands(".t FastPlace off");
        Chat.print("[TellyBridge]Disable");
		k = false;
		ti = 0;
		tt = false;
		tit = 0;
		mk = true;
		Yals = null;
		Yb = null;
		ScaffoldOn = false;
    });
	module.on('move', function() {
		if (mk) {
			Yals = mc.thePlayer.posY;
			//Chat.print(Yals);
			mk = false;
		};
    });
	module.on('jump', function() {
		tt = true;
    });
	module.on('update', function() {
		if (tt) {
			ti += 1;
		};
		if (k != true && ti >= 5) {
			//var r = mc.thePlayer.rotationPitch;
			//var r2 = mc.thePlayer.rotationYaw;
			//Chat.print(r);
			//Chat.print(r2);
			mc.thePlayer.rotationPitch = 57.03;
			mc.thePlayer.rotationYaw += 180;
			k = true;
			ti = 0;
			tt = false;
		};
		if (k) {
            mc.thePlayer.rotationPitch += 3.2;
				Yb = mc.thePlayer.posY;
			if (mc.thePlayer.onGround) {
				mc.thePlayer.motionX = 0;
				mc.thePlayer.motionZ = 0; 
				mc.thePlayer.rotationYaw -= 180;
				k = false;
				mk = true;
			};
		};
    });
});