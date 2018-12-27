<template>
    <div class="goodsSpec">
        <div class="spec-header">
            <div class="close">
                <i class="iconfont icon-close_icon" @click="_close"></i>
            </div>
            <div class="spec-selectInfo">
                <div class="price">
                    <span class="rmb">￥</span>
                    <span v-if="checkedGoods.price !=''">
                        {{checkedGoods.price}}
                    </span>
                    <span v-else>{{goodsSpecInfo.defaultPrice}}</span>
                </div>
                <div class="checked">
                    <div class="no-checked" v-if="checkedGoods.type == '' && checkedGoods.size == ''">
                        请选择：商品规格
                    </div>
                    <div class="y-checked" v-else>
                        已选：{{checkedGoods.type}} {{checkedGoods.size}}
                    </div>
                </div>
            </div>
        </div>
        <div class="spec-content">
            <div class="list">
                <div>
                    <div class="list-item" v-for="(item,index) in goodsSpecInfo.specKeyList" :key="index">
                        <div v-if="item.title != '尺码'">
                            <h4>{{item.title}}</h4>
                            <ul v-for="(keyList,index1) in item.specValueList" :key="index1">
                                <li 
                                    v-for="(types,index2) in keyList.valueList" 
                                    :key="index2"
                                    :class="{active1:num1==types.value}"
                                    @click="_test(types)"
                                    ref="test"
                                >
                                    {{types.value}}
                                </li>
                            </ul>
                        </div>
                        <div v-if="item.title == '尺码'">
                            <h4>{{item.title}}</h4>
                            <ul v-for="(keyList,index1) in item.specValueList" :key="index1">
                                <li 
                                    v-for="(types,index2) in keyList.valueList" 
                                    :key="index2"
                                    :class="{active2:num2==types.value}"
                                    @click="_test2(types)"
                                    ref="size"
                                >
                                    {{types.value}}
                                </li>
                            </ul>
                        </div>
                        
                    </div>
                    <div class="quantity">
                         <div class="quantity-title">
                            购买数量
                         </div>
                         <div class="quantity-operation">
                             <button type="button" @click="sub" :disabled="btnDis">-</button>
                             <input type="text" class="num" v-model="count">
                             <button type="button" @click="add">+</button>
                         </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="spec-footer">
            <button type="button" class="join" @click="joinShopCart">加入购物车</button>
            <button type="button" class="buy" @click="buyNow">立即购物买</button>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import { MessageBox } from 'mint-ui'
import axios from 'axios'
import { Indicator } from 'mint-ui'
export default {
    name: 'goodsSpec',
    props:['goodsSpecInfo'],
    data() {
        return {
            num1:-99,
            num2:-99,
            checkedGoods:{  // 已选商品
                type:'',
                price:'',
                size:''
            }, 
            count:1, // 商品数量
            btnDis:false, // 商品数量为 1 的时候 禁止减
            isHaveClassName:{},
        }
    },
    methods: {
        add() {  // 商品数量 ++
            this.count ++
        },
        sub() { // 商品数量 --
            if(this.count<=1){
                this.btnDis = false
                MessageBox('哎呀', '客官至少要选一件商品哦')
            }else {
                this.count --
            }
        },
        _test(types) {  // 类型选择
            this.num1 = types.value
            this.checkedGoods.price = types.price
            this.checkedGoods.type = types.value
        },
        _test2(types) {  // 尺码选择
            this.num2 = types.value
            this.checkedGoods.size = types.value
        },
        joinShopCart() { // 加入购物
            if(this.$refs.size&&this.$refs.test){
                this.$refs.test.forEach((item,index) => {
                    if(item.className == 'active1') {
                        this.isHaveClassName.active1 = item.className
                        return
                    }
                })
                this.$refs.size.forEach((item,index) =>{
                    if(item.className == 'active2') {
                        this.isHaveClassName.active2 = item.className
                        return
                    }
                })
                if(this.isHaveClassName.active1 != 'active1' ) {
                     MessageBox('您好', '请选择正确的商品规格')
                }else if(this.isHaveClassName.active2 != 'active2') {
                    MessageBox('您好', '请选择正确的商品规格')
                }else {
                    var obj = {
                        uuid: this.$store.getters.getLoginInfo.userInfo.uuid,
                        goodsId: this.$route.query.goodsId,
                        goodsNumber: this.count,
                        goodsPrice: this.checkedGoods.price,
                        goodsSpec: this.checkedGoods.type + this.checkedGoods.size
                    }
                    axios.post('/pdd/createShoppingCart',obj).then((res) =>{
                        if(res.data == 'ok') {
                            MessageBox.confirm('成功加入，是否前去查看?').then(() =>{
                                this.$router.push({path:'/shopCart'})
                            }).catch(() =>{

                            })
                        }
                    }).catch((e) =>{
                        console.log(e)
                    })
                }
            }
            if(!this.$refs.size){
                this.$refs.test.forEach((item,index) =>{
                    if(item.className == 'active1') {
                        this.isHaveClassName.active1 = item.className
                        return
                    }
                })
                if(this.isHaveClassName.active1 != 'active1') {
                    MessageBox('您好', '请选择正确的商品规格')
                }else {
                    var obj = {
                        uuid: this.$store.getters.getLoginInfo.userInfo.uuid,
                        goodsId: this.$route.query.goodsId,
                        goodsNumber: this.count,
                        goodsPrice: this.checkedGoods.price,
                        goodsSpec: this.checkedGoods.type + this.checkedGoods.size
                    }
                    axios.post('/pdd/createShoppingCart',obj).then((res) =>{
                        if(res.data == 'ok') {
                            MessageBox.confirm('成功加入，是否前去查看?').then(() =>{
                                this.$router.push({path:'/shopCart'})
                            }).catch(() =>{

                            })
                        }
                    }).catch((e) =>{
                        console.log(e)
                    })
                }
            }
        },
        buyNow() {  // 立即购买
            
            if(this.$refs.size&&this.$refs.test){
                this.$refs.test.forEach((item,index) => {
                    if(item.className == 'active1') {
                        this.isHaveClassName.active1 = item.className
                        return
                    }
                })
                this.$refs.size.forEach((item,index) =>{
                    if(item.className == 'active2') {
                        this.isHaveClassName.active2 = item.className
                        return
                    }
                })
                if(this.isHaveClassName.active1 != 'active1' ) {
                     MessageBox('您好', '请选择正确的商品规格')
                }else if(this.isHaveClassName.active2 != 'active2') {
                    MessageBox('您好', '请选择正确的商品规格')
                }else {
                    var goodsId = []
                    var goodsNumber = []
                    var goodsSpec = []
                    goodsId.push(this.$route.query.goodsId)
                    goodsNumber.push(this.count)
                    goodsSpec.push(this.checkedGoods.type + this.checkedGoods.size)
                    var orderMoney = this.count * this.checkedGoods.price
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

                    axios.post('/pdd/createOrder',settlementInfo).then((res) =>{
                        if(res.data.code == 1) {
                            MessageBox.confirm('成功购买是否前去我的订单查看？').then(action => {
                                this.$router.push({path:'/orders/allOrders',query:{uuid:this.$store.getters.getLoginInfo.userInfo.uuid}})
                            }).catch((e) =>{
                                console.log(e)
                            })
                        }else if(res.data.code == 3) {
                            MessageBox.confirm('购买失败，您的余额不足！是否前去我的订单付款？').then(action => {
                                this.$router.push({path:'/orders/allOrders',query:{uuid:this.$store.getters.getLoginInfo.userInfo.uuid}})
                            }).catch((e) =>{
                                console.log(e)
                            })
                        }
                        
                    })
                    
                }
            }
            if(!this.$refs.size){
                this.$refs.test.forEach((item,index) =>{
                    if(item.className == 'active1') {
                        this.isHaveClassName.active1 = item.className
                        return
                    }
                })
                if(this.isHaveClassName.active1 != 'active1') {
                    MessageBox('您好', '请选择正确的商品规格')
                }else {
                    var goodsId = []
                    var goodsNumber = []
                    var goodsSpec = []
                    goodsId.push(this.$route.query.goodsId)
                    goodsNumber.push(this.count)
                    goodsSpec.push(this.checkedGoods.type + this.checkedGoods.size)
                    var orderMoney = this.count * this.checkedGoods.price
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

                    axios.post('/pdd/createOrder',settlementInfo).then((res) =>{
                        Indicator.open('购买中...')
                        if(res.data.code == 1) {
                            MessageBox.confirm('成功购买是否前去我的订单查看？').then(action => {
                                Indicator.close()
                                this.$router.push({path:'/orders/allOrders',query:{uuid:this.$store.getters.getLoginInfo.userInfo.uuid}})
                            }).catch((e) =>{
                                console.log(e)
                            })
                        }else if(res.data.code == 3) {
                            MessageBox.confirm('购买失败，您的余额不足！是否前去我的订单付款？').then(action => {
                                Indicator.close()
                                this.$router.push({path:'/orders/allOrders',query:{uuid:this.$store.getters.getLoginInfo.userInfo.uuid}})
                            }).catch((e) =>{
                                console.log(e)
                            })
                        }
                        
                    })
                }
            }
        },
        getDefaultAddress() {
            this.$store.dispatch('getAddress', this.$store.getters.getLoginInfo.userInfo.uuid)
        },
        _close() {  // 关闭
            this.$emit('_close' ,false)

            // 已选商品
            this.$emit('alreadyGoods', this.checkedGoods)
        },
        _initScroll() {
            this.listScroll = new BScroll('.list', {
                click: true,
                scrollY: true,
                probeType: 3
            })
        }
    },
    mounted() {
        if(this.goodsSpecInfo){
            setTimeout(()=>{
                this.$nextTick(() =>{
                    this._initScroll()
                })
            },350)
        }
    },
    created() {
        this.getDefaultAddress()
    },
    computed: {
         _getDefaultAddress() {  // 默认地址
            return this.$store.getters.getDefaultAddress
        },
    }
}
</script>

<style scoped>
.goodsSpec {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.spec-header {
    box-sizing: border-box;
    padding: 10px;
    position: fixed;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #ddd;
}
.spec-header .price {
    font-size: 18px;
    color: #f44;
}
span.rmb {
    font-size: 16px;
    color: #f44;
}
.checked {
    padding: 5px 0px;
}
.close {
    display: flex;
    box-sizing: border-box;
    padding: 10px;
    align-items: center;
    justify-content: flex-end;
}
.close i {
    font-size: 20px;
}
.spec-footer {
    display: flex;
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    padding: 10px;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
}
.spec-footer button{
    flex: 1;
    height: 100%;
    border: none;
}
button.join {
    background: #f44;
    color: #fff;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
}
button.buy {
    color: #fff;
    background: orange ;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
}
.spec-content{
    padding: 120px 0px 60px 0px;
    height: 64%;
}
.list{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.list-item {
    box-sizing: border-box;
    padding: 0px 10px;
}
.list-item ul {
    display: flex;
    flex-wrap: wrap;
}
.list-item ul li{
    padding: 6px 12px;
    background: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
    border-radius: 20px;
}
.list-item ul li.active1{
    background: #f44;
    color: #fff;
}
.list-item ul li.active2{
    background: #f44;
    color: #fff;
}
.quantity {
    box-sizing: border-box;
    padding: 10px;
    margin-top: 40px;
    display: flex;
    border-top: 1px solid #ddd;
}
.quantity-operation {
    flex: 1;
    text-align: right;
}
.quantity-operation button{
    border: none;
    width: 24px;
    height: 100%;
    background: #f6f6f6;
}
.quantity-operation input{
    width: 25px;
    text-align: center;
    background: #f6f6f6;
    border: none;
    padding: 3px 6px;
}
</style>
