import url from "@/api/url"
import { onBeforeMount, reactive } from "vue"
import { Request } from "@/hooks/request"

export function Img() {
    let dataList = reactive({
        imgs: []
    })

    onBeforeMount(() => {
        Request.get(url.centerPage.centerImg)
            .then(res => {
                dataList.imgs = { ...res.data.personal }
            })
    })
    return dataList
}