<template>
    <div class="container">
        <el-col :lg="{span:16,offset:0}" :md="{span:15,offset:0}" :sm="{span:23,offset:1}">
            <article-detail />
        </el-col>
        <el-col :lg="{span:7,offset:1}" :md="{span:8,offset:1}" :sm="{span:23,offset:1}">
            <right-modules/>
        </el-col>
    </div>
</template>

<script>
import rightModules from "@/components/public/rightModules.vue"
import articleDetail from "@/components/blogDetail/index.vue"
export default {
    components:{
        rightModules,
        articleDetail
    }
}
</script>

<style lang="scss">
@import "@/assets/css/blogDetail/index.scss";
</style>