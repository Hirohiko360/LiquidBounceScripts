// Minecraft Utilities By Mp0wers
// License: MIT
// Version: 1.1
//
// Special thanks to developers of LiquidBounce and WurstClient.

var globalScope = this;

var KeyBinding = Java.type("net.minecraft.client.settings.KeyBinding");
var EnumFacing = Java.type("net.minecraft.util.EnumFacing");
var Vec3 = Java.type("net.minecraft.util.Vec3");

var minecraftUtils = (function() {
	var keyBindHooks = {};
	var hookKeyBind = function(keyBindIn, hookNameString) {
		var keyCode;
		if (!(keyBindIn instanceof KeyBinding) || typeof hookNameString != "string") {
			return false;
		};
		if (!globalScope.hasOwnProperty(hookNameString) || !(globalScope[hookNameString] instanceof KeyBinding)) {
			globalScope[hookNameString] = new KeyBinding("key.hook_" + hookNameString, 0, "key.categories.misc");
		};
		if (keyBindHooks.hasOwnProperty(hookNameString)) {
			unhookKeyBind(hookNameString);
		};
		var hooksArr = Object.keys(keyBindHooks);
		for (var i = 0; i < hooksArr.length; i++) {
			if (keyBindHooks[hooksArr[i]][0] == keyBindIn) {
				unhookKeyBind(hooksArr[i]);
				break;
			};
		};
		keyCode = keyBindIn.getKeyCode();
		if (keyCode == 0) {
			keyCode = keyBindIn.getKeyCodeDefault();
		};
		keyBindIn.setKeyCode(0);
		globalScope[hookNameString].setKeyCode(keyCode);
		keyBindHooks[hookNameString] = [keyBindIn, keyCode];
		KeyBinding.resetKeyBindingArrayAndHash();
		return true;
	};
	var unhookKeyBind = function(hookNameString) {
		var keyCode;
		if (typeof hookNameString != "string" || !keyBindHooks.hasOwnProperty(hookNameString)) {
			return false;
		};
		keyCode = keyBindHooks[hookNameString][1];
		if (globalScope.hasOwnProperty(hookNameString) && globalScope[hookNameString] instanceof KeyBinding) {
			globalScope[hookNameString].setKeyCode(0);
		};
		keyBindHooks[hookNameString][0].setKeyCode(keyCode);
		delete keyBindHooks[hookNameString];
		KeyBinding.resetKeyBindingArrayAndHash();
		return true;
	};
	var unhookAllKeyBinds = function() {
		var hooksArr = Object.keys(keyBindHooks);
		for (var i = 0; i < hooksArr.length; i++) {
			unhookKeyBind(hooksArr[i]);
		};
		return true;
	};
	return {
		hookKeyBind: hookKeyBind,
		unhookKeyBind: unhookKeyBind,
		unhookAllKeyBinds: unhookAllKeyBinds
	};
})();

// Start of Minecraft Utilities API

function hookKeyBind(keyBindIn, hookNameString) {
	return minecraftUtils.hookKeyBind(keyBindIn, hookNameString);
};

function unhookKeyBind(hookNameString) {
	return minecraftUtils.unhookKeyBind(hookNameString);
};

function unhookAllKeyBinds() {
	return minecraftUtils.unhookAllKeyBinds();
};

function getCenterOfBlockSide(blockPosIn, sideIn) {
	var posVec = new Vec3(blockPosIn).addVector(0.5, 0.5, 0.5);
	var dirVec = new Vec3(sideIn.getDirectionVec());
	var resultVec = posVec.addVector(dirVec.xCoord * 0.5, dirVec.yCoord * 0.5, dirVec.zCoord * 0.5);
	return resultVec;
};

function isBlockInReach(entityIn, blockPosIn) {
	var reachDistance = mc.playerController.getBlockReachDistance() + 0.25;
	var eyesPos = entityIn.getPositionEyes(1.0);
	var closestSide = getClosestBlockSide(eyesPos, blockPosIn);
	var closestSideCenter = getCenterOfBlockSide(blockPosIn, closestSide);
	if (eyesPos.distanceTo(closestSideCenter) <= reachDistance) {
		return true;
	};
	return false;
};

function getClosestBlockSide(vectorIn, blockPosIn) {
	var blockSide, blockSideCenter, distanceToBlockSide, closestSide;
	var lowestDistance = null;
	var i;
	for (i in EnumFacing.values()) {
		blockSide = EnumFacing.values()[i];
		blockSideCenter = getCenterOfBlockSide(blockPosIn, blockSide);
		distanceToBlockSide = vectorIn.distanceTo(blockSideCenter);
		if (lowestDistance == null || distanceToBlockSide < lowestDistance) {
			lowestDistance = distanceToBlockSide;
			closestSide = blockSide;
		};
	};
	return closestSide;
};
