<template>
    <div class="hotList">
        <div class="hot-content">
            <ul class="hot-goods-list">
                <li class="goods-item" v-for="(item, index) in _getHotGoodsList" :key="index" :goods_id="item.goods_id">
                    <router-link :to="{path:'/goodsDetail',query:{goodsId:item.goodsId}}">
                        <img :src="item.imageUrl" :alt="item.goodsId" width="100%">
                        <h4 class="goods-title">{{item.goodsName}}</h4>
                        <div class="item-button">
                            <span class="goods-price">￥{{item.price}}</span>
                            <span class="goods-counter">已拼{{item.num}}万件</span>
                            <span class="goods-user">
                                <img data-v-0148b0eb="" src="http://t20img.yangkeduo.com/a/7bb7677358604fcc75c86f37a2a567cfa1107684-1534773680?imageMogr2/thumbnail/100x" alt="">
                                <img data-v-0148b0eb="" src="http://t20img.yangkeduo.com/a/f44b185c296fd8ef9302a2c70f2033c4133c85df-1532393091?imageMogr2/thumbnail/100x" alt="">
                            </span>
                            <span class="goods-buy">
                                <button class="buy">去拼单></button>
                            </span>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'hotList',
    computed: {
        _getHotGoodsList() {
            return this.$store.getters.getHotGoodsList
        }
    }
}
</script>

<style scoped>
ul{
    margin: 0;
    padding: 0;
}
ul li{
    list-style: none;
}
.hotList{
    margin-bottom: 55px;
}
.hot-content{
    margin-bottom: 55px;
    background: #f5f5f5f5;
    padding-bottom: 50px;
}

.hot-goods-list .goods-item a{
    margin-bottom: 10px;
    background: #fff;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 5px;
    text-decoration: none;
}
.hot-goods-list .goods-item .goods-title{
    font-size: 15px;
    color: #000;
}
.hot-goods-list .goods-item .item-button{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}
.hot-goods-list .goods-item .item-button .goods-price{
    font-size: 18px;
    text-align: center;
    font-weight: bolder;
    color: #f00;
}
.hot-goods-list .goods-item .item-button .goods-counter{
    flex: 2;
    font-size: 12px;
    color: #ccc;
}
.hot-goods-list .goods-item .item-button .goods-user{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}
.hot-goods-list .goods-item .item-button .goods-user img{
    width: 30px;
    border-radius: 50%;
}
.hot-goods-list .goods-item .item-button .goods-buy{
    flex: 2;
}
.hot-goods-list .goods-item .item-button .goods-buy button{
    width: 80%;
    height: 34px;
    font-size: 15px;
    border: none;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    background: #f00;
    border-radius: 5px;
}
</style>
