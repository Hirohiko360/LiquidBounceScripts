var scriptName = "AntiKnockback";
var scriptVersion = 1.0;
var scriptAuthor = "Soulplexis";

var velocity = Java.type("net.minecraft.network.play.server.S12PacketEntityVelocity");
var explode = Java.type("net.minecraft.network.play.server.S27PacketExplosion");

function Module() {
	var Explosion = value.createBoolean("Explosion", true);
    this.getName = function () {
        return "AntiKnockback";
    };

    this.getDescription = function () {
        return "Removes knockback effects.";
    };

    this.getCategory = function () {
        return "Combat";
    };
    this.onUpdate = function () {
    } 
    this.onDisable = function() {
    }
    
    this.onEnable = function() {
    }
	this.onPacket = function(event) {
		var packet = event.getPacket();
            if (packet instanceof velocity) {
            event.cancelEvent();
            }
			if(Explosion.get() == true && (packet instanceof explode)) {
            event.cancelEvent();
            }
	}
    this.addValues = function(values) {
		values.add(Explosion);
    }
}
var Module = new Module();
var ModuleClient;

function onEnable() {
    ModuleClient = moduleManager.registerModule(Module);
};

function onDisable() {
    moduleManager.unregisterModule(ModuleClient);
};