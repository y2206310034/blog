const fs = require("fs");
const pathModule = require("path");
const url = require("url");
const imgDao = require("../Dao/imgDao");

const baseUrl = require("../utils/secret").baseUrl;
const basePath = "/../page/static/img";

//用于处理前台发送的图片
const formidable = require("formidable");
const path = new Map();

const uploadImg = (req, res) => {
    //data为返回给客户端的状态信息
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = pathModule.join(__dirname + basePath);
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;
    //处理图片
    form.parse(req, (err, fields, files)=> {
        let filename = files.file.name;
        let nameArray = filename.split(".");
        let type = nameArray[1];
        let date = new Date();
        //已文件上传时间作为文件名
        let avatarName = "/" + date.getTime() + "."+ type;
        let newPath = form.uploadDir + "/" + avatarName;
        fs.renameSync(files.file.path, newPath); //重命名
        let data = {
            name:avatarName,
            url:baseUrl + avatarName
        };
        imgDao.saveImg(avatarName,()=>{
            res.json({status:"1",msg: "上传图片成功", data:data});
        })
    })
}
path.set("/uploadImg",uploadImg);
const searchImg = (req,res)=>{
    const params = url.parse(req.url,true).query;
    fs.exists(pathModule.join(__dirname + basePath  + params.imgPath),(exists)=>{
        if(exists){
            res.json({status:"1",msg: "图片存在",data: {imgPath:baseUrl + params.imgPath}});
        }else {
            res.json({status:"0",msg: "图片不存在",data: {}});
        }
    })
}
path.set("/searchImg",searchImg);

//删除单个图片
const deleteSingleImg = (req,res)=>{
    const params = url.parse(req.url,true).query;
    fs.unlink( pathModule.join(__dirname + basePath  + params.imgPath), err => {
        if (!err) {
            imgDao.deleteSingleImgByImgPath(params.imgPath,function(){
                res.json({status:"1",msg: "删除成功",data: {}});
            })
        } else{
            res.json({status:"0",msg:"未删除成功",data: {}});
        }
    });
}
path.set("/deleteSingleImg",deleteSingleImg);

const unlinkArr = (imgArr)=>{
    let arr = [];
    for(let i = 0;i < imgArr.length;i ++){
        arr.push( new Promise((resolve,reject)=>{
            fs.unlink( pathModule.join(__dirname + basePath  + imgArr[i]), err => {
                if (!err) {
                    resolve(true);
                } else{
                    reject(err);
                }
            })
        }))
    }
    return Promise.all(arr);
}
const deleteManyImg = (req,res)=>{
    const params = url.parse(req.url,true).query;
    const imgArr = JSON.parse(params.imgArr)
    unlinkArr(imgArr).then((result)=>{
        imgDao.deleteManyImg(imgArr,function(){
            res.json({status:"1",msg: "删除成功",data: {}});
        })
    }).catch(error=>console.log(error));
}
path.set("/deleteManyImg",deleteManyImg);


const getImgPath = (req,res)=>{
    const params = url.parse(req.url,true).query;
    imgDao.getManyPath(parseInt(params.page),parseInt(params.count),function(result){
        let data = result.map(function(item){
            return {
                imgUrl:baseUrl + item.imgPath,
                imgName:item.imgPath.slice(1)
            };
        });
        res.json({status:"1",msg: "获取成功",data: data});
    })
}
path.set("/getImgPath",getImgPath);
const getImgCount = (req,res)=>{
    imgDao.getImgCount(function(count){
        res.json({status:"1",msg: "获取成功",data: {count:count}});
    })
}
path.set("/getImgCount",getImgCount);

module.exports.path = path;