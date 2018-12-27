<template>
    <div class="userHeader">
        <div class="info">
            <div class="user-info" @click="_userInfo">
                <img src="//pinduoduoimg.yangkeduo.com/avatar/default/7.png@128w_1l_70Q_50sh.webp" alt="">
                <span class="user-name" v-if="_getUserInfo.userName">
                    {{_getUserInfo.userName}}
                    <i class="iconfont icon-shouji"></i>
                </span>
            </div>
            <div class="part-return">
                <div class="part-return-content">
                    <i class="iconfont icon-hongbao-"></i>
                    <span>拼单返现</span>
                </div>
            </div>
        </div>
        <div class="ad">
            <img src="../images/ad.png" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: 'userHeader',
    methods: {
        _userInfo() {
            this.$router.push({path:'/userInfo'})
        }
    },
    computed: {
        _getUserInfo() {
            return this.$store.getters.getLoginInfo.userInfo
        }
    }
}
</script>

<style scoped>

.userHeader{
    background: #fff;
}
.info {
    display: flex;
    padding: 15px;
}
.info .user-info{
    flex: 2;
    display: flex;
    align-content: center;
}
.user-info img{
    width: 64px;
    height: 64px;
    border-radius: 50%;
}
.user-info span{
    display: flex;
    padding-left: 15px;
    align-items: center;
    justify-content: center;
    color: #151516;
    font-size: 18px;
    font-weight: bolder;
}
.user-info i{
    color: #12b7f6;
    font-size: 24px;
}
.info .part-return{
    display: flex;
    justify-content: center;
    align-items: center;
}
.part-return .part-return-content{
    padding: 5px 10px;
    border: 1px solid #ddd;
    border-radius: 15px;
}
.part-return .part-return-content span{
    color: #000;
}
.part-return .part-return-content i{
    color: #f00;
}
.ad{
    padding: 10px 15px 0px 15px;
    text-align: center;
}
.ad img{
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
}
</style>
