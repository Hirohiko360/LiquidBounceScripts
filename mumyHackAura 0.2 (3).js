///engine_flags=--language=es6
var scriptName = "mumyHackAura";
var scriptVersion = 0.2;
var scriptAuthor = "mumy++";

var Color = Java.type("java.awt.Color");
var File = Java.type("java.io.File");
var JavaFloat = Java.type("java.lang.Float");
var JavaInteger = Java.type("java.lang.Integer");
var JavaString = Java.type("java.lang.String");
var System = Java.type("java.lang.System");
var StandardCharsets = Java.type("java.nio.charset.StandardCharsets");
var Files = Java.type("java.nio.file.Files");
var Paths = Java.type("java.nio.file.Paths");
var StandardOpenOption = Java.type("java.nio.file.StandardOpenOption");
var LiquidBounce = Java.type("net.ccbluex.liquidbounce.LiquidBounce");
var AttackEvent = Java.type("net.ccbluex.liquidbounce.event.AttackEvent");
var EventState = Java.type("net.ccbluex.liquidbounce.event.EventState");
var AntiBot = Java.type("net.ccbluex.liquidbounce.features.module.modules.misc.AntiBot");
var EntityUtils = Java.type("net.ccbluex.liquidbounce.utils.EntityUtils");
var RotationUtils = Java.type("net.ccbluex.liquidbounce.utils.RotationUtils");
var ColorUtils = Java.type("net.ccbluex.liquidbounce.utils.render.ColorUtils");
var RenderUtils = Java.type("net.ccbluex.liquidbounce.utils.render.RenderUtils");
var MSTimer = Java.type("net.ccbluex.liquidbounce.utils.timer.MSTimer");
var BoolValue = Java.type("net.ccbluex.liquidbounce.value.BoolValue");
var FloatValue = Java.type("net.ccbluex.liquidbounce.value.FloatValue");
var IntegerValue = Java.type("net.ccbluex.liquidbounce.value.IntegerValue");
var ListValue = Java.type("net.ccbluex.liquidbounce.value.ListValue");
var TextValue = Java.type("net.ccbluex.liquidbounce.value.TextValue");
var GameSettings = Java.type("net.minecraft.client.settings.GameSettings");
var KeyBinding = Java.type("net.minecraft.client.settings.KeyBinding");
var EntityLivingBase = Java.type("net.minecraft.entity.EntityLivingBase");
var EntityDragon = Java.type("net.minecraft.entity.boss.EntityDragon");
var EntityGhast = Java.type("net.minecraft.entity.monster.EntityGhast");
var EntityGolem = Java.type("net.minecraft.entity.monster.EntityGolem");
var EntityMob = Java.type("net.minecraft.entity.monster.EntityMob");
var EntitySlime = Java.type("net.minecraft.entity.monster.EntitySlime");
var EntityAnimal = Java.type("net.minecraft.entity.passive.EntityAnimal");
var EntityBat = Java.type("net.minecraft.entity.passive.EntityBat");
var EntitySquid = Java.type("net.minecraft.entity.passive.EntitySquid");
var EntityVillager = Java.type("net.minecraft.entity.passive.EntityVillager");
var EntityPlayer = Java.type("net.minecraft.entity.player.EntityPlayer");
var ItemSword = Java.type("net.minecraft.item.ItemSword");
var C02PacketUseEntity = Java.type("net.minecraft.network.play.client.C02PacketUseEntity");
var C07PacketPlayerDigging = Java.type("net.minecraft.network.play.client.C07PacketPlayerDigging");
var C08PacketPlayerBlockPlacement = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement");
var BlockPos = Java.type("net.minecraft.util.BlockPos");
var EnumFacing = Java.type("net.minecraft.util.EnumFacing");
var Vec3 = Java.type("net.minecraft.util.Vec3");

function mumyHackAura() {

    const setting = {
        float: function (name, def, min, max, object) {
            return object == null ? value.createFloat(name, def, min, max) : new _AdaptedValue(new (Java.extend(FloatValue, object))(name, def, min, max));
        },
        integer: function (name, def, min, max, object) {
            return object == null ? value.createInteger(name, def, min, max) : new _AdaptedValue(new (Java.extend(IntegerValue, object))(name, def, min, max));
        },
        boolean: function (name, def, object) {
            return object == null ? value.createBoolean(name, def) : new _AdaptedValue(new (Java.extend(BoolValue, object))(name, def));
        },
        list: function (name, values, def, object) {
            return object == null ? value.createList(name, values, def) : new _AdaptedValue(new (Java.extend(ListValue, object))(name, values, def));
        },
        text: function (name, def, object) {
            return object == null ? value.createText(name, def) : new _AdaptedValue(new (Java.extend(TextValue, object))(name, def));
        }
    };

    const settings = {
        maxDelay: setting.integer("MaxDelay", 10, 0, 1000, {
            onChanged: function (oldValue, newValue) {
                const i = settings.minDelay.get();
                if (i > newValue) {
                    settings.maxDelay.set(i);
                }
            }
        }),
        minDelay: setting.integer("MinDelay", 5, 0, 1000, {
            onChanged: function (oldValue, newValue) {
                const i = settings.maxDelay.get();
                if (i < newValue) {
                    settings.minDelay.set(i);
                }
            }
        }),
        hurtTime: setting.integer("HurtTime", 20, 0, 20),
        range: setting.float("Range", 4, 0, 20, {
            onChanged: function (oldValue, newValue) {
                const i = settings.throughWallsRange.get();
                if (i > newValue) {
                    settings.range.set(i);
                }
            }
        }),
        blockRange: setting.float("BlockRange", 5, 0, 20),
        throughWallsRange: setting.float("ThroughWallsRange", 0, 0, 20, {
            onChanged: function (oldValue, newValue) {
                const i = settings.range.get();
                if (i < newValue) {
                    settings.throughWallsRange.set(i);
                }
            }
        }),
        predictRange: setting.float("PredictRange", 1, 0, 2),
        autoBlock: setting.list("AutoBlock", ["Off", "Vanilla", "Packet"], "Packet"),
        attackTiming: setting.list("AttackTiming", ["Pre", "Post", "Frame", "Update"], "Frame"),
        rotation: setting.list("Rotation", ["Off", "Strict", "Silent"], "Silent")
    };

    let targetList = [];
    let target;

    const autoBlock = new AutoBlock();

    const attackTimer = new MSTimer();
    let attackDelay = 0;

    const waitStateColor = new Color(126, 126, 126, 70);
    const attackStateColor = new Color(37, 126, 255, 70);

    const valuesContainer = new ValuesContainer();

    this.getName = function () {
        return "mumyHackAura";
    }

    this.getDescription = function () {
        return "mumyHackAura-Module, By-mumy";
    }

    this.getCategory = function () {
        return "Misc";
    }

    this.onEnable = function () {
        targetList = [];
        target = null;
    }

    this.onDisable = function () {
        autoBlock.reset();
        this.onEnable();
    }

    this.onUpdate = function () {
        if (mc.thePlayer.isRiding()) {
            autoBlock.reset();
        } if (settings.attackTiming.get() === "Update") {
            runAttack();
        }
    }

    this.onMotion = function (event) {
        const eventState = event.getEventState();
        if (eventState === EventState.PRE) {
            updateTarget();
            if (targetList.length === 0) {
                autoBlock.reset();
                return;
            } if (target == null && settings.autoBlock.get() !== "Off") {
                autoBlock.checkAndStart();
            }
            autoBlock.checkAndUpdate();
        }
        const attackTiming = settings.attackTiming.get();
        if (eventState === EventState.PRE ? attackTiming === "Pre" : attackTiming === "Post" || attackTiming === "Frame") {
            runAttack();
        }
    }

    this.onRender3D = function (event) {
        if (settings.attackTiming.get() === "Frame") {
            runAttack();
        } for (let i = 0; i < targetList.length; ++i) {
            const entity = targetList[i];
            RenderUtils.drawPlatform(entity, entity === target ? attackStateColor : waitStateColor);
        }
    }

    this.onWorld = function (event) {
        moduleManager.getModule(this.getName()).setState(false);
    }

    this.addValues = function (values) {
        valuesContainer.init(settings);
        for (let i in settings) {
            values.add(settings[i]);
        }
    }

    function updateTarget() {
        targetList = [];
        target = null;
        const player = mc.thePlayer;
        const entityList = mc.theWorld.loadedEntityList;
        const hurtTime = settings.hurtTime.get();
        const range = settings.range.get();
        const throughWallsRange = settings.throughWallsRange.get();
        const maxRange = Math.max(range, settings.blockRange.get());
        for (let i = 0; i < entityList.length; ++i) {
            const entity = entityList[i];
            const distance = getDistanceToEntityBox(entity);
            if (!(entity.hurtResistantTime > hurtTime) && (player.canEntityBeSeen(entity) ? distance < maxRange : distance < throughWallsRange) && isEnemy(entity)) {
                targetList.push(entity);
            }
        } if (targetList.length === 0) {
            return;
        }
        targetList.sort(function (a, b) {
            return getDistanceToEntityBox(a) - getDistanceToEntityBox(b);
        }).sort(function (a, b) {
            return a.hurtResistantTime - b.hurtResistantTime;
        });
        for (let i = 0; i < targetList.length; ++i) {
            const entity = targetList[i];
            if (getDistanceToEntityBox(entity) < range && updateRotation(entity)) {
                target = entity;
                break;
            }
        }
    }

    function updateRotation(entity) {
        if (settings.rotation.get() !== "Off") {
            const player = mc.thePlayer;
            const size = entity.getCollisionBorderSize();
            const bb = entity.getEntityBoundingBox().expand(size, size, size);
            smoothRotation(RotationUtils.toRotation(new Vec3(entity.posX, Math.max(bb.minY, Math.min(player.posY + player.getEyeHeight(), bb.maxY)), entity.posZ), false));
        }
        return true;
    }

    function smoothRotation(rotation) {
        const gameSettings = mc.gameSettings;
        const mouseSensitivity = gameSettings.mouseSensitivity;
        const limitedRotation = RotationUtils.limitAngleChange(RotationUtils.serverRotation, rotation, 180);
        gameSettings.mouseSensitivity = 0;
        if (settings.rotation.get() === "Silent") {
            RotationUtils.setTargetRotation(limitedRotation, 0);
        } else {
            limitedRotation.toPlayer(mc.thePlayer);
        }
        gameSettings.mouseSensitivity = mouseSensitivity;
    }

    function runAttack() {
        if (target == null) {
            return;
        } if (attackTimer.hasTimePassed(attackDelay)) {
            attackEntity(target);
            attackTimer.reset();
            const maxDelay = settings.maxDelay.get();
            const minDelay = settings.minDelay.get();
            attackDelay = minDelay + Math.floor(Math.random() * (maxDelay - minDelay));
        }
    }

    function attackEntity(entity) {
        if (settings.autoBlock.get() !== "Vanilla") {
            autoBlock.checkAndStop();
        }
        LiquidBounce.eventManager.callEvent(new AttackEvent(entity));
        mc.thePlayer.swingItem();
        mc.getNetHandler().addToSendQueue(new C02PacketUseEntity(entity, C02PacketUseEntity.Action.ATTACK));
        if (settings.autoBlock.get() !== "Off" || autoBlock.isPlayerBlocking()) {
            autoBlock.checkAndStart();
        }
    }

    function isEnemy(entity) {

        if (entity instanceof EntityLivingBase && (EntityUtils.targetDead || entity.isEntityAlive() && entity.getHealth() > 0) && entity !== mc.thePlayer) {
            if (!EntityUtils.targetInvisible && entity.isInvisible()) {
                return false
            } if (EntityUtils.targetPlayer && entity instanceof EntityPlayer) {
                if (entity.isSpectator() || AntiBot.isBot(entity)) {
                    return false
                } if (isFriend(entity) && !moduleManager.getModule("NoFriends").getState()) {
                    return false;
                }
                const teams = LiquidBounce.moduleManager.getModule("Teams");
                return !teams.getState() || !teams.isInYourTeam(entity);

            }
            return EntityUtils.targetMobs && isMob(entity) || EntityUtils.targetAnimals && isAnimal(entity);
        }
        return false;

        function isAnimal(entity) {
            return entity instanceof EntityAnimal || entity instanceof EntitySquid || entity instanceof EntityGolem || entity instanceof EntityBat;
        }

        function isFriend(entity) {
            return entity instanceof EntityPlayer && entity.getName() != null && LiquidBounce.fileManager.friendsConfig.isFriend(ColorUtils.stripColor(entity.getName()));
        }

        function isMob(entity) {
            return entity instanceof EntityMob || entity instanceof EntityVillager || entity instanceof EntitySlime || entity instanceof EntityGhast || entity instanceof EntityDragon;
        }

    }

    function getDistanceToEntityBox(entity) {
        const size = entity.getCollisionBorderSize();
        const bb = entity.getEntityBoundingBox().expand(size, size, size);
        const player = mc.thePlayer;
        const eyes = player.getPositionEyes(1);
        const predict = settings.predictRange.get();
        const xDist = eyes.xCoord - Math.max(bb.minX, Math.min(eyes.xCoord, bb.maxX)) - (player.posX - player.prevPosX) * predict;
        const yDist = eyes.yCoord - Math.max(bb.minY, Math.min(eyes.yCoord, bb.maxY)) - (player.posY - player.prevPosY) * predict;
        const zDist = eyes.zCoord - Math.max(bb.minZ, Math.min(eyes.zCoord, bb.maxZ)) - (player.posZ - player.prevPosZ) * predict;
        const xPredict = entity.posX - entity.prevPosX;
        const yPredict = entity.posY - entity.prevPosY;
        const zPredict = entity.posZ - entity.prevPosZ;
        const dist = Math.sqrt(xDist * xDist + yDist * yDist + zDist * zDist);
        const predictDist = Math.sqrt(xPredict * xPredict + yPredict * yPredict + zPredict * zPredict) * predict;
        return Math.max(dist - predictDist, 0);
    }

    function AutoBlock() {

        this.change = false;
        this.status = false;
        const negativeBlockPos = new BlockPos(-1, -1, -1);
        const zeroBlockPos = new BlockPos(0, 0, 0);

        this.start = function () {
            this.change = true;
            this.status = true;
            const player = mc.thePlayer;
            player.setItemInUse(player.inventory.getCurrentItem(), 51213);
            mc.getNetHandler().addToSendQueue(new C08PacketPlayerBlockPlacement(negativeBlockPos, 255, player.inventory.getCurrentItem(), 0, 0, 0));
            KeyBinding.setKeyBindState(mc.gameSettings.keyBindUseItem.getKeyCode(), true);
        }

        this.stop = function () {
            this.change = true;
            this.status = false;
            mc.getNetHandler().addToSendQueue(new C07PacketPlayerDigging(C07PacketPlayerDigging.Action.RELEASE_USE_ITEM, zeroBlockPos, EnumFacing.DOWN));
            mc.thePlayer.stopUsingItem();
            KeyBinding.setKeyBindState(mc.gameSettings.keyBindUseItem.getKeyCode(), false);
        }

        this.checkAndStop = function () {
            if (mc.thePlayer.isBlocking()) {
                this.stop();
            }
        }

        this.checkAndStart = function () {
            if (!mc.thePlayer.isBlocking() && itemIsSword()) {
                this.start();
            }
        }

        this.checkAndUpdate = function () {
            if (this.status && !itemIsSword() && !GameSettings.isKeyDown(mc.gameSettings.keyBindUseItem)) {
                this.stop();
            }
        }

        this.reset = function () {
            if (!this.change) {
                return;
            } if (this.status && !GameSettings.isKeyDown(mc.gameSettings.keyBindUseItem)) {
                this.stop();
            }
            this.change = false;
        }

        this.isPlayerBlocking = function () {
            return GameSettings.isKeyDown(mc.gameSettings.keyBindUseItem) && itemIsSword();
        }

        function itemIsSword() {
            const heldItem = mc.thePlayer.getHeldItem();
            return heldItem != null && heldItem.getItem() instanceof ItemSword;
        }

    }

    function ValuesContainer() {

        const directory = new File(LiquidBounce.INSTANCE.fileManager.dir, "scripts\\lib");
        const file = new File(directory, [scriptName, " ", scriptVersion, ".json"].join(""));
        const path = Paths.get(file.getPath());

        let settings = {};
        let defaultValues;

        this.init = function (object) {
            checkFile();
            settings = object;
            defaultValues = readSettings();
            settings.container = setting.list("Container", ["C0", "C1", "C2"], "C0", {
                onChanged: function (oldValue, newValue) {
                    if (oldValue === newValue) {
                        return;
                    }
                    writeValues(oldValue, readSettings());
                    writeSettings(readValues(newValue));
                }
            });
        }

        function readSettings() {
            const object = {};
            for (let i in settings) {
                if (i === "container") {
                    continue;
                }
                object[i] = settings[i].get();
            }
            return object;
        }

        function writeSettings(object) {
            for (let i in settings) {
                if (i === "container") {
                    continue;
                }
                const set = object[i];
                const value = settings[i].getValue();
                if (value instanceof IntegerValue) {
                    value.changeValue(JavaInteger.valueOf(set));
                } else if (value instanceof FloatValue) {
                    value.changeValue(JavaFloat.valueOf(set));
                } else {
                    value.set(set);
                }
            }
        }

        function readValues(container) {
            checkFile();
            const object = JSON.parse(readJSON());
            const values = object[container];
            return values == null ? defaultValues : values;
        }

        function writeValues(container, settings) {
            checkFile();
            const object = JSON.parse(readJSON());
            object[container] = settings;
            writeJSON(object);
        }

        function checkFile() {
            if (!directory.exists()) {
                directory.mkdirs();
            } if (!file.exists()) {
                directory.createNewFile();
            }
        }

        function readJSON() {
            try {
                return new JavaString(Files.readAllBytes(path), StandardCharsets.UTF_8);
            } catch (e) {
                return "{}";
            }
        }

        function writeJSON(object) {
            try {
                Files.write(path, new JavaString(JSON.stringify(object, null, 4)).getBytes(), StandardOpenOption.WRITE, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
            } catch (e) {}
        }

    }

}

let client;

function onLoad() {}

function onEnable() {
    client = moduleManager.registerModule(new mumyHackAura());
}

function onDisable() {
    moduleManager.unregisterModule(client);
}

