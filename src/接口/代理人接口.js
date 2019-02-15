import axios from "@/接口/axios.js";
import qs from "qs";

/**
 *  start=0&length=10&phone=&areaCode=&type=1 1表示代理人 2 表示 红购使者
 * */
const api_查询代理人列表=(query)=>{
    return new Promise((resolve, reject) => {
        axios.get('/api-u/agentUser/find',{params:query}).then(x=>{
            resolve(x)
        }).catch(err=>{
            reject(err)
        })
    });
}

export {
    api_查询代理人列表
}