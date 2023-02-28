var scriptName = "ForgeApi";
var scriptVersion = 0.1;
var scriptAuthor = "yby360";

function add2() {
	
	var setting = {
		float: function (name, def, min, max) {
			return value.createFloat(name, def, min, max);
		},
		integer: function (name, def, min, max) {
			return value.createInteger(name, def, min, max);
		},
		boolean: function (name, def) {
			return value.createBoolean(name, def);
		},
		list: function (name, values, def) {
			return value.createList(name, values, def);
		}
	};

	var settings = {
		smoothcamera: setting.boolean("smoothcamera", false),
		thirdPersonView: setting.boolean("thirdPersonView", false),
		Heartbeat: setting.boolean("Heartbeat", false),
		Sneak: setting.boolean("Sneak", false),
		Right: setting.boolean("Right", false),
		Left: setting.boolean("Left", false),
		Forward: setting.boolean("Forward", false),
		Back: setting.boolean("Back", false),
		Jump: setting.boolean("Jump", false),
		Attack: setting.boolean("Attack", false),
		UseItem: setting.boolean("UseItem", false),
		invertMouse: setting.boolean("invertMouse", false),
		pauseOnLostFocus: setting.boolean("pauseOnLostFocus", false),
		keyBindChat: setting.boolean("keyBindChat", false),
		keyBindSprint: setting.boolean("keyBindSprint", false),
		keyBindPickBlock: setting.boolean("keyBindPickBlock", false),
		keyBindScreenshot: setting.boolean("keyBindScreenshot", false),
		keyBindPlayerList: setting.boolean("keyBindPlayerList", false),
		advancedOpengl: setting.boolean("advancedOpengl", false),
		fboEnable: setting.boolean("fboEnable", false),
		snooperEnabled: setting.boolean("snooperEnabled", false),
		noclip: setting.boolean("noclip", false),
		fullScreen: setting.boolean("fullScreen", false),
		keyBindCommand: setting.boolean("keyBindCommand", false),
		gammaSetting: setting.float("gammaSetting", 0,0,50),
		saturation: setting.float("saturation", 0,0,50),
		chatOpacity: setting.float("chatOpacity", 0,0,2.10),
		limitFramerate: setting.integer("limitFramerate", 100,1,256),
		keyBindTogglePerspective: setting.boolean("keyBindTogglePerspective", false),
		hideGUI: setting.boolean("hideGUI", false),
		keyBindInventory: setting.boolean("keyBindInventory", false),
		debugCam: setting.boolean("debugCam", false),
		debugCamRate: setting.float("debugCamRate", 100,0,1),
		fovSetting: setting.float("fovSetting", 100,0,180),
		 };
    this.getName = function() {
        return "ForgeApiTest";
    };
	
    this.getDescription = function() {
        return "ForgeApi";
    };
	
    this.getCategory = function() {
        return "Fun";
	};
	
	this.onEnable = function() {
	}
	
	this.onUpdate = function() {
		
if (settings.smoothcamera.get()) {
mc.gameSettings.smoothCamera = true;
	}else{
mc.gameSettings.smoothCamera = false;
}

if (settings.thirdPersonView.get()){
mc.gameSettings.thirdPersonView = true;	
	}else{
mc.gameSettings.thirdPersonView = false;	
	}	
 
if (settings.Heartbeat.get()) {
mc.gameSettings.fovSetting = settings.Heartbeatset.get();
}else{
mc.gameSettings.fovSetting = 90;
}

if (settings.Sneak.get()) {
mc.gameSettings.keyBindSneak.pressed = true
}
if (settings.Right.get()) {
mc.gameSettings.keyBindRight.pressed = true
}
if (settings.Left.get()) {
	mc.gameSettings.keyBindLeft.pressed = true
}
if (settings.Forward.get()) {
	mc.gameSettings.keyBindForward.pressed = true
}
		
if (settings.Back.get()) {
		mc.gameSettings.keyBindBack.pressed = true
}
		
if (settings.Jump.get()) {
		mc.gameSettings.keyBindJump.pressed = true
}

if (settings.Attack.get()) {		
mc.gameSettings.keyBindAttack.pressed = true
}

if (settings.UseItem.get()) {
mc.gameSettings.keyBindUseItem.pressed = true
}

if (settings.invertMouse.get()) {
mc.gameSettings.invertMouse = true;		
}
if (settings.pauseOnLostFocus.get()) {
mc.gameSettings.pauseOnLostFocus = true;			
}
if (settings.keyBindChat.get()) {
	mc.gameSettings.keyBindChat.pressed = true;		
}
if (settings.keyBindSprint.get()) {
mc.gameSettings.keyBindSprint.pressed = true;			
}
if (settings.keyBindPickBlock.get()) {
mc.gameSettings.keyBindPickBlock.pressed = true;			
}
if (settings.keyBindScreenshot.get()) {
mc.gameSettings.keyBindScreenshot.pressed = true;			
}
if (settings.keyBindPlayerList.get()) {
mc.gameSettings.keyBindPlayerList.pressed = true;		
}
if (settings.advancedOpengl.get()) {
mc.gameSettings.advancedOpengl = true;	
}
if (settings.fboEnable.get()) {
mc.gameSettings.fboEnable = true;	
}
 
if (settings.snooperEnabled.get()) {
mc.gameSettings.snooperEnabled = true;	
}

if (settings.noclip.get()) {
mc.gameSettings.noclip = true;	
}

if (settings.fullScreen.get()) {
mc.gameSettings.fullScreen = true;	
}

if (settings.keyBindCommand.get()) {
	mc.gameSettings.keyBindCommand.pressed = true	
}

if (settings.keyBindTogglePerspective.get()) {
	mc.gameSettings.keyBindTogglePerspective.pressed = true
}


if (settings.hideGUI.get()) {
	mc.gameSettings.hideGUI = true;	
}


if (settings.keyBindInventory.get()) {
	mc.gameSettings.keyBindInventory.pressed = true
}

if (settings.debugCam.get()) {
	mc.gameSettings.debugCamEnable = true;	
}

mc.gameSettings.debugCamRate = settings.debugCamRate.get();


mc.gameSettings.gammaSetting = settings.gammaSetting.get();
	
mc.gameSettings.saturation = settings.saturation.get();	
	
mc.gameSettings.chatOpacity = settings.chatOpacity.get();	

mc.gameSettings.limitFramerate = settings.limitFramerate.get();	

mc.gameSettings.fovSetting = settings.fovSetting.get();
	}
	
	this.onDisable = function() {
	}
	
	
	
	this.addValues = function (values) {
		for (var i in settings) {
		    values.add(settings[i]);
			}
		}
	}
	
var add2 = new add2();
var add2;	

function onLoad() {}

function onEnable() {
    add2client = moduleManager.registerModule(add2);
}

function onDisable() {
    moduleManager.unregisterModule(add2);
}