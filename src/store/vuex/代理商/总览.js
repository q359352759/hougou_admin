import axios from '@/api/axios.js'
import qs from "qs";

import { api_查询店铺 ,api_店铺修改列表 } from "@/接口/店铺接口.js";
import { api_查询代理人列表 } from "@/接口/代理人接口.js";
import { api_查询订单列表 } from "@/接口/订单接口.js";

const 初始数据={
    商家:{
        total:0,
        loading:true,
    },
    今日新增商家:{
        total:0,
        loading:true
    },
    商家入驻待审核:{
        total:0,
        loading:true
    },
    商家修改待审核:{
        total:0,
        loading:true
    },
    待查阅商品:{
        total:0,
        loading:true,
    },
    待查阅店铺简介:{
        total:0,
        loading:true
    },
    代理人总数:{
        total:0,
        loading:true,
    },
    红购使者:{
        total:0,
        loading:true,
    },
    代理人今日新增:{
        total:0,
        loading:true
    },
    订单总数:{
        total:0,
        loading:true
    }
}
export default {
    namespaced:true,
    state:初始数据,
    getters:{
        所有数据(state){
            return state
        }
    },
    mutations:{

    },
    actions: {
        数据初始化({state,rootGetters,dispatch}){
            // console.log('其他地方的state',rootState);
            // console.log(rootGetters['vip/get']) // 打印其他模块的 getters
            // dispatch('vip/get', {}, {root: true}) // 调用其他模块的 actions
            // commit('vip/receive', data, {root: true}) // 调用其他模块的 mutations
            // console.log(state,初始数据,rootGetters['登陆/userInfo']);
            // state=Object.assign(state, stateTpl)
            state=JSON.parse(JSON.stringify(初始数据));
            dispatch('查询商家');
            dispatch('商家入驻待审核');
            dispatch('商家修改待审核');
            // dispatch('代理人总数');
            dispatch('订单总数');
            // dispatch('查询红购使者')
        },
        查询商家({state,rootGetters}){
            var 代理商信息=rootGetters['登陆/代理商信息'];
            var 管理员=rootGetters['登陆/管理员'];
            var query={
                    start:0,
                    length:10,
                    areaCode:管理员 ? '' : 代理商信息.areaCode
                }
                api_查询店铺(query).then(x=>{
                    state.商家.total=x.data.data.total;
                    state.商家.loading=false;
                }).catch(err=>{})
        },
        商家入驻待审核({state,rootGetters}){
            var 代理商信息=rootGetters['登陆/代理商信息'];
            var 管理员=rootGetters['登陆/管理员'];
            var query={
                    start:0,
                    length:10,
                    areaCode:管理员 ? "" : 代理商信息.areaCode,
                    state:0
                }
            api_查询店铺(query).then(x=>{
                state.商家入驻待审核.loading=false;
                state.商家入驻待审核.total=x.data.data.total;
            }).catch(err=>{})
        },
        商家修改待审核({state,rootGetters}){
            var 代理商信息=rootGetters['登陆/代理商信息'];
            var 管理员=rootGetters['登陆/管理员'];
            var query={
                    start:0,
                    length:10,
                    state:0,
                    areaCode:管理员 ? "" : 代理商信息.areaCode
                }
            state.商家修改待审核.loading=true;
            state.商家修改待审核.total=0;
            api_店铺修改列表(query).then(x=>{
                state.商家修改待审核.loading=false;
                state.商家修改待审核.total=x.data.data.total;
            })
        },
        代理人总数({state,rootGetters}){
            var 代理商信息=rootGetters['登陆/代理商信息'];
            var 管理员=rootGetters['登陆/管理员'];
            var query={
                    type:1,
                    start:0,
                    length:10,
                    areaCode:管理员 ? "" : 代理商信息.areaCode 
                }
            state.代理人总数.total=0;
            state.代理人总数.loading=true;
            return new Promise((resolve, reject) => {
                api_查询代理人列表(query).then(x=>{
                    state.代理人总数.total=x.data.data.total;
                    state.代理人总数.loading=false;
                    resolve()
                })
            });
        },
        查询红购使者({state,rootGetters}){
            var 代理商信息=rootGetters['登陆/代理商信息'];
            var 管理员=rootGetters['登陆/管理员'];
            var query={
                    type:2,
                    start:0,
                    length:10,
                    areaCode:管理员 ? "" : 代理商信息.areaCode 
                }
            state.红购使者.total=0;
            state.红购使者.loading=true;
            return new Promise((resolve, reject) => {
                api_查询代理人列表(query).then(x=>{
                    state.红购使者.total=x.data.data.total;
                    state.红购使者.loading=false;
                    resolve()
                })
            });
        },
        订单总数({state,rootGetters}){
            var 代理商信息=rootGetters['登陆/代理商信息'];
            var 管理员=rootGetters['登陆/管理员'];
            var query={
                    start:0,
                    length:10,
                    areaCode:管理员 ? "" : 代理商信息.areaCode
                }
            state.订单总数.total=0;
            state.订单总数.loading=true;
            api_查询订单列表(query).then(x=>{
                state.订单总数.total=x.data.data.total;
                state.订单总数.loading=false;
            })
        }
    },
    modules: {

    }
}