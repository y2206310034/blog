<template>
    <!-- 右边模块的每日一句模块 -->
    <div class="every-day">
        <h3 class="every-title">
            <span>每日一句</span>
        </h3>
        <div class="content">
            <p class="centence">
                {{centence.content}}
            </p>
            <div class="author">
                作者是<span>{{centence.author}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/utils/api'
export default {
    data(){
        return {
            centence:{}
        }
    },
    methods:{
        getLastCentence(){
            api.getLastCentence()
            .then(res=>{
                this.centence = res.data.data;
            })
            .catch(err=>{
                console.log(err);
            })
        }
    },
    created(){
        this.getLastCentence();
    }
}
</script>

<style scoped>

</style>