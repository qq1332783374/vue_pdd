import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import { Indicator } from 'mint-ui'
import { Toast } from 'mint-ui'
Vue.use(Vuex)

const state = {
    casualList: [],  // 轮播图数据
    hotNav: [], // 热门九宫格数据,
    hotGoodsList: [],  // 热门商品
    recommendGoodsList:[],  // 推荐商品列表
    categoryAndGoods:{},  //商品一级分类
    loginInfo: JSON.parse(localStorage.getItem('loginInfo')) || {  // 登陆状态
        isLogin: false,
        userInfo:null,
        userName:'',
    },
    ordersList:[],  // 订单列表
    addressList: [], // 地址列表
    pdc:{}, // 三级区域
    shopCartData:[], // 购物车数据
    defaultAdderss:{},  // 默认地址
    editorAddressInfo:{}, // 编辑收货地址
}   

const getters = {
    getCasualList() { // 轮播图数据
        return state.casualList
    },
    getHotNav() { // 热门九宫格数据
        return state.hotNav
    },
    getHotGoodsList() { // 热门商品
        return state.hotGoodsList
    },
    getRecommendGoodsList() { // 推荐商品列表
        return state.recommendGoodsList
    },
    getCategoryAndGoods() {  // 商品分类
        return state.categoryAndGoods
    },
    getLoginInfo() {  // 登陆信息
        return state.loginInfo
    },
    getAllOrdersList() { // 订单信息
        return state.ordersList
    },
    getAddressList() {  // 地址
        return state.addressList
    },
    getPdc() {  // 三级地址
        return state.pdc
    },
    getShopCartData() {  // 购物车数据
        return state.shopCartData
    },
    getDefaultAddress() {  // 默认地址
        return state.defaultAdderss
    },
    editorAddressInfo() {  // 编辑收货地址
        return state.editorAddressInfo
    }
}

const actions = {
    getCasualList(ctx) {  // 轮播图数据
        axios.get('/pdd/getHomeData').then((res) =>{
            ctx.commit('getCasualList', res.data.slideShowList)
        }).catch((e) =>{
            console.log(e)
        })
    },
    getHotNav(ctx) { // 热门九宫格数据
        axios.get('/pdd/getHomeData').then((res) =>{
           ctx.commit('getHotNav',res.data.homeNavs)
        }).catch((e) =>{
            console.log(e)
        })
    },
    getHotGoodsList(ctx,id){  // 获取热门商品
        var params = new URLSearchParams
        params.append('id',id)
        axios.post('/pdd/getActivityGoods',params).then((res) =>{
            ctx.commit('getHotGoodsList',res.data.goodsList)
        }).catch((e) =>{
            console.log(e)
        })
    },
    getRecommendGoodsList(ctx, id) {  // 推荐商品列表
        var params = new URLSearchParams
        params.append('id',id)
        axios.post('/pdd/getActivityGoods',params)
            .then((res) =>{
                ctx.commit('getRecommendGoodsList', res.data.goodsList)
            })
            .catch((e) =>{
                console.log(e)
            })
    },
    getCategoryAndGoods(ctx) {  // 商品分类
        axios.post('/pdd/getCategoryAndGoods').then((res) =>{
            ctx.commit('getCategoryAndGoods', res.data)
        }).catch((e) =>{
            console.log(e)
        })
    },
    getVerification(ctx,obj) {  // 获取验证码
        axios.get('/pdd/getCode',{
            params: {
                mobile: obj
            }
        }).then((res) =>{
            console.log('验证码'+res.data.code)
            var info = {
                code: res.data.code,
                mobile: obj
            }
            ctx.commit('getVerification',info)
        }).catch((e) =>{
            console.log(e)
        })
    },
    loginInfo(ctx,obj) {  // 登陆
        axios.get('/pdd/login', {
            params: {
                userPhone: obj.mobile
            }
        }).then((res) =>{
            ctx.commit('loginInfo', res.data)
        }).catch((e) =>{
            console.log(e)
        })
    },
    getAllOrdersList(ctx, obj) { // 全部订单
        // 获取全部订单
        axios.get('/pdd/getOrderList',{
            params: {
                uuid: obj.uuid,
                orderStatus: obj.orderStatus
            }
        }).then((res) =>{
            //console.log(res)
            ctx.commit('getAllOrdersList', res.data)
        }).catch((e) =>{
            console.log(e)
        })
    },
    getAddress(ctx,obj) {  // 地址
        axios.get('/pdd/getExpressAddressByUUID', {
            params: {
                uuid: obj
            }
        }).then((res) =>{
            ctx.commit('getAddress', res.data)
        }).catch((e) =>{
            console.log(e)
        })
    },
    pdc(ctx,pdc) {  // 三级地址
        ctx.commit('pdc',pdc)
    },
    logout(ctx,obj) {  // 退出登录
        ctx.commit('logout', obj)
    },
    getShopCartData(ctx) { // 购物车数据
        // 请求购物数据  需要用户 uuid
        axios.get('/pdd/getShoppingCartListByUUID', {
            params: {
                uuid: state.loginInfo.userInfo.uuid
            }
        }).then((res) =>{
            ctx.commit('getShopCartData', res.data)
        }).catch((e) =>{
            console.log(e)
        })
    },
    _delGoods(ctx,arr) {  // 删除商品
        arr.forEach((item,index) =>{
            if(item.cartId) {
                axios.get('/pdd/deleteShoppingCart',{
                    params: {
                        id: item.cartId
                    }
                }).then((res) =>{
                    if(res.data == 'ok') {
                        this._actions.getShopCartData[0]()
                    }
                })
            }
        })
    },
    settlement(ctx, obj) { // 结算
        var url = '/pdd/createOrder'
        axios.post(url, obj.settlementInfo).then((res) =>{
            if(res.data.code == 1) {
                // 成功结算删除购物车
                Indicator.open('结算中')
                // 从购物车删除
                obj.shopCartArr.forEach((item,index) =>{
                    if(item.cartId) {
                        axios.get('/pdd/deleteShoppingCart',{
                            params: {
                                id: item.cartId
                            }
                        }).then((res) =>{
                            if(res.data == 'ok') {
                                this._actions.getShopCartData[0]()
                                Indicator.close()
                                Toast({
                                    message: '结算成功',
                                    iconClass: 'iconfont icon-duigou'
                                })
                            }
                        })
                    }
                })
            }else if(res.data.code == 3) {
                //  订单生成成功，但是余额不足变为代付款
                Indicator.open('结算中')
                // 从购物车删除
                obj.shopCartArr.forEach((item,index) =>{
                    if(item.cartId) {
                        axios.get('/pdd/deleteShoppingCart',{
                            params: {
                                id: item.cartId
                            }
                        }).then((res) =>{
                            if(res.data == 'ok') {
                                this._actions.getShopCartData[0]()
                                Indicator.close()
                                
                                Toast({
                                    message: '结算失败，余额不足，订单转为代付款',
                                    iconClass: 'iconfont icon-cha',
                                    duration: 4000
                                })
                            }
                        })
                    }
                })
            }
            
        }).catch((e) =>{
            console.log(e)
        })
    },
    editorAddress(ctx, info) {  // 编辑收货地址
        ctx.commit('editorAddress', info)
    },
    updateExpressAddress(ctx,obj) {  // 更新收货地址
        axios.post('/pdd/updateExpressAddress',obj).then((res) =>{
            if(res.data) {
                Toast({
                    message: '修改成功',
                    iconClass: 'iconfont icon-duigou'
                })
                history.go(-1)
            }
        })
    },
    updateUserInfo(ctx,obj) {  // 更新用户信息
        axios.post('/pdd/updateUser',obj).then((res) =>{
            ctx.commit('updateUserInfo', res.data)
        })
    }
}

const mutations = {
    getCasualList(state,data){ // 轮播图数据
        state.casualList = data
    },
    getHotNav(state, data) {  // 九宫格数据
        state.hotNav = data
    },
    getHotGoodsList(state, data) {  // 热门商品
        state.hotGoodsList = data
    },
    getRecommendGoodsList(state, data) { // 推荐商品列表
        state.recommendGoodsList = data
    },
    getCategoryAndGoods(state, data) { // 商品分类
        state.categoryAndGoods = data
    },
    getVerification(state, data) { // 获取验证码
        state.loginInfo.info = data
    },
    loginInfo(state, data) {  // 登陆
        state.loginInfo.isLogin = true
        if(state.loginInfo.isLogin) {
            state.loginInfo.msg = '登陆成功'
            state.loginInfo.userInfo = data
        }
        // 本地存储
        localStorage.setItem('loginInfo','')
        localStorage.loginInfo = JSON.stringify(state.loginInfo)
    },
    getAllOrdersList(state, data) {  // 订单列表
        // 订单状态 
        /*
            0. 代付款
            1. 已付款
            2. 代发货
            3. 待收货
            4. 待评价
            5. 已完成
        */
        //console.log(data)
        var test = [
            {code:0,name:'代付款'},
            {code:1,name:'已付款'},
            {code:2,name:'代发货'},
            {code:3,name:'待收货'},
            {code:4,name:'待评价'},
            {code:5,name:'已完成'},
        ]
        for(var i=0;i<data.length;i++) {
            for(var k=0;k<test.length;k++) {
                if(data[i].orderStatus == test[k].code) {
                    for(var j=0;j<data[i].orderDetailList.length;j++) {
                        data[i].orderDetailList[j].status = test[k].name
                    }
                 }   
            }
        }
        state.ordersList = data
    },
    getAddress(state, data) {  // 地址
        state.addressList = data
        // 默认地址
        for(var i=0;i<state.addressList.length;i++) {
            if(state.addressList[i].flag) {
                state.defaultAdderss = state.addressList[i]
                return
            }
        }
    }, 
    pdc(state,pdc) {  // 三级地址
        state.pdc = pdc
        state.pdc.isShow = false
    },
    logout(state,obj) { // 退出
        state.loginInfo.isLogin = obj
    },
    getShopCartData(state, data) { // 购物车数据
        data.forEach(element => {
            element.isBuy = false
        });
        
        state.shopCartData = data
    },
    editorAddress(state, info) {  // 编辑收货地址
        state.editorAddressInfo = info
    },
    updateUserInfo(state,info) {  // 更新用户信息
        state.loginInfo.userInfo = info
        localStorage.loginInfo = JSON.stringify(state.loginInfo)
        Toast({
            message: '操作成功',
            iconClass: 'iconfont icon-duigou'
        })
    }
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})