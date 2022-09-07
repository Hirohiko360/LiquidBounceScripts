var scriptName = "Keystrokes";
var scriptVersion = 1.2;
var scriptAuthor = "yby360";

function Keystrokes() {

var ScaledResolution = Java.type("net.minecraft.client.gui.ScaledResolution");

function getScaledWidth() {
    var scaledWidth = new ScaledResolution(mc).getScaledWidth();

    return scaledWidth;
}

function getScaledHeight() {
    var scaledHeight = new ScaledResolution(mc).getScaledHeight();

    return scaledHeight;
}

var GL11 = Java.type("org.lwjgl.opengl.GL11");

function drawRect(paramXStart, paramYStart, paramXEnd, paramYEnd, color) {
    var alpha = (color >> 24 & 0xFF) / 255;
    var red = (color >> 16 & 0xFF) / 255;
    var green = (color >> 8 & 0xFF) / 255;
    var blue = (color & 0xFF) / 255;

    GL11.glEnable(GL11.GL_BLEND);
    GL11.glDisable(GL11.GL_TEXTURE_2D);
    GL11.glBlendFunc(GL11.GL_SRC_ALPHA, GL11.GL_ONE_MINUS_SRC_ALPHA);
    GL11.glEnable(GL11.GL_LINE_SMOOTH);

    GL11.glPushMatrix();
    GL11.glColor4f(red, green, blue, alpha);
    GL11.glBegin(GL11.GL_TRIANGLE_FAN);
    GL11.glVertex2d(paramXEnd, paramYStart);
    GL11.glVertex2d(paramXStart, paramYStart);
    GL11.glVertex2d(paramXStart, paramYEnd);
    GL11.glVertex2d(paramXEnd, paramYEnd);

    GL11.glEnd();
    GL11.glPopMatrix();

    GL11.glEnable(GL11.GL_TEXTURE_2D);
    GL11.glDisable(GL11.GL_BLEND);
    GL11.glDisable(GL11.GL_LINE_SMOOTH);

    GL11.glColor4f(1, 1, 1, 1);
}

function DrawKey(Key_X, Key_Y, Length_X, Length_Y, Text , Text_X, Text_Y, Color,BGAlpha,i) {
		drawRect(Key_X+Length_X, Key_Y+Length_Y, Key_X-Length_X, Key_Y-Length_Y, '0x'+ BGAlpha +'000000')
		mc.fontRendererObj.drawStringWithShadow(Text, Text_X, Text_Y, '0x' + Color)
		drawRect(Key_X + i, Key_Y + i*Length_Y/Length_X, Key_X - i, Key_Y - i*Length_Y/Length_X, 0x6Ef7f7f7)
}

function DrawBorder(PosX, PosY, Length_X, Length_Y, thickness, color) {
	drawRect(PosX - Length_X - thickness,PosY - Length_Y - thickness,PosX + Length_X + thickness,PosY - Length_Y,color)
	drawRect(PosX + Length_X + thickness,PosY + Length_Y + thickness,PosX - Length_X - thickness,PosY + Length_Y,color)
	drawRect(PosX - Length_X - thickness,PosY - Length_Y,PosX - Length_X,PosY + Length_Y , color)
	drawRect(PosX + Length_X + thickness,PosY + Length_Y,PosX + Length_X,PosY - Length_Y , color)
}

var LMB_i = 0
var RMB_i = 0
var W_i = 0
var A_i = 0
var S_i = 0
var D_i = 0
var Space_i = 0
var Color = '00ffff'
var Border = value.createBoolean("Border", true);
var Rainbow = value.createBoolean("Rainbow", false);
var Motion = value.createBoolean("Motion", true);
var Motion_Speed = value.createInteger("Motion_Speed", 7, 1, 10);
var MotionSpeed = 13 - Motion_Speed.get()
var Color_R = value.createInteger("Color_R", 0, 0, 255);
var Color_G = value.createInteger("Color_G", 255, 0, 255);
var Color_B = value.createInteger("Color_B", 255, 0, 255);
var Pos_X = value.createInteger("Pos_X", 40, 0, getScaledWidth());
var Pos_Y = value.createInteger("Pos_Y", 120, 0, getScaledHeight());
var Scale = value.createFloat("Scale", 1, 0.8, 3);
var BG_Alpha = value.createInteger("BG_Alpha", 150, 0, 255);
var BGAlpha = ('0' + BG_Alpha.get().toString(16)).slice(-2)
var Border_Color
var r
var g
var b
var c = 0
var PosX = Pos_X.get()
var PosY = Pos_Y.get()
var scale = Scale.get()
var Length_WASD = 10*scale
var Length_Space = 32.8*scale
var Length_MB = 16*scale
var Height = 10*scale
var Height_WASD = Height
var Height_Space = 7*Height/10
var Height_MB = 7*Height/10
var Rainbow_Speed = value.createInteger("Rainbow_Speed", 20, 10, 100);
var LMB_X = PosX - 17.2*Length_MB/16
var LMB_Y = PosY + Height*1.95
var RMB_X = PosX + 17.2*Length_MB/16
var RMB_Y = PosY + Height*1.95
var W_X = PosX
var W_Y = PosY - Height*2.24
var A_X = PosX - 22.4*Length_WASD/10
var A_Y = PosY
var S_X = PosX
var S_Y = PosY
var D_X = PosX + 22.4*Length_WASD/10
var D_Y = PosY
var Space_X = PosX
var Space_Y = PosY + Height*3.6
	this.getName = function() {
		return scriptName
	};
	this.getDescription = function() {
		return "Keystrokes By " + scriptAuthor
	};
	this.getCategory = function() {
		return "Scripts"
	};
	this.addValues = function(values) {
		values.add(Scale);
		values.add(Motion);
		values.add(Motion_Speed);
		values.add(Border);
		values.add(Rainbow);
		values.add(Rainbow_Speed);
		values.add(Color_R);
		values.add(Color_G);
		values.add(Color_B);
		values.add(BG_Alpha);
		values.add(Pos_X);
		values.add(Pos_Y);
		
    }
	this.onEnable = function() {
		
	};
	this.onUpdate = function() {
		PosX = Pos_X.get()
		PosY = Pos_Y.get()
		scale = Scale.get()
		Length_WASD = 10*scale
		Length_Space = 32.8*scale
		Length_MB = 15.7*scale
		Height = 10*scale
		Height_WASD = Height
		Height_Space = 7*Height/10
		Height_MB = 7*Height/10
		LMB_X = PosX - 17.2*Length_MB/16
		LMB_Y = PosY + Height*1.95
		RMB_X = PosX + 17.2*Length_MB/16
		RMB_Y = PosY + Height*1.95
		W_X = PosX
		W_Y = PosY - Height*2.24
		A_X = PosX - 22.4*Length_WASD/10
		A_Y = PosY
		S_X = PosX
		S_Y = PosY
		D_X = PosX + 22.4*Length_WASD/10
		D_Y = PosY
		Space_X = PosX
		Space_Y = PosY + Height*3.6
		MotionSpeed = 13 - Motion_Speed.get()
		Border_Color = '0x' + 'FF' + Color
		if(mc.gameSettings.keyBindAttack.pressed){if(Motion.get()){if(LMB_i<Length_MB-0.1){LMB_i+=Length_MB/MotionSpeed}else{LMB_i=Length_MB}}else{LMB_i=Length_MB}}else{LMB_i=0}
		if(mc.gameSettings.keyBindUseItem.pressed){if(Motion.get()){if(RMB_i<Length_MB-0.1){RMB_i+=Length_MB/MotionSpeed}else{RMB_i=Length_MB}}else{RMB_i=Length_MB}}else{RMB_i=0}
		if(mc.gameSettings.keyBindForward.pressed){if(Motion.get()){if(W_i<Length_WASD-0.1){W_i+=Length_WASD/MotionSpeed}else{W_i=Length_WASD}}else{W_i=Length_WASD}}else{W_i=0}
		if(mc.gameSettings.keyBindLeft.pressed){if(Motion.get()){if(A_i<Length_WASD-0.1){A_i+=Length_WASD/MotionSpeed}else{A_i=Length_WASD}}else{A_i=Length_WASD}}else{A_i=0}
		if(mc.gameSettings.keyBindBack.pressed){if(Motion.get()){if(S_i<Length_WASD-0.1){S_i+=Length_WASD/MotionSpeed}else{S_i=Length_WASD}}else{S_i=Length_WASD}}else{S_i=0}
		if(mc.gameSettings.keyBindRight.pressed){if(Motion.get()){if(D_i<Length_WASD-0.1){D_i+=Length_WASD/MotionSpeed}else{D_i=Length_WASD}}else{D_i=Length_WASD}}else{D_i=0}
		if(mc.gameSettings.keyBindJump.pressed){if(Motion.get()){if(Space_i<Length_Space-0.1){Space_i+=Length_Space/MotionSpeed}else{Space_i=Length_Space}}else{Space_i=Length_Space}}else{Space_i=0}
		if(Rainbow.get()){
			r = parseInt((Math.sin(c + Math.PI) + 1) * 127.5);
			g = parseInt((Math.sin(c + (Math.PI / 2)) + 1) * 127.5);
			b = parseInt(((Math.sin(c) + 1) * 127.5));
			c = c + Rainbow_Speed.get() / 500;
			Color = ('0' + r.toString(16)).slice(-2)  + ('0' + g.toString(16)).slice(-2)  + ('0' + b.toString(16)).slice(-2)
			if (44 < c){
				c = 0
			}
		}else{
			Color = ('0' + Color_R.get().toString(16)).slice(-2)  + ('0' + Color_G.get().toString(16)).slice(-2)  + ('0' + Color_B.get().toString(16)).slice(-2)
		}
		BGAlpha = ('0' + BG_Alpha.get().toString(16)).slice(-2)
	};
	this.onDisable = function() {
	};
	this.onRender2D = function() {
		DrawKey(LMB_X,LMB_Y,Length_MB,Height_MB,'LMB',LMB_X-4.6,LMB_Y-3.6,Color,BGAlpha,LMB_i)
		DrawKey(RMB_X,RMB_Y,Length_MB,Height_MB,'RMB',RMB_X-4.6,RMB_Y-3.6,Color,BGAlpha,RMB_i)
		DrawKey(W_X,W_Y,Length_WASD,Height_WASD,'W',W_X-1.5,W_Y-3.6,Color,BGAlpha,W_i)
		DrawKey(A_X,A_Y,Length_WASD,Height_WASD,'A',A_X-1.5,A_Y-3.6,Color,BGAlpha,A_i)
		DrawKey(S_X,S_Y,Length_WASD,Height_WASD,'S',S_X-1.5,S_Y-3.6,Color,BGAlpha,S_i)
		DrawKey(D_X,D_Y,Length_WASD,Height_WASD,'D',D_X-1.5,D_Y-3.6,Color,BGAlpha,D_i)
		DrawKey(Space_X,Space_Y,Length_Space,Height_Space,'Space',Space_X-8.6,Space_Y-3.6,Color,BGAlpha,Space_i)

		if(Border.get()){
			DrawBorder(LMB_X,LMB_Y,Length_MB,Height_MB,0.56*scale,Border_Color)
			DrawBorder(RMB_X,RMB_Y,Length_MB,Height_MB,0.56*scale,Border_Color)
			DrawBorder(W_X,W_Y,Length_WASD,Height_WASD,0.56*scale,Border_Color)
			DrawBorder(A_X,A_Y,Length_WASD,Height_WASD,0.56*scale,Border_Color)
			DrawBorder(S_X,S_Y,Length_WASD,Height_WASD,0.56*scale,Border_Color)
			DrawBorder(D_X,D_Y,Length_WASD,Height_WASD,0.56*scale,Border_Color)
			DrawBorder(Space_X,Space_Y,Length_Space,Height_Space,0.56*scale,Border_Color)
		}
	}
};

var Keystrokes = new Keystrokes();
var Keystrokesclient;

function onEnable() {
	Keystrokesclient = moduleManager.registerModule(Keystrokes)
}
function onDisable() {
	moduleManager.unregisterModule(Keystrokesclient)
}