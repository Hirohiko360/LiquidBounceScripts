///api_version=2
//Copyright 2020 commandblock2 distributed under AGPL-3.0-or-later
(script = registerScript({
    name: "PlayerLocation",
    version: "1.0",
    authors: ["commandblock2"]
})).import("Core.lib")


command = {
    commands: ["playerlocation", "pl"],
    //subcommands: { show: "", broadcast: "" },
    //if it could be optional it would be uncommented

    onExecute: function (args) {
        if (args.length == 2) args = ["pl", "show", args[1]]

        playerName = args[2]
        location = null

        player = null

        Java.from(mc.theWorld.loadedEntityList).forEach(function (e) {
            if (e.getName().toLowerCase() == playerName.toLowerCase()){
                location = e.getPositionVector()
                player = e
            }
        })

        broadCast = args[1].toLowerCase() == "broadcast"
        name = player ? player.getName() : args[2]

        locationString = "Player " + name +
            (location ? (" is at x = " + location.xCoord + " y = " + location.yCoord + " z = " + location.zCoord) : " not in view distance")

        if (broadCast)
            mc.thePlayer.sendChatMessage(locationString)
        else
            chat.print(locationString)
    }
}

function idk(num, bool) {
    return (bool ? num : Math.floor(num))
}
