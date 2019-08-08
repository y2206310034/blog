<template>
    <el-container>
        <el-header >
            <my-header />
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
        <el-footer>
            <my-footer />
        </el-footer>
        <like-query v-if="showSearch"/>
    </el-container>
</template>

<script>
import {mapState} from 'vuex'
import likeQuery from '../components/header/likeQuery.vue'
import myHeader from '../components/header/index.vue'
import myFooter from '../components/footer/index.vue'
export default {
    components:{
        myHeader,
        myFooter,
        likeQuery
    },
    data(){
        return {
        }
    },
    methods:{
        openFullScreen() {
        }
    },
    computed:{
        ...mapState(["showSearch"])
    },
    created(){
        this.openFullScreen();
    }
}
</script>

<style lang="scss">
    @import "@/assets/css/header/index.scss"; 
    @import "@/assets/css/footer/index.scss"; 
    @import "@/assets/css/index/index.scss";    
</style>