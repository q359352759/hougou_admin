import axios from '@/api/axios.js'
import qs from "qs";

import { Loading } from 'element-ui';
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
       加载({state},type){
           if(type){
                var options={
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                      }
                state.加载中=Loading.service(options);
           }else{
                state.加载中.close();
           }
       }
    },
    modules: {

    }
}