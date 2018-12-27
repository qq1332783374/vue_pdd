// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// vuex
import store from './store/index'
// tab切换插件
import LyTab from 'ly-tab'
Vue.use(LyTab)
// mini-ui
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)

// 弹出框
import { Popup } from 'mint-ui'
Vue.component(Popup.name, Popup)
// vant
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

import { Dialog } from 'vant';

Vue.use(Dialog)

import { Tab, Tabs } from 'vant';

Vue.use(Tab).use(Tabs)

Vue.config.productionTip = false

function addZero(val) {
  if (val < 10) {
      return "0" + val;
  } else {
      return val;
  }
};
Vue.filter("formatTime", function (value, type) {
  var dataTime = "";
  var data = new Date();
  data.setTime(value);
  var year = data.getFullYear();
  var month = addZero(data.getMonth() + 1);
  var day = addZero(data.getDate());
  var hour = addZero(data.getHours());
  var minute = addZero(data.getMinutes());
  var second = addZero(data.getSeconds());
  if (type == "YMD") {
      dataTime = year + "-" + month + "-" + day;
  } else if (type == "YMDHMS") {
      dataTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
  } else if (type == "HMS") {
      dataTime = hour + ":" + minute + ":" + second;
  } else if (type == "YM") {
      dataTime = year + "-" + month;

  }
  return dataTime; //将格式化后的字符串输出到前端显示
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
