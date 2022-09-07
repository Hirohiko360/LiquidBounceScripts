var scriptName = "TestScaffold";
var scriptVersion = 0.1;
var scriptAuthor = "mumy++";

var Color = Java.type("java.awt.Color");
var Integer = Java.type("java.lang.Integer");

var EventState = Java.type("net.ccbluex.liquidbounce.event.EventState");
var Fonts = Java.type("net.ccbluex.liquidbounce.ui.font.Fonts");
var InventoryUtils = Java.type("net.ccbluex.liquidbounce.utils.InventoryUtils");
var MovementUtils = Java.type("net.ccbluex.liquidbounce.utils.MovementUtils");
var PlaceRotation = Java.type("net.ccbluex.liquidbounce.utils.PlaceRotation");
var Rotation = Java.type("net.ccbluex.liquidbounce.utils.Rotation");
var RotationUtils = Java.type("net.ccbluex.liquidbounce.utils.RotationUtils");
var BlockUtils = Java.type("net.ccbluex.liquidbounce.utils.block.BlockUtils");
var PlaceInfo = Java.type("net.ccbluex.liquidbounce.utils.block.PlaceInfo");
var RenderUtils = Java.type("net.ccbluex.liquidbounce.utils.render.RenderUtils");
var MSTimer = Java.type("net.ccbluex.liquidbounce.utils.timer.MSTimer");
var TimeUtils = Java.type("net.ccbluex.liquidbounce.utils.timer.TimeUtils");
var IntegerValue = Java.type("net.ccbluex.liquidbounce.value.IntegerValue");

var C09PacketHeldItemChange = Java.type("net.minecraft.network.play.client.C09PacketHeldItemChange");
var C0APacketAnimation = Java.type("net.minecraft.network.play.client.C0APacketAnimation");
var C0BPacketEntityAction = Java.type("net.minecraft.network.play.client.C0BPacketEntityAction");

var GlStateManager = Java.type("net.minecraft.client.renderer.GlStateManager");
var ScaledResolution = Java.type("net.minecraft.client.gui.ScaledResolution");
var Blocks = Java.type("net.minecraft.init.Blocks");
var ItemBlock = Java.type("net.minecraft.item.ItemBlock");
var GameSettings = Java.type("net.minecraft.client.settings.GameSettings");
var BlockPos = Java.type("net.minecraft.util.BlockPos");
var EnumFacing = Java.type("net.minecraft.util.EnumFacing");
var MathHelper = Java.type("net.minecraft.util.MathHelper");
var MovingObjectPosition = Java.type("net.minecraft.util.MovingObjectPosition");
var Vec3 = Java.type("net.minecraft.util.Vec3");

Math.toDegrees = function (radians) {
    return radians / Math.PI * 180;
}

Math.toRadians = function (degrees) {
    return degrees / 180 * Math.PI;
}

function TestScaffold() {
	
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
        // Mode
        mode: setting.list("Mode", ["Normal", "Rewinside", "Expand"], "Normal"),

        // Delay
        maxDelay: new _AdaptedValue(new (Java.extend(IntegerValue, {
            onChanged: function (oldValue, newValue) {
                var i = settings.minDelay.get();
                if (i > newValue) {
                    settings.maxDelay.set(i);
                }
            }
        }))("MaxDelay", 0, 0, 1000)),
        minDelay: new _AdaptedValue(new (Java.extend(IntegerValue, {
            onChanged: function (oldValue, newValue) {
                var i = settings.maxDelay.get();
                if (i < newValue) {
                    settings.minDelay.set(i);
                }
            }
        }))("MinDelay", 0, 0, 1000)),
        placeableDelay: setting.boolean("PlaceableDelay", false),

        // AutoBlock
        autoBlock: setting.boolean("AutoBlock", true),
        stayAutoBlock: setting.boolean("StayAutoBlock", false),

        // Basic stuff
        sprint: setting.boolean("Sprint", true),
        swing: setting.boolean("Swing", true),
        search: setting.boolean("Search", true),
        down: setting.boolean("Down", true),
        placeMode: setting.list("PlaceTiming", ["Pre", "Post"], "Post"),

        // Eagle
        eagle: setting.boolean("Eagle", false),
        eagleSilent: setting.boolean("EagleSilent", false),
        blocksToEagle: setting.integer("BlocksToEagle", 0, 0, 10),

        // Expand
        expandLength: setting.integer("ExpandLength", 5, 1, 6),

        // Rotations
        rotations: setting.boolean("Rotations", true),
        keepLength: setting.integer("KeepRotationLength", 0, 0, 20),
        keepRotation: setting.boolean("KeepRotation", false),

        // Zitter
        zitter: setting.boolean("Zitter", false),
        zitterMode: setting.list("ZitterMode", ["Teleport", "Smooth"], "Teleport"),
        zitterSpeed: setting.float("ZitterSpeed", 0.13, 0.1, 0.3),
        zitterStrength: setting.float("ZitterStrength", 0.072, 0.05, 0.2),

        // Game
        timer: setting.float("Timer", 1, 0.1, 10),
        speedModifier: setting.float("SpeedModifier", 1, 0, 2),

        // Safety
        sameY: setting.boolean("SameY", false),
        safeWalk: setting.boolean("SafeWalk", true),
        airSafe: setting.boolean("AirSafe", false),

        // Visuals
        counterDisplay: setting.boolean("Counter", true),
        mark: setting.boolean("Mark", false)
    };

    // Target block
    var targetPlace;

    // Launch position
    var launchY;

    // Rotation lock
    var lockRotation;

    // Auto block slot
    var slot;

    // Zitter Smooth
    var zitterDirection;

    // Delay
    var delayTimer = new MSTimer();
    var zitterTimer = new MSTimer();
    var delay;

    // Eagle
    var placedBlocksWithoutEagle = 0;
    var eagleSneaking;

    // Down
    var shouldGoDown = false;

	this.getName = function () {
        return "TestScaffold";
    }

    this.getDescription = function () {
        return "TestScaffold-Module, By-mumy";
    }

    this.getCategory = function () {
        return "Misc";
    }

    this.onEnable = function () {
        if (mc.thePlayer == null) {
            return;
        }
        launchY = parseInt(mc.thePlayer.posY);
    }

    this.onUpdate = function () {
        mc.timer.timerSpeed = settings.timer.get();

        shouldGoDown = settings.down.get() && GameSettings.isKeyDown(mc.gameSettings.keyBindSneak) && getBlocksAmount() > 1;
        if (shouldGoDown) {
            mc.gameSettings.keyBindSneak.pressed = false;
        }
        if (mc.thePlayer.onGround) {
            var mode = settings.mode.get();

            // Rewinside scaffold mode
            if (mode.toLowerCase() === "rewinside") {
                MovementUtils.strafe(0.2);
                mc.thePlayer.motionY = 0;
            }

            // Smooth Zitter
            if (settings.zitter.get() && settings.zitterMode.get().toLowerCase() === "smooth") {
                if (!GameSettings.isKeyDown(mc.gameSettings.keyBindRight)) {
                    mc.gameSettings.keyBindRight.pressed = false;
                }
                if (!GameSettings.isKeyDown(mc.gameSettings.keyBindLeft)) {
                    mc.gameSettings.keyBindLeft.pressed = false;
                }
                if (zitterTimer.hasTimePassed(100)) {
                    zitterDirection = !zitterDirection;
                    zitterTimer.reset();
                }

                if (zitterDirection) {
                    mc.gameSettings.keyBindRight.pressed = true;
                    mc.gameSettings.keyBindLeft.pressed = false;
                } else {
                    mc.gameSettings.keyBindRight.pressed = false;
                    mc.gameSettings.keyBindLeft.pressed = true;
                }
            }

            // Eagle
            if (settings.eagle.get() && !shouldGoDown) {
                if (placedBlocksWithoutEagle >= settings.blocksToEagle.get()) {
                    var shouldEagle = mc.theWorld.getBlockState(new BlockPos(mc.thePlayer.posX, mc.thePlayer.posY - 1, mc.thePlayer.posZ)).getBlock() === Blocks.air;

                    if (settings.eagleSilent.get()) {
                        if (eagleSneaking !== shouldEagle) {
                            mc.getNetHandler().addToSendQueue(
                                new C0BPacketEntityAction(mc.thePlayer, shouldEagle ?
                                    C0BPacketEntityAction.Action.START_SNEAKING :
                                    C0BPacketEntityAction.Action.STOP_SNEAKING)
                            );
                        }

                        eagleSneaking = shouldEagle;
                    } else {
                        mc.gameSettings.keyBindSneak.pressed = shouldEagle;
                    }
                    placedBlocksWithoutEagle = 0;
                } else {
                    placedBlocksWithoutEagle++;
                }
            }

            // Zitter
            if (settings.zitter.get() && settings.zitterMode.get().toLowerCase() === "teleport") {
                MovementUtils.strafe(settings.zitterSpeed.get());

                var yaw = Math.toRadians(mc.thePlayer.rotationYaw + (zitterDirection ? 90 : -90));
                mc.thePlayer.motionX -= Math.sin(yaw) * settings.zitterStrength.get();
                mc.thePlayer.motionZ += Math.cos(yaw) * settings.zitterStrength.get();
                zitterDirection = !zitterDirection;
            }
        } if (!settings.sprint.get()) {
            mc.thePlayer.setSprinting(false);
        }
    }

    this.onMotion = function (event) {
        var eventState = event.getEventState();

        // Lock Rotation
        if (settings.rotations.get() && settings.keepRotation.get() && lockRotation != null) {
            RotationUtils.setTargetRotation(lockRotation);
        }
        // Place block
        if (settings.placeMode.get().toLowerCase() === eventState.getStateName().toLowerCase()) {
            place();
        }
        // Update and search for new block
        if (eventState === EventState.PRE) {
            update();
        }
        // Reset placeable delay
        if (targetPlace == null && settings.placeableDelay.get()) {
            delayTimer.reset();
        }
    }

    function update() {
        var isHeldItemBlock = mc.thePlayer.getHeldItem() != null && mc.thePlayer.getHeldItem().getItem() instanceof ItemBlock;
        if (settings.autoBlock.get() ? InventoryUtils.findAutoBlockBlock() === -1 && !isHeldItemBlock : !isHeldItemBlock) {
            return;
        }
        findBlock(settings.mode.get().toLowerCase() === "expand");
    }

    function findBlock(expand) {
        var blockPosition = shouldGoDown ?
            (mc.thePlayer.posY === parseInt(mc.thePlayer.posY) + 0.5 ?
                new BlockPos(mc.thePlayer.posX, mc.thePlayer.posY - 0.6, mc.thePlayer.posZ) :
                new BlockPos(mc.thePlayer.posX, mc.thePlayer.posY - 0.6, mc.thePlayer.posZ).down()) :
            (mc.thePlayer.posY === parseInt(mc.thePlayer.posY) + 0.5 ?
                new BlockPos(mc.thePlayer) :
                new BlockPos(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ).down());

        if (!expand && (!BlockUtils.isReplaceable(blockPosition) || search(blockPosition, !shouldGoDown))) {
            return;
        }
        if (expand) {
            for (var i = 0; i < settings.expandLength.get(); i++) {
                if (search(blockPosition.add(
                    Integer.valueOf(mc.thePlayer.getHorizontalFacing() === EnumFacing.WEST ? -i : mc.thePlayer.getHorizontalFacing() === EnumFacing.EAST ? i : 0).intValue(),
                    Integer.valueOf(0).intValue(),
                    Integer.valueOf(mc.thePlayer.getHorizontalFacing() === EnumFacing.NORTH ? -i : mc.thePlayer.getHorizontalFacing() === EnumFacing.SOUTH ? i : 0).intValue()
                ), false)) {
                    return;
                }
            }
        } else if (settings.search.get()) {
            for (var x = -1; x <= 1; x++) {
                for (var z = -1; z <= 1; z++) {
                    if (search(blockPosition.add(Integer.valueOf(x).intValue(), Integer.valueOf(0).intValue(), Integer.valueOf(z).intValue()), !shouldGoDown)) {
                        return;
                    }
                }
            }
        }
    }

    function place() {
        if (targetPlace == null) {
            if (settings.placeableDelay.get()) {
                delayTimer.reset();
            }
            return;
        }

        if (!delayTimer.hasTimePassed(delay) || (settings.sameY.get() && launchY - 1 !== parseInt(targetPlace.getVec3().yCoord))) {
            return;
        }

        var blockSlot = -1;
        var itemStack = mc.thePlayer.getHeldItem();

        if (mc.thePlayer.getHeldItem() == null || !(mc.thePlayer.getHeldItem().getItem() instanceof ItemBlock) || mc.thePlayer.getHeldItem().stackSize <= 0) {
            if (!settings.autoBlock.get()) {
                return;
            }
            blockSlot = InventoryUtils.findAutoBlockBlock();

            if (blockSlot === -1) {
                return;
            }
            mc.getNetHandler().addToSendQueue(new C09PacketHeldItemChange(blockSlot - 36));
            itemStack = mc.thePlayer.inventoryContainer.getSlot(blockSlot).getStack();
        }


        if (mc.playerController.onPlayerRightClick(mc.thePlayer, mc.theWorld, itemStack, targetPlace.getBlockPos(), targetPlace.getEnumFacing(), targetPlace.getVec3())) {
            delayTimer.reset();
            delay = TimeUtils.randomDelay(settings.minDelay.get(), settings.maxDelay.get());

            if (mc.thePlayer.onGround) {
                var modifier = settings.speedModifier.get();

                mc.thePlayer.motionX *= modifier;
                mc.thePlayer.motionZ *= modifier;
            }

            if (settings.swing.get()) {
                mc.thePlayer.swingItem();
            } else {
                mc.getNetHandler().addToSendQueue(new C0APacketAnimation());
            }
        }

        if (!settings.stayAutoBlock.get() && blockSlot >= 0) {
            mc.getNetHandler().addToSendQueue(new C09PacketHeldItemChange(mc.thePlayer.inventory.currentItem));
        }
        // Reset
        targetPlace = null;
    }

    this.onDisable = function () {
        if (mc.thePlayer == null) {
            return;
        }

        if (!GameSettings.isKeyDown(mc.gameSettings.keyBindSneak)) {
            mc.gameSettings.keyBindSneak.pressed = false;

            if (eagleSneaking) {
                mc.getNetHandler().addToSendQueue(new C0BPacketEntityAction(mc.thePlayer, C0BPacketEntityAction.Action.STOP_SNEAKING));
            }
        }

        if (!GameSettings.isKeyDown(mc.gameSettings.keyBindRight)) {
            mc.gameSettings.keyBindRight.pressed = false;
        }
        if (!GameSettings.isKeyDown(mc.gameSettings.keyBindLeft)) {
            mc.gameSettings.keyBindLeft.pressed = false;
        }
        lockRotation = null;
        mc.timer.timerSpeed = 1;
        shouldGoDown = false;

        if (slot !== mc.thePlayer.inventory.currentItem) {
            mc.getNetHandler().addToSendQueue(new C09PacketHeldItemChange(mc.thePlayer.inventory.currentItem));
        }
    }

    this.onMove = function (event) {
        if (!settings.safeWalk.get() || shouldGoDown) {
            return;
        }
        if (settings.airSafe.get() || mc.thePlayer.onGround) {
            event.setSafeWalk(true);
        }
    }

    this.onRender2D = function (event) {
        if (settings.counterDisplay.get()) {
            GlStateManager.pushMatrix();

            var blockOverlay = moduleManager.getModule("BlockOverlay");
            if (blockOverlay.getState() && blockOverlay.getInfoValue().get() && blockOverlay.getCurrentBlock() != null) {
                GlStateManager.translate(0, 15, 0);
            }
            var info = "Blocks: §7" + getBlocksAmount();
            var scaledResolution = new ScaledResolution(mc);

            RenderUtils.drawBorderedRect(
                (scaledResolution.getScaledWidth() / 2) - 2,
                (scaledResolution.getScaledHeight() / 2) + 5,
                (scaledResolution.getScaledWidth() / 2) + Fonts.font40.getStringWidth(info) + 2,
                (scaledResolution.getScaledHeight() / 2) + 16, 3, Color.BLACK.getRGB(), Color.BLACK.getRGB());
            GlStateManager.resetColor();
            Fonts.font40.drawString(info, scaledResolution.getScaledWidth() / 2,
                scaledResolution.getScaledHeight() / 2 + 7, Color.WHITE.getRGB());

            GlStateManager.popMatrix();
        }
    }

    this.onRender3D = function (event) {
        if (!settings.mark.get()) {
            return;
        }
        for (var i = 0; i < (settings.mode.get().toLowerCase() === "expand" ? settings.expandLength.get() + 1 : 2); i++) {
            var blockPos = new BlockPos(mc.thePlayer.posX + (mc.thePlayer.getHorizontalFacing() === EnumFacing.WEST ? -i : mc.thePlayer.getHorizontalFacing() === EnumFacing.EAST ? i : 0), mc.thePlayer.posY - (mc.thePlayer.posY === parseInt(mc.thePlayer.posY) + 0.5 ? 0 : 1.0) - (shouldGoDown ? 1 : 0), mc.thePlayer.posZ + (mc.thePlayer.getHorizontalFacing() === EnumFacing.NORTH ? -i : mc.thePlayer.getHorizontalFacing() === EnumFacing.SOUTH ? i : 0));
            var placeInfo = PlaceInfo.get(blockPos);

            if (BlockUtils.isReplaceable(blockPos) && placeInfo != null) {
                RenderUtils.drawBlockBox(blockPos, new Color(68, 117, 255, 100), false);
                break;
            }
        }
    }

    function search(blockPosition, checks) {
        if (!BlockUtils.isReplaceable(blockPosition)) {
            return false;
        }
        var eyesPos = new Vec3(mc.thePlayer.posX, mc.thePlayer.getEntityBoundingBox().minY + mc.thePlayer.getEyeHeight(), mc.thePlayer.posZ);

        var placeRotation = null;

        var values = EnumFacing.values();
        for (var i = 0; i < values.length; ++i) {
            var side = values[i];
            var neighbor = blockPosition.offset(side);

            if (!BlockUtils.canBeClicked(neighbor)) {
                continue;
            }
            var dirVec = new Vec3(side.getDirectionVec());

            for (var xSearch = 0.1; xSearch < 0.9; xSearch += 0.1) {
                for (var ySearch = 0.1; ySearch < 0.9; ySearch += 0.1) {
                    for (var zSearch = 0.1; zSearch < 0.9; zSearch += 0.1) {
                        var posVec = (new Vec3(blockPosition)).addVector(xSearch, ySearch, zSearch);
                        var distanceSqPosVec = eyesPos.squareDistanceTo(posVec);
                        var hitVec = posVec.add(new Vec3(dirVec.xCoord * 0.5, dirVec.yCoord * 0.5, dirVec.zCoord * 0.5));

                        if (checks && (eyesPos.squareDistanceTo(hitVec) > 18 || distanceSqPosVec > eyesPos.squareDistanceTo(posVec.add(dirVec)) || mc.theWorld.rayTraceBlocks(eyesPos, hitVec, false, true, false) != null)) {
                            continue;
                        }
                        // face block
                        var diffX = hitVec.xCoord - eyesPos.xCoord;
                        var diffY = hitVec.yCoord - eyesPos.yCoord;
                        var diffZ = hitVec.zCoord - eyesPos.zCoord;

                        var diffXZ = MathHelper.sqrt_double(diffX * diffX + diffZ * diffZ);

                        var rotation = new Rotation(
                            MathHelper.wrapAngleTo180_float(Math.toDegrees(Math.atan2(diffZ, diffX)) - 90),
                            MathHelper.wrapAngleTo180_float(-Math.toDegrees(Math.atan2(diffY, diffXZ)))
                        );

                        var rotationVector = RotationUtils.getVectorForRotation(rotation);
                        var vector = eyesPos.addVector(rotationVector.xCoord * 4, rotationVector.yCoord * 4, rotationVector.zCoord * 4);
                        var obj = mc.theWorld.rayTraceBlocks(eyesPos, vector, false, false, true);

                        if (!(obj.typeOfHit === MovingObjectPosition.MovingObjectType.BLOCK && obj.getBlockPos().equals(neighbor))) {
                            continue;
                        }
                        if (placeRotation == null || RotationUtils.getRotationDifference(rotation) < RotationUtils.getRotationDifference(placeRotation.getRotation())) {
                            placeRotation = new PlaceRotation(new PlaceInfo(neighbor, side.getOpposite(), hitVec), rotation);
                        }
                    }
                }
            }
        }

        if (placeRotation == null) {
            return false;
        }

        if (settings.rotations.get()) {
            RotationUtils.setTargetRotation(placeRotation.getRotation(), settings.keepLength.get());
            lockRotation = placeRotation.getRotation();
        }
        targetPlace = placeRotation.getPlaceInfo();
        return true;
    }

    function getBlocksAmount() {
        var amount = 0;

        for (var i = 36; i < 45; i++) {
            var itemStack = mc.thePlayer.inventoryContainer.getSlot(i).getStack();

            if (itemStack != null && itemStack.getItem() instanceof ItemBlock) {
                var block = itemStack.getItem().getBlock();
                if (mc.thePlayer.getHeldItem() === itemStack || !InventoryUtils.BLOCK_BLACKLIST.contains(block)) {
                    amount += itemStack.stackSize;
                }
            }
        }

        return amount;
    }

    this.addValues = function (values) {
		for (var i in settings) {
		    values.add(settings[i]);
        }
    }
	
}

function onLoad() {}

function onEnable() {
    client = moduleManager.registerModule(new TestScaffold());
}

function onDisable() {
    moduleManager.unregisterModule(client);
}

