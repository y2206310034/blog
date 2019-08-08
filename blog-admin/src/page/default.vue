<template>
    <el-container>
        <el-header>
            <my-header />
        </el-header>
        <el-main>
            <my-main />
        </el-main>
    </el-container>
</template>

<script>
import MyHeader from "@/components/header.vue";
import MyMain from "@/components/main.vue";
export default {
    data(){
        return {
        }
    },
    computed:{
        
    },
    components:{
        MyHeader,
        MyMain,
    },
}
</script>

<style lang="scss">
@import  "@/assets/css/index.scss";
</style>