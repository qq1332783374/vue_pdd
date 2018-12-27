<template>
    <div class="test">
        <div class="content">
            
                    <div class="scrollY">
                        <div>
                        
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                                <p>aaa</p>
                            
                        </div>
                    </div>

        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name: 'test',
    data() {
        return {
            active:0
        }
    },
    methods: {
        _initScroll() {
            this.scrollY = new BScroll('.scrollY', {
                probeType:3,
				click: true,
				scrollY: true,
            })
        },
    },
    mounted() {
        setTimeout(()=>{
            this.$nextTick(()=>{
                this._initScroll()
            })
        },1000)
    },
}
</script>

<style scoped>
.test{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background: #f5f5f5;
}
.content {
    height: 100%;
    overflow: hidden;
}
.scrollY{
    overflow: hidden;
    height: 100%;
    width: 100%;
}
</style>
