<template>
    <div class="loginBoard" :style="allBtns.isSwitch ? anima : anima2
        ">
        <section class="title">{{ allBtns.isSwitch ? "注册" : "登录" }}</section>
        <!-- username -- password -->
        <div class="userLogin">
            <div v-for="(item, index) in userArr" :key="index">
                <section class="inputs">
                    <input v-model="item.value" :type="item.type" :placeholder="item.placeHolder" :style='{
                        backgroundColor: item.isShow ? "#FFDCDB" : "rgba(255,255,255,0)",
                    }'>
                    <button v-if="item.isRender" @click="getMathCode(allBtns, 'isRegistera')"
                        :disabled="allBtns.isSwitch ? countingList.includes('isRegister') : countingList.includes('isLogin')">
                        {{ allBtns.isSwitch ? countingList.includes('isRegister') ? regCD +
                            "S" : "获取验证码" : countingList.includes('isLogin') ? logCD + "S" : "获取验证码"
                        }}
                    </button>
                </section>
                <section :style='{
                            visibility: item.isShow ? "visible" : "hidden"
                        }'>{{ item.value == "" ? item.tip01 : item.tip02 }}</section>
            </div>

        </div>
        <!-- buttons -->
        <div class="btns">
            <section @click="telCode(allBtns, userArr, registerEle[1])">
                <input type="checkbox" v-if="allBtns.isSwitch" :checked="allBtns.isChecked"
                    @click="allBtns.isChecked = !allBtns.isChecked">
                <span :style="{ color: allBtns.isSwitch ? '#000' : '#158FC5' }">{{ allBtns.isSwitch ? '已阅读并同意' : '使用短信验证码登录'
                }}</span>
                <span v-if="allBtns.isSwitch">《鹰角网络用户注册协议》</span>
                <span v-if="allBtns.isSwitch" :style="{ color: allBtns.isSwitch ? '#000' : '' }">及</span>
                <span v-if="allBtns.isSwitch">《鹰角网络游戏个人信息保护政策》</span>
            </section>
            <section>
                <button @click="regOrlog">{{ allBtns.isSwitch ? '注册' : '登录' }}</button>
            </section>
            <section class="bilibili" v-if="!allBtns.isSwitch">使用Bilibili帐号</section>
        </div>

    </div>
    <div>
        <!-- switch the login div -->
        <section class="change">
            <span @click="theBoard(allBtns, false, userArr.length > 2, userArr)" :style="{
                color: allBtns.isSwitch ? '' : '#158FC5',
                fontSize: allBtns.isSwitch ? '' : '1.25rem'
            }">登录</span>
            <span>·</span>
            <span @click="theBoard(allBtns, true, userArr.length < 4, userArr, registerEle)" :style="{
                color: !allBtns.isSwitch ? '' : '#158FC5',
                fontSize: !allBtns.isSwitch ? '' : '1.25rem'
            }">注册</span>
        </section>

        <theDialog>
            <div class="mathCode" @click.stop>
                <section>
                    <input type="text" v-model="getCode.mathCode">
                    <span v-html="svg.codes" @click="switchMathCode"></span>
                </section>
                <section>
                    <button @click="confrim(allBtns.isSwitch ? 'isRegister' : 'isLogin')">确定</button>
                    <button @click="cancel">取消</button>
                </section>
            </div>
        </theDialog>
        <router-view />
    </div>
    <showMsg v-if="allBtns.toast"></showMsg>
</template>

<script>
import { reactive, toRefs, provide } from 'vue';
import loginCss from '@/public/login/loginStyle.scss';
import { watcher } from '@/hooks/loginCenter/watcher';
import { telCode, setCountDown, switchMathCode, getMathCode } from '@/hooks/loginCenter/code';
import { createNamespacedHelpers } from 'vuex';
import svg from '@/hooks/loginCenter/code';
import { userAccess } from '@/hooks/loginCenter/user';
import { theBoard } from '@/hooks/loginCenter/theBoard';
import allBtns from '@/hooks/theBottons'
export default {
    name: "loginPage",
    setup() {
        let userArr = reactive([{
            value: '',
            isShow: false,
            type: 'tel',
            placeHolder: '请输入手机号',
            tip01: "*手机号码不能为空",
            tip02: "*手机号码格式不正确",
            zz: /^1{1}[3-9]{1}\d{9}$/,
            use: "手机号"
        },
        {
            value: "",
            isShow: false,
            type: "password",
            placeHolder: "请输入密码",
            tip01: "*密码不能为空",
            tip02: "*密码格式不正确",
            zz: /^\w{8,16}$/,
            use: "密码"
        }]
        )
        // btn control

        let codeObj = {
            value: "",
            isShow: false,
            type: "text",
            placeHolder: "输入验证码",
            tip01: "*验证码不能为空",
            tip02: "*验证码格式不正确",
            zz: /^\d{4}$/,
            isRender: true,
            use: "验证码"
        }
        let registerEle = [
            {
                value: "",
                isShow: false,
                type: "password",
                placeHolder: "确认密码",
                tip01: "*两次输入的密码不一致",
                tip02: "*两次输入的密码不一致",
                use: "确认密码",
                zz: /^\w{8,16}$/,

            },
            codeObj
        ]

        // the dialog switch
        watcher(userArr)
        const cancel = () => {
            allBtns.isDialog.isRegistera = false
            // console.log(allBtns)
        }

        let { confrim, CD, getCode } = setCountDown(allBtns, userArr, 'isRegistera')
        provide('allBtns', 'isRegistera')


        function regOrlog() {
            // console.log(111);
            const { mapMutations } = createNamespacedHelpers('saved');

            // console.log(allBtns.isSwitch)
            allBtns.isSwitch ? userAccess(userArr, allBtns, 'register', 'CHANGE_USER_MSG', mapMutations) :
                userAccess(userArr, allBtns, 'login', 'CHANGE_TOKEN', mapMutations)


        }

        return {
            loginCss,
            allBtns,
            anima: {
                height: '55vh',
                transform: 'rotateY(360deg)',
                transition: 'all 0.5s ease',
                // animation: 'rotateaa 1s 0s ease forwards 1',
            },
            // 动画false
            anima2: {
                height: '40vh',
                transform: 'rotateY(0deg)',
                transition: 'all 0.5s ease',
                // animation: 'rotateaa 1s 0s ease forwards 1',
            },
            userArr,
            getCode,
            cancel,
            registerEle,
            telCode,//验证码
            regOrlog,//注册登录
            ...toRefs(CD),
            confrim,
            switchMathCode,
            getMathCode,
            svg,
            theBoard
        }
    }
}
</script>

<style lang="scss" scoped></style>