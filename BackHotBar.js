/// api_version=2
var script = registerScript({
    name: "BackHotBar",
    authors: ["Asutoboki-kun"],
    version: "1.0.0"
});

var Minecraft = Java.type('net.minecraft.client.Minecraft');
var d = new Date();
var GL11 = Java.type("org.lwjgl.opengl.GL11");
var ScaledResolution = Java.type("net.minecraft.client.gui.ScaledResolution");
var Color = Java.type("java.awt.Color");

script.registerModule({
    name: "BackHotbar",
    category: "YandereDev",
    description: "Render a back hotbar for you LIKE ZeroDay b5.",
    settings: {
        advancedoption: Setting.boolean({
            name: "Advanced(Test)",
            default: false
        }),
        tall: Setting.integer({
            name: "Height",
            default: 23,
            min: 0,
            max: 100
        }),
        space: Setting.integer({
            name: "TextSpace",
            default: 10,
            min: 0,
            max: 15
        }),
        nonehere: Setting.text({
            name: "",
            default: "Advanced Settings:"
        }),
        RedBgClr: Setting.integer({
            name: "BackgroundRed",
            min: 0,
            max: 255,
            default: 0
        }),
        GreenBgClr: Setting.integer({
            name: "BackgroundGreen",
            min: 0,
            max: 255,
            default: 0
        }),
        BlueBgClr: Setting.integer({
            name: "BackgroundBlue",
            min: 0,
            max: 255,
            default: 0
        }),
        BgOpacity: Setting.integer({
            name: "BackgroundOpacity",
            min: 0,
            max: 255,
            default: 120
        }),
        CustomPrefixRed: Setting.integer({
            name: "CustomPrefixRed",
            min: 0,
            max: 255,
            default: 0
        }),
        CustomPrefixGreen: Setting.integer({
            name: "CustomPrefixGreen",
            min: 0,
            max: 255,
            default: 0
        }),
        CustomPrefixBlue: Setting.integer({
            name: "CustomPrefixBlue",
            min: 0,
            max: 255,
            default: 0
        }),
        CustomTextRed: Setting.integer({
            name: "CustomTextRed",
            min: 0,
            max: 255,
            default: 0
        }),
        CustomTextGreen: Setting.integer({
            name: "CustomTextGreen",
            min: 0,
            max: 255,
            default: 0
        }),
        CustomTextBlue: Setting.integer({
            name: "CustomTextBlue",
            min: 0,
            max: 255,
            default: 0
        })
    }
},
function (module) {
    module.on("enable", function() {});
    module.on("disable", function() {});
    module.on("update", function() {
        timestring = "§aTime: §f" + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
        datestring = "§aDate: §f" + ("0" + d.getMonth()).slice(-2) + "/" + ("0" + d.getDate()).slice(-2) + "/" + d.getFullYear();
        mcWidth = getScaledWidth();
        mcHeight = getScaledHeight();
        bgcolor = new Color(module.settings.RedBgClr.get(), module.settings.GreenBgClr.get(), module.settings.BlueBgClr.get(), module.settings.BgOpacity.get()).getRGB();
        prefixcolor = new Color(module.settings.CustomPrefixRed.get(), module.settings.CustomPrefixGreen.get(), module.settings.CustomPrefixBlue.get()).getRGB();
        textcolor = new Color(module.settings.CustomTextRed.get(), module.settings.CustomTextGreen.get(), module.settings.CustomTextBlue.get()).getRGB();
        containedposX = mc.fontRendererObj.getStringWidth("X: " + mc.thePlayer.posX.toFixed(0))
        containedposY = mc.fontRendererObj.getStringWidth(" Y: " + mc.thePlayer.posY.toFixed(0))
        containedposZ = mc.fontRendererObj.getStringWidth(" Z: " + mc.thePlayer.posZ.toFixed(0))
        containedfps = mc.fontRendererObj.getStringWidth("FPS: " + Minecraft.getDebugFPS().toFixed(0))
        containeddate = mc.fontRendererObj.getStringWidth("Date: " + ("0" + d.getMonth()).slice(-2) + "/" + ("0" + d.getDate()).slice(-2) + "/" + d.getFullYear())
        containedtime = mc.fontRendererObj.getStringWidth("Time: " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2))
    })
    module.on("render2D", function() {
        if (module.settings.advancedoption.get() == true) {
            drawRect(0, mcHeight - module.settings.tall.get(), mcWidth, mcHeight, bgcolor);
            mc.fontRendererObj.drawStringWithShadow("X: ", 3, mcHeight - module.settings.tall.get() + 3, prefixcolor);
            mc.fontRendererObj.drawStringWithShadow(mc.thePlayer.posX.toFixed(0), 3 + mc.fontRendererObj.getStringWidth("X: "), mcHeight - module.settings.tall.get() + 3, textcolor);
            mc.fontRendererObj.drawStringWithShadow(" Y: ", 3 + containedposX, mcHeight - module.settings.tall.get() + 3, prefixcolor);
            mc.fontRendererObj.drawStringWithShadow(mc.thePlayer.posY.toFixed(0), 3 + containedposX + mc.fontRendererObj.getStringWidth(" Y: "), mcHeight - module.settings.tall.get() + 3, textcolor);
            mc.fontRendererObj.drawStringWithShadow(" Z: ", 3 + containedposX + containedposY, mcHeight - module.settings.tall.get() + 3, prefixcolor);
            mc.fontRendererObj.drawStringWithShadow(mc.thePlayer.posZ.toFixed(0), 3 + containedposX + containedposY + mc.fontRendererObj.getStringWidth(" Z: "), mcHeight - module.settings.tall.get() + 3, textcolor);
            mc.fontRendererObj.drawStringWithShadow(Minecraft.getDebugFPS().toFixed(0), 3 + mc.fontRendererObj.getStringWidth("FPS: "), mcHeight - module.settings.tall.get() + 3 + module.settings.space.get(), textcolor);
            mc.fontRendererObj.drawStringWithShadow("FPS: ", 3, mcHeight - module.settings.tall.get() + 3 + module.settings.space.get(), prefixcolor);
            mc.fontRendererObj.drawStringWithShadow(mc.getNetHandler().getPlayerInfo(mc.thePlayer.getUniqueID()).getResponseTime(), 3 + containedfps + mc.fontRendererObj.getStringWidth(" Ping: "), mcHeight - module.settings.tall.get() + 3 + module.settings.space.get(), textcolor);
            mc.fontRendererObj.drawStringWithShadow(" Ping: ", 3 + containedfps, mcHeight - module.settings.tall.get() + 3 + module.settings.space.get(), prefixcolor);
            mc.fontRendererObj.drawStringWithShadow(("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2), mcWidth - 3 - mc.fontRendererObj.getStringWidth(("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)), mcHeight - module.settings.tall.get() + 3, textcolor);
            mc.fontRendererObj.drawStringWithShadow("Time: ", mcWidth - 3 - containedtime, mcHeight - module.settings.tall.get() + 3, prefixcolor);
            mc.fontRendererObj.drawStringWithShadow(("0" + d.getMonth()).slice(-2) + "/" + ("0" + d.getDate()).slice(-2) + "/" + d.getFullYear(), mcWidth - 3 - mc.fontRendererObj. getStringWidth(("0" + d.getMonth()).slice(-2) + "/" + ("0" + d.getDate()).slice(-2) + "/" + d.getFullYear()), mcHeight - module.settings.tall.get() + 3 + module.settings.space.get(), textcolor);
            mc.fontRendererObj.drawStringWithShadow("Date: ", mcWidth - 3 - containeddate, mcHeight - module.settings.tall.get() + 3 + module.settings.space.get(), prefixcolor);
        }
        if (module.settings.advancedoption.get() == false) {
            drawRect(0, mcHeight - module.settings.tall.get(), mcWidth, mcHeight, 0xC0000000);
            mc.fontRendererObj.drawStringWithShadow("§aX: §f" + mc.thePlayer.posX.toFixed(0) + " §aY: §f" + mc.thePlayer.posY.toFixed(0) + " §aZ: §f" + mc.thePlayer.posZ.toFixed(0), 3, mcHeight - module.settings.tall.get() + 3, 0xFFFFFF);
            mc.fontRendererObj.drawStringWithShadow("§aFPS: §f" + Minecraft.getDebugFPS().toFixed(0) + " §aPing: §f" + mc.getNetHandler().getPlayerInfo(mc.thePlayer.getUniqueID()).getResponseTime(), 3, mcHeight - module.settings.tall.get() + 3 + module.settings.space.get(), 0xFFFFFF);
            mc.fontRendererObj.drawStringWithShadow(timestring, mcWidth - mc.fontRendererObj.getStringWidth(timestring) - 3, mcHeight - module.settings.tall.get() + 3, 0xFFFFFF);
            mc.fontRendererObj.drawStringWithShadow(datestring, mcWidth - mc.fontRendererObj.getStringWidth(datestring) - 3, mcHeight - module.settings.tall.get() + 3 + module.settings.space.get(), 0xFFFFFF)
        }
    })
});

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
