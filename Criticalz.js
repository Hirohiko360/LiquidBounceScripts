
var scriptName = "Criticalz"; // The name of your script
var scriptVersion = 1.1; // The version of your script 
var scriptAuthor = "yby360"; // The author of your script (eg. your username)

var C03 = Java.type("net.minecraft.network.play.client.C03PacketPlayer")
var C04 = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition")
var C06 = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook")
var MSTimer = Java.type('net.ccbluex.liquidbounce.utils.timer.MSTimer');
var timer = new MSTimer()
var timer2 = new MSTimer()
var timer3 = new MSTimer()
var timer4 = new MSTimer()
var timer5 = new MSTimer()

function Criticalz() {
    var mode = value.createList("Mode", ["CustomPacket", "CustomMotion", "NoGround", "Matrix-TPHop","NCP","Redesky", "Horizon", "Spartan", "Hypixel", "Visual"], "Visual")
    var delay = value.createFloat("CustomDelay", 0, 0, 1000)
    var hurttime = value.createInteger("CustomHurtTime", 10, 0, 10)
    var packety = value.createFloat("PacketY", 0.5, 0, 1)
    var motiony = value.createFloat("MotionY", 0.42, 0, 0.42)
    var particles = value.createBoolean("SpawnParticlesOnAttack", true)
    this.getName = function() {
        return "Criticalz";
    }

    this.getDescription = function() {
        return "deals critical hits";
    }

    this.getCategory = function() {
        return "Scripts";
    }
    this.getTag = function() {
        return mode.get()
    }

    this.onEnable = function() {
        if(mode.get() == "NoGround") {
            mc.thePlayer.jump()
        }
    }
    this.onAttack = function(event) {
        var target = event.getTargetEntity()
        if(mc.thePlayer.onGround) {
            switch(mode.get()) {
                case "CustomPacket":
                    if(timer.hasTimePassed(delay.get()) && target.hurtTime <= hurttime.get()) {
                        mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + packety.get(), mc.thePlayer.posZ, true))
                        mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
                        timer.reset()
                    }
                break;
                case "CustomMotion":
                    if(timer2.hasTimePassed(delay.get()) && target.hurtTime <= hurttime.get()) {
                        mc.thePlayer.motionY = motiony.get()
                        timer2.reset()
                    }
                break;
                case "Matrix-TPHop":
                    if(mc.thePlayer.motionX == 0 && mc.thePlayer.motionZ == 0) {
                        mc.thePlayer.motionY = 0.269
                    }
                case "NCP":
                    if(timer3.hasTimePassed(500) && target.hurtTime <= 8) {
                        mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 0.11, mc.thePlayer.posZ, true))
                        mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
                        timer3.reset()
                    }
                break;
                case "Horizon":
                    if(mc.thePlayer.motionX == 0.0 && mc.thePlayer.motionZ == 0.0) {
                        mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 0.0001, mc.thePlayer.posZ, true))
                        mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
                    }
                break;
                case "Spartan":
                    if(timer4.hasTimePassed(600)) {
                        mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 0.2, mc.thePlayer.posZ, true))
                        mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
                    }
                break;
                case "Hypixel":
                    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 0.0625, mc.thePlayer.posZ, true));
                    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false));
                break;
                case "Visual":
                break;
                case "NoGround":
                break;
            }
        }
        if(particles.get() || mode.get() == "Visual") {
           mc.thePlayer.onCriticalHit(target)
        }
    }
    this.onPacket = function(event) {
        var packet = event.getPacket()
        if(packet instanceof C03 && (mode.get() == "NoGround" || mode.get() == "Redesky")) {
            if(mc.thePlayer.onGround) {
                packet.onGround = false;
                if(mode.get() == "Redesky") {
                    if(packet instanceof C04) {
                        packet.y += 0.000001;
                    }
                    if(packet instanceof C06) {
                        packet.y += 0.000001;
                    }
                }
            }
            if(mc.theWorld.getCollidingBoundingBoxes(mc.thePlayer, mc.thePlayer.getEntityBoundingBox().offset(
                    0, (mc.thePlayer.motionY - 0.08) * 0.98, 0).expand(0, 0, 0)).isEmpty() && mode.get() == "Redesky") {
                packet.onGround = true;
            }
        }
    }
    this.addValues = function(values) {
        values.add(mode)
        values.add(delay)
        values.add(hurttime)
        values.add(packety)
        values.add(motiony)
        values.add(particles)
    }
}

var Criticalz = new Criticalz();

function onLoad() {}

function onEnable() {
    moduleManager.registerModule(Criticalz);
};

function onDisable() {
    moduleManager.unregisterModule(Criticalz);
};