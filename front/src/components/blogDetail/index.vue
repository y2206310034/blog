<template>
    <div class="article-detail">
        <img class="header-bg" :src="articleInfo.img"  alt="">
        <div class="article-header">
            <div class="header-wrap">
                <div class="header-meta">
                    <span class="article-category">{{articleInfo.category}}</span>
                    <span >·</span>
                    <span class="article-date">{{articleInfo.date}}</span>
                </div>
                <h1>{{articleInfo.title}}</h1>
            </div>
        </div>
        <div class="article-body">
            <div class="body-header">
                <div class="">
                    <ul class="tags">
                        <li v-for="tag in articleInfo.tags" :key="tag">
                            <tag :tag-value="tag" />
                        </li>
                    </ul>
                </div>
                
                <div class="meta">
                    <a href="javascript:void(0)">
                        <span>
                            <i class="el-icon-view"></i>   
                            {{articleInfo.viewNum}}
                        </span>
                    </a>
                    <a href="javascript:void(0)">
                        <span>
                            <i class="el-icon-chat-dot-round"></i>
                            {{articleInfo.commentNum}}
                        </span>
                    </a>
                </div>
            </div>
            <div class="article-content" v-html="articleInfo.content" v-highlight></div>
        </div>

    </div>
</template>

<script>
import api from "@/utils/api.js";
import updateDate from "@/utils/updateDate.js";
import Tag from "../rightModules/tag.vue";
import {mapMutations} from "vuex"
export default {
    components:{
        Tag
    },
    data(){
        return {
            articleInfo:{},
            articleId:""
        }
    },
    methods:{
        getArticleById(article){
            api.getArticleById(article)
            .then(res=>{
                let data = res.data.data;
                data.date = updateDate.hotArticleDate(data.date);
                this.articleInfo = data;
            })
            .catch(err=>{
                console.log(err);
            })
        },
        ...mapMutations(["setShowSearchF"])
    },
    watch: {
        $route(to, from) { //监听路由是否变化
            this.setShowSearchF();
            if(to.query.articleId === "" ){
                this.$router.push({name:"error"});
            }
            if(to.query.articleId != from.query.articleId){
                this.getArticleById(to.query.articleId);
            }
        }
    },
    created(){
        this.getArticleById(this.$route.query.articleId);
        this.setShowSearchF();
    },
}
</script>

<style>

</style>