<template>
    <div class="picture-show"  v-loading="loading">
        <div class="picture-operate">
            <div class="choose-all">
                <input type="checkbox" @click="chooseAll" ref="chooseAll" :checked="isChooseAll">
                <span>全选</span>
            </div>
            <div class="delete">
                <button @click="handleDelete" :disabled="isDisabled" :class="{isDisabled:isDisabled}">删除</button>
            </div>
        </div>
        <div class="show-area"> 
            <div v-for="item in imgList" :key="item.imgName" class="single-area">
                <el-image
                    :src="item.imgUrl"
                    :alt="item.imgName"
                    :title="item.imgName"
                    :lazy="true"></el-image>
                <div class="imgName">
                    <input type="checkbox" v-model="deleteImgList"  name="img" :value="item.imgName">
                    <span>{{item.imgName}}</span>
                </div>
            </div>
        </div>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="pageCount * 10"
            @current-change="getImg">
            </el-pagination>
    </div>
</template>
<script>
export default {
    data(){
        return {
            imgList:[],
            // 每页展示的数量
            count:6,
            // 总共的页数
            pageCount:0,
            // 将要删除的图片列表
            deleteImgList:[],
            // 图片总共个数
            imgCount:0,
            // 当前页数
            currPage:1,
            loading:true
        }
    },
    methods:{
        // 更换页码时触发该函数
        getImg(currPage){
            this.loading = true;
            // currPage为回调的参数
            this.currPage = currPage;
            //翻页时,将想要删除的图片列表置为空
            this.deleteImgList = [];
            this.axios.get("/getImgPath",{
                params:{
                    page:currPage - 1,
                    count:this.count
                }
            }).then((res)=>{
                this.imgList = res.data.data;
                this.loading = false;
            })
        },
        // 获取图片总数
        getImgCount(){
            this.axios.get("/getImgCount").then((res)=>{
                this.imgCount = res.data.data.count;
                this.pageCount = Math.ceil(res.data.data.count / this.count);
            })
        },
        // 选择当前页所有图片
        chooseAll(){
            if(this.$refs.chooseAll.checked){
                this.deleteImgList = this.imgList.map((item)=>{
                    return item.imgName;
                })
            }else{
                this.deleteImgList = [];
            }
        },
        handleDelete(){
            this.$confirm('此操作会将选中图片删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteImg();
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });   
            })    
        },
        // 删除选中的图片
        deleteImg(){ 
            this.axios.get("/deleteManyImg",{
                params:{
                    imgArr: JSON.stringify(this.deleteImgList.map((item)=>{
                        return "/" + item;
                    }))
                }
            }).then((res)=>{
                if(res.data.status=="1"){
                    this.imgCount -= this.deleteImgList.length;
                    this.pageCount = Math.ceil(this.imgCount / this.count);
                    if(this.currPage > this.pageCount){
                        this.currPage = this.pageCount;
                    }
                    this.deleteImgList = [];
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getImg(this.currPage);
                }
            })
        },
    },
    computed:{
        // 判断是否是全选
        isChooseAll(){
            let count = this.count;
            if(this.currPage == this.pageCount){
                if(this.imgCount % this.count){
                    count = this.imgCount % this.count;
                }else{
                    count = 6;
                }
            }
            return this.deleteImgList.length === count;
        },
        // 判断删除按钮是否被禁用
        isDisabled(){
            return this.deleteImgList.length === 0
        }
    },
    mounted(){
        this.getImgCount();
        this.getImg(this.currPage);
    }
}
</script>

<style lang="scss">
@import "@/assets/css/pictureShow.scss";
</style>