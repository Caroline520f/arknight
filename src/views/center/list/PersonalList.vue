<template>
  <div class="baseMsg">
    <div class="what">
      <section v-for="(a, b) in obj" :key="b" :style="{
        borderBottom: b > 2 ? 'none' : '1px solid #ccc',
      }">
        <span>{{ a.title }}</span>
        <span @click="checkListiNFO(b)">{{ a.btn }}</span>
      </section>
    </div>
  </div>
</template>

<script>
import basMsg from '@/public/baseMsg/baseMsg.scss'
import list from '@/public/list/thelist.scss'

import { reactive } from 'vue'
import router from '@/router'
export default {
  name: "PersonalList",
  setup() {
    let obj = [
      {
        title: '个人基本信息',
        btn: '查看',
        route: 'Basic'
      },
      {
        title: '实名信息',
        btn: '查看',
        route: 'Realname'

      },
      {
        title: '用户行为信息',
        btn: '查看',
        route: 'Behavior'

      },
      {
        title: '设备属性及定位信息',
        btn: '查看',
        route: 'Device'
      }
    ]
    // const route = useRouter()
    const routes = reactive([])
    // 路由处理
    obj.forEach(item => {
      routes.push({
        path: '/center/list/info' + item.route,
        name: 'info' + item.route,
        component: () => import('@/views/center/list/info' + item.route + '.vue')
      })
    })
    routes.forEach(item => {
      router.addRoute('centerPage', item)
    })
    console.log(routes)

    function checkListiNFO(index) {
      switch (index) {
        case 0:
          router.push({
            name: 'infoBasic',
          })
          break;
        case 1:
          router.push({
            name: 'infoRealname'
          })
          break;
        case 2:
          router.push({
            name: 'infoBehavior'
          })
          break;
        case 3:
          router.push({
            name: 'infoDevice'
          })
          break;
      }
    }
    return {
      obj,
      basMsg, list,
      checkListiNFO
    }
  }
}
</script>

<style lang="scss" scoped></style>
