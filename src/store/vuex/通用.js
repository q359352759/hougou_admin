import axios from '@/api/axios.js'
import qs from "qs";

function list_empty(arr){
    for(var i=0;i<arr.length;i++){
        if(arr[i].children.length==0){
            delete arr[i].children;
        }else{
            list_empty(arr[i].children)
        }
    }
}
export default {
    namespaced:true,
    state:{
        服务类型:[],
        店铺类型:[]
    },
    getters:{
        服务类型(state){
            return state.服务类型
        },
        店铺类型(state){
            return state.店铺类型
        }
    },
    mutations:{
       设置服务类型(state,list){
           state.服务类型=list
       },
       设置店铺类型(state,list){
            list_empty(list)    //删除多余的 children
            state.店铺类型=list
       }
    },
    actions: {
        获取服务类型({commit}){
            axios.get('/api-s/shops/type/findAll?start=0&length=10000').then(x=>{
                if(x.data.code==200){
                    commit('设置服务类型',x.data.data.data);
                }
            })
        },
        获取店铺类型({commit}){
            axios.get('/api-s/shops/tree/findAll').then(x=>{
                if(x.data.code==200){
                    commit('设置店铺类型',x.data.data);
                }
            })
        }
    },
    modules: {

    }
}