import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 饿了么ui相关
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)


let buttenpremissions = ["a", "b", "c", "d", "e", "f"]; //模拟的后台给的按钮权限数据
/* 我们需要对btnPermissionArr进行全局存储，我这里使用的localStorage;*/
if (!window.localStorage) {
  alert("浏览器不支持localstorage");
} else {
  /* 因为localStorage不可以直接存数组，这里的JSON.stringify(btnPermissionArr)转成字符串*/

  window.localStorage.setItem(
    "buttenpremissions",
    JSON.stringify(buttenpremissions)
  );
}

// //全局的自定义指令
// Vue.directive('has', {
//   inserted: function (el, binding) {
//     if (!Vue.prototype.$_has(binding.value)) {
//       console.log(el)
//       console.log(el.parentNode)
//       console.log(el.previousElementSibling)
//       el.parentNode.removeChild(el);
//     }
//   }
// });

// Vue.prototype.$_has = function (value) {
//   // debugger
//   let isExist = false;
//   let buttonpermsStr = localStorage.getItem("buttenpremissions");
//   if (buttonpermsStr == undefined || buttonpermsStr == null) {
//     return false;
//   }
//   let buttonperms = JSON.parse(buttonpermsStr);
//   for (let i = 0; i < buttonperms.length; i++) {
//     if (buttonperms[i].indexOf(value) > -1) {
//       isExist = true;
//       break;
//     }
//   }
//   return isExist;
// };


// 全局导入样式
import './assets/base.scss'

// 导入 router
import router from './router/router'

//store
import store from './store/index'

Vue.prototype.hasPerm = function(value){
  const myPerms = store.state.perms
  console.log(myPerms)
  return myPerms.indexOf(value)
}

new Vue({
  render: h => h(App),
  // 挂载到Vue实例
  store,
  router
}).$mount('#app')
