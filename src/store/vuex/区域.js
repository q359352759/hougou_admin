import axios from '@/api/axios.js'
import qs from "qs";

import { convert } from "@/assets/js/currency.js";

export default {
    namespaced:true,
    state:{
        区域:[]
    },
    getters:{
        区域(state){
            return state.区域;
        },
        三级区域(state){
            var list=convert(state.区域);
            return list
        }
    },
    mutations:{
        设置区域(state,obj){
            state.区域=obj
        },
    },
    actions: {
        获取区域({commit}){
            var obj={
                    start: 0,
                    length: 30000
                }
            axios.get('http://api.redmall.vip:10002/api-u/area/findAll',{params:obj}).then(x=>{
                if(x.data.total){
                    commit('设置区域',x.data.data)
                }
            })
        },
    },
    modules: {

    }
}