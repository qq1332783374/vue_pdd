<template>
    <div class="goodsCasual">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in casualImgList" :key="index">
                    <img :src="item.imgUrl" :alt="item.imgurl" width="100%">
                </div>
            </div>
            <!-- 分页器 -->
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>

<script>
// 轮播图插件
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
    name: 'goodsCasual',
    props:['casualImgList'],
    watch: {
        casualImgList() {
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

</style>
