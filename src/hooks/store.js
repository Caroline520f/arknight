import store from '@/store/index'
import { computed } from 'vue'
export function storeMethods(methods, mapAr) {
    let arFn = methods(mapAr)

    const storeMap = {}

    Reflect.ownKeys(arFn).forEach(item => {
        let fn = arFn[item].bind({ $store: store })
        Reflect.set(storeMap, item, computed(fn))
    })
    return storeMap
}
// 数据分离，解决刷新空白
export function isStore(store, key, name, obj,storageType) {
    let data = storageType.getItem(key)

    if (store.control[name]) {
        return obj
    } else if (data != null && data != 0) {
        data = JSON.parse(data)
        return data
    } else {

        return 0
    }
}
