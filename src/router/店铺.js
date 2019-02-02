
import Layout from '@/views/layout/Layout'
import { Loading } from 'element-ui';

const 店铺列表 = resolve => { 
    var loadingInstance = Loading.service();
    console.log('开始加载')
    require.ensure([], () => { 
            resolve(require("@/views/店铺/店铺列表.vue")); 
        console.log('加载完成')
        setTimeout(x=>{
            loadingInstance.close();
        },2000)
    });
};

const 店铺 = {
    path:'/dianpu',
    component:Layout,
    meta:{
        title:'店铺',
        icon: 'dianpu'
    },
    // alwaysShow: true, //一直显示根路由
    children:[
        {
            path:'/dianpu/liebiao',
            // component: () => import('@/views/店铺/店铺列表.vue'),
            component:店铺列表,
            name:'dianpuliebiao',
            meta: { title: '店铺列表', icon: 'list', noCache: true }
        },
        {
            path:'/dianpu/xiugaiLibiao',
            component: () => import('@/views/店铺/店铺修改列表.vue'),
            name:'dianpu_xiugaiLibiao',
            meta: { title: '店铺修改列表', icon: 'list', noCache: true }
        },
        {
            path:'/dianpu/tianJiaShenHe',
            component: () => import('@/views/店铺/店铺申请审核.vue'),
            name:'dianpu_tianJiaShenHe',
            hidden:true,
            // redirect: 'dianpuliebiao',
            meta: {不快速导航:true, title: '店铺申请审核', icon: 'guide', noCache: true ,breadcrumb: false }
        },{
            path:'/dianpu/xiugaiXiangqing',
            component:() => import('@/views/店铺/店铺修改详情.vue'),
            name:'dianpu_xiugaiXiangqing',
            hidden:true,
            meta: { 不快速导航:true, title: '店铺修改详情', icon: 'guide', noCache: false ,breadcrumb: false }
        }
    ]
}

export default 店铺;
