var path = "plugins/CustomAntiEnchant/config.json";
var config = {};
var file = data.openConfig(path, 'json', '{}');

var handSlotId = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "17", "25", "26", "27", "28", "36",      "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35"];
var handSlotLvl = [4, 4, 4, 4, 4, 3, 3, 3, 1, 3, 2, 1, 1, 1, 3,     5, 5, 5, 2, 2, 3, 5, 1, 3, 3, 5, 2, 1, 1, 3, 3, 1, 1, 1, 5, 3, 3, 1, 1, 4, 3];
//嫌麻烦写在一起了qwq
// var armorSlotId = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "17", "25", "26", "27", "28", "36"];
// var armorSlotLvl = [4, 4, 4, 4, 4, 3, 3, 3, 1, 3, 2, 1, 1, 1, 3];
if(file.get("time") == null){
    log("找不到配置文件，生成中");
    file.set("time", 5000);
    for(i in handSlotId){
        file.set(handSlotId[i], handSlotLvl[i]);
    }
}


setInterval(checkItem, file.get("time"))

var players;
var je;

function checkItem(){
    players = mc.getOnlinePlayers();
    if(players.length > 0){
        //遍历玩家
        for(i in players){
            //物品栏非空
            if(players[i].getInventory().isEmpty() == false){
                //遍历物品栏
                for(j in players[i].getInventory().getAllItems()){
                    //物品非空
                    if(players[i].getInventory().getAllItems()[j].isNull() == false){
                        //是否附魔
                        je = JSON.parse(players[i].getInventory().getAllItems()[j].getNbt());
                        if(players[i].getInventory().getAllItems()[j].getNbt().getKeys().indexOf("tag") > -1){
                            if(players[i].getInventory().getAllItems()[j].getNbt().getTag("tag").getKeys().indexOf("ench") > -1){
                                //遍历附魔状态
                                for(l in je.tag.ench){
                                    //遍历是否符合配置文件
                                    for(x in handSlotId){
                                        //对比id
                                        if(je.tag.ench[l].id.toString() == handSlotId[x]){
                                            //对比配置文件
                                            if(je.tag.ench[l].lvl > file.get(handSlotId[x])){
                                                players[i].getInventory().getAllItems()[j].setNull();
                                                log("玩家"+ players[i].name +"违规附魔,已删除违规物品");
                                                return;
                                            }
                                        } 
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}