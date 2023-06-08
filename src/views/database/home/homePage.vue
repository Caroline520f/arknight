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
    <div style="display: flex">
        <div class="plan biggerOne" id="expMedicals">
        </div>
        <div class="plan smallOne" id="basicMedicals">

        </div>
    </div>
    <div style="display: flex">
        <div class="plan smallOne spc">

        </div>
        <div class="plan biggerOne">

        </div>
    </div>
</template>

<script>
import homeCss from '@/public/database/homePage/home.scss'
import { expMedicals,basicMedicals } from '@/echarts'
import { onMounted, toRefs } from 'vue';
import { homeData } from '@/api/database/home/toBase';
import url from '@/api/url';
export default {
    name: "homePage",
    setup() {
        onMounted(() => {
            expMedicals(document.querySelector('#expMedicals'))
            basicMedicals(document.querySelector('#basicMedicals'))
        })
        
        return {
            homeCss,
            ...toRefs(homeData(url.database.home.messages)),
            
        }
    }
}
</script>

<style lang="scss" scoped></style>