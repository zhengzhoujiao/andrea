import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

    const routes = [
        {
            meta:{
                title:'登录',
                myFrom:'/index'
            },
            path: '/',
            name: 'Login',
            component: Login,
            beforeEnter:((to,from,next)=>{
                to.meta.myFrom=from
                next()
            })
        },{
            meta:{
                title:'主页'
            },
            path: '/Index',
            name: 'Index',
            component:()=>import('../views/Index.vue')
        },{
            meta:{
                title:'分类'
            },
            path:'/Menu',
            component:()=>import('../views/Menu.vue')
        },{
            meta:{
                title:'注册'
            },
            path:'/Reg',
            component:()=>import('../views/Reg.vue')
        },{
            meta:{
                title:'商品详情'
            },
            path:'/Details',
            component:()=>import('../views/Details.vue')
        },{
            meta:{
                title:'购物车'
            },
            path:'/Car',
            component:()=>import('../views/Car.vue')
        },{
            meta:{
                title:'支付页'
            },
            path:'/Pay',
            component:()=>import('../views/Pay.vue')
        },{
            meta:{
                title:'地址管理'
            },
            path:'/Adress',
            component:()=>import('../views/Adress.vue')
        },{
            meta:{
                title:'订单'
            },
            path:'/Order',
            component:()=>import('../views/Order.vue')
        },{
            meta:{
                title:'选择门店'
            },
            path:'/Map',
            component:()=>import('../views/Map.vue')
        },{
            meta:{
                title:"添加地址"
            },
            path:'/AddAdress',
            component:()=>import('../views/AddAdress.vue')
        },
        {
            meta:{
                title:"支付成功"
            },
            path:'/PaySuccess',
            component:()=>import('../views/PaySuccess.vue')
        }
    ]
const router = new VueRouter({
    routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
    // to 将要访问的路径
    // from 代表从哪个路径跳转而来
    // next 是一个函数，表示放行
    //     next()  放行    next('/login')  强制跳转
    document.title=to.meta.title
    // if (to.path === '/') return next()
    // // 获取token
    // const tokenStr = window.sessionStorage.getItem('token')
    // if (!tokenStr) return next('/')
    next()
  })
  

export default router