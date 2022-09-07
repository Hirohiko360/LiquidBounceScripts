if (mc.thePlayer.motionY < 0){
                mc.thePlayer.motionY += 2.00;
            }
if (mc.thePlayer.onGround) {
                u.setGround(true);
                mc.thePlayer.createAndSendC04(mc.thePlayer.posX, mc.thePlayer.posY +45, mc.thePlayer.posZ, false);
                mc.thePlayer.createAndSendC04(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false);
                mc.thePlayer.motionY = 45;
                return;
            }
 Speed.setSpeed(1);
            mc.thePlayer.jumpMovementFactor = 0.7;
            mc.timer.timerSpeed = 1;


}
