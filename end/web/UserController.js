const userDao = require("../Dao/userDao");
const md5 = require("js-md5");
const path = new Map();
const jwt = require("jsonwebtoken");
const secretKey = require("../utils/secret").secretKey;
const login = (req,res)=>{
    userDao.searchUser(req.body.userName,(doc)=>{
        if(doc.length == 0){
            res.json({status:"0",msg:"用户不存在,请重新输入用户名",data:{}})
        }else{
            if(doc[0].password === md5(req.body.password + doc[0].randomNum)){
                //当登陆成功后
                let token = jwt.sign({
                    id:doc[0]._id,
                    userName:doc[0].userName
                }, secretKey, {
                    expiresIn : 60 * 60 * 24 // 授权时效24小时
                });
                let lastTime = doc[0].lastLogin;
                userDao.updateLastLogin(req.body.userName,Date.now(),()=>{
                    res.json({status:"1",msg:"查询成功",data:{id:doc[0]._id,userName:doc[0].userName,lastLogin:lastTime},token:token});
                })
            }else{
                res.json({status:"0",msg:"密码错误,请输入正确的密码",data:{}})
            }
        }
    })
}

path.set("/login",login);

const checkPassword = (req,res)=>{
    const userName = req.body.userName;
    userDao.searchUser(userName,(doc)=>{
        if(doc[0].password === md5(req.body.password + doc[0].randomNum)){
            res.json({status:"1",msg:"密码正确",data:{}});
        }else{
            res.json({status:"0",msg:"密码错误",data:{}});
        }
    })
}
path.set("/checkPassword",checkPassword);

const updatePassword = (req,res)=>{
    const randomNum = Math.ceil(Math.random()*10000);
    const password = md5(req.body.password+randomNum);
    userDao.updatePassword(req.body.userName,password,randomNum,(doc)=>{
        res.json({status:"1",msg:"修改成功",data:{}})
    })
}
path.set("/updatePassword",updatePassword);

module.exports.path = path;