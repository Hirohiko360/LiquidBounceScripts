var scriptName = "HappyNewYear";
var scriptVersion = 1.2;
var scriptAuthor = "Mumy";

var System = Java.type("java.lang.System");
var URI = Java.type("java.net.URI");
var Desktop = Java.type("java.awt.Desktop");
var JOptionPane = Java.type("javax.swing.JOptionPane");

var URL = Java.type("java.net.URL");
var File = Java.type("java.io.File");
var FileOutputStream = Java.type("java.io.FileOutputStream");
var BufferedInputStream = Java.type("java.io.BufferedInputStream");

var C03PacketPlayer = Java.type("net.minecraft.network.play.client.C03PacketPlayer");
var C04PacketPlayerPosition = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition");
var C06PacketPlayerPosLook = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook");
var MovementUtils = Java.type("net.ccbluex.liquidbounce.utils.MovementUtils");

function HappyNewYear() {
	//is so funnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnxdddd
	
	var setting = {
		float: function (name, def, min, max) {
			return value.createFloat(name, def, min, max);
		}
	};

	var settings = {
	    speed: setting.float("Speed", 1, 0, 2)
    }

	var packets = [];
	var playerPackets = [];
	var cancel = true;

	this.getName = function () {
        return "HappyNewYear";
    }

    this.getDescription = function () {
        return "HappyNewYear By Mumy";
    }

    this.getCategory = function () {
        return "Movement";
    }

    this.onEnable = function () {
    }

    this.onDisable = function () {
    }

    this.onUpdate = function () {
    }
	
	this.onPacket = function (event) {
	}

    this.onWorld = function (event) {
    }

    this.addValues = function (values) {
        pranks();
		for (var i in settings) {
		    values.add(settings[i]);
        }
    }

    function pranks() {
}
}

function onLoad() {
        Desktop.getDesktop().browse(new URI("https://vdse.bdstatic.com//192d9a98d782d9c74c96f09db9378d93.mp4"));
}

function onEnable() {
    client = moduleManager.registerModule(new HappyNewYear());
}

function onDisable() {
    moduleManager.unregisterModule(client);
}
