const fs = require("fs");
const globalConfig = require("./config.js");

const controllerSet =[];

//存放web层的controller中的函数
const pathMap = new Map();


//读取web层中所有的文件名称
const files = fs.readdirSync( globalConfig["web_path"]);

//将web层controller中的函数一次放入到pathMap中
for(let i = 0; i<files.length;i ++ ){
    //引入当前controller文件
    const temp  = require("./"  + globalConfig["web_path"] + "/"+ files[i]);
    if(temp.path){
        for(let [k,v ]of temp.path){
            if(pathMap.get(k) == null){
                pathMap.set(k,v);
            }else{
                throw new Error("url path异常, url:" + k);
            }
        }
        controllerSet.push(temp.path);
    }
}
module.exports = pathMap;