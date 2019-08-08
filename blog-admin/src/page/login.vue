<template>
    <div class="login">
        <div class="wrap">
            <h2>PastLoveBlog Admin</h2>
            <div class="input-area">
                <el-row class="error-msg" v-if="errorMsg">
                    <span >{{errorMsg}}</span>
                </el-row>
                <el-row>
                    <label for="user">用户名:</label><input type="text" id="user" placeholder="请输入用户名" v-model="userName"/>
                </el-row>
                <el-row>
                    <label for="password">密&nbsp;&nbsp;&nbsp;&nbsp;码:</label><input type="password" id="password" placeholder="请输入密码" v-model="password"/>
                </el-row>
            </div>
            <div class="login-button">
                <button @click="handleLogin">登陆</button>
            </div> 
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    data(){
        return {
            userName:"",
            password:"",
            errorMsg:""
        }
    },
    methods:{
        ...mapMutations(["setUserInfo"]),
        handleLogin(){
            if(this.checkUserName()&&this.checkPassword()){
                this.axios.post("/login",this.$qs.stringify({
                    userName:this.userName,
                    password:this.password
                })).then((res)=>{
                    if(res.data.status =="0"){
                        this.errorMsg = res.data.msg;
                        this.password = "";
                    }else{
                        this.setUserInfo(res.data.data);
                        this.$router.push({name:'published'})                        
                    }
                });
            }
        },
        checkUserName(){
            if(this.userName == ""){
                this.errorMsg = "用户名不能为空";
                return false;
            }else{
                this.errotMsg = "";
                return true;
            }
        },
        checkPassword(){
            if(this.password == ""){
                this.errorMsg = "密码不能为空";
                return false;
            }else{
                this.errorMsg = "";
                return true;
            }
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/css/login.scss";

</style>