const express = require("express");
const bodyParser = require("body-parser")  // 获取请求体中信息的中间件
const globalConfig = require("./config.js");
const history = require('connect-history-api-fallback');
const app = express();
// gzip压缩
const compression = require('compression')
//引入路由
const admin = require("./routes/admin.js");
const index = require("./routes/index.js")
//在请求的返回之中   code 0 代表失败   1 代表成功

app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据
app.use(bodyParser.json());//数据JSON类型

app.use(compression());

let allowCrossDomain = function (req, res, next) {
    //域
    res.header("Access-Control-Allow-Origin","*");
    //方式
    res.header("Access-Control-Allow-Methods","*");
    //头
    res.header("Access-Control-Allow-Headers", "*");
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
};
app.use(allowCrossDomain);
app.use(history());
//静态资源
app.use(express.static("./page/"));


//前台接口
app.use("/blog",index);

//后台接口
app.use("/admin",admin);

app.listen(globalConfig["port"],function(){
    console.log("服务已启动")
})
