///api_version=2
(script = registerScript({
    name: "InventoryManager",
    version: "6.17",
    authors: ["CzechHek"]
})).import("Core.lib");

list = [
    actions = new (Java.extend(ListValue)) ("Actions", ACTIONS = ["Open Chests", "Steal Items", "Drop Garbage", "Equip Armor", "Sort Hotbar", "Select Weapons", "Select Tools", "Throw Potions", ""], "") {onChanged: function (o, n) {updateValues(o, n)}},
    actionslist = value.createText("", "Open Chests, Steal Items, Drop Garbage, Equip Armor, Sort Hotbar, Select Weapons, Select Tools, Throw Potions"),
    experimental = value.createBoolean("Experimental lobby detection", true),
    randomize = value.createBoolean("Randomize", false),
    invopen = value.createBoolean("InvOpen", false),
    maxinvdelay = new (Java.extend(IntegerValue))("MaxInvDelay", 50, 0, 1000) {onChanged: function (o, n) {n < mininvdelay.get() && maxinvdelay.set(mininvdelay.get())}},
    mininvdelay = new (Java.extend(IntegerValue))("MinInvDelay", 50, 0, 1000) {onChanged: function (o, n) {n > maxinvdelay.get() && mininvdelay.set(maxinvdelay.get())}},
    maxstealdelay = new (Java.extend(IntegerValue))("MaxStealDelay", 50, 0, 1000) {onChanged: function (o, n) {n < minstealdelay.get() && maxstealdelay.set(minstealdelay.get())}},
    minstealdelay = new (Java.extend(IntegerValue))("MinStealDelay", 50, 0, 1000) {onChanged: function (o, n) {n > maxstealdelay.get() && minstealdelay.set(maxstealdelay.get())}},
    startdelay = value.createInteger("StartDelay", 100, 0, 1000),
    closedelay = value.createInteger("CloseDelay", 100, 0, 1000),
    noattackdelay = value.createInteger("NoAttackDelay", 500, 0, 1000),
    openinterval = value.createInteger("OpenInterval", 250, 0, 1000),
    openrange = value.createFloat("OpenRange", 5, 3, 8),
    openwallsrange = value.createFloat("OpenWallsRange", 3, 1, 8),
    openswing = value.createList("OpenSwing", ["Visual", "Packet", "None"], "Packet"),
    rotations = new (Java.extend(ListValue)) ("Rotations", ["Visual", "Packet", "None"], "Packet") {onChanged: function () {updateValues("", "")}},
    rotationslength = value.createInteger("RotationsLength", 1, 1, 100),
    healthtohealat = value.createInteger("HealthToHealAt", 15, 1, 20),
    throwdelay = value.createInteger("ThrowDelay", 250, 0, 1000),
    slot1 = value.createText("Slot1", "Sword"),
    slot2 = value.createText("Slot2", "Pickaxe"),
    slot3 = value.createText("Slot3", "Shovel"),
    slot4 = value.createText("Slot4", "Axe"),
    slot5 = value.createText("Slot5", "Bow"),
    slot6 = value.createText("Slot6", "Golden Apple, Food"),
    slot7 = value.createText("Slot7", "Splash Potion, Ender Pearl"),
    slot8 = value.createText("Slot8", "Water Bucket, Block"),
    slot9 = value.createText("Slot9", "Block")
]

module = {
    category: "Player",
    values: list,
    onMotion: function (e) {
        if (e.getEventState() == "PRE") {
            !attackTimer.hasTimePassed(noattackdelay.get()) && mc.currentScreen instanceof GuiChest && shouldOpen && (mc.thePlayer.closeScreen(), chestList.pop());
            
            if (shouldOperate()) {
                !openInventory && openTimer.hasTimePassed(openinterval.get()) && actionslist.get().contains("Open Chests") && (!mc.currentScreen || mc.currentScreen instanceof ClickGui || mc.currentScreen instanceof GuiIngameMenu || mc.currentScreen instanceof GuiChat) && rotateToOpen();
                timer.hasTimePassed(rand(minstealdelay.get(), maxstealdelay.get())) && actionslist.get().contains("Steal Items") && mc.currentScreen instanceof GuiChest && received && steal() && closeTimer.hasTimePassed(closedelay.get()) && mc.thePlayer.closeScreen();
                timer.hasTimePassed(rand(mininvdelay.get(), maxinvdelay.get())) && (mc.currentScreen instanceof GuiInventory || (!invopen.get() && (!mc.currentScreen || mc.currentScreen instanceof ClickGui || mc.currentScreen instanceof GuiIngameMenu || mc.currentScreen instanceof GuiChat))) && (getItems(), drop() && sort() && equip() && !mc.currentScreen && openInventory ? mc.getNetHandler().addToSendQueue(new C0DPacketCloseWindow(mc.thePlayer.inventoryContainer.windowId)) : rotateToThrow());
            }
        } else {
            shouldOpen && openChest();
            shouldThrow && throwPotion();
        }
    },
    onPacket: function (e) {
        e.getPacket() instanceof C16PacketClientStatus && e.getPacket().getStatus() == "OPEN_INVENTORY_ACHIEVEMENT" && (openInventory ? e.cancelEvent() : openInventory = true);
        (e.getPacket() instanceof C0DPacketCloseWindow || e.getPacket() instanceof S2EPacketCloseWindow) && (openInventory = received = opened = false, shouldOpen = null);
        e.getPacket() instanceof S30PacketWindowItems && timeout(startdelay.get(), function () {received = true});
        e.getPacket() instanceof C02PacketUseEntity && e.getPacket().getAction() == "ATTACK" && (attackTimer.reset(), selectWeapon());
        lastChest && e.getPacket() instanceof S2DPacketOpenWindow && e.getPacket().getGuiId() == "minecraft:chest" && (chestList.push(lastChest), lastChest = null);
    },
    onClickBlock: function (b) {
        if (!ScaffoldModule.state && !TowerModule.state && actionslist.get().contains("Select Tools")) {
            state = mc.theWorld.getBlockState(b.getClickedBlock());
            for (i = bestTool = -1; ++i < 9;) (stack = mc.thePlayer.inventory.mainInventory[i]) && (item = stack.getItem()) && item.getStrVsBlock(stack, state.getBlock()) > (~bestTool ? mc.thePlayer.inventory.mainInventory[i].getItem().getStrVsBlock(stack, state.getBlock()) : 1) && (bestTool = i);
    
            ~bestTool && mc.thePlayer.inventory.currentItem != bestTool && (mc.thePlayer.inventory.currentItem = bestTool, mc.playerController.updateController());
        }
    },
    onLoad: function () {
        timeout (2000, function () {
            LiquidBounce.clickGui = new (Java.extend(ClickGui)) () {
                func_73866_w_: function () {
                    updateValues("", "");
                },
                
                func_146281_b: function () {
                    setValues(InventoryManagerModule, list);
                    LiquidBounce.fileManager.saveConfig(LiquidBounce.fileManager.valuesConfig);
                }
            }
            LiquidBounce.fileManager.loadConfig(LiquidBounce.fileManager.clickGuiConfig);
        });
    }
}

function sort() {
    if (!actionslist.get().contains("Sort Hotbar")) return true;

    toSort = []; values = [slot1.get(), slot2.get(), slot3.get(), slot4.get(), slot5.get(), slot6.get(), slot7.get(), slot8.get(), slot9.get()].map(function (v) {return v.replaceAll(";", ",").replaceAll(", ", ",")});
    values.forEach(function (v, i) {return stacks.some(function (s, i3) {if (s && shouldSet(i, i3)) return ~toSort.push([i3, i])})});

    return !(toSort.some(function (values) {openInv(); mc.playerController.windowClick(mc.thePlayer.openContainer.windowId, values[0], values[1], 2, mc.thePlayer); timer.reset(); return !instaInv}) && toSort.length);
}

function shouldSet(i1, i2) {
    priority1 = getPriority(values[i1].split(","), stacks[i2]);
    priority2 = getPriority(values[i1].split(","), stacks[i1 + 36]);
    i2 > 35 && (priority3 = getPriority(values[i2 - 36].split(","), stacks[i2]));
    
    return ~priority1 && (!~priority2 || (priority1 < priority2)) && (i2 < 36 || !~priority3 || (priority1 < priority3));
}

function getPriority(array, stack) {
    return stack ? array.find(function (v) {return v == "Food" ? stack.getItem() instanceof ItemFood : (v == "Block" || v == "Blocks") ? stack.getItem() instanceof ItemBlock : stack.getDisplayName().contains(v)}, true) : -1;
}

function drop() {
    return !actionslist.get().contains("Drop Garbage") || !(garbage.some(function (value) {openInv(); mc.playerController.windowClick(mc.thePlayer.openContainer.windowId, value, 1, 4, mc.thePlayer); timer.reset(); return !instaInv}) && garbage.length);
}

function equip() {
    if (!actionslist.get().contains("Equip Armor")) return true;

    armor = []; [helmets, chestplates, leggings, boots].forEach(function (c, i) {c.length && c[0] > 8 && !mc.thePlayer.inventory.armorInventory[3 - i] && armor.push(c[0])});
    return !(armor.some(function (value) {openInv(); mc.playerController.windowClick(mc.thePlayer.openContainer.windowId, value, 0, 1, mc.thePlayer); timer.reset(); return !instaInv}) && armor.length);
}

function steal() {
    useful = []; helmets = []; chestplates = []; leggings = []; boots = []; swords = []; pickaxes = []; axes = []; spades = []; bows = [];
    (stacks = Java.from(mc.currentScreen.inventorySlots.getInventory())).forEach(function (itemStack, i) {
        if (itemStack && (item = itemStack.getItem())) {
            if (item instanceof ItemArmor) {
                switch (item.armorType) {
                    case 0: helmets.push(i); break
                    case 1: chestplates.push(i); break
                    case 2: leggings.push(i); break
                    case 3: boots.push(i); break
                }
            } else if (item instanceof ItemTool) {
                item instanceof ItemAxe && axes.push(i);
                item instanceof ItemPickaxe && pickaxes.push(i);
                item instanceof ItemSpade && spades.push(i);
            } else if (item instanceof ItemSword) swords.push(i);
            else if (item instanceof ItemBow) bows.push(i);
            else i < mc.currentScreen.lowerChestInventory.getSizeInventory() && (item instanceof ItemBlock ? !~blockBlacklist.indexOf(item.getBlock()) : (item instanceof ItemFood || item instanceof ItemPotion || item instanceof ItemEnderPearl || item instanceof ItemEnchantedBook || item instanceof ItemBucket || ~itemWhitelist.indexOf(itemStack.getUnlocalizedName()))) && useful.push(i);

        };
    });
    [helmets, chestplates, leggings, boots].forEach(function (c, i) {c.sort(function (b, a) {return getDurability(stacks[a]) - getDurability(stacks[b])}).sort(function (b, a) {return ARMOR_COMPARATOR.compare(new ArmorPiece(stacks[a], 0), new ArmorPiece(stacks[b], 0))}); if (c.length && c[0] < mc.currentScreen.lowerChestInventory.getSizeInventory() && mc.thePlayer.inventory.armorInventory[3 - i] && ARMOR_COMPARATOR.compare(new ArmorPiece(stacks[c[0]], 0), new ArmorPiece(mc.thePlayer.inventory.armorInventory[3 - i], 0)) <= 0) [helmets, chestplates, leggings, boots][i][0] = 54});
    [Blocks.log, Blocks.stone, Blocks.dirt].forEach(function (t, i2) {[axes, pickaxes, spades][i2].sort(function (a, b) {return b - a}).sort(function (b, a) {return getDurability(stacks[a]) - getDurability(stacks[b])}).sort(function (a, b) {return stacks[a].getItem().getStrVsBlock(stacks[a], t) / (stacks[a].getMaxDamage() - stacks[a].getItemDamage()) - stacks[b].getItem().getStrVsBlock(stacks[b], t) / (stacks[b].getMaxDamage() - stacks[b].getItemDamage())})});
    swords.sort(function (a, b) {return b - a}).sort(function (b, a) {return getDurability(stacks[a]) - getDurability(stacks[b])}).sort(function (b, a) {return (stacks[a].getItem().getDamageVsEntity() + 4 + 1.25 * ItemUtils.getEnchantment(stacks[a], Enchantment.sharpness)) - (stacks[b].getItem().getDamageVsEntity() + 4 + 1.25 * ItemUtils.getEnchantment(stacks[b], Enchantment.sharpness))});
    bows.sort(function (a, b) {return b - a}).sort(function (b, a) {return getDurability(stacks[a]) - getDurability(stacks[b])}).sort(function (a, b) {return ItemUtils.getEnchantment(stacks[a], Enchantment.power) - ItemUtils.getEnchantment(stacks[b], Enchantment.power)});
    [helmets, chestplates, leggings, boots, swords, pickaxes, axes, spades, bows].forEach(function (c) {c.length && c[0] < mc.currentScreen.lowerChestInventory.getSizeInventory() && useful.push(c[0])});
    useful.sort().shuffle(randomize.get()); instaSteal = !(minstealdelay.get() + maxstealdelay.get());
    if (!actionslist.get().contains("Sort Hotbar")) return !(useful.some(function (value) {mc.playerController.windowClick(mc.thePlayer.openContainer.windowId, value, 0, 2, mc.thePlayer); timer.reset(); closeTimer.reset(); return !instaSteal}) && useful.length);

    toSteal = []; values = [slot1.get(), slot2.get(), slot3.get(), slot4.get(), slot5.get(), slot6.get(), slot7.get(), slot8.get(), slot9.get()].map(function (v) {return v});
    useful.forEach(function (s) {!values.some(function (v, i) {if (shouldSet(i, s)) return ~toSteal.push([s, i])}) && toSteal.push([s, 0, 1])});

    return !(toSteal.some(function (values) {mc.playerController.windowClick(mc.thePlayer.openContainer.windowId, values[0], values[1], values[2] || 2, mc.thePlayer); timer.reset(); closeTimer.reset(); return !instaSteal}) && toSteal.length);
}

function openChest() {
    mc.playerController.onPlayerRightClick(mc.thePlayer, mc.theWorld, null, shouldOpen.getPos(), EnumFacing.DOWN, mc.thePlayer.getLookVec()); openTimer.reset();
    openswing.get() == "Visual" ? mc.thePlayer.swingItem() : openswing.get() == "Packet" && mc.getNetHandler().addToSendQueue(new C0APacketAnimation());
    shouldOpen = null;
}

function throwPotion() {
    mc.getNetHandler().addToSendQueue(new C08PacketPlayerBlockPlacement(shouldThrow));
    mc.getNetHandler().addToSendQueue(new C09PacketHeldItemChange(mc.thePlayer.inventory.currentItem));
    shouldThrow = null; throwTimer.reset(); timer.reset();
}

function rotateToOpen() {
    Java.from(mc.theWorld.loadedTileEntityList).some(function (chest) {
        if (chest instanceof TileEntityChest && !chestList.includes(chest)) {
            eyes = mc.thePlayer.getPositionEyes(.0);
            bb = (state = mc.theWorld.getBlockState(chest.getPos())).getBlock().getCollisionBoundingBox(mc.theWorld, chest.getPos(), state);
            distances = []; visible = false;
            [new Vec3(bb.minX, bb.minY, bb.minZ), new Vec3(bb.minX, bb.minY, bb.maxZ), new Vec3(bb.minX, bb.maxY, bb.minZ), new Vec3(bb.minX, bb.maxY, bb.maxZ), new Vec3(bb.maxX, bb.minY, bb.minZ), new Vec3(bb.maxX, bb.minY, bb.maxZ), new Vec3(bb.maxX, bb.maxY, bb.minZ), new Vec3(bb.maxX, bb.maxY, bb.maxZ)].forEach(function (v) {visible = visible || !(result = mc.theWorld.rayTraceBlocks(eyes, v)) || result.getBlockPos().equals(chest.getPos()); distances.push(Math.sqrt(Math.pow(eyes.xCoord - v.xCoord, 2) + Math.pow(eyes.yCoord - v.yCoord, 2) + Math.pow(eyes.zCoord - v.zCoord, 2)))});
            if (Math.min.apply(null, distances) < (visible ? openrange.get() : openwallsrange.get())) {
                rotations.get() == "Packet" && RotationUtils.setTargetRotation(rot = RotationUtils.faceBlock(chest.getPos()).getRotation(), rotationslength.get() - 1);
                rotations.get() == "Visual" && (mc.thePlayer.rotationYaw = rot.getYaw(), mc.thePlayer.rotationPitch = rot.getPitch());
                return lastChest = shouldOpen = chest;
            }
        }
    });
}

function rotateToThrow() {
    if (mc.thePlayer.onGround && actionslist.get().contains("Throw Potions") && throwTimer.hasTimePassed(throwdelay.get()))
        for (i = 35; i++ < 44;) {
            if (stacks[i] && stacks[i].getItem() instanceof ItemPotion && ItemPotion.isSplash(stacks[i].getItemDamage()) && !isBad(stacks[i]) && !Java.from(new ItemPotion().getEffects(stacks[i])).some(function (e) {return Java.from(mc.thePlayer.getActivePotionEffects()).some(function (e2) {return e.getEffectName() == e2.getEffectName()}) || (mc.thePlayer.getHealth() > healthtohealat.get() && ["potion.regeneration", "potion.heal"].includes(e.getEffectName()))})) {
                mc.getNetHandler().addToSendQueue(new C09PacketHeldItemChange(i - 36));
                rotations.get() == "Visual" ? (mc.thePlayer.rotationPitch = 90) : RotationUtils.setTargetRotation(new Rotation(mc.thePlayer.rotationYaw, 90), rotationslength.get() - 1);
                return shouldThrow = stacks[i];
            }
        }
}

function selectWeapon() {
    if (!ScaffoldModule.state && !TowerModule.state && actionslist.get().contains("Select Weapons")) {
        for (i = bestSword = bestTool = -1; ++i < 9;) (stack = mc.thePlayer.inventory.mainInventory[i]) && (item = stack.getItem()) && (item instanceof ItemSword ? (!~bestSword || getAttackDamage(stack) > getAttackDamage(mc.thePlayer.inventory.mainInventory[bestSword])) && (bestSword = i) : !~bestSword && item instanceof ItemTool && (!~bestTool || getAttackDamage(stack) > getAttackDamage(mc.thePlayer.inventory.mainInventory[bestTool])) && (bestTool = i));

        (~(targetSlot = ~bestSword ? bestSword : bestTool) && mc.thePlayer.inventory.currentItem != targetSlot) && (mc.thePlayer.inventory.currentItem = targetSlot, mc.playerController.updateController());
    }
}

function shouldOperate() {
    if (mc.thePlayer.isSpectator() || mc.thePlayer.itemInUseCount || !attackTimer.hasTimePassed(noattackdelay.get()) || !mc.thePlayer.capabilities.allowEdit || mc.thePlayer.capabilities.allowFlying || mc.thePlayer.capabilities.disableDamage || (mc.thePlayer.getTeam() && ((mc.theWorld.getScoreboard().getTeams().size() == 1 && !mc.thePlayer.getTeam().getAllowFriendlyFire()) || (mc.thePlayer.getTeam().getTeamName() == "1y|1")))) return false
    if (experimental.get()) for (i in mc.theWorld.loadedEntityList) if (((e = mc.theWorld.loadedEntityList[i]) instanceof IBossDisplayData || e instanceof EntityArmorStand) && (tag = e.getCustomNameTag()) && !tag.contains(":") && !tag.contains("Vazio!")) {/*chat.print(mc.theWorld.loadedEntityList[i].getCustomNameTag());*/ return false};
    return true
}

function updateValues(o, n) {
    actions.set(""); visible = [actions, actionslist, experimental]; 

    actionsArray = actionslist.get().split(", ");
    !actionsArray.remove(n) && actionsArray.push(n);
    actionsArray = actionsArray.filter(Boolean).sort(function (a, b) {return ACTIONS.indexOf(a) - ACTIONS.indexOf(b)});
    
    actionslist.set(actionsArray.join(", "));

    actionsArray.forEach(function (a) {
        switch (a) {
            case "Open Chests": visible.push(openinterval, openrange, openwallsrange, openswing, rotations, rotations.get() == "Packet" ? rotationslength : null); break;
            case "Steal Items": visible.push(maxstealdelay, minstealdelay, startdelay, closedelay, randomize, invopen); break
            case "Drop Garbage": case "Equip Armor": visible.push(maxinvdelay, mininvdelay, noattackdelay, randomize, invopen); break
            case "Sort Hotbar": visible.push(maxinvdelay, mininvdelay, noattackdelay, randomize, invopen, slot1, slot2, slot3, slot4, slot5, slot6, slot7, slot8, slot9); break
            case "Throw Potions": visible.push(rotations, rotations.get() == "Packet" ? rotationslength : null, healthtohealat, throwdelay);
        }
    });

    setValues(InventoryManagerModule, visible.filter(Boolean).sort(function (a, b) {return list.indexOf(a) - list.indexOf(b)}).filter(function (item, pos, ary) {return !pos || item != ary[pos - 1]}));
}

function getItems() {
    garbage = []; helmets = []; chestplates = []; leggings = []; boots = []; swords = []; pickaxes = []; axes = []; spades = []; bows = [];
    (stacks = Java.from(mc.thePlayer.inventoryContainer.getInventory())).forEach(function (itemStack, i) {
        if (itemStack && (item = itemStack.getItem())) {
            if (item instanceof ItemArmor) {
                switch (item.armorType) {
                    case 0: helmets.push(i); break
                    case 1: chestplates.push(i); break
                    case 2: leggings.push(i); break
                    case 3: boots.push(i); break
                }
            } else if (item instanceof ItemTool) {
                item instanceof ItemAxe && axes.push(i);
                item instanceof ItemPickaxe && pickaxes.push(i);
                item instanceof ItemSpade && spades.push(i);
            } else if (item instanceof ItemSword) swords.push(i);
            else if (item instanceof ItemBow) bows.push(i);
            else (item instanceof ItemBlock ? ~blockBlacklist.indexOf(item.getBlock()) : !(item instanceof ItemFood || (item instanceof ItemPotion && !isBad(itemStack)) || item instanceof ItemEnderPearl || item instanceof ItemEnchantedBook || item instanceof ItemBucket || ~itemWhitelist.indexOf(itemStack.getUnlocalizedName()))) && garbage.push(i);
        }
    });
    [helmets, chestplates, leggings, boots].forEach(function (c) {c.sort(function (b, a) {return getDurability(stacks[a]) - getDurability(stacks[b])}).sort(function (b, a) {return ARMOR_COMPARATOR.compare(new ArmorPiece(stacks[a], a), new ArmorPiece(stacks[b], b))})});
    [Blocks.log, Blocks.stone, Blocks.dirt].forEach(function (t, i2) {[axes, pickaxes, spades][i2].sort(function (b, a) {return getDurability(stacks[a]) - getDurability(stacks[b])}).sort(function (a, b) {return stacks[a].getItem().getStrVsBlock(stacks[a], t) / (stacks[a].getMaxDamage() - stacks[a].getItemDamage()) - stacks[b].getItem().getStrVsBlock(stacks[b], t) / (stacks[b].getMaxDamage() - stacks[b].getItemDamage())})});
    swords.sort(function (b, a) {return getDurability(stacks[a]) - getDurability(stacks[b])}).sort(function (b, a) {return getAttackDamage(stacks[a]) - getAttackDamage(stacks[b])});
    bows.sort(function (b, a) {return getDurability(stacks[a]) - getDurability(stacks[b])}).sort(function (a, b) {return ItemUtils.getEnchantment(stacks[a], Enchantment.power) - ItemUtils.getEnchantment(stacks[b], Enchantment.power)});
    [helmets, chestplates, leggings, boots, swords, pickaxes, axes, spades, bows].forEach(function (c) {c.length > 1 && (garbage = garbage.concat(c.slice(1)))});
    garbage = garbage.filter(function (a) !stacks.find(function (b) a != b && stacks[b] && ItemStack.areItemStacksEqual(stacks[a], stacks[b]))).shuffle(randomize.get());
    instaInv = !(mininvdelay.get() + maxinvdelay.get());
}

function getAttackDamage(stack) {
    return stack && (item = stack.getItem()) && (item instanceof ItemSword || item instanceof ItemTool) ? Java.from(item.getItemAttributeModifiers().get("generic.attackDamage"))[0].getAmount() + 1.25 * ItemUtils.getEnchantment(stack, Enchantment.sharpness) : -1;
}

function openInv() {
    !openInventory && mc.getNetHandler().addToSendQueue(new C16PacketClientStatus(C16PacketClientStatus.EnumState.OPEN_INVENTORY_ACHIEVEMENT));
    return !timer.reset();
}

function isBad(stack) {
    return Java.from(new ItemPotion().getEffects(stack)).some(function (e) {return ["potion.poison", "potion.harm", "potion.moveSlowdown", "potion.weakness"].includes(e.getEffectName())});
}

var timer = new MSTimer(), openTimer = new MSTimer(), attackTimer = new MSTimer(), closeTimer = new MSTimer(), throwTimer = new MSTimer(), ARMOR_COMPARATOR = new ArmorComparator(), received = openInventory = updated = rotated = false, shouldOpen, chestList = [], ghostItems = [], closeTimer, toOpen, prevMode = rotations.get(), shouldThrow, lastChest;
Enchantment = Java.type("net.minecraft.enchantment.Enchantment");
ClickGui = Java.type("net.ccbluex.liquidbounce.ui.client.clickgui.ClickGui");
TileEntityChest = Java.type("net.minecraft.tileentity.TileEntityChest");
blockBlacklist = [Blocks.enchanting_table, Blocks.chest, Blocks.ender_chest, Blocks.trapped_chest, Blocks.anvil, Blocks.sand, Blocks.web, Blocks.torch, Blocks.crafting_table, Blocks.furnace, Blocks.waterlily, Blocks.dispenser, Blocks.stone_pressure_plate, Blocks.wooden_pressure_plate, Blocks.noteblock, Blocks.dropper, Blocks.tnt, Blocks.standing_banner, Blocks.wall_banner, Blocks.redstone_torch];
itemWhitelist = ["item.arrow", "item.diamond", "item.ingotIron", "item.stick"];