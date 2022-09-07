/// api_version=2
var script = registerScript({
    name: "AACLongJump",
    version: "1.4.1",
    authors: ["Nvaros"]
});

var jumpstate;
var collideReset;
var g;
var hasReset;

script.registerModule({
    name: "AACLongJump",
    description: "Vehicle LongJump for any AAC version above AAC 3.3.13.",
    category: "Movement",
    settings: {
        JumpMode: Setting.list({
            name: "Mode",
            default: "Normal",
			values: ["Normal", "AAC3Velo", "AAC3OnGround"]
        }),
		HBoost: Setting.float({
            name: "HBoost",
            default: 5.0,
			min: 3.0,
			max: 9.9
        }),
		VBoost: Setting.float({
            name: "VBoost",
            default: 0.42,
			min: 0.0,
			max: 9.9
        }),
		OnGroundBoost: Setting.float({
            name: "OnGroundBoost",
            default: 6.0,
			min: 3.0,
			max: 9.9
        }),
		ActionOnCollide: Setting.list({
            name: "ActionOnCollide",
            default: "None",
			values: ["None", "ResetMotion", "CancelVelo"]
        }),
		AutoDestroyBoats: Setting.boolean({
            name: "AutoDestroyBoats",
            default: false
        })	
	}  
}, function (module) {
    module.on("enable", function () {
		g = 0;
		jumpstate = 0;
		collideReset = false;     
    });
	
	module.on("disable", function () {
 		mc.thePlayer.motionX = 0;
		mc.thePlayer.motionZ = 0;       
    });
	
	module.on("packet", function (event) {
		var packet = event.getPacket();
		if (packet instanceof S08 && jumpstate == 1 && mc.thePlayer.onGround) {
			jumpstate = 0;
			mc.thePlayer.motionX = 0;
			mc.thePlayer.motionZ = 0;
		}
		
		if (packet instanceof S12 && packet.getEntityID() == mc.thePlayer.getEntityId() && hasReset && module.settings.ActionOnCollide.get() == "CancelVelo") {
			hasReset = false;
			event.cancelEvent();
		}      
    });

    module.on("move", function (event) {
      	if (jumpstate == 1 && !mc.thePlayer.onGround) {
			event.setX(0);
			event.setZ(0);
		}
    });
	
	module.on("update", function () {
 		var playerYaw = Math.radians(mc.thePlayer.rotationYaw);
		if (mc.thePlayer.isRiding()) {
			jumpstate = 1;
		} else if (module.settings.JumpMode.get() != "AAC3OnGround") { 
			if (jumpstate == 1 && (module.settings.JumpMode.get() == "AAC3Velo" ? mc.thePlayer.onGround : true)) {
				jumpstate = 0;
				collideReset = true;
				mc.thePlayer.motionX = module.settings.HBoost.get() * -Math.sin(playerYaw);
				mc.thePlayer.motionZ = module.settings.HBoost.get() * Math.cos(playerYaw);
				mc.thePlayer.motionY = module.settings.VBoost.get();
			} else if (mc.thePlayer.onGround && jumpstate == 0) {
				collideReset = false;
			}
			
		
		} else if (jumpstate == 1 && mc.thePlayer.onGround) {
			mc.thePlayer.motionX = (module.settings.OnGroundBoost.get() - 0.2 * g) * -Math.sin(playerYaw);
			mc.thePlayer.motionZ = (module.settings.OnGroundBoost.get() - 0.2 * g) * Math.cos(playerYaw);
			if (mc.thePlayer.isCollidedHorizontally || (module.settings.OnGroundBoost.get() - 0.2 * g) < 0.4) {
				mc.getNetHandler().addToSendQueue(new C04(mc.thePlayer.posX + 51, mc.thePlayer.posY, mc.thePlayer.posZ, false));
				jumpstate = 0;
				g = 0;
			} else {
				g++;
			}
		}
	
	
		if (mc.thePlayer.isCollidedHorizontally && module.settings.ActionOnCollide.get() != "None" && collideReset) {
			mc.thePlayer.motionX = 0;
			mc.thePlayer.motionZ = 0;
			collideReset = false;
			if (module.settings.ActionOnCollide.get() == "CancelVelo") {
				mc.getNetHandler().addToSendQueue(new C04(mc.thePlayer.posX + 50, mc.thePlayer.posY, mc.thePlayer.posZ, false));
				hasReset = true;
			}
			
		}
		
		if (jumpstate == 1 && module.settings.AutoDestroyBoats.get() && !mc.thePlayer.isRiding()) {
			destroyBoats();
		}     
    });
});

var C04 = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition");
var S08 = Java.type('net.minecraft.network.play.server.S08PacketPlayerPosLook');
var S12 = Java.type('net.minecraft.network.play.server.S12PacketEntityVelocity');

Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
};
  
function destroyBoats() {
	var EntityBoat = Java.type('net.minecraft.entity.item.EntityBoat');
	var elist = mc.theWorld.loadedEntityList;
	
	for (var j in elist) {
		if (elist[j] instanceof EntityBoat && mc.thePlayer.getDistanceToEntity(elist[j]) <= 2.2) {
			mc.thePlayer.swingItem();
			mc.playerController.attackEntity(mc.thePlayer, elist[j]);
			
		}
	}
}
