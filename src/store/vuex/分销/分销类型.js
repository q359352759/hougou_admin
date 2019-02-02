import axios from '@/api/axios.js'
import qs from "qs";

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
        查询所有分销分类({}){
            return new Promise((resolve, reject) => {
                axios.get('/api-s/shops/businessOptionsTypeGetFindAll').then(x=>{
                    resolve(x)
                }).catch(err=>{
                    reject(err)
                })
            });
        },
        添加分销类型({rootGetters},obj){
        //    var access_token=
            // console.log('其他地方的state',rootState);
            // console.log(rootGetters['vip/get']) // 打印其他模块的 getters
            // dispatch('vip/get', {}, {root: true}) // 调用其他模块的 actions
            // commit('vip/receive', data, {root: true}) // 调用其他模块的 mutations
            var 登陆token=rootGetters['登陆/登陆token'];
            return new Promise((resolve, reject) => {
                axios.post('/api-s/shops/addBusinessOptionsType',obj,{headers: {Authorization: "Bearer " + 登陆token.access_token}}).then(x=>{
                    resolve(x)
                }).catch(err=>{
                    reject(err);
                })
            });
        },
        修改分销类型({rootGetters},obj){
            var 登陆token=rootGetters['登陆/登陆token'];
            return new Promise((resolve, reject) => {
                axios.post('/api-s/shops/updateBusinessOptionsType',obj,{headers:{Authorization:"Bearer " + 登陆token.access_token}}).then(x=>{
                    resolve(x)
                }).catch(err=>{
                    reject(err);
                })
            });
        },
        删除分销分类({rootGetters},id){
            var 登陆token=rootGetters['登陆/登陆token'];
            return new Promise((resolve, reject) => {
                axios.get('/api-s/shops/deleteBusinessOptionsType/'+id,{headers: {Authorization: "Bearer " + 登陆token.access_token} }).then(x=>{
                    resolve(x)
                }).catch(err=>{
                    reject(err)
                })
            });
        }
    },
    modules: {
    }
}