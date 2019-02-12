
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
        {
            path:'/fenxiao/liebiao',
            component: () => import('@/views/分销管理/分销列表.vue'),
            name:'fenxiao_liebiao',
            meta: { title: '分销列表', icon: 'guide', noCache: true }
        },
        {
            path:'/fenxiao/xiangqing',
            component: () => import('@/views/分销管理/分销详情.vue'),
            name:'fenxiao_xiangqing',
            hidden:true,
            meta: { 不快速导航:true,title: '分销详情', icon: 'guide', noCache: true , breadcrumb: false}
        },

        
        // {
        //     path:'/fenxiao/xiugaiLiebiao',
        //     component: () => import('@/views/分销管理/修改列表.vue'),
        //     name:'fenxiao_xiugaiLiebiao',
        //     meta: { title: '修改列表', icon: 'guide', noCache: true }
        // },
        // {
        //     path:'/fenxiao/xiugaiXiangqing',
        //     component: () => import('@/views/分销管理/修改详情.vue'),
        //     name:'fenxiao_xiugaiXiangqing',
        //     hidden:true,
        //     meta: { 不快速导航:true,title: '修改详情', icon: 'guide', noCache: true , breadcrumb: false}
        // }
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
