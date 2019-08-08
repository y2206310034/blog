const db = require("./dbutil.js");


const searchUser = (userName,success)=>{
    db.user.find({userName:userName},(err,doc)=>{
        if(!err){
            success(doc);
        }else{
            console.log(err);
        }
    })
}
const updateLastLogin = (userName,lastLogin,success)=>{
    db.user.findOneAndUpdate({userName},{lastLogin},(err,)=>{
        if(!err){
            success();
        }else{
            console.log(err);
        }
    })
}
const updatePassword = (userName,password,randomNum,success)=>{
    db.user.findOneAndUpdate({userName},{password,randomNum},(err)=>{
        if(!err){
            success();
        }else{
            console.log(err);
        }
    })
}



module.exports.searchUser = searchUser;
module.exports.updateLastLogin = updateLastLogin;
module.exports.updatePassword = updatePassword;


