const db = require("./dbutil.js");
const mongoose = require('mongoose');
const getManyCentence = (page,count,success)=>{
    db.centence.find({},function(err,doc){
        if(err){
            console.log(err);
        }else{
            success(doc)
        }
    }).sort({_id: -1}).skip(page * count).limit(count);
}
const getCentenceCount = (success)=>{
    db.centence.countDocuments({},function(err,count){
        if(err){
            console.log(err);
        }else{
            success(count);
        }
    })
}
const saveCentence = (centence,success)=>{
    let newCentence = new db.centence({
        ...centence,
        saveTime:Date.now(),
        centeceId:0
    })
    newCentence.save(function(err,doc){
        if(err){
            console.log(err)
        }else{
            success(doc);
        }
    })
}

//删除
const deleteCentenceById = (centenceId,success)=>{
    db.centence.deleteOne({centenceId},function(err,doc){
        if(err){
            console.log(err);
        }else{
            success();
        }
    })
}
// 查找
const getCentenceById = (centenceId,success)=>{
    db.centence.find({centenceId},(err,doc)=>{
        if(!err){
            success(doc)
        }else{
            console.log(err);
        }
    })
}
//修改
const updateCentence = (centenceId,updateObj,success)=>{
    db.centence.findOneAndUpdate({centenceId}, updateObj , (err,doc)=>{
        if(!err){
            success();
        }else{
            console.log(err);
        }
    })
}
const getLastCentence = (success)=>{
    db.centence.findOne({},(err,doc)=>{
        if(!err){
            success(doc);
        }else{
            console.log(err);
        }
    }).sort({_id: -1});
}
module.exports.updateCentence = updateCentence;
module.exports.getCentenceById = getCentenceById;
module.exports.deleteCentenceById = deleteCentenceById;
module.exports.saveCentence = saveCentence;
module.exports.getCentenceCount = getCentenceCount;
module.exports.getManyCentence = getManyCentence;
module.exports.getLastCentence = getLastCentence;

