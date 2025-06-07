import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from './request/request'
import FastClick from 'fastclick'
import MintUI from 'mint-ui'
import VueAMap from 'vue-amap'
import 'mint-ui/lib/style.css'
import { Message,MessageBox} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import messageBox from './assets/messageBox'
Vue.use(MintUI)
Vue.use(VueAMap)
Vue.use(messageBox)
VueAMap.initAMapApiLoader({
  key:'e8e89fb37e4ce93983eae9786c402190',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation'],
  uiVersion: '1.0.11' // 版本号
})
FastClick.attach(document.body)
Vue.prototype.$request=request
Vue.config.productionTip = false
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
