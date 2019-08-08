<template>
  <div class="centence">
    <div class="uploadCentence" @click="showUpload">
      <button>上传新句子</button>
    </div>
    <div class="showArea">
      <el-table :data="dataList" style="width: 100%" border>
        <el-table-column prop="centenceId" label="id号" width="60"></el-table-column>
        <el-table-column prop="saveTime" label="日期" width="190"></el-table-column>
        <el-table-column prop="author" label="作者" width="180"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column label="操作" class="operator" width="100px">
            <template slot-scope="scope">
            <i class="el-icon-edit" @click="handleUpdate(scope.row.index)"></i>
            <i class="el-icon-delete"  @click="deleteCentence(scope.row.index)" ></i>
            </template>
        </el-table-column>
        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="pageCount * 10"
            @current-change="handleTurnPage"
        ></el-pagination>
    </div>
    <div class="uploadArea" :class="{'show':show,'hidden':NoFirst&&!show}">
      <div>
        <el-row>
          <label for>作者名:</label>
          <input type="text" v-model="centence.author" />
        </el-row>
        <el-row class="content">
          <label for>内容:</label>
          <textarea name id cols="30" rows="10" v-model="centence.content"></textarea>
        </el-row>
        <el-row class="btn">
          <button @click="handleUpload">提交</button>
        </el-row>
        <button class="exit" @click="exit">X</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: [],
      count: 8,
      //句子总数
      centenceCount: 0,
      currPage: 1,
      show: false,
      NoFirst: false,
      centence: {
        author: "",
        content: ""
      },
      isUpdate:false
    };
  },
  computed:{
      pageCount(){
          return Math.ceil(this.centenceCount / this.count); 
      }
  },
  methods: {
    //   根据page  count 获取句子
    getCentence() {
      this.axios.get("/getManyCentence", {
          params: {
            page: this.currPage - 1,
            count: this.count
          }
        })
        .then(res => {
            let data = res.data.data;
            data.forEach((item,index)=>{
                item.saveTime = this.updateTime(item.saveTime)
                item.index= index;
            })
            this.dataList = data;
        });
    },
    // 点击每个句子之后的修改按钮
    handleUpdate(index){
        this.isUpdate = true;
        this.show = true;
        this.centence = JSON.parse(JSON.stringify(this.dataList[index]));
    },
    // 根据_id删除句子
    deleteCentence(index){
        this.axios.get("/deleteCentenceById",{
            params:{
                centenceId:this.dataList[index].centenceId
            }
        }).then((res)=>{
            if(res.data.status=="1"){
                this.centenceCount --;
                if(this.currPage > this.pageCount){
                    this.currPage = this.pageCount;
                }
                this.$message({
                    message: '删除成功',
                    type: 'success'
                }); 
                this.getCentence();
            }
        })
    },
    // 将从后端获取的saveTime修改一下格式
    updateTime(lastDate){
          let date = new Date(lastDate);
          let time = date.getFullYear() + "年" + (date.getMonth() + 1)  + "月" + date.getDate() + "日" + date.getHours() +"时"+date.getMinutes() + "分";
          return time;
    },
    // 获取句子的总数
    getCentenceCount() {
      this.axios.get("/getCentenceCount").then(res => {
        this.centenceCount = res.data.data.count;
      });
    },
    // 更新句子
    updateCentence(){
      this.axios.post("/updateCentence",this.$qs.stringify(this.centence)).then(res=>{
        this.$message({
            message: '发表成功',
            type: 'success'
        });
        this.show = false;
        this.isUpdate = false;
        this.getCentence();
        this.clearUploadArea();
      })
    },
    // 上传句子
    uploadCentence() {
      this.axios
        .post("/uploadCentence", this.$qs.stringify(this.centence))
        .then(res => {
          this.$message({
            type: "success",
            message: "上传成功!"
          });
          this.show = false;
          this.centenceCount ++;
          this.getCentence();
          this.clearUploadArea();
        });
    },
    // 翻页时触发
    handleTurnPage(currPage) {
      this.currPage = currPage;
      this.getCentence();
    },
    // 点击上传按钮时触发
    handleUpload() {
      if (this.centence.author && this.centence.content) {
        this.$confirm("是否确认上传?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
            if(this.isUpdate){
              this.updateCentence();
            }else{
              this.uploadCentence();
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消上传"
            });
          });
      } else {
        this.$message({
          message: "不能为空，请输入内容在次提交",
          type: "warning"
        });
      }
    },
    // 是否显示上传区域
    showUpload() {
      this.NoFirst = true;
      if (this.show) {
        this.show = false;
        this.clearUploadArea();
      } else {
        this.show = true;
      }
    },
    // 清楚上传区域中的文本内容
    clearUploadArea() {
      this.centence = {
        author: "",
        content: ""
      };
    },
    // 退出上传区域
    exit() {
      this.show = false;
      this.clearUploadArea();
    }
  },
  mounted() {
    this.getCentenceCount();
    this.getCentence();
  }
};
</script>

<style lang="scss">
@import "@/assets/css/centence.scss";
</style>