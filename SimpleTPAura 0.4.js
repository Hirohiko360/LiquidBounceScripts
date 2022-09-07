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

    //设置类型，By-mumy
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

    //设置列表
    const settings = {

        //CPS，攻击速度
        cps: setting.float("CPS", 2, 0, 20),

        //范围
        range: setting.float("Range", 30, 0, 128),

        //伤害时间
        hurtTime: setting.integer("HurtTime", 20, 0, 20),

        //目标数
        targets: setting.integer("Targets", 1, 1, 10),

        //计算量
        compute: setting.integer("Compute", 2048, 10, 5000),

        //瞬移距离
        blinkDistance: setting.float("BlinkDistance", 5, 1, 10),

        //点击
        click: setting.boolean("Click", false),

        //垂直穿墙
        vClip: setting.boolean("VClip", true),

        //动作
        swing: setting.boolean("Swing", true),

        //暴击
        criticals: setting.boolean("Criticals", true),

        //瞄准目标
        aimTarget: setting.boolean("AimTarget", true),

        //穿墙攻击
        throughWalls: setting.boolean("ThroughWalls", true),

        //欺骗地面
        spoofGround: setting.boolean("SpoofGround", true),

        //渲染路径
        renderPath: setting.boolean("RenderPath", true)
    };

    //目标列表
    let targetList = [];

    //渲染路径列表
    let renderPath = [];

    //更新计时器
    const updateTimer = new MSTimer();
    let updateDelay = 0;

    //攻击键状态
    let attackKey = false;

    //任务计数
    const taskCount = new AtomicInteger(0);

    //路径渲染颜色
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
        //清空
        targetList = [];
        renderPath = [];
    }

    this.onDisable = function () {
        
    }

    this.onUpdate = function () {
        //骑着实体时不让此事件之后的代码块执行
        if (!mc.thePlayer.isRiding()) {
            return;
        }

        //清空渲染路径
        if (renderPath.length !== 0) {
            renderPath = [];
        }
    }

    this.onMotion = function (event) {

        //需要事件状态为EventState.PRE
        if (event.getEventState() !== EventState.PRE) {
            return;
        }

        //如果不是点击模式或者人物计数大于0则跳出
        if (taskCount.get() > 0) {
            return;
        }

        //手动与常规模式
        if (settings.click.get()) {

            //清空渲染路径
            if (renderPath.length !== 0) {
                renderPath = [];
            }

            //当点下攻击键时
            if (mc.gameSettings.keyBindAttack.isKeyDown()) {

                //防止抖动
                if (attackKey) {
                    return;
                }

                //标记
                attackKey = true;

                //获得瞄准的实体
                const entity = RaycastUtils.raycastEntity(128, function (entity) {
                    return isEnemy(entity);
                });

                //实体存在
                if (entity != null) {

                    //使用异步执行攻击
                    setTimeout(function () {

                        //攻击实体
                        attackEntity(entity);

                    }, 0);

                }
            } else {
                //复位
                attackKey = false;
            }

        } else if (updateTimer.hasTimePassed(updateDelay)) {
            update();
            updateTimer.reset();
            updateDelay = Math.floor(1000 / settings.cps.get());
        }

    }

    this.onRender3D = function (event) {

        //渲染路径
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
        //关闭功能
        moduleManager.getModule(this.getName()).setState(false);
    }

    this.addValues = function (values) {
        //把设置添加到值列表
        for (let i in settings) {
            values.add(settings[i]);
        }
    }

    //更新
    function update() {

        //当任务数量大于0时不予执行，因为Nashorn对象并不是线程安全的
        if (taskCount.get() > 0) {
            return;
        }

        //更新目标列表
        updateTarget();

        //清空渲染路径
        if (renderPath.length !== 0) {
            renderPath = [];
        }

        //目标列表为空时直接跳出
        if (targetList.length === 0) {
            return;
        }

        //使用异步执行，这能使游戏主线程不阻塞
        setTimeout(function() {

            const targets = settings.targets.get();
            //这里限制了能尝试的最大次数为目标数加5
            const maximum = targets + 5;
            let count = 0;

            //循环攻击实体直至计数达到目标数
            for (let i = 0; i < targetList.length && i < maximum && count < targets; ++i) {
                if (attackEntity(targetList[i])) {
                    ++count;
                }
            }

        }, 0);

    }

    //更新目标
    function updateTarget() {

        //清空列表
        targetList = [];

        //声明缓存变量，减少访问的性能消耗
        const entityList = mc.theWorld.loadedEntityList;
        const hurtTime = settings.hurtTime.get();
        const range = settings.range.get();

        //把符合条件的实体添加到列表
        for (let i = 0; i < entityList.length; ++i) {
            const entity = entityList[i];
            if (!(entity.hurtResistantTime > hurtTime) && getDistanceToEntityBox(entity) < range && isEnemy(entity)) {
                targetList.push(entity);
            }
        }

        //为空直接跳出
        if (targetList.length === 0) {
            return;
        }

        //对目标列表以目标相对距离进行排序
        targetList.sort(function (a, b) {
            return getDistanceToEntityBox(a) - getDistanceToEntityBox(b);
        });

    }

    //攻击实体
    function attackEntity(entity) {

        //缓存
        const netHandler = mc.getNetHandler();
        const player = mc.thePlayer;

        //如果目标实体是末影龙则选择它的身体来攻击
        const target = entity instanceof EntityDragon ? entity.dragonPartBody : entity;

        //声明起点与终点
        const start = new Vec3(Math.floor(player.posX), Math.round(player.posY), Math.floor(player.posZ));
        const end = new Vec3(Math.floor(target.posX), Math.floor(target.posY), Math.floor(target.posZ));

        //寻找路径
        let path = findPath(end, start, player, target);

        //没有找到路径
        if (path == null) {
            //攻击失败
            return false;
        }

        //是否蹲着
        const sneak = player.isSneaking() || moduleManager.getModule("Sneak").getState();

        //传送时防止蹲着
        if (sneak) {
            netHandler.addToSendQueue(new C0BPacketEntityAction(player, C0BPacketEntityAction.Action.STOP_SNEAKING));
        }

        //把路径简化
        const goPath = simplifyPath(path);

        //如果开启渲染路径则添加到渲染列表
        if (settings.renderPath.get()) {
            renderPath.push(goPath);
        }

        //是否欺骗地面
        const ground = settings.spoofGround.get();

        //传送过去
        for (let i = 0; i < goPath.length; ++i) {
            const node = goPath[i];
            netHandler.addToSendQueue(new C04PacketPlayerPosition(node.x + 0.5, ground ? Math.ceil((node.y + 0.0626) / 0.015625) * 0.015625 : node.y + 0.0626, node.z + 0.5, ground));
        }

        //向下瞄准目标
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

        //如果启用暴击
        if (settings.criticals.get()) {
            const node = path[path.length - 1];
            const x = node.x + 0.5, y = node.y + 0.0626, z = node.z + 0.5;
            netHandler.addToSendQueue(new C04PacketPlayerPosition(x, y + 0.0625, z, false));
            netHandler.addToSendQueue(new C04PacketPlayerPosition(x, y, z, false));
            netHandler.addToSendQueue(new C04PacketPlayerPosition(x, y + 0.0125, z, false));
            netHandler.addToSendQueue(new C04PacketPlayerPosition(x, y, z, false));
        }

        //发出攻击事件
        LiquidBounce.eventManager.callEvent(new AttackEvent(target));

        //动作
        if (settings.swing.get()) {
            player.swingItem();
        }

        //攻击实体
        netHandler.addToSendQueue(new C02PacketUseEntity(target, C02PacketUseEntity.Action.ATTACK));

        //传送回去
        const backPath = simplifyPath(path.reverse());

        for (let i = 0; i < backPath.length; ++i) {
            const node = backPath[i];
            netHandler.addToSendQueue(new C04PacketPlayerPosition(node.x + 0.5, ground ? Math.ceil((node.y + 0.0626) / 0.015625) * 0.015625 : node.y + 0.0626, node.z + 0.5, ground));
        }

        //回到原处
        netHandler.addToSendQueue(new C04PacketPlayerPosition(player.posX, player.posY, player.posZ, ground));

        //恢复蹲的状态
        if (sneak) {
            netHandler.addToSendQueue(new C0BPacketEntityAction(player, C0BPacketEntityAction.Action.START_SNEAKING));
        }

        //攻击成功
        return true;

    }

    //寻路
    function findPath(start, end, player, entity) {

        //缓存
        const world = mc.theWorld;

        //可变BlockPos
        const mutableBlockPos = new MutableBlockPos();

        //穿墙攻击
        const throughWalls = settings.throughWalls.get();

        //检查起点与终点是否不可通过，并向上寻找到一个可通过的位置
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

        //起点或终点不可通过
        if (!throughWalls && !check(start.x, start.y, start.z) || !check(end.x, end.y, end.z)) {
            return null;
        }

        /*
         * =============================
         *  寻路算法使用A*  F权重高于G权重
         * =============================
         */

        //开表与闭表
        const openList = new NodePriorityQueue();
        const closeList = new NodeSet();

        //起点XYZ坐标
        const startX = start.x;
        const startY = start.y;
        const startZ = start.z;

        //终点XYZ
        const endX = end.x;
        const endY = end.y;
        const endZ = end.z;

        //限制搜索方块数量
        const compute = settings.compute.get();

        //可否vClip
        const vClip = settings.vClip.get();

        //初始化
        init();

        //循环寻路
        while (openList.size !== 0 && closeList.size < compute) {

            //出队一个节点
            let node = openList.poll();

            //缓存
            const x = node.x;
            const y = node.y;
            const z = node.z;

            //在闭表
            if (closeList.contains(node)) {
                continue;
            }

            //不可通过
            if (!check(x, y, z)) {

                //尝试vClip
                if (vClip) {

                    //如果是根节点
                    const parent = node.parent;
                    if (parent == null) {
                        continue;
                    }

                    //位置
                    const parentX = parent.x;
                    const parentY = parent.y;
                    const parentZ = parent.z;

                    //如果有阻挡才尝试
                    if (!check(parentX, parentY + 1, parentZ)) {
                        upVClip(parentX, parentY, parentZ, parent);
                    } if (!check(parentX, parentY - 1, parentZ)) {
                        downVClip(parentX, parentY, parentZ, parent);
                    }
                }

                continue;
            }

            //寻找到终点
            if (x === endX && y === endY && z === endZ) {

                //根据节点的父节点返回得到路径
                const path = [];
                do {
                    path.push(node);
                    node = node.parent;
                } while (node != null);

                //返回路径
                return path;
            }

            //添加到闭表
            closeList.put(node);

            //把当前节点的周围子节点添加到开表
            addToOpenList(x + 1, y, z, node);
            addToOpenList(x, y + 1, z, node);
            addToOpenList(x, y, z + 1, node);
            addToOpenList(x - 1, y, z, node);
            addToOpenList(x, y - 1, z, node);
            addToOpenList(x, y, z - 1, node);

        }
        //没有找到路径返回null
        return null;

        //初始化部分
        function init() {

            //把起点添加到开表
            openList.add(new Node(startX, startY, startZ, null, 0, 0));

            //穿墙攻击
            if (throughWalls) {

                //把周围节点添加到开表
                for (let sX = -3; sX < 4; ++sX) {
                    for (let sY = -3; sY < 4; ++sY) {
                        for (let sZ = -3; sZ < 4; ++sZ) {

                            //位置
                            const x = startX + sX;
                            const y = startY + sY;
                            const z = startZ + sZ;

                            //距离小于3才可隔墙攻击
                            if (Math.pow(x + 0.5 - entity.posX, 2) + Math.pow(y + 0.0626 - entity.posY, 2) + Math.pow(z + 0.5 - entity.posZ, 2) < 8.5) {

                                //计算代价
                                const xDist = Math.abs(x - endX);
                                const yDist = Math.abs(y - endY);
                                const zDist = Math.abs(z - endZ);
                                const gCost = xDist + yDist + zDist;
                                const fCost = gCost + xDist + yDist + zDist + Math.sqrt(xDist * xDist + yDist * yDist + zDist * zDist);
                                
                                //添加到开表
                                openList.add(new Node(x, y, z, null, gCost, fCost));
                            }

                        }
                    }
                }
            }

        }

        //添加节点到开表
        function addToOpenList(x, y, z, parent) {

            //XYZ距离
            const xDist = Math.abs(x - endX);
            const yDist = Math.abs(y - endY);
            const zDist = Math.abs(z - endZ);

            //当前代价
            const gCost = parent.gCost + 1;

            //总代价，这里使用曼哈顿距离和欧拉距离
            const fCost = gCost + xDist + yDist + zDist + Math.sqrt(xDist * xDist + yDist * yDist + zDist * zDist);

            //添加到列表
            openList.add(new Node(x, y, z, parent, gCost, fCost));
        }

        //向上vClip
        function upVClip(x, y, z, parent) {

            //最终Y
            let finalY = y;

            //距离限制
            const blinkDistance = Math.floor(settings.blinkDistance.get()) + 1;

            //寻找到最近的可用位置
            for (let i = 2; i < blinkDistance; ++i) {
                if (check(x, y + i, z)) {
                    finalY = y + i;
                }
            }

            //如果最终Y具有意义
            if (finalY > y) {

                //计算代价
                const xDist = Math.abs(x - endX);
                const yDist = Math.abs(finalY - endY);
                const zDist = Math.abs(z - endZ);
                const gCost = parent.gCost + Math.abs(finalY - y);
                const fCost = gCost + xDist + yDist + zDist + Math.sqrt(xDist * xDist + yDist * yDist + zDist * zDist);

                //添加到节点列表
                openList.add(new Node(x, finalY, z, parent, gCost, fCost));
            }

        }

        //向下vClip
        function downVClip(x, y, z, parent) {

            //最终Y
            let finalY = y;

            //距离限制
            const blinkDistance = Math.floor(settings.blinkDistance.get()) + 1;

            //寻找到最近的可用位置
            for (let i = 3; i < blinkDistance; ++i) {
                if (check(x, y - i, z)) {
                    finalY = y - i;
                }
            }

            //如果最终Y具有意义
            if (finalY < y) {

                //计算代价
                const xDist = Math.abs(x - endX);
                const yDist = Math.abs(finalY - endY);
                const zDist = Math.abs(z - endZ);
                const gCost = parent.gCost + Math.abs(finalY - y);
                const fCost = gCost + xDist + yDist + zDist + Math.sqrt(xDist * xDist + yDist * yDist + zDist * zDist);

                //添加到节点列表
                openList.add(new Node(x, finalY, z, parent, gCost, fCost));
            }
        }

        //检查是否可通过
        function check(x, y, z) {
            return passable(x, y, z) && passable(x, y + 1, z) && groundPassable(x, y - 1, z);
        }

        //检查位置是否可通过
        function passable(x, y, z) {
            const blockState = world.getBlockState(mutableBlockPos.set(x, y, z));
            const block = blockState.getBlock();
            return block.getCollisionBoundingBox(world, mutableBlockPos, blockState) == null ? !((block instanceof BlockLiquid || block instanceof BlockStaticLiquid) && block.getMaterial() !== Material.water) : block instanceof BlockSnow && block.isReplaceable(world, mutableBlockPos);
        }

        //检查位置是否为可通过的地面
        function groundPassable(x, y, z) {
            const blockState = world.getBlockState(mutableBlockPos.set(x, y, z));
            const block = blockState.getBlock();
            return block.getCollisionBoundingBox(world, mutableBlockPos, blockState) == null || !(block instanceof BlockFence || block instanceof BlockWall || block instanceof BlockFenceGate);
        }

    }

    //简化路径
    function simplifyPath(path) {

        //移动距离
        const blinkDistance = settings.blinkDistance.get();

        //移动距离不大于1直接返回路径
        if (!(blinkDistance > 1)) {
            return path;
        }

        //缓存
        const world = mc.theWorld;

        //可变BlockPos
        const mutableBlockPos = new MutableBlockPos();

        //最终路径与最终节点
        const finalPath = [path[0]];
        let finalNode = path[0];

        //索引与标记
        let index = 0;
        let flag = false;

        //是否允许VClip
        const vClip = settings.vClip.get();

        //循环
        for (;;) {

            //索引小于路径列表长度
            if (index < path.length) {

                //缓存节点
                const node = path[index];

                //XYZ距离差
                const xDist = finalNode.x - node.x;
                const yDist = finalNode.y - node.y;
                const zDist = finalNode.z - node.z;

                //如果XYZ的直线距离大于移动距离
                if (xDist * xDist + yDist * yDist + zDist * zDist > blinkDistance * blinkDistance) {
                    //标记
                    flag = true;
                }

                //如果没有标记且不可以vClip
                if (!flag && (!vClip || xDist !== 0 || zDist !== 0)) {

                    //如果不可瞬移过去
                    if (!reachable(finalNode.x, finalNode.y, finalNode.z, node.x, node.y, node.z)) {
                        //标记
                        flag = true;
                    }

                }

                //如果标记了
                if (flag) {

                    //把前一个路径节点添加到列表
                    --index;

                    finalPath.push(path[index]);
                    finalNode = path[index];

                    //重置标记
                    flag = false;
                }

                //索引自增
                ++index;
            } else {

                //添加终点进去
                finalPath.push(path[index - 1]);

                //返回路径
                return finalPath;
            }
        }

        //检查是否可以瞬移过去
        function reachable(x, y, z, x2, y2, z2) {

            //Y轴的运动
            const yMove = y2 < y ? -1 : 1;

            //检查Y轴上的障碍
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

            //检查X轴上的障碍
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

            //检查Z轴上的障碍
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

            //返回结果
            return true;

        }

        //检查位置是否可通过
        function passable(x, y, z) {
            const blockState = world.getBlockState(mutableBlockPos.set(x, y, z));
            const block = blockState.getBlock();
            return block.getCollisionBoundingBox(world, mutableBlockPos, blockState) == null ? !((block instanceof BlockLiquid || block instanceof BlockStaticLiquid) && block.getMaterial() !== Material.water) : block instanceof BlockSnow && block.isReplaceable(world, mutableBlockPos);
        }

        //检查位置是否为可通过的地面
        function groundPassable(x, y, z) {
            const blockState = world.getBlockState(mutableBlockPos.set(x, y, z));
            const block = blockState.getBlock();
            return block.getCollisionBoundingBox(world, mutableBlockPos, blockState) == null || !(block instanceof BlockFence || block instanceof BlockWall || block instanceof BlockFenceGate);
        }

    }

    //得到从视角到该实体碰撞箱的距离
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


    //判断实体是否为目标
    function isEnemy(entity) {

        //实体是活体且实体不是玩家
        if (entity instanceof EntityLivingBase && (EntityUtils.targetDead || entity.isEntityAlive() && entity.getHealth() > 0) && entity !== mc.thePlayer) {

            //如果是隐身的
            if (!EntityUtils.targetInvisible && entity.isInvisible()) {
                return false
            }

            //如果实体类型是玩家
            if (EntityUtils.targetPlayer && entity instanceof EntityPlayer) {

                //是否为不可攻击的
                if (entity.isSpectator() || AntiBot.isBot(entity)) {
                    return false
                }

                //是否不攻击好友
                if (isFriend(entity) && !moduleManager.getModule("NoFriends").getState()) {
                    return false;
                }

                //是否是队友
                const teams = LiquidBounce.moduleManager.getModule("Teams");
                return !teams.getState() || !teams.isInYourTeam(entity);

            }

            //如果是怪物
            return EntityUtils.targetMobs && isMob(entity) || EntityUtils.targetAnimals && isAnimal(entity);
        }

        return false;

        //实体是不是动物
        function isAnimal(entity) {
            return entity instanceof EntityAnimal || entity instanceof EntitySquid || entity instanceof EntityGolem || entity instanceof EntityBat;
        }

        //实体是不是好友
        function isFriend(entity) {
            return entity instanceof EntityPlayer && entity.getName() != null && LiquidBounce.fileManager.friendsConfig.isFriend(ColorUtils.stripColor(entity.getName()));
        }

        //实体是不是怪物
        function isMob(entity) {
            return entity instanceof EntityMob || entity instanceof EntityVillager || entity instanceof EntitySlime || entity instanceof EntityGhast || entity instanceof EntityDragon;
        }

    }

    //定时执行
    function setTimeout(func, delay) {

        //任务计数器自增
        taskCount.incrementAndGet();

        //创建等待执行的任务
        (new Timer("setTimeout", true)).schedule(function() {

            //执行任务
            try {
                func();
            } catch (err) {
                //chat.print(err);
            }

            //任务计数器自减
            taskCount.decrementAndGet();

        }, delay);
    }

    //渲染路径的节点
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

    //节点类
    function Node(x, y, z, parent, gCost, fCost) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.parent = parent;
        this.gCost = gCost;
        this.fCost = fCost;
    }

    //自用Vec3类
    function Vec3(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    //自行实现的节点集，By-mumy
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

    //自行实现的节点优先队列，By-mumy
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

