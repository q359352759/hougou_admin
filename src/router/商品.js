
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
            meta: { title: '商品列表', icon: 'guide', noCache: true }
        },
    ]
}

export default 店铺;
