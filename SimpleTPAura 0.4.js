///engine_flags=--language=es6
var scriptName = "SimpleTPAura";
var scriptVersion = 0.4;
var scriptAuthor = "mumy++";

var Color = Java.type("java.awt.Color");
var Timer = Java.type("java.util.Timer");
var AtomicInteger = Java.type("java.util.concurrent.atomic.AtomicInteger");
var LiquidBounce = Java.type("net.ccbluex.liquidbounce.LiquidBounce");
var AttackEvent = Java.type("net.ccbluex.liquidbounce.event.AttackEvent");
var EventState = Java.type("net.ccbluex.liquidbounce.event.EventState");
var AntiBot = Java.type("net.ccbluex.liquidbounce.features.module.modules.misc.AntiBot");
var EntityUtils = Java.type("net.ccbluex.liquidbounce.utils.EntityUtils");
var RaycastUtils = Java.type("net.ccbluex.liquidbounce.utils.RaycastUtils");
var ColorUtils = Java.type("net.ccbluex.liquidbounce.utils.render.ColorUtils");
var RenderUtils = Java.type("net.ccbluex.liquidbounce.utils.render.RenderUtils");
var MSTimer = Java.type("net.ccbluex.liquidbounce.utils.timer.MSTimer");
var BlockValue = Java.type("net.ccbluex.liquidbounce.value.BlockValue");
var BoolValue = Java.type("net.ccbluex.liquidbounce.value.BoolValue");
var FloatValue = Java.type("net.ccbluex.liquidbounce.value.FloatValue");
var IntegerValue = Java.type("net.ccbluex.liquidbounce.value.IntegerValue");
var ListValue = Java.type("net.ccbluex.liquidbounce.value.ListValue");
var TextValue = Java.type("net.ccbluex.liquidbounce.value.TextValue");
var BlockFence = Java.type("net.minecraft.block.BlockFence");
var BlockFenceGate = Java.type("net.minecraft.block.BlockFenceGate");
var BlockLiquid = Java.type("net.minecraft.block.BlockLiquid");
var BlockSnow = Java.type("net.minecraft.block.BlockSnow");
var BlockStaticLiquid = Java.type("net.minecraft.block.BlockStaticLiquid");
var BlockWall = Java.type("net.minecraft.block.BlockWall");
var Material = Java.type("net.minecraft.block.material.Material");
var GlStateManager = Java.type("net.minecraft.client.renderer.GlStateManager");
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
var C04PacketPlayerPosition = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition");
var C05PacketPlayerLook = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook");
var C0BPacketEntityAction = Java.type("net.minecraft.network.play.client.C0BPacketEntityAction");
var AxisAlignedBB =  Java.type("net.minecraft.util.AxisAlignedBB");
var BlockPos = Java.type("net.minecraft.util.BlockPos");
var MutableBlockPos = Java.type("net.minecraft.util.BlockPos.MutableBlockPos");
var GL11 = Java.type("org.lwjgl.opengl.GL11");

function SimpleTPAura() {

    //???????????????By-mumy
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
        },
        block: function (name, def, object) {
            return object == null ? value.createBlock(name, def) : new _AdaptedValue(new (Java.extend(BlockValue, object))(name, def));
        }
    };

    //????????????
    const settings = {

        //CPS???????????????
        cps: setting.float("CPS", 2, 0, 20),

        //??????
        range: setting.float("Range", 30, 0, 128),

        //????????????
        hurtTime: setting.integer("HurtTime", 20, 0, 20),

        //?????????
        targets: setting.integer("Targets", 1, 1, 10),

        //?????????
        compute: setting.integer("Compute", 2048, 10, 5000),

        //????????????
        blinkDistance: setting.float("BlinkDistance", 5, 1, 10),

        //??????
        click: setting.boolean("Click", false),

        //????????????
        vClip: setting.boolean("VClip", true),

        //??????
        swing: setting.boolean("Swing", true),

        //??????
        criticals: setting.boolean("Criticals", true),

        //????????????
        aimTarget: setting.boolean("AimTarget", true),

        //????????????
        throughWalls: setting.boolean("ThroughWalls", true),

        //????????????
        spoofGround: setting.boolean("SpoofGround", true),

        //????????????
        renderPath: setting.boolean("RenderPath", true)
    };

    //????????????
    let targetList = [];

    //??????????????????
    let renderPath = [];

    //???????????????
    const updateTimer = new MSTimer();
    let updateDelay = 0;

    //???????????????
    let attackKey = false;

    //????????????
    const taskCount = new AtomicInteger(0);

    //??????????????????
    const pathColor = new Color(0, 127, 255);

    this.getName = function () {
        return "SimpleTPAura";
    }

    this.getDescription = function () {
        return "SimpleTPAura-Module, By-mumy";
    }

    this.getCategory = function () {
        return "Misc";
    }

    this.onEnable = function () {
        //??????
        targetList = [];
        renderPath = [];
    }

    this.onDisable = function () {
        
    }

    this.onUpdate = function () {
        //??????????????????????????????????????????????????????
        if (!mc.thePlayer.isRiding()) {
            return;
        }

        //??????????????????
        if (renderPath.length !== 0) {
            renderPath = [];
        }
    }

    this.onMotion = function (event) {

        //?????????????????????EventState.PRE
        if (event.getEventState() !== EventState.PRE) {
            return;
        }

        //????????????????????????????????????????????????0?????????
        if (taskCount.get() > 0) {
            return;
        }

        //?????????????????????
        if (settings.click.get()) {

            //??????????????????
            if (renderPath.length !== 0) {
                renderPath = [];
            }

            //?????????????????????
            if (mc.gameSettings.keyBindAttack.isKeyDown()) {

                //????????????
                if (attackKey) {
                    return;
                }

                //??????
                attackKey = true;

                //?????????????????????
                const entity = RaycastUtils.raycastEntity(128, function (entity) {
                    return isEnemy(entity);
                });

                //????????????
                if (entity != null) {

                    //????????????????????????
                    setTimeout(function () {

                        //????????????
                        attackEntity(entity);

                    }, 0);

                }
            } else {
                //??????
                attackKey = false;
            }

        } else if (updateTimer.hasTimePassed(updateDelay)) {
            update();
            updateTimer.reset();
            updateDelay = Math.floor(1000 / settings.cps.get());
        }

    }

    this.onRender3D = function (event) {

        //????????????
        if (settings.renderPath.get()) {
            for (let p = 0; p < renderPath.length; ++p) {
                const path = renderPath[p];
                for (let i = 0; i < path.length; ++i) {
                    drawNode(path[i], pathColor);
                }
            }
        }

    }

    this.onWorld = function (event) {
        //????????????
        moduleManager.getModule(this.getName()).setState(false);
    }

    this.addValues = function (values) {
        //???????????????????????????
        for (let i in settings) {
            values.add(settings[i]);
        }
    }

    //??????
    function update() {

        //?????????????????????0????????????????????????Nashorn??????????????????????????????
        if (taskCount.get() > 0) {
            return;
        }

        //??????????????????
        updateTarget();

        //??????????????????
        if (renderPath.length !== 0) {
            renderPath = [];
        }

        //?????????????????????????????????
        if (targetList.length === 0) {
            return;
        }

        //??????????????????????????????????????????????????????
        setTimeout(function() {

            const targets = settings.targets.get();
            //??????????????????????????????????????????????????????5
            const maximum = targets + 5;
            let count = 0;

            //?????????????????????????????????????????????
            for (let i = 0; i < targetList.length && i < maximum && count < targets; ++i) {
                if (attackEntity(targetList[i])) {
                    ++count;
                }
            }

        }, 0);

    }

    //????????????
    function updateTarget() {

        //????????????
        targetList = [];

        //????????????????????????????????????????????????
        const entityList = mc.theWorld.loadedEntityList;
        const hurtTime = settings.hurtTime.get();
        const range = settings.range.get();

        //???????????????????????????????????????
        for (let i = 0; i < entityList.length; ++i) {
            const entity = entityList[i];
            if (!(entity.hurtResistantTime > hurtTime) && getDistanceToEntityBox(entity) < range && isEnemy(entity)) {
                targetList.push(entity);
            }
        }

        //??????????????????
        if (targetList.length === 0) {
            return;
        }

        //????????????????????????????????????????????????
        targetList.sort(function (a, b) {
            return getDistanceToEntityBox(a) - getDistanceToEntityBox(b);
        });

    }

    //????????????
    function attackEntity(entity) {

        //??????
        const netHandler = mc.getNetHandler();
        const player = mc.thePlayer;

        //????????????????????????????????????????????????????????????
        const target = entity instanceof EntityDragon ? entity.dragonPartBody : entity;

        //?????????????????????
        const start = new Vec3(Math.floor(player.posX), Math.round(player.posY), Math.floor(player.posZ));
        const end = new Vec3(Math.floor(target.posX), Math.floor(target.posY), Math.floor(target.posZ));

        //????????????
        let path = findPath(end, start, player, target);

        //??????????????????
        if (path == null) {
            //????????????
            return false;
        }

        //????????????
        const sneak = player.isSneaking() || moduleManager.getModule("Sneak").getState();

        //?????????????????????
        if (sneak) {
            netHandler.addToSendQueue(new C0BPacketEntityAction(player, C0BPacketEntityAction.Action.STOP_SNEAKING));
        }

        //???????????????
        const goPath = simplifyPath(path);

        //????????????????????????????????????????????????
        if (settings.renderPath.get()) {
            renderPath.push(goPath);
        }

        //??????????????????
        const ground = settings.spoofGround.get();

        //????????????
        for (let i = 0; i < goPath.length; ++i) {
            const node = goPath[i];
            netHandler.addToSendQueue(new C04PacketPlayerPosition(node.x + 0.5, ground ? Math.ceil((node.y + 0.0626) / 0.015625) * 0.015625 : node.y + 0.0626, node.z + 0.5, ground));
        }

        //??????????????????
        if (settings.aimTarget.get()) {
            const node = path[path.length - 1];
            const bb = target.getEntityBoundingBox();
            const x = node.x + 0.5, y = node.y + 0.0626 + player.getEyeHeight(), z = node.z + 0.5;
            const diffX = x - Math.max(bb.minX, Math.min(x, bb.maxX));
            const diffY = y - Math.max(bb.minY, Math.min(y, bb.maxY));
            const diffZ = z - Math.max(bb.minZ, Math.min(z, bb.maxZ));
            const yaw = Math.toDegrees(Math.atan2(diffZ, diffX)) - 90;
            const pitch = -Math.toDegrees(Math.atan2(diffY, Math.sqrt(diffX * diffX + diffZ * diffZ)));
            netHandler.addToSendQueue(new C05PacketPlayerLook(yaw, pitch, ground));
        }

        //??????????????????
        if (settings.criticals.get()) {
            const node = path[path.length - 1];
            const x = node.x + 0.5, y = node.y + 0.0626, z = node.z + 0.5;
            netHandler.addToSendQueue(new C04PacketPlayerPosition(x, y + 0.0625, z, false));
            netHandler.addToSendQueue(new C04PacketPlayerPosition(x, y, z, false));
            netHandler.addToSendQueue(new C04PacketPlayerPosition(x, y + 0.0125, z, false));
            netHandler.addToSendQueue(new C04PacketPlayerPosition(x, y, z, false));
        }

        //??????????????????
        LiquidBounce.eventManager.callEvent(new AttackEvent(target));

        //??????
        if (settings.swing.get()) {
            player.swingItem();
        }

        //????????????
        netHandler.addToSendQueue(new C02PacketUseEntity(target, C02PacketUseEntity.Action.ATTACK));

        //????????????
        const backPath = simplifyPath(path.reverse());

        for (let i = 0; i < backPath.length; ++i) {
            const node = backPath[i];
            netHandler.addToSendQueue(new C04PacketPlayerPosition(node.x + 0.5, ground ? Math.ceil((node.y + 0.0626) / 0.015625) * 0.015625 : node.y + 0.0626, node.z + 0.5, ground));
        }

        //????????????
        netHandler.addToSendQueue(new C04PacketPlayerPosition(player.posX, player.posY, player.posZ, ground));

        //??????????????????
        if (sneak) {
            netHandler.addToSendQueue(new C0BPacketEntityAction(player, C0BPacketEntityAction.Action.START_SNEAKING));
        }

        //????????????
        return true;

    }

    //??????
    function findPath(start, end, player, entity) {

        //??????
        const world = mc.theWorld;

        //??????BlockPos
        const mutableBlockPos = new MutableBlockPos();

        //????????????
        const throughWalls = settings.throughWalls.get();

        //????????????????????????????????????????????????????????????????????????????????????
        if (!check(end.x, end.y, end.z)) {
            for (let i = 1; i < settings.blinkDistance.get(); ++i) {
                if (check(end.x, end.y + i, end.z)) {
                    end.y += i;
                    break;
                }
            }
        } if (!throughWalls && !check(start.x, start.y, start.z)) {
            for (let i = 1; i < 4; ++i) {
                if (check(start.x, start.y + i, start.z)) {
                    start.y += i;
                    break;
                }
            }
        }

        //???????????????????????????
        if (!throughWalls && !check(start.x, start.y, start.z) || !check(end.x, end.y, end.z)) {
            return null;
        }

        /*
         * =============================
         *  ??????????????????A*  F????????????G??????
         * =============================
         */

        //???????????????
        const openList = new NodePriorityQueue();
        const closeList = new NodeSet();

        //??????XYZ??????
        const startX = start.x;
        const startY = start.y;
        const startZ = start.z;

        //??????XYZ
        const endX = end.x;
        const endY = end.y;
        const endZ = end.z;

        //????????????????????????
        const compute = settings.compute.get();

        //??????vClip
        const vClip = settings.vClip.get();

        //?????????
        init();

        //????????????
        while (openList.size !== 0 && closeList.size < compute) {

            //??????????????????
            let node = openList.poll();

            //??????
            const x = node.x;
            const y = node.y;
            const z = node.z;

            //?????????
            if (closeList.contains(node)) {
                continue;
            }

            //????????????
            if (!check(x, y, z)) {

                //??????vClip
                if (vClip) {

                    //??????????????????
                    const parent = node.parent;
                    if (parent == null) {
                        continue;
                    }

                    //??????
                    const parentX = parent.x;
                    const parentY = parent.y;
                    const parentZ = parent.z;

                    //????????????????????????
                    if (!check(parentX, parentY + 1, parentZ)) {
                        upVClip(parentX, parentY, parentZ, parent);
                    } if (!check(parentX, parentY - 1, parentZ)) {
                        downVClip(parentX, parentY, parentZ, parent);
                    }
                }

                continue;
            }

            //???????????????
            if (x === endX && y === endY && z === endZ) {

                //??????????????????????????????????????????
                const path = [];
                do {
                    path.push(node);
                    node = node.parent;
                } while (node != null);

                //????????????
                return path;
            }

            //???????????????
            closeList.put(node);

            //????????????????????????????????????????????????
            addToOpenList(x + 1, y, z, node);
            addToOpenList(x, y + 1, z, node);
            addToOpenList(x, y, z + 1, node);
            addToOpenList(x - 1, y, z, node);
            addToOpenList(x, y - 1, z, node);
            addToOpenList(x, y, z - 1, node);

        }
        //????????????????????????null
        return null;

        //???????????????
        function init() {

            //????????????????????????
            openList.add(new Node(startX, startY, startZ, null, 0, 0));

            //????????????
            if (throughWalls) {

                //??????????????????????????????
                for (let sX = -3; sX < 4; ++sX) {
                    for (let sY = -3; sY < 4; ++sY) {
                        for (let sZ = -3; sZ < 4; ++sZ) {

                            //??????
                            const x = startX + sX;
                            const y = startY + sY;
                            const z = startZ + sZ;

                            //????????????3??????????????????
                            if (Math.pow(x + 0.5 - entity.posX, 2) + Math.pow(y + 0.0626 - entity.posY, 2) + Math.pow(z + 0.5 - entity.posZ, 2) < 8.5) {

                                //????????????
                                const xDist = Math.abs(x - endX);
                                const yDist = Math.abs(y - endY);
                                const zDist = Math.abs(z - endZ);
                                const gCost = xDist + yDist + zDist;
                                const fCost = gCost + xDist + yDist + zDist + Math.sqrt(xDist * xDist + yDist * yDist + zDist * zDist);
                                
                                //???????????????
                                openList.add(new Node(x, y, z, null, gCost, fCost));
                            }

                        }
                    }
                }
            }

        }

        //?????????????????????
        function addToOpenList(x, y, z, parent) {

            //XYZ??????
            const xDist = Math.abs(x - endX);
            const yDist = Math.abs(y - endY);
            const zDist = Math.abs(z - endZ);

            //????????????
            const gCost = parent.gCost + 1;

            //??????????????????????????????????????????????????????
            const fCost = gCost + xDist + yDist + zDist + Math.sqrt(xDist * xDist + yDist * yDist + zDist * zDist);

            //???????????????
            openList.add(new Node(x, y, z, parent, gCost, fCost));
        }

        //??????vClip
        function upVClip(x, y, z, parent) {

            //??????Y
            let finalY = y;

            //????????????
            const blinkDistance = Math.floor(settings.blinkDistance.get()) + 1;

            //??????????????????????????????
            for (let i = 2; i < blinkDistance; ++i) {
                if (check(x, y + i, z)) {
                    finalY = y + i;
                }
            }

            //????????????Y????????????
            if (finalY > y) {

                //????????????
                const xDist = Math.abs(x - endX);
                const yDist = Math.abs(finalY - endY);
                const zDist = Math.abs(z - endZ);
                const gCost = parent.gCost + Math.abs(finalY - y);
                const fCost = gCost + xDist + yDist + zDist + Math.sqrt(xDist * xDist + yDist * yDist + zDist * zDist);

                //?????????????????????
                openList.add(new Node(x, finalY, z, parent, gCost, fCost));
            }

        }

        //??????vClip
        function downVClip(x, y, z, parent) {

            //??????Y
            let finalY = y;

            //????????????
            const blinkDistance = Math.floor(settings.blinkDistance.get()) + 1;

            //??????????????????????????????
            for (let i = 3; i < blinkDistance; ++i) {
                if (check(x, y - i, z)) {
                    finalY = y - i;
                }
            }

            //????????????Y????????????
            if (finalY < y) {

                //????????????
                const xDist = Math.abs(x - endX);
                const yDist = Math.abs(finalY - endY);
                const zDist = Math.abs(z - endZ);
                const gCost = parent.gCost + Math.abs(finalY - y);
                const fCost = gCost + xDist + yDist + zDist + Math.sqrt(xDist * xDist + yDist * yDist + zDist * zDist);

                //?????????????????????
                openList.add(new Node(x, finalY, z, parent, gCost, fCost));
            }
        }

        //?????????????????????
        function check(x, y, z) {
            return passable(x, y, z) && passable(x, y + 1, z) && groundPassable(x, y - 1, z);
        }

        //???????????????????????????
        function passable(x, y, z) {
            const blockState = world.getBlockState(mutableBlockPos.set(x, y, z));
            const block = blockState.getBlock();
            return block.getCollisionBoundingBox(world, mutableBlockPos, blockState) == null ? !((block instanceof BlockLiquid || block instanceof BlockStaticLiquid) && block.getMaterial() !== Material.water) : block instanceof BlockSnow && block.isReplaceable(world, mutableBlockPos);
        }

        //???????????????????????????????????????
        function groundPassable(x, y, z) {
            const blockState = world.getBlockState(mutableBlockPos.set(x, y, z));
            const block = blockState.getBlock();
            return block.getCollisionBoundingBox(world, mutableBlockPos, blockState) == null || !(block instanceof BlockFence || block instanceof BlockWall || block instanceof BlockFenceGate);
        }

    }

    //????????????
    function simplifyPath(path) {

        //????????????
        const blinkDistance = settings.blinkDistance.get();

        //?????????????????????1??????????????????
        if (!(blinkDistance > 1)) {
            return path;
        }

        //??????
        const world = mc.theWorld;

        //??????BlockPos
        const mutableBlockPos = new MutableBlockPos();

        //???????????????????????????
        const finalPath = [path[0]];
        let finalNode = path[0];

        //???????????????
        let index = 0;
        let flag = false;

        //????????????VClip
        const vClip = settings.vClip.get();

        //??????
        for (;;) {

            //??????????????????????????????
            if (index < path.length) {

                //????????????
                const node = path[index];

                //XYZ?????????
                const xDist = finalNode.x - node.x;
                const yDist = finalNode.y - node.y;
                const zDist = finalNode.z - node.z;

                //??????XYZ?????????????????????????????????
                if (xDist * xDist + yDist * yDist + zDist * zDist > blinkDistance * blinkDistance) {
                    //??????
                    flag = true;
                }

                //??????????????????????????????vClip
                if (!flag && (!vClip || xDist !== 0 || zDist !== 0)) {

                    //????????????????????????
                    if (!reachable(finalNode.x, finalNode.y, finalNode.z, node.x, node.y, node.z)) {
                        //??????
                        flag = true;
                    }

                }

                //???????????????
                if (flag) {

                    //???????????????????????????????????????
                    --index;

                    finalPath.push(path[index]);
                    finalNode = path[index];

                    //????????????
                    flag = false;
                }

                //????????????
                ++index;
            } else {

                //??????????????????
                finalPath.push(path[index - 1]);

                //????????????
                return finalPath;
            }
        }

        //??????????????????????????????
        function reachable(x, y, z, x2, y2, z2) {

            //Y????????????
            const yMove = y2 < y ? -1 : 1;

            //??????Y???????????????
            for (;;) {
                if (!passable(x, y, z)) {
                    return false;
                } if (y === y2) {
                    if (!(yMove === -1 ? groundPassable(x, y - 1, z) : passable(x, y + 1, z))) {
                        return false;
                    }
                    break;
                } if (y > y2) {
                    --y;
                } else {
                    ++y;
                }
            }

            //??????X???????????????
            for (;;) {
                if (!passable(x, y, z) || !passable(x, y + 1, z) || !groundPassable(x, y - 1, z)) {
                    return false;
                } if (x === x2) {
                    break;
                } if (x > x2) {
                    --x;
                } else {
                    ++x;
                }
            }

            //??????Z???????????????
            for (;;) {
                if (!passable(x, y, z) || !passable(x, y + 1, z) || !groundPassable(x, y - 1, z)) {
                    return false;
                } if (z === z2) {
                    break;
                } if (z > z2) {
                    --z;
                } else {
                    ++z;
                }
            }

            //????????????
            return true;

        }

        //???????????????????????????
        function passable(x, y, z) {
            const blockState = world.getBlockState(mutableBlockPos.set(x, y, z));
            const block = blockState.getBlock();
            return block.getCollisionBoundingBox(world, mutableBlockPos, blockState) == null ? !((block instanceof BlockLiquid || block instanceof BlockStaticLiquid) && block.getMaterial() !== Material.water) : block instanceof BlockSnow && block.isReplaceable(world, mutableBlockPos);
        }

        //???????????????????????????????????????
        function groundPassable(x, y, z) {
            const blockState = world.getBlockState(mutableBlockPos.set(x, y, z));
            const block = blockState.getBlock();
            return block.getCollisionBoundingBox(world, mutableBlockPos, blockState) == null || !(block instanceof BlockFence || block instanceof BlockWall || block instanceof BlockFenceGate);
        }

    }

    //?????????????????????????????????????????????
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


    //???????????????????????????
    function isEnemy(entity) {

        //????????????????????????????????????
        if (entity instanceof EntityLivingBase && (EntityUtils.targetDead || entity.isEntityAlive() && entity.getHealth() > 0) && entity !== mc.thePlayer) {

            //??????????????????
            if (!EntityUtils.targetInvisible && entity.isInvisible()) {
                return false
            }

            //???????????????????????????
            if (EntityUtils.targetPlayer && entity instanceof EntityPlayer) {

                //????????????????????????
                if (entity.isSpectator() || AntiBot.isBot(entity)) {
                    return false
                }

                //?????????????????????
                if (isFriend(entity) && !moduleManager.getModule("NoFriends").getState()) {
                    return false;
                }

                //???????????????
                const teams = LiquidBounce.moduleManager.getModule("Teams");
                return !teams.getState() || !teams.isInYourTeam(entity);

            }

            //???????????????
            return EntityUtils.targetMobs && isMob(entity) || EntityUtils.targetAnimals && isAnimal(entity);
        }

        return false;

        //?????????????????????
        function isAnimal(entity) {
            return entity instanceof EntityAnimal || entity instanceof EntitySquid || entity instanceof EntityGolem || entity instanceof EntityBat;
        }

        //?????????????????????
        function isFriend(entity) {
            return entity instanceof EntityPlayer && entity.getName() != null && LiquidBounce.fileManager.friendsConfig.isFriend(ColorUtils.stripColor(entity.getName()));
        }

        //?????????????????????
        function isMob(entity) {
            return entity instanceof EntityMob || entity instanceof EntityVillager || entity instanceof EntitySlime || entity instanceof EntityGhast || entity instanceof EntityDragon;
        }

    }

    //????????????
    function setTimeout(func, delay) {

        //?????????????????????
        taskCount.incrementAndGet();

        //???????????????????????????
        (new Timer("setTimeout", true)).schedule(function() {

            //????????????
            try {
                func();
            } catch (err) {
                //chat.print(err);
            }

            //?????????????????????
            taskCount.decrementAndGet();

        }, delay);
    }

    //?????????????????????
    function drawNode(node, color) {
        const renderManager = mc.getRenderManager();
        GL11.glBlendFunc(GL11.GL_SRC_ALPHA, GL11.GL_ONE_MINUS_SRC_ALPHA);
        RenderUtils.enableGlCap(GL11.GL_BLEND);
        RenderUtils.disableGlCap(GL11.GL_TEXTURE_2D, GL11.GL_DEPTH_TEST);
        GL11.glDepthMask(false);
        RenderUtils.glColor(color.getRed(), color.getGreen(), color.getBlue(), 26);
        const axisAlignedBB = new AxisAlignedBB(
            node.x - renderManager.renderPosX,
            node.y - renderManager.renderPosY,
            node.z - renderManager.renderPosZ,
            node.x + 1 - renderManager.renderPosX,
            node.y + 1 - renderManager.renderPosY,
            node.z + 1 - renderManager.renderPosZ);
        RenderUtils.drawFilledBox(axisAlignedBB);
        GL11.glLineWidth(1);
        RenderUtils.enableGlCap(GL11.GL_LINE_SMOOTH);
        RenderUtils.glColor(color.getRed(), color.getGreen(), color.getBlue(), 95);
        RenderUtils.drawSelectionBoundingBox(axisAlignedBB);
        GlStateManager.resetColor();
        GL11.glDepthMask(true);
        RenderUtils.resetCaps();
    }

    //?????????
    function Node(x, y, z, parent, gCost, fCost) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.parent = parent;
        this.gCost = gCost;
        this.fCost = fCost;
    }

    //??????Vec3???
    function Vec3(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    //???????????????????????????By-mumy
    function NodeSet() {

        const length = 1 << 16;
        const mod = length - 1;
        const array = new Array(length);
        this.size = 0;

        this.put = function (node) {
            const hash = Math.abs((node.y + node.z * 31) * 31 + node.x) & mod;
            if (array[hash] == null) {
                array[hash] = new Node(node, null);
            } else {
                const current = array[hash];
                let temp = current;
                do {
                    if (equals(temp.value, node)) {
                        return;
                    }
                    temp = temp.next;
                } while (temp != null);
                array[hash] = new Node(node, current);
            }
            ++this.size;
        }

        this.contains = function (node) {
            const hash = Math.abs((node.y + node.z * 31) * 31 + node.x) & mod;
            if (array[hash] != null) {
                let temp = array[hash];
                do {
                    if (equals(temp.value, node)) {
                        return true;
                    }
                    temp = temp.next;
                } while (temp != null);
            }
            return false;
        }

        this.get = function (node) {
            const hash = Math.abs((node.y + node.z * 31) * 31 + node.x) & mod;
            if (array[hash] != null) {
                let temp = array[hash];
                do {
                    if (equals(temp.value, node)) {
                        return temp.value;
                    }
                    temp = temp.next;
                } while (temp != null);
            }
            return null;
        }

        function equals(a, b) {
            return a.x === b.x && a.y === b.y && a.z === b.z;
        }

        function Node(value, next) {
            this.value = value;
            this.next = next;
        }

    }

    //????????????????????????????????????By-mumy
    function NodePriorityQueue() {

        const instance = this;
        const queue = new Array(64);
        this.size = 0;

        this.add = function (node) {
            queue[this.size] = node;
            ++this.size;
            siftUp();
        }

        this.poll = function () {
            --this.size;
            const top = queue[0];
            queue[0] = queue[this.size];
            siftDown();
            return top;
        }

        function siftUp() {
            let hold = instance.size - 1;
            const node = queue[hold];
            while (hold > 0) {
                const root = (hold - 1) >>> 1;
                const parent = queue[root];
                if (!(parent.fCost > node.fCost)) {
                    break;
                }
                queue[hold] = parent;
                hold = root;
            }
            queue[hold] = node;
        }

        function siftDown() {
            let hold = 0;
            const size = instance.size;
            const half = size >>> 1;
            const node = queue[hold];
            while (hold < half) {
                let child = (hold << 1) + 1;
                const right = child + 1;
                if (right < size && queue[right].fCost < queue[child].fCost) {
                    child = right;
                } if (!(queue[child].fCost < node.fCost)) {
                    break;
                }
                queue[hold] = queue[child];
                hold = child;
            }
            queue[hold] = node;
        }

    }

}

Math.toRadians = function (degrees) {
    return degrees * Math.PI / 180;
}

Math.toDegrees = function (radians) {
    return radians * 180 / Math.PI;
}

let client;

function onLoad() {}

function onEnable() {
    client = moduleManager.registerModule(new SimpleTPAura());
}

function onDisable() {
    moduleManager.unregisterModule(client);
}

