const mongoose = require("mongoose")
const md5 = require("js-md5");
// const globalConfig = require("../config.js");
//在mongodb中collection(集合)相当于数据库表
//                                   /blog相当于一个数据库
mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true ,
    useFindAndModify:false
});
//文章
const articleSchema = new mongoose.Schema({
    articleId: "number",
    title:"string",
    imgName:"string",
    category:"string",
    tags:"array",
    content:"string",
    commentNum:"number",
    viewNum:"number",
    date:"date"
})
//图片
const imgSchema = new mongoose.Schema({
    imgPath:"string",
    date:"date"
})
//后台用户
const userSchema = new mongoose.Schema({
    //用户名
    userName: "string",
    //密码
    password: "string",
    //最后登录时间
    lastLogin: "string",
    //随机拼接的数字
    randomNum: "string"
})
//经典句子
const centenceSchema = new mongoose.Schema({
    centenceId:"number",
    author:"string",
    content:"string",
    saveTime:"date"
})

const tagArtilceMappingSchema = new mongoose.Schema({
    tag:"string",
    articleId:"number",
    saveTime:"date"
})
//这是辅助实现文章列表自增
const counterSchema = new mongoose.Schema({
    _id: "string",
    seq: "number"
})
//辅助实现句子列表自增
const counterCentenceSchema = new mongoose.Schema({
    _id:"string",
    seq:"number"
})
//句子实现自增序列
centenceSchema.pre("save", function(next) {
    let _this = this;
    db.counterCen.find({},(err,doc) =>{
        if(!err){
            if(!doc.length){
                new db.counterCen({_id: 'entityId',seq: 1}).save()
                next();
            }else{
                //                                        将该字段的值  加1
                db.counterCen.findByIdAndUpdate({_id: 'entityId'}, {$inc: {seq: 1} }, function(error, counter){
                    if(error){
                        return next(error)
                    }else{
                        _this.centenceId = counter.seq
                        next();
                    }
                })
            }
        }
    })
})

//文章实现自增序列
articleSchema.pre("save", function(next) {
    let _this = this;
    db.counter.find({},(err,doc) =>{
        if(!err){
            if(!doc.length){
                new db.counter({_id: 'entityId',seq: 1}).save()
                next();
            }else{
                //                                        将该字段的值  加1
                db.counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: {seq: 1} }, function(error, counter){
                    if(error){
                        return next(error)
                    }else{
                        _this.articleId = counter.seq
                        next();
                    }
                })
            }
        }
    })
})
const db = {
    article: mongoose.model("article",articleSchema),
    counter: mongoose.model("counter",counterSchema),
    user: mongoose.model("user",userSchema),
    img:mongoose.model("img",imgSchema),
    centence:mongoose.model("centence",centenceSchema),
    counterCen:mongoose.model("counterCen",counterCentenceSchema),
    tagArticleMapping:mongoose.model("tagArticleMapping",tagArtilceMappingSchema)
}
//初始化用户
const initUser = () => {
    //在用户集合中查找如果已有管理用户注册  则打印Userinit has done  否则初始化一个用户
    db.user.find({},(err,doc) => {
        if(err){
            console.log(err)
        }else{
            if(!doc.length){
                let randomNum = Math.ceil(Math.random()*10000);
                //初始化一个用户名为admin密码为123456的用户  存入数据库时对密码拼接一个随机数并对这个字符串进行md5加密
                //在用户登陆时 通过用户名获取到存取的随机数与用户输入的密码拼接然后进行md5加密与之前存入数据库的加密密码比较是否相同
                new db.user({userName: "admin",password: md5("123456"+randomNum),randomNum: randomNum,lastLogin: Date.now()}).save()
            }else{
                console.log("Userinit has done")
            }
        }
    })
}
mongoose.connection.once("open",() => {
    initUser()
})
module.exports = db;
