const db = require("./dbutil.js");


const saveArticle = (article,success)=>{
    let newArticle = new db.article({
        articleId: 0,
        ...article,
        date:Date.now(),
        commentNum:0,
        viewNum:0
    })
    newArticle.save(function(err,doc){
        if(err){
            console.log(err)
        }else{
            success(doc.articleId);
        }
    })
}

//获取某些条件下文章总数
const getArticleCount = (params,success)=>{
    db.article.countDocuments(params,function(err,count){
        if(err){
            console.log(err);
        }else{
            success(count);
        }
    })
}
//    将倒序分页获取文章  page代表页数，count 代表每页的多少
const getArticle = (page,count,success)=>{
    db.article.find({},function(err,doc){
        if(err){
            console.log(err);
        }else{
            success(doc)
        }
    }).sort({_id: -1}).skip(page * count).limit(count);
}

// 将倒序分页获取category为某一值的文章  page代表页数，count 代表每页的多少
const getArticleByCategory = (category,page,count,success)=>{
    db.article.find({category},function(err,doc){
        if(err){
            console.log(err);
        }else{
            success(doc)
        }
    }).sort({_id: -1}).skip(page * count).limit(count);
}
const deleteArticleById = (articleId,success)=>{
    db.article.deleteOne({articleId},(err)=>{
        if(!err){
            success();
        }else{
            console.log(err);
        }
    })
}
const getArticleById = (articleId,success)=>{
    db.article.find({articleId},(err,doc)=>{
        if(!err){
            success(doc)
        }else{
            console.log(err);
        }
    })
}
//                   articleId值    将要更新的数据对象
const updateArticle = (articleId,updateObj,success)=>{
    db.article.findOneAndUpdate({articleId}, updateObj , (err)=>{
        if(!err){
            success();
        }else{
            console.log(err);
        }
    })
}
//根据浏览次数   获得浏览次数最多的文章
const getArticleByViewNum = (count,success)=>{
    db.article.find({},function(err,doc){
        if(err){
            console.log(err);
        }else{
            success(doc)
        }
    }).sort({viewNum: -1}).limit(count);;
}

// 根据一组articleId获取一组文章

const getManyArticleByArticleId = (articleIdArr,success)=>{
    db.article.find({articleId:{$in:articleIdArr}},(err,doc)=>{
        if(!err){
            success(doc);
        }else{
            console.log(err);
        }
    })
}
// 对文章标题和内容进行模糊查询  返回符合条件的文章
const getArticleByLikeQuery = (keyWord,success)=>{
    const reg = new RegExp(keyWord,"i");
    db.article.find({$or:[
        {title:{$regex:reg}},
        {content:{$regex:reg}}
    ]},function (err,doc){
        if(!err){
            success(doc)
        }else{
            console.log(err);
        }

    }).sort({_id:-1})
}



module.exports.saveArticle=saveArticle;
module.exports.getArticleCount=getArticleCount;
module.exports.getArticle=getArticle;
module.exports.deleteArticleById=deleteArticleById;
module.exports.updateArticle=updateArticle;
module.exports.getArticleById=getArticleById;
module.exports.getArticleByViewNum=getArticleByViewNum;
module.exports.getArticleByCategory=getArticleByCategory;
module.exports.getManyArticleByArticleId=getManyArticleByArticleId;
module.exports.getArticleByLikeQuery=getArticleByLikeQuery;







