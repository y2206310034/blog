const centenceRouter = (router,loader)=>{
    //获取所有的标签
    router.get("/getTags",loader.get("/getTags"));

}
module.exports = centenceRouter;