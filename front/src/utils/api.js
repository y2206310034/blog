import Axios from "axios"
import urls from "./urls.js"



const count = {
    hotCount:4
}
const myAxios = Axios.create({
    method:"get",
    baseURL:urls.baseUrl,
})

export default {
    getArticle(page,count){
        return myAxios.get(urls.getArticle,{
            params:{
                page,
                count
            }
        })
    },
    getHotArticle(){
        return myAxios.get(urls.getHotArticle,{
            params:{
                count:count.hotCount
            }
        });
    },
    getLastCentence(){
        return myAxios.get(urls.getLastCentence);
    },
    getTags(){
        return myAxios.get(urls.getTags);
    },
    getArticleByCategory(category,page,count){
        return myAxios.get(urls.getArticleByCategory,{
            params:{
                category,
                page,
                count
            }
        })
    },
    getArticleById(articleId = 0){
        return myAxios.get(urls.getArticleById,{
            params:{
                articleId
            }
        })
    },
    getArticleByTag(tag,page,count){
        return myAxios.get(urls.getArticleByTag,{
            params:{
                tag,
                page,
                count
            }
        })
    },
    getArticleCount(params){
        return myAxios.get(urls.getArticleCount,{
            params
        })
    },
    getArticleByLikeQuery(keyWord){
        return myAxios.get(urls.getArticleByLikeQuery,{
            params:{
                keyWord
            }
        })
    }
}
