var script=registerScript({name:"AACv4NoFall",version:"5.0",authors:["IdkWhoMe"]});var MovementUtils=Java.type("net.ccbluex.liquidbounce.utils.MovementUtils");var C03PacketPlayer=Java.type("net.minecraft.network.play.client.C03PacketPlayer");var fakespoof=false;var packetmodify=false;var AxisAlignedBB=Java.type("net.minecraft.util.AxisAlignedBB");var packets=[];script.registerModule({name:"AACv4NoFall",category:"Fun",description:"Allows you to avoid fall damage on AACv4.",},function(module){module.on("enable",function(){fakelag=false;packetmodify=false;});module.on("motion",function(event){var state=event.getEventState();if(state=="PRE"){if(!inVoid()){if(fakelag){fakelag=false;if(packets.length>0){for(var i=0;i<packets.length;i++){var packet=packets[i];mc.thePlayer.sendQueue.addToSendQueue(packet);}
packets=[];}}
return;}
if(mc.thePlayer.onGround&&fakelag){fakelag=false;if(packets.length>0){for(var i=0;i<packets.length;i++){var packet=packets[i];mc.thePlayer.sendQueue.addToSendQueue(packet);}
packets=[];}
return;}
if(mc.thePlayer.fallDistance>3&&fakelag){packetmodify=true;mc.thePlayer.fallDistance=0;}
if(inAir(4.0,1.0)){return;}
if(!fakelag){fakelag=true;}}});module.on("packet",function(event){var packet=event.getPacket();if(packet instanceof C03PacketPlayer&&fakelag){event.cancelEvent();if(packetmodify){packet.onGround=true;packetmodify=false;}
packets.push(packet);}});});function inVoid(){if(mc.thePlayer.posY<0){return false;}
for(var off=0;off<mc.thePlayer.posY+2;off+=2){var bb=new AxisAlignedBB(mc.thePlayer.posX,mc.thePlayer.posY,mc.thePlayer.posZ,mc.thePlayer.posX,off,mc.thePlayer.posZ);if(!mc.theWorld.getCollidingBoundingBoxes(mc.thePlayer,bb).isEmpty()){return true;}}
return false;}
function inAir(height,plus){if(mc.thePlayer.posY<0)
return false;for(var off=0;off<height;off+=plus){var bb=new AxisAlignedBB(mc.thePlayer.posX,mc.thePlayer.posY,mc.thePlayer.posZ,mc.thePlayer.posX,mc.thePlayer.posY-off,mc.thePlayer.posZ);if(!mc.theWorld.getCollidingBoundingBoxes(mc.thePlayer,bb).isEmpty()){return true;}}
return false;}