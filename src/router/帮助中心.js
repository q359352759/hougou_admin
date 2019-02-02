
import Layout from '@/views/layout/Layout'
const 帮助 = {
    path:'/bangzhu',
    component:Layout,
    meta:{
        title:'帮助中心',
        icon: 'guide',
        roles: ['admin'],
        // roles: ['admin', 'editor'],
    },
    alwaysShow: true, //一直显示根路由
    children:[
        {
            path:'/bangzhu/liebiao',
            component: () => import('@/views/帮助中心/帮助列表.vue'),
            name:'bangzhu_liebiao',
            meta: { title: '列表管理', icon: 'guide', noCache: true }
        },
        {
            path:'/bangzhu/xiangqing',
            component: () => import('@/views/帮助中心/帮助详情.vue'),
            name:'bangzhu_xiangqing',
            hidden:true,
            meta: {不快速导航:true, title: '帮助详情', icon: 'guide', noCache: true }
        },
    ]
}

export default 帮助;
