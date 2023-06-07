import { Request } from "@/hooks/request";
import { reactive, toRef } from "vue";
import store from "@/store/index";

export function usersInfo(url, data, keyFn, Fn) {
    let dataList = reactive({
        datas: []
    })

    Request.postD(url, data).then(
        res => {
            dataList.datas = toRef({ ...res.data })
            if (Fn) {
                Fn(dataList.datas)
            } else {
                store.commit(keyFn, dataList.datas)
            }
        }
    )
    return dataList
}