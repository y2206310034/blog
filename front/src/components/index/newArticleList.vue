<template>
<div>
    <div class="newArticleList">
        <h2>近期文章</h2>
        <div class="articleList">
            <new-article  :article-info="article" v-for="article in articleList" :key="article.id "></new-article>
        </div>
    </div>
    <el-pagination
        background
        layout="prev, pager, next"
        :total="pageCount * 10"
        @current-change="turnPage">
        </el-pagination>
</div>

</template>

<script>
import { mapActions, mapState } from "vuex"; 
import newArticle from "./newArticle.vue";
import api from "@/utils/api.js";
import returnTop from "@/utils/returnTop.js";
export default {
    data(){
        return {
            articleCount:0,
            count:8
        }
    },
    methods:{
        ...mapActions(["getArticleList"]),
        getArticleCount(){
            api.getArticleCount()
            .then(res=>{
                this.articleCount = res.data.data.count;
            })
        },
        turnPage(currPage){
            this.getArticleList({page:currPage - 1,count:this.count});
            returnTop();
        }
    },
    computed:{
        ...mapState(["articleList"]),
        pageCount(){
          return Math.ceil(this.articleCount / this.count); 
        }
    },
    components:{
        newArticle
    },
    created(){
        this.getArticleList({page:0,count:this.count});
        this.getArticleCount();
    }
}
</script>

<style lang="scss">
@import "@/assets/css/index/newArticle.scss";
</style>