import url from "@/api/url";
import { Request } from "@/hooks/request";
import { onBeforeMount, reactive } from "vue";

export function getInquiry() {
    let dataList = reactive({
        userinfo: []
    })

    onBeforeMount(() => {
        Request.postD(url.centerPage.selfInquiries).then((res) => {
            dataList.userinfo = reactive({ ...res.data })
        });
    });
}