///engine_flags=--language=es6
var scriptName = "Sinicization";
var scriptVersion = 0.2;
var scriptAuthor = "mumy++";

var File = Java.type("java.io.File");
var JavaString = Java.type("java.lang.String");
var System = Java.type("java.lang.System");
var Charset = Java.type("java.nio.charset.Charset");
var StandardCharsets = Java.type("java.nio.charset.StandardCharsets");
var Files = Java.type("java.nio.file.Files");
var Paths = Java.type("java.nio.file.Paths");
var StandardOpenOption = Java.type("java.nio.file.StandardOpenOption");
var LiquidBounce = Java.type("net.ccbluex.liquidbounce.LiquidBounce");

function Sinicization() {

    const entryMap = {

        //Combat
        "Aimbot": "自动瞄准",
        "AutoArmor": "自动穿甲",
        "AutoBow": "自动射箭",
        "AutoClicker": "自动点击",
        "AutoLeave": "自动退出",
        "AutoPot": "自动喷药",
        "AutoSoup": "自动喝汤",
        "AutoWeapon": "自动换武器",
        "BowAimbot": "弓箭自动瞄准",
        "Criticals": "暴击",
        "FastBow": "快速射箭",
        "HitBox": "打击碰撞箱",
        "Ignite": "燃烧目标",
        "KillAura": "杀戮光环",
        "NoFriends": "忽略好友",
        "SuperKnockback": "超级击退",
        "TeleportHit": "远距离攻击",
        "TNTBlock": "TNT自动格挡",
        "Trigger": "自动打击",
        "Velocity": "反击退",

        //Exploit
        "AbortBreaking": "保持挖掘进度",
        "AntiHunger": "防饥饿",
        "BedGodMode": "床上无敌",
        "Clip": "垂直Clip",
        "ConsoleSpammer": "控制台刷屏",
        "Damage": "自伤",
        "ForceUnicodeChat": "强制Unicode字体聊天",
        "Ghost": "死亡幽灵",
        "GhostHand": "幽灵手",
        "GodMode": "无敌",
        "ItemTeleport": "传送捡物品",
        "KeepContainer": "保持界面",
        "Kick": "踢出",
        "MoreCarry": "不关闭容器",
        "MultiActions": "多动作",
        "NoPitchLimit": "没有Pitch限制",
        "Paralyze": "瘫痪对手",
        "Phase": "穿墙",
        "PingSpoof": "假延迟",
        "Plugins": "服务器插件",
        "PortalMenu": "地狱门菜单",
        "ServerCrasher": "崩服",
        "Teleport": "传送",
        "VehicleOneHit": "一击打掉载具",

        //Fun
        "Derp": "乱晃",
        "SkinDerp": "皮肤随机变",

        //Misc
        "AntiBot": "反假人",
        "AtAllProvider": "全局聊天消息",
        "ComponentOnHover": "详细查看聊天信息",
        "LiquidChat": "Liquid聊天",
        "MidClick": "鼠标中键加好友",
        "NameProtect": "名称保护",
        "NoRotateSet": "不被服务器设置转头",
        "ResourcePackSpoof": "忽略服务器资源包",
        "Spammer": "刷屏",
        "Teams": "团队模式",

        //Movement
        "AirJump": "空中跳",
        "AirLadder": "空中爬梯",
        "AutoWalk": "自动走",
        "BlockWalk": "完整方块行走",
        "BufferSpeed": "Buffer速度",
        "BugUp": "掉落回弹",
        "FastClimb": "快速爬梯子",
        "FastStairs": "快速上楼梯",
        "Fly": "飞行",
        "Freeze": "不可移动",
        "HighJump": "高跳",
        "IceSpeed": "冰上速度",
        "InventoryMove": "背包移动",
        "LadderJump": "梯子跳",
        "LiquidWalk": "液体上行走",
        "LongJump": "长跳",
        "NoClip": "穿墙移动",
        "NoJumpDelay": "无跳跃间隔",
        "NoSlow": "无减速",
        "NoWeb": "无蜘蛛网减速",
        "Parkour": "边缘跳",
        "PerfectHorseJump": "马全力跳",
        "ReverseStep": "反向跨步",
        "SafeWalk": "安全行走",
        "SlimeJump": "史莱姆跳",
        "Sneak": "潜行",
        "Speed": "速度",
        "Sprint": "疾跑",
        "Step": "跨步",
        "Strafe": "灵活移动",
        "WallClimb": "爬墙",
        "WaterSpeed": "水上速度",

        //Player
        "AntiAFK": "反防挂机",
        "AntiCactus": "反仙人掌",
        "AutoFish": "自动钓鱼",
        "AutoRespawn": "自动重生",
        "AutoTool": "自动工具",
        "Blink": "瞬移",
        "Eagle": "自动蹲",
        "FastUse": "快速使用",
        "InventoryCleaner": "整理背包",
        "KeepAlive": "保持存活",
        "NoFall": "无摔落伤害",
        "PotionSaver": "延长药水效果",
        "Regen": "回血",
        "Reach": "距离",
        "Zoot": "去负面效果",

        //Render
        "AntiBlind": "防失明",
        "BlockESP": "方块标记",
        "BlockOverlay": "方块轮廓",
        "Breadcrumbs": "标记行径",
        "CameraClip": "视角不被挡",
        "Chams": "实体透视",
        "ESP": "实体标记",
        "FreeCam": "自由视角",
        "Fullbright": "夜视",
        "ItemESP": "物品标记",
        "NameTags": "名称标签",
        "NoFOV": "无视场变化",
        "NoBob": "无行走晃手",
        "NoHurtCam": "无受伤晃动",
        "NoScoreboard": "无积分板",
        "NoSwing": "无动作",
        "Projectiles": "抛物线",
        "ProphuntESP": "标记触碰到的方块",
        "Rotations": "旋转",
        "StorageESP": "容器标记",
        "SwingAnimation": "动作动画",
        "TNTESP": "TNT标记",
        "Tracers": "实体追踪",
        "TrueSight": "看见隐身实体",
        "XRay": "方块透视",

        //World
        "AutoBreak": "自动破坏",
        "ChestAura": "箱子光环",
        "ChestStealer": "拿箱子物品",
        "CivBreak": "持续破坏",
        "FastBreak": "快速破坏",
        "FastPlace": "快速放置",
        "Fucker": "挖特定方块",
        "Liquids": "液体上放置",
        "NoSlowBreak": "无破坏减速",
        "Nuker": "自动挖掘",
        "Scaffold": "自动搭路",
        "Timer": "变速",
        "Tower": "自动搭柱"

    };

    const fileEncoding = Charset.forName(System.getProperty("file.encoding"));

    for (let key in entryMap) {
        const name = entryMap[key];
        const module = LiquidBounce.moduleManager.getModule(key);
        if (module != null) {
            module.setName(name);
        }
    }

    const modulesConfigFile = LiquidBounce.fileManager.modulesConfig.getFile();
    if (modulesConfigFile.exists()) {
        try {
            const modulesConfigObject = JSON.parse(readString(modulesConfigFile));
            const object = {};
            for (let module in modulesConfigObject) {
                const name = entryMap[module];
                object[name != null ? name : module] = modulesConfigObject[module];
            }
            writeString(modulesConfigFile, JSON.stringify(object, null, 2));
        } catch (e) {}
    }

    const valuesConfigFile = LiquidBounce.fileManager.valuesConfig.getFile();
    if (valuesConfigFile.exists()) {
        try {
            const valuesConfigObject = JSON.parse(readString(valuesConfigFile));
            const object = {};
            for (let module in valuesConfigObject) {
                const name = entryMap[module];
                object[name != null ? name : module] = valuesConfigObject[module];
            }
            writeString(valuesConfigFile, JSON.stringify(object, null, 2));
        } catch (e) {}
    }

    function readString(file) {
        return new JavaString(Files.readAllBytes(Paths.get(file.getPath())), fileEncoding);
    }

    function writeString(file, string) {
        Files.write(Paths.get(file.getPath()), new JavaString(new JavaString(string).getBytes(), fileEncoding).getBytes(), StandardOpenOption.WRITE, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
    }

}

function onLoad() {}

function onEnable() {
    Sinicization();
}

function onDisable() {}

