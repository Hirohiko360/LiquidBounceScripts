///api_version=2
//Copyright 2020 commandblock2 distributed under AGPL-3.0-or-later
(script = registerScript({
    name: "ncpBlock",
    version: "1.0",
    authors: ["commandblock2"]
})).import("Core.lib")


module = {
    name: "ncpBlock",
    description: "nothing new just a ncp block not even an auto one",
    author: "commandblock2",
    category: "Combat",

    onPacket: function (packetEvent) {
        if (packetEvent.getPacket() instanceof C07PacketPlayerDigging)
            packetEvent.cancelEvent()
    }
}
