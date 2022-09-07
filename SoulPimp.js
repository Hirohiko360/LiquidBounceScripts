var scriptName = "SoulPimp (weather & time changer module)";
var scriptAuthor = "Soulplexis";
var scriptVersion = 1.4;

function randomIntFrom(min,max) // Get a random integer from [min] to [max] - changed functionality to be a random FLOAT
{
    return Math.random()*(max-min+1)+min
}
var C06PlayerPacket = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook');
var C04PacketPlayerPosition = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition')
var C05PacketPlayerLook = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook');
var C03PacketPlayer = Java.type('net.minecraft.network.play.client.C03PacketPlayer');
var S08PacketPlayerPosLook = Java.type("net.minecraft.network.play.server.S08PacketPlayerPosLook");
var worldinfo = Java.type("net.minecraft.world.storage.WorldInfo");
var timepacket = Java.type("net.minecraft.network.play.server.S03PacketTimeUpdate");
var Foodstuff = Java.type("net.minecraft.util.FoodStats");
function Derp() {
	var Bloing = value.createBoolean("Bloing", false);
	var TimeMachine = value.createBoolean("TimeMachine", false);
	var TimeType = value.createList("TimeType", ["Add", "Set", "Random"], "Add");
	var TimeAmount  = value.createInteger("TimeAmount", 50, -24000, 24000);
    var WeatherChanger = value.createBoolean("WeatherChanger", false);
	var WeatherType = value.createList("WeatherType", ["Rain", "Clear", "Cursed", "Blessed", "Random"], "Rain");
	var RainStrength  = value.createFloat("RainStrength", 0.5, 0, 5);
	var SkyLight = value.createBoolean("SkyLight", false);
	var SkylightAmount = value.createFloat("SkyLightAmount", 0.5, 0, 100);
	var FakeHealth = value.createBoolean("FakeHealth", false);
	var FakeHealthAmount = value.createFloat("FakeHealthAmount", 5, 0.5, 20);
	var FakeAbsorption	= value.createBoolean("FakeAbsorption", false);
	var FakeAbsorptionAmount = value.createFloat("FakeAbsorptionAmount", 5, 0.5, 200);
	var FakeHunger = value.createBoolean("FakeHunger", false);
	var FakeHungerAmount = value.createFloat("FakeHungerAmount", 5, 0.5, 20);
	var FakeFire = value.createBoolean("FakeFire", false);
	var CustomTag = value.createText("ModuleTag", "ventaasi");
    this.getName = function() {
        return "SoulMod";
    }
    this.getCategory = function() {
        return "Render";   
    }
    this.getDescription = function() {
        return "Change things such as the weather, the time, etc.";
    }
	this.onEnable = function() {
		if(WeatherType.get() == "Cursed") {
			rain = 0;
		}
		if(WeatherType.get() == "Blessed") {
			rain = RainStrength.get();
		}
	}
	this.onJump = function() {
	}
	this.onPacket = function(event) {
		var packet = event.getPacket();
		if(packet instanceof timepacket && TimeMachine.get()) {
			event.cancelEvent();
		}
	}
	var rain = 0;
	this.onUpdate = function() {
		if(TimeMachine.get()) {
			switch(TimeType.get()) {
				case "Add":
				mc.theWorld.setWorldTime(mc.theWorld.getWorldTime() + TimeAmount.get());
				break;
				case "Set":
				mc.theWorld.setWorldTime(TimeAmount.get());
				break;
				case "Random":
				mc.theWorld.setWorldTime(randomIntFrom(0,24000));
				break;
			}
		}
		if(FakeHealth.get() == true) {
			mc.thePlayer.setHealth(FakeHealthAmount.get());	
		}
		if(FakeAbsorption.get() == true) {
			mc.thePlayer.setAbsorptionAmount(FakeAbsorptionAmount.get());	
		}
		if(FakeHunger.get() == true) {
			mc.thePlayer.getFoodStats().setFoodLevel(FakeHungerAmount.get());
		}
		if(FakeFire.get()) {
			mc.thePlayer.setFire(1);
		}
		if(WeatherChanger.get()) {
			switch(WeatherType.get()) {
				case "Rain":
				mc.theWorld.setRainStrength(RainStrength.get());
				mc.theWorld.setRaining(true);
				break;
				case "Clear":
				mc.theWorld.setRainStrength(0);
				mc.theWorld.setRaining(false);
				break;
				case "Cursed":
					rain += 0.001000;
				mc.theWorld.setRainStrength(rain);
				mc.theWorld.setRaining(true);
				if(rain >= RainStrength.get()) {
					rain = RainStrength.get();
				}
				break;
				case "Blessed":
					rain -= 0.001000;
				mc.theWorld.setRainStrength(rain);
				mc.theWorld.setRaining(true);
				if(rain <= 0) {
					rain = 0
					mc.theWorld.setRaining(false);
				}
				break;
				case "Random":
				mc.theWorld.setRainStrength(randomIntFrom(0,RainStrength.get()));
				mc.theWorld.setRaining(true);
				break;
			}
		}
	}
	this.addValues = function(soul) {
		//soul.add(Bloing); USELESS
		soul.add(TimeMachine);
		soul.add(TimeType);
		soul.add(TimeAmount);
		soul.add(WeatherChanger)
		soul.add(WeatherType);
		soul.add(RainStrength);
		//soul.add(SkyLight);
		//soul.add(SkylightAmount);
		soul.add(FakeHealth);
		soul.add(FakeHealthAmount);
		soul.add(FakeAbsorption);
		soul.add(FakeAbsorptionAmount);
		soul.add(FakeHunger);
		soul.add(FakeHungerAmount);
		soul.add(FakeFire);
		soul.add(CustomTag);
	}
	
	this.getTag = function() {
    return CustomTag.get();
}
}

var derp = new Derp();
var derpClient;

function onEnable() {
    derpClient = moduleManager.registerModule(derp);
}

function onDisable() {
    moduleManager.unregisterModule(derpClient);
}