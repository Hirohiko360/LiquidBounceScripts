///engine_flags=--language=es6
var scriptName = "mumyKillAura3Remake";
var scriptVersion = 0.1;
var scriptAuthor = "mumy++";

var Color = Java.type("java.awt.Color");
var System = Java.type("java.lang.System");
var LiquidBounce = Java.type("net.ccbluex.liquidbounce.LiquidBounce");
var AttackEvent = Java.type("net.ccbluex.liquidbounce.event.AttackEvent");
var EventState = Java.type("net.ccbluex.liquidbounce.event.EventState");
var AntiBot = Java.type("net.ccbluex.liquidbounce.features.module.modules.misc.AntiBot");
var EntityUtils = Java.type("net.ccbluex.liquidbounce.utils.EntityUtils");
var RaycastUtils = Java.type("net.ccbluex.liquidbounce.utils.RaycastUtils");
var Rotation = Java.type("net.ccbluex.liquidbounce.utils.Rotation");
var RotationUtils = Java.type("net.ccbluex.liquidbounce.utils.RotationUtils");
var ColorUtils = Java.type("net.ccbluex.liquidbounce.utils.render.ColorUtils");
var RenderUtils = Java.type("net.ccbluex.liquidbounce.utils.render.RenderUtils");
var MSTimer = Java.type("net.ccbluex.liquidbounce.utils.timer.MSTimer");
var BoolValue = Java.type("net.ccbluex.liquidbounce.value.BoolValue");
var FloatValue = Java.type("net.ccbluex.liquidbounce.value.FloatValue");
var IntegerValue = Java.type("net.ccbluex.liquidbounce.value.IntegerValue");
var ListValue = Java.type("net.ccbluex.liquidbounce.value.ListValue");
var TextValue = Java.type("net.ccbluex.liquidbounce.value.TextValue");
var GuiContainer = Java.type("net.minecraft.client.gui.inventory.GuiContainer");
var GlStateManager = Java.type("net.minecraft.client.renderer.GlStateManager");
var GameSettings = Java.type("net.minecraft.client.settings.GameSettings");
var KeyBinding = Java.type("net.minecraft.client.settings.KeyBinding");
var EntityLivingBase = Java.type("net.minecraft.entity.EntityLivingBase");
var EntityDragon = Java.type("net.minecraft.entity.boss.EntityDragon");
var EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");
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
var C03PacketPlayer = Java.type("net.minecraft.network.play.client.C03PacketPlayer");
var C04PacketPlayerPosition = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition");
var C05PacketPlayerLook = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook");
var C06PacketPlayerPosLook = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook");
var C07PacketPlayerDigging = Java.type("net.minecraft.network.play.client.C07PacketPlayerDigging");
var C08PacketPlayerBlockPlacement = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement");
var C0APacketAnimation = Java.type("net.minecraft.network.play.client.C0APacketAnimation");
var C0DPacketCloseWindow = Java.type("net.minecraft.network.play.client.C0DPacketCloseWindow");
var C16PacketClientStatus = Java.type("net.minecraft.network.play.client.C16PacketClientStatus");
var S08PacketPlayerPosLook = Java.type("net.minecraft.network.play.server.S08PacketPlayerPosLook");
var AxisAlignedBB =  Java.type("net.minecraft.util.AxisAlignedBB");
var BlockPos = Java.type("net.minecraft.util.BlockPos");
var EnumFacing = Java.type("net.minecraft.util.EnumFacing");
var MathHelper = Java.type("net.minecraft.util.MathHelper");
var Vec3 = Java.type("net.minecraft.util.Vec3");
var WorldSettings = Java.type("net.minecraft.world.WorldSettings");
var GL11 = Java.type("org.lwjgl.opengl.GL11");

function mumyKillAura3Remake() {

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
        maxCPS: setting.float("MaxCPS", 14, 0.5, 20, {
            onChanged: function (oldValue, newValue) {
                const i = settings.minCPS.get();
                const value = settings.maxCPS;
                if (i > newValue) {
                    value.set(i);
                }
                value.set(Math.round(value.get() * 2) / 2);
                updateAttackDelay();
            }
        }),
        minCPS: setting.float("MinCPS", 8.5, 0.5, 20, {
            onChanged: function (oldValue, newValue) {
                const i = settings.maxCPS.get();
                const value = settings.minCPS;
                if (i < newValue) {
                    value.set(i);
                }
                value.set(Math.round(value.get() * 2) / 2);
                updateAttackDelay();
            }
        }),
        hurtTime: setting.integer("HurtTime", 20, 0, 20),
        range: setting.float("Range", 4, 0, 8, {
            onChanged: function (oldValue, newValue) {
                const i = Math.max(settings.throughWallsRange.get(), settings.rotationRange.get());
                if (i > newValue) {
                    settings.range.set(i);
                }
            }
        }),
        blockRange: setting.float("BlockRange", 6, 0, 10),
        throughWallsRange: setting.float("ThroughWallsRange", 0, 0, 8, {
            onChanged: function (oldValue, newValue) {
                const i = settings.range.get();
                if (i < newValue) {
                    settings.throughWallsRange.set(i);
                }
            }
        }),
        priority: setting.list("Priority", ["Armor", "Direction", "Distance", "Health", "HurtTime", "LivingTime"], "Health"),
        targetMode: setting.list("TargetMode", ["Multi", "Single", "Switch"], "Single"),
        switchDelay: setting.integer("SwitchDelay", 500, 0, 1000),
        limitedTargets: setting.integer("LimitedTargets", 3, 0, 100),
        swing: setting.boolean("Swing", true),
        keepSprint: setting.boolean("KeepSprint", true),
        rayCast: setting.boolean("RayCast", true),
        livingRayCast: setting.boolean("LivingRayCast", true),
        rayCastIgnored: setting.boolean("RayCastIgnored", false),
        intersectsRayCast: setting.boolean("IntersectsRayCast", false),
        autoBlock: setting.list("AutoBlock", ["Off", "Vanilla", "Packet", "Delayed"], "Delayed"),
        interactBlock: setting.boolean("InteractBlock", false),
        blockRate: setting.float("BlockRate", 100, 0, 100),
        blockDelay: setting.integer("BlockDelay", 0, 0, 1000),
        silentRotation: setting.boolean("SilentRotation", true),
        hitBoxHorizontal: setting.float("HitBoxHorizontal", 0.5, 0, 1),
        hitBoxVertical: setting.float("HitBoxVertical", 0.9, 0, 1),
        baseHitBox: setting.boolean("BaseHitBox", true),
        randomAngle: setting.float("RandomAngle", 3.75, 0, 180),
        maxTurnSpeed: setting.float("MaxTurnSpeed", 180, 0, 180, {
            onChanged: function (oldValue, newValue) {
                const i = settings.minTurnSpeed.get();
                if (i > newValue) {
                    settings.maxTurnSpeed.set(i);
                }
            }
        }),
        minTurnSpeed: setting.float("MinTurnSpeed", 180, 0, 180, {
            onChanged: function (oldValue, newValue) {
                const i = settings.maxTurnSpeed.get();
                if (i < newValue) {
                    settings.minTurnSpeed.set(i);
                }
            }
        }),
        fixedSensitivity: setting.boolean("FixedSensitivity", true),
        strafe: setting.list("Strafe", ["Off", "Strict", "Silent"], "Off"),
        fov: setting.float("FOV", 255, 0, 255),
        failRate: setting.float("FailRate", 0, 0, 100),
        onlyFaced: setting.boolean("OnlyFaced", true),
        fakeSwing: setting.boolean("FakeSwing", true),
        noInvAttack: setting.list("NoInvAttack", ["Off", "Freeze", "Packet"], "Off"),
        noInvDelay: setting.integer("NoInvDelay", 250, 0, 1000),
        rotationAnimation: setting.boolean("RotationAnimation", true)
    };

    let targetList = [];
    let switchTargetList = [];
    let primaryTarget;
    let actualTarget;

    let cancelRun = false;

    let hitable = false;

    let rotationState = false;
    let rotationYaw = 0;

    const attackTimer = new MSTimer();
    let attackDelay = 0;

    const switchTimer = new MSTimer();
    const noInvTimer = new MSTimer();

    const autoBlock = new AutoBlock();
    let delayedBlock = false;

    const stateColor0 = new Color(126, 126, 126, 70);
    const stateColor1 = new Color(37, 126, 255, 70);
    const stateColor2 = new Color(255, 0, 0, 70);

    this.getName = function () {
        return "mumyKillAura3Remake";
    }

    this.getDescription = function () {
        return "mumyKillAura3Remake-Module, By-mumy";
    }

    this.getCategory = function () {
        return "Misc";
    }

    this.onEnable = function () {
        targetList = [];
        switchTargetList = [];
        primaryTarget = null;
        actualTarget = null;
        delayedBlock = false;
        rotationState = false;
    }

    this.onDisable = function () {
        autoBlock.reset();
        this.onEnable();
    }

    this.onUpdate = function () {
        updateCancelRun();
        if (cancelRun) {
            primaryTarget = null;
            autoBlock.reset();
            return;
        } if (mc.thePlayer.isRiding()) {
            updateTarget();
            updateHitable();
        } if (targetList.length === 0) {
            autoBlock.reset();
            return;
        }
        autoBlock.checkAndUpdate();
        if (primaryTarget == null) {
            autoBlock.checkAndStart();
            return;
        }
        runAttack();
    }

    this.onMotion = function (event) {
        updateCancelRun();
        if (cancelRun) {
            primaryTarget = null;
            return;
        } if (event.getEventState() !== EventState.PRE) {
            updateHitable();
            if (settings.autoBlock.get() === "Delayed" && delayedBlock) {
                delayedBlock = false;
                autoBlock.checkAndStart();
            }
            return;
        } if (settings.strafe.get() === "Off") {
            updateTarget();
        }
    }

    this.onRender3D = function (event) {
        for (let i = 0; i < targetList.length; ++i) {
            const entity = targetList[i];
            RenderUtils.drawPlatform(entity, entity === primaryTarget ? hitable ? stateColor1 : stateColor2 : stateColor0);
        }
    }

    this.onPacket = function (event) {
        const packet = event.getPacket();
        if (packet instanceof C03PacketPlayer && settings.rotationAnimation.get()) {
            const player = mc.thePlayer;
            if (packet.rotating) {
                rotationYaw = packet.yaw;
                rotationState = rotationYaw !== player.rotationYaw;
            } if (!rotationState) {
                return;
            }
            player.rotationYawHead = rotationYaw;
            player.renderYawOffset = rotationYaw;
        }
    }

    this.onWorld = function (event) {
        moduleManager.getModule(this.getName()).setState(false);
    }

    this.onStrafe = function (event) {
        if (!mc.thePlayer.isRiding() && settings.strafe.get() !== "Off") {
            updateTarget();
        } if (primaryTarget == null || RotationUtils.targetRotation == null) {
            return;
        } switch (settings.strafe.get()) {
            case "Strict": {
                let strafe = event.getStrafe();
                let forward = event.getForward();
                const friction = event.getFriction();
                let f = strafe * strafe + forward * forward;
                const yaw = RotationUtils.targetRotation.getYaw();
                if (!(f < 1E-4)) {
                    f = friction / Math.max(1, Math.sqrt(f));
                    strafe *= f;
                    forward *= f;
                    const yawSin = MathHelper.sin(yaw * Math.PI / 180);
                    const yawCos = MathHelper.cos(yaw * Math.PI / 180);
                    const player = mc.thePlayer;
                    player.motionX += strafe * yawCos - forward * yawSin;
                    player.motionZ += forward * yawCos + strafe * yawSin;
                }
                event.cancelEvent();
                break;
            }
            case "Silent":
                RotationUtils.targetRotation.applyStrafeToPlayer(event);
                event.cancelEvent();
                break;

        }
    }

    this.addValues = function (values) {
        for (let i in settings) {
            values.add(settings[i]);
        }
    }

    function updateTarget() {
        targetList = [];
        actualTarget = null;
        const entityList = mc.theWorld.loadedEntityList;
        const hurtTime = settings.hurtTime.get();
        const maxRange = Math.max(settings.range.get(), settings.blockRange.get());
        const fov = settings.fov.get();
        const switchMode = settings.targetMode.get() === "Switch";
        const limitedTargets = settings.limitedTargets.get();
        if (switchMode && limitedTargets > 0 && !(switchTargetList.length < limitedTargets)) {
            switchTargetList = [];
        } for (let i = 0; i < entityList.length; ++i) {
            const entity = entityList[i];
            if (getDistanceToEntityBox(entity) < maxRange && RotationUtils.getRotationDifference(entity) < fov && isEnemy(entity) && !(switchMode && switchTargetList.indexOf(entity.getEntityId()) !== -1)) {
                targetList.push(entity);
            }
        } if (targetList.length === 0) {
            if (switchTargetList.length !== 0) {
                switchTargetList = [];
                updateTarget();
            } else {
                primaryTarget = null;
            }
            return;
        }
        targetList.sort(function (a, b) {
            return getDistanceToEntityBox(a) - getDistanceToEntityBox(b);
        });
        switch (settings.priority.get()) {
            case "Armor":
                targetList.sort(function (a, b) {
                    return a.getTotalArmorValue() - b.getTotalArmorValue();
                });
                break;
            case "HurtTime":
                targetList.sort(function (a, b) {
                    return a.hurtResistantTime - b.hurtResistantTime;
                });
                break;
            case "Health":
                targetList.sort(function (a, b) {
                    return a.getHealth() - b.getHealth();
                });
                break;
            case "Direction":
                targetList.sort(function (a, b) {
                    return RotationUtils.getRotationDifference(a) - RotationUtils.getRotationDifference(b);
                });
                break;
            case "LivingTime":
                targetList.sort(function (a, b) {
                    return b.ticksExisted - a.ticksExisted;
                });
                break;
        }
        const range = settings.range.get();
        if (switchMode) {
            let target;
            for (let i = 0; i < targetList.length; ++i) {
                const entity = targetList[i];
                const targetEntity = getAttackEntity(entity);
                const distance = getDistanceToEntityBox(targetEntity);
                if (!(entity.hurtResistantTime > hurtTime) && distance < range && updateRotation(targetEntity)) {
                    if (target == null) {
                        target = targetEntity;
                    } if (distance < range && primaryTarget === targetEntity) {
                        return;
                    }
                }
            }
            primaryTarget = target;
        } else {
            primaryTarget = null;
            for (let i = 0; i < targetList.length; ++i) {
                const entity = targetList[i];
                const targetEntity = getAttackEntity(entity);
                const distance = getDistanceToEntityBox(targetEntity);
                if (!(entity.hurtResistantTime > hurtTime) && distance < range && updateRotation(targetEntity)) {
                    primaryTarget = targetEntity;
                    return;
                }
            }
        } if (switchTargetList.length !== 0) {
            switchTargetList = [];
            updateTarget();
        }
    }

    function updateRotation(entity) {
        if (!(settings.maxTurnSpeed.get() > 0)) {
            return true;
        }
        const size = entity.getCollisionBorderSize();
        const bb = entity.getEntityBoundingBox().expand(size, size, size);
        const range = settings.range.get();
        const throughWallsRange = settings.throughWallsRange.get();
        let rotation = searchCenter(bb, settings.hitBoxHorizontal.get(), settings.hitBoxVertical.get(), range, throughWallsRange);
        if (rotation == null && settings.baseHitBox.get()) {
            rotation = searchCenter(bb, 1, 1, range, throughWallsRange);
            if (rotation == null) {
                return false;
            }
        }
        smoothRotation(rotation);
        return true;
    }

    function searchCenter(bb, horizontal, vertical, range, throughWallsRange) {
        const boxX = bb.minX + (bb.maxX - bb.minX) / 2;
        const boxY = bb.minY + (bb.maxY - bb.minY) / 2;
        const boxZ = bb.minZ + (bb.maxZ - bb.minZ) / 2;
        const sb = new AxisAlignedBB(
            boxX - (boxX - bb.minX) * horizontal,
            boxY - (boxY - bb.minY) * vertical,
            boxZ - (boxZ - bb.minZ) * horizontal,
            boxX - (boxX - bb.maxX) * horizontal,
            boxY - (boxY - bb.maxY) * vertical,
            boxZ - (boxZ - bb.maxZ) * horizontal
        );
        const player = mc.thePlayer;
        const world = mc.theWorld;
        const gameSettings = mc.gameSettings;
        const eyes = player.getPositionEyes(1);
        let targetRotation = RotationUtils.serverRotation;
        const randomAngle = settings.randomAngle.get();
        if (randomAngle > 0) {
            targetRotation = new Rotation(targetRotation.getYaw() + randomAngle * (Math.random() * 2 - 1), Math.max(-90, Math.min(targetRotation.getPitch() + randomAngle * (Math.random() * 2 - 1), 90)));
        }
        let prevDiff = 0;
        let finalRotation;
        for (let sX = 0.5; sX < 10; ++sX) {
            for (let sY = 0.5; sY < 10; ++sY) {
                for (let sZ = 0.5; sZ < 10; ++sZ) {
                    const vec = new Vec3(sb.minX + (sb.maxX - sb.minX) * sX / 10, sb.minY + (sb.maxY - sb.minY) * sY / 10, sb.minZ + (sb.maxZ - sb.minZ) * sZ / 10);
                    const vecRange = world.rayTraceBlocks(eyes, vec, false, false, false) == null ? range : throughWallsRange;
                    const rotation = RotationUtils.limitAngleChange(RotationUtils.serverRotation, RotationUtils.toRotation(vec, false), 180);
                    if (settings.fixedSensitivity.get()) {
                        rotation.fixedSensitivity(gameSettings.mouseSensitivity);
                    }
                    const rotationVec = RotationUtils.getVectorForRotation(rotation);
                    const lookAt = eyes.addVector(rotationVec.xCoord * vecRange, rotationVec.yCoord * vecRange, rotationVec.zCoord * vecRange);
                    if (bb.calculateIntercept(eyes, lookAt) == null) {
                        continue;
                    }
                    const diff = RotationUtils.getRotationDifference(targetRotation, rotation);
                    if (finalRotation == null || prevDiff > diff) {
                        prevDiff = diff;
                        finalRotation = rotation;
                    }
                }
            }
        }
        return finalRotation;
    }

    function smoothRotation(rotation) {
        const gameSettings = mc.gameSettings;
        const mouseSensitivity = gameSettings.mouseSensitivity;
        const minTurnSpeed = settings.minTurnSpeed.get();
        const maxTurnSpeed = settings.maxTurnSpeed.get();
        const limitedRotation = RotationUtils.limitAngleChange(RotationUtils.serverRotation, rotation, minTurnSpeed + (maxTurnSpeed - minTurnSpeed) * Math.random());
        gameSettings.mouseSensitivity = 0;
        if (settings.silentRotation.get()) {
            RotationUtils.setTargetRotation(limitedRotation, 15);
        } else {
            limitedRotation.toPlayer(mc.thePlayer);
        }
        gameSettings.mouseSensitivity = mouseSensitivity;
    }

    function updateHitable() {
        if (primaryTarget == null) {
            hitable = false;
            return;
        }
        actualTarget = primaryTarget;
        const range = settings.range.get();
        if (settings.rayCast.get()) {
            const world = mc.theWorld;
            const livingRayCast = settings.livingRayCast.get();
            const rayCastIgnored = settings.rayCastIgnored.get();
            const intersectsRayCast = settings.intersectsRayCast.get();
            const rayCastEntity = RaycastUtils.raycastEntity(range, function (entity) {
                return (!livingRayCast || entity instanceof EntityLivingBase && !(entity instanceof EntityArmorStand)) && (rayCastIgnored || isEnemy(entity) || intersectsRayCast && !world.getEntitiesWithinAABBExcludingEntity(entity, entity.getEntityBoundingBox()).isEmpty());
            });
            if (rayCastEntity != null) {
                actualTarget = rayCastEntity;
            }
        }
        hitable = !settings.onlyFaced.get() || rayCastEntity(actualTarget, range, RotationUtils.serverRotation) != null;
    }

    function runAttack() {
        if (primaryTarget == null) {
            return;
        } if (attackTimer.hasTimePassed(attackDelay) && (hitable || settings.fakeSwing.get())) {
            const netHandler = mc.getNetHandler();
            const openInventory = settings.noInvAttack.get() === "Packet";
            if (openInventory) {
                netHandler.addToSendQueue(new C0DPacketCloseWindow());
            }
            const autoBlockMode = settings.autoBlock.get();
            if (autoBlockMode !== "Vanilla") {
                autoBlock.checkAndStop();
            }
            const fail = Math.random() * 100 < settings.failRate.get();
            if (settings.targetMode.get() === "Multi" && hitable) {
                const player = mc.thePlayer;
                const range = settings.range.get();
                const throughWallsRange = settings.throughWallsRange.get();
                const hurtTime = settings.hurtTime.get();
                const limitedTargets = settings.limitedTargets.get();
                const limit = (limitedTargets > 0 ? Math.min : Math.max)(targetList.length, limitedTargets);
                for (let i = 0; i < limit; ++i) {
                    const entity = targetList[i];
                    if (entity === actualTarget || !(entity.hurtResistantTime > hurtTime) && getDistanceToEntityBox(entity) < (player.canEntityBeSeen(entity) ? range : throughWallsRange)) {
                        attackEntity(entity, !fail);
                    }
                }
            } else {
                attackEntity(actualTarget, hitable && !fail);
            } if (switchTimer.hasTimePassed(settings.switchDelay.get())) {
                switchTargetList.push(primaryTarget.getEntityId());
            } if (autoBlockMode !== "Off" || autoBlock.isPlayerBlocking()) {
                if (autoBlockMode !== "Delayed" || mc.thePlayer.isRiding()) {
                    autoBlock.checkAndStart();
                } else {
                    delayedBlock = true;
                }
            } if (openInventory) {
                netHandler.addToSendQueue(new C16PacketClientStatus(C16PacketClientStatus.EnumState.OPEN_INVENTORY_ACHIEVEMENT));
            }
            attackTimer.reset();
            updateAttackDelay();
        }
    }

    function attackEntity(entity, attack) {
        const player = mc.thePlayer;
        const netHandler = mc.getNetHandler();
        LiquidBounce.eventManager.callEvent(new AttackEvent(entity));
        if (settings.swing.get()) {
            player.swingItem();
        } if (attack) {
            netHandler.addToSendQueue(new C02PacketUseEntity(entity, C02PacketUseEntity.Action.ATTACK));
        } if (!settings.keepSprint.get() && mc.playerController.getCurrentGameType() !== WorldSettings.GameType.SPECTATOR) {
            player.attackTargetEntityWithCurrentItem(entity);
            player.setSprinting(false);
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
        const player = mc.thePlayer;
        const bb = entity.getEntityBoundingBox();
        const eyeX = player.posX;
        const eyeY = player.posY + player.getEyeHeight();
        const eyeZ = player.posZ;
        const xDist = eyeX - Math.max(bb.minX, Math.min(eyeX, bb.maxX));
        const yDist = eyeY - Math.max(bb.minY, Math.min(eyeY, bb.maxY));
        const zDist = eyeZ - Math.max(bb.minZ, Math.min(eyeZ, bb.maxZ));
        return Math.sqrt(xDist * xDist + yDist * yDist + zDist * zDist);
    }

    function updateAttackDelay() {
        const minCPS = settings.minCPS.get();
        const maxCPS = settings.maxCPS.get();
        attackDelay = Math.floor(1000 / maxCPS + (1000 / minCPS - 1000 / maxCPS) * Math.random());
    }

    function updateCancelRun() {
        cancelRun = mc.thePlayer.isSpectator() || (mc.currentScreen instanceof GuiContainer || !noInvTimer.hasTimePassed(settings.noInvDelay.get())) && settings.noInvAttack.get() === "Freeze";
    }

    function getAttackEntity(entity) {
        if (entity instanceof EntityDragon) {
            const parts = Java.from(entity.dragonPartArray);
            parts.sort(function (a, b) {
                return getDistanceToEntityBox(a) - getDistanceToEntityBox(b);
            });
            return parts[0];
        }
        return entity;
    }

    function rayCastEntity(entity, range, rotation) {
        if (entity == null || rotation == null) {
            return null;
        }
        const positionEye = mc.thePlayer.getPositionEyes(1);
        const expandSize = entity.getCollisionBorderSize();
        const boundingBox = entity.getEntityBoundingBox().expand(expandSize, expandSize, expandSize);
        const entityLook = RotationUtils.getVectorForRotation(rotation);
        const lookAt = positionEye.addVector(entityLook.xCoord * range, entityLook.yCoord * range, entityLook.zCoord * range);
        return boundingBox.calculateIntercept(positionEye, lookAt);
    }

    function AutoBlock() {

        this.change = false;
        this.status = false;
        const blockPos = new BlockPos(-1, -1, -1);
        const blockTimer = new MSTimer();

        this.start = function () {
            this.change = true;
            this.status = true;
            blockTimer.reset();
            const player = mc.thePlayer;
            const netHandler = mc.getNetHandler();
            if (settings.interactBlock.get() && actualTarget != null) {
                const entity = actualTarget;
                const movingObject = rayCastEntity(entity, settings.range.get(), RotationUtils.serverRotation);
                if (movingObject != null) {
                    const hitVec = movingObject.hitVec;
                    netHandler.addToSendQueue(new C02PacketUseEntity(entity, new Vec3(
                        hitVec.xCoord - entity.posX,
                        hitVec.yCoord - entity.posY,
                        hitVec.zCoord - entity.posZ)
                    ));
                    netHandler.addToSendQueue(new C02PacketUseEntity(entity, C02PacketUseEntity.Action.INTERACT));
                }
            }
            player.setItemInUse(player.inventory.getCurrentItem(), 51213);
            netHandler.addToSendQueue(new C08PacketPlayerBlockPlacement(blockPos, 255, player.inventory.getCurrentItem(), 0, 0, 0));
            KeyBinding.setKeyBindState(mc.gameSettings.keyBindUseItem.getKeyCode(), true);
        }

        this.stop = function () {
            this.change = true;
            this.status = false;
            mc.getNetHandler().addToSendQueue(new C07PacketPlayerDigging(C07PacketPlayerDigging.Action.RELEASE_USE_ITEM, blockPos, EnumFacing.DOWN));
            mc.thePlayer.stopUsingItem();
            KeyBinding.setKeyBindState(mc.gameSettings.keyBindUseItem.getKeyCode(), false);
        }

        this.checkAndStop = function () {
            if (mc.thePlayer.isBlocking()) {
                this.stop();
            }
        }

        this.checkAndStart = function () {
            if (!mc.thePlayer.isBlocking() && canBlocking()) {
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

        function canBlocking() {
            return itemIsSword() && blockTimer.hasTimePassed(settings.blockDelay.get()) && (primaryTarget == null || Math.random() < settings.blockRate.get() / 100);
        }

    }

}

let client;

function onLoad() {}

function onEnable() {
    client = moduleManager.registerModule(new mumyKillAura3Remake());
}

function onDisable() {
    moduleManager.unregisterModule(client);
}

