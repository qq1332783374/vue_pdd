<template>
    <div class="goodsHeaderInfo">
        <div class="header-info">
            <div class="price">
                <span class="rmb">￥</span>{{headerInfo.price}}
            </div>
            <div class="title">
                <span>{{headerInfo.goodsName}}</span>
            </div>
        </div>
        <div class="info">
            <div class="courier">
                快递：免运费
            </div>
            <div class="sales-num">
                月销量：{{headerInfo.num}}
            </div>
            <div class="region">
                广东广州
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'goodsHeaderInfo',
    props:['headerInfo']
}
</script>

<style scoped>
.goodsHeaderInfo {
    box-sizing: border-box;
    padding: 10px;
    background: #fff;
}
.goodsHeaderInfo  .header-info .price {
    color: #ff5000;
    font-size: 20px;
}
.goodsHeaderInfo  .header-info span.rmb {
    font-size: 16px;
}
.goodsHeaderInfo  .header-info .title {
    padding: 10px 0;
    font-weight: bolder;
    font-size: 16px;
}
.goodsHeaderInfo .info {
    display: flex;
    padding: 5px 0px;
    align-items: center;
    flex-direction: row;
    color: #969696;
    border-top: 1px solid #ddd;
}
.info div{
    flex: 1;
}
.info .sales-num {
    text-align: center;
}
.info .region {
    flex: 1;
    text-align: right;
}
</style>
