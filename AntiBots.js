//source = https://forums.ccbluex.net/topic/464/mineplex-bot-remover recoded by tk400
//i think Supported NoGround Hackers. (i was thinking LB's Module can't Detect NoGround hacker. ...?)

function AntiBot() {
  var b = 20;

  var BotsOption = value.createList("BotExcludingOption", ["RemoveEntity", "Void", "AttackEventCancel","Ignore"],"RemoveEntity")
  var Debug = value.createBoolean("Debug", false)
  var a = value.createBoolean("CheckEntitis", false)
  var ce = value.createBoolean("ClearEntity", false)

  this.addValues = function(v) {
    v.add(BotsOption);
    v.add(Debug);
    v.add(a);
    v.add(ce)
  }
  this.getName = function() {
      return "AntiBots";
  };
  this.getDescription = function() {
      return "aka EntityChecker";
  };
  this.getCategory = function() {
      return "Misc";
  };
  this.onMotion = function() {
    if (mc.thePlayer.ticksExisted > 40) {
      for (var x in mc.theWorld.loadedEntityList) {
        //b = entities.getHealth()
        var entities = mc.theWorld.loadedEntityList[x];
        if(entities != mc.thePlayer) {
        if(a.get()) {
          a.set(false);
          chat.print("Bot has Removed => " + entities +
            "\n       >=RemovedBotEntity'sInfo=<\n"+
            "Health   | "+entities.getHealth()+"\n"+
            "EntityID | "+entities.getEntityId()+"\n"+
            "Invisible| "+entities.isInvisible()+"\n"+
            "Null     | "+(entities == null)+"\n"+
            "NameTag  | "+entities.getCustomNameTag()+"\n"+
            "AI       | "+entities.isAIDisabled()+"\n"+
            "Falldis  | "+entities.fallDistance+"\n"
          )
          if(ce.get()) {mc.theWorld.removeEntity(entities)}
          //remove when checked.
        }
      } //i found the Bot's HP is NaN. BUT, it still saying GeTHeALtH iS nOt A fUNCtion...
        if((/*(entities.getHealth ===Number.NaN) &&*/(entities != null) && (entities != mc.thePlayer) && entities.getCustomNameTag() == "") && mc.thePlayer.getDistanceToEntity(entities) < 10 && entities.isInvisible() && mc.thePlayer.getDistanceToEntity(entities) < 10 && entities.isInvisible()) {
          switch (BotsOption.get()) {
            case "RemoveEntity":
              mc.theWorld.removeEntity(entities);break;
            case "Void":
              entities.posY = 0;break;
            case "Ignore":
          }
          if(Debug.get()) {
            chat.print("Bot has Removed => " + entities +
              "\n     >=RemovedBotEntity'sInfo=<\n"+
              "Health   | "+entities.getHealth()+"\n"+
              "EntityID | "+entities.getEntityId()+"\n"+
              "Invisible| "+entities.isInvisible()+"\n"+
              "Null     | "+(entities == null)+"\n"+
              "NameTag  | "+entities.getCustomNameTag()+"\n"+
              "AI       | "+!entities.isAIDisabled()+"\n"+
              "Falldis  | "+entities.fallDistance+"\n"
            )
          }
        }//else{if(BotsOption.get() == "Void") {}}
      }
    }
  }
  this.onUpdate = function () {
  }
}


var AntiBot = moduleManager.registerModule(new AntiBot);


function onEnable() {
    AntiBot;
};

function onDisable() {
    moduleManager.unregisterModule(AntiBot);
};