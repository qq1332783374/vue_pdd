<template>
    <div class="orderMenu">
        <div class="order-title">
            <div class="my-orders">
                我的订单
            </div>
            <div class="all-orders">
               <span @click="selectAllOrders"> 查看全部 ></span>
            </div>
        </div>
        <div class="order-nav">
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="#">
                        <i class="iconfont icon-daifukuan1"></i>
                        <span>代付款</span>
                    </a>
                </li>
                <li class="nav-item">
                     <a href="#">
                        <i class="iconfont icon-fenxiang"></i>
                        <span>待分享</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#">
                        <i class="iconfont icon-daifahuo"></i>
                        <span>待发货</span>
                    </a>
                </li>
                <li class="nav-item">
                     <a href="#">
                        <i class="iconfont icon-daishouhuo"></i>
                        <span>待收货</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#">
                        <i class="iconfont icon-daipingjia"></i>
                        <span>待评价</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'orderMenu',
    methods: {
        selectAllOrders() {
            this.$router.push({path:'/orders/allOrders',query:{uuid:this.$store.getters.getLoginInfo.userInfo.uuid}})
        }
    }
}
</script>

<style scoped>
ul{
    padding: 0;
    margin: 0;
}
ul li{
    
    list-style: none;
}
.orderMenu{
    background: #fff;
    padding: 15px;
}
.order-title{
    width: 100%;
    display: flex;
}
.my-orders {
    flex: 1;
    color: #000;
    font-size: 18px;
}
.all-orders{
    flex: 1;
    text-align: right;
    color: #999;
}
.order-nav{
    width: 100%;
}
.order-nav .nav-menu{
    display: flex;
}
.order-nav .nav-menu .nav-item{
    flex: 1;
    padding: 5px;
}
.order-nav .nav-menu .nav-item a{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-decoration: none;
    color: #666;
}
.order-nav .nav-menu .nav-item a i{
    font-size: 24px;
    color: #9c9c9c;
}
</style>
