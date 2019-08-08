<template>
<div class="returnTop" @click="returnTop">
    <i class="el-icon-top"></i>
</div>
</template>

<script>
import returnTop from "@/utils/returnTop.js";
export default {
    props:["tagValue"],
    methods:{
        returnTop(){
            returnTop();
        }
    }
}
</script>

<style lang="scss">

</style>