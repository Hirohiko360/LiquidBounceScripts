var scriptName = "Fake hackers"; 
var scriptVersion = 0.1; 
var scriptAuthor = "soulplexis";

var EntityLiving = Java.type('net.minecraft.entity.EntityLivingBase');
var EntityPlayer = Java.type('net.minecraft.entity.player.EntityPlayer');

var Module = new Module();
var ModuleClient;

 // Converts from degrees to radians.
 Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
  };
   
  // Converts from radians to degrees.
  Math.degrees = function(radians) {
    return radians * 180 / Math.PI;
  };
  
function randomIntFrom(min,max) // Get a random integer from [min] to [max] 
{
    return Math.floor(Math.random()*(max-min+1)+min);
} 

function Module() {
	var FakeFly = value.createBoolean("FakeFly", false);
	var VDistance = value.createFloat("VerticalDisplacement", 0.2, -1, 1);
	var HDistance = value.createFloat("HorizontalDisplacement", 0, -1, 1);
	var Vertical = value.createBoolean("Vertical", false);
	var Horizontal = value.createBoolean("Horizontal", true);
	var IncludeMobs = value.createBoolean("IncludeMobs", false);
	var FakeDerp = value.createBoolean("FakeSpin", false);
	var FakeDerpPitch = value.createBoolean("FakeSpinPitch", false);
	var Spinspeed = value.createFloat("Spinspeed", 1, 0, 180);
    this.getName = function() {
        return "FakeHackers";
    };

    this.getDescription = function() {
        return "Makes other players cheat.";
    };

    this.getCategory = function() {
        return "Exploit";
    };
	this.onEnable = function() {
	}
	this.onUpdate = function() {
	}
    this.onMotion= function () {
	 for (var x in mc.theWorld.loadedEntityList) {
		var entities = mc.theWorld.loadedEntityList[x];
		var f = mc.thePlayer.getDistanceToEntity(entities);
		if(entities != null && entities != mc.thePlayer && entities instanceof EntityPlayer && ((IncludeMobs.get() && entities instanceof EntityLiving) || IncludeMobs.get() == false)) {
	    	if(FakeDerp.get()) {
				entities.rotationYaw += Spinspeed.get();
				if(FakeDerpPitch.get()) {
				entities.rotationPitch =  randomIntFrom(-90,90);
				}
	    	}
	    	if(FakeFly.get()) {
              		if(Horizontal.get()) {
                 		entities.posX = (entities.posX - (Math.sin(Math.radians(entities.rotationYaw)) * HDistance.get() / 10)) 
	                	entities.posZ = (entities.posZ + (Math.cos(Math.radians(entities.rotationYaw)) * HDistance.get() / 10)) 
     	        	}
             		if(Vertical.get()) {
             		entities.posY = entities.posY + VDistance.get() / 100;
             		}
	        	}
	    	}
    	}
	}
	this.onUpdate = function() {
	}

    this.onDisable = function() {
    }
	
	this.addValues = function(values) {
		values.add(FakeFly);
		values.add(Horizontal);
        values.add(HDistance);
		values.add(Vertical);
		values.add(VDistance);
		values.add(IncludeMobs);
		values.add(FakeDerp);
		values.add(FakeDerpPitch);
		values.add(Spinspeed);
    }
}


function onLoad() {
};

function onEnable() {
    ModuleClient = moduleManager.registerModule(Module);
};

function onDisable() {
    moduleManager.unregisterModule(ModuleClient);
};