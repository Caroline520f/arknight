<template>
    <div class="basMsg">
        <div v-for="(a, b) in dataInfo" :key="b" class="baseic">
            <section>
                <section class="ttile">
                    <span>{{ a.title }}</span>
                </section>
                <section style="margin-top: 1vh;" class="iinfo">
                    <span>收集场景</span>
                    <span>{{ a.scene }}</span>
                    <span :style="{padding:b==0?'1.45vh 0vw':''}">收集目的</span>
                    <span :style="{padding:b==0?'1.45vh 0vw':''}">{{ a.target }}</span>
                    <span>信息内容及数量</span>
                    <span>{{ a.item }}</span>
                </section>

            </section>
        </div>
    </div>
</template>

<script>
import { getBasic } from '@/api/arknights/list/list'
import { toRefs } from 'vue';
import basMsg from '@/public/baseMsg/baseMsg.scss'
import list from '@/public/list/thelist.scss'
export default {
    name: "infoBasic",
    setup() {

        console.log(getBasic())
        return {
            ...toRefs(getBasic()),
            basMsg, list
        }
    }
}
</script>

<style lang="scss" scoped></style>