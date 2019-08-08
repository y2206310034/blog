const centenceRouter = (router,loader)=>{
    //获取最后一个句子
    router.get("/getLastCentence",loader.get("/getLastCentence"));

}
module.exports = centenceRouter;