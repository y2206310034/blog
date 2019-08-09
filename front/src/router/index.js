import VueRouter from 'vue-router'


const defaultPage = ()=>import("@/layout/default.vue");
const Index = ()=>import("@/page/index.vue");
const About = ()=>import("@/page/about.vue");
const Study = ()=>import("@/page/study.vue");
const Life = ()=>import("@/page/life.vue");
const MsgBoard = ()=>import("@/page/MsgBoard.vue");
const BlogDetail = ()=>import("@/page/blogDetail.vue");
const Tag = ()=>import("@/page/tag.vue");
const Error = ()=>import("@/page/error.vue");


export default new VueRouter({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'defaultPage',
      component: defaultPage,
      redirect: '/',
      children: [{
        path: '/',
        name: 'index',
        component: Index
      }, {
        path: '/about',
        name: 'about',
        component: About
      }, {
        path: '/study',
        name: 'study',
        component: Study
      },{
        path:'/life',
        name: 'life',
        component: Life
      },{
        path:'/MsgBoard',
        name:'msgBoard',
        component:MsgBoard
      },{
        path:'/blogDetail',
        name:'blogDetail',
        component:BlogDetail,
        beforeEnter: (to, from, next) => {
          if(to.query.articleId){
            next();
          }else{
            next({name:"error"}); 
          };
        }
      },{
        path:'/tag',
        name:'tag',
        component:Tag
      },{
        path:'/error',
        name:'error',
        component:Error
      },{
        path:'*',
        redirect:'/error',
      }]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
