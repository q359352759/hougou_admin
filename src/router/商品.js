
import Layout from '@/views/layout/Layout'
const 店铺 = {
    path:'/shangpin',
    component:Layout,
    // meta:{
    //     title:'订单',
    //     icon: 'guide'
    // },
    // alwaysShow: true, //一直显示根路由
    children:[
        {
            path:'/shangpin/liebiao',
            component: () => import('@/views/商品/商品列表.vue'),
            name:'shangpin_liebiao',
            meta: { title: '商品', icon: 'shangping1', noCache: true }
        },
        {
            path:'/shangpin/xiangqing',
            component: () => import('@/views/商品/商品详情.vue'),
            name:'shangpin_xiangqing',
            hidden:true,
            meta: {不快速导航:true, title: '商品详情', icon: 'guide', noCache: true }
        },
    ]
}

export default 店铺;
