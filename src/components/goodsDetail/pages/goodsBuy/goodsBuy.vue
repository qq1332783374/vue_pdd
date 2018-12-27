<template>
    <div class="goodsBuy">
        <div class="goods-specifications" @click="_goodsSpec">
            <div v-if="alreadyGoodsInfo.type != '' && alreadyGoodsInfo.price != ''">
                <label class="title">已选</label>
                <span>
                    {{alreadyGoodsInfo.type}} {{alreadyGoodsInfo.size}}
                </span>
            </div>
            <div class="chosed" v-else>
                <label class="title">规格</label>
                <span>
                    请选择 商品规格 
                </span>
            </div>
            <i class="iconfont icon-arrow-right"></i>
        </div>
        <div class="goods-parameter" @click="_goodsParam">
            <label class="title">参数</label>
            <span>
                商品参数
            </span>
            <i class="iconfont icon-arrow-right"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'goodsBuy',
    props:['alreadyGoodsInfo'],
    methods: {
        _goodsSpec() {  // 规格
            var obj = {
                popupVisible : true,
                status: 'specifications'
            }
            this.$emit('_goodsSpec', obj)
        },
        _goodsParam() {  // 参数
            var obj = {
                popupVisible: true,
                status: 'parameter'
            }
            this.$emit('_goodsParam', obj)
        }
    }
}
</script>

<style scoped>
.goodsBuy{
    margin-top: 10px;
    background: #fff;
}
.goods-specifications {
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #ddd;
    display: flex;
}
.goods-specifications div{
    flex: 1;
}
label.title {
    color: #969696;
}
.goods-parameter {
    box-sizing: border-box;
    padding: 10px;
    border-bottom: 1px solid #ddd;
}
.icon-arrow-right{
    float: right;
}
</style>
