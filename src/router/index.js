import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('../components/Login')
const Home =() => import('../components/Home')

Vue.use(VueRouter)

// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

const routes = [
  {path: '/', redirect: '/login'},
  {path: '/login', component: Login},
  {path: '/home', component: Home},
]

const router = new VueRouter({
  routes
})


// 路由导航守卫控制导航权限
// 如果用户没有登录而是通过特定的URL地址访问特定的页面那么就导航它到登录页
// 为路由对象添加beforeEach导航守卫
// beforeEach((to,from,next) => {})
// to将要访问的路径 from为从哪个路径跳转而来 next是个函数表示要跳到哪个页面 如next()为放行 next('/login')为强制跳转到login页面

router.beforeEach((to, from, next) => {
  // 如果用户访问的是登录页则直接放行
  if (to.path === '/login') return next()
  // 从sessionStorage中获取保存的tooken值
  const tokenStr = window.sessionStorage.getItem('token');
  // 没有token,即token为空则强制跳转到登录页
  if (!tokenStr) return next('/login')
  next()
})


export default router
