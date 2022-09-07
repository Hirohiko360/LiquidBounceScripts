var scriptName = "Packet NoFall";
var scriptVersion = 1.0;
var scriptAuthor = "Wu_dian";
var C03PacketPlayer = Java.type('net.minecraft.network.play.client.C03PacketPlayer');
function NoFallModule() {

    this.getName = function () {
        return "PacketNoFall";
    }

    this.getCategory = function () {
        return "Player";
    }

    this.getDescription = function () {
        return "Example Send Client Packet.";
    }

    this.onUpdate = function () {
		if (mc.thePlayer.fallDistance > 2.0){
				mc.thePlayer.fallDistance = 0;
				mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer(true));
		}
    }
}


var nofallModule = new NoFallModule();
var nofallModuleClient;

function onEnable() {
    nofallModuleClient = moduleManager.registerModule(nofallModule);
}

function onDisable() {
    moduleManager.unregisterModule(nofallModuleClient);
}