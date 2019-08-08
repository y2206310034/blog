const db = require("./dbutil.js");


const getCurId = (success)=>{
    db.counter.findOne({"_id":"entityId"},(err,doc)=>{
        if(!err){
            success(doc);
        }else{
            console.log(err);
        }
    })
}



module.exports.getCurId = getCurId;