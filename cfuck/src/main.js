// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import 'assets/custom-theme/index.css'; // 换肤版本element-ui css https://github.com/PanJiaChen/custom-element-theme
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式
import 'components/Icon-svg/index'; // 封装的svg组件
import 'normalize.css/normalize.css';// normalize.css 样式格式化
import 'styles/index.scss'; // 全局自定义的css样式
import 'assets/iconfont/iconfont'; // iconfont 具体图标见https://github.com/PanJiaChen/vue-element-admin/wiki
import * as filters from './filters'; // 全局vue filter
import './mock/index.js';  // 该项目所有请求使用mockjs模拟
import 'vendor/particles.js'

Vue.use(ElementUI);

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});


// 注册全局进度条
const whiteList = ['/login', '/authredirect', '/reset', '/sendpwd'];// 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start(); // 开启Progress
  console.log(store);
  if (store.getters.token) { // 判断是否有token
    next();
    console.log(1);
  } else {
    console.log(2);
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login');
      NProgress.done();
    }
  }
});


router.afterEach(() => {
  NProgress.done(); // 结束Progress
});


// 生产环境错误日志
if (process.env === 'production') {
  Vue.config.errorHandler = function(err, vm) {
    console.log(err, window.location.href);
    errLog.pushLog({
      err,
      url: window.location.href,
      vm
    })
  };
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');


