
import Layout from '@/views/layout/Layout';

const 红购使者 = {
    path:'/honggoushizhe',
    component:Layout,
    // meta:{
    //     title:'',
    //     icon: 'guide',
    //     // roles: ['admin', 'editor'],
    // },
    // alwaysShow: true, //一直显示根路由
    children:[
        {
            path:'/honggoushizhe/liebiao',
            component: () => import('@/views/红购使者/红购使者.vue') ,
            name:'honggoushizhe_liebiao',
            meta: { title: '红购使者', icon: '人脉', noCache: true }
        },
    ]
}

export default 红购使者;
