<template>
    <div class="test">
        <van-tabs v-model="active" animated @click="_test">
            <van-tab v-for="(item,index) in goodsCategoryList" :title="item.name" :key="index">
                <div>
                    <div v-if="item.name == '热门'">
                        <hot></hot>
                    </div>
                    <div v-else>
                        <div class="goodsCategoryList">
                            <div class="scroll-warpper">
                                <div class="scroll-content">
                                    <ul class="category-list">
                                        <li class="list-item" v-for="(icons,index1) in item.goodsCategoryDetails" :key="index1">
                                            <img :src="'http://cloudcom.org.cn'+icons.icon" :alt="icons.id">
                                            <span>
                                                {{icons.title}}
                                            </span>
                                        </li>
                                        <li class="list-item">
                                            <img src="./images/all.png" alt="">
                                            <span>
                                                查看全部
                                            </span>
                                        </li>
                                    </ul>
                                    <div class="no-goods" v-if="goodsList.length == 0">
                                        <i class="iconfont icon-shangpin"></i>
                                        <span>暂无商品</span>
                                    </div>
                                    <div class="goods-list">
                                        <ul>
                                            <li 
                                                v-for="(item,index) in goodsList"
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import axios from 'axios'
import { Indicator } from 'mint-ui'
import hot from './pages/hot/hot'
export default {
    name: 'test',
    components: {
        hot
    },
    data() {
        return {
            active: 0,
            goodsCategoryList:[],
            goodsList:[]
        }
    },
    methods: {
        _test(index,title) {
            Indicator.open('加载中...')
            axios.get('/pdd/getActivityGoods', {
                params: {
                    id: this.goodsCategoryList[index].id
                }
            }).then((res) =>{
                if(res.data == '') {
                    this.goodsList = []
                    setTimeout(() =>{
                        Indicator.close()
                    },300)
                }else {
                    this.goodsList = res.data.goodsList
                    setTimeout(() =>{
                        Indicator.close()
                    },300)
                }
            })
        }
    },
    created() {
        axios.post('/pdd/getCategoryAndGoods').then((res) =>{
            var obj = {
                id: 17,
                name: '热门'
            }
            this.goodsCategoryList.push(obj)
            res.data.goodsCategoryList.forEach((item) => {
                this.goodsCategoryList.push(item)
            });
        })
        axios.get('/pdd/getActivityGoods',{  // 初始热门商品
            params: {
                id: 17
            }
        }).then((res) =>{
            this.goodsList = res.data
        })
    },
}
</script>

<style scoped>
.van-tabs .van-tab__pane{
    background: #f5f5f5;
}
ul.category-list {
    display: flex;
    flex-flow: wrap;
    box-sizing: border-box;
    padding: 10px;
    background: #fff;
    border-top: 1px solid #ddd;
}
li.list-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 20%;
}
li.list-item img{
    width: 75%;
}
.no-goods {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 50px;
    box-sizing: border-box;
}
.no-goods i{
    font-size: 80px;
}
.no-goods span{
    font-size: 18px;
}
.goods-list{
    width: 100%;
}
.goods-list ul{
    display: flex;
    width: 100%;
    flex-wrap: wrap;
}
.goods-list ul li {
    width: 48%;
    margin-left: 5px;
    margin-top: 5px;
    background: #fff;
}
.goods-list ul li a{
    text-decoration: none;
    color: #666;
}
.goods-list ul li a p{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    
}
.goods-list ul li a .item-price{
    color: #e02e24;
    font-weight: 700;
    font-size: 18px;
}
</style>
