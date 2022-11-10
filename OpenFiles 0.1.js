///engine_flags=--language=es6
var scriptName = "OpenFiles";
var scriptVersion = 0.1;
var scriptAuthor = "yby360";

var Desktop = Java.type("java.awt.Desktop");
var File = Java.type("java.io.File");
var C01PacketChatMessage = Java.type("net.minecraft.network.play.client.C01PacketChatMessage");

function OpenFiles() {

    this.getName = function () {
        return "OpenFiles";
    }

    this.getDescription = function () {
        return "OpenFiles-Module, By-mumy";
    }

    this.getCategory = function () {
        return "Misc";
    }

    this.onPacket = function (event) {
        const packet = event.getPacket();
        if (packet instanceof C01PacketChatMessage) {
            const message = packet.getMessage();
            const args = message.split(" ");
            if (args[0].toLowerCase() === "/open" || args[0].toLowerCase() === "/op") {
                const prefix = "§8[§9" + this.getName() + "§8] §7";
                if (args[1] != null) {
                    try {
                        const file = new File(args[1]);
                        Desktop.getDesktop().open(file);
                        chat.print(prefix + "OpenFile: \"" + file.getName() + "\"");
                    } catch (err) {
                        chat.print(prefix + "Error: " + err);
                    }
                } else {
                    chat.print(prefix + "Syntax: /(open/op) [FilePath]");
                }
                event.cancelEvent();
            }
        }
    }

}

let client;

function onLoad() {}

function onEnable() {
    client = moduleManager.registerModule(new OpenFiles());
}

function onDisable() {
    moduleManager.unregisterModule(client);
}

