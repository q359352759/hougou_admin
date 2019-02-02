
import Layout from '@/views/layout/Layout'
const 分销 = {
    path:'/fenxiao',
    component:Layout,
    meta:{
        title:'分销管理',
        icon: 'guide',
        roles: ['admin'],
        // roles: ['admin', 'editor'],
    },
    alwaysShow: true, //一直显示根路由
    children:[
        {
            path:'/fenxiao/fenxiaoleixing',
            component: () => import('@/views/分销管理/分销类型.vue'),
            name:'fenxiao_fenxiaoleixing',
            meta: { title: '分销类型', icon: 'guide', noCache: true }
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

export default 分销;
