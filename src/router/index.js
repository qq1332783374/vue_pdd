import Vue from 'vue'
import Router from 'vue-router'
//主页
import home from 'components/home/home'
import test from 'components/home/test'
// 商品详情
import goodsDetail from 'components/goodsDetail/goodsDetail'
// 推荐
import recommend from 'components/recommend/recommend'
// 搜索
import search from 'components/search/search'
// 购物车
import shopCart from 'components/shopCart/shopCart'
// 用户
import user from 'components/user/user'
// 用户信息
import userInfo from 'components/user/pages/userInfo'
// 收货地址
import myAddress from 'components/user/pages/address/myAddress'
// 编辑收货地址
import editorAddress from 'components/user/pages/address/editorAddress'
// 添加收货地址
import addAddress from 'components/user/pages/address/addAddress'
// 设置
import myOptions from 'components/user/pages/myOptions/myOptions'
// 登陆
import login from 'components/login/login'
// 订单列表
import orders from 'components/orders/orders'
// 全部订单
import allOrders from 'components/orders/pages/allOrders/allOrders'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/test',
      name: 'test',
      component: test,
      meta: {showBottomTabBar: true}
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {showBottomTabBar: true}
    },
    {
      path: '/',
      redirect:'/home'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: recommend,
      meta: {showBottomTabBar: true}
    },
    {
      path: '/search',
      name: 'search',
      component: search,
      meta: {showBottomTabBar: true}
    },
    {
      path: '/shopCart',
      name: 'shopCart',
      component: shopCart,
      meta: {showBottomTabBar: true}
    },
    {
      path: '/user',
      name: 'user',
      component: user,
      meta: {showBottomTabBar: true}
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: userInfo
    },
    {
      path: '/goodsDetail',
      name: 'goodsDetail',
      component: goodsDetail
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/orders',
      name: 'orders',
      component: orders,
      redirect:'/orders/allOrders',
      children:[
        {path:'allOrders',name:'allOrders',component:allOrders,meta: {showBottomTabBar: true}},
        {path:'order_0',name:'order_0',component:allOrders,meta: {showBottomTabBar: true}},
        {path:'order_1',name:'order_1',component:allOrders,meta: {showBottomTabBar: true}},
        {path:'order_2',name:'order_2',component:allOrders,meta: {showBottomTabBar: true}},
        {path:'order_3',name:'order_3',component:allOrders,meta: {showBottomTabBar: true}},
        {path:'order_4',name:'order_4',component:allOrders,meta: {showBottomTabBar: true}},
        {path:'order_5',name:'order_5',component:allOrders,meta: {showBottomTabBar: true}}
      ],
    },
    {
      path: '/myAddress',
      name: 'myAddress',
      component: myAddress
    },
    {
      path: '/addAddress',
      name: 'addAddress',
      component: addAddress
    },
    {
      path:'/editorAddress',
      name: editorAddress,
      component: editorAddress
    },
    {
      path:'/myOptions',
      name: 'myOptions',
      component: myOptions
    }
  ]
})
