/**
 * 
 * Script of tk400's
 * this script contains ModuleManager, TowerScaffoldzzzzszszszszszszs, HypixelGameChanger, Quitter(new?) ChatManager(New!).
 * 
 * Enchancing LiquidBounce Hacked Client.
 * (write description later)
 * 
 * script for Latest(1.8.9) build. (tested on 401b3c5) and LiquidBounce+
 * https://dl.ccbluex.net/skip/lgJeAGuKh9 / Original
 * 
 */
var scriptName = "ModuleManager+";
var scriptVersion = 1.42;
var scriptAuthor = "shirouto Co-Da- tk400.";

//Modules
var KickModule = moduleManager.getModule("Kick");
var ConSpamModule = moduleManager.getModule("ConsoleSpammer");
var CriticalsModule = moduleManager.getModule("Criticals");
var NoFallModule = moduleManager.getModule("NoFall");
var SpammerModule = moduleManager.getModule("Spammer");
var PingSpoofModule = moduleManager.getModule("PingSpoof");
var FuckerModule = moduleManager.getModule("Fucker");
var BlockESPModule = moduleManager.getModule("BlockESP");
var AutoLeaveModule = moduleManager.getModule("AutoLeave");
var AimBotModule = moduleManager.getModule("AimBot");
var KAModule = moduleManager.getModule("KillAura");
var BugUpModule = moduleManager.getModule("BugUp");
var SpeedModule = moduleManager.getModule("Speed");
var HighJumpModule = moduleManager.getModule("HighJump");
var LJModule = moduleManager.getModule("LongJump");
var RSModule = moduleManager.getModule("ReverseStep");
var FlyModule = moduleManager.getModule("Fly");
var SprintModule = moduleManager.getModule("Sprint");
var VelocityModule = moduleManager.getModule("Velocity");
var ScaffoldModule = moduleManager.getModule("Scaffold");
var TowerModule = moduleManager.getModule("Tower");
var InvModule = moduleManager.getModule("InvManager"); //this module has renamed from InventoryCleaner. fuck sake.
var InvAAModule = moduleManager.getModule("AutoArmor");
var BlinkModule = moduleManager.getModule("Blink");
var ClickGUIModule = moduleManager.getModule("ClickGUI");
var FreeCamModule = moduleManager.getModule("FreeCam");
var StoESPModule = moduleManager.getModule("StorageESP");
var ESPModule = moduleManager.getModule("ESP");

//LiquidBounce's Util
//var hogehoge = Java.type("").class;
var RotationUtils = Java.type("net.ccbluex.liquidbounce.utils.RotationUtils").class;
var KillAura = Java.type("net.ccbluex.liquidbounce.features.module.modules.combat.KillAura").class;
var LiquidBounce = Java.type("net.ccbluex.liquidbounce.LiquidBounce").moduleManager;

var servername = '';

var LAB = 01

//Packets
//var S12PacketEntityVelocity = Java.type('net.minecraft.network.play.server.S12PacketEntityVelocity');
//var clientchat = Java.type("net.minecraft.network.play.client.C01PacketChatMessage");
var C0CPacketInput = Java.type('net.minecraft.network.play.client.C0CPacketInput');
var C00PacketKeepAlive = Java.type('net.minecraft.network.play.client.C00PacketKeepAlive');
var C03PacketPlayer = Java.type('net.minecraft.network.play.client.C03PacketPlayer');
var C06PacketPlayerPosLook = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook');
var C0FPacketConfirmTransaction = Java.type('net.minecraft.network.play.client.C0FPacketConfirmTransaction');
var C0BPacketEntityAction = Java.type('net.minecraft.network.play.client.C0BPacketEntityAction');

//minecraft/Java Utils
//var hogehoge = Java.type("")
var Rotations = Java.type("net.minecraft.util.Rotations")
//var DamageSource = Java.type("net.minecraft.util.DamageSource") // unused obj
//var mouseHelper = Java.type("net.minecraft.util.MouseHelper") // unused obj

//Player | Mob States
EntityLiving = Java.type('net.minecraft.entity.EntityLivingBase');
EntityPlayer = Java.type('net.minecraft.entity.player.EntityPlayer');
Potion = Java.type('net.minecraft.potion.Potion');
GuiInventory = Java.type("net.minecraft.client.gui.inventory.GuiInventory");
GuiChest = Java.type("net.minecraft.client.gui.inventory.GuiChest");
GameMode = Java.type('net.minecraft.world.WorldSettings.GameType')
ItemCameraTransforms = Java.type('net.minecraft.client.renderer.block.model.ItemCameraTransforms')

//Blocks
BlockPos = Java.type('net.minecraft.util.BlockPos')
SlabBlock = Java.type('net.minecraft.block.BlockSlab')
SlimeBlock = Java.type('net.minecraft.block.BlockSlime')
AirBlock = Java.type('net.minecraft.block.BlockAir')
Workbench = Java.type('net.minecraft.block.BlockWorkbench')
Chest = Java.type('net.minecraft.block.BlockChest')
Furnace = Java.type('net.minecraft.block.BlockFurnace')

function ModuleManager() {
  //var WasFallen = false;
  var MoveDir = 'A';
  var teex = false;
  var WasFallen = false;
  var ANC = true;
  var EnterConfirmCheck = EnterConfirmCheckA = false;
  var servername = ASServername = "";
  var configmode = "";
  var FPSLimited = false;
  var FallLimit = 0;
  var target = null;
  //var targetposX = 0;
  //var targetposZ = 0;
  //var azoz = 0;
  //var azoz2 = 0;

  var DMode = value.createBoolean("DevMode", false);
  var test = value.createBoolean("test", false);
  var ReadMe = value.createBoolean("ReadMe.js", false);
  var MMMode = value.createList("MMMode", ["Original", "LiquidBounce+"], "");
  var Text1 = value.createText(">MMSettings", "");
  var SLT = value.createText("CustomTag", "SuperMechaMechaSugooooiModule!");
  var Color2 = value.createText("CustomColor", "a"); //https://minecraft.gamepedia.com/Formatting_codes
  var DCV = value.createBoolean("DebugChat", false);
  var DML = value.createList("DebugLevel", ["NormalInfo", ""], "");
  //var test = value.createBoolean("test", true); //Using on Develop, tset.
  //var Crandom = value.createBoolean("ConfigRandomizer", false);
  var SpeedJump = value.createBoolean("Speed", true);
  var WASDSpeed = value.createBoolean("AntiHorizontalSpeedStrafing", false);
  var AHSSM = value.createList("AHSSMethod", ["FreeControl", "ForcedDirection", "ForcedDirection2"], "ForcedDirection");
  var AHSSD = value.createBoolean("AHSSDebug", false);
  var WithSC = value.createBoolean("WithSmoothCamera", false);
  var SpeedsDisabler = value.createBoolean("SpeedsDisabler", true);
  //var SDlist = value.createBoolean("DisableWhen", ["Scaffolding","MovementModule"],""); //idea = Czhechek's CC?
  var ChangeMode = value.createText("ChangingMode", "Custom");
  var VelLJManage = value.createBoolean("VelLongJump", true);
  var AutoKAJump = value.createBoolean("AutoKAJump", false);

  var ReverseStepFix = value.createBoolean("ReverseStepFix", true); //using for Slime Motion Jumping, Falling on when you Floating from block.
  var AntiNoCritical = value.createBoolean("AntiNoCritical", false); //Fixes? Not Criticalizing Bug. when you using Critical with NoFall.
  var AutoFClear = value.createBoolean("AutoFClear", false);
  var NoCPBlink = value.createBoolean("ClonedPlayerRemover", false);
  var Text2 = value.createText("§l>InvModeManager", "");
  var Inv = value.createBoolean("Inv", true);
  var InvList = value.createList("Mode", ["None", "Open", "Simulate", "Both", "InvSpoof","InvSpoof-Old","Both-Old"], "None");
  var Text3 = value.createText(">BlockRenderManager", "");
  var RenderSetting = value.createBoolean("RenderSetting", true);
  var RSCounter = value.createList("Counter", ["false", "Off", "Simple", "Advanced", "Sigma", "Novoline"], "false");
  var RSMark = value.createBoolean("Mark", false);
  var Text4 = value.createText(">BlockSelection", "");
  var Selection = value.createBoolean("Selection", false);
  var DSBlock = value.createBoolean("DetectServer'sBlock", false);
  var mode = value.createList("SetBlock", ["Bed", "Cake", "Dragon_Egg", "Obsidian", "Enchanting_Table", "Crafting_Table", "Custom"], "Bed");
  var customid = value.createInteger("CustomID", 0, 0, 197);
  var MidClick = value.createBoolean("MidClickToSet", false);
  var fucker = value.createBoolean("Fucker", true);
  var EnableFucker = value.createBoolean("EnableFucker", false);
  var blockesp = value.createBoolean("BlockESP", true);
  var EnableESP = value.createBoolean("EnableESP", true);
  var AutoLeave = value.createBoolean("AlwaysAutoLeave", false); //Always Enable LB's AutoLeave Module.
  var Text5 = value.createText(">ConfigManager", "");
  var AutoLoad = value.createBoolean("AutoLoader", false);
  var LoadConfig = value.createBoolean("LoadConfig", false);
  var AutoSave = value.createBoolean("AutoSaver", false);
  var SaveConfig = value.createBoolean("SaveConfig", false);
  var SavingName = value.createText("CurrentLoad/SaveFileName", "N/A");
  var DSConfig = value.createBoolean("ServerDetect", false);
  var AntiESP = value.createBoolean("AntiNoControlableESP", false);
  var NoMouse = value.createBoolean("NoMouseWhenAttack", false);
  //var AntiVoid = value.createBoolean("AntiVoidFallingViaScaffold", false); //exist on LiquidBouncePlus
  var MinFallDis = value.createFloat("MinFallDistance", 1.5, 0, 30);
  //var auto = value.createBoolean("AutoFPSLimit", true);
  var PSID = value.createBoolean("PrintSessionID", false);

  this.addValues = function(v) {
    v.add(DMode)
    v.add(ReadMe);
    v.add(MMMode);
    v.add(Text1);
    v.add(SLT);
    v.add(Color2);
    //v.add(test);
    v.add(DCV);
    v.add(DML);
    v.add(SpeedsDisabler);
    v.add(ChangeMode)
    v.add(VelLJManage);
    v.add(AutoKAJump);
    v.add(ReverseStepFix);
    v.add(AntiNoCritical);
    v.add(SpeedJump);
    v.add(WASDSpeed);
    v.add(AHSSM);
    v.add(AHSSD);
    v.add(WithSC);
    v.add(AutoFClear);
    v.add(NoCPBlink);
    v.add(Text2);
    v.add(Inv);
    v.add(InvList);
    v.add(Text3);
    v.add(RenderSetting);
    v.add(RSCounter);
    v.add(RSMark);
    v.add(Text4);
    v.add(Selection);
    v.add(DSBlock);
    v.add(mode);
    v.add(customid);
    v.add(MidClick);
    v.add(fucker);
    v.add(EnableFucker);
    v.add(blockesp);
    v.add(EnableESP);
    v.add(AutoLeave);
    v.add(Text5);
    v.add(AutoLoad);
    v.add(LoadConfig);
    v.add(AutoSave);
    v.add(SaveConfig);
    v.add(SavingName);
    v.add(DSConfig);
    v.add(AntiESP);
    v.add(NoMouse);
    //v.add(AntiVoid) //exist on LiquidBouncePlus
    v.add(MinFallDis);
    //v.add(auto);
    v.add(PSID);
  };

  this.getName = function() {
    return "ModuleManager";
  };
  this.getDescription = function() {
    return "Management Disable, Setting, Modules. A Simple Script. coded for LB+ and LBOriginal.";
  };
  this.getCategory = function() {
    return "Player";
  };
  this.getTag = function() {
    return SLT.get();
  };
  this.onJump = function(e) {
    if (SpeedJump.get() && DMode.get()) {
      if (SpeedModule.getState() && mc.thePlayer.onGround) {
        if (MoveCheck()) {
          e.cancelEvent();
          DC(DCV.get(), "MM", Color2.get(), "Disabled Jump.");
        }
      }
    };
  }
  this.onUpdate = function() {
    if(PSID.get()) {
      chat.print(mc.getSession().getToken())
    }
    if (ReadMe.get()) {
      chat.print(null);
      ReadMe.set(false);
    }
    //Manage SpeedJump /Fix Jump Boosting
    if (SpeedJump.get()  && !DMode.get()) {
      if (SpeedModule.getState() && mc.thePlayer.onGround) {
        if (mc.gameSettings.keyBindJump.pressed) {
          if (MoveCheck()) {
            mc.gameSettings.keyBindJump.pressed = false;
            DC(DCV.get(), "MM", Color2.get(), "Disabled Jump.");
          }
        }
      }
    };
    //WASDSpeed
    if (WASDSpeed.get()) { //==> this code is working, but i think Inefficient. well good for Detecting Faster Strafing Cheat <==//
      if (AHSSD.get()) {
        DC(DCV.get(), "MM", Color2.get(), "MoveDirection =" + MoveDir)
      }
      if (SpeedModule.getState()) {
        if (WithSC.get()) {
          mc.gameSettings.smoothCamera = true;
          teex = true
        }
        if (mc.thePlayer.onGround) {
          if (!mc.gameSettings.keyBindForward.pressed && !mc.gameSettings.keyBindForward.pressed && !mc.gameSettings.keyBindForward.pressed && !mc.gameSettings.keyBindForward.pressed) {
            MoveDir = 'A'
          }
          if (mc.gameSettings.keyBindForward.pressed) {
            MoveDir = 'F'
          }
          if (mc.gameSettings.keyBindRight.pressed) {
            MoveDir = 'R'
          }
          if (mc.gameSettings.keyBindLeft.pressed) {
            MoveDir = 'L'
          }
          if (mc.gameSettings.keyBindBack.pressed) {
            MoveDir = 'B'
          }
          if (mc.gameSettings.keyBindForward.pressed && mc.gameSettings.keyBindRight.pressed) {
            MoveDir = 'FR'
          }
          if (mc.gameSettings.keyBindForward.pressed && mc.gameSettings.keyBindLeft.pressed) {
            MoveDir = 'FL'
          }
          if (mc.gameSettings.keyBindBack.pressed && mc.gameSettings.keyBindLeft.pressed) {
            MoveDir = 'BL'
          }
          if (mc.gameSettings.keyBindBack.pressed && mc.gameSettings.keyBindRight.pressed) {
            MoveDir = 'BR'
          }
        } else {
          if (WithSC.get() && teex) {
            mc.gameSettings.smoothCamera = false;
            teex = false
          }
          switch (AHSSM.get()) {
            case "FreeControl":
              switch (MoveDir) {
                case 'F':
                  mc.gameSettings.keyBindLeft.pressed = mc.gameSettings.keyBindBack.pressed = mc.gameSettings.keyBindRight.pressed = false;
                  break;
                case 'R':
                  mc.gameSettings.keyBindLeft.pressed = mc.gameSettings.keyBindBack.pressed = mc.gameSettings.keyBindForward.pressed = false;
                  break;
                case 'L':
                  mc.gameSettings.keyBindForward.pressed = mc.gameSettings.keyBindBack.pressed = mc.gameSettings.keyBindRight.pressed = false;
                  break;
                case 'B':
                  mc.gameSettings.keyBindLeft.pressed = mc.gameSettings.keyBindForward.pressed = mc.gameSettings.keyBindRight.pressed = false;
                  break;
                case 'FR':
                  mc.gameSettings.keyBindLeft.pressed = mc.gameSettings.keyBindBack.pressed = false;
                  break;
                case 'FL':
                  mc.gameSettings.keyBindBack.pressed = mc.gameSettings.keyBindRight.pressed = false;
                  break;
                case 'BL':
                  mc.gameSettings.keyBindRight.pressed = mc.gameSettings.keyBindRight.pressed = false;
                  break;
                case 'BR':
                  mc.gameSettings.keyBindLeft.pressed = mc.gameSettings.keyBindLeft.pressed = false;
                  break;
              }
              break;
            case "ForcedDirection":
              switch (MoveDir) {
                case 'F':
                  mc.gameSettings.keyBindLeft.pressed = mc.gameSettings.keyBindBack.pressed = mc.gameSettings.keyBindRight.pressed = false;
                  mc.gameSettings.keyBindForward.pressed = true;
                  break;
                case 'R':
                  mc.gameSettings.keyBindLeft.pressed = mc.gameSettings.keyBindBack.pressed = mc.gameSettings.keyBindForward.pressed = false;
                  mc.gameSettings.keyBindRight.pressed = true;
                  break;
                case 'L':
                  mc.gameSettings.keyBindForward.pressed = mc.gameSettings.keyBindBack.pressed = mc.gameSettings.keyBindRight.pressed = false;
                  mc.gameSettings.keyBindLeft.pressed = true;
                  break;
                case 'B':
                  mc.gameSettings.keyBindLeft.pressed = mc.gameSettings.keyBindForward.pressed = mc.gameSettings.keyBindRight.pressed = false;
                  mc.gameSettings.keyBindBack.pressed = true
                  break;
                case 'FR':
                  mc.gameSettings.keyBindLeft.pressed = mc.gameSettings.keyBindBack.pressed = false;
                  mc.gameSettings.keyBindForward.pressed = mc.gameSettings.keyBindRight.pressed = true;
                  break;
                case 'FL':
                  mc.gameSettings.keyBindBack.pressed = mc.gameSettings.keyBindRight.pressed = false;
                  mc.gameSettings.keyBindForward.pressed = mc.gameSettings.keyBindLeft.pressed = true;
                  break;
                case 'BL':
                  mc.gameSettings.keyBindRight.pressed = mc.gameSettings.keyBindForward.pressed = false;
                  mc.gameSettings.keyBindBack.pressed = mc.gameSettings.keyBindLeft.pressed = true;
                  break;
                case 'BR':
                  mc.gameSettings.keyBindForward.pressed = mc.gameSettings.keyBindLeft.pressed = false;
                  mc.gameSettings.keyBindBack.pressed = mc.gameSettings.keyBindRight.pressed = true;
                  break;
              }
              break;
            case "ForcedDirection2":
              switch (MoveDir) {
                case 'F':
                  mc.gameSettings.keyBindLeft.pressed = mc.gameSettings.keyBindBack.pressed = mc.gameSettings.keyBindRight.pressed = false;
                  break;
                case 'R':
                  mc.gameSettings.keyBindLeft.pressed = mc.gameSettings.keyBindBack.pressed = mc.gameSettings.keyBindForward.pressed = false;
                  break;
                case 'L':
                  mc.gameSettings.keyBindForward.pressed = mc.gameSettings.keyBindBack.pressed = mc.gameSettings.keyBindRight.pressed = false;
                  break;
                case 'B':
                  mc.gameSettings.keyBindLeft.pressed = mc.gameSettings.keyBindForward.pressed = mc.gameSettings.keyBindRight.pressed = false;
                  break;
                case 'FR':
                  mc.gameSettings.keyBindLeft.pressed = mc.gameSettings.keyBindBack.pressed = false;
                  break;
                case 'FL':
                  mc.gameSettings.keyBindBack.pressed = mc.gameSettings.keyBindRight.pressed = false;
                  break;
                case 'BL':
                  mc.gameSettings.keyBindRight.pressed = mc.gameSettings.keyBindForward.pressed = false;
                  break;
                case 'BR':
                  mc.gameSettings.keyBindForward.pressed = mc.gameSettings.keyBindLeft.pressed = false;
                  break;
              }
          }
        }
      }
    } //SpeedDisabler
    switch (MMMode.get()) {
      case "LiquidBounce+":
        if (SpeedsDisabler.get()) {
          if ((SpeedModule.getState() || LJModule.getState()) && (FlyModule.getState() || FreeCamModule.getState() || ScaffoldModule.getState())) {
            SpeedModule.setState(false) || LJModule.setState(false);
            DC(DCV.get(), "MM", Color2.get(), "Disabled Speed or LongJump.");
          }
        };break;
      case "Original":
        if (SpeedsDisabler.get()) {
          if ((SpeedModule.getState() || LJModule.getState()) && (FlyModule.getState() || FreeCamModule.getState() || ScaffoldModule.getState() || TowerModule.getState())) {
            SpeedModule.setState(false) || LJModule.setState(false);
            DC(DCV.get(), "MM", Color2.get(), "Disabled Speed or LongJump.");
          }
        };break;
    }
    //VelLJ /Hypixel Fix?
    if (VelLJManage.get()) {
      if (VelocityModule.getState() == LJModule.getState()) {
        VelocityModule.setState(!LJModule.getState())
        chat.print("set to | Vel:" + !VelocityModule.getState())
      };
    };
    //ReverseStepFix
    if (ReverseStepFix.get()) {
      if (FlyModule.getState() || mc.theWorld.getBlockState(new BlockPos(mc.thePlayer.posX, mc.thePlayer.posY - 1, mc.thePlayer.posZ)).getBlock() instanceof SlimeBlock) {
        RSModule.getState() && RSModule.setState(false)
      } else if (!FlyModule.getState() && !(mc.theWorld.getBlockState(new BlockPos(mc.thePlayer.posX, mc.thePlayer.posY - 1, mc.thePlayer.posZ)).getBlock() instanceof SlimeBlock)) {
        RSModule.setState(true)
      }
    };
    //AntiNoCritical
    if (AntiNoCritical.get()) {
      if (!mc.thePlayer.onGround && mc.thePlayer.posY < 2.6) {
        if (mc.thePlayer.fallDistance >= 2.6) {
          if (!NoFallModule.getState()) {
            NoFallModule.setState(true)
          } else if (FallLimit != 2) {
            mc.thePlayer.fallDistance = 0;
            FallLimit += 1;
            DC(DCV.get(), "MM", Color2.get(), "Reset FallDistance") /*test code*/
          }
        }
      } else {
        FallLimit = 0
      }
    }
    //AutoKAJump
    if (AutoKAJump.get() && KAModule.getState()) {
      mc.gameSettings.keyBindJump.pressed = true
    };
    //RemoveClonedPlayer
    if (NoCPBlink.get()) { //cloned from TSMM's
      if (BlinkModule.getState()) {
        for (var x in mc.theWorld.loadedEntityList) {
          var entities = mc.theWorld.loadedEntityList[x]; //i think generate from Blink's Fakeplayer entityID is fixed for "-1337".
          if ((entities != mc.thePlayer) && (entities.getEntityId() == -1337)) {
            mc.theWorld.removeEntity(entities);
            DC(DCV.get(), "MM", Color2.get(), "Removed ClonedPlayer.")
          }
        }
      }
    }

    /* Manage Modules Setting */
    //RenderSetter /fix Replaced by other user's Setting
    if (RenderSetting.get()) {
      if (RSCounter.get() != "false") {
        switch (MMMode.get()) {
          case "LiquidBounce+":
            if (RSCounter.get() != ScaffoldModule.getValue("Counter").get()) {
              ScaffoldModule.getValue("Counter").set(RSCounter.get())
            }
            break;
          case "Original":
            if (RSCounter.get("Off")) {
              ScaffoldModule.getValue("Counter").get() && ScaffoldModule.getValue("Counter").set(false);
              TowerModule.getValue("Counter").get() && TowerModule.getValue("Counter").set(false);
            } else if (RSCounter.get("Simple")) {
              ScaffoldModule.getValue("Counter").get() && ScaffoldModule.getValue("Counter").set(true);
              TowerModule.getValue("Counter").get() && TowerModule.getValue("Counter").set(true);
            }
            break;
        }
      }
      //Mark
      if (RSMark.get() != ScaffoldModule.getValue("Mark").get()) {
        ScaffoldModule.getValue("Mark").set(RSMark.get());
      }
    };
    //Inv /This is ???
    if (Inv.get()) {
      switch(MMMode.get()) {
        case "Original":
          switch (InvList.get()) {
            case "None":
              if (InvModule.getValue("invOpen").get()) {InvModule.getValue("invOpen").set(false)};
              if (InvModule.getValue("SimulateInventory").get()) {InvModule.getValue("SimulateInventory").set(false)}
              if (InvAAModule.getValue("invOpen").get()) {InvAAModule.getValue("invOpen").set(false)};
              if (InvAAModule.getValue("SimulateInventory").get() == true) {InvAAModule.getValue("SimulateInventory").set(false)}
              break;
            case "Open":
              if (InvModule.getValue("invOpen").get(false)) {InvModule.getValue("invOpen").set(true)};
              if (InvModule.getValue("SimulateInventory").get()) {InvModule.getValue("SimulateInventory").set(false)}
              if (InvAAModule.getValue("invOpen").get(false)) {InvAAModule.getValue("invOpen").set(true)};
              if (InvAAModule.getValue("SimulateInventory").get() == true) {InvAAModule.getValue("SimulateInventory").set(false)}
              break;
            case "Simulate":
              if (InvModule.getValue("invOpen").get()) {InvModule.getValue("invOpen").set(false)};
              if (InvModule.getValue("SimulateInventory").get(false)) {InvModule.getValue("SimulateInventory").set(true)}
              if (InvAAModule.getValue("invOpen").get()) {InvAAModule.getValue("invOpen").set(false)};
              if (InvAAModule.getValue("SimulateInventory").get(false)) {InvAAModule.getValue("SimulateInventory").set(true)}
              break;
            case "Both":
              if (InvModule.getValue("invOpen").get(false)) {InvModule.getValue("invOpen").set(true)};
              if (InvModule.getValue("SimulateInventory").get(false)) {InvModule.getValue("SimulateInventory").set(true)}
              if (InvAAModule.getValue("invOpen").get(false)) {InvAAModule.getValue("invOpen").set(true)};
              if (InvAAModule.getValue("SimulateInventory").get(false)) {InvAAModule.getValue("SimulateInventory").set(true)}
              break;
          }
          break;
        case "LiquidBounce+":
          switch (InvList.get()) {
            case "None":
              InvModule.getValue("invOpen").get() && InvModule.getValue("invOpen").set(false)
              InvModule.getValue("InvSpoof").get() && InvModule.getValue("InvSpoof").set(false)
              InvModule.getValue("InvSpoof-Old").get() && InvModule.getValue("InvSpoof-Old").set(false)
              break;
            case "Open":
              !InvModule.getValue("invOpen").get() && InvModule.getValue("invOpen").set(true)
              InvModule.getValue("InvSpoof").get() && InvModule.getValue("InvSpoof").set(false)
              InvModule.getValue("InvSpoof-Old").get() && InvModule.getValue("InvSpoof-Old").set(false)
              break;
            case "InvSpoof":
              InvModule.getValue("invOpen").get() && InvModule.getValue("invOpen").set(false)
              !InvModule.getValue("InvSpoof").get() && InvModule.getValue("InvSpoof").set(true)
              InvModule.getValue("InvSpoof-Old").get() && InvModule.getValue("InvSpoof-Old").set(false)
              break;
            case "InvSpoof-Old":
              InvModule.getValue("invOpen").get() && InvModule.getValue("invOpen").set(false)
              !InvModule.getValue("InvSpoof").get() && InvModule.getValue("InvSpoof").set(true)
              !InvModule.getValue("InvSpoof-Old").get() && InvModule.getValue("InvSpoof-Old").set(true)
              break;
            case "Both":
              !InvModule.getValue("invOpen").get() && InvModule.getValue("invOpen").set(true)
              !InvModule.getValue("InvSpoof").get() && InvModule.getValue("InvSpoof").set(true)
              InvModule.getValue("InvSpoof-Old").get() && InvModule.getValue("InvSpoof-Old").set(false)
              break;
            case "Both-Old":
              !InvModule.getValue("invOpen").get() && InvModule.getValue("invOpen").set(true)
              !InvModule.getValue("InvSpoof").get() && InvModule.getValue("InvSpoof").set(true)
              !InvModule.getValue("InvSpoof-Old").get() && InvModule.getValue("InvSpoof-Old").set(true)
              break;
            default:break;
          }break;
      }
    }
    //Selection
    if (Selection.get()) {
      id = [26, 92, 122, 9, 116, 58, customid.get()][
        ["Bed", "Cake", "Dragon_Egg", "Obsidian", "Enchanting_Table", "Crafting_Table", "Custom"].indexOf(mode.get())
      ];
      if (DSBlock.get()) {
        DC(DCV.get(), "MM", Color2.get(), "Detected :" + servername)
        switch (servername) { //next feature is for() config system? xd
          case "Hypixel":
            id = 26
            break;
          case "Mineplex":
            id = 92
            break;
          case "Cubecraft":
            id = 122
            break;
          case "CCBlueX":
            chat.print("DEV | Checked!");
            id = 1
            break;
          default:
            D("sorry, your server ip wasn't found on the list. now setting up to your config")
            fucker.get() && FuckerModule.getValue("Block").set(id);
            blockesp.get() && BlockESPModule.getValue("Block").set(id);
            break;
        }
        if (fucker.get() && id != FuckerModule.getValue("Block").get()) {
          FuckerModule.getValue("Block").set(id)
        };
        if (blockesp.get() && id != BlockESPModule.getValue("Block").get()) {
          BlockESPModule.getValue("Block").set(id)
        }
      } else {
        fucker.get() && FuckerModule.getValue("Block").set(id);
        blockesp.get() && BlockESPModule.getValue("Block").set(id);
      }
      if (EnableFucker.get()) {
        !FuckerModule.getState() && FuckerModule.setState(true)
      }
      if (EnableESP.get()) {
        !BlockESPModule.getState() && BlockESPModule.setState(true)
      }
      Selection.set(false);
    }
    //Dev// //(Auto)Config Loader
    if (LoadConfig.get()) {
      LoadConfig.set(false);
      mc.thePlayer.closeScreen()
      if (DSConfig.get()) {
        EnterConfirmCheck = true;
        configmode = "Load";
        D("are you sure for loading config for <" + servername + ">?\npress Enter key for confirm, press ESCKey to cancel.")
      } else {
        D("i have no 'Idea', sorry. hm Loading Basement config is gooder idea?")
      }
    }
    if (SaveConfig.get()) {
      SaveConfig.set(false);
      mc.thePlayer.closeScreen()
      configmode = "Save";
      EnterConfirmCheck = true;
      D("are you sure for saving config for <" + servername + ">?\npress Enter key for confirm, press ESCKey to cancel.")
    };
    //AntiCESP /this function is useful for me.
    if (AntiESP.get()) {
      if (ESPModule.getValue("Mode").get() !=="ShaderOutline" || ESPModule.getValue("Mode").get()!=="ShaderGlow") {
        ESPModule.getValue("Mode").set("2D");
        chat.print("Detected")
      }
      if (StoESPModule.getValue("Mode").get() !=="ShaderOutline" || StoESPModule.getValue("Mode").get()!=="ShaderGlow") {
        StoESPModule.getValue("Mode").set("2D");
        chat.print("detected")
      }
    }
  }
  this.onKey = function(e) {
    //manager of config MM function
    if (EnterConfirmCheckA) {
      if (e.getKey() == 28 && e.getKey() != 1) {
        if (AutoSaver) {
          AutoSaver = false;
          !AutoLoader && (EnterConfirmCheckA = false)
          D("Enter has pressed. Now saving " + servername)
          Config("Save", ASServername)
          AutoSave.get() && (ASServername = servername, D("EnterKey pressed."));
        } else if (AutoLoader) {
          AutoLoader = EnterConfirmCheckA = false;
          D("Enter has pressed. Now loading " + servername)
          Config("Save", "FailFileSave" /*+wtisit() */) //Saving Last Config for FailSafe. but if you don't want this feature, plz delete this line.
          Config("Load", servername)
        }
      } else if (e.getKey() == 1) {
        if (AutoSaver) {
          AutoSaver = false;
          !AutoLoader && (EnterConfirmCheckA = false /*,D("detected AutoLoader has false. setting ECCA = false")*/ )
          AutoSave.get() && (ASServername = servername, D("ESCKey pressed."));
        } else if (AutoLoader) {
          AutoLoader = EnterConfirmCheckA = false;
          //D("Line 685 has loaded.")
        }
      }
    } else if (EnterConfirmCheck) {
      if (e.getKey() == 28) {
        //e.cancelEvent();
        D("Detected Enter has pressed. now " + configmode + " config...")
        Config(configmode, servername)
        EnterConfirmCheck = false;
      } else if (e.getKey() == 1) {
        //e.cancelEvent(); //eh this isn't working
        D("config " + configmode + " has been canceled.")
        EnterConfirmCheck = false;
      }
    }
    //DebugMenu
    /*if(DebugMenu) {
      
    }else if(e.getKey()) {}*/
  }
  this.onAttack = function(e) {
    target = e.getTargetEntity();
    NoMouse.get() && (mc.gameSettings.keyBindUseItem.pressed = mc.gameSettings.keyBindAttack.pressed = false)
      //AntiNoCritical
    AntiNoCritical.get() && NoFallModule.getState() && (NoFallModule.setState(false));
  };


  this.onWorld = function() {
    //This is not Module, But i think this is useful (Ex:Mineplex) :)
    if (AutoFClear.get()) {
      commandManager.executeCommand(".friends clear")
    }
    //Check AutoLeave was Disabled.
    if (AutoLeave.get()) {
      if (!AutoLeaveModule.getState()) {AutoLeaveModule.setState(true)}
    }
    //Used for ConfigSaver
    if (mc.getCurrentServerData().serverIP.match(".hypixel.net" || "hypixel.cn" || "hypixel.net")) {
      servername = "Hypixel"
    } else if (mc.getCurrentServerData().serverIP.match(".mineplex.com")) {
      servername = "Mineplex"
    } else if (mc.getCurrentServerData().serverIP.match(".cubecraft.net" || "cubecraft.net")) {
      servername = "Cubecraft"
    } else if (mc.getCurrentServerData().serverIP.match(".ccbluex.net")) {
      servername = "CCBlueX"
    } else if (mc.getCurrentServerData().serverIP.match("mccentral.org")) {
      servername = "MCCentral"
    } else if (mc.getCurrentServerData().serverIP.match("redesky.com")) {
      servername = "Redesky"
    } else if (mc.getCurrentServerData().serverIP.match("gommehd.net")) {
      servername = "GommeHD"
    } else {
      servername = "undetected"
    }
    // EXPEPIMENTAL //
    SavingName.set(servername);
    if (AutoSave.get() || AutoLoad.get()) {
      if (AutoSave.get()) {
        if (ASServername == "") {
          ASServername = servername; /*D("detected ASSN has Null. setting uped to | "+ASServername+" / "+servername)*/
        }
        D("[§2AutoSave§r] Save config for<§b" + ASServername + "§r>?\nPress Enter for confirm. press ESCKey to CancelSave.")
        AutoSaver = EnterConfirmCheckA = true;
      }
      if (AutoLoad.get()) {
        D("[§4AutoLoad§r] Load config for<§b" + servername + "§r>?\nPress Enter for confirm. press ESCKey to CancelLoad.")
        AutoLoader = EnterConfirmCheckA = true;
      }
    }
  }
  //this.onClickBlock = function(e) {
  //  //if(MidClick.get()) {
  //  //  chat.print(e.getClickedBlock())
  //  //  //id =mc.theWorld.getBlockState(new BlockPos(e.getClickedBlock())).getBlock()
  //  //  //fucker.get() && FuckerModule.getValue("Block").set(id);
  //  //  //blockesp.get()&&BlockESPModule.getValue("Block").set(id) 
  //  //  MidClick.set(false)
  //  //}
  //}
  //this.onLoad = function() {
  //  if (auto.get() && !FPSLimited) { //fixes fpslimiter has reseting for reboootowafawef
  //    commandManager.executeCommand("/fpslimit unlimited")
  //    auto.set(false);
  //    FPSLimited = true;
  //  }
  //}
}

function ABAssis() {
  var WM_BR = value.createInteger("->Moving-BR", 100, 0, 100); //when you moving (like B-Hoping, TargetStrafing, etc..)
  var WS_BR = value.createInteger("->Stopping-BR", 100, 0, 100); //When you fighting with 1v1 (HvH), good for if you using lower BR for AntiBotting
  var BRCM_R = value.createBoolean("->Rotation", false);//
  var BRCM_D = value.createBoolean("->Distance", false);//
  var BRCM_M = value.createBoolean("->PlayerMovement", false);//ignoring Player setting.
  var BRCMT_B = value.createBoolean("-->isTarget?", false)
  var BRCMP_B = value.createBoolean("-->isPlayer?", false)
  var ShapeLength = value.createFloat("-->ShapeLength", 4.55, 0, 10); //not MatxRangeToBlock. Attentioning when you unselected IT. i think you can set Smaller Value than MRTB.
  var TCS_BR = value.createInteger("-->Contacted_Stopping-BR", 100, 0, 100); //from target.
  var TCM_BR = value.createInteger("-->Contacted_Moving-BR", 100, 0, 100); //from target.
  var NCS_BR = value.createInteger("-->NotContacted_Stopping-BR", 100, 0, 100); //from target.
  var NCM_BR = value.createInteger("-->NotContacted_Moving-BR", 100, 0, 100); //from target.
  var NOTS_BR = value.createInteger("-->NearOnTheTarget_Stopping-BR", 0, 0, 100); //from target. If you enabled RotateChecker, Increase or Decrease Value from RotateCheck. If Disabled, Use Positive(if you configred -, Force set to +.)BlockRate Value.
  var NOTM_BR = value.createInteger("-->NearOnTheTarget_Moving-BR", 0, 0, 100); //from target. If you enabled RotateChecker, Increase or Decrease Value from RotateCheck. If Disabled, Use Positive(if you configred -, Force set to +.)BlockRate Value.
  var NotNOTS_BR = value.createInteger("-->NotNearOnTarget_Stopping-BR", 0, 0, 100); //from target. If you enabled RotateChecker, Increase or Decrease Value from RotateCheck. If Disabled, Use Positive(if you configred -, Force set to +.)BlockRate Value.
  var NotNOTM_BR = value.createInteger("-->NotNearOnTarget_Moving-BR", 0, 0, 100); //from target. If you enabled RotateChecker, Increase or Decrease Value from RotateCheck. If Disabled, Use Positive(if you configred -, Force set to +.)BlockRate Value.
  var CheckMode = value.createList("-->CheckMode", ["OnlyXZCirculment", "Sqhere"], "FullTriangle"); //Desighen of contactCheck.
  var HeightCheck = value.createBoolean("-->HeightCheck", false); //false = Check Any YPos
  var DegValue = value.createFloat("-->DegValue", 40, 0, 360); //Recommanded 40?
  var MRTBlock = value.createFloat("-->MaxRangeToBlock", 4, 0, 10); //Blocking on Enemy is in 4(Default) Distances. Smaller is dangerous, but Bigger is umm..
  var ShapeMode = value.createList("->ShapeMode", ["InfiniTriangle", "TrumpetDesighned"], "FullTriangle"); //hm IT= only check Deg, TD=Using Dec(Circumference) (these name are will be changing.)
  //var Height = value.createFloat("---> HeightValue", 0, 0, 10); //Negative + (Enemy'sYPos) + Positive = HeightValue

  this.addValues = function(v) {
    v.add(WS_BR)
    v.add(WM_BR)
    v.add(BRCM_R)
    v.add(BRCM_D)
    v.add(BRCM_M)
    v.add(BRCMT_B)
    v.add(BRCMP_B)
    v.add(ShapeLength)
    v.add(TCS_BR)
    v.add(TCM_BR)
    v.add(NCS_BR)
    v.add(NCM_BR)
    v.add(NOTS_BR)
    v.add(NOTM_BR)
    v.add(NotNOTS_BR)
    v.add(NotNOTM_BR)
    v.add(CheckMode)
    v.add(HeightCheck)
    v.add(DegValue)
    v.add(MRTBlock)
    v.add(ShapeMode)
     //v.add(Height)
  }

  this.getName = function() {
    return "AutoBlockAssist"
  }  
  this.getDescription = function() {
    return "Allow to automaticaly management AutoBlockRate, it may effectable for AAC, and Better Autoblcokrate"
  }  
  this.getCategory = function() {
    return "Fun"
  }

  this.onAttack = function(e) {target = e.getTargetEntity()}
  this.onUpdate = function() {
    //if() {}
  }
  this.onEnable = function() {}
  this.onDisable = function() {}
}

function ModuleRandomizer() { //Beta Module
  var a = b = r = h = htime = htiming = Subtraced = 0;

  var KAMR = value.createBoolean("KillAura", false);
  var UseHT = value.createBoolean("UseHurtTime", false);
  var Method = value.createList("ChangeMethod", ["UseDifference", "FullyRandom", "MinChanger"], "");
  var ntHT = value.createInteger("MinToHurtTime", 40, 0, 70);
  var xtHT = value.createInteger("MaxToHurtTime", 40, 0, 70);
  var HT = value.createInteger("HurtingTime", 10, 0, 20);
  var CM = value.createList("ChargingMoment", ["Always", "ChargeOnAttack"], "ChargeOnAttack");
  var KAMRS = value.createInteger("ChargingSpeed", 40, 0, 100);
  var text1 = value.createText("UseDifference", "");
  var max = value.createInteger("Max", 0, 0, 20); // Min-Min<Min<Max-Min<Max
  var maxn = value.createInteger("Max-Min", 0, 0, 20);
  var min = value.createInteger("Min", 0, 0, 20);
  var minn = value.createInteger("Min-Min", 0, 0, 20);
  var C = value.createBoolean("ChargeNow", false); //Debugy

  this.addValues = function(v) {
    v.add(KAMR)
    v.add(UseHT)
    v.add(Method)
    v.add(ntHT)
    v.add(xtHT)
    v.add(HT)
    v.add(CM)
    v.add(KAMRS)
    v.add(text1)
    v.add(max)
    v.add(maxn)
    v.add(min)
    v.add(minn)
    v.add(C)
  }
  this.getName = function() {
    return "ImJustProGaymer" //aka AntiBAN/BANPreventor
  }

  this.getDescription = function() {
    return "ModuleRandomizer"
  }

  this.getCategory = function() {
    return "Exploit"
  }

  this.onEnable = function() {
    var xCPS = KAModule.getValue("MaxCPS").get()
    var nCPS = KAModule.getValue("MinCPS").get()

    //var VH = VelocityModule.getValue("Horizontal").get()
    //var VV = VelocityModule.getValue("Vertical").get()
  }
  this.onUpdate = function() {
    if (Method.get("MinChanger") && !KAModule.getValue("MaxCPS").get(20)) {
      KAModule.getValue("MaxCPS").set(20)
    }
    if (C.get()) {r = 0;C.set(false);
    }
    if (KAMR.get()) {
      if (htime == tHT.get()) {
        if (UseHT.get()) { //Make Stronger your KillAura Settings. if Charged
          chat.print("Now HurtTime")
          htiming++
          KAModule.getValue("MaxCPS").set(DelayCal(max.get(), maxn.get()))
          KAModule.getValue("MinCPS").set(DelayCal(min.get(), minn.get()))
          if (htiming == HT.get()) { //Reset CPS on HurtTime was ended.
            htiming = htime = 0;
            chat.print("reset HurtTime")
            KAModule.getValue("MaxCPS").set(xCPS)
            KAModule.getValue("MinCPS").set(nCPS)
          }
        }
      } else {
        if (CM.get() === "Always") {r++}
        if (r==KAMRS.get()) {r=0;
          D("Value has Changed")
          switch (Method.get()) {
            case "UseDifference":
              a = DelayCal(max.get(), min.get())
              KAModule.getValue("MaxCPS").set(a)
              KAModule.getValue("MinCPS").set((a - Subtraced))
              break;
            case "FullyRandom":
              a = DelayCal(max.get(), min.get())
              b = DelayCal(a, min.get())
              KAModule.getValue("MaxCPS").set(a)
              KAModule.getValue("MinCPS").set(b)
              break;
            case "MinChanger": //test
              KAModule.getValue("MinCPS").set(DelayCal(max.get(), min.get()))
              break;
          }
        }
      }
    }
  }
  this.onAttack = function() {
    if (UseHT.get() && htime>0) {htime--}
    if (CM.get("Attack")) {r--}
  }
  this.onPacket = function() {
    //insert here Catch Velocity Packet Code.
  }
  this.onRender2D = function() {
    mc.ingameGUI.drawCenteredString(mc.fontRendererObj, "a=" + a + ", b=" + b + ", xCPS=" + xCPS + ", nCPS=" + nCPS + ", r=" + r + ", htime=" + htime + ", htiming=" + htiming + ", Subtracted=" + Subtraced, mc.displayWidth / 4, (mc.displayHeight / 2.5) + 8, -1)
  }
  this.onDisable = function() {
    a = r = htime = htiming = 0;
    KAModule.getValue("MaxCPS").set(xCPS)
    KAModule.getValue("MinCPS").set(nCPS)
  }
}
// TSMM by tk400 //


/* TIP: if ScaffoldJump has set Off, you can Sprint ScaffoldingJump. like shitgma(Jello? XD). */

function TSMM() {
  var i = r = z = 0;
  var CoolTime = 0;
  var CoolTimeB = false;
  var enventcanceler = false;
  //var ghostremoved = false;
  var SMN = SSW = SAi = false;
  var JumpCalnceler = false;
  var RESSNK = false
  //var hideScaffold; var hideTower;

  var TSMMMode = value.createList("TSMMMode", ["Original","LiquidBounce+"],"LiquidBounce+");
  var NAT = value.createBoolean("NoAutoTower", false); //wtf?
  var Color = value.createText("TSMMCustomColor", "a");
  var DCV = value.createBoolean("TSMMDebugChat", false);
  var BR = value.createBoolean("BodyReverser", false);
  var ScJMode = value.createList("ScaffoldJump", ["Off", "Sprint", "XZR", "VClip"], "Off");
  var SCJReset = value.createList("SCJSReset", ["Same","Ground","Air"], "Same");
  var PotionTower = value.createBoolean("PotionTower", false);
  var SCATower = value.createBoolean("UseScaffoldsLegitTower", false);
  var TowerDelayer = value.createBoolean("TowerDelayer", false);
  var TDDelay = value.createInteger("Delay", 15, 0, 100);
  var CT = value.createInteger("CoolTime", 10, 0, 20);
  var ForceSprint = value.createBoolean("ForceSprint", true);
  var JumpScaffolding = value.createBoolean("JumpScaffolding", true); //Beta
  var JSMode = value.createList("Type", ["SimplyJump", "JumpKey", "Motion", "TP"], "JumpKey");
  var JSV = value.createFloat("Value", 0.42, -1, 2);
  var AntiHalf = value.createBoolean("AntiHalf", false);
  var invBlock = value.createBoolean("InvBlockFixes", false); //experimentalishation
  var DownWards = value.createBoolean("2ndDownward", false); //experimentalishation
  var WithBlinkAPI = value.createBoolean("WithLB'sBlink", false);
  var RemoveGhost = value.createBoolean("RemoveYourGhost", false);
  var AutoSneak = value.createBoolean("AutoSneak", false);
  var MinDelay = value.createFloat("MinDelay", 5, 0, 30);
  var MaxDelay = value.createFloat("MaxDelay", 10, 0, 30);
  var RAutoSneak = value.createList("ReleaseKeyMode", ["Instant", "Delay"], "Delay");
  var RMinDelay = value.createFloat("ReleaseMinDelay", 0, 0, 3);
  var RMaxDelay = value.createFloat("ReleaseMaxDelay", 1, 0, 3);
  var MLGScaffold = value.createBoolean("MLGSCaffold", false);
  var MLGSprint = value.createBoolean("AfterSprint", true);
  var NoXZMotion = value.createList("NoXZMotion", ["Off", "MotionZero", "NoKeyBoard", "BothAlgorism", "ZeroXZEvent", "EventCanceler"], "Off");

  this.addValues = function(v) {
    v.add(TSMMMode);
    v.add(NAT);
    v.add(Color);
    v.add(DCV);
    v.add(BR);
    v.add(ScJMode);
    v.add(SCJReset)
    v.add(PotionTower);
    v.add(SCATower);
    v.add(TowerDelayer);
    v.add(TDDelay);
    v.add(CT);
    v.add(ForceSprint);
    v.add(JumpScaffolding);
    v.add(JSMode);
    v.add(JSV);
    v.add(AntiHalf);
    v.add(invBlock);
    v.add(DownWards);
    v.add(WithBlinkAPI);
    v.add(RemoveGhost);
    v.add(AutoSneak);
    v.add(MinDelay)
    v.add(MaxDelay)
    v.add(RAutoSneak);
    v.add(RMinDelay);
    v.add(RMaxDelay);
    v.add(MLGScaffold);
    v.add(MLGSprint);
    v.add(NoXZMotion);
  }
  this.getName = function() {
    return "TSMM";
  }
  this.getDescription = function() {
    return "ModuleManager's Module, Manages Tower & Scaffold. A SimpleScript, Better Than tOwERsCaFFoldZ.";
  }
  this.getCategory = function() {
    return "Player";
  }
  this.getTag = function() {
    return ScJMode.get();
  }
  this.onEnable = function() {
    //Array Remover
    //ScaffoldModule.array = TowerModule.array = false;
    //ScaffoldModule.array = TowerModule.array = TowerModule.state = !(ScaffoldModule.state = true); i want know that Mechanism.
    i = 0;
    r = 0;
    z = 0;
    CoolTime = 0;
    CoolTimeB = false;
    delay = DelayCal(MaxDelay.get(), MinDelay.get());
    RDelay = DelayCal(MaxDelay.get(), MinDelay.get())
    if (BR.get()) {
      mc.thePlayer.rotationYaw += 180
    }
    ScaffoldModule.setState(true);
    if(TSMMMode.get() == "Original") {
      TowerModule.setState(false);
    }
    if (JumpScaffolding.get()) {
      ScJMode.set("Off");
      if (!ScaffoldModule.getValue("SameY").get()) {ScaffoldModule.getValue("SameY").set(true)}
    }
    // //
    if (WithBlinkAPI.get()) {
      if(BlinkModule.getState()) {
        if (RemoveGhost.get()) {
          for (var x in mc.theWorld.loadedEntityList) {
            var entities = mc.theWorld.loadedEntityList[x]; //i think generate from Blink's Fakeplayer entityID is fixed for "-1337".
            if ((entities != mc.thePlayer) && (entities.getEntityId() == -1337)) {
              mc.theWorld.removeEntity(entities)
            }
          }
        }
      }
    };
    DC(DCV.get(), "TS", Color.get(), "§a+Enabled TSMM and Scaffold and Tower")
  };
  this.onUpdate = function() {
    switch (TSMMMode.get()) {
      case "Original":
        if (TowerDelayer.get()) {
              if(CoolTimeB) {
                CoolTime++
                if (CoolTime>=CT.get()) {
                  CoolTime = 0
                  CoolTimeB = false
                } else {
                  mc.gameSettings.keyBindJump.pressed = false;
                  DCV.get() && chat.print("you are now in CoolTime")
                }
              }
              if (TowerModule.getState() && z>=TDDelay.get()) {
                z = CoolTime = 0
                CoolTimeB = true;
                TowerModule.setState(false);
                DCV.get() && chat.print("test");
              } else {z++}
        }
        //if (!SCATower.get()) {
        //  if (!TowerModule.getState() && mc.thePlayer.onGround && mc.gameSettings.keyBindJump.pressed && !mc.gameSettings.keyBindForward.pressed) {
        //    if (PotionTower.get()) {
        //      if (!mc.thePlayer.isPotionActive(Potion.jump)) {
        //        ScaffoldModule.setState(false);
        //        TowerModule.setState(true);
        //        DC(DCV.get(), "TS", Color.get(), "Enabled Speed.")
        //      }
        //    } else if (!TowerModule.getState() && mc.thePlayer.onGround && mc.gameSettings.keyBindJump.pressed && !mc.gameSettings.keyBindForward.pressed) {
        //      ScaffoldModule.setState(false);
        //      TowerModule.setState(true);
        //      DC(DCV.get(), "TS", Color.get(), "Enabled Tower, Disabled Scaffold")
        //    };
        //  }
        //}
        //if press mc.gameSettings.keyBindJump.pressed = enable Tower, and Managing
        if (TowerModule.getState()) {
          switch (NoXZMotion.get()) {
            case "MotionZero":
              mc.thePlayer.motionX = mc.thePlayer.motionZ = 0;
              break;
            case "NoKeyBoard":
              mc.gameSettings.keyBindForward.pressed = mc.gameSettings.keyBindLeft.pressed = mc.gameSettings.keyBindRight.pressed = mc.gameSettings.keyBindBack.pressed = false;
              break;
            case "BothAlgorism":
              mc.gameSettings.keyBindForward.pressed = mc.gameSettings.keyBindLeft.pressed = mc.gameSettings.keyBindRight.pressed = mc.gameSettings.keyBindBack.pressed = false;
              mc.thePlayer.motionX = mc.thePlayer.motionZ = 0;
              break;
          }
        } else if(SCATower.get() && mc.thePlayer.onGround && mc.gameSettings.keyBindJump.pressed && !mc.gameSettings.keyBindForward.pressed) {
          if (PotionTower.get()) {
            if (!mc.thePlayer.isPotionActive(Potion.jump)) {
              ScaffoldModule.setState(false);
              TowerModule.setState(true);
              DC(DCV.get(), "TS", Color.get(), "Enabled Speed.")
            }
          } else if (!TowerModule.getState() && mc.thePlayer.onGround && mc.gameSettings.keyBindJump.pressed && !mc.gameSettings.keyBindForward.pressed) {
            ScaffoldModule.setState(false);
            TowerModule.setState(true);
            DC(DCV.get(), "TS", Color.get(), "Enabled Tower, Disabled Scaffold")
          };
        }
        //ForceSprint /Fix Can't sprinting Bug... or my setting? /* Fixed in LiquidBounce+!
        if (ForceSprint.get() && ScaffoldModule.getState()) {
          mc.thePlayer.setSprinting(true)
        }
        if (!ScaffoldModule.getState()) {
          if (!mc.gameSettings.keyBindJump.pressed) {
            ScaffoldModule.setState(true);
            TSMMMode.get("Original") && TowerModule.setState(false)
            DC(DCV.get(), "TS", Color.get(), "Enabled Scaffold, Disabled Tower")
          }
        } else {
          if (!TowerModule.getState()) {
            if (!mc.gameSettings.keyBindJump.pressed) {
              ScJMode.get("Sprint") && (ScaffoldModule.getValue("Sprint").set(true))
            } else if (mc.thePlayer.onGround) {
              switch (ScJMode.get()) {
                case "Sprint":
                  ScaffoldModule.getValue("Sprint").set(false);
                  break;
                case "XZR":
                  mc.thePlayer.motionX = mc.thePlayer.motionZ = 0;
                  break;
                case "VClip":
                  JumpCalnceler = true, mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY += 1, mc.thePlayer.posZ);
                  break;
              }
            }
          }
        }
        //MLGScaffold Code
        if (MLGScaffold.get()) {
          mc.gameSettings.keyBindSneak.pressed = true;
          ScaffoldModule.getValue("Sprint").set(false);
          SprintModule.setState(false);
          if (mc.thePlayer.onGround) {mc.gameSettings.keyBindJump.pressed = true};
          SprintModule.getState() && (SprintModule.setState(false))
        }
        break;
      case "LiquidBounce+":
        if(NAT.get()) {
          if(mc.gameSettings.keyBindJump.isKeyDown() && !MoveCheck("OnlyKey")) {
            mc.gameSettings.keyBindJump.pressed = false;//i finaly found this combo code! yay!!!
            ScaffoldModule.getValue("EnableTower").set(true)
          }else{
            ScaffoldModule.getValue("EnableTower").set(false)
          }
        }
        if(TowerDelayer.get()) {
          if(CoolTimeB) {
            CoolTime++
            if (CoolTime>=CT.get()) {
              CoolTime = 0
              CoolTimeB = false
            } else {
              mc.gameSettings.keyBindJump.pressed = false;
              DCV.get() && chat.print("you are now in CoolTime")
            }
          }
          if(ScaffoldModule.getValue("EnableTower").get()) {
            if(mc.gameSettings.keyBindJump.pressed && z>=TDDelay.get()) {
              z = CoolTime = 0
              CoolTimeB = true;
              mc.gameSettings.keyBindJump.pressed = false;
              DCV.get() && chat.print("test");
            }
          }
        }
        ForceSprint.get() && ForceSprint.set(false)
        if (!mc.gameSettings.keyBindJump.pressed) {
          ScJMode.get("Sprint") && (ScaffoldModule.getValue("SprintMode").set(SCJReset.get())) //fuck.
        } else if (mc.thePlayer.onGround) {
          switch (ScJMode.get()) {
            case "Sprint":
              ScaffoldModule.getValue("SprintMode").set("Off");
              break;
            case "XZR":
              mc.thePlayer.motionX = mc.thePlayer.motionZ = 0;
              break;
            case "VClip":
              JumpCalnceler = true, mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY += 1, mc.thePlayer.posZ);
              break;
          }
        }
        break;
    }
    //AntiSlab
    if (AntiHalf.get()) {
      if (mc.thePlayer.onGround && mc.theWorld.getBlockState(new BlockPos(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ)).getBlock() instanceof SlabBlock) {
        mc.gameSettings.keyBindJump.pressed = true;
      }
    };
    //DownWards
    if (DownWards.get()) {
      if (mc.gameSettings.keyBindSneak.isKeyDown()) {
        //mc.thePlayer.setSneaking(false)
        //Detectors of Scaffold Values
        (ScaffoldModule.getValue("Mode").get("Expand")) && (ScaffoldModule.getValue("Mode").set("Normal"), SMN = true)
        ScaffoldModule.getValue("SameY").get() && (ScaffoldModule.getValue("SameY").set(false), SSW = true)
        ScaffoldModule.getValue("AirSafe").get() && (ScaffoldModule.getValue("Air").set(false), SAi = true)
      } else {
        SMN && (ScaffoldModule.getValue("Mode").set("Expand"), SMN = false)
        SSW && (ScaffoldModule.getValue("SameY").set(true), ScaffoldModule.state = false, SSW = false)
        SAi && (ScaffoldModule.getValue("AirSafe").set(true), SAi = false)
      }
    }
    //Jump Scaffolding
    if (JumpScaffolding.get()) {
      if (ScaffoldModule.getState() && mc.thePlayer.onGround && !mc.thePlayer.isOnLadder() && !mc.thePlayer.isInWeb && !mc.thePlayer.isInWater() && !mc.thePlayer.isInLava() && !mc.gameSettings.keyBindSneak.pressed) {
        if (mc.gameSettings.keyBindForward.pressed || mc.gameSettings.keyBindRight.pressed || mc.gameSettings.keyBindLeft.pressed) {
          mc.gameSettings.keyBindJump.pressed = false;
          switch (JSMode.get()) {
            case "SimplyJump":
              mc.thePlayer.jump();
              break;
            case "JumpKey":
              mc.gameSettings.keyBindJump.pressed = true;
              break;
            case "Motion":
              mc.thePlayer.motionY = JSV.get();
              break;
            case "TP":
              mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY += JSV.get(), mc.thePlayer.posZ);//smh i was a coder of noob...
              JumpCalnceler = true;
              break;
          }
        }
      }
    }
  };
  this.onClickBlock = function(e) {
    if (invBlock.get()) {
      if (enventcanceler) {
        e.cancelEvent()
      }
    }
  }
  this.onMove = function(e) {
    if(TSMMMode.get() =="Original") {
      chat.print("Crap")
        if (TowerModule.getState()) {
          switch (NoXZMotion.get()) {
            case "ZeroXZEvent":
              e.zeroXZ();
              break;
            case "EventCanceler":
              if (e.getX() || e.getZ()) {
                e.cancelEvent();
              }
              break;
          }
        }
    }
    if (invBlock.get()) {
      if (mc.theWorld.getBlockState(new BlockPos(mc.thePlayer.posX, mc.thePlayer.posY - 1, mc.thePlayer.posZ)).getBlock() instanceof Furnace) {
        //chat.print("Detected you on Furnace or Workbench or Chest");
        mc.gameSettings.keyBindSneak.pressed = true; //mc.thePlayer.sneak is not working.. :(
        enventcanceler = true;
      } else { /*D("eventcanceler will be false to this moment.")*/ }
    }
    if (mc.gameSettings.keyBindForward.isKeyDown() || mc.gameSettings.keyBindLeft.isKeyDown() || mc.gameSettings.keyBindRight.isKeyDown() || mc.gameSettings.keyBindBack.isKeyDown()) {
      if (BR.get()) { //Reverse Forward to BackWard
        if (mc.gameSettings.keyBindForward.pressed) {
          mc.gameSettings.keyBindBack.pressed = true;
          mc.gameSettings.keyBindForward.pressed = false;
        }
      }
      //AutoSneaker
      if (AutoSneak.get()) {
        if(i>=delay && !RESSNK) {
          mc.gameSettings.keyBindSneak.pressed = true;
          RANDOMIZA&&(RESDelay=DelayCal(RMinDelay,RMaxDelay),RANDOMIZA=false)
          switch (RAutoSneak.get()) {
            case "Instant":
              mc.gameSettings.keyBindSneak.pressed = false,i=0
              break;
            case "Delay":
              RESSNKDEL++
              if(RESSNKDEL>=RESDelay) {RESSNK=RANDOMIZA=true,i=RESSNKDEL=0}
              break;
          }
        }else {i++}
      }
    }
  }
  this.onJump = function(e) {
    JumpCalnceler && (e.cancelEvent(), JumpCalnceler = false)
  }
  this.onDisable = function() {
    switch (TSMMMode.get()) {
      case "Original":
        ScaffoldModule.getState() && ScaffoldModule.setState(false)
        TowerModule.getState() && TowerModule.setState(false);
        if (MLGSprint.get()) {
          SprintModule.setState(true)
        } else {
          SprintModule.setState(false)
        }break;
      case "LiquidBounce+":
        ScaffoldModule.getState() && ScaffoldModule.setState(false);break;
    }
    //ScaffoldModule.array = hideScaffold; TowerModule.array = hideTower;
    DC(DCV.get(), "TS", Color.get(), "Disabled TSMM.")
    if (BR.get()) {
      mc.thePlayer.rotationYaw += 180
    } /*Fix Head Rotation. only this code...*/
    WithBlinkAPI.get() && BlinkModule.setState(false);
  }
}

/* v: 0.01, Auther: tk400, Desc: Allow Changing Hypixel Games*/

function HypixelGameChange() {

  var Hub = value.createBoolean("Hub", false);
  var favorite = value.createList("favorite", ["BedWars Solo", "BedWars Team", "SkyWars Solo Insane", ""], "");
  var BedWars = value.createList("BedWars", ["solo", "Team", "3v3", "4v4", ""], "");
  var SkyWars = value.createList("SkyWars", ["Solo Normal", "Solo Insane", "Team Normal", "Team Insane", ""], "");
  var murder = value.createList("Murder Mystery", ["Classic", "Double Up", "Assassins", "Infection", ""], "");
  var UHC = value.createList("UHC", ["solo", "teams", "event", "Speed Solo", "Speed Team", ""], "");
  var MegaWall = value.createList("MegaWalls", ["Standard", "Face Off", ""], "");
  var Custom = value.createBoolean("Custom", false);
  var CTex = value.createText("CustomCommand", "arcade_mini_walls");
  //Other Play Commands here https://hypixel.net/threads/guide-play-commands-useful-tools-mods-more-updated-11-17-19.1025608/
  this.addValues = function(v) {
    v.add(Hub);
    v.add(favorite);
    v.add(BedWars);
    v.add(SkyWars);
    v.add(murder);
    v.add(UHC);
    v.add(MegaWall);
    v.add(Custom);
    v.add(CTex);
  }

  this.getName = function() {
    return "HypixelGameChange";
  }
  this.getDescription = function() {
    return "Moved from Hypixel.js";
  }
  this.getCategory = function() {
    return "Player";
  }
  this.onUpdate = function() {
    fv = ["bedwars_eight_one", "bedwars_eight_two", "Solo_Insane"][
      ["BedWars Solo", "BedWars Team", "SkyWars Solo Insane"].indexOf(favorite.get())
    ];
    bw = ["bedwars_eight_one", "bedwars_eight_two", "bedwars_four_three", "bedwars_four_four"][
      ["Solo", "Team", "3v3", "4v4"].indexOf(BedWars.get())
    ];
    sw = ["Solo_Normal", "Solo_Insane", "Team_Normal", "Team_Insane"][
      ["Solo Normal", "Solo Insane", "Team Normal", "Team Insane"].indexOf(SkyWars.get())
    ];
    mm = ["murder_classic", "murder_double_up", "murder_assassins", "murder_infection"][
      ["Classic", "Double Up", "Assassins", "Infection"].indexOf(murder.get())
    ];
    uhccmd = ["uhc_solo", "uhc_teams", "uhc_events", "speed_solo_normal", "speed_team_normal"][
      ["solo", "teams", "event", "Speed Solo", "Speed Team"].indexOf(UHC.get())
    ];
    MegaW = ["mw_standard", "mw_face_off"][
      ["Standard", "Face Off"].indexOf(MegaWall.get())
    ];
    if (Hub.get()) {
      mc.thePlayer.sendChatMessage("/hub");
      Hub.set(false)
    }
    if (!favorite.get() == "") {
      mc.thePlayer.sendChatMessage("/play " + fv);
      favorite.getValue("Favorite").set("")
    }
    if (!BedWars.get() == "") {
      mc.thePlayer.sendChatMessage("/play " + bw);
      BedWars.getValue("BedWars").set("")
    }
    if (!SkyWars.get() == "") {
      mc.thePlayer.sendChatMessage("/play " + sw);
      SkyWars.getValue("SkyWars").set("")
    }
    if (!murder.get() == "") {
      mc.thePlayer.sendChatMessage("/play " + mm);
      murder.getValue("Murder Mystery").set("")
    }
    if (!UHC.get() == "") {
      mc.thePlayer.sendChatMessage("/play " + uhccmd);
      UHC.getValue("UHC").set("")
    }
    if (!MegaWall.get() == "") {
      mc.thePlayer.sendChatMessage("/play " + MegaW);
      MegaWall.getValue("MegaWalls").set("")
    }
    if (Custom.get()) {
      Custom.set(false);
      mc.thePlayer.sendChatMessage("/play " + CTex.get())
    } //... i forgot this '.GET()' smh...
  }
}


//Add Hypixel Bypasser later and AutoReplay? xd // i think it importing to AutoReport/AutoL Script.


function tk400sAdditonalModule() {
  var DelayTick = value.createInteger("DelayTicks", 1, 0, 30);
  var Timer = value.createFloat("Timer", 0.1, 0, 10);
  var TP = value.createFloat("TP", 0.05, 0, 1);
  var Motion = value.createFloat("Motion", 0.1, 0, 1);
  var Criticals = value.createList("Criticals", ["Off", "Jump", "SpeedModule", "TP", "Motion", "FastJump/Motion", "FastJump/TP", "FastJump/Timer"], "Off");
  var WithJump = value.createBoolean("WithJump", false);
  var ClimbSpeed = value.createList("ClimbSpeed", ["Off", "TP", "Motion", ""], "Off");
  var BlockAnimation = value.createList("BlockAnimation", ["RandomizedProgress", "SwingProgressAbort", "BlockBlock", "Off"], "Off");
  //var SWH = value.createBoolean("SingleWorldHack", false); //Just Modify
  var animation = value.createFloat("Animation", 0.75, 0, 1);
  var animation2 = value.createFloat("Animation2", 0.75, 0, 1);
  var AutoLeaver = value.createBoolean("AutoLeave", false);
  var ForceKick = value.createBoolean("ForceKick", false);
  var WhenHealth = value.createFloat("Health", 5, 0, 19);
  var ALMode = value.createList("ALMode", ["Custom", "Lobby"], "Custom");
  var ReJoinServer = value.createList("ALServer", ["Hypixel", "Cubecraft", "?"], "");
  var LMethod = value.createList("LeaveMethod", ["Command", "ConsoleSpammer/Payload", "ConsoleSpammer/MineSecure", "RandomizedPos", "ExtremeRandomizedPos", "UltraRandomizedPos", "RandomizedPacketPos", "ExtremeRandomizedPacketPos", "RandomizedMotion", "CommandSpamKick", "KickModuleAPI"], "Command");
  //var AntiTypo = value.createBoolean("AntiTypo", true);
  var TimeFix = value.createBoolean("TimerFixer", false);
  var AntiDamage = value.createBoolean("AntiDamage", false);

  this.addValues = function(v) {
    v.add(DelayTick);
    v.add(Timer);
    v.add(TP);
    v.add(Motion);
    v.add(Criticals);
    v.add(WithJump);
    v.add(ClimbSpeed);
    v.add(BlockAnimation);
    //v.add(SWH);
    v.add(animation);
    v.add(animation2);
    v.add(AutoLeaver);
    v.add(ForceKick);
    v.add(WhenHealth);
    v.add(ALMode);
    v.add(ReJoinServer);
    v.add(LMethod)
      //v.add(AntiTypo);
    v.add(TimeFix);
    v.add(AntiDamage)
  }

  this.getName = function() {
    return "tk400sAdditonalModule";
  }
  this.getDescription = function() {
    return "Moved from MM.";
  }
  this.getCategory = function() {
    return "Player";
  }
  this.onUpdate = function() {
    //moment Restener
    if (Criticals.get() == "FastJump/Timer") {
      if (ResetTimer) {
        if (mc.thePlayer.fallDistance || mc.thePlayer.onGround) {
          {
            mc.timer.timerSpeed = 1;
            ResetTimer = false;
            chat.print("Timer has reset")
          }
        }
      }
    }
    if (mc.thePlayer.isOnLadder()) {
      switch (ClimbSpeed.get()) {
        case "TP":
          mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + TP.get(), mc.thePlayer.posZ);
          break;
        case "Motion":
          mc.thePlayer.motionY + Motion.get();
          break;
      }
    }
    //if(SWH.get()) {
    //}
    if (AutoLeaver.get()) {
      if ((mc.thePlayer.getHealth() <= WhenHealth.get()) || (ForceKick.get())) {
        ForceKick.set(false); //Optionaly you can set to true, false. or Remove this line
        switch (LMethod.get()) {
          case "Command":
            switch (ALMode.get()) {
              case "ReJoin"://For Hypixel
                mc.thePlayer.sendChatMessage("/rejoin")
                break;
              case "Hub":
                mc.thePlayer.sendChatMessage("/Hub")
                break;
              case "Custom":
                mc.thePlayer.sendChatMessage(Custom.get())
            }
            break;
          case "ConsoleSpammer/Payload":
            ConSpamModule.getValue("Mode").set("Payload");
            ConSpamModule.getValue("Delay").set(0);
            ConSpamModule.setState(true);
            break;
          case "ConsoleSpammer/MineSecure":
            ConSpamModule.getValue("Mode").set("MineSecure");
            ConSpamModule.getValue("Delay").set(0);
            ConSpamModule.setState(true);
            break;
          case "RandomizedPos":
            mc.thePlayer.posX = DelayCal(-255, 255);
            mc.thePlayer.posY = DelayCal(-255, 255);
            mc.thePlayer.posZ = DelayCal(-255, 255);
            break;
          case "ExtremeRandomizedPos": //Never Recommanded. i think allow you to crash your computer?
            mc.thePlayer.posX = DelayCal(-30000000, 30000000)
            mc.thePlayer.posY = DelayCal(-30000000, 30000000)
            mc.thePlayer.posZ = DelayCal(-30000000, 30000000)
            break;
          case "UltraRandomizedPos":
            mc.thePlayer.posX = DelayCal(Number.MIN_VALUE, Number.MAX_VALUE)
            mc.thePlayer.posY = DelayCal(Number.MIN_VALUE, Number.MAX_VALUE)
            mc.thePlayer.posZ = DelayCal(Number.MIN_VALUE, Number.MAX_VALUE)
          case "RandomizedPacketPos": //a.k.a OldAAC Crasher. (you can check at Original LiqBounce Repo.)
            mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX += DelayCal(-255, 255), mc.thePlayer.posY += DelayCal(-255, 255), mc.thePlayer.posZ += DelayCal(-255, 255), RandomPool()));
            break;
          case "ExtremeRandomizedPacketPos":
            mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX = DelayCal(-30000000, 30000000), mc.thePlayer.posY = DelayCal(-30000000, 30000000), mc.thePlayer.posZ = DelayCal(-30000000, 30000000), RandomPool()));
            break;
          case "ExtremeRandomizedPacketPos":
            mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX = DelayCal(Number.MIN_VALUE, Number.MAX_VALUE), mc.thePlayer.posY = DelayCal(Number.MIN_VALUE, Number.MAX_VALUE), mc.thePlayer.posZ = DelayCal(Number.MIN_VALUE, Number.MAX_VALUE), RandomPool()));
            break;
          case "RandomizedMotion":
            mc.thePlayer.motionX = DelayCal(-255, 255);
            mc.thePlayer.motionY = DelayCal(-255, 255);
            mc.thePlayer.motionZ = DelayCal(-255, 255);
            break;
          case "CommandSpamKick":
            mc.thePlayer.sendChatMessage("/" + randomString(Math.floor(Math.random() * ((50 - 2) + 1) + 1)))
            break;
          case "KickModuleAPI":
            KickModule.setState(true);
            break;
        }
      }
    }
    if (TimeFix.get()) {
      if (mc.timer.timerSpeed <= 0.001 && !fixed) {
        mc.timer.timerSpeed = 1, chat.print("Game was Freezed or Slowely. now fixing...")
        fixed = true;
      } else {
        fixed = false;
        chat.print("a")
      }
    }
  }
  this.onMotion = function() {
    switch (BlockAnimation.get()) {
      case "RandomizedProgress":
        LiquidBounce.getModule(KillAura).blockingStatus && (mc.thePlayer.swingProgress = Math.random());
        break;
      case "SwingProgressAbort":
        //if(mc.currentScreen instanceof GuiInventory || mc.currentScreen instanceof GuiChest) {}else{
        //Fix? canceling Opening Inv.
        LiquidBounce.getModule(KillAura).blockingStatus && (mc.thePlayer.swingProgress = animation.get());
        break;
    }
  }
  this.onAttack = function() {
    if (mc.thePlayer.onGround && !mc.gameSettings.keyBindSneak.pressed && mc.thePlayer.ticksExisted % DelayTick.get() == 0 && !mc.thePlayer.isOnLadder() && !mc.thePlayer.isInWeb && !mc.thePlayer.isInWater() && !mc.thePlayer.isInLava()) {
      switch (Criticals.get()) {
        case "Jump":
          SpeedModule.setState(false);
          mc.thePlayer.jump();
          break;
        case "SpeedModule":
          if (mc.gameSettings.keyBindForward.pressed || mc.gameSettings.keyBindRight.pressed || mc.gameSettings.keyBindLeft.pressed) {
            if (!mc.gameSettings.keyBindBack.pressed && KAModule.getState() && !SpeedModule.getState() && !LJModule.getState() && !ScaffoldModule.getState() && !TowerModule.getState()) {
              SpeedModule.setState(true);
              DC(DCV.get(), "AD", Color.get(), "Enabled Speed.")
            }
          } else {
            WithJump.get() && mc.thePlayer.jump();
          };
          break;
        case "TP":
          mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY += TP.get(), mc.thePlayer.posZ);
          break;
        case "Motion":
          mc.thePlayer.motionY = Motion.get();
          break;
        case "FastJump/Motion":
          mc.thePlayer.jump();
          if (!mc.thePlayer.fallDistance) {
            mc.thePlayer.motionY += Motion.get()
          };
          break;
        case "FastJump/TP":
          mc.thePlayer.jump();
          if (!mc.thePlayer.fallDistance) {
            mc.thePlayer.posY += TP.get()
          };
          break;
      }
    };
    if (Criticals.get() == "FastJump/Timer") {
      if (!mc.gameSettings.keyBindSneak.pressed && mc.thePlayer.ticksExisted % DelayTick.get() == 0 && !mc.thePlayer.isOnLadder() && !mc.thePlayer.isInWeb && !mc.thePlayer.isInWater() && !mc.thePlayer.isInLava()) {
        mc.thePlayer.onGround && mc.thePlayer.jump();
        if (!mc.thePlayer.fallDistance && !mc.thePlayer.onGround) {
          mc.timer.timerSpeed = Timer.get();
          ResetTimer = true;
          chat.print("DEBUG|TIMERED")
        };
      }
    }
  }

  this.onDisable = function() {}
}
/*function FightBot() {//dead projekt
  var test = value.createFloat("test", 1.5, 0, 30);
 
  this.addValues = function(v) {
    v.add(test)
  }
  this.getName = function() {
    return "FightBot"
  }
  this.getDescription = function() {
    return "A Module from ReverseEngineered WURST's FightBot."
  }
  this.getCategory = function() {
    return "Combat"
  }

  this.onEnable = function() {
    chat.print("ude ga naru ZE~")
  }
  this.onUpdate = function() {}
  this.onAttack = function(e) {}
  this.onMove = function(e) {}
  this.onStrafe = function(e) {}
  this.onPacket = function(e) {}
  this.onDisable = function() {
    chat.print(null)
  }
}*/


//var FightBot = moduleManager.registerModule(new FightBot);
//
//FightBot;
//
//moduleManager.unregisterModule(FightBot);


var ModuleManager = moduleManager.registerModule(new ModuleManager)
var TSMM = moduleManager.registerModule(new TSMM);
var HypixelGameChange = moduleManager.registerModule(new HypixelGameChange);
var tk400sAdditonalModule = moduleManager.registerModule(new tk400sAdditonalModule)
var ABAssis = moduleManager.registerModule(new ABAssis);
var ModuleRandomizer = moduleManager.registerModule(new ModuleRandomizer)

function onEnable() {
  ModuleManager;
  TSMM;
  HypixelGameChange;
  tk400sAdditonalModule;
  ModuleRandomizer;
  ABAssis;
};

function onDisable() {
  moduleManager.unregisterModule(ModuleManager);
  moduleManager.unregisterModule(TSMM);
  moduleManager.unregisterModule(HypixelGameChange);
  moduleManager.unregisterModule(tk400sAdditonalModule);
  moduleManager.unregisterModule(ModuleRandomizer);
  moduleManager.unregisterModule(ABAssis);
};

/**
 * thank you for
 * ->CzechHek
 * BlockAnimation, BlockSelector Script, Core.lib. and TowerScaffoldz's Idea ;)
 * 
 * ->Scorpion
 * Scriptolotl Script.
 * 
 * ->soulplexis
 * i think used his Script. but i forgot.. sorry.
 * 
 * ->Senk Ju
 * FileSpammer Script.
 * 
 * ->AutoL Script
 * 
 * ->and some people
 */

/* function utils */
function GroundChecker(target, abst) { //i think you can use like if(GC()) {chat.print(you are on the ground.)}
  if (target == undefined) { //check when player is on the ground.
    if (abst == undefined) {
      if (mc.thePlayer.onGround) {
        return true;
      } else {
        return false;
      }
    } else {
      if (mc.thePlayer.onGround && !mc.thePlayer.isOnLadder() && !mc.thePlayer.isInWeb && !mc.thePlayer.isInWater() && !mc.thePlayer.isInLava()) {
        return true;
      } else {
        return false;
      }
    }
  } else /* if(target != [undefined, null, "Player", ""])*/ {
    if (abst == undefined) {
      if (target.onGround) {
        return true;
      } else {
        return false;
      }
    } else {
      if (target.onGround && !target.isOnLadder() && !target.isInWeb && !target.isInWater() && !target.isInLava()) {
        return true;
      } else {
        return false;
      }
    }
  }
}


function getMoveYaw() {
  var moveYaw = mc.thePlayer.rotationYaw
  if (mc.thePlayer.moveForward != 0 && mc.thePlayer.moveStrafing == 0) {
    if(mc.thePlayer.moveForward > 0) {moveYaw += 0} else {moveYaw += 180}
  } else if (mc.thePlayer.moveForward != 0 && mc.thePlayer.moveStrafing != 0) {
      if (mc.thePlayer.moveForward > 0) {
        if (mc.thePlayer.moveStrafing > 0) {moveYaw += -45} else {moveYaw += 45}
      } else {
        if (mc.thePlayer.moveStrafing > 0) {moveYaw -= -45} else {moveYaw -= 45}
      }
    if(mc.thePlayer.moveForward > 0) {moveYaw += 0} else {moveYaw += 180}
  } else if (mc.thePlayer.moveStrafing != 0 && mc.thePlayer.moveForward == 0) {
      if(mc.thePlayer.moveStrafing > 0) {moveYaw += -90} else {moveYaw += 90}
  }
return moveYaw
}

function MoveCheck(cl) { //only check XZ. not Jump Falling, etc..
  if (cl == null || cl == "Zero" || cl == 0) {
    if (mc.thePlayer.motionX != 0 || mc.thePlayer.motionZ != 0) {
      return true; //[D☆] Player has Moving.
    } else {
      return false;
    }
  } else if (cl != null || cl == "Zero" || cl != 0) {
    if ((mc.thePlayer.motionX < cl || mc.thePlayer.motionX > cl) || (mc.thePlayer.motionZ < cl || mc.thePlayer.motionZ > cl)) {
      return true; //[D☆] Player has Moving.
    }
  } else if(cl =="OnlyKey" || cl =="OK") {
    if(mc.gameSettings.keyBindForward || mc.gameSettings.keyBindBack || mc.gameSettings.keyBindLeft || mc,gameSettings.keyBindRight) {
      return true;
    }else{
      return false;
    }
  }
}

function wtisit() {
  var availableColors = ["§4", "§c", "§6", "§e", "§2", "§a", "§b", "§3", "§1", "§9", "§d", "§5"];
  var color = rt(availableColors)
  
  var d = new Date();
  a = ("§7["+d.getHours().slice(-2)+":"+d.getMinutes().slice(-2)+":"+d.getSeconds().slice(-2)+":"+color+DelayCal(1, 9)+"§r]");
  return a
}

function D(Desc) {
  chat.print(Desc)
}

function DC(isEnabled, Module, Color, Reason) {
  var Mo = '';
  var C = "§0";
  if (isEnabled) {
    switch (Module) {
      case "TS":
        Mo = "§5[§dTSMM§5] ";
        break;
      case "MM":
        Mo = "§5[§dMM§5] ";
        break;
      case "AD":
        Mo = "§k[§cAddedMod§r§k]§2|";
        break;
    }
    C = "§" + Color;
    Message = Mo + C + Reason;
    chat.print(wtisit() + Message);
  }
}

function AimBotFunc(tX, tZ) {
  strafeYaw = Math.atan2(tZ - mc.thePlayer.posZ, tX- mc.thePlayer.posX);
  mc.thePlayer.rotationYaw = strafeYaw - (0.5 * Math.PI);
  //mc.thePlayer.rotationYaw = (Math.atan2(mc.thePlayer.posX - tX,mc.thePlayer.posZ- tZ) / Math.PI * 180 +180) * -1
}
function AimBotCalc(tX, tZ) {
  return (Math.atan2(tZ - mc.thePlayer.posZ, tX - mc.thePlayer.posX) - (0.5 * Math.PI))/ Math.PI * 180;
}
function pitagora(x,z){
  return Math.sqrt(Math.pow(x,2)+Math.pow(z,2))
}

function _2DRoundCheck(pX,pZ,Range) {
  if(Math.sqrt(Math.pow(mc.thePlayer.posX - pX, 2) + Math.pow(mc.thePlayer.posZ - pZ, 2)) <= Range) {
    return true
  }
}

function _3DRoundCheck(pX,pY,pZ,Range) {
  if(Math.sqrt(Math.pow(mc.thePlayer.posX - pX, 2) +Math.pow(mc.thePlayer.posY - pY,2) + Math.pow(mc.thePlayer.posZ - pZ, 2)) <= Range) {
    return true
  }
}

function DelayCal(MaxDelay, MinDelay) {
  delayed = Math.floor(Math.random() * ((MaxDelay - MinDelay) + 1) + MinDelay);
  return delayed;
}

function RandomPool() {
  if(Math.round(Math.random()) >1) {
     return true
  }else{
     return false
  }
}

function rt(t) { //Shorten it longer randomizer code.
  var text = t[parseInt(Math.random() * t.length)]
  return text;
}

function playSound(name, a, b) {
  mc.theWorld.playSound(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, name, a, b, false);
}

function Config(Mode, server) {
  if (Mode == "Save") {
    commandManager.executeCommand(".localautosettings save " + server + " all")
    chat.print("§4Debug[SaveConfig]§f: Saved for §l" + server)
  } else if (Mode == "Load") {
    commandManager.executeCommand(".localautosettings load " + server)
    chat.print("§4Debug[LoadConfig]§f: Loaded for §l" + server)
  }
}

function randomString(length, adoptchara) {
  var text = "";
  if (adoptchara == null) {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  } else {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".concat(adoptchara);
  }

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

/* Rejected fucking code. */

function reset() {
  currentTrans = 0;
  KeepAlives.clear();
  Transactions.clear();
}

function kick(mode) {
  if (mode == null) {
    commandManager.executeCommand(".kick")
  } else {
    switch (mode) {
      case "toHub":
        mc.thePlayer.sendChatMessage("/hub")
        break;
    }
  }
}

function vClip(offset) {
  mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + offset, mc.thePlayer.posZ);
}

function hclip(offset) {
  sin = Math.sin(mc.thePlayer.rotationYaw / 180 * Math.PI) * offset
  cos = Math.cos(mc.thePlayer.rotationYaw / 180 * Math.PI) * offset
  mc.thePlayer.setPosition(mc.thePlayer.posX -= sin, mc.thePlayer.posY, mc.thePlayer.posZ += cos);
}

function HMotion(offset) {
  sin = Math.sin(mc.thePlayer.rotationYaw / 180 * Math.PI) * offset
  cos = Math.cos(mc.thePlayer.rotationYaw / 180 * Math.PI) * offset
  mc.thePlayer.motionX -= sin;
  mc.thePlayer.motionZ += cos;
}

function VMotion(offset) {
  mc.thePlayer.motionY += offset;
}

/*function Sleep (delay) {
  i+=1;
  if(delay==i) {passed = true}else{passed=false}
  return passed;
}
function RSleep (max, min) {
  var d = new Date();
  var H = ('0' + d.getHours()).slice(-2);
  var m = ('0' + d.getMinutes()).slice(-2);
  var s = ('0' + d.getSeconds()).slice(-2);
 
  var passed =false, i=0;
  i+=1;
  if(delay ==i) {passed = true; i=0;delay = Math.floor(Math.random() * ((max-min)+1) + min);}else{passed=false}
  return passed;
}*/