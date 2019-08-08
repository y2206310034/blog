<template>
<div class="tip" :class="{'red':!judge,'green':judge}">
    <i :class="{'el-icon-success':judge}"></i>
    <span>{{judge ?"": text}}</span>
</div>
</template>
<script>
export default {
    props:["text","judge"]
}
</script>

<style lang="scss">
@import "@/assets/css/tips.scss";
</style>