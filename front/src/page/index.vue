<template>
    <div class="container">
        <el-col :lg="{span:16,offset:0}" :md="{span:15,offset:0}" :sm="{span:23,offset:1}">
            <new-article-list/>
        </el-col>
        <el-col :lg="{span:7,offset:1}" :md="{span:8,offset:1}" :sm="{span:23,offset:1}">
            <right-modules/>
        </el-col>
    </div>
</template>

<script>
import rightModules from "@/components/public/rightModules.vue"
import newArticleList from "@/components/index/newArticleList.vue"
export default {
    components:{
        rightModules,
        newArticleList
    }
}
</script>

<style lang="scss">

</style>