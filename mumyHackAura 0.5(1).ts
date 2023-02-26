import Color = JVM.java$.awt$.Color;
import File = JVM.java$.io$.File;
import JavaBoolean = JVM.java$.lang$.Boolean;
import JavaFloat = JVM.java$.lang$.Float;
import JavaInteger = JVM.java$.lang$.Integer;
import JavaLong = JVM.java$.lang$.Long;
import JavaString = JVM.java$.lang$.String;
import System = JVM.java$.lang$.System;
import Thread = JVM.java$.lang$.Thread;
import StandardCharsets = JVM.java$.nio$.charset$.StandardCharsets;
import Files = JVM.java$.nio$.file$.Files;
import Paths = JVM.java$.nio$.file$.Paths;
import StandardOpenOption = JVM.java$.nio$.file$.StandardOpenOption;
import ArrayList = JVM.java$.util$.ArrayList;
import HashSet = JVM.java$.util$.HashSet;
import StringJoiner = JVM.java$.util$.StringJoiner;
import LiquidBounce = JVM.net$.ccbluex$.liquidbounce$.LiquidBounce;
import AttackEvent = JVM.net$.ccbluex$.liquidbounce$.event$.AttackEvent;
import EventState = JVM.net$.ccbluex$.liquidbounce$.event$.EventState;
import MotionEvent = JVM.net$.ccbluex$.liquidbounce$.event$.MotionEvent;
import PacketEvent = JVM.net$.ccbluex$.liquidbounce$.event$.PacketEvent;
import Render3DEvent = JVM.net$.ccbluex$.liquidbounce$.event$.Render3DEvent;
import WorldEvent = JVM.net$.ccbluex$.liquidbounce$.event$.WorldEvent;
import Command = JVM.net$.ccbluex$.liquidbounce$.features$.command$.Command;
import Module = JVM.net$.ccbluex$.liquidbounce$.features$.module$.Module;
import NoFriends = JVM.net$.ccbluex$.liquidbounce$.features$.module$.modules$.combat$.NoFriends;
import AntiBot = JVM.net$.ccbluex$.liquidbounce$.features$.module$.modules$.misc$.AntiBot;
import Teams = JVM.net$.ccbluex$.liquidbounce$.features$.module$.modules$.misc$.Teams;
import Script = JVM.net$.ccbluex$.liquidbounce$.script$.Script;
import ScriptModule = JVM.net$.ccbluex$.liquidbounce$.script$.api$.ScriptModule;
import EntityUtils = JVM.net$.ccbluex$.liquidbounce$.utils$.EntityUtils;
import Rotation = JVM.net$.ccbluex$.liquidbounce$.utils$.Rotation;
import RotationUtils = JVM.net$.ccbluex$.liquidbounce$.utils$.RotationUtils;
import ColorUtils = JVM.net$.ccbluex$.liquidbounce$.utils$.render$.ColorUtils;
import RenderUtils = JVM.net$.ccbluex$.liquidbounce$.utils$.render$.RenderUtils;
import MSTimer = JVM.net$.ccbluex$.liquidbounce$.utils$.timer$.MSTimer;
import BoolValue = JVM.net$.ccbluex$.liquidbounce$.value$.BoolValue;
import FloatValue = JVM.net$.ccbluex$.liquidbounce$.value$.FloatValue;
import IntegerValue = JVM.net$.ccbluex$.liquidbounce$.value$.IntegerValue;
import ListValue = JVM.net$.ccbluex$.liquidbounce$.value$.ListValue;
import TextValue = JVM.net$.ccbluex$.liquidbounce$.value$.TextValue;
import Block = JVM.net$.minecraft$.block$.Block;
import BlockCarpet = JVM.net$.minecraft$.block$.BlockCarpet;
import BlockDoor = JVM.net$.minecraft$.block$.BlockDoor;
import BlockFence = JVM.net$.minecraft$.block$.BlockFence;
import BlockFenceGate = JVM.net$.minecraft$.block$.BlockFenceGate;
import BlockLadder = JVM.net$.minecraft$.block$.BlockLadder;
import BlockLiquid = JVM.net$.minecraft$.block$.BlockLiquid;
import BlockSnow = JVM.net$.minecraft$.block$.BlockSnow;
import BlockStaticLiquid = JVM.net$.minecraft$.block$.BlockStaticLiquid;
import BlockTrapDoor = JVM.net$.minecraft$.block$.BlockTrapDoor;
import BlockWall = JVM.net$.minecraft$.block$.BlockWall;
import BlockWeb = JVM.net$.minecraft$.block$.BlockWeb;
import Material = JVM.net$.minecraft$.block$.material$.Material;
import GlStateManager = JVM.net$.minecraft$.client$.renderer$.GlStateManager;
import ItemRenderer = JVM.net$.minecraft$.client$.renderer$.ItemRenderer;
import GameSettings = JVM.net$.minecraft$.client$.settings$.GameSettings;
import KeyBinding = JVM.net$.minecraft$.client$.settings$.KeyBinding;
import Entity = JVM.net$.minecraft$.entity$.Entity;
import EntityLivingBase = JVM.net$.minecraft$.entity$.EntityLivingBase;
import EntityDragon = JVM.net$.minecraft$.entity$.boss$.EntityDragon;
import EntityGhast = JVM.net$.minecraft$.entity$.monster$.EntityGhast;
import EntityGolem = JVM.net$.minecraft$.entity$.monster$.EntityGolem;
import EntityMob = JVM.net$.minecraft$.entity$.monster$.EntityMob;
import EntitySlime = JVM.net$.minecraft$.entity$.monster$.EntitySlime;
import EntityAnimal = JVM.net$.minecraft$.entity$.passive$.EntityAnimal;
import EntityBat = JVM.net$.minecraft$.entity$.passive$.EntityBat;
import EntitySquid = JVM.net$.minecraft$.entity$.passive$.EntitySquid;
import EntityVillager = JVM.net$.minecraft$.entity$.passive$.EntityVillager;
import EntityPlayer = JVM.net$.minecraft$.entity$.player$.EntityPlayer;
import EntityLargeFireball = JVM.net$.minecraft$.entity$.projectile$.EntityLargeFireball;
import ItemSword = JVM.net$.minecraft$.item$.ItemSword;
import C02PacketUseEntity = JVM.net$.minecraft$.network$.play$.client$.C02PacketUseEntity;
import C04PacketPlayerPosition = JVM.net$.minecraft$.network$.play$.client$.C03PacketPlayer$C04PacketPlayerPosition;
import C03PacketPlayer = JVM.net$.minecraft$.network$.play$.client$.C03PacketPlayer;
import C07PacketPlayerDigging = JVM.net$.minecraft$.network$.play$.client$.C07PacketPlayerDigging;
import C08PacketPlayerBlockPlacement = JVM.net$.minecraft$.network$.play$.client$.C08PacketPlayerBlockPlacement;
import S03PacketTimeUpdate = JVM.net$.minecraft$.network$.play$.server$.S03PacketTimeUpdate;
import S14PacketEntity = JVM.net$.minecraft$.network$.play$.server$.S14PacketEntity;
import AxisAlignedBB = JVM.net$.minecraft$.util$.AxisAlignedBB;
import MutableBlockPos = JVM.net$.minecraft$.util$.BlockPos$MutableBlockPos;
import BlockPos = JVM.net$.minecraft$.util$.BlockPos;
import EnumFacing = JVM.net$.minecraft$.util$.EnumFacing;
import Vec3 = JVM.net$.minecraft$.util$.Vec3;
import GL11 = JVM.org$.lwjgl$.opengl$.GL11;

const scriptName = "mumyHackAura";
const scriptVersion = 0.5;
const scriptAuthor = "mumy++";

class mumyHackAura {

    private readonly setting = {
        float: (name: string, def: number, min: number, max: number, object: object = {}) => {
            return new _AdaptedValue<number, JavaFloat>(new (Java.extend(FloatValue, object))(name, def, min, max));
        },
        integer: (name: string, def: number, min: number, max: number, object: object = {}) => {
            return new _AdaptedValue<number, JavaInteger>(new (Java.extend(IntegerValue, object))(name, def, min, max));
        },
        boolean: (name: string, def: boolean, object: object = {}) => {
            return new _AdaptedValue<boolean, JavaBoolean>(new (Java.extend(BoolValue, object))(name, def));
        },
        list: (name: string, values: string[], def: string, object: object = {}) => {
            return new _AdaptedValue<string, JavaString>(new (Java.extend(ListValue, object))(name, values, def));
        },
        text: (name: string, def: string, object: object = {}) => {
            return new _AdaptedValue<string, JavaString>(new (Java.extend(TextValue, object))(name, def));
        }
    };

    private readonly settings = {
        maxDelay: this.setting.float("MaxDelay", 80, 0, 1000, {
            onChanged: (oldValue: number, newValue: number) => {
                const v = this.settings.minDelay.get();
                if (newValue < v) {
                    this.settings.maxDelay.set(v);
                }
            }
        }),
        minDelay: this.setting.float("MinDelay", 50, 0, 1000, {
            onChanged: (oldValue: number, newValue: number) => {
                const v = this.settings.maxDelay.get();
                if (newValue > v) {
                    this.settings.minDelay.set(v);
                }
            }
        }),
        hurtTime: this.setting.integer("HurtTime", 20, 0, 20),
        range: this.setting.float("Range", 6, 0, 128, {
            onChanged: (oldValue: number, newValue: number) => {
                const v = Math.min(this.settings.throughWallsRange.get(), this.settings.noTeleportRange.get());
                const v2 = this.settings.blockRange.get();
                if (newValue < v) {
                    this.settings.range.set(v);
                } if (newValue > v2) {
                    this.settings.range.set(v2);
                }
            }
        }),
        blockRange: this.setting.float("BlockRange", 8, 0, 128, {
            onChanged: (oldValue: number, newValue: number) => {
                const v = this.settings.range.get();
                if (newValue < v) {
                    this.settings.blockRange.set(v);
                }
            }
        }),
        throughWallsRange: this.setting.float("ThroughWallsRange", 3, 0, 128, {
            onChanged: (oldValue: number, newValue: number) => {
                const v = this.settings.range.get();
                if (newValue > v) {
                    this.settings.throughWallsRange.set(v);
                }
            }
        }),
        targetMode: this.setting.list("TargetMode", ["Single", "Switch", "Multi"], "Single"),
        priority: this.setting.list("Priority", ["Armor", "Direction", "Distance", "Health", "HurtTime", "LivingTime"], "HurtTime"),
        limitedTargets: this.setting.integer("LimitedTargets", 3, 0, 100),
        switchDelay: this.setting.integer("SwitchDelay", 500, 0, 1000),
        attackTiming: this.setting.integer("AttackTiming", 2, 1, 15),
        attackPackets: this.setting.integer("AttackPackets", 1, 1, 50),
        autoBlock: this.setting.list("AutoBlock", ["Off", "Vanilla", "Packet"], "Packet"),
        predictSize: this.setting.float("PredictSize", 1, 0, 5),
        limitedPredictPing: this.setting.integer("LimitedPredictPing", 200, 0, 1000),
        referencePredictPing: this.setting.float("ReferencePredictPing", 50, 0, 1000),
        limitedNetworkPing: this.setting.integer("LimitedNetworkPing", 150, 0, 1000),
        teleportDelay: this.setting.integer("TeleportDelay", 0, 0, 500),
        noTeleportRange: this.setting.float("NoTeleportRange", 0, 0, 128, {
            onChanged: (oldValue: number, newValue: number) => {
                const v = this.settings.range.get();
                if (newValue > v) {
                    this.settings.noTeleportRange.set(v);
                }
            }
        }),
        packetsDistance: this.setting.float("PacketsDistance", 4, 0, 10),
        teleportVClip: this.setting.boolean("TeleportVClip", false),
        teleportHClip: this.setting.boolean("TeleportHClip", false),
        teleportCriticals: this.setting.boolean("TeleportCriticals", false),
        spoofGround: this.setting.boolean("SpoofGround", false),
        returnTrip: this.setting.boolean("ReturnTrip", true),
        renderPath: this.setting.boolean("RenderPath", true),
        hitFireball: this.setting.boolean("HitFireball", false),
        rotation: this.setting.list("Rotation", ["Off", "Angle", "Distance"], "Angle"),
        hitBoxHorizontally: this.setting.float("HitBoxHorizontally", 1, 0, 1),
        hitBoxVertically: this.setting.float("HitBoxVertically", 1, 0, 1),
        silentRotation: this.setting.boolean("SilentRotation", true),
        rotationAnimation: this.setting.boolean("RotationAnimation", true)
    };

    private readonly prevTargetSet = new HashSet<JavaInteger>();
    private targetList: Entity[] = [];
    private target: Entity | null = null;

    private readonly switchTimer = new MSTimer();

    private readonly attackTimer = new mumyHackAura.NanoTimer();
    private attackDelay = 0;

    private readonly serverPacketsTimer = new MSTimer();

    private readonly teleportTimer = new MSTimer();
    private renderPath: typeof mumyHackAura.FindPath.Pos.prototype[] = [];

    private readonly waitStateColor = new Color(126, 126, 126, 70);
    private readonly attackStateColor = new Color(37, 126, 255, 70);
    private readonly pathColor = new Color(0, 127, 255);

    private readonly autoBlock = new mumyHackAura.AutoBlock();

    public readonly valuesContainer = new mumyHackAura.ValuesContainer();

    public getName() {
        return "mumyHackAura";
    }

    public getDescription() {
        return "mumyHackAura-Module, By-mumy";
    }

    public getCategory() {
        return "Misc";
    }

    public onEnable() {
        this.prevTargetSet.clear();
        this.targetList = [];
        this.target = null;
        this.renderPath = [];
    }

    public onDisable() {
        this.autoBlock.reset();
        this.onEnable();
    }

    public onUpdate() {
        const riding = mc.thePlayer!.isRiding();
        if (riding) {
            this.update();
        } if (riding || (this.settings.attackTiming.get() & 4) !== 0) {
            this.runAttack();
        }
    }

    public onMotion(event: MotionEvent) {
        const eventState = event.getEventState();
        if (eventState === EventState.PRE) {
            this.update();
        } if ((this.settings.attackTiming.get() & (eventState === EventState.PRE ? 1 : 2)) !== 0) {
            this.runAttack();
        }
    }

    public onRender3D(event: Render3DEvent) {
        if ((this.settings.attackTiming.get() & 8) !== 0) {
            this.runAttack();
        } if (this.targetList.length !== 0) {
            if (this.settings.targetMode.get() === "Multi") {
                let count = 0;
                const limit = this.settings.limitedTargets.get();
                const range = this.settings.range.get();
                const hurtTime = this.settings.hurtTime.get();
                for (let entity of this.targetList) {
                    RenderUtils.drawPlatform(entity, !(entity.hurtResistantTime > hurtTime) && this.getDistanceToHitEntity(entity) < range && !(limit > 0 && ++count > limit) ? this.attackStateColor : this.waitStateColor);
                }
            } else {
                for (let entity of this.targetList) {
                    RenderUtils.drawPlatform(entity, entity === this.target && !(entity.hurtResistantTime > this.settings.hurtTime.get()) ? this.attackStateColor : this.waitStateColor);
                }
            }
        } if (!this.teleportTimer.hasTimePassed(500) && this.settings.renderPath.get()) {
            for (let pos of this.renderPath) {
                this.drawBox(pos.x, pos.y, pos.z, this.pathColor);
            }
        }
    }

    public onPacket(event: PacketEvent) {
        const packet = event.getPacket();
        if (packet instanceof S14PacketEntity) {
            this.serverPacketsTimer.reset();
        } else if (packet instanceof C03PacketPlayer && this.settings.rotationAnimation.get()) {
            const player = mc.thePlayer!;
            const rotationYaw = RotationUtils.serverRotation?.getYaw() ?? 0;
            if (rotationYaw !== player.rotationYaw) {
                player.rotationYawHead = rotationYaw;
            }
        }
    }

    public onWorld(event: WorldEvent) {
        moduleManager.getModule(this.getName())!.setState(false);
    }

    public addValues(values: _ValueAdapter) {
        const settings = <{ [key: string]: _AdaptedValue<unknown, unknown> }>this.settings;
        this.valuesContainer.init(settings);
        for (let i in settings) {
            values.add(settings[i]);
        }
    }

    private update() {
        this.updateTarget();
        if (this.targetList.length === 0) {
            this.autoBlock.reset();
            return;
        } if (this.target == null && this.settings.autoBlock.get() !== "Off") {
            this.autoBlock.checkAndStart();
        }
        this.autoBlock.checkAndUpdate();
    }

    private updateTarget() {
        const prevTarget = this.target;
        this.targetList = [];
        this.target = null;
        const limitedTargets = this.settings.limitedTargets.get();
        if (limitedTargets > 0 && !(this.prevTargetSet.size() < limitedTargets)) {
            this.prevTargetSet.clear();
        }
        const limitedNetworkPing = this.settings.limitedNetworkPing.get();
        if (limitedNetworkPing > 0 && this.serverPacketsTimer.hasTimePassed(limitedNetworkPing)) {
            return;
        }
        const player = mc.thePlayer!;
        const entityList = <Entity[]>Java.from(mc.theWorld!.loadedEntityList);
        const switchMode = this.settings.targetMode.get() === "Switch";
        const hurtTime = this.settings.hurtTime.get();
        const attackRange = this.getAttackRange();
        const blockRange = this.settings.blockRange.get();
        const throughWallsRange = this.settings.throughWallsRange.get();
        const maxRange = Math.max(attackRange, blockRange);
        for (let entity of entityList) {
            if (this.isEnemy(entity) && !(switchMode && this.prevTargetSet.contains(JavaInteger.valueOf(entity.getEntityId()))) && this.getDistanceToHitEntity(entity) < (player.canEntityBeSeen(entity) ? maxRange : throughWallsRange)) {
                this.targetList.push(entity);
            }
        } if (this.targetList.length === 0) {
            if (switchMode && !this.prevTargetSet.isEmpty()) {
                this.prevTargetSet.clear();
                this.updateTarget();
            }
            return;
        }
        this.targetList.sort((a, b) => this.getDistanceToHitEntity(a) - this.getDistanceToHitEntity(b));
        switch (this.settings.priority.get()) {
            case "Armor":
                this.targetList.sort((a, b) => a instanceof EntityLivingBase && b instanceof EntityLivingBase ? a.getTotalArmorValue() - b.getTotalArmorValue() : 0);
                break;
            case "Direction":
                this.targetList.sort((a, b) => RotationUtils.getRotationDifference(a) - RotationUtils.getRotationDifference(b));
                break;
            case "Health":
                this.targetList.sort((a, b) => a instanceof EntityLivingBase && b instanceof EntityLivingBase ? a.getHealth() - b.getHealth() : 0);
                break;
            case "HurtTime":
                this.targetList.sort((a, b) => a.hurtResistantTime - b.hurtResistantTime);
                break;
            case "LivingTime":
                this.targetList.sort((a, b) => b.ticksExisted - a.ticksExisted);
                break;
        } if (switchMode && prevTarget != null && this.targetList.indexOf(prevTarget) !== -1 && this.getDistanceToHitEntity(prevTarget) < attackRange) {
            this.target = prevTarget;
            this.updateRotation(this.getHitEntity(prevTarget));
            return;
        } for (let ignoreHurtTime = false;;) {
            for (let entity of this.targetList) {
                if ((ignoreHurtTime || !(entity.hurtResistantTime > hurtTime)) && this.getDistanceToHitEntity(entity) < attackRange) {
                    this.target = entity;
                    this.updateRotation(this.getHitEntity(entity));
                    return;
                }
            } if (ignoreHurtTime) {
                break;
            }
            ignoreHurtTime = true;
        } if (switchMode && !this.prevTargetSet.isEmpty()) {
            this.prevTargetSet.clear();
            this.updateTarget();
        }
    }

    private isEnemy(entity: Entity) {

        if (entity instanceof EntityLargeFireball && this.settings.hitFireball.get()) {
            return true;
        } if (entity instanceof EntityLivingBase && (EntityUtils.targetDead || entity.isEntityAlive() && entity.getHealth() > 0) && entity !== mc.thePlayer) {
            if (!EntityUtils.targetInvisible && entity.isInvisible()) {
                return false;
            } if (EntityUtils.targetPlayer && entity instanceof EntityPlayer) {
                if (entity.isSpectator() || AntiBot.isBot(entity)) {
                    return false;
                } if (isFriend(entity) && !LiquidBounce.moduleManager!.getModule(NoFriends.class)!.getState()) {
                    return false;
                }
                const teams = <Teams>LiquidBounce.moduleManager!.getModule(Teams.class);
                return !teams.getState() || !teams.isInYourTeam(entity);
            }
            return EntityUtils.targetMobs && isMob(entity) || EntityUtils.targetAnimals && isAnimal(entity);
        }
        return false;

        function isAnimal(entity: Entity) {
            return entity instanceof EntityAnimal || entity instanceof EntitySquid || entity instanceof EntityGolem || entity instanceof EntityBat;
        }

        function isFriend(entity: Entity) {
            return entity instanceof EntityPlayer && entity.getName() != null && LiquidBounce.fileManager!.friendsConfig!.isFriend(ColorUtils.stripColor(entity.getName()));
        }

        function isMob(entity: Entity) {
            return entity instanceof EntityMob || entity instanceof EntityVillager || entity instanceof EntitySlime || entity instanceof EntityGhast || entity instanceof EntityDragon;
        }

    }

    private runAttack() {
        if (this.target == null || !this.attackTimer.hasTimePassed(this.attackDelay) || this.target.hurtResistantTime > this.settings.hurtTime.get()) {
            return;
        } if (this.settings.autoBlock.get() !== "Vanilla") {
            this.autoBlock.checkAndStop();
        }
        const mode = this.settings.targetMode.get();
        if (mode === "Multi") {
            let count = 0;
            const limit = this.settings.limitedTargets.get();
            const attackRange = this.getAttackRange();
            const hurtTime = this.settings.hurtTime.get();
            for (let entity of this.targetList) {
                if (!(entity.hurtResistantTime > hurtTime) && this.getDistanceToHitEntity(entity) < attackRange) {
                    if (this.attackEntity(entity)) {
                        ++count;
                    } if (limit > 0 && !(count < limit)) {
                        break;
                    }
                }
            }
        } else {
            const attackRange = this.getAttackRange();
            const hurtTime = this.settings.hurtTime.get();
            for (let entity of this.targetList) {
                if (!(entity.hurtResistantTime > hurtTime) && this.getDistanceToHitEntity(entity) < attackRange) {
                    if (this.attackEntity(entity)) {
                        this.target = entity;
                        if (mode === "Switch" && this.switchTimer.hasTimePassed(this.settings.switchDelay.get())) {
                            this.prevTargetSet.add(JavaInteger.valueOf(entity.getEntityId()));
                            this.switchTimer.reset();
                        }
                        break;
                    }
                }
            }
        } if (this.settings.autoBlock.get() !== "Off" || this.autoBlock.isPlayerBlocking()) {
            this.autoBlock.checkAndStart();
        }
        this.attackTimer.reset();
        const maxDelay = this.settings.maxDelay.get();
        const minDelay = this.settings.minDelay.get();
        this.attackDelay = 1000000 * (minDelay + (maxDelay - minDelay) * Math.random()); //2023.2.2[start]: 100days~
    }

    private attackEntity(entity: Entity) {
        const player = mc.thePlayer!;
        const netHandler = mc.getNetHandler()!;
        const hitEntity = this.getHitEntity(entity);
        const noTeleportRange = this.settings.noTeleportRange.get();
        const spoofGround = this.settings.spoofGround.get();
        const teleport = noTeleportRange > 0 && this.getDistanceToEntity(hitEntity) > noTeleportRange;
        let teleportPath = <typeof mumyHackAura.FindPath.Pos.prototype[]>[];
        if (teleport) {
            teleportPath = new mumyHackAura.FindPath(hitEntity, new mumyHackAura.FindPath.Pos(Math.floor(player.posX), Math.floor(player.posY), Math.floor(player.posZ)), new mumyHackAura.FindPath.DynamicPos(() => Math.floor(hitEntity.posX), () => Math.floor(hitEntity.posY), () => Math.floor(hitEntity.posZ)), this.settings.throughWallsRange.get(), 1024, this.settings.packetsDistance.get(), this.settings.teleportVClip.get(), this.settings.teleportHClip.get()).getPath() ?? [];
            if (teleportPath.length < 1) {
                return false;
            }
            this.teleportTimer.reset();
            for (let pos of this.renderPath = mumyHackAura.FindPath.Utils.simplifyPath(teleportPath, this.settings.packetsDistance.get())) {
                netHandler.addToSendQueue(new C04PacketPlayerPosition(pos.x + 0.5, pos.y + 0.0626, pos.z + 0.5, spoofGround));
            }
        }
        LiquidBounce.eventManager!.callEvent(new AttackEvent(entity));
        if (teleport && this.settings.teleportCriticals.get()) {
            const { x, y, z } = teleportPath[teleportPath.length - 1];
            for (let offestY of [0.0626, 0, 0.0125, 0]) {
                netHandler.addToSendQueue(new C04PacketPlayerPosition(x + 0.5, y + 0.0626 + offestY, z + 0.5, false));
            }
        }
        player.swingItem();
        const packets = this.settings.attackPackets.get();
        for (let i = 0; i < packets; ++i) {
            netHandler.addToSendQueue(new C02PacketUseEntity(hitEntity, C02PacketUseEntity.Action.ATTACK));
        } if (teleport && teleportPath.length > 0) {
            if (!this.settings.returnTrip.get()) {
                const { x, y, z } = teleportPath[teleportPath.length - 1];
                player.setPositionAndUpdate(x + 0.5, y + 0.0626, z + 0.5);
            } else {
                for (let pos of mumyHackAura.FindPath.Utils.simplifyPath(teleportPath.reverse(), this.settings.packetsDistance.get())) {
                    netHandler.addToSendQueue(new C04PacketPlayerPosition(pos.x + 0.5, pos.y + 0.0626, pos.z + 0.5, spoofGround));
                }
                netHandler.addToSendQueue(new C04PacketPlayerPosition(player.posX, player.posY, player.posZ, player.onGround));
            }
        }
        return true;
    }

    private getHitEntity(entity: Entity) {
        if (entity instanceof EntityDragon) {
            let lastEntity = <Entity | null>null;
            let lastDistance = 0;
            for (let part of entity.getParts()!) {
                const distance = this.getDistanceToEntity(part);
                if (lastEntity == null || distance < lastDistance) {
                    lastEntity = part;
                    lastDistance = distance;
                }
            } if (lastEntity != null) {
                return lastEntity;
            }
        }
        return entity;
    }

    private updateRotation(entity: Entity) {
        if (this.settings.rotation.get() === "Off") {
            return;
        }
        const collisionBorderSize = entity.getCollisionBorderSize() * 0.95;
        let bb = entity.getEntityBoundingBox()!.expand(collisionBorderSize, collisionBorderSize, collisionBorderSize)!;
        const horizontally = Math.max(0, Math.min(this.settings.hitBoxHorizontally.get(), 1));
        const vertically = Math.max(0, Math.min(this.settings.hitBoxVertically.get(), 1));
        if (horizontally !== 1 || vertically !== 1) {
            const [xHalf, yHalf, zHalf] = [(bb.maxX - bb.minX) / 2, (bb.maxY - bb.minY) / 2, (bb.maxZ - bb.minZ) / 2];
            const yCenter = (bb.maxY + bb.minY) / 2;
            bb = new AxisAlignedBB(entity.posX - xHalf * horizontally, yCenter - yHalf * vertically, entity.posZ - zHalf * horizontally, entity.posX + xHalf * horizontally, yCenter + yHalf * vertically, entity.posZ + zHalf * horizontally);
        }
        let finalRotation = <Rotation | null>null;
        switch (this.settings.rotation.get()) {
            case "Angle": {
                let lastDifference = 0;
                for (let sX = 0; sX < 8; ++sX) {
                    for (let sY = 0; sY < 10; ++sY) {
                        for (let sZ = 0; sZ < 8; ++sZ) {
                            const vec = new Vec3(bb.minX + (bb.maxX - bb.minX) * sX / 7, bb.minY + (bb.maxY - bb.minY) * sY / 9, bb.minZ + (bb.maxZ - bb.minZ) * sZ / 7);
                            const rotation = RotationUtils.toRotation(vec, false)!;
                            const difference = RotationUtils.getRotationDifference(rotation);
                            if (finalRotation == null || difference < lastDifference) {
                                finalRotation = rotation;
                                lastDifference = difference;
                            }
                        }
                    }
                }
                break;
            }
            case "Distance": {
                const player = mc.thePlayer!;
                let [xCenter, yCenter, zCenter] = [Math.max(bb.minX, Math.min(player.posX, bb.maxX)), Math.max(bb.minY, Math.min(player.posY + player.getEyeHeight(), bb.maxY)), Math.max(bb.minZ, Math.min(player.posZ, bb.maxZ))];
                if (xCenter === player.posX && zCenter === player.posZ) {
                    xCenter = entity.posX;
                    zCenter = entity.posZ;
                }
                finalRotation = RotationUtils.toRotation(new Vec3(xCenter, yCenter, zCenter), false)!;
                break;
            }
        } if (finalRotation != null) {
            this.smoothRotation(finalRotation);
        }
    }

    private smoothRotation(rotation: Rotation) {
        const mouseSensitivity = mc.gameSettings!.mouseSensitivity;
        const limitedRotation = RotationUtils.limitAngleChange(RotationUtils.serverRotation, rotation, 180)!;
        mc.gameSettings!.mouseSensitivity = -0.33333329;
        if (this.settings.silentRotation.get()) {
            RotationUtils.setTargetRotation(limitedRotation, 0);
        } else {
            limitedRotation.toPlayer(mc.thePlayer);
        }
        mc.gameSettings!.mouseSensitivity = mouseSensitivity;
    }

    private getDistanceToEntity(entity: Entity) {
        const player = mc.thePlayer!;
        const { posX: playerPosX, posY: playerPosY, posZ: playerPosZ } = player;
        const { posX: entityPosX, posY: entityPosY, posZ: entityPosZ } = entity;
        const { prevPosX: playerPrevPosX, prevPosY: playerPrevPosY, prevPosZ: playerPrevPosZ } = player;
        const { prevPosX: entityPrevPosX, prevPosY: entityPrevPosY, prevPosZ: entityPrevPosZ } = entity;
        const predictValue = Math.max(0, this.settings.predictSize.get() / 2);
        let playerPredictValue = predictValue;
        let entityPredictValue = predictValue;
        const referencePredictPing = this.settings.referencePredictPing.get();
        if (referencePredictPing > 0) {
            const playerPing = Math.max(0, Math.min(mc.getNetHandler()!.getPlayerInfo(player.getUniqueID())?.getResponseTime() ?? 0, this.settings.limitedPredictPing.get()));
            if (playerPing > 0) {
                playerPredictValue *= playerPing / referencePredictPing;
            } if (entity instanceof EntityPlayer) {
                const entityPing = Math.max(0, Math.min(mc.getNetHandler()!.getPlayerInfo(entity.getUniqueID())?.getResponseTime() ?? 0, this.settings.limitedPredictPing.get()));
                if (entityPing > 0) {
                    entityPredictValue *= entityPing / referencePredictPing;
                }
            }
        }
        const playerMoveVec = new Vec3(playerPosX - playerPrevPosX, playerPosY - playerPrevPosY, playerPosZ - playerPrevPosZ);
        const entityMoveVec = new Vec3(entityPosX - entityPrevPosX, entityPosY - entityPrevPosY, entityPosZ - entityPrevPosZ);
        const playerMoveSpeed = Math.sqrt(playerMoveVec.xCoord ** 2 + playerMoveVec.yCoord ** 2 + playerMoveVec.zCoord ** 2) * playerPredictValue;
        const entityMoveSpeed = Math.sqrt(entityMoveVec.xCoord ** 2 + entityMoveVec.yCoord ** 2 + entityMoveVec.zCoord ** 2) * entityPredictValue;
        const playerPredictVec = new Vec3(player.posX + playerMoveVec.xCoord * playerPredictValue, player.posY + playerMoveVec.yCoord * playerPredictValue, player.posZ + playerMoveVec.zCoord * playerPredictValue);
        const entityPredictVec = new Vec3(entity.posX + entityMoveVec.xCoord * entityPredictValue, entity.posY + entityMoveVec.yCoord * entityPredictValue, entity.posZ + entityMoveVec.zCoord * entityPredictValue);
        const predictDistance = Math.sqrt((entityPredictVec.xCoord - playerPredictVec.xCoord) ** 2 + (entityPredictVec.yCoord - playerPredictVec.yCoord) ** 2 + (entityPredictVec.zCoord - playerPredictVec.zCoord) ** 2);
        return Math.max(0, predictDistance - entityMoveSpeed - playerMoveSpeed);
    }

    private getDistanceToHitEntity(entity: Entity) {
        const hitEntity = this.getHitEntity(entity);
        return this.getDistanceToEntity(hitEntity);
    }

    private getAttackRange() {
        const noTeleportRange = this.settings.noTeleportRange.get();
        return !(noTeleportRange > 0) || this.teleportTimer.hasTimePassed(this.settings.teleportDelay.get()) ? this.settings.range.get() : noTeleportRange;
    }

    private drawBox(x: number, y: number, z: number, color: Color) {
        const renderManager = mc.getRenderManager()!;
        GL11.glBlendFunc(GL11.GL_SRC_ALPHA, GL11.GL_ONE_MINUS_SRC_ALPHA);
        RenderUtils.enableGlCap(GL11.GL_BLEND);
        RenderUtils.disableGlCap(GL11.GL_TEXTURE_2D, GL11.GL_DEPTH_TEST);
        GL11.glDepthMask(false);
        RenderUtils.glColor(color.getRed(), color.getGreen(), color.getBlue(), 26);
        const { renderPosX, renderPosY, renderPosZ } = renderManager;
        const axisAlignedBB = new AxisAlignedBB(x - renderPosX,
            y - renderPosY,
            z - renderPosZ,
            x + 1 - renderPosX,
            y + 1 - renderPosY,
            z + 1 - renderPosZ);
        RenderUtils.drawFilledBox(axisAlignedBB);
        GL11.glLineWidth(1);
        RenderUtils.enableGlCap(GL11.GL_LINE_SMOOTH);
        RenderUtils.glColor(color.getRed(), color.getGreen(), color.getBlue(), 95);
        RenderUtils.drawSelectionBoundingBox(axisAlignedBB);
        GlStateManager.resetColor();
        GL11.glDepthMask(true);
        RenderUtils.resetCaps();
    }

    public static AutoBlock = class AutoBlock {

        private static readonly blockPos = new BlockPos(-1, -1, -1);
        public change = false;
        public status = false;

        public start() {
            this.change = true;
            this.status = true;
            const player = mc.thePlayer!;
            player.setItemInUse(player.inventory!.getCurrentItem(), 51213);
            mc.getNetHandler()!.addToSendQueue(new C08PacketPlayerBlockPlacement(AutoBlock.blockPos, 255, player.inventory?.getCurrentItem(), 0, 0, 0));
            KeyBinding.setKeyBindState(mc.gameSettings!.keyBindUseItem!.getKeyCode(), true);
        }

        public stop() {
            this.change = true;
            this.status = false;
            mc.getNetHandler()!.addToSendQueue(new C07PacketPlayerDigging(C07PacketPlayerDigging.Action.RELEASE_USE_ITEM, AutoBlock.blockPos, EnumFacing.DOWN));
            mc.thePlayer!.stopUsingItem();
            KeyBinding.setKeyBindState(mc.gameSettings!.keyBindUseItem!.getKeyCode(), false);
        }

        public checkAndStart() {
            if (!mc.thePlayer!.isBlocking() && AutoBlock.itemIsSword()) {
                this.start();
            }
        }

        public checkAndStop() {
            if (mc.thePlayer!.isBlocking()) {
                this.stop();
            }
        }

        public checkAndUpdate() {
            if (this.status && !AutoBlock.itemIsSword() && !GameSettings.isKeyDown(mc.gameSettings!.keyBindUseItem)) {
                this.stop();
            }
        }

        public reset() {
            if (this.change && this.status && !GameSettings.isKeyDown(mc.gameSettings!.keyBindUseItem)) {
                this.checkAndStop();
            }
        }

        public isPlayerBlocking() {
            return GameSettings.isKeyDown(mc.gameSettings!.keyBindUseItem) && AutoBlock.itemIsSword();
        }

        private static itemIsSword() {
            return mc.thePlayer?.getHeldItem()?.getItem() instanceof ItemSword;
        }

    }

    public static ValuesContainer = class ValuesContainer {

        public readonly command = new ValuesContainer.Command(this);

        private static readonly directory = new File(LiquidBounce.fileManager!.dir, `scripts\\lib\\mumyScript\\${scriptName} ${scriptVersion}`);
        private static readonly jsonFile = new File(ValuesContainer.directory, `values.json`);
        private static readonly containers = ["C0", "C1", "C2", "C3"];
        private defaultValues = <{ [key: string]: unknown }>{};
        private settingsObject = <{ [key: string]: _AdaptedValue<unknown, unknown> | null }>{};
        private containerSetting = this.createContainerSetting();

        public init(settingsObject: { [key: string]: _AdaptedValue<unknown, unknown> | null }) {
            for (let setting in settingsObject) {
                this.defaultValues[setting] = settingsObject[setting]!.get();
            }
            this.settingsObject = settingsObject;
            this.settingsObject.container = this.containerSetting;
        }

        public createOverrideObject(object: any) {
            if (object == null) {
                return {
                    onChanged: this.onSettingChanged
                };
            } if (typeof object.onChanged === "function") {
                object.onChanged = (oldValue: number, newValue: number) => {
                    object.onChanged(oldValue, newValue);
                    this.onSettingChanged(oldValue, newValue);
                }
            }
            return <object>object;
        }

        private createContainerSetting() {
            return new _AdaptedValue<string, JavaString>(new (Java.extend(ListValue, {
                onChanged: (oldValue: string, newValue: string) => {
                    if (oldValue !== newValue) {
                        this.writeContainer(oldValue, this.readSettings());
                        this.writeSettings(this.readContainer(newValue));
                    }
                }
            }))("Container", ValuesContainer.containers, ValuesContainer.containers[0]));
        }

        private onSettingChanged(oldValue: unknown, newValue: unknown) {
            if (oldValue !== newValue) {
                this.writeContainer((<_AdaptedValue<string, JavaString>>this.settingsObject!.container).get(), this.readSettings());
            }
        }

        private static check() {
            if (!this.directory.exists() || !this.directory.isDirectory()) {
                this.directory.mkdirs();
            } if (!this.jsonFile.exists() || !this.jsonFile.isFile()) {
                this.jsonFile.createNewFile();
            }
        }

        private readSettings() {
            const object = <{ [key: string]: unknown }>{};
            for (let key in this.settingsObject) {
                if (key === "container") {
                    continue;
                }
                object[key] = this.settingsObject[key]!.get();
            }
            return object;
        }
        
        private writeSettings(object: { [key: string]: unknown }) {
            for (let save = false;;) {
                for (let key in object) {
                    if (key === "container") {
                        continue;
                    }
                    const setting = this.settingsObject[key]?.getValue();
                    if (setting == null) {
                        continue;
                    }
                    const value = <any>object[key];
                    try {
                        if (save) {
                            if (setting instanceof BoolValue) {
                                setting.set(<JavaBoolean>JavaBoolean.valueOf(value));
                            } else if (setting instanceof FloatValue) {
                                setting.set(<JavaFloat>JavaFloat.valueOf(value));
                            } else if (setting instanceof IntegerValue) {
                                setting.set(<JavaInteger>JavaInteger.valueOf(value));
                            } else if (setting instanceof ListValue || setting instanceof TextValue) {
                                setting.set(<JavaString>JavaString.valueOf(value));
                            }
                        } else {
                            if (setting instanceof BoolValue) {
                                setting.changeValue(<JavaBoolean>JavaBoolean.valueOf(value));
                            } else if (setting instanceof FloatValue) {
                                setting.changeValue(<JavaFloat>JavaFloat.valueOf(value));
                            } else if (setting instanceof IntegerValue) {
                                setting.changeValue(<JavaInteger>JavaInteger.valueOf(value));
                            } else if (setting instanceof ListValue || setting instanceof TextValue) {
                                setting.changeValue(<JavaString>JavaString.valueOf(value));
                            }
                        }
                    } catch (err) {}
                } if (save) {
                    break;
                }
                save = true;
            }
        }

        private readContainer(container: string) {
            const jsonObject = ValuesContainer.readJSONObject();
            return <{ [key: string]: unknown }>jsonObject[container] ?? this.defaultValues;
        }

        private writeContainer(container: string, object: { [key: string]: unknown }) {
            const jsonObject = ValuesContainer.readJSONObject();
            jsonObject[container] = object;
            ValuesContainer.writeJSONObject(jsonObject);
        }

        private static readJSONObject(jsonFile: File = this.jsonFile) {
            this.check();
            try {
                return <{ [key: string]: unknown }>JSON.parse(<any>new JavaString(Files.readAllBytes(Paths.get(jsonFile.toURI())), StandardCharsets.UTF_8));
            } catch (err) {
                return {};
            }
        }

        private static writeJSONObject(object: { [key: string]: unknown }, jsonFile: File = this.jsonFile) {
            this.check();
            try {
                Files.write(Paths.get(jsonFile.toURI()), new JavaString(JSON.stringify(this.sortObjectKey(object), null, 4)).getBytes(StandardCharsets.UTF_8), StandardOpenOption.CREATE!,  StandardOpenOption.WRITE!,  StandardOpenOption.TRUNCATE_EXISTING!);
            } catch (err) {}

        }

        private static sortObjectKey(object: { [key: string]: unknown }) {
            const newObject = <{ [key: string]: unknown }>{};
            for (let key of Object.keys(object).sort()) {
                newObject[key] = object[key];
            }
            return newObject;
        }

        public static Command = class Command {

            private readonly prefix = `§8[§9${scriptName}Container§8] §7`;

            public constructor(public readonly valuesContainer: ValuesContainer) {}
    
            public getName() {
                return `${scriptName}Container`.toLowerCase();
            }
        
            public getAliases() {
                return [];
            }
        
            public execute(args: string[]) {
                try {
                    if (args.length > 1) {
                        const operator = args[1].toLowerCase();
                        if (operator === "load" || operator === "save") {
                            ValuesContainer.check();
                            if (args.length > 2) {
                                const file = new File(ValuesContainer.directory, args[2]);
                                if (operator === "save") {
                                    this.valuesContainer.writeContainer(this.valuesContainer.containerSetting.get(), this.valuesContainer.readSettings());
                                    ValuesContainer.writeJSONObject(ValuesContainer.readJSONObject(), file);
                                    chat.print(`${this.prefix}save file '${file.getName()}'.`);
                                } else if (operator === "load" && file.exists() && file.isFile()) {
                                    const jsonObject = ValuesContainer.readJSONObject(file);
                                    ValuesContainer.writeJSONObject(jsonObject, file);
                                    const settingsObject = jsonObject[this.valuesContainer.containerSetting.get()];
                                    if (settingsObject != null) {
                                        this.valuesContainer.writeSettings(<any>settingsObject);
                                    }
                                    chat.print(`${this.prefix}load file '${file.getName()}'.`);
                                } else {
                                    chat.print(`${this.prefix}file '${file.getName()}' does not exist!`);
                                }
                            } else {
                                chat.print(`${this.prefix}§3Syntax: §7.${this.getName()} ${operator} <${Java.from(ValuesContainer.directory.list())?.join("/") ?? "[Empty Directory]"}>`);
                            }
                            return;
                        }
                    }
                    chat.print(`${this.prefix}§3Syntax: §7.${this.getName()} <load/save> <file>`);
                } catch (err) {
                    chat.print(`${this.prefix}Error: ${err}`);
                }
            }
        
            public tabComplete(args: string[]) {
                if (args.length === 2) {
                    ValuesContainer.check();
                    return <string[]>Java.from(ValuesContainer.directory.list()) ?? [];
                } if (args.length === 1) {
                    return ["load", "save"];
                }
                return [];
            }
    
        }

    }

    private static FindPath = class FindPath {

        private openTable = new FindPath.NodeQueue();
        private closeTable = new FindPath.NodeSet();

        public constructor(private entity: Entity, private start: typeof FindPath.Pos.prototype, private end: typeof FindPath.Pos.prototype, private throughWalls: number = 0, private compute: number = 1024, private intervals: number = 10, private vClip: boolean = false, private hClip: boolean = false) {
            [ this.start, this.end ] = [end, start];
        }

        public getPath() {
            if (!FindPath.Utils.isPassablePos(this.end)) {
                return null;
            }
            this.init();
            while (!this.openTable.isEmpty() && this.closeTable.size < this.compute) {
                const node = this.openTable.poll()!;
                if (this.closeTable.contains(node)) {
                    continue;
                } if (!FindPath.Utils.isPassableNode(node)) {
                    const parent = node.parent;
                    if (parent == null) {
                        continue;
                    }
                    let clip = false;
                    const { x: parentX, y: parentY, z: parentZ } = parent;
                    const { x: nodeX, y: nodeY, z: nodeZ } = node;
                    if (this.vClip && parentY !== nodeY) {
                        const newParent = new FindPath.SpecialNode(parentX, parentY, parentZ, parent.parent);
                        if (parentY < nodeY) {
                            clip = true;
                            this.upVClip(newParent);
                        } else if (parentY > nodeY) {
                            clip = true;
                            this.downVClip(newParent);
                        }
                    } if (this.hClip && parentY === nodeY) {
                        clip = true;
                        const newParent = new FindPath.SpecialNode(parentX, parentY, parentZ, parent.parent);
                        this.straightHClip(new FindPath.Pos(nodeX + (nodeX - parentX), nodeY, nodeZ + (nodeZ - parentZ)), newParent);
                    } if (clip) {
                        this.closeTable.add(node);
                    }
                    continue;
                } if (node.equals(this.end)) {
                    const path = <typeof FindPath.Pos.prototype[]>[node];
                    for (let temp = node.parent; temp != null; temp = temp.parent) {
                        path.push(temp);
                    }
                    return path;
                }
                this.closeTable.add(node);
                const { x, y, z } = node;
                this.createNodeToOpenTable(x + 1, y, z, node);
                this.createNodeToOpenTable(x, y + 1, z, node);
                this.createNodeToOpenTable(x, y, z + 1, node);
                this.createNodeToOpenTable(x - 1, y, z, node);
                this.createNodeToOpenTable(x, y - 1, z, node);
                this.createNodeToOpenTable(x, y, z - 1, node);
            }
            return null;
        }

        private init() {
            this.openTable.clear();
            this.closeTable.clear();
            const { x: startX, y: startY, z: startZ } = this.start;
            const startNode = new FindPath.Node(startX, startY, startZ);
            if (FindPath.Utils.isPassablePos(startNode)) {
                this.openTable.add(startNode.calculateCost(this.end));
            } if (!(this.throughWalls < 1)) {
                for (let x = -3; x < 4; ++x) {
                    for (let y = -3; y < 4; ++y) {
                        for (let z = -3; z < 4; ++z) {
                            const [ nodeX, nodeY, nodeZ ] = [startX + x, startY + y, startZ + z];
                            if (Math.sqrt((nodeX + 0.5 - this.entity.posX) ** 2 + (nodeY + 0.0626 - this.entity.posY) ** 2 + (nodeZ + 0.5 - this.entity.posZ) ** 2) > Math.min(this.throughWalls, 2.95)) {
                                continue;
                            }
                            const node = new FindPath.Node(nodeX, nodeY, nodeZ);
                            if (FindPath.Utils.isPassablePos(node)) {
                                this.openTable.add(node.calculateCost(this.end));
                            }
                        }
                    }
                }
            }
        }

        private createNodeToOpenTable(x: number, y: number, z: number, parent: typeof FindPath.Node.prototype) {
            if (FindPath.Utils.specialBlock) {
                const { x: parentX, y: parentY, z: parentZ } = parent;
                if (!FindPath.Utils.canReachable(parentX, parentY, parentZ, x, y, z)) {
                    return;
                }
            }
            this.openTable.add(new FindPath.Node(x, y, z, parent).calculateCost(this.end));
        }

        private upVClip(node: typeof FindPath.Node.prototype) {
            const { x: posX, y: posY, z: posZ } = node;
            const limit = posY + Math.floor(this.intervals);
            const tempPos = new FindPath.Pos(posX, 0, posZ);
            for (let offsetY = posY + 2; !(offsetY > limit); ++offsetY) {
                tempPos.y = offsetY;
                if (FindPath.Utils.isPassablePos(tempPos)) {
                    const newNode = new FindPath.SpecialNode(posX, offsetY, posZ, node);
                    newNode.gCost = node.gCost + Math.abs(posY - offsetY);
                    this.openTable.add(newNode.calculateCost(this.end));
                    return;
                }
            }
        }

        private downVClip(node: typeof FindPath.Node.prototype) {
            const { x: posX, y: posY, z: posZ } = node;
            const limit = posY - Math.floor(this.intervals);
            const tempPos = new FindPath.Pos(posX, 0, posZ);
            for (let offsetY = posY - 2; !(offsetY < limit); --offsetY) {
                tempPos.y = offsetY;
                if (FindPath.Utils.isPassablePos(tempPos)) {
                    const newNode = new FindPath.SpecialNode(posX, offsetY, posZ, node);
                    newNode.gCost = node.gCost + Math.abs(posY - offsetY);
                    this.openTable.add(newNode.calculateCost(this.end));
                    return;
                }
            }
        }

        private straightHClip(target: typeof FindPath.Pos.prototype, parent: typeof FindPath.Node.prototype) {
            if (this.intervals < 1.88 || !FindPath.Utils.isEmptyPos(parent) || !FindPath.Utils.isEmptyPos(target)) {
                return;
            }
            const { x: targetX, y: targetY, z: targetZ } = target;
            const { x: parentX, y: parentY, z: parentZ } = parent;
            const wall = new FindPath.Pos(Math.floor((targetX + parentX) / 2), parentY, Math.floor((targetZ + parentZ) / 2));
            if (FindPath.Utils.isEmptyPos(wall)) {
                return;
            }
            const { x: wallX, y: wallY, z: wallZ } = wall;
            const wallBox = new AxisAlignedBB(wallX, wallY + 0.0626, wallZ, wallX + 1, wallY + 1.8 + 0.0626, wallZ + 1);
            const groundBlockCollisionBoxes = FindPath.Utils.getBlockCollisionBoxes(wallBox, wallX, wallY - 1, wallZ);
            if (groundBlockCollisionBoxes != null) {
                return;
            }
            const block0CollisionBoxes = FindPath.Utils.getBlockCollisionBoxes(wallBox, wallX, wallY, wallZ);
            const block1CollisionBoxes = FindPath.Utils.getBlockCollisionBoxes(wallBox, wallX, wallY + 1, wallZ);
            let box0: AxisAlignedBB | null | undefined;
            let box1: AxisAlignedBB | null | undefined;
            if (block0CollisionBoxes != null) {
                if (block0CollisionBoxes.length !== 1) {
                    return;
                }
                box0 = block0CollisionBoxes[0];
                if (box0.maxX - box0.minX !== 1 || box0.maxZ - box0.minZ !== 1) {
                    return;
                }
            } if (block1CollisionBoxes != null) {
                if (block1CollisionBoxes.length !== 1) {
                    return;
                }
                box1 = block1CollisionBoxes[0];
                if (box1.maxX - box1.minX !== 1 || box1.maxZ - box1.minZ !== 1) {
                    return;
                }
            } if (box0 == null && box1 == null || box0 != null && box1 != null && (box0.maxX - box0.minX !== 1 || box0.maxZ - box0.minZ !== 1 || box1.maxX - box1.minX !== 1 || box1.maxZ - box1.minZ !== 1 || box0.minX !== box1.minX || box0.minZ !== box1.minZ)) {
                return;
            }
            const node = new FindPath.SpecialNode(targetX, targetY, targetZ);
            let wallNodeA: typeof FindPath.SpecialNode.prototype;
            let wallNodeB: typeof FindPath.SpecialNode.prototype;
            if (targetX !== parentX) {
                wallNodeA = new FindPath.SpecialNode(wallX + 0.8 - 0.06, wallY, wallZ);
                wallNodeB = new FindPath.SpecialNode(wallX - 0.8 + 0.06, wallY, wallZ);
                if (targetX > parentX) {
                    const temp = wallNodeA;
                    wallNodeA = wallNodeB;
                    wallNodeB = temp;
                }
            } else {
                wallNodeA = new FindPath.SpecialNode(wallX, wallY, wallZ + 0.8 - 0.06);
                wallNodeB = new FindPath.SpecialNode(wallX, wallY, wallZ - 0.8 + 0.06);
                if (targetZ > parentZ) {
                    const temp = wallNodeA;
                    wallNodeA = wallNodeB;
                    wallNodeB = temp;
                }
            }
            wallNodeA.parent = parent;
            wallNodeB.parent = wallNodeA;
            node.parent = wallNodeB;
            node.gCost = parent.gCost + Math.abs(targetX - parentX) + Math.abs(targetZ - parentZ);
            this.openTable.add(node.calculateCost(this.end));
        }

        public static Utils = class Utils {

            public static specialBlock = false;
            private static mutableBlockPos = new MutableBlockPos();

            public static isPassableNode(node: typeof FindPath.Node.prototype) {
                const { x, y, z } = node;
                this.specialBlock = false;
                if (this.isNotPassablePos(node)) {
                    return false;
                } if (this.isPassableBlock(x, y, z) && this.isPassableBlock(x, y + 1, z)) {
                    return true;
                } if (this.isSpecialBlock(x, y, z) || this.isSpecialBlock(x, y + 1, z)) {
                    this.specialBlock = true;
                    const { x: startX, y: startY, z: startZ } = node.parent ?? node;
                    const { x: endX, y: endY, z: endZ } = node;
                    return this.canReachable(startX, startY, startZ, endX, endY, endZ);
                }
                return false;
            }

            public static isPassablePos(pos: typeof FindPath.Pos.prototype) {
                const { x, y, z } = pos;
                if (this.isNotPassablePos(pos)) {
                    return false;
                } if (this.isPassableBlock(x, y, z) && this.isPassableBlock(x, y + 1, z)) {
                    return true;
                } if (this.isSpecialBlock(x, y, z) || this.isSpecialBlock(x, y + 1, z)) {
                    const { x: startX, y: startY, z: startZ } = pos;
                    const { x: endX, y: endY, z: endZ } = pos;
                    return this.canReachable(startX, startY, startZ, endX, endY, endZ, false);
                }
                return false;
            }

            public static isEmptyPos(pos: typeof FindPath.Pos.prototype) {
                const { x, y, z } = pos;
                if (this.isNotPassablePos(pos)) {
                    return false;
                }
                return this.isPassableBlock(x, y, z) && this.isPassableBlock(x, y + 1, z);
            }

            public static isNotPassablePos(pos: typeof FindPath.Pos.prototype) {
                const { x, y, z } = pos;
                return this.isNotPassableBlock(x, y, z) || this.isNotPassableBlock(x, y + 1, z) || this.isNotPassableGroundBlock(x, y - 1, z);
            }

            public static isNotPassableBlock(x: number, y: number, z: number) {
                const blockPos = this.mutableBlockPos.set(x, y, z);
                if (mc.theWorld!.isBlockLoaded(blockPos)) {
                    const blockState = mc.theWorld!.getBlockState(blockPos);
                    const block = blockState?.getBlock();
                    return block != null && (((block instanceof BlockLiquid || block instanceof BlockStaticLiquid) && block.getMaterial() !== Material.water) || block instanceof BlockWeb);
                }
                return false;
            }

            public static isNotPassableGroundBlock(x: number, y: number, z: number) {
                const blockPos = this.mutableBlockPos.set(x, y, z);
                if (mc.theWorld!.isBlockLoaded(blockPos)) {
                    const blockState = mc.theWorld!.getBlockState(blockPos);
                    const block = blockState?.getBlock();
                    return block != null && (block instanceof BlockWall || block instanceof BlockFence || block instanceof BlockFenceGate && block.getCollisionBoundingBox(mc.theWorld, blockPos, blockState) != null);
                }
                return false;
            }

            public static isPassableBlock(x: number, y: number, z: number) {
                const blockPos = this.mutableBlockPos.set(x, y, z);
                if (mc.theWorld!.isBlockLoaded(blockPos)) {
                    const blockState = mc.theWorld!.getBlockState(blockPos);
                    const block = blockState?.getBlock();
                    return block == null || block.getCollisionBoundingBox(mc.theWorld, blockPos, blockState) == null;
                }
                return false;
            }

            public static isSpecialBlock(x: number, y: number, z: number) {
                const blockPos = this.mutableBlockPos.set(x, y, z);
                if (mc.theWorld!.isBlockLoaded(blockPos)) {
                    const blockState = mc.theWorld!.getBlockState(blockPos);
                    const block = blockState?.getBlock();
                    return block != null && (block instanceof BlockSnow && block.isReplaceable(mc.theWorld, blockPos) || block === Block.blockRegistry!.getObjectById(111) || block instanceof BlockLadder || block instanceof BlockDoor || block instanceof BlockCarpet || block instanceof BlockTrapDoor);
                }
                return false;
            }

            public static getBlockCollisionBoxes(bb: AxisAlignedBB, x: number, y: number, z: number) {
                const world = mc.theWorld!;
                const blockPos = this.mutableBlockPos.set(x, y, z)!;
                if (!world.isBlockLoaded(blockPos)) {
                    return null;
                }
                const boxesList = new ArrayList<AxisAlignedBB>();
                const blockState = world.getBlockState(blockPos);
                if (blockState != null) {
                    blockState.getBlock()?.addCollisionBoxesToList(world, blockPos, blockState, bb, boxesList, null);
                }
                return boxesList.size() > 0 ? <AxisAlignedBB[]>Java.from(boxesList) : null;
            }

            public static simplifyPath(path: typeof FindPath.Pos.prototype[], intervals: number = 10, vClip: boolean = false) {
                if (path.length < 3) {
                    return path;
                }
                const newPath = <typeof FindPath.Pos.prototype[]>[path[0]];
                let finalPos = path[0];
                let finalIndex = 0;
                for (let index = 1; index < path.length; ++index) {
                    let ignore = false;
                    let collision = false;
                    const pos = path[index];
                    const { x: finalX, y: finalY, z: finalZ } = finalPos;
                    const { x: posX, y: posY, z: posZ } = pos;
                    if (Math.sqrt((finalX - posX) ** 2 + (finalY - posY) ** 2 + (finalZ - posZ) ** 2) > intervals || (!vClip || finalX !== posX || finalZ !== posZ) && !this.canReachable(finalX, finalY, finalZ, posX, posY, posZ)) {
                        --index;
                        if (!(finalIndex < index)) {
                            ++index;
                            ignore = true;
                        }
                        collision = true;
                        finalIndex = index;
                        finalPos = path[index];
                        newPath.push(finalPos);
                    } if (!ignore && pos instanceof FindPath.SpecialNode) {
                        if (collision) {
                            ++index;
                        }
                        finalPos = pos;
                        finalIndex = index;
                        newPath.push(pos);
                    }
                }
                const lastPos = path[path.length - 1];
                if (newPath[newPath.length - 1] !== lastPos) {
                    newPath.push(lastPos);
                }
                return newPath;
            }

            public static canReachable(startX: number, startY: number, startZ: number, endX: number, endY: number, endZ: number, ignoreCurrent: boolean = true) {

                const world = mc.theWorld!;
                const boxesList = new ArrayList<AxisAlignedBB>();
                const mutableBlockPos = new MutableBlockPos();
                const currentBox = new AxisAlignedBB(startX + 0.5 - 0.3, startY + 0.0626, startZ + 0.5 - 0.3, startX + 0.5 + 0.3, startY + 1.8 + 0.0626, startZ + 0.5 + 0.3);
                const yMoveBox = new AxisAlignedBB(startX + 0.5 - 0.3, (startY < endY ? startY : endY) + 0.0626, startZ + 0.5 - 0.3, startX + 0.5 + 0.3, (startY > endY ? startY : endY) + 1.8 + 0.0626, startZ + 0.5 + 0.3);
                const minY = (startY < endY ? startY : endY) - 1;
                const maxY = (startY > endY ? startY : endY) + 1;
                for (let y = minY; !(y > maxY); ++y) {
                    const x = startX;
                    const z = startY;
                    if (intersect(yMoveBox, x, y, z) && (!ignoreCurrent || !intersect(currentBox, x, y, z))) {
                        return false;
                    }
                }
                const xMoveBox = new AxisAlignedBB((startX < endX ? startX : endX) + 0.5 - 0.3, endY + 0.0626, startZ + 0.5 - 0.3, (startX > endX ? startX : endX) + 0.5 + 0.3, endY + 1.8 + 0.0626, startZ + 0.5 + 0.3);
                const minX = startX < endX ? startX : endX;
                const maxX = startX > endX ? startX : endX;
                for (let x = minX; !(x > maxX); ++x) {
                    for (let offsetY = -1; !(offsetY > 1); ++offsetY) {
                        const y = endY + offsetY;
                        const z = startZ;
                        if (intersect(xMoveBox, x, y, z) && (!ignoreCurrent || !intersect(currentBox, x, y, z))) {
                            return false;
                        }
                    }
                }
                const zMoveBox = new AxisAlignedBB(endX + 0.5 - 0.3, endY + 0.0626, (startZ < endZ ? startZ : endZ) + 0.5 - 0.3, endX + 0.5 + 0.3, endY + 1.8 + 0.0626, (startZ > endZ ? startZ : endZ) + 0.5 + 0.3);
                const minZ = startZ < endZ ? startZ : endZ;
                const maxZ = startZ > endZ ? startZ : endZ;
                for (let z = minZ; !(z > maxZ); ++z) {
                    for (let offsetY = -1; !(offsetY > 1); ++offsetY) {
                        const x = endX;
                        const y = endY + offsetY;
                        if (intersect(zMoveBox, x, y, z) && (!ignoreCurrent || !intersect(currentBox, x, y, z))) {
                            return false;
                        }
                    }
                }
                return true;

                function intersect(bb: AxisAlignedBB, x: number, y: number, z: number) {
                    const blockPos = mutableBlockPos.set(x, y, z)!;
                    if (!world.isBlockLoaded(blockPos)) {
                        return false;
                    }
                    const blockState = world.getBlockState(blockPos);
                    if (blockState != null) {
                        const size = boxesList.size();
                        blockState.getBlock()?.addCollisionBoxesToList(world, blockPos, blockState, bb, boxesList, null);
                        return size != boxesList.size();
                    }
                    return false;
                }

            }

        }

        public static Pos = class Pos {

            public constructor(public x: number, public y: number, public z: number) {}

            public equals(obj: Pos) {
                return obj.x === this.x && obj.y === this.y && obj.z === this.z;
            }

            public hashCode() {
                return (this.y + this.z * 31) * 31 + this.x;
            }

        }

        public static DynamicPos = class DynamicPos {

            public constructor(private getX: () => number, private getY: () => number, private getZ: () => number) {}

            public get x() {
                return this.getX();
            }

            public get y() {
                return this.getY();
            }

            public get z() {
                return this.getZ();
            }

            public equals(obj: DynamicPos) {
                return obj.x === this.x && obj.y === this.y && obj.z === this.z;
            }

            public hashCode() {
                return (this.y + this.z * 31) * 31 + this.x;
            }

        }

        public static Node = class Node extends FindPath.Pos {

            public cost = 0;
            public gCost = 0;

            public constructor(public x: number, public y: number, public z: number, public parent?: Node | null) {
                super(x, y, z);
                this.gCost = (parent?.gCost ?? 0) + 1;
            }

            public calculateCost(target: typeof FindPath.Pos.prototype) {
                const xDist = Math.abs(target.x - this.x);
                const yDist = Math.abs(target.y - this.y);
                const zDist = Math.abs(target.z - this.z);
                const hCost = Math.sqrt(xDist ** 2 + yDist ** 2 + zDist ** 2) + xDist + yDist + zDist;
                this.cost = this.gCost + hCost;
                return this;
            }

            public compareTo(obj: Node) {
                return this.cost - obj.cost;
            }

        }

        public static SpecialNode = class SpecialNode extends FindPath.Node {}

        private static NodeSet = class HashSet<T extends typeof FindPath.Node.prototype> {

            public size = 0;
            private elements: (typeof HashSet.Node.prototype | null | undefined)[] = [];

            public add(obj: T) {
                const hash = this.hash(obj);
                const element = this.elements[hash];
                if (element == null) {
                    this.elements[hash] = new HashSet.Node<T>(obj, null);
                } else {
                    let node = <typeof HashSet.Node.prototype | null | undefined>element;
                    do {
                        if (node!.value.equals(obj)) {
                            return;
                        }
                        node = node!.next;
                    } while (node != null);
                    this.elements[hash] = new HashSet.Node<T>(obj, element);
                }
                ++this.size;
            }

            public contains(obj: T) {
                const hash = this.hash(obj);
                const element = this.elements[hash];
                if (element != null) {
                    let node = <typeof HashSet.Node.prototype | null | undefined>element;
                    do {
                        if (node!.value.equals(obj)) {
                            return true;
                        }
                        node = node!.next;
                    } while (node != null);
                }
                return false;
            }

            public remove(obj: T) {
                const hash = this.hash(obj);
                const element = this.elements[hash];
                if (element != null) {
                    let node = <typeof HashSet.Node.prototype | null | undefined>element;
                    let prev = <typeof HashSet.Node.prototype | null | undefined>null;
                    do {
                        if (node!.value.equals(obj)) {
                            if (prev == null) {
                                this.elements[hash] = null;
                            } else {
                                prev.next = node!.next;
                            }
                            --this.size;
                            return;
                        }
                        prev = node;
                        node = node!.next;
                    } while (node != null);
                }
            }

            public clear() {
                this.size = 0;
                this.elements = [];
            }

            public isEmpty() {
                return this.size < 1;
            }

            public toArray() {
                const array = [];
                for (let element of this.elements) {
                    let node = element;
                    while (node != null) {
                        array.push(node.value);
                        node = node.next;
                    }
                }
                return array;
            }

            private hash(obj: T) {
                const h = obj.hashCode();
                return h ^ (h >>> 16) & 0xFFFF;
            }

            private static Node = class Node<T> {

                public constructor(public value: T, public next: Node<T> | null | undefined) {}

            }

        }

        private static NodeQueue = class PriorityQueue<T extends typeof FindPath.Node.prototype> {

            public size = 0;
            private elements: (T | null | undefined)[] = [];

            public constructor(private readonly comparator?: (a: T, b: T) => number) {}

            public add(obj: T) {
                if (this.size === 0) {
                    this.elements[0] = obj;
                } else {
                    this.siftUp(this.size, obj);
                }
                ++this.size;
            }

            public poll() {
                --this.size;
                const result = this.elements[0];
                this.elements[0] = this.elements[this.size];
                this.elements[this.size] = null;
                if (this.size > 1) {
                    this.siftDown(0, this.elements[0]!);
                }
                return result;
            }

            public peek() {
                return this.elements[0];
            }

            public contains(obj: T) {
                for (let i = 0; i < this.size; ++i) {
                    if (obj.equals(this.elements[i]!)) {
                        return true;
                    }
                }
                return false;
            }

            public clear() {
                this.size = 0;
                this.elements = [];
            }

            public isEmpty() {
                return this.size < 1;
            }

            public toArray() {
                const elements = this.elements.concat();
                const size = this.size;
                const array = [];
                while (!this.isEmpty()) {
                    array.push(this.peek());
                }
                this.elements = elements;
                this.size = size;
                return array;
            }

            private siftUp(key: number, value: T) {
                if (this.comparator != null) {
                    this.siftUpUsingComparator(key, value);
                } else {
                    this.siftUpComparable(key, value);
                }
            }

            private siftUpComparable(key: number, value: T) {
                while (key > 0) {
                    const parent = (key - 1) >>> 1;
                    const element = this.elements[parent];
                    if (element!.compareTo!(value) < 0) {
                        break;
                    }
                    this.elements[key] = element;
                    key = parent;
                }
                this.elements[key] = value;
            }

            private siftUpUsingComparator(key: number, value: T) {
                while (key > 0) {
                    const parent = (key - 1) >>> 1;
                    const element = this.elements[parent];
                    if (this.comparator!(element!, value) < 0) {
                        break;
                    }
                    this.elements[key] = element;
                    key = parent;
                }
                this.elements[key] = value;
            }

            private siftDown(key: number, value: T) {
                if (this.comparator != null) {
                    this.siftDownUsingComparator(key, value);
                } else {
                    this.siftDownComparable(key, value);
                }
            }

            private siftDownComparable(key: number, value: T) {
                const half = this.size >>> 1;
                while (key < half) {
                    let child = (key << 1) + 1;
                    let childElement = this.elements[child];
                    const right = child + 1;
                    if (right < this.size && childElement!.compareTo!(this.elements[right]!) > 0) {
                        childElement = this.elements[child = right];
                    } if (!(childElement!.compareTo!(value) < 0)) {
                        break;
                    }
                    this.elements[key] = childElement;
                    key = child;
                }
                this.elements[key] = value;
            }

            private siftDownUsingComparator(key: number, value: T) {
                const half = this.size >>> 1;
                while (key < half) {
                    let child = (key << 1) + 1;
                    let childElement = this.elements[child];
                    const right = child + 1;
                    if (right < this.size && this.comparator!(childElement!, this.elements[right]!) > 0) {
                        childElement = this.elements[child = right];
                    } if (!(this.comparator!(childElement!, value) < 0)) {
                        break;
                    }
                    this.elements[key] = childElement;
                    key = child;
                }
                this.elements[key] = value;
            }

        }

    }

    public static NanoTimer = class NanoTimer {

        private time = -1;
    
        public zero() {
            this.time = 0;
        }
    
        public reset() {
            this.time = System.nanoTime();
        }
    
        public hasTimePassed(nano: number) {
            return this.time + nano < System.nanoTime();
        }
    
        public hasTimeLeft(nano: number) {
            return (this.time + nano) - System.nanoTime();
        }
    
    }

}

class mumyScript {

    private static readonly registeredModulesField = Script.class.getDeclaredField("registeredModules")!;
    private static readonly registeredCommandsField = Script.class.getDeclaredField("registeredCommands")!;

    static {
        mumyScript.registeredModulesField.setAccessible(true);
        mumyScript.registeredCommandsField.setAccessible(true);
    }

    public static registerModules(scriptModules: { getName(): JVM.java$.lang$.String | string | null | undefined, getDescription(): JVM.java$.lang$.String | string | null | undefined, getCategory(): JVM.java$.lang$.String | string | null | undefined }[]) {
        const modules = [];
        for (let scriptModule of scriptModules) {
            modules.push(mumyScript.registerModule(scriptModule));
        }
        return modules;
    }

    public static registerModule(scriptModule: { getName(): JVM.java$.lang$.String | string | null | undefined, getDescription(): JVM.java$.lang$.String | string | null | undefined, getCategory(): JVM.java$.lang$.String | string | null | undefined }) {

        const moduleConfig = {
            name: scriptModule.getName(),
            description: scriptModule.getDescription(),
            category: scriptModule.getCategory()
        };
        if (typeof (<any>scriptModule).addValues === "function") {
            const valueAdapter = new _ValueAdapter();
            (<any>scriptModule).addValues(valueAdapter);
            (<any>moduleConfig).settings = valueAdapter.getAdaptedValues();
        } if (typeof (<any>scriptModule).getTag === "function") {
            const updateThread = new Thread(() => {
                for (;;) {
                    (<any>moduleConfig).tag = (<any>scriptModule).getTag();
                    Thread.sleep(500);
                }
            });
            updateThread.setDaemon(true);
            updateThread.setPriority(Thread.MIN_PRIORITY);
            updateThread.start();
        }
        const module = new ScriptModule(moduleConfig);
        LiquidBounce.moduleManager!.registerModule(module);
        (<ArrayList<Module>>mumyScript.registeredModulesField.get(script)).add(module);
        registerEvent("update", "onUpdate");
        registerEvent("enable", "onEnable");
        registerEvent("disable", "onDisable");
        registerEvent("packet", "onPacket");
        registerEvent("motion", "onMotion");
        registerEvent("render2D", "onRender2D");
        registerEvent("render3D", "onRender3D");
        registerEvent("jump", "onJump");
        registerEvent("attack", "onAttack");
        registerEvent("key", "onKey");
        registerEvent("move", "onMove");
        registerEvent("step", "onStep");
        registerEvent("stepConfirm", "onStepConfirm");
        registerEvent("world", "onWorld");
        registerEvent("session", "onSession");
        registerEvent("clickBlock", "onClickBlock");
        registerEvent("strafe", "onStrafe");
        registerEvent("slowDown", "onSlowDown");
        return <Module>module;

        function registerEvent(eventName: string, legacyName: string) {
            if ((<any>scriptModule)[legacyName] != null) {
                module.on(eventName, (event: any) => (<any>scriptModule)[legacyName](event));
            }
        }

    }

    public static unregisterModules(modules: (Module | _AdaptedModule)[]) {
        for (let module of modules) {
            mumyScript.unregisterModule(module);
        }
    }

    public static unregisterModule(module: Module | _AdaptedModule, autoDisable: boolean = true) {
        const object = module instanceof _AdaptedModule ? module._getRaw()! : module;
        if (autoDisable) {
            object.setState(false);
        }
        LiquidBounce.moduleManager!.unregisterModule(object);
        (<ArrayList<Module>>mumyScript.registeredModulesField.get(script)).remove(object);
    }

    public static registerCommands(scriptCommands: { getName(): JVM.java$.lang$.String | string | null | undefined, getAliases(): (JVM.java$.lang$.String | string)[] | null | undefined, execute(args: (JVM.java$.lang$.String | string)[] | null | undefined): void }[]) {
        const commands = [];
        for (let scriptCommand of scriptCommands) {
            commands.push(mumyScript.registerCommand(scriptCommand));
        }
        return commands;
    }

    public static registerCommand(scriptCommand: { getName(): JVM.java$.lang$.String | string | null | undefined, getAliases(): (JVM.java$.lang$.String | string)[] | null | undefined, execute(args: (JVM.java$.lang$.String | string)[] | null | undefined): void }) {
        const commandObject = {
            name: scriptCommand.getName(),
            aliases: scriptCommand.getAliases(),
            execute: (args: string[]) => scriptCommand.execute(args)
        };
        if (typeof (<any>scriptCommand).tabComplete === "function") {
            (<any>commandObject).tabComplete = (<any>scriptCommand).tabComplete;
        } if (typeof (<any>scriptCommand).chat === "function") {
            (<any>commandObject).chat = (<any>scriptCommand).chat;
        } if (typeof (<any>scriptCommand).chatSyntax === "function") {
            (<any>commandObject).chatSyntax = (<any>scriptCommand).chatSyntax;
        } if (typeof (<any>scriptCommand).chatSyntaxError === "function") {
            (<any>commandObject).chatSyntaxError = (<any>scriptCommand).chatSyntaxError;
        } if (typeof (<any>scriptCommand).playEdit === "function") {
            (<any>commandObject).playEdit = (<any>scriptCommand).playEdit;
        }
        const command = <Command>new (Java.extend(Command, commandObject))(scriptCommand.getName(), scriptCommand.getAliases());
        LiquidBounce.commandManager!.registerCommand(command);
        (<ArrayList<Command>>mumyScript.registeredCommandsField.get(script)).add(command);
        return command;
    }

    public static unregisterCommands(commands: Command[]) {
        for (let command of commands) {
            mumyScript.unregisterCommand(command);
        }
    }

    public static unregisterCommand(command: Command) {
        LiquidBounce.commandManager!.unregisterCommand(command);
        (<ArrayList<Command>>mumyScript.registeredCommandsField.get(script)).remove(command);
    }

}

let modules: Module[];
let commands: Command[];

function onLoad() {}

function onEnable() {
    const mumyHackAuraInstance = new mumyHackAura();
    modules = mumyScript.registerModules([mumyHackAuraInstance]);
    commands = mumyScript.registerCommands([mumyHackAuraInstance.valuesContainer.command]);
}

function onDisable() {
    mumyScript.unregisterModules(modules);
    mumyScript.unregisterCommands(commands);
}

