/// api_version=1
var scriptName = "MatrixBotRemover";
var scriptAuthor = "Anonzme";
var scriptVersion = 3.0;

var EntityPlayer = Java.type("net.minecraft.entity.player.EntityPlayer");
var HashMap = Java.type("java.util.HashMap");
var ArrayList = Java.type("java.util.ArrayList");

var next;

var playerList;

var notAlwaysInRadius;
var xHash;
var zHash;

function isBot(entity, speed) {
	return entity != mc.thePlayer && 
	speed > 6.75 && 
    mc.thePlayer.getDistanceToEntity(entity) <= 5.0 &&
    within(entity.posY, mc.thePlayer.posY - 2, mc.thePlayer.posY + 2);
}

function within(n, mi, ma) {
	return n <= ma && n >= mi;
}

function MatrixBotRemoverModule() {
    this.getName = function() {
        return "MatrixBotRemover";
    };
    
    this.getDescription = function() {
        return "Remove the bots made by Matrix AntiCheat.";
    };
    
    this.getCategory = function() {
        return "Scripts";
    };
    
    this.onEnable = function() {
        next = false;

		notAlwaysInRadius = new ArrayList();
        playerList = new ArrayList(); // <EntityPlayer>
		
        xHash = new HashMap(); // <EntityPlayer, Double>
        zHash = new HashMap(); // <EntityPlayer, Double>
    };
	
	this.onMotion = function(motionEvent) {
		if (notAlwaysInRadius.size() > 10000)
			notAlwaysInRadius.clear();
		
		for (var i in mc.theWorld.getLoadedEntityList()) {
			var entity = mc.theWorld.getLoadedEntityList()[i];
			if (entity instanceof EntityPlayer && (mc.thePlayer.getDistanceToEntity(entity) > 16.0 || !within(entity.posY, mc.thePlayer.posY - 3, mc.thePlayer.posY + 3)) && !notAlwaysInRadius.contains(entity))
				notAlwaysInRadius.add(entity);
		}
	};
	
    this.onUpdate = function() {
        if (!next) {
            for (var i in mc.theWorld.getLoadedEntityList()) {
                var entity = mc.theWorld.getLoadedEntityList()[i];

                if (!(entity instanceof EntityPlayer) || notAlwaysInRadius.contains(entity))
                    continue;

                playerList.add(entity);

                xHash.put(entity, entity.posX);
                zHash.put(entity, entity.posZ);
            }
        } else {
            for (var i = 0; i < playerList.size(); ++i) {
                var entity = playerList.get(i);

                var xDiff = entity.posX - xHash.get(entity);
                var zDiff = entity.posZ - zHash.get(entity);

                var speed = Math.sqrt(xDiff * xDiff + zDiff * zDiff) * 10; // [blocks/1s] Sprint + Jump and no potion legit: 6.753686890703971
				
                if (speed != undefined && speed != NaN && isBot(entity, speed)) {
                    mc.theWorld.removeEntity(entity);
                    Chat.print("§8[§9§lMatrixBotRemover§8] §3操你妈,你个Matrix小假人被我抓住了吧 §a" + entity.getName() + "§3.");
                }
            }

            playerList.clear();
          
            xHash.clear();
            zHash.clear();
        }

        next = !next;
    };

    this.onDisable = function() {
        playerList.clear();

        xHash.clear();
        zHash.clear();
    };
}

var matrixBotRemoverModule = new MatrixBotRemoverModule();

function onEnable() {
    moduleManager.registerModule(matrixBotRemoverModule);
}

function onDisable() {
    moduleManager.unregisterModule(matrixBotRemoverModule);
}