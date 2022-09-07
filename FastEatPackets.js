var scriptName = "FastUse";
var scriptAuthor = "By Virus";
var scriptVersion = 1.1;

var ItemFood = Java.type('net.minecraft.item.ItemFood');
var C03PacketPlayer = Java.type('net.minecraft.network.play.client.C03PacketPlayer');

function EatModule() {

    this.getName = function() {
        return "FastEatPackets";
    }

    this.getDescription = function() {
        return "Custom Packets"
    }

    this.getCategory = function() {
        return "Misc";

    }
    
    this.onUpdate = function() {
    	if (mc.thePlayer.isEating() && mc.thePlayer.getHeldItem().getItem() instanceof ItemFood) {
            if(mc.thePlayer.ticksExisted % 1 == 0) { //Custom Packets
                mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer(false));
            }
 
    	}

 //     if (mc.thePlayer.isEating() && mc.thePlayer.getHeldItem().getItem() instanceof ItemFood) {
    //      mc.timer.timerSpeed = 1.30; Opcional
 //     }else{
   //       mc.timer.timerSpeed = 1.0; Opcional
  //    }

        

    }

    this.onEnable = function() {
        
    }
    
    this.onDisable = function() {
    	mc.timer.timerSpeed = 1.0;

  
    }


}

var eatModule = new EatModule();
var eatModuleClient;

function onEnable() {
    eatModuleClient = moduleManager.registerModule(eatModule);
}

function onDisable() {
    moduleManager.unregisterModule(eatModuleClient);
}