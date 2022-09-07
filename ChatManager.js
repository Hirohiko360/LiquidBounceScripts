//downgraded from fuckest version of scpt.v.2.0.0
/*
   thank you for
   -Senk Ju
   >Macro Script - used for FileConfigrate system.

   this script is protected by CC BY NC
*/
var scriptName = "AutoReport-Recoded";
var scriptAuthor = "liulihaocai and tk400.";
var scriptVersion = 1.0;

script.import("texts.js") //for spam texts.

var File = Java.type("java.io.File");
var FileReader = Java.type("java.io.FileReader");
var BufferedReader = Java.type("java.io.BufferedReader");
var FileWriter = Java.type("java.io.FileWriter");
var BufferedWriter = Java.type("java.io.BufferedWriter");
var Keyboard = Java.type("org.lwjgl.input.Keyboard");
var LiquidBounce = Java.type("net.ccbluex.liquidbounce.LiquidBounce");

var macros = {};

var EntityMobs = Java.type("net.minecraft.entity.EntityCreature");
var EntityLiving = Java.type('net.minecraft.entity.EntityLivingBase');
var EntityPlayer = Java.type('net.minecraft.entity.player.EntityPlayer');
var chatpacket = Java.type("net.minecraft.network.play.server.S02PacketChat");
var PlayerPacket = Java.type('net.minecraft.network.play.client.C03PacketPlayer');
var C00PacketKeepAlive = Java.type('net.minecraft.network.play.client.C00PacketKeepAlive');
var clientchat = Java.type("net.minecraft.network.play.client.C01PacketChatMessage");

//Liq Module/classes
var AntiBot = Java.type("net.ccbluex.liquidbounce.features.module.modules.misc.AntiBot");
var prefix = LiquidBounce.commandManager.getPrefix();

function ChatManager() {
   var delayes = Ldelayes = 0;
   var target = null;
   var PendingReportPlayer = [];
   var Reason = ''
   var LedPlayers = [];
   var ACDundelayed = true;
   var reportedPlayers = [];
   var ALname = '';
   var Reportablerated = Labled = true;
   var ALrate = 0;
   var spoken = Lspoken = true;
   var delaying = Ldelaying = false;
   var chatz = [];
   var idead = SGabled = false;
   var SGdelayes = 0;
   var Reportablerate = 0;
   var SGrate = 0;
   var SGdelaying = false;
   var addedALPlist = []; //list of dead players and pending list of AutoL.
   var PALids = []; //ID list of Attacked Players's id.
   var PALNList = [];
   var ReasShow = []
   var Rerray=''
   var Reaz=[]
   var OldPlayerList = []
   var calced=false
   var AAPD=0
   var AtaSaid=false
   var $chatAAP= ''
   var list = ['uzuki','tk400','hexeption','Mazer','Nazix','germany','budou']

   var Dev = value.createBoolean("DevMode", false);
   /* Spammer */
   var Debugy = value.createBoolean("Debug", false);
   var ToggleSpammer = value.createBoolean("Spammer", false); //not working
   var SpamText = value.createText("Text:", '');
   var AddText = value.createText("AddText:", '');
   var SpamPre = value.createText("SpamPressets", '');
   var SeaTea = value.createBoolean("ClearTexts", false);
   var SpamMode = value.createList("WhileSpam", ["StandardSpam","onEnabled", "ValueChanged"], "ValueChanged");
   var yourname = value.createText("hackedBy", "[EnterNameHere]");
   var MaxDelay = value.createInteger("MaxDelay", 400, 0, 5000); // 10 = 1s.
   var MinDelay = value.createInteger("MinDelay", 100, 0, 5000);
   var randomish = value.createBoolean("Ramdomizer", true);
   var BeforeR = value.createBoolean("Before", false);
   var AfterR = value.createBoolean("After", false);
   var CustSt = value.createBoolean("#Include_CustomStrings", false);
   var AllowBet = value.createBoolean("Between", false); //Im Recommanding set false.
   var RandomBet = value.createBoolean("RandomBetween", false);
   var RBA = value.createInteger("Amount", 1, 1, 5);
   var BetStB = value.createText("StringBefore", ">");
   var BetStA = value.createText("StringAfter", "<");

   /* AtAllPlayer */
   var ToggleAAP = value.createBoolean("AtAllPlayer", false);
   var AAP_Rep = value.createBoolean("Repeat", false);
   var AAPxdelay = value.createInteger("MaxDelay-AAP", 0, 0, 2000);
   var AAPndelay = value.createInteger("MinDelay-AAP", 0, 0, 2000);

   /* AutoL */
   var ToggleAutoL = value.createBoolean("AutoL", false);
   var LTmode = value.createList("Texts", ["hypixel", "Mineplex", "Basic"], "Hypixel");
   var LPrev = value.createBoolean("PreventDupeL", false);
   var DebugyAL = value.createBoolean("Debug!DetectAllEntity", false);
   //var ALDmode = value.createList("DeadCheckMode", ["PacketChat", "DeadCheck"], ""); // tired coding.
   var Lxdelay = value.createInteger("MaxDelay-L", 0, 0, 2000);
   var Lndelay = value.createInteger("MinDelay-L", 0, 0, 2000);
   var LRate = value.createFloat("LRate", 25, 0, 100);

   /* 負け惜しみ */
   var ToggleSG = value.createBoolean("Sour-Grapes", false);
   var SGxdelay = value.createInteger("MaxDelay-SG", 0, 0, 2000);
   var SGndelay = value.createInteger("MinDelay-SG", 0, 0, 2000);
   var SGRate = value.createFloat("SGRate", 25, 0, 100);

   /*ハッカーへの追悼 / R.I.P Hacker */
   var ToggleHRIP = value.createBoolean("R.I.P_Hacker", false); // i think work
   var RIPText = value.createText("AddCustomRIPTexts=>", ""); //not working
   var RipTexts = value.createList("RIPTexts", [""], "Hypixel"); //lazy code
   /*Auto Report*/
   var ToggleAutoR = value.createBoolean("AutoReport", false);
   var Reseter = value.createBoolean("Reset", false);
   var Mode = value.createList("ReportMode", ["Hypixel", "Redesky", "/report","Custom"], "Hypixel");
   var refl = value.createList("RefreshPlayerlist", ["onWorld", "onEnable", "Both", "Off"], "onEnable");
   var reasonMode = value.createList("Reason", ["Randomized","Custom"],"Randomized");
   var MinLength = value.createInteger("MinLength", 1, 1, 10); // ReashShow.length is unusable, mmm...
   var CrrentReasson = value.createText("CurrentReason", '');
   var ReasL = value.createList("ReasonsList", [" Fly", " HighJump", " Speed", "AntiKB", " LongJump", " Jesus", " Dolphin", " KillAura", " Aimbot", " AutoClicker","Reach", "ClickValueToAdd/Remove!"], "ClickValueToAdd/Remove!");
   var Reas = value.createText("AddCustomReason=>", "");
   var mes = value.createBoolean("ReportReported", false); //wth
   var xdelay = value.createInteger("MaxDelay-R", 0, 0, 2000);
   var ndelay = value.createInteger("MinDelay-R", 0, 0, 2000);
   var RRate = value.createFloat("ReportRate", 25, 0, 100);
   var RC = value.createText("ReportCommand", "wdr");
   var AppendReason = value.createBoolean("AppendReason", false);

   /* Misc */
   var ToggleFixTypo = value.createBoolean("RemoveTypo", false);
   var AutoReply = value.createBoolean("AutoReply", false);//lazy to code
   var AutoCDelay = value.createBoolean("AutoChatDelay", false);
   var ACDndelay = value.createInteger("Delay-ACD", 0, 0, 500);
   var ACDRandom = value.createInteger("RandomDelay", 0, 0, 100);
   this.addValues = function(v) {
      v.add(Dev)
      v.add(Debugy);
      v.add(ToggleSpammer);
      v.add(SpamText);
      v.add(AddText);
      v.add(SpamPre);
      v.add(SeaTea);
      v.add(SpamMode);
      v.add(yourname);
      v.add(MaxDelay);
      v.add(MinDelay);
      v.add(randomish);
      v.add(BeforeR);
      v.add(AfterR);
      v.add(CustSt);
      v.add(AllowBet);
      v.add(RandomBet);
      v.add(RBA);
      v.add(BetStB);
      v.add(BetStA);
      v.add(ToggleAAP)
      v.add(AAP_Rep)
      v.add(AAPxdelay)
      v.add(AAPndelay)
      v.add(ToggleAutoL);
      v.add(LPrev);
      v.add(DebugyAL);
      //v.add(ALDmode)
      v.add(LTmode);
      v.add(Lxdelay);
      v.add(Lndelay);
      v.add(LRate);
      v.add(ToggleSG);
      v.add(SGxdelay);
      v.add(SGndelay);
      v.add(SGRate);
      v.add(ToggleHRIP)
      v.add(RIPText)
      v.add(RipTexts)
      v.add(ToggleAutoR);
      v.add(Reseter);
      v.add(Mode);
      v.add(refl);
      v.add(reasonMode);
      v.add(MinLength); // and this line.
      v.add(CrrentReasson);
      v.add(Reas);
      v.add(ReasL);
      v.add(mes);
      v.add(xdelay);
      v.add(ndelay);
      v.add(RRate);
      v.add(RC);
      v.add(AppendReason);
      v.add(ToggleFixTypo);
      v.add(AutoReply);
      v.add(AutoCDelay);
      v.add(ACDndelay);
      v.add(ACDRandom);
   }

   this.getName = function() {
      return "ChatManager";
   }
   this.getDescription = function() {
      return "Allow you to spam with same bypass, more custmizable than Original";
   }
   this.getCategory = function() {
      return "Misc";
   }
   this.onLoad = function() {
      for(var x=0;x<spamtexts.length;x++) {
         var texts=texts.concat(spamtexts[x])
         SpamText.set(texts)
      }
   }
   this.onAttack = function(e) {
      target = e.getTargetEntity()
      if ((Debugy.get() || target instanceof EntityPlayer && !AntiBot.isBot(e.getTargetEntity())) && target != null && target != mc.thePlayer) {
         if (ToggleAutoR.get() && (PendingReportPlayer.indexOf(target.getName()) == -1 && reportedPlayers.indexOf(target.getName()) == -1)) {
            PendingReportPlayer.push(target.getName());
            chat.print("§6Added §5'§r" + target.getName() + "§5'§b Reporting List! plz wait a secounds...");
         }
      }
   }
   this.onUpdate = function() {
      if(ToggleSpammer.get()) {
         SeaTea.get() && SpamText.set(''), SeaTea.set(false)
         if(AddText.get() != '') {
            var addingtext = FSpamText = ''
            FSpamText=addingtext.concat(AddText.get())
            SpamText.set(FSpamText)
            AddText.set('')
         }
      }
      if(ToggleAAP.get() && AtaSaid) {
         if(calced) {
            if(AAPD>=AAPCD) {
               for(var x=0;x<OldPlayerList.length;x++) {
                  chat.print($chatAAP.replace(/"@a"/gi, OldPlayerList[x]));AAPD=0;calced=false;
                  if(x==(OldPlayerList-1)) {!AAP_Rep.get() &&(AtaSaid=false);OldPlayerList=getPlayerList}
               }
            }else{AAPD++}
         }else{var AAPCD=DelayCal(AAPxdelay,AAPndelay)}
      }
      if (ToggleAutoR.get()) {
         if (PendingReportPlayer.length >= 1) {
            spoken && (ARname = PendingReportPlayer[0], spoken = false);// wth??? why i was coded in before Not Setted in Reporablerate... i was fuckin idiot... >:(
            if (Reportablerated) {
               Reportablerate = DelayCal(100, 0), Reportablerated = false
            }else{
               if (reportedPlayers.indexOf(ARname) == -1) {
                  if (RRate.get() >= Reportablerate) {
                     if (delaying) {
                        if (delayes <= 0) {
                           switch(reasonMode.get()) {
                              case "Randomized":
                                 if(MinLength.get() > ReasShow.length) {MinLength.set(ReasShow.length)}
                                 Reason = (RandomArray(ReasShow, DelayCal(ReasShow.length, MinLength.get()))).join(' ');
                                 break;
                              case "Custom":
                                 Reason = (ReasShow).join(' ');;
                                 break;
                           }
                           switch (Mode.get()) {
                              case "Hypixel":
                                 sendChat("/report " + ARname + Reason);
                                 break;
                              case "Redesky":
                                 sendChat("/reportar " + ARname);
                                 break;
                              case "/report":
                                 sendChat("/report " + ARname);
                                 break;
                              case "Custom":
                                 sendChat("/" + RC.get()+(AppendReason.get() && (" "+Reason) || !AppendReason.get()&&""));
                                 break;
                           }
                           PendingReportPlayer.shift()
                           delaying = false;
                           spoken = true;
                           Reportablerated = true;
                           reportedPlayers.push(ARname)
                           mes.get() && (sendChat("Hi " + ARname + ", u got reported by LiquidBounce!")) // or rt(exampletexts)
                           chat.print("§6§l[AutoReport]§r Successfully reported §f§l" + ARname + "§a§l")
                        } else {delayes--}
                     }else{delayes = DelayCal(xdelay.get(), ndelay.get()), delaying = true}
                  } else {
                     PendingReportPlayer.shift();
                     spoken = true
                     Reportablerated = true;
                     reportedPlayers.push(ARname);
                     chat.print("uwu he was a lucky!\n[DEBUG]\nPendingReportPlayerLists->" + PendingReportPlayer + "\nARname->" + ARname+"\nReportedPlayers"+reportedPlayers+"\n---------END OF DEBUG---------");
                  }
               }
            }
         }

         Reseter.get() && (ReasShow ="", Reseter.set(false))

         /** idk why this is working. huh and i don't want code fucking again.*/
         if (Reas.get() != '') {
            if(Reas.get().indexOf("-")) {Reaz = Reas.get();Reaz =Reaz.split('-');Reas.set(Reaz.join(' '))};

            if(Rerray.length == 0) {
               Rerray = Reaz.shift();
               Reas.set(Reaz.join(' '))
            }

            if(Rerray.length >= 1) {
               if (ReasShow.indexOf(Rerray) != -1) {
                  Rerray=''
               }else{
                  ReasShow=ReasShow.concat(Rerray)
                  CrrentReasson.set(ReasShow.toString())
                  Rerray = '';
               }
            }
         }

         if (ReasL.get() != 'ClickValueToAdd/Remove!') {
            if (ReasShow.indexOf(ReasL.get()) != -1) { //Remove
               ReasShow.splice(ReasShow.indexOf(ReasL.get()), 1);
               CrrentReasson.set(ReasShow.toString())
               ReasL.set("ClickValueToAdd/Remove!");
            } else {//Add
               ReasShow=ReasShow.concat(ReasL.get());
               CrrentReasson.set(ReasShow.toString())
               ReasL.set("ClickValueToAdd/Remove!");
            }
         }
      }
      if (ToggleAutoL.get()) {
         for (var y in mc.theWorld.loadedEntityList) {
            var Entity = mc.theWorld.loadedEntityList[y];
            if ((target != mc.thePlayer && target != null) && (Entity != null && Entity != mc.thePlayer)) {
               if (Entity.getEntityId() == target.getEntityId()) {
                  (addedALPlist.indexOf(Entity.getName()) == -1) && (PALids.push(Entity.getEntityId()), addedALPlist.push(Entity.getName()), chat.print("§bAdded §5'§r" + Entity + "§5'§b AutoL List! plz wait a secounds..."))
               }
               if ((PALids.length >= 1) && (PALids.indexOf(Entity.getEntityId()) != -1 && addedALPlist.indexOf(Entity.getName()) != -1) && (Entity.isDead || (Entity.getHealth() <= 0))) {
                  (PALNList.indexOf(Entity.getName()) == -1) && (PALNList.push(Entity.getName()));
                  PALids.splice(PALids.indexOf(Entity.getEntityId()), 1);
               }
            }
         }
         if (PALNList.length >= 1) {
            if (Labled) {
               ALrate = DelayCal(100, 0), Labled = false;
            }else{
               if (LRate.get() >= ALrate) {
                  Lspoken && (ALname = PALNList[0], Lspoken = false);
                  if (LedPlayers.indexOf(ALname) == -1) {
                     if (Ldelaying) {
                        if (Ldelayes <= 0) {
                           sendChat(rt(AutoL)
                              .replace(/(%playername%|%name%|%s%)/gi, ALname)
                              .replace(/%MyHealth%/gi, mc.thePlayer.getHealth())
                              .replace(/%insult_EN%/gi, rt(insultEN))
                              .replace(/%insult_JA%/gi, rt(insultJA))
                              .replace(/%insult_BI%/gi, rt(insultEN.concat(insultJA)))
                              .replace(/%clientN_EN%/gi,rt(ClientNameEN))
                              .replace(/%clientN_JA%/gi,rt(ClientNameJA))
                              .replace(/%clientN_BI%/gi,rt(ClientNameEN.concat(ClientNameJA)))
                              );
                           PALNList.shift();
                           Ldelaying = false;
                           Lspoken = true;
                           LedPlayers.push(ALname);
                           chat.print("§6§l[AutoL]§r Successfully L §f§l" + ALname + "§a§l");
                        } else {Ldelayes--}
                     }else{Ldelayes = DelayCal(Lxdelay.get(), Lndelay.get()), Ldelaying = true}
                  }
               } else {
                  Labled = true;
                  PALNList.shift();
                  LedPlayers.push(ALname);
                  chat.print("uwu he was a lucky!\n[DEBUG]\nPendingLPlayerLists->" + LedPlayers + "\nALname->" + ALname);
               }
            }
         }
      }
      if (ToggleSG.get()) {
         if (mc.thePlayer.isDead || (mc.thePlayer.getHealth() <= 0)) {
            idead = true;
         }
         if (idead) {
            if (SGabled) {
               if (SGRate.get() >= SGrate) {
                  if (SGdelaying) {
                     if (SGdelayes <= 0) {
                        sendChat(rt(SourGrape)
                           .replace(/(%MyName%|%playername%|%username%)/gi, mc.thePlayer.getName())
                           .replace(/%HackedBy%/gi, yourname.get())
                           .replace(/%insult_EN%/gi, rt(insultEN))
                           .replace(/%insult_JA%/gi, rt(insultJA))
                           .replace(/%insult_BI%/gi, rt(insultEN.concat(insultJA)))
                           .replace(/%clientN_EN%/gi,rt(ClientNameEN))
                           .replace(/%clientN_JA%/gi,rt(ClientNameJA))
                           .replace(/%clientN_BI%/gi, rt(ClientNameEN.concat(ClientNameJA)))
                           );
                        SGabled = idead = SGdelaying = false;
                     } else {SGdelayes--}
                  }else{SGdelayes = DelayCal(SGxdelay.get(), SGndelay.get()), SGdelaying = true}
               } else {SGabled = false;idead = false}
            }else{SGrate = DelayCal(100, 0), SGabled = true}
         }
      }
      if (AutoCDelay.get()) {
         if (chatz.length >= 1 && ACDundelayed == false) {
            for (i = 0; i < 39; i++) { ACDundelayed = true}
         }
         if (ACDundelayed) {
            sendChat(chatz[1]);
            chatz.shift()
         }
      }
   }
   this.onPacket = function(e) {
      var packet = e.getPacket();
      if (packet instanceof chatpacket) {
         var CMessage = packet.getChatComponent().getUnformattedText().toUpperCase()
         if (AutoReply.get()) {
            if(!packet.isChat()) {
               //chat.print('§1section1')
               var plist=getPlayerList()
               if(plist.indexOf(mc.thePlayer.getName())!= -1) {plist.splice(plist.indexOf(mc.thePlayer.getName()),1)}
               for(var x=0;x< plist.length;x++) {
                  if ((CMessage.toUpperCase()).indexOf(plist[x].toUpperCase()) > -1 && (((CMessage.toUpperCase()).indexOf(plist[x].toUpperCase()) < ((CMessage.toUpperCase()).indexOf(mc.thePlayer.getName().toUpperCase()) + mc.thePlayer.getName().length)) || !(CMessage.toUpperCase()).indexOf(mc.thePlayer.getName().toUpperCase()) > -1)) {
                     //chat.print('§3section3')
                     var CutMessage=CMessage.slice(CMessage.indexOf(plist[x]) + plist[x].length)
                     if (/"ハッカー|ハック|チート|チーター|hack|hax|hak|cheat"/i.test(CutMessage)) {
                        //chat.print('§4section4')
                        if(/what/i.test(CutMessage)) {
                           chat.print('§5section5')
                           sendChat(rt(whatclient)
                              .replace(/%clientN_EN%/gi,rt(ClientNameEN))
                              .replace(/%clientN_JA%/gi,rt(ClientNameJA))
                              .replace(/%clientN_BI%/gi,rt(ClientNameEN.concat(ClientNameJA)))
                           )
                        } else {
                           if (CutMessage.contains(mc.thePlayer.getName())) {
                              sendChat(rt(whohax.callme))
                           } else {
                              sendChat(rt(whohax.uncallme))
                           }
                        }
                     }else if((/\*\*([*]+)|idiot|retard|degenerate|stupid|fuck|nigger|([L]+) |Loser|n?([o]+)?b|nub/i + mc.thePlayer.getName()).test(CMessage)) {
                     }else if(/client\?|what client/i.test(CutMessage)) {
                        sendChat(rt(whatclient)
                           .replace(/%clientN_EN%/gi,rt(ClientNameEN))
                           .replace(/%clientN_JA%/gi,rt(ClientNameJA))
                           .replace(/%clientN_BI%/gi,rt(ClientNameEN.concat(ClientNameJA)))
                        )
                     }
                  }//else{chat.print('detected you said.')}
               }
            }
         }
         if(ToggleHRIP.get()) {
            if(packet.isChat()) {
               if(/banned|\[WATCHDOG CHEAT DETECTION\]/i.test(CMessage) && !CMessage.contains(mc.thePlayer.getName())) {
                  sendChat(rt(RIP_Hacker.en))
               }
            }//else{}
         }
      }
      if (packet instanceof clientchat) {
         var message =e.getPacket().getMessage()
         var regexp = /\%?([0-9]+)?\%/;
         /* using for prevent of chatpacket dupe */
         if(regexp.test(message)) {
            e.cancelEvent();
            chat.print("send packet :"+message)
            var match;
            //var matches = [];
            while ((match = regexp.exec(message)) != null) {
               //chat.print(Number(match[1])*3);
               message=(message.replace(regexp, Number(match[1])*3))
            }
            chat.print(message)
         }
         if(ToggleAAP.get()) {
            if((/"@a"/gi).test(message)) {varAtaSaid=true;$chatAAP= message;OldPlayerList = getPlayerList();e.cancelEvent()}
         }
         if (ToggleFixTypo.get()) {
            if (message.search(/autol/i) == 0) {
               chat.print("you typed a typo.")
               sendChat("/autoL")
               e.cancelEvent();
            } else if (/retard/i.test(message)) {
               e.cancelEvent();
               sendChat("ret");
               sendChat("ard");
            }
         }
         if (AutoCDelay.get()) {
            chatz.push(message);
            chat.print(message);
            e.cancelEvent();
         }
      }
   }
   this.getTag = function() {
      return ("PENDINGREPORTS : " + PendingReportPlayer + "(" + (Math.floor(delayes / 10)) + ")");
   }
   this.onEnable = function() {
      i = 0;
      ARname = '';
      (refl.get("onEnable") || refl.get("Both")) && (reportedPlayers = [], PendingReportPlayer = [], spoken = true, delayes = 0, delaying = false)
   }
   this.onWorld = function() {
      (refl.get("onWorld") || refl.get("Both")) && (reportedPlayers = [], PendingReportPlayer = [], spoken = true, delayes = 0, delaying = false)
   }
}


/* Funtion Utils */

function sendChat(msg) {
   mc.thePlayer.sendChatMessage(msg);
}

function RandomArray(array, num) {
   var a = array;
   var t = [];
   var r = [];
   var l = a.length;
   var n = num < l ? num : l;
   while (n-- > 0) {
     var i = Math.random() * l | 0;
     r[n] = t[i] || a[i];
     --l;
     t[i] = t[l] || a[l];
   }
   return r;
}

function DelayCal(MaxDelay, MinDelay) {
   return Math.floor(Math.random() * ((MaxDelay - MinDelay) + 1) + MinDelay);
}

function RandomPool() {
   if (Math.round(Math.random()) > 1) {
      return true
   } else {
      return false
   }
}

function rt(t) { //Shorten it longer randomizer code.
   var text = t[parseInt(Math.random() * t.length)]
   return text;
}

function targetcheck(tar) {
   if (tar.isDead) {
      return true
   }
}
function getPlayerList() {
   var PlayerInfoMap = mc.getNetHandler().getPlayerInfoMap().toArray()
   var Array = []
   for (var i in PlayerInfoMap) {
     Array.push(PlayerInfoMap[i].getGameProfile().getName())
   }
   return Array
}



//var AutoReport = moduleManager.registerModule(new AutoReport);
var ChatManager = moduleManager.registerModule(new ChatManager);

function onEnable() {
   //AutoReport;
   ChatManager;
}

function onDisable() {
   //moduleManager.unregisterModule(AutoReport);
   moduleManager.unregisterModule(ChatManager);
}
//function MJumpCommand() {

//   this.getName = function() {
//       return "MotionJump";
//   }

//   this.getAliases = function() {
//       return [];
//   }

//   this.execute = function(args) {
//       if (args.length < 2) {
//           log(".MotionJump <value>", true);
//           return;
//       }
//       mc.thePlayer.motionY = args[1];
//   }
//}