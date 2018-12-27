<template>
    <div class="shopCart">
        <div class="shopCart-header">
            <span>购物车</span><span>({{_getShopCartData.length}})</span>
        </div>
        <div class="shopCart-list" v-if="_getShopCartData.length != 0">
            <div class="item" v-for="(item,index) in _getShopCartData" :key="index">
                <div class="check">
                    <label class="checkBox">
                        <input type="checkbox" v-model="checkItem"  @change="selectOne(index,item)" :value="item.cartId">
                    </label>
                </div>
                <div class="item-content">
                    <div class="item-imgs">
                         <img :src="item.goods.imageUrl" :alt="item.goods.imageUrl">
                    </div>
                    <div class="item-info">
                        <p class="item-title">{{item.goods.goodsName}}</p>
                        <div class="item-select">
                            <!-- <div>
                                <label class="item-select-title">单价:</label>
                                <span style="color:#f00;">{{item.goodsPrice}}￥</span>
                            </div> -->
                            <div>
                                <label class="item-select-title">规格:</label>
                                <span>{{item.goodsSpec}}</span>
                            </div>    
                        </div>
                        <div class="itme-numCount">
                            <span class="price">￥{{item.goodsMoney}}</span>
                            <div class="item-count-group">
                                <span class="btns" @click="sub(item)">-</span>
                                <input type="text" v-model="item.goodsNumber">
                                <span class="btns" @click="add(item)">+</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="no-list" v-else>
            <i class="iconfont icon-gouwuche"></i>
            <p>暂无商品</p>
        </div>
        <!-- 推荐商品 -->
        <recommend-list></recommend-list>
        <!-- 结算 -->
        <div class="count">
            <div class="selectAll">
                <label class="checkBox">
                    <input type="checkbox" v-model="ckeckedAll" @click="_selectAll" >
                </label>
                <span>
                    全选
                </span>
                <span class="del" :class="{delActive:_delActive}" @click="_delItem">
                    删除
                </span>
            </div>
            <div class="countAll">
                <div class="countPrice">
                    <span>
                        合计：
                    </span>
                    <span class="allPrice">
                        ￥{{_countAllPrice}}
                    </span>
                </div>
                <div class="count-btn">
                    <button type="button" @click="settlement">结算</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import recommendList from 'components/common/recommendList'
import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
    name: 'shopCart',
    data() {
        return {
            ckeckedAll : false,
            checkItem:[],
            isDel: false,
        }
    },
    components: {
        recommendList,
    },
    computed: {
        _getDefaultAddress() {  // 默认地址
            return this.$store.getters.getDefaultAddress
        },
        _delActive() {
            var isActive = false
            for(var i=0;i<this._getShopCartData.length;i++) {
                if(this._getShopCartData[i].isBuy) {
                    isActive = true
                }
            }
            return isActive
        },
        _countAllPrice() {  // 计算总价
            var allPrice = 0
            for(var i=0;i<this._getShopCartData.length;i++) {
                if(this._getShopCartData[i].isBuy) {
                    allPrice += parseFloat(this._getShopCartData[i].goodsMoney)
                }
            }
            
            return allPrice.toFixed(2)
        },
        _getLoginInfo() {  // 获取登录信息
            return this.$store.getters.getLoginInfo
        },
        _getShopCartData() {  // 购物车数据
            return this.$store.getters.getShopCartData
        },
    },
    methods: {
        add(item) {  // 加
            var num = 0
            item.goodsNumber++
            num = item.goodsPrice*item.goodsNumber
            item.goodsMoney = num.toFixed(2)
        },
        sub(item) {  // 减
            if(item.goodsNumber<=1) {
                Toast('亲，已经是最少啦')
            }else {
                 var num = 0
                item.goodsNumber--
                num = item.goodsPrice*item.goodsNumber
                item.goodsMoney = num.toFixed(2)
            }
        },
        settlement() {  // 结算
            var isSettlement = false
            var arr = []
            var index = -9999
            var goodsId = []
            var goodsNumber = []
            var goodsSpec = []
            var orderMoney = 0
            for(var i=0;i<this._getShopCartData.length;i++) {
                if(this._getShopCartData[i].isBuy) {
                    // 结算清除购物车
                    this._getShopCartData[i].index = i
                    arr.push(this._getShopCartData[i])
                    // 结算参数
                    isSettlement = this._getShopCartData[i].isBuy
                    goodsId.push(this._getShopCartData[i].goods.goodsId)
                    goodsNumber.push(this._getShopCartData[i].goodsNumber)
                    goodsSpec.push(this._getShopCartData[i].goodsSpec)
                    orderMoney += this._getShopCartData[i].goodsMoney
                }
            }
            if(isSettlement) {
                var settlementInfo = {
                    buyerId: this.$store.getters.getLoginInfo.userInfo.uuid,
                    goodsId: goodsId,
                    goodsNumber: goodsNumber,
                    goodsSpec: goodsSpec,
                    orderMoney: orderMoney,
                    payStatus: 1,
                    receiverAddress: this._getDefaultAddress.address,
                    receiverCity: this._getDefaultAddress.provinces.cityList[0].cityId,
                    receiverDistrict: this._getDefaultAddress.provinces.cityList[0].districtList[0].districtId,
                    receiverMobile: this._getDefaultAddress.mobile ,
                    receiverName: this._getDefaultAddress.consigner,
                    receiverProvince: this._getDefaultAddress.provinces.provinceId,
                    userName: this.$store.getters.getLoginInfo.userInfo.userName
                }
                var obj = {
                    shopCartArr: arr,
                    settlementInfo: settlementInfo
                }
                console.log(obj)
                this.$store.dispatch('settlement', obj)
                if(this._getShopCartData.length == 0) {
                    this.ckeckedAll = false
                }
            }
        },
        _delItem() {  // 删除当前商品
            var arr = []
            var index = -999
            for(var i=0;i<this._getShopCartData.length;i++) {
                if(this._getShopCartData[i].isBuy){
                    this._getShopCartData[i].index = i
                    arr.push(this._getShopCartData[i])
                    this.isDel = true
                }
            }
            if(this.isDel) {
                MessageBox.confirm('确定删除此商品吗?').then(action => {
                    this.$store.dispatch('_delGoods', arr)
                    arr = []
                }).catch((e) =>{
                    console.log(e)
                })
            }
            
            
        },
        selectOne(index,item) {  // 单选
            if(this.checkItem.length == this._getShopCartData.length) {
                this.ckeckedAll = true
            }else {
                this.ckeckedAll = false
            }
            if(this._getShopCartData[index].isBuy) {
                this._getShopCartData[index].isBuy = false
            }else {
                this._getShopCartData[index].isBuy= true
            }
            
        },
        _selectAll() {  // 全选
            this.checkItem = [] 
            if(!this.ckeckedAll) {
                for(var i=0;i<this._getShopCartData.length;i++) {
                    this.checkItem.push(this._getShopCartData[i].cartId)
                    this._getShopCartData[i].isBuy = true
                }
            }else {
                this.checkItem = []
                this.ckeckedAll = false
                for(var i=0;i<this._getShopCartData.length;i++) {
                    this._getShopCartData[i].isBuy = false
                }
            }
        },
        _isLogin() {  // 判断用户是否登录
            if(this._getLoginInfo.isLogin == false){
                this.$router.push({path:'/login'})
            }
        },
        getShopCartData() {
            this.$store.dispatch('getShopCartData')
        },
        getDefaultAddress() {
            this.$store.dispatch('getAddress',this.$store.getters.getLoginInfo.userInfo.uuid)
        }
    },
    created() {
        this._isLogin()
        // 获取购物车信息
        this.getShopCartData()
        // 获取默认地址
        this.getDefaultAddress()
    },
}
</script>

<style scoped>
.del{
    color: #969696;
    margin-left: 5px;
}
.delActive{
    color: #f00;
}
.shopCart {
    background: #f5f5f5;
}
.item-select {
    font-size: 12px;
    padding: 2px 0px;
}
label.item-select-title {
    color: #969696;
}
.no-list {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    flex-direction: column;
    padding: 50px;
    font-size: 18px;
}
.no-list i{
    font-size: 78px;
}
.shopCart-header{
    padding: 15px;
    box-sizing: border-box;
    text-align: center;
    background: #fff;
    color: #666;
    font-size: 18px;
}
.item {
    display: flex;
    align-items: center;
    background: #fff;
    margin-top: 10px;
    box-sizing: border-box;
    padding: 10px;
}
.item-content{
    display: flex;
}
.item-content .item-imgs{
    display: flex;
    flex: 1;
    justify-content: center;
    align-content: center;
}
.item-content .item-imgs img{
    width: 100%;
    height: 100%;
}
.item-info {
    flex: 2;
}
.itme-numCount{
    display: flex;
    margin-top: 2px;
}
.item-info .itme-numCount .item-count-group{
    width: 80%;
    text-align: right;
}
.item-count-group input{
    max-width: 30px;
    text-align: center;
    border: none;
    outline: none;
    font-size: 16px;
}
span.btns {
    font-size: 20px;
}
p.item-title {
    font-size: 14px;
    margin: 0;
}
span.price {
    color: #f00;
    font-weight: 500;
}
input[type='checkbox']{
    width: 20px;
    height: 20px;
    background-color: #fff;
    -webkit-appearance:none;
    border: 1px solid #c9c9c9;
    border-radius: 50%;
    outline: none;
}
.checkBox input[type=checkbox]:checked{
   background: url('./imgages/checked.png') no-repeat;
   background-size: cover;
}
.count{
    position: fixed;
    bottom: 50px;
    background: #fff;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
}
.selectAll {
    flex: 0.5;
    display: flex;
    align-items: center;
}
.countAll{
    flex: 1;
    display: flex;
    height: 100%;
}
.countAll div{
    flex: 1;
    display: flex;
    align-items: center;
}
.allPrice{
    color: #f50;
}
.count-btn button{
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    background: #f50;
    color: #fff;
    font-size: 16px;
}

</style>
