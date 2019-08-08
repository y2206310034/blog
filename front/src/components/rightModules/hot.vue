<template>
    <!-- 右边模块的热门文章模块 -->
    <div class="hot-article">
        <h3 class="hot-title">
            <span>热门点击</span>
        </h3>
        <div class="content" >
            <hot-article :article-info="article" v-for="article in hotArticleList" :key="article.articleId" />
        </div>
    </div>
</template>

<script>
import {mapState,mapActions} from "vuex";
import hotArticle from "./hotArticle.vue";
export default {
    components:{
        hotArticle
    },
    methods:{
        ...mapActions(["getHotArticle"])
    },
    computed:{
        ...mapState(["hotArticleList"])
    },
    created(){
        this.getHotArticle();
    }
    
}
</script>

<style scoped>

</style>