<template>
    <section class="sec" :style="{
        backgroundColor: status == 1 ? '#FE1610' : '#0CB751'
    }">
        <!-- {{ status == 1 ? msg : message }} -->
    </section>
</template>

<script>
// import { reactive } from 'vue';

export default {
    name: "showMsg",
    setup() {
        // let { msg } = reactive(JSON.parse(sessionStorage.getItem("msg")))
        return {
            // ...msg
        }
    }
}
</script>

<style lang="scss" scoped>
.sec {
    width: 11vw;
    height: 7vh;
    background-color: #0CB751;
    border-radius: 1vw;
    position: absolute;
    left: 44vw;
    top: 11vh;
    color: #fff;
    text-align: center;
    line-height: 7vh;
}
</style>