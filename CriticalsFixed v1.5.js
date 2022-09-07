var scriptName = "CriticalsFixed";
var scriptVersion = 1.5;
var scriptAuthor = "Messenger";

var EntityPlayer = Java.type('net.minecraft.entity.player.EntityPlayer');
var C03PacketPlayer = Java.type('net.minecraft.network.play.client.C03PacketPlayer');
var C04PacketPlayerPosition = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition');
var C05PacketPlayerLook = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook");
var C06PacketPlayerPosLook = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook");
var S15PacketEntityRelMove = Java.type("net.minecraft.network.play.server.S14PacketEntity.S15PacketEntityRelMove");
var S17PacketEntityLookMove = Java.type("net.minecraft.network.play.server.S14PacketEntity.S17PacketEntityLookMove");
var MSTimer = Java.type('net.ccbluex.liquidbounce.utils.timer.MSTimer');
var timer = new MSTimer

function CriticalsFixed() {
    var mode = value.createList("Mode", ["Packet", "NCPPacket", "OldHypixel", "Hypixel", "Hypixel2", "HytPacket", "HytOther", "HytPacket2", "Minis", "Hop", "TPHop", "LowJump", "Jump", "Horizon", "Spartan", "NoGround", "AntiCheat"], "Packet")
    var delay = value.createFloat("Delay", 0, 0, 2000)
    var hurttime = value.createInteger("HurtTime", 0, 0, 20)

    this.addValues = function(values) {
        values.add(mode)
        values.add(delay)
        values.add(hurttime)
    }

    this.getName = function() {
        return "CriticalsFixed";
    }

    this.getDescription = function() {
        return "Automatically deals critical hits.";
    }

    this.getCategory = function() {
        return "Combat";
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
        if(target != null && mc.thePlayer.onGround) {
            switch(mode.get()) {
                case "Packet":
                    if(timer.hasTimePassed(delay.get()) && target.hurtTime <= hurttime.get()) {
                        mc.getNetHandler().addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.05250000001304, mc.thePlayer.posZ, false))
                        mc.getNetHandler().addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.00150000001304, mc.thePlayer.posZ, false))
                        mc.getNetHandler().addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.05250000001304, mc.thePlayer.posZ, false))
                        mc.getNetHandler().addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.00150000001304, mc.thePlayer.posZ, false))
                        mc.thePlayer.onCriticalHit(target)
                        timer.reset()
                    }
                break;
                case "NCPPacket":
                    if(timer.hasTimePassed(delay.get()) && target.hurtTime <= hurttime.get()) {
                        mc.getNetHandler().addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.11, mc.thePlayer.posZ, false))
                        mc.getNetHandler().addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.1100013579, mc.thePlayer.posZ, false))
                        mc.getNetHandler().addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY +  0.00114514, mc.thePlayer.posZ, false))
                        mc.thePlayer.onCriticalHit(target)
                        timer.reset()
                    }
                break;
                case "OldHypixel":
                    if(timer.hasTimePassed(delay.get()) && target.hurtTime <= hurttime.get()) {
                        var crit = new  Array(0.0625, 0.0 ,0.0001 , 0.0);
                        var v1 = crit.length;
                        var v2 = 0;
                        while (v2 < v1){
                        var offset = crit[v2];
                        mc.getNetHandler().addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + offset, mc.thePlayer.posZ, false));
                        ++v2;
                        }
                        mc.thePlayer.onCriticalHit(target)
                        timer.reset()
                    }
                break;
                case "Hypixel":
                    if(timer.hasTimePassed(delay.get()) && target.hurtTime <= hurttime.get()) {
                        mc.getNetHandler().addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.05250000001304, mc.thePlayer.posZ, true))
                        mc.getNetHandler().addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.00150000001304, mc.thePlayer.posZ, false))
                        mc.getNetHandler().addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.05250000001304, mc.thePlayer.posZ, false))
                        mc.getNetHandler().addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.00150000001304, mc.thePlayer.posZ, false))
                        mc.thePlayer.onCriticalHit(target)
                        timer.reset()
                    }
                break;
                case "Hypixel2":
                    if(timer.hasTimePassed(delay.get()) && target.hurtTime <= hurttime.get()) {
                        mc.getNetHandler().addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.04114514, mc.thePlayer.posZ, true))
                        mc.getNetHandler().addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.02114514, mc.thePlayer.posZ, false))
                        mc.getNetHandler().addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY +  0.0114514, mc.thePlayer.posZ, false))
                        mc.getNetHandler().addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.000114514, mc.thePlayer.posZ, false))
                        mc.thePlayer.onCriticalHit(target)
                        timer.reset()
                    }
                break;
                case "HytPacket":
                    if(timer.hasTimePassed(delay.get()) && target.hurtTime <= hurttime.get()) {
                        mc.getNetHandler().addToSendQueue(new C03PacketPlayer.C06PacketPlayerPosLook(mc.thePlayer.posX, mc.thePlayer.posY + 0.04114514, mc.thePlayer.posZ, false))
                        mc.getNetHandler().addToSendQueue(new C03PacketPlayer.C06PacketPlayerPosLook(mc.thePlayer.posX, mc.thePlayer.posY + 0.02114514, mc.thePlayer.posZ, false))
                        mc.getNetHandler().addToSendQueue(new C03PacketPlayer.C06PacketPlayerPosLook(mc.thePlayer.posX, mc.thePlayer.posY +  0.0114514, mc.thePlayer.posZ, false))
                        mc.getNetHandler().addToSendQueue(new C03PacketPlayer.C06PacketPlayerPosLook(mc.thePlayer.posX, mc.thePlayer.posY + 0.000114514, mc.thePlayer.posZ, false))
                        mc.thePlayer.onCriticalHit(target)
                        timer.reset()
                    }
                break;
                case "HytOther":
                    if(timer.hasTimePassed(delay.get()) && target.hurtTime <= hurttime.get()) {
                        mc.getNetHandler().addToSendQueue(new C03PacketPlayer.C06PacketPlayerPosLook(mc.thePlayer.posX, mc.thePlayer.posY + 0.08200000226498, mc.thePlayer.posZ, false))
                        mc.getNetHandler().addToSendQueue(new C03PacketPlayer.C06PacketPlayerPosLook(mc.thePlayer.posX, mc.thePlayer.posY + 0.00130000000354, mc.thePlayer.posZ, false))
                        mc.thePlayer.onCriticalHit(target)
                        timer.reset()
                    }
                break;
                case "HytPacket2":
                    if(timer.hasTimePassed(delay.get()) && target.hurtTime <= hurttime.get()) {
                        mc.getNetHandler().addToSendQueue(new C05PacketPlayerLook.C03PacketPlayer(mc.thePlayer.posX, mc.thePlayer.posY + 0.0150000001304, mc.thePlayer.posZ, true))
                        mc.getNetHandler().addToSendQueue(new C05PacketPlayerLook.C03PacketPlayer(mc.thePlayer.posX, mc.thePlayer.posY + 0.003140421304, mc.thePlayer.posZ, false));
                        mc.getNetHandler().addToSendQueue(new C05PacketPlayerLook.C03PacketPlayer(mc.thePlayer.posX, mc.thePlayer.posY + 0.00114514191980, mc.thePlayer.posZ, false))
                        mc.getNetHandler().addToSendQueue(new C05PacketPlayerLook.C03PacketPlayer(mc.thePlayer.posX, mc.thePlayer.posY + 0.00150000001304, mc.thePlayer.posZ, false))
                        timer.reset()
                    }
                break;
                case "Minis":
                    if(timer.hasTimePassed(delay.get()) && target.hurtTime <= hurttime.get()) {
                        mc.thePlayer.motionY = 0.009999999776482582;
                        timer.reset()
                    }
                break;
                case "Hop":
                    if(timer.hasTimePassed(delay.get()) && target.hurtTime <= hurttime.get()) {
                        mc.thePlayer.motionY = 0.1
                        mc.thePlayer.fallDistance = 0.1;
	        mc.thePlayer.onGround = false;
                        timer.reset()
                    }
                break;
                case "TPHop":
                    if(timer.hasTimePassed(delay.get()) && target.hurtTime <= hurttime.get()) {
                        mc.getNetHandler().addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.02, mc.thePlayer.posZ, false))
                        mc.getNetHandler().addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY +  0.01, mc.thePlayer.posZ, false))
                        mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.01, mc.thePlayer.posZ)
                        timer.reset()
                    }
                break;
                case "Jump":
                    if(timer.hasTimePassed(delay.get()) && target.hurtTime <= hurttime.get()) {
                        mc.thePlayer.jump()
                        timer.reset()
                    }
                break;
                case "LowJump":
                    if(timer.hasTimePassed(delay.get()) && target.hurtTime <= hurttime.get()) {
                        mc.thePlayer.motionY = 0.3425
                        timer.reset()
                    }
                break;
                case "Horizon":
                    if(mc.thePlayer.motionX == 0.0 && mc.thePlayer.motionZ == 0.0) {
                        mc.getNetHandler().addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.0001, mc.thePlayer.posZ, true))
                        mc.getNetHandler().addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
                        mc.thePlayer.onCriticalHit(target)
                    }
                break;
                case "Spartan":
                    if(timer.hasTimePassed(600)) {
                        mc.getNetHandler().addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.2, mc.thePlayer.posZ, true))
                        mc.getNetHandler().addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
                        mc.thePlayer.onCriticalHit(target)
                        timer.reset()
                    }
                break;
                case "NoGround":
                break;
                case "AntiCheat":
                    if(timer.hasTimePassed(delay.get()) && target.hurtTime <= hurttime.get()) {
                        mc.getNetHandler().addToSendQueue(new S15PacketEntityRelMove.S17PacketEntityLookMove(mc.thePlayer.posX, mc.thePlayer.posY + 0.003140421304, mc.thePlayer.posZ, true));
                        mc.getNetHandler().addToSendQueue(new S15PacketEntityRelMove.S17PacketEntityLookMove(mc.thePlayer.posX, mc.thePlayer.posY + 0.00150000001304, mc.thePlayer.posZ, false))
                        timer.reset()
                    }
                break;
            }
        }
    }
    this.onPacket = function(event) {
        var packet = event.getPacket()
        if(packet instanceof C03PacketPlayer && mode.get() == "NoGround") {
            packet.onGround = false
        }
    }
}

var CriticalsFixed = new CriticalsFixed();

function onLoad() {}

function onEnable() {
    moduleManager.registerModule(CriticalsFixed);
};

function onDisable() {
    moduleManager.unregisterModule(CriticalsFixed);
};