<template>
    <div class="container">
        <el-col :md="2" :sm="4" :xs="4" class="logo">
            <router-link :to="{name:'index'}">
                <img src="http://www.pastlove.net/static/logo.png" alt="PastLove">
            </router-link>  
        </el-col>
        <el-col :md="17" :sm="15"  class="nav">
            <div class="list-btn" @click="onListBtn" >
                <i class="el-icon-tickets" v-if="!listShow"></i>
                <i class="el-icon-document" v-else></i>
            </div>      
            <transition name="el-zoom-in-top">
                <my-nav :show="listShow"   @showListTap="showListTap"/>
            </transition>
        </el-col>
        <el-col :md="5"  :sm="5" :xs="7" class="searchAndLogin">
            <ul class="">
                <li class="search">
                    <i class="el-icon-search" @click="setShowSearchT"></i>
                </li>
            </ul>
        </el-col>
    </div>
</template>

<script>
import myNav from "./nav.vue"
import {mapMutations} from "vuex"
export default {
    data(){
        return {
            listShow:false
        }
    },
    methods:{
        ...mapMutations(["setShowSearchT"]),
        showListTap(){
            this.listShow = false;
        },
        onListBtn(){
            this.listShow = !this.listShow;
        }

    },
    components:{
        myNav
    }
}
</script>

<style>

</style>