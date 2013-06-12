var ENABLE_CHANNEL = "#rosalind8";
//チャンネルのとこだけ設定する
//
//
// 以下イジらない
/*----------------------------------------------*/
var flag = false;
var item = [];
var cast = [];
var len = 0;
var id = [];

function event::onChannelText(prefix, channel, text) {
    if(channel==ENABLE_CHANNEL && flag){
        var hyou = text.replace(/[０-９]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
        });
        hyou = hyou.replace(/[\s　]/g,"");
        var hata = true;
        if(hyou.match(/[0-9]+/g) && Number(hyou)>0 && Number(hyou) for(var i=0;i if(hata){
            cast[0] += 1;
            cast[hyou] += 1;
            id.push(prefix.address);
        }else print(prefix.nick + " has voted ("+ prefix.address +")");
                                                                      }else send(ENABLE_CHANNEL, hyou + " は無効です。");
          }
    }
}

function event::onSendingCommand(command, param, context) {
    context.handled = true;

    param = param.replace(/　/g," "); // 全角空白->半角空白

    if(command=='VOTE'){
        if(param){
            if(param.toLowerCase()=="stop"){
                if(flag){
                    flag = false;
                    var result ="投票結果→ "+ item[0] + " ";
                    for(var i=1; i	 if(i==len-1) result += item[i] + ":" + cast[i] + "　(全票数:" + cast[0] + ")";
                        else result += item[i] + ":" + cast[i] + " ";
                       }
                    sendRaw("PRIVMSG " + ENABLE_CHANNEL + " " + result);
                    result = null;
                    id.length = 0;
                    item.length = 0;
                    cast.length = 0;
                }
                else log("forget to start vote");
            }
            else if(param.toLowerCase()=="progress" && flag){
                var result ="途中結果→ " + item[0] + " ";
                for(var i=1; i	 if(i==len-1) result += item[i] + ":" + cast[i] + "　(全票数:" + cast[0] + ")";
                    else result += item[i] + ":" + cast[i] + " ";
                   }
                send(ENABLE_CHANNEL, result);
                result = null;
            }
            else if(param.split(/ /)[0].match(/\?|？/)){
                param = param.replace(/ +?$/g,"");
                tmp = param.split(/ +?/g);
                len = tmp.length;
                for(var i=0;i item[i] = tmp[i];
                    cast[i] = 0;
                   }
                var que = "投票開始→ " + item[0] + " ";
                for(var i=1;i	 if(i==len-1) que += i + ":" + item[i] + " (半角・全角数字で投票)";
                    else que += i + ":" + item[i] + " ";
                   }
                sendRaw("PRIVMSG " + ENABLE_CHANNEL + " " + que);
                flag = true;
                tmp.length = 0;
                que = null;
            }
        }else log(["usage:","/vote test? 1 2 3","/vote progress","/vote stop"].join("\n"));
    }
}
log("voting script loaded");
