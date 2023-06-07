import url from "@/api/url";
import { reactive, toRef } from "vue";
import { Request } from "@/hooks/request";
import { dealRoutes } from "@/hooks/route";
import router from "@/router";
import store from "@/store";

export function createMenu() {
    let dataList = reactive({
        menus: []
    })

    Request.get(url.centerPage.home).then(res => {
        dataList.menus = toRef({ ...res.data })
        console.log(dataList.menus)
        if (dataList.menus.status == '0') {
            let { nav, ...abc } = dataList.menus.datas
           
            let menusMsg = { nav, ...abc }
            store.commit('saved/CHANGE_MENU_MSG', menusMsg)
          
            let routes = nav.map(item => item.route)

            store.commit('saved/CHANGE_MENUS', routes) //保存菜单
            store.commit('CHANGE_STORE', 'ismenus')

            routes = dealRoutes(routes, routes.length - 1)

            routes.forEach(item => {
                router.addRoute('centerPage', item)
            })
            // console.log('R', routes)
            setTimeout(() => {
                router.push({
                    name: 'BaseMessage',
                    params: {
                        userId: JSON.parse(localStorage.getItem('users')).userId
                    }
                })
            }, 1000)

        }
    })
    return dataList;

}