
import Layout from '@/views/layout/Layout'
const 店铺 = {
    path:'/dingdan',
    component:Layout,
    // meta:{
    //     title:'订单',
    //     icon: 'guide'
    // },
    // alwaysShow: true, //一直显示根路由
    children:[
        {
            path:'/dingdan/liebiao',
            component: () => import('@/views/订单/订单列表.vue'),
            name:'dingdan_liebiao',
            meta: { title: '订单列表', icon: 'guide', noCache: true }
        },
    ]
}

export default 店铺;
