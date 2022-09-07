var scriptName = "Disabler";
var scriptAuthor = "crystalxz";
var scriptVersion = 1.0;

var C17PacketCustomPayload = Java.type("net.minecraft.network.play.client.C17PacketCustomPayload");
var C05PacketPlayerLook = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook");
var C06PacketPlayerPosLook = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook");
var C04PacketPlayerPosition = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition");
var C18PacketSpectate = Java.type ("net.minecraft.network.play.client.C18PacketSpectate");
var C00Handshake = Java.type ("net.minecraft.network.handshake.client.C00Handshake");
var S08PacketPlayerPosLook = Java.type ("net.minecraft.network.play.server.S08PacketPlayerPosLook");
var C03PacketPlayer = Java.type ("net.minecraft.network.play.client.C03PacketPlayer");
var PacketBuffer = Java.type ("net.minecraft.network.PacketBuffer");

function DisablerModule() {

    this.getName = function () {
        return "DisablerMatrix";
    }

    this.getCategory = function () {
        return "Exploit";
    }

    this.getDescription = function () {
        return "Disable some anticheats/anticheat checks";
    }
    var PacketCustomPayload = value.createBoolean("PacketCustomPayload", true);
    var PacketPlayerLook = value.createBoolean("PacketPlayerLook", false);
    var PacketPlayerPosLook = value.createBoolean("PacketPlayerPosLook", false);
    var PacketPlayerPosition = value.createBoolean("PacketPlayerPosition", false);
    var PacketSpectate = value.createBoolean("PacketSpectate", false);
    var Handshake = value.createBoolean("Handshake", false);
    var S08PacketPlayerPosLook = value.createBoolean("S08PacketPlayerPosLook", true);
    var C03PacketPlayer = value.createBoolean("C03PacketPlayer", false);
    var PacketBuffer = value.createBoolean("PacketBuffer", false);
    this.addValues = function(values) {
        values.add(PacketCustomPayload);
        values.add(PacketPlayerLook);
        values.add(PacketPlayerPosLook);
        values.add(PacketPlayerPosition);
        values.add(PacketSpectate);
        values.add(Handshake);
        values.add(S08PacketPlayerPosLook);
        values.add(C03PacketPlayer);
        values.add(PacketBuffer);
    }
    this.onPacket = function (event) {
        var packet = event.getPacket();
        if ((packet instanceof C17PacketCustomPayload && PacketCustomPayload.get()) || (packet instanceof C03PacketPlayer.C05PacketPlayerLook && PacketPlayerLook.get()) || (packet instanceof C03PacketPlayer.C06PacketPlayerPosLook && PacketPlayerPosLook.get()) || (packet instanceof C03PacketPlayer.C04PacketPlayerPosition && PacketPlayerPosition.get()) || (packet instanceof C18PacketSpectate && PacketSpectate.get()) || (packet instanceof C00Handshake && Handshake.get()) || (packet instanceof C03PacketPlayer && C03PacketPlayer.get()) || (packet instanceof S08PacketPlayerPosLook.get()) || (packet instanceof PacketBuffer.get())) {
          event.cancelEvent();

    }
}
}

var disablerModule = new DisablerModule();
var disablerModuleClient;

function onEnable() {
    disablerModuleClient = moduleManager.registerModule(disablerModule);
}

function onDisable() {
    moduleManager.unregisterModule(disablerModuleClient);
}