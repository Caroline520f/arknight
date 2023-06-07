import url from "@/api/url";
import { Request } from "@/hooks/request";
import { onBeforeMount, reactive, toRefs } from "vue";
import store from "@/store";

export function getGifts() {
    let dataList = reactive({
        userinfo: [],
    });

    onBeforeMount(() => {
        Request.get(url.centerPage.exchangeGift.getContext).then((res) => {
            dataList.userinfo = toRefs(reactive({ ...res.data.exchangeGift }));
            store.commit("saved/CHANGE_CONTEXTS", res.data.context)
        });
    });
    return dataList;
}

export function getContext(data) {
    let dataList = reactive({
        userinfo: [],
    });
    Request.postD(url.centerPage.exchangeGift.datas, data).then((res) => {
        dataList.userinfo = toRefs(reactive({ ...res.data }));
        store.commit("saved/CHANGE_CONTEXTS", { item: res.data.items, ...data })
        store.commit("CHANGE_MSG", "iscontexts")
    })
    return dataList;
}
