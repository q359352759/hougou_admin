import axios from '@/api/axios.js'
import qs from "qs";
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
            state=初始数据;
            dispatch('查询商家');
            dispatch('商家入驻待审核');
            dispatch('商家修改待审核');
            dispatch('代理人总数');
            dispatch('订单总数');
        },
        查询商家({state,rootGetters}){
            var 代理商信息=rootGetters['登陆/代理商信息'];
            var 管理员=rootGetters['登陆/管理员'];
            console.log(管理员,代理商信息);
            var query={
                    start:0,
                    length:10,
                    areaCode:管理员 ? '' : 代理商信息.areaCode
                }
            axios.get('/api-s/shops/findAll',{params:query}).then(x=>{
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
            axios.get('/api-s/shops/findAll',{params:query}).then(x=>{
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
            axios.get('/api-s/shops/update/findAll',{params:query}).then(x=>{
                state.商家修改待审核.loading=false;
                state.商家修改待审核.total=x.data.data.total;
            }).catch(err=>{})
        },
        代理人总数({state,rootGetters}){
            // /api-u/agentUser/find?start=0&length=5&phone=&areaCode=
            var 代理商信息=rootGetters['登陆/代理商信息'];
            var 管理员=rootGetters['登陆/管理员'];
            var query={
                    start:0,
                    length:10,
                    areaCode:管理员 ? "" : 代理商信息.areaCode 
                }
            axios.get('/api-u/agentUser/find',{params:query}).then(x=>{
                state.代理人总数.total=x.data.data.total;
                state.代理人总数.loading=false;
            })
        },
        订单总数({state,rootGetters}){
            var 代理商信息=rootGetters['登陆/代理商信息'];
            var 管理员=rootGetters['登陆/管理员'];
            var query={
                    start:0,
                    length:10,
                    areaCode:管理员 ? "" : 代理商信息.areaCode
                }
            axios.get('/api-s/shops/findAllShopOrders',{params:query}).then(x=>{
                state.订单总数.total=x.data.data.total;
                state.订单总数.loading=false;
            })
        }
    },
    modules: {

    }
}