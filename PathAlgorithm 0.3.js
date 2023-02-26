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
var AttackEvent = Java.type("net.ccbluex.liquidbounce.event.AttackEvent");
var ClickBlockEvent = Java.type("net.ccbluex.liquidbounce.event.ClickBlockEvent");
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
var RenderUtils = Java.type("net.ccbluex.liquidbounce.utils.render.RenderUtils");
var BlockValue = Java.type("net.ccbluex.liquidbounce.value.BlockValue");
var BoolValue = Java.type("net.ccbluex.liquidbounce.value.BoolValue");
var FloatValue = Java.type("net.ccbluex.liquidbounce.value.FloatValue");
var IntegerValue = Java.type("net.ccbluex.liquidbounce.value.IntegerValue");
var ListValue = Java.type("net.ccbluex.liquidbounce.value.ListValue");
var TextValue = Java.type("net.ccbluex.liquidbounce.value.TextValue");
var BlockSnow = Java.type("net.minecraft.block.BlockSnow");
var BlockWeb = Java.type("net.minecraft.block.BlockWeb");
var GlStateManager = Java.type("net.minecraft.client.renderer.GlStateManager");
var AxisAlignedBB = Java.type("net.minecraft.util.AxisAlignedBB");
var BlockPos = Java.type("net.minecraft.util.BlockPos");
var GL11 = Java.type("org.lwjgl.opengl.GL11");
var scriptName = "PathAlgorithm";
var scriptVersion = 0.3;
var scriptAuthor = "mumy++";
var PathAlgorithm = /** @class */ (function () {
    function PathAlgorithm() {
        var _this = this;
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
            setStart: this.setting.boolean("SetStart", false, {
                onChanged: function (oldValue, newValue) {
                    if (!newValue) {
                        return;
                    }
                    var player = mc.thePlayer;
                    _this.start = new PathAlgorithm.Pos(Math.floor(player.posX), Math.floor(player.posY), Math.floor(player.posZ));
                    _this.aStarAlgorithm = null;
                    _this.settings.setStart.set(false);
                }
            }),
            setEnd: this.setting.boolean("SetEnd", false, {
                onChanged: function (oldValue, newValue) {
                    if (!newValue) {
                        return;
                    }
                    var player = mc.thePlayer;
                    _this.end = new PathAlgorithm.Pos(Math.floor(player.posX), Math.floor(player.posY), Math.floor(player.posZ));
                    _this.aStarAlgorithm = null;
                    _this.settings.setEnd.set(false);
                }
            }),
            gWeight: this.setting.float("GWeight", 1.00005, 0, 2),
            hWeight: this.setting.float("HWeight", 1, 0, 2),
            speed: this.setting.integer("Speed", 1, 1, 50),
            reset: this.setting.boolean("Reset", false, {
                onChanged: function (oldValue, newValue) {
                    if (!newValue) {
                        return;
                    }
                    _this.start = null;
                    _this.end = null;
                    _this.aStarAlgorithm = null;
                    _this.settings.reset.set(false);
                }
            })
        };
        this.start = null;
        this.end = null;
        this.aStarAlgorithm = null;
        this.openColor = new Color(200, 200, 200);
        this.closeColor = new Color(127, 127, 127);
        this.pathColor = new Color(0, 220, 220);
    }
    PathAlgorithm.prototype.getName = function () {
        return "PathAlgorithm";
    };
    PathAlgorithm.prototype.getDescription = function () {
        return "PathAlgorithm-Module, By-mumy";
    };
    PathAlgorithm.prototype.getCategory = function () {
        return "Misc";
    };
    PathAlgorithm.prototype.onEnable = function () {
        this.start = null;
        this.end = null;
        this.aStarAlgorithm = null;
    };
    PathAlgorithm.prototype.onDisable = function () {
        this.onEnable();
    };
    PathAlgorithm.prototype.onUpdate = function () {
        if (this.start != null && this.end != null) {
            if (this.aStarAlgorithm == null) {
                this.aStarAlgorithm = new PathAlgorithm.AStarAlgorithm(this.start, this.end, this.settings.hWeight.get(), this.settings.gWeight.get());
            }
            this.aStarAlgorithm.update(this.settings.speed.get());
        }
    };
    PathAlgorithm.prototype.onRender3D = function (event) {
        var _a;
        if (this.start != null && this.aStarAlgorithm == null) {
            var _b = this.start, x = _b.x, y = _b.y, z = _b.z;
            this.drawEntityBox(new AxisAlignedBB(x, y, z, x + 1, y + 1, z + 1), this.openColor);
        }
        if (this.end != null && ((_a = this.aStarAlgorithm) === null || _a === void 0 ? void 0 : _a.path) == null) {
            var _c = this.end, x = _c.x, y = _c.y, z = _c.z;
            this.drawEntityBox(new AxisAlignedBB(x, y, z, x + 1, y + 1, z + 1), this.openColor);
        }
        if (this.aStarAlgorithm != null) {
            if (this.aStarAlgorithm.path != null) {
                for (var _i = 0, _d = this.aStarAlgorithm.path; _i < _d.length; _i++) {
                    var pos = _d[_i];
                    var x = pos.x, y = pos.y, z = pos.z;
                    this.drawEntityBox(new AxisAlignedBB(x, y, z, x + 1, y + 1, z + 1), this.pathColor);
                }
            }
            else {
                for (var _e = 0, _f = this.aStarAlgorithm.openList; _e < _f.length; _e++) {
                    var pos = _f[_e];
                    var x = pos.x, y = pos.y, z = pos.z;
                    this.drawEntityBox(new AxisAlignedBB(x, y, z, x + 1, y + 1, z + 1), this.openColor);
                }
                for (var _g = 0, _h = this.aStarAlgorithm.closeList; _g < _h.length; _g++) {
                    var pos = _h[_g];
                    var x = pos.x, y = pos.y, z = pos.z;
                    this.drawEntityBox(new AxisAlignedBB(x, y, z, x + 1, y + 1, z + 1), this.closeColor);
                }
            }
        }
    };
    PathAlgorithm.prototype.onWorld = function (event) {
        moduleManager.getModule(this.getName()).setState(false);
    };
    PathAlgorithm.prototype.addValues = function (values) {
        var settings = this.settings;
        for (var key in settings) {
            values.add(settings[key]);
        }
    };
    PathAlgorithm.prototype.drawEntityBox = function (entityBox, color) {
        var renderManager = mc.getRenderManager();
        GL11.glBlendFunc(GL11.GL_SRC_ALPHA, GL11.GL_ONE_MINUS_SRC_ALPHA);
        RenderUtils.enableGlCap(GL11.GL_BLEND);
        RenderUtils.disableGlCap(GL11.GL_TEXTURE_2D, GL11.GL_DEPTH_TEST);
        GL11.glDepthMask(false);
        RenderUtils.glColor(color.getRed(), color.getGreen(), color.getBlue(), 26);
        var axisAlignedBB = new AxisAlignedBB(entityBox.minX - renderManager.renderPosX, entityBox.minY - renderManager.renderPosY, entityBox.minZ - renderManager.renderPosZ, entityBox.maxX - renderManager.renderPosX, entityBox.maxY - renderManager.renderPosY, entityBox.maxZ - renderManager.renderPosZ);
        RenderUtils.drawFilledBox(axisAlignedBB);
        GL11.glLineWidth(1);
        RenderUtils.enableGlCap(GL11.GL_LINE_SMOOTH);
        RenderUtils.glColor(color.getRed(), color.getGreen(), color.getBlue(), 95);
        RenderUtils.drawSelectionBoundingBox(axisAlignedBB);
        GlStateManager.resetColor();
        GL11.glDepthMask(true);
        RenderUtils.resetCaps();
    };
    PathAlgorithm.Pos = /** @class */ (function () {
        function Pos(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        Pos.prototype.equals = function (pos) {
            return pos.x === this.x && pos.y === this.y && pos.z === this.z;
        };
        return Pos;
    }());
    PathAlgorithm.Node = /** @class */ (function (_super) {
        __extends(Node, _super);
        function Node(x, y, z, parent) {
            var _this = this;
            var _a;
            _this = _super.call(this, x, y, z) || this;
            _this.x = x;
            _this.y = y;
            _this.z = z;
            _this.parent = parent;
            _this.cost = 0;
            _this.hCost = 0;
            _this.hCost = ((_a = parent === null || parent === void 0 ? void 0 : parent.hCost) !== null && _a !== void 0 ? _a : -1) + 1;
            return _this;
        }
        return Node;
    }(PathAlgorithm.Pos));
    PathAlgorithm.AStarAlgorithm = /** @class */ (function () {
        function AStarAlgorithm(start, end, hWeight, gWeight) {
            this.openList = [];
            this.closeList = [];
            this.path = null;
            this.start = start;
            this.end = end;
            this.hWeight = hWeight;
            this.gWeight = gWeight;
            this.openList.push(new PathAlgorithm.Node(start.x, start.y, start.z, null));
        }
        AStarAlgorithm.prototype.update = function (loops) {
            if (this.path != null) {
                return false;
            }
            top: while (loops-- > 0) {
                if (this.openList.length === 0) {
                    return false;
                }
                var node = this.getNode();
                for (var _i = 0, _a = this.closeList; _i < _a.length; _i++) {
                    var pos = _a[_i];
                    if (node.equals(pos)) {
                        continue top;
                    }
                }
                if (!this.canPassable(new BlockPos(node.x, node.y, node.z))) {
                    continue;
                }
                if (node.equals(this.end)) {
                    this.path = [];
                    var temp = node;
                    do {
                        this.path.push(temp);
                        temp = temp.parent;
                    } while (temp != null);
                    this.path.reverse();
                    return false;
                }
                this.closeList.push(node);
                var x = node.x, y = node.y, z = node.z;
                this.createNodeToOpenList(x + 1, y, z, node);
                this.createNodeToOpenList(x, y + 1, z, node);
                this.createNodeToOpenList(x, y, z + 1, node);
                this.createNodeToOpenList(x - 1, y, z, node);
                this.createNodeToOpenList(x, y - 1, z, node);
                this.createNodeToOpenList(x, y, z - 1, node);
            }
            return true;
        };
        AStarAlgorithm.prototype.createNodeToOpenList = function (x, y, z, parent) {
            var node = new PathAlgorithm.Node(x, y, z, parent);
            var _a = [Math.abs(node.x - this.end.x), Math.abs(node.y - this.end.y), Math.abs(node.z - this.end.z)], xDist = _a[0], yDist = _a[1], zDist = _a[2];
            node.cost = node.hCost * this.gWeight + (xDist + yDist + zDist) * this.hWeight;
            this.openList.push(node);
        };
        AStarAlgorithm.prototype.getNode = function () {
            var finalIndex = -1;
            var finalCost = -1;
            var finalNode = null;
            for (var i = this.openList.length - 1; !(i < 0); --i) {
                var node = this.openList[i];
                var cost = node.cost;
                if (finalNode == null || cost < finalCost) {
                    finalNode = node;
                    finalCost = cost;
                    finalIndex = i;
                }
                if (i === 0) {
                    this.openList.splice(finalIndex, 1);
                }
            }
            return finalNode;
        };
        AStarAlgorithm.prototype.canPassable = function (blockPos) {
            var world = mc.theWorld;
            var iBlockState = world.getBlockState(blockPos);
            var block = iBlockState.getBlock();
            return block.getCollisionBoundingBox(world, blockPos, iBlockState) == null ? !(block instanceof BlockWeb) : block instanceof BlockSnow && block.isReplaceable(world, blockPos);
        };
        return AStarAlgorithm;
    }());
    return PathAlgorithm;
}());
var scriptModule;
function onLoad() { }
function onEnable() {
    scriptModule = moduleManager.registerModule(new PathAlgorithm());
}
function onDisable() {
    moduleManager.unregisterModule(scriptModule);
}