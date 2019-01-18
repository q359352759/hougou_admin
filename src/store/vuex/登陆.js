
import request from '@/utils/request'
import qs from "qs";
export default {
    namespaced:true,
    state:{
        userInfo: '',
		权限: [],
		代理商信息:'',
		登陆token:''
    },
    getters:{
        userInfo(state){
			return state.userInfo
		},
		权限(state){
			return state.权限
		},
		代理商信息(state){
			return state.代理商信息
		},
		登陆token(state){
			return state.登陆token
		},
		管理员(state){
            var obj=state.权限.find(x=>x.code=='SUPER_ADMIN');
            if(obj){
                return true
            }else{
                return false
            }
        },
        代理商(state){
            var obj=state.权限.find(x=>x.code=='AREA_MANAGER');
            if(obj){
                return true
            }else{
                return false
            }
        }
    },
    mutations:{
		设置userid(state,id){
			
		},
		设置用户信息(state,obj){
			console.log('设置用户信息',obj);
			state.userInfo=obj;
		},
		设置权限(state,obj){
			console.log(obj);
			state.权限=obj
		},
		设置代理商信息(state,obj){
			state.代理商信息=obj;
		},
		保存token(state,obj){
			state.登陆token=obj;
		}
    },
    actions: {
		保存token({commit},data){
			commit('保存token',data)
		},
        获取token({},data){
			return request({url:'/sys/login',method:'post',data:qs.stringify(data)})
		},
		获取用户Id({},token){
			return request({url:'/api-u/users/current',method:'get',params:{access_token:token}})
		},
		获取用户信息({},id){
			return request({url:'/api-u/users/'+id,method:'get'})
		},
		设置用户信息({commit},obj){
            commit('设置用户信息',obj);
            // commit('vip/receive', data, {root: true})
		},
		查询用户权限({commit},id){
			return request({url:'/api-u/users/'+id+'/roles'})
		},
		设置权限({commit},obj){
			commit('设置权限',obj)
		},
		查询代理商信息({state,commit}){
			request({url:'/api-u/areaManager/findme',method:'get',params:{userid:state.userInfo.username}}).then(x=>{
				commit('设置代理商信息',x.data.data);
			})
		},
    },
    modules: {
        
    }
}