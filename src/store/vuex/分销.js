import axios from '@/api/axios.js'
import qs from "qs";

import 分销类型 from './分销/分销类型.js'
export default {
    namespaced:true,
    state:{
        加载中:''
    },
    getters:{
        
    },
    mutations:{
        
    },
    actions: {
        查询分销({},query){
            return new Promise((resolve, reject) => {
                axios.get('/api-s/shops/findShopRecruitmentAll',{params:query}).then(x=>{
                    resolve(x)
                }).catch(err=>{
                    reject(err)
                }) 
            });
        },
        根据id查询分销({},id){
            // /shops/findShopRecruitmentById/{id}
            return new Promise((resolve, reject) => {
                axios.get('/api-s/shops/findShopRecruitmentById/'+id).then(x=>{
                    resolve(x)
                }).catch(err=>{
                    reject(err)
                })
            });
        },
        查询自定义业务({ state },query){
            return new Promise((resolve, reject) => {
                // console.log(rootGetters['vip/get']) // 打印其他模块的 getters
                axios.get('/api-s/shops/findShopBusinessOptionsAll',{params:query}).then(x=>{
                    if(x.data.code==200){
                        state.自定义业务=x.data.data.data;
                    }
                    resolve(x)
                }).catch(err=>{
                    reject(err)
                })
            });
        },
        修改分销({},obj){
            return new Promise((resolve, reject) => {
                axios.post('/api-s/shops/updateShopRecruitment',obj).then(x=>{
                    resolve(x);
                }).catch(err=>{
                    reject(err);
                })
            });
        }
    },
    modules: {
        分销类型:分销类型
    }
}