<template>
    <div class="bottomMenu">
        <ul class="bottom-nav">
            <li @click="_wait">
                <a href="#">
                    <i class="iconfont icon-hongbao"></i>
                    <span>新人红包</span>
                </a>
            </li>
            <li @click="_wait">
                <a href="#">
                    <i class="iconfont icon-yaoqing"></i>
                    <span>邀请好友</span>
                </a>
            </li>
            <li>
                <router-link :to="{path:'/myAddress',query:{uuid:this.$store.getters.getLoginInfo.userInfo.uuid}}">
                    <i class="iconfont icon-dizhi"></i>
                    <span>收货地址</span>
                </router-link>
            </li>
            <li @click="_wait">
                <a href="#">
                    <i class="iconfont icon-pingjia"></i>
                    <span>我的评价</span>
                </a>
            </li>
            <li @click="_wait">
                <a href="#">
                    <i class="iconfont icon-kefu1"></i>
                    <span>官方客服</span>
                </a>
            </li>
            <li>
                <router-link to="/myOptions">
                    <i class="iconfont icon-shezhi"></i>
                    <span>设置</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default {
    name: 'bottomMenu',
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
.bottomMenu{
    margin-top: 10px;
    padding: 15px;
    background: #fff;
}
.bottom-nav{
    display: flex;
    width: 100%;
    flex-flow: wrap;
}
.bottom-nav li{
    width: 17%;
    margin: 5px;
}
.bottom-nav li a{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: #666;
}
.bottom-nav li a i {
    color:orange;
    font-size: 24px;
}
</style>
