var StringSelection = Java.type("java.awt.datatransfer.StringSelection");
var ScaledResolution = Java.type("net.minecraft.client.gui.ScaledResolution");
var Toolkit = Java.type("java.awt.Toolkit");

// Copies something to the clipboard
function copyToClipboard(string) {
    var stringSelection = new StringSelection(string);
    var clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
    clipboard.setContents(stringSelection, null);
}

// Returns the scaled width of the game
function getScaledWidth() {
    var scaledWidth = new ScaledResolution(mc).getScaledWidth();

    return scaledWidth;
}

// Returns the scaled height of the game
function getScaledHeight() {
    var scaledHeight = new ScaledResolution(mc).getScaledHeight();

    return scaledHeight;
}
