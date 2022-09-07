var script=registerScript({name:"Rotation",version:"1.0.0",authors:["Qther"]});script.registerCommand({name:"Rotation",aliases:["rotation","rotate"]},function(command){command.on("execute",function(args){var yaw={angle:mc.thePlayer.rotationYaw}
var pitch={angle:mc.thePlayer.rotationPitch}
wrapAngleTo180_float(yaw);wrapAngleTo180_float(pitch);var wasSet=false;if(args.length>1){switch(args[1].toLowerCase()){case undefined:case null:Chat.print("Wrong arguments. (.rotation [get/set/setYaw/setPitch])");break;case "get":Chat.print("["+yaw.angle.toFixed(4)+" / "+pitch.angle.toFixed(4)+"] (truncated)");break;case "set":if(args.length>=4){yaw.angle=parseFloat(args[2]);pitch.angle=parseFloat(args[3]);if(yaw.angle.isNaN()||pitch.angle.isNaN()){Chat.print("Wrong arguments. (.rotation set <yaw> <pitch>)");return;}
wasSet=true;}else{Chat.print("Not enough arguments. (.rotation set <yaw> <pitch>)");return;}
break;case "setyaw":if(args.length>=3){yaw.angle=parseFloat(args[2]);if(yaw.angle.isNaN()){Chat.print("Wrong arguments. (.rotation setYaw <yaw>)");return;}
wasSet=true;}else{Chat.print("Not enough arguments. (.rotation setYaw <yaw>)");return;}
break;case "setpitch":if(args.length>=3){pitch.angle=parseFloat(args[2]);if(pitch.angle.isNaN()){Chat.print("Wrong arguments. (.rotation setPitch <pitch>)");return;}
wasSet=true;}else{Chat.print("Not enough arguments. (.rotation setPitch <pitch>)");return;}
break;}
if(wasSet){unwrapAngleFrom180_float(yaw);unwrapAngleFrom180_float(pitch);mc.thePlayer.rotationYaw=yaw.angle;mc.thePlayer.rotationPitch=pitch.angle;Chat.print("Set rotation to ["+yaw.angle.toFixed(4)+" / "+pitch.angle.toFixed(4)+"] (truncated)");}}});});function wrapAngleTo180_float(angleRef){angleRef.angle%=360.0;if(angleRef.angle>=180.0)angleRef.angle-=360.0;if(angleRef.angle<-180.0)angleRef.angle+=360.0;}
function unwrapAngleFrom180_float(angleRef){if(angleRef.angle<=180.0)angleRef.angle+=360.0;if(angleRef.angle>180.0)angleRef.angle-=360.0;angleRef.angle%=360.0;}