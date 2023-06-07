import { watcher } from "./watcher";
import { getCode } from "@/api/arknights/mathCode/code";
import { ref, reactive } from "vue";
import { usersInfo } from "@/api/arknights/index/center";
import url from '@/api/url';
import store from "@/store/index.js";
import { toast } from "../Toast";
// import allBtns from "../theBottons";

// 验证码登录
export function telCode(obj, arr, target) {
    let pwdObj = {
        value: null,
        isShow: false,
        type: 'password',
        placeHolder: "请输入密码",
        tip01: "*密码不能为空",
        tip02: "*密码格式不正确",
        zz: /^\w{8,16}$/,
    };
    obj.isCode = !obj.isCode;

    if (!obj.isSwitch) {
        obj.isCode ? arr.splice(1, 1, target) : arr.splice(1, 1, pwdObj)
    }
    watcher(arr);
}
// 图形验证码
let svg = ref("");

export function getMathCode(obj, target, target2, index) {
    obj.isDialog[target] = true;
    if (index) {
        index == 2 && index != 0 ?
            obj[target2] = true :
            index == 1 && index != 0 ?
                obj[target2] = false : ""
    }
    // console.log('theTarget', target, 'theTarget2', target2, 'theIndex', index)
    console.log(obj.isDialog[target])
    svg.value = getCode();
}

// switch the code
export function switchMathCode() {
    svg.value = getCode();
}

// counting down

export function setCountDown(obj, arr, who) {
    let CD = reactive({
        // 注册的倒计时数字
        regCD: store.state.countDown,
        logCD: store.state.countDown,
        // change phone number code
        newPhoneCD: store.state.countDown,
        // old phone number code
        oldPhoneCD: store.state.countDown,
        // isStart
        isStarted: false,
        // list
        countingList: []
    });
    let getCode = reactive({
        mathCode: '',
        telephone: ''
    })
    function countaa(what) {
        CD.countingList.push(what);
        switch (what) {
            case 'isRegister':
                timeout('regCD', what);
                break;
            case 'isLogin':
                timeout('logCD', what);
                console.log('works')
                break;
            case 'isNewPhone':
                timeout('newPhoneCD', what);
                break;
            case 'isOldPhone':
                timeout('oldPhoneCD', what);
                break;
        }
    }
    function timeout(math, target) {
        let timer = setInterval(() => {
            let number = Reflect.get(CD, math);
            number--;
            Reflect.set(CD, math, number);
            //disable button
            // Reflect.set(CD, disabled, true);
            //  when number is 0, stop the timer
            if (Reflect.get(CD, math) == 0) {
                clearInterval(timer);
                Reflect.set(CD, math, 120);
                Reflect.set(CD, 'isStarted', false);
                let drop = CD.countingList.findIndex((item) => item == target);
                CD.countingList.splice(drop, 1)
            }
        }, 1000);
    }
    function confrim(target) {
        let obj2 = arr.find((item) => item.use == '手机号');
        getCode.telephone = obj2.value;


        console.log('getTarget:',target)
        if (obj2.value == '' || getCode.mathCode == '') {
            obj.isDialog[who] = true;
            CD.isStarted = false;
            alert('手机号或验证码不能为空')
        } else {
            obj.isDialog[who] = false;
            CD.isStarted = true;
            countaa(target);
            usersInfo(url.centerPage.getTelCode, getCode, 'CHANGE_MSG')
            toast(obj)
        }
    console.log(CD.countingList)


    }
    return {
        CD,
        confrim,
        getCode

    }
}

export default svg

