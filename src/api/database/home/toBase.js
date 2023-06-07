import { onBeforeMount,reactive } from "vue";
import { Request } from "@/hooks/request";
export function homeData(url){
    let dataList = reactive({
        messages:[]
    })

    onBeforeMount(()=>{
        Request.get(url).then(res=>{
            dataList.messages = {...res.data.menu};
        });
    })
    return dataList;
}
export function homeData2(url){
    let dataList = reactive({
        navTools:[]
    })

    onBeforeMount(()=>{
        Request.get(url).then(res=>{
            dataList.navTools = {...res.data};
        });
    })
    return dataList;
}