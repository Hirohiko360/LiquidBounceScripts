///api_version=2
(script = registerScript({
    name: "Disabler",
    authors: ["Rilshrink"],
    version: "1.0"
})).import("Core.lib");
module = {
    category: "Exploit",
    description: "Bye! Bye! Bad Anticheat",
    values: [mode = value.createList("Mode", ["Lunar", "Kauri", "OnlyMC", "HazelMC", "Verus Combat"], "Lunar")],
    onPacket: function (e) {
        switch(mode.get()) {
            case "Kauri":
                if(e.getPacket() instanceof C0FPacketConfirmTransaction) {
                    e.cancelEvent();
                }
                break;
            case "Verus Combat":
                if (e.getPacket() instanceof C0FPacketConfirmTransaction) {
                    if(currentTrans++>0) e.cancelEvent();
                } else if(e.getPacket() instanceof C0BPacketEntityAction) {
                    e.cancelEvent();
                } 
                break;
            case "Lunar":
            case "OnlyMC":
                if(e.getPacket() instanceof C0FPacketConfirmTransaction) {
                    Transactions.add(e.getPacket());
                    e.cancelEvent();
                }
                if(e.getPacket() instanceof C00PacketKeepAlive) {
                    //Temporary until I can figure out how to e.getPacket().key -= 1337;
                    KeepAlives.add(e.getPacket());
                    e.cancelEvent();
                }
                if(e.getPacket() instanceof C03PacketPlayer) {
                    sendPacket(new C0CPacketInput());
                }
                break;
            case "HazelMC":
                if(e.getPacket() instanceof C0FPacketConfirmTransaction) {
                    Transactions.add(e.getPacket());
                    e.cancelEvent();
                }
                if(e.getPacket() instanceof C00PacketKeepAlive) {
                    KeepAlives.add(e.getPacket());
                    e.cancelEvent();
                }
                if(e.getPacket() instanceof C03PacketPlayer) {
                    sendPacket(new C0CPacketInput());
                }
                break;
        }
    },
    onWorld: function(ev) {
        reset();
    },
    onUpdate: function () {
        DisablerModule.tag = mode.get();
        switch(mode.get()) {
            case "OnlyMC":
            case "Lunar":
                if(mc.thePlayer.ticksExisted % 20 == 0 && Transactions.size() > currentTrans) {
                    sendPacket(Transactions.get[currentTrans++]);
                }
                if(mc.thePlayer.ticksExisted % 20 == 0) {
                    for(var i = 0; i < KeepAlives.size(); i++) {
                        var packet = KeepAlives.get(i);
                        if(packet != null) {
                            sendPacket(packet);
                        }
                    }
                    KeepAlives.clear();
                }
                if(mc.thePlayer.ticksExisted % 5 == 0) {
                    sendPacket(new C06PacketPlayerPosLook(mc.thePlayer.posX, mc.thePlayer.posY + 21, mc.thePlayer.posZ, mc.thePlayer.rotationYaw, mc.thePlayer.rotationPitch, true));
                }
                if(mc.thePlayer.ticksExisted % 30 == 0) {
                    reset();
                }
                break;
            case "HazelMC":
                sendPacket(new C00PacketKeepAlive(0));
                if(Transactions.size() > currentTrans) {
                    sendPacket(Transactions.get[currentTrans++]);
                }
                if(mc.thePlayer.ticksExisted % 100 == 0) {
                    for(var i = 0; i < KeepAlives.size(); i++) {
                        var packet = KeepAlives.get(i);
                        if(packet != null) {
                            sendPacket(packet);
                        }
                    }
                    KeepAlives.clear();
                }
                break;
        }
    },
    onEnable: function () {

    },
    onDisable: function () {
        reset();
    }
};

var KeepAlives = new (Java.type("java.util.ArrayList"))();
var Transactions = new (Java.type("java.util.ArrayList"))();
var currentTrans = 0;
var reset = function() {
    currentTrans = 0;
    KeepAlives.clear();
    Transactions.clear();
}