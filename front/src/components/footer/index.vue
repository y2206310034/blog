<template>
    <div class="container">
        <span>© 2019-{{nowYear}} </span>
        <span>PastLove All Right Reserved</span>
        <span> · 晋ICP备19004558号-1 · </span>
        <a href="http://www.pastlove.net/blogAdmin/">博客后台管理系统</a>
    </div>
</template>

<script>
export default {
    computed:{
        nowYear:function(){
            return new Date().getFullYear();            
        }
    }
}
</script>

<style lang="scss" scoped>
</style>