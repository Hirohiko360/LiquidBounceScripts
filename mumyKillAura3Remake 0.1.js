///engine_flags=--language=es6
var scriptName = "mumyKillAura3Remake";
var scriptVersion = 0.1;
var scriptAuthor = "mumy++";

var BoolValue = Java.type("net.ccbluex.liquidbounce.value.BoolValue");
var FloatValue = Java.type("net.ccbluex.liquidbounce.value.FloatValue");
var IntegerValue = Java.type("net.ccbluex.liquidbounce.value.IntegerValue");
var ListValue = Java.type("net.ccbluex.liquidbounce.value.ListValue");
var TextValue = Java.type("net.ccbluex.liquidbounce.value.TextValue");

var Color = Java.type("java.awt.Color");
var System = Java.type("java.lang.System");
var LiquidBounce = Java.type("net.ccbluex.liquidbounce.LiquidBounce");
var EventState = Java.type("net.ccbluex.liquidbounce.event.EventState");
var AntiBot = Java.type("net.ccbluex.liquidbounce.features.module.modules.misc.AntiBot");
var EntityUtils = Java.type("net.ccbluex.liquidbounce.utils.EntityUtils");
var RotationUtils = Java.type("net.ccbluex.liquidbounce.utils.RotationUtils");
var ColorUtils = Java.type("net.ccbluex.liquidbounce.utils.render.ColorUtils");
var RenderUtils = Java.type("net.ccbluex.liquidbounce.utils.render.RenderUtils");
var GlStateManager = Java.type("net.minecraft.client.renderer.GlStateManager");
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
var C03PacketPlayer = Java.type("net.minecraft.network.play.client.C03PacketPlayer");
var C07PacketPlayerDigging = Java.type("net.minecraft.network.play.client.C07PacketPlayerDigging");
var C08PacketPlayerBlockPlacement = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement");
var C0APacketAnimation = Java.type("net.minecraft.network.play.client.C0APacketAnimation");
var BlockPos = Java.type("net.minecraft.util.BlockPos");
var EnumFacing = Java.type("net.minecraft.util.EnumFacing");
var MathHelper = Java.type("net.minecraft.util.MathHelper");
var Vec3 = Java.type("net.minecraft.util.Vec3");
var GL11 = Java.type("org.lwjgl.opengl.GL11");

var AttackEvent = Java.type("net.ccbluex.liquidbounce.event.AttackEvent");
var MSTimer = Java.type("net.ccbluex.liquidbounce.utils.timer.MSTimer");
var C04PacketPlayerPosition = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition");
var C05PacketPlayerLook = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook");
var C06PacketPlayerPosLook = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook");
var S08PacketPlayerPosLook = Java.type("net.minecraft.network.play.server.S08PacketPlayerPosLook");
var Rotation = Java.type("net.ccbluex.liquidbounce.utils.Rotation");
var WorldSettings = Java.type("net.minecraft.world.WorldSettings");
var C0DPacketCloseWindow = Java.type("net.minecraft.network.play.client.C0DPacketCloseWindow");
var C16PacketClientStatus = Java.type("net.minecraft.network.play.client.C16PacketClientStatus");
var GuiContainer = Java.type("net.minecraft.client.gui.inventory.GuiContainer");
var EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");
var AxisAlignedBB =  Java.type("net.minecraft.util.AxisAlignedBB");
var RaycastUtils = Java.type("net.ccbluex.liquidbounce.utils.RaycastUtils");

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
        maxCPS: setting.float("MaxCPS", 12, 0.5, 20, {
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
        blockRange: setting.float("BlockRange", 5, 0, 10),
        // rotationRange: setting.float("RotationRange", 5, 0, 10, {
        //     onChanged: function (oldValue, newValue) {
        //         const i = settings.range.get();
        //         if (i > newValue) {
        //             settings.rotationRange.set(i);
        //         }
        //     }
        // }),
        throughWallsRange: setting.float("ThroughWallsRange", 0, 0, 8, {
            onChanged: function (oldValue, newValue) {
                const i = settings.range.get();
                if (i < newValue) {
                    settings.throughWallsRange.set(i);
                }
            }
        }),
        priority: setting.list("Priority", ["Armor", "Direction", "Distance", "Health", "HurtTime", "LivingTime"], "HurtTime"),
        targetMode: setting.list("TargetMode", ["Multi", "Single", "Switch"], "Single"),
        switchDelay: setting.integer("SwitchDelay", 500, 0, 1000),
        swing: setting.boolean("Swing", true),
        keepSprint: setting.boolean("KeepSprint", true),
        rayCast: setting.boolean("RayCast", false),
        livingRayCast: setting.boolean("LivingRayCast", false),
        rayCastIgnored: setting.boolean("RayCastIgnored", false),
        intersectsRayCast: setting.boolean("IntersectsRayCast", false),
        autoBlock: setting.list("AutoBlock", ["Off", "Vanilla", "Packet", "Delayed"], "Off"),
        blockRate: setting.float("BlockRate", 100, 0, 100),
        blockDelay: setting.integer("BlockDelay", 0, 0, 1000),
        interactBlock: setting.boolean("InteractBlock", false),
        silentRotation: setting.boolean("SilentRotation", true),
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
        hitBoxHorizontal: setting.float("HitBoxHorizontal", 0.5, 0, 1),
        hitBoxVertical: setting.float("HitBoxVertical", 0.7, 0, 1),
        baseHitBox: setting.boolean("BaseHitBox", true),
        strafe: setting.list("Strafe", ["Off", "Strict", "Silent"], "Off"),
        fov: setting.float("FOV", 255, 0, 255),
        noInvAttack: setting.list("NoInvAttack", ["Off", "Freeze", "Packet"], "Off"),
        noInvDelay: setting.integer("NoInvDelay", 250, 0, 1000),
        onlyFaced: setting.boolean("OnlyFaced", true),
        rotationAnimation: setting.boolean("RotationAnimation", true),
        fixedSensitivity: setting.boolean("FixedSensitivity", false),
        fakeSwing: setting.boolean("FakeSwing", false),
    };

    let targetList = [];
    let switchTargetList = [];
    let primaryTarget;
    let actualTarget;

    let hitable = false;

    const attackTimer = new MSTimer();
    let attackDelay = 0;

    let delayedBlock = false;

    const switchTimer = new MSTimer();
    const noInvTimer = new MSTimer();

    const autoBlock = new AutoBlock();

    let cancelRun = false;

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
    }

    this.onDisable = function () {
        autoBlock.reset();
    }

    this.onUpdate = function () {

        updateCancelRun();

        if (cancelRun) {
            primaryTarget = null;
            autoBlock.reset();
            return;
        }

        if (mc.thePlayer.isRiding()) {
            updateTarget();
        }

        if (targetList.length === 0) {
            autoBlock.reset();
            return;
        }

        autoBlock.checkAndUpdate();

        if (actualTarget == null) {
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
        }

        if (event.getEventState() !== EventState.PRE) {

            if (settings.autoBlock.get() === "Delayed" && delayedBlock) {
                delayedBlock = false;
                autoBlock.checkAndStart();
            }

            if (settings.rotationAnimation.get()) {
                const player = mc.thePlayer;
                const serverRotation = RotationUtils.serverRotation;
                if (serverRotation != null && player.rotationYaw !== serverRotation.getYaw()) {
                    player.renderYawOffset = player.rotationYawHead = serverRotation.getYaw();
                }
            }

            return;
        }

        updateTarget();

    }

    this.onRender2D = function (event) {
        
    }

    this.onRender3D = function (event) {

    }

    this.onPacket = function (event) {

        const packet = event.getPacket();

        if (packet instanceof C03PacketPlayer) {
            updateHitable();
        }

    }

    this.onWorld = function (event) {
        moduleManager.getModule(this.getName()).setState(false);
    }

    this.onStrafe = function (event) {

        if (primaryTarget == null || RotationUtils.targetRotation == null) {
            return;
        }

        switch (settings.strafe.get()) {

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

        // if (targetList.length === 0) {
        //     return;
        // }

        const entityList = mc.theWorld.loadedEntityList;
        const hurtTime = settings.hurtTime.get();
        // const rotationRange = settings.rotationRange.get();
        const maxRange = Math.max(settings.range.get(), settings.blockRange.get());
        const fov = settings.fov.get();
        const switchMode = settings.targetMode.get() === "Switch";

        for (let i = 0; i < entityList.length; ++i) {
            const entity = entityList[i];
            if (getDistanceToEntityBox(entity) < maxRange && RotationUtils.getRotationDifference(entity) < fov && isEnemy(entity) && !(switchMode && switchTargetList.indexOf(entity.getEntityId()) !== -1)) {
                targetList.push(entity);
            }
        }

        if (targetList.length === 0) {
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

        // if (switchMode) {
        //     let target;
        //     let flag = false;
        //     for (let i = 0; i < targetList.length; ++i) {
        //         const entity = targetList[i];
        //         const targetEntity = getAttackEntity(entity);
        //         const distance = getDistanceToEntityBox(targetEntity);
        //         if (!(entity.hurtResistantTime > hurtTime) && distance < rotationRange && updateRotation(targetEntity)) {
        //             if (target == null) {
        //                 target = targetEntity;
        //                 flag = distance < range;
        //             } if (distance < range && primaryTarget === targetEntity) {
        //                 return;
        //             }
        //         }
        //     } if (target != null) {
        //         if (flag) {
        //             primaryTarget = target;
        //         }
        //         updateRotation(target);
        //     }
        // } else {
        //     primaryTarget = null;
        //     let target;
        //     for (let i = 0; i < targetList.length; ++i) {
        //         const entity = targetList[i];
        //         const targetEntity = getAttackEntity(entity);
        //         const distance = getDistanceToEntityBox(targetEntity);
        //         if (!(entity.hurtResistantTime > hurtTime) && distance < rotationRange && updateRotation(targetEntity)) {
        //             if (target == null) {
        //                 target = targetEntity;
        //             } if (distance < range) {
        //                 primaryTarget = targetEntity;
        //                 return;
        //             }
        //         }
        //     } if (target != null) {
        //         updateRotation(target);
        //     }
        // }

        if (switchMode) {
            let target;
            let flag = false;
            for (let i = 0; i < targetList.length; ++i) {
                const entity = targetList[i];
                const targetEntity = getAttackEntity(entity);
                const distance = getDistanceToEntityBox(targetEntity);
                if (!(entity.hurtResistantTime > hurtTime) && distance < range && updateRotation(targetEntity)) {
                    if (target == null) {
                        target = targetEntity;
                        flag = distance < range;
                    } if (distance < range && primaryTarget === targetEntity) {
                        return;
                    }
                }
            } if (flag) {
                primaryTarget = target;
            }
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
        }

        if (switchTargetList.length !== 0) {
            switchTargetList = [];
            updateTarget();
        }

    }

    function updateRotation(entity) {

        if (settings.maxTurnSpeed.get() < 0) {
            return true;
        }

        const size = entity.getCollisionBorderSize();
        const bb = entity.getEntityBoundingBox().expand(size, size, size);

        const range = settings.range.get();
        const throughWallsRange = settings.throughWallsRange.get();

        let rotation = searchCenter(bb, settings.hitBoxHorizontal.get(), settings.hitBoxVertical.get(), range, throughWallsRange);
        if (rotation == null && settings.baseHitBox.get()) {

            rotation = searchCenter(bb, 0.975, 0.975, range, throughWallsRange);
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

        bb = new AxisAlignedBB(
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

        let prevDiff = 0;
        let finalRotation;

        for (let sX = 0.5; sX < 10; ++sX) {
            for (let sY = 0.5; sY < 10; ++sY) {
                for (let sZ = 0.5; sZ < 10; ++sZ) {

                    const vec = new Vec3(bb.minX + (bb.maxX - bb.minX) * sX / 10, bb.minY + (bb.maxY - bb.minY) * sY / 10, bb.minZ + (bb.maxZ - bb.minZ) * sZ / 10);
                    const vecRange = world.rayTraceBlocks(eyes, vec, false, false, false) == null ? range : throughWallsRange;

                    const rotation = RotationUtils.toRotation(vec, false);
                    if (settings.fixedSensitivity.get()) {
                        rotation.fixedSensitivity(gameSettings.mouseSensitivity);
                    }

                    const rotationVec = RotationUtils.getVectorForRotation(rotation);
                    const lookAt = eyes.addVector(rotationVec.xCoord * vecRange, rotationVec.yCoord * vecRange, rotationVec.zCoord * vecRange);
                    if (bb.calculateIntercept(eyes, lookAt) == null) {
                        continue;
                    }

                    const diff = RotationUtils.getRotationDifference(rotation);
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
            RotationUtils.setTargetRotation(limitedRotation, 0);
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

        const range = settings.range.get() + 1;

        if (settings.rayCast.get()) {

            const world = mc.theWorld;
            const livingRayCast = settings.livingRayCast.get();
            const rayCastIgnored = settings.rayCastIgnored.get();
            const intersectsRayCast = settings.intersectsRayCast.get();

            const rayCastEntity = RaycastUtils.raycastEntity(range, function (entity) {
                return (!livingRayCast || entity instanceof EntityLivingBase && (!entity instanceof EntityArmorStand)) && (rayCastIgnored || isEnemy(entity)) && (intersectsRayCast && !world.getEntitiesWithinAABBExcludingEntity(entity, entity.getEntityBoundingBox()).isEmpty());
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
        }

        if (attackTimer.hasTimePassed(attackDelay) && (hitable || settings.fakeSwing.get())) {

            const netHandler = mc.getNetHandler();

            const openInventory = settings.noInvAttack.get() === "Packet";
            if (openInventory) {
                netHandler.addToSendQueue(new C0DPacketCloseWindow());
            }

            const autoBlockMode = settings.autoBlock.get();

            if (autoBlockMode !== "Vanilla") {
                autoBlock.checkAndStop();
            }

            if (hitable) {
                attackEntity(actualTarget);
            } else {
                swingItem();
            }

            if (switchTimer.hasTimePassed(settings.switchDelay.get())) {
                switchTargetList.push(primaryTarget.getEntityId());
            }

            if (autoBlockMode !== "Off" || autoBlock.isPlayerBlocking()) {
                if (autoBlockMode !== "Delayed" || mc.thePlayer.isRiding()) {
                    autoBlock.checkAndStart();
                } else {
                    delayedBlock = true;
                }
            }

            if (openInventory) {
                netHandler.addToSendQueue(new C16PacketClientStatus(C16PacketClientStatus.EnumState.OPEN_INVENTORY_ACHIEVEMENT));
            }

            attackTimer.reset();
            updateAttackDelay();

        }

    }

    function attackEntity(entity) {
        const player = mc.thePlayer;
        const netHandler = mc.getNetHandler();
        LiquidBounce.eventManager.callEvent(new AttackEvent(entity));
        if (settings.swing.get()) {
            swingItem();
        }
        netHandler.addToSendQueue(new C02PacketUseEntity(entity, C02PacketUseEntity.Action.ATTACK));
        if (!settings.keepSprint.get() && mc.playerController.getCurrentGameType() !== WorldSettings.GameType.SPECTATOR) {
            player.attackTargetEntityWithCurrentItem(entity);
        }
    }

    function swingItem() {
        const player = mc.thePlayer;
        player.swingItem();
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

        const yaw = rotation.getYaw();
        const pitch = rotation.getPitch();
        const yawCos = Math.cos(-yaw * 0.017453292 - Math.PI);
        const yawSin = Math.sin(-yaw * 0.017453292 - Math.PI);
        const pitchCos = -Math.cos(-pitch * 0.017453292);
        const pitchSin = Math.sin(-pitch * 0.017453292);
        const lookAt = positionEye.addVector(yawSin * pitchCos * range, pitchSin * range, yawCos * pitchCos * range);

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

                const movingObject = rayCastEntity(
                    entity,
                    Math.min(settings.range.get(), getDistanceToEntityBox(entity)) + 1,
                    RotationUtils.targetRotation || new Rotation(player.rotationYaw, player.rotationPitch)
                );

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

