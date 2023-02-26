var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Color = Java.type("java.awt.Color");
var JavaBoolean = Java.type("java.lang.Boolean");
var JavaFloat = Java.type("java.lang.Float");
var JavaInteger = Java.type("java.lang.Integer");
var JavaString = Java.type("java.lang.String");
var ArrayList = Java.type("java.util.ArrayList");
var HashSet = Java.type("java.util.HashSet");
var LiquidBounce = Java.type("net.ccbluex.liquidbounce.LiquidBounce");
var AttackEvent = Java.type("net.ccbluex.liquidbounce.event.AttackEvent");
var ClickBlockEvent = Java.type("net.ccbluex.liquidbounce.event.ClickBlockEvent");
var EventState = Java.type("net.ccbluex.liquidbounce.event.EventState");
var JumpEvent = Java.type("net.ccbluex.liquidbounce.event.JumpEvent");
var KeyEvent = Java.type("net.ccbluex.liquidbounce.event.KeyEvent");
var MotionEvent = Java.type("net.ccbluex.liquidbounce.event.MotionEvent");
var MoveEvent = Java.type("net.ccbluex.liquidbounce.event.MoveEvent");
var PacketEvent = Java.type("net.ccbluex.liquidbounce.event.PacketEvent");
var Render2DEvent = Java.type("net.ccbluex.liquidbounce.event.Render2DEvent");
var Render3DEvent = Java.type("net.ccbluex.liquidbounce.event.Render3DEvent");
var SlowDownEvent = Java.type("net.ccbluex.liquidbounce.event.SlowDownEvent");
var StepEvent = Java.type("net.ccbluex.liquidbounce.event.StepEvent");
var StrafeEvent = Java.type("net.ccbluex.liquidbounce.event.StrafeEvent");
var UpdateEvent = Java.type("net.ccbluex.liquidbounce.event.UpdateEvent");
var WorldEvent = Java.type("net.ccbluex.liquidbounce.event.WorldEvent");
var NoFriends = Java.type("net.ccbluex.liquidbounce.features.module.modules.combat.NoFriends");
var AntiBot = Java.type("net.ccbluex.liquidbounce.features.module.modules.misc.AntiBot");
var Teams = Java.type("net.ccbluex.liquidbounce.features.module.modules.misc.Teams");
var EntityUtils = Java.type("net.ccbluex.liquidbounce.utils.EntityUtils");
var ColorUtils = Java.type("net.ccbluex.liquidbounce.utils.render.ColorUtils");
var RenderUtils = Java.type("net.ccbluex.liquidbounce.utils.render.RenderUtils");
var MSTimer = Java.type("net.ccbluex.liquidbounce.utils.timer.MSTimer");
var BlockValue = Java.type("net.ccbluex.liquidbounce.value.BlockValue");
var BoolValue = Java.type("net.ccbluex.liquidbounce.value.BoolValue");
var FloatValue = Java.type("net.ccbluex.liquidbounce.value.FloatValue");
var IntegerValue = Java.type("net.ccbluex.liquidbounce.value.IntegerValue");
var ListValue = Java.type("net.ccbluex.liquidbounce.value.ListValue");
var TextValue = Java.type("net.ccbluex.liquidbounce.value.TextValue");
var Block = Java.type("net.minecraft.block.Block");
var BlockCarpet = Java.type("net.minecraft.block.BlockCarpet");
var BlockDoor = Java.type("net.minecraft.block.BlockDoor");
var BlockFence = Java.type("net.minecraft.block.BlockFence");
var BlockFenceGate = Java.type("net.minecraft.block.BlockFenceGate");
var BlockLadder = Java.type("net.minecraft.block.BlockLadder");
var BlockLiquid = Java.type("net.minecraft.block.BlockLiquid");
var BlockSnow = Java.type("net.minecraft.block.BlockSnow");
var BlockStaticLiquid = Java.type("net.minecraft.block.BlockStaticLiquid");
var BlockTrapDoor = Java.type("net.minecraft.block.BlockTrapDoor");
var BlockWall = Java.type("net.minecraft.block.BlockWall");
var Material = Java.type("net.minecraft.block.material.Material");
var GlStateManager = Java.type("net.minecraft.client.renderer.GlStateManager");
var Entity = Java.type("net.minecraft.entity.Entity");
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
var C02PacketUseEntity = Java.type("net.minecraft.network.play.client.C02PacketUseEntity");
var C04PacketPlayerPosition = Java.type("net.minecraft.network.play.client.C03PacketPlayer$C04PacketPlayerPosition");
var AxisAlignedBB = Java.type("net.minecraft.util.AxisAlignedBB");
var MutableBlockPos = Java.type("net.minecraft.util.BlockPos$MutableBlockPos");
var BlockPos = Java.type("net.minecraft.util.BlockPos");
var GL11 = Java.type("org.lwjgl.opengl.GL11");
var scriptName = "VanillaTPAura";
var scriptVersion = 0.2;
var scriptAuthor = "mumy++";
var VanillaTPAura = /** @class */ (function () {
    function VanillaTPAura() {
        this.setting = {
            float: function (name, def, min, max, object) {
                if (object === void 0) { object = {}; }
                return new _AdaptedValue(new (Java.extend(FloatValue, object))(name, def, min, max));
            },
            integer: function (name, def, min, max, object) {
                if (object === void 0) { object = {}; }
                return new _AdaptedValue(new (Java.extend(IntegerValue, object))(name, def, min, max));
            },
            boolean: function (name, def, object) {
                if (object === void 0) { object = {}; }
                return new _AdaptedValue(new (Java.extend(BoolValue, object))(name, def));
            },
            list: function (name, values, def, object) {
                if (object === void 0) { object = {}; }
                return new _AdaptedValue(new (Java.extend(ListValue, object))(name, values, def));
            },
            text: function (name, def, object) {
                if (object === void 0) { object = {}; }
                return new _AdaptedValue(new (Java.extend(TextValue, object))(name, def));
            },
            block: function (name, def, object) {
                if (object === void 0) { object = {}; }
                return new _AdaptedValue(new (Java.extend(BlockValue, object))(name, def));
            }
        };
        this.settings = {
            delay: this.setting.integer("Delay", 500, 0, 1000),
            range: this.setting.float("Range", 40, 0, 128),
            hurtTime: this.setting.integer("HurtTime", 11, 0, 20),
            targetMode: this.setting.list("TargetMode", ["Single", "Switch"], "Single"),
            packetsDistance: this.setting.float("PacketsDistance", 4, 1, 10),
            highVersion: this.setting.boolean("HighVersion", true),
            aimEntity: this.setting.boolean("AimEntity", true),
            criticals: this.setting.boolean("Criticals", true),
            spoofGround: this.setting.boolean("SpoofGround", true)
        };
        this.attackTimer = new MSTimer();
        this.targetList = [];
        this.prevTargetTable = new HashSet();
        this.renderPath = [];
        this.renderTimer = new MSTimer();
        this.pathColor = new Color(0, 127, 255);
    }
    VanillaTPAura.prototype.getName = function () {
        return "VanillaTPAura";
    };
    VanillaTPAura.prototype.getDescription = function () {
        return "VanillaTPAura-Module, By-mumy";
    };
    VanillaTPAura.prototype.getCategory = function () {
        return "Misc";
    };
    VanillaTPAura.prototype.onEnable = function () {
        this.targetList = [];
        this.prevTargetTable.clear();
        this.renderPath = [];
    };
    VanillaTPAura.prototype.onDisable = function () {
        this.onEnable();
    };
    VanillaTPAura.prototype.onMotion = function (event) {
        if (event.getEventState() !== EventState.POST) {
            return;
        }
        this.updateTarget();
        if (this.targetList.length > 0) {
            this.runAttack();
        }
    };
    VanillaTPAura.prototype.onRender3D = function (event) {
        if (!this.renderTimer.hasTimePassed(500)) {
            for (var _i = 0, _b = this.renderPath; _i < _b.length; _i++) {
                var pos = _b[_i];
                var x = pos.x, y = pos.y, z = pos.z;
                this.drawBox(x, y, z, this.pathColor);
            }
        }
    };
    VanillaTPAura.prototype.onWorld = function (event) {
        moduleManager.getModule(this.getName()).setState(false);
    };
    VanillaTPAura.prototype.addValues = function (values) {
        var settings = this.settings;
        for (var key in settings) {
            values.add(settings[key]);
        }
    };
    VanillaTPAura.prototype.updateTarget = function () {
        this.targetList = [];
        var player = mc.thePlayer;
        var range = this.settings.range.get();
        var hurtTime = this.settings.hurtTime.get();
        var switchMode = this.settings.targetMode.get() === "Switch";
        var loadedEntityList = Java.from(mc.theWorld.loadedEntityList);
        for (var _i = 0, loadedEntityList_1 = loadedEntityList; _i < loadedEntityList_1.length; _i++) {
            var entity = loadedEntityList_1[_i];
            if (this.isEnemy(entity) && !(entity.hurtResistantTime > hurtTime) && player.getDistanceToEntity(entity) < range && !(switchMode && this.prevTargetTable.contains(JavaInteger.valueOf(entity.getEntityId())))) {
                this.targetList.push(entity);
            }
        }
        if (this.targetList.length === 0) {
            if (!this.prevTargetTable.isEmpty()) {
                this.prevTargetTable.clear();
                this.updateTarget();
            }
            return;
        }
        this.targetList
            .sort(function (a, b) { return player.getDistanceToEntity(a) - player.getDistanceToEntity(b); })
            .sort(function (a, b) { return a.hurtResistantTime - b.hurtResistantTime; });
    };
    VanillaTPAura.prototype.isEnemy = function (entity) {
        if (entity instanceof EntityLivingBase && (EntityUtils.targetDead || entity.isEntityAlive() && entity.getHealth() > 0) && entity !== mc.thePlayer) {
            if (!EntityUtils.targetInvisible && entity.isInvisible()) {
                return false;
            }
            if (EntityUtils.targetPlayer && entity instanceof EntityPlayer) {
                if (entity.isSpectator() || AntiBot.isBot(entity)) {
                    return false;
                }
                if (isFriend(entity) && !LiquidBounce.moduleManager.getModule(NoFriends.class).getState()) {
                    return false;
                }
                var teams = LiquidBounce.moduleManager.getModule(Teams.class);
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
    };
    VanillaTPAura.prototype.runAttack = function () {
        if (!this.attackTimer.hasTimePassed(this.settings.delay.get())) {
            return;
        }
        this.attackTimer.reset();
        for (var _i = 0, _b = this.targetList; _i < _b.length; _i++) {
            var entity = _b[_i];
            if (this.teleportAttackEntity(entity)) {
                if (this.settings.targetMode.get() === "Switch") {
                    this.prevTargetTable.add(JavaInteger.valueOf(entity.getEntityId()));
                }
                break;
            }
        }
    };
    VanillaTPAura.prototype.teleportAttackEntity = function (entity) {
        var player = mc.thePlayer;
        if (player.getDistanceToEntity(entity) < 3) {
            this.attackEntity(entity);
            return true;
        }
        var path = new VanillaTPAura.FindPath(new VanillaTPAura.DynamicPos(function () { return player.posX; }, function () { return player.posY; }, function () { return player.posZ; }), new VanillaTPAura.DynamicPos(function () { return entity.posX; }, function () { return player.posY; }, function () { return entity.posZ; }), 0).getPath();
        if (path == null) {
            return false;
        }
        var netHandler = mc.getNetHandler();
        var spoofGround = this.settings.spoofGround.get();
        var adjust = spoofGround ? function (y) { return Math.ceil((y + 0.0626) / 0.015625) * 0.015625; } : function (y) { return y + 0.0626; };
        var gotoPath = VanillaTPAura.FindPath.Utils.simplifyPath(path, this.settings.packetsDistance.get());
        this.renderPath = [];
        for (var _i = 0, gotoPath_1 = gotoPath; _i < gotoPath_1.length; _i++) {
            var pos = gotoPath_1[_i];
            var x = pos.x, y = pos.y, z = pos.z;
            this.renderPath.push(pos);
            netHandler.addToSendQueue(new C04PacketPlayerPosition(x + 0.5, adjust(y), z + 0.5, spoofGround));
        }
        var _b = path[path.length - 1], lastX = _b.x, lastY = _b.y, lastZ = _b.z;
        this.renderPath.push(new VanillaTPAura.Pos(lastX, Math.floor(entity.posY), lastZ));
        netHandler.addToSendQueue(new C04PacketPlayerPosition(lastX + 0.5, entity.posY, lastZ + 0.5, spoofGround));
        this.attackEntity(entity);
        netHandler.addToSendQueue(new C04PacketPlayerPosition(lastX + 0.5, adjust(lastY), lastZ + 0.5, spoofGround));
        var backPath = VanillaTPAura.FindPath.Utils.simplifyPath(path.reverse(), this.settings.packetsDistance.get());
        for (var _c = 0, backPath_1 = backPath; _c < backPath_1.length; _c++) {
            var pos = backPath_1[_c];
            var x = pos.x, y = pos.y, z = pos.z;
            netHandler.addToSendQueue(new C04PacketPlayerPosition(x + 0.5, adjust(y), z + 0.5, spoofGround));
        }
        this.renderTimer.reset();
        return true;
    };
    VanillaTPAura.prototype.attackEntity = function (entity) {
        var player = mc.thePlayer;
        var netHandler = mc.getNetHandler();
        var highVersion = this.settings.highVersion.get();
        if (this.settings.criticals.get()) {
            var posX = entity.posX, posY = entity.posY, posZ = entity.posZ;
            for (var _i = 0, _b = [0.0625, 0, 0.0125, 0]; _i < _b.length; _i++) {
                var offset = _b[_i];
                netHandler.addToSendQueue(new C04PacketPlayerPosition(posX, posY + offset, posZ, false));
            }
        }
        if (highVersion) {
            netHandler.addToSendQueue(new C02PacketUseEntity(entity, C02PacketUseEntity.Action.ATTACK));
        }
        player.swingItem();
        if (!highVersion) {
            netHandler.addToSendQueue(new C02PacketUseEntity(entity, C02PacketUseEntity.Action.ATTACK));
        }
    };
    VanillaTPAura.prototype.drawBox = function (x, y, z, color) {
        var renderManager = mc.getRenderManager();
        GL11.glBlendFunc(GL11.GL_SRC_ALPHA, GL11.GL_ONE_MINUS_SRC_ALPHA);
        RenderUtils.enableGlCap(GL11.GL_BLEND);
        RenderUtils.disableGlCap(GL11.GL_TEXTURE_2D, GL11.GL_DEPTH_TEST);
        GL11.glDepthMask(false);
        RenderUtils.glColor(color.getRed(), color.getGreen(), color.getBlue(), 26);
        var renderPosX = renderManager.renderPosX, renderPosY = renderManager.renderPosY, renderPosZ = renderManager.renderPosZ;
        var axisAlignedBB = new AxisAlignedBB(x - renderPosX, y - renderPosY, z - renderPosZ, x + 1 - renderPosX, y + 1 - renderPosY, z + 1 - renderPosZ);
        RenderUtils.drawFilledBox(axisAlignedBB);
        GL11.glLineWidth(1);
        RenderUtils.enableGlCap(GL11.GL_LINE_SMOOTH);
        RenderUtils.glColor(color.getRed(), color.getGreen(), color.getBlue(), 95);
        RenderUtils.drawSelectionBoundingBox(axisAlignedBB);
        GlStateManager.resetColor();
        GL11.glDepthMask(true);
        RenderUtils.resetCaps();
    };
    var _a, _b, _c;
    VanillaTPAura.Pos = /** @class */ (function () {
        function Pos(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        Pos.prototype.equals = function (obj) {
            return obj.x === this.x && obj.y === this.y && obj.z === this.z;
        };
        Pos.prototype.hashCode = function () {
            return (this.y + this.z * 31) * 31 + this.x;
        };
        return Pos;
    }());
    VanillaTPAura.DynamicPos = /** @class */ (function () {
        function DynamicPos(getX, getY, getZ) {
            this.getX = getX;
            this.getY = getY;
            this.getZ = getZ;
        }
        Object.defineProperty(DynamicPos.prototype, "x", {
            get: function () {
                return Math.floor(this.getX());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DynamicPos.prototype, "y", {
            get: function () {
                return Math.floor(this.getY());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DynamicPos.prototype, "z", {
            get: function () {
                return Math.floor(this.getZ());
            },
            enumerable: false,
            configurable: true
        });
        DynamicPos.prototype.equals = function (obj) {
            return obj.x === this.x && obj.y === this.y && obj.z === this.z;
        };
        DynamicPos.prototype.hashCode = function () {
            return (this.y + this.z * 31) * 31 + this.x;
        };
        return DynamicPos;
    }());
    VanillaTPAura.FindPath = (_a = /** @class */ (function () {
            function FindPath(start, end, xzRange, compute) {
                if (xzRange === void 0) { xzRange = NaN; }
                if (compute === void 0) { compute = 1024; }
                this.xzRange = xzRange;
                this.compute = compute;
                this.openTable = new FindPath.NodeQueue();
                this.closeTable = new FindPath.NodeSet();
                this.start = start;
                this.end = end;
            }
            FindPath.prototype.init = function () {
                this.openTable.clear();
                this.closeTable.clear();
                this.openTable.add(new FindPath.Node(this.start.x, this.start.y, this.start.z));
            };
            FindPath.prototype.getPath = function () {
                this.init();
                while (!this.openTable.isEmpty() && this.closeTable.size < this.compute) {
                    var node = this.openTable.poll();
                    if (this.closeTable.contains(node)) {
                        continue;
                    }
                    if (!FindPath.Utils.isPassableNode(node)) {
                        continue;
                    }
                    if (node.equals(this.end) || this.xzRange === this.xzRange && !(Math.abs(node.x - this.end.x) > this.xzRange) && !(Math.abs(node.z - this.end.z) > this.xzRange)) {
                        var path = [];
                        var temp = node;
                        do {
                            path.push(temp);
                            temp = temp.parent;
                        } while (temp != null);
                        return path.reverse();
                    }
                    this.closeTable.add(node);
                    var x = node.x, y = node.y, z = node.z;
                    this.addNodeToOpenTable(new FindPath.Node(x + 1, y, z, node).calculateCost(this.end));
                    this.addNodeToOpenTable(new FindPath.Node(x, y + 1, z, node).calculateCost(this.end));
                    this.addNodeToOpenTable(new FindPath.Node(x, y, z + 1, node).calculateCost(this.end));
                    this.addNodeToOpenTable(new FindPath.Node(x - 1, y, z, node).calculateCost(this.end));
                    this.addNodeToOpenTable(new FindPath.Node(x, y - 1, z, node).calculateCost(this.end));
                    this.addNodeToOpenTable(new FindPath.Node(x, y, z - 1, node).calculateCost(this.end));
                }
                return null;
            };
            FindPath.prototype.addNodeToOpenTable = function (node) {
                var _b;
                var _c = (_b = node.parent) !== null && _b !== void 0 ? _b : node, parentX = _c.x, parentY = _c.y, parentZ = _c.z;
                if (!FindPath.Utils.specialBlock || FindPath.Utils.canReachable(parentX, parentY, parentZ, node.x, node.y, node.z)) {
                    this.openTable.add(node);
                }
            };
            return FindPath;
        }()),
        _a.Node = /** @class */ (function (_super) {
            __extends(Node, _super);
            function Node(x, y, z, parent) {
                var _this = this;
                var _b;
                _this = _super.call(this, x, y, z) || this;
                _this.x = x;
                _this.y = y;
                _this.z = z;
                _this.parent = parent;
                _this.cost = 0;
                _this.gCost = 0;
                _this.gCost = ((_b = parent === null || parent === void 0 ? void 0 : parent.gCost) !== null && _b !== void 0 ? _b : -1) + 1;
                return _this;
            }
            Node.prototype.calculateCost = function (pos) {
                var xDistance = Math.abs(this.x - pos.x);
                var yDistance = Math.abs(this.y - pos.y);
                var zDistance = Math.abs(this.z - pos.z);
                var distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2) + Math.pow(zDistance, 2));
                this.cost = this.gCost + xDistance + yDistance + zDistance + distance;
                return this;
            };
            Node.prototype.compareTo = function (obj) {
                return this.cost - obj.cost;
            };
            return Node;
        }(VanillaTPAura.Pos)),
        _a.Utils = (_b = /** @class */ (function () {
                function NodeUtils() {
                }
                NodeUtils.isPassableNode = function (node) {
                    var _b;
                    _a.Utils.specialBlock = false;
                    var x = node.x, y = node.y, z = node.z;
                    if (this.isNotPassableLiquid(this.mutableBlockPos.set(x, y, z)) || this.isNotPassableLiquid(this.mutableBlockPos.set(x, y + 1, z)) || this.isNotPassableGround(this.mutableBlockPos.set(x, y - 1, z))) {
                        return false;
                    }
                    if (this.isPassable(this.mutableBlockPos.set(x, y, z)) && this.isPassable(this.mutableBlockPos.set(x, y + 1, z))) {
                        return true;
                    }
                    if (this.isSpecial(this.mutableBlockPos.set(x, y, z)) || this.isSpecial(this.mutableBlockPos.set(x, y + 1, z))) {
                        this.specialBlock = true;
                        var _c = (_b = node.parent) !== null && _b !== void 0 ? _b : node, parentX = _c.x, parentY = _c.y, parentZ = _c.z;
                        return this.canReachable(parentX, parentY, parentZ, x, y, z);
                    }
                    return false;
                };
                NodeUtils.isPassable = function (blockPos) {
                    var world = mc.theWorld;
                    var blockState = world.getBlockState(blockPos);
                    var block = blockState === null || blockState === void 0 ? void 0 : blockState.getBlock();
                    return block == null || block.getCollisionBoundingBox(world, blockPos, blockState) == null && !((block instanceof BlockLiquid || block instanceof BlockStaticLiquid) && block.getMaterial() !== Material.water);
                };
                NodeUtils.isNotPassableLiquid = function (blockPos) {
                    var world = mc.theWorld;
                    var blockState = world.getBlockState(blockPos);
                    var block = blockState === null || blockState === void 0 ? void 0 : blockState.getBlock();
                    return block != null && (block instanceof BlockLiquid || block instanceof BlockStaticLiquid) && block.getMaterial() !== Material.water;
                };
                NodeUtils.isNotPassableGround = function (blockPos) {
                    var world = mc.theWorld;
                    var blockState = world.getBlockState(blockPos);
                    var block = blockState === null || blockState === void 0 ? void 0 : blockState.getBlock();
                    return block != null && block.getCollisionBoundingBox(world, blockPos, blockState) != null && (block instanceof BlockFence || block instanceof BlockWall || block instanceof BlockFenceGate);
                };
                NodeUtils.isSpecial = function (blockPos) {
                    var _b;
                    var world = mc.theWorld;
                    var blockRegistry = Block.blockRegistry;
                    var block = (_b = world.getBlockState(blockPos)) === null || _b === void 0 ? void 0 : _b.getBlock();
                    return block != null && (block instanceof BlockLadder || block instanceof BlockCarpet || block instanceof BlockSnow && block.isReplaceable(world, blockPos) || block === blockRegistry.getObjectById(111) || block instanceof BlockTrapDoor || block instanceof BlockDoor);
                };
                NodeUtils.canReachable = function (x1, y1, z1, x2, y2, z2, vclip) {
                    if (vclip === void 0) { vclip = false; }
                    var world = mc.theWorld;
                    var mutableBlockPos = this.mutableBlockPos;
                    var list = new ArrayList();
                    if (!vclip) {
                        var y0 = y1;
                        var yBB = new AxisAlignedBB(x1 + 0.5 - 0.3, (y2 < y1 ? y2 : y1) + 0.0626, z1 + 0.5 - 0.3, x1 + 0.5 + 0.3, (y2 > y1 ? y2 : y1) + 1.8 + 0.0626, z1 + 0.5 + 0.3);
                        for (;;) {
                            if (intersects(yBB, x1, y1, z1)) {
                                return false;
                            }
                            if (y1 === y2) {
                                if (intersects(yBB, x1, y1 + (y0 > y2 ? -1 : 1), z1)) {
                                    return false;
                                }
                                break;
                            }
                            if (y1 > y2) {
                                --y1;
                            }
                            else {
                                ++y1;
                            }
                        }
                    }
                    var xBB = new AxisAlignedBB((x2 < x1 ? x2 : x1) + 0.5 - 0.3, y2 + 0.0626, z1 + 0.5 - 0.3, (x2 > x1 ? x2 : x1) + 0.5 + 0.3, y2 + 1.8 + 0.0626, z1 + 0.5 + 0.3);
                    for (;;) {
                        if (intersects(xBB, x1, y1, z1) || intersects(xBB, x1, y1 + 1, z1) || intersects(xBB, x1, y1 - 1, z1)) {
                            return false;
                        }
                        if (x1 === x2) {
                            break;
                        }
                        if (x1 > x2) {
                            --x1;
                        }
                        else {
                            ++x1;
                        }
                    }
                    var zBB = new AxisAlignedBB(x2 + 0.5 - 0.3, y2 + 0.0626, (z2 < z1 ? z2 : z1) + 0.5 - 0.3, x2 + 0.5 + 0.3, y2 + 1.8 + 0.0626, (z2 > z1 ? z2 : z1) + 0.5 + 0.3);
                    for (;;) {
                        if (intersects(zBB, x1, y1, z1) || intersects(zBB, x1, y1 + 1, z1) || intersects(zBB, x1, y1 - 1, z1)) {
                            return false;
                        }
                        if (z1 === z2) {
                            break;
                        }
                        if (z1 > z2) {
                            --z1;
                        }
                        else {
                            ++z1;
                        }
                    }
                    return true;
                    function intersects(bb, x, y, z) {
                        var _b;
                        var blockState = world.getBlockState(mutableBlockPos.set(x, y, z));
                        var size = list.size();
                        (_b = blockState === null || blockState === void 0 ? void 0 : blockState.getBlock()) === null || _b === void 0 ? void 0 : _b.addCollisionBoxesToList(world, mutableBlockPos, blockState, bb, list, null);
                        return size < list.size();
                    }
                };
                NodeUtils.simplifyPath = function (path, limitedDistance) {
                    if (limitedDistance === void 0) { limitedDistance = 10; }
                    if (path.length < 3) {
                        return path;
                    }
                    var finalIndex = 0;
                    var finalPos = path[0];
                    var newPath = [path[0]];
                    for (var index = 1;; ++index) {
                        if (index < path.length) {
                            var flag = false;
                            var _b = path[index], x = _b.x, y = _b.y, z = _b.z;
                            var fx = finalPos.x, fy = finalPos.y, fz = finalPos.z;
                            if (Math.sqrt(Math.pow((x - fx), 2) + Math.pow((y - fy), 2) + Math.pow((z - fz), 2)) > limitedDistance || !this.canReachable(fx, fy, fz, x, y, z)) {
                                flag = true;
                            }
                            if (flag) {
                                --index;
                                if (finalIndex < index) {
                                    newPath.push(finalPos);
                                    finalIndex = index;
                                    finalPos = path[finalIndex];
                                }
                                else {
                                    newPath.push(finalPos);
                                    newPath.push(path[index + 1]);
                                    finalPos = path[index + 2];
                                }
                            }
                        }
                        else {
                            newPath.push(path[index - 1]);
                            break;
                        }
                    }
                    return newPath;
                };
                return NodeUtils;
            }()),
            _b.specialBlock = false,
            _b.mutableBlockPos = new MutableBlockPos(),
            _b),
        _a.NodeSet = (_c = /** @class */ (function () {
                function HashSet() {
                    this.size = 0;
                    this.elements = [];
                }
                HashSet.prototype.add = function (value) {
                    var hash = this.hash(value);
                    var element = this.elements[hash];
                    if (element == null) {
                        this.elements[hash] = new HashSet.Node(value);
                    }
                    else {
                        var node = element;
                        do {
                            if (node.value.equals(value)) {
                                return;
                            }
                            node = node.next;
                        } while (node != null);
                        this.elements[hash] = new HashSet.Node(value, element);
                    }
                    ++this.size;
                };
                HashSet.prototype.contains = function (value) {
                    var hash = this.hash(value);
                    var element = this.elements[hash];
                    if (element != null) {
                        var node = element;
                        do {
                            if (node.value.equals(value)) {
                                return true;
                            }
                            node = node.next;
                        } while (node != null);
                    }
                    return false;
                };
                HashSet.prototype.remove = function (value) {
                    var hash = this.hash(value);
                    var element = this.elements[hash];
                    if (element != null) {
                        var node = element;
                        var prev = null;
                        do {
                            if (node.value.equals(value)) {
                                if (prev == null) {
                                    this.elements[hash] = null;
                                }
                                else {
                                    prev.next = node.next;
                                }
                                --this.size;
                                return;
                            }
                            prev = node;
                            node = node.next;
                        } while (node != null);
                    }
                };
                HashSet.prototype.clear = function () {
                    this.size = 0;
                    this.elements = [];
                };
                HashSet.prototype.isEmpty = function () {
                    return this.size < 1;
                };
                HashSet.prototype.hash = function (value) {
                    var h = value.hashCode();
                    return h ^ (h >> 16) & 0x7FFFFFFF;
                };
                return HashSet;
            }()),
            _c.Node = /** @class */ (function () {
                function Node(value, next) {
                    this.value = value;
                    this.next = next;
                }
                return Node;
            }()),
            _c),
        _a.NodeQueue = /** @class */ (function () {
            function PriorityQueue() {
                this.size = 0;
                this.elements = [];
            }
            PriorityQueue.prototype.add = function (value) {
                if (this.size === 0) {
                    this.elements[0] = value;
                }
                else {
                    this.siftUp(this.size, value);
                }
                ++this.size;
            };
            PriorityQueue.prototype.poll = function () {
                --this.size;
                var result = this.elements[0];
                this.elements[0] = this.elements[this.size];
                this.elements[this.size] = null;
                if (this.size > 1) {
                    this.siftDown(0, this.elements[0]);
                }
                return result;
            };
            PriorityQueue.prototype.peek = function () {
                return this.elements[0];
            };
            PriorityQueue.prototype.clear = function () {
                this.size = 0;
                this.elements = [];
            };
            PriorityQueue.prototype.isEmpty = function () {
                return this.size < 1;
            };
            PriorityQueue.prototype.siftUp = function (key, value) {
                while (key > 0) {
                    var parent_1 = (key - 1) >>> 1;
                    var element = this.elements[parent_1];
                    if (element.compareTo(value) < 0) {
                        break;
                    }
                    this.elements[key] = element;
                    key = parent_1;
                }
                this.elements[key] = value;
            };
            PriorityQueue.prototype.siftDown = function (key, value) {
                var half = this.size >>> 1;
                while (key < half) {
                    var child = (key << 1) + 1;
                    var childElement = this.elements[child];
                    var right = child + 1;
                    if (right < this.size && childElement.compareTo(this.elements[right]) > 0) {
                        childElement = this.elements[child = right];
                    }
                    if (!(childElement.compareTo(value) < 0)) {
                        break;
                    }
                    this.elements[key] = childElement;
                    key = child;
                }
                this.elements[key] = value;
            };
            return PriorityQueue;
        }()),
        _a);
    return VanillaTPAura;
}());
var scriptModule;
function onLoad() { }
function onEnable() {
    scriptModule = moduleManager.registerModule(new VanillaTPAura());
}
function onDisable() {
    moduleManager.unregisterModule(scriptModule);
}