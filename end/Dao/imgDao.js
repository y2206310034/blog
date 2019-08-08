const db = require("./dbutil.js");

const saveImg = (imgPath,success)=>{
    let newImg = new db.img({
        imgPath,
        date:Date.now()
    })
    newImg.save(function(err){
        if(err){
            console.log(err)
        }else{
            success();
        }
    })
}
//删除单个图片
const deleteSingleImgByImgPath = (imgPath,success)=>{
    db.img.deleteOne({imgPath:imgPath},function(err){
        if(err){
            console.log(err);
        }else{
            success();
        }
    })
}
//删除一些图片
const deleteManyImg = (imgPathArr,success)=>{
    db.img.deleteMany({imgPath:{$in:imgPathArr}},function(err){
        if(err){
            console.log(err);
        }else{
            success();
        }
    })
}
//    将倒序分页获取图片  page代表页数，count 带表每页的多少
const getManyPath = (page,count,success)=>{
    db.img.find({},function(err,doc){
        if(err){
            console.log(err);
        }else{
            success(doc)
        }
    }).sort({_id: -1}).skip(page * count).limit(count);
}
//获取图片的总共数量
const getImgCount = (success)=>{
    db.img.countDocuments({},function(err,count){
        if(err){
            console.log(err);
        }else{
            success(count);
        }
    })
}

module.exports.saveImg = saveImg;
module.exports.deleteSingleImgByImgPath = deleteSingleImgByImgPath;
module.exports.getManyPath = getManyPath;
module.exports.getImgCount = getImgCount;
module.exports.deleteManyImg = deleteManyImg;




