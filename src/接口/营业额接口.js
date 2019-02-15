import axios from "@/接口/axios.js";
import qs from "qs";

const api_某月的每天营业额=(query)=>{
    return new Promise((resolve, reject) => {
        axios.get('/api-s/shops/orders/sumThisMonthAllDay',{params:query}).then(x=>{
            resolve(x);
        }).catch(err=>{
            reject(err);
        })
    });
}
const api_某年每月营业额=(query)=>{
    return new Promise((resolve, reject) => {
        axios.get('/api-s/shops/orders/sumTurnoverThisYears',{params:query}).then(x=>{
            resolve(x)
        }).catch(err=>{
            reject(err)
        })
    });
}
const api_某年的总营业额=(query)=>{
    return new Promise((resolve, reject) => {
        axios.get('/api-s/shops/orders/sumSomeYearTurnover',{params:query}).then(x=>{
            resolve(x)
        }).catch(err=>{
            resolve(err)
        })
    });
}

export{
    api_某月的每天营业额,
    api_某年每月营业额,
    api_某年的总营业额
}