var scriptName = "PseudoSelfDamage";
var scriptVersion = 1.0;
var scriptAuthor = "yorik100";

var pseudoSelfDamager = new PseudoSelfDamager();
var C04PacketPlayerPosition = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition');

var client;

function PseudoSelfDamager() {
    var Mode = value.createList("Mode", ["Basic", "YPort", "YPort2", "VClip", "PacketJump", "OldNCP"], "Basic");
    var OnlyOnGround = value.createBoolean("OnlyOnGround", true);
    this.addValues = function (values) {
        values.add(Mode);
        values.add(OnlyOnGround);
    }
    this.getName = function () {
        return "SelfDamager";
    };

    this.getDescription = function () {
        return "SelfDamager";
    };

    this.getCategory = function () {
        return "Misc";
    };
    this.onEnable = function () {
		if (!mc.thePlayer.isOnLadder() && !mc.thePlayer.isInWeb && !mc.thePlayer.isInWater() && !mc.thePlayer.isInLava() && mc.thePlayer.ridingEntity == null && (mc.thePlayer.onGround || !OnlyOnGround.get())){
        switch (Mode.get()) {
        case "Basic":
            if (mc.theWorld.getCollidingBoundingBoxes(mc.thePlayer, mc.thePlayer.getEntityBoundingBox().offset(0, 0.278, 0).expand(0, 0, 0)).isEmpty()) {
                for (var i = 0; i <= 10; ++i) {
                    mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.278, mc.thePlayer.posZ, false));
                    mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false));
                    if (i == 10)
                        mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, true));
                }
            } else {
                chat.print("§cNot enough space (0.278 blocks min distance between you and the block above you)")
            }
            break;
        case "YPort":
            if (mc.theWorld.getCollidingBoundingBoxes(mc.thePlayer, mc.thePlayer.getEntityBoundingBox().offset(0, 0.42, 0).expand(0, 0, 0)).isEmpty()) {
                for (var i = 0; i <= 7; ++i) {
                    mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.41999998688698, mc.thePlayer.posZ, false));
                    mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false));
                    if (i == 7)
                        mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, true));
                }
            } else {
                chat.print("§cNot enough space (0.42 blocks min distance between you and the block above you)")
            }
            break;
        case "YPort2":
            if (mc.theWorld.getCollidingBoundingBoxes(mc.thePlayer, mc.thePlayer.getEntityBoundingBox().offset(0, 1.00133597911214, 0).expand(0, 0, 0)).isEmpty()) {
                for (var i = 0; i <= 2; ++i) {
                    mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.41999998688698, mc.thePlayer.posZ, false));
                    mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.7531999805212, mc.thePlayer.posZ, false));
                    mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 1.00133597911214, mc.thePlayer.posZ, false));
                    mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false));
                    if (i == 2)
                        mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, true));
                }
            } else {
                chat.print("§cNot enough space (1 block min distance between you and the block above you)")
            }
            break;
        case "VClip":
            if (mc.theWorld.getCollidingBoundingBoxes(mc.thePlayer, mc.thePlayer.getEntityBoundingBox().offset(0, 3.45, 0).expand(0, 0, 0)).isEmpty()) {
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 3.45, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, true));
            } else {
                chat.print("§cNot enough space (you need to have a 2 blocks tall empty box 3.45 blocks above you)")
            }
            break;
        case "PacketJump":
            if (mc.theWorld.getCollidingBoundingBoxes(mc.thePlayer, mc.thePlayer.getEntityBoundingBox().offset(0, 1.2, 0).expand(0, 0, 0)).isEmpty()) {
                for (var i = 0; i <= 2; ++i) {
                    mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.41999998688698, mc.thePlayer.posZ, false));
                    mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.7531999805212, mc.thePlayer.posZ, false));
                    mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 1.00133597911214, mc.thePlayer.posZ, false));
                    mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 1.16610926093821, mc.thePlayer.posZ, false));
                    if (mc.theWorld.getCollidingBoundingBoxes(mc.thePlayer, mc.thePlayer.getEntityBoundingBox().offset(0, 1.24918707874468, 0).expand(0, 0, 0)).isEmpty()) {
                        mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 1.24918707874468, mc.thePlayer.posZ, false));
                    } else {
                        mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 1.2, mc.thePlayer.posZ, false));
                    }
                    mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 1.1707870772188, mc.thePlayer.posZ, false));
                    mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 1.0155550727022, mc.thePlayer.posZ, false));
                    mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.78502770378924, mc.thePlayer.posZ, false));
                    mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.4807108763317, mc.thePlayer.posZ, false));
                    mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.10408037809304, mc.thePlayer.posZ, false));
                    mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, i == 2));
                }
            } else {
                chat.print("§cNot enough space (1.2 blocks min distance between you and the block above you)")
            }
            break;
        case "OldNCP":
            if (mc.theWorld.getCollidingBoundingBoxes(mc.thePlayer, mc.thePlayer.getEntityBoundingBox().offset(0, 0.0625, 0).expand(0, 0, 0)).isEmpty()) {
                for (var i = 0; i <= 48; ++i) {
                    mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.0625, mc.thePlayer.posZ, false));
                    mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false));
                    if (i == 48)
                        mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, true));
                }
            } else {
                chat.print("§cNot enough space (0.0625 blocks min distance between you and the block above you)")
            }
            break;
        }
		}else{
		chat.print("§4You can't self damage in this area")
		}
    }
    this.onUpdate = function () {
        var autoDisableModule = moduleManager.getModule("SelfDamager");
        autoDisableModule.setState(false);
    }
    this.onDisable = function () {}
}

function onLoad() {}

function onEnable() {
    client = moduleManager.registerModule(pseudoSelfDamager);
}

function onDisable() {
    moduleManager.unregisterModule(client);
}