var scriptName = "ABlock";
var scriptVersion = 0.1;
var scriptAuthor = "Aftery";

var ItemRenderer = Java.type("net.minecraft.client.renderer.ItemRenderer");
var AItemRenderer = new (Java.extend(ItemRenderer))(mc) {
	func_78440_a: function(partialTicks) {
		//how to call superclass method is left out as an exercise for the reader, of course.
	}
};
var itemRenderer = mc.entityRenderer.class.getDeclaredField("field_78516_c");
var itemRenderer.set(mc.entityRenderer, AItemRenderer);

function Module1() {
    this.getName = function() {
        return "ABlock";
    };
	this.getTag = function() {
		return "";
	};
    this.getDescription = function() {
        return "ABlock";
    };
    this.getCategory = function() {
        return "Fun";
    } ;