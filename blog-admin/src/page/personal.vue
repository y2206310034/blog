<template>
<div class="personal">
    <div class="update">
        <h2>修改密码</h2>
        <div class="updateWrap">
            <el-row>
                <label for="oldPw">旧密码:</label><input type="password" id="oldPw" v-model="oldPw">
                <span v-if="!isFirst&&!oldPw" class="tip">不能为空</span>
                <span v-if="!isOld">密码错误</span>
            </el-row>
            <el-row>
                <label for="newPw1">新密码:</label><input type="password" id="newPw1" v-model="newPw1">
            </el-row>
            <el-row>
                <label for="newPw2">确认密码:</label><input type="password" id="newPW2" v-model="newPw2">
                <span v-if="!isSame&&newPw1&&newPw2" class="tip">两次密码不相同,请重新输入</span>
                <span v-if="!isFirst&&(!newPw1||!newPw2)" class="tip">不能为空</span>
            </el-row>
            <el-row>
                <button @click="startCheck" >确认</button>        
            </el-row>
        </div>
    </div>
</div>

</template>

<script>
import { mapState } from "vuex";
export default {
    data(){
        return {
            oldPw:"",
            newPw1:"",
            newPw2:"",
            isOld:true,
            isSame:true,
            isFirst:true
        }
    },
    methods:{
        checkNewPw(){
            if(this.newPw1==this.newPw2){
                this.isSame = true;
                return true;
            }else{
                this.isSame = false;
                return false;
            }
        },
        startCheck(){
            this.isFirst = false;
            if(this.oldPw&&this.newPw1&&this.newPw2&&this.checkNewPw()){
                this.$confirm('修改成功将会重新登陆, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.updatePassword();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });          
                });
            }
        },
        updatePassword(){
            this.axios.post("/checkPassword",this.$qs.stringify({
                userName:this.userName,
                password:this.oldPw
            })).then(res=>{
                if(res.data.status == "1"){
                    this.axios.post("/updatePassword",this.$qs.stringify({
                        userName:this.userName,
                        password:this.newPw1
                    })).then(res=>{
                        this.$router.push({name:"login"});
                    })
                }else{
                    this.old = false;
                }
            })
        },
    },
    computed:{
        ...mapState(["userName"]),

    }

}
</script>

<style lang="scss">
@import "@/assets/css/personal.scss";

</style>