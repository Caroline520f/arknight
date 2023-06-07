import url from "@/api/url";
import { Request } from "@/hooks/request";
import { onBeforeMount,reactive } from "vue";

export function getQuery() {
    let dataList = reactive({
        userInfo: [],
    });
    onBeforeMount(() => {
        Request.get(url.centerPage.selfInquiries).then((res) => {
            dataList.userInfo = reactive({...res.data.selfInquiries});
           
        })
    })
    return dataList;
}
