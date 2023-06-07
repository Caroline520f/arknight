import service from "@/utils/request";

export class Request{
    static async get(url){
        return await service.get(url)
    }
    static async postD(url,data){
        return await service.post(url,data)
    }
    static async put(url,data){
        return await service.put(url,data)
    }
}
