import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './api/mock.js'
import api from './api/api'
import Cookie from 'js-cookies'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// icon的按需引引入
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.config.globalProperties.$api = api;
//注意,这里是处理动态路由
store.commit("addMenu", router);
function checkRouter(path) {
  let hasCheck = router.getRoutes().filter(item => item.path == path).length;
  if (hasCheck) {
    return true;
  } else {
    return false;
  }

}
router.beforeEach((to, from, next) => {
  const token = Cookie.getItem("token");
  if (!token && to.name !== 'login') { // 如果没有token并且当前页不是login登陆页,进入登陆面页
    next({ name: 'login' });
  } else if (token && to.name == "login") {   //如果用户已经登陆,就直接进入首页
    next({ name: 'home' });
  } else if (!checkRouter(to.path)) {
    next({name: 'home'});
  } else {
    next();
  }
})
app.use(router).use(store);

app.mount('#app')
