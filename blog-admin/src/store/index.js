import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    state:{
        userName:window.localStorage.getItem('pastlove_uerName'),
        lastLogin:window.localStorage.getItem('pastlove_lastLogin'),
        authorize:true
    },
    getters:{
        // 获取最后的登录时间
        getLastLoginTime(state){
            let date = new Date(parseInt(state.lastLogin));
            let time = date.getFullYear() + "年" + (date.getMonth() + 1)  + "月" + date.getDate() + "日" + date.getHours() +"时"+date.getMinutes() + "分";
            return time;
        },
        isAuthorize(state){
            if(state.authorize){
                return true
            }else{
                return false
            }
        }
    },
    mutations:{
        setUserInfo(state,info){
            state.userName = info.userName;
            state.lastLogin = info.lastLogin;
            window.localStorage.setItem('pastlove_uerName',info.userName);
            window.localStorage.setItem('pastlove_lastLogin',info.lastLogin);
        },
        removeUserInfo(state){
            window.localStorage.removeItem('pastlove_uerName');
            window.localStorage.removeItem('pastlove_lastLogin');
            window.localStorage.removeItem('pastlove_jwt_token');
        },
        setAuthorizeF(state){
            state.authorize = false;
        },
        setAuthorizeT(state){
            state.authorize = true;
        }
    },
    actions:{

    }
});

export default store;