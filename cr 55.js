var scriptName = "Criticzl+"; 
var scriptVersion = 5.0; 
var scriptAuthor = "soulplexis and Killer[Ex Jigsaw Nov ETB Remix Hanabi Sigma Power Flux Coder]";

var autoGapple = new AutoGapple(); // it's totally autogapple 
var autoGappleClient;

var C06PlayerPacket = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook');
var C06PlayerPacket = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook');
var C04PacketPlayerPosition = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition')
var C05PacketPlayerLook = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook');
var C03PacketPlayer = Java.type('net.minecraft.network.play.client.C03PacketPlayer');
var S08PacketPlayerPosLook = Java.type("net.minecraft.network.play.server.S08PacketPlayerPosLook");
var Fly = moduleManager.getModule("Fly");
var Killaura = moduleManager.getModule("Killaura");

function AutoGapple() {
	var Mode = value.createList("Mode", ["Packet", "Hypixel", "Hop", "Matrix", "Spartan", "Horizon", "Custom", "New", "NoGround","Exhibition","Jigsaw","Nov","ETB","Remix","Hanabi","Sigma","Power","Flux","Judgame","HanFia","HPacket","HuaYuTing","RemixPacket","ZeroDayPacket","Miracle","Luna","Health","Strangth","Leain","OldPacket","USHypixel","LiquidBounce","Nivia"], "Nov");
	var MotionY = value.createFloat("CustomMotionY", 0.05, 0.01, 0.42);
	var NewY = value.createFloat("NewY", 0.05, 0.01, 1.00);
	var Delay = value.createInteger("Delay",3,0,20);
	var Soul = value.createInteger("Soul",3,0,20);
	var NewDiv = value.createBoolean("NewDivide", false);

    this.getName = function() {
        return "i am best skid man";
    };

    this.getDescription = function() {
        return "More critical modes i guess.";
    };

    this.getCategory = function() {
        return "Combat";
    };
	this.getTag = function() {
        return Mode.get(); 
    };
	var newy1 = 0;
	this.onMotion = function() {
		if(NewDiv.get() == true) {
			newy1 = NewY.get() / 10;
		} else {
			newy1 = NewY.get();
		}
	}
	var shit = 0;
    this.onAttack = function (event) {
		target = event.getTargetEntity();
		if(mc.thePlayer.onGround) {
		switch(Mode.get()) {
		case "Packet":
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.08, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
		break;
		case "Hypixel": // tried to remake what flux has as "Hypixel" mode but i think this is patched on Hypixel
	    	shit++;
		    if(shit == Soul.get()) { 
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.001, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
		    }
		    if(shit >= 5) {
			shit = 0;
		    }
		break;
		case "Hop":
			mc.thePlayer.motionY = 0.10;
		break;
		case "Matrix":
		    if(mc.thePlayer.motionX == 0.0 && mc.thePlayer.motionZ == 0.0) {
		    	mc.thePlayer.motionY = 0.20; // 0.05 might work, NCP didn't flag it so I changed it to 0.07 because I assumed it didn't work
		    }
		break;
		case "Spartan": // seems to work on Spartan on treeAC, every other hit is a critical
		    shit++;
		    if(shit == Soul.get()) { 
		    	mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.04, mc.thePlayer.posZ, true))
		    	mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
		    }
		    if(shit >= 10) {
			shit = 0;
		    }
		break;
		case "Horizon": // it also seems to work on treeAC Horizon, maybe Horizon there is different?
		if(mc.thePlayer.motionX == 0.0 && mc.thePlayer.motionZ == 0.0) {
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.00000000255, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
		}
		
		break;
		case "Custom":
			mc.thePlayer.motionY = MotionY.get();
		break;
		case "New":
		mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + newy1, mc.thePlayer.posZ, true))
		mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
		break;
		case "Exhibition":
		    shit++;
		    if(shit == Soul.get()) { 
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.0624218713251234, 0.0, 1.0834773-5, 0.0, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			}
		    if(shit >= 5) {
			shit = 0;
		    }
		break;
		case "Jigsaw":
		    shit++;
		    if(shit == Soul.get()) { 
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.0625, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 1.1-5, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			}
		    if(shit >= 7) {
			shit = 0;
		    }
		break;
		case "Nov":
		    shit++;
		    if(shit == Soul.get()) { 
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.0624, 0.0, 1.0-4, 0.0, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			}
			if(shit >= 5) {
			shit = 0;
		    }
		break;
		case "ETB":
		    shit++;
		    if(shit == Soul.get()) { 
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.7, 0.0, 1.0-4, 0.0, mc.thePlayer.posZ, false))
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			}
		    if(shit >= 5) {
			shit = 0;
		    }
		break;
		case "Remix":
		     shit++;
		    if(shit == Soul.get()) { 
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.03 - 0.003, 0.03 + 0.003, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.02 - 0.002, 0.02 + 0.002, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			}
		    if(shit >= 5) {
			shit = 0;
		    }
		break;
		case "Hanabi":
		    shit++;
		    if(shit == Soul.get()) { 
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.0625, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			}
		    if(shit >= 5) {
			shit = 0;
		    }
		break;
		case "Sigma":
		    shit++;
		    if(shit == Soul.get()) { 
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.0626, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.00001, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			}
		    if(shit >= 5) {
			shit = 0;
		    }
		break;
		case "Power":
		    shit++;
		    if(shit == Soul.get()) { 
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.0625, 0.0, 0.01255, 0.0, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			}
		    if(shit >= 5) {
			shit = 0;
		    }
		break;
		case "Flux":
		    shit++;
		    if(shit == Soul.get()) { 
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(ma.thePlayer.posX, mc.thePlayer.posY + 0.001, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(ma.thePlayer.posX, mc.thePlayer.posY + 0.001, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(ma.thePlayer.posX, mc.thePlayer.posY + 0.001, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			}
		    if(shit >= 5) {
			shit = 0;
		    }
		break;
	    case "Judgame":
		    shit++;
		    if(shit == Soul.get()) { 
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.05954835722479834, 0.05943483573247983, 0.01354835722479834, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			}
		    if(shit >= 5) {
			shit = 0;
		    }
		break;
		case "HanFia":
		    shit++;
		    if(shit == Soul.get()) { 
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.06142999976873398, 0.0, 0.012511000037193298, 0.0, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			}
			if(shit >= 5) {
			shit = 0;
		    }
		break;
		case "HPacket":
		    shit++;
		    if(shit == Soul.get()) { 
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.00000000001, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			}
		    if(shit >= 5) {
			shit = 0;
		    }
		break;
		case "HuaYuTing":
		shit++;
		if(shit == Soul.get()) { 
		mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.00000000001, mc.thePlayer.posZ, true))
		mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
		}
		if(shit >= 8) {
			shit = 0;
		    }
		break;
		case "RemixPacket":
		shit++
		if(shit == Soul.get()) {
		var Remixcrit = new  Array(0.051, 0.0, 0.0125, 0.0);
		var Remixcrit1 = Remixcrit.length;
		var Remixcrit2 = 0;
	   	while (Remixcrit2 < Remixcrit1){
			var Remixoffset = Remixcrit[Remixcrit2];
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + Remixoffset, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			++Remixcrit2
		}
		}
		if(shit >= Delay.get()) {
			shit = 0;
	     	}
		break;
		case "ZeroDayPacket":
		shit++
		if(shit == Soul.get()) {
		var Zerocrit = new  Array(0.051, 0.0, 0.0125, 0.0);
		var Zerocrit1 = Zerocrit.length;
		var Zerocrit2 = 0;
	   	while (Zerocrit2 < Zerocrit1){
			var Zerooffset = Zerocrit[Zerocrit2];
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + Zerooffset, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			++Zerocrit2
		}
		}
		if(shit >= Delay.get()) {
			shit = 0;
		}
		break;
		case "Miracle":
		shit++;
		if(shit == Soul.get()) { 
		var crit = new  Array(0.4642, 0.0 ,0.005 , 0.0);
		var crit1 = crit.length;
		var crit2 = 0;
	   	while (crit2 < crit1){
			var offset = crit[crit2];
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + offset, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.005, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			++crit2
		}
		}
		if(shit >= Delay.get()) {
			shit = 0;
		}
		break;
		case "Luna":
		shit++;
		if(shit == Soul.get()) { 
		var Lcrit = new  Array(0, 0.0622, 0);
		var Lcrit1 = crit.length;
		var Lcrit2 = 0;
	   	while (Lcrit2 < Lcrit1){
			var Loffset = Lcrit[Lcrit2];
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + Loffset, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.06, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.017711, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.0627, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.0627, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			++Lcrit2
		}
		}
		if(shit >= Delay.get()) {
			shit = 0;
		}
		break;
		case "Health":
		shit++;
		if(shit == Soul.get()) { 
		var Healthcrit = new  Array(0.07, 0.0, 1.0-4, 0.0);
		var Healthcrit1 = crit.length;
		var Healthcrit2 = 0;
	   	while (Healthcrit2 < Healthcrit1){
			var Healthoffset = Healthcrit[Healthcrit2];
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + Healthoffset, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			++Healthcrit2
		}
		}
		if(shit >= Delay.get()) {
			shit = 0;
		}
		break;
		case "Strangth":
		shit++;
		if(shit == Soul.get()) { 
		var Strangthcrit = new  Array(0.06142999976873398, 0.0, 0.012511000037193298, 0.00);
		var Strangthcrit1 = Strangthcrit.length;
		var Strangthcrit2 = 0;
	   	while (Strangthcrit2 < Strangthcrit1){
			var Strangthoffset = Strangthcrit[Strangthcrit2];
			mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + Strangthoffset, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			++Strangthcrit2
		}
		}
		if(shit >= Delay.get()) {
			shit = 0;
		}
		break;
		case "Leain":
		shit++;
		if(shit == Soul.get()) { 
		var Leaincrit = new  Array(0.0625);
		var Leaincrit1 = Leaincrit.length;
		var Leaincrit2 = 0;
		while (Leaincrit2 < Leaincrit1){
			var Leainoffset = Leaincrit[Leaincrit2];
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + Leainoffset, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.001, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			++Leaincrit2
		}
		}
		if(shit >= Delay.get()) {
			shit = 0;
		}
		break;
		case "OldPacket":
		shit++;
		if(shit == Soul.get()) { 
		var OPcrit = new  Array(0.05954835722479834, 0.05943483573247983, 0.01354835722479834);
		var OPcrit1 = OPcrit.length;
		var OPcrit2 = 0;
		while (OPcrit2 < OPcrit1){
			var OPoffset = OPcrit[OPcrit2];
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + OPoffset, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			++OPcrit2
		}
		}
		if(shit >= Delay.get()) {
			shit = 0;
		}
		break;
		case "USHypixel":
		shit++;
		if(shit == Soul.get()) { 
		var UScrit = new  Array(0.01625);
		var UScrit1 = UScrit.length;
		var UScrit2 = 0;
		while (UScrit2 < UScrit1){
			var USoffset = UScrit[UScrit2];
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + USoffset, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			++UScrit2
		}
		}
		if(shit >= Delay.get()) {
			shit = 0;
		}
		break;
		case "LiquidBounce":
		shit++;
		if(shit == Soul.get()) { 
		var LBcrit = new  Array(0.01, 0.06);
		var LBcrit1 = UScrit.length;
		var LBcrit2 = 0;
		while (LBcrit2 < LBcrit1){
			var LBoffset = LBcrit[LBcrit2];
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + LBoffset, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			++LBcrit2
		}
		}
		if(shit >= Delay.get()) {
			shit = 0;
		}
		break;
		case "Nivia":
		shit++;
		if(shit == Soul.get()) { 
		var Ncrit = new  Array(0.01);
		var Ncrit1 = Ncrit.length;
		var Ncrit2 = 0;
		while (Ncrit2 < Ncrit1){
			var Noffset = Ncrit[Ncrit2];
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + Noffset, mc.thePlayer.posZ, true))
			mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))
			++Ncrit2
		}
		}
		if(shit >= Delay.get()) {
			shit = 0;
		}
		break;
		}
		}
	}
	this.onDisable = function() {
		shit = 0;
	}
	this.onPacket = function(event) {
		if(Mode.get() == "NoGround") {
		var packet = event.getPacket();
		if(packet instanceof C03PacketPlayer) {
			packet.onGround = false;
		}
		}
	}
	this.addValues = function(values) {
		values.add(Mode);
		values.add(MotionY);
		values.add(NewY);
		values.add(NewDiv);
		values.add(Delay);
		values.add(Soul);
    }
}

function onLoad() {
};

function onEnable() {
    autoGappleClient = moduleManager.registerModule(autoGapple);
};

function onDisable() {
    moduleManager.unregisterModule(autoGappleClient);
};