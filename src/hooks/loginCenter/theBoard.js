import { watcher } from "./watcher";
export function theBoard(obj, change, control, arr, target) {
    obj.isSwitch = change;
    obj.anima = true;

    let codeObj = {
        value: "",
        isShow: false,
        type: "password",
        placeHolder: "请输入密码",
        tip01: "*密码不能为空",
        tip02: "*密码格式不正确",
        zz: /^\w{8,16}$/,
        use: "密码"
    }
    // if (arr[1].type == 'text') {
    //     arr.splice(1, 1, codeObj)
    // }
    if (control) {
        if(target){
            arr.splice(1,1,codeObj)
            arr.splice(2, 2, ...target)
        }else{
            arr.splice(2, 2);
        }
     
    }
    watcher(arr);
}
