<template>
  <!-- <h1>who am <i></i></h1> -->
  <div class="baseMsg">
    <div style="height: 8%;"></div>
    <div class="mainDiva">
      <div v-for="(a, b) in userinfo.items" :key="b" class="wait">
        <section>
          <img :src="a.titleImg" alt="" />
          <span>{{ a.title }}</span>
        </section>
        <section>
          <input v-if="b == 0" type="text" id="gifs" placeholder="- A R K N I G H T S -" v-model="context">
          <span v-if="b == 1" class="tips">*仅显示最近10条礼包兑换记录</span>
        </section>
        <section>
          <button v-if="b==0" @click="getGift">确认兑换</button>
          <table v-if="b==1" :style='{
            width:"100%",
          }'>
            <tr>
              <td>兑换时间</td>
              <td>礼包</td>
              <td>使用兑换码</td>
            </tr>
            <tr >
              <td>{{ }}</td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import basMsg from '@/public/baseMsg/baseMsg.scss'
import gift from '@/public/gifs/exchangeCode.scss'
import { getGifts, getContext } from '@/api/arknights/gifts/exchange';
import { ref, toRefs } from 'vue';
// import saved from '@/store/modules/saved';
export default {
  name: "ExchangeGift",
  setup() {
    let context = ref("")
    function getGift() {
      getContext({ context: context.value })
      // console.log(saved.state.contexts)
    }
    
    return {
      basMsg,
      ...toRefs(getGifts()),
      gift,
      getGift,
      context
    }
  }
}
</script>

<style lang="scss" scoped></style>
