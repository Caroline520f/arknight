<template>
    <div class="homepage">
        <div id="expMedicals">

        </div>
    </div>
</template>

<script>
import homeCss from '@/public/database/homePage/home.scss'
import { onMounted } from 'vue';
export default {
    name: "homePage",
    setup () {
        onMounted(() => {
            console.log(document.querySelector('#expMedicals'))
        })

        return {
            homeCss
        }
    }
}
</script>

<style lang="scss" scoped>

</style>