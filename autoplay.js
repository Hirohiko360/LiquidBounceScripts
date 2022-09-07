var GuiChest=Java.type("net.minecraft.client.gui.inventory.GuiChest");var RandomUtils=Java.type("net.ccbluex.liquidbounce.utils.misc.RandomUtils");var C09PacketHeldItemChange=Java.type("net.minecraft.network.play.client.C09PacketHeldItemChange");var C01PacketChatMessage=Java.type("net.minecraft.network.play.client.C01PacketChatMessage");var C08PacketPlayerBlockPlacement=Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement");var S02PacketChat=Java.type("net.minecraft.network.play.server.S02PacketChat");var MSTimer=Java.type('net.ccbluex.liquidbounce.utils.timer.MSTimer');var timer=new MSTimer();var shouldSend=false;var sentMessage=false;var script=registerScript({name:"AutoPlay",version:"1.0",authors:["NyanCatForEver"]});script.registerModule({name:"AutoPlay",category:"Misc",description:"An AutoPlay for Redesky",settings:{delay:Setting.integer({name:"Delay",default:0,min:0,max:10000}),autoGG:Setting.boolean({name:"AutoGG",default:true})}},function(module){module.on("enable",function(){timer.reset()
shouldSend=false});module.on("update",function(){if(!shouldSend||!timer.hasTimePassed(module.settings.delay.get()))
return;if(!sentMessage){if(module.settings.autoGG.get())
mc.getNetHandler().addToSendQueue(new C01PacketChatMessage("gg"+" >"+RandomUtils.randomString(6)+"<"))
var lastSlot=mc.thePlayer.inventory.currentItem
mc.getNetHandler().addToSendQueue(new C09PacketHeldItemChange(6))
mc.getNetHandler().addToSendQueue(new C08PacketPlayerBlockPlacement(mc.thePlayer.inventory.getCurrentItem()))
mc.getNetHandler().addToSendQueue(new C09PacketHeldItemChange(lastSlot))
sentMessage=true}
if(mc.currentScreen instanceof GuiChest){var chest=mc.currentScreen;var i=0
for(var slot in chest.inventorySlots.inventorySlots){var stack=chest.lowerChestInventory.getStackInSlot(i)
if(stack==null){i++
continue;}
mc.playerController.windowClick(chest.inventorySlots.windowId,i,0,1,mc.thePlayer)
mc.thePlayer.closeScreen()
shouldSend=false
break;}}});module.on("packet",function(eventData){if(eventData.getPacket()instanceof S02PacketChat){if(mc.getIntegratedServer()!=null||shouldSend||!mc.getCurrentServerData().serverIP.toLowerCase().contains("redesky"))
return;var text=eventData.getPacket().getChatComponent().getUnformattedText().toLowerCase()
if(text.contains("gostou do mapa")||text.contains("venceu a partida")||text.contains("ganhou")){shouldSend=true
sentMessage=false
timer.reset()}}});});