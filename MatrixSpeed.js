/// api_version=2
var script = registerScript({
    name: "Matrix Speed",
    version: "1.1",
    authors: ["Co丶Dynamic"]
});
var MovementUtils = Java.type('net.ccbluex.liquidbounce.utils.MovementUtils');
var RandomUtils=Java.type('net.ccbluex.liquidbounce.utils.misc.RandomUtils');
var C03 = Java.type('net.minecraft.network.play.client.C03PacketPlayer');
var C04 = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition');
var C00 = Java.type('net.minecraft.network.play.client.C00PacketKeepAlive');
var C05 = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook');
var C06 = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook');
var C0B = Java.type('net.minecraft.network.play.client.C0BPacketEntityAction');
//var Client = Java.type('net.minecraft.network.play.client');
var C07PacketPlayerDigging = Java.type('net.minecraft.network.play.client.C07PacketPlayerDigging');
var C08PacketPlayerBlockPlacement = Java.type('net.minecraft.network.play.client.C08PacketPlayerBlockPlacement');
var C02 = Java.type('net.minecraft.network.play.client.C02PacketUseEntity');
var C0A = Java.type('net.minecraft.network.play.client.C0APacketAnimation');
var C0F = Java.type('net.minecraft.network.play.client.C0FPacketConfirmTransaction');
var BlockPos = Java.type('net.minecraft.util.BlockPos');
var EnumFacing = Java.type('net.minecraft.util.EnumFacing');
var PacketBuffer;
var Ticks;
script.registerModule({
    name: "MatrixSpeed",
    description: "Bypass Matrix Timer Check",
    category: "Movement",
    settings: {
		Timers: Setting.float({
            name: "TimerSpeed",
            default: 1.0,
            min: 1.0,
            max: 1.45
        })
	}
}, function (module) {
	module.on("enable", function () {
		PacketBuffer=[];
		Ticks=0;
	});
	module.on("update", function () { try {
		Ticks++;
		mc.timer.timerSpeed = module.settings.Timers.get();
		if(Ticks>=Math.round(Math.pow(module.settings.Timers.get(),2)*7.5)) {
			Ticks=0;
			if(PacketBuffer.length>0) {
				for(var i in PacketBuffer) {
					mc.getNetHandler().addToSendQueue(PacketBuffer[i]);
				};
				PacketBuffer=[];
			};
		};
	}catch(err) {
		Chat.print(err);
	};
	});
	module.on("disable", function () {
		mc.timer.timerSpeed =1.0;
		if(PacketBuffer.length>0) {
			for(var i in PacketBuffer) {
				mc.getNetHandler().addToSendQueue(PacketBuffer[i]);
			};
			PacketBuffer=[];
		};
	});
	module.on("packet", function (event) { try {
		var packet = event.getPacket();
		if(PacketBuffer.indexOf(packet)>-1) return;
		if(packet instanceof C03 && !(packet instanceof C04 || packet instanceof C06 || packet instanceof C05)) {
			event.cancelEvent();
			return;
		};
		if(packet instanceof C04 || packet instanceof C02
			|| packet instanceof C06 || packet instanceof C05
			|| packet instanceof C0B || packet instanceof C07PacketPlayerDigging
			|| packet instanceof C08PacketPlayerBlockPlacement || packet instanceof C0A) {
			PacketBuffer.push(packet);
			event.cancelEvent();
		};
	}catch(err){
		Chat.print(err);
	};
    });
});