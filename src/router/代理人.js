
import Layout from '@/views/layout/Layout';
import { Loading } from 'element-ui';

// const 代理人列表 = resolve => { 
//     var loadingInstance = Loading.service();
//     console.log('开始加载')
//     require.ensure([], () => { 
//             resolve(require("@/views/代理人/代理人列表.vue")); 
//         console.log('加载完成')
//         loadingInstance.close();
//     });
// }; 

const 代理人 = {
    path:'/dailiren',
    component:Layout,
    // meta:{
    //     title:'',
    //     icon: 'guide',
    //     // roles: ['admin', 'editor'],
    // },
    // alwaysShow: true, //一直显示根路由
    children:[
        {
            path:'/dailiren/liebiao',
            component: () => import('@/views/代理人/代理人列表.vue') ,
            name:'dailiren_liebiao',
            meta: { title: '代理人', icon: 'user', noCache: true }
        },
        // {
        //     path:'/shangpin/xiangqing',
        //     component: () => import('@/views/商品/商品详情.vue'),
        //     name:'shangpin_xiangqing',
        //     hidden:true,
        //     meta: {不快速导航:true, title: '商品详情', icon: 'guide', noCache: true }
        // },
    ]
}

export default 代理人;
