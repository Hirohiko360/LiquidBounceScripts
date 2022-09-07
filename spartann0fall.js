var scriptName="HelloSpartan"
var scriptVersion=1.0
var scriptAuthor="C0ldN1ght"
var C03=Java.type("net.minecraft.network.play.client.C03PacketPlayer");var BlockPos=Java.type("net.minecraft.util.BlockPos");var Blocks=Java.type("net.minecraft.init.Blocks");function Spartan(){this.getName=function(){return "SpartanNoFall"}
this.getDescription=function(){return "by CNight"}
this.getCategory=function(){return "Player"}
this.onUpdate=function(){if(mc.thePlayer.fallDistance>3&&mc.theWorld.getBlockState(new BlockPos(mc.thePlayer.posX,mc.thePlayer.posY-3.0,mc.thePlayer.posZ)).getBlock()!=Blocks.air){mc.thePlayer.onGround=false;mc.thePlayer.sendQueue.addToSendQueue(new C03(true));}}
this.onDisable=function(){}}
var Spartan=new Spartan()
var client
function onLoad(){}
function onEnable(){client=moduleManager.registerModule(Spartan)}
function onDisable(){moduleManager.unregisterModule(client)}