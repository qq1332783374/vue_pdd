<template>
    <div class="hot-nav">
        <div class="hot-nav-content" ref="navs">
            <div class="nav-content-inner">
                <a class="inner-item" v-for="(item,index) in _getHotNavData" :key="index" v-if="item.flag" >
                    <img :src="'http://cloudcom.org.cn'+item.iconurl" alt="" width="40%">
                    <span>{{item.icontitle}}</span>
                </a>
            </div>
        </div>
        <div class="hot-nav-bottom">
            <div class="hot-nav-bottom-inner" :style="innerBarStyle"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'hotNav',
    data() {
        return {
            //1. 获取屏幕宽度
            windownW: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            //2. 滚动区域的宽度
            scrollContentW: 730,
            //3. 滚动条背景长度
            scrollBgW: 100,
            //4. 滚动条长度
            scrollBarW: 0,
            //5. 触摸起点
            startX: 0,
            //6. 触摸结束点
            endFlag: 0,
            //7. 移动距离
            barMoveWidth: 0
        }
    },
    methods: {
        getBottomBarWidth() { // 获取滚动条的长度
            this.scrollBarW = this.scrollBgW * (this.windownW / this.scrollContentW)
        },
        handleTouchStart(event) { // 触摸开始
            //1. 获取第一个触摸起点
            var touch = event.touches[0]
            //2. 起点
            this.startX = Number(touch.pageX)
        },
        handleTouchMove(event) { // 触摸移动
            //1. 获取第一个触摸起点
            var touch = event.touches[0]
            //2. 求出移动距离
            var moveWidth = Number(touch.pageX) - this.startX
            //3. 滚动条移动距离
             this.barMoveWidth = -((this.scrollBgW / this.scrollContentW) * moveWidth - this.endFlag)
            //4. 临界点判断
            if(this.barMoveWidth <= 0){
                this.barMoveWidth = 0
            }else if(this.barMoveWidth >= this.scrollBgW - this.scrollBarW){
                this.barMoveWidth = this.scrollBgW - this.scrollBarW
            }
       },
        handleTouchEnd(event) { // 触摸结束
            this.endFlag = this.barMoveWidth
        },
        bindEvent() { // 监听触摸事件
            this.$refs.navs.addEventListener('touchstart',this.handleTouchStart,false)
            this.$refs.navs.addEventListener('touchmove',this.handleTouchMove,false)
            this.$refs.navs.addEventListener('touchend',this.handleTouchEnd,false)
        }
    },
    mounted(){
        this.getBottomBarWidth()
        this.bindEvent()
    },
    computed: {
        _getHotNavData() { // 获取nav数据
            return this.$store.getters.getHotNav
        },
        innerBarStyle() { // 滚动条宽度
            return {
                width: this.scrollBarW + 'px',
                left: this.barMoveWidth + 'px'
            }
        }
    }
}
</script>

<style scoped>
.hot-nav{
    width: 100%;
    height: 180px;
    position: relative;
    background: #fff;
    padding-bottom: 10px;
    margin-top: 2px;
}
.hot-nav .hot-nav-content{
    width: 100%;
    overflow-x: scroll;
}
.hot-nav .hot-nav-content::-webkit-scrollbar{
    display: none;
}
.hot-nav .hot-nav-content .nav-content-inner{
    box-sizing: border-box;
    width: 730px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
}
.hot-nav .hot-nav-content .nav-content-inner .inner-item{
    width: 90px;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #666;
    font-size: 14px;
}
.hot-nav .hot-nav-bottom{
    width: 100px;
    height: 2px;
    background: #ccc;
    position: absolute;
    bottom: 10px;
    left: 36%;
}
.hot-nav .hot-nav-bottom .hot-nav-bottom-inner{
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 50px;
    background: #f00;
}
</style>
