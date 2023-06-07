<template>
  <div class="baseMsg">
    <div class="mainDiv" style="display: block;">
      <div style="
        position: relative;
    top: 9vh;
    height: 50vh;
    padding: 2vw;">
          <section>
            <img src="" alt="">
            <span>重置密码</span>
          </section>
          <section v-for="(a,b) in info" :key="b" class="pwdS">
            <p>{{ a.title }}</p>
            <p style="display:flex">
              <input v-model="a.value" :type="a.type" :style='{
                width: index == 2 ? "65%" : "100%",
              backgroundColor: a.isShow ? "#FFDCDB" : "rgba(255,255,255,0)",
              }'>
        <button v-if="b == 2" @click="getCodea">获取验证码</button>
        </p>
        <section :style='{
            visibility: a.isShow ? "visible" : "hidden",
            padding: "0"
          }'>{{ a.value == "" ? a.tip01 : a.tip02 }}</section>
        </section>
        <section style="
        background-color: #158FC5;
        cursor: pointer;
        color: #fff;
        font-size: 1rem;
        font-weight: bold;
        border-radius: 4vw;
        width: 100%;
        height: 4.55vh;
        text-align: center;
        line-height: 4.55vh;        
        " @click="changePwd">确认更改</section>
      </div>
    </div>
  </div>
</template>

<script>
import basMsg from '@/public/baseMsg/baseMsg.scss'
import { watcher } from '@/hooks/loginCenter/watcher';
import { reactive } from 'vue';
import { pwdCode, resetPwd } from '@/api/arknights/resetPwd/resetPwd'


export default {
  name: "ResetPassword",
  setup() {
    let info = reactive([{
      title: "新密码",
      value: "",
      isShow: false,
      type: "password",
      placeHolder: "请输入新密码",
      tip01: "*密码不能为空",
      tip02: "*密码格式不正确",
      zz: /^\w{8,16}$/,
      use: "新密码"
    },
    {
      title: "旧密码",
      value: "",
      isShow: false,
      type: "password",
      placeHolder: "请输入旧密码",
      tip01: "*旧密码不能为空",
      tip02: "*旧密码格式不正确",
      zz: /^\w{8,16}$/,
      use: "旧密码"
    },
    {
      title: "验证码",
      value: "",
      isShow: false,
      type: "text",
      placeHolder: "输入验证码",
      tip01: "*验证码不能为空",
      tip02: "*验证码格式不正确",
      zz: /^\d{4}$/,
      use: "旧手机验证码"
    }
    ])
    watcher(info)

    function changePwd() {
      let obj = reactive({})
      let arr = ["newPassword", "oldPassword", "code"]
      arr.forEach((item, index) => {
        obj[item] = info[index].value
      })
      resetPwd({
        ...obj,
        userId: JSON.parse(localStorage.getItem("users")).userId
      })
    }

    function getCodea() {
      pwdCode({
        telephone: JSON.parse(localStorage.getItem("users")).telephone,
        userId: JSON.parse(localStorage.getItem("users")).userId
      })
    }
    return {
      changePwd,
      getCodea,
      basMsg,
      info
    }
  }
}
</script>

<style lang="scss" scoped></style>
