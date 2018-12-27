<template>
    <div class="goodsBottomBar">
        <div class="server bar-item" @click="_wait">
            <div class="item">
                <i class="iconfont icon-dianpu"></i>
                <span>店铺</span>
            </div>
            <div class="item">
                <i class="iconfont icon-kefu1"></i>
                <span>客服</span>
            </div>
            <div class="item">
                <i class="iconfont icon-shoucang"></i>
                <span>收藏</span>
            </div>
        </div>
        <div class=" bar-item">
            <button type="button" class="join" @click="joinBuy">加入购物车</button>
        </div>
        <div class=" bar-item">
            <button type="button" class="buy" @click="joinBuy">立即购买</button>
        </div>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default {
    name: 'goodsBottomBar',
    methods: {
        _wait() {
            MessageBox('更多功能', '正在开发中，敬请期待！')
        },
        joinBuy() {
            var obj = {
                popupVisible:true,
                status: 'specifications'
            }
            this.$emit('joinBuy', obj)
        }
    }
}
</script>

<style scoped>
.goodsBottomBar{
    width: 100%;
    height: 50px;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    flex-direction: row;
}
.goodsBottomBar .bar-item{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
.bar-item button{
    width: 100%;
    height: 100%;
    border: none;
    color: #fff;
}
button.join{
    background: #f44;
}
button.buy{
    background: orange;
}
.server .item{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
}
</style>
