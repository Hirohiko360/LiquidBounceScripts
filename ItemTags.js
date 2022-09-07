script = registerScript({
    name: "ItemTags",
    authors: ["MyScarlet"],
    version: "1.2"
});

script.import("Core.lib");
script.import("utils/RenderUtils.js");

module = {
    name: "ItemTags",
    category: "Render",
    description: "Show NameTag for EntityItem.",
    onRender3D: function () {
        var itemRendered = [];

        for each (var entity in mc.theWorld.loadedEntityList) {
            if (!(entity instanceof EntityItem) || ~itemRendered.indexOf(entity))
                continue;

            var itemAmount = new java.util.HashMap();

            for each (var entityItem in mc.theWorld.getEntitiesWithinAABB(EntityItem.class,
                new AxisAlignedBB(entity.posX, entity.posY, entity.posZ, entity.posX, entity.posY, entity.posZ).expand(1, 1, 1))) {
                if (~itemRendered.indexOf(entityItem))
                    continue;
                
                var stack = entityItem.getEntityItem();
                itemAmount[stack.getDisplayName()] += stack.stackSize;
                itemRendered.push(entityItem);
            }

            var font = mc.fontRendererObj;
            drawFaceToPlayer([entity.posX, entity.posY + 0.5, entity.posZ], function () {
                for (var itemName in itemAmount) {
                    var renderTag = itemName + " * " + itemAmount[itemName];
                    var width = font.getStringWidth(renderTag);
                    Gui.drawRect(-width * 0.5 - 2, -font.FONT_HEIGHT - 1, width * 0.5 + 2, 0, 0x7F000000);
                    font.drawString(renderTag, -width / 2, -font.FONT_HEIGHT, 0xFFFFFF);
                    GlStateManager.translate(0, -font.FONT_HEIGHT - 1, 0);
                }
            });
        }
    }
};
