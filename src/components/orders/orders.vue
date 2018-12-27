<template>
    <div class="orders">
        <!-- 订单搜索 -->
        <order-search-nav :showSearchPanel="showSearchPanel"></order-search-nav>
        <order-search-panel :showSearchPanel="showSearchPanel" v-if="isShow"></order-search-panel>
        <!-- 导航栏 -->
        <ly-tab v-model="selectedId" :items="items" :options="options" class="fixed"  @change="handChage"></ly-tab>
        <!-- 订单列表 -->
        <div class="order-list">
            <router-view></router-view>
        </div>
        <!-- 精品推荐 -->
        <recommend-list></recommend-list>
    </div>
</template>

<script>
import orderSearchNav from './pages/orderSearchNav'
import orderSearchPanel from './pages/orderSearchPanel'
import recommendList from 'components/common/recommendList'
export default {
    name: 'orders',
    components: {
        orderSearchNav,
        orderSearchPanel,
        recommendList
    },
    data() {
        return {
            isShow: false,
            selectedId: 0,
            items: [
                {label:'全部'},
                {label:'代付款'},
                {label:'已付款'},
                {label:'待发货'},
                {label:'待收货'},
                {label:'待评价'},
                {label:'已完成'}
            ],
            options: {  //设置tabs
                activeColor: '#f00'
            },
            subRouter:[
               {path:'/orders/allOrders',query:{uuid:this.$store.getters.getLoginInfo.userInfo.uuid, orderStatus:null}},
               {path:'/orders/order_0',query:{uuid:this.$store.getters.getLoginInfo.userInfo.uuid, orderStatus:0}},
               {path:'/orders/order_1',query:{uuid:this.$store.getters.getLoginInfo.userInfo.uuid, orderStatus:1}},
               {path:'/orders/order_2',query:{uuid:this.$store.getters.getLoginInfo.userInfo.uuid, orderStatus:2}},
               {path:'/orders/order_3',query:{uuid:this.$store.getters.getLoginInfo.userInfo.uuid, orderStatus:3}},
               {path:'/orders/order_4',query:{uuid:this.$store.getters.getLoginInfo.userInfo.uuid, orderStatus:4}},
               {path:'/orders/order_5',query:{uuid:this.$store.getters.getLoginInfo.userInfo.uuid, orderStatus:5}},
            ],
        }
    },
    methods: {
        showSearchPanel(flag) {
            this.isShow = flag
        },
        handChage(item,index) {
             this.$router.push(this.subRouter[index])
        } ,  
        _getAllOrdersList() {
            var obj = {
                uuid: this.$route.query.uuid,
                orderStatus: this.$route.query.orderStatus
            }
           this.$store.dispatch('getAllOrdersList',obj)
       }
    },
    mounted() {
        this._getAllOrdersList()
    },
    watch: {
        '$route':'_getAllOrdersList'
    }
}
</script>

<style scoped>
.orders {
    height: 100%;
    width: 100%;
}
.order-list {
    background: #f5f5f5;
}
</style>
