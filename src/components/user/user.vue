<template>
    <div class="user">
        <!-- 头部 -->
        <user-header></user-header>
        <!-- 订单菜单 -->
        <order-menu></order-menu>
        <!-- 中间菜单 -->
        <middle-menu></middle-menu>
        <!-- 底部菜单 -->
        <bottom-menu></bottom-menu>
        <!-- 推荐商品列表 -->
        <order-recommend-list></order-recommend-list>
    </div>
</template>
<script>
import userHeader from './pages/userHeader'
import orderMenu from './pages/orderMenu'
import middleMenu from './pages/middleMenu'
import bottomMenu from './pages/bottomMenu'
import orderRecommendList from 'components/common/recommendList'
export default {
    name: 'user',
    components: {
        userHeader,
        orderMenu,
        middleMenu,
        bottomMenu,
        orderRecommendList
    },
    computed: {
        _getLoginInfo() {
            return this.$store.getters.getLoginInfo
        }
    },
    methods: {
        _isLogin() {
            if(this._getLoginInfo.isLogin == false){
                this.$router.push({path:'/login'})
            }
        }
    },
    created() {
        this._isLogin()
    }
}
</script>

<style scoped>
@font-face {
  font-family: 'iconfont';  /* project id 955428 */
  src: url('//at.alicdn.com/t/font_955428_e5dhrhnswbg.eot');
  src: url('//at.alicdn.com/t/font_955428_e5dhrhnswbg.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_955428_e5dhrhnswbg.woff') format('woff'),
  url('//at.alicdn.com/t/font_955428_e5dhrhnswbg.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_955428_e5dhrhnswbg.svg#iconfont') format('svg');
}
.user{
    box-sizing: border-box;
}
</style>
