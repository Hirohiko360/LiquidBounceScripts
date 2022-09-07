var scriptName = "AutoCockBlock";
var scriptVersion = Math.random();
var scriptAuthor = "Etho";

var Renderer = new Renderer();
var RendererClient;

var Timer = Java.type("java.util.Timer");
var BlockPos = Java.type('net.minecraft.util.BlockPos');
var C02PacketUseEntity = Java.type('net.minecraft.network.play.client.C02PacketUseEntity');
var C02PacketUseEntityACTION = Java.type('net.minecraft.network.play.client.C02PacketUseEntity.Action');
var C08PacketPlayerBlockPlacement = Java.type('net.minecraft.network.play.client.C08PacketPlayerBlockPlacement');
var Vec3 = Java.type('net.minecraft.util.Vec3');
var KeyBinding = Java.type('net.minecraft.client.settings.KeyBinding');

function setTimeout(func, milliseconds) {
    var timer = new Timer("setTimeout", true);
    timer.schedule(function () {
        func();
    }, milliseconds);

    return timer;
}

function Renderer() {
    var BlockTimeout = value.createInteger("BlockTimeout", 300, 1, 1000);
    var BlockRange = value.createInteger("BlockRange", 4, 1, 6);
    var Attack = value.createBoolean("OnAttack", true)
    var Interact = value.createBoolean("Interact", false)
    var BypassBlock = value.createList("Mode", ["Basic", "VeltPVP"], "Basic");

    this.getName = function () {
        return "AutoBlock";
    };

    this.getDescription = function () {
        return "Customizable Autoblock";
    };

    this.getCategory = function () {
        return "fun";
    };

    this.onUpdate = function () {
        if(Attack.get() == false) {
            if(mc.gameSettings.keyBindAttack.pressed == true) {
                if (BypassBlock.get() == "Basic") {
                    if(mc.thePlayer.getHeldItem().getItem() != null) {
                        KeyBinding.setKeyBindState(mc.gameSettings.keyBindUseItem.getKeyCode(), true);
                        setTimeout(function () {
                            KeyBinding.setKeyBindState(mc.gameSettings.keyBindUseItem.getKeyCode(), false);
                        }, BlockTimeout.get())
                    
                        if(Interact.get() == true) {
                            mc.thePlayer.sendQueue.addToSendQueue(new C02PacketUseEntity(entity, new Vec3(randomNumber(-50, 50) / 100,randomNumber(0, 200) / 100,randomNumber(-50, 50) / 100)));
                            mc.thePlayer.sendQueue.addToSendQueue(new C02PacketUseEntity(entity, C02PacketUseEntityACTION.INTERACT));
                        }
                        mc.thePlayer.sendQueue.addToSendQueue(new C08PacketPlayerBlockPlacement(mc.thePlayer.inventory.getCurrentItem()));
                    }
                }
            }
        }
    }

    this.onAttack = function (event) {
        var entity = event.getTargetEntity();
        if(Attack.get() == true) {
            if(mc.thePlayer.getHeldItem().getItem() != null) {
                if(mc.thePlayer.getDistanceToEntity(entity) <= BlockRange.get()) {
                    if (BypassBlock.get() == "Basic") {
                        KeyBinding.setKeyBindState(mc.gameSettings.keyBindUseItem.getKeyCode(), true);
                        setTimeout(function () {
                            KeyBinding.setKeyBindState(mc.gameSettings.keyBindUseItem.getKeyCode(), false);
                        }, BlockTimeout.get())
                        
                        if(Interact.get() == true) {
                            mc.thePlayer.sendQueue.addToSendQueue(new C02PacketUseEntity(entity, new Vec3(randomNumber(-50, 50) / 100,randomNumber(0, 200) / 100,randomNumber(-50, 50) / 100)));
                            mc.thePlayer.sendQueue.addToSendQueue(new C02PacketUseEntity(entity, C02PacketUseEntityACTION.INTERACT));
                        }
                        mc.thePlayer.sendQueue.addToSendQueue(new C08PacketPlayerBlockPlacement(mc.thePlayer.inventory.getCurrentItem()));
                    }
                    if (BypassBlock.get() == "VeltPVP") {
                        KeyBinding.setKeyBindState(mc.gameSettings.keyBindUseItem.getKeyCode(), true);
                        setTimeout(function () {
                            KeyBinding.setKeyBindState(mc.gameSettings.keyBindUseItem.getKeyCode(), false);
                        }, BlockTimeout.get())
                        
                        if(Interact.get() == true) {
                            mc.thePlayer.sendQueue.addToSendQueue(new C02PacketUseEntity(entity, new Vec3(randomNumber(-50, 50) / 100,randomNumber(0, 200) / 100,randomNumber(-50, 50) / 100)));
                            mc.thePlayer.sendQueue.addToSendQueue(new C02PacketUseEntity(entity, C02PacketUseEntityACTION.INTERACT));
                        }
                        setTimeout(function() {
                            mc.thePlayer.sendQueue.addToSendQueue(new C08PacketPlayerBlockPlacement(new BlockPos(-1,-1,-1), 255, mc.thePlayer.inventory.getCurrentItem(), 0, 0, 0));
                        }, 12);
                    }
                }
            }
        }
    }

    this.onDisable = function() {}
    this.onEnable = function() {}
    this.addValues = function(values) {
        values.add(BlockTimeout);
        values.add(BlockRange);
        values.add(Attack);
        values.add(Interact);
        values.add(BypassBlock);
    }
}

function randomNumber(max, min) {
    return Math.round(min + Math.random() * ((max - min)));
}

function onEnable() {
    RendererClient = moduleManager.registerModule(Renderer);
};

function onDisable() {
    moduleManager.unregisterModule(RendererClient);
};