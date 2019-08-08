<template>
    <router-link :to="{name:category=='学习笔记'?'study':'life'}" class="tag">{{category}}</router-link>
</template>

<script>
export default {
    props:["category"],
    components:{

    }
}
</script>

<style lang="scss">
</style>