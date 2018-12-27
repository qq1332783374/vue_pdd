<template>
    <div class="bottomBar">
        <div class="tabbar">
            <div class="tabbar-item">
                <router-link to="/home" :class="{on:this.$route.path.includes('/home')}">
                    <img :src="this.$route.path.includes('/home')?iconList[0].activeImg:iconList[0].iconImg">
                    <span>
                        {{iconList[0].txt}}
                    </span>
                </router-link>
            </div>
            <div class="tabbar-item">
                <router-link to="/recommend" :class="{on:iconList[1].status == this.$route.name}">
                    <img :src="this.$route.name == iconList[1].status?iconList[1].activeImg:iconList[1].iconImg">
                    <span>
                        {{iconList[1].txt}}
                    </span>
                </router-link>
            </div>
            <div class="tabbar-item">
                <router-link to="/search" :class="{on:iconList[2].status == this.$route.name}">
                    <img :src="this.$route.name == iconList[2].status?iconList[2].activeImg:iconList[2].iconImg">
                    <span>
                        {{iconList[2].txt}}
                    </span>
                </router-link>
            </div>
            <div class="tabbar-item">
                <router-link to="/shopCart" :class="{on:iconList[3].status == this.$route.name}">
                    <img :src="this.$route.name == iconList[3].status?iconList[3].activeImg:iconList[3].iconImg">
                    <span>
                        {{iconList[3].txt}}
                    </span>
                </router-link>
            </div>
            <div class="tabbar-item">
                <router-link to="/user" :class="{on:iconList[4].status == this.$route.name}">
                    <img :src="this.$route.name == iconList[4].status?iconList[4].activeImg:iconList[4].iconImg">
                    <span>
                        {{iconList[4].txt}}
                    </span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'bottomBar',
    data() {
        return {
            iconList: [
                {iconImg:require('./barIconImg/icon_home.png'),activeImg:require('./barIconImg/icon_home_selected.png'),txt:'首页',path:'/home',status:'home'},
                {iconImg:require('./barIconImg/icon_intro.png'),activeImg:require('./barIconImg/icon_intro_selected.png'),txt:'推荐',path:'/recommend',status:'recommend'},
                {iconImg:require('./barIconImg/icon_search.png'),activeImg:require('./barIconImg/icon_search_selected.png'),txt:'搜索',path:'/search',status:'search'},
                {iconImg:require('./barIconImg/icon_shopCart.png'),activeImg:require('./barIconImg/icon_shopCart_selected.png'),txt:'购物车',path:'/shopCart',status:'shopCart'},
                {iconImg:require('./barIconImg/icon_mine.png'),activeImg:require('./barIconImg/icon_mine_selected.png'),txt:'我的',path:'/user',status:'user'},
            ]
        }
    }
}
</script>

<style scoped>
.bottomBar{
    width: 100%;
    height: 50px;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    border-top: 1px solid #ddd;
}
.tabbar{
    
    display: flex;
    
}
.tabbar .tabbar-item{
    flex: 1;
    display: flex;
}
.tabbar .tabbar-item a{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #666;
    cursor: pointer;
}
.tabbar .tabbar-item img{
    width: 35%;
    margin-top: 4px;
}
.tabbar .tabbar-item a.on{
    color: #f00;
}
</style>
