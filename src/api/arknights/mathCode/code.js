import url from "@/api/url";
import { reactive, toRef } from "vue";
import { Request } from "@/hooks/request";

export function getCode() {
    let dataList = reactive({
        codes: []
    });

    Request.get(url.centerPage.mathCode).then(res => {
        dataList.codes = toRef(res.data);
    });
    return dataList;
}