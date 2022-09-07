var scriptName = "Hypixel Fly"; 
var scriptVersion = 1.0; 
var scriptAuthor = "soulplexis"; 

var hypixelFly = new HypixelFly();
var hypixelFlyClient;

Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
};

var Potion = Java.type('net.minecraft.potion.Potion');
var S12PacketEntityVelocity = Java.type('net.minecraft.network.play.server.S12PacketEntityVelocity');
var S27PacketExplosion = Java.type('net.minecraft.network.play.server.S27PacketExplosion');
var C03PacketPlayer = Java.type('net.minecraft.network.play.client.C03PacketPlayer');
var MSTimer = Java.type('net.ccbluex.liquidbounce.utils.timer.MSTimer');
var flytimer = new MSTimer()

function HypixelFly() {

    this.getName = function() {
        return "HypixelFly";
    };

    this.getDescription = function() {
        return "Infinite fly bypass for Hypixel";
    };

    this.getCategory = function() {
        return "Movement";
    };

    this.onUpdate = function() {
        var yaw = Math.radians(mc.thePlayer.rotationYaw);
        var x = -Math.sin(yaw) * 5
        var z = Math.cos(yaw) * 5
        mc.thePlayer.motionY = 0;
        mc.thePlayer.motionX = 0;
        mc.thePlayer.motionZ = 0;
        if (flytimer.hasTimePassed(1080)) {
        mc.thePlayer.setPosition(mc.thePlayer.posX + x, mc.thePlayer.posY - 2, mc.thePlayer.posZ + z);
        flytimer.reset();
        }

   }
    this.onDisable = function() {
    }
        this.onPacket = function() {
            var Packet = e.getPacket();
            if(Packet instanceof C03PacketPlayer) {
            Packet.onGround = true;
        }
    }
}

function onLoad() {
};

function onEnable() {
    hypixelFlyClient = moduleManager.registerModule(hypixelFly);
};

function onDisable() {
    moduleManager.unregisterModule(hypixelFlyClient);
};