export function toast(obj) {
    obj.toast = true

    setTimeout(() => {
        obj.toast = false
    }, 2000)
}