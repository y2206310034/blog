<template>
    <!-- 每个热门文章的展示 -->
    <div class="article">
        <div class="article-img">
            <router-link :to="{name:'blogDetail',query:{articleId:articleInfo.articleId}}">
                <img v-lazy="articleInfo.img" alt="" :class="{active:imgActive}">
            </router-link>
        </div>
        <div class="article-info">
            <h2 class="article-title">
                <router-link :to="{name:'blogDetail',query:{articleId:articleInfo.articleId}}">{{articleInfo.title}}</router-link>
            </h2>
            <div class="timeAndViews">
                <span>
                    <i class="el-icon-view"></i>
                    {{articleInfo.viewNum}}
                </span>
                <span>
                    <i class="el-icon-time"></i>
                    {{articleInfo.date}}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:["articleInfo"],
    data(){
        return {
            imgActive:false
        }
    },
    created:function(){
        this.$Lazyload.$on("loaded",({el,src})=>{
            if(el.id == this.articleInfo.index){
                this.imgActive = true;
            }
        })
    }
}
</script>

<style >

</style>