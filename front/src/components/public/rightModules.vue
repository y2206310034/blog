<template>
    <div class="right-modules">
        <every/>
        <tags />
        <hot/>
        <friend-link />
        <transition name="fade">
            <return-top v-if="isShow"/>
        </transition>
    </div>
</template>

<script>
import every from "../rightModules/every.vue";
import hot from "../rightModules//hot.vue";
import friendLink from "../rightModules/friendLink.vue";
import tags from "../rightModules/tags.vue";
import returnTop from "../rightModules/returnTop.vue";
export default {
    components:{
        every,
        hot,
        friendLink,
        tags,
        returnTop
    },
    data(){
        return {
            isShow:false
        }
    }, 
    methods:{
      handleScroll(e){
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollTop > 580){
            this.isShow = true;
        }else{
            this.isShow = false;
        }
      }
    },
    created(){
        window.addEventListener('scroll',this.handleScroll,true)
    }
}
</script>

<style lang="scss">
@import "@/assets/css/public/rightModules.scss";
</style>