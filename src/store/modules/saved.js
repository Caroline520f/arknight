import moment from "moment";

export default {
    namespaced: true,
    state() {
        return {
            token: null,
            userId: null,
            UID: null,
            email: null,
            ID: null,
            fullName: null,
            menus: null,
            menusMsg: null,
            telephone: null,
            baseMsg: null,
            contexts: null,
        };
    },
    getters: {},
    mutations: {
        CHANGE_USER_MSG(state, datas) {
            state.userId = datas.userId;
            state.UID = datas.UID;
        },
        CHANGE_TOKEN(state, datas) {
            state.token = datas.token;
            state.telephone = datas.telephone;
        },
        CHANGE_MENUS(state, datas) {
            state.menus = datas;
        },
        CHANGE_MENU_MSG(state, datas) {
            state.menusMsg = datas;
        },
        CHANGE_BASE_MSG(state, datas) {
            state.baseMsg = datas;
        },
        CHANGE_CONTEXTS(state, data) {
            if (state.contexts == null) {
                state.contexts = [];
            }
            let obj2;

            Reflect.has(data, "length") ? data.length > 0 ?
                data.forEach((item) => {
                    console.log('where the item goes', item)
                    let obj = {};
                    Reflect.set(obj, "context", item);
                    state.contexts.push(obj);
                }) : ""
                : (obj2 = { ...data });

            if (obj2) {
                let time = moment(obj2.time).format("YYYY-MM-DD HH:mm:ss");
                state.contexts.forEach((item) => {
                    if (item.context == obj2.context) {
                        item.time = time;
                        item.item = obj2.item;
                    }
                })
            }
            console.log(state.contexts)
        }
    },
    actions: {}
}