<template>
<div class="published">
    <el-table
      :data="tableData"
      style="width: 100%"
      stripe
      border v-loading="loading">
      <el-table-column
        prop="articleId"
        label="ID"
        width="60px">
      </el-table-column>
      <el-table-column
        prop="category"
        label="分类"
        width="80px">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="imgName"
        label="首页图片文件名"
        width="160px"
        >
        <!-- <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <span>{{scope.row.imgName}} </span>
          </el-popover>
        </template> -->
      </el-table-column>
      <el-table-column
        label="标签">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <span v-for="item in scope.row.tags" :key="item">{{item}} </span>
            <div slot="reference" class="name-wrapper">
              <span v-for="(item,index) in scope.row.tags" :key="index" v-bind:style="{background:randomBg()}" class="tag">{{item}} </span>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="viewNum"
        label="浏览"
        width="60px">
      </el-table-column>
      <el-table-column
        prop="commentNum"
        label="评论"
        width="60px">
      </el-table-column>
      <el-table-column
        prop="date"
        label="发表时间">
      </el-table-column>
      <el-table-column
        label="操作" 
        class="operator"
        width="100px">
        <template slot-scope="scope">
          <i class="el-icon-edit" @click="updateArticle(scope.row.articleId)"></i>
          <i class="el-icon-delete"  @click="deleteArticle(scope.row.articleId)" ></i>
        </template>

      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="pageCount * 10"
      @current-change="handleTurnPage">
      </el-pagination>
</div>
</template>

<script>
export default {
    data() {
        return {
          bgColor:["#8B008B","#191970","#6495ED","#8B6508","#CD2990","#B23AEE","		#FFD700","#636363"],
          pageCount:0,
          tableData: [],
          count:8,
          articleCount:0,
          currPage:1,
          loading:true
        }
      },
      methods:{
        randomBg:function(){
          let random = Math.floor(Math.random()*8);
          return this.bgColor[random];
        },
        getArticleCount(){
          this.axios.get("/getArticleCount").then(res=>{
            this.articleCount = res.data.data.count;
            this.pageCount = Math.ceil(res.data.data.count / this.count);
          })
        },
        handleTurnPage(currPage){
          this.currPage = currPage;
          this.getArticle();
        },
        // 修改从后台传回来的时间
        updateTime(lastDate){
          let date = new Date(lastDate);
          let time = date.getFullYear() + "年" + (date.getMonth() + 1)  + "月" + date.getDate() + "日" + date.getHours() +"时"+date.getMinutes() + "分";
          return time;
        },
        getArticle(){
          this.loading = true;
          this.axios.get("/getArticleAdmin",{
            params:{
              page:this.currPage - 1,
              count:this.count
            }
          }).then(res=>{
            let data = res.data.data;
            data.forEach((item)=>{
              item.date = this.updateTime(item.date)
            })
            this.tableData = res.data.data;
            this.loading = false;
          })
        },
        updateArticle(articleId){
          this.$router.push({name:'articlePublish',query:{articleId}})
        },
        deleteArticle(articleId){
          this.axios.get("/deleteArticleById",{
                params:{
                      articleId
                }
            }).then((res)=>{
                if(res.data.status=="1"){
                    this.articleCount --;
                    this.pageCount = Math.ceil(this.articleCount / this.count);
                    if(this.currPage > this.pageCount){
                        this.currPage = this.pageCount;
                    }
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    }); 
                    this.getArticle();
                }
            })
        }
      },
      mounted(){
        this.getArticleCount();        
        this.getArticle();
      }
}
</script>

<style lang="scss">
@import "@/assets/css/published.scss";
</style>