import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

import 店铺 from './店铺.js'
import 订单 from './订单.js'
import 商品 from './商品.js'
import 代理人 from './代理人.js'
import 评论 from './评论.js'
// 管理员
import 提现 from './提现.js'
import 红购使者 from './红购使者.js'
import 帮助中心 from './帮助中心.js'
import 分销 from './分销.js'

export const constantRouterMap = [
    chartsRouter,
    {
        path: '/dashboard',
        component: Layout,
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard/index'),
                name: 'Dashboard',
                meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
            }
        ]
    },

    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: () => import('@/views/redirect/index')
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: () => import('@/views/login/authredirect'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/errorPage/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/errorPage/401'),
        hidden: true
    },
    //=========================下面是自己添加的
    {
        path: '',
        component: Layout,
        // redirect: '/zonglan',   //当设置 noredirect 的时候该路由在面包屑导航中不可被点击
        children: [
            {
                path: '/zonglan',
                component: () => import('@/views/总览.vue'),
                name: 'zonglan',
                meta: { title: '总览', icon: 'chart', noCache: true }
                // meta: {
                //     roles: ['admin', 'editor'] //设置该路由进入的权限，支持多个权限叠加
                //     title: 'title' //设置该路由在侧边栏和面包屑中展示的名字
                //     icon: 'svg-name' //设置该路由的图标
                //     noCache: true //如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
                //     breadcrumb: false // 如果设置为false，则不会在breadcrumb面包屑中显示
                // }
            }
        ]
    },
    店铺,
    订单,
    商品,
    代理人,
    红购使者,
    评论
]

export default new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})

export const asyncRouterMap = [
    提现,
    帮助中心,
    分销,
    {
        path: '/icon',
        component: Layout,
        meta: {
            title: 'pagePermission',
            roles: ['admin']
        },
        children: [
            {
                path: 'index',
                component: () => import('@/views/svg-icons/index'),
                name: 'Icons',
                meta: { title: 'icons', icon: 'icon', noCache: true }
            }
        ]
    },

    

    { path: '*', redirect: '/404', hidden: true }
]
