// 感谢大家喜欢
var scriptName = "Chinese input";
var scriptVersion = 1.0;
var scriptAuthor = "yby360";

var JOptionPane = Java.type("javax.swing.JOptionPane");

function idk(){
	
this.getName = function () {
        return "Chinese input";
    }

    this.getDescription = function () {
        return "by yby360";
    }

    this.getCategory = function () {
        return "Fun";
    }
	
	this.onEnable = function() {	
		var sb = JOptionPane.showInputDialog(null, "请输入你想说的话!", "中文输入", JOptionPane.PLAIN_MESSAGE);
		commandManager.executeCommand(".say "+sb);
	}

	this.onUpdate = function() {
		var autoDisableModule = moduleManager.getModule("idk");
        autoDisableModule.setState(false);
	}
	
	this.onDisable = function() {
	}
}

var idk = new idk();
var idk;

function onLoad() {}

function onEnable() {
	idkclient = moduleManager.registerModule(idk);
}

function onDisable() {
	moduleManager.unregisterModule(idk);
}

