var script = registerScript({
    name: "MatrixScaffold",
    version: "1.0",
    authors: ["As丶One"]
});
script.registerModule({
    name: "MatrixScaffold",
    description: "MatrixScaffold By As丶One",
    category: "Fun"
}, function (module) {
    var EnumFacing = Java.type("net.minecraft.util.EnumFacing")
    var Rotation = Java.type("net.ccbluex.liquidbounce.utils.Rotation")
    var Vec3 = Java.type("net.minecraft.util.Vec3")
    var RotationUtils = Java.type("net.ccbluex.liquidbounce.utils.RotationUtils")
    var BlockPos = Java.type("net.minecraft.util.BlockPos")
    var canPlace = false
    module.on("update", function () {
        mc.gameSettings.keyBindSneak.pressed = false
        RotationUtils.setTargetRotation(new Rotation(mc.thePlayer.rotationYaw, 90))
        if (mc.theWorld.getBlockState(underBlock = new BlockPos(mc.thePlayer.posX, mc.thePlayer.posY - 1, mc.thePlayer.posZ)).getBlock().getMaterial().isReplaceable()) {
            [EnumFacing.NORTH, EnumFacing.SOUTH, EnumFacing.WEST, EnumFacing.EAST].forEach(function (face) {
                if (!mc.theWorld.getBlockState(underBlock.add(face.getDirectionVec())).getBlock().getMaterial().isReplaceable()) {
                    if (canPlace) {
                        canPlace = false
                        mc.playerController.onPlayerRightClick(mc.thePlayer, mc.theWorld, mc.thePlayer.getHeldItem(), underBlock.add(face.getDirectionVec()), face.getOpposite(), new Vec3(0.5, 0.5, 0.5))
                        mc.thePlayer.swingItem()
                    } else mc.gameSettings.keyBindSneak.pressed = canPlace = true
                }
            })
        }
    });
}); //简单的直线搭路 粗制滥造 几十分钟写的