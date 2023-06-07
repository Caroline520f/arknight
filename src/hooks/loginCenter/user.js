import url from "@/api/url";
import { toRef, reactive } from "vue"
import { Request } from "../request";
import store from "@/store";
import { toast } from "../Toast";
import router from "@/router";

let regObj = reactive({
    telephone: '',
    password: '',
    code: ''
})
let logObj = reactive({
    telephone: '',
    password: '',
    userId: ''
})

export function userAccess(arr, btn, URL, method, fn) {
    let target;
    let isAccess;
    let isStore;

    if (btn.isSwitch) {
        target = regObj;
        isAccess = btn.isRegister;
        isStore = 'isregister'
    } else {
        target = logObj;
        isAccess = btn.isLogin;
        isStore = 'islogin'
    }

    arr.forEach((item, index) => {
        if (index < 3) {
            if (item.value != null && !item.isShow) {
                Reflect.set(target, Reflect.ownKeys(target)[index], item.value)
            }
        }

        if (item.isShow || item.value == null) {
            isAccess = false;
        } else {
            isAccess = true
        }
    });
    if (btn.isSwitch) {
        Reflect.set(target, 'code', arr[arr.length - 1].value)
        if (btn.isChecked == false) {
            store.commit('CHANGE_MSG', {
                status: "1",
                msg: "未同意《鹰角网络用户注册协议》",
            })
            toast(btn)
            isAccess = false
            console.log(isAccess)
        }
    } else {
        target.userId = JSON.parse(localStorage.getItem("users")).userId
    }

    if (isAccess) {
        let dataList = reactive({
            datas: []
        })
        console.log('works');
        Request.postD(url.centerPage[URL], target).then(res => {
            dataList.datas = toRef({ ...res.data })

            let CHANGE_USER = fn([method])[method];
            CHANGE_USER.bind({ $store: store })(dataList.datas)

            store.commit('CHANGE_STORE', isStore)
            store.commit('CHANGE_MSG', dataList.datas)
            toast(btn)

            if (isStore == 'islogin') {
                if (store.state.saved.token) {
                    router.push({
                        name: 'bufferPage'
                    })
                }
            }
        })
    }
}