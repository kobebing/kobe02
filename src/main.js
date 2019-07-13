import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 饿了么ui相关
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)


// 全局导入样式
import './assets/base.scss'

// 路由相关
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入组件
import index from './components/index.vue'
import login from './components/login.vue'
// 规则
const routes = [
  {
    path:'/login',
    component:login
  },
  {
    path:'/index',
    component:index
  }
]

// 创建路由
const router = new VueRouter({
  routes
})
new Vue({
  render: h => h(App),
  // 挂载到Vue实例
  router
}).$mount('#app')
