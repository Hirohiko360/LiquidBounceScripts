var scriptName = "NCP-VClip"; 
var scriptVersion = 1.0;  
var scriptAuthor = "Lost1234"; 

var C06PlayerPacket = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook');

var ncpVClipModule = new ncpVClipModule();
var ncpVClipModuleClient;



function ncpVClipModule() {
    this.getName = function() {
        return "NCPVClip";
    };

    this.getDescription = function() {
        return "NCP-VClip";
    };

    this.getCategory = function() {
        return "Movement";
    };

    this.onUpdate = function() {
           mc.thePlayer.sendQueue.addToSendQueue(new C06PlayerPacket(mc.thePlayer.posX, (mc.thePlayer.posY - 1), mc.thePlayer.posZ, mc.thePlayer.rotationYaw, mc.thePlayer.rotationPitch, true));
    }
}

function onLoad() {
    
};

function onEnable() {
    ncpVClipModuleClient = moduleManager.registerModule(ncpVClipModule);
};

function onDisable() {
    moduleManager.unregisterModule(ncpVClipModuleClient);
};