<template>
    <div class="myOptions">
        <div class="op-title">
            <i class="iconfont icon-2fanhui" @click="goBack"></i>
            <span>设置</span>
        </div>
        <div class="op-set">
            <ul class="lists">
                <li class="list-item" @click="_waiting">
                    <div class="item-title">
                        <i class="iconfont icon-yuechi"></i>
                        <span>免密支付设置</span>
                    </div>
                    <div class="item-icon">
                        <i class="iconfont icon-arrow-right"></i>
                    </div>
                </li>
                <li class="list-item" @click="_waiting">
                    <div class="item-title">
                        <i class="iconfont icon-zhifu"></i>
                        <span>免拼卡设置</span>
                    </div>
                    <div class="item-icon">
                        <i class="iconfont icon-arrow-right"></i>
                    </div>
                </li>
                <li class="list-item" @click="_waiting">
                    <div class="item-title">
                        <i class="iconfont icon-youjian"></i>
                        <span>消息接收设置</span>
                    </div>
                    <div class="item-icon">
                        <i class="iconfont icon-arrow-right"></i>
                    </div>
                </li>
            </ul>
        </div>
        <div class="op-info">
            <ul class="lists">
                <li class="list-item" @click="_waiting">
                    <div class="item-title">
                        <i class="iconfont icon-wenhao"></i>
                        <span>常见问题</span>
                    </div>
                    <div class="item-icon">
                        <i class="iconfont icon-arrow-right"></i>
                    </div>
                </li>
                <li class="list-item" @click="_waiting">
                    <div class="item-title">
                        <i class="iconfont icon-yijian"></i>
                        <span>意见反馈</span>
                    </div>
                    <div class="item-icon">
                        <i class="iconfont icon-arrow-right"></i>
                    </div>
                </li>
            </ul>
        </div>
        <div class="op-merchants">
            <ul class="lists">
                <li class="list-item" @click="_waiting">
                    <div class="item-title">
                        <i class="iconfont icon-dianpu"></i>
                        <span>商家免费入驻</span>
                    </div>
                    <div class="item-icon">
                        <i class="iconfont icon-arrow-right"></i>
                    </div>
                </li>
            </ul>
        </div>
        <div class="logout">
            <button @click="logout">退出登录</button>
        </div>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default {
    name: 'myOptions',
    methods: {
        _waiting() {
            MessageBox('功能开发中', '敬请期待')
        },
        logout() {
            MessageBox.confirm('是否退出登陆?').then(action => {
                this.$store.dispatch('logout', false)
                this.$router.push({path:'/home'})
                localStorage.removeItem('loginInfo')
            }).catch(() =>{
                
            })
        },
        goBack() {
            history.go(-1)
        }
    }
}
</script>

<style scoped>
.myOptions {
    width: 100%;
    height: 100%;
}
.op-title {
    box-sizing: border-box;
    padding: 10px;
    font-size: 16px;
    display: flex;
    align-items: center;
    background: #fff;
    margin-bottom: 10px;
}
.op-title i{
    flex: 0.5;
}
.op-set {
    background: #fff;
    margin-bottom: 10px;
    font-size: 16px;
}
.lists .list-item {
    display: flex;
    box-sizing: border-box;
    padding: 10px;
    border-bottom: 1px solid #ddd;
}
.list-item .item-title {
    flex: 1;
}
.list-item .item-icon {
    flex: 1;
    text-align: right;
}
.op-info{
    background: #fff;
    margin-bottom: 10px;
    font-size: 16px;
}
.op-merchants{
    background: #fff;
    margin-bottom: 10px;
    font-size: 16px;
}
.logout{
    box-sizing: border-box;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.logout button {
    width: 100%;
    height: 100%;
    border: none;
    background: #fff;
}
</style>
