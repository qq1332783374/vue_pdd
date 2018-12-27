<template>
    <div class="goodsServerInfo">
        <div class="info-title">
            <p>基础服务</p>
        </div>
        <div class="info-content">
            <div class="info-item">
                <div class="b-title">
                    <i class="iconfont icon-dagou"></i>
                    <span>
                        支持7天无理由
                    </span>
                </div>
                <div class="x-title">
                    <span>
                        该商品不支持7天无理由退货
                    </span>
                </div>
            </div>
            <div class="info-item">
                <div class="b-title">
                    <i class="iconfont icon-dagou"></i>
                    <span>
                        公益宝贝
                    </span>
                </div>
                <div class="x-title">
                    <span>
                        购买该商品，每笔成交都会有相应金额捐赠给公益。感谢您的支持，愿公益的快乐伴随您每一天。
                    </span>
                </div>
            </div>
            <div class="info-item">
                <div class="b-title">
                    <i class="iconfont icon-dagou"></i>
                    <span>
                        24小时内发货
                    </span>
                </div>
                <!-- <div class="x-title">
                    <span>
                        该商品不支持7天无理由退货
                    </span>
                </div> -->
            </div>
        </div>
        <div class="info-footer">
            <button @click="_serverHide">完成</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'goodsServerInfo',
    methods: {
        _serverHide() {
            var obj = {
                popupVisible: false,
            }
            this.$emit('_serverHide', obj)
        }
    }
}   
</script>

<style scoped>
.goodsServerInfo{
    width: 100%;
    height: 100%;
}
.info-title {
    box-sizing: border-box;
    padding: 10px;
    font-size: 16px;
    text-align: center;
}
.info-content {
    box-sizing: border-box;
    padding: 10px;
}
.info-item {
    margin-bottom: 15px;
}
.b-title {
    font-size: 16px;
}
.b-title i{
    color: #f00;
}
.x-title {
    padding-left: 20px;
    color: #969696;
}
.info-footer {
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    width: 100%;
    height: 60px;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
}
.info-footer button{
    width: 100%;
    height: 100%;
    background: #f33;
    color: #fff;
    border: none;
    border-radius: 21px;
}
</style>
