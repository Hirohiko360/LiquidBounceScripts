var scriptName = "Clicker";
var scriptAuthor = "Soulplexis";
var scriptVersion = 1.0;

var BlockPos = Java.type('net.minecraft.util.BlockPos');
var C07PacketPlayerDigging = Java.type('net.minecraft.network.play.client.C07PacketPlayerDigging');
var EnumFacing = Java.type('net.minecraft.util.EnumFacing');
var Swords = Java.type('net.minecraft.item.ItemSword');

function randomIntFrom(min,max) // Generate random number from min -> max.
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function Clicker() {
	var Rate = value.createInteger("DelayBase", 9, 0, 100);
	var CpsRandom = value.createInteger("DelayRandomize", 2, 0, 100);
	var CpsMulti = value.createInteger("MultiClicks", 0, 0, 100);
	var AntiBlock = value.createBoolean("NoBlockHits", true);
	var AntiInteract = value.createBoolean("UnBlock", false);
    this.getName = function() {
        return "Clicker";
    }
    this.getCategory = function() {
        return "Combat";   
    }

    this.getDescription = function() {
        return "Clicks.";
    }
  var x = 0;
  this.onEnable = function() {
  }
	this.onMotion = function() {
		if(mc.gameSettings.keyBindAttack.pressed && ((AntiBlock.get() == true && mc.thePlayer.isUsingItem() == false) || AntiBlock.get() == false)) {
			
		x++;
		if(x >= Rate.get() / 2 + randomIntFrom(-CpsRandom.get(), CpsRandom.get())) {
		mc.clickMouse();
		if(CpsMulti.get() != 0) {
		for(var l = 0;l <= CpsMulti.get();l++){
			mc.clickMouse();
		}
		}
		mc.thePlayer.swingItem();
			x = 0;
		}
		} else {
			x = 0;
		}

	}
	this.onAttack = function() {
			if(AntiInteract.get() == true && mc.thePlayer.getHeldItem().getItem() instanceof Swords) {
			mc.thePlayer.sendQueue.addToSendQueue(new C07PacketPlayerDigging(C07PacketPlayerDigging.Action.RELEASE_USE_ITEM, new BlockPos(0, 0, 0), EnumFacing.UP));
			}
	}
	this.onDisable = function() {
	}
		this.addValues = function(values) {
        values.add(Rate);
		values.add(CpsRandom);
		values.add(CpsMulti);
		values.add(AntiBlock);
        values.add(AntiInteract);
    }
}

var Clicker = new Clicker();
var ClickerClient;

function onEnable() {
    ClickerClient = moduleManager.registerModule(Clicker);
}

function onDisable() {
    moduleManager.unregisterModule(ClickerClient);
}