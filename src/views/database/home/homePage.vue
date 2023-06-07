<template>
    <div class="homepage">
        <div v-for="(a, b) in messages" :key="b" class="plan">
            <div>
                <section>
                    <span style="font-size: 1.75rem">{{ a.number }}</span>
                    <span :style="{
                        color: b == 0 || b == 3 ? '#ff6462' : '#8EA5DC'
                    }">{{ a.rate }}</span>
                </section>
                <section style="margin-top: 1vh;font-size: 14px;">
                    <span>{{ a.word }}</span>
                </section>
            </div>
            <div class="common_place">
                <div :style="{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    backgroundColor: '#ff0000',
                }">
                </div>
            </div>
        </div>
    </div>
    <div>
        <h1>a</h1>
    </div>
    <div>
        <h1>c</h1>
    </div>
    <div>
        <h1>d</h1>
    </div>
    <div>
        <h1>e</h1>
    </div>
</template>

<script>
import homeCss from '@/public/database/homePage/home.scss'
// import { expMedicals } from '@/echarts'
import { onMounted, toRefs } from 'vue';
import { homeData } from '@/api/database/home/toBase';
import url from '@/api/url';
export default {
    name: "homePage",
    setup() {
        onMounted(() => {
            //    expMedicals(document.querySelector('#expMedicals'))
        })

        return {
            homeCss,
            ...toRefs(homeData(url.database.home.messages)),

        }
    }
}
</script>

<style lang="scss" scoped></style>