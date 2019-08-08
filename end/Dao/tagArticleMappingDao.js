const db = require("./dbutil.js");

// const searchTag = (tag,success)=>{
//     db.tag.find({tag},(err,doc)=>{
//         if(!err){
//             success(doc);
//         }else{
//             console.log(err);
//         }
//     })
// }
const searchAllMap = (success)=>{
    db.tagArticleMapping.find({},(err,doc)=>{
        if(!err){
            success(doc)
        }else{
            console.log(err);
        }
    })
}
const saveMap = (articleId,tag,success)=>{
    let newTag = new db.tagArticleMapping({
        articleId,
        tag,
        saveTime:Date.now()
    })
    newTag.save(function(err){
        if(!err){
            success()
        }else{
            console.log(err);
        }
    })
}
// const searchMap = (articleId,tag,success)=>{
//     db.tagArticleMapping.find({tag,articleId},(err,doc)=>{
//         if(!err){
//             success(doc);
//         }else{
//             console.log(err);
//         }
//     })
// }

const searchArticleByTag = (tag,success)=>{
    db.tagArticleMapping.find({tag},(err,doc)=>{
        if(!err){
            success(doc)
        }else{
            console.log(err);
        }
    })
}
const deleteMap = (articleId,success)=>{
    db.tagArticleMapping.deleteMany({articleId},(err)=>{
        if(err){
            console.log(err);
        }else{
            success();
        }
    })
}
module.exports.searchAllMap = searchAllMap;
module.exports.saveMap = saveMap;
module.exports.deleteMap = deleteMap;
module.exports.searchArticleByTag = searchArticleByTag;


