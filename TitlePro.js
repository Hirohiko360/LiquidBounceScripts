var scriptName = "TitlePro"
var scriptVersion = 2.1
var scriptAuthor = "yby360"

var Title = new Title()
var client

var System = Java.type('java.lang.System');
var Display = Java.type('org.lwjgl.opengl.Display')
var JOptionPane = Java.type("javax.swing.JOptionPane");

function getDateAndTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    return year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day + ' ' + hours + ':' + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

function getSystemProperties() {
    var properties = System.getProperties();
    var keys = properties.keySet().toArray();
    var result = '';
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = properties.getProperty(key);
        result += key + ': ' + value + '\n';
    }
    return result;
}

function Title() {
	var S = 0
	var HM = 0
	var M =0
	var H = 0
	
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
		 };
	
	this.getName = function() {
        return "TitlePro"
    }

    this.getDescription = function() {
        return "TitlePro"
    }

    this.getCategory = function() {
        return "Misc"
    }

    this.onUpdate = function() {
		 HM += 1
		 if (HM ==20){
		   S = S + 1
		   HM = 0
		   
		  }
		 if (S ==60){
		   M = M +1
		   S = 0
		  }
		  if (M==60){
		   H = H+1
		   M = 0
		  }
	Display.setTitle('丨LiquidBounce | ' + 'Time Has Passed:   ' +  H  +'  时  '  +M +'  分  '+S+'  秒  ' + '['  +  getDateAndTime()  + '] ' + getSystemProperties())
	}
	
	this.addValues = function (values) {
		for (var i in settings) {
		    values.add(settings[i]);
			}
		}
	}

function onLoad() {}

function onEnable() {
    client = moduleManager.registerModule(Title)
}

function onDisable() {
    moduleManager.unregisterModule(client)
}