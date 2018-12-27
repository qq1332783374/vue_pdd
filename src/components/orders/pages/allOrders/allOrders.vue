<template>
    <div class="allOrders">
        <div class="on-list" v-if="getAllOrdersList.length == 0">
            <i class="iconfont icon-yewubaobiao"></i>
            <p>您还没有相关的订单</p>
        </div>
        <div class="orderList" v-else>
            <div v-for="(item,index) in getAllOrdersList" :key="index">
                <div class="list-item" v-for="(lists,index1) in item.orderDetailList" :key="index1">
                    <div class="item-title">
                        <span class="shopName">Supreme</span>
                        <span class="order-status">{{lists.status}}</span>
                    </div>
                    <div class="item-content">
                        <div class="item-img">
                            <img :src="lists.goods.thumbUrl" :alt="lists.goods.thumbUrl">
                        </div>
                        <div class="item-info">
                            <p class="info-title">{{lists.goods.goodsName}}</p>
                            <div class="count">
                                <p class="numPrice">
                                    <span class="price">商品单价：￥{{lists.goods.price}}</span>
                                    <span class="num">商数量：{{lists.goodsNumber}} 件</span>
                                </p>
                                <p class="allPrice">合计：￥{{item.orderMoney}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'allOrders',
    computed: {
        getAllOrdersList() {
            return this.$store.getters.getAllOrdersList
        }
    }
}
</script>

<style scoped>
.on-list {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: 50px;
    padding-bottom: 40px;
}
.on-list i{
    font-size: 60px;
}
.orderList {
    box-sizing: border-box;
    padding: 10px;
}
.list-item {
    background: #fff;
    width: 100%;
    border-radius: 6px;
    box-sizing: border-box;
    padding: 5px;
    margin-bottom: 10px;
}
.item-title {
    display: flex;
    padding: 5px 0px;
    align-items: center;
    border-bottom: 1px solid #ddd;
}
.item-title span.shopName {
    flex: 1;
}
.item-title span.order-status {
    flex: 1;
    text-align: right;
    color: #f00;
}
.item-content {
    display: flex;
}
.item-info {
    flex: 1;
}
.item-img {
    width: 33.33%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.item-img img{
    width: 80%;

}
.count {
    font-size: 12px;
}
.numPrice{
    display: flex;
    color: rgb(153, 153, 153);

}
span.price {
    flex: 1;
}
span.num {
    flex: 1;
}
</style>
