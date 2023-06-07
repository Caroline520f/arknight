import { reactive } from "vue";
let allBtns = reactive({
    isSwitch: false, //注册登录切换
    anima: false, //d动画
    isCode: false, //验证码
    changePhone: false, //修改手机
    isDialog: {
        isLogOut: false,
        isRegistera: false,
        changePage: false,
    }, //弹窗
    isRegister: true, //注册
    isLogin: true, //登录
    toast: false, //吐司
    isChecked: false, //是否勾选
})

export default allBtns