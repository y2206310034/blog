<template>
<el-row>
    <el-col :span="4" class="left">
        <ul class="nav">
            <li class="nav-item">
                <router-link :to="{name:'published'}">
                    <i class="el-icon-folder-opened"></i>
                    <span>已发表</span>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name:'articlePublish'}">
                    <i class="el-icon-edit-outline"></i>
                    <span>发表文章</span>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name:'centence'}">
                    <i class="el-icon-notebook-2"></i>
                    <span>经典语句</span>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name:'pictureShow'}">
                    <i class="el-icon-picture-outline"></i>
                    <span>图片展示</span>
                </router-link>
            </li>
             <li class="nav-item">
                <router-link :to="{name:'uploadPic'}">
                    <i class="el-icon-upload2"></i>
                    <span>图片上传</span>
                </router-link>
            </li>
             <li class="nav-item">
                <router-link :to="{name:'personal'}">
                    <i class="el-icon-user"></i>
                    <span>个人中心</span>
                </router-link>
            </li>
            <li class="nav-item">
                <a href="" @click="handleExit">
                    <i class="el-icon-close"></i>
                    <span>退出系统</span>
                </a>
            </li>
        </ul>
    </el-col>
    <el-col :span="20" class="right">
        <router-view></router-view>
        <span v-if="isShow"></span>
    </el-col>
</el-row>
</template>

<script>

import { mapMutations,mapGetters } from 'vuex'
export default {
    methods:{
        ...mapMutations(["removeUserInfo"]),
        handleExit(e){
            e.preventDefault();
            this.$confirm('此操作将退出登录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.removeUserInfo();
                this.$router.push({name:"login"});
            },()=>{

            })
        }
    },
    computed:{
        ...mapGetters(["isAuthorize"]),
        isShow(){
            if(!this.isAuthorize){
                this.$store.commit("setAuthorizeT");
                this.$alert('身份信息已失效请重新登陆', '', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$router.push({name:"login"})
                    }
                })
                return false;
            }else{
                return true;
            }
        }
    }
}
</script>

<style lang="scss">

</style>