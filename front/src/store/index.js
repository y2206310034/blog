// import Vuex from 'vuex';
import api from '../utils/api'
import updateDate from '../utils/updateDate'

const store = new Vuex.Store({
    state:{
        articleList:[],
        hotArticleList:[],
        tags:[],
        showSearch:false
    },
    getters:{

    },
    mutations:{
        // 最近文章列表
        setArticleList(state,articleList){
            state.articleList = articleList;
        },
        // 设置热门文章
        setHotArticle(state,articleList){
            state.hotArticleList = articleList
        },
        // 设置标签
        setTags(state,tags){
            state.tags = tags;
        },
        // 设置搜索框的状态为true
        setShowSearchT(state){
            state.showSearch = true;
        },
        // 设置搜索框的状态为fasle
        setShowSearchF(state){
            state.showSearch = false;
        }
    },
    actions:{
        // 获取最近文章列表   通过 count和page
        getArticleList({commit},{page,count}){
            api.getArticle(page,count)
            .then(res=>{
                let data = res.data.data;
                data.forEach((item,index)=>{
                    item.index = index;
                    item.date = updateDate.recentArticleDate(item.date);
                })
                commit("setArticleList",data);
            })
            .catch(err=>{
                console.log(err);
            })
        },
        getHotArticle({commit}){
            api.getHotArticle()
            .then(res=>{
                let data = res.data.data;
                data.forEach((item,index) =>{
                    item.index = index;
                    item.date = updateDate.hotArticleDate(item.date);
                })
                commit("setHotArticle",data);
            })
            .catch(err=>{
                console.log(err);
            })
        },
        getTags({commit}){
            api.getTags()
            .then(res=>{
                commit("setTags",res.data.data)
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
})

export default store;