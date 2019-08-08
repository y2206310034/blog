<template>
    <div class="tag">
        <router-link :to="{name:'tag',query:{tag:tagValue}}" >{{tagValue}}</router-link>
    </div>
</template>

<script>
export default {
    props:["tagValue"],
    components:{

    }
}
</script>

<style lang="scss">
div.tag{
    display:inline-block;
    padding:5px 10px;
    // border:1px solid red;
    margin: 5px;
    font-size:14px;
    border-radius: 3px;
    background:#3292ff;
    a{
        color:#fff;
    }
}
</style>