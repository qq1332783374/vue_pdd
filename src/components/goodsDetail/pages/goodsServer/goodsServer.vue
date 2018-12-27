<template>
    <div class="goodsServer" @click="_serverShow">
        <div class="server-item">
            <label class="server-title">服务</label>
            <span>支持7天无理由 · 公益宝贝 · 24小时内发货</span>
            <i class="iconfont icon-arrow-right"></i>
        </div>
    </div>
</template>

<script>

export default {
    name: 'goodsServer',
    methods: {
        _serverShow() {
            var obj = {
                popupVisible: true,
                status: 'serverInfo'
            }
            this.$emit('_serverShow',obj)
        }
    }
}
</script>

<style scoped>
.goodsServer{
    margin-top: 10px;
    background: #fff;
    padding: 10px;
    box-sizing: border-box;
}
.goodsServer .server-title{
    color: #969696;
}
.goodsServer .server-item i {
    float: right;
}
</style>
