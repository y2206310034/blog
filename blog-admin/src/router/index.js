import Vue from 'vue'
import Router from 'vue-router'
const Login = ()=> import("@/page/login.vue");
const DefaultPage = ()=> import("@/page/default.vue");
const Published = ()=> import("@/page/published.vue");
const ArticlePublish = () =>import("@/page/articlePublish.vue");
const PictureShow = ()=> import("@/page/pictureShow.vue");
const UploadPic = ()=> import("@/page/uploadPic.vue");
const Error = ()=> import("@/page/error.vue");
const Personal = ()=> import("@/page/personal.vue");
const Centence = ()=> import("@/page/centence.vue");




Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path:"/blogAdmin/login",
      name:"login",
      component:Login
    },
    {
      path:"/blogAdmin",
      name:"defaultPage",
      component:DefaultPage,
      redirect:"/blogAdmin/published",
      beforeEnter: (to, from, next) => {
        // 进入管理页面前先判断是否认证过
        if(!window.localStorage.getItem('pastlove_jwt_token')){
          next({path:"/blogAdmin/login"})
        }else{
          next();
        }
      },
      children:[{
        path: '/blogAdmin/published',
        name:"published",
        component:Published
      },{
        path: '/blogAdmin/articlePublish',
        name:"articlePublish",
        component:ArticlePublish
      },{
        path: '/blogAdmin/pictureShow',
        name:"pictureShow",
        component:PictureShow
      },{
        path: '/blogAdmin/uploadPic',
        name:"uploadPic",
        component:UploadPic
      },{
        path: '/blogAdmin/personal',
        name:"personal",
        component:Personal
      },{
        path:'/blogAdmin/centence',
        name:"centence",
        component:Centence
      },{
        path:"/blogAdmin/*",
        redirect:"/blogAdmin/published",
      }]
    }
  ]
})
