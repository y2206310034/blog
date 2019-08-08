 <template>
    <div class="likeQuery" @click="setShowSearchF">
        <div class="queryWrap" @click="handleWrap($event)">
            <input type="text" v-model="value" v-on:keyup.enter="handleGet" placeholder="输入完毕请按enter">
            <ul>
                <li class="article" v-for="article in articleList" :key="article.aritlceId" >
                    <router-link :to="{name:'blogDetail',query:{articleId:article.articleId}}">
                        <h2>{{article.title}}</h2>
                        <p>{{article.content}}</p>
                    </router-link>
                </li>
                <li>
                    {{articleList.length ? "只有这些了" :"没有匹配的结果"}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import api from "@/utils/api.js";
export default {
    data(){
        return {
            articleList:[],
            value:""
        }
    },
    methods:{
        ...mapMutations(["setShowSearchF"]),
        handleWrap(e){
           e.stopPropagation()
        },
        getArticleByLikeQuery(){
            api.getArticleByLikeQuery(this.value)
            .then(res=>{
                this.articleList = res.data.data;
            }).catch(err=>{
                console.log(err);
            })
        },
        handleGet(){
            this.getArticleByLikeQuery();
        }
    }
}
</script>

<style lang="scss">
.likeQuery{
    position: fixed;
    width:100%;
    height:100%;
    background:rgba(151, 150, 150, 0.52);
    .queryWrap{
        width:50%;
        position: absolute;
        top:20%;
        left:50%;
        transform: translateX(-50%);
        border-radius: 5px;
        input{
            width:100%;
            height:30px;
            border:none;
            // outline:none;
            border-radius: 5px;
            text-indent: 10px;
            background: #e4e3e3;
            margin:0 auto;
        }
        ul{
            width:100%;
            padding:10px;
            box-sizing: border-box;
            max-height:300px;
            background:#fff;
            border-radius: 5px;
            margin-top:5px;
            overflow-y:auto;
            &::-webkit-scrollbar{width:14px;}
            >li{
                width:100%;
                h2{
                    font-size:18px;
                }
                h2,p{
                    white-space : nowrap ;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                &.article{
                    border-bottom:1px solid rgba(153, 153, 153, 0.87);
                }
                &:last-child{
                    text-align: center;
                    font-size:12px;
                    color:rgb(196, 194, 194);
                    line-height:30px;
                    height:30px;
                }
            }
        }
    }
}
</style>