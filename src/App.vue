<template>
  <div id="app">
    <router-view/>
    <bottom-bar v-show="$route.meta.showBottomTabBar"></bottom-bar>
  </div>
</template>

<script>
import bottomBar from 'components/common/bottomBar'
export default {
  name: 'App',
  components: {
    bottomBar
  }
}
</script>

<style>
ul{
  padding: 0;
  margin: 0;
}
ul li{
  list-style: none;
}
body,html{
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: #666;
  touch-action: none;
}
#app{
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  position: relative;
  overflow-y: scroll;
}
</style>
