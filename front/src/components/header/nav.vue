<template>
    <ul v-show="show || showClass" @click="onClick">
        <li>
            <router-link :to="{name:'index'}">首页</router-link>
        </li>
         <li>
            <router-link :to="{name:'study'}">学习</router-link>
        </li>
         <li>
            <router-link :to="{name:'life'}">生活</router-link>
        </li>
         <li>
            <router-link :to="{name:'about'}">关于</router-link>
        </li>
         <li>
            <router-link :to="{name:'msgBoard'}">留言</router-link>
        </li>
    </ul>
</template>

<script>
export default {
    props:["show"],
    data(){
        return {
            screenWidth:  document.body.offsetWidth
        }
    },
    methods:{
        onClick:function(){
            this.$emit("showListTap")
        }
    },
    computed:{
        
        showClass(){
            if(this.screenWidth <= 751 ){
                return false;
            }
            return true;
        }
    },
    mounted () {
        const that = this
        window.onresize = () => {
            return (() => {
                that.screenWidth =document.body.offsetWidth
            })()
        }
    }
}
</script>

<style scoped>

</style>