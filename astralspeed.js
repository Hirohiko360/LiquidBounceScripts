var script=registerScript({name:"AstralSpeed",version:"1.0.0",authors:["Mimik"]});script.registerModule({name:"AstralSpeed",category:"Fun",description:"sac"},function(module){module.on("update",function(){if(mc.thePlayer.onGround){mc.thePlayer.motionY=0.14
VClip(0.14);}else{strafe(0.05);}});});function vClip(d){mc.thePlayer.setPosition(mc.thePlayer.posX,mc.thePlayer.posY+d,mc.thePlayer.posZ);}
function strafe(speed){var a=mc.thePlayer.rotationYaw*0.017453292;var l=mc.thePlayer.rotationYaw*0.017453292-Math.PI*1.5;var r=mc.thePlayer.rotationYaw*0.017453292+Math.PI*1.5;var rf=mc.thePlayer.rotationYaw*0.017453292+Math.PI*0.19;var lf=mc.thePlayer.rotationYaw*0.017453292+Math.PI*-0.19;var lb=mc.thePlayer.rotationYaw*0.017453292-Math.PI*0.76;var rb=mc.thePlayer.rotationYaw*0.017453292-Math.PI*-0.76;if(mc.gameSettings.keyBindForward.pressed){if(mc.gameSettings.keyBindLeft.pressed&&!mc.gameSettings.keyBindRight.pressed){mc.thePlayer.motionX-=(Math.sin(lf)*speed);mc.thePlayer.motionZ+=(Math.cos(lf)*speed);}else if(mc.gameSettings.keyBindRight.pressed&&!mc.gameSettings.keyBindLeft.pressed){mc.thePlayer.motionX-=(Math.sin(rf)*speed);mc.thePlayer.motionZ+=(Math.cos(rf)*speed);}else{mc.thePlayer.motionX-=(Math.sin(a)*speed);mc.thePlayer.motionZ+=(Math.cos(a)*speed);}}else if(mc.gameSettings.keyBindBack.pressed){if(mc.gameSettings.keyBindLeft.pressed&&!mc.gameSettings.keyBindRight.pressed){mc.thePlayer.motionX-=(Math.sin(lb)*speed);mc.thePlayer.motionZ+=(Math.cos(lb)*speed);}else if(mc.gameSettings.keyBindRight.pressed&&!mc.gameSettings.keyBindLeft.pressed){mc.thePlayer.motionX-=(Math.sin(rb)*speed);mc.thePlayer.motionZ+=(Math.cos(rb)*speed);}else{mc.thePlayer.motionX+=(Math.sin(a)*speed);mc.thePlayer.motionZ-=(Math.cos(a)*speed);}}else if(mc.gameSettings.keyBindLeft.pressed&&!mc.gameSettings.keyBindRight.pressed&&!mc.gameSettings.keyBindForward.pressed&&!mc.gameSettings.keyBindBack.pressed){mc.thePlayer.motionX+=(Math.sin(l)*speed);mc.thePlayer.motionZ-=(Math.cos(l)*speed);}else if(mc.gameSettings.keyBindRight.pressed&&!mc.gameSettings.keyBindLeft.pressed&&!mc.gameSettings.keyBindForward.pressed&&!mc.gameSettings.keyBindBack.pressed){mc.thePlayer.motionX+=(Math.sin(r)*speed);mc.thePlayer.motionZ-=(Math.cos(r)*speed);}}