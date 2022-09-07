var scriptName = "Speed Mine Plus";
var scriptAuthor = "Stars";
var scriptVersion = 2.0;

var C07PacketPlayerDigging = Java.type('net.minecraft.network.play.client.C07PacketPlayerDigging');
var PotionEffect = Java.type('net.minecraft.potion.PotionEffect');
var EnumFacing = Java.type('net.minecraft.util.EnumFacing');
var ItemTool = Java.type('net.minecraft.item.ItemTool');
var BlockPos = Java.type('net.minecraft.util.BlockPos');
var Potion = Java.type('net.minecraft.potion.Potion');
var Blocks = Java.type('net.minecraft.init.Blocks');
var Block = Java.type('net.minecraft.block.Block');


function SpeedMine() {

	var Mode = value.createList("Mode", ["Packet+", "NewPacket2", "Potion", "BlocksmcFast", "Remix", "Eclipse"], "NewPacket");
	var Level = value.createInteger("Level", 3, 0, 4);
	var Time = value.createInteger("Time", 10, 0, 200);
	var MineSpeed = value.createFloat("Speed", 1.4, 0, 3);

	this.getName = function() {
		return "SpeedMine+";
	}

	this.getCategory = function() {
		return "Player";
	}

	this.getDescription = function() {
		return "Speeds up mining(Blocksmc edition! By Stars)";
	}
	var bzs = false;
	var bzx = 0.0;
	var pos;
	var face;
	this.onPacket = function(event) {
		if (Mode.get() == "Remix") {
			if (event.getPacket() instanceof C07PacketPlayerDigging && mc.playerController != null) {
				if (event.getPacket().getStatus() == C07PacketPlayerDigging.Action.START_DESTROY_BLOCK) {
					bzs = true;
					pos = event.getPacket().getPosition();
					face = event.getPacket().getFacing();
					bzx = 0.0;
				} else if (event.getPacket().getStatus() == C07PacketPlayerDigging.Action.ABORT_DESTROY_BLOCK || event.getPacket().getStatus() == C07PacketPlayerDigging.Action.STOP_DESTROY_BLOCK) {
					bzs = false;
					pos = null;
					face = null;
				}
			}
		}
	}
	this.onDisable = function() {
		if (Mode.get() == "Potion") {
			mc.thePlayer.removePotionEffect(Potion.digSpeed.getId())
		}
	}
	this.onUpdate = function() {
		mc.playerController.blockHitDelay = 0;
		if (Mode.get() == "Packet+") {
			if (mc.playerController.curBlockDamageMP == 0.1) {
				mc.playerController.curBlockDamageMP += 0.2;
			}
			if (mc.playerController.curBlockDamageMP == 0.4) {
				mc.playerController.curBlockDamageMP += 0.2;
			}
			if (mc.playerController.curBlockDamageMP == 0.7) {
				mc.playerController.curBlockDamageMP += 0.2;
			}
		}
		if (Mode.get() == "NewPacket2") {
			if (mc.playerController.curBlockDamageMP == 0.2) {
				mc.playerController.curBlockDamageMP += 0.1;
			}
			if (mc.playerController.curBlockDamageMP == 0.4) {
				mc.playerController.curBlockDamageMP += 0.1;
			}
			if (mc.playerController.curBlockDamageMP == 0.6) {
				mc.playerController.curBlockDamageMP += 0.1;
			}
			if (mc.playerController.curBlockDamageMP == 0.8) {
				mc.playerController.curBlockDamageMP += 0.2;
			}
		}
		if (Mode.get() == "Potion") {
			mc.thePlayer.addPotionEffect(new PotionEffect(Potion.digSpeed.id, Time.get(), Level.get()));
		}
		if (Mode.get() == "BlocksmcFast") {
			if (mc.theWorld != null) {
				if (mc.playerController.curBlockDamageMP > 0.421) {
					mc.playerController.curBlockDamageMP = 0.969;
				}
			}
		}
		if (Mode.get() == "Remix") {
			if (mc.playerController.extendedReach()) {
				mc.playerController.blockHitDelay = 0;
			} else if (bzs) {
				var block = mc.theWorld.getBlockState(pos).getBlock();
				bzx += (block.getPlayerRelativeBlockHardness(mc.thePlayer, mc.theWorld, pos) * MineSpeed.get());
				if (bzx >= 1.0) {
					mc.theWorld.setBlockState(pos, Blocks.air.getDefaultState(), 11);
					mc.thePlayer.sendQueue.getNetworkManager().sendPacket(new C07PacketPlayerDigging(C07PacketPlayerDigging.Action.STOP_DESTROY_BLOCK, pos, face));
					bzx = 0.0;
					bzs = false;
				}
			}
		}
	}
	this.addValues = function(values) {
		values.add(Mode);
		values.add(Level);
		values.add(Time);
		values.add(MineSpeed);
	}
}

var SpeedMine = new SpeedMine();
var SpeedMineClient;

function onEnable() {
	SpeedMineClient = moduleManager.registerModule(SpeedMine);
}

function onDisable() {
	moduleManager.unregisterModule(SpeedMineClient);
}