<template>
    <div class="recommend">
        <div class="header">
             <i class="iconfont icon-fire"></i>
             <span>
                 热门推荐
             </span>
         </div>
         <div class="content">
             <div class="scrollY">
                 <ul v-if="_getRecommendGoodsList.length !=0">
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
                <div class="loadings" v-else>
                    <loading></loading>
                </div>
             </div>
         </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import loading from 'components/common/loading/loading'
export default {
    name: 'recommend',
    components: {
        loading,
    },
    methods: {
        _initScroll() {
            this.scrollY = new BScroll('.scrollY', {
                probeType:3,
				click: true,
				scrollY: true,
            })
        },
        getRecommendGoodsList() {
            this.$store.dispatch('getRecommendGoodsList',18)
        },
    },
    mounted() {
        this.getRecommendGoodsList()
        setTimeout(()=>{
            this.$nextTick(()=>{
                this._initScroll()
            })
        },1000)
    },
    computed: {
        _getRecommendGoodsList() {
            return this.$store.getters.getRecommendGoodsList
        }
    },
}
</script>

<style scoped>
.recommend{
    width: 100%;
	height: 100%;
	position: relative;
	background: #f5f5f5;
	overflow: hidden;
}
.header {
    box-sizing: border-box;
    padding: 10px;
    background: #fff;
    font-size: 16px;
    text-align: center;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    color: #f40;
    border-bottom: 1px solid #ddd;
    z-index:9;
}
.content{
    position: absolute;
    top: 50px;
	bottom: 50px;
	width: 100%;
	display: flex;
}
.scrollY{
	overflow: hidden;
    height: 100%;
    width: 100%;
}
.recommend-title{
    padding: 15px;
    text-align: center;
    font-size: 16px;
    color: #f00;
    background: #fff;
    position: fixed;
    width: 100%;
}
.recommend-list{
    width: 100%;
    height: 100%;
    overflow:hidden;
}
.scrollY ul{
    display: flex;
    width: 100%;
    flex-wrap: wrap;
}
.scrollY ul li {
    width: 48%;
    margin-left: 5px;
    margin-top: 5px;
    background: #fff;
}
.scrollY ul li a{
    text-decoration: none;
    color: #666;
}
.scrollY ul li a p{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    
}
.scrollY ul li a .item-price{
    color: #e02e24;
    font-weight: 700;
    font-size: 18px;
}
.loadings{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    z-index: 9999;
    position: fixed;
}
</style>