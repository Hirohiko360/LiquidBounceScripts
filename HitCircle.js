var script = registerScript({
	name: "HitCircle",
	version: "1.0",
	authors: ["liulihaocai"]
}); 

var GL11=Java.type('org.lwjgl.opengl.GL11');
var Color = Java.type('java.awt.Color');
var EntityUtils = Java.type('net.ccbluex.liquidbounce.utils.EntityUtils');
var ColorUtils = Java.type('net.ccbluex.liquidbounce.utils.render.ColorUtils');
var RenderUtils=Java.type('net.ccbluex.liquidbounce.utils.render.RenderUtils');
var Float=Java.type('java.lang.Float')
var Integer=Java.type('java.lang.Integer')

script.registerModule({
	name: "HitCircle",
	description: "entity hit circle",
    category: "Render",
    settings: {
        radius: Setting.float({
            name: "Radius",
            default: 3,
            min: 0,
            max: 7
        }),
		col: Setting.list({
            name: "ColorMode",
            values: ["Custom","Rainbow","Distance","Health"],
            default: "Custom"
        }),
		accu: Setting.integer({
            name: "Accuracy",
            default: 10,
            min: 1,
            max: 180
        }),
		yoff: Setting.float({
            name: "YOffset",
            default: 0.3,
            min: -2,
            max: 2
        }),
		di: Setting.integer({
            name: "DistanceChange",
            default: 7,
            min: 0,
            max: 15
        }),
        r: Setting.integer({
            name: "Red",
            default: 255,
            min: 0,
            max: 255
        }),
		g: Setting.integer({
            name: "Green",
            default: 255,
            min: 0,
            max: 255
        }),
		b: Setting.integer({
            name: "Blue",
            default: 255,
            min: 0,
            max: 255
        }),
        dr: Setting.integer({
            name: "DMGRed",
            default: 190,
            min: 0,
            max: 255
        }),
		dg: Setting.integer({
            name: "DMGGreen",
            default: 0,
            min: 0,
            max: 255
        }),
		db: Setting.integer({
            name: "DMGBlue",
            default: 0,
            min: 0,
            max: 255
        })
    }
}, function (module) {
    var entities=[];
	
    module.on("update", function () {
        entities=[];
        var accu=module.settings.accu.get(),yoff=module.settings.yoff.get();
        for(var i in mc.theWorld.loadedEntityList){
            var entity = mc.theWorld.loadedEntityList[i]
            if(EntityUtils.isSelected(entity,true)){
                var entJson={links:[]};
                for(var j=0;j<=360;j+=accu){
                    entJson.links.push([(entity.posX - Math.sin(j * Math.PI / 180) * module.settings.radius.get()),
                        entity.posY+yoff,
                        (entity.posZ + Math.cos(j * Math.PI / 180) * module.settings.radius.get())])
                }
                entJson.links.push(entJson.links[0])
                //color
                switch(module.settings.col.get().toLowerCase()){
                    case "custom":{
                        entJson.color=(entity.hurtTime>0)?new Color(module.settings.dr.get(),module.settings.dg.get(),module.settings.db.get()):new Color(module.settings.r.get(),module.settings.g.get(),module.settings.b.get());
                        break;
                    }
                    case "rainbow":{
                        var rainbow=ColorUtils.rainbow();
                        entJson.color=(entity.hurtTime>0)?antiColor(rainbow):rainbow;
                        break;
                    }
                    case "distance":{
                        var dist = mc.thePlayer.getDistanceToEntity(entity)*module.settings.di.get();
                        entJson.color=new Color(new Integer(argCheck(255 - dist,0,255)), new Integer(argCheck(dist,0,255)), 0, 255);
                        if(entity.hurtTime>0){
                            entJson.color=antiColor(entJson.color);
                        }
                        break;
                    }
                    case "health":{
                        var colorHP=(entity.getHealth()/entity.getMaxHealth())*255;
                        entJson.color=new Color(new Integer(argCheck(255 - colorHP,0,255)), new Integer(argCheck(colorHP,0,255)),0, 255);
                        if(entity.hurtTime>0){
                            entJson.color=antiColor(entJson.color);
                        }
                        break;
                    }
                }
                entities.push(entJson);
            }
        }
    })

    module.on("render3D", function(eventData) {
        GL11.glPushMatrix()
        GL11.glDisable(GL11.GL_TEXTURE_2D)
        GL11.glBlendFunc(GL11.GL_SRC_ALPHA, GL11.GL_ONE_MINUS_SRC_ALPHA)
        GL11.glEnable(GL11.GL_LINE_SMOOTH)
        GL11.glEnable(GL11.GL_BLEND)
        GL11.glDisable(GL11.GL_DEPTH_TEST)

        mc.entityRenderer.disableLightmap()

        GL11.glBegin(GL11.GL_LINE_STRIP)
        
        var renderManager = mc.getRenderManager();
        var renderPosX = renderManager.viewerPosX
        var renderPosY = renderManager.viewerPosY
        var renderPosZ = renderManager.viewerPosZ

        for (var i in entities){
            var json=entities[i];
            GL11.glVertex3d(json.links[0][0] - renderPosX, json.links[0][1] - renderPosY, json.links[0][2] - renderPosZ)
            GL11.glColor4f(new Float(json.color.getRed()/255),new Float(json.color.getGreen()/255),new Float(json.color.getBlue()/255),1)
            for(var j in json.links){
                var pos=json.links[j];
                GL11.glVertex3d(pos[0] - renderPosX, pos[1] - renderPosY, pos[2] - renderPosZ)
            }
            GL11.glColor4f(0,0,0,0)
        }
        
        GL11.glEnd()
        GL11.glEnable(GL11.GL_DEPTH_TEST)
        GL11.glDisable(GL11.GL_LINE_SMOOTH)
        GL11.glDisable(GL11.GL_BLEND)
        GL11.glEnable(GL11.GL_TEXTURE_2D)
        GL11.glPopMatrix()
    });
})

function antiColor(color){
    return new Color(new Integer(255-color.getRed()),new Integer(255-color.getGreen()),new Integer(255-color.getBlue()));
}

function argCheck(num,min,max){
    if(num>max){
        return max;
    }
    if(num<min){
        return min;
    }
    return num;
}