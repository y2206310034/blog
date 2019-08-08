const imgRouter = (router,loader)=>{
    //上传图片
    router.post("/uploadImg",loader.get("/uploadImg"));
    //删除图片
    router.get("/deleteSingleImg",loader.get("/deleteSingleImg"));
    //删除一些图片
    router.get("/deleteManyImg",loader.get("/deleteManyImg"));
    //查找图片是否存在
    router.get("/searchImg",loader.get("/searchImg"));
    //获取图片
    router.get("/getImgPath",loader.get("/getImgPath"));
    //获取图片总数
    router.get("/getImgCount",loader.get("/getImgCount"));
}
module.exports = imgRouter;