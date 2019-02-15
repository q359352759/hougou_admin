import axios from "@/接口/axios.js";
import qs from "qs";

//start=0&length=20&areaCode= &shopid= &state=1 &startTime= &endTime= &order=orderscreateTime &orderType=DESC 
const api_查询订单列表=(query)=>{
    return new Promise((resolve, reject) => {
        axios.get('/api-s/shops/findAllShopOrders',{params:query}).then(x=>{
            resolve(x)
        }).catch(err=>{
            reject(err)
        })
    });
}


export{
    api_查询订单列表
}