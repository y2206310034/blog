<template>
<!-- 右边模块的标签模块 -->
<div class="random-tags">
    <h2>标签</h2>
    <div class="tags">
        <tag v-for="tag in tags" :key="tag" :tag-value="tag"/>
    </div>

</div>
</template>

<script>
import {mapState,mapActions} from "vuex";
import Tag from "./tag.vue"
export default {
    components:{
        Tag
    },
    methods:{
        ...mapActions(["getTags"])
    },
    computed:{
        ...mapState(["tags"])
    },
    created(){
        this.getTags();
    }
}
</script>

<style >

</style>