const url = require("url");
const articleDao = require("../Dao/articleDao");
const counterDao = require("../Dao/counterDao");
const tagArticleMappingDao = require("../Dao/tagArticleMappingDao");
const baseUrl = require("../utils/secret").baseUrl + "/";

const path = new Map();


// 获取
//获取文章通过页码和个数   后台获取
const getArticleAdmin =(req,res)=>{
    const params = url.parse(req.url,true).query;
    articleDao.getArticle(Math.floor(params.page),Math.floor(params.count),(result)=>{
        result = result.map(item=>{
            let obj = {
                articleId:item.articleId,
                category:item.category,
                commentNum:item.commentNum,
                content:item.content,
                date:item.date,
                imgName:item.imgName,
                tags:item.tags,
                title:item.title,
                viewNum:item.viewNum
            }
            return obj;
        })
        res.json({status:"1",msg: "上传成功",data: result});
    })
}
path.set("/getArticleAdmin",getArticleAdmin);


function setContent(result){
    for(var i =  0; i < result.length;i ++){
        result[i].content = result[i].content.replace(/<img[\w\W]*"/g,"");
        result[i].content = result[i].content.replace(/<[\w\W]*?>/g,"");
        result[i].content = result[i].content.substring(0,100);
    }
}
//获取文章通过页码和个数   前台获取
const getArticle = (req,res)=>{
    const params = url.parse(req.url,true).query;
    articleDao.getArticle(parseInt(params.page),parseInt(params.count),(result)=>{
        result = result.map(item=>{
            let obj = {
                articleId:item.articleId,
                category:item.category,
                content:item.content,
                date:item.date,
                img:baseUrl +item.imgName,
                title:item.title,
            }
            return obj;
        })
        setContent(result);
        res.json({status:"1",msg: "上传成功",data: result});
    })
}
path.set("/getArticle",getArticle);
//获取浏览量大的一些文章
const getHotArticle = (req,res)=>{
    const params = url.parse(req.url,true).query;
    articleDao.getArticleByViewNum(parseInt(params.count),(result)=>{
        result = result.map(item=>{
            let obj = {
                articleId:item.articleId,
                date:item.date,
                img:baseUrl +item.imgName,
                title:item.title,
                viewNum:item.viewNum
            }
            return obj;
        })
        res.json({status:"1",msg: "上传成功",data: result});
    })
}
path.set("/getHotArticle",getHotArticle);

//通过category获取文章
const getArticleByCategory = (req,res)=>{
    const params = url.parse(req.url,true).query;
    // console.log(params);
    articleDao.getArticleByCategory(params.category,parseInt(params.page),parseInt(params.count),result=>{
        result = result.map(item=>{
            let obj = {
                articleId:item.articleId,
                date:item.date,
                img:baseUrl +item.imgName,
                title:item.title,
                viewNum:item.viewNum,
                category:item.category
            }
            return obj;
        })
        res.json({status:"1",msg: "获取成功",data: result});
    })
}
path.set("/getArticleByCategory",getArticleByCategory);

//获取文章总数 
const getArticleCount = (req,res)=>{
    const params = url.parse(req.url,true).query;    
    articleDao.getArticleCount(params,(count)=>{
        res.json({status:"1",msg: "获取成功",data: {count:count}});
    })
}
path.set("/getArticleCount",getArticleCount);

//通过id(articleId)获取文章   后台
const getArticleByIdAdmin = (req,res)=>{
    const params = url.parse(req.url,true).query;
    articleDao.getArticleById(params.articleId,(doc)=>{
        let result = {
            articleId:doc[0].articleId,
            category:doc[0].category,
            commentNum:doc[0].commentNum,
            content:doc[0].content,
            date:doc[0].date,
            imgName:doc[0].imgName,
            tags:doc[0].tags,
            title:doc[0].title,
            viewNum:doc[0].viewNum
        }
        res.json({status:"1",msg: "获取成功",data: result});
    })
}
path.set("/getArticleByIdAdmin",getArticleByIdAdmin);

//通过id(articleId)获取文章   前端
const getArticleById = (req,res)=>{
    const params = url.parse(req.url,true).query;
    articleDao.getArticleById(params.articleId,(doc)=>{
        let result = {
            articleId:doc[0].articleId,
            category:doc[0].category,
            commentNum:doc[0].commentNum,
            content:doc[0].content,
            date:doc[0].date,
            img:baseUrl + doc[0].imgName,
            tags:doc[0].tags,
            title:doc[0].title,
            viewNum:doc[0].viewNum
        }
        res.json({status:"1",msg: "获取成功",data: result});
    })
}
path.set("/getArticleById",getArticleById);

// 通过Tag获取文章
const getArticleByTag = (req,res)=>{
    const params = url.parse(req.url,true).query;
    tagArticleMappingDao.searchArticleByTag(params.tag,(doc)=>{
        var articleIdArr = [];
        doc.forEach(item=>{
            articleIdArr.push(item.articleId);
        })
        articleDao.getManyArticleByArticleId(articleIdArr,(result)=>{
            result = result.map(item=>{
                let obj = {
                    articleId:item.articleId,
                    date:item.date,
                    img:baseUrl +item.imgName,
                    title:item.title,
                    viewNum:item.viewNum,
                    category:item.category
                }
                return obj;
            })
            res.json({status:"1",msg: "获取成功",data: result});
        })
    })
}
path.set("/getArticleByTag",getArticleByTag);
const getArticleByLikeQuery = (req,res)=>{
    const params = url.parse(req.url,true).query;
    articleDao.getArticleByLikeQuery(params.keyWord,(result)=>{
        result = result.map(item=>{
            let obj = {
                articleId:item.articleId,
                title:item.title,
                content:item.content
            }
            return obj;
        })
        setContent(result);
        res.json({status:"1",msg: "获取成功",data: result});
    })    
}
path.set("/getArticleByLikeQuery",getArticleByLikeQuery);

//删除
//通过id删除文章
const deleteArticleById = (req,res)=>{
    const params = url.parse(req.url,true).query;
    articleDao.deleteArticleById(params.articleId,()=>{
        tagArticleMappingDao.deleteMap(params.articleId,()=>{
            res.json({status:"1",msg: "获取成功",data: {}});
        })
    })
}
path.set("/deleteArticleById",deleteArticleById);


//  上传
const handleMap = (articleId,tags)=>{
    let arr = [];
    try{
        tags.forEach((item)=>{
            arr.push(new Promise((resolve,reject)=>{
                tagArticleMappingDao.saveMap(articleId,item,()=>{
                    resolve();
                })
            }))
        })
    }catch(err){
        reject(err);
    }

    return Promise.all([arr]);
}
//上传文章
const uploadArticle = (req,res)=>{
    const article = req.body;
    article.tags = article.tags.split(",");
    articleDao.saveArticle(article,(doc)=>{
        counterDao.getCurId(doc=>{
            const articleId = doc.seq - 1;
            handleMap(articleId,article.tags).then(()=>{
                res.json({status:"1",msg: "发表成功",data: {}});
            },err=>{
                console.log(err);
            })
        })
    })

}
path.set("/uploadArticle",uploadArticle);
//更新文章
const updateArticle = (req,res)=>{
    const article = req.body;
    article.tags = article.tags.split(",");
    articleDao.updateArticle(article.articleId,article,(doc)=>{
        tagArticleMappingDao.deleteMap(article.articleId,()=>{
            handleMap(article.articleId,article.tags).then(result=>{
                res.json({status:"1",msg: "修改成功",data: {}});
            },err=>{
                console.log(err);
            })
        })
    })
}
path.set("/updateArticle",updateArticle);

module.exports.path = path;
