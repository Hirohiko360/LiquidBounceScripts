var script=registerScript({name:"MarshScript",version:"1.1",authors:["Marshadow"]});var stage=0;var MU=Java.type('net.ccbluex.liquidbounce.utils.MovementUtils');script.registerModule({name:"yby360Fly2",description:"JS Flys",category:"Scripts",settings:{Mode:Setting.list({name:"Mode",default:"ShadowGuard",values:["ShadowGuardPearl","ShadowGuard","Astral","AstralMotion"]})}},function(module){module.on("enable",function(){if(module.settings.Mode.get()=="Astral"){mc.timer.timerSpeed=1.3;mc.thePlayer.motionX=0;mc.thePlayer.motionZ=0;var a=0;if(mc.theWorld.getCollidingBoundingBoxes(mc.thePlayer,mc.thePlayer.getEntityBoundingBox().offset(0,1.2,0).expand(0,0,0)).isEmpty()){for(var i=0;i<=10;++i){a+=0.41999;mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX,mc.thePlayer.posY+a,mc.thePlayer.posZ,false));}
mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX,mc.thePlayer.posY,mc.thePlayer.posZ,false));mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX,mc.thePlayer.posY,mc.thePlayer.posZ,true));}}});module.on("update",function(){switch(module.settings.Mode.get()){case "ShadowGuard":{mc.thePlayer.motionX*=0.8
mc.thePlayer.motionZ*=0.8
var test=0;if(mc.thePlayer.motionY<=-0.42)test=0.42;else test=-0.42;mc.thePlayer.motionY=test;break;}
case "ShadowGuardPearl":{mc.thePlayer.onGround=false;if(mc.thePlayer.hurtTime>1){mc.thePlayer.motionX=0;stage++;if(!mc.gameSettings.keyBindJump.pressed&&!mc.gameSettings.keyBindSneak.pressed){if(stage%2==0){mc.thePlayer.motionY=stage/50;}else{mc.thePlayer.motionY=-stage/50;}}else if(mc.gameSettings.keyBindJump.pressed){mc.thePlayer.motionY=7;}else if(mc.gameSettings.keyBindSneak.pressed){mc.thePlayer.motionY=-7;}
mc.thePlayer.motionZ=0;mc.thePlayer.speedInAir=0.02;MU.strafe(10);}else{mc.thePlayer.motionX=0;mc.thePlayer.motionZ=0;mc.thePlayer.speedInAir=0;}
break;}
case "Astral":{mc.thePlayer.capabilities.isFlying=true;if(mc.thePlayer.ticksExisted%2!=0){MU.strafe(0.2873);mc.thePlayer.motionY=-0.02;}else{MU.strafe(0.2873+mc.thePlayer.hurtTime/10);mc.thePlayer.motionY=-0.04;}
break;}
case "AstralMotion":{if(mc.thePlayer.ticksExisted%2!=0){MU.strafe(0.2873);mc.thePlayer.motionY=-0.02;}else{MU.strafe(0.2873+mc.thePlayer.hurtTime/10);mc.thePlayer.motionY=0.02;}
break;}}});module.on("disable",function(){mc.timer.timerSpeed=1
mc.thePlayer.speedInAir=0.02
MU.strafe(0)
mc.thePlayer.capabilities.isFlying=false;});});var speed=0;var C0A=Java.type('net.minecraft.network.play.client.C0APacketAnimation');var C03PacketPlayer=Java.type('net.minecraft.network.play.client.C03PacketPlayer');var C04PacketPlayerPosition=Java.type('net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition');script.registerModule({name:"MarshSpeed",description:"JS Speeds",category:"Movement",settings:{Mode:Setting.list({name:"Mode",default:"ShadowGuard",values:["ShadowGuard","Matrix"]})}},function(module){module.on("disable",function(){mc.timer.timerSpeed=1
mc.thePlayer.speedInAir=0.02});module.on("update",function(){switch(module.settings.Mode.get()){case "ShadowGuard":{if(mc.thePlayer.onGround){speed=0.35;mc.thePlayer.jump();}else{MU.strafe(speed);speed-=speed/157;}
break;}
case "Matrix":{mc.timer.timerSpeed=1;if(mc.thePlayer.onGround){mc.thePlayer.jump();}else{if(mc.thePlayer.fallDistance<0.3)
mc.timer.timerSpeed=1.3;}
break;}}});});