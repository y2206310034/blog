const articleRouter = (router,loader)=>{
    //上传文章
    router.post("/uploadArticle",loader.get("/uploadArticle"));
    //后台获取文章
    router.get("/getArticleAdmin",loader.get("/getArticleAdmin"));
    //通过文章id获取文章
    router.get("/getArticleByIdAdmin",loader.get("/getArticleByIdAdmin"));
    //获取文章总数
    router.get("/getArticleCount",loader.get("/getArticleCount"));
    //删除文章通过id
    router.get("/deleteArticleById",loader.get("/deleteArticleById"));
    //更新文章通过  自定义的articleId属性
    router.post("/updateArticle",loader.get("/updateArticle"));
}
module.exports = articleRouter;