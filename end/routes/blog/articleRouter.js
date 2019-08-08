const articleRouter = (router,loader)=>{
    //获取最近发表文章
    router.get("/getArticle",loader.get("/getArticle"));
    //获取浏览次数最多的几个文章
    router.get("/getHotArticle",loader.get("/getHotArticle"));
    //通过Category获取文章
    router.get("/getArticleByCategory",loader.get("/getArticleByCategory"));
    //通过id获取文章
    router.get("/getArticleById",loader.get("/getArticleById"));
    // 通过tag获取文章
    router.get("/getArticleByTag",loader.get("/getArticleByTag"));
    //  获取指定类型的文章总数
    router.get("/getArticleCount",loader.get("/getArticleCount"));
    // 通过模糊查询获取文章
    router.get("/getArticleByLikeQuery",loader.get("/getArticleByLikeQuery"));
}
module.exports = articleRouter;