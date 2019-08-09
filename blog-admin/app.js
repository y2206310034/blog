const express = require("express");
const history = require('connect-history-api-fallback');
const compression = require("compression");
const app = express();

app.use(history());
//静态资源
app.use(compression());
app.use(express.static("./dist/"));


app.listen(12306,function(){
    console.log("服务已启动")
})
