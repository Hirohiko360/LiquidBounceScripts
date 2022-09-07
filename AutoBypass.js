var scriptName = "AutoBypass";
var scriptAuthor = "Soulplexis"; 
var scriptVersion = 2.2;

var ncpmodules = ["NoClip", "HighJump", "AirJump", "AirLadder", "BlockWalk", "BufferSpeed", "FastClimb", "FastStairs", "FastBreak", "CivBreak", "ConsoleSpammer", "Regen", "Zoot", "ItemTeleport", "Teleport", "ServerCrasher", "Phase", "GodMode", "Liquids", "FastBow", "TeleportHit", "NoFall", "LadderJump", "NoWeb", "WallClimb", "WallGlide", "WaterFly", "WaterSpeed"]
function nocheat() {
    for (var i = 0; i < ncpmodules.length; i++) {
        if (moduleManager.getModule(ncpmodules[i]).state) {
            chat.print("§8LiquidBounce: §e " + ncpmodules[i] + " is banned by AutoBypass!");
			moduleManager.getModule(ncpmodules[i]).setState(false);
        }
    }
}
var aacmodules = ["AirJump", "AirLadder", "BlockWalk", "BufferSpeed", "FastStairs", "FastBreak", "CivBreak", "ConsoleSpammer", "Regen", "Zoot", "ItemTeleport", "Teleport", "ServerCrasher", "Phase", "GodMode", "Liquids", "FastBow", "TeleportHit", "NoFall", "LadderJump", "WallClimb", "WallGlide", "WaterFly", "LiquidWalk", "SuperKnockback", "Criticals", "HitBox", "Trigger", "FastUse", "Blink", "LongJump", "NoClip", "ReverseStep", "Fly", "Derp", "NoPitchLimit"]
function aac() {
    for (var i = 0; i < aacmodules.length; i++) {
        if (moduleManager.getModule(aacmodules[i]).state) {
            chat.print("§8LiquidBounce: §e " + aacmodules[i] + " is banned by AutoBypass!");
			moduleManager.getModule(aacmodules[i]).setState(false);
        }
    }
}
var spartanmodules = ["AirJump", "AirLadder", "BlockWalk", "BufferSpeed", "FastStairs", "FastBreak", "CivBreak", "ConsoleSpammer", "Regen", "Zoot", "ItemTeleport", "Teleport", "ServerCrasher", "GodMode", "Liquids", "FastBow", "TeleportHit", "NoFall", "LadderJump", "WallGlide", "WaterFly", "LiquidWalk", "FastUse", "Blink", "LongJump", "NoClip", "ReverseStep", "NoPitchLimit"]
function spartan() {
    for (var i = 0; i < spartanmodules.length; i++) {
        if (moduleManager.getModule(spartanmodules[i]).state) {
            chat.print("§8LiquidBounce: §e " + spartanmodules[i] + " is banned by AutoBypass!");
			moduleManager.getModule(spartanmodules[i]).setState(false);
        }
    }
}
var gwenmodules = ["Timer", "AirJump", "AirLadder", "BlockWalk", "BufferSpeed", "FastStairs", "FastBreak", "FastClimb", "CivBreak", "ConsoleSpammer", "Regen", "Zoot", "ItemTeleport", "Teleport", "ServerCrasher", "Phase", "GodMode", "Liquids", "FastBow", "TeleportHit", "LadderJump", "WallClimb", "WallGlide", "WaterFly", "LiquidWalk", "Criticals", "Trigger", "Blink", "LongJump", "NoClip", "ReverseStep", "Fly", "Derp", "NoPitchLimit"]
function gwen() {
    for (var i = 0; i < gwenmodules.length; i++) {
        if (moduleManager.getModule(gwenmodules[i]).state) {
            chat.print("§8LiquidBounce: §e " + gwenmodules[i] + " is banned by AutoBypass!");
			moduleManager.getModule(gwenmodules[i]).setState(false);
        }
		if(moduleManager.getModule("AntiBot").state == false) {
		chat.print("§8LiquidBounce: §e AntiBot" + " is forced by AutoBypass!");
		moduleManager.getModule("AntiBot").setState(true)
		}
    }
}
var watchdogmodules = ["Timer", "NoClip", "HighJump", "AirJump", "AirLadder", "BlockWalk", "BufferSpeed", "FastClimb", "FastStairs", "FastBreak", "CivBreak", "ConsoleSpammer", "Regen", "Zoot", "ItemTeleport", "Teleport", "ServerCrasher", "GodMode", "Liquids", "FastBow", "LadderJump", "NoWeb", "WallClimb", "WallGlide", "WaterFly", "WaterSpeed", "Criticals", "Tower"]
function watchdog() {
    for (var i = 0; i < watchdogmodules.length; i++) {
        if (moduleManager.getModule(watchdogmodules[i]).state) {
            chat.print("§8LiquidBounce: §e " + watchdogmodules[i] + " is banned by AutoBypass!");
			moduleManager.getModule(watchdogmodules[i]).setState(false);
        }
		if(moduleManager.getModule("AntiBot").state == false) {
		chat.print("§8LiquidBounce: §e AntiBot" + " is forced by AutoBypass!");
		moduleManager.getModule("AntiBot").setState(true)
		}
    }
}
var sentinelmodules = ["NoClip", "AirLadder", "BlockWalk", "BufferSpeed", "FastStairs", "FastBreak", "CivBreak", "ConsoleSpammer", "Regen", "Zoot", "ItemTeleport", "Teleport", "ServerCrasher", "GodMode", "Liquids", "FastBow", "LadderJump", "NoWeb", "WallClimb", "WallGlide", "WaterFly", "WaterSpeed", "Tower", "NoFall"]
function sentinel() {
    for (var i = 0; i < sentinelmodules.length; i++) {
        if (moduleManager.getModule(sentinelmodules[i]).state) {
            chat.print("§8LiquidBounce: §e " + sentinelmodules[i] + " is banned by AutoBypass!");
			moduleManager.getModule(sentinelmodules[i]).setState(false);
        }
    }
}
var guardianmodules = ["AirJump", "AirLadder", "BlockWalk", "BufferSpeed", "FastBreak", "CivBreak", "ConsoleSpammer", "Regen", "Zoot", "ItemTeleport", "Teleport", "ServerCrasher", "Phase", "GodMode", "Liquids", "FastBow", "TeleportHit", "NoFall", "LadderJump", "WallClimb", "WallGlide", "WaterFly", "LiquidWalk", "HitBox", "Trigger", "FastUse", "Blink", "LongJump", "NoClip", "ReverseStep", "Fly", "Derp", "NoPitchLimit"]
function guardian() {
    for (var i = 0; i < guardianmodules.length; i++) {
        if (moduleManager.getModule(guardianmodules[i]).state) {
            chat.print("§8LiquidBounce: §e " + guardianmodules[i] + " is banned by AutoBypass!");
			moduleManager.getModule(guardianmodules[i]).setState(false);
        }
    }
}
var matrixmodules = ["Scaffold", "Tower", "AirJump", "AirLadder", "BlockWalk", "BufferSpeed", "FastStairs", "FastBreak", "CivBreak", "ConsoleSpammer", "Regen", "Zoot", "ItemTeleport", "Teleport", "ServerCrasher", "Phase", "GodMode", "Liquids", "FastBow", "TeleportHit", "NoFall", "LadderJump", "WallClimb", "WallGlide", "WaterFly", "LiquidWalk", "Criticals", "FastUse", "Blink", "LongJump", "NoClip", "ReverseStep", "Fly", "Derp", "NoPitchLimit"]
function matrix() {
    for (var i = 0; i < matrixmodules.length; i++) {
        if (moduleManager.getModule(matrixmodules[i]).state) {
            chat.print("§8LiquidBounce: §e " + matrixmodules[i] + " is banned by AutoBypass!");
			moduleManager.getModule(matrixmodules[i]).setState(false);
        }
    }
}
var aac1910modules = ["NoClip", "HighJump", "AirJump", "AirLadder", "BlockWalk", "BufferSpeed", "FastStairs", "FastBreak", "CivBreak", "ConsoleSpammer", "Regen", "Zoot", "ItemTeleport", "ServerCrasher", "Phase", "GodMode", "Liquids", "FastBow", "TeleportHit", "LadderJump", "NoWeb", "WallClimb", "WallGlide", "LiquidWalk"]
function aac1910() {
    for (var i = 0; i < aac1910modules.length; i++) {
        if (moduleManager.getModule(aac1910modules[i]).state) {
            chat.print("§8LiquidBounce: §e " + aac1910modules[i] + " is banned by AutoBypass!");
			moduleManager.getModule(aac1910modules[i]).setState(false);
        }
				if(moduleManager.getModule("AntiBot").state == false) {
		chat.print("§8LiquidBounce: §eAntiBot is forced by AutoBypass!");
		moduleManager.getModule("AntiBot").setState(true)
		}
    }
}
var pacmodules = ["Criticals", "SuperKnockback", "Tower", "NoClip", "HighJump", "AirJump", "AirLadder", "BlockWalk", "BufferSpeed", "FastClimb", "FastStairs", "CivBreak", "ConsoleSpammer", "Regen", "Zoot", "ItemTeleport", "Teleport", "ServerCrasher", "Phase", "GodMode", "Liquids", "FastBow", "TeleportHit", "NoFall", "LadderJump", "NoWeb", "WallClimb", "WallGlide", "WaterFly", "WaterSpeed"]
function pac() {
    for (var i = 0; i < pacmodules.length; i++) {
        if (moduleManager.getModule(pacmodules[i]).state) {
            chat.print("§8LiquidBounce: §e " + pacmodules[i] + " is banned by AutoBypass!");
			moduleManager.getModule(pacmodules[i]).setState(false);
        }
    }
}
var fireflymodules = ["AirJump", "BufferSpeed", "FastStairs", "FastBreak", "CivBreak", "ConsoleSpammer", "Regen", "Zoot", "ItemTeleport", "Teleport", "ServerCrasher", "Phase", "GodMode", "Liquids", "FastBow", "TeleportHit", "LadderJump", "WallClimb", "WallGlide", "WaterFly", "Trigger", "Blink", "LongJump", "NoClip", "ReverseStep", "Fly", "Derp", "NoPitchLimit", "SuperKnockback"]
function firefly() {
    for (var i = 0; i < fireflymodules.length; i++) {
        if (moduleManager.getModule(fireflymodules[i]).state) {
            chat.print("§8LiquidBounce: §e " + fireflymodules[i] + " is banned by AutoBypass!");
			moduleManager.getModule(fireflymodules[i]).setState(false);
        }
    }
}
function Module() {
var AntiCheatMode = value.createList("AntiCheat", ["NCP", "AAC", "Spartan", "GWEN", "Watchdog", "Sentinel", "Guardian", "Matrix", "AAC1.9.10", "FireFly", "PAC"], "NCP");
var Modules = value.createBoolean("BlockModules", true);
var BadSettings = value.createBoolean("BlockBadSettings", false); // these two bottom are not very practical! 
var LoadConfig = value.createBoolean("LoadConfig", false);/////////////////////////////////////// Blocking bad settings is not available for any except NCP and Spartan! - Too many settings to monitor, game lags
	this.BlockModules = function() {
			switch(AntiCheatMode.get()) {
				case "NCP":
				nocheat();
				break;
				case "AAC":
				aac();
				break;
				case "Spartan":
				spartan();
				break;
				case "GWEN": 
				gwen();
				break;
				case "Watchdog":
				watchdog();
				break;
				case "Sentinel":
				sentinel();
				break;
				case "Guardian":
				guardian();
				break;
				case "Matrix":
				matrix();
				break;
				case "AAC1.9.10":
				aac1910();
				break;
				case "PAC":
				pac();
				break;
				case "FireFly":
				firefly();
				break;				
			}
	}
	// at this point I had already wrote all the code above. 
	// didnt want to go through fixing it all and plus it means less variables (not rly)
var FastClimb = moduleManager.getModule("FastClimb");
var FastStairs = moduleManager.getModule("FastStairs");
var HighJump = moduleManager.getModule("HighJump");
var LiquidWalk = moduleManager.getModule("LiquidWalk");
var NoWeb = moduleManager.getModule("NoWeb");
var NoFall = moduleManager.getModule("NoFall");
var Nuker = moduleManager.getModule("Nuker");
var Spammer = moduleManager.getModule("Spammer");
var FastBow = moduleManager.getModule("FastBow");
var Fly = moduleManager.getModule("Fly");
var Timer = moduleManager.getModule("Timer");
var LongJump = moduleManager.getModule("LongJump");
var Sneak = moduleManager.getModule("Sneak");
var WallClimb = moduleManager.getModule("WallClimb");
var WallGlide = moduleManager.getModule("WallGlide");
var AutoClicker = moduleManager.getModule("AutoClicker");
var WaterSpeed = moduleManager.getModule("WaterSpeed");
var Phase = moduleManager.getModule("Phase");
var NoRotateSet = moduleManager.getModule("NoRotateSet");
var Tower = moduleManager.getModule("Tower");
var KillAura = moduleManager.getModule("KillAura");
///////////////////////////////////////////
var KillAuraRange = KillAura.getValue("Range"); 
var KillAuraCPS = KillAura.getValue("MaxCPS"); 
var KillAuraCPS2 = KillAura.getValue("MinCPS"); 
var KillAuraRayCast = KillAura.getValue("RayCast");
var KillAuraInteractAutoBlock = KillAura.getValue("InteractAutoBlock");
var KillAuraTargetMode = KillAura.getValue("TargetMode");
var Scaffold = moduleManager.getModule("Scaffold");
var ScaffoldDelay = Scaffold.getValue("MaxDelay");
var ScaffoldDelay2 = Scaffold.getValue("MinDelay");
var ScaffoldRotations = Scaffold.getValue("Rotations");
var ScaffoldKeepRotations = Scaffold.getValue("KeepRotation");
var Fly = moduleManager.getModule("Fly");
var FlyMode = Fly.getValue("Mode");
var Criticals = moduleManager.getModule("Criticals");
var CriticalsMode = Criticals.getValue("Mode");
var CriticalsDelay = Criticals.getValue("Delay");
var Speed = moduleManager.getModule("Speed");
var SpeedMode = Speed.getValue("Mode");
/* var AntiBot = moduleManager.getModule("AntiBot");
var AntiBotTab = AntiBot.getValue("Tab");
var AntiBotEntityID = AntiBot.getValue("EntityID");
var AntiBotColor = AntiBot.getValue("Color");
var AntiBotLivingTime = AntiBot.getValue("LivingTime");
var AntiBotGround = AntiBot.getValue("Ground");
var AntiBotAir = AntiBot.getValue("Air");
var AntiBotInvalidGround = AntiBot.getValue("InvalidGround");
var AntiBotSwing = AntiBot.getValue("Swing");
var AntiBotHealth = AntiBot.getValue("Health");
var AntiBotDerp = AntiBot.getValue("Derp");
var AntiBotWasInvisible = AntiBot.getValue("WasInvisible");
var AntiBotArmor = AntiBot.getValue("Armor");
var AntiBotPing = AntiBot.getValue("Ping");
var AntiBotNeedHit = AntiBot.getValue("NeedHit");
*/


	this.BlockSettings = function() { // wip
			switch(AntiCheatMode.get()) {
				case "NCP":
				if(KillAuraTargetMode.get() != "Single") {
					KillAuraTargetMode.set("Single");
					chat.print("§8LiquidBounce: §eThe mode is banned by AutoBypass!")
				}
				if(KillAuraRange.get() >= 4.26) {
					KillAuraRange.set(4.25);
					chat.print("§8LiquidBounce: §eThe setting is banned by AutoBypass!")
				}
				if(KillAuraCPS.get() >= 13) {
					KillAuraCPS.set(12);
					KillAuraCPS2.set(12);
					chat.print("§8LiquidBounce: §eThe setting is banned by AutoBypass!")
				}
				if(ScaffoldDelay.get() <= 59) {
					ScaffoldDelay.set(60);
					ScaffoldDelay2.set(60);
					chat.print("§8LiquidBounce: §eThe setting is banned by AutoBypass!")
				}
				if(ScaffoldRotations.get() == false) {
					ScaffoldRotations.set(true);
					chat.print("§8LiquidBounce: §eThe option is forced by AutoBypass!")
				}
				if(FlyMode.get() != "Hypixel" && FlyMode.get() != "LatestHypixel" && FlyMode.get() != "AAC3.3.12") {
					FlyMode.set("Hypixel");
					chat.print("§8LiquidBounce: §eThe mode is banned by AutoBypass!")
				}
				if(mc.timer.timerSpeed >= 2.0) {
					mc.timer.timerSpeed = 1.0;
					chat.print("§8LiquidBounce: §eThat timer speed is banned by AutoBypass!")
				}
				if(CriticalsMode.get() != "Packet" || CriticalsDelay.get() <= 19) {
					CriticalsMode.set("Packet");
					CriticalsDelay.set(20);
					chat.print("§8LiquidBounce: §eThe mode is banned by AutoBypass!")
				}
				if(SpeedMode.get() != "NCPBHop" && SpeedMode.get() != "NCPYPort" && SpeedMode.get() != "SlowHop" && SpeedMode.get() != "SNCPBHop" && SpeedMode.get() != "NCPHop" && SpeedMode.get() != "NCPFHop" && SpeedMode.get() != "YPort2" && SpeedMode.get() != "YPort" && SpeedMode.get() != "OnGround") {
					SpeedMode.set("NCPHop");
					chat.print("§8LiquidBounce: §eThe mode is banned by AutoBypass!")
				}
				break;
				case "Spartan":
				if(KillAuraTargetMode.get() != "Single") {
					KillAuraTargetMode.set("Single");
					chat.print("§8LiquidBounce: §eThe mode is banned by AutoBypass!")
				}
					if(KillAuraCPS.get() >=16) {
					KillAuraCPS.set(15);
					KillAuraCPS2.set(9);
					chat.print("§8LiquidBounce: §eThe setting is banned by AutoBypass!")
				}
				if(mc.timer.timerSpeed >= 1.5) {
					mc.timer.timerSpeed = 1.0;
					chat.print("§8LiquidBounce: §eThat timer speed is banned by AutoBypass!")
				}
				if(CriticalsMode.get() != "LowJump") {
					CriticalsMode.set("LowJump");
					chat.print("§8LiquidBounce: §eThe mode is banned by AutoBypass!")
				}
				break;
				case "Watchdog":
				if(SpeedMode.get() != "HypixelHop") { 
				SpeedMode.set("HypixelHop");
				chat.print("§8LiquidBounce: §eThe mode is banned by AutoBypass!")
				}
				if(FlyMode.get() != "LatestHypixel") { 
				FlyMode.set("LatestHypixel");
				chat.print("§8LiquidBounce: §eThe mode is banned by AutoBypass!")
				}
				if(KillAuraInteractAutoBlock.get() == false) {
					KillAuraInteractAutoBlock.set(true);
					chat.print("§8LiquidBounce: §eThe setting is forced by AutoBypass!")
				}
				if(ScaffoldKeepRotations.get() == false) {
					ScaffoldKeepRotations.set(true);
					chat.print("§8LiquidBounce: §eThe setting is forced by AutoBypass!")
				}
				break;
				case "GWEN": 
					if(KillAuraInteractAutoBlock.get() == false) {
					KillAuraInteractAutoBlock.set(true);
					chat.print("§8LiquidBounce: §eThe setting is forced by AutoBypass!")
				}
				if(SpeedMode.get() != "SlowHop" && SpeedMode.get() != "Custom" && SpeedMode.get() != "MineplexGround") { 
				SpeedMode.set("SlowHop");
				chat.print("§8LiquidBounce: §eThe mode is banned by AutoBypass!")
				}
				if(KillAuraRange.get() >= 4.76) {
					KillAuraRange.set(4.75);
					chat.print("§8LiquidBounce: §eThe setting is banned by AutoBypass!")
				}
				if(mc.timer.timerSpeed >= 1.05) {
					mc.timer.timerSpeed = 1.0;
					chat.print("§8LiquidBounce: §eThat timer speed is banned by AutoBypass!")
				}
							if(ScaffoldDelay.get() <= 99) {
					ScaffoldDelay.set(100);
					ScaffoldDelay2.set(100);
					chat.print("§8LiquidBounce: §eThe setting is banned by AutoBypass!")
				}
				break;
				case "AAC": 
					if(ScaffoldKeepRotations.get() == false) {
					ScaffoldKeepRotations.set(true);
					chat.print("§8LiquidBounce: §eThe setting is forced by AutoBypass!")
				}
				if(KillAuraTargetMode.get() != "Single") {
					KillAuraTargetMode.set("Single");
					chat.print("§8LiquidBounce: §eThe mode is banned by AutoBypass!")
				}
				if(KillAuraRange.get() >= 4.26) {
					KillAuraRange.set(4.25);
					chat.print("§8LiquidBounce: §eThe setting is banned by AutoBypass!")
				}
				if(KillAuraCPS.get() >= 13) {
					KillAuraCPS.set(12);
					KillAuraCPS2.set(12);
					chat.print("§8LiquidBounce: §eThe setting is banned by AutoBypass!")
				}
				if(ScaffoldDelay.get() <= 59) {
					ScaffoldDelay.set(60);
					ScaffoldDelay2.set(60);
					chat.print("§8LiquidBounce: §eThe setting is banned by AutoBypass!")
				}
				if(ScaffoldRotations.get() == false) {
					ScaffoldRotations.set(true);
					chat.print("§8LiquidBounce: §eThe option is forced by AutoBypass!")
				}
				if(mc.timer.timerSpeed >= 1.10) {
					mc.timer.timerSpeed = 1.0;
					chat.print("§8LiquidBounce: §eThat timer speed is banned by AutoBypass!")
				}

				if(SpeedMode.get() != "AAC7BHop" && SpeedMode.get() != "AACLowHop3") {
					SpeedMode.set("AACLowHop3");
					chat.print("§8LiquidBounce: §eThe mode is banned by AutoBypass!")
				}
					if(KillAuraInteractAutoBlock.get() == false) {
					KillAuraInteractAutoBlock.set(true);
					chat.print("§8LiquidBounce: §eThe setting is forced by AutoBypass!")
				}
				break;
				case "Guardian":
				if(KillAuraTargetMode.get() != "Single") {
					KillAuraTargetMode.set("Single");
					chat.print("§8LiquidBounce: §eThe mode is banned by AutoBypass!")
				}
				if(KillAuraRange.get() >= 5.01) {
					KillAuraRange.set(5.00);
					chat.print("§8LiquidBounce: §eThe setting is banned by AutoBypass!")
				}
				if(KillAuraCPS.get() >= 17) {
					KillAuraCPS.set(17);
					KillAuraCPS2.set(12);
					chat.print("§8LiquidBounce: §eThe setting is banned by AutoBypass!")
				}
				if(FlyMode.get() != "Hypixel") {
					FlyMode.set("Hypixel");
					chat.print("§8LiquidBounce: §eThe mode is banned by AutoBypass!")
				}
				if(mc.timer.timerSpeed >= 3.0) {
					mc.timer.timerSpeed = 1.0;
					chat.print("§8LiquidBounce: §eThat timer speed is banned by AutoBypass!")
				}
				if(CriticalsMode.get() != "TPHop" || CriticalsDelay.get() < 200) {
					CriticalsMode.set("Packet");
					CriticalsDelay.set(200);
					chat.print("§8LiquidBounce: §eThe settings are banned by AutoBypass!")
				}
				if(SpeedMode.get() != "YPort" && SpeedMode.get() != "SlowHop") {
					SpeedMode.set("SlowHop");
					chat.print("§8LiquidBounce: §eThe mode is banned by AutoBypass!")
				}
				break;
				case "Matrix":
								if(KillAuraTargetMode.get() != "Single") {
					KillAuraTargetMode.set("Single");
					chat.print("§8LiquidBounce: §eThe mode is banned by AutoBypass!")
				}
				break;
				case "AAC1.9.10":
								if(FlyMode.get() != "AAC") {
					FlyMode.set("AAC");
					chat.print("§8LiquidBounce: §eThe mode is banned by AutoBypass!")
				}
								if(KillAuraTargetMode.get() == "Multi") {
					KillAuraTargetMode.set("Single");
					chat.print("§8LiquidBounce: §eThe mode is banned by AutoBypass!")
				}
								if(SpeedMode.get() != "OldAACBHop" && SpeedMode.get() != "AACLowHop" && SpeedMode.get() != "AACLowHop2") {
					SpeedMode.set("OldAACBHop");
					chat.print("§8LiquidBounce: §eThe mode is banned by AutoBypass!")
				}
				break;
				case "PAC":
				if(KillAuraTargetMode.get() != "Single") {
					KillAuraTargetMode.set("Single");
					chat.print("§8LiquidBounce: §eThe mode is banned by AutoBypass!")
				}
				if(SpeedMode.get() != "SlowHop") {
					SpeedMode.set("SlowHop");
					chat.print("§8LiquidBounce: §eThe mode is banned by AutoBypass!")
				}
				break;
				case "FireFly":
					if(SpeedMode.get() != "SlowHop") {
					SpeedMode.set("SlowHop");
					chat.print("§8LiquidBounce: §eThe mode is banned by AutoBypass!")
				}
					if(KillAuraInteractAutoBlock.get() == false) {
					KillAuraInteractAutoBlock.set(true);
					chat.print("§8LiquidBounce: §eThe setting is forced by AutoBypass!")
				}
				if(FlyMode.get() != "Rewinside") {
					FlyMode.set("Rewinside");
					chat.print("§8LiquidBounce: §eThe mode is forced by AutoBypass!")
				}
				break;
			}
	}
	
    this.getName = function() {
        return "AutoBypass";
    }
    this.getCategory = function() {
        return "Misc";   
    }

    this.getDescription = function() {
        return "Helps bypass AntiCheats.";
    }
    this.onEnable = function() {
		if(LoadConfig.get() == true) {
		if(AntiCheatMode.get() != "GWEN" && AntiCheatMode != "Watchdog" && AntiCheatMode != "Sentinel" && AntiCheatMode != "FireFly" && AntiCheatMode != "Guardian" && AntiCheatMode != "Matrix" && AntiCheatMode != "PAC") {
			commandManager.executeCommand(".config load " + AntiCheatMode.get());
		} 
		if(AntiCheatMode.get() == "GWEN") {
			commandManager.executeCommand(".config load mineplex");
		} 
				if(AntiCheatMode.get() == "Watchdog") {
			commandManager.executeCommand(".config load Hypixel");
		} 
				if(AntiCheatMode.get() == "Sentinel") {
			commandManager.executeCommand(".config load cubecraft");
		} 
		

	}
    }
	this.onUpdate = function() {
		if(Modules.get() == true) {
			this.BlockModules();
		}
	if(BadSettings.get() == true) {
		this.BlockSettings();
	}
	}
	this.onDisable = function() {
		
	}
	this.addValues = function(SOUL) {
		SOUL.add(AntiCheatMode);
		SOUL.add(Modules);
		SOUL.add(BadSettings);
		SOUL.add(LoadConfig);
	}
	/*
	this.getTag = function() {
    return AntiCheatMode.get();
}
*/
}

var module = new Module();
var moduleClient;

function onLoad() {
	
}

function onEnable() {
    moduleClient = moduleManager.registerModule(module);
}

function onDisable() {
    moduleManager.unregisterModule(moduleClient);
}