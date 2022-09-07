var scriptName = "Title"
var scriptVersion = 1.0
var scriptAuthor = "yby360"

var Title = new Title()
var client

function Title() {
	var S = 0
	var HM = 0
	var M =0
	var H = 0
	
	this.getName = function() {
        return "Title"
    }

    this.getDescription = function() {
        return "HirohikoClient"
    }

    this.getCategory = function() {
        return "Scripts"
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
		Display.setTitle('丨HirohikoClient | Developer Build Mode丨Time Has Passed:   ' +  H  +'  时  '  +M +'  分  '+S+'  秒  ')
	}
}

var Display = Java.type('org.lwjgl.opengl.Display')

function onLoad() {}

function onEnable() {
    client = moduleManager.registerModule(Title)
}

function onDisable() {
    moduleManager.unregisterModule(client)
}