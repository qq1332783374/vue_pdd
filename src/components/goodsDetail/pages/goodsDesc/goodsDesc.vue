<template>
    <div class="goodsDesc">
        <div class="desc-title">
            <span class="line"></span>
            <span class="txt"><i class="iconfont icon-Group-"></i>详情介绍</span>
            <span class="line"></span>
        </div>
        <div v-if="goodsDescInfo">
            <div class="desc-info">
                <p>
                    {{goodsDescInfo.descInfo}}
                </p>
            </div>
            <div class="desc-img">
                <div v-for="(item,index) in goodsDescInfo.descImg" :key="index">
                    <img :src="item.imgUrl" :alt="item.imgUrl" width="100%">
                </div>
            </div>
        </div>
        <div class="no-desc" v-else>
            <p>暂无介绍</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'goodsDesc',
    props:['goodsDescInfo'],
    created() {
        //console.log(this.goodsDescInfo)
    }
}
</script>

<style scoped>
.no-desc{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.goodsDesc{
    margin-top: 10px;
}
.desc-title{
    background: #f5f5f5;
    box-sizing: border-box;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}
span.line {
    width: 40px;
    height: 1px;
    background: #666;
}
span.txt {
    padding: 5px;
}
.desc-info {
    padding: 10px;
    line-height: 1.8;
    background: #fff;
}
</style>
