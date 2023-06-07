import { createRouter, createWebHashHistory } from 'vue-router'
import { dealRoutes } from '@/hooks/route'

const routes = [
  {
    path: '/center',
    name: 'centerPage',
    component: () => import('@/views/centerPage.vue'),
    children: [
      {
        path: 'user/login',
        name: 'loginPage',
        component: () => import('@/views/login/loginPage.vue'),
        meta: {
          lists: '1fr 8.5fr 1fr',
          height: '100vh'
        }
      },
      {
        path: 'buffer',
        name: 'bufferPage',
        component: () => import('@/views/buffer/theBuffer.vue')
      },
      {
        path: '/center/changeUserinfo',
        name: 'changeUserinfoPage',
        component: () => import('@/views/center/changeUserinfo/changeUserinfoPage.vue')
      },
      {
        path: '/test',
        name: 'testPage',
        component: () => import('@/views/echarts/testPage.vue')
      },

    ]
  },
  {
    path: "/database",
    name: "databasePage",
    component: () => import("@/views/database/databasePage")
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const accessList = ['/center', '/center/user/login']
router.beforeEach((to, from, next) => {
  if (accessList.includes(to.path)) {
    next();
  } else {
    if (JSON.parse(localStorage.getItem('token'))) {
      let token = JSON.parse(localStorage.getItem('token')).token;
      if (token) {
        if (to.matched[0]) {
          next();
        } else {
          let PATH = to.path.split("/")[1]

          let routeData = JSON.parse(sessionStorage.getItem(PATH == "center" ? "menus" : "database"))
          let a = Reflect.get(routeData, PATH == "center" ? "routes" : "databaseRoutes")
          a = dealRoutes(a, a.length - 1);
          a.forEach(item => {
            router.addRoute(PATH == "center"? "centerPage" : "databasePage", item)
          });
          next({ ...to, replace: true })
        }
      }
    } else {
      next({ path: '/center/user/login' })
    }
  }
});

export default router
