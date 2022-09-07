var scriptName = "Fast Play";
var scriptAuthor = "Wu_dian";
var scriptVersion = 1.2;

function ExampleModule() {
	var modelist = value.createList("FastPlay Mode", ["BedWars_1v1", "BedWars_2v2", "BedWars_3v3","BedWars_4v4", "SkyWars_Solo", "SkyWars_Solo_Insane","SkyWars_Solo_LuckyBlock","SkyWars_Team","SkyWars_Team_Insane","SkyWars_Team_LuckyBlock","SurivialGames_Solo","SurivialGames_Team","MiniWalls"], "SkyWars_Solo");
    this.getName = function() {
        return "FastPlay";
    }
    this.getDescription = function() {
        return "FastPlay";
    }
    this.getCategory = function() {
        return "Fun"; 
    }
	this.addValues = function(values) {
        values.add(modelist);
    }
    this.onEnable = function() {
		
	switch (modelist.get()){
	   case"BedWars_1v1":
	   mc.thePlayer.sendChatMessage("/play bedwars_eight_one");
	   chat.print("§7[§eFast §bPlay §aEnable!§7]");
	   break;
	   case"BedWars_2v2":
	   mc.thePlayer.sendChatMessage("/play bedwars_eight_two");
	   chat.print("§7[§eFast §bPlay §aEnable!§7]");
	   break;
	   case"BedWars_3v3":
	   mc.thePlayer.sendChatMessage("/play bedwars_four_three");
	   chat.print("§7[§eFast §bPlay §aEnable!§7]");
	   break;
	   case"BedWars_4v4":
	   mc.thePlayer.sendChatMessage("/play bedwars_four_four");
	   chat.print("§7[§eFast §bPlay §aEnable!§7]");
	   break;
	   case"SkyWars_Solo":
	   mc.thePlayer.sendChatMessage("/play solo_normal");
	   chat.print("§7[§eFast §bPlay §aEnable!§7]");
	   break;
	   case"SkyWars_Solo_Insane":
	   mc.thePlayer.sendChatMessage("/play solo_insane");
	   chat.print("§7[§eFast §bPlay §aEnable!§7]");
	   break;
	   case"SkyWars_Solo_LuckyBlock":
	   mc.thePlayer.sendChatMessage("/play solo_insane_lucky");
	   chat.print("§7[§eFast §bPlay §aEnable!§7]");
	   break;
	   case"SkyWars_Team":
	   mc.thePlayer.sendChatMessage("/play teams_normal");
	   chat.print("§7[§eFast §bPlay §aEnable!§7]");
	   break;
	   case"SkyWars_Team_Insane":
	   mc.thePlayer.sendChatMessage("/play teams_insane");
	   chat.print("§7[§eFast §bPlay §aEnable!§7]");
	   break;
	   case"SkyWars_Team_LuckyBlock":
	   mc.thePlayer.sendChatMessage("/play teams_insane_lucky");
	   chat.print("§7[§eFast §bPlay §aEnable!§7]");
	   break;
	   case"SurivialGames_Solo":
	   mc.thePlayer.sendChatMessage("/play blitz_solo_normal");
	   chat.print("§7[§eFast §bPlay §aEnable!§7]");
	   break;
	   case"SurivialGames_Team":
	   mc.thePlayer.sendChatMessage("/play blitz_teams_normal");
	   chat.print("§7[§eFast §bPlay §aEnable!§7]");
	   break;
	   case"MiniWalls":
	   mc.thePlayer.sendChatMessage("/play arcade_mini_walls");
	   chat.print("§7[§eFast §bPlay §aEnable!§7]");
	   break;
   }
    }
    this.onDisable = function() {
    }

    this.onUpdate = function() {
	commandManager.executeCommand(".t FastPlay");
    }
}
var exampleModule = new ExampleModule();
var exampleModuleClient;

function onLoad() {}

function onEnable() {
    exampleModuleClient = moduleManager.registerModule(exampleModule);
}

function onDisable() {
    moduleManager.unregisterModule(exampleModuleClient);
}