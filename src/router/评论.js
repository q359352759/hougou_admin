
import Layout from '@/views/layout/Layout';

const 评论 = {
    path:'/pinglun',
    component:Layout,
    // meta:{
    //     title:'',
    //     icon: 'guide',
    //     // roles: ['admin', 'editor'],
    // },
    // alwaysShow: true, //一直显示根路由
    children:[
        {
            path:'/pinglun/liebiao',
            component: () => import('@/views/评论管理/评论管理.vue'),
            name:'pinglun_liebiao',
            meta: { title: '评论管理', icon: '评论', noCache: true }
        },
    ]
}

export default 评论;
