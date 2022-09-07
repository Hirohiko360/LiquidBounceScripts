var scriptName = "real gang shit";
var scriptVersion = 1.0;
var scriptAuthor = "Aftery142";

//external modules
//nothing

//external dependencies
var EntityPlayer = Java.type("net.minecraft.entity.player.EntityPlayer");

function Module1() {
    this.getName = function() {
        return "AHypixelAntibot";
    };
    this.getTag = function() {
        return "No u";
    };
    this.getDescription = function() {
        return "no u.";
    };
    this.getCategory = function() {
        return "Fun";
    };
	
    this.onMotion = function() {
		for (var i = 0; i < mc.theWorld.getLoadedEntityList().length; i++) {
			var ent = mc.theWorld.getLoadedEntityList()[i];
			if (!(ent instanceof EntityPlayer)) continue;
			if (ent.getName().contains("\u00A7") || (ent.hasCustomName() /*pCodenz*/ && ent.getCustomNameTag().contains(ent.getName()))) mc.theWorld.removeEntity(ent);
		}
	};
}
var modules = [
	new Module1()
];
function onEnable() {
	for (var i = 0; i < modules.length; i++) moduleManager.registerModule(modules[i]);
};
function onDisable() {
	for (var i = 0; i < modules.length; i++) moduleManager.unregisterModule(modules[i]);
};