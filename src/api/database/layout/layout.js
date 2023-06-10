import url from "@/api/url";
import { Request } from "@/hooks/request";
import { dealRoutes, dealpaths } from "@/hooks/route";
import router from "@/router";
import store from "@/store";
import { reactive } from "vue"

export function layoutMenu() {
    let datList = reactive({
        menu: []
    })
    Request.get(url.database.layout.menu).then(res => {
        datList.menu = { ...res.data.menu }
        let a = dealpaths(res.data.menu, 0, "component")
        store.commit('database/CHANGE_MENULIST', { a, menuList: datList.menu })
        store.commit('CHANGE_STORE', 'isdatabase')

        let routes = dealRoutes(a, a.length - 1)
        routes.forEach(item => {
            router.addRoute('databasePage', item)
        })

    })
    return datList

}