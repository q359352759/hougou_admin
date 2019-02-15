import axios from "@/接口/axios.js";
import qs from "qs";

const api_通过username查询=(username)=>{
    return new Promise((resolve, reject) => {
        axios.get("/api-u/users/findByUserid/" + username).then(x => {
            resolve(x);
        }).catch(err => {
            reject(err);
        });
    });
}

export{
    api_通过username查询
}