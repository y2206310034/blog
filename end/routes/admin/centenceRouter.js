const centenceRouter = (router,loader)=>{

    //获取句子总数
    router.get("/getCentenceCount",loader.get("/getCentenceCount"));
    //获取文章   通过页数 和个数
    router.get("/getManyCentence",loader.get("/getManyCentence"));
    //上传句子
    router.post("/uploadCentence",loader.get("/uploadCentence"));
    //修改句子
    router.post("/updateCentence",loader.get("/updateCentence"));
    //删除句子
    router.get("/deleteCentenceById",loader.get("/deleteCentenceById"));
    //获得句子 根据id
    router.get("/getCentenceById",loader.get("/getCentenceById"));

}
module.exports = centenceRouter;