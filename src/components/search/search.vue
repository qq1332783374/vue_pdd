<template>
    <div class="search">
        <!-- 搜索导航栏 -->
        <search-nav :showSearchPanel="showSearchPanel"></search-nav>
        <!-- 搜索面板 -->
        <search-panel :showSearchPanel="showSearchPanel" v-if="isShow"></search-panel>
        <div class="shop">
            <!-- 一级分类 -->
            <div class="menu-wrapper">
                <ul>
                    <li 
                        v-for="(item,index) in _getCategoryAndGoods.goodsCategoryList"
                        :key="index"
                        ref="menuList"
                        :class="{active:index==currentIndex}"
						@click="clickRightItem(index)"
                    >
                        <span>{{item.name}}</span>
                    </li>
                </ul>
            </div>
            <!-- 二级分类 -->
            <div class="shop-wrapper">
                <ul ref="shopsParent">
                    <li class="shop-li" v-for="(item,index) in _getCategoryAndGoods.goodsCategoryList" :key="index">
                        <div class="shop-title">
                            <h4>
								{{item.name}}
							</h4>
							<a>
								查看更多>
							</a>
                        </div>
                        <ul class="phone-type" v-if="item.name == '手机'">
                            <li v-for="(mobile,index3) in _getCategoryAndGoods.goodsBrandList" :key="index3">
                                <img :src="'http://cloudcom.org.cn'+mobile.goodsBrandImg" :alt="mobile.title">
                            </li>
                        </ul>
                        <ul class="shops-items">
                            <li v-for="(goods,index1) in item.goodsCategoryDetails" :key="index1">
                                <img :src="'http://cloudcom.org.cn'+goods.icon" :alt="goods.title">
                                <span>
                                    {{goods.title}}
                                </span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import searchNav from './pages/searchNav'
import searchPanel from './pages/searchPanel'
import { Indicator } from 'mint-ui'
export default {
    name: 'search',
    components: {
        searchNav,
        searchPanel,
    },
    data() {
        return {
            isShow: false,
            scrollY:0,
			rightLiTop:[],
        }
    },
    mounted() {
           setTimeout(()=>{
                this.$nextTick(()=>{
                this._initScroll()
                this._initRightLiTop()
            })
           },1000)
    },
    methods: {
        showSearchPanel(flag) {
            this.isShow = flag
        },
        getCategoryAndGoods() {  // 获取商品分类
            this.$store.dispatch('getCategoryAndGoods')
        },
        _initScroll() {  // 初始化BScroll
            // 一级分类
            this.leftScroll = new BScroll('.menu-wrapper', {
                probeType:3,
				click: true,
				scrollY: true,
            })
            // 二级分类
            this.rightScroll = new BScroll('.shop-wrapper', {
                scrollY: true,
				click: true,
				probeType:3
            })
            // 
            this.rightScroll.on('scroll', (pos) =>{
                //console.log(pos)
                // 获取y轴的距离
                this.scrollY = Math.abs(pos.y)
            })
        },
        _initRightLiTop(){
			var arrTemp = []
			var top = 0
			arrTemp.push(top)
			var aLi = this.$refs.shopsParent.getElementsByClassName("shop-li")
				
			for (var i=0;i<aLi.length;i++) {
				//获取每一个li的高度
				top+=parseInt(aLi[i].clientHeight)
				arrTemp.push(top)
			}
			this.rightLiTop = arrTemp 
		},
		//点击左侧，右边切换
		clickRightItem(index){
			this.scrollY = this.rightLiTop[index]
			this.rightScroll.scrollTo(0,-this.scrollY,300)
		},
//		监听左侧滚动条变化
		_leftScroll(index){
			var menuList = this.$refs.menuList
			var el = this.$refs.menuList[index]
			this.leftScroll.scrollToElement(el,300,0,-100)
		}
    },  
    created() {
        this.getCategoryAndGoods()
    },
    computed: {
        _getCategoryAndGoods() {  // 获取商品分类
            return this.$store.getters.getCategoryAndGoods
        },
        currentIndex(){
				//获取每次滚动的下标
				return this.rightLiTop.findIndex((liTop,index)=>{
//					console.log(liTop)
						this._leftScroll(index)
						return this.scrollY>=liTop && this.scrollY<this.rightLiTop[index+1]
				})
			}
    }
}
</script>

<style scoped>
.search{
    width: 100%;
	height: 100%;
	position: relative;
	background: #fff;
	overflow: hidden;
}
.shop{
   position: absolute;
	top: 60px;
	bottom: 50px;
	width: 100%;
	display: flex;
}
.menu-wrapper{
    width: 85px;
	background:#fafafa;
	overflow: hidden;
}
.menu-wrapper ul li{
    height: 60px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	flex-wrap: wrap;
}
.menu-wrapper ul li.active{
    color: #e02e24;
}
.menu-wrapper ul li.active::before{
    content: '';
    background-color: #e02e24;
    width: 4px;
    height: 30px;
    position: absolute;
    left: 0;
}
.shop-wrapper{
    flex: 1;
    background: #fff;
    overflow: hidden;
    padding-bottom: 50px;
}
.shop-li .shop-title{
    display: flex;
    flex-direction: row;
    padding: 0 10px;
    align-items: center;
    justify-content: space-between;
    color: #666;
    font-size: 16px;
}
.shop-li .shop-title a{
    text-decoration: none;
    color: #666;
    font-weight: lighter;
}
.shop-li .shops-items{
    display: flex;
    flex-flow: wrap;
}
.shop-li .shops-items li{
    display: flex;
    width: 33.33%;
    height: 90px;
    justify-content: center;
    align-items: center;
    color: #666;
    font-weight: lighter;
    font-size: 14px;
    flex-direction:column;
}
.shop-li .shops-items li img{
    width: 60%;
    height: 60%;
    margin-bottom: 5px;
}
.phone-type{
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    border-bottom: 1px solid #ddd;
}
.phone-type li{
    width: 33.33%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px 0;
}
.phone-type li img{
    width: 70%;
}
</style>
