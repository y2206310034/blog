const userRouter = (router,loader)=>{
    //登陆
    router.post("/login",loader.get("/login"));
    //密码检测
    router.post("/checkPassword",loader.get("/checkPassword"));
    //更新密码
    router.post("/updatePassword",loader.get("/updatePassword"));
}
module.exports = userRouter;