<template>  
    <article class="newArticle" >
        <div class="tagAndBg">
            <router-link :to="{name:'blogDetail',query:{articleId:articleInfo.articleId}}" class="Bg">
                <img v-lazy="articleInfo.img" alt="" :class="{active:imgActive}" :id="articleInfo.index">
            </router-link>
            <show-category-tag  :category="articleInfo.category"/>
        </div>
        <div class="articleInfo">
            <div class="header">
                <h2>
                    <router-link :to="{name:'blogDetail',query:{articleId:articleInfo.articleId}}">
                        {{articleInfo.title}}
                    </router-link>
                </h2>
                <div class="time">
                    <span class="time">{{articleInfo.date}}</span>
                </div>
            </div>
            <div class="content">
                {{articleInfo.content}}
            </div>
        </div>
    </article>
</template>

<script>
import ShowCategoryTag from "../public/showCategoryTag.vue";
export default {
    props:["articleInfo"],
    components:{
        ShowCategoryTag
    },
    data:function(){
        return {
            imgActive:false
        }
    },
    methods:{
        
    },

    mounted:function(){
        this.$Lazyload.$on("loaded",({el,src})=>{
            if(el.id == this.articleInfo.index){
                this.imgActive = true;
            }
        })
    }
}
</script>

<style lang="scss">
@import "@/assets/css/index/article.scss";
</style>