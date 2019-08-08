const fs = require("fs");
const pathModule = require("path");
const url = require("url");
const centenceDao = require("../Dao/centenceDao");
const path = new Map();

const getManyCentence =(req,res)=>{
    const params = url.parse(req.url,true).query;
    centenceDao.getManyCentence(Math.floor(params.page),Math.floor(params.count),(result)=>{
        result = result.map(item=>{
            let obj = {
                centenceId:item.centenceId,
                author:item.author,
                content:item.content,
                saveTime:item.saveTime
            }
            return obj;
        })
        res.json({status:"1",msg: "上传成功",data: result});
    })
}
path.set("/getManyCentence",getManyCentence);

const getCentenceCount = (req,res)=>{
    centenceDao.getCentenceCount(function(count){
        res.json({status:"1",msg: "获取成功",data: {count:count}});
    })
}
path.set("/getCentenceCount",getCentenceCount);
const uploadCentence = (req,res)=>{
    const centence = req.body;
    centenceDao.saveCentence(centence,(result)=>{
        res.json({status:"1",msg: "上传成功",data:{}});
    })
}
path.set("/uploadCentence",uploadCentence);
const getCentenceById = (req,res)=>{

    const params = url.parse(req.url,true).query;
    centenceDao.getCentenceById(params.centenceId,(doc)=>{
        let result = {
            centenceId:doc[0].centenceId,
            author:doc[0].author,
            content:doc[0].content,
            saveTime:doc[0].saveTime
        }
        res.json({status:"1",msg: "获取成功",data: result});
    })
}
path.set("/getCentenceById",getCentenceById);

const updateCentence = (req,res)=>{
    const updateObj ={
        ...req.body,
        saveTime:Date.now()
    }

    centenceDao.updateCentence(req.body.centenceId,updateObj,()=>{
        res.json({status:"1",msg: "修改成功",data: {}});
    })
}
path.set("/updateCentence",updateCentence);

const deleteCentenceById = (req,res)=>{
    const params = url.parse(req.url,true).query;
    centenceDao.deleteCentenceById(params.centenceId,()=>{
        res.json({status:"1",msg: "删除成功",data: {}});
    })
}
path.set("/deleteCentenceById",deleteCentenceById);
const getLastCentence = (req,res)=>{
    centenceDao.getLastCentence(doc=>{
        const data = {
            author:doc.author,
            centenceId:doc.centenceId,
            content:doc.content,
            saveTime:doc.saveTime
        }
        res.json({status:"1",msg: "查找成功",data: data});
    })
}
path.set("/getLastCentence",getLastCentence);

module.exports.path = path;


