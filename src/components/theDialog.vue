<template>
    <teleport to="body">
        <div class="dialog" v-show="allBtns.isDialog[a]" @click="cancel">
            <slot></slot>
        </div>
    </teleport>
</template>

<script>
import { inject } from "vue"
import allBtns from "@/hooks/theBottons"
export default {
    name: "theDialog",

    setup() {
        let a = inject("allBtns")
        console.log(a)
        function cancel() {
          Reflect.set(allBtns.isDialog, a, false)
        }
        return {
            a,
            allBtns,
            cancel
        }
    }
}
</script>

<style lang="scss" scoped>
.dialog {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
}

// .dialog{
//         width: 100vw;
//         height:100vh;
//         background-color: rgba(0,0,0,0.5);
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         position: absolute;
//         top: 0;
//         left: 0;
//         z-index: 9;
//     }
</style>