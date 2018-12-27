<template>
    <div class="searchPanel">
        <div class="panel-nav">
            <div class="panel-input">
                <img src="../imgages/search.png" alt="" width="30">
                <input type="search" placeholder="东北花棉裤" ref="mySearch">
            </div>
            <button @click="showSearchPanel(false)">取消</button>
        </div>
        <div class="panel-hot-search">
            <div class="title">
                <img src="../imgages/hot.png" alt="" width="30">
                热门搜索
            </div>
            <ul class="hot-search-content">
                <li>
                    香瓜子批发
                </li>
                 <li>
                    纸巾抽纸
                </li>
                 <li>
                    阔腿裤冬
                </li>
                 <li>
                    麻辣烫
                </li>
                 <li>
                    儿童袜子男
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'searchPanel',
    props: {
        showSearchPanel:Function
    },
   mounted() {
       this.$refs.mySearch.focus()
   }
}
</script>

<style scoped>
.searchPanel{
    z-index: 9999;
    background: #fff;
    position: relative;
    height: 100%;
    width: 100%;
}
.title{
    display: flex;
    align-items: center;
}
.panel-nav{
    width: 100%;
    height: 60px;
    position: relative;
    border: none;
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.panel-nav .panel-input{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 85%;
    height: 38px;
    border-radius: 5px;
    background: #ededed;
}
.panel-nav .panel-input input{
    background: transparent;
    width: 90%;
    height: 90%;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 16px;
    box-sizing: border-box;
    padding-left: 10px;
}
.panel-nav button{
    background: transparent;
    border: none;
    color: #666;
    font-size: 16px;
}
.panel-hot-search{
    border-top: 1px solid #ddd;
    padding: 30px 15px;
}
.panel-hot-search title{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.hot-search-content {
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
}
.hot-search-content li{
    background-color: #ededed;
    color: #aaa;
    margin: 5px 15px;
    padding: 5px 5px;
    border-radius: 10px;
}
</style>
