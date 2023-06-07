<template>
  <div class="baseMsg">
    <div class="mainDiv" style="display:block">
      <div class="theMAIN">
        <section>
          <img src="" alt="failed to load">
          <span>{{ baseMsga[a].inputs[b].inputTitle }}</span>
        </section>
        <section v-for="(item, index) in userInfo" :key="index">
          <p> {{ item.title }}</p>
          <p>
            <input v-model="item.value" :type="item.type" :style="{
              width:
                baseMsga[a].inputs[b].inputTitle == '绑定手机' ? index != 0 ? '65%' : '100%' : index == 1 ? '65%' : '100%',
              backgroundColor: item.isShow ? '#fff' : '#f5f5f5',
            }">
            <button v-if="index == 1" :disabled="countingList.includes('isOldPhone')"
              @click='getMathCode(allBtns, "changePage", "changePhone", index)'>{{
                countingList.includes('isOldPhone') ? oldPhoneCD + 's' : '获取验证码' }}</button>
            <button v-if="index == 2 && baseMsga[a].inputs[b].inputTitle == '绑定手机'"
              :disabled="countingList.includes('isNewPhone')"
              @click="getMathCode(allBtns, 'changePage', 'changePhone', index)">{{ countingList.includes('isNewPhone') ?
                newPhoneCD + 's' : '获取验证码' }}</button>
          </p>
          <section :style="{
            visibility: item.isShow ? 'visible' : 'hidden',
            padding: '0',
          }">
            {{ item.value == '' ? item.tips1 : item.tips2 }}
          </section>
        </section>
        <section class="conChange" @click="changeMsg(route.query.name)">
          确认更改
        </section>
      </div>
    </div>
  </div>
  <theDialog>
    <div class="mathCode" @click.stop>
      <section>
        <input type="text" v-model="getCode.mathCode">
        <span v-html="svg.codes" @click="switchMathCode"></span>
      </section>
      <section>
        <button @click="confrim(allBtns.changePhone ? 'isNewPhone' : 'isOldPhone')">确定</button>
        <button @click="cancel">取消</button>
      </section>
    </div>
  </theDialog>
</template>

<script>
import baseMsg from '@/public/baseMsg/baseMsg.scss'
import { reactive, toRefs, provide } from 'vue';
import { useRoute } from "vue-router"
import { watcher } from '@/hooks/loginCenter/watcher';
import { setCountDown, switchMathCode, getMathCode } from '@/hooks/loginCenter/code';
import allBtns from '@/hooks/theBottons';
import svg from '@/hooks/loginCenter/code';
import router from '@/router';
import { setMsg } from '@/api/arknights/baseMsg/getInfo'
import url from '@/api/url';

export default {
  name: "changeUserinfoPage",
  setup() {
    const route = useRoute()
    let [a, b] = route.query.position
    let baseMsga = JSON.parse(sessionStorage.getItem("baseMsg")).baseMsg
    let userInfo = reactive([
      {
        title: `验证当前手机号(${reactive(JSON.parse(localStorage.getItem("token"))).telephone})`,
        value: '',
        isShow: false,
        type: 'tel',
        placeHolder: '请输入手机号',
        tips1: '*手机号不能为空',
        tips2: '*手机号格式不正确',
        zz: /^1{1}[3-9]{1}\d{9}&/,
        use: '手机号'
      },
      {
        title: '',
        value: '',
        isShow: false,
        type: 'text',
        placeHolder: '输入验证码',
        tips1: '*验证码不能为空',
        tips2: '*验证码格式不正确',
        zz: /^\d{4}$/,
        use: '旧手机验证码'
      },
      {
        title: '',
        value: '',
        isShow: false,
        type: 'text',
        placeHolder: `输入${baseMsga[a].inputs[b].inputTitle}`,
        tips1: `*${baseMsga[a].inputs[b].inputTitle}不能为空`,
        tips2: `*${baseMsga[a].inputs[b].inputTitle}格式不正确`,
        zz: baseMsga[a].inputs[b].inputTitle == '绑定手机' ? /^1{1}[3-9]{1}\d{9}$/ : baseMsga[a].inputs[b].inputTitle == '绑定邮箱' ? /^\w+@[a-z0-9]+\.[a-z]{2,4}$/ : /^.{6,16}$/,
        use: `${baseMsga[a].inputs[b].inputTitle}`
      }
    ]
    )
    watcher(userInfo)
    userInfo[2].title = '修改' + baseMsga[a].inputs[b].inputTitle
    let { confrim, CD, getCode } = setCountDown(allBtns, userInfo, 'changePage')
    const cancel = () => { allBtns.isDialog.changePage = false }
    provide('allBtns', 'changePage')

    function changeMsg(n) {
      let obj = reactive({
        oldTelephone: userInfo[0].value,
        userId: JSON.parse(localStorage.getItem("users")).userId,
        code: userInfo[1].value,
      })
      console.log('isNewPhone?', n)
      Reflect.set(obj, n, userInfo[2].value)
      setMsg(url.centerPage.baseMsg.getBaseMsg.replace('userBasic',n), obj)
      router.push({
        name: 'BaseMessage',
        params: {
          userId: JSON.parse(localStorage.getItem('users')).userId
        }
      })
      // console.log(JSON.parse(localStorage.getItem("users")).userId)
    }  //修改信息
    return {
      baseMsg,
      userInfo,
      baseMsga: JSON.parse(sessionStorage.getItem("baseMsg")).baseMsg,
      a, b, //传递过来的下表
      confrim, getCode, ...toRefs(CD),
      switchMathCode,
      getMathCode,
      allBtns,
      cancel,
      svg,
      changeMsg,
      route
    }
  }
}
</script>

<style lang="scss" scoped></style>

