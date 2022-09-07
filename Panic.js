var scriptName = "Panic";
var scriptAuthor = "Anastar";
var scriptVersion = 1.0;

var PanicModule = new PanicModule();
var Client;

function PanicModule() {
    this.getName = function() {
        return "Panic";
    };
    this.getDescription = function() {
        return "Disable all modules.";
    };
    this.getCategory = function() {
        return "Fun";
    };
    this.onEnable = function() {
        commandManager.executeCommand(".panic all");
    }
}


function onEnable() {
    PanicModuleClient = moduleManager.registerModule(PanicModule);
};

function onDisable() {
    PanicModuleManager.unregisterModule(PanicModuleClient);
};