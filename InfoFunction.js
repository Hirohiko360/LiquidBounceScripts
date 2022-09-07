var script = registerScript({
    name: "InfoFunction",
    version: "2.0",
    authors: ["NicerAver"],
});

var Fonts = Java.type("net.ccbluex.liquidbounce.ui.font.Fonts");
var Color = Java.type("java.awt.Color");
var ScaledResolution = Java.type("net.minecraft.client.gui.ScaledResolution");
var GL11 = Java.type("org.lwjgl.opengl.GL11");
var Gui = Java.type("net.minecraft.client.gui.Gui");
var InfoFunction = new InfoFunction();
var Client;
var speed = moduleManager.getModule("Speed");
var kaura = moduleManager.getModule("KillAura");
var cs = moduleManager.getModule("ChestStealer");
var cl = moduleManager.getModule("InventoryCleaner");

function InfoFunction(){
	var txmode = value.createList("TextColor",["White","Red","Green","Blue","Purple","Yellow"],"White")
	var flymode = value.createList("FlyMode",["Fly","TPFly"],"Fly")
	var psx = value.createInteger("PosX",0,-400,400);
	var psy = value.createInteger("PosY",0,-400,400);
	var spd; var spdcolor; var kau; var kacolor; var cst; var cscolor;
	var clr; var clrcolor; var flr; var flcolor; var fl; var textcolor;

	this.getName = function() {
		return "Info";
	};
	
	this.getDescription = function() {
		return "Love";
	};
	
	this.getCategory = function() {
	    return "Misc";
	};
	
	this.addValues = function(values){
		values.add(txmode);
		values.add(flymode);
		values.add(psx);
		values.add(psy);
	};
	
	this.onEnable = function() {
				switch(flymode.get()){
			case "Fly":
			fl = moduleManager.getModule("Fly");
			break;
			case "TPFly":
			fl = moduleManager.getModule("TPFly");
			break;
		}
		switch(txmode.get()) {
			case "White":
			textcolor = new Color(233,233,233).getRGB();
			break
			case "Red":
			textcolor = new Color(222,11,11).getRGB();
			break;
			case "Green":
			textcolor = new Color(11,222,11).getRGB();
			break;
			case "Blue":
			textcolor = new Color(11,11,222).getRGB();
			break;
			case "Purple":
			textcolor = new Color(222,11,222).getRGB();
			break;
			case "Yellow":
			textcolor = new Color(222,222,11).getRGB();
			break
		}
	};
	
	this.onUpdate = function(){
	if(speed.getState()){
			spd = "Enabled";
			spdcolor = new Color(29,200,29).getRGB();
		} else {
			spd = "Disabled";
			spdcolor = new Color(200,29,29).getRGB();
		}
	if(kaura.getState()){
		kau = "Enabled";
		kacolor = new Color(29,200,29).getRGB();
	} else {
		kau = "Disabled";
		kacolor = new Color(200,29,29).getRGB();
	}
	if(cs.getState()){
		cst = "Enabled";
		cscolor = new Color(29,200,29).getRGB();
	} else {
		cst = "Disabled";
		cscolor = new Color(200,29,29).getRGB();
	}
		if(cl.getState()){
		clr = "Enabled";
		clrcolor = new Color(29,200,29).getRGB();
	} else {
		clr = "Disabled";
		clrcolor = new Color(200,29,29).getRGB();
	}
			if(fl.getState()){
		flr = "Enabled";
		flcolor = new Color(29,200,29).getRGB();
	} else {
		flr = "Disabled";
		flcolor = new Color(200,29,29).getRGB();
	}
	};
	
	this.onRender2D = function(event) {
		var mcWidth = new ScaledResolution(mc).getScaledWidth();
		var mcHeight = new ScaledResolution(mc).getScaledHeight();
		GL11.glPushMatrix(); 
		Gui.drawRect(mcWidth/2/2+psx.get()-2,mcHeight/2 - 22 + psy.get(),mcWidth/2/2+psx.get()+94,mcHeight/2 - 10 + psy.get(),new Color(15,15,15,210).getRGB());
		Gui.drawRect(mcWidth/2/2+psx.get()-2,mcHeight/2 - 22 + psy.get(),mcWidth/2/2+psx.get()+94,mcHeight/2 + 38 + psy.get(),new Color(15,15,15,180).getRGB());
		Fonts.font40.drawStringWithShadow("InfoFunction",mcWidth/2/2+psx.get()+18, mcHeight/2 - 20 + psy.get(),textcolor);
		//draw KillAura
		Fonts.minecraftFont.drawStringWithShadow("KillAura",mcWidth/2/2+psx.get(), mcHeight/2 - 9 + psy.get(),textcolor);
		Fonts.minecraftFont.drawStringWithShadow("[" + kau + "]",mcWidth/2/2+psx.get()+44, mcHeight/2 - 9 + psy.get(),kacolor);
		//draw Speed
		Fonts.minecraftFont.drawStringWithShadow("Speed" ,mcWidth/2/2+psx.get(), mcHeight/2 + psy.get(),textcolor);
		Fonts.minecraftFont.drawStringWithShadow("[" + spd + "]",mcWidth/2/2+psx.get()+44, mcHeight/2+ psy.get(),spdcolor);
		//draw ChestStealer
		Fonts.minecraftFont.drawStringWithShadow("CStealer",mcWidth/2/2+psx.get(), mcHeight/2 + 9 + psy.get(),textcolor);
		Fonts.minecraftFont.drawStringWithShadow("[" + cst  + "]",mcWidth/2/2+psx.get()+44, mcHeight/2 + 9 + psy.get(), cscolor)
		//draw InventoryCleaner
		Fonts.minecraftFont.drawStringWithShadow("InvClear",mcWidth/2/2+psx.get(), mcHeight/2 + 18 + psy.get(),textcolor);
		Fonts.minecraftFont.drawStringWithShadow("[" + clr  + "]",mcWidth/2/2+psx.get()+44, mcHeight/2 + 18 + psy.get(), clrcolor)
	    //draw Flight
		Fonts.minecraftFont.drawStringWithShadow("Flight",mcWidth/2/2+psx.get(), mcHeight/2 + 27 + psy.get(),textcolor);
		Fonts.minecraftFont.drawStringWithShadow("[" + flr  + "]",mcWidth/2/2+psx.get() + 44, mcHeight/2 + 27 + psy.get(),flcolor);
		GL11.glPopMatrix();
	};
}

function onEnable() {
    Client = moduleManager.registerModule(InfoFunction);
}

function onDisable() {
    moduleManager.unregisterModule(Client);
}
