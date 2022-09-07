/// api_version=2
var script = registerScript({
        name: "HealthLog",
        version: "1.0",
        authors: ["ponei"]
    });

var ESP = Java.type("net.ccbluex.liquidbounce.features.module.modules.render.ESP");

var EntityOtherPlayerMP = Java.type("net.minecraft.client.entity.EntityOtherPlayerMP");
var EntityLivingBase = Java.type("net.minecraft.entity.EntityLivingBase");

var S1CPacketEntityMetadata = Java.type("net.minecraft.network.play.server.S1CPacketEntityMetadata");
var S19PacketEntityStatus = Java.type("net.minecraft.network.play.server.S19PacketEntityStatus");

var Byte = Java.type("java.lang.Byte");

var GlStateManager = Java.type("net.minecraft.client.renderer.GlStateManager");
var OpenGlHelper = Java.type("net.minecraft.client.renderer.OpenGlHelper");
var RenderHelper = Java.type("net.minecraft.client.renderer.RenderHelper");
var GL11 = Java.type("org.lwjgl.opengl.GL11");

script.registerModule({
    name: "HealthLog",
    description: "Show health modifications",
    category: "Render",
    settings: {
        Mode: Setting.list({
            name: "Mode",
        default:
            "Metadata",
            values: ["Animation", "Metadata"]
        }),
        ShadowTimer: Setting.integer({
            name: "Miliseconds before removing shadow",
        default:
            1000,
            min: 1,
            max: 2000
        }),
        LostSourceFunc: Setting.integer({
            name: "Lost health source blend func",
        default:
            2,
            min: 1,
            max: 15
        }),
        LostDestFunc: Setting.integer({
            name: "Lost health destination blend func",
        default:
            8,
            min: 1,
            max: 15
        }),
        GainSourceFunc: Setting.integer({
            name: "Gained health source blend func",
        default:
            2,
            min: 1,
            max: 15
        }),
        GainDestFunc: Setting.integer({
            name: "Gained health destination blend func",
        default:
            8,
            min: 1,
            max: 15
        })
    }
}, function (module) {

    module.on("disable", function () {
        shadowPlayers = [];
    });

    //creates shadow player
    function clonePlayer(targetPlayer, lostHealth) {
        var fakePlayer = new EntityOtherPlayerMP(mc.theWorld, targetPlayer.getGameProfile());
        //fakePlayer.getDataWatcher().updateObject(10, Byte.valueOf(targetPlayer.getDataWatcher().getWatchableObjectByte(10)));
        //^ gets second layer of the skin and cape, but cape gets all retarded

        //we set it to the same so interpolation doesnt make it jitter
        //yaw
        fakePlayer.prevRotationYaw = targetPlayer.rotationYaw;
        fakePlayer.rotationYaw = targetPlayer.rotationYaw;

        fakePlayer.prevRenderYawOffset = targetPlayer.renderYawOffset;
        fakePlayer.renderYawOffset = targetPlayer.renderYawOffset;

        fakePlayer.prevRotationYawHead = targetPlayer.rotationYawHead;
        fakePlayer.rotationYawHead = targetPlayer.rotationYawHead;

        //pitch
        fakePlayer.prevRotationPitch = targetPlayer.rotationPitch;
        fakePlayer.rotationPitch = targetPlayer.rotationPitch;

        fakePlayer.prevLimbSwingAmount = targetPlayer.limbSwingAmount;
        fakePlayer.limbSwingAmount = targetPlayer.limbSwingAmount;

        //arm swing
        fakePlayer.swingProgress = targetPlayer.swingProgress;
        fakePlayer.prevSwingProgress = targetPlayer.swingProgress;

        //pos and lasttickpos
        fakePlayer.lastTickPosX = targetPlayer.posX;
        fakePlayer.lastTickPosY = targetPlayer.posY;
        fakePlayer.lastTickPosZ = targetPlayer.posZ;

        fakePlayer.posX = targetPlayer.posX;
        fakePlayer.posY = targetPlayer.posY;
        fakePlayer.posZ = targetPlayer.posZ;

        //items
        for (var i = 0; 4 >= i; i++) {
            fakePlayer.setCurrentItemOrArmor(i, targetPlayer.getEquipmentInSlot(i));
        }

        //sneek
        fakePlayer.setSneaking(targetPlayer.isSneaking());

        //we only render the entity and dont push to it to world directly, since this would fuck around a lot of modules
        shadowPlayers.push([fakePlayer, targetPlayer.limbSwing, targetPlayer.limbSwingAmount, new Date().getTime(), lostHealth])
    }

    module.on("update", function () {
        removeOldShadows();
    });

    function removeOldShadows() {
        //shadow older than max ms get removed
        var now = new Date().getTime();
        for (var i = 0; shadowPlayers.length > i; i++) {
            if (now - shadowPlayers[i][3] > module.settings.ShadowTimer.get()) {
                shadowPlayers.splice(i, 1);
            }
        }
    }

    //gl blend funcs
    var funcs = [GL11.GL_ZERO, GL11.GL_ONE, GL11.GL_SRC_COLOR, GL11.GL_ONE_MINUS_SRC_COLOR, GL11.GL_DST_COLOR, GL11.GL_ONE_MINUS_DST_COLOR, GL11.GL_SRC_ALPHA, GL11.GL_ONE_MINUS_SRC_ALPHA, GL11.GL_DST_ALPHA, GL11.GL_ONE_MINUS_DST_ALPHA, GL11.GL_SRC_ALPHA_SATURATE, GL11.GL_CONSTANT_COLOR, GL11.GL_ONE_MINUS_CONSTANT_COLOR, GL11.GL_CONSTANT_ALPHA, GL11.GL_ONE_MINUS_CONSTANT_ALPHA];
    //(entity) ent, (float) limbswing, (float) limbswingamount, (date) time, (bool) lostHealth
    var shadowPlayers = [];

    module.on("render3D", function (event) {
        var partialTicks = event.getPartialTicks();
        for (var i = 0; shadowPlayers.length > i; i++) {
            //required to lightning to work properly
            RenderHelper.enableStandardItemLighting();

            //blend func
            GL11.glEnable(GL11.GL_BLEND);
            if (shadowPlayers[i][4]) { //if entity lost health
                GL11.glBlendFunc(funcs[module.settings.LostSourceFunc.get() - 1], funcs[module.settings.LostDestFunc.get() - 1]);
            } else { //entity gained health
                GL11.glBlendFunc(funcs[module.settings.GainSourceFunc.get() - 1], funcs[module.settings.GainDestFunc.get() - 1]);
            }

            //corrects limbswing
            shadowPlayers[i][0].limbSwing = shadowPlayers[i][1] + shadowPlayers[i][2] * (1 - partialTicks);

            //render shadow
            var renderManager = mc.getRenderManager();
			ESP.renderNameTags = false;
            renderManager.renderEntitySimple(shadowPlayers[i][0], partialTicks);
			ESP.renderNameTags = true;
            //disable shite
            RenderHelper.disableStandardItemLighting();

            GL11.glDisable(GL11.GL_BLEND);
            GL11.glBlendFunc(funcs[1], funcs[7]);
        }
    });
    module.on("packet", function (event) {
        var packet = event.getPacket();
        if (packet != null) {

            //packetentitymetadata contains info for entity health
            if (packet instanceof S1CPacketEntityMetadata) {
                if (module.settings.Mode.get() == "Metadata") {
                    //if entity exists
                    var ent = mc.theWorld.getEntityByID(packet.getEntityId());
                    if (ent != null) {
                        //get metadata
                        if (ent instanceof EntityOtherPlayerMP) { //ent instanceof EntityLivingBase
                            var meta = packet.func_149376_c();
                            if (meta != null) {
                                for (var i = 0; meta.size() > i; i++) {
                                    //valueid corresponds to health
                                    if (meta.get(i).getDataValueId() == 6) {
                                        //packet health isn't the same as current
                                        //this might happen when the player respawns
                                        if (ent.getHealth() != meta.get(i).getObject()) {
                                            //player cloned
                                            //changed health. true if player lost health (last health is higher than new health)
                                            clonePlayer(ent, ent.getHealth() > meta.get(i).getObject());
                                        }
                                    }
                                }
                            }
                        }
                    }

                }
            }
            //packetentitystatus contains info about animations of the entity
            //some servers block metadata containing health information, so this is a workaround
            if (packet instanceof S19PacketEntityStatus) {
                if (module.settings.Mode.get() == "Animation") {
                    //if entity exists
                    var ent = packet.getEntity(mc.theWorld);
                    if (ent != null) {
						//not player
                        if (ent != mc.thePlayer) {
                            //opcode for entity hit animation
                            if (packet.getOpCode() == 2) {
                                //can only assume the entity lost health
                                clonePlayer(ent, true);
                            }
                        }
                    }
                }
            }
        }
    });
});