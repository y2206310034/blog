const express = require("express");
const router = express.Router();
const loader = require("../loader.js");
const jwtAuth = require("../middleware/jwt");
const imgRouter = require("./admin/imgRouter");
const userRouter = require("./admin/userRouter");
const articleRouter = require("./admin/articleRouter");
const centenceRouter = require("./admin/centenceRouter");





router.use(jwtAuth);

//用户相关
userRouter(router,loader);


//img相关
imgRouter(router,loader);

//article相关
articleRouter(router,loader);

//centence相关
centenceRouter(router,loader);

module.exports = router;