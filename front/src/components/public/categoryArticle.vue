<template>
    <!-- 每篇文章的展示 -->
    <div class="category-article">
        <div class="tagAndBg">
            <router-link :to="{name:'blogDetail',query:{articleId:categoryArticle.articleId}}" class="Bg">
                <img v-lazy="categoryArticle.img" alt="" :class="{active:imgActive}" :id="categoryArticle.index">
            </router-link>
            <!-- <a href="/" class="tag">{{categoryArticle.category}}</a> -->
            <show-category-tag class="tag" :category="categoryArticle.category"/>
        </div>
        <div class="article-info">
            <h2>
                <router-link :to="{name:'blogDetail',query:{articleId:categoryArticle.articleId}}">
                    {{categoryArticle.title}}
                </router-link>
            </h2>
             <div class="timeAndViews">
                 <span class="time">
                    {{categoryArticle.date}}
                </span>
                <span>
                    <i class="el-icon-view"></i>
                    {{categoryArticle.viewNum}}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import ShowCategoryTag from "./showCategoryTag.vue";
export default {
    props:["categoryArticle"],
    components:{
        ShowCategoryTag
    },
    data:function(){
        return {
            imgActive:false,
        }
    },
    methods:{
    },
    created:function(){
        this.$Lazyload.$on("loaded",({el,src})=>{
            if(el.id == this.categoryArticle.index){
                this.imgActive = true;
            }
        })
    }
}
</script>

<style lang="scss">
@import "@/assets/css/study/categoryArticle.scss";
</style>