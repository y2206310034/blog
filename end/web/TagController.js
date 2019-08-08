const tagArticleMappingDao = require("../Dao/tagArticleMappingDao");
const path = new Map();



const getTags = (req,res)=>{
    tagArticleMappingDao.searchAllMap((doc)=>{
        let result = new Set();
        doc.forEach(item=>{
            result.add(item.tag);
        })
        res.json({status:"1",msg: "查找成功",data: [...result]});

    })
}

path.set("/getTags",getTags)
module.exports.path = path;