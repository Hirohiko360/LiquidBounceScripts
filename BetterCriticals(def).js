var scriptName = "BetterCriticals";
var scriptAuthor = "yorik100";
var scriptVersion = 2.1;
var C03PacketPlayer = Java.type("net.minecraft.network.play.client.C03PacketPlayer");
var C04PacketPlayerPosition = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition");
var C05PacketPlayerLook = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook");
var C06PacketPlayerPosLook = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook");
var C07PacketPlayerDigging = Java.type("net.minecraft.network.play.client.C07PacketPlayerDigging");
var C08PacketPlayerBlockPlacement = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement");
var C02PacketUseEntity = Java.type("net.minecraft.network.play.client.C02PacketUseEntity");
var S01PacketJoinGame = Java.type("net.minecraft.network.play.server.S01PacketJoinGame");
var S07PacketRespawn = Java.type("net.minecraft.network.play.server.S07PacketRespawn");
var S08PacketPlayerPosLook = Java.type("net.minecraft.network.play.server.S08PacketPlayerPosLook");
var Fucker = Java.type("net.ccbluex.liquidbounce.features.module.modules.world.Fucker");
var Nuker = Java.type("net.ccbluex.liquidbounce.features.module.modules.world.Nuker");
var KillAura = Java.type("net.ccbluex.liquidbounce.features.module.modules.combat.KillAura");
var LiquidBounce = Java.type("net.ccbluex.liquidbounce.LiquidBounce");
var Timer = Java.type("java.util.Timer");
var flyModule = moduleManager.getModule("Fly");
var BlockPos = Java.type("net.minecraft.util.BlockPos");
var EnumFacing = Java.type("net.minecraft.util.EnumFacing");
var MSTimer = Java.type("net.ccbluex.liquidbounce.utils.timer.MSTimer");

function setInterval(f, delay) {
    var timer = new Timer("setInterval", true);
    timer.schedule(function () {
        f();
    }, delay, delay);
    return timer;
}

function clearInterval(n) {
    n.cancel();
}

function setTimeout(func, delay) {
    var timer = new Timer("setTimeout", true);
    timer.schedule(function () {
        func();
    }, delay);
    return timer;
}
function clearTimeout(n) {
    n.cancel();
}
function BetterCriticals() {
    var mode = value.createList("Mode", ["Packet", "Packet2", "PacketHop", "PhasePacket", "NCPPacket", "AAC4Packet", "NoGround"], "Packet");
    var packetHurttime = value.createInteger("PacketHurttime", 2, 0, 10);
    var packetDelay = value.createInteger("PacketDelay", 500, 1, 2e3);
    var packetTimerDelay = value.createInteger("PacketTimerDelay", 500, 0, 2e3);
    var packetTimer = value.createFloat("PacketTimer", 0.33, 0.01, 1);
    var packetHopPacketHeight = value.createFloat("PacketHopPacketHeight", 0.15, 0.01, 0.5);
    var packetHopFirstMotion = value.createFloat("PacketHopFirstMotion", 0.149, 0.01, 0.499);
    var packetAirCrits = value.createBoolean("PacketAirCrits", false);
    var packetLessPackets = value.createBoolean("PacketLessPackets", false);
    var packetSmartGroundSpoof = value.createBoolean("PacketSmartGroundSpoof", false);
    var resetDelayOnTargetSwitch = value.createBoolean("ResetDelayOnTargetSwitch", false);
    var noGroundMode = value.createList("NoGroundMode", ["Normal", "Phase", "Hover", "AGC", "Verus"], "Normal");
    var noGroundAlwaysJump = value.createBoolean("NoGroundAlwaysJump", false);
    var noGroundHoverAAC = value.createBoolean("NoGroundHoverAACMode", false);
    this.getName = function () {
        return "BetterCriticals";
    };
    this.getDescription = function () {
        return "deobfuscated by july";
    };
    this.getCategory = function () {
        return "Combat";
    };
    this.addValues = function (values) {
        values.add(mode)
        values.add(noGroundMode)
        values.add(packetAirCrits)
        values.add(packetLessPackets)
        values.add(packetSmartGroundSpoof)
        values.add(noGroundAlwaysJump)
        values.add(resetDelayOnTargetSwitch)
        values.add(noGroundHoverAAC)
        values.add(packetHurttime)
        values.add(packetDelay)
        values.add(packetTimerDelay)
        values.add(packetTimer)
        values.add(packetHopPacketHeight)
        values.add(packetHopFirstMotion)
        this.getTag = function () {
            return mode.get();
        };
        var vb = false;
        var agcCounter = 0;
        var dx = false;
        var timer1 = new MSTimer;
        var timer2 = new MSTimer;
        var timer3 = new MSTimer;
        var target = "";
        this.onEnable = function () {
            this.ground = false;
            this.lol = false;
            this.yaw = mc.thePlayer.rotationYaw;
            this.firstPacketHover = false;
            agcCounter = 0;
            this.replace = false;
            vb = true;
            this.secondTick = 0;
            this.pitch = mc.thePlayer.rotationPitch;
            this.nextReplace = false;
            this.nextPacket = false;
            this.replaceTwo = false;
            this.offTheGround = false;
            this.packet = false;
            this.packetTimer = mc.timer.timerSpeed;
            this.mine = mc.playerController.curBlockDamageMP;
            this.nuker = LiquidBounce.moduleManager.getModule(Nuker.class).currentDamage;
            normal = true;
            crit = true;
            this.waiting = false;
            dx = false;
            this.fucker = LiquidBounce.moduleManager.getModule(Fucker.class).currentDamage;
        };
        this.onStepConfirm = function (canCreateDiscussions) {
            agcCounter = 2;
        };
        this.onUpdate = function () {
            if (dx && timer1.hasTimePassed(500)) {
                dx = false;
                vb = true;
            }
            if ((noGroundMode.get() == "AGC" || noGroundMode.get() == "Verus") && mode.get() == "NoGround" && !mc.thePlayer.onGround) {
                this.offTheGround = true;
            }
            if (mc.thePlayer.motionY == 0) {
                this.zeromotion = true;
            } else {
                this.zeromotion = false;
            }
            if (this.packet) {
                this.packet = false;
            }
            if (mode.get() != "NoGround") {
                this.isNoGround = true;
            }
            if (this.yaw != mc.thePlayer.rotationYaw) {
                this.yawing = true;
                this.yaw = mc.thePlayer.rotationYaw;
            } else {
                this.yawing = false;
            }
            if (this.pitch != mc.thePlayer.rotationPitch) {
                this.pitching = true;
                this.pitch = mc.thePlayer.rotationPitch;
            } else {
                this.pitching = false;
            }
            if (this.mine != mc.playerController.curBlockDamageMP) {
                if (mc.playerController.curBlockDamageMP != 0) {
                    this.mining = true;
                }
                this.mine = mc.playerController.curBlockDamageMP;
            } else {
                this.mining = false;
            }
            if (this.fucker != LiquidBounce.moduleManager.getModule(Fucker.class).currentDamage) {
                if (LiquidBounce.moduleManager.getModule(Fucker.class).currentDamage != 0) {
                    this.fucking = true;
                }
                this.fucker = LiquidBounce.moduleManager.getModule(Fucker.class).currentDamage;
            } else {
                this.fucking = false;
            }
            if (this.nuker != LiquidBounce.moduleManager.getModule(Nuker.class).currentDamage) {
                if (LiquidBounce.moduleManager.getModule(Nuker.class).currentDamage != 0) {
                    this.nuking = true;
                }
                this.nuker = LiquidBounce.moduleManager.getModule(Nuker.class).currentDamage;
            } else {
                this.nuking = false;
            }
            if (mode.get() == "NoGround" && (!mc.thePlayer.onGround || this.mining || this.fucking || this.nuking) && !this.notTwice) {
                vb = true;
                this.notTwice = true;
            }
            if (mc.thePlayer.isOnLadder() || mc.thePlayer.isInWeb || mc.thePlayer.isInWater() || mc.thePlayer.isInLava() || mc.thePlayer.ridingEntity != null) {
                vb = true;
            }
            if (mode.get() == "NoGround" && mc.thePlayer.onGround) {
                if (noGroundAlwaysJump.get()) {
                    mc.thePlayer.jump();
                }
                this.notTwice = false;
            }
            if (this.lol && !mc.thePlayer.onGround) {
                this.lol = false;
                mc.thePlayer.motionY = -0.001;
            }
            if (normal && timer2.hasTimePassed(packetTimerDelay.get())) {
                if (this.packetTimer != 0) {
                    mc.timer.timerSpeed = this.packetTimer;
                } else {
                    mc.timer.timerSpeed = 1;
                }
                this.waiting = false;
                this.packetTimer = 0;
                normal = false;
            }
        };
        this.onDisable = function () {
            if (this.packetTimer > 0) {
                mc.timer.timerSpeed = this.packetTimer;
            }
        };
        this.onPacket = function (event) {
            if (mc.theWorld != null && mc.thePlayer != null) {
                var packet = event.getPacket();
                if (mode.get() == "NoGround" && !mc.thePlayer.isOnLadder() && !mc.thePlayer.isInWeb && !mc.thePlayer.isInWater() && !mc.thePlayer.isInLava() && mc.thePlayer.ridingEntity == null) {
                    if (packet instanceof C03PacketPlayer && noGroundMode.get() == "AGC" && !this.mining && !this.fucking && !this.nuking) {
                        this.replace = true;
                    }
                    if (this.isNoGround) {
                        vb = true;
                        this.isNoGround = false;
                    }
                    if (packet instanceof S01PacketJoinGame || packet instanceof S07PacketRespawn) {
                        timer3.reset();
                        dx = true;
                    }
                    if (packet instanceof S08PacketPlayerPosLook) {
                        timer3.reset();
                        dx = true;
                    }
                    if (packet instanceof C03PacketPlayer && !mc.thePlayer.isCollidedVertically && mode.get() == "NoGround" && this.zeromotion) {
                        timer3.reset();
                        dx = true;
                    }
                    if (!mc.theWorld.getCollidingBoundingBoxes(mc.thePlayer, mc.thePlayer.getEntityBoundingBox().offset(0, (mc.thePlayer.motionY - 0.08) * 0.98, 0).expand(0, 0, 0)).isEmpty() && mc.thePlayer.motionY <= 0 && vb && packet instanceof C03PacketPlayer && !(noGroundMode.get() == "Hover" && mc.thePlayer.motionY < -0.5 && !mc.thePlayer.onGround && noGroundHoverAAC.get())) {
                        vb = false;
                        if (!(noGroundMode.get() == "AGC" || noGroundMode.get() == "Verus")) {
                            packet.onGround = true;
                        }
                        this.ground = mc.thePlayer.onGround;
                    } else {
                        if (this.ground && !this.mining && !this.fucking && !this.nuking) {
                            this.ground = false;
                            if (mc.thePlayer.onGround) {
                                this.replaceTwo = true;
                            }
                        } else {
                            if (!this.replaceTwo && mc.thePlayer.onGround) {
                                if (packet instanceof C04PacketPlayerPosition || packet instanceof C06PacketPlayerPosLook) {
                                    if (packet.y == mc.thePlayer.posY && !this.packet) {
                                        switch (noGroundMode.get()) {
                                            case "Phase":
                                                packet.y -= 1e-13;
                                                packet.onGround = false;
                                                break;
                                            case "Hover":
                                                packet.y += 1e-13;
                                                packet.onGround = false;
                                                break;
                                            case "AGC":
                                                packet.y -= 1e-13;
                                                packet.onGround = false;
                                                agcCounter++;
                                                this.secondTick += 1;
                                                if (agcCounter >= 2 || this.offTheGround) {
                                                    agcCounter = 0;
                                                    packet.y += 1e-13;
                                                    if (this.offTheGround || this.secondTick >= 1e3) {
                                                        packet.onGround = true;
                                                        this.offTheGround = false;
                                                        this.secondTick = 0;
                                                    }
                                                }
                                                break;
                                            case "Verus":
                                                if (mc.thePlayer.motionY <= 0) {
                                                    packet.onGround = false;
                                                    if (this.offTheGround) {
                                                        packet.onGround = true;
                                                        this.replace = true;
                                                        this.offTheGround = false;
                                                    }
                                                }
                                                break;
                                        }
                                        this.packet = true;
                                    }
                                } else {
                                    if (packet instanceof C03PacketPlayer) {
                                        packet.onGround = false;
                                    }
                                }
                            }
                        }
                    }
                }
                if (packet instanceof C03PacketPlayer && this.replace) {
                    if (packet instanceof C05PacketPlayerLook) {
                        event.cancelEvent();
                        mc.thePlayer.sendQueue.addToSendQueue(new C06PacketPlayerPosLook(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, mc.thePlayer.rotationYaw, mc.thePlayer.rotationPitch, packet.isOnGround()));
                        this.replace = false;
                    } else {
                        if (packet instanceof C03PacketPlayer && !(packet instanceof C04PacketPlayerPosition) && !(packet instanceof C05PacketPlayerLook) && !(packet instanceof C06PacketPlayerPosLook)) {
                            event.cancelEvent();
                            mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, packet.isOnGround()));
                            this.replace = false;
                        } else {
                            if (packet instanceof C04PacketPlayerPosition || packet instanceof C06PacketPlayerPosLook) {
                                this.replace = false;
                            }
                        }
                    }
                }
                if (packet instanceof C03PacketPlayer && this.replaceTwo) {
                    if (packet instanceof C05PacketPlayerLook) {
                        this.replaceTwo = false;
                        event.cancelEvent();
                        mc.thePlayer.sendQueue.addToSendQueue(new C06PacketPlayerPosLook(mc.thePlayer.posX, mc.thePlayer.posY + 2e-13, mc.thePlayer.posZ, mc.thePlayer.rotationYaw, mc.thePlayer.rotationPitch, true));
                        this.replace = true;
                    } else {
                        if (packet instanceof C03PacketPlayer && !(packet instanceof C04PacketPlayerPosition) && !(packet instanceof C05PacketPlayerLook) && !(packet instanceof C06PacketPlayerPosLook)) {
                            this.replaceTwo = false;
                            event.cancelEvent();
                            mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 2e-13, mc.thePlayer.posZ, true));
                            this.replace = true;
                        } else {
                            if (packet instanceof C04PacketPlayerPosition || packet instanceof C06PacketPlayerPosLook) {
                                this.replaceTwo = false;
                                this.replace = true;
                                packet.onGround = true;
                                packet.y = packet.y + 2e-13;
                            }
                        }
                    }
                }
                if (packet instanceof C03PacketPlayer && this.cancelPacket) {
                    if (this.cancelPhase) {
                        packet.y -= 8e-15;
                        this.cancelPhase = false;
                        this.nextReplace = true;
                    }
                    packet.onGround = false;
                    this.bufferAttack = true;
                    this.cancelPacket = false;
                }
                if (packet instanceof C02PacketUseEntity && this.cancelPacket) {
                    if (packet.getAction() == C02PacketUseEntity.Action.ATTACK) {
                        list[list.length] = event.getPacket().getEntityFromWorld(mc.theWorld);
                        event.cancelEvent();
                    }
                }
            }
        };
        this.onMotion = function (event) {
            if (event.getEventState() == "POST") {
                if (this.nextReplace) {
                    this.nextReplace = false;
                    this.replace = true;
                }
                if (mode.get() == "NCPPacket" && packetLessPackets.get() && LiquidBounce.moduleManager.getModule(KillAura.class).blockingStatus) {
                    mc.thePlayer.sendQueue.addToSendQueue(new C07PacketPlayerDigging(C07PacketPlayerDigging.Action.RELEASE_USE_ITEM, BlockPos.ORIGIN, EnumFacing.DOWN));
                }
                if (this.bufferAttack) {
                    this.bufferAttack = false;
                    lLen = list.length;
                    noGroundHoverAAC = 0;
                    for (; noGroundHoverAAC < lLen; noGroundHoverAAC++) {
                        mc.thePlayer.sendQueue.addToSendQueue(new C02PacketUseEntity(list[noGroundHoverAAC], C02PacketUseEntity.Action.ATTACK));
                    }
                    list = [];
                }
                if (mode.get() == "NCPPacket" && packetLessPackets.get() && LiquidBounce.moduleManager.getModule(KillAura.class).blockingStatus) {
                    mc.thePlayer.sendQueue.addToSendQueue(new C08PacketPlayerBlockPlacement(mc.thePlayer.inventory.getCurrentItem()));
                }
            }
        };
        this.onAttack = function (event) {
            target = event.getTargetEntity();
            if (target.hurtTime <= packetHurttime.get() && (timer1.hasTimePassed(packetDelay.get()) || this.entity != target && resetDelayOnTargetSwitch.get()) && (mc.thePlayer.onGround || packetAirCrits.get() && mc.thePlayer.fallDistance == 0) && mc.thePlayer.isCollidedVertically && !mc.thePlayer.isOnLadder() && !mc.thePlayer.isInWeb && !mc.thePlayer.isInWater() && !mc.thePlayer.isInLava() && mc.thePlayer.ridingEntity == null) {
                switch (mode.get()) {
                    case "Packet":
                        mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 8e-15, mc.thePlayer.posZ, packetSmartGroundSpoof.get()));
                        if (packetLessPackets.get()) {
                            this.cancelPacket = true;
                        } else {
                            mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false));
                        }
                        this.replace = true;
                        timer1.reset();
                        if (!this.waiting) {
                            this.packetTimer = mc.timer.timerSpeed;
                            mc.timer.timerSpeed = packetTimer.get();
                            timer2.reset();
                            normal = true;
                        }
                        this.waiting = true;
                        list = [];
                        this.timer = 1;
                        break;
                    case "Packet2":
                        mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.012, mc.thePlayer.posZ, packetSmartGroundSpoof.get()));
                        mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.012008726, mc.thePlayer.posZ, false));
                        if (packetLessPackets.get()) {
                            this.cancelPacket = true;
                        } else {
                            mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false));
                        }
                        this.replace = true;
                        timer1.reset();
                        if (!this.waiting) {
                            this.packetTimer = mc.timer.timerSpeed;
                            mc.timer.timerSpeed = packetTimer.get();
                            timer2.reset();
                            normal = true;
                        }
                        this.waiting = true;
                        list = [];
                        this.timer = 1;
                        break;
                    case "PacketHop":
                        if (mc.thePlayer.onGround) {
                            if (mc.theWorld.getCollidingBoundingBoxes(mc.thePlayer, mc.thePlayer.getEntityBoundingBox().offset(0, packetHopPacketHeight.get(), 0).expand(0, 0, 0)).isEmpty()) {
                                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + packetHopPacketHeight.get(), mc.thePlayer.posZ, packetSmartGroundSpoof.get()));
                            }
                            if (packetHopFirstMotion.get() != 0) {
                                mc.thePlayer.motionY = packetHopFirstMotion.get();
                            }
                            this.cancelPacket = true;
                            this.lol = true;
                            this.replace = true;
                            timer1.reset();
                            if (!this.waiting) {
                                this.packetTimer = mc.timer.timerSpeed;
                                mc.timer.timerSpeed = packetTimer.get();
                                timer2.reset();
                                normal = true;
                            }
                            this.waiting = true;
                            list = [];
                            this.timer = 1;
                        }
                        break;
                    case "NCPPacket":
                        mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.0626, mc.thePlayer.posZ, packetSmartGroundSpoof.get()));
                        if (packetLessPackets.get()) {
                            this.cancelPacket = true;
                        } else {
                            mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false));
                        }
                        this.replace = true;
                        timer1.reset();
                        if (!this.waiting) {
                            this.packetTimer = mc.timer.timerSpeed;
                            mc.timer.timerSpeed = packetTimer.get();
                            timer2.reset();
                            normal = true;
                        }
                        this.waiting = true;
                        list = [];
                        this.timer = 1;
                        break;
                    case "AAC4Packet":
                        mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX - mc.thePlayer.motionX / 1.5, mc.thePlayer.posY + 3e-14, mc.thePlayer.posZ - mc.thePlayer.motionZ / 1.5, packetSmartGroundSpoof.get()));
                        mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX - mc.thePlayer.motionX / 3, mc.thePlayer.posY + 8e-15, mc.thePlayer.posZ - mc.thePlayer.motionZ / 3, false));
                        mc.thePlayer.motionX *= 0;
                        mc.thePlayer.motionZ *= 0;
                        this.replace = true;
                        timer1.reset();
                        if (!this.waiting) {
                            this.packetTimer = mc.timer.timerSpeed;
                            mc.timer.timerSpeed = packetTimer.get();
                            timer2.reset();
                            normal = true;
                        }
                        this.waiting = true;
                        list = [];
                        this.timer = 1;
                        break;
                    case "PhasePacket":
                        if (packetLessPackets.get()) {
                            this.cancelPacket = true;
                            this.cancelPhase = true;
                        } else {
                            mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY - 8e-15, mc.thePlayer.posZ, false));
                        }
                        this.replace = true;
                        timer1.reset();
                        if (!this.waiting) {
                            this.packetTimer = mc.timer.timerSpeed;
                            mc.timer.timerSpeed = packetTimer.get();
                            timer2.reset();
                            normal = true;
                        }
                        this.waiting = true;
                        list = [];
                        this.timer = 1;
                        break;
                }
            }
            this.entity = event.getTargetEntity();
        };
    }
}
var betterCriticals = new BetterCriticals;
var betterCriticalsClient;
function onLoad() {}
function onEnable() {
    betterCriticalsClient = moduleManager.registerModule(betterCriticals);
}
function onDisable() {
    moduleManager.unregisterModule(betterCriticalsClient);
}