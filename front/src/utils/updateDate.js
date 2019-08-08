const month = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
export default{
    recentArticleDate(time){
        const date = new Date(time);
        return month[date.getMonth()] + " " + date.getDate() + "," + date.getFullYear();
    },
    hotArticleDate (time){
        return time.slice(0,10);
    },
    categoryArticleDate(time){
        return time.slice(0,16).replace("T"," ");
    },
}