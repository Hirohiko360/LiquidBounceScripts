/// api_version=2
var script = registerScript({
    name: "STargetInfo",
    version: "1.4.0",
    authors: ["6Sence"]
});

var player = Java.type("net.minecraft.entity.player.EntityPlayer");
Color = Java.type("java.awt.Color");
var GlStateManager = Java.type("net.minecraft.client.renderer.GlStateManager")
var RenderHelper = Java.type("net.minecraft.client.renderer.RenderHelper")
var OpenGlHelper = Java.type("net.minecraft.client.renderer.OpenGlHelper")
var Fonts = Java.type("net.ccbluex.liquidbounce.ui.font.Fonts");
var GL11 = Java.type("org.lwjgl.opengl.GL11");
var ScaledResolution = Java.type("net.minecraft.client.gui.ScaledResolution");

script.registerModule({
    name: "STargetInfo",
    category: "Render",
    description: "Modern TargetInfo made by 6Sence <3.",
    settings: {
        AlwaysShow: Setting.boolean({
            name: "AlwaysShow",
            default: false
        }),
        Optimisations: Setting.boolean({
            name: "Optimisations",
            default: true
        }),
        MustAttack: Setting.boolean({
            name: "MustAttack",
            default: false
        }),
        AnimationSpeed: Setting.float({
            name: "AnimationSpeed",
            min: 0.5,
            max: 3,
            default: 1.4
        }),
        ComplementaryColor: Setting.list({
            name: "ComplementaryColor",
            values: ["Red", "Green", "Blue", "Aftery", "Purple", "White"],
            default: "Green"
        }),
        ColorBreathing: Setting.boolean({
            name: "ColorBreathing",
            default: true
        }),
        NameUsesComplementaryColor: Setting.boolean({
            name: "NameUsesComplementaryColor",
            default: false
        })
    }
}, function (module) {
    module.on("enable", function () {
        dropShadowSpacing = 0.7;
        target = null;
        entity = null;

        posX = 400;

        animationSpeed = 10;

        displayHealth = 0;

        targetOnGround = true;
        TargetDistance = null;
        targetHurtTime = 0;

        ColourAddition = 0;
        ColourBreathingOffset = 0;
        RightLeft = true;

        mcHeight = 100;
        mcWidth = 100;
        currenthealth = 0;
        maxhealth = 1;
        playerInfo = 0;
        targetPing = 0;

        //HealthBar Colours
        Purple = new Color(84, 30, 97).getRGB();
        Blue = new Color(32, 45, 99).getRGB();
        Green = new Color(45, 214, 45).getRGB();
        Red = new Color(190, 0, 0).getRGB();
        White = new Color(255, 255, 255).getRGB();
        Aftery = new Color(255, 160, 255).getRGB();
    });

    module.on("attack", function (event) {
        var entity = event.getTargetEntity();
        target = entity;
    });

    module.on("update", function () {
        if (target != null){
            if (target.onGround) {
                targetOnGround = "OnGround";
            } else {
                targetOnGround = "OffGround";
            }
        }

        //Optimise this code it's kinda trash
        if (module.settings.ColorBreathing.get() && module.settings.ComplementaryColor.get() != "White") {
            if (RightLeft) {
                ColourAddition++;
            } else {
                ColourAddition--;
            }
            if (ColourAddition >= 30) {
                RightLeft = false;
            }
            if (ColourAddition <= 0) {
                RightLeft = true;
            }
        }
        if (!module.settings.ColorBreathing.get()) {
            ColourAddition = 0;
        }

        //Added for supporting colors that don't have room for color breathing.
        if (module.settings.ComplementaryColor.get() == "Aftery") {
            ColourBreathingOffset = -ColourAddition;
        } else {
            ColourBreathingOffset = ColourAddition;
        }
        //////////////////////////////////////
        //Gathering less important information less often
        if (target != null){
            if (mc.thePlayer.ticksExisted % 40 == 0 || mc.thePlayer.ticksExisted == 0) {
                mcHeight = getScaledHeight();
                mcWidth = getScaledWidth();
                maxhealth = target.getMaxHealth();
                playerInfo = mc.getNetHandler().getPlayerInfo(target.getUniqueID());
                targetPing = playerInfo == null ? "0 ms" : playerInfo.getResponseTime() + " ms";
            }
            if (mc.thePlayer.ticksExisted % 5 == 0) {
                currenthealth = target.getHealth().toFixed(0);
            }
            if (mc.thePlayer.ticksExisted % 2 == 0){
                TargetDistance = target.getDistanceToEntity(mc.thePlayer).toFixed(1);
                if (TargetDistance > 10) {
                    TargetDistance = "10+";
                }
            }
            targetHurtTime = target.hurtTime;
        }
        ////////////////////////

        switch (module.settings.ComplementaryColor.get()) {
            case "White":
                ComplementaryColor = White;
                ColourAddition = 0;
                break;
            case "Red":
                ComplementaryColor = Red;
                break;
            case "Green":
                ComplementaryColor = Green;
                break;
            case "Blue":
                ComplementaryColor = Blue;
                break;
            case "Aftery":
                ComplementaryColor = Aftery;
                break;
            case "Purple":
                ComplementaryColor = Purple;
                break;
            default:
        }
    });

    module.on("render2D", function (eventData) {
        PartialTicks = 1 - eventData.getPartialTicks();
        if (target != null) {
            animationSpeed = posX / 10 + 0.0005 /*Stops postion from going really small*/ ;
            if (module.settings.MustAttack.get() && mc.thePlayer.isSwingInProgress || !module.settings.MustAttack.get() && target != null && target.getDistanceToEntity(mc.thePlayer) < 7 && !target.isDead || module.settings.AlwaysShow.get()) {
                if (posX > 0) {
                    posX = posX - animationSpeed * module.settings.AnimationSpeed.get() * PartialTicks;
                }
            } else if (!module.settings.AlwaysShow.get()) {
                if (posX < mcWidth) {// (posX < mcWidth) is used to check if the targetgui is offscreen
                    posX = posX + animationSpeed * 1.3 * module.settings.AnimationSpeed.get() * PartialTicks;
                }
            }

            offSetWidth = mcWidth / 2 + 46 + posX;
            offSetHeight = mcHeight / 2 + 40;

            if (displayHealth - 1 > (toPercent(currenthealth, maxhealth) * 1.4)) {
                displayHealth = displayHealth - 1 * module.settings.AnimationSpeed.get() * PartialTicks;
            } else if (displayHealth + 1 < (toPercent(currenthealth, maxhealth) * 1.4)) {
                displayHealth = displayHealth + 1 * module.settings.AnimationSpeed.get() * PartialTicks;
            }

            //BackGround
            drawRect(offSetWidth, offSetHeight, mcWidth / 2 + 200 + posX, mcHeight / 2 + 100, 0xC0000000);
            for (i = 1; i < 5; i++) {
                if (posX < mcWidth) {
                    drawRect(offSetWidth - dropShadowSpacing * i, offSetHeight - dropShadowSpacing * i, mcWidth / 2 + 200 + posX + dropShadowSpacing * i, mcHeight / 2 + 100 + dropShadowSpacing * i, 0x1A000000);
                } else if (!module.settings.Optimisations.get()) {
                    drawRect(offSetWidth - dropShadowSpacing * i, offSetHeight - dropShadowSpacing * i, mcWidth / 2 + 200 + posX + dropShadowSpacing * i, mcHeight / 2 + 100 + dropShadowSpacing * i, 0x1A000000);
                }
            }

            //TargetEntityName
            if (module.settings.NameUsesComplementaryColor.get()) {
                Fonts.font40.drawString(target.getName(), offSetWidth + 5, offSetHeight + 5, ComplementaryColor + ColourBreathingOffset * 5);
            } else {
                Fonts.font40.drawString(target.getName(), offSetWidth + 5, offSetHeight + 5, White);
            }

            //Drawing entity
            drawEntityOnScreen(offSetWidth + 14, offSetHeight + 55, 20.3, target.rotationYaw, target.rotationPitch, target);

            //Health bar
            drawRect(offSetWidth + 33, offSetHeight + 50, offSetWidth + displayHealth, offSetHeight + 4 + 50, ComplementaryColor + ColourBreathingOffset * 5);


            //Other informtion
            Fonts.font40.drawString(TargetDistance + "  |  " + targetOnGround + "  |  Hurt " + targetHurtTime, offSetWidth + 33, offSetHeight + 18, White);
            Fonts.font40.drawString("Ping " + targetPing, offSetWidth + 33, offSetHeight + 30, White);
        }
    });
});



function drawEntityOnScreen(posX, posY, scale, mouseX, mouseY, ent) {
    GlStateManager.enableColorMaterial();
    GlStateManager.pushMatrix();
    GlStateManager.translate(posX, posY, 50.0);
    GlStateManager.scale((-scale), scale, scale);
    GlStateManager.rotate(180.0, 0.0, 0.0, 1.0);
    GlStateManager.rotate(135.0, 0.0, 1.0, 0.0);
    RenderHelper.enableStandardItemLighting();
    GlStateManager.rotate(-135.0, 0.0, 1.0, 0.0);
    GlStateManager.translate(0.0, 0.0, 0.0);
    rendermanager = mc.getRenderManager();
    rendermanager.setPlayerViewY(180.0);
    rendermanager.setRenderShadow(false);
    rendermanager.renderEntityWithPosYaw(ent, 0.0, 0.0, 0.0, 0.0, 1.0);
    rendermanager.setRenderShadow(true);
    GlStateManager.popMatrix();
    RenderHelper.disableStandardItemLighting();
    GlStateManager.disableRescaleNormal();
    GlStateManager.setActiveTexture(OpenGlHelper.lightmapTexUnit);
    GlStateManager.disableTexture2D();
    GlStateManager.setActiveTexture(OpenGlHelper.defaultTexUnit);
}

function toPercent(num, total) {
    return (Math.round(num / total * 10000) / 100);
}

function getScaledWidth() {
    var scaledWidth = new ScaledResolution(mc).getScaledWidth();

    return scaledWidth;
}

function getScaledHeight() {
    var scaledHeight = new ScaledResolution(mc).getScaledHeight();

    return scaledHeight;
}

function drawRect(paramXStart, paramYStart, paramXEnd, paramYEnd, color) {
    var alpha = (color >> 24 & 0xFF) / 255;
    var red = (color >> 16 & 0xFF) / 255;
    var green = (color >> 8 & 0xFF) / 255;
    var blue = (color & 0xFF) / 255;

    GL11.glEnable(GL11.GL_BLEND);
    GL11.glDisable(GL11.GL_TEXTURE_2D);
    GL11.glBlendFunc(GL11.GL_SRC_ALPHA, GL11.GL_ONE_MINUS_SRC_ALPHA);
    GL11.glEnable(GL11.GL_LINE_SMOOTH);

    GL11.glPushMatrix();
    GL11.glColor4f(red, green, blue, alpha);
    GL11.glBegin(GL11.GL_TRIANGLE_FAN);
    GL11.glVertex2d(paramXEnd, paramYStart);
    GL11.glVertex2d(paramXStart, paramYStart);
    GL11.glVertex2d(paramXStart, paramYEnd);
    GL11.glVertex2d(paramXEnd, paramYEnd);

    GL11.glEnd();
    GL11.glPopMatrix();

    GL11.glEnable(GL11.GL_TEXTURE_2D);
    GL11.glDisable(GL11.GL_BLEND);
    GL11.glDisable(GL11.GL_LINE_SMOOTH);

    GL11.glColor4f(1, 1, 1, 1);
}