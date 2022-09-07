
/// api_version=2
var script = registerScript({
    name: "Ambience",
    version: "1.0",
    authors: ["chocopie"]
});
var S03 = Java.type("net.minecraft.network.play.server.S03PacketTimeUpdate");

script.registerModule({
    name: "Ambience",
    category: "World", 
    description: "change thing",
    settings: {
        mode: Setting.list({
            name: "Mode",
            default: "Custom",
            values: ["Custom","Day","Night"]
        }),
        time: Setting.integer({
            name: "Time",
            min: 1000,
            max: 24000,
            default: 1000
		})
	}
}, function (Ambience) {
    Ambience.on("update", function() {
        if(mc.theWorld == null) {
            return;
        }
        switch(Ambience.settings.mode.get()) {
            case "Day":
                mc.theWorld.setWorldTime(1000);
                break;
            case "Night":
                mc.theWorld.setWorldTime(17000);
                break;
            case "Custom":
                mc.theWorld.setWorldTime(Ambience.settings.time.get());
                break;
        }
    });
    Ambience.on("packet", function(event) {
        if(event.getPacket() instanceof S03) {
            event.cancelEvent();
        }
    });
});
