<template>
    <div class="goodsDetail">
        <div class="detailScroll">
            <!-- 轮播图 -->
            <goods-casual :casualImgList="casualImgList"></goods-casual>
            <!-- 头部信息 -->
            <goods-header-info :headerInfo="headerInfo"></goods-header-info>
            <!-- 商品服务 -->
            <goods-server @_serverShow="_serverShow"/>
            <!-- 商品规格和商品参数 -->
            <goods-buy 
                @_goodsSpec="_goodsSpec" 
                @_goodsParam="_goodsParam"
                :alreadyGoodsInfo="alreadyGoodsInfo"
            />
            <!-- 商品介绍 -->
            <goods-desc :goodsDescInfo="goodsDescInfo"/>
        </div>
        <!-- 底部导航栏 -->
        <goods-bottom-bar @joinBuy="joinBuy" />
        <go-back-btn/>
        <!-- 弹出框 -->
        <mt-popup
            v-model="popupVisible"
            position="bottom"
            class="popup"
        >
            <!-- 商品服务信息 -->
            <goods-server-info v-if="status == 'serverInfo'" @_serverHide="_serverHide"/>
            <!-- 商品规格和参数信息 -->
            <goods-spec
                v-if="status == 'specifications'"
                @_close="_close"
                @alreadyGoods="alreadyGoods"
                :goodsSpecInfo="goodsSpecInfo"
            />
            <goods-param
                v-if="status == 'parameter'"
                @_paramsHide="_paramsHide"
                :paramsInfo="paramsInfo"
            />
        </mt-popup>
    </div>
</template>

<script>
import axios from 'axios'
// 返回按钮
import goBackBtn from 'components/common/goBackBtn'
// 商品轮播图
import goodsCasual from './pages/goodsCasual'
// 商品头部信息
import goodsHeaderInfo from './pages/goodsHeaderInfo'
// 商品服务
import goodsServer from './pages/goodsServer/goodsServer'
// 服务信息
import goodsServerInfo from './pages/goodsServer/goodsServerInfo'
// 商品规格和商品参数
import goodsBuy from './pages/goodsBuy/goodsBuy'
import goodsParam from './pages/goodsBuy/goodsParam'
import goodsSpec from './pages/goodsBuy/goodsSpec'
// 商品介绍
import goodsDesc from './pages/goodsDesc/goodsDesc'
// 底部导航栏
import goodsBottomBar from './pages/goodsBottomBar'
export default {
    name: 'goodsDetail',
    components: {
        goBackBtn, // 返回按钮
        goodsCasual,  // 轮播图
        goodsHeaderInfo, // 头部信息
        goodsServer, // 商品服务
        goodsServerInfo, // 服务信息
        goodsBuy,  // 商品规格和商品参数
        goodsParam,  // 商品参数
        goodsSpec, // 商品规格
        goodsDesc,  // 商品介绍
        goodsBottomBar, // 底部导航栏
    },
    data() {
        return {
            popupVisible: false,  // 弹出框是否显示
            status: '',
            casualImgList:[],  // 轮播图数据
            headerInfo:{},  // 头部信息
            paramsInfo:[],  // 参数信息
            goodsDescInfo:{}, // 商品介绍
            goodsSpecInfo:{}, // 商品规格
            alreadyGoodsInfo:{
                type:'',
                price:'',
                size:''
            }, //  已选商品规格 
        }
    },
    created() {
        // 获取商品详情数据
        axios.get('/pdd/getGoodsAndDetails',{
            params: {
                goodsId: this.$route.query.goodsId
            }
        }).then((res) =>{
            // 轮播图
            this.casualImgList = res.data.goodsDetails.imagesDetailList
            // 头部信息
            this.headerInfo = {
                price: res.data.price,
                goodsName: res.data.goodsName,
                num: res.data.num
            }
            // 商品参数
            this.paramsInfo = res.data.goodsDetails.attributeList
            // 商品介绍
            this.goodsDescInfo = {
                descInfo:res.data.goodsDetails.introduce,
                descImg:  res.data.goodsDetails.imagesDetailList2
            }
            // 商品规格
            this.goodsSpecInfo = {
                defaultPrice : res.data.price,
                specKeyList: res.data.goodsDetails.specKeyList
            }
        }).catch((e) =>{
            console.log(e)
        })
    },
    methods: {
        _serverShow(obj) {  // 服务信息显示
           this.popupVisible = obj.popupVisible
           this.status = obj.status
        },
        _serverHide(obj) { // 服务信息隐藏
            this.popupVisible = obj.popupVisible
            this.status = ''
        },
        _goodsSpec(obj) {  // 规格
            this.popupVisible = obj.popupVisible
            this.status = obj.status
        },
        _goodsParam(obj) {  // 参数
            this.popupVisible = obj.popupVisible
            this.status = obj.status
        },
        _paramsHide(obj) { // 参数hide
            this.popupVisible = obj
            this.status = ''
        },
        _close(obj) {  // 规格关闭
            this.popupVisible = obj
        },
        alreadyGoods(obj) {  // 已选商品规格信息
            this.alreadyGoodsInfo = obj
        },
        joinBuy(obj) {  // 立即购买和加入购物车
            this.popupVisible = obj.popupVisible
            this.status = obj.status
        }
    },
    mounted() {
    }
}
</script>

<style scoped>
.goodsDetail{
    width: 100%;
    overflow: hidden;
    overflow-y: scroll;
}
.detailScroll{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.popup{
    width: 100%;
    height: 75%;
    background: #fff;
}
</style>
