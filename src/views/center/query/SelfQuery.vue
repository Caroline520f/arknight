<template>
  <div class="basMsg">
    <div style="height: 8%;"></div>
    <div class="query">
      <section style="padding: 0.6vw;">
        <img :src="userInfo.titleImg" alt="">
        <span>{{ userInfo.title }}</span>
        <section>
          <span style="color: #158FC5;font-size: 0.8rem;">UID:</span>
          <span>{{ UID }}</span>
        </section>
      </section>
      <section style=" margin-top: 2vh;" class="record">
        <section v-for="(a, b) in userInfo.items" :key="b" class="record" :style="{
          backgroundImage: 'url(' + a.titleImg + ')',
        }">
          <span>{{ a.title }}</span>
        </section>
      </section>
    </div>
    <div>
      <button @click="jump"> 
        test
      </button>
    </div>
  </div>
</template>

<script>
import queryy from '@/public/query/qqeury.scss'
import basMsga from '@/public/baseMsg/baseMsg.scss'
import { getQuery } from '@/api/arknights/query/query'
import {  toRefs } from 'vue'
// import router from '@/router'
export default {
  name: "SelfQuery",
  setup() {
    let UID = JSON.parse(localStorage.getItem('users')).UID
    function jump(){
      // Diamond
      //   Gacha
      //   Orderx`
    }
    return {
      basMsga, queryy,
      ...toRefs(getQuery()),
      UID,
      jump
    }
  }
}
</script>

<style lang="scss" scoped></style>
