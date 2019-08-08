<template>
    <!-- 生活与学习模块展示文章的区域 -->
    <div class="category-container">
        <div class="category-header">
            <h1>{{category}}</h1>
        </div>
        <div class="container">
            <el-col  :md="6" :sm="12" class="article" v-for="article in articleList" :key="article.id" >
                <category-article :category-article="article"/>  
            </el-col> 
        </div>
         <div class="container">
            <div class="category-btn" @click="getArticle" >
                <el-button type="danger"  :disabled="disabled">
                    <span v-if="!loading" >
                        <i class="el-icon-arrow-down"></i>
                    </span>
                    <span v-else >
                        <i class="el-icon-loading"></i>
                    </span>
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
import categoryArticle from "@/components/public/categoryArticle.vue"
import api from "@/utils/api.js";
import updateDate from "@/utils/updateDate.js";
import returnTop from "@/utils/returnTop.js";
export default {
    props:["category"],
    data:function(){
        return {
            loading:false,
            articleList:[],
            tag:"",
            count:12,
            currPage:0,
            disabled:false
        }
    },
    computed:{
    },
    components:{
        categoryArticle
    },
    methods:{
        getArticleByCategory(){
            api.getArticleByCategory(this.category, this.currPage ++,12)
            .then(res=>{
                this.setData(res.data.data);
            })
        },
        setData(data){
            returnTop();
            data.forEach((item,index)=>{
                item.index = index;
                item.date = updateDate.categoryArticleDate(item.date);
            })
            this.articleList = data;
            this.loading = false;
            if(this.articleList.length < this.count){
                this.disabled = true;
            }
        },
        getArticleByTag(){
            api.getArticleByTag(this.tag,0,12)
            .then(res=>{
                this.setData(res.data.data);
            })
        },
        getArticle(){
            if(this.disabled){
                return ;
            }
            this.loading = true;
            if(this.$route.query.tag){
                this.tag = this.$route.query.tag;
                this.getArticleByTag();
            }else{
                this.getArticleByCategory();
            }
        }
    },
    created(){
        this.getArticle();
    }
}
</script>

<style lang="scss" >
@import "@/assets/css/study/categoryHeader.scss";
@import "@/assets/css/study/categoryBtn.scss";
</style>