
import axios from '@/api/axios.js'
import qs from "qs";
import { Message } from 'element-ui';

export default {
    namespaced:true,
    state:{
        帮助类型:[]
    },
    getters:{
        帮助类型(state){
            return state.帮助类型
        }
    },
    mutations:{
		
    },
    actions: {
		查询帮助类型({state}){
            return new Promise((resolve, reject) => {
                axios.get('/api-u/users/questiontype/findAll?start=0&length=1000').then(x=>{
                    if(x.data.code==200){
                        state.帮助类型=x.data.data.data;
                        resolve()
                    }else{
                        Message.error(x.data.msg ? x.data.msg : x.data.message);
                        reject()
                    }
                }).catch(err=>{
                    console.log(err)
                    Message.error('网络间接错误');
                    reject()
                })
            });
        },
        查询列表({},query){
                // start
                // length
                // type
            return new Promise((resolve, reject) => {
                axios.get('/api-u/users/qusetion/findAll',{params:query}).then(x=>{
                    if(x.data.code==200){
                        resolve(x)
                    }else{
                        Message.error(x.data.msg ? x.data.msg : x.data.message);
                        reject()
                    }
                }).catch(err=>{
                    Message.error('网络间接错误');
                    reject()
                })
            });            
        },
        修改列表({},obj){
            return new Promise((resolve, reject) => {
                axios.post('/api-u/users/question/update',obj).then(x=>{
                    resolve(x)
                }).catch(err=>{
                    reject()
                })
            });
        }
    },
    modules: {
        
    }
}