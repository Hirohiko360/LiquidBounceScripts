var scriptName="TitleChanger"
var scriptVersion=6.9
var scriptAuthor="Choco"
var TitleChanger=new TitleChanger()
var Display=Java.type('org.lwjgl.opengl.Display')
function TitleChanger(){var Title=value.createText("Title","cool title")
this.getName=function(){return "TitleChanger"}
this.getDescription=function(){return "cool title changer"}
this.getCategory=function(){return "Fun"}
this.getTag=function(){return "nice"}
this.onUpdate=function(){Display.setTitle(Title.get())}
this.addValues=function(values){values.add(Title)}}
function onLoad(){}
function onEnable(){moduleManager.registerModule(TitleChanger)
Display.setTitle(Title.get())}
function onDisable(){moduleManager.unregisterModule(TitleChanger)}