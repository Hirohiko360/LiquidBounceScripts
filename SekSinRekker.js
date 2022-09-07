var script = registerScript({
    name: "SekSin Rekker",
    version: "5.0",
    authors: ["1337quip"]
});

var MovementUtils = Java.type("net.ccbluex.liquidbounce.utils.MovementUtils");
var C03PacketPlayer = Java.type("net.minecraft.network.play.client.C03PacketPlayer");

//-----------------------------------------------------------------------------------------------------------

function strafe(speed) {
    var a = mc.thePlayer.rotationYaw * 0.017453292;
    var l = mc.thePlayer.rotationYaw * 0.017453292 - Math.PI * 1.5;
    var r = mc.thePlayer.rotationYaw * 0.017453292 + Math.PI * 1.5;
    var rf = mc.thePlayer.rotationYaw * 0.017453292 + Math.PI * 0.19;
    var lf = mc.thePlayer.rotationYaw * 0.017453292 + Math.PI * -0.19;
    var lb = mc.thePlayer.rotationYaw * 0.017453292 - Math.PI * 0.76;
    var rb = mc.thePlayer.rotationYaw * 0.017453292 - Math.PI * -0.76;
    if (mc.gameSettings.keyBindForward.pressed) {
        if (mc.gameSettings.keyBindLeft.pressed && !mc.gameSettings.keyBindRight.pressed) {
            mc.thePlayer.motionX -= (Math.sin(lf) * speed);
            mc.thePlayer.motionZ += (Math.cos(lf) * speed);
        } else if (mc.gameSettings.keyBindRight.pressed && !mc.gameSettings.keyBindLeft.pressed) {
            mc.thePlayer.motionX -= (Math.sin(rf) * speed);
            mc.thePlayer.motionZ += (Math.cos(rf) * speed);
        } else {
            mc.thePlayer.motionX -= (Math.sin(a) * speed);
            mc.thePlayer.motionZ += (Math.cos(a) * speed);
        }
    } else if (mc.gameSettings.keyBindBack.pressed) {
        if (mc.gameSettings.keyBindLeft.pressed && !mc.gameSettings.keyBindRight.pressed) {
            mc.thePlayer.motionX -= (Math.sin(lb) * speed);
            mc.thePlayer.motionZ += (Math.cos(lb) * speed);
        } else if (mc.gameSettings.keyBindRight.pressed && !mc.gameSettings.keyBindLeft.pressed) {
            mc.thePlayer.motionX -= (Math.sin(rb) * speed);
            mc.thePlayer.motionZ += (Math.cos(rb) * speed);
        } else {
            mc.thePlayer.motionX += (Math.sin(a) * speed);
            mc.thePlayer.motionZ -= (Math.cos(a) * speed);
        }
    } else if (mc.gameSettings.keyBindLeft.pressed && !mc.gameSettings.keyBindRight.pressed && !mc.gameSettings.keyBindForward.pressed && !mc.gameSettings.keyBindBack.pressed) {
        mc.thePlayer.motionX += (Math.sin(l) * speed);
        mc.thePlayer.motionZ -= (Math.cos(l) * speed);
    } else if (mc.gameSettings.keyBindRight.pressed && !mc.gameSettings.keyBindLeft.pressed && !mc.gameSettings.keyBindForward.pressed && !mc.gameSettings.keyBindBack.pressed) {
        mc.thePlayer.motionX += (Math.sin(r) * speed);
        mc.thePlayer.motionZ -= (Math.cos(r) * speed);
    }
}

var boosted = false;

script.registerModule({
    name: "SekSinLongJump",
    category: "Fun",
    description: "LongJump for Mc-SekSin.net | By 1337quip (wasd#9800) & The Moss (crave#6948)",
    settings: {
        longJumpMode: Setting.list({
            name: "Mode",
            default: "New",
            values: ["New", "Old"]
        }),
        autoJump: Setting.boolean({
            name: "AutoJump",
            default: false
        }),
        keepSprint: Setting.boolean({
            name: "KeepSprint",
            default: false
        }),
        sendPacket: Setting.boolean({
            name: "SendPacket",
            default: false
        }),
        lagSpoofonGround: Setting.boolean({
            name: "LagSpoofonGround",
            default: false
        }),
        keepNoFallEnable: Setting.boolean({
            name: "KeepNoFallEnable",
            default: false
        }),
        newBoost: Setting.boolean({
            name: "New-Boost",
            default: true
        }),
        newBoostSpeedSetting: Setting.float({
            name: "New-Boost-Speed",
            min: 0.3,
            max: 1.0,
            default: 0.6
        }),
        newMotionYSetting: Setting.float({
            name: "New-MotionY",
            min: 0.030,
            max: 0.050,
            default: 0.042
        }),
        newSpeedSetting: Setting.float({
            name: "New-Speed",
            min: 0.30,
            max: 1.00,
            default: 0.75
        }),
        newTimerSetting: Setting.float({
            name: "New-Timer",
            min: 0.3,
            max: 0.8,
            default: 0.5
        }),

        oldMotionYSetting: Setting.float({
            name: "Old-MotionY",
            min: 0.030,
            max: 0.050,
            default: 0.045
        }),
        oldSpeedSetting: Setting.float({
            name: "Old-Speed",
            min: 0.01,
            max: 0.10,
            default: 0.05
        }),
        oldTimerSetting: Setting.float({
            name: "Old-Timer",
            min: 0.3,
            max: 0.8,
            default: 0.4
        })
    }
}, function (module) {
    module.on("update", function () {
        module.tag = module.settings.longJumpMode.get();

        if (module.settings.longJumpMode.get() == "New") {
            if (!mc.thePlayer.onGround) {
                if (!module.settings.keepSprint.get())
                    mc.gameSettings.keyBindSprint.pressed = false;
                mc.thePlayer.motionY += module.settings.newMotionYSetting.get();
                if (!module.settings.sendPacket.get())
                    mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer(true));
                mc.gameSettings.keyBindSprint.pressed = false;
                var speed = module.settings.newSpeedSetting.get();
                var timer = module.settings.newTimerSetting.get();
                if (module.settings.newBoost.get()) {
                    if (boosted) {
                        speed = module.settings.newBoostSpeedSetting.get();
                        timer = 1.0;
                        boosted = false;
                    }
                }
                var yaw = mc.thePlayer.rotationYaw * 0.017453292;
                mc.thePlayer.motionX = -Math.sin(yaw) * speed;
                mc.thePlayer.motionZ = Math.cos(yaw) * speed;
                mc.timer.timerSpeed = timer;
            } else {
                mc.timer.timerSpeed = 1.0;
            }
        }
        if (module.settings.lagSpoofonGround.get()) {
            var SekSinNoFallModule = moduleManager.getModule("SekSinNoFall");
            if (!SekSinNoFallModule.getState()) {
                SekSinNoFallModule.setState(true);
            }
        }
        if (module.settings.autoJump.get() && mc.thePlayer.onGround && MovementUtils.isMoving())
            mc.thePlayer.jump();
    });
    module.on("move", function (event) {
        if (module.settings.longJumpMode.get() == "Old") {
            if (!mc.thePlayer.onGround) {
                if (!module.settings.keepSprint.get())
                    mc.gameSettings.keyBindSprint.pressed = false;
                mc.thePlayer.motionY += module.settings.oldMotionYSetting.get();
                if (!module.settings.sendPacket.get())
                    mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer(true));
                strafe(module.settings.oldSpeedSetting.get());
                mc.timer.timerSpeed = module.settings.oldTimerSetting.get();
            } else {
                mc.timer.timerSpeed = 1.0;
            }
        }
    });
    module.on("enable", function () {
        boosted = true;
        Chat.print("§8§l§m+---------------------------------------------+")
        Chat.print("");
        Chat.print("§8§l[§9§lLiquidBounce§8§l] §a§lPress Jump for Make sinxao Crying!! lmao");
        Chat.print("§8§l[§9§lLiquidBounce§8§l] §c§lNot Recommended for Heavy use");
        Chat.print("§8§l[§9§lLiquidBounce§8§l] §c§lIf LongJump doesn't work well, please disable AutoJump");
        Chat.print("§8§l[§9§lLiquidBounce§8§l] §f§lLongJump for Mc-SekSin.net | By §a§l1337quip §f§l(§a§lwasd#9800§f§l) & §a§lThe Moss §f§l(§a§lcrave#6948§f§l)");
        Chat.print("");
        Chat.print("§8§l§m+---------------------------------------------+");
    });
    module.on("disable", function () {
        mc.timer.timerSpeed = 1.0;
        if (module.settings.lagSpoofonGround.get()) {
            if (!module.settings.keepNoFallEnable.get()) {
                var SekSinNoFallModule = moduleManager.getModule("SekSinNoFall");
                if (SekSinNoFallModule.getState()) {
                    SekSinNoFallModule.setState(false);
                }
            }
        }
    });
});

//-----------------------------------------------------------------------------------------------------------

script.registerModule({
    name: "SekSinSpeed",
    category: "Fun",
    description: "Speed for Mc-SekSin.net | By 1337quip (wasd#9800)",
    settings: {
        speedMode: Setting.list({
            name: "Mode",
            default: "v1",
            values: ["v1", "v2"]
        })
    }
}, function (module) {
    module.on("update", function () {
        module.tag = module.settings.speedMode.get();
        switch (module.settings.speedMode.get()) {
            case "v1":
                if (!MovementUtils.isMoving())
                    return;
                if (mc.thePlayer.onGround) {
                    mc.gameSettings.keyBindJump.pressed = false;
                    mc.thePlayer.jump();
                }
                if (!mc.thePlayer.onGround && mc.thePlayer.fallDistance <= 0.1) {
                    mc.thePlayer.speedInAir = 0.02;
                    mc.timer.timerSpeed = 1.5;
                }
                if (mc.thePlayer.fallDistance > 0.1 && mc.thePlayer.fallDistance < 1.3) {
                    mc.timer.timerSpeed = 0.7;
                }
                if (mc.thePlayer.fallDistance >= 1.3) {
                    mc.timer.timerSpeed = 1;
                    mc.thePlayer.speedInAir = 0.02;
                }
                break;
            case "v2":
                if (!MovementUtils.isMoving())
                    return;
                if (mc.thePlayer.onGround) {
                    mc.thePlayer.jump();
                    mc.thePlayer.speedInAir = 0.0201;
                    mc.timer.timerSpeed = 0.94;
                }
                if (mc.thePlayer.fallDistance > 0.7 && mc.thePlayer.fallDistance < 1.3) {
                    mc.thePlayer.speedInAir = 0.02;
                    mc.timer.timerSpeed = 1.8;
                }
                break;
        }
    });
    module.on("enable", function () {
        Chat.print("§8§l§m+---------------------------------------------+");
        Chat.print("");
        Chat.print("§8§l[§9§lLiquidBounce§8§l] §f§lSpeed for §a§lMc-SekSin.net §f§l| By §a§l1337quip §f§l(§a§lwasd#9800§f§l)");
        Chat.print("");
        Chat.print("§8§l§m+---------------------------------------------+");
    });
    module.on("disable", function () {
        mc.timer.timerSpeed = 1;
        mc.thePlayer.speedInAir = 0.02
    });
});

//-----------------------------------------------------------------------------------------------------------

script.registerModule({
    name: "SekSinVelocity",
    category: "Fun",
    description: "Velocity for Mc-SekSin.net | By 1337quip (wasd#9800)"
}, function (module) {
    module.on("update", function () {
        if (!isVoid) {
            if (mc.thePlayer.hurtTime > 0 && mc.thePlayer.hurtTime <= 6) {
                mc.thePlayer.motionX *= 0.6;
                mc.thePlayer.motionZ *= 0.6;
            }
        }
    });
    module.on("enable", function () {
        Chat.print("§8§l§m+---------------------------------------------+");
        Chat.print("");
        Chat.print("§8§l[§9§lLiquidBounce§8§l] §f§lVelocity for §a§lMc-SekSin.net §f§l| By §a§l1337quip §f§l(§a§lwasd#9800§f§l)");
        Chat.print("");
        Chat.print("§8§l§m+---------------------------------------------+");
    });
});

//-----------------------------------------------------------------------------------------------------------

var S02PacketChat = Java.type("net.minecraft.network.play.server.S02PacketChat");
var textlist = null;
var File = Java.type("java.io.File");
var FileReader = Java.type("java.io.FileReader");
var BufferedReader = Java.type("java.io.BufferedReader");
var FileInputStream = Java.type("java.io.FileInputStream");
var InputStreamReader = Java.type("java.io.InputStreamReader");
var PrintWriter = Java.type("java.io.PrintWriter");

script.registerModule({
    name: "KillSuits",
    category: "Fun",
    description: "KillSuits for Mc-SekSin.net | By The Moss (crave#6948) & Modify by 1337quip (wasd#9800)",
}, function (module) {
    module.on("enable", function () {
        if (fuckyou == null) {
            Chat.print("§8§l§m+---------------------------------------------+");
            Chat.print("");
            Chat.print("§8§l[§9§lLiquidBounce§8§l] §c§lPlease set path! by .killsuits <path>");
            Chat.print("§8§l[§9§lLiquidBounce§8§l] §c§lYour path must not contain spaces!");
            Chat.print("");
            Chat.print("§8§l§m+---------------------------------------------+");
            return;
        }
        Chat.print("§8§l§m+---------------------------------------------+");
        Chat.print("");
        Chat.print("§8§l[§9§lLiquidBounce§8§l] §f§lKillSuits for §a§lMc-SekSin.net §f§l| By §a§lThe Moss §f§l(§a§lcrave#6948§f§l) & Modify by §a§l1337quip §f§l(§a§lwasd#9800§f§l");
        Chat.print("");
        Chat.print("§8§l§m+---------------------------------------------+");
    });

    module.on("packet", function (event) {
        var packet = event.getPacket();
        if (packet instanceof S02PacketChat && textlist != null) {
            var s02 = packet;
            var message = s02.getChatComponent().getUnformattedText();
            if (message.toLowerCase().indexOf("has been killed by " + mc.thePlayer.getName().toLowerCase() + "!") != -1 ||
                message.toLowerCase().indexOf("weapon could not stand against " + mc.thePlayer.getName().toLowerCase() + "!") != -1 ||
                message.toLowerCase().indexOf("was brutally murdered by " + mc.thePlayer.getName().toLowerCase() + "!") != -1 ||
                message.toLowerCase().indexOf(mc.thePlayer.getName().toLowerCase() + " could not resist killing") != -1 ||
                message.toLowerCase().indexOf(mc.thePlayer.getName().toLowerCase() + " gave a helping hand in ") != -1) {
                var message1 = "";
                var split = message.split(" ");
                if (message.toLowerCase().indexOf(mc.thePlayer.getName().toLowerCase() + " gave a helping hand in ") != -1) {
                    message1 = split[split.length - 2];
                    sendL(message1);
                } else if (message.toLowerCase().indexOf(mc.thePlayer.getName().toLowerCase() + " could not resist killing") != -1) {
                    message1 = split[split.length - 1];
                    sendL(message1);
                } else if (message.toLowerCase().indexOf("weapon could not stand against " + mc.thePlayer.getName().toLowerCase() + "!") != -1) {
                    message1 = split[1];
                    sendL(message1);
                } else if (message.toLowerCase().indexOf("has been killed by " + mc.thePlayer.getName().toLowerCase() + "!") != -1) {
                    message1 = split[1];
                    sendL(message1);
                } else if (message.toLowerCase().indexOf("was brutally murdered by " + mc.thePlayer.getName().toLowerCase() + "!") != -1) {
                    message1 = split[1];
                    sendL(message1);
                }
            }
        }
    });
});

var fuckyou = null;

script.registerCommand({
    name: "killsuits",
    aliases: ["ks", "ksuits", "kills"]
}, function (command) {
    command.on("execute", function (args) {
        if (args.length > 1) {
            Chat.print("§8§l§m+---------------------------------------------+");
            Chat.print("");
            Chat.print("§8§l[§9§lLiquidBounce§8§l] §f§lPathed to §a§l" + args[1]);
            Chat.print("");
            Chat.print("§8§l§m+---------------------------------------------+");
            Chat.print("");
            fuckyou = args[1];
            textlist = readFile(fuckyou);
            saveKillSuits();
        } else {
            Chat.print("§8§l§m+---------------------------------------------+");
            Chat.print("");
            Chat.print("§8§l[§9§lLiquidBounce§8§l] §c§lSyntax Error: .killsuits <path>");
            Chat.print("§8§l[§9§lLiquidBounce§8§l] §c§lYour path must not contain spaces!");
            Chat.print("");
            Chat.print("§8§l§m+---------------------------------------------+");
        }
    });
});

function saveKillSuits() {
    f = new File(mc.mcDataDir + "/LiquidBounce-1.8/KillSuitsPath.txt");
    try {
        if (!f.exists()) {
            f.createNewFile();
        }
        pw = new PrintWriter(f);
        pw.print(fuckyou);
        pw.close();
    } catch (Exception) {
    }
}

function loadKillSuits() {
    f = new File(mc.mcDataDir + "/LiquidBounce-1.8/KillSuitsPath.txt");
    if (!f.exists()) {
        f.createNewFile();
    } else {
        var br = new BufferedReader(new FileReader(f));
        var line;
        while ((line = br.readLine()) != null) {
            try {
                fuckyou = line;
                textlist = readFile(fuckyou);
            } catch (Exception) {
            }
        }
    }
}

function sendL(message) {
    var message1 = textlist[random(0, textlist.length)].replace("%player%", message);
    mc.thePlayer.sendChatMessage(message1);
};

function random(min, max) {
    if (max <= min) {
        return min;
    }
    return Math.floor((Math.random() * (max - min)) + min);
}

function readFile(filePath) {
    try {
        var file = new File(filePath);
        var reader = new BufferedReader(new InputStreamReader(new FileInputStream(file), "UTF8"));
        var content = [];
        var line;

        while ((line = reader.readLine()) != null) {
            content.push(line);
        }

        return content;
    } catch (err) {
        Chat.print("§8§l§m+---------------------------------------------+");
        Chat.print("");
        Chat.print("§8§l[§9§lLiquidBounce§8§l] §c§lUnable to open file!");
        Chat.print("");
        Chat.print("§8§l§m+---------------------------------------------+");
        throw err;
    }
}

//-----------------------------------------------------------------------------------------------------------

// var EntityPlayer = Java.type("net.minecraft.entity.player.EntityPlayer");
// var friendName = null;

// script.registerModule({
//     name: "AutoTempFriend",
//     category: "Fun",
//     description: "AutoTempFriend | By 1337quip (wasd#9800)",
//     settings: {
//         rangeSetting: Setting.float({
//             name: "Range",
//             min: 3.0,
//             max: 10.0,
//             default: 3.5
//         })
//     }
// }, function (module) {
//     module.on("packet", function (event) {
//         var S02PacketChat = Java.type("net.minecraft.network.play.server.S02PacketChat");
//         var packet = event.getPacket();
//         if (packet instanceof S02PacketChat) {
//             var s02 = packet;
//             var message = s02.getChatComponent().getUnformattedText();
//             if (message.toLowerCase().indexOf("skywar the game has begun!") != -1) {
//                 for (var i = 0; i < mc.theWorld.playerEntities.size(); i++) {
//                     var player = mc.theWorld.playerEntities.get(i);
//                     var distance = mc.thePlayer.getDistanceToEntity(player);
//                     if (distance <= rangeSetting.get()) {
//                         friendName = player.getName();
//                         commandManager.executeCommand(".friend add " + friendName);
//                     }
//                 }
//             }
//         }
//     });
//     module.on("enable", function () {
//         Chat.print("§8§l§m+---------------------------------------------+");
//         Chat.print("");
//         Chat.print("§8§l[§9§lLiquidBounce§8§l] §f§lAutoTempFriend | By §a§l1337quip §f§l(§a§lwasd#9800§f§l)");
//         Chat.print("");
//         Chat.print("§8§l§m+---------------------------------------------+");
//     });
// });

//-----------------------------------------------------------------------------------------------------------

KillAuraClass = Java.type("net.ccbluex.liquidbounce.LiquidBounce").moduleManager.getModule(Java.type("net.ccbluex.liquidbounce.features.module.modules.combat.KillAura").class);
var ItemStack = Java.type("net.minecraft.item.ItemStack");
var itemSwitchTicks = 0;

script.registerModule({
    name: "Dura",
    category: "Fun",
    description: "Dura | By 1337quip (wasd#9800)"
}, function (module) {
    module.on("update", function () {
        if (KillAuraClass.target != null) {
            ++itemSwitchTicks;
            switch (itemSwitchTicks) {
                case 3:
                    if (mc.thePlayer.inventoryContainer.getSlot(27).getHasStack()) {
                        ItemStack = mc.thePlayer.inventoryContainer.getSlot(27).getStack();
                        if (ItemStack != null) {
                            mc.playerController.windowClick(0, 27, 0, 2, mc.thePlayer);
                        }
                    }
                    break;
                case 4:
                    if (mc.thePlayer.inventoryContainer.getSlot(27).getHasStack()) {
                        ItemStack = mc.thePlayer.inventoryContainer.getSlot(27).getStack();
                        if (ItemStack != null) {
                            mc.playerController.windowClick(0, 27, 0, 2, mc.thePlayer);
                        }
                    }
                    itemSwitchTicks = 0;
            }
        }
    });
    module.on("enable", function () {
        Chat.print("§8§l§m+---------------------------------------------+");
        Chat.print("");
        Chat.print("§8§l[§9§lLiquidBounce§8§l] §f§lDura | By §a§l1337quip §f§l(§a§lwasd#9800§f§l)");
        Chat.print("");
        Chat.print("§8§l§m+---------------------------------------------+");
        itemSwitchTicks = 0;
    });
    module.on("disable", function () {
        itemSwitchTicks = 0;
    });
});

//-----------------------------------------------------------------------------------------------------------

script.registerModule({
    name: "AutoClearFriend",
    category: "Fun",
    description: "AutoClearFriend for Mc-SekSin.net | By 1337quip (wasd#9800)"
}, function (module) {
    module.on("update", function () {
        if (mc.thePlayer.health == 0 || mc.thePlayer.isDead || mc.thePlayer.ticksExisted <= 1) {
            commandManager.executeCommand(".friend clear");
        }
    });
    module.on("enable", function () {
        Chat.print("§8§l§m+---------------------------------------------+");
        Chat.print("");
        Chat.print("§8§l[§9§lLiquidBounce§8§l] §f§lAutoClearFriend for §a§lMc-SekSin.net §f§l| By §a§l1337quip §f§l(§a§lwasd#9800§f§l)");
        Chat.print("");
        Chat.print("§8§l§m+---------------------------------------------+");
    });
});

//-----------------------------------------------------------------------------------------------------------

var lagspoof = false;
var modifypacket = false;
var AxisAlignedBB = Java.type("net.minecraft.util.AxisAlignedBB");
var packets = [];

script.registerModule({
    name: "SekSinNoFall",
    category: "Fun",
    description: "NoFall for Mc-SekSin.net | By The Moss (crave#6948) & Modify by 1337quip (wasd#9800§)",
}, function (module) {
    module.on("enable", function () {
        lagspoof = false;
        modifypacket = false;
    });

    module.on("motion", function (event) {
        var state = event.getEventState();
        if (state == "PRE") {
            if (!isVoid()) {
                if (lagspoof) {
                    lagspoof = false;
                    if (packets.length > 0) {
                        for (var i = 0; i < packets.length; i++) {
                            var packet = packets[i];
                            mc.thePlayer.sendQueue.addToSendQueue(packet);
                        }
                        packets = [];
                    }
                }
                return;
            }
            if (mc.thePlayer.onGround && lagspoof) {
                lagspoof = false;
                if (packets.length > 0) {
                    for (var i = 0; i < packets.length; i++) {
                        var packet = packets[i];
                        mc.thePlayer.sendQueue.addToSendQueue(packet);
                    }
                    packets = [];
                }
                return;
            }
            if (mc.thePlayer.fallDistance > 3 && lagspoof) {
                modifypacket = true;
                mc.thePlayer.fallDistance = 0;
            }
            if (isAir(4.0, 1.0)) {
                return;
            }
            if (!lagspoof) {
                lagspoof = true;
            }
        }
    });
    module.on("packet", function (event) {
        var packet = event.getPacket();
        if (packet instanceof C03PacketPlayer && lagspoof) {
            event.cancelEvent();
            if (modifypacket) {
                packet.onGround = true;
                modifypacket = false;
            }
            packets.push(packet);
        }
    });
    module.on("enable", function () {
        Chat.print("§8§l§m+---------------------------------------------+");
        Chat.print("");
        Chat.print("§8§l[§9§lLiquidBounce§8§l] §f§lNoFall for §a§lMc-SekSin.net §f§l| By §a§lThe Moss §f§l(§a§lcrave#6948§f§l) & Modify by §a§l1337quip §f§l(§a§lwasd#9800§f§l");
        Chat.print("");
        Chat.print("§8§l§m+---------------------------------------------+");
    });
});

function isVoid() {
    if (mc.thePlayer.posY < 0) {
        return false;
    }

    for (var off = 0; off < mc.thePlayer.posY + 2; off += 2) {
        var bb = new AxisAlignedBB(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, mc.thePlayer.posX, off, mc.thePlayer.posZ);
        if (!mc.theWorld.getCollidingBoundingBoxes(mc.thePlayer, bb).isEmpty()) {
            return true;
        }
    }
    return false;
}

function isAir(height, plus) {
    if (mc.thePlayer.posY < 0)
        return false;
    for (var off = 0; off < height; off += plus) {
        var bb = new AxisAlignedBB(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, mc.thePlayer.posX, mc.thePlayer.posY - off, mc.thePlayer.posZ);
        if (!mc.theWorld.getCollidingBoundingBoxes(mc.thePlayer, bb).isEmpty()) {
            return true;
        }
    }
    return false;
}

//-----------------------------------------------------------------------------------------------------------

var autoLoginPassword = null;

script.registerModule({
    name: "AutoLogin",
    category: "Fun",
    description: "AutoLogin for Mc-SekSin.net | by 1337quip (wasd#9800)",
}, function (module) {
    module.on("enable", function () {
        if (autoLoginPassword == null) {
            Chat.print("§8§l§m+---------------------------------------------+");
            Chat.print("");
            Chat.print("§8§l[§9§lLiquidBounce§8§l] §c§lPlease set password! by .autologin <password>");
            Chat.print("");
            Chat.print("§8§l§m+---------------------------------------------+");
            return;
        }
        Chat.print("§8§l§m+---------------------------------------------+");
        Chat.print("");
        Chat.print("§8§l[§9§lLiquidBounce§8§l] §f§lAutoLogin for §a§lMc-SekSin.net §f§l| By §a§l1337quip §f§l(§a§lwasd#9800§f§l");
        Chat.print("");
        Chat.print("§8§l§m+---------------------------------------------+");
    });

    module.on("packet", function (event) {
        var S02PacketChat = Java.type("net.minecraft.network.play.server.S02PacketChat");
        var packet = event.getPacket();
        if (packet instanceof S02PacketChat && textlist != null) {
            var s02 = packet;
            var message = s02.getChatComponent().getUnformattedText();
            if (message.toLowerCase().indexOf("/login <password>") != -1) {
                mc.thePlayer.sendChatMessage("/login " + autoLoginPassword);
                Chat.print("§8§l§m+---------------------------------------------+");
                Chat.print("");
                Chat.print("§8§l[§9§lLiquidBounce§8§l] §a§lLogged in!");
                Chat.print("");
                Chat.print("§8§l§m+---------------------------------------------+");
            }
        }
    });
});

script.registerCommand({
    name: "autologin",
    aliases: ["al", "autol", "alogin"]
}, function (command) {
    command.on("execute", function (args) {
        if (args.length > 1) {
            Chat.print("§8§l§m+---------------------------------------------+");
            Chat.print("");
            Chat.print("§8§l[§9§lLiquidBounce§8§l] §a§lDone!");
            Chat.print("");
            Chat.print("§8§l§m+---------------------------------------------+");
            Chat.print("");
            autoLoginPassword = args[1];
            saveAutoLogin();
        } else {
            Chat.print("§8§l§m+---------------------------------------------+");
            Chat.print("");
            Chat.print("§8§l[§9§lLiquidBounce§8§l] §c§lSyntax Error: .autologin <password>");
            Chat.print("");
            Chat.print("§8§l§m+---------------------------------------------+");
        }
    });
});

function saveAutoLogin() {
    f = new File(mc.mcDataDir + "/LiquidBounce-1.8/AutoLogin.txt");
    try {
        if (!f.exists()) {
            f.createNewFile();
        }
        pw = new PrintWriter(f);
        pw.print(autoLoginPassword);
        pw.close();
    } catch (Exception) {
    }
}

function loadAutoLogin() {
    f = new File(mc.mcDataDir + "/LiquidBounce-1.8/AutoLogin.txt");
    if (!f.exists()) {
        f.createNewFile();
    } else {
        var br = new BufferedReader(new FileReader(f));
        var line;
        while ((line = br.readLine()) != null) {
            try {
                autoLoginPassword = line;
            } catch (Exception) {
            }
        }
    }
}

//-----------------------------------------------------------------------------------------------------------

script.on("load", function () {
    loadKillSuits();
    loadAutoLogin();
});
