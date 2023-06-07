import url from "@/api/url"
import { Request } from "@/hooks/request"
import { reactive, toRefs } from "vue"

export function pwdCode(data) {
    let dataList = reactive({
        userinfo: []
    })
    Request.postD(url.centerPage.resetPsw.code, data).then(res => {
        dataList.userinfo = toRefs(reactive({ ...res.data }))
    })
    return dataList
}
export function resetPwd(data) {
    let dataList = reactive({
        userMsg: []
    })
    Request.put(url.centerPage.resetPsw.resetPsw, data).then(res => {
        dataList.userMsg = toRefs(reactive({ ...res.data }))
    }
    )
    return dataList
}