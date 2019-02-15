import axios from "@/接口/axios.js";
import qs from "qs";

const api_根据id查询商品=(id)=>{
    return new Promise((resolve, reject) => {
        axios.get('/api-s/shops/commodity/findById/'+id).then(x=>{
            resolve(x);
        }).catch(err=>{
            reject(err);
        })
    });
}

export{
    api_根据id查询商品
}