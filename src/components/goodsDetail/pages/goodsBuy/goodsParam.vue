<template>
    <div class="goodsParam">
        <div class="params-title">
            产品参数
        </div>
        <div class="params-content">
            <div class="no-params" v-if="!paramsInfo">
                <i class="iconfont icon-tubiaozhizuomobanyihuifu-"></i>
                <p>暂无参数</p>
            </div> 
            <div class="params-list" v-else>
                <div class="list-item">
                    <div class="pad">
                        <div class="item" v-for="(params,index) in paramsInfo" :key="index">
                            <label class="type">{{params.type}}</label>
                            <span class="txt">{{params.name}}</span>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
        <div class="params-footer">
            <button @click="_paramsHide">完成</button>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name: 'goodsParam',
    props:['paramsInfo'],
    methods: {
        _paramsHide() {
           this.$emit('_paramsHide', false)
        },
        _initScroll() {
            this.listScroll = new BScroll('.params-list', {
                click: true,
                scrollY: true,
                probeType: 3
            })
        }
    },
    mounted() {
        if(this.paramsInfo) {
            setTimeout(()=>{
                this.$nextTick(() =>{
                    this._initScroll()
                })
            },350)
        }
    }
}
</script>

<style scoped>
.goodsParam {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.params-title {
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    position: fixed;
    width: 100%;
    background: #fff;
    top: 0;
    left: 0;
}
.params-content{
    padding: 65px 0px;
    height: 75%;
}
.params-list {
    height: 100%;
    width: 100%;
    overflow: hidden;
}
.no-params {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 16px;
    padding: 40px 0px;
}
i.iconfont.icon-tubiaozhizuomobanyihuifu- {
    font-size: 74px;
    color: #969696;
}
.params-footer {
    display: flex;
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    height: 60px;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
}
.params-footer button{
    width: 100%;
    height: 100%;
    background: #f33;
    color: #fff;
    border: none;
    border-radius: 21px;
}
.list-item .item {
    box-sizing: border-box;
    padding: 10px;
    font-size: 16px;
    display: flex;
    flex-direction: row;
}
label.type {
    width: 22.22%;
    color: #969696;
}
span.txt {
    width: 70%;
}
.pad{
    padding-bottom: 60px;
}
</style>
