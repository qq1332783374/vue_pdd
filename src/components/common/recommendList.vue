<template>
    <div class="orderRecommendList">
        <div class="recommend-title">
            <i class="iconfont icon-aixin"></i>
            <span>
                精选推荐
            </span>
        </div>
        <div class="recommend-list">
            <ul>
                <li 
                    class="list-item" 
                    v-for="(item,index) in _getRecommendGoodsList"
                    :key="index"
                >
                    <router-link :to="{path:'/goodsDetail',query:{goodsId:item.goodsId}}">
                        <img :src="item.hdThumbUrl" width="100%" :alt="item.goodsName">
                        <p class="item-title">{{item.goodsName}}</p>
                        <span class="item-price">{{item.price}}￥</span>
                        <span class="count">已拼{{item.num}}万件</span>
                    </router-link>
                </li>
            </ul>
            <div class="loading" v-show="_getRecommendGoodsList.length ==0">
                <s-loading></s-loading>
            </div>
        </div>
    </div>
</template>

<script>
import sLoading from './loading/loading'
export default {
    name: 'orderRecommendList',
    components: {
        sLoading
    },
    computed: {
        _getRecommendGoodsList() {
            return this.$store.getters.getRecommendGoodsList
        }
    },
    methods: {
        getRecommendGoodsList() {
            setTimeout(()=>{
                this.$store.dispatch('getRecommendGoodsList',18)
            },1500)
        }
    },
    created() {
        this.getRecommendGoodsList()
    },
}
</script>

<style scoped>
ul{
    padding: 0;
    margin: 0;
}
ul li{
    list-style: none;
}
.orderRecommendList{
    margin-top: 10px;
    padding-bottom: 50px;
    background: #f5f5f5;
}
.recommend-title{
    padding: 15px;
    text-align: center;
    font-size: 16px;
    color: #f00;
    background: #fff;
}
.recommend-list{
    width: 100%;
    height: 100%;
}
.recommend-list ul{
    display: flex;
    width: 100%;
    flex-wrap: wrap;
}
.recommend-list ul li {
    width: 48%;
    margin-left: 5px;
    margin-top: 5px;
    background: #fff;
}
.recommend-list ul li a{
    text-decoration: none;
    color: #666;
}
.recommend-list ul li a p{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    
}
.recommend-list ul li a .item-price{
    color: #e02e24;
    font-weight: 700;
    font-size: 18px;
}
</style>
