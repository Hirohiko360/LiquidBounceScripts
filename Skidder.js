var scriptName = "Skidder"; 
var scriptVersion = 1.0; 
var scriptAuthor = "Skidder say it";

var justMonika = new JustMonika();
var justMonikaClient;

function JustMonika() {
    
    this.getName = function() {
        return "Skidder";
    };

    this.getDescription = function() {
        return "Skidder say it";
    };

    this.getCategory = function() {
        return "Misc";
    };

    this.onPacket = function() {
        chat.print("§b[§b§lStar] §fSkid cái lồn mẹ mày à !!!!");
        chat.print("§b[§b§lStar] §fwc !!");
    }
    this.onDisable = function() {
    }
}

function onLoad() {
};

function onEnable() {
    justMonikaClient = moduleManager.registerModule(justMonika);
};

function onDisable() {
    moduleManager.unregisterModule(justMonikaClient);
};