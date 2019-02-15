import axios from "@/接口/axios.js";
import qs from "qs";

const api_查询评论列表=(query)=>{
    return new Promise((resolve, reject) => {
        axios.get('/api-s/shops/findShopCommodityCommentAll',{params:query}).then(x=>{
            resolve(x);
        }).catch(err=>{
            reject(err);
        })
    });
}

export{
    api_查询评论列表
}