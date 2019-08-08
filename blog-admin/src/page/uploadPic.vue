<template>
<div class="upload-pic">
    <el-row class="upload">
        <el-upload
            class="upload-demo"
            ref="upload"
            action="http://www.pastlove.net/admin/uploadImg"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="fileList"
            :auto-upload="false"
            :headers="headers"
            >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </el-row>
    <el-row class = "pic-names" >
        <h2>存放图片时文件名分别为:</h2>
        <ul class="img-name-container">
            <li v-for="item in imgList" :key="item.uid">{{item.slice(1)}}</li>
        </ul>
    </el-row>
</div>
</template>

<script>

export default {
    data(){
        return {
            imgList:[],
            fileList:[],
            headers:{
                'Authorization':`Bearer ${window.localStorage.getItem('pastlove_jwt_token')}    `
            }
        }
    },
    methods:{
        submitUpload() {
            // console.log(this.$refs.upload);
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            if(file.percentage === 100){
                this.axios.get("/deleteSingleImg",{
                    params:{
                        imgPath:file.response.data.name
                    }
                }).then((res)=>{
                    if(res.data.status === "1"){
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        let index = this.imgList.indexOf(file.response.data.name)
                        this.imgList.splice(index,1);
                    }
                })
            }
        },
        handleSuccess(response, file, fileList){
            this.imgList.push(response.data.name);
            this.$message({
                message: '上传成功',
                type: 'success'
            });
        }
    },
}
</script>

<style lang="scss">
@import "@/assets/css/uploadPic.scss";
</style>