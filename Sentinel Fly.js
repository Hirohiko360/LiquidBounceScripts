package wormyclient.hacks;

import org.lwjgl.input.Keyboard;

import net.minecraft.client.Minecraft;
import net.minecraft.network.play.client.CPacketPlayer;
import net.minecraft.network.play.client.CPacketPlayer.Position;
import wormyclient.modules.Category;
import wormyclient.modules.Module;

public class Fly extends Module {
	public Fly() {
		super("Fly", Category.MOVEMENT, Keyboard.KEY_G);
	}
	@Override 
	public void onEnable() {
		mc.timer.field_194149_e = 170f;
	}
	public void onUpdate() {
		double yaw = Math.toRadians(mc.player.rotationYaw);
		double x = -Math.sin(yaw) * 2.1;
		double z = Math.cos(yaw) * 2.1;
		mc.player.motionY = -0.5;
		mc.player.lastReportedPosY = 0;
		mc.player.onGround = false;
			if(mc.player.ticksExisted % 2 == 0 && mc.gameSettings.keyBindForward.pressed) {
				mc.player.setPosition(mc.player.posX + x, mc.player.posY + 1, mc.player.posZ + z);
			} else if(mc.player.ticksExisted % 2 == 0 && !mc.gameSettings.keyBindForward.pressed && !mc.player.onGround) {
				mc.player.setPosition(mc.player.posX, mc.player.posY + 1, mc.player.posZ);
				mc.player.speedInAir = 0f;
			} else {
				mc.player.speedInAir = 0.02f;
			}
		}
		public void onDisable() {
			mc.timer.field_194149_e = 50f;
			mc.player.onGround = false;
			mc.player.motionY = -0.5;
			mc.player.speedInAir = 0.02f;
		}
	
}