<template>
    <div class="searchNav">
        <a href="" class="search-nav-icon" @click.prevent="showSearchPanel(true)">
            <img src="../imgages/search.png" alt="" width="25">
            <span>拼多多</span>
        </a>
    </div>
</template>

<script>
export default {
    name: 'searchNav',
    props: {
        showSearchPanel:Function
    }
}
</script>

<style scoped>
.searchNav {
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #ddd;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    z-index: 998;
}
.search-nav-icon {
    width: 90%;
    height: 70%;
    background: #e8e8e8;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: #666;
}
.search-nav-icon span{
    font-size: 16px;
}
</style>
