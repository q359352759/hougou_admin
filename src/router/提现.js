
import Layout from '@/views/layout/Layout'
const 提现 = {
    path:'/tixianGuanli',
    component:Layout,
    meta:{
        title:'提现管理',
        icon: 'guide',
        roles: ['admin'],
        // roles: ['admin', 'editor'],
    },
    alwaysShow: true, //一直显示根路由
    children:[
        {
            path:'/tixianGuanli/liebiao',
            component: () => import('@/views/提现审核/代理人提现审核.vue'),
            name:'tixianGuanli_liebiao',
            meta: { title: '代理人/商提现', icon: 'guide', noCache: true }
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

export default 提现;
