import axios from "axios";
import vue from "@/main.js";
export default  function axiosSet(){
    axios.defaults.baseURL = 'http://www.pastlove.net/admin';
    // 解决发送post请求报错的问题
    // 如果发送的数据时符合下边格式的就不会出现错误    
    axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    axios.interceptors.request.use(request => {
      const pastlove_jwt_token = window.localStorage.getItem('pastlove_jwt_token');
      if (pastlove_jwt_token) {
        request.headers['Authorization'] =`Bearer ${pastlove_jwt_token}`;
      }
      return request;
    });


    // 拦截器每次接受数据时看看是否更新了token
    axios.interceptors.response.use(response=>{ 
      if (response.data.token) {
        window.localStorage.setItem('pastlove_jwt_token', response.data.token);
      }
      return response;
    },error=>{
      // 跳转到登陆
      if( window.localStorage.getItem("pastlove_jwt_token")){
        vue.$store.commit("setAuthorizeF")
        vue.$store.commit("removeUserInfo");
      }
      return Promise.reject(error.message);   // 返回接口返回的错误信息
    })
}

