<template>
    <div class="middleMenu">
        <ul class="menu-nav" @click="_wait">
            <li>
                <a href="#">
                    <i class="iconfont icon-youhuiquan"></i>
                    <span>优惠券</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="iconfont icon-shangpinshoucang"></i>
                    <span>商品收藏</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="iconfont icon-dianpu"></i>
                    <span>店铺收藏</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="iconfont icon-3lishi"></i>
                    <span>历史浏览</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="iconfont icon-tuikuan"></i>
                    <span>退款售后</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default {
    name: 'middleMenu',
    methods: {
        _wait() {
            MessageBox('更多功能正在开发','敬请期待')
        }
    }
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
.middleMenu{
    margin-top: 10px;
    padding: 15px;
    background: #fff;
}
.menu-nav{
    display: flex;
    width: 100%;
}
.menu-nav li{
    flex: 1;
}
.menu-nav li a{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: #666;
}
.menu-nav li a i {
    color: #f00;
    font-size: 24px;
}
</style>
