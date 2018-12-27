<template>
    <div class="hot">
        <!-- 轮播图  -->
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in _getCasualList" :key="index" v-if="item.flag">
                    <img :src="'http://cloudcom.org.cn'+item.imgurl" :alt="item.imgurl" width="100%">
                </div>
            </div>
            <!-- 分页器 -->
            <div class="swiper-pagination"></div>
        </div>

        <!-- 九宫格导航 -->
        <hot-nav></hot-nav>

        <!-- 广告商位 -->
        <div class="hot-ad">
            <img src="./ad/home_ad.gif" alt="ad" width="100%">
        </div>

        <!-- 商品列表 -->
        <hot-list></hot-list>
    </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import hotNav from './hotNav'
import hotList from './hotList'
export default {
    name: 'hot',
    components: {
        hotNav,
        hotList
    },
    computed: {
        _getCasualList(){
            return this.$store.getters.getCasualList
        }
    },
    mounted() {
        // 轮播图
        this.$store.dispatch('getCasualList')
        // 九宫格
        this.$store.dispatch('getHotNav')
        // 商品列表
        this.$store.dispatch('getHotGoodsList',17)
    },
    watch:{
        _getCasualList() {
            this.$nextTick(() =>{
                var mySwiper = new Swiper('.swiper-container', {
                    loop: true, // 是否循环
                    autoplay: true, // 是否自动轮播
                    pagination: {  // 分页器
                        el: '.swiper-pagination'
                    }
                })
            })
        }
    }
}
</script>

<style scoped>
.hot-ad{
    background: #fff;
    margin: 8px 0;
    padding: 5px;
}
</style>
