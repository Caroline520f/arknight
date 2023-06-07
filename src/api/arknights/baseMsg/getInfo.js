import url from "@/api/url"
import { Request } from "@/hooks/request"
import { onBeforeMount, reactive, toRefs } from "vue"
import store from "@/store/index.js"
export function getBaseMsg(data) {
    let dataList = reactive({
        baseInfo: [],
    })
    onBeforeMount(() => {
        // console.log('122221')

        Request.postD(url.centerPage.baseMsg.getBaseMsg, data)
            .then(res => {
                // console.log('111111')
                dataList.baseInfo = toRefs(reactive({ ...res.data }))
                store.commit("saved/CHANGE_BASE_MSG", res.data.users)
                store.commit("CHANGE_STORE", "isbaseMsg")
            })
    })
    return dataList
}

export function setMsg(url, data) {
    let dataList = reactive({
        userMsg: []
    })

    Request.put(url, data).then(res => {
        dataList.userMsg = toRefs(reactive({ ...res.data }))
    })
    return dataList
}