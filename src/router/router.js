// 导入Vue
import Vue from 'vue'

// 路由相关
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入组件
const index = () => import('../views/index.vue')
const login = () => import('../views/login.vue')
const users = () => import('../views/users.vue')
const roles = () => import('../views/roles.vue')
const params = () => import('../views/params.vue')
const rights = () => import('../views/rights.vue')
const dataAll = () => import('../views/dataAll.vue')
const orders = () => import('../views/orders.vue')
const nofound = () => import('../views/nofound.vue')
const goods = () => import('../views/goods/goods.vue')
const goodsIndex = () => import('../views/goods/components/goodsIndex.vue')
const goodsAdd = () => import('../views/goods/components/goodsAdd.vue')
const userTable = () => import('../views/goods/components/userTable.vue')
const goodsLIst = () => import('../views/goods/components/goodsLIst.vue')



// 规则
const routes = [
  {
    path: '/login',
    component: login
  },
  {
    path: '/',
    redirect: '/login'
  },
  //index url
  {
    path: '/index',
    component: index,

    children: [
      {
        path: 'users',
        component: users,
        // beforeEnter: (to, from, next) => {
        //   if(from.name !== 'roles'){
        //     to.meta.keepAlive = true
        //   }
        // },
        name: users,
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'roles',
        component: roles,
        name: 'roles',
        // meta: {
        //   keepAlive: true
        // }
      },
      {
        path: 'params',
        component: params,
        name: 'params',
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'rights',
        component: rights,
        name: 'rights',
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'orders',
        component: orders,
        name: 'orders',
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'reports',
        component: dataAll,
        name: 'dataAll',
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'goods',
        component: goods,
        name: 'goods',
        meta: {
          keepAlive: true
        },
        children: [
          
          {
            path: '',
            component: goodsIndex,
            name: 'goodsIndex',
            meta: {
              keepAlive: true
            },
          },
          {
            path: 'goodsAdd',
            component: goodsAdd,
            name: 'goodsAdd',
            meta: {
              keepAlive: true
            },
          },
          {
            path:'userTable',
            component:userTable,
            name:'userTable'
          },
          {
            path:'goodsLIst/:number',
            component:goodsLIst,
            name:'goodsLIst',
            // meta:{
            //   keepAlive:true
            // }
          }
        ]
      },

    ],
    // 添加元信息（盖章）
    meta: {
      // 需要验证
      needCheck: true,
      // 是否需要登录
      needLogin: true
    }
  },

  {
    path: '/nofound',
    component: nofound
  },

  {
    path: '*',
    redirect: '/nofound'
  }

]



// 创建路由
const router = new VueRouter({
  routes
})

// 全局前置守卫（回调函数）
router.beforeEach((to, from, next) => {
  // console.log(to)
  // 根据地址判断
  // if (to.path.indexOf('/index') == 0) {
  // 使用元信息判断
  // if (to.meta.needLogin == true) {
  if (to.meta.needCheck == true) {
    // 去首页 判断登录
    // token
    if (window.localStorage.getItem('token') != undefined) {
      
      // 存在走你
      next()
    } else {
      // new一个实例出来
      new Vue().$message.error('滚犊子！！！')
      // 不存在
      router.push('/login')
    }
  } else {
    // 放过去
    next()
  }
})

// 暴露出去
export default router
