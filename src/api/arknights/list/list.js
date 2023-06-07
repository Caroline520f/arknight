import url from "@/api/url";
import {onBeforeMount, reactive } from "vue";   // 引入vue3的reactive方法
import {Request } from "@/hooks/request";
export function getBasic() {
    let dataList = reactive({
        dataInfo: []
    })

    onBeforeMount(() => {
        Request.get(url.centerPage.selfList.infoBasic).then(res => {
            dataList.dataInfo = res.data.infoBasic;
            // console.log(dataList.dataInfo)
        })
    })
    return dataList;
}

export function getRealname() {
    let dataList = reactive({
        dataInfo: []
    })
    onBeforeMount(() => {
        Request.get(url.centerPage.selfList.infoRealname).then(res => {
            dataList.dataInfo = res.data.infoRealname;
            // console.log(dataList.dataInfo)
        })
    })
    return dataList;
}

export function getBehavior() {
    let dataList = reactive({
        dataInfo: []
    })
    onBeforeMount(() => {
        Request.get(url.centerPage.selfList.infoBehavior).then(res => {
            dataList.dataInfo = res.data.infoBehavior;
            // console.log(dataList.dataInfo)
        })
    })
    return dataList;
}

export function getDevice() {
    let dataList = reactive({
        dataInfo: []
    })
    onBeforeMount(() => {
        Request.get(url.centerPage.selfList.infoDevice).then(res => {
            dataList.dataInfo = res.data.infoDevice;
        })
    })
    return dataList;
}