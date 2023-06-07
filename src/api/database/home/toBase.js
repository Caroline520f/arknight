import { onBeforeMount,reactive } from "vue";
import { Request } from "@/hooks/request";
import url from "@/api/url";
export function homeData(){
    let dataList = reactive({
        messages:[]
    })

    onBeforeMount(()=>{
        Request.get(url.database.home.messages).then(res=>{
            dataList.data = {...res.data};
        });
    })
    return dataList;
}
export function homeData2(){
    let dataList = reactive({
        navTools:[]
    })

    onBeforeMount(()=>{
        Request.get(url.database.home.navTools).then(res=>{
            dataList.data = {...res.data};
        });
    })
    return dataList;
}