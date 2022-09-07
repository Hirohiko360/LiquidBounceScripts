var scriptName = "AttackCrit";
var scriptVersion = 1.0;
var scriptAuthor = "Gking";

var EntityPlayer = Java.type('net.minecraft.entity.player.EntityPlayer');
var C04PacketPlayerPosition = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition')
var AttackCrit = new AttackCrit();
var client;

function AttackCrit() {
var Mode = value.createList("Mode", ["AAC4HIT", "AAC4Packet", "Jump"], "AAC4HIT");
var MotionY = value.createFloat("CustomMotionY", 0, 0, 1);
var Timer = value.createFloat("TimerSpeed", 0, 0, 10);

this.getName = function() {
    return "AttackCrit";
};
this.getTag = function() {
    return "" + Mode.get();
};
this.getDescription = function() {
    return "AttackCrit";
};

this.getCategory = function() {
    return "Fun";
};
	this.addValues = function(values) {
				values.add(Mode);
									values.add(MotionY);
																			values.add(Timer);
}
this.onAttack = function (event) {
	if(event.getTargetEntity() instanceof EntityPlayer){
		entity = event.getTargetEntity();
	}
				    switch(Mode.get()) {
		    case "AAC4HIT":	 
                mc.thePlayer.onCriticalHit(entity)
					break;
								    case "AAC4Packet":	  //Maybe this one is unuseful
		mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer.C04PacketPlayerPosition(ma.thePlayer.posX, mc.thePlayer.posY + 0.0031311231111, mc.thePlayer.posZ, false))

					break;
								    case "Jump":	
			        	if(mc.thePlayer.onGround || isOnGround(0.5)){
					    			mc.thePlayer.jump();
                            mc.timer.timerSpeed = Timer.get();
                           mc.thePlayer.motionY = MotionY.get();
						}
						   break;
					}
};
}

function onLoad() {}

function onEnable() {
client = moduleManager.registerModule(AttackCrit);
}

function onDisable() {
moduleManager.unregisterModule(client);
}