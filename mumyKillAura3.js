var scriptName = "mumyKillAura3";
var scriptVersion = 1.0;
var scriptAuthor = "mumy++";

var mumyKillAura3 = new mumyKillAura3();
var client;

var fly = moduleManager.getModule("Fly");
var KillAuraClass = Java.type("net.ccbluex.liquidbounce.LiquidBounce").moduleManager.getModule(Java.type("net.ccbluex.liquidbounce.features.module.modules.combat.KillAura").class);

var EventState = Java.type('net.ccbluex.liquidbounce.event.EventState');
var EventTarget = Java.type('net.ccbluex.liquidbounce.event.EventTarget');
var MotionEvent = Java.type('net.ccbluex.liquidbounce.event.MotionEvent');
//var SlowDownEvent = Java.type('net.ccbluex.liquidbounce.event.SlowDownEvent');
var EnumFacing = Java.type('net.minecraft.util.EnumFacing');
var BlockPos = Java.type('net.minecraft.util.BlockPos');
var C02PacketUseEntity = Java.type('net.minecraft.network.play.client.C02PacketUseEntity');
var C08PacketPlayerBlockPlacement = Java.type('net.minecraft.network.play.client.C08PacketPlayerBlockPlacement');
var C07PacketPlayerDigging = Java.type('net.minecraft.network.play.client.C07PacketPlayerDigging');
var C06PacketPlayerPosLook = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook');
var C04PacketPlayerPosition = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition');
var C05PacketPlayerLook = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook');
var C03PacketPlayer = Java.type('net.minecraft.network.play.client.C03PacketPlayer');
var S08PacketPlayerPosLook = Java.type('net.minecraft.network.play.server.S08PacketPlayerPosLook');
var S02PacketChat = Java.type('net.minecraft.network.play.server.S02PacketChat');
var C0DPacketCloseWindow = Java.type('net.minecraft.network.play.client.C0DPacketCloseWindow');
var C16PacketClientStatus = Java.type('net.minecraft.network.play.client.C16PacketClientStatus');
var C0APacketAnimation = Java.type('net.minecraft.network.play.client.C0APacketAnimation');
var C0BPacketEntityAction = Java.type('net.minecraft.network.play.client.C0BPacketEntityAction');
var EntityPlayer = Java.type('net.minecraft.entity.player.EntityPlayer');
var ItemSword = Java.type('net.minecraft.item.ItemSword');
var EnchantmentHelper = Java.type('net.minecraft.enchantment.EnchantmentHelper');
var MovementUtils = Java.type('net.ccbluex.liquidbounce.utils.MovementUtils');
var EntityUtils = Java.type('net.ccbluex.liquidbounce.utils.EntityUtils');
var AntiBot = Java.type('net.ccbluex.liquidbounce.features.module.modules.misc.AntiBot');
var Teams = Java.type('net.ccbluex.liquidbounce.features.module.modules.misc.Teams');
var LiquidBounce = Java.type('net.ccbluex.liquidbounce.LiquidBounce');
var EntityLivingBase = Java.type('net.minecraft.entity.EntityLivingBase');
var ColorUtils = Java.type('net.ccbluex.liquidbounce.utils.render.ColorUtils');
var EntityArmorStand = Java.type('net.minecraft.entity.item.EntityArmorStand');
var KeyBinding = Java.type('net.minecraft.client.settings.KeyBinding');
var GameSettings = Java.type('net.minecraft.client.settings.GameSettings');
var PotionEffect = Java.type('net.minecraft.potion.PotionEffect');
var Potion = Java.type('net.minecraft.potion.Potion');
var GuiInventory = Java.type('net.minecraft.client.gui.inventory.GuiInventory');
var GuiGameOver = Java.type('net.minecraft.client.gui.GuiGameOver');
var GuiChat = Java.type('net.minecraft.client.gui.GuiChat');
var Vec3 = Java.type('net.minecraft.util.Vec3');
var GuiIngameMenu = Java.type('net.minecraft.client.gui.GuiIngameMenu');
var GuiContainer = Java.type('net.minecraft.client.gui.inventory.GuiContainer');
var EntityArrow = Java.type('net.minecraft.entity.projectile.EntityArrow');
var EntitySmallFireball = Java.type('net.minecraft.entity.projectile.EntitySmallFireball');
var EntityLargeFireball = Java.type('net.minecraft.entity.projectile.EntityLargeFireball');
var Entity = Java.type('net.minecraft.entity.Entity');

var TeamsClass = Java.type("net.ccbluex.liquidbounce.LiquidBounce").moduleManager.getModule(Java.type("net.ccbluex.liquidbounce.features.module.modules.misc.Teams").class);

var Rotation = Java.type('net.ccbluex.liquidbounce.utils.Rotation');
var RaycastUtils = Java.type('net.ccbluex.liquidbounce.utils.RaycastUtils');
var RotationUtils = Java.type('net.ccbluex.liquidbounce.utils.RotationUtils');
var RandomUtils = Java.type('net.ccbluex.liquidbounce.utils.misc.RandomUtils');

var Entitys = [Java.type('net.minecraft.entity.item.EntityItem'), Java.type('net.minecraft.entity.item.EntityXPOrb'), Java.type('net.minecraft.entity.item.EntityFireworkRocket'), Java.type('net.minecraft.entity.item.EntityExpBottle'), Java.type('net.minecraft.entity.item.EntityEnderPearl'), Java.type('net.minecraft.entity.item.EntityEnderEye'), Java.type('net.minecraft.entity.projectile.EntityArrow'), Java.type('net.minecraft.entity.projectile.EntityEgg'), Java.type('net.minecraft.entity.projectile.EntityFireball'), Java.type('net.minecraft.entity.projectile.EntityFishHook'), Java.type('net.minecraft.entity.projectile.EntityPotion'), Java.type('net.minecraft.entity.projectile.EntitySmallFireball'), Java.type('net.minecraft.entity.projectile.EntitySnowball'), Java.type('net.minecraft.entity.projectile.EntityWitherSkull')];
var Color = Java.type('java.awt.Color');
var RenderUtils = Java.type('net.ccbluex.liquidbounce.utils.render.RenderUtils');
var AttackEvent = Java.type('net.ccbluex.liquidbounce.event.AttackEvent');
//var Vec3 = Java.type('net.minecraft.util.Vec3');
//var Swords = Java.type('net.minecraft.item.ItemSword');
//var BlockPos = Java.type('net.minecraft.util.BlockPos');
//var EnumFacing = Java.type('net.minecraft.util.EnumFacing');
//var PotionEffect = Java.type('net.minecraft.potion.PotionEffect');
//var EventTarget = Java.type('net.ccbluex.liquidbounce.event.EventTarget');
//var MotionEvent = Java.type('net.ccbluex.liquidbounce.event.MotionEvent');
//var SlowDownEvent = Java.type('net.ccbluex.liquidbounce.event.SlowDownEvent');
var MSTimer = Java.type("net.ccbluex.liquidbounce.utils.timer.MSTimer");
var TimeUtils = Java.type("net.ccbluex.liquidbounce.utils.timer.TimeUtils");
var AttackTimer = new MSTimer();
var SwitchTimer = new MSTimer();
var NoSlowTimer = new MSTimer();

function mumyKillAura3() {
	
	// Target
	var
	entity,
	Target,
	Targets;
	
	// Misc
	var
	Rs,
	Yaw,
	Pitch,
	Status,
	Clicks = 0,
	DelayedBlock,
	BlockingStatus,
	AttackDelay = 0;
	
	// Setting
	var
	AAC = value.createBoolean("AAC", false),
	Range = value.createFloat("Range", 4, 0, 8),
	MinCPS = value.createFloat("MinCPS", 9, 0, 20),
	RayCast = value.createBoolean("RayCast", false),
	Hitable = value.createBoolean("Hitable", false),
	MaxCPS = value.createFloat("MaxCPS", 11.5, 0, 20),
	FakeSwing = value.createBoolean("FakeSwing", false),
	Rotations = value.createBoolean("Rotations", false),
	OnleFaced = value.createBoolean("OnleFaced", false),
	HurtTime = value.createInteger("HurtTime", 20, 0, 20),
	KeepSprint = value.createBoolean("KeepSprint", false),
	Correction = value.createBoolean("Correction", false),
	BlockRange = value.createFloat("BlockRange", 5, 0, 10),
	PreRotation = value.createBoolean("PreRotation", false),
	IgnoredFaced = value.createBoolean("IgnoredFaced", false),
	SprintPacket = value.createBoolean("SprintPacket", false),
	InteractBlock = value.createBoolean("InteractBlock", false),
	LivingRayCast = value.createBoolean("LivingRayCast", false),
	HurtTimeBlock = value.createBoolean("HurtTimeBlock", false),
	MinTurnSpeed = value.createFloat("MinTurnSpeed", 95, 0, 180),
	MaxTurnSpeed = value.createFloat("MaxTurnSpeed", 135, 0, 180),
	BlockAnimation = value.createBoolean("BlockAnimation", false),
	SilentRotation = value.createBoolean("SilentRotation", false),
	RayCastIgnored = value.createBoolean("RayCastIgnored", false),
	ThroughWallsRange = value.createFloat("ThroughWallsRange", 0, 0, 8),
	Strafe = value.createList("Strafe", ["Off", "Strict", "Silent"], ""),
	Center = value.createList("Center", ["With", "Center", "Normal", "Random"], ""),
	CyclePerSecond = value.createList("CyclePerSecond", ["Normal", "Volatility"], ""),
	AutoBlock = value.createList("AutoBlock", ["Off", "Vanilla", "Packet", "Delayed"], ""),
	Priority = value.createList("Priority", ["Armor", "Health", "Distance", "Direction", "HurtTime", "LivingTime", "HurtResistantTime"], ""),
	Values = [Strafe, Center, Priority, AutoBlock, CyclePerSecond, Range, MinCPS, MaxCPS, HurtTime, BlockRange, MinTurnSpeed, MaxTurnSpeed, ThroughWallsRange, AAC, Hitable, RayCast, Rotations, Correction, OnleFaced, FakeSwing, KeepSprint, PreRotation, SprintPacket, InteractBlock, IgnoredFaced, SilentRotation, LivingRayCast, HurtTimeBlock, BlockAnimation, RayCastIgnored];
	
	this.getName = function() {
        return "mumyKillAura3";
    };

    this.getDescription = function() {
        return "mumyKillAura3-Module,By-mumy.";
    };

    this.getCategory = function() {
        return "Misc";
    };

   /*this.getTag = function() {
        return "";
    };*/

    this.onEnable = function() {
		Clicks = 0;
		Status = null;
		AttackDelay = 0;
		ResetRotations();
		Yaw = Pitch = null;
		DelayedBlock = null;
		Blocking(false, true);
		Target = Targets = entity = null;
    }
	
	function None() {
		
	}
	
	function Reset() {
		if (Status) {
			Clicks = 0;
			Status = null;
			Yaw = Pitch = null;
			DelayedBlock = false;
		} if (Rs) {
			ResetRotations();
		}
	}
	
	this.onWorld = function(event) {
		Module(this.getName(), false);
    }
	
    this.onAttack = function(event) {
        //target = event.getTargetEntity();
    }
	
	this.onUpdate = function() {
		Targets = getTargets();
		Target = entity = getTarget(Targets);
		if (Target || Targets.length > 0) {
			if (AutoBlockType(true) && isSword() && CanBlock()) {
				if (!mc.thePlayer.isBlocking()) {
					/*mc.playerController.*/sendUseItem(mc.thePlayer, mc.theWorld, mc.thePlayer.inventory.getCurrentItem(), true);
				}
				BlockingStatus = true;
				KeyBinding.setKeyBindState(mc.gameSettings.keyBindUseItem.getKeyCode(), true);
			} else if (BlockingStatus && !isSword() && mc.thePlayer.isUsingItem() && !GameSettings.isKeyDown(mc.gameSettings.keyBindUseItem)) {
				Blocking(false, false);
			} if (Target) {
				Status = true;
				HitableEntity(Target, SilentRotation.get(), !mc.thePlayer.ridingEntity ? PreRotation.get() ? 'No' : 'Yaw' : '');
				RunAttack(Target);
			} else {
				Reset();
			}
		} else {
			if (BlockingStatus || mc.thePlayer.isBlocking() && !GameSettings.isKeyDown(mc.gameSettings.keyBindUseItem)) {
				Blocking(false, true);
			}
			Reset();
		} if (!isSword() && BlockingStatus) {
			Blocking(false, true);
		}
	}

    this.onMotion = function(event) {
		if (Target && event.getEventState() == EventState.PRE && !mc.thePlayer.ridingEntity) {
			HitableEntity(Target, SilentRotation.get(), PreRotation.get() ? '' : 'Pitch');
		} if (BlockAnimation.get()) {
			if ((Target || !AttackTimer.hasTimePassed(400)) && (mc.thePlayer.isBlocking() || BlockingStatus || !mc.thePlayer.isBlocking() && AutoBlockType(true) && !CanBlock()) && isSword()) {
				mc.thePlayer.swingProgress = mc.thePlayer.prevSwingProgress = 0.75;
			}
		} if (Rotations.get() && Hitable.get() && Target && RotationUtils.serverRotation) {
			if (Module('Rotations').state && Module('Rotations').getValue('Body').get()) {
				Rs = true;
				Module('Rotations').getValue('Body').set(false);
			}
			mc.thePlayer.renderYawOffset = mc.thePlayer.rotationYawHead = RotationUtils.serverRotation.getYaw();
		}
    }
	
	this.onStrafe = function(event) {
		if (Strafe.get().indexOf('S') < 0) {
            return;
		} if (RotationUtils.targetRotation && (Target || getAngleDifference(RotationUtils.targetRotation.getYaw(), mc.thePlayer.rotationYaw) != 0) && !(Module('Scaffold').state || Module('Tower').state)) {
			switch (Strafe.get()) {
				case "Strict":
					var
					strafe = event.getStrafe(),
					forward = event.getForward(),
					friction = event.getFriction(),
					f = strafe * strafe + forward * forward,
					yaw = RotationUtils.targetRotation.getYaw();
					if (f >= 1E-4) {
						f = friction / Math.max(1, Math.sqrt(f));
						strafe *= f;
						forward *= f;
						var
						yawSin = Math.sin(yaw * Math.PI / 180),
						yawCos = Math.cos(yaw * Math.PI / 180);
						mc.thePlayer.motionX += strafe * yawCos - forward * yawSin;
						mc.thePlayer.motionZ += forward * yawCos + strafe * yawSin;
					}
					event.cancelEvent();
					break;
				case "Silent":
					RotationUtils.targetRotation.applyStrafeToPlayer(event);
					event.cancelEvent();
					break;
            }
        }
	}
	
	function ResetRotations() {
		if (Rs) {
			Rs = false;
			Module('Rotations').getValue('Body').set(true);
		}
	}
	
	function isFaced(entity, Range) {
		return !OnleFaced.get() || RotationUtils.isFaced(entity, Range ? Range : getRange() + (IgnoredFaced.get() ? entity.getDistanceToEntity(mc.thePlayer) : 0));
	}
	
	function isSword() {
		return mc.thePlayer.getHeldItem() && mc.thePlayer.getHeldItem().getItem() instanceof ItemSword;
	}
	
	function sendUseItem(playerIn, worldIn, itemStackIn, packet) {
		if (mc.thePlayer.isSpectator() || itemStackIn == null) {
			return false;
		} if (packet) {
			BlockingPacket(true);
		}
		var s = itemStackIn.stackSize;
		var itemstack = itemStackIn.useItemRightClick(worldIn, playerIn);
		if (itemstack != itemStackIn || itemstack != null && itemstack.stackSize != s) {
			playerIn.inventory.mainInventory[playerIn.inventory.currentItem] = itemstack;
			if (itemstack.stackSize == 0) {
				playerIn.inventory.mainInventory[playerIn.inventory.currentItem] = null;
			}
			return true;
		}
		return false;
	}
	
	function getTargets() {
		var
		entity,
		Distance,
		LastEntity = [],
		EntityList = mc.theWorld.loadedEntityList;
		for (var i in EntityList) {
			entity = EntityList[i];
			Distance = getDistanceToEntityBox(entity);
			if (AvailableEntity(entity) && entity != mc.thePlayer.ridingEntity) {
				if (Distance > getRange('Max')) {
					continue;
				} if (Distance > ThroughWallsRange.get() && Covered(entity)) {
					continue;
				}
				LastEntity.push(entity);
			}
		}
		return LastEntity;
	}
	
	function getTarget(EntityList) {
		var v, c, x, e;
		var List = [];
		for (var i in EntityList) {
			x = EntityList[i];
			if (getDistanceToEntityBox(x) <= getRange()) {
				List.push(x);
			}
		} if (List.length < 1) {
			return null;
		} for (var i in List) {
			v = Contrast(List[i], Priority.get());
			if (!e || v < c) {
				c = v;
				e = List[i];
			}
		}
		return e;
	}
	
	function Contrast(entity, priority, reverse) {
		var v = 0;
		switch (priority) {
			case "Health":
				v = entity.getHealth();
				break;
			case "Distance":
				v = getDistanceToEntityBox(entity);
				break;
			case "Direction":
				v = RotationUtils.getRotationDifference(entity);
				break;
			case "LivingTime":
				v = -entity.ticksExisted;
				break;
			case "Armor":
				v = entity.getTotalArmorValue();
				break;
			case "HurtTime":
				v = entity.hurtTime;
				break;
			default:
				v = entity.hurtResistantTime;
				break;
		}
		return reverse ? -v : v;
	}
	
	function getRange(Type) {
		var Attack = Math.max(Range.get(), ThroughWallsRange.get());
		switch (Type) {
			case "Max":
				return Math.max(Attack, BlockRange.get());
				break;
			default:
				return Attack;
				break;
		}
	}
	
	function AutoBlockType(State) {
		var Type = !AutoBlock.get() ? 'Off' : AutoBlock.get();
		return State ? Type != 'Off' : Type;
	}
	
	function RunAttack(entity) {
		if (RayCast.get()) {
			entity = RayCastEntity(entity);
		} if (Clicks > 0 && CanAttack()) {
			while (Clicks > 0) {
				AttackEntity(entity);
				Clicks -= Correction.get() ? 1 : Clicks;
			}
		} else if (AutoBlockType() == 'Delayed' && DelayedBlock) {
			DelayedBlock = false;
			Blocking(true, null, entity, isFaced(entity, getRange()));
		}
	}
	
	function CanAttack() {
		return Target && entity.hurtResistantTime <= HurtTime.get() && (isFaced(entity) || FakeSwing.get());
	}
	
	function RayCastEntity(TargetEntity) {
		var
		entity,
		Distance,
		LastEntity,
		EntityList = mc.theWorld.loadedEntityList;
		for (var x in EntityList) {
			entity = EntityList[x];
			Distance = getDistanceToEntityBox(entity);
			if (!RotationUtils.isFaced(entity, Math.max(getRange(), TargetEntity.getDistanceToEntity(mc.thePlayer))) || Distance >= getDistanceToEntityBox(TargetEntity)) {
				continue;
			} if (entity == mc.thePlayer || entity == TargetEntity || entity == mc.thePlayer.ridingEntity) {
				continue;
			} if (NotAttackEntity(entity)) {
				continue;
			} if (!RayCastIgnored.get() && !AvailableEntity(entity)) {
				continue;
			} if (entity instanceof EntityLivingBase ? entity instanceof EntityArmorStand && LivingRayCast.get() || !(EntityUtils.targetDead || entity.isEntityAlive() && (entity.getHealth() > 0 || AAC.get() && entity.hurtTime > 5)) : LivingRayCast.get()) {
				continue;
			} if (!LastEntity || getDistanceToEntityBox(LastEntity) > Distance) {
				LastEntity = entity;
			}
		}
		return LastEntity ? LastEntity : TargetEntity;
	}
	
	function NotAttackEntity(entity) {
		for (var i in Entitys) {
			if (entity instanceof Entitys[i]) {
				return true;
			}
		}
		return false;
	}
	
	function AvailableEntity(entity) {
		return entity != mc.thePlayer && !entity.isDead && !(entity instanceof EntityArmorStand) && entity instanceof EntityLivingBase && (EntityUtils.targetDead || entity.isEntityAlive() && entity.getHealth() > 0 || AAC.get() && entity.hurtTime > 5) && (EntityUtils.targetInvisible || !entity.isInvisible()) && !(!EntityUtils.targetPlayer && entity instanceof EntityPlayer || EntityUtils.targetPlayer && entity instanceof EntityPlayer && (AntiBot.isBot(entity) || entity.getName() != null && LiquidBounce.fileManager.friendsConfig.isFriend(ColorUtils.stripColor(entity.getName())) && !Module("NoFriends").getState() || entity.isSpectator() || Module("Teams").getState() && TeamsClass.isInYourTeam(entity))) && !(!EntityUtils.targetMobs && EntityUtils.isMob(entity) || !EntityUtils.targetAnimals && EntityUtils.isAnimal(entity));
	}
	
	function AttackEntity(entity) {
		var Inventory;
		if (mc.currentScreen instanceof GuiInventory && AAC.get()) {
			Inventory = true;
			mc.getNetHandler().addToSendQueue(new C0DPacketCloseWindow());
		} if (SprintPacket.get() && KeepSprint.get() && mc.thePlayer.isSprinting()) {
			mc.thePlayer.serverSprintState = false;
		} if ((BlockingStatus && isSword() || mc.thePlayer.isBlocking()) && !(DelayedBlock || AutoBlockType() == 'Vanilla')) {
			BlockingStatus = false;
			CanBlock() ? BlockingPacket(false) : Blocking(false, false);
		}
		mc.thePlayer.swingItem();
		if (!FakeSwing.get() || isFaced(entity)) {
			LiquidBounce.eventManager.callEvent(new AttackEvent(entity));
			mc.getNetHandler().addToSendQueue(new C02PacketUseEntity(entity, C02PacketUseEntity.Action.ATTACK));
			if (KeepSprint.get()) {
				if (mc.thePlayer.fallDistance > 0 && !mc.thePlayer.onGround && !mc.thePlayer.isOnLadder() && !mc.thePlayer.isInWater() && !mc.thePlayer.isPotionActive(Potion.blindness) && !mc.thePlayer.isRiding()) {
					mc.thePlayer.onCriticalHit(entity);
				} if (EnchantmentHelper.getModifierForCreature(mc.thePlayer.getHeldItem(), entity.getCreatureAttribute()) > 0) {
					mc.thePlayer.onEnchantmentCritical(entity);
				}
			} else if (!mc.thePlayer.isSpectator()) {
				mc.thePlayer.attackTargetEntityWithCurrentItem(entity);
			}
		} if ((AutoBlockType(true) || mc.thePlayer.isBlocking()) && isSword() && CanBlock() && !BlockingStatus) {
			AutoBlockType() == 'Delayed' ? DelayedBlock = true : Blocking(true, null, entity, InteractBlock.get());
		} if (Inventory) {
			mc.getNetHandler().addToSendQueue(new C16PacketClientStatus(C16PacketClientStatus.EnumState.OPEN_INVENTORY_ACHIEVEMENT));
		}
	}
	
	function CanBlock() {
		return !(HurtTimeBlock.get() && mc.thePlayer.hurtTime != 0 && mc.thePlayer.hurtTime < 6);
	}
	
	function HitableEntity(entity, Silent, Onle) {
		if (!Hitable.get()) {
			return;
		}
		!Yaw || Yaw.isNaN() ? Yaw = mc.thePlayer.rotationYaw : None();
		!Pitch || Pitch.isNaN() ? Pitch = mc.thePlayer.rotationPitch : None();
		var bb = entity.getEntityBoundingBox();
		var I = Covered(entity, true, getDistanceToEntityBox(entity) <= ThroughWallsRange.get());
		if (I == 255) {
			return;
		}
		var offset = 0.145;
		var EyesY = mc.thePlayer.posY + mc.thePlayer.getEyeHeight();
		var TEyesY = mc.thePlayer.posY + mc.thePlayer.getEyeHeight() * 0.9111;
		var xPos = PostMoving() ? [mc.thePlayer.motionX, mc.thePlayer.motionY, mc.thePlayer.motionZ] : [0, 0, 0];
		var rPos = Center.get() == 'Random' ? [Math.random() * 0.4 - 0.2, Math.random() * 0.25 - 0.125, Math.random() * 0.4 - 0.2] : [0, 0, 0];
		var vPos = Center.get() != 'Normal' ? [EntityCenter(entity, 'X'), TEyesY, EntityCenter(entity, 'Z')] : [mc.thePlayer.posX, TEyesY, mc.thePlayer.posZ];
		var Pos = [Math.max(bb.minX + offset, Math.min(vPos[0] - xPos[0] + rPos[0], bb.maxX - offset)), Math.max(bb.minY + offset, Math.min(vPos[1] - xPos[1] + rPos[1], bb.maxY - offset)), Math.max(bb.minZ + offset, Math.min(vPos[2] - xPos[2] + rPos[2], bb.maxZ - offset))];
		if (CoveredPos(Pos) || Center.get() == 'With') {
			Pos = [I[0], Pos[1], I[2]];
			if (CoveredPos(Pos)) {
				Pos[1] = EntityCenter(entity, 'Y');
				if (CoveredPos(Pos)) {
					Pos[1] = I[1];
				}
			}
		}
		var DiffX = Pos[0] - mc.thePlayer.posX;
		var DiffY = Pos[1] - EyesY;
		var DiffZ = Pos[2] - mc.thePlayer.posZ;
		var Dist = Math.sqrt(DiffX * DiffX + DiffZ * DiffZ);
		var TPitch = -(Math.atan2(DiffY, Dist) * 180 / Math.PI);
		var TYaw = Math.atan2(DiffZ, DiffX) * 180 / Math.PI - 90;
		var YawDiff = getAngleDifference(TYaw, Yaw);
		var PitchDiff = getAngleDifference(TPitch, Pitch);
		var TurnSpeed = Math.random() * (MaxTurnSpeed.get() - MinTurnSpeed.get()) + MinTurnSpeed.get();
		if (TurnSpeed > 0 && Onle != 'No') {
			Yaw += (Onle != 'Pitch' ? YawDiff > TurnSpeed ? TurnSpeed : Math.max(YawDiff, -TurnSpeed) : 0);
			Pitch += (Onle != 'Yaw' ? PitchDiff > TurnSpeed ? TurnSpeed : Math.max(PitchDiff, -TurnSpeed) : 0);
			Pitch = Math.min(90, Math.max(Pitch, -90));
		} if (Silent) {
			RotationUtils.setTargetRotation(new Rotation(Yaw, Pitch));
		} else {
			if (!Yaw.isNaN()) {
				mc.thePlayer.rotationYaw = Yaw;
			} if (!Pitch.isNaN()) {
				mc.thePlayer.rotationPitch = Pitch;
			}
		}
	}
	
	function getAngleDifference(a, b) {
		return ((((a - b) % 360) + 540) % 360) - 180;
	}
	
	function Covered(entity, getPos, ThroughWalls) {
		if (!getPos && mc.thePlayer.canEntityBeSeen(entity)) {
			return false;
		}
		var bb = entity.getEntityBoundingBox();
		var sT = [0, 4, -1, 3];
		var sV = PostMoving() ? [(0.85 - 0.15) / 3] : [1 / 3];
		var XOffset = mc.thePlayer.posX > EntityCenter(entity, 'X');
		var YOffset = mc.thePlayer.getEntityBoundingBox().minY + mc.thePlayer.getEyeHeight() > EntityCenter(entity, 'Y');
		var ZOffset = mc.thePlayer.posZ > EntityCenter(entity, 'Z');
		for (var xSearch = XOffset ? sT[0] : sT[3]; XOffset ? xSearch < sT[1] : xSearch > sT[2]; xSearch += (XOffset ? 1 : -1)) {
			for (var ySearch = YOffset ? sT[0] : sT[3]; YOffset ? ySearch < sT[1] : ySearch > sT[2]; ySearch += (YOffset ? 1 : -1)) {
				for (var zSearch = ZOffset ? sT[0] : sT[3]; ZOffset ? zSearch < sT[1] : zSearch > sT[2]; zSearch += (ZOffset ? 1 : -1)) {
					var Pos = [bb.minX + (bb.maxX - bb.minX) * xSearch * sV[0], bb.minY + (bb.maxY - bb.minY) * ySearch * sV[0], bb.minZ + (bb.maxZ - bb.minZ) * zSearch * sV[0]];
					if (!CoveredPos(Pos) || ThroughWalls) {
						return getPos ? Pos : false;
					}
				}
			}
		}
		return getPos ? 255 : true;
	}
	
	function EntityCenter(entity, Pos) {
		var v,
		bb = entity.getEntityBoundingBox();
		switch (Pos) {
			case "X":
				v = bb.maxX + bb.minX;
				break;
			case "Y":
				v = bb.maxY + bb.minY;
				break;
			case "Z":
				v = bb.maxZ + bb.minZ;
				break;
		}
		return v / 2;
	}
	
	function PostMoving() {
		return MovementUtils.isMoving() && (mc.thePlayer.motionX || mc.thePlayer.motionZ) && !(mc.thePlayer.posX - mc.thePlayer.prevPosX || mc.thePlayer.posY - mc.thePlayer.prevPosY || mc.thePlayer.posZ - mc.thePlayer.prevPosZ);
	}
	
	function CoveredPos(Value) {
		return mc.theWorld.rayTraceBlocks(new Vec3(mc.thePlayer.posX, mc.thePlayer.getEntityBoundingBox().minY + mc.thePlayer.getEyeHeight(), mc.thePlayer.posZ), new Vec3(Value[0], Value[1], Value[2]), false, true, false) != null;
	}
	
	function Blocking(State, Reset, entity, Interact) {
		if (!State) {
			if (Reset) {
				KeyBinding.setKeyBindState(mc.gameSettings.keyBindUseItem.getKeyCode(), GameSettings.isKeyDown(mc.gameSettings.keyBindUseItem));
			} else {
				mc.playerController.onStoppedUsingItem(mc.thePlayer);
			}
			BlockingStatus = false;
		} else {
			if (Interact) {
				var positionEye = mc.getRenderViewEntity().getPositionEyes(1),
				expandSize = entity.getCollisionBorderSize(),
				boundingBox = entity.getEntityBoundingBox().expand(expandSize, expandSize, expandSize),
				TargetRotation = RotationUtils.targetRotation,
				Angle = TargetRotation ? [TargetRotation.getYaw(), TargetRotation.getPitch()] : [mc.thePlayer.rotationYaw, mc.thePlayer.rotationPitch],
				yawCos = Math.cos(-Angle[0] * 0.017453292 - Math.PI),
				yawSin = Math.sin(-Angle[0] * 0.017453292 - Math.PI),
				pitchCos = -Math.cos(-Angle[1] * 0.017453292),
				pitchSin = Math.sin(-Angle[1] * 0.017453292),
				range = Math.min(Math.max(Range.get(), ThroughWallsRange.get()), getDistanceToEntityBox(entity)) + 1,
				lookAt = positionEye.addVector(yawSin * pitchCos * range, pitchSin * range, yawCos * pitchCos * range),
				movingObject = boundingBox.calculateIntercept(positionEye, lookAt);
				if (movingObject) {
					hitVec = movingObject.hitVec;
					mc.getNetHandler().addToSendQueue(new C02PacketUseEntity(entity, new Vec3(hitVec.xCoord - entity.posX, hitVec.yCoord - entity.posY, hitVec.zCoord - entity.posZ)));
					mc.getNetHandler().addToSendQueue(new C02PacketUseEntity(entity, C02PacketUseEntity.Action.INTERACT));
				}
			}
			BlockingPacket(true);
			BlockingStatus = true;
		}
	}
	
	this.onRender2D = function() {
		
	}
	
	this.onRender3D = function() {
		if (CanAttack() && AttackTimer.hasTimePassed(AttackDelay)) {
			Clicks++;
			AttackTimer.reset();
			AttackDelay = Math.floor(1000 / MaxCPS.get() + (CyclePerSecond.get() == 'Volatility' ? Math.random() > 1 / 3 ? Math.random() * 0.5 : 0.5 + Math.random() * 0.5 : Math.random()) * (1000 / MinCPS.get() - 1000 / MaxCPS.get() - 1));
		} if (entity || Targets.length > 0) {
			drawPlatform(entity ? entity : Targets[0]);
		}
	}
	
	function drawPlatform(entity) {
		RenderUtils.drawPlatform(entity, !Target || isFaced(entity) && entity == Target ? getDistanceToEntityBox(entity) <= getRange() ? new Color(37, 126, 255, 70) : new Color(117, 119, 121, 70) : new Color(255, 0, 0, 70));
	}
	
	function BlockingPacket(State) {
		mc.getNetHandler().addToSendQueue(State ? !MovementUtils.isMoving() ? new C08PacketPlayerBlockPlacement(mc.thePlayer.inventory.getCurrentItem()) : new C08PacketPlayerBlockPlacement(new BlockPos(-1, -1, -1), 255, mc.thePlayer.inventory.getCurrentItem(), 0, 0, 0) : new C07PacketPlayerDigging(C07PacketPlayerDigging.Action.RELEASE_USE_ITEM, new BlockPos(-0, -0, -0), EnumFacing.DOWN));
	}
	
	function getDistanceToEntityBox(entity) {
		var pos = [],
		box = entity.getEntityBoundingBox(),
		destMins = [box.minX, box.minY, box.minZ],
		destMaxs = [box.maxX, box.maxY, box.maxZ],
		eyes = [mc.thePlayer.posX, mc.thePlayer.posY + mc.thePlayer.getEyeHeight(), mc.thePlayer.posZ];
		for (var i in eyes) {
			pos.push(Math.max(destMins[i], Math.min(eyes[i], destMaxs[i])));
		}
		return Math.sqrt(Math.pow(eyes[0] - pos[0], 2) + Math.pow(eyes[1] - pos[1], 2) + Math.pow(eyes[2] - pos[2], 2));
	}
	
	function Module(getValue) {
		return moduleManager.getModule(getValue);
	}
	
	this.onPacket = function(event) {
		var packet = event.getPacket();
	}

    this.addValues = function(values) {
       for (var v in Values) {
			values.add(Values[v]);
		}
    }
	
    this.onDisable = function() {
		this.onEnable();
    }
	
}

function onLoad() {}

function onEnable() {
    client = moduleManager.registerModule(mumyKillAura3);
}

function onDisable() {
    moduleManager.unregisterModule(client);
}
