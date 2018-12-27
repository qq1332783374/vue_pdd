<template>
    <div class="orderSearchPanel">
        <div class="panel-nav">
            <div class="panel-input">
                <img src="../imgages/search.png" alt="" width="30">
                <input type="search" placeholder="订单" ref="mySearch">
            </div>
            <button @click="showSearchPanel(false)">取消</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'orderSearchPanel',
    props: {
        showSearchPanel:Function
    }
}
</script>

<style scoped>
.orderSearchPanel {
    width: 100%;
    height: 100%;
    z-index: 9999;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
}
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
    border-bottom: 1px solid #ddd;
}
.panel-nav .panel-input{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 85%;
    height: 38px;
    border-radius: 5px;
    background: #ededed;
    padding: 3px;
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
</style>
