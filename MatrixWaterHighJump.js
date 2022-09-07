var script = registerScript({
    name: "MatrixWaterHighJump",
    version: "0.0.0",
    authors: ["Shurpe"],
});
script.registerModule({
    name: "MatrixWaterHighJump",
    category: "Misc", 
    description: "",
    settings: {
        jumpH: Setting.float({
            name: "Jump height",
            default: 7,
			min: 4,
			max: 10
        })
    }
}, function (module) {
    module.on("update", function () {
        if (mc.thePlayer.isInWater()) {
            if (mc.theWorld.getBlockState(new BlockPos(mc.thePlayer.posX, mc.thePlayer.posY + 1, mc.thePlayer.posZ)).getBlock() == Block.getBlockById(9)) {
                mc.thePlayer.motionY = 0.18
            } else if (mc.theWorld.getBlockState(new BlockPos(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ)).getBlock() == Block.getBlockById(9)) {
                mc.thePlayer.motionY = module.settings.jumpH.get()
                mc.thePlayer.onGround = 1
            }
        }
    });
});

var BlockPos = Java.type('net.minecraft.util.BlockPos');
var Block = Java.type('net.minecraft.block.Block');