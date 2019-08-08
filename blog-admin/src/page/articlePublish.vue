<template>
<div class="article-publish" v-loading="loading">
    <el-row class="article-category">
        <label for = ""><strong>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</strong></label>
        <input id = "tech" 
               type = "radio" 
               name = "rt" 
               v-model="article.category" 
               value="学习笔记"><label for = "tech">学习笔记</label>
        <input id = "life" 
               type = "radio" 
               name = "rt" 
               v-model="article.category" 
               value="生活"><label for = "life">生活</label>
    </el-row>
    <el-row class = "article-details-title" >
        <label for = ""><strong>标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题：</strong></label>
        <div class = "editor-input-box">
            <input type = "text" placeholder = "请输入文章标题" v-model="article.title">
        </div>
        <tips text="标题不能为空" :judge="isTitle"/>
    </el-row>
    <el-row class = "article-details-tags" >
        <label for = ""><strong>标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;签：</strong></label>
        <div class = "editor-input-box">
            <input type = "text" placeholder = "请输入文章标签,每个标签以逗号隔开" v-model="article.tags">
        </div>
        <tips text="至少输入一个标签名" :judge="isTags"/>
    </el-row>
    <el-row class = "article-details-show-img" >
        <label for = ""><strong>展示图片：</strong></label>
        <div class = "editor-input-box">
            <input type = "text" placeholder = "请输入已存在的图片名,可以先去图片展示获取图片名或者去图片上传上传图片" v-model="article.imgName" >
        </div>
        <!--                                       两个值共同确定图片是否正确 -->
        <tips text="请输入正确的图片地址" :judge="isImgName&&hasImg"/>
    </el-row>

    <el-row>
        <label for = ""><strong>文章内容：</strong></label>
        <editor-bar v-model="article.content" ></editor-bar>
    </el-row>
    <el-row class="submit">
        <button @click="handleClick">{{update?"修改文章":"上传文章"}}</button>
    </el-row>
</div>
</template>

<script>
import EditorBar from "@/components/editorItem.vue";
import Tips from "@/components/tips.vue";
export default {
    components: { 
        EditorBar ,
        Tips
    },
    data() {
        return {
            article:{
                category:"学习笔记",
                title:"",
                tags:"",
                content:"",
                imgName:""
            },
            update:false,
            hasImg:false,
            loading:false
        }
    },  
    methods: {
        dataInit(){
            this.article ={
                category:"学习笔记",
                title:"",
                tags:"",
                content:"",
                imgName:""
            }
        },
        // 点击按钮上传或更新文章
        handleClick(){
            if(this.isTitle&&this.isTags&&this.isImgName&&this.hasImg){
                this.$confirm(`此操作将会使文章${this.update?"更新":"发表"}, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loading = true;
                    if(this.update){
                        this.updateArticle();
                    }else{
                        this.uploadArticle();
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: `已取消${this.update?"更新":"上传"}`
                    });   
                })    
            }else{
                this.$message({
                    message: '请按要求输入信息',
                    type: 'warning'
                });
            } 
        },
        // 更新文章
        updateArticle(){
            this.axios.post("/updateArticle",this.$qs.stringify(this.article)).then(res=>{
                if(res.data.status =="1"){
                    this.loading = false;
                    this.$message({
                        message: '发表成功',
                        type: 'success'
                    });
                    this.$router.push({name:'published'})
                }
            })
        },
        // 上传文章
        uploadArticle(){
            this.axios.post("/uploadArticle",this.$qs.stringify(this.article)).then(res=>{
                if(res.data.status =="1"){
                    this.dataInit();
                    this.loading = false;
                    this.$message({
                        message: '发表成功',
                        type: 'success'
                    });
                }
            })

        },
        
    },
    computed:{
        isTitle(){
            if(this.article.title){
                return true;
            }else{
                return false;
            }
        },
        isTags(){
            if(this.article.tags){
                return true;
            }else{
                return false;
            }
        },
        isImgName(){
            if(this.article.imgName){
                // 异步的  
                this.axios.get("/searchImg",{
                    params:{
                        imgPath:"/"+ this.article.imgName
                    }
                }).then(res=>{
                    if(res.data.status == "1"){
                        this.hasImg =  true;
                    }else{
                        this.hasImg =  false;
                    }
                })
                return true
            }else{
                return false;
            }
        }
    },
    mounted(){
        if(this.$route.query.articleId){
            this.update = true;
            this.axios.get("/getArticleByIdAdmin",{
                params:{
                   articleId:this.$route.query.articleId
                }
            }).then(res=>{
                this.article = res.data.data;
                // 将请求来的tags  转化为字符串
                this.article.tags = this.article.tags.toString();
            })
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/css/articlePublish.scss";
</style>
